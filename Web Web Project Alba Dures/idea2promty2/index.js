// Translation Dictionary
const i18n = {
  en: {
    title: "Idea2Prompty v2.0",
    subtitle: "Premium AI Prompt Engineering Studio for Andrii Yatsechko",
    tabSelfie: "🤳 Selfie Prompt Builder",
    tabMarketing: "📋 Marketing Prompts",
    titleSelfie: "AI Selfie Generator",
    titleMarketing: "Marketing Prompt Builder",
    labelCeleb: "Select Football Superstar",
    labelUserDesc: "Your Appearance Description",
    placeholderUserDesc: "e.g., young male fan with short dark hair, smiling naturally",
    labelUserAttire: "Your Attire",
    labelUserExpr: "Your Expression",
    labelScene: "Background Setting & Scene",
    labelEngine: "Target AI Generator Engine",
    labelToneToggle: "Apply Andrii's Tone of Voice",
    descToneToggle: "Injects Anti-AI professional n8n/AI expert profile rules",
    labelNiche: "Business Niche / Product",
    placeholderNiche: "e.g., n8n Automation Workflows, AI Chatbots",
    labelAudience: "Target Audience Analysis (Fears, Desires, Pains)",
    placeholderAudience: "e.g., scared of losing leads, wants to cut manual work, needs simple CRM logger",
    labelMarketingTask: "Marketing Task Framework",
    btnCopy: "Copy Prompt",
    btnDownload: "Download TXT",
    toastCopySuccess: "Prompt copied to clipboard!",
    toastDownloadSuccess: "Prompt downloaded successfully!",
    promptOutputHeading: "Generated AI Prompt Preview",
    instructionsHeading: "How to use this prompt",
    engineMidjourneyDesc: "Paste this prompt into Midjourney. Use --cref with a link to your face photo for face-swapping.",
    engineDalleDesc: "Paste this prompt directly into ChatGPT Plus (DALL-E 3) or Copilot.",
    engineSdDesc: "Use this optimized prompt in Stable Diffusion WebUI / ComfyUI.",
    customCelebName: "Custom Celebrity Name",
    customCelebJersey: "Celebrity Jersey & Details",
    customCelebNamePlaceholder: "e.g., Lionel Messi",
    customCelebJerseyPlaceholder: "e.g., Argentina's blue-and-white jersey with number 10",
    labelUserPortrait: "Upload Reference Portrait",
    textUploadZone: "Click or drag your portrait photo here",
    labelMyPhotoAdd: "Add Photo",
    labelMyPhotoLoaded: "My Photo",
    backHomeText: "Home",
    btnBackPortfolioText: "Back to Portfolio",
  },
  uk: {
    title: "Idea2Prompty v2.0",
    subtitle: "Преміум студія промпт-інжинірингу для Андрія Яцечка",
    tabSelfie: "🤳 Конструктор AI-Селфі",
    tabMarketing: "📋 Маркетингові Промпти",
    titleSelfie: "Конструктор AI-Селфі",
    titleMarketing: "Конструктор Маркетингових Промптів",
    labelCeleb: "Оберіть зірку футболу",
    labelUserDesc: "Опис вашої зовнішності",
    placeholderUserDesc: "наприклад: молодий хлопець з коротким темним волоссям, природна посмішка",
    labelUserAttire: "Ваш одяг",
    labelUserExpr: "Ваш вираз обличчя",
    labelScene: "Локація та задній план",
    labelEngine: "Цільова нейромережа (AI Engine)",
    labelToneToggle: "Застосувати Tone of Voice Андрія",
    descToneToggle: "Додає правила Anti-AI та експертного профілю n8n/AI інтегратора",
    labelNiche: "Ніша бізнесу / Продукт",
    placeholderNiche: "наприклад: автоматизація процесів n8n, ШІ-асистенти",
    labelAudience: "Аналіз аудиторії (страхи, бажання, проблеми)",
    placeholderAudience: "наприклад: бояться втратити лідів, хочуть скоротити рутину, потрібен простий логер в CRM",
    labelMarketingTask: "Маркетинговий шаблон (фреймворк)",
    btnCopy: "Копіювати промпт",
    btnDownload: "Завантажити TXT",
    toastCopySuccess: "Промпт скопійовано в буфер обміну!",
    toastDownloadSuccess: "Промпт завантажено успішно!",
    promptOutputHeading: "Попередній перегляд промпту",
    instructionsHeading: "Як використовувати цей промпт",
    engineMidjourneyDesc: "Вставте цей промпт у Midjourney. Використовуйте параметр --cref з посиланням на ваше фото для заміни обличчя.",
    engineDalleDesc: "Вставте цей промпт безпосередньо в ChatGPT Plus (DALL-E 3) або Copilot.",
    engineSdDesc: "Використовуйте цей оптимізований промпт у Stable Diffusion WebUI / ComfyUI.",
    customCelebName: "Ім'я власної знаменитості",
    customCelebJersey: "Опис джерсі та деталей зірки",
    customCelebNamePlaceholder: "наприклад: Ліонель Мессі",
    customCelebJerseyPlaceholder: "наприклад: біло-блакитна футболка збірної Аргентини з номером 10",
    labelUserPortrait: "Завантажити фото-референс",
    textUploadZone: "Натисніть або перетягніть фото сюди",
    labelMyPhotoAdd: "Додати фото",
    labelMyPhotoLoaded: "Моє фото",
    backHomeText: "Головна",
    btnBackPortfolioText: "Повернутися до портфоліо",
  }
};

