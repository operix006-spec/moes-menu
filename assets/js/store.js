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
    
    // Automatically fetch latest data from Supabase on load
    this.dataReady = this.initSupabaseData();
  }

  async initSupabaseData() {
    if (!window.supabaseClient) return;
    try {
      const [
        { data: categories },
        { data: products },
        { data: settingsData },
        { data: homeData },
        { data: aboutData }
      ] = await Promise.all([
        window.supabaseClient.from('categories').select('*').order('order', { ascending: true }),
        window.supabaseClient.from('products').select('*'),
        window.supabaseClient.from('settings').select('*').eq('id', 'global').single(),
        window.supabaseClient.from('home_content').select('*').eq('id', 'global').single(),
        window.supabaseClient.from('about_content').select('*').eq('id', 'global').single()
      ]);

      if (categories) this.state.categories = categories;
      if (products) this.state.products = products;
      if (settingsData) this.state.settings = { ...this.state.settings, ...settingsData };
      if (homeData) this.state.homeContent = { ...this.state.homeContent, ...homeData };
      if (aboutData) this.state.aboutContent = { ...this.state.aboutContent, ...aboutData };

      this.saveDatabase(); // Persist and trigger UI update
    } catch (e) {
      console.error("Failed to load data from Supabase", e);
    }
  }

  loadDatabase() {
    const defaults = {
      settings: { lang: 'en', currency: 'JOD' },
      categories: [],
      products: [],
      homeContent: {},
      aboutContent: {},
      orderHandoffs: [],
      trustIndicators: [
        { icon: "🛡️", title: "100% Celiac Safe", desc: "No cross-contamination" },
        { icon: "🌾", title: "Dedicated Kitchen", desc: "Certified gluten-free facility" },
        { icon: "👨‍🍳", title: "Expert Chefs", desc: "Crafting pure flavors" }
      ],
      brandPillars: [
        { icon: "assets/images/ing_bun.png", title: "Artisan GF Buns", desc: "Baked fresh daily" },
        { icon: "assets/images/ing_chicken.png", title: "Premium Proteins", desc: "100% Halal fresh meat" },
        { icon: "assets/images/ing_lettuce.png", title: "Farm Fresh", desc: "Locally sourced veggies" }
      ]
    };

    try {
      const cached = localStorage.getItem(this.STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        return { ...defaults, ...parsed };
      }
    } catch (e) {
      console.warn("Failed to load cached DB", e);
    }
    return defaults;
  }

  saveDatabase() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn("Failed to save DB to cache", e);
    }
    this.emit("data-updated", this.state);
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
    
    // Assign index as default order if missing
    prods.forEach((p, i) => {
      if (typeof p.order !== 'number') p.order = i;
    });
    
    return prods.sort((a, b) => a.order - b.order);
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
  async saveProduct(productData) {
    const oldProducts = JSON.parse(JSON.stringify(this.state.products));
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
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('products').upsert(productData);
      if (error) {
        console.error("Supabase products save error:", error);
        this.state.products = oldProducts;
        this.saveDatabase();
        return { success: false, error };
      }
    }
    return { success: true, product: productData };
  }

  async deleteProduct(id) {
    const oldProducts = JSON.parse(JSON.stringify(this.state.products));
    this.state.products = this.state.products.filter(p => p.id !== id);
    this.saveDatabase();
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('products').delete().eq('id', id);
      if (error) {
        console.error("Supabase products delete error:", error);
        this.state.products = oldProducts;
        this.saveDatabase();
        return { success: false, error };
      }
    }
    return { success: true };
  }

  toggleProductAvailability(id) {
    const p = this.getProductById(id);
    if (p) {
      p.available = !p.available;
      this.saveDatabase();
      // Assume sync happens asynchronously or via a separate save call
      return p.available;
    }
    return false;
  }

  // --- CATEGORY CRUD ---
  async saveCategory(catData) {
    const oldCategories = JSON.parse(JSON.stringify(this.state.categories));
    
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
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('categories').upsert(catData);
      if (error) {
        console.error("Supabase category save error:", error);
        this.state.categories = oldCategories;
        this.saveDatabase();
        return { success: false, error };
      }
    }
    return { success: true };
  }

  async deleteCategory(id) {
    if (id === "all") return { success: false, error: { message: "Cannot delete default category" } };
    
    const oldCategories = JSON.parse(JSON.stringify(this.state.categories));
    const oldProducts = JSON.parse(JSON.stringify(this.state.products));
    
    this.state.categories = this.state.categories.filter(c => c.id !== id);
    
    // Reassign orphaned products to the first available category
    const fallbackCategory = this.state.categories.find(c => c.id !== "all")?.id || "all";
    const updatedProducts = [];
    this.state.products.forEach(p => {
      if (p.category === id) {
        p.category = fallbackCategory;
        updatedProducts.push(p);
      }
    });

    this.saveDatabase();
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('categories').delete().eq('id', id);
      if (error) {
        this.state.categories = oldCategories;
        this.state.products = oldProducts;
        this.saveDatabase();
        return { success: false, error };
      }
      if (updatedProducts.length > 0) {
        await window.supabaseClient.from('products').upsert(updatedProducts);
      }
    }
    return { success: true };
  }

  // --- SETTINGS & CMS UPDATES ---
  async updateSettings(newSettings) {
    const oldSettings = { ...this.state.settings };
    this.state.settings = { ...this.state.settings, ...newSettings };
    this.saveDatabase();
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('settings').upsert({ id: 'global', ...this.state.settings });
      if (error) {
        console.error("Supabase settings update error:", error);
        this.state.settings = oldSettings;
        this.saveDatabase();
        return { success: false, error };
      }
    }
    return { success: true };
  }

  async updateHomeContent(newContent) {
    const oldHome = { ...this.state.homeContent };
    this.state.homeContent = { ...this.state.homeContent, ...newContent };
    
    // Clean up any old keys that shouldn't be sent to Supabase
    delete this.state.homeContent.heroSecondaryCta;
    delete this.state.homeContent.heroSecondaryCta_ar;
    
    this.saveDatabase();
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('home_content').upsert({ id: 'global', ...this.state.homeContent });
      if (error) {
        console.error("Supabase home_content update error:", error);
        this.state.homeContent = oldHome;
        this.saveDatabase();
        return { success: false, error };
      }
    }
    return { success: true };
  }

  async updateAboutContent(newContent) {
    const oldAbout = { ...this.state.aboutContent };
    this.state.aboutContent = { ...this.state.aboutContent, ...newContent };
    this.saveDatabase();
    
    if (window.supabaseClient) {
      const { error } = await window.supabaseClient.from('about_content').upsert({ id: 'global', ...this.state.aboutContent });
      if (error) {
        console.error("Supabase about_content update error:", error);
        this.state.aboutContent = oldAbout;
        this.saveDatabase();
        return { success: false, error };
      }
    }
    return { success: true };
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
