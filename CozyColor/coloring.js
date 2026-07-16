document.addEventListener('DOMContentLoaded', () => {
  initLang();
  initHeaderScroll();
  initComparisonSlider();
  initCheckout();
  initBackToTop();
});

/* --- MULTILINGUAL CONTROLLER --- */
function initLang() {
  const langToggle = document.getElementById('lang-toggle');
  const langCurrent = document.getElementById('lang-current');
  const locales = ['en', 'uk', 'ru'];
  
  if (!langToggle || !langCurrent) return;

  // Load saved locale or detect from browser environment
  let currentLang = localStorage.getItem('lang') || 'en';
  
  // Set initial state
  document.documentElement.setAttribute('data-lang', currentLang);
  langCurrent.textContent = currentLang.toUpperCase();

  langToggle.addEventListener('click', () => {
    let nextIdx = (locales.indexOf(currentLang) + 1) % locales.length;
    currentLang = locales[nextIdx];
    
    document.documentElement.setAttribute('data-lang', currentLang);
    langCurrent.textContent = currentLang.toUpperCase();
    localStorage.setItem('lang', currentLang);
  });
}

/* --- STICKY HEADER --- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- INTERACTIVE BEFORE/AFTER SLIDER --- */
function initComparisonSlider() {
  const slider = document.getElementById('comparison-slider');
  const handle = document.getElementById('slider-handle');
  
  if (!slider || !handle) return;

  let active = false;

  const moveSlider = (x) => {
    const rect = slider.getBoundingClientRect();
    // Calculate cursor position relative to slider container width (0 to 1)
    let position = (x - rect.left) / rect.width;
    
    // Clamp between 0% and 100%
    if (position < 0) position = 0;
    if (position > 1) position = 1;
    
    const percentage = position * 100;
    
    // Update clip path via CSS variable and handle position
    slider.style.setProperty('--clip-pos', `${percentage}%`);
    handle.style.left = `${percentage}%`;
  };

  // Support Mouse events
  slider.addEventListener('mousedown', () => { active = true; });
  window.addEventListener('mouseup', () => { active = false; });
  window.addEventListener('mousemove', (e) => {
    if (!active) return;
    moveSlider(e.clientX);
  });

  // Support Touch events (Mobile friendly)
  slider.addEventListener('touchstart', () => { active = true; });
  window.addEventListener('touchend', () => { active = false; });
  window.addEventListener('touchmove', (e) => {
    if (!active) return;
    moveSlider(e.touches[0].clientX);
  });

  // Desktop hover ease (optional start positioning)
  slider.addEventListener('mousemove', (e) => {
    if (active) return;
    // Let user slide on hover without pressing mouse button for instant responsiveness
    moveSlider(e.clientX);
  });
}

/* --- CHECKOUT & GOOGLE PAY SIMULATOR --- */
function initCheckout() {
  const modal = document.getElementById('checkout-modal');
  const overlay = document.getElementById('modal-overlay');
  const closeBtn = document.getElementById('close-drawer-btn');
  const buyBtns = document.querySelectorAll('.buy-btn');
  
  // Summary Fields
  const productName = document.getElementById('summary-product-name');
  const productPrice = document.getElementById('summary-product-price');
  const totalPrice = document.getElementById('summary-total-price');
  const cardPayPrice = document.getElementById('card-pay-price');
  const cardPayPriceUk = document.getElementById('card-pay-price-uk');
  const cardPayPriceRu = document.getElementById('card-pay-price-ru');
  
  // Checkout & Pay actions
  const checkoutForm = document.getElementById('checkout-form');
  const emailInput = document.getElementById('checkout-email');
  const gpayBtn = document.getElementById('gpay-btn');
  const gpayOverlay = document.getElementById('gpay-overlay');
  const gpayStatus = document.getElementById('gpay-status');
  
  // Lead magnet form
  const freebieForm = document.getElementById('freebie-form');
  const freebieSuccess = document.getElementById('freebie-success-msg');

  if (!modal) return;

  let activeProduct = "";
  let activePrice = "";

  // Open Checkout Drawer
  buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      activeProduct = btn.getAttribute('data-product');
      activePrice = btn.getAttribute('data-price');
      
      // Update checkout drawer info
      productName.textContent = activeProduct;
      productPrice.textContent = `$${activePrice}`;
      totalPrice.textContent = `$${activePrice}`;
      
      if (cardPayPrice) cardPayPrice.textContent = `$${activePrice}`;
      if (cardPayPriceUk) cardPayPriceUk.textContent = `$${activePrice}`;
      if (cardPayPriceRu) cardPayPriceRu.textContent = `$${activePrice}`;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close Checkout Drawer
  const closeCheckout = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (overlay) overlay.addEventListener('click', closeCheckout);
  if (closeBtn) closeBtn.addEventListener('click', closeCheckout);
  
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeCheckout();
    }
  });

  // Multilingual status arrays for Google Pay loading simulation
  const statuses = {
    en: [
      "Authorizing transaction...",
      "Verifying secure payment details...",
      "Generating download link...",
      "Preparing your CozyColor digital book..."
    ],
    uk: [
      "Авторизація транзакції...",
      "Перевірка безпечного з'єднання...",
      "Генерація посилання на скачування...",
      "Формування книги CozyColor..."
    ],
    ru: [
      "Авторизация транзакции...",
      "Проверка безопасного соединения...",
      "Генерация ссылки на скачивание...",
      "Формирование книги CozyColor..."
    ]
  };

  // Simulated Payment Procedure (Works for both GPay & Card submit)
  const triggerPaymentSimulation = () => {
    const emailValue = emailInput.value.trim();
    if (!emailValue) {
      emailInput.focus();
      return;
    }

    const currentLang = document.documentElement.getAttribute('data-lang') || 'en';
    const langStatuses = statuses[currentLang] || statuses['en'];

    // Show Google Pay overlay
    gpayOverlay.classList.add('active');
    
    // Cycle text messages over 3 seconds
    let stage = 0;
    gpayStatus.innerHTML = langStatuses[stage];
    
    const interval = setInterval(() => {
      stage++;
      if (stage < langStatuses.length) {
        gpayStatus.innerHTML = langStatuses[stage];
      }
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      // Redirect to Thank You Page with order query parameters
      const encodedEmail = encodeURIComponent(emailValue);
      const encodedProduct = encodeURIComponent(activeProduct);
      const encodedPrice = encodeURIComponent(activePrice);
      
      window.location.href = `thankyou.html?email=${encodedEmail}&product=${encodedProduct}&price=${encodedPrice}`;
    }, 3200);
  };

  // Google Pay Button Click
  if (gpayBtn) {
    gpayBtn.addEventListener('click', () => {
      // Validate email before trigger
      if (checkoutForm.checkValidity()) {
        triggerPaymentSimulation();
      } else {
        emailInput.reportValidity();
      }
    });
  }

  // Card Pay Form Submit
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerPaymentSimulation();
  });

  // Lead Magnet / Freebie Form Submit
  if (freebieForm) {
    freebieForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual feedback loading state
      const formInput = freebieForm.querySelector('.form-input');
      const submitBtn = freebieForm.querySelector('button[type="submit"]');
      
      formInput.disabled = true;
      submitBtn.disabled = true;
      
      setTimeout(() => {
        freebieForm.style.display = 'none';
        freebieSuccess.style.display = 'block';
      }, 1000);
    });
  }
}

/* --- BACK TO TOP BUTTON LOGIC --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  // Toggle button visibility on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('active');
    } else {
      backToTopBtn.classList.remove('active');
    }
  });

  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
