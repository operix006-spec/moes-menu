/**
 * Moe's PureBite — Customer Storefront Controller
 * Mobile-First 100% Gluten-Free Restaurant Ordering System
 */

const CustomerApp = {
  activeCategory: "all",
  currentModalProduct: null,
  currentModalState: {
    quantity: 1,
    selectedOptions: {}, // { [groupId]: optionId }
    removedIngredients: [], // [ingredientId]
    addedModifiers: [] // [modifierId]
  },

  T(obj, field) {
    if (!obj) return "";
    const lang = (typeof MoeStore !== 'undefined' && MoeStore.getLang) ? MoeStore.getLang() : "en";

    if (lang === "ar") {
      if (obj[`${field}_ar`]) {
        return obj[`${field}_ar`];
      }

      const fallback = {
        "Sandwich Only": "ساندويش فقط",
        "Full Meal (+ Fries & Kinza)": "وجبة كاملة (+ بطاطا وكنزا)",
        "Extra Special Sauce": "صوص خاص إضافي",
        "Extra Cheese": "جبنة إضافية",
        "Extra Garlic Sauce": "ثومية إضافية",
        "Extra Pickles": "مخلل إضافي",
        "Extra Bread": "خبز إضافي",
        "Caesar Dressing": "صوص سيزر",
        "Tahini Sauce": "صوص طحينية",
        "Spicy Sauce": "صوص حار",
        "Gluten-Free Bun": "خبز برجر خالي من الغلوتين",
        "Crispy Chicken Fillet": "فيليه دجاج مقرمش",
        "Lettuce": "خس",
        "Cheese": "جبنة",
        "Tomato": "بندورة",
        "Special Sauce": "صوص خاص",
        "Pickles": "مخلل",
        "Garlic Sauce": "ثومية",
        "Gluten-Free Wrap": "خبز تورتيلا خالي من الغلوتين",
        "Gluten-Free Toast Bread": "توست خالي من الغلوتين",
        "Gluten-Free Tortilla": "تورتيلا خالية من الغلوتين",
        "Gluten-Free Fries": "بطاطا مقلية خالية من الغلوتين",
        "Fries (1 Person)": "بطاطا مقلية (شخص واحد)",
        "Fries (2 People)": "بطاطا مقلية (شخصين)",
        "Large Fries": "بطاطا مقلية (حجم كبير)",
        "Extra Large Fries": "بطاطا مقلية (حجم عائلي)",
        "Parmesan Cheese": "جبنة بارميزان",
        "Grilled Chicken": "دجاج مشوي",
        "Crispy Zinger Pieces": "قطع زنجر مقرمشة",
        "Extra Grilled Chicken": "دجاج مشوي إضافي",
        "Extra Caesar Dressing": "صوص سيزر إضافي",
        "Extra Feta Cheese": "جبنة فيتا إضافية",
        "Cucumber": "خيار",
        "Feta Cheese": "جبنة فيتا",
        "Olives": "زيتون",
        "Red Onion": "بصل أحمر",
        "Special Dressing": "صوص خاص"
      };

      if (fallback[obj[field]]) {
        return fallback[obj[field]];
      }
    }

    return obj[field] || "";
  },

  init() {
    this.bindEvents();
    this.applyLanguageUI();
    this.updateStickyCart();
    this.updateCartBadge();
  },

  bindEvents() {
    // Listen to store updates
    window.addEventListener("moe:cart-updated", () => {
      this.updateStickyCart();
      this.updateCartBadge();
    });

    window.addEventListener("moe:data-updated", () => {
      // Re-render current active view if in customer mode
      if (!window.location.hash.startsWith("#admin")) {
        this.renderCurrentView();
      }
    });

    window.addEventListener("moe:lang-changed", () => {
      this.applyLanguageUI();
      if (!window.location.hash.startsWith("#admin")) {
        this.renderCurrentView();
      }
    });

    // Close modal when clicking backdrop
    const modalOverlay = document.getElementById("customer-modal-overlay");
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) {
          this.closeProductModal();
        }
      });
    }

    // Sidebar backdrop close
    const sidebarOverlay = document.getElementById("sidebar-overlay");
    if (sidebarOverlay) {
      sidebarOverlay.addEventListener("click", () => {
        this.closeSidebar();
      });
    }
  },

  toggleLanguage() {
    const currentLang = MoeStore.getLang();
    const newLang = currentLang === "en" ? "ar" : "en";
    MoeStore.setLang(newLang);
  },

  applyLanguageUI() {
    const lang = MoeStore.getLang();
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

    const btn = document.getElementById("btn-lang-switcher");
    if (btn) {
      btn.textContent = lang === "en" ? "عربي" : "EN";
    }

    // Update all static i18n text elements (like sidebar)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key) {
        el.textContent = i18n(key);
      }
    });
  },

  renderCurrentView() {
    const hash = window.location.hash || "#home";
    if (hash === "#home" || hash === "") {
      this.renderHome();
    } else if (hash === "#menu") {
      this.renderMenu();
    } else if (hash === "#cart") {
      this.renderCart();
    } else if (hash === "#about") {
      this.renderAbout();
    }
  },

  // ==========================================================================
  // Sidebar Controls
  // ==========================================================================
  toggleSidebar() {
    const drawer = document.getElementById("sidebar-drawer");
    const overlay = document.getElementById("sidebar-overlay");
    if (drawer && overlay) {
      const isOpen = drawer.classList.contains("open");
      if (isOpen) {
        this.closeSidebar();
      } else {
        drawer.classList.add("open");
        overlay.classList.add("active");
        this.updateSidebarActiveLink();
      }
    }
  },

  closeSidebar() {
    const drawer = document.getElementById("sidebar-drawer");
    const overlay = document.getElementById("sidebar-overlay");
    if (drawer && overlay) {
      drawer.classList.remove("open");
      overlay.classList.remove("active");
    }
  },

  updateSidebarActiveLink() {
    const hash = window.location.hash || "#home";
    const links = document.querySelectorAll(".sidebar-nav-item");
    links.forEach(l => {
      if (l.getAttribute("href") === hash) {
        l.classList.add("active");
      } else {
        l.classList.remove("active");
      }
    });
  },

  // ==========================================================================
  // Header & Sticky Cart Updates
  // ==========================================================================
  updateCartBadge() {
    const count = MoeStore.getCartCount();
    const badges = document.querySelectorAll(".cart-count-badge");
    badges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? "flex" : "none";
      b.classList.remove("bump");
      void b.offsetWidth; // trigger reflow
      b.classList.add("bump");
    });
  },

  updateStickyCart() {
    const stickyBar = document.getElementById("sticky-cart-bar");
    if (!stickyBar) return;

    const count = MoeStore.getCartCount();
    const total = MoeStore.getCartTotal();
    const settings = MoeStore.getSettings();

    // Do not show sticky bar if cart is empty or on the Cart page or in Admin
    const isCartPage = window.location.hash === "#cart";
    const isAdmin = window.location.hash.startsWith("#admin");

    if (count > 0 && !isCartPage && !isAdmin) {
      stickyBar.classList.add("visible");
      document.getElementById("sticky-cart-count-val").textContent = count;
      document.getElementById("sticky-cart-items-lbl").textContent = count === 1 ? "1 item" : `${count} items`;
      document.getElementById("sticky-cart-total-val").textContent = `${total.toFixed(2)} ${settings.currency}`;
    } else {
      stickyBar.classList.remove("visible");
    }
  },

  // ==========================================================================
  // HOME PAGE RENDERING
  // ==========================================================================
  renderHome() {
    const container = document.getElementById("main-view-container");
    if (!container) return;

    const settings = MoeStore.getSettings();
    const homeContent = MoeStore.getHomeContent();
    const trustIndicators = MoeStore.getTrustIndicators();
    const brandPillars = MoeStore.getBrandPillars();
    const favorites = MoeStore.getFeaturedProducts();

    const categories = MoeStore.getCategories().filter(c => c.enabled);

    container.innerHTML = `
      <div class="home-view">
        
        <!-- Compact Restaurant Hero -->
        <section class="home-hero-compact" style="background: linear-gradient(135deg, rgba(4, 43, 30, 0.88) 0%, rgba(6, 59, 41, 0.70) 50%, rgba(4, 43, 30, 0.88) 100%), url('${CustomerApp.T(homeContent, 'heroImageBg') || 'assets/images/user_kitchen_bg.png'}') center/cover no-repeat; background-size: 200% 200%, cover;">
          <div class="hero-brand-col">
            <div class="hero-logo-small logo-subtle-glow">
              <img src="${CustomerApp.T(homeContent, 'heroLogo') || settings.logoPath || 'assets/images/logo_new.jpg'}" alt="${settings.restaurantName} Logo" />
            </div>
            
            <div class="hero-trust-badge">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
              ${CustomerApp.T(homeContent, 'heroBadge') || i18n("hero_badge")}
            </div>

            <h1 class="hero-intro-text">${CustomerApp.T(homeContent, 'heroTitle') || i18n("hero_title")}</h1>
            
            <div class="hero-actions" style="margin-top: 12px;">
              <a href="#menu" class="btn btn-primary-compact">
                ${CustomerApp.T(homeContent, 'heroCtaText') || i18n("explore_menu")}
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <button onclick="CustomerApp.directWhatsAppContact()" class="btn btn-wa-compact">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                ${CustomerApp.T(homeContent, 'heroCtaSecondary') || i18n("order_wa")}
              </button>
              <button onclick="#" class="btn btn-eshya-compact">
                <img src="assets/images/eshya_logo.png" alt="My Things" style="width: 18px; height: 18px;" />
                ${i18n("order_my_things")}
              </button>
            </div>
          </div>
          
          <div class="hero-image-col">
            <img src="${CustomerApp.T(homeContent, 'heroImageSecondary') || 'assets/images/hero_apron.jpg'}" alt="PureBite Kitchen" class="hero-static-food" loading="eager" />
          </div>
        </section>

        <!-- Compact Trust Strip -->
        <div class="trust-strip-compact">
          <div class="trust-strip-track">
            <div class="trust-strip-inner">
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(45 12 12)"><path d="M12 22 V 2" /><path d="M12 18 C 7 16, 7 11, 12 9" /><path d="M12 18 C 17 16, 17 11, 12 9" /><path d="M12 14 C 8 12, 8 8, 12 6" /><path d="M12 14 C 16 12, 16 8, 12 6" /><path d="M12 10 C 9 8, 9 5, 12 3" /><path d="M12 10 C 15 8, 15 5, 12 3" /></g><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> ${i18n("100_gf")}</span>
              <span class="trust-strip-dot">•</span>
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> ${i18n("safe_celiac")}</span>
              <span class="trust-strip-dot">•</span>
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> ${i18n("no_contamination")}</span>
              <span class="trust-strip-dot">•</span>
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.6.4-4.3-.2-.5-.5-.4-1.5.1-2.4s1.1-1.3 1.9-1.1z"/><path d="M12 4.3c1.5-.7 3-.8 4.2-.3 1 1.2 1 2.8-.2 4-1.5 1.2-3 1.1-4.2.3-.9-1.1-1-2.7.2-4z"/></svg> ${i18n("fresh_ingredients")}</span>
            </div>
            <div class="trust-strip-inner" aria-hidden="true">
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(45 12 12)"><path d="M12 22 V 2" /><path d="M12 18 C 7 16, 7 11, 12 9" /><path d="M12 18 C 17 16, 17 11, 12 9" /><path d="M12 14 C 8 12, 8 8, 12 6" /><path d="M12 14 C 16 12, 16 8, 12 6" /><path d="M12 10 C 9 8, 9 5, 12 3" /><path d="M12 10 C 15 8, 15 5, 12 3" /></g><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> ${i18n("100_gf")}</span>
              <span class="trust-strip-dot">•</span>
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg> ${i18n("safe_celiac")}</span>
              <span class="trust-strip-dot">•</span>
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg> ${i18n("no_contamination")}</span>
              <span class="trust-strip-dot">•</span>
              <span class="trust-strip-item"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.6.4-4.3-.2-.5-.5-.4-1.5.1-2.4s1.1-1.3 1.9-1.1z"/><path d="M12 4.3c1.5-.7 3-.8 4.2-.3 1 1.2 1 2.8-.2 4-1.5 1.2-3 1.1-4.2.3-.9-1.1-1-2.7.2-4z"/></svg> ${i18n("fresh_ingredients")}</span>
            </div>
          </div>
        </div>

        <!-- Food Discovery Section -->
        <section class="home-discovery-section">
          <h2 class="discovery-title">${CustomerApp.T(homeContent, 'cravingTitle') || i18n("what_craving")}</h2>
          
          <div class="home-category-row">
            ${categories.map(c => `
              <a href="#menu" class="home-category-pill" onclick="CustomerApp.activeCategory='${c.id}'">
                ${CustomerApp.T(c, "name")}
              </a>
            `).join("")}
          </div>

          <!-- Product Grid -->
          <div class="home-product-grid">
            ${favorites.slice(0, 6).map(p => `
              <div class="home-product-card" onclick="CustomerApp.openProductModal('${p.id}')">
                <div class="home-product-img">
                  <img src="${p.image}" alt="${CustomerApp.T(p, "name")}" loading="lazy" />
                  ${p.tags && p.tags.includes('Gluten-Free') ? '<span class="home-gf-badge">GF</span>' : ''}
                </div>
                <div class="home-product-details">
                  <h3>${CustomerApp.T(p, "name")}</h3>
                  <p>${CustomerApp.T(p, "description")}</p>
                  <div class="home-product-bottom">
                    <span class="home-product-price">${p.basePrice.toFixed(2)} ${settings.currency}</span>
                    <span class="home-product-arrow">→</span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
          
          <div class="home-discovery-cta">
            <a href="#menu" class="btn btn-outline-compact">
              ${i18n("explore_full_menu")}
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </a>
          </div>
        </section>

        <!-- About Snippet Card -->
        <section class="home-about-snippet-card">
          <div class="snippet-logo-wrapper">
            <img src="${CustomerApp.T(homeContent, 'snippetLogo') || 'assets/images/logo_transparent.png'}" alt="Moe's PureBite Logo" class="snippet-logo" loading="lazy" />
          </div>
          <div class="home-about-content">
            <span style="font-size: 0.8rem; font-weight: 800; color: var(--c-orange); letter-spacing: 0.1em; text-transform: uppercase;">${CustomerApp.T(homeContent, 'promiseSubtitle') || i18n("who_we_are")}</span>
            <h3 style="margin-top: 4px;">${CustomerApp.T(homeContent, 'promiseTitle') || i18n("who_we_are")}</h3>
            <p>${CustomerApp.T(homeContent, 'promiseText') || i18n("home_about_text")}</p>
            <a href="#about" class="btn-outline-compact">${i18n("read_our_story")}</a>
          </div>
        </section>
        <!-- Contact & Social Card -->
        <section class="home-contact-card">
          <h3 class="contact-card-title">${i18n("get_in_touch")}</h3>
          <div class="social-btn-grid">
            <a href="tel:${settings.phoneCallable}" class="social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>${i18n("call_us")}</span>
            </a>
            <a href="#" onclick="CustomerApp.directWhatsAppContact()" class="social-btn btn-wa">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.55 0 8.25 3.7 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 0 1-1.26-4.48c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.58.21-1.08.15-1.2-.06-.11-.23-.18-.48-.3z"/></svg>
              <span>${i18n("whatsapp")}</span>
            </a>
            <a href="https://instagram.com/${settings.instagram}" target="_blank" class="social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span>${i18n("instagram")}</span>
            </a>
            <a href="${settings.facebook}" target="_blank" class="social-btn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <span>${i18n("facebook")}</span>
            </a>
          </div>
        </section>

        <!-- Delivery App Card -->
        <section class="home-delivery-app-card">
          <h3 class="delivery-app-title">${i18n("also_available")}</h3>
          <div class="delivery-app-content">
            <img src="assets/images/eshya_logo.png" alt="My Things App Logo" class="delivery-app-logo" />
            <p>${i18n("delivery_app_text")}</p>
            <a href="#" class="btn-delivery-app">${i18n("order_my_things")}</a>
          </div>
        </section>

        <!-- Footer -->
        <footer class="home-footer-compact">
          <div class="footer-copyright">
            © ${new Date().getFullYear()} ${settings.restaurantName}. ${i18n("footer_rights")}
          </div>
          <div style="margin-top: 12px; font-size: 0.85rem; color: var(--c-text-muted); display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>${i18n("powered_by")}</span>
            <a href="https://www.operixsys.online/" target="_blank" class="btn-operix" rel="noopener noreferrer">Operix</a>
          </div>
        </footer>
      </div>
    `;
  },

  // ==========================================================================
  // MENU PAGE RENDERING (Product-First)
  // ==========================================================================
  renderMenu() {
    const container = document.getElementById("main-view-container");
    if (!container) return;

    const settings = MoeStore.getSettings();
    const categories = MoeStore.getCategories().filter(c => c.enabled);
    const products = MoeStore.getProducts(this.activeCategory);

    container.innerHTML = `
      <div class="menu-view">
        <!-- Compact Safety Information Strip -->
        <div class="menu-trust-strip">
          <div class="menu-trust-item">
            <div class="menu-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(45 12 12)"><path d="M12 22 V 2" /><path d="M12 18 C 7 16, 7 11, 12 9" /><path d="M12 18 C 17 16, 17 11, 12 9" /><path d="M12 14 C 8 12, 8 8, 12 6" /><path d="M12 14 C 16 12, 16 8, 12 6" /><path d="M12 10 C 9 8, 9 5, 12 3" /><path d="M12 10 C 15 8, 15 5, 12 3" /></g><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <span class="menu-trust-text">${i18n("100_gf")}</span>
          </div>
          <div class="menu-trust-item">
            <div class="menu-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <span class="menu-trust-text">${i18n("safe_celiac")}</span>
          </div>
          <div class="menu-trust-item">
            <div class="menu-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
            </div>
            <span class="menu-trust-text">${i18n("no_contamination")}</span>
          </div>
          <div class="menu-trust-item">
            <div class="menu-trust-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.6.4-4.3-.2-.5-.5-.4-1.5.1-2.4s1.1-1.3 1.9-1.1z"/><path d="M12 4.3c1.5-.7 3-.8 4.2-.3 1 1.2 1 2.8-.2 4-1.5 1.2-3 1.1-4.2.3-.9-1.1-1-2.7.2-4z"/></svg>
            </div>
            <span class="menu-trust-text">${i18n("fresh_ingredients")}</span>
          </div>
        </div>
        
        <!-- Delivery Only Banner -->
        <div style="background: linear-gradient(135deg, var(--c-forest) 0%, #17543d 50%, var(--c-forest) 100%); color: #fff; margin-top: 12px; border-radius: var(--radius-md); padding: 10px 12px; text-align: center; font-size: 0.95rem; font-weight: 800; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 12px rgba(6, 59, 41, 0.15); letter-spacing: 0.5px;">
          ${i18n("delivery_only_msg")}
        </div>

        <!-- Categories Horizontal Scroll Bar -->
        <nav class="category-nav-bar" aria-label="Menu categories">
          ${categories.map(c => `
            <button class="category-pill ${this.activeCategory === c.id ? "active" : ""}" onclick="CustomerApp.selectCategory('${c.id}')">
              <span class="cat-icon">${c.icon || "🍽️"}</span>
              <span>${CustomerApp.T(c, "name")}</span>
            </button>
          `).join("")}
        </nav>

        <!-- Product Cards List -->
        <div class="product-list">
          ${products.map(p => this.renderProductCard(p, settings)).join("")}
        </div>

        <!-- Footer -->
        ${this.getFooterHtml()}
      </div>
    `;
  },

  selectCategory(categoryId) {
    this.activeCategory = categoryId;
    this.renderMenu();
  },

  renderProductCard(p, settings) {
    const isUnavailable = !p.available;
    const hasRequiredOptions = (p.optionGroups || []).some(g => g.required);

    return `
      <article class="product-card ${isUnavailable ? "unavailable" : ""}" onclick="CustomerApp.handleCardClick('${p.id}', event)">
        <div class="product-card-img-wrap">
          ${p.isBestSeller ? `<span class="product-card-bestseller-badge">${i18n("best_seller")}</span>` : ""}
          <img src="${p.image}" alt="${CustomerApp.T(p, "name")}" class="product-card-img" loading="lazy" />
        </div>
        <div class="product-card-content">
          <div class="product-card-top">
            <h3 class="product-card-title">${CustomerApp.T(p, "name")}</h3>
            <p class="product-card-desc">${CustomerApp.T(p, "description")}</p>
            <div class="product-card-badges">
              ${(p.tags || []).map(tag => `<span class="badge badge-gf">${tag}</span>`).join("")}
            </div>
            ${p.isPreOrder24h ? `
              <div class="preorder-warning-banner">
                <span>${i18n("preorder_warn")}</span>
              </div>
            ` : ""}
          </div>
          <div class="product-card-bottom">
            <div class="product-card-price">${p.basePrice.toFixed(2)} <span>${settings.currency}</span></div>
            ${isUnavailable ? `
              <span class="product-card-unavailable-tag">${i18n("unavailable")}</span>
            ` : `
              <button 
                class="btn-card-add" 
                title="${hasRequiredOptions ? "Customize Options" : "Add to Order"}" 
                onclick="CustomerApp.handleQuickAdd('${p.id}', event)"
                aria-label="Add ${CustomerApp.T(p, "name")} to cart"
              >
                +
              </button>
            `}
          </div>
        </div>
      </article>
    `;
  },

  handleCardClick(productId, event) {
    // If click was on quick add button, handled by handleQuickAdd
    if (event.target.closest(".btn-card-add")) return;
    this.openProductModal(productId);
  },

  handleQuickAdd(productId, event) {
    if (event) event.stopPropagation();

    const product = MoeStore.getProductById(productId);
    if (!product || !product.available) return;

    const hasRequiredOptions = (product.optionGroups || []).some(g => g.required);

    // Rule 18: Smart Add-To-Cart Behavior
    // If product has NO required options, add directly!
    // If product HAS required options, open Product Details customizer!
    if (!hasRequiredOptions) {
      MoeStore.addToCart({
        productId: product.id,
        name: product.name,
        image: product.image,
        unitPrice: product.basePrice,
        quantity: 1,
        selectedOptions: [],
        removedIngredients: [],
        addedModifiers: [],
        isPreOrder24h: !!product.isPreOrder24h
      });
      const lang = MoeStore.getLang();
      App.showToast(lang === "ar" ? `تم إضافة ${CustomerApp.T(product, "name")} لطلبك! 🍔` : `Added ${CustomerApp.T(product, "name")} to your order! 🍔`);
    } else {
      this.openProductModal(productId);
    }
  },

  // ==========================================================================
  // PRODUCT DETAILS & CUSTOMIZER (Bottom Sheet / Modal)
  // ==========================================================================
  openProductModal(productId) {
    const product = MoeStore.getProductById(productId);
    if (!product) return;

    this.currentModalProduct = product;

    // Initialize default modal options state
    const defaultOptions = {};
    (product.optionGroups || []).forEach(g => {
      const defOpt = g.options.find(o => o.default) || g.options[0];
      if (defOpt) {
        defaultOptions[g.id] = defOpt.id;
      }
    });

    this.currentModalState = {
      quantity: 1,
      selectedOptions: defaultOptions,
      removedIngredients: [],
      addedModifiers: []
    };

    this.renderModalContent();

    const modal = document.getElementById("product-modal-container");
    const overlay = document.getElementById("customer-modal-overlay");
    if (modal && overlay) {
      modal.classList.add("open");
      overlay.classList.add("active");
    }
  },

  closeProductModal() {
    const modal = document.getElementById("product-modal-container");
    const overlay = document.getElementById("customer-modal-overlay");
    if (modal && overlay) {
      modal.classList.remove("open");
      overlay.classList.remove("active");
    }
    this.currentModalProduct = null;
  },

  calculateCurrentModalPrice() {
    if (!this.currentModalProduct) return 0;
    let unit = this.currentModalProduct.basePrice;

    // Add option group adjustments
    (this.currentModalProduct.optionGroups || []).forEach(g => {
      const selectedOptId = this.currentModalState.selectedOptions[g.id];
      if (selectedOptId) {
        const opt = g.options.find(o => o.id === selectedOptId);
        if (opt && opt.price) {
          unit += opt.price;
        }
      }
    });

    // Add modifier additions
    (this.currentModalProduct.modifiers || []).forEach(m => {
      if (this.currentModalState.addedModifiers.includes(m.id)) {
        unit += m.price;
      }
    });

    return {
      unitPrice: unit,
      totalPrice: unit * this.currentModalState.quantity
    };
  },

  renderModalContent() {
    const p = this.currentModalProduct;
    if (!p) return;

    const settings = MoeStore.getSettings();
    const pricing = this.calculateCurrentModalPrice();

    const container = document.getElementById("product-modal-container");
    if (!container) return;

    // Save scroll position for a seamless experience
    const scrollBody = container.querySelector(".modal-scroll-body");
    const savedScroll = scrollBody ? scrollBody.scrollTop : 0;

    container.innerHTML = `
      <div style="position: absolute; top: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; z-index: 100; pointer-events: none;">
        <button class="btn-modal-close" onclick="CustomerApp.closeProductModal()" aria-label="Close product details" style="pointer-events: auto; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
          ✕
        </button>
        <button onclick="CustomerApp.directWhatsAppContact()" class="btn-modal-close" title="Chat on WhatsApp" style="pointer-events: auto; color: #25D366; box-shadow: 0 2px 10px rgba(0,0,0,0.2);">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.07L2 22L7.07 20.65C8.54 21.5 10.22 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"/></svg>
        </button>
      </div>

      <div class="modal-scroll-body" style="padding-top: 0; padding-inline: 0; gap: 0;">
        <!-- Edge-to-Edge Hero Image -->
        <div class="modal-product-hero-img-wrap" style="height: 300px; border-radius: 0; flex-shrink: 0;">
          <img src="${p.image}" alt="${CustomerApp.T(p, "name")}" class="modal-product-hero-img" />
        </div>

        <div style="padding: 24px 18px; display: flex; flex-direction: column; gap: 20px;">
          <!-- Product Head -->
          <div class="modal-product-info-head">
            <div class="modal-product-title-row">
              <h2 class="modal-product-title">${CustomerApp.T(p, "name")}</h2>
              <div class="modal-product-live-price" id="modal-live-unit-price">${pricing.unitPrice.toFixed(2)} ${settings.currency}</div>
            </div>
            <div class="product-card-badges">
              ${(p.tags || []).map(t => `<span class="badge badge-gf">${t}</span>`).join("")}
            </div>
            <p class="modal-product-desc">${CustomerApp.T(p, "description")}</p>
            ${p.isPreOrder24h ? `
              <div class="preorder-warning-banner modal-preorder-banner">
                <span>${i18n("preorder_warn")}</span>
              </div>
            ` : ""}
          </div>

        <!-- Ingredients Section (Removable Customization) -->
        ${(p.ingredients && p.ingredients.length > 0) ? `
          <div class="customizer-section">
            <h3 class="customizer-section-title">
              <span>🌿</span>
              <span>${i18n("ingredients")}</span>
            </h3>
            <div class="ingredients-grid">
              ${p.ingredients.map(ing => {
      const isRemoved = this.currentModalState.removedIngredients.includes(ing.id);
      return `
                  <div class="ingredient-item-card ${isRemoved ? "removed" : ""}" onclick="CustomerApp.toggleIngredientRemoval('${ing.id}', ${ing.removable})">
                    <div class="ingredient-item-left">
                      <img src="${ing.icon}" alt="${ing.name}" class="ingredient-icon-img" />
                      <div>
                        <div class="ingredient-name">${CustomerApp.T(ing, "name")}</div>
                      </div>
                    </div>
                    ${ing.removable ? `
                      <span class="btn-ingredient-toggle">${isRemoved ? i18n("removed") : i18n("remove_btn")}</span>
                    ` : `
                      <span style="font-size: 0.65rem; color: #888;">${i18n("base")}</span>
                    `}
                  </div>
                `;
    }).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Option Groups (Required Radios) -->
        ${(p.optionGroups || []).map(group => `
          <div class="option-group-card">
            <div class="option-group-label">
              <span>${CustomerApp.T(group, "name")}</span>
              ${group.required ? `<span class="option-required-tag">${i18n("required")}</span>` : ""}
            </div>
            <div class="options-pill-list">
              ${group.options.map(opt => {
      const isSelected = this.currentModalState.selectedOptions[group.id] === opt.id;
      const priceDelta = opt.price ? `+${opt.price.toFixed(2)} ${settings.currency}` : "";
      return `
                  <label class="option-radio-label ${isSelected ? "selected" : ""}" onclick="CustomerApp.selectOptionGroup('${group.id}', '${opt.id}')">
                    <span>${CustomerApp.T(opt, "name")}</span>
                    <span>${priceDelta}</span>
                  </label>
                `;
    }).join("")}
            </div>
          </div>
        `).join("")}

        <!-- Add Modifiers (Optional Extras) -->
        ${(p.modifiers && p.modifiers.length > 0) ? `
          <div class="customizer-section">
            <h3 class="customizer-section-title">
              <span>✨</span>
              <span>${i18n("add_extras")}</span>
            </h3>
            <div class="modifiers-grid">
              ${p.modifiers.map(m => {
      const isChecked = this.currentModalState.addedModifiers.includes(m.id);
      return `
                  <div class="modifier-check-card ${isChecked ? "checked" : ""}" onclick="CustomerApp.toggleModifier('${m.id}')">
                    <div>
                      <div class="modifier-name">${CustomerApp.T(m, "name")}</div>
                      <div class="modifier-price">+${m.price.toFixed(2)} ${settings.currency}</div>
                    </div>
                    <span style="font-weight: 800; font-size: 1rem; color: var(--c-orange);">${isChecked ? "✓" : "+"}</span>
                  </div>
                `;
    }).join("")}
            </div>
          </div>
        ` : ""}

        <!-- Quantity Stepper Control -->
        <div class="quantity-control-row">
          <span style="font-weight: 800; color: var(--c-forest); font-size: 0.95rem;">${i18n("quantity")}</span>
          <div class="quantity-stepper">
            <button class="btn-stepper" onclick="CustomerApp.updateModalQuantity(-1)" aria-label="Decrease quantity">−</button>
            <span class="stepper-val" id="modal-qty-val">${this.currentModalState.quantity}</span>
            <button class="btn-stepper" onclick="CustomerApp.updateModalQuantity(1)" aria-label="Increase quantity">+</button>
          </div>
        </div>
        </div> <!-- Close content wrapper -->
      </div>

      <!-- Modal Bottom Actions Bar -->
      <div class="modal-bottom-bar">
        <button class="btn-modal-add" onclick="CustomerApp.submitAddToCart()">
          <span>${i18n("add_to_cart")}</span>
          <span>•</span>
          <span id="modal-btn-total-price">${pricing.totalPrice.toFixed(2)} ${settings.currency}</span>
        </button>
      </div>
    `;

    // Restore scroll position
    const newScrollBody = container.querySelector(".modal-scroll-body");
    if (newScrollBody) {
      newScrollBody.scrollTop = savedScroll;
    }
  },

  toggleIngredientRemoval(ingId, isRemovable) {
    if (!isRemovable) {
      const lang = MoeStore.getLang();
      App.showToast(lang === "ar" ? "هذا المكون أساسي ولا يمكن إزالته." : "This is a core base ingredient and cannot be removed.", "info");
      return;
    }
    const idx = this.currentModalState.removedIngredients.indexOf(ingId);
    if (idx !== -1) {
      this.currentModalState.removedIngredients.splice(idx, 1);
    } else {
      this.currentModalState.removedIngredients.push(ingId);
    }
    this.renderModalContent();
  },

  selectOptionGroup(groupId, optionId) {
    this.currentModalState.selectedOptions[groupId] = optionId;
    this.renderModalContent();
  },

  toggleModifier(modId) {
    const idx = this.currentModalState.addedModifiers.indexOf(modId);
    if (idx !== -1) {
      this.currentModalState.addedModifiers.splice(idx, 1);
    } else {
      this.currentModalState.addedModifiers.push(modId);
    }
    this.renderModalContent();
  },

  updateModalQuantity(delta) {
    const newQty = this.currentModalState.quantity + delta;
    if (newQty >= 1) {
      this.currentModalState.quantity = newQty;
      this.renderModalContent();
    }
  },

  submitAddToCart() {
    const p = this.currentModalProduct;
    if (!p) return;

    // Validate required options
    const requiredGroups = (p.optionGroups || []).filter(g => g.required);
    for (const g of requiredGroups) {
      if (!this.currentModalState.selectedOptions[g.id]) {
        const lang = MoeStore.getLang();
        App.showToast(lang === "ar" ? `يرجى اختيار ${CustomerApp.T(g, "name")}.` : `Please select a ${g.name} option.`, "warning");
        return;
      }
    }

    const pricing = this.calculateCurrentModalPrice();

    // Map selected option objects
    const selectedOptionsList = Object.keys(this.currentModalState.selectedOptions).map(groupId => {
      const g = p.optionGroups.find(grp => grp.id === groupId);
      const opt = g ? g.options.find(o => o.id === this.currentModalState.selectedOptions[groupId]) : null;
      return {
        groupId,
        groupName: g ? g.name : groupId,
        optionId: opt ? opt.id : "",
        optionName: opt ? opt.name : "",
        optionName_ar: opt ? opt.name_ar : "",
        price: opt ? opt.price : 0
      };
    });

    // Map added modifier objects
    const addedModifiersList = this.currentModalState.addedModifiers.map(mId => {
      const m = (p.modifiers || []).find(mod => mod.id === mId);
      return {
        id: mId,
        name: m ? m.name : mId,
        name_ar: m ? m.name_ar : "",
        price: m ? m.price : 0
      };
    });

    // Map removed ingredient names
    const removedNames = this.currentModalState.removedIngredients.map(ingId => {
      const ing = (p.ingredients || []).find(i => i.id === ingId);
      return ing ? { name: ing.name, name_ar: ing.name_ar } : { name: ingId, name_ar: "" };
    });

    MoeStore.addToCart({
      productId: p.id,
      name: p.name,
      name_ar: p.name_ar,
      image: p.image,
      unitPrice: pricing.unitPrice,
      quantity: this.currentModalState.quantity,
      selectedOptions: selectedOptionsList,
      removedIngredients: removedNames,
      addedModifiers: addedModifiersList,
      isPreOrder24h: !!p.isPreOrder24h
    });

    this.closeProductModal();
    const lang = MoeStore.getLang();
    App.showToast(lang === "ar" ? `تم إضافة ${this.currentModalState.quantity}× ${CustomerApp.T(p, "name")} لسلتك! 🛒` : `Added ${this.currentModalState.quantity}× ${CustomerApp.T(p, "name")} to Cart! 🛒`);
  },

  // ==========================================================================
  // CART PAGE RENDERING & ORDER REVIEW
  // ==========================================================================
  renderCart() {
    const container = document.getElementById("main-view-container");
    if (!container) return;

    const cart = MoeStore.getCart();
    const settings = MoeStore.getSettings();
    const total = MoeStore.getCartTotal();
    const hasPreOrderItems = cart.some(i => i.isPreOrder24h);

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="cart-view">
          <div class="cart-empty-state">
            <div class="cart-empty-icon">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            </div>
            <h2 class="cart-empty-title">${i18n("cart_empty_title")}</h2>
            <p class="cart-empty-desc">${i18n("cart_empty_desc")}</p>
            <a href="#menu" class="btn btn-primary" style="margin-top: 8px;">${i18n("explore_menu")} →</a>
          </div>
          ${this.getFooterHtml()}
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="cart-view">
        <h2 class="section-title">${i18n("your_order")} (${MoeStore.getCartCount()} ${i18n("items")})</h2>

        ${hasPreOrderItems ? `
          <div class="preorder-warning-banner" style="padding: 12px 16px;">
            <span>${i18n("preorder_warn_cart")}</span>
          </div>
        ` : ""}

        <!-- Cart Items List -->
        <div class="cart-items-list">
          ${cart.map(item => `
            <div class="cart-item-card">
              <div class="cart-item-img-wrap">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
              </div>
              <div class="cart-item-details">
                <div class="cart-item-head">
                  <h3 class="cart-item-title">${CustomerApp.T(item, "name")}</h3>
                  <button class="btn-cart-remove" onclick="CustomerApp.removeCartItem('${item.cartItemId}')" title="Remove item" aria-label="Remove item">
                    ✕
                  </button>
                </div>

                <div class="cart-item-customizations">
                  ${(item.selectedOptions || []).map(o => `<span>• ${CustomerApp.T(o, "optionName")}</span>`).join("")}
                  ${(item.removedIngredients || []).map(r => `<span class="mod-rem">• ${i18n("no_item")} ${CustomerApp.T(r, "name")}</span>`).join("")}
                  ${(item.addedModifiers || []).map(m => `<span class="mod-add">• ${i18n("extra_item")} ${CustomerApp.T(m, "name")} (+${m.price.toFixed(2)} ${settings.currency})</span>`).join("")}
                </div>

                <div class="cart-item-foot">
                  <div class="cart-item-stepper">
                    <button class="btn-cart-step" onclick="CustomerApp.updateCartQty('${item.cartItemId}', -1)">−</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="btn-cart-step" onclick="CustomerApp.updateCartQty('${item.cartItemId}', 1)">+</button>
                  </div>
                  <div class="cart-item-price">${(item.unitPrice * item.quantity).toFixed(2)} <span>${settings.currency}</span></div>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Order Summary & Notes -->
        <div class="cart-summary-box">
          <label style="font-size: 0.85rem; font-weight: 700; color: var(--c-forest);">${i18n("cart_notes_label")}</label>
          <textarea id="cart-order-notes" class="cart-notes-input" placeholder="${i18n("cart_notes_ph")}"></textarea>

          <div class="summary-row">
            <span>${i18n("cart_subtotal")}</span>
            <span>${total.toFixed(2)} ${settings.currency}</span>
          </div>
          <div class="summary-row total">
            <span>${i18n("cart_total")}</span>
            <span>${total.toFixed(2)} ${settings.currency}</span>
          </div>

          <button class="btn-checkout-whatsapp" onclick="CustomerApp.processWhatsAppHandoff()">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c4.55 0 8.25 3.7 8.25 8.24 0 2.2-.86 4.28-2.42 5.84-1.56 1.56-3.64 2.42-5.84 2.42-1.42 0-2.82-.37-4.06-1.08l-.29-.17-3.12.82.83-3.04-.19-.3a8.163 8.163 0 0 1-1.26-4.48c0-4.54 3.7-8.24 8.25-8.24zm4.52 11.66c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.2.21-.58.21-1.08.15-1.2-.06-.11-.23-.18-.48-.3z"/></svg>
            <span>${i18n("order_wa")}</span>
          </button>
        </div>

        ${this.getFooterHtml()}
      </div>
    `;
  },

  updateCartQty(cartItemId, delta) {
    MoeStore.updateCartItemQty(cartItemId, delta);
    this.renderCart();
  },

  removeCartItem(cartItemId) {
    MoeStore.removeCartItem(cartItemId);
    this.renderCart();
  },

  // ==========================================================================
  // WHATSAPP ORDER GENERATOR & HANDOFF
  // ==========================================================================
  processWhatsAppHandoff() {
    const cart = MoeStore.getCart();
    if (cart.length === 0) return;

    const settings = MoeStore.getSettings();
    const total = MoeStore.getCartTotal();
    const notesInput = document.getElementById("cart-order-notes");
    const notes = notesInput ? notesInput.value.trim() : "";
    const lang = MoeStore.getLang();
    const isAr = lang === "ar";

    // Build the formatted order text
    let message = isAr
      ? `مرحباً ${settings.restaurantName} 👋\n\nأود طلب الآتي:\n\n`
      : `Hello ${settings.restaurantName} 👋\n\nI would like to order:\n\n`;

    cart.forEach((item) => {
      const itemName = CustomerApp.T(item, "name");
      message += `${item.quantity} × ${itemName}\n`;

      (item.selectedOptions || []).forEach(opt => {
        message += `  - ${CustomerApp.T(opt, "optionName")}\n`;
      });

      // Removed ingredients
      (item.removedIngredients || []).forEach(rem => {
        const remName = CustomerApp.T(rem, "name");
        message += isAr ? `  - بدون ${remName}\n` : `  - No ${remName}\n`;
      });

      // Added extras
      (item.addedModifiers || []).forEach(mod => {
        const extraName = CustomerApp.T(mod, "name");
        message += isAr
          ? `  - إضافة: ${extraName} (+${mod.price.toFixed(2)} ${i18n("currency")})\n`
          : `  - Extra: ${extraName} (+${mod.price.toFixed(2)} ${i18n("currency")})\n`;
      });

      if (item.isPreOrder24h) {
        message += isAr ? `  - [تم تأكيد تواصي 24 ساعة]\n` : `  - [24-Hour Pre-Order Confirmed]\n`;
      }

      message += isAr
        ? `  السعر: ${(item.unitPrice * item.quantity).toFixed(2)} ${i18n("currency")}\n\n`
        : `  Price: ${(item.unitPrice * item.quantity).toFixed(2)} ${i18n("currency")}\n\n`;
    });

    message += `------------------------------\n`;
    message += isAr
      ? `المجموع: ${total.toFixed(2)} ${i18n("currency")}\n`
      : `Total: ${total.toFixed(2)} ${i18n("currency")}\n`;

    if (notes) {
      message += isAr ? `ملاحظات العميل: ${notes}\n` : `Customer Notes: ${notes}\n`;
    }

    message += isAr ? `\nشكراً! 🌿` : `\nThank you! 🌿`;

    // Log the order handoff into the Admin Log
    MoeStore.logOrderHandoff({
      notes,
      orderType: "Takeaway / Delivery"
    });

    // Clean destination number (remove non-digits)
    const rawNumber = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const waUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab / application
    window.open(waUrl, "_blank");

    App.showToast(isAr ? "جاري فتح واتساب مع تفاصيل طلبك! 💬" : "Opening WhatsApp with your complete order breakdown! 💬", "success");
  },

  directWhatsAppContact() {
    const settings = MoeStore.getSettings();
    const rawNumber = settings.whatsappNumber.replace(/[^0-9]/g, "");
    const lang = MoeStore.getLang();
    const msgText = lang === "ar"
      ? `مرحباً ${settings.restaurantName}! أتصفح موقعكم ولدي استفسار.`
      : `Hello ${settings.restaurantName}! I'm visiting your website and have a question.`;
    const msg = encodeURIComponent(msgText);
    window.open(`https://wa.me/${rawNumber}?text=${msg}`, "_blank");
  },

  // ==========================================================================
  // ABOUT US PAGE RENDERING
  // ==========================================================================
  renderAbout() {
    const container = document.getElementById("main-view-container");
    if (!container) return;

    const settings = MoeStore.getSettings();
    const aboutContent = MoeStore.getAboutContent();

    container.innerHTML = `
      <div class="about-view-refined">
        
        <!-- 1. Hero Clean -->
        <section class="about-hero-clean">
          <img src="${CustomerApp.T(aboutContent, 'heroImage') || 'assets/images/logo_transparent.png'}" alt="Moe's PureBite Logo" class="about-animated-logo" loading="eager" />
        </section>

        <!-- 2. Introduction -->
        <section class="about-intro-section">
          <span class="about-eyebrow">${i18n("about_eyebrow")}</span>
          <h1 class="about-focal-point">${CustomerApp.T(aboutContent, 'heroTitle') || i18n("about_hero_title")}</h1>
          
          <div class="about-story-paragraphs">
            <h3 style="color: var(--c-forest); margin-bottom: 12px; font-size: 1.2rem;">${CustomerApp.T(aboutContent, 'heroSubtitle')}</h3>
            <h2 style="color: var(--c-orange); margin-bottom: 16px; margin-top: 24px; font-size: 1.5rem;">${CustomerApp.T(aboutContent, 'storyTitle')}</h2>
            <p>${CustomerApp.T(aboutContent, 'storyText') || i18n("about_p1")}</p>
          </div>
        </section>

        <!-- 3. Gluten-Free Trust Grid (2x2) -->
        <section class="about-trust-section">
          <div class="trust-grid-2x2">
            
            <div class="trust-compact-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><g transform="rotate(45 12 12)"><path d="M12 22 V 2" /><path d="M12 18 C 7 16, 7 11, 12 9" /><path d="M12 18 C 17 16, 17 11, 12 9" /><path d="M12 14 C 8 12, 8 8, 12 6" /><path d="M12 14 C 16 12, 16 8, 12 6" /><path d="M12 10 C 9 8, 9 5, 12 3" /><path d="M12 10 C 15 8, 15 5, 12 3" /></g><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              <h4>${CustomerApp.T(aboutContent, 'trust1Title') || i18n("about_trust_1_title")}</h4>
              <p>${CustomerApp.T(aboutContent, 'trust1Desc') || i18n("about_trust_1_desc")}</p>
            </div>
            
            <div class="trust-compact-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              <h4>${CustomerApp.T(aboutContent, 'trust2Title') || i18n("about_trust_2_title")}</h4>
              <p>${CustomerApp.T(aboutContent, 'trust2Desc') || i18n("about_trust_2_desc")}</p>
            </div>
            
            <div class="trust-compact-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
              <h4>${CustomerApp.T(aboutContent, 'trust3Title') || i18n("about_trust_3_title")}</h4>
              <p>${CustomerApp.T(aboutContent, 'trust3Desc') || i18n("about_trust_3_desc")}</p>
            </div>
            
            <div class="trust-compact-card">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.6.4-4.3-.2-.5-.5-.4-1.5.1-2.4s1.1-1.3 1.9-1.1z"/><path d="M12 4.3c1.5-.7 3-.8 4.2-.3 1 1.2 1 2.8-.2 4-1.5 1.2-3 1.1-4.2.3-.9-1.1-1-2.7.2-4z"/></svg>
              <h4>${CustomerApp.T(aboutContent, 'trust4Title') || i18n("about_trust_4_title")}</h4>
              <p>${CustomerApp.T(aboutContent, 'trust4Desc') || i18n("about_trust_4_desc")}</p>
            </div>

          </div>
        </section>


        <!-- 5. Mission & Vision -->
        <section class="about-mission-vision">
          <div class="mission-vision-card">
            <div class="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
            </div>
            <h3>${CustomerApp.T(aboutContent, 'missionTitle') || i18n("about_mission_title")}</h3>
            <p>${CustomerApp.T(aboutContent, 'missionDesc') || i18n("about_mission_desc")}</p>
          </div>

          <div class="mission-vision-card">
            <div class="mv-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
            </div>
            <h3>${CustomerApp.T(aboutContent, 'visionTitle') || i18n("about_vision_title")}</h3>
            <p>${CustomerApp.T(aboutContent, 'visionDesc') || i18n("about_vision_desc")}</p>
          </div>
        </section>


        <!-- 7. Contact / Social -->
        <section class="about-contact-clean">
          <div class="contact-links-row">
            <a href="https://instagram.com/${settings.instagram}" target="_blank" class="clean-social-link">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              <span>${i18n("instagram")}</span>
            </a>
            <a href="${settings.facebook}" target="_blank" class="clean-social-link">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              <span>${i18n("facebook")}</span>
            </a>
            <a href="#" onclick="CustomerApp.directWhatsAppContact()" class="clean-social-link">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>${i18n("whatsapp")}</span>
            </a>
          </div>
          <a href="tel:${settings.phoneCallable}" class="contact-phone-block-clean">
            <span class="contact-phone-label">${i18n("call_us")}</span>
            <span class="contact-phone-number" dir="ltr">${settings.phoneDisplay}</span>
          </a>
        </section>

        <!-- 8. Minimal Footer -->
        <footer class="about-minimal-footer">
          <p><span dir="ltr">© ${new Date().getFullYear()} ${settings.restaurantName}</span> - ${i18n("footer_rights")}</p>
          <div style="margin-top: 12px; font-size: 0.85rem; color: var(--c-text-muted); display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>${i18n("powered_by")}</span>
            <a href="https://www.operixsys.online/" target="_blank" class="btn-operix" rel="noopener noreferrer">Operix</a>
          </div>
        </footer>

      </div>
    `;
  },

  // ==========================================================================
  // REUSABLE FOOTER
  // ==========================================================================
  getFooterHtml() {
    const settings = MoeStore.getSettings();
    return `
      <section class="about-contact-clean" style="margin-top: 32px;">
        <div class="contact-links-row">
          <a href="https://instagram.com/${settings.instagram}" target="_blank" class="clean-social-link">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            <span>${i18n("instagram")}</span>
          </a>
          <a href="${settings.facebook}" target="_blank" class="clean-social-link">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            <span>${i18n("facebook")}</span>
          </a>
          <a href="#" onclick="CustomerApp.directWhatsAppContact()" class="clean-social-link">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>${i18n("whatsapp")}</span>
          </a>
        </div>
        
        <a href="tel:${settings.phoneCallable}" class="contact-phone-block-clean">
          <span class="contact-phone-label">${i18n("call_us")}</span>
          <span class="contact-phone-number" dir="ltr">${settings.phoneDisplay}</span>
        </a>
      </section>
      <footer class="about-minimal-footer">
        <p><span dir="ltr">© ${new Date().getFullYear()} ${settings.restaurantName}</span> - ${i18n("footer_rights")}</p>
        <div style="margin-top: 12px; font-size: 0.85rem; color: var(--c-text-muted); display: flex; align-items: center; justify-content: center; gap: 6px;">
          <span>${i18n("powered_by")}</span>
          <a href="https://www.operixsys.online/" target="_blank" class="btn-operix" rel="noopener noreferrer">Operix</a>
        </div>
      </footer>
    `;
  }
};

window.CustomerApp = CustomerApp;
