import os
from PIL import Image

def build_pdf(images_dir, output_pdf_path):
    """
    Объединяет все изображения из указанной папки в один многостраничный PDF-файл.
    """
    images_dir = os.path.abspath(images_dir)
    output_pdf_path = os.path.abspath(output_pdf_path)
    
    # Поддерживаемые расширения файлов
    valid_extensions = ('.png', '.jpg', '.jpeg', '.webp')
    
    # Список файлов в папке, отсортированный по имени
    files = sorted([
        f for f in os.listdir(images_dir) 
        if f.lower().endswith(valid_extensions)
    ])
    
    if not files:
        print(f"Ошибка: В папке '{images_dir}' не найдено подходящих изображений.")
        return False
        
    print(f"Найдено изображений для сборки в PDF: {len(files)}")
    print("-" * 50)
    
    image_list = []
    for file in files:
        file_path = os.path.join(images_dir, file)
        try:
            # Открываем изображение и конвертируем в RGB (обязательно для PDF)
            img = Image.open(file_path).convert('RGB')
            image_list.append(img)
            print(f"Добавлено в очередь: {file}")
        except Exception as e:
            print(f"Ошибка чтения файла {file}: {e}")
            
    if not image_list:
        print("Ошибка: Нет изображений для сохранения.")
        return False
        
    try:
        # Берем первое изображение как основу
        first_img = image_list[0]
        # Все остальные изображения добавляем в список
        other_imgs = image_list[1:]
        
        # Сохраняем в PDF
        first_img.save(output_pdf_path, save_all=True, append_images=other_imgs)
        print("-" * 50)
        print(f"Успех! PDF-книга раскрасок сохранена в: {output_pdf_path}")
        return True
    except Exception as e:
        print(f"Ошибка сохранения PDF: {e}")
        return False

if __name__ == "__main__":
    # Папка с очищенными раскрасками
    source_dir = r"D:\digital case\cleaned"
    # Путь к итоговому PDF-файлу
    output_file = r"D:\digital case\coloring_book.pdf"
    
    if os.path.exists(source_dir):
        build_pdf(source_dir, output_file)
    else:
        print(f"Ошибка: Папка с очищенными изображениями '{source_dir}' не найдена.")
        print("Пожалуйста, убедись, что ты сначала запустил clean_images.py")
