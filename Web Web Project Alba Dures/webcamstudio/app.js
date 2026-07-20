document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.quiz-step');
  const progressBar = document.querySelector('.progress-bar');
  const btnPrev = document.querySelector('.btn-prev');
  const btnNext = document.querySelector('.btn-next');
  let currentStep = 0;
  
  // Store quiz answers
  const answers = {
    experience: '',
    english: '',
    timeframe: '',
    contactName: '',
    contactTelegram: ''
  };

  // Update Progress Bar
  const updateProgress = () => {
    const totalSteps = steps.length - 1; // exclude success screen
    const percent = ((currentStep) / totalSteps) * 100;
    progressBar.style.width = `${percent}%`;
  };

  // Show Active Step
  const showStep = (index) => {
    steps.forEach((step, idx) => {
      if (idx === index) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    // Handle back button visibility
    if (index === 0 || index === steps.length - 1) {
      btnPrev.style.visibility = 'hidden';
    } else {
      btnPrev.style.visibility = 'visible';
    }

    // Handle next button visibility / text
    if (index === steps.length - 2) {
      btnNext.innerText = 'Отправить заявку';
    } else if (index === steps.length - 1) {
      // Hide navigation entirely on success screen
      document.querySelector('.quiz-navigation').style.display = 'none';
      document.querySelector('.quiz-progress').style.display = 'none';
    } else {
      btnNext.innerText = 'Далее';
      btnNext.style.visibility = 'visible';
    }
  };

  // Option selection handler
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const parentStep = button.closest('.quiz-step');
      const stepIndex = Array.from(steps).indexOf(parentStep);
      
      // Remove selected class from siblings in this step
      parentStep.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
      });

      // Add selected class to clicked button
      button.classList.add('selected');
      
      // Store answer
      const answerValue = button.getAttribute('data-value');
      if (stepIndex === 0) answers.experience = answerValue;
      if (stepIndex === 1) answers.english = answerValue;
      if (stepIndex === 2) answers.timeframe = answerValue;
      
      // Automatically advance step after 300ms for option slides
      setTimeout(() => {
        if (currentStep < steps.length - 2) {
          currentStep++;
          showStep(currentStep);
          updateProgress();
        }
      }, 300);
    });
  });

  // Next button click handler
  btnNext.addEventListener('click', () => {
    // Validation check for current step
    if (currentStep < steps.length - 2) {
      // Check if option is selected
      const activeStep = steps[currentStep];
      const selectedOption = activeStep.querySelector('.option-btn.selected');
      if (!selectedOption) {
        alert('Пожалуйста, выберите один из вариантов ответа.');
        return;
      }
      currentStep++;
      showStep(currentStep);
      updateProgress();
    } else if (currentStep === steps.length - 2) {
      // Form submit validation
      const nameInput = document.getElementById('model-name');
      const telegramInput = document.getElementById('model-telegram');
      
      if (!nameInput.value.trim()) {
        alert('Пожалуйста, введите ваше имя.');
        return;
      }
      if (!telegramInput.value.trim()) {
        alert('Пожалуйста, введите ваш ник в Telegram или телефон.');
        return;
      }

      answers.contactName = nameInput.value;
      answers.contactTelegram = telegramInput.value;

      console.log('Sending Quiz Answers to Tilda/n8n:', answers);

      // Transition to success step
      currentStep++;
      showStep(currentStep);
      updateProgress();
    }
  });

  // Prev button click handler
  btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
      updateProgress();
    }
  });

  // Scroll to Top Button Logic
  const btnScrollTop = document.getElementById('btn-scroll-top');

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

  // Initialize
  showStep(currentStep);
  updateProgress();
});
