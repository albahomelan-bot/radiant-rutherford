// Fallback mock database in case local fetch fails due to CORS (file:// protocol)
const FALLBACK_PROPERTIES = [
  {
    "url": "https://www.century21albania.com/en/property/5842405/shitet-2-1-me-pamje-deti-plazh-rrota-kuqe-atlantic145387.html",
    "title": "Apartment 2+1 for sale with stunning sea view, Rrota e Kuqe, Durres",
    "price": "125,000 €",
    "category": "Sale",
    "area": "98 m2",
    "bedrooms": "2",
    "description": "Premium apartment 2+1 for sale in one of the best areas of Durres, near Rrota e Kuqe. Located on the 6th floor of a new building with elevator. Features a spacious living room, two bedrooms, a bathroom, and a balcony with an amazing frontal sea view. Fully furnished with high-quality modern furniture, air conditioning in every room. Perfect for living or investment.",
    "agentName": "Enea Atlantic",
    "agentPhone": "+355691234567",
    "lastModified": "2026-07-20T08:15:00.000Z",
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    "city": "Durrës",
    "district": "Plazh"
  },
  {
    "url": "https://www.century21albania.com/en/property/5842402/shitet-ambient-biznesi-ne-nje-nga-zonat-me-te-kerkuara-te-plazhit-durres-atlantic145385.html",
    "title": "Commercial space on the beachfront for sale, Durres Plazh",
    "price": "240,000 €",
    "category": "Sale",
    "area": "120 m2",
    "bedrooms": "0",
    "description": "Excellent commercial space for sale located directly on the beach front / promenade of Durres Plazh. Ground floor with large glass windows offering maximum visibility and access. Ideal for cafe, restaurant, office, or shop. Brand new building construction (2024). Outstanding investment opportunity with high ROI.",
    "agentName": "Enea Atlantic",
    "agentPhone": "+355691234567",
    "lastModified": "2026-07-20T08:15:00.000Z",
    "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    "city": "Durrës",
    "district": "Plazh"
  },
  {
    "url": "https://www.century21albania.com/en/property/5841564/apartament-1-1-per-shitje-ne-golem-perball-hotel-flower-pallat-i-ri-2025-roy145372.html",
    "title": "Modern Apartment 1+1 for sale in Golem, near Hotel Flower",
    "price": "68,000 €",
    "category": "Sale",
    "area": "64 m2",
    "bedrooms": "1",
    "description": "Cozy and modern apartment 1+1 for sale in Golem, situated in a highly preferred residential and touristic zone. Located on the 3rd floor of a brand new building (completed in 2025) with elevator. Front sea view from the balcony. Fully furnished with new modern furniture, household appliances, and luxury interior design. Just 150 meters from the sandy beach.",
    "agentName": "Roy Durres",
    "agentPhone": "+355697654321",
    "lastModified": "2026-07-20T08:10:00.000Z",
    "image": "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80",
    "city": "Durrës",
    "district": "Golem"
  },
  {
    "url": "https://www.century21albania.com/en/property/5839120/jepet-me-qira-apartament-luks-2-1-perball-detit-ne-vollga-durres.html",
    "title": "Luxury Apartment 2+1 for rent with sea view, Vollga, Durres",
    "price": "800 €",
    "category": "Rent",
    "area": "110 m2",
    "bedrooms": "2",
    "description": "Luxury apartment 2+1 available for long-term rent in the most premium waterfront area of Durres - Vollga. Located on the 5th floor of a high-quality building. Frontal panoramic sea views from the large terrace. Custom modern design, high-end Italian furniture, central heating/cooling system, fully equipped kitchen. Under floor parking space included.",
    "agentName": "Kristi Durres",
    "agentPhone": "+355693334445",
    "lastModified": "2026-07-20T08:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80",
    "city": "Durrës",
    "district": "Vollga"
  },
  {
    "url": "https://www.century21albania.com/en/property/5840901/apartament-1-1-per-shitje-ne-qerret-zone-e-qete.html",
    "title": "Apartment 1+1 for sale in Qerret in a quiet pine forest zone",
    "price": "59,000 €",
    "category": "Sale",
    "area": "58 m2",
    "bedrooms": "1",
    "description": "Lovely 1+1 apartment for sale in Qerret, Durres, located in a quiet green zone surrounded by pine trees. Located on the 2nd floor, only 5 minutes walking distance from the sea. The apartment is unfurnished, giving you the freedom to design it as you wish. Brand new construction. Perfect holiday home or rental investment.",
    "agentName": "Roy Durres",
    "agentPhone": "+355697654321",
    "lastModified": "2026-07-20T07:30:00.000Z",
    "image": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
    "city": "Durrës",
    "district": "Qerret"
  },
  {
    "url": "https://www.century21albania.com/en/property/5841002/jepet-me-qira-apartament1-1-modern-blloku-tirane.html",
    "title": "Modern 1+1 apartment for rent in Bllok, Tirana center",
    "price": "600 €",
    "category": "Rent",
    "area": "62 m2",
    "bedrooms": "1",
    "description": "Cozy and fully furnished 1+1 apartment for rent in the most famous district of Tirana - Bllok. Located on the 4th floor of a well-maintained building with elevator. Features a modern living room, bedroom, bathroom, and balcony. High-quality appliances, air conditioning, fiber-optic internet. Excellent city center location close to all restaurants and shops.",
    "agentName": "Alban Tirana",
    "agentPhone": "+355691112223",
    "lastModified": "2026-07-20T07:20:00.000Z",
    "image": "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=600&q=80",
    "city": "Tirana",
    "district": "Blloku"
  },
  {
    "url": "https://www.century21albania.com/en/property/5842100/apartament-luks-3-1-shitet-prane-liqenit-te-tiranes.html",
    "title": "Premium 3+1 Apartment for sale near Tirana Lake Park",
    "price": "310,000 €",
    "category": "Sale",
    "area": "145 m2",
    "bedrooms": "3",
    "description": "Stunning luxury 3+1 apartment for sale near the Grand Park of Tirana Lake. Premium location in a brand new high-end residential complex. Spacious layout: large open-plan living and dining area, master bedroom with en-suite bathroom and walk-in closet, two children bedrooms, second bathroom, and a large terrace. Fully furnished with custom designed furniture, smart home automation, and floor heating.",
    "agentName": "Kristi Tirana",
    "agentPhone": "+355693334445",
    "lastModified": "2026-07-20T07:00:00.000Z",
    "image": "https://images.unsplash.com/photo-1545464693-f1798a373343?auto=format&fit=crop&w=600&q=80",
    "city": "Tirana",
    "district": "Lake Park"
  }
];

