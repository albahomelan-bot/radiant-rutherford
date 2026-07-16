import os
import cv2
import numpy as np

def extract_coloring_lines(input_path, output_path):
    """
    Экстрагирует чистые контуры (лайн-арт) из цветного изображения для создания раскраски.
    Использует детектор границ Кэнни (Canny) для получения тонких и четких линий.
    """
    img = cv2.imread(input_path)
    if img is None:
        print(f"Ошибка загрузки: {input_path}")
        return False
        
    # Шаг 1: Перевод в градации серого
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Шаг 2: Билатеральный фильтр для сглаживания цветового шума и сохранения резких границ
    smoothed = cv2.bilateralFilter(gray, 9, 75, 75)
    
    # Шаг 3: Детектор границ Кэнни (Canny). Он находит перепады и превращает сплошные заливки (как глаза) в контуры
    edges = cv2.Canny(smoothed, 50, 150)
    
    # Шаг 4: Слегка утолщаем линии (на 1 пиксель), чтобы они выглядели как в раскраске
    kernel = np.ones((2, 2), np.uint8)
    dilated_edges = cv2.dilate(edges, kernel, iterations=1)
    
    # Шаг 5: Инвертируем (черные линии на белом фоне)
    cleaned = cv2.bitwise_not(dilated_edges)
    
    # Записываем результат
    cv2.imwrite(output_path, cleaned)
    return True

if __name__ == "__main__":
    # Исходная цветная картинка, сгенерированная ИИ (подводный мир)
    colored_source = r"C:\Users\Admin\.gemini\antigravity\brain\d22a171b-3fe2-485d-8bce-fa3b268929d3\colored_mushroom_village_1784200713324.jpg"
    
    # Пути назначения в папке assets проекта
    dest_colored = "assets/colored.png"
    dest_cleaned = "assets/cleaned.png"
    
    if os.path.exists(colored_source):
        # Копируем цветной оригинал в assets
        img = cv2.imread(colored_source)
        cv2.imwrite(dest_colored, img)
        print(f"Цветной оригинал скопирован в: {dest_colored}")
        
        # Генерируем из него пиксель-в-пиксель совпадающий контур
        if extract_coloring_lines(colored_source, dest_cleaned):
            print(f"Черно-белый контур успешно создан и сохранен в: {dest_cleaned}")
            print("Обе картинки теперь идеально совпадают по геометрии и размерам!")
    else:
        print(f"Ошибка: Файл {colored_source} не найден.")
