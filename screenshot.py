import asyncio
import sys
from playwright.async_api import async_playwright

async def take_screenshot(url, output_path="screenshot.png"):
    async with async_playwright() as p:
        # Запускаем браузер в фоновом (headless) режиме
        browser = await p.chromium.launch(headless=True)
        
        # Создаем контекст и ИГНОРИРУЕМ ошибки SSL-сертификатов (важно для корпоративных и защищенных сетей)
        context = await browser.new_context(
            viewport={"width": 1920, "height": 1080},
            ignore_https_errors=True
        )
        
        page = await context.new_page()
        
        print(f"Открываю страницу: {url}...")
        try:
            # Переходим на сайт, ждем загрузки сети
            await page.goto(url, wait_until="networkidle", timeout=30000)
            
            # Делаем скриншот всей страницы
            await page.screenshot(path=output_path, full_page=True)
            print(f"Успешно сохранен скриншот всей страницы в: {output_path}")
            
        except Exception as e:
            print(f"Ошибка при создании скриншота: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    # Если передали аргумент URL через командную строку, берем его, иначе берем тестовый
    target_url = sys.argv[1] if len(sys.argv) > 1 else "https://antforms.com"
    output_file = sys.argv[2] if len(sys.argv) > 2 else "screenshot.png"
    
    asyncio.run(take_screenshot(target_url, output_file))