// District Mapping based on City
const CITY_DISTRICTS = {
  "Durrës": ["Qerret", "Golem", "Mali i Robit", "Plazh", "Spitali", "Shkëmbi i Kavajës", "Plazh Hekurudha", "Hamallaj", "Gjiri i Lalzit", "Vollga", "Rruga Adria"],
  "Tirana": ["Blloku", "Lake Park", "Don Bosko", "Ali Demi", "Komuna e Parisit", "Selite"]
};

// Global App State
let listings = [];
let favorites = [];
let currentActiveTab = 'catalog';
let activeProperty = null;

// Filters State
let filterState = {
  searchQuery: '',
  translatedQueries: [],
  category: 'all',
  city: 'all',
  districts: [],
  priceMin: null,
  priceMax: null,
  rooms: 'all',
  propertyType: 'all',
  tagSeaView: false,
  tagFurnished: false,
  tagNewBuilding: false,
  sortBy: 'newest'
};

// Telegram WebApp Initialization
const tg = window.Telegram ? window.Telegram.WebApp : null;
if (tg) {
  tg.ready();
  tg.expand();
}

// Elements
const appContent = document.querySelector('.app-content');
const catalogSection = document.getElementById('catalogSection');
const emptyState = document.getElementById('emptyState');
const favCount = document.getElementById('favCount');
const searchInput = document.getElementById('searchInput');
const filterBtn = document.getElementById('filterBtn');

const tabCatalog = document.getElementById('tabCatalog');
const tabFavorites = document.getElementById('tabFavorites');

// Drawer & Modal Elements
const filtersDrawer = document.getElementById('filtersDrawer');
const closeFiltersBtn = document.getElementById('closeFiltersBtn');
const applyFiltersBtn = document.getElementById('applyFiltersBtn');
const resetFiltersBtn = document.getElementById('resetFiltersBtn');
const resetFiltersLink = document.getElementById('resetFiltersLink');

const citySelect = document.getElementById('citySelect');
const districtGroup = document.getElementById('districtGroup');
const districtsList = document.getElementById('districtsList');

const detailModal = document.getElementById('detailModal');
const backToCatalogBtn = document.getElementById('backToCatalogBtn');
const modalFavBtn = document.getElementById('modalFavBtn');
const inquiryBtn = document.getElementById('inquiryBtn');
const toast = document.getElementById('toast');

// Fetch with custom timeout helper to prevent hanging on slow APIs
async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 3500 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(resource, {
    ...options,
    signal: controller.signal
  });
  clearTimeout(id);
  return response;
}