// Application State
let currentState = {
  lang: 'en',
  activeTab: 'selfie', // 'selfie' or 'marketing'
  
  // Selfie State
  selfie: {
    celebrity: 'ronaldo',
    customName: '',
    customJersey: '',
    userDesc: '',
    attire: 'attire1', // maps to selected attire chip
    expression: 'expr1',
    scene: 'scene1',
    engine: 'midjourney',
    portraitFile: null,
    portraitDataURL: '',
    portraitFileName: ''
  },

  // Marketing State
  marketing: {
    task: 'brief',
    niche: '',
    audience: '',
    applyTone: true
  }
};

// Celebrity Data (based on presentation prompts)
const celebrityData = {
  ronaldo: {
    name: "Cristiano Ronaldo",
    jersey: "Portugal’s red national team jersey with number 7, matching shorts, and football socks",
    features: "recognizable short dark hair, athletic physique, and realistic facial features",
    expression: "relaxed, friendly expression",
    image: "assets/ronaldo.jpg"
  },
  kane: {
    name: "famous English football striker",
    jersey: "England’s white national team jersey with number 9 and a captain’s armband",
    features: "short light-brown hair, an athletic build, light stubble",
    expression: "calm friendly expression",
    image: "assets/kane.jpg"
  },
  mbappe: {
    name: "famous French football star",
    jersey: "France’s dark blue national team jersey with number 10",
    features: "short haircut, an athletic build",
    expression: "natural slightly surprised or neutral expression",
    image: "assets/mbappe.jpg"
  },
  haaland: {
    name: "famous Norwegian football striker",
    jersey: "Norway’s red-and-navy national team jersey with number 9",
    features: "tall, athletic, has long blond hair slicked back",
    expression: "natural friendly expression",
    image: "assets/haaland.jpg"
  },
  yamal: {
    name: "famous young Spanish football star",
    jersey: "Spain’s red national team jersey with number 19",
    features: "short curly hair with lighter highlights, an athletic build",
    expression: "friendly smile",
    image: "assets/yamal.jpg"
  },
  myphoto: {
    name: "the person shown in my uploaded portrait reference",
    jersey: "a custom outfit",
    features: "matching their facial structure, features, hair, and look accurately from the uploaded reference",
    expression: "smiling and looking directly into the camera",
    image: "" // dynamically set to uploaded portrait URL
  },
  custom: {
    name: "Custom Star",
    jersey: "custom jersey",
    features: "athletic build",
    expression: "friendly expression",
    image: "assets/ronaldo.jpg" // fallback image
  }
};

// UI Attire Data
const attireData = {
  attire1: {
    en: "a dark hoodie layered over a light hooded sweatshirt, light blue jeans, and white sneakers",
    uk: "темна худі, одягнена поверх світлого світшота з капюшоном, світло-блакитні джинси та білі кросівки"
  },
  attire2: {
    en: "a light olive or khaki jacket over a dark navy hoodie and a light beige T-shirt, with an event lanyard visible around the neck",
    uk: "світло-оливкова або хакі куртка поверх темно-синього худі та світло-бежевої футболки, з бейджем заходу на шиї"
  },
  attire3: {
    en: "a simple black designer hoodie",
    uk: "просте чорне дизайнерське худі"
  },
  attire4: {
    en: "a light grey sporty hoodie",
    uk: "світло-сіре спортивне худі"
  },
  attire5: {
    en: "a white hoodie with a gold circular logo on the chest",
    uk: "біле худі із золотистим круглим логотипом на грудях"
  }
};

// UI Expression Data
const expressionData = {
  expr1: {
    en: "smiling widely with an excited, natural expression and looking directly into the camera",
    uk: "широко посміхається з радісним, природним виразом обличчя та дивиться прямо в камеру"
  },
  expr2: {
    en: "smiling naturally and looking into the camera with a calm friendly expression",
    uk: "природно посміхається та дивиться в камеру із спокійним дружнім виразом обличчя"
  },
  expr3: {
    en: "smiling widely with an excited, spontaneous expression, showing pure joy",
    uk: "широко посміхається з радісним спонтанним виразом обличчя, що показує чисту радість"
  },
  expr4: {
    en: "excited and happy, with a wide natural smile, as if getting an unforgettable photo",
    uk: "захоплений і щасливий, з широкою природною посмішкою, ніби робить незабутнє фото"
  }
};

