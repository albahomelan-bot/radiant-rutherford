document.addEventListener('DOMContentLoaded', () => {
  // 1. Принудительный сброс скролла наверх при перезагрузке страницы
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  // 2. Логика переключения тем (Светлая / Темная)
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему (по умолчанию темная)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      themeIcon.className = 'fa-solid fa-sun';
    }

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-theme');
      const isLight = document.body.classList.contains('light-theme');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      
      // Анимация вращения иконки при переключении
      themeIcon.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        themeIcon.style.transform = 'rotate(0deg)';
      }, 200);
    });
  }

  // 3. Интерактивный калькулятор доходов
  const calcIncome = document.getElementById('calc-income');
  const calcForm = document.getElementById('calc-form');
  const calcSuccess = document.getElementById('calc-success');

  const calcOptions = {
    shifts: 4,
    english: 'basic',
    experience: 'no'
  };

  const calculateSalary = () => {
    if (!calcIncome) return;

    let base = 1800;
    if (calcOptions.shifts === 5) base = 2400;
    if (calcOptions.shifts === 6) base = 3200;

    let multiplier = 1.0;
    if (calcOptions.english === 'medium') multiplier = 1.25;
    if (calcOptions.english === 'fluent') multiplier = 1.5;

    if (calcOptions.experience === 'yes') multiplier *= 1.15;

    const total = Math.round((base * multiplier) / 100) * 100;
    calcIncome.textContent = `$${total.toLocaleString()}`;
  };

  // Обработка кликов по опциям калькулятора
  const bindCalcOption = (containerId, optionKey, isNumeric = false) => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const buttons = container.querySelectorAll('.calc-opt-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const val = btn.getAttribute('data-value');
        calcOptions[optionKey] = isNumeric ? parseInt(val) : val;
        
        calculateSalary();
      });
    });
  };

  bindCalcOption('shifts-options', 'shifts', true);
  bindCalcOption('english-options', 'english');
  bindCalcOption('experience-options', 'experience');

  // Первичный расчет при загрузке
  calculateSalary();

  // Отправка формы калькулятора
  if (calcForm) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('calc-name');
      const telegramInput = document.getElementById('calc-telegram');

      if (!nameInput || !telegramInput) return;

      const leadData = {
        name: nameInput.value.trim(),
        telegram: telegramInput.value.trim(),
        selectedShifts: calcOptions.shifts,
        selectedEnglish: calcOptions.english,
        selectedExperience: calcOptions.experience,
        estimatedIncome: calcIncome.textContent
      };

      console.log('Sending Calculator Lead to Telegram/n8n:', leadData);

      // Имитируем отправку на сервер
      calcForm.style.display = 'none';
      if (calcSuccess) {
        calcSuccess.style.display = 'block';
      }
    });
  }

  // 4. Логика плавающей кнопки скролла наверх
  const btnScrollTop = document.getElementById('btn-scroll-top');
  if (btnScrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btnScrollTop.classList.add('show');
      } else {
        btnScrollTop.classList.remove('show');
      }
    });

    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
