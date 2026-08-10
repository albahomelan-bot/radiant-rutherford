document.addEventListener('DOMContentLoaded', () => {
    // Apartments Slider Logic (Infinite Auto-sliding Carousel)
    const slider = document.getElementById('apartments-slider');
    const prevBtn = document.getElementById('slide-prev');
    const nextBtn = document.getElementById('slide-next');

    if (slider && prevBtn && nextBtn) {
        let isTransitioning = false;
        
        function slideNext() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const firstChild = slider.children[0];
            const slideWidth = firstChild.clientWidth;
            const gap = 15; // Matches mobile gap
            
            slider.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            slider.style.transform = `translateX(-${slideWidth + gap}px)`;
            
            setTimeout(() => {
                slider.style.transition = 'none';
                slider.appendChild(firstChild);
                slider.style.transform = 'translateX(0)';
                isTransitioning = false;
            }, 600);
        }
        
        function slidePrev() {
            if (isTransitioning) return;
            isTransitioning = true;
            
            const lastChild = slider.children[slider.children.length - 1];
            const slideWidth = lastChild.clientWidth;
            const gap = 15;
            
            slider.style.transition = 'none';
            slider.insertBefore(lastChild, slider.children[0]);
            slider.style.transform = `translateX(-${slideWidth + gap}px)`;
            
            // Force reflow
            slider.offsetHeight;
            
            slider.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            slider.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioning = false;
            }, 600);
        }
        
        nextBtn.addEventListener('click', slideNext);
        prevBtn.addEventListener('click', slidePrev);
        
        // Autoplay every 3 seconds (both desktop and mobile)
        let autoPlayInterval = setInterval(slideNext, 3000);
        
        // Pause autoplay on mouse enter, resume on mouse leave
        const block = document.getElementById('apartments');
        if (block) {
            block.addEventListener('mouseenter', () => {
                clearInterval(autoPlayInterval);
            });
            block.addEventListener('mouseleave', () => {
                autoPlayInterval = setInterval(slideNext, 3000);
            });
            
            // Touch events for mobile dragging / swipe
            let aptStartX = 0;
            let aptCurrentX = 0;
            let aptIsDragging = false;
            
            block.addEventListener('touchstart', (e) => {
                clearInterval(autoPlayInterval);
                aptStartX = e.touches[0].clientX;
                aptCurrentX = aptStartX;
                aptIsDragging = true;
            }, { passive: true });
            
            block.addEventListener('touchmove', (e) => {
                if (!aptIsDragging) return;
                aptCurrentX = e.touches[0].clientX;
            }, { passive: true });
            
            block.addEventListener('touchend', () => {
                if (!aptIsDragging) return;
                aptIsDragging = false;
                const diffX = aptStartX - aptCurrentX;
                if (Math.abs(diffX) > 50) {
                    if (diffX > 0) {
                        slideNext();
                    } else {
                        slidePrev();
                    }
                }
                autoPlayInterval = setInterval(slideNext, 3000);
            });
        }
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

        function calculateIncome() {
            let rateMin, rateMax;

            if (hasExperience) {
                if (englishLevel === 'adv' || englishLevel === 'mid-plus') {
                    // Top model (maximum 12-15k per month with content at 60 hours)
                    rateMin = 350;
                    rateMax = 400;
                } else {
                    // Experienced intermediate
                    rateMin = 300;
                    rateMax = 350;
                }
            } else {
                if (englishLevel === 'adv') {
                    // No experience, but perfect English
                    rateMin = 300;
                    rateMax = 350;
                } else if (englishLevel === 'mid-plus' || englishLevel === 'mid') {
                    // No experience, intermediate English
                    rateMin = 260;
                    rateMax = 320;
                } else {
                    // No experience, basic English (maximum 8500 per month with content at 35-40 hours)
                    rateMin = 230;
                    rateMax = 300;
                }
            }

            // Standard shift is 7 hours. Calculate shifts per month (assuming 4 weeks)
            const shiftsPerMonth = (weeklyHours / 7) * 4;

            // Monthly content income addition (up to $1,500)
            const contentMin = 1000;
            const contentMax = 1500;

            const minIncome = Math.round(shiftsPerMonth * rateMin + contentMin);
            const maxIncome = Math.round(shiftsPerMonth * rateMax + contentMax);

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
            let startX = 0;
            let startY = 0;
            let moveLimit = 10;
            let hasMoved = false;

            thumb.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                hasMoved = false;
            }, { passive: true });

            thumb.addEventListener('touchmove', (e) => {
                const diffX = Math.abs(e.touches[0].clientX - startX);
                const diffY = Math.abs(e.touches[0].clientY - startY);
                if (diffX > moveLimit || diffY > moveLimit) {
                    hasMoved = true;
                }
            }, { passive: true });

            thumb.addEventListener('touchend', () => {
                if (!hasMoved) {
                    const imgSrc = thumb.getAttribute('data-modal-src');
                    modalImg.src = imgSrc;
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });

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
                const isOpen = item.classList.contains('open');

                // Collapse all items first for a single-open accordion feel
                faqItems.forEach(i => {
                    i.classList.remove('open');
                    const c = i.querySelector('.faq-content');
                    if (c) c.style.maxHeight = null;
                });

                if (!isOpen) {
                    item.classList.add('open');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });

    // Telegram Bot Notifications Integration
    const botToken = '8966078008:AAFB5iWBue64JFBuTBgj_8AE10BjXOTjfIE';
    const chatId = '5747965677';
    const botRedirectUrl = 'https://t.me/Dream_Geo1';

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

    // Helper to sanitize and validate Telegram handles or links
    function sanitizeAndValidateTelegram(val) {
        let value = val.trim();
        if (!value) return null;

        // Check if it is a link or starts with t.me / telegram.me
        if (value.startsWith('http://') || value.startsWith('https://') || value.startsWith('t.me/') || value.startsWith('telegram.me/')) {
            // Extract the username part
            let cleanVal = value.replace('https://', '').replace('http://', '');
            const urlParts = cleanVal.split('/');
            let username = urlParts[urlParts.length - 1];
            // Remove query params if any
            username = username.split('?')[0];
            // Strip @ if present in the link
            if (username.startsWith('@')) {
                username = username.substring(1);
            }
            
            const regex = /^[a-zA-Z0-9_]{5,32}$/;
            if (regex.test(username)) {
                return `https://t.me/${username}`;
            }
            return null;
        }

        // Must start with @ to be considered a valid username
        if (value.startsWith('@')) {
            let username = value.substring(1);
            const regex = /^[a-zA-Z0-9_]{5,32}$/;
            if (regex.test(username)) {
                return '@' + username;
            }
        }

        return null;
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

            const nameInput = document.getElementById('form-name');
            const tgInput = document.getElementById('form-tg');
            const name = nameInput.value.trim();
            const rawTg = tgInput.value.trim();
            const validatedTg = sanitizeAndValidateTelegram(rawTg);

            if (!validatedTg) {
                alert('Пожалуйста, введите корректный Telegram в формате @username или ссылку t.me/username.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            // Write back formatted value to the UI
            tgInput.value = validatedTg;

            // Get selected English level label text
            const activeEnglishBtn = document.querySelector('.english-btn.active');
            const englishText = activeEnglishBtn ? activeEnglishBtn.textContent : 'Начальный';

            const expText = document.getElementById('exp-yes').classList.contains('active') ? 'С опытом' : 'Без опыта';
            const hoursVal = document.getElementById('hours-slider').value;
            const incomeValText = document.getElementById('income-value').textContent;

            const msgText = `🔔 <b>Новая заявка: Расчет дохода Altair</b>\n\n` +
                            `👤 <b>Имя:</b> ${name}\n` +
                            `📱 <b>Telegram:</b> ${validatedTg}\n\n` +
                            `📊 <b>Параметры расчета:</b>\n` +
                            `• Опыт: ${expText}\n` +
                            `• Английский: ${englishText}\n` +
                            `• Часы в неделю: ${hoursVal} ч.\n` +
                            `💰 <b>Расчетный доход:</b> ${incomeValText}`;

            sendTelegramMessage(msgText)
                .then(response => {
                    if (response.ok) {
                        // Open Telegram Manager in a new tab for direct communication
                        window.open(botRedirectUrl, '_blank');
                        alert('Расчет успешно отправлен! Менеджер свяжется с вами, а в открывшейся вкладке вы можете написать ему лично.');
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

            const nameInput = document.getElementById('call-name');
            const tgInput = document.getElementById('call-tg');
            const name = nameInput.value.trim();
            const rawTg = tgInput.value.trim();
            const validatedTg = sanitizeAndValidateTelegram(rawTg);

            if (!validatedTg) {
                alert('Пожалуйста, введите корректный Telegram в формате @username или ссылку t.me/username.');
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            // Write back formatted value to the UI
            tgInput.value = validatedTg;

            const msgText = `📞 <b>Заявка: Звонок модели Altair</b>\n\n` +
                            `👤 <b>Имя:</b> ${name}\n` +
                            `📱 <b>Telegram:</b> ${validatedTg}\n\n` +
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
            
            // Ensure the image width matches the container width dynamically to prevent squishing
            afterImg.style.width = `${rect.width}px`;
            
            // Update layer width and handle left position
            afterLayer.style.width = `${percentage}%`;
            handle.style.left = `${percentage}%`;
        };

        // Handle scaling of clipped image to prevent squishing
        const resizeImage = () => {
            const w = sliderBox.offsetWidth;
            if (w > 0) {
                afterImg.style.width = `${w}px`;
            }
        };

        // Setup resize observer and load event listeners
        window.addEventListener('resize', resizeImage);
        afterImg.addEventListener('load', resizeImage);
        
        // Initial scale
        resizeImage();

        // Event Listeners for dragging
        const startDragging = (e) => {
            isDragging = true;
            if (e.type === 'mousedown') {
                e.preventDefault();
            }
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

        // Touch Events (Mobile support with scrolling prevention while sliding)
        handle.addEventListener('touchstart', startDragging, { passive: false });
        window.addEventListener('touchend', stopDragging);
        window.addEventListener('touchmove', handleMove, { passive: false });
        
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
            
            if (btn.textContent !== 'RU') {
                let langName = '';
                if (btn.textContent === 'KZ') langName = 'Казахская';
                else if (btn.textContent === 'KG') langName = 'Киргизская';
                else if (btn.textContent === 'EN') langName = 'Английская';
                
                alert(`${langName} версия страницы находится в разработке и будет доступна во второй фазе запуска.`);
                
                // Revert selection back to RU
                setTimeout(() => {
                    btn.classList.remove('active');
                    langBtns.forEach(b => {
                        if (b.textContent === 'RU') b.classList.add('active');
                    });
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

    // Stats Count Up Animation & Hearts Background Canvas
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-count');
    
    if (statsSection && statNumbers.length > 0) {
        // Dynamically create and inject the canvas overlay
        const canvas = document.createElement('canvas');
        canvas.id = 'stats-particles-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        statsSection.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrame;
        
        function resizeCanvas() {
            canvas.width = statsSection.clientWidth;
            canvas.height = statsSection.clientHeight;
        }
        
        // Define colors for hearts & stars
        const heartColors = [
            'rgba(255, 0, 127, 0.12)',   // Soft pink
            'rgba(121, 40, 202, 0.12)',  // Soft violet
            'rgba(255, 75, 145, 0.08)'   // Magenta glow
        ];
        const sparkColors = [
            'rgba(214, 186, 92, 0.3)',   // Translucent gold
            'rgba(255, 255, 255, 0.25)', // White/Silver star
            'rgba(200, 200, 200, 0.2)'   // Translucent silver
        ];
        
        class StatsParticle {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height; // Spawn randomly initially so they fill the screen
            }
            
            reset() {
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + Math.random() * 50;
                this.size = Math.random() * 12 + 6;
                this.speedY = -(Math.random() * 0.8 + 0.4);
                this.speedX = Math.random() * 0.4 - 0.2;
                this.alpha = Math.random() * 0.6 + 0.2;
                this.fadeSpeed = Math.random() * 0.002 + 0.001;
                // 40% hearts, 60% sparkles/dots
                const rand = Math.random();
                if (rand < 0.4) {
                    this.type = 'heart';
                    this.color = heartColors[Math.floor(Math.random() * heartColors.length)];
                } else if (rand < 0.8) {
                    this.type = 'star';
                    this.color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                    this.size = Math.random() * 5 + 3;
                } else {
                    this.type = 'dot';
                    this.color = sparkColors[Math.floor(Math.random() * sparkColors.length)];
                    this.size = Math.random() * 3 + 1;
                }
                this.angle = Math.random() * Math.PI * 2;
                this.spinSpeed = Math.random() * 0.01 - 0.005;
            }
            
            update() {
                this.y += this.speedY;
                this.x += this.speedX;
                this.angle += this.spinSpeed;
                
                // Fade out near the top
                if (this.y < 80) {
                    this.alpha -= 0.01;
                }
                
                if (this.y < -30 || this.alpha <= 0) {
                    this.reset();
                }
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                
                if (this.type === 'heart') {
                    // Draw Vector Heart
                    ctx.fillStyle = this.color;
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle);
                    ctx.beginPath();
                    ctx.moveTo(0, this.size / 4);
                    ctx.bezierCurveTo(0, -this.size / 2, -this.size, -this.size / 2, -this.size, this.size / 4);
                    ctx.bezierCurveTo(-this.size, this.size * 0.8, 0, this.size * 1.2, 0, this.size * 1.4);
                    ctx.bezierCurveTo(0, this.size * 1.2, this.size, this.size * 0.8, this.size, this.size / 4);
                    ctx.bezierCurveTo(this.size, -this.size / 2, 0, -this.size / 2, 0, this.size / 4);
                    ctx.closePath();
                    ctx.fill();
                } else if (this.type === 'star') {
                    // Draw 4-point star
                    ctx.fillStyle = this.color;
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.angle);
                    ctx.beginPath();
                    ctx.moveTo(0, -this.size);
                    ctx.lineTo(this.size * 0.25, -this.size * 0.25);
                    ctx.lineTo(this.size, 0);
                    ctx.lineTo(this.size * 0.25, this.size * 0.25);
                    ctx.lineTo(0, this.size);
                    ctx.lineTo(-this.size * 0.25, this.size * 0.25);
                    ctx.lineTo(-this.size, 0);
                    ctx.lineTo(-this.size * 0.25, -this.size * 0.25);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // Soft blurred bubble dot
                    ctx.beginPath();
                    ctx.fillStyle = this.color;
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                
                ctx.restore();
            }
        }
        
        function initParticles() {
            resizeCanvas();
            particles = [];
            // Spawn 35 particles
            for (let i = 0; i < 35; i++) {
                particles.push(new StatsParticle());
            }
        }
        
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            
            animationFrame = requestAnimationFrame(animateParticles);
        }
        
        // Start floating background elements
        initParticles();
        animateParticles();
        window.addEventListener('resize', resizeCanvas);
        
        const countUp = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 2200; // Premium slightly slower duration
            const startTime = performance.now();
            
            // Set starting styles (unblur and fade-in)
            el.style.opacity = '0';
            el.style.filter = 'blur(10px)';
            el.style.transform = 'scale(0.8)';
            el.style.transition = 'filter 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            
            // Force reflow
            el.offsetHeight;
            
            // Trigger transition values
            el.style.opacity = '1';
            el.style.filter = 'blur(0px)';
            el.style.transform = 'scale(1)';
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out Expo formula
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const current = Math.floor(easeProgress * target);
                
                el.textContent = current.toLocaleString('ru-RU');
                
                // Pulsing glow to text-shadow
                const glow = Math.sin(progress * Math.PI) * 10;
                el.style.textShadow = `0 0 ${glow}px rgba(255, 0, 127, 0.6), 0 0 ${glow / 2}px rgba(121, 40, 202, 0.4)`;
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    el.textContent = target.toLocaleString('ru-RU');
                    el.style.textShadow = 'none';
                }
            };
            
            requestAnimationFrame(animate);
        };
        
        const observerOptions = {
            root: null,
            threshold: 0.15
        };
        
        let animated = false;
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    statNumbers.forEach(num => countUp(num));
                    animated = true;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        observer.observe(statsSection);
    }

    // ONLY apply scroll reveal to the first block (.conditions-section)
    const revealElements = document.querySelectorAll('.conditions-section .condition-card, .conditions-section .reveal-title');
    
    // For all other reveal titles and slides, activate them immediately on load
    document.querySelectorAll('.reveal-title, .slide-item, .proof-card').forEach(el => {
        if (!el.closest('.conditions-section')) {
            el.classList.add('active');
        }
    });
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, {
            root: null,
            threshold: 0.1, // Trigger as soon as it enters
            rootMargin: '0px 0px -60px 0px' // Very small offset so headers/cards appear immediately without creating blank spaces
        });
        
        revealElements.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }

    // Reveal-left observer for elements inside conditions-section (none exist, but we keep structure)
    const revealLeftElements = document.querySelectorAll('.conditions-section .reveal-left');
    
    // Activate all other reveal-left elements immediately
    document.querySelectorAll('.reveal-left').forEach(el => {
        if (!el.closest('.conditions-section')) {
            el.classList.add('revealed');
        }
    });
    
    if (revealLeftElements.length > 0) {
        const revealLeftObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.15, // Require 15% of the card to be visible
            rootMargin: '0px 0px -30% 0px' // Trigger when the sliding card is 30% up from the bottom of the screen
        });
        
        revealLeftElements.forEach((el) => {
            // Reset delay by grouping within its parent container
            const parent = el.parentElement;
            if (parent) {
                const siblings = Array.from(parent.querySelectorAll('.reveal-left'));
                const index = siblings.indexOf(el);
                if (index !== -1) {
                    el.style.transitionDelay = (index * 0.15) + 's';
                }
            } else {
                el.style.transitionDelay = '0s';
            }
            revealLeftObserver.observe(el);
        });
    }


    // Proofs Slider Logic (Infinite Auto-sliding Carousel for Mobile and Desktop)
    const proofsGrid = document.querySelector('.proofs-grid');
    const proofsWrapper = document.querySelector('.proofs-slider-wrapper');
    
    if (proofsGrid && proofsWrapper) {
        let proofsInterval;
        let isTransitioningProofs = false;
        let pStartX = 0;
        let pCurrentX = 0;
        let pIsDragging = false;
        
        function slideNextProof() {
            if (isTransitioningProofs) return;
            isTransitioningProofs = true;
            
            const firstChild = proofsGrid.children[0];
            const cardWidth = firstChild.clientWidth;
            const gap = 20; // Matches CSS gap
            
            proofsGrid.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            proofsGrid.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            setTimeout(() => {
                proofsGrid.style.transition = 'none';
                proofsGrid.appendChild(firstChild);
                proofsGrid.style.transform = 'translateX(0)';
                isTransitioningProofs = false;
            }, 600);
        }
        
        function slidePrevProof() {
            if (isTransitioningProofs) return;
            isTransitioningProofs = true;
            
            const lastChild = proofsGrid.children[proofsGrid.children.length - 1];
            const cardWidth = lastChild.clientWidth;
            const gap = 20;
            
            proofsGrid.style.transition = 'none';
            proofsGrid.insertBefore(lastChild, proofsGrid.children[0]);
            proofsGrid.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            proofsGrid.offsetHeight; // reflow
            
            proofsGrid.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            proofsGrid.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioningProofs = false;
            }, 600);
        }
        
        function startProofsAutoplay() {
            clearInterval(proofsInterval);
            proofsInterval = setInterval(slideNextProof, 3000);
        }
        
        function stopProofsAutoplay() {
            clearInterval(proofsInterval);
        }
        
        // Start autoplay on load
        startProofsAutoplay();
        
        // Touch events for mobile dragging / swipe
        proofsWrapper.addEventListener('touchstart', (e) => {
            stopProofsAutoplay();
            pStartX = e.touches[0].clientX;
            pCurrentX = pStartX;
            pIsDragging = true;
        }, { passive: true });
        
        proofsWrapper.addEventListener('touchmove', (e) => {
            if (!pIsDragging) return;
            pCurrentX = e.touches[0].clientX;
        }, { passive: true });
        
        proofsWrapper.addEventListener('touchend', () => {
            if (!pIsDragging) return;
            pIsDragging = false;
            const diffX = pStartX - pCurrentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    slideNextProof();
                } else {
                    slidePrevProof();
                }
            }
            startProofsAutoplay();
        });
        
        proofsWrapper.addEventListener('mouseenter', stopProofsAutoplay);
        proofsWrapper.addEventListener('mouseleave', startProofsAutoplay);
    }

    // VNZH Slider Logic (Infinite Auto-sliding Carousel for Mobile and Desktop)
    const vnzhList = document.querySelector('.vnzh-list-new');
    const vnzhWrapper = document.querySelector('.vnzh-slider-wrapper');
    
    if (vnzhList && vnzhWrapper) {
        let vnzhInterval;
        let isTransitioningVnzh = false;
        let vStartX = 0;
        let vCurrentX = 0;
        let vIsDragging = false;
        
        function slideNextVnzh() {
            if (isTransitioningVnzh) return;
            isTransitioningVnzh = true;
            
            const firstChild = vnzhList.children[0];
            const cardWidth = firstChild.clientWidth;
            const gap = 20; // Matches CSS gap
            
            vnzhList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            vnzhList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            setTimeout(() => {
                vnzhList.style.transition = 'none';
                vnzhList.appendChild(firstChild);
                vnzhList.style.transform = 'translateX(0)';
                isTransitioningVnzh = false;
            }, 600);
        }
        
        function slidePrevVnzh() {
            if (isTransitioningVnzh) return;
            isTransitioningVnzh = true;
            
            const lastChild = vnzhList.children[vnzhList.children.length - 1];
            const cardWidth = lastChild.clientWidth;
            const gap = 20;
            
            vnzhList.style.transition = 'none';
            vnzhList.insertBefore(lastChild, vnzhList.children[0]);
            vnzhList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            vnzhList.offsetHeight; // reflow
            
            vnzhList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            vnzhList.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioningVnzh = false;
            }, 600);
        }
        
        function startVnzhAutoplay() {
            clearInterval(vnzhInterval);
            vnzhInterval = setInterval(slideNextVnzh, 3000);
        }
        
        function stopVnzhAutoplay() {
            clearInterval(vnzhInterval);
        }
        
        // Start autoplay on load
        startVnzhAutoplay();
        
        // Touch events for mobile dragging / swipe
        vnzhWrapper.addEventListener('touchstart', (e) => {
            stopVnzhAutoplay();
            vStartX = e.touches[0].clientX;
            vCurrentX = vStartX;
            vIsDragging = true;
        }, { passive: true });
        
        vnzhWrapper.addEventListener('touchmove', (e) => {
            if (!vIsDragging) return;
            vCurrentX = e.touches[0].clientX;
        }, { passive: true });
        
        vnzhWrapper.addEventListener('touchend', () => {
            if (!vIsDragging) return;
            vIsDragging = false;
            const diffX = vStartX - vCurrentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    slideNextVnzh();
                } else {
                    slidePrevVnzh();
                }
            }
            startVnzhAutoplay();
        });
        
        vnzhWrapper.addEventListener('mouseenter', stopVnzhAutoplay);
        vnzhWrapper.addEventListener('mouseleave', startVnzhAutoplay);
    }

    // Graphs Slider Logic (Infinite Auto-sliding Carousel for Mobile and Desktop)
    const graphsList = document.querySelector('.graphs-list-new');
    const graphsWrapper = document.querySelector('.graphs-slider-wrapper');
    
    if (graphsList && graphsWrapper) {
        let graphsInterval;
        let isTransitioningGraphs = false;
        let gStartX = 0;
        let gCurrentX = 0;
        let gIsDragging = false;
        
        function slideNextGraphs() {
            if (isTransitioningGraphs) return;
            isTransitioningGraphs = true;
            
            const firstChild = graphsList.children[0];
            const cardWidth = firstChild.clientWidth;
            const gap = 20; // Matches CSS gap
            
            graphsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            graphsList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            setTimeout(() => {
                graphsList.style.transition = 'none';
                graphsList.appendChild(firstChild);
                graphsList.style.transform = 'translateX(0)';
                isTransitioningGraphs = false;
            }, 600);
        }
        
        function slidePrevGraphs() {
            if (isTransitioningGraphs) return;
            isTransitioningGraphs = true;
            
            const lastChild = graphsList.children[graphsList.children.length - 1];
            const cardWidth = lastChild.clientWidth;
            const gap = 20;
            
            graphsList.style.transition = 'none';
            graphsList.insertBefore(lastChild, graphsList.children[0]);
            graphsList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            graphsList.offsetHeight; // reflow
            
            graphsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            graphsList.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioningGraphs = false;
            }, 600);
        }
        
        function startGraphsAutoplay() {
            clearInterval(graphsInterval);
            graphsInterval = setInterval(slideNextGraphs, 3000);
        }
        
        function stopGraphsAutoplay() {
            clearInterval(graphsInterval);
        }
        
        // Start autoplay on load
        startGraphsAutoplay();
        
        // Touch events for mobile dragging / swipe
        graphsWrapper.addEventListener('touchstart', (e) => {
            stopGraphsAutoplay();
            gStartX = e.touches[0].clientX;
            gCurrentX = gStartX;
            gIsDragging = true;
        }, { passive: true });
        
        graphsWrapper.addEventListener('touchmove', (e) => {
            if (!gIsDragging) return;
            gCurrentX = e.touches[0].clientX;
        }, { passive: true });
        
        graphsWrapper.addEventListener('touchend', () => {
            if (!gIsDragging) return;
            gIsDragging = false;
            const diffX = gStartX - gCurrentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    slideNextGraphs();
                } else {
                    slidePrevGraphs();
                }
            }
            startGraphsAutoplay();
        });
        
        graphsWrapper.addEventListener('mouseenter', stopGraphsAutoplay);
        graphsWrapper.addEventListener('mouseleave', startGraphsAutoplay);
    }

    // Compare Slider Logic (Infinite Auto-sliding Carousel for Mobile)
    const compareList = document.querySelector('.compare-list-new');
    const compareWrapper = document.querySelector('.compare-slider-wrapper');
    
    if (compareList && compareWrapper) {
        let compareInterval;
        let isTransitioningCompare = false;
        let cStartX = 0;
        let cCurrentX = 0;
        let cIsDragging = false;
        
        function slideNextCompare() {
            if (window.innerWidth >= 992) return; // Only slide on mobile
            if (isTransitioningCompare) return;
            isTransitioningCompare = true;
            
            const firstChild = compareList.children[0];
            const cardWidth = firstChild.clientWidth;
            const gap = 15; // Matches mobile gap
            
            compareList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            compareList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            setTimeout(() => {
                compareList.style.transition = 'none';
                compareList.appendChild(firstChild);
                compareList.style.transform = 'translateX(0)';
                isTransitioningCompare = false;
            }, 600);
        }
        
        function slidePrevCompare() {
            if (window.innerWidth >= 992) return;
            if (isTransitioningCompare) return;
            isTransitioningCompare = true;
            
            const lastChild = compareList.children[compareList.children.length - 1];
            const cardWidth = lastChild.clientWidth;
            const gap = 15;
            
            compareList.style.transition = 'none';
            compareList.insertBefore(lastChild, compareList.children[0]);
            compareList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            compareList.offsetHeight; // reflow
            
            compareList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            compareList.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioningCompare = false;
            }, 600);
        }
        
        function startCompareAutoplay() {
            clearInterval(compareInterval);
            if (window.innerWidth < 992) {
                compareInterval = setInterval(slideNextCompare, 3000);
            }
        }
        
        function stopCompareAutoplay() {
            clearInterval(compareInterval);
        }
        
        // Start autoplay on load
        startCompareAutoplay();
        
        // Touch events for mobile dragging / swipe
        compareWrapper.addEventListener('touchstart', (e) => {
            if (window.innerWidth >= 992) return;
            stopCompareAutoplay();
            cStartX = e.touches[0].clientX;
            cCurrentX = cStartX;
            cIsDragging = true;
        }, { passive: true });
        
        compareWrapper.addEventListener('touchmove', (e) => {
            if (!cIsDragging || window.innerWidth >= 992) return;
            cCurrentX = e.touches[0].clientX;
        }, { passive: true });
        
        compareWrapper.addEventListener('touchend', () => {
            if (!cIsDragging || window.innerWidth >= 992) return;
            cIsDragging = false;
            const diffX = cStartX - cCurrentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    slideNextCompare();
                } else {
                    slidePrevCompare();
                }
            }
            startCompareAutoplay();
        });
        
        compareWrapper.addEventListener('mouseenter', stopCompareAutoplay);
        compareWrapper.addEventListener('mouseleave', startCompareAutoplay);
        
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 992) {
                stopCompareAutoplay();
                compareList.style.transform = 'none';
                compareList.style.transition = 'none';
            } else {
                startCompareAutoplay();
            }
        });
    }

    // Reviews Slider Logic (Infinite Auto-sliding Carousel for Mobile and Desktop)
    const reviewsList = document.querySelector('.reviews-list-new');
    const reviewsWrapper = document.querySelector('.reviews-slider-wrapper');
    
    if (reviewsList && reviewsWrapper) {
        let reviewsInterval;
        let isTransitioningReviews = false;
        let rStartX = 0;
        let rCurrentX = 0;
        let rIsDragging = false;
        
        function slideNextReviews() {
            if (isTransitioningReviews) return;
            isTransitioningReviews = true;
            
            const firstChild = reviewsList.children[0];
            const cardWidth = firstChild.clientWidth;
            const gap = 20; // Matches CSS gap
            
            reviewsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            reviewsList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            setTimeout(() => {
                reviewsList.style.transition = 'none';
                reviewsList.appendChild(firstChild);
                reviewsList.style.transform = 'translateX(0)';
                isTransitioningReviews = false;
            }, 600);
        }
        
        function slidePrevReviews() {
            if (isTransitioningReviews) return;
            isTransitioningReviews = true;
            
            const lastChild = reviewsList.children[reviewsList.children.length - 1];
            const cardWidth = lastChild.clientWidth;
            const gap = 20;
            
            reviewsList.style.transition = 'none';
            reviewsList.insertBefore(lastChild, reviewsList.children[0]);
            reviewsList.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            reviewsList.offsetHeight; // reflow
            
            reviewsList.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            reviewsList.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioningReviews = false;
            }, 600);
        }
        
        function startReviewsAutoplay() {
            clearInterval(reviewsInterval);
            reviewsInterval = setInterval(slideNextReviews, 3000);
        }
        
        function stopReviewsAutoplay() {
            clearInterval(reviewsInterval);
        }
        
        // Start autoplay on load
        startReviewsAutoplay();
        
        // Touch events for mobile dragging / swipe
        reviewsWrapper.addEventListener('touchstart', (e) => {
            stopReviewsAutoplay();
            rStartX = e.touches[0].clientX;
            rCurrentX = rStartX;
            rIsDragging = true;
        }, { passive: true });
        
        reviewsWrapper.addEventListener('touchmove', (e) => {
            if (!rIsDragging) return;
            rCurrentX = e.touches[0].clientX;
        }, { passive: true });
        
        reviewsWrapper.addEventListener('touchend', () => {
            if (!rIsDragging) return;
            rIsDragging = false;
            const diffX = rStartX - rCurrentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    slideNextReviews();
                } else {
                    slidePrevReviews();
                }
            }
            startReviewsAutoplay();
        });
        
        reviewsWrapper.addEventListener('mouseenter', stopReviewsAutoplay);
        reviewsWrapper.addEventListener('mouseleave', startReviewsAutoplay);
    }

    // Stats Slider Logic for Mobile
    const statsGrid = document.querySelector('.stats-grid');
    const statsWrapper = document.querySelector('.stats-slider-wrapper');
    
    if (statsGrid && statsWrapper) {
        let statsInterval;
        let isTransitioningStats = false;
        let sStartX = 0;
        let sCurrentX = 0;
        let sIsDragging = false;
        
        function slideNextStat() {
            if (window.innerWidth >= 992) return;
            if (isTransitioningStats) return;
            isTransitioningStats = true;
            
            const firstChild = statsGrid.children[0];
            const cardWidth = firstChild.clientWidth;
            const gap = 20;
            
            statsGrid.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            statsGrid.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            setTimeout(() => {
                statsGrid.style.transition = 'none';
                statsGrid.appendChild(firstChild);
                statsGrid.style.transform = 'translateX(0)';
                isTransitioningStats = false;
            }, 600);
        }
        
        function slidePrevStat() {
            if (window.innerWidth >= 992) return;
            if (isTransitioningStats) return;
            isTransitioningStats = true;
            
            const lastChild = statsGrid.children[statsGrid.children.length - 1];
            const cardWidth = lastChild.clientWidth;
            const gap = 20;
            
            statsGrid.style.transition = 'none';
            statsGrid.insertBefore(lastChild, statsGrid.children[0]);
            statsGrid.style.transform = `translateX(-${cardWidth + gap}px)`;
            
            statsGrid.offsetHeight; // reflow
            
            statsGrid.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            statsGrid.style.transform = 'translateX(0)';
            
            setTimeout(() => {
                isTransitioningStats = false;
            }, 600);
        }
        
        function startStatsAutoplay() {
            clearInterval(statsInterval);
            statsInterval = setInterval(slideNextStat, 3000);
        }
        
        function stopStatsAutoplay() {
            clearInterval(statsInterval);
        }
        
        function checkScreenSizeStats() {
            if (window.innerWidth < 992) {
                startStatsAutoplay();
            } else {
                stopStatsAutoplay();
                statsGrid.style.transform = 'none';
                statsGrid.style.transition = 'none';
            }
        }
        
        statsWrapper.addEventListener('touchstart', (e) => {
            if (window.innerWidth >= 992) return;
            stopStatsAutoplay();
            sStartX = e.touches[0].clientX;
            sCurrentX = sStartX;
            sIsDragging = true;
        }, { passive: true });
        
        statsWrapper.addEventListener('touchmove', (e) => {
            if (!sIsDragging || window.innerWidth >= 992) return;
            sCurrentX = e.touches[0].clientX;
        }, { passive: true });
        
        statsWrapper.addEventListener('touchend', () => {
            if (!sIsDragging || window.innerWidth >= 992) return;
            sIsDragging = false;
            const diffX = sStartX - sCurrentX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    slideNextStat();
                } else {
                    slidePrevStat();
                }
            }
            startStatsAutoplay();
        });
        
        statsWrapper.addEventListener('mouseenter', stopStatsAutoplay);
        statsWrapper.addEventListener('mouseleave', () => {
            if (window.innerWidth < 992) startStatsAutoplay();
        });
        
        window.addEventListener('resize', checkScreenSizeStats);
        checkScreenSizeStats();
    }

    // Fireworks/Sparkles Canvas Applet for "With Altair" Card
    const cardWithAltair = document.querySelector('.compare-card.with-altair');
    if (cardWithAltair) {
        const canvas = document.createElement('canvas');
        canvas.id = 'fireworks-canvas';
        cardWithAltair.appendChild(canvas);
        
        // CSS style for canvas overlay
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '1';
        
        const ctx = canvas.getContext('2d');
        let animationFrame;
        let particles = [];
        let isHovered = false;
        
        function resizeCanvas() {
            canvas.width = cardWithAltair.clientWidth;
            canvas.height = cardWithAltair.clientHeight;
        }
        
        // Gold and silver gradient colors
        const colors = [
            'rgba(212, 175, 55, 0.95)',   // Gold
            'rgba(249, 232, 162, 0.95)',  // Light Gold
            'rgba(192, 192, 192, 0.95)',  // Silver
            'rgba(224, 224, 224, 0.95)',  // Platinum/Silver
            'rgba(255, 215, 0, 0.95)'     // Yellow Gold
        ];
        
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3.5 + 1.2;
                this.speedX = Math.random() * 3.6 - 1.8;
                this.speedY = -(Math.random() * 4 + 2.5);
                this.gravity = 0.1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = 1;
                this.decay = Math.random() * 0.015 + 0.01;
                this.isStar = Math.random() > 0.4;
            }
            
            update() {
                this.x += this.speedX;
                this.speedY += this.gravity;
                this.y += this.speedY;
                this.alpha -= this.decay;
            }
            
            draw() {
                ctx.save();
                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 5;
                ctx.shadowColor = this.color;
                
                if (this.isStar) {
                    // Star shape
                    ctx.beginPath();
                    ctx.moveTo(this.x, this.y - this.size * 2);
                    ctx.lineTo(this.x + this.size * 0.5, this.y - this.size * 0.5);
                    ctx.lineTo(this.x + this.size * 2, this.y);
                    ctx.lineTo(this.x + this.size * 0.5, this.y + this.size * 0.5);
                    ctx.lineTo(this.x, this.y + this.size * 2);
                    ctx.lineTo(this.x - this.size * 0.5, this.y + this.size * 0.5);
                    ctx.lineTo(this.x - this.size * 2, this.y);
                    ctx.lineTo(this.x - this.size * 0.5, this.y - this.size * 0.5);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // Spark circle
                    ctx.beginPath();
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }
        
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (isHovered && Math.random() < 0.45) {
                for (let i = 0; i < 2; i++) {
                    const spawnX = Math.random() * canvas.width;
                    const spawnY = canvas.height;
                    particles.push(new Particle(spawnX, spawnY));
                }
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
            
            if (isHovered || particles.length > 0) {
                animationFrame = requestAnimationFrame(animate);
            }
        }
        
        cardWithAltair.addEventListener('mouseenter', () => {
            isHovered = true;
            resizeCanvas();
            cancelAnimationFrame(animationFrame);
            animate();
        });
        
        cardWithAltair.addEventListener('mouseleave', () => {
            isHovered = false;
        });
        
        cardWithAltair.addEventListener('click', (e) => {
            const rect = cardWithAltair.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Explosion of sparks
            for (let i = 0; i < 18; i++) {
                const p = new Particle(clickX, clickY);
                p.speedX = Math.random() * 5 - 2.5;
                p.speedY = Math.random() * 5 - 2.5;
                particles.push(p);
            }
            if (!isHovered && particles.length === 18) {
                cancelAnimationFrame(animationFrame);
                animate();
            }
        });
        
        window.addEventListener('resize', resizeCanvas);
    }





    // Fireworks Particle Burst Effect for Hero Model Showcase
    const createFirework = (x, y) => {
        const container = document.querySelector('.model-showcase-container');
        if (!container) return;
        
        const colors = [
            '#ff007f', // Hot Pink
            '#7928ca', // Purple
            '#ffb800', // Gold
            '#00f0ff', // Cyan
            '#ffffff'  // White
        ];
        
        const particleCount = 12;
        for (let i = 0; i < particleCount; i++) {
            const p = document.createElement('div');
            p.className = 'firework-particle';
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            p.style.backgroundColor = color;
            p.style.boxShadow = `0 0 8px ${color}, 0 0 4px ${color}`;
            
            p.style.left = `${x}px`;
            p.style.top = `${y}px`;
            
            const angle = (i * 2 * Math.PI / particleCount) + (Math.random() * 0.4 - 0.2);
            const distance = 40 + Math.random() * 55;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            p.style.setProperty('--tx', `${tx}px`);
            p.style.setProperty('--ty', `${ty}px`);
            
            container.appendChild(p);
            
            setTimeout(() => {
                p.remove();
            }, 1200);
        }
    };

    const startFireworks = () => {
        const badges = document.querySelectorAll('.floating-badge');
        const container = document.querySelector('.model-showcase-container');
        if (badges.length === 0 || !container) return;
        
        // Periodic trigger
        setInterval(() => {
            const badge = badges[Math.floor(Math.random() * badges.length)];
            const rect = badge.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            
            const x = (rect.left + rect.width / 2) - containerRect.left;
            const y = (rect.top + rect.height / 2) - containerRect.top;
            
            createFirework(x, y);
        }, 2200);
    };
    
    startFireworks();
});