// UI Scene Data
const sceneData = {
  scene1: {
    name: "football_stadium",
    en: "inside a packed football stadium at night, with bright floodlights, a vivid green pitch, cheering fans holding flags, photographers, and security staff in yellow vests in the background. Keep the background slightly softer than the two main subjects to create realistic smartphone depth.",
    uk: "всередині заповненого футбольного стадіону вночі, з яскравими прожекторами, насичено-зеленим газоном, вболівальниками з прапорами, фотографами та службою безпеки у жовтих жилетах на задньому плані. Задній план злегка розмитий для реалістичної глибини різкості смартфона."
  },
  scene2: {
    name: "concert_stage",
    en: "standing in front of a massive outdoor music concert stage at night. Bright colorful laser lights, glowing neon visual effects on huge LED screens, a massive crowd with raised hands in the background, and hazy stage atmosphere.",
    uk: "стоячи перед величезною сценою музичного концерту просто неба вночі. Яскраві кольорові лазери, неонові візуальні ефекти на світлодіодних екранах, величезний натовп із піднятими руками на задньому плані та туманна атмосфера сцени."
  },
  scene3: {
    name: "tech_conference",
    en: "inside a modern high-end tech conference hall. Massive glowing blue LED screens with abstract technology patterns in the background, corporate rollups, event branding, professional lighting, and other attendees networking in a slightly blurred background.",
    uk: "всередині сучасного технологічного конференц-залу преміум-класу. Величезні світлодіодні екрани з абстрактними візерунками технологій на задньому плані, банери заходу, професійне освітлення та інші учасники, які спілкуються на злегка розмитому тлі."
  },
  scene4: {
    name: "cozy_cafe",
    en: "inside a stylish cozy cafe with warm ambient lighting. Modern wooden interior, green indoor plants, large glass windows showing a rain-washed city street at night with neon lights, and soft bokeh background elements.",
    uk: "всередині стильного затишного кафе з теплим освітленням. Сучасний дерев'яний інтер'єр, зелені кімнатні рослини, великі скляні вікна, що показують вмиту дощем міську вулицю вночі з неоновими вогнями, та м'який боке на тлі."
  }
};

// Marketing Templates (derived from Prompts Human/ files)
const marketingTemplates = {
  brief: {
    title: { en: "Client Brief Creation", uk: "Створення брифу для клієнта" },
    systemPrompt: (niche, audience) => `Уяви, що ти досвідчений маркетолог і спеціаліст з продаючих сайтів з 20-річним досвідом.
Твоя задача — створити КОРОТКИЙ і ЗРОЗУМІЛИЙ бриф для клієнта для створення продаючого сайту.

Ніша бізнесу:
${niche || "[Вкажіть нішу бізнесу]"}

Ось результати аналізу відвідувача сайту (страхи, бажання, проблеми, дії):
${audience || "[Вкажіть аналіз аудиторії]"}

## Умови:
- 8–12 питань МАКСИМУМ
- без маркетингових і складних слів
- питання має бути зрозуміле людині без досвіду в маркетингу
- НЕ став питання, відповіді на які вже є в аналізі відвідувача
- НЕ став абстрактні питання (про місію, цінності, бренд)
- кожне питання має напряму впливати на тексти або структуру сайту

## Структура брифу:
1. Про послугу / продукт (що саме продаємо, що входить, формат)
2. Про клієнтів (в яких ситуаціях звертаються, хто ці люди)
3. Про відмінність (чому мають обрати саме цей бізнес)
4. Про довіру (відгуки, гарантії, приклади робіт)
5. Про сайт (яку дію має зробити людина і як зручніше звʼязатись)

Виведи ФІНАЛЬНИЙ список питань у форматі, готовому для відправки клієнту.
Пиши простою мовою, "людина до людини". Без пояснень, без коментарів, тільки питання.`
  },
  niche: {
    title: { en: "Niche Analysis", uk: "Аналіз ніші бізнесу" },
    systemPrompt: (niche, audience) => `Ти — провідний бізнес-аналітик та експерт з маркетингових досліджень.
Проведи детальний аналіз для ніші: ${niche || "[Вкажіть нішу]"}
Орієнтуйся на наступні проблеми та болі аудиторії:
${audience || "[Вкажіть болі аудиторії]"}

Твоє завдання — надати структурований аналіз:
1. **Профіль ідеального клієнта (ICP)**: Хто купує продукт, їхні мотивації та демографія.
2. **Основні болі та страхи**: Чого вони бояться найбільше при замовленні (наприклад, злив бюджету, некомпетентність, затягування термінів).
3. **Ключові тригери прийняття рішення**: Що змусить їх натиснути кнопку "Замовити".
4. **Конкурентні переваги**: Які унікальні оффери можна запропонувати, щоб виділитися на ринку.

Пиши максимально конкретно, з акцентом на цифри, факти та психологію реальних людей. Уникай порожньої води.`
  },
  offer: {
    title: { en: "4U Offer Creation", uk: "Створення офферу за формулою 4U" },
    systemPrompt: (niche, audience) => `Ти — професійний копірайтер, орієнтований на конверсію та продажі.
Створи сильні, чіткі варіанти офферів (унікальних торгових пропозицій) за формулою 4U для наступного продукту:
Продукт/Ніша: ${niche || "[Вкажіть продукт]"}
Проблеми аудиторії: ${audience || "[Вкажіть проблеми]"}

Формула 4U:
1. **Usefulness (Корисність)** — яку вигоду отримує клієнт.
2. **Urgency (Терміновість)** — за рахунок чого клієнт має діяти швидше.
3. **Ultra-specificity (Ультра-специфічність)** — конкретизація вигоди в цифрах чи результатах.
4. **Uniqueness (Унікальність)** — за рахунок чого або якого інструменту досягається результат.

Запропонуй 3 різні варіанти заголовка 4U та підзаголовка для головного екрана сайту. Пиши простою мовою, без складних формулювань, орієнтуючись на реальну цінність.`
  },
  structure: {
    title: { en: "Landing Page Structure", uk: "Структура посадкової сторінки" },
    systemPrompt: (niche, audience) => `Ти — UX/UI дизайнер та архітектор конверсійних Landing Page.
Розроби детальну структуру блоків лендінгу для ніші: ${niche || "[Вкажіть нішу]"}
Цільова аудиторія має наступні болі: ${audience || "[Вкажіть болі]"}

Запропонуй логічну структуру з 6–8 блоків для продаючого лендінгу:
- Блок 1: Головний екран (Оффер, підзаголовок, CTA-кнопка з лід-магнітом)
- Блок 2: Болі та тригери клієнта (Актуалізація проблеми)
- Блок 3: Вирішення проблеми / Опис продукту (Як саме ми вирішуємо біль)
- Блок 4: Етапи співпраці / Процес роботи (Покроковий шлях клієнта для зняття тривожності)
- Блок 5: Докази та довіра (Кейси, відгуки, цифри, сертифікати)
- Блок 6: Оффер-закриття з низьким порогом входу (Заклик до простої дії)

Для кожного блоку коротко пропиши мету, текстове наповнення (тезисно) та елементи інтерфейсу. Пиши зрозуміло та лаконічно.`
  }
};

