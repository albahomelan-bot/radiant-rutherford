// 1. FIXED HEADER ON SCROLL
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// 2. MOBILE MENU TOGGLE (Placeholder logic)
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Change toggle button state
    menuToggle.classList.toggle('open');
  });
}

// 3. INTERACTIVE BEFORE/AFTER SLIDER (INTERIORS)
const slider = document.getElementById('compare-slider');
const handle = document.getElementById('compare-handle');
const overlay = document.querySelector('.overlay-layer');
const overlayImg = document.querySelector('.overlay-layer .compare-img');

if (slider && handle && overlay) {
  // Update overlay image width to match the slider container width on resize
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      if (overlayImg) {
        overlayImg.style.width = `${entry.contentRect.width}px`;
      }
    }
  });
  resizeObserver.observe(slider);

  const moveSlider = (clientX) => {
    const rect = slider.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    
    // Bounds clamping (0% to 100%)
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    // Move handle & adjust overlay width
    handle.style.left = `${percentage}%`;
    overlay.style.width = `${percentage}%`;
  };

  // Mouse events
  slider.addEventListener('mousemove', (e) => {
    // Only move if mouse is hovered
    moveSlider(e.clientX);
  });

  // Touch events (for mobile)
  slider.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
  }, { passive: true });
}

// 4. FAQ ACCORDION (SPOLERS)
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const body = header.nextElementSibling;
    const isActive = item.classList.contains('active');
    
    // Close other items
    document.querySelectorAll('.accordion-item').forEach(otherItem => {
      otherItem.classList.remove('active');
      otherItem.querySelector('.accordion-body').style.maxHeight = null;
    });
    
    // Toggle current item
    if (!isActive) {
      item.classList.add('active');
      body.style.maxHeight = `${body.scrollHeight}px`;
    }
  });
});

// 5. VIDEO REVIEWS CONTROLLER (Tap to Play/Pause & Autostop)
function playReviewVideo(card) {
  const video = card.querySelector('.review-video');
  const allCards = document.querySelectorAll('.review-card');
  
  // If this card is already playing, pause it and reset
  if (card.classList.contains('playing')) {
    video.pause();
    card.classList.remove('playing');
    return;
  }
  
  // Stop all other videos first
  allCards.forEach(otherCard => {
    otherCard.classList.remove('playing');
    const otherVideo = otherCard.querySelector('.review-video');
    if (otherVideo) {
      otherVideo.pause();
      otherVideo.currentTime = 0;
    }
  });
  
  // Play this video
  card.classList.add('playing');
  video.play().catch(err => {
    console.log("Video play interrupted:", err);
  });
}

// 6. MODAL SYSTEM
const modal = document.getElementById('request-modal');

function openModal() {
  if (modal) {
    modal.classList.add('open');
  }
}

function closeModal() {
  if (modal) {
    modal.classList.remove('open');
  }
}

// Close modal when clicking outside dialog
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// 7. FORM SUBMISSION (INTEGRATES WITH n8n WEBHOOK)
function submitForm(event) {
  event.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const name = document.getElementById('form-name').value;
  const contact = document.getElementById('form-contact').value;
  const vacancy = document.getElementById('form-vacancy').value;
  
  const leadData = {
    source: "K-MODELS SPB Landing Page",
    name: name,
    contact: contact,
    vacancy: vacancy,
    submittedAt: new Date().toISOString()
  };
  
  // Set button state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = "ОТПРАВКА...";
  }

  // REPLACE THIS URL with your actual n8n Webhook URL
  const N8N_WEBHOOK_URL = "https://albasever.app.n8n.cloud/webhook/your-lead-receiver-id";

  fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(leadData),
    mode: 'no-cors' // allows cross-origin webhook calls
  })
  .then(() => {
    alert("Дякуємо! Вашу заявку успішно надіслано. Менеджер зв'яжеться з вами найближчим часом.");
    closeModal();
    document.getElementById('lead-form').reset();
  })
  .catch(err => {
    console.error("Error sending lead to n8n:", err);
    // Even if it fails, we fall back to a positive alert for testing
    alert("Дякуємо! Заявку зареєстровано (демо-режим).");
    closeModal();
  })
  .finally(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = "ОТПРАВИТЬ ЗАЯВКУ";
    }
  });
}
