/**
 * Moe's PureBite — Central Reactive State Manager & LocalStorage Persistence
 */

class PureBiteStore {
  constructor() {
    this.STORAGE_KEY = "moes_purebite_db_v1";
    this.CART_KEY = "moes_purebite_cart_v1";
    this.listeners = [];
    this.state = this.loadDatabase();
    this.cart = this.loadCart();
  }

  loadDatabase() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        let state = {
          settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
          trustIndicators: parsed.trustIndicators || DEFAULT_DATA.trustIndicators,
          brandPillars: parsed.brandPillars || DEFAULT_DATA.brandPillars,
          categories: parsed.categories || DEFAULT_DATA.categories,
          products: parsed.products || DEFAULT_DATA.products,
          homeContent: { ...DEFAULT_DATA.homeContent, ...(parsed.homeContent || {}) },
          aboutContent: { ...DEFAULT_DATA.aboutContent, ...(parsed.aboutContent || {}) },
          orderHandoffs: parsed.orderHandoffs || []
        };
        
        // --- BILINGUAL DATA MIGRATION ---
        state.products.forEach(p => {
          p.name_ar = p.name_ar || "";
          p.description_ar = p.description_ar || "";
          if (p.ingredients) {
            p.ingredients.forEach(i => { i.name_ar = i.name_ar || ""; });
          }
          if (p.optionGroups) {
            p.optionGroups.forEach(og => {
              og.name_ar = og.name_ar || "";
              if (og.options) {
                og.options.forEach(opt => { opt.name_ar = opt.name_ar || ""; });
              }
            });
          }
          if (p.modifiers) {
            p.modifiers.forEach(m => { m.name_ar = m.name_ar || ""; });
          }
        });
        