// DOM Elements
let dom = {};

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  dom.langToggle = document.getElementById("lang-toggle");
  dom.langCurrent = document.getElementById("lang-current");
  dom.backHomeText = document.getElementById("back-home-text");
  dom.btnBackPortfolioText = document.getElementById("btn-back-portfolio-text");
  
  dom.tabSelfie = document.getElementById("tab-selfie");
  dom.tabMarketing = document.getElementById("tab-marketing");
  
  dom.selfieForm = document.getElementById("selfie-form");
  dom.marketingForm = document.getElementById("marketing-form");
  
  dom.celebRadios = document.querySelectorAll(".celeb-radio");
  dom.customCelebGroup = document.getElementById("custom-celeb-group");
  dom.customCelebName = document.getElementById("custom-celeb-name");
  dom.customCelebJersey = document.getElementById("custom-celeb-jersey");
  dom.userDesc = document.getElementById("user-desc");
  dom.attireChips = document.querySelectorAll(".attire-chip");
  dom.exprChips = document.querySelectorAll(".expr-chip");
  dom.sceneChips = document.querySelectorAll(".scene-chip");
  dom.engineChips = document.querySelectorAll(".engine-chip");
  
  dom.marketingTask = document.getElementById("marketing-task");
  dom.mNiche = document.getElementById("m-niche");
  dom.mAudience = document.getElementById("m-audience");
  dom.mApplyTone = document.getElementById("m-apply-tone");
  
  dom.promptOutput = document.getElementById("prompt-output");
  dom.mockupImage = document.getElementById("mockup-image");
  dom.mockupCelebName = document.getElementById("mockup-celeb-name");
  dom.btnCopy = document.getElementById("btn-copy");
  dom.btnDownload = document.getElementById("btn-download");
  dom.toast = document.getElementById("toast");
  dom.toastText = document.getElementById("toast-text");
  
  dom.engineInstructions = document.getElementById("engine-instructions");

  // Photo Upload DOM Elements
  dom.labelUserPortrait = document.getElementById("label-user-portrait");
  dom.uploadZone = document.getElementById("upload-zone");
  dom.textUploadZone = document.getElementById("text-upload-zone");
  dom.userPortraitInput = document.getElementById("user-portrait-input");
  dom.portraitPreviewContainer = document.getElementById("portrait-preview-container");
  dom.portraitPreview = document.getElementById("portrait-preview");
  dom.portraitFilename = document.getElementById("portrait-filename");
  dom.btnRemovePortrait = document.getElementById("btn-remove-portrait");

  // My Photo Selector DOM Elements
  dom.celebMyPhoto = document.getElementById("celeb-myphoto");
  dom.celebMyPhotoCard = document.getElementById("celeb-myphoto-card");
  dom.celebMyPhotoImg = document.getElementById("celeb-myphoto-img");
  dom.celebMyPhotoPlaceholder = document.getElementById("celeb-myphoto-placeholder");
  dom.celebMyPhotoLabel = document.getElementById("celeb-myphoto-label");
  
  // Register Event Listeners
  dom.langToggle.addEventListener("click", toggleLanguage);
  dom.tabSelfie.addEventListener("click", () => switchTab('selfie'));
  dom.tabMarketing.addEventListener("click", () => switchTab('marketing'));

  // Portrait upload listeners
  dom.uploadZone.addEventListener("click", () => dom.userPortraitInput.click());
  
  dom.uploadZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dom.uploadZone.classList.add("dragover");
  });
  
  dom.uploadZone.addEventListener("dragleave", () => {
    dom.uploadZone.classList.remove("dragover");
  });
  
  dom.uploadZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dom.uploadZone.classList.remove("dragover");
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePortraitUpload(e.dataTransfer.files[0]);
    }
  });
  
  dom.userPortraitInput.addEventListener("change", (e) => {
    if (e.target.files && e.target.files[0]) {
      handlePortraitUpload(e.target.files[0]);
    }
  });
  
  dom.btnRemovePortrait.addEventListener("click", (e) => {
    e.stopPropagation();
    removePortrait();
  });

  // Intercept "My Photo" card clicks if no photo is loaded
  dom.celebMyPhotoCard.addEventListener("click", (e) => {
    if (!currentState.selfie.portraitDataURL) {
      e.preventDefault();
      dom.userPortraitInput.click();
    }
  });
  
  // Selfie inputs listeners
  dom.celebRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      currentState.selfie.celebrity = e.target.value;
      if (e.target.value === 'custom') {
        dom.customCelebGroup.style.display = 'block';
      } else {
        dom.customCelebGroup.style.display = 'none';
      }
      updateMockupImage();
      generatePrompt();
    });
  });

  dom.customCelebName.addEventListener("input", (e) => {
    currentState.selfie.customName = e.target.value;
    generatePrompt();
  });

  dom.customCelebJersey.addEventListener("input", (e) => {
    currentState.selfie.customJersey = e.target.value;
    generatePrompt();
  });

  dom.userDesc.addEventListener("input", (e) => {
    currentState.selfie.userDesc = e.target.value;
    generatePrompt();
  });

  dom.attireChips.forEach(chip => {
    chip.addEventListener("click", () => {
      currentState.selfie.attire = chip.dataset.value;
      dom.attireChips.forEach(c => c.classList.remove("active"));
      // Simulate radio check
      const radio = document.getElementById(`attire-${chip.dataset.value}`);
      if (radio) radio.checked = true;
      generatePrompt();
    });
  });

  dom.exprChips.forEach(chip => {
    chip.addEventListener("click", () => {
      currentState.selfie.expression = chip.dataset.value;
      const radio = document.getElementById(`expr-${chip.dataset.value}`);
      if (radio) radio.checked = true;
      generatePrompt();
    });
  });

  dom.sceneChips.forEach(chip => {
    chip.addEventListener("click", () => {
      currentState.selfie.scene = chip.dataset.value;
      const radio = document.getElementById(`scene-${chip.dataset.value}`);
      if (radio) radio.checked = true;
      generatePrompt();
    });
  });

  dom.engineChips.forEach(chip => {
    chip.addEventListener("click", () => {
      currentState.selfie.engine = chip.dataset.value;
      const radio = document.getElementById(`engine-${chip.dataset.value}`);
      if (radio) radio.checked = true;
      updateEngineInstructions();
      generatePrompt();
    });
  });

  // Marketing inputs listeners
  dom.marketingTask.addEventListener("change", (e) => {
    currentState.marketing.task = e.target.value;
    generatePrompt();
  });

  dom.mNiche.addEventListener("input", (e) => {
    currentState.marketing.niche = e.target.value;
    generatePrompt();
  });

  dom.mAudience.addEventListener("input", (e) => {
    currentState.marketing.audience = e.target.value;
    generatePrompt();
  });

  dom.mApplyTone.addEventListener("change", (e) => {
    currentState.marketing.applyTone = e.target.checked;
    generatePrompt();
  });

  // Action listeners
  dom.btnCopy.addEventListener("click", copyToClipboard);
  dom.btnDownload.addEventListener("click", downloadPrompt);

  // Initialize UI
  switchTab(currentState.activeTab);
  updateLanguageUI();
  updateMockupImage();
  updateEngineInstructions();
  generatePrompt();
});

