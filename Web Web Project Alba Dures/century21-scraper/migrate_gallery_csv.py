import os
import csv
import re
import time
import requests
from bs4 import BeautifulSoup
import sys

# Ensure UTF-8 output in terminal
if sys.platform.startswith('win'):
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')
    sys.stderr = codecs.getwriter('utf-8')(sys.stderr.buffer, 'strict')

INPUT_FILENAME = "properties.csv"
OUTPUT_FILENAME = "properties_updated.csv"

def detect_delimiter(file_path):
    """Auto-detects if the CSV uses commas or semicolons."""
    with open(file_path, "r", encoding="utf-8") as f:
        sample = f.readline()
        if ";" in sample and sample.count(";") > sample.count(","):
            return ";"
        return ","

def extract_gallery_images(url):
    """Scrapes the property page and extracts all high-res crm-cdn image URLs."""
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    try:
        response = requests.get(url, headers=headers, timeout=15)
        if response.status_code != 200:
            print(f"  [Помилка] Статус {response.status_code} для {url}")
            return []
        
        html = response.text
        
        # 1. Main image from og:image
        main_image = ""
        og_match = re.search(r'<meta\s+property=["\']og:image["\']\s+content=["\']([^"\']+)["\']', html, re.IGNORECASE)
        if og_match:
            main_image = og_match.group(1)
            
        # 2. Extract all crm-cdn high-resolution image links (containing 1024x768)
        regex = r'https://crm-cdn\.ams3\.cdn\.digitaloceanspaces\.com/c21al/storage/c21al/[\w\-\/]+1024x768/[\w\-\_\.]+\.jpg'
        matches = re.findall(regex, html, re.IGNORECASE)
        
        unique_images = []
        if matches:
            # Deduplicate preserving order
            seen = set()
            for img in matches:
                if img not in seen:
                    seen.add(img)
                    unique_images.append(img)
                    
        # Safeguard: ensure main image is in the list
        if not unique_images and main_image:
            unique_images = [main_image]
        elif main_image and main_image not in unique_images:
            unique_images.insert(0, main_image)
            
        return unique_images
    except Exception as e:
        print(f"  [Помилка] Не вдалося зчитати {url}: {e}")
        return []

def main():
    if not os.path.exists(INPUT_FILENAME):
        print(f"\n[Помилка] Файл '{INPUT_FILENAME}' не знайдено!")
        print("Будь ласка, експортуйте Google Таблицю у CSV, перейменуйте на 'properties.csv' та покладіть у цю ж папку.")
        return

    delimiter = detect_delimiter(INPUT_FILENAME)
    print(f"\n[Інфо] Автовизначено роздільник у CSV: '{delimiter}'")

    rows = []
    headers = []
    
    with open(INPUT_FILENAME, "r", encoding="utf-8") as f:
        reader = csv.reader(f, delimiter=delimiter)
        try:
            headers = next(reader)
        except StopIteration:
            print("[Помилка] Файл порожній!")
            return
        
        for r in reader:
            if r:
                rows.append(r)

    print(f"[Інфо] Зчитано {len(rows)} рядків з файлу.")

    # Find necessary column indices
    url_col = "URL — посилання на об'єкт."
    image_col = "Image — посилання на фото."
    gallery_col = "Images — галерея фото."

    if url_col not in headers:
        # Try fallback matching
        matching_url = [h for h in headers if "url" in h.lower() or "посилання" in h.lower()]
        if matching_url:
            url_col = matching_url[0]
        else:
            print(f"[Помилка] Не знайдено стовпчик з URL! Наявні стовпчики: {headers}")
            return

    url_idx = headers.index(url_col)
    
    # Add gallery column if missing
    if gallery_col not in headers:
        headers.append(gallery_col)
        # Pad all existing rows with empty value for the new column
        for r in rows:
            r.append("")
        print(f"[Інфо] Стовпчик '{gallery_col}' додано в структуру CSV.")
    
    gallery_idx = headers.index(gallery_col)

    # Count how many rows need processing
    unprocessed_rows = [i for i, r in enumerate(rows) if not r[gallery_idx].strip()]
    total_to_process = len(unprocessed_rows)
    print(f"[Інфо] Всього об'єктів: {len(rows)}. Потребують обробки: {total_to_process}.")

    if total_to_process == 0:
        print("[Інфо] Усі об'єкти вже мають галереї! Нічого сканувати.")
        return

    processed_count = 0
    try:
        for idx in unprocessed_rows:
            row = rows[idx]
            url = row[url_idx].strip()
            
            if not url or not url.startswith("http"):
                continue
                
            processed_count += 1
            print(f"[{processed_count}/{total_to_process}] Скануємо: {url} ...")
            
            images = extract_gallery_images(url)
            if images:
                row[gallery_idx] = ",".join(images)
                print(f"  [Успіх] Знайдено фото: {len(images)}")
            else:
                print("  [Пропущено] Фото не знайдено.")
                
            # Tiny sleep to be polite to the server
            time.sleep(0.5)
            
            # Periodically auto-save progress
            if processed_count % 10 == 0:
                with open(OUTPUT_FILENAME, "w", encoding="utf-8", newline="") as f:
                    writer = csv.writer(f, delimiter=delimiter)
                    writer.writerow(headers)
                    writer.writerows(rows)
                print(f"  --> Прогрес збережено в '{OUTPUT_FILENAME}'")
                
    except KeyboardInterrupt:
        print("\n[Попередження] Процес перервано користувачем. Зберігаємо прогрес...")

    # Final save
    with open(OUTPUT_FILENAME, "w", encoding="utf-8", newline="") as f:
        writer = csv.writer(f, delimiter=delimiter)
        writer.writerow(headers)
        writer.writerows(rows)

    print(f"\n[Успішно] Роботу завершено! Оновлений файл збережено в: '{OUTPUT_FILENAME}'")
    print("Тепер ви можете імпортувати цей файл назад у Google Таблицю.")

if __name__ == "__main__":
    main()
