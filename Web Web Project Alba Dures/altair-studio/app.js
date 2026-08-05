document.addEventListener('DOMContentLoaded', () => {
    // Apartments Slider Logic
    const slider = document.getElementById('apartments-slider');
    const prevBtn = document.getElementById('slide-prev');
    const nextBtn = document.getElementById('slide-next');

    if (slider && prevBtn && nextBtn) {
        let currentIndex = 0;
        const totalSlides = slider.children.length;

        function updateSlider() {
            const slideWidth = slider.children[0].clientWidth;
            const gap = 20; // Matches CSS gap
            const offset = currentIndex * (slideWidth + gap);
            slider.style.transform = `translateX(-${offset}px)`;

            // Disable buttons if we reach ends
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

            // On desktop, we show 3 items, so max index is totalSlides - 3
            const maxVisible = window.innerWidth > 991 ? (window.innerWidth > 768 ? 3 : 2) : 1;
            const maxIndex = Math.max(0, totalSlides - maxVisible);
            
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
        }

        nextBtn.addEventListener('click', () => {
            const maxVisible = window.innerWidth > 991 ? (window.innerWidth > 768 ? 3 : 2) : 1;
            const maxIndex = Math.max(0, totalSlides - maxVisible);
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateSlider();
            }
        });

        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });

        // Handle window resize to recalculate slide offsets
        window.addEventListener('resize', updateSlider);
        
        // Initial call
        setTimeout(updateSlider, 100);
    }

    // Interactive Calculator Logic
    const expNo = document.getElementById('exp-no');
    const expYes = document.getElementById('exp-yes');
    const englishBtns = document.querySelectorAll('.english-btn');
    const hoursSlider = document.getElementById('hours-slider');
    const hoursDisplay = document.getElementById('hours-display');
    const incomeValue = document.getElementById('income-value');

    if (expNo && expYes && hoursSlider && incomeValue) {
        let hasExperience = false;
        let englishLevel = 'beg';
        let weeklyHours = 40;

        const baseRates = {
            noExp: {
                'beg': 15,
                'mid': 22,
                'mid-plus': 28,
                'adv': 35
            },
            withExp: {
                'beg': 25,
                'mid': 35,
                'mid-plus': 45,
                'adv': 55
            }
        };

        function calculateIncome() {
            const rates = hasExperience ? baseRates.withExp : baseRates.noExp;
            const hourlyRate = rates[englishLevel];
            
            // Monthly calculation: hours/week * rate/hour * 4 weeks
            // Add +10% marketing multiplier as requested by Lina
            let baseIncome = weeklyHours * hourlyRate * 4 * 1.1;

            // Generate range: min is 90%, max is 110%
            let minIncome = Math.round(baseIncome * 0.9);
            let maxIncome = Math.round(baseIncome * 1.1);

            // Format numbers with comma separator
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            });

            incomeValue.textContent = `${formatter.format(minIncome)} - ${formatter.format(maxIncome)}`;
        }

        // Toggle Experience listeners
        expNo.addEventListener('click', () => {
            expNo.classList.add('active');
            expYes.classList.remove('active');
            hasExperience = false;
            calculateIncome();
        });

        expYes.addEventListener('click', () => {
            expYes.classList.add('active');
            expNo.classList.remove('active');
            hasExperience = true;
            calculateIncome();
        });

        // English Level listeners
        englishBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                englishBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                englishLevel = btn.getAttribute('data-level');
                calculateIncome();
            });
        });

        // Hours Slider listener
        hoursSlider.addEventListener('input', (e) => {
            weeklyHours = parseInt(e.target.value);
            hoursDisplay.textContent = `${weeklyHours} часов`;
            calculateIncome();
        });

        // Initialize calculator math
        calculateIncome();
    }

    // Receipt Modal Lightbox Logic
    const modal = document.getElementById('receipt-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');
    const proofThumbnails = document.querySelectorAll('.proof-thumbnail-wrapper');

    if (modal && modalImg && modalClose) {
        proofThumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                const imgSrc = thumb.getAttribute('data-modal-src');
                modalImg.src = imgSrc;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Lock scrolling
            });
        });

        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock scrolling
            setTimeout(() => {
                modalImg.src = '';
            }, 300);
        };

        modalClose.addEventListener('click', closeModal);

        // Close when clicking background outside the image content wrapper
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // FAQ Accordion Spoller Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Collapse all items first for a single-open accordion feel
                faqItems.forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.faq-content').style.maxHeight = null;
                });

                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // Telegram Bot Notifications Integration
    const botToken = '8966078008:AAFA_xI5-tAk7i8Bq916UiT0v3UCk07onp8';
    const chatId = '8799751763';
    const botRedirectUrl = 'https://t.me/webcamstudio_top_Bot';

    function sendTelegramMessage(text) {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'HTML'
            })
        });
    }

    // Lead Form Submit Hook (Calculator)
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = leadForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            const name = document.getElementById('form-name').value;
            const tg = document.getElementById('form-tg').value;

            // Get selected English level label text
            const activeEnglishBtn = document.querySelector('.english-btn.active');
            const englishText = activeEnglishBtn ? activeEnglishBtn.textContent : 'Начальный';

            const expText = document.getElementById('exp-yes').classList.contains('active') ? 'С опытом' : 'Без опыта';
            const hoursVal = document.getElementById('hours-slider').value;
            const incomeValText = document.getElementById('income-value').textContent;

            const msgText = `🔔 <b>Новая заявка: Расчет дохода Altair</b>\n\n` +
                            `👤 <b>Имя:</b> ${name}\n` +
                            `📱 <b>Telegram:</b> ${tg}\n\n` +
                            `📊 <b>Параметры расчета:</b>\n` +
                            `• Опыт: ${expText}\n` +
                            `• Английский: ${englishText}\n` +
                            `• Часы в неделю: ${hoursVal} ч.\n` +
                            `💰 <b>Расчетный доход:</b> ${incomeValText}`;

            sendTelegramMessage(msgText)
                .then(response => {
                    if (response.ok) {
                        // Open Telegram Bot in a new tab for onboarding greeting message
                        window.open(botRedirectUrl, '_blank');
                        alert('Расчет успешно отправлен! Менеджер свяжется с вами, а вы можете продолжить общение с ботом в открывшейся вкладке.');
                        leadForm.reset();
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    } else {
                        alert('Произошла ошибка при отправке. Пожалуйста, свяжитесь с нами напрямую.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }
                })
                .catch(err => {
                    console.error('Telegram Send Error:', err);
                    alert('Ошибка сети. Попробуйте еще раз.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Call Request Form Submit Hook
    const callForm = document.getElementById('call-request-form');
    if (callForm) {
        callForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = callForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            const name = document.getElementById('call-name').value;
            const tg = document.getElementById('call-tg').value;

            const msgText = `📞 <b>Заявка: Звонок модели Altair</b>\n\n` +
                            `👤 <b>Имя:</b> ${name}\n` +
                            `📱 <b>Telegram:</b> ${tg}\n\n` +
                            `💬 <i>Модель свяжется для анонимного созвона или переписки в Telegram.</i>`;

            sendTelegramMessage(msgText)
                .then(response => {
                    if (response.ok) {
                        alert('Заявка успешно отправлена! Менеджер и модель напишут вам в ближайшее время.');
                        callForm.reset();
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    } else {
                        alert('Произошла ошибка при отправке. Пожалуйста, свяжитесь с нами напрямую.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    }
                })
                .catch(err => {
                    console.error('Telegram Send Error:', err);
                    alert('Ошибка сети. Попробуйте еще раз.');
                    submitBtn.textContent = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }

    // Video reviews playback logic
    const videoContainers = document.querySelectorAll('.video-thumbnail-container');
    videoContainers.forEach(container => {
        container.addEventListener('click', () => {
            const videoSrc = container.getAttribute('data-video-src');
            if (videoSrc) {
                // If a video element is already present, do nothing
                if (container.querySelector('video')) return;

                // Create video element
                const videoEl = document.createElement('video');
                videoEl.src = videoSrc;
                videoEl.autoplay = true;
                videoEl.muted = false; // Enable audio for user-triggered click play!
                videoEl.loop = true;
                videoEl.controls = true; // Show native volume and timeline controls
                videoEl.playsInline = true;
                videoEl.className = 'blurred-model-face'; // Direct CSS filter blur on the entire video frame
                videoEl.style.width = '100%';
                videoEl.style.height = '100%';
                videoEl.style.objectFit = 'cover';

                // Error logger
                videoEl.addEventListener('error', (e) => {
                    console.error("Video loading error:", videoEl.error);
                });

                // Clear container and insert video
                container.innerHTML = '';
                container.appendChild(videoEl);

                // Explicit play call with error catch
                videoEl.play().catch(err => {
                    console.warn("Playback with audio failed, trying muted play:", err);
                    videoEl.muted = true;
                    videoEl.play().catch(e => console.error("Muted play failed too:", e));
                });
            }
        });
    });

    // Image compare slider logic
    const sliderBox = document.getElementById('compare-slider-box');
    if (sliderBox) {
        const afterLayer = document.getElementById('after-layer-mask');
        const afterImg = afterLayer.querySelector('img');
        const handle = document.getElementById('slider-handle-bar');
        
        let isDragging = false;

        // Helper function to update slider width and handle position
        const updateSlider = (clientX) => {
            const rect = sliderBox.getBoundingClientRect();
            let x = clientX - rect.left;
            
            // Clamp boundaries
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;
            
            const percentage = (x / rect.width) * 100;
            
            // Update layer width and handle left position
            afterLayer.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Handle scaling of clipped image to prevent squishing
        const resizeImage = () => {
            afterImg.style.width = `${sliderBox.offsetWidth}px`;
        };

        // Setup resize observer and load event listeners
        window.addEventListener('resize', resizeImage);
        afterImg.addEventListener('load', resizeImage);
        
        // Initial scale
        resizeImage();

        // Event Listeners for dragging
        const startDragging = (e) => {
            isDragging = true;
            // Prevent text selection while dragging
            if (e.cancelable) e.preventDefault();
        };

        const stopDragging = () => {
            isDragging = false;
        };

        const handleMove = (e) => {
            if (!isDragging) return;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            updateSlider(clientX);
        };

        // Mouse Events
        handle.addEventListener('mousedown', startDragging);
        window.addEventListener('mouseup', stopDragging);
        window.addEventListener('mousemove', handleMove);

        // Touch Events (Mobile support!)
        handle.addEventListener('touchstart', startDragging, { passive: true });
        window.addEventListener('touchend', stopDragging);
        window.addEventListener('touchmove', handleMove, { passive: true });
        
        // Allow click on container to jump directly to percentage
        sliderBox.addEventListener('click', (e) => {
            if (e.target !== handle && !handle.contains(e.target)) {
                updateSlider(e.clientX);
            }
        });
    }

    // Language switcher toggle
    const langBtns = document.querySelectorAll('.lang-btn');
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.textContent === 'KZ') {
                alert('Казахская версия страницы находится в разработке и будет доступна во второй фазе запуска.');
                // Revert selection back to RU since KZ translation is not loaded
                setTimeout(() => {
                    btn.classList.remove('active');
                    document.querySelector('.lang-switcher .lang-btn:first-child').classList.add('active');
                }, 100);
            }
        });
    });

    // Back to top button logic
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});