// Switch active tab
function switchTab(tab) {
  currentState.activeTab = tab;
  
  if (tab === 'selfie') {
    dom.tabSelfie.classList.add("active");
    dom.tabMarketing.classList.remove("active");
    dom.selfieForm.style.display = 'block';
    dom.marketingForm.style.display = 'none';
  } else {
    dom.tabSelfie.classList.remove("active");
    dom.tabMarketing.classList.add("active");
    dom.selfieForm.style.display = 'none';
    dom.marketingForm.style.display = 'block';
  }
  generatePrompt();
}

// Toggle language state
function toggleLanguage() {
  currentState.lang = currentState.lang === 'en' ? 'uk' : 'en';
  dom.langCurrent.textContent = currentState.lang.toUpperCase();
  updateLanguageUI();
  generatePrompt();
}

// Update UI texts based on language
function updateLanguageUI() {
  const currentLang = currentState.lang;
  const trans = i18n[currentLang];

  // Update text values
  document.getElementById("hero-title").innerHTML = trans.title;
  document.getElementById("hero-desc").textContent = trans.subtitle;
  dom.backHomeText.textContent = trans.backHomeText;
  dom.btnBackPortfolioText.textContent = trans.btnBackPortfolioText;
  
  dom.tabSelfie.innerHTML = `<span><i class="fa-solid fa-camera"></i></span> ${trans.tabSelfie}`;
  dom.tabMarketing.innerHTML = `<span><i class="fa-solid fa-file-invoice"></i></span> ${trans.tabMarketing}`;

  // Selfie Form Labels
  document.getElementById("label-celeb").textContent = trans.labelCeleb;
  document.getElementById("label-user-desc").textContent = trans.labelUserDesc;
  dom.userDesc.placeholder = trans.placeholderUserDesc;
  document.getElementById("label-user-attire").textContent = trans.labelUserAttire;
  document.getElementById("label-user-expr").textContent = trans.labelUserExpr;
  document.getElementById("label-scene").textContent = trans.labelScene;
  document.getElementById("label-engine").textContent = trans.labelEngine;
  document.getElementById("label-custom-celeb-name").textContent = trans.customCelebName;
  document.getElementById("label-custom-celeb-jersey").textContent = trans.customCelebJersey;
  dom.customCelebName.placeholder = trans.customCelebNamePlaceholder;
  dom.customCelebJersey.placeholder = trans.customCelebJerseyPlaceholder;
  
  dom.labelUserPortrait.textContent = trans.labelUserPortrait;
  if (!currentState.selfie.portraitFile) {
    dom.textUploadZone.textContent = trans.textUploadZone;
  }
  
  if (currentState.selfie.portraitFile) {
    dom.celebMyPhotoLabel.textContent = trans.labelMyPhotoLoaded;
  } else {
    dom.celebMyPhotoLabel.textContent = trans.labelMyPhotoAdd;
  }

  // Marketing Form Labels
  document.getElementById("label-marketing-task").textContent = trans.labelMarketingTask;
  document.getElementById("label-niche").textContent = trans.labelNiche;
  dom.mNiche.placeholder = trans.placeholderNiche;
  document.getElementById("label-audience").textContent = trans.labelAudience;
  dom.mAudience.placeholder = trans.placeholderAudience;
  document.getElementById("label-tone-toggle").textContent = trans.labelToneToggle;
  document.getElementById("desc-tone-toggle").textContent = trans.descToneToggle;

  // Output Headers
  document.getElementById("prompt-output-heading").innerHTML = `<i class="fa-solid fa-terminal"></i> ${trans.promptOutputHeading}`;
  document.getElementById("instructions-heading").innerHTML = `<i class="fa-solid fa-circle-info"></i> ${trans.instructionsHeading}`;
  
  dom.btnCopy.innerHTML = `<i class="fa-solid fa-copy"></i> ${trans.btnCopy}`;
  dom.btnDownload.innerHTML = `<i class="fa-solid fa-download"></i> ${trans.btnDownload}`;

  // Update Chips Text Values dynamically
  updateChipsLanguage();
  updateEngineInstructions();
}

