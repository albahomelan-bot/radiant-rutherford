document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initLang();
  initModal();
  initMobileMenu();
  initHeaderScroll();
  initScrollSpy();
  initProjectFilter();
  initContactForm();
  initScrollReveal();
});

/* --- THEME TOGGLE & PERSISTENCE --- */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;

  // Retrieve current theme from local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (systemPrefersLight ? 'light' : 'dark');

  // Apply theme
  document.documentElement.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Smooth transition block
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* --- MOBILE NAVIGATION DRAWER --- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuBtn || !navMenu) return;

  const toggleMenu = () => {
    menuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Toggle body scroll to prevent background scrolling when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  };

  menuBtn.addEventListener('click', toggleMenu);

  // Close menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside of it
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !menuBtn.contains(e.target)) {
      toggleMenu();
    }
  });
}

/* --- STICKY HEADER --- */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  // Trigger on load in case page is refreshed while scrolled
  handleScroll();
}

/* --- SCROLL SPY ACTIVE LINKS --- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const spyOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Trigger when section occupies the center screen
    threshold: 0
  };

  const spyCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(spyCallback, spyOptions);
  sections.forEach(section => observer.observe(section));
}

/* --- PROJECTS GRID CATEGORY FILTER --- */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter btn class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Custom animation transition for filtration
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px) scale(0.95)';
        
        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            // Slight timeout to let layout compute before animating back in
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

/* --- FORM VALIDATION & INTERACTIVE STATE --- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  if (!form) return;

  const inputs = form.querySelectorAll('.form-input');
  
  // Clear error classes on typing
  inputs.forEach(input => {
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) {
        input.classList.remove('invalid');
      }
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Field checks
    inputs.forEach(input => {
      if (input.hasAttribute('required') && !input.value.trim()) {
        input.classList.add('invalid');
        isValid = false;
      }
      
      // Basic Email structure check
      if (input.getAttribute('type') === 'email' && input.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value.trim())) {
          input.classList.add('invalid');
          isValid = false;
        }
      }
    });

    if (isValid) {
      handleFormSubmitSuccess(form);
    }
  });
}

function handleFormSubmitSuccess(form) {
  const submitBtn = document.getElementById('form-submit-btn');
  const originalBtnHTML = submitBtn.innerHTML;

  // Set visual loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...';

  // Simulate network request latency
  setTimeout(() => {
    // Show glassmorphic success box inside the form panel
    const formPanel = form.parentElement;
    formPanel.style.minHeight = `${formPanel.offsetHeight}px`;
    
    // Smooth transition
    formPanel.innerHTML = `
      <div class="flex-center" style="flex-direction: column; height: 100%; text-align: center; padding: 40px 20px; animation: fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;">
        <div class="flex-center" style="width: 80px; height: 80px; border-radius: 50%; background: rgba(0, 242, 254, 0.1); border: 2px solid var(--accent-primary); color: var(--accent-primary); font-size: 2.2rem; margin-bottom: 24px; box-shadow: 0 0 20px rgba(0, 242, 254, 0.25);">
          <i class="fa-solid fa-check"></i>
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 12px; font-family: var(--font-heading);">Message Broadcasted!</h3>
        <p style="color: var(--text-secondary); max-width: 320px; margin-bottom: 32px;">
          Thank you for reaching out. Your message has been sent successfully. Andrii will contact you shortly.
        </p>
        <button id="reset-form-btn" class="btn btn-secondary">Send Another Message</button>
      </div>
    `;

    // Listen to form reset button
    document.getElementById('reset-form-btn').addEventListener('click', () => {
      location.reload(); // Reload or manually rebuild the HTML structure
    });
  }, 2000);
}

/* --- SCROLL REVEAL (INTERSECTION OBSERVER) --- */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  if (!revealElements.length) return;

  const revealOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px', // Trigger slightly before element enters view
    threshold: 0.15
  };

  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Stop tracking after animating once
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(revealCallback, revealOptions);
  
  revealElements.forEach(el => {
    observer.observe(el);
  });
}

/* --- LANGUAGE SWITCHER --- */
function initLang() {
  const langToggle = document.getElementById('lang-toggle');
  const langCurrent = document.getElementById('lang-current');
  if (!langToggle || !langCurrent) return;

  // Retrieve current language from local storage
  const savedLang = localStorage.getItem('lang') || 'en';
  document.documentElement.setAttribute('data-lang', savedLang);
  langCurrent.textContent = savedLang.toUpperCase();

  langToggle.addEventListener('click', () => {
    const currentLang = document.documentElement.getAttribute('data-lang');
    const newLang = currentLang === 'en' ? 'uk' : 'en';
    
    document.documentElement.setAttribute('data-lang', newLang);
    langCurrent.textContent = newLang.toUpperCase();
    localStorage.setItem('lang', newLang);
  });
}

/* --- CASE STUDY DETAIL MODAL --- */
function initModal() {
  const modal = document.getElementById('case-study-modal');
  const openBtns = document.querySelectorAll('.open-modal-btn');
  const closeBtn = document.getElementById('modal-close-btn');

  if (!modal || !closeBtn) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);
  
  // Close on click outside card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}


