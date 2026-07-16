import os
import cv2

def clean_coloring_page(image_path, output_path):
    """
    Очищает страницу раскраски, приводя её к бинарному ЧБ виду.
    Использует размытие по Гауссу для подавления микрошума текстуры бумаги
    и фиксированный порог для чистого белого фона.
    """
    # Загрузка изображения в градациях серого
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print(f"Ошибка: Не удалось загрузить файл {image_path}")
        return False
        
    # Размытие по Гауссу для сглаживания микротекстуры (шума)
    blurred = cv2.GaussianBlur(img, (3, 3), 0)
    
    # Применение фиксированного порога (200-220). Всё, что светлее 200, станет чисто белым.
    # Это полностью убирает фоновый шум и текстуру бумаги цифровых генераций.
    _, thresh = cv2.threshold(blurred, 200, 255, cv2.THRESH_BINARY)
    
    # Сохранение очищенного файла
    cv2.imwrite(output_path, thresh)
    return True

def process_folder(folder_path):
    """
    Сканирует папку, находит все изображения и сохраняет их очищенные копии в подпапку 'cleaned'.
    """
    # Нормализуем путь к папке
    folder_path = os.path.abspath(folder_path)
    
    # Папка для сохранения готовых файлов
    output_folder = os.path.join(folder_path, "cleaned")
    
    # Создаем папку 'cleaned', если её нет
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)
        print(f"Создана папка для результатов: {output_folder}")
        
    # Поддерживаемые форматы изображений
    extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.tiff', '.webp')
    
    # Получаем список файлов
    files = [f for f in os.listdir(folder_path) if f.lower().endswith(extensions)]
    
    if not files:
        print(f"В папке '{folder_path}' не найдено подходящих изображений.")
        return
        
    print(f"Найдено файлов для обработки: {len(files)}")
    print("-" * 50)
    
    success_count = 0
    for idx, file in enumerate(files, 1):
        input_path = os.path.join(folder_path, file)
        output_path = os.path.join(output_folder, file)
        
        print(f"[{idx}/{len(files)}] Обработка: {file}...", end="", flush=True)
        
        if clean_coloring_page(input_path, output_path):
            print(" Успешно!")
            success_count += 1
        else:
            print(" Ошибка!")
            
    print("-" * 50)
    print(f"Обработка завершена. Успешно очищено: {success_count} из {len(files)}")
    print(f"Все готовые файлы находятся в: {output_folder}")

if __name__ == "__main__":
    # Указываем папку, где лежат исходные файлы
    target_dir = r"D:\digital case"
    
    if os.path.exists(target_dir):
        process_folder(target_dir)
    else:
        print(f"Ошибка: Указанный путь '{target_dir}' не существует.")
        print("Пожалуйста, убедись, что диск D подключен и папка 'digital case' создана.")