// Initialize App
async function init() {
  // Check Onboarding state
  const isOnboarded = localStorage.getItem('c21_onboarded');
  const onboardingOverlay = document.getElementById('onboardingOverlay');
  const mainInterface = document.getElementById('mainInterface');
  if (isOnboarded === 'true') {
    onboardingOverlay.classList.add('hidden');
    mainInterface.classList.remove('blur-effect');
  } else {
    // Setup onboarding language and greetings
    let defaultLang = localStorage.getItem('c21_lang');
    if (!defaultLang && tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
      const tgLang = tg.initDataUnsafe.user.language_code;
      if (tgLang) {
        if (tgLang.startsWith('uk') || tgLang.startsWith('ua')) defaultLang = 'uk';
        else if (tgLang.startsWith('ru')) defaultLang = 'ru';
        else if (tgLang.startsWith('sq')) defaultLang = 'sq';
        else defaultLang = 'en';
      }
    }
    if (!defaultLang) defaultLang = 'uk'; // Default language

    // Select the correct flag button state
    const onboardingLangBtns = document.querySelectorAll('.onboarding-lang-btn');
    onboardingLangBtns.forEach(btn => {
      if (btn.dataset.lang === defaultLang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    translateOnboarding(defaultLang);
  }

  // Load Favorites from LocalStorage
  try {
    const savedFavs = localStorage.getItem('c21_favorites');
    favorites = savedFavs ? JSON.parse(savedFavs) : [];
  } catch (e) {
    favorites = [];
  }
  updateFavCount();

  // Try to load listings from live API, fallback to local file, fallback to embedded data
  let loaded = false;
  const urlParams = new URLSearchParams(window.location.search);
  const customApiUrl = urlParams.get('api_url');
  const apiUrls = [];
  if (customApiUrl) apiUrls.push(customApiUrl);
  apiUrls.push('https://albasever.app.n8n.cloud/webhook/properties');
  apiUrls.push('properties_mock.json');

  for (const url of apiUrls) {
    try {
      console.log(`Attempting to load from: ${url}...`);
      const response = await fetchWithTimeout(url, { timeout: 3500 });
      if (response.ok) {
        listings = await response.json();
        loaded = true;
        console.log(`Loaded listings successfully from: ${url}`);
        break;
      }
    } catch (e) {
      console.warn(`Failed to fetch from ${url} (aborted or offline):`, e.message);
    }
  }

  if (!loaded) {
    listings = FALLBACK_PROPERTIES;
    console.log('Loaded listings from embedded fallback data');
  }

  // Reverse listings array so the newest items (at the bottom of the Google Sheet) appear first
  if (Array.isArray(listings)) {
    listings.reverse();
  }

  // Setup Event Listeners
  setupEventListeners();

  
  // Parse URL Parameters (allows deep-linking filters from n8n bot NLP queries)
  parseUrlParams();

  // Render initial catalog
  render();
}

// Setup Event Listeners
function setupEventListeners() {
  // Tab Switching
  tabCatalog.addEventListener('click', () => switchTab('catalog'));
  tabFavorites.addEventListener('click', () => switchTab('favorites'));

  // Search input change with smart translation debounce
  let searchTimeout = null;
  searchInput.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    
    // Clear previous timeout
    if (searchTimeout) clearTimeout(searchTimeout);
    
    if (val === '') {
      filterState.searchQuery = '';
      filterState.translatedQueries = [];
      render();
      return;
    }
    
    // Check if contains Cyrillic characters (Ukrainian / Russian)
    const hasCyrillic = /[а-яА-ЯёЁіІїЇєЄґҐ]/.test(val);
    if (hasCyrillic) {
      // Debounce translation (400ms) to prevent excessive API requests
      searchTimeout = setTimeout(async () => {
        try {
          const [enTrans, sqTrans] = await Promise.all([
            fetchGoogleTranslate(val, 'en'),
            fetchGoogleTranslate(val, 'sq')
          ]);
          filterState.searchQuery = val;
          filterState.translatedQueries = [
            val, 
            enTrans.toLowerCase(), 
            sqTrans.toLowerCase()
          ];
          console.log("Translated search query to:", filterState.translatedQueries);
          render();
        } catch (err) {
          console.error("Search query translation error:", err);
          filterState.searchQuery = val;
          filterState.translatedQueries = [val];
          render();
        }
      }, 400);
    } else {
      filterState.searchQuery = val;
      filterState.translatedQueries = [val];
      render();
    }
  });

  // Filter Drawer Toggle
  filterBtn.addEventListener('click', openFiltersDrawer);
  closeFiltersBtn.addEventListener('click', closeFiltersDrawer);
  document.querySelector('.drawer-overlay').addEventListener('click', closeFiltersDrawer);

  // City change inside Filters -> dynamically update Districts list
  citySelect.addEventListener('change', (e) => {
    updateDistrictsOptions(e.target.value);
  });

  // Category & Rooms toggle chips inside Filters
  setupChips('categoryToggles', (val) => { filterState.category = val; });
  setupChips('roomsToggles', (val) => { filterState.rooms = val; });
  setupChips('typeToggles', (val) => { filterState.propertyType = val; });

  // Apply & Reset filters
  applyFiltersBtn.addEventListener('click', applyFilters);
  resetFiltersBtn.addEventListener('click', resetFilters);
  resetFiltersLink.addEventListener('click', () => {
    resetFilters();
    render();
  });

  // Detail Modal Actions
  backToCatalogBtn.addEventListener('click', closeDetailModal);
  document.querySelector('.modal-overlay').addEventListener('click', closeDetailModal);
  
  modalFavBtn.addEventListener('click', () => {
    if (activeProperty) {
      toggleFavorite(activeProperty.url);
      updateModalFavBtnState(activeProperty.url);
      render();
    }
  });

  inquiryBtn.addEventListener('click', sendInquiryToManager);

  // Realtime Translation Buttons Actions
  const translateBtns = document.querySelectorAll('.translate-btn');
  translateBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      if (!activeProperty) return;
      const targetLang = btn.dataset.lang;
      
      // Update UI active state
      translateBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      await translatePropertyDetails(activeProperty, targetLang);
    });
  });

  // Onboarding Button Action
  const startSearchBtn = document.getElementById('startSearchBtn');
  if (startSearchBtn) {
    startSearchBtn.addEventListener('click', () => {
      const onboardingOverlay = document.getElementById('onboardingOverlay');
      const mainInterface = document.getElementById('mainInterface');
      
      onboardingOverlay.style.opacity = '0';
      mainInterface.classList.remove('blur-effect');
      
      localStorage.setItem('c21_onboarded', 'true');
      
      setTimeout(() => {
        onboardingOverlay.classList.add('hidden');
      }, 350);
    });
  }

  // Onboarding Language Buttons Action
  const onboardingLangBtns = document.querySelectorAll('.onboarding-lang-btn');
  onboardingLangBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetLang = btn.dataset.lang;
      
      // Update UI active state
      onboardingLangBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Translate onboarding card
      translateOnboarding(targetLang);
    });
  });

  // Infinite Scroll scroll listener inside the app-content container
  if (appContent) {
    appContent.addEventListener('scroll', () => {
      // Check if scrolled near the bottom of the container (300px threshold)
      if (appContent.scrollTop + appContent.clientHeight >= appContent.scrollHeight - 300) {
        if (renderedCount < activeFilteredList.length) {
          renderNextPage();
        }
      }
    });
  }
}