// Update chip elements language
function updateChipsLanguage() {
  const lang = currentState.lang;
  
  // Attire Chips
  Object.keys(attireData).forEach(key => {
    const chipText = document.querySelector(`.attire-chip[data-value="${key}"] .chip-text`);
    if (chipText) {
      // Shorten for chip display
      const fullText = attireData[key][lang];
      chipText.textContent = fullText.length > 30 ? fullText.substring(0, 27) + "..." : fullText;
    }
  });

  // Expression Chips
  Object.keys(expressionData).forEach(key => {
    const chipText = document.querySelector(`.expr-chip[data-value="${key}"] .chip-text`);
    if (chipText) {
      const fullText = expressionData[key][lang];
      chipText.textContent = fullText.length > 30 ? fullText.substring(0, 27) + "..." : fullText;
    }
  });

  // Scene Chips
  Object.keys(sceneData).forEach(key => {
    const chipText = document.querySelector(`.scene-chip[data-value="${key}"] .chip-text`);
    if (chipText) {
      const fullText = sceneData[key][lang];
      chipText.textContent = fullText.length > 30 ? fullText.substring(0, 27) + "..." : fullText;
    }
  });
}

// Update mock visual preview image
function updateMockupImage() {
  const celeb = currentState.selfie.celebrity;
  const data = celebrityData[celeb];
  
  dom.mockupImage.src = data.image;
  dom.mockupImage.alt = `${data.name} Selfie Preview`;
  dom.mockupCelebName.textContent = celeb === 'custom' 
    ? (currentState.selfie.customName || "Custom Star") 
    : data.name.split(" ").slice(-1)[0].toUpperCase();
}

