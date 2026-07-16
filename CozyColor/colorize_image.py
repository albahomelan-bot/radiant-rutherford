import os
import numpy as np
from PIL import Image

def create_gradient_background(width, height):
    """
    Создает плавный многоцветный диагональный градиент (акварельный эффект).
    """
    # Цветовая палитра: индиго, пурпурный, золотой, голубой
    c1 = np.array([48, 16, 120])     # Deep Indigo
    c2 = np.array([219, 39, 119])   # Pink/Magenta
    c3 = np.array([245, 158, 11])   # Amber/Gold
    c4 = np.array([14, 165, 233])   # Sky Blue

    # Создаем координатную сетку
    x = np.linspace(0, 1, width)
    y = np.linspace(0, 1, height)
    xv, yv = np.meshgrid(x, y)
    
    # Диагональный коэффициент (0.0 в левом верхнем углу, 1.0 в правом нижнем)
    t = (xv + yv) / 2.0
    
    # Массив для градиента
    gradient = np.zeros((height, width, 3), dtype=np.uint8)
    
    # Разделяем на 3 зоны интерполяции
    mask1 = t < 0.33
    mask2 = (t >= 0.33) & (t < 0.66)
    mask3 = t >= 0.66
    
    # Нормализуем t для каждого интервала
    t1 = t[mask1] / 0.33
    t2 = (t[mask2] - 0.33) / 0.33
    t3 = (t[mask3] - 0.66) / 0.34
    
    # Применяем линейную интерполяцию цветов
    gradient[mask1] = (1 - t1)[:, None] * c1 + t1[:, None] * c2
    gradient[mask2] = (1 - t2)[:, None] * c2 + t2[:, None] * c3
    gradient[mask3] = (1 - t3)[:, None] * c3 + t3[:, None] * c4
    
    return gradient

def colorize_lineart():
    lineart_path = "assets/cleaned.png"
    output_path = "assets/colored.png"
    
    if not os.path.exists(lineart_path):
        print(f"Ошибка: Исходный файл '{lineart_path}' не найден.")
        return
        
    print("Шаг 1: Загрузка очищенного лайнарта...")
    img = Image.open(lineart_path).convert("L")
    width, height = img.size
    print(f"Размер изображения: {width}x{height} пикселей.")
    
    print("Шаг 2: Генерация мягкого акварельного градиента...")
    bg_gradient = create_gradient_background(width, height)
    
    print("Шаг 3: Наложение контуров (Multiply Blend)...")
    lineart_arr = np.array(img)
    
    # Нормализуем маску линии: 0.0 (черный контур), 1.0 (белая бумага)
    lineart_mask = lineart_arr.astype(float) / 255.0
    
    # Умножаем цвета фона на маску линии: контуры станут черными, а пустоты окрасятся
    colored_arr = (bg_gradient.astype(float) * lineart_mask[:, :, None]).astype(np.uint8)
    
    print("Шаг 4: Сохранение готового изображения...")
    result_img = Image.fromarray(colored_arr)
    result_img.save(output_path, "PNG")
    print(f"Успешно создана цветная копия: {output_path}")

if __name__ == "__main__":
    colorize_lineart()
