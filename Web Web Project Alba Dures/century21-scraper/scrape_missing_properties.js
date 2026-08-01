const fs = require('fs');
const https = require('https');
const path = require('path');
const cheerio = require('cheerio');

const sheetCsvUrl = 'https://docs.google.com/spreadsheets/d/19GAIXFn3PYrqKoiH60-L-iWkPWKkUqL3nIdilkE51-g/export?format=csv';
const outputCsvPath = path.join(__dirname, 'missing_properties_since_june.csv');

// Helper to escape values for CSV
function escapeCSV(val) {
    if (val === null || val === undefined) return '';
    let str = val.toString().trim();
    str = str.replace(/"/g, '""');
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
        str = `"${str}"`;
    }
    return str;
}

// Sleep helper
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Download helper with redirect support and 429 automatic backoff retry
async function downloadUrl(url, redirectDepth = 0, retryCount = 0) {
    if (redirectDepth > 5) {
        throw new Error("Too many redirects");
    }
    
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        };
        
        https.get(url, options, async (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                try {
                    const redirectResult = await downloadUrl(res.headers.location, redirectDepth + 1, retryCount);
                    resolve(redirectResult);
                } catch (err) {
                    reject(err);
                }
                return;
            }
            
            if (res.statusCode === 429) {
                if (retryCount < 3) {
                    const backoffTime = 60000 * (retryCount + 1);
                    console.log(`\n[WARNING] Received 429 Too Many Requests. Backing off for ${backoffTime / 1000}s before retry #${retryCount + 1}...`);
                    await sleep(backoffTime);
                    try {
                        const retryResult = await downloadUrl(url, redirectDepth, retryCount + 1);
                        resolve(retryResult);
                    } catch (err) {
                        reject(err);
                    }
                } else {
                    reject(new Error("Rate limit exceeded (429) after multiple retries."));
                }
                return;
            }
            
            if (res.statusCode !== 200) {
                reject(new Error(`Status code: ${res.statusCode}`));
                return;
            }
            
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

// Parse CSV manually (robust)
function parseCSV(text) {
    const lines = [];
    let row = [];
    let cell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i+1];
        if (inQuotes) {
            if (char === '"') {
                if (nextChar === '"') {
                    cell += '"';
                    i++;
                } else {
                    inQuotes = false;
                }
            } else {
                cell += char;
            }
        } else {
            if (char === '"') {
                inQuotes = true;
            } else if (char === ',') {
                row.push(cell);
                cell = '';
            } else if (char === '\r' || char === '\n') {
                row.push(cell);
                cell = '';
                if (row.length > 1 || row[0] !== '') {
                    lines.push(row);
                }
                row = [];
                if (char === '\r' && nextChar === '\n') {
                    i++;
                }
            } else {
                cell += char;
            }
        }
    }
    if (cell !== '' || row.length > 0) {
        row.push(cell);
        lines.push(row);
    }
    return lines;
}

function extractAgentName(agentNameLink) {
    if (!agentNameLink) return '';
    try {
        const parts = agentNameLink.split('/');
        const lastPart = parts[parts.length - 1];
        const namePart = lastPart.replace('.html', '').replace(/^\d+-/, '');
        return namePart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } catch (e) {
        return '';
    }
}