// Update prompt instructions below output
function updateEngineInstructions() {
  const lang = currentState.lang;
  const engine = currentState.selfie.engine;
  const trans = i18n[lang];
  
  if (engine === 'midjourney') {
    dom.engineInstructions.textContent = trans.engineMidjourneyDesc;
  } else if (engine === 'dalle') {
    dom.engineInstructions.textContent = trans.engineDalleDesc;
  } else {
    dom.engineInstructions.textContent = trans.engineSdDesc;
  }
}

// Compile Selfie Prompt String
function compileSelfiePrompt() {
  const lang = currentState.lang;
  const selfie = currentState.selfie;
  
  // Get Celebrity Details
  let celebName = "";
  let celebJersey = "";
  let celebFeatures = "";
  let celebExpr = "";
  
  if (selfie.celebrity === 'custom') {
    celebName = selfie.customName || "famous celebrity";
    celebJersey = selfie.customJersey || "stylish clothes";
    celebFeatures = "recognizable features, athletic build";
    celebExpr = "friendly looking directly into the camera";
  } else {
    const celeb = celebrityData[selfie.celebrity];
    celebName = celeb.name;
    celebJersey = celeb.jersey;
    celebFeatures = celeb.features;
    celebExpr = celeb.expression;
  }

  // Get Custom User Description or default
  const defaultUserDesc = lang === 'en' 
    ? "a young fan taking the selfie with one arm extended toward the camera"
    : "молодий фанат, який робить селфі з витягнутою до камери рукою";
  const userDescriptionText = selfie.userDesc.trim() || defaultUserDesc;

  // Get Attire and Expression
  const attireText = attireData[selfie.attire]['en']; // prompt itself should be in English for best AI output
  const userExprText = expressionData[selfie.expression]['en'];
  const sceneText = sceneData[selfie.scene]['en'];

  // Identity Reference wording based on selection (avoids double portrait conflicts)
  let identityText = "";
  let blendText = "";
  if (selfie.celebrity === 'myphoto') {
    identityText = "Use my uploaded portrait as the identity reference for the co-subject standing next to me. Preserve their facial identity accurately from the uploaded reference: face shape, eyes, eyebrows, nose, lips, hair, skin tone, age, and natural proportions.";
    blendText = "Do not blend their face with my face.";
  } else {
    identityText = "Use my uploaded portrait as the identity reference for the person taking the selfie. Preserve my facial identity accurately from the uploaded reference: face shape, eyes, eyebrows, nose, lips, hair, skin tone, age, and natural proportions.";
    blendText = "Do not blend my face with the celebrity's face.";
  }

  // Base prompt template (English is used for image generators since they understand it best)
  let prompt = `Create a brand-new, ultra-realistic smartphone selfie from scratch. ${identityText} Show a person in the foreground taking the selfie with one arm fully extended toward the camera. This person is ${userExprText}, has the appearance of: ${userDescriptionText}, and is wearing ${attireText}. This person is standing close beside ${celebName} who is wearing ${celebJersey}. He has ${celebFeatures} and a ${celebExpr}. 
${blendText} 
The scene takes place ${sceneText}
Use a dynamic close, arm’s-length, wide-angle smartphone selfie perspective. The extended arm should appear large in the foreground, with subtle wide-angle lens distortion, while both faces remain sharp, natural, and in focus. 
Style: photorealistic, highly detailed, natural skin texture, realistic lighting, correct anatomy, accurate hands, believable proportions, slight smartphone lens distortion, authentic crowd depth, no pasted-on face, no artificial skin, no duplicated people, no extra fingers, no distorted anatomy, and no visible AI artifacts. 
Important: no text, no title, no captions, no typography, no watermarks, no social media interface elements, no icons, and no overlays anywhere in the image.`;

  // Engine Optimization
  if (selfie.engine === 'midjourney') {
    const crefVal = selfie.portraitFileName ? selfie.portraitFileName : "[portrait_url]";
    prompt += ` --ar 4:3 --v 6.0 --cref ${crefVal}`;
  } else if (selfie.engine === 'sd') {
    prompt = `(masterpiece, best quality, ultra-detailed, photorealistic:1.2), smartphone selfie, fan photo, ` + prompt;
  }

  return prompt;
}

// Compile Marketing Prompt String
function compileMarketingPrompt() {
  const marketing = currentState.marketing;
  const template = marketingTemplates[marketing.task];
  
  let prompt = template.systemPrompt(marketing.niche, marketing.audience);
  
  if (marketing.applyTone) {
    prompt += `\n\n---
🗣️ Tone of Voice & Copywriting Constraints:
- СТИЛЬ: Експерт з автоматизації процесів на n8n та інтегратор ШІ. Тон впевнений, професійний, чесний і прямий.
- МОВА: Проста жива мова ("людина до людини"), нуль корпоративного фальшу і маркетингової води.
- КЛІШЕ: Категорично заборонено використовувати слова-кліше ("інноваційний", "революційний", "унікальний підхід", "індивідуальний підхід", "команда професіоналів").
- СТРУКТУРА: Короткі речення, абзаци, чіткі списки з тематичними емодзі (🤖, ⚡, 📊, 📋, 🛠️).
- ТЕХНІЧНІ ТЕРМІНИ: Залишати терміни розробки англійською (n8n, API, Webhooks, Google Sheets, Telegram Bot API).
- КОНВЕРСІЯ: Фокус на конкретній користі для клієнта (що він отримує в цифрах/фактах) замість опису процесів.`;
  }
  
  return prompt;
}