// Switch between Catalog & Favorites tabs
function switchTab(tab) {
  currentActiveTab = tab;
  if (tab === 'catalog') {
    tabCatalog.classList.add('active');
    tabFavorites.classList.remove('active');
  } else {
    tabCatalog.classList.remove('active');
    tabFavorites.classList.add('active');
  }
  render();
}

// Set up UI toggle chips click logic
function setupChips(containerId, callback) {
  const container = document.getElementById(containerId);
  const chips = container.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      callback(chip.dataset.value);
    });
  });
}

// Open/Close slide drawers
function openFiltersDrawer() {
  filtersDrawer.classList.add('active');
  filtersDrawer.classList.remove('hidden');
}

function closeFiltersDrawer() {
  filtersDrawer.classList.remove('active');
  setTimeout(() => {
    if (!filtersDrawer.classList.contains('active')) {
      filtersDrawer.classList.add('hidden');
    }
  }, 300);
}

// Dynamically update districts checklist based on selected city
function updateDistrictsOptions(city) {
  districtsList.innerHTML = '';
  if (city === 'all' || !CITY_DISTRICTS[city]) {
    districtGroup.classList.add('hidden');
    filterState.districts = [];
    return;
  }

  districtGroup.classList.remove('hidden');
  const list = CITY_DISTRICTS[city];
  list.forEach(district => {
    const label = document.createElement('label');
    label.className = 'checkbox-label';
    
    const isChecked = filterState.districts.includes(district);
    
    label.innerHTML = `
      <input type="checkbox" value="${district}" ${isChecked ? 'checked' : ''}>
      <span class="checkbox-custom"></span>
      ${district}
    `;
    
    label.querySelector('input').addEventListener('change', (e) => {
      if (e.target.checked) {
        if (!filterState.districts.includes(district)) filterState.districts.push(district);
      } else {
        filterState.districts = filterState.districts.filter(d => d !== district);
      }
    });
    
    districtsList.appendChild(label);
  });
}

// Apply chosen filters
function applyFilters() {
  // Read inputs
  filterState.priceMin = parseInputNumber('priceMin');
  filterState.priceMax = parseInputNumber('priceMax');
  filterState.city = citySelect.value;
  
  filterState.tagSeaView = document.getElementById('tagSeaView').checked;
  filterState.tagFurnished = document.getElementById('tagFurnished').checked;
  filterState.tagNewBuilding = document.getElementById('tagNewBuilding').checked;
  
  filterState.sortBy = document.getElementById('sortSelect').value;

  closeFiltersDrawer();
  
  // Update UI style of filter button to active if any filters applied
  const isFiltered = filterState.category !== 'all' || filterState.city !== 'all' || 
                     filterState.priceMin || filterState.priceMax || filterState.rooms !== 'all' ||
                     filterState.propertyType !== 'all' || filterState.districts.length > 0 ||
                     filterState.tagSeaView || filterState.tagFurnished || filterState.tagNewBuilding;
                     
  if (isFiltered) {
    filterBtn.classList.add('active');
  } else {
    filterBtn.classList.remove('active');
  }

  render();
}

