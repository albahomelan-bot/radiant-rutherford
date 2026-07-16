import os
from PIL import Image

def images_to_pdf(image_folder, output_pdf_path):
    images = []
    
    # Сортируем файлы в папке
    files = sorted([f for f in os.listdir(image_folder) if f.endswith(('.png', '.jpg', '.jpeg'))])
    
    if not files:
        print(f"Ошибка: В папке '{image_folder}' не найдено файлов для сборки.")
        return
        
    # Открываем первую картинку и конвертируем в RGB
    first_image = Image.open(os.path.join(image_folder, files[0])).convert('RGB')
    
    # Конвертируем остальные
    for file in files[1:]:
        img = Image.open(os.path.join(image_folder, file)).convert('RGB')
        images.append(img)
        
    # Сохраняем все в один PDF
    first_image.save(output_pdf_path, save_all=True, append_images=images)
    print(f"Книга раскрасок успешно создана: {output_pdf_path}")

if __name__ == "__main__":
    # Папка с очищенными картинками на диске D
    input_folder = r"D:\digital case\cleaned"
    # Путь для сохранения готовой книги
    output_file = r"D:\digital case\coloring_book.pdf"
    
    if os.path.exists(input_folder):
        images_to_pdf(input_folder, output_file)
    else:
        print(f"Ошибка: Папка '{input_folder}' не существует.")