// Generate Prompt based on active tab
function generatePrompt() {
  let compiledText = "";
  if (currentState.activeTab === 'selfie') {
    compiledText = compileSelfiePrompt();
  } else {
    compiledText = compileMarketingPrompt();
  }
  dom.promptOutput.textContent = compiledText;
}

// Copy prompt to clipboard
function copyToClipboard() {
  const text = dom.promptOutput.textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast(i18n[currentState.lang].toastCopySuccess);
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Download prompt as TXT file
function downloadPrompt() {
  const text = dom.promptOutput.textContent;
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  const filename = currentState.activeTab === 'selfie' 
    ? `selfie_prompt_${currentState.selfie.celebrity}.txt`
    : `marketing_prompt_${currentState.marketing.task}.txt`;
    
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  showToast(i18n[currentState.lang].toastDownloadSuccess);
}

// Display Toast Alert
function showToast(message) {
  dom.toastText.textContent = message;
  dom.toast.classList.add("show");
  
  setTimeout(() => {
    dom.toast.classList.remove("show");
  }, 3000);
}

// Handle portrait photo upload
function handlePortraitUpload(file) {
  if (!file.type.startsWith('image/')) return;
  
  currentState.selfie.portraitFile = file;
  currentState.selfie.portraitFileName = file.name;
  dom.portraitFilename.textContent = file.name;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    currentState.selfie.portraitDataURL = e.target.result;
    dom.portraitPreview.src = e.target.result;
    
    // Show preview and hide upload zone
    dom.uploadZone.style.display = 'none';
    dom.portraitPreviewContainer.style.display = 'flex';
    
    // Update the "My Photo" slot in the celebrity grid
    dom.celebMyPhotoImg.src = e.target.result;
    dom.celebMyPhotoImg.style.display = "block";
    dom.celebMyPhotoPlaceholder.style.display = "none";
    dom.celebMyPhotoLabel.textContent = i18n[currentState.lang].labelMyPhotoLoaded;
    celebrityData.myphoto.image = e.target.result;
    
    // Auto-select the "My Photo" slot in the grid
    dom.celebMyPhoto.checked = true;
    currentState.selfie.celebrity = "myphoto";
    dom.customCelebGroup.style.display = 'none';
    updateMockupImage();
    
    // Add floating user portrait overlay to the mockup preview box
    addPortraitMockupOverlay(e.target.result);
    generatePrompt();
  };
  reader.readAsDataURL(file);
}

// Remove portrait photo upload
function removePortrait() {
  currentState.selfie.portraitFile = null;
  currentState.selfie.portraitFileName = "";
  currentState.selfie.portraitDataURL = "";
  
  dom.userPortraitInput.value = "";
  dom.uploadZone.style.display = 'flex';
  dom.portraitPreviewContainer.style.display = 'none';
  
  // Clear the "My Photo" slot in the celebrity grid
  dom.celebMyPhotoImg.src = "";
  dom.celebMyPhotoImg.style.display = "none";
  dom.celebMyPhotoPlaceholder.style.display = "flex";
  dom.celebMyPhotoLabel.textContent = i18n[currentState.lang].labelMyPhotoAdd;
  celebrityData.myphoto.image = "";
  
  // If "My Photo" was currently selected as the active celebrity, reset selection to Ronaldo
  if (currentState.selfie.celebrity === "myphoto") {
    document.getElementById("celeb-ronaldo").checked = true;
    currentState.selfie.celebrity = "ronaldo";
    updateMockupImage();
  }
  
  // Remove floating overlay from mockup container
  const overlay = document.getElementById("mockup-overlay-portrait");
  if (overlay) {
    overlay.remove();
  }
  generatePrompt();
}

// Add tiny user portrait thumbnail overlay to the mockup container for premium presentation
function addPortraitMockupOverlay(src) {
  // Clear existing if any
  const existing = document.getElementById("mockup-overlay-portrait");
  if (existing) existing.remove();
  
  const container = document.getElementById("mockup-box");
  const overlay = document.createElement("div");
  overlay.id = "mockup-overlay-portrait";
  overlay.style.position = "absolute";
  overlay.style.bottom = "1rem";
  overlay.style.right = "1rem";
  overlay.style.width = "60px";
  overlay.style.height = "60px";
  overlay.style.borderRadius = "50%";
  overlay.style.border = "2px solid var(--accent-cyan)";
  overlay.style.boxShadow = "0 0 15px rgba(6, 182, 212, 0.4)";
  overlay.style.overflow = "hidden";
  overlay.style.zIndex = "20";
  overlay.style.background = "#000";
  overlay.style.transition = "all 0.3s ease";
  
  const img = document.createElement("img");
  img.src = src;
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  
  overlay.appendChild(img);
  container.appendChild(overlay);
}