// Reset filters to default state
function resetFilters() {
  filterState = {
    searchQuery: searchInput.value.toLowerCase(),
    translatedQueries: [],
    category: 'all',
    city: 'all',
    districts: [],
    priceMin: null,
    priceMax: null,
    rooms: 'all',
    propertyType: 'all',
    tagSeaView: false,
    tagFurnished: false,
    tagNewBuilding: false,
    sortBy: 'newest'
  };

  // Reset UI Inputs
  document.getElementById('priceMin').value = '';
  document.getElementById('priceMax').value = '';
  document.getElementById('tagSeaView').checked = false;
  document.getElementById('tagFurnished').checked = false;
  document.getElementById('tagNewBuilding').checked = false;
  
  citySelect.value = 'all';
  updateDistrictsOptions('all');

  document.getElementById('sortSelect').value = 'newest';

  // Reset toggle chips
  resetChips('categoryToggles', 'all');
  resetChips('roomsToggles', 'all');
  resetChips('typeToggles', 'all');

  filterBtn.classList.remove('active');
  closeFiltersDrawer();
}

// Utility to reset active class on toggle chips
function resetChips(containerId, defaultValue) {
  const container = document.getElementById(containerId);
  const chips = container.querySelectorAll('.chip');
  chips.forEach(chip => {
    if (chip.dataset.value === defaultValue) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

// Helper to safely parse inputs
function parseInputNumber(id) {
  const val = document.getElementById(id).value;
  return val === '' ? null : Number(val);
}

// Check URL search parameters (deep-linking NLP queries)
function parseUrlParams() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('category')) {
    filterState.category = params.get('category');
    resetChips('categoryToggles', filterState.category);
  }
  if (params.has('city')) {
    filterState.city = params.get('city');
    citySelect.value = filterState.city;
    updateDistrictsOptions(filterState.city);
  }
  if (params.has('rooms')) {
    filterState.rooms = params.get('rooms');
    resetChips('roomsToggles', filterState.rooms);
  }
  if (params.has('priceMax')) {
    filterState.priceMax = Number(params.get('priceMax'));
    document.getElementById('priceMax').value = filterState.priceMax;
  }
  if (params.has('priceMin')) {
    filterState.priceMin = Number(params.get('priceMin'));
    document.getElementById('priceMin').value = filterState.priceMin;
  }
  
  const isFiltered = filterState.category !== 'all' || filterState.city !== 'all' || filterState.rooms !== 'all' || filterState.priceMax || filterState.priceMin;
  if (isFiltered) {
    filterBtn.classList.add('active');
  }
}

// Smart keyword matching function for special tags
function matchesSmartTag(property, tagType) {
  const desc = (property.description || '').toLowerCase();
  const title = (property.title || '').toLowerCase();
  const text = title + ' ' + desc;

  if (tagType === 'seaView') {
    return text.includes('sea view') || text.includes('pamje nga deti') || text.includes('вид на море') || text.includes('front line') || text.includes('beach');
  }
  if (tagType === 'furnished') {
    return text.includes('furnished') || text.includes('i mobiluar') || text.includes('мебльован') || text.includes('обставлен');
  }
  if (tagType === 'newBuilding') {
    return text.includes('new building') || text.includes('pallat i ri') || text.includes('completed in 202') || text.includes('construction 202') || text.includes('будівля 202');
  }
  return true;
}

// Render Listings Grid with Progressive Loading (Infinite Scroll / Pagination)
let renderedCount = 0;
const ITEMS_PER_PAGE = 15;
let activeFilteredList = [];

function renderNextPage() {
  const nextSlice = activeFilteredList.slice(renderedCount, renderedCount + ITEMS_PER_PAGE);
  if (nextSlice.length === 0) return;

  nextSlice.forEach(item => {
    const isFav = favorites.includes(item.url);
    const card = document.createElement('div');
    card.className = 'property-card';
    
    // Crash-proof fallbacks for missing/null properties
    const itemCategory = item.category || 'Sale';
    const categoryClass = itemCategory.toLowerCase();
    const categoryText = itemCategory === 'Sale' ? 'Продаж' : 'Оренда';
    const itemImage = item.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80';
    const itemTitle = item.title || 'Об\'єкт нерухомості';
    const itemPrice = item.price || 'Ціна за запитом';
    const itemCity = item.city || 'Durrës';
    const itemDistrict = item.district || '';
    const itemArea = item.area || '0 m2';
    const itemBedrooms = item.bedrooms || '0';
    
    card.innerHTML = `
      <div class="card-image-wrapper">
        <img src="${itemImage}" alt="${itemTitle}">
        <div class="card-category-badge ${categoryClass}">${categoryText}</div>
        <button class="card-fav-btn ${isFav ? 'active' : ''}">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>
      <div class="card-details">
        <div class="card-price">${itemPrice}</div>
        <div class="card-title">${itemTitle}</div>
        <div class="card-location">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          ${itemCity}${itemDistrict ? ', ' + itemDistrict : ''}
        </div>
        <div class="card-stats">
          <div class="card-stat">📏 ${itemArea}</div>
          <div class="card-stat">🛏 ${itemBedrooms} кімн.</div>
        </div>
      </div>
    `;

    // Click on Favourites button inside card
    const favBtn = card.querySelector('.card-fav-btn');
    favBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleFavorite(item.url);
      favBtn.classList.toggle('active');
      render();
    });

    // Click on Card opens Detailed Modal
    card.addEventListener('click', () => {
      openDetailModal(item);
    });

    catalogSection.appendChild(card);
  });

  renderedCount += nextSlice.length;
}

