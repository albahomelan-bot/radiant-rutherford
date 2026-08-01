const fs = require('fs');
const https = require('https');
const path = require('path');

const INPUT_FILENAME = "properties.csv";
const OUTPUT_FILENAME = "properties_updated.csv";

// Helper to sleep/wait
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function detectDelimiter(content) {
  // Read first line to detect separator
  const firstLine = content.split('\n')[0];
  if (firstLine.includes(';') && (firstLine.split(';').length > firstLine.split(',').length)) {
    return ';';
  }
  return ',';
}

function parseCSV(content, delimiter) {
  const rows = [];
  let currentRow = [];
  let currentCell = '';
  let inQuotes = false;
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i+1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++; // skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      currentRow.push(currentCell);
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n
      }
      currentRow.push(currentCell);
      rows.push(currentRow);
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }
  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }
  return rows;
}

function formatCSVRow(row, delimiter) {
  return row.map(cell => {
    const cellStr = String(cell || '');
    const escaped = cellStr.replace(/"/g, '""');
    if (escaped.includes(delimiter) || escaped.includes('\n') || escaped.includes('\r') || escaped.includes('"')) {
      return `"${escaped}"`;
    }
    return escaped;
  }).join(delimiter);
}

function saveCSV(filePath, headers, rows, delimiter) {
  const content = [
    formatCSVRow(headers, delimiter),
    ...rows.map(r => formatCSVRow(r, delimiter))
  ].join('\n');
  fs.writeFileSync(filePath, content, 'utf8');
}

function fetchPage(url, retryCount = 0) {
  return new Promise((resolve) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'uk-UA,uk;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 15000
    };
    
    https.get(url, options, async (res) => {
      // Handle rate limiting (status 429)
      if (res.statusCode === 429) {
        if (retryCount < 3) {
          console.warn(`  [Попередження] Отримано 429 (Too Many Requests). Очікуємо 60 секунд перед спробою #${retryCount + 1}...`);
          await sleep(60000);
          resolve(await fetchPage(url, retryCount + 1));
        } else {
          console.error(`  [Помилка] Перевищено ліміт спроб (429) для ${url}`);
          resolve('');
        }
        return;
      }
      
      if (res.statusCode !== 200) {
        resolve('');
        return;
      }
      
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    }).on('error', () => {
      resolve('');
    });
  });
}

function extractGalleryImages(html) {
  let mainImage = '';
  const ogMatch = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  if (ogMatch) {
    mainImage = ogMatch[1];
  }
  
  const regex = /https:\/\/crm-cdn\.ams3\.cdn\.digitaloceanspaces\.com\/c21al\/storage\/c21al\/[\d\w\-\/]+1024x768\/[\d\w\-\_\.]+\.jpg/gi;
  const matches = html.match(regex);
  
  let uniqueImages = [];
  if (matches) {
    uniqueImages = [...new Set(matches)];
  }
  
  if (uniqueImages.length === 0 && mainImage) {
    uniqueImages = [mainImage];
  } else if (mainImage && !uniqueImages.includes(mainImage)) {
    uniqueImages.unshift(mainImage);
  }
  
  return uniqueImages;
}

async function startMigration() {
  const dir = __dirname;
  const inputPath = path.join(dir, INPUT_FILENAME);
  const outputPath = path.join(dir, OUTPUT_FILENAME);
  
  if (!fs.existsSync(inputPath)) {
    console.error(`\n[Помилка] Файл '${INPUT_FILENAME}' не знайдено!`);
    console.error(`Переконайтеся, що ви скопіювали properties.csv у папку: ${dir}`);
    return;
  }
  
  console.log('[Інфо] Читання CSV файлу...');
  const csvContent = fs.readFileSync(inputPath, 'utf8');
  const delimiter = detectDelimiter(csvContent);
  console.log(`[Інфо] Автовизначено роздільник у CSV: "${delimiter}"`);
  
  const allRows = parseCSV(csvContent, delimiter);
  if (allRows.length === 0) {
    console.error('[Помилка] Файл порожній!');
    return;
  }
  
  const headers = allRows[0].map(h => h.trim().replace(/^"|"$/g, ''));
  const rows = allRows.slice(1).filter(r => r.length > 0);
  console.log(`[Інфо] Зчитано заголовки:`, headers);
  console.log(`[Інфо] Всього об'єктів у базі: ${rows.length}`);
  
  // Find URL and Gallery column indices
  let urlIdx = headers.findIndex(h => h.includes("URL — посилання"));
  if (urlIdx === -1) {
    urlIdx = headers.findIndex(h => h.toLowerCase().includes("url") || h.toLowerCase().includes("посилання"));
  }
  
  if (urlIdx === -1) {
    console.error('[Помилка] Не знайдено стовпчик з URL об\'єкта!');
    return;
  }
  
  let galleryCol = "Images — галерея фото.";
  let galleryIdx = headers.indexOf(galleryCol);
  
  if (galleryIdx === -1) {
    headers.push(galleryCol);
    galleryIdx = headers.length - 1;
    // Add empty cell to all rows
    rows.forEach(r => r.push(''));
    console.log(`[Інфо] Стовпчик '${galleryCol}' додано в структуру таблиці.`);
  }
  
  // Find rows needing gallery images
  const unprocessedIndices = [];
  rows.forEach((row, index) => {
    const val = row[galleryIdx] ? String(row[galleryIdx]).trim() : '';
    if (!val) {
      unprocessedIndices.push(index);
    }
  });
  
  const totalToProcess = unprocessedIndices.length;
  console.log(`[Інфо] Рядки, що потребують сканування: ${totalToProcess} з ${rows.length}`);
  
  if (totalToProcess === 0) {
    console.log('[Інфо] Усі об\'єкти вже мають галереї. Скрипт завершує роботу.');
    return;
  }
  
  let processedCount = 0;
  
  for (const idx of unprocessedIndices) {
    const row = rows[idx];
    const url = row[urlIdx] ? String(row[urlIdx]).trim() : '';
    
    if (!url || !url.startsWith('http')) {
      continue;
    }
    
    processedCount++;
    console.log(`[${processedCount}/${totalToProcess}] Скануємо: { ${url} } ...`);
    
    const html = await fetchPage(url);
    if (html) {
      const images = extractGalleryImages(html);
      if (images.length > 0) {
        row[galleryIdx] = images.join(',');
        console.log(`  [Успіх] Знайдено зображень: ${images.length}`);
      } else {
        console.log('  [Пропущено] Зображень не знайдено.');
      }
    } else {
      console.log('  [Пропущено] Не вдалося завантажити сторінку або ліміт вичерпано.');
    }
    
    // Pause for a random duration between 2s and 4.5s to bypass Cloudflare rate-limiting
    const randomDelay = Math.floor(Math.random() * (4500 - 2000 + 1)) + 2000;
    console.log(`  [Пауза] Чекаємо ${randomDelay} мс...`);
    await sleep(randomDelay);
    
    // Auto-save progress every 10 rows
    if (processedCount % 10 === 0) {
      saveCSV(outputPath, headers, rows, delimiter);
      console.log(`  --> Прогрес автоматично збережено у '${OUTPUT_FILENAME}'`);
    }
  }
  
  // Final save
  saveCSV(outputPath, headers, rows, delimiter);
  console.log(`\n[Успішно] Сканування завершено! Оновлену таблицю збережено в: '${outputPath}'`);
}

startMigration().catch(err => {
  console.error('[Помилка] Виникла критична помилка під час виконання скрипта:', err);
});