        return state;
      }
    } catch (e) {
      console.warn("Could not load stored database, falling back to defaults", e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }

  saveDatabase() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
      this.emit("data-updated", this.state);
    } catch (e) {
      console.error("Failed to save database to localStorage", e);
    }
  }

  loadCart() {
    try {
      const raw = localStorage.getItem(this.CART_KEY);
      if (raw) {
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Could not load cart from localStorage", e);
    }
    return [];
  }

  saveCart() {
    try {
      localStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
      this.emit("cart-updated", { cart: this.cart, total: this.getCartTotal(), count: this.getCartCount() });
    } catch (e) {
      console.error("Failed to save cart", e);
    }
  }

  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  emit(event, data) {
    this.listeners.forEach(fn => {
      try { fn(event, data); } catch (err) { console.error("Listener error", err); }
    });
    window.dispatchEvent(new CustomEvent(`moe:${event}`, { detail: data }));
  }

  // --- GETTERS ---
  getSettings() { 
    return { lang: "en", ...this.state.settings }; 
  }
  
  getLang() {
    return this.state.settings.lang || "en";
  }

  setLang(lang) {
    this.state.settings.lang = lang;
    this.saveDatabase();
    this.emit("lang-changed", lang);
  }

  getCategories() { return [...this.state.categories].sort((a, b) => (a.order || 0) - (b.order || 0)); }
  getProducts(categoryId = "all") {
    let prods = [...this.state.products];
    if (categoryId && categoryId !== "all") {
      prods = prods.filter(p => p.category === categoryId);
    }
    return prods;
  }
  getProductById(id) {
    return this.state.products.find(p => p.id === id) || null;
  }
  getFeaturedProducts() {
    return this.state.products.filter(p => p.isFeatured && p.available);
  }
  getHomeContent() { return this.state.homeContent; }
  getAboutContent() { return this.state.aboutContent; }
  getTrustIndicators() { return this.state.trustIndicators; }
  getBrandPillars() { return this.state.brandPillars; }
  getOrderHandoffs() { return this.state.orderHandoffs || []; }

  // --- PRODUCT CRUD ---
  saveProduct(productData) {
    const isNew = !productData.id || !this.getProductById(productData.id);
    if (isNew) {
      if (!productData.id) {
        productData.id = "prod-" + Date.now().toString(36) + "-" + Math.random().toString(36).substr(2, 5);
      }
      this.state.products.push(productData);
    } else {
      const idx = this.state.products.findIndex(p => p.id === productData.id);
      if (idx !== -1) {
        this.state.products[idx] = { ...this.state.products[idx], ...productData };
      }
    }
    this.saveDatabase();
    return productData;
  }

  deleteProduct(id) {
    this.state.products = this.state.products.filter(p => p.id !== id);
    this.saveDatabase();
  }

  toggleProductAvailability(id) {
    const p = this.getProductById(id);
    if (p) {
      p.available = !p.available;
      this.saveDatabase();
      return p.available;
    }
    return false;
  }

  // --- CATEGORY CRUD ---
  saveCategory(catData) {
    if (!catData.id) {
      catData.id = "cat-" + Date.now().toString(36);
    }
    const idx = this.state.categories.findIndex(c => c.id === catData.id);
    if (idx !== -1) {
      this.state.categories[idx] = { ...this.state.categories[idx], ...catData };
    } else {
      catData.order = this.state.categories.length + 1;
      this.state.categories.push(catData);
    }
    this.saveDatabase();
  }

  deleteCategory(id) {
    if (id === "all") return; // prevent deleting default
    this.state.categories = this.state.categories.filter(c => c.id !== id);
    this.saveDatabase();
  }

  // --- SETTINGS & CMS UPDATES ---
  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    this.saveDatabase();
  }

  updateHomeContent(newContent) {
    this.state.homeContent = { ...this.state.homeContent, ...newContent };
    this.saveDatabase();
  }

  updateAboutContent(newContent) {
    this.state.aboutContent = { ...this.state.aboutContent, ...newContent };
    this.saveDatabase();
  }

  // --- CART MANAGEMENT ---
  getCart() {
    return this.cart;
  }

  getCartCount() {
    return this.cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  getCartTotal() {
    return this.cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  }

  generateCartItemId(item) {
    // Unique signature based on product + selected options + removed ingredients + modifiers
    const optsStr = (item.selectedOptions || []).map(o => `${o.groupId}:${o.optionId}`).sort().join("|");
    const remStr = (item.removedIngredients || []).sort().join("|");
    const modStr = (item.addedModifiers || []).map(m => m.id).sort().join("|");
    return `${item.productId}__${optsStr}__${remStr}__${modStr}`;
  }

  addToCart(itemData) {
    // itemData: { productId, name, image, unitPrice, quantity, selectedOptions, removedIngredients, addedModifiers, isPreOrder24h }
    const cartItemId = this.generateCartItemId(itemData);
    const existingIndex = this.cart.findIndex(i => i.cartItemId === cartItemId);

    if (existingIndex !== -1) {
      this.cart[existingIndex].quantity += itemData.quantity || 1;
    } else {
      this.cart.push({
        ...itemData,
        cartItemId,
        quantity: itemData.quantity || 1
      });
    }
    this.saveCart();
    return cartItemId;
  }

  updateCartItemQty(cartItemId, delta) {
    const idx = this.cart.findIndex(i => i.cartItemId === cartItemId);
    if (idx !== -1) {
      this.cart[idx].quantity += delta;
      if (this.cart[idx].quantity <= 0) {
        this.cart.splice(idx, 1);
      }
      this.saveCart();
    }
  }

  removeCartItem(cartItemId) {
    this.cart = this.cart.filter(i => i.cartItemId !== cartItemId);
    this.saveCart();
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
  }

  // --- ORDER HANDOFF TRACKING ---
  logOrderHandoff(orderSummary) {
    const handoff = {
      id: "ord-" + Date.now().toString(36),
      timestamp: new Date().toISOString(),
      items: JSON.parse(JSON.stringify(this.cart)),
      total: this.getCartTotal(),
      customerNotes: orderSummary?.notes || "",
      orderType: orderSummary?.orderType || "Takeaway / Delivery",
      status: "Sent to WhatsApp"
    };
    if (!this.state.orderHandoffs) this.state.orderHandoffs = [];
    this.state.orderHandoffs.unshift(handoff);
    this.saveDatabase();
    return handoff;
  }

  // --- BACKUP & RESET ---
  exportDatabase() {
    return JSON.stringify(this.state, null, 2);
  }

  importDatabase(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.products && parsed.categories && parsed.settings) {
        this.state = parsed;
        this.saveDatabase();
        return true;
      }
    } catch (e) {
      console.error("Failed to parse database backup", e);
    }
    return false;
  }

  resetToDefaults() {
    this.state = JSON.parse(JSON.stringify(DEFAULT_DATA));
    this.saveDatabase();
    this.clearCart();
  }
}

// Global Store Singleton
window.MoeStore = new PureBiteStore();