function render() {
  catalogSection.innerHTML = '';
  
  // 1. Filter listings
  let filtered = listings.filter(item => {
    // Search bar matching (smart multi-lingual match)
    if (filterState.searchQuery) {
      const title = (item.title || '').toLowerCase();
      const desc = (item.description || '').toLowerCase();
      
      const isMatch = filterState.translatedQueries.some(term => {
        if (!term) return false;
        return title.includes(term) || desc.includes(term);
      });
      
      if (!isMatch) return false;
    }
    
    // Category (Sale/Rent)
    if (filterState.category !== 'all' && item.category !== filterState.category) {
      return false;
    }
    
    // City
    if (filterState.city !== 'all' && item.city !== filterState.city) {
      return false;
    }
    
    // Districts
    if (filterState.districts.length > 0 && !filterState.districts.includes(item.district)) {
      return false;
    }
    
    // Price
    const numericPrice = Number(String(item.price || '').replace(/[^0-9]/g, ''));
    if (filterState.priceMin && numericPrice < filterState.priceMin) return false;
    if (filterState.priceMax && numericPrice > filterState.priceMax) return false;
    
    // Rooms
    if (filterState.rooms !== 'all') {
      const itemRooms = Number(item.bedrooms || 0);
      if (filterState.rooms === '3+') {
        if (itemRooms < 3) return false;
      } else {
        if (itemRooms !== Number(filterState.rooms)) return false;
      }
    }
    
    // Property Type
    if (filterState.propertyType !== 'all' && item.type !== filterState.propertyType) {
      return false;
    }

    // Special Tags
    if (filterState.tagSeaView && !matchesSmartTag(item, 'seaView')) return false;
    if (filterState.tagFurnished && !matchesSmartTag(item, 'furnished')) return false;
    if (filterState.tagNewBuilding && !matchesSmartTag(item, 'newBuilding')) return false;

    return true;
  });

  // If Favourites tab is active, only show liked items
  if (currentActiveTab === 'favorites') {
    filtered = filtered.filter(item => favorites.includes(item.url));
  }

  // 2. Sort listings
  filtered.sort((a, b) => {
    const priceA = Number(String(a.price || '').replace(/[^0-9]/g, ''));
    const priceB = Number(String(b.price || '').replace(/[^0-9]/g, ''));
    
    if (filterState.sortBy === 'cheapest') {
      return priceA - priceB;
    }
    if (filterState.sortBy === 'expensive') {
      return priceB - priceA;
    }
    // Default: newest first
    return new Date(b.lastModified) - new Date(a.lastModified);
  });

  // 3. Setup active list and render first page
  activeFilteredList = filtered;
  renderedCount = 0;

  if (activeFilteredList.length === 0) {
    emptyState.classList.remove('hidden');
    catalogSection.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  catalogSection.classList.remove('hidden');

  renderNextPage();
}


// Toggle Favorites item state in localStorage
function toggleFavorite(url) {
  if (favorites.includes(url)) {
    favorites = favorites.filter(f => f !== url);
  } else {
    favorites.push(url);
  }
  localStorage.setItem('c21_favorites', JSON.stringify(favorites));
  updateFavCount();
}

function updateFavCount() {
  favCount.textContent = favorites.length;
}

// Detailed View Modal Actions
function openDetailModal(item) {
  activeProperty = item;
  
  document.getElementById('detailImage').src = item.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80';
  document.getElementById('detailCategory').textContent = item.category === 'Sale' ? 'Продаж' : 'Оренда';
  document.getElementById('detailTitle').textContent = item.title;
  document.getElementById('detailPrice').textContent = item.price;
  document.getElementById('detailLocText').textContent = `${item.city}, ${item.district}`;
  document.getElementById('detailArea').textContent = item.area;
  document.getElementById('detailBedrooms').textContent = item.bedrooms;
  document.getElementById('detailDescription').textContent = item.description;
  document.getElementById('detailAgentName').textContent = item.agentName;
  
  updateModalFavBtnState(item.url);
  resetTranslateButtons();

  detailModal.classList.add('active');
  detailModal.classList.remove('hidden');
}

function closeDetailModal() {
  detailModal.classList.remove('active');
  setTimeout(() => {
    if (!detailModal.classList.contains('active')) {
      detailModal.classList.add('hidden');
    }
  }, 350);
  activeProperty = null;
}

function updateModalFavBtnState(url) {
  if (favorites.includes(url)) {
    modalFavBtn.classList.add('active');
  } else {
    modalFavBtn.classList.remove('active');
  }
}

// Send inquiry details back to n8n Telegram Bot
function sendInquiryToManager() {
  if (!activeProperty) return;

  const leadData = {
    action: "property_inquiry",
    property: {
      url: activeProperty.url,
      title: activeProperty.title,
      price: activeProperty.price,
      city: activeProperty.city,
      district: activeProperty.district,
      agentName: activeProperty.agentName,
      agentPhone: activeProperty.agentPhone
    },
    user: tg && tg.initDataUnsafe && tg.initDataUnsafe.user ? {
      id: tg.initDataUnsafe.user.id,
      firstName: tg.initDataUnsafe.user.first_name || '',
      lastName: tg.initDataUnsafe.user.last_name || '',
      username: tg.initDataUnsafe.user.username || '',
      languageCode: tg.initDataUnsafe.user.language_code || ''
    } : null
  };

  // If running inside Telegram, send data back to Bot
  if (tg) {
    tg.sendData(JSON.stringify(leadData));
    showToast("Запит надіслано в чат-бот!");
    setTimeout(() => {
      tg.close();
    }, 1500);
  } else {
    // Web browser simulation fallback
    console.log("WebApp sendData to bot:", leadData);
    showToast("Успішно! (Симуляція для браузера)");
  }
}

// Global Translation Memory Cache
let translationCache = {};

// Translate Property Title & Description
async function translatePropertyDetails(property, lang) {
  const titleEl = document.getElementById('detailTitle');
  const descEl = document.getElementById('detailDescription');
  const loaderEl = document.getElementById('translateLoader');
  
  const originalTitle = property.title;
  const originalDesc = property.description;
  
  if (lang === 'sq') {
    titleEl.textContent = originalTitle;
    descEl.textContent = originalDesc;
    return;
  }
  
  // Check memory cache
  if (translationCache[property.url] && translationCache[property.url][lang]) {
    const cached = translationCache[property.url][lang];
    titleEl.textContent = cached.title;
    descEl.textContent = cached.description;
    return;
  }
  
  // Show loader overlay
  loaderEl.classList.remove('hidden');
  
  try {
    const [translatedTitle, translatedDesc] = await Promise.all([
      fetchGoogleTranslate(originalTitle, lang),
      fetchGoogleTranslate(originalDesc, lang)
    ]);
    
    // Save to cache
    if (!translationCache[property.url]) {
      translationCache[property.url] = {};
    }
    translationCache[property.url][lang] = {
      title: translatedTitle,
      description: translatedDesc
    };
    
    titleEl.textContent = translatedTitle;
    descEl.textContent = translatedDesc;
  } catch (e) {
    console.error("Translation error:", e);
    showToast("Помилка завантаження перекладу");
    titleEl.textContent = originalTitle;
    descEl.textContent = originalDesc;
    resetTranslateButtons();
  } finally {
    loaderEl.classList.add('hidden');
  }
}

// Free Google Translation API Fetcher
async function fetchGoogleTranslate(text, toLang) {
  if (!text || text.trim() === '') return '';
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Translation API failed");
  const data = await response.json();
  return data[0].map(item => item[0]).join('');
}

// Reset translate flags state to Sq (Albanian)
function resetTranslateButtons() {
  const translateBtns = document.querySelectorAll('.translate-btn');
  translateBtns.forEach(btn => {
    if (btn.dataset.lang === 'sq') {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Display float notification toast
function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.style.opacity = 1;
  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 300);
  }, 2000);
}

// Pre-defined static translations for Onboarding Screen
// Pre-defined static translations for Onboarding Screen
const ONBOARDING_TRANSLATIONS = {
  uk: {
    welcome: "Вітаємо, {name}!",
    welcomeDefault: "Century 21 Albania",
    subtitle: "Ваш персональний AI-помічник з пошуку найкращої нерухомості в Дурресі та Тирані.",
    f1Title: "Розумний пошук",
    f1Desc: "Шукайте будь-якою мовою (UA, EN, SQ, RU) — бот перекладає на льоту.",
    f2Title: "Гнучкі фільтри",
    f2Desc: "Швидко відбирайте об'єкти за бюджетом, спальнями та типом нерухомості.",
    f3Title: "Розумні теги",
    f3Desc: "Миттєво знаходьте варіанти з видом на море чи з меблями.",
    f4Title: "Список обраного",
    f4Desc: "Зберігайте найкращі квартири та надсилайте запит в один клік.",
    btn: "🚀 Почати пошук"
  },
  en: {
    welcome: "Welcome, {name}!",
    welcomeDefault: "Century 21 Albania",
    subtitle: "Your personal AI assistant for finding the best real estate in Durrës and Tirana.",
    f1Title: "Smart Search",
    f1Desc: "Search in any language (UA, EN, SQ, RU) — the bot translates on the fly.",
    f2Title: "Flexible Filters",
    f2Desc: "Quickly select properties by budget, bedrooms, and property type.",
    f3Title: "Smart Tags",
    f3Desc: "Instantly find options with sea view or fully furnished.",
    f4Title: "Favorites List",
    f4Desc: "Save the best properties and send a request to the manager in one click.",
    btn: "🚀 Start Search"
  },
  sq: {
    welcome: "Përshëndetje, {name}!",
    welcomeDefault: "Century 21 Albania",
    subtitle: "Asistenti juaj personal AI për gjetjen e pronave më të mira në Durrës dhe Tiranë.",
    f1Title: "Kërkim inteligjent",
    f1Desc: "Kërkoni në çdo gjuhë (UA, EN, SQ, RU) — boti përkthen në fluturim.",
    f2Title: "Filtra fleksibël",
    f2Desc: "Zgjidhni shpejt pronat sipas buxhetit, dhomave të gjumit dhe llojit të pronës.",
    f3Title: "Etiketa inteligjente",
    f3Desc: "Gjeni menjëherë opsione me pamje nga deti ose të mobiluara plotësisht.",
    f4Title: "Lista e të preferuarave",
    f4Desc: "Ruani pronat më të mira dhe dërgoni një kërkesë te menaxheri me një klikim.",
    btn: "🚀 Fillo Kërkimin"
  },
  ru: {
    welcome: "Привет, {name}!",
    welcomeDefault: "Century 21 Albania",
    subtitle: "Ваш персональный AI-помощник по поиску лучшей недвижимости в Дурресе и Тиране.",
    f1Title: "Умный поиск",
    f1Desc: "Ищите на любом языке (UA, EN, SQ, RU) — бот переводит на лету.",
    f2Title: "Гибкие фильтры",
    f2Desc: "Быстро отбирайте объекты по бюджету, спальням и типу недвижимости.",
    f3Title: "Умные теги",
    f3Desc: "Мгновенно находите варианты с видом на море или с мебелью.",
    f4Title: "Список избранного",
    f4Desc: "Сохраняйте лучшие квартиры и отправляйте запрос в один кл`ик.",
    btn: "🚀 Начать поиск"
  }
};

async function translateOnboarding(lang) {
  const loader = document.getElementById('onboardingLoader');
  loader.classList.remove('hidden');
  
  try {
    const data = ONBOARDING_TRANSLATIONS[lang];
    if (data) {
      // Auto-replace name placeholder if Telegram first_name is available
      let welcomeTitle = data.welcomeDefault;
      if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.first_name) {
        welcomeTitle = data.welcome.replace('{name}', tg.initDataUnsafe.user.first_name);
      }
      
      document.getElementById('onboardingTitle').textContent = welcomeTitle;
      document.getElementById('onboardingSubtitle').textContent = data.subtitle;
      document.getElementById('onboardingF1Title').textContent = data.f1Title;
      document.getElementById('onboardingF1Desc').textContent = data.f1Desc;
      document.getElementById('onboardingF2Title').textContent = data.f2Title;
      document.getElementById('onboardingF2Desc').textContent = data.f2Desc;
      document.getElementById('onboardingF3Title').textContent = data.f3Title;
      document.getElementById('onboardingF3Desc').textContent = data.f3Desc;
      document.getElementById('onboardingF4Title').textContent = data.f4Title;
      document.getElementById('onboardingF4Desc').textContent = data.f4Desc;
      document.getElementById('startSearchBtn').textContent = data.btn;
      
      // Save chosen language to storage
      localStorage.setItem('c21_lang', lang);
    }
  } catch (e) {
    console.error("Error setting onboarding text language:", e);
  } finally {
    // Add visual delay for styling
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 150);
  }
}

// Run app init
window.addEventListener('DOMContentLoaded', init);