async function start() {
    console.log("=== STEP 1: Downloading current Google Sheet database ===");
    let sheetDataCsv;
    try {
        sheetDataCsv = await downloadUrl(sheetCsvUrl);
        console.log("Successfully downloaded Google Sheet.");
    } catch (e) {
        console.error("Error downloading Google Sheet:", e.message);
        process.exit(1);
    }

    const sheetRows = parseCSV(sheetDataCsv);
    console.log(`Parsed ${sheetRows.length} total rows from Google Sheet.`);

    const existingIds = new Set();
    // Normalize and collect existing IDs
    for (let i = 1; i < sheetRows.length; i++) {
        const url = sheetRows[i][0];
        if (url) {
            const match = /\/property\/(\d+)\//.exec(url);
            if (match) {
                existingIds.add(parseInt(match[1]));
            }
        }
    }
    console.log(`Unique properties in Sheet: ${existingIds.size}`);

    console.log("\n=== STEP 2: Crawling search pages to find all Durres properties ===");
    const idToUrl = {};
    let page = 1;
    let emptyPagesInARow = 0;
    const maxPages = 80;

    while (page <= maxPages && emptyPagesInARow < 3) {
        console.log(`Crawling search page ${page}...`);
        try {
            const html = await downloadUrl(`https://www.century21albania.com/en/properties?city=Durr%C3%ABs&page=${page}`);
            const propertyUrlRegex = /href="([^"]*?\/property\/(\d+)\/[^"]*?\.html)"/g;
            let match;
            let foundOnPage = 0;
            while ((match = propertyUrlRegex.exec(html)) !== null) {
                const url = match[1].trim();
                const id = parseInt(match[2]);
                let fullUrl = url;
                if (url.startsWith('/')) {
                    fullUrl = `https://www.century21albania.com${url}`;
                }
                
                if (!idToUrl[id]) {
                    idToUrl[id] = fullUrl;
                    foundOnPage++;
                }
            }
            
            console.log(`  Page ${page}: Found ${foundOnPage} new unique links.`);
            if (foundOnPage === 0) {
                emptyPagesInARow++;
            } else {
                emptyPagesInARow = 0;
            }
            page++;
            await sleep(1500); // 1.5s delay between search pages
        } catch (e) {
            console.error(`Error on page ${page}:`, e.message);
            break;
        }
    }

    const uniqueIds = Object.keys(idToUrl).map(id => parseInt(id)).sort((a, b) => b - a);
    console.log(`Total unique properties found on live site: ${uniqueIds.length}`);

    const june1Threshold = 5580000;
    const sinceJune1 = uniqueIds.filter(id => id >= june1Threshold);
    const missing = sinceJune1.filter(id => !existingIds.has(id));

    console.log(`\nProperties since June 1st (ID >= ${june1Threshold}):`);
    console.log(`- Total on site: ${sinceJune1.length}`);
    console.log(`- Missing from Google Sheet: ${missing.length}`);

    if (missing.length === 0) {
        console.log("No missing properties to scrape! Table is fully up to date.");
        process.exit(0);
    }

    console.log(`\n=== STEP 3: Scraping details for ${missing.length} missing properties (sequential, safe) ===`);
    
    // Open CSV write stream
    const csvHeader = [
        "URL — посилання на об'єкт.",
        "Title — назва об'єкта.",
        "Price — ціна.",
        "Category — категорія (Sale або Rent).",
        "Area — площа (м²).",
        "Bedrooms — кількість спалень/кімнат.",
        "Description — опис об'єкта.",
        "Agent Name — ім'я агента.",
        "Agent Phone — телефон агента.",
        "Last Modified — дата останньої зміни об'єкта на сайті.",
        "Image — посилання на фото.",
        "Images — галерея фото."
    ].map(h => escapeCSV(h)).join(',') + '\n';
    
    fs.writeFileSync(outputCsvPath, csvHeader, 'utf8');

    let completedCount = 0;

    for (let i = 0; i < missing.length; i++) {
        const id = missing[i];
        const url = idToUrl[id];
        completedCount++;
        
        try {
            const data = await scrapeProperty(id, url);
            if (data) {
                const csvRow = [
                    data.url,
                    data.title,
                    data.price,
                    data.category,
                    data.area,
                    data.bedrooms,
                    data.description,
                    data.agentName,
                    data.agentPhone,
                    data.lastModified,
                    data.image,
                    data.images
                ].map(val => escapeCSV(val)).join(',') + '\n';
                
                fs.appendFileSync(outputCsvPath, csvRow, 'utf8');
                console.log(`[${completedCount}/${missing.length}] ID: ${id} -> Success (${data.title.substring(0, 30)}...)`);
            } else {
                console.log(`[${completedCount}/${missing.length}] ID: ${id} -> Failed (No details parsed)`);
            }
        } catch (err) {
            console.error(`[${completedCount}/${missing.length}] ID: ${id} -> Error:`, err.message);
        }
        
        await sleep(2000); // Safe 2.0s delay between property pages
    }
    
    console.log(`\nAll done! Scraped and saved ${completedCount} properties to:`);
    console.log(outputCsvPath);
}

async function scrapeProperty(id, url) {
    try {
        const html = await downloadUrl(url);
        const $ = cheerio.load(html);
        
        const title = $('h1').text().trim();
        const price = $('h2.text-gold-shade-55').text().trim();
        const description = $('p.text-grey-shade-40').text().trim();
        
        // Agent Phone
        const agentPhoneLink = $('a[href^="tel:"]').attr('href');
        const agentPhone = String(agentPhoneLink ? agentPhoneLink.replace('tel:', '').trim() : '').replace(/\s+/g, ' ').trim();
        
        // Agent Name Link
        const agentNameLink = $('a[href*="/agent/"], a[href*="/agjentet/"]').attr('href');
        const agentName = String(extractAgentName(agentNameLink)).replace(/\s+/g, ' ').trim();
        
        // Facilities parsing
        let area = '';
        let bedrooms = '';
        let category = 'Sale';
        
        if (url.toLowerCase().includes('qera') || url.toLowerCase().includes('qira') || url.toLowerCase().includes('rent')) {
            category = 'Rent';
        }
        
        $('p.paragraph-2').each((i, el) => {
            const text = $(el).text().toLowerCase();
            if (text.includes('m2') || text.includes('sip.') || text.includes('surface')) {
                const cleanText = text.replace(/m2/g, '').replace(/m²/g, '');
                area = cleanText.replace(/[^0-9]/g, '').trim() + ' m2';
            }
            if (text.includes('bedroom') || text.includes('dhomat') || text.includes('bed')) {
                bedrooms = $(el).text().replace(/[^0-9]/g, '').trim();
            }
        });
        
        // Extract Image URL
        let image = '';
        const ogImageRegex = /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i;
        const match = ogImageRegex.exec(html);
        if (match) {
            image = match[1];
        }
        
        // Filter out logo if it's the only one found and try to find the real one
        if (image.includes('Century21-nav-logo.png')) {
            const allMatches = html.match(/content="([^"]*?\.jpg)"/g);
            if (allMatches) {
                for (const m of allMatches) {
                    if (m.includes('digitaloceanspaces')) {
                        const cleanMatch = /content="([^"]+)"/.exec(m);
                        if (cleanMatch) {
                            image = cleanMatch[1];
                            break;
                        }
                    }
                }
            }
        }
        
        let additionalImages = [];
        const regex = /https:\/\/crm-cdn\.ams3\.cdn\.digitaloceanspaces\.com\/c21al\/storage\/c21al\/[\d\w\-\/]+1024x768\/[\d\w\-\_\.]+\.jpg/gi;
        const matches = html.match(regex);
        if (matches) {
            additionalImages = [...new Set(matches)];
        }
        if (additionalImages.length === 0 && image) {
            additionalImages = [image];
        } else if (image && !additionalImages.includes(image)) {
            additionalImages.unshift(image);
        }

        return {
            url,
            title,
            price,
            category,
            area,
            bedrooms,
            description,
            agentName,
            agentPhone,
            image,
            images: additionalImages.join(','),
            lastModified: new Date().toISOString()
        };
    } catch (e) {
        return null;
    }
}

start();
