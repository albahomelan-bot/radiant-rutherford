# Idea2Prompty v2.0 | Premium Prompt-Engineering Studio

An interactive, high-fidelity prompt engineering web application designed for Andrii Yatsechko (n8n Automation Specialist & AI Integrator). The app combines an **AI Selfie Constructor** (generating professional selfie scenarios next to famous football stars or custom reference characters) and a **Marketing Copywriting Prompt Generator** (tailored to Andrii's custom expert Tone of Voice).

---

## 🤳 Key Features

### 1. AI Selfie Constructor
* **Celebrity Reference Grid**: Instantly generate prompts featuring football stars (Cristiano Ronaldo, Harry Kane, Kylian Mbappé, Erling Haaland, Lamine Yamal) or describe any custom star.
* **My Photo Slot**: Dynamically upload a portrait. The grid slot displays the user's face, auto-selects the card, and updates prompt outputs using the reference photo as the co-subject identity.
* **Appearance & Environment Customization**: Easily tweak subject hair, outfit styles (jerseys, formal wear, streetwear), expressions (smile, smirk, neutral), and scene backgrounds (stadium pitch, press room, locker room, fan cafe).
* **Identity Overlay Mockup**: Features a premium visual mockup placeholder that layers the uploaded portrait over the celebrity template for real-time visual confirmation.

### 📋 2. Smart Copywriting Engine (Andrii's Frameworks)
* **Copywriting Frameworks**: Generate structured prompts for four crucial project stages:
  1. **Project Brief**: Structure client expectations and technical parameters.
  2. **Niche Analysis**: Discover target pain points, desires, and automation bottlenecks.
  3. **4U Offer Generator**: Write high-converting headlines (Urgency, Ultra-specificity, Uniqueness, Usefulness).
  4. **Site Structure Planner**: Map 6-block landing page architectures geared for automation services.
* **Andrii's Tone of Voice Toggle**: Seamlessly injects professional n8n/AI integration credentials and applies strict **Anti-AI copywriting rules** (no corporate jargon, no clichés, human-to-human tone).

### 🤖 3. Multi-Engine Prompt Optimization
Select your target generator to automatically adjust parameters:
* **Midjourney v6**: Appends correct aspect ratios, version flags, and dynamic character reference tags (`--cref [photo_filename]`).
* **DALL-E 3**: Optimizes natural language descriptions for ChatGPT/Copilot.
* **Stable Diffusion**: Prefixes negative embeddings and quality booster syntax.

### 📱 4. Responsive Mobile-First Design
* **Glassmorphism Theme**: Dark space neon accents with modern typography (Outfit/Inter).
* **Mobile Layouts**: Collapsing dashboards, fluid sliders, and custom input chips tailored for smartphone screens.
* **Exit Navigation Button**: Features inline and header links to return to Andrii's main portfolio homepage.

---

## 🛠️ Technology Stack

* **Structure**: Semantic HTML5 markup
* **Styling**: Vanilla CSS3 (Custom properties, Backdrop-filter glassmorphism, media queries)
* **Logic**: Vanilla ES6+ JavaScript (File API readers, state machine, multi-lang UI)
* **Icons**: FontAwesome 6 (free library)
* **Deployment Ready**: Fully static, fast loading, zero external framework dependencies (perfect for Netlify/GitHub Pages).

---

## 🚀 How to Run Locally

1. Clone this repository.
2. Serve the directory using any local development server, or open `index.html` directly in your browser.
3. Example using Python:
   ```bash
   python -m http.server 8080
   ```
4. Example using npm:
   ```bash
   npx http-server -p 8080
   ```
5. Access the app in your browser at `http://localhost:8080/idea2promty2/`.
