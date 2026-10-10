/**
 * Moe's PureBite — Admin Dashboard & CMS Controller
 * Professional Restaurant Management & Live Menu Builder
 */

const AdminApp = {
  activeTab: "dashboard",
  editingProductId: null,
  currentBuilderProduct: null,

  init() {
    this.bindEvents();
  },

  bindEvents() {
    window.addEventListener("moe:data-updated", () => {
      if (window.location.hash.startsWith("#admin")) {
        this.renderAdminView();
      }
    });
  },

  setTab(tab) {
    this.activeTab = tab;
    this.renderAdminView();
  },

  renderAdminView() {
    const container = document.getElementById("admin-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="admin-layout">
        <!-- Admin Sidebar -->
        <aside class="admin-sidebar" id="admin-sidebar-drawer">
          <div>
            <div class="admin-brand-header">
              <img src="assets/images/logo_new.jpg" alt="Moe's PureBite Logo" class="admin-brand-logo-img" />
              <div>
                <div class="admin-brand-title">Moe's <span>PureBite</span></div>
                <span class="admin-brand-badge">ADMIN CMS</span>
              </div>
            </div>

            <nav class="admin-nav-list" aria-label="Admin Navigation">
              <button class="admin-nav-btn ${this.activeTab === "dashboard" ? "active" : ""}" onclick="AdminApp.setTab('dashboard')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Dashboard</span>
              </button>

              <button class="admin-nav-btn ${this.activeTab === "menu" ? "active" : ""}" onclick="AdminApp.setTab('menu')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                <span>Menu Items</span>
              </button>

              <button class="admin-nav-btn ${this.activeTab === "categories" ? "active" : ""}" onclick="AdminApp.setTab('categories')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                <span>Categories</span>
              </button>

              <button class="admin-nav-btn ${this.activeTab === "subscriptions" ? "active" : ""}" onclick="AdminApp.setTab('subscriptions')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>Subscriptions</span>
              </button>

              <button class="admin-nav-btn ${this.activeTab === "home-cms" ? "active" : ""}" onclick="AdminApp.setTab('home-cms')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>Home Page CMS</span>
              </button>

              <button class="admin-nav-btn ${this.activeTab === "about-cms" ? "active" : ""}" onclick="AdminApp.setTab('about-cms')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                <span>About Us CMS</span>
              </button>

              <button class="admin-nav-btn ${this.activeTab === "settings" ? "active" : ""}" onclick="AdminApp.setTab('settings')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                <span>Settings & Social</span>
              </button>
            </nav>
          </div>

          <div class="admin-sidebar-footer">
            <a href="#home" class="btn-admin-switch-store" style="margin-bottom: 8px;">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>Back to Storefront</span>
            </a>
            <button class="btn-admin-switch-store" onclick="App.handleAdminLogout()" style="background-color: transparent; color: var(--c-danger); border: 1px solid rgba(200,50,32,0.2);">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
              <span>Logout</span>
            </button>
          </div>
        </aside>

        <!-- Admin Main Content -->
        <main class="admin-main-wrapper">
          <header class="admin-topbar">
            <div class="admin-topbar-title-wrap">
              <button class="admin-mobile-toggle" onclick="AdminApp.toggleAdminSidebar()" aria-label="Toggle admin navigation">☰</button>
              <h1 class="admin-page-heading">${this.getTabTitle()}</h1>
            </div>
            <div class="admin-topbar-actions">
              <a href="#menu" class="btn btn-primary btn-pill-sm" target="_blank" rel="noopener">
                <span>View Live Menu</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
            </div>
          </header>

          <div class="admin-content-body">
            ${this.renderActiveTabContent()}
          </div>
        </main>
      </div>

      <!-- Product Builder Modal Mount -->
      <div id="admin-product-builder-modal-mount"></div>
      
      <!-- Category Builder Modal Mount -->
      <div id="admin-category-modal-mount"></div>
      
      <!-- Confirmation Modal Mount -->
      <div id="admin-confirmation-modal-mount"></div>

      <!-- Subscription Meal Modal Mount -->
      <div id="admin-sub-meal-modal-mount"></div>
    `;
  },

  toggleAdminSidebar() {
    const sidebar = document.getElementById("admin-sidebar-drawer");
    if (sidebar) {
      sidebar.classList.toggle("open");
    }
  },

  openConfirmationModal(title, text, confirmText, onConfirm) {
    const mount = document.getElementById("admin-confirmation-modal-mount");
    if (!mount) return;
    
    // Store the callback
    this._confirmCallback = onConfirm;
    
    mount.innerHTML = `
      <div class="admin-modal" style="z-index: 99999;">
        <div class="modal-overlay active" onclick="AdminApp.closeConfirmationModal()" style="z-index: 99990;"></div>
        <div class="admin-modal-box" style="max-width: 400px; z-index: 99991;">
          <div class="admin-modal-header">
            <h2 class="admin-modal-title" style="color: var(--c-danger);">${title}</h2>
            <button class="btn-action-icon" onclick="AdminApp.closeConfirmationModal()">✕</button>
          </div>
          <div class="admin-modal-body" style="flex: unset;">
            <p>${text}</p>
          </div>
          <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="AdminApp.closeConfirmationModal()">Cancel</button>
            <button class="btn btn-primary" style="background-color: var(--c-danger); border-color: var(--c-danger);" onclick="
              if (AdminApp._confirmCallback) AdminApp._confirmCallback();
              AdminApp.closeConfirmationModal();
            ">${confirmText}</button>
          </div>
        </div>
      </div>
    `;
  },

  closeConfirmationModal() {
    const mount = document.getElementById("admin-confirmation-modal-mount");
    if (mount) mount.innerHTML = "";
    this._confirmCallback = null;
  },

  toggleAdminSidebar() {
    const sidebar = document.getElementById("admin-sidebar-drawer");
    if (sidebar) {
      sidebar.classList.toggle("open");
    }
  },

  getTabTitle() {
    switch (this.activeTab) {
      case "dashboard": return "Dashboard & Performance";
      case "menu": return "Menu Items & Products";
      case "categories": return "Category Management";
      case "subscriptions": return "Meal Subscriptions Management";
      case "orders": return "WhatsApp Order Handoffs Log";
      case "home-cms": return "Home Page CMS Content";
      case "about-cms": return "About Us Story & Values CMS";
      case "settings": return "Contact, Social & WhatsApp Settings";
      default: return "Admin CMS";
    }
  },

  renderActiveTabContent() {
    switch (this.activeTab) {
      case "dashboard": return this.renderDashboardTab();
      case "menu": return this.renderMenuTab();
      case "categories": return this.renderCategoriesTab();
      case "subscriptions": return this.renderSubscriptionsTab();
      case "orders": return this.renderOrdersTab();
      case "home-cms": return this.renderHomeCmsTab();
      case "about-cms": return this.renderAboutCmsTab();
      case "settings": return this.renderSettingsTab();
      default: return `<p>Select a tab.</p>`;
    }
  },

  // ==========================================================================
  // 1. DASHBOARD TAB
  // ==========================================================================
  renderDashboardTab() {
    const products = MoeStore.getProducts();
    const activeProducts = products.filter(p => p.available);
    const categories = MoeStore.getCategories().filter(c => c.id !== "all");
    const handoffs = MoeStore.getOrderHandoffs();
    const estRevenue = handoffs.reduce((sum, o) => sum + (o.total || 0), 0);
    const settings = MoeStore.getSettings();

    return `
      <!-- Stats Grid -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card">
          <div class="admin-stat-icon">🍔</div>
          <div class="admin-stat-info">
            <div class="admin-stat-val">${products.length}</div>
            <div class="admin-stat-lbl">Total Products</div>
          </div>
        </div>

        <div class="admin-stat-card">
          <div class="admin-stat-icon orange">✓</div>
          <div class="admin-stat-info">
            <div class="admin-stat-val">${activeProducts.length}</div>
            <div class="admin-stat-lbl">Active & Available</div>
          </div>
        </div>

        <div class="admin-stat-card">
          <div class="admin-stat-icon">📑</div>
          <div class="admin-stat-info">
            <div class="admin-stat-val">${categories.length}</div>
            <div class="admin-stat-lbl">Menu Categories</div>
          </div>
        </div>
      </div>

      <!-- Quick Actions & Status -->
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">Quick Administration Actions</h2>
        </div>
        <div style="padding: 20px; display: flex; gap: 12px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-pill-sm" onclick="AdminApp.openProductBuilder(null)">
            + Add New Product
          </button>
          <button class="btn btn-outline btn-pill-sm" onclick="AdminApp.setTab('categories')">
            Manage Categories
          </button>
          <button class="btn btn-outline btn-pill-sm" onclick="AdminApp.setTab('home-cms')">
            Edit Home Page
          </button>
          <button class="btn btn-outline btn-pill-sm" onclick="AdminApp.setTab('settings')">
            Configure WhatsApp Number
          </button>
        </div>
      </div>

      <!-- Recent Products Preview -->
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">Active Menu Highlights</h2>
          <button class="btn btn-outline btn-pill-sm" onclick="AdminApp.setTab('menu')">Manage All Products →</button>
        </div>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products.slice(0, 5).map(p => `
                <tr>
                  <td>
                    <div style="display: flex; align-items: center; gap: 10px;">
                      <img src="${p.image}" alt="${p.name}" class="admin-prod-thumb" />
                      <div>
                        <strong>${p.name}</strong>
                        ${p.isPreOrder24h ? `<span class="badge badge-preorder" style="margin-left: 6px;">24H PRE-ORDER</span>` : ""}
                      </div>
                    </div>
                  </td>
                  <td>${p.category}</td>
                  <td><strong>${p.basePrice.toFixed(2)} ${settings.currency}</strong></td>
                  <td>
                    <label class="toggle-switch">
                      <input type="checkbox" ${p.available ? "checked" : ""} onchange="AdminApp.toggleAvailability('${p.id}', this)">
                      <span class="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <div class="action-btns-group">
                      <button class="btn-action-icon" onclick="AdminApp.openProductBuilder('${p.id}')" title="Edit">✏️</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 2. MENU & PRODUCT MANAGEMENT TAB
  // ==========================================================================
  renderMenuTab() {
    const products = MoeStore.getProducts();
    const categories = MoeStore.getCategories();
    const settings = MoeStore.getSettings();

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <div class="admin-toolbar">
            <input 
              type="text" 
              id="admin-product-search" 
              class="admin-search-input" 
              placeholder="Search product name..." 
              oninput="AdminApp.filterMenuTable()"
            />
            <select id="admin-category-filter" class="admin-filter-select" onchange="AdminApp.filterMenuTable()">
              <option value="all">All Categories</option>
              ${categories.filter(c => c.id !== "all").map(c => `
                <option value="${c.id}">${c.name}</option>
              `).join("")}
            </select>
          </div>
          <button class="btn btn-accent btn-pill-sm" onclick="AdminApp.openProductBuilder(null)">
            + Add Product
          </button>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table" id="admin-products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name & Description</th>
                <th>Category</th>
                <th>Base Price</th>
                <th>Ingredients & Options</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${products.map(p => `
                <tr data-cat="${p.category}" data-name="${p.name.toLowerCase()}">
                  <td>
                    <img src="${p.image}" alt="${p.name}" class="admin-prod-thumb" />
                  </td>
                  <td>
                    <div style="font-weight: 800; color: var(--c-forest);">${p.name} 🌿</div>
                    <div style="font-size: 0.76rem; color: var(--c-text-muted); max-width: 240px;">${p.description}</div>
                    <div style="margin-top: 4px;">
                      ${p.isBestSeller ? `<span class="badge badge-bestseller">Best Seller</span>` : ""}
                      ${p.isPreOrder24h ? `<span class="badge badge-preorder">24H Pre-Order</span>` : ""}
                    </div>
                  </td>
                  <td><span class="badge badge-gf">${p.category}</span></td>
                  <td><strong>${p.basePrice.toFixed(2)} ${settings.currency}</strong></td>
                  <td>
                    <div style="font-size: 0.75rem; color: var(--c-text-muted);">
                      <div>🌿 ${(p.ingredients || []).length} Ingredients</div>
                      <div>⚙️ ${(p.optionGroups || []).length} Option Groups</div>
                      <div>✨ ${(p.modifiers || []).length} Extras</div>
                    </div>
                  </td>
                  <td>
                    <label class="toggle-switch">
                      <input type="checkbox" ${p.available ? "checked" : ""} onchange="AdminApp.toggleAvailability('${p.id}', this)">
                      <span class="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <div class="action-btns-group">
                      <button class="btn-action-icon" onclick="AdminApp.moveProduct('${p.id}', -1)" title="Move Up">⬆️</button>
                      <button class="btn-action-icon" onclick="AdminApp.moveProduct('${p.id}', 1)" title="Move Down">⬇️</button>
                      <button class="btn-action-icon" onclick="AdminApp.openProductBuilder('${p.id}')" title="Edit Product">✏️</button>
                      <button class="btn-action-icon delete" onclick="AdminApp.deleteProductPrompt('${p.id}')" title="Delete Product">🗑️</button>
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  filterMenuTable() {
    const searchVal = (document.getElementById("admin-product-search")?.value || "").toLowerCase();
    const catVal = document.getElementById("admin-category-filter")?.value || "all";

    const rows = document.querySelectorAll("#admin-products-table tbody tr");
    rows.forEach(r => {
      const name = r.getAttribute("data-name") || "";
      const cat = r.getAttribute("data-cat") || "";

      const matchesSearch = name.includes(searchVal);
      const matchesCat = catVal === "all" || cat === catVal;

      r.style.display = (matchesSearch && matchesCat) ? "" : "none";
    });
  },

  async toggleAvailability(productId, checkboxEl) {
    try {
      const newVal = await MoeStore.toggleProductAvailability(productId);
      App.showToast(`Product availability updated to ${newVal ? "Available" : "Unavailable"}`);
    } catch (err) {
      console.error("Failed to toggle availability:", err);
      App.showToast("Failed to update availability in database", "error");
      if (checkboxEl) {
        checkboxEl.checked = !checkboxEl.checked;
      }
    }
  },

  deleteProductPrompt(productId) {
    const prod = MoeStore.getProductById(productId);
    if (!prod) return;
    this.openConfirmationModal(
      "Delete Product?",
      `Are you sure you want to delete "${prod.name}" from the menu? This action cannot be undone.`,
      "Delete Product",
      () => {
        MoeStore.deleteProduct(productId);
        App.showToast(`Deleted ${prod.name}`, "info");
        AdminApp.renderMenuTab();
      }
    );
  },

  moveProduct(productId, dir) {
    const catVal = document.getElementById("admin-category-filter")?.value || "all";
    const products = MoeStore.getProducts(catVal);
    
    const idx = products.findIndex(p => p.id === productId);
    if (idx === -1 || (dir === -1 && idx === 0) || (dir === 1 && idx === products.length - 1)) return;
    
    // Swap in the local array
    const targetIdx = idx + dir;
    const temp = products[idx];
    products[idx] = products[targetIdx];
    products[targetIdx] = temp;
    
    // Reassign strict sequential orders to the entire visible list to guarantee no duplicates
    // and save them all to Supabase.
    products.forEach((p, i) => {
      p.order = i;
      MoeStore.saveProduct(p);
    });
    
    this.renderMenuTab();
    
    // Restore the filter state after re-render
    setTimeout(() => {
      const filter = document.getElementById("admin-category-filter");
      if (filter) {
        filter.value = catVal;
        this.filterMenuTable();
      }
    }, 10);
  },

  // ==========================================================================
  // PRODUCT BUILDER MODAL (Full Interactive CRUD)
  // ==========================================================================
  openProductBuilder(productId) {
    const categories = MoeStore.getCategories().filter(c => c.id !== "all");

    if (productId) {
      const existing = MoeStore.getProductById(productId);
      this.currentBuilderProduct = JSON.parse(JSON.stringify(existing));
    } else {
      this.currentBuilderProduct = {
        id: "",
        name: "",
        category: categories[0]?.id || "burgers",
        basePrice: 3.50,
        description: "",
        image: "assets/images/zinger_burger.png",
        available: true,
        isBestSeller: false,
        isFeatured: false,
        isPreOrder24h: false,
        ingredients: [
          { id: "gf-base", name: "Gluten-Free Base", desc: "GF bread/wrap", icon: "assets/images/ing_bun.png", removable: false }
        ],
        optionGroups: [],
        modifiers: []
      };
    }

    this.renderProductBuilderModal();
  },

  renderProductBuilderModal() {
    const mount = document.getElementById("admin-product-builder-modal-mount");
    if (!mount) return;

    // Preserve scroll position to prevent jumping to top when adding options/ingredients
    const modalBody = mount.querySelector(".admin-modal-body");
    const scrollPos = modalBody ? modalBody.scrollTop : 0;

    const p = this.currentBuilderProduct;
    const categories = MoeStore.getCategories().filter(c => c.id !== "all");
    const isNew = !p.id;

    mount.innerHTML = `
      <div class="admin-modal" style="z-index: 99999;">
        <div class="modal-overlay active" onclick="AdminApp.closeProductBuilder()" style="z-index: 99990;"></div>
        <div class="admin-modal-box" style="z-index: 99991;">
          <div class="admin-modal-header">
            <h2 class="admin-modal-title">${isNew ? "+ Create New Gluten-Free Product" : `Edit Product: ${p.name}`}</h2>
            <button class="btn-action-icon" onclick="AdminApp.closeProductBuilder()">✕</button>
          </div>

          <div class="admin-modal-body">
            <!-- Basic Information -->
            <div class="admin-form-row">
              <div class="admin-form-group">
                <label class="admin-form-label">Product Name (EN) *</label>
                <input type="text" id="builder-name" class="admin-form-input" value="${p.name}" placeholder="e.g. Zinger Burger" required />
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Product Name (AR)</label>
                <input type="text" id="builder-name-ar" class="admin-form-input" value="${p.name_ar || ''}" placeholder="e.g. زنجر برجر" dir="rtl" />
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Category *</label>
                <select id="builder-category" class="admin-form-select">
                  ${categories.map(c => `
                    <option value="${c.id}" ${p.category === c.id ? "selected" : ""}>${c.icon} ${c.name}</option>
                  `).join("")}
                </select>
              </div>
            </div>

            <div class="admin-form-row">
              <div class="admin-form-group">
                <label class="admin-form-label">Base Price (JOD) *</label>
                <input type="number" step="0.05" id="builder-price" class="admin-form-input" value="${p.basePrice}" required />
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Image Asset Path / Upload</label>
                <div style="display: flex; gap: 8px;">
                  <input type="text" id="builder-image" class="admin-form-input" value="${p.image}" style="flex: 1;" />
                  <label class="btn btn-outline" style="cursor: pointer;">
                    Upload
                    <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleImageUpload(event)">
                  </label>
                </div>
              </div>
            </div>

            <div class="admin-form-row">
              <div class="admin-form-group">
                <label class="admin-form-label">Description (English)</label>
                <textarea id="builder-desc" class="admin-form-textarea" rows="2">${p.description || ""}</textarea>
              </div>
              <div class="admin-form-group">
                <label class="admin-form-label">Description (Arabic)</label>
                <textarea id="builder-desc-ar" class="admin-form-textarea" rows="2" dir="rtl">${p.description_ar || ""}</textarea>
              </div>
            </div>

            <!-- Badges & Flags -->
            <div style="display: flex; gap: 20px; flex-wrap: wrap;">
              <label class="admin-form-checkbox-row">
                <input type="checkbox" id="builder-bestseller" ${p.isBestSeller ? "checked" : ""} />
                <span>Mark as Best Seller</span>
              </label>
              <label class="admin-form-checkbox-row">
                <input type="checkbox" id="builder-featured" ${p.isFeatured ? "checked" : ""} />
                <span>Feature on Homepage</span>
              </label>
              <label class="admin-form-checkbox-row">
                <input type="checkbox" id="builder-preorder" ${p.isPreOrder24h ? "checked" : ""} />
                <span>⚠️ 24-Hour Pre-Order Required</span>
              </label>
            </div>

            <!-- Ingredients Builder -->
            <div class="builder-box">
              <div class="builder-header">
                <h3 class="builder-title">🌿 Ingredients (${p.ingredients.length})</h3>
                <button type="button" class="btn btn-outline btn-pill-sm" onclick="AdminApp.addIngredientRow()">+ Add Ingredient</button>
              </div>
              <div id="builder-ingredients-list" style="display: flex; flex-direction: column; gap: 6px;">
                ${p.ingredients.map((ing, idx) => `
                  <div class="builder-item-row" data-idx="${idx}">
                    <input type="text" class="admin-form-input" style="flex: 2;" value="${ing.name}" placeholder="Ingredient (EN)" onchange="AdminApp.updateIngredient(${idx}, 'name', this.value)" />
                    <input type="text" class="admin-form-input" style="flex: 2;" value="${ing.name_ar || ''}" placeholder="Ingredient (AR)" dir="rtl" onchange="AdminApp.updateIngredient(${idx}, 'name_ar', this.value)" />
                    <label style="display: flex; align-items: center; gap: 4px; font-size: 0.78rem;">
                      <input type="checkbox" ${ing.removable ? "checked" : ""} onchange="AdminApp.updateIngredient(${idx}, 'removable', this.checked)" />
                      <span>Removable</span>
                    </label>
                    <button type="button" class="btn-action-icon delete" onclick="AdminApp.removeIngredientRow(${idx})">✕</button>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Option Groups Builder (Required / Optional) -->
            <div class="builder-box">
              <div class="builder-header">
                <h3 class="builder-title">⚙️ Option Groups (${p.optionGroups.length})</h3>
                <button type="button" class="btn btn-outline btn-pill-sm" onclick="AdminApp.addOptionGroup()">+ Add Option Group</button>
              </div>
              <div id="builder-option-groups-list" style="display: flex; flex-direction: column; gap: 10px;">
                ${p.optionGroups.map((g, gIdx) => `
                  <div style="background: #FFFFFF; border: 1px solid #D5DDD5; border-radius: var(--radius-sm); padding: 12px;">
                    <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
                      <input type="text" class="admin-form-input" style="font-weight: 700; flex: 1;" value="${g.name}" placeholder="Group Name (EN)" onchange="AdminApp.updateOptionGroup(${gIdx}, 'name', this.value)" />
                      <input type="text" class="admin-form-input" style="font-weight: 700; flex: 1;" value="${g.name_ar || ''}" placeholder="Group Name (AR)" dir="rtl" onchange="AdminApp.updateOptionGroup(${gIdx}, 'name_ar', this.value)" />
                      <label style="display: flex; align-items: center; gap: 4px; font-size: 0.78rem; white-space: nowrap;">
                        <input type="checkbox" ${g.required ? "checked" : ""} onchange="AdminApp.updateOptionGroup(${gIdx}, 'required', this.checked)" />
                        <span>Required</span>
                      </label>
                      <button type="button" class="btn-action-icon delete" onclick="AdminApp.removeOptionGroup(${gIdx})">✕</button>
                    </div>
                    <!-- Choices -->
                    <div style="display: flex; flex-direction: column; gap: 4px; padding-left: 8px; border-left: 2px solid var(--c-orange);">
                      ${g.options.map((opt, optIdx) => `
                        <div style="display: flex; gap: 6px; align-items: center;">
                          <input type="text" class="admin-form-input" style="font-size: 0.82rem; flex: 2;" value="${opt.name}" placeholder="Option (EN)" onchange="AdminApp.updateOptionChoice(${gIdx}, ${optIdx}, 'name', this.value)" />
                          <input type="text" class="admin-form-input" style="font-size: 0.82rem; flex: 2;" value="${opt.name_ar || ''}" placeholder="Option (AR)" dir="rtl" onchange="AdminApp.updateOptionChoice(${gIdx}, ${optIdx}, 'name_ar', this.value)" />
                          <input type="number" step="0.05" class="admin-form-input" style="width: 90px; font-size: 0.82rem;" value="${opt.price}" placeholder="+Price JOD" onchange="AdminApp.updateOptionChoice(${gIdx}, ${optIdx}, 'price', parseFloat(this.value) || 0)" />
                          <button type="button" class="btn-action-icon delete" onclick="AdminApp.removeOptionChoice(${gIdx}, ${optIdx})">✕</button>
                        </div>
                      `).join("")}
                      <button type="button" class="btn btn-outline btn-pill-sm" style="align-self: flex-start; margin-top: 4px;" onclick="AdminApp.addOptionChoice(${gIdx})">+ Add Choice</button>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>

            <!-- Modifiers Builder (Add Extras) -->
            <div class="builder-box">
              <div class="builder-header">
                <h3 class="builder-title">✨ Add Extras / Modifiers (${p.modifiers.length})</h3>
                <button type="button" class="btn btn-outline btn-pill-sm" onclick="AdminApp.addModifierRow()">+ Add Extra</button>
              </div>
              <div id="builder-modifiers-list" style="display: flex; flex-direction: column; gap: 6px;">
                ${p.modifiers.map((m, mIdx) => `
                  <div class="builder-item-row">
                    <input type="text" class="admin-form-input" style="flex: 2;" value="${m.name}" placeholder="Modifier (EN)" onchange="AdminApp.updateModifier(${mIdx}, 'name', this.value)" />
                    <input type="text" class="admin-form-input" style="flex: 2;" value="${m.name_ar || ''}" placeholder="Modifier (AR)" dir="rtl" onchange="AdminApp.updateModifier(${mIdx}, 'name_ar', this.value)" />
                    <input type="number" step="0.05" class="admin-form-input" style="width: 100px;" value="${m.price}" placeholder="+Price JOD" onchange="AdminApp.updateModifier(${mIdx}, 'price', parseFloat(this.value) || 0)" />
                    <button type="button" class="btn-action-icon delete" onclick="AdminApp.removeModifierRow(${mIdx})">✕</button>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="AdminApp.closeProductBuilder()">Cancel</button>
            <button class="btn btn-primary" onclick="AdminApp.saveProductFromBuilder()">Save Product Changes</button>
          </div>
        </div>
      </div>
    `;

    // Restore scroll position
    const newModalBody = mount.querySelector(".admin-modal-body");
    if (newModalBody) {
      newModalBody.scrollTop = scrollPos;
    }
  },

  closeProductBuilder() {
    const mount = document.getElementById("admin-product-builder-modal-mount");
    if (mount) mount.innerHTML = "";
    this.currentBuilderProduct = null;
  },

  syncProductBuilderState() {
    if (!this.currentBuilderProduct) return;
    
    const name = document.getElementById("builder-name")?.value;
    if (name !== undefined) this.currentBuilderProduct.name = name;
    
    const nameAr = document.getElementById("builder-name-ar")?.value;
    if (nameAr !== undefined) this.currentBuilderProduct.name_ar = nameAr;
    
    const price = document.getElementById("builder-price")?.value;
    if (price !== undefined) this.currentBuilderProduct.basePrice = parseFloat(price) || 0;
    
    const cat = document.getElementById("builder-category")?.value;
    if (cat !== undefined) this.currentBuilderProduct.category = cat;
    
    const img = document.getElementById("builder-image")?.value;
    if (img !== undefined) this.currentBuilderProduct.image = img || "assets/images/zinger_burger.png";
    
    const desc = document.getElementById("builder-desc")?.value;
    if (desc !== undefined) this.currentBuilderProduct.description = desc;
    
    const descAr = document.getElementById("builder-desc-ar")?.value;
    if (descAr !== undefined) this.currentBuilderProduct.description_ar = descAr;
    
    if (this.currentBuilderProduct.available === undefined) {
      this.currentBuilderProduct.available = true;
    }
    
    const bestSeller = document.getElementById("builder-bestseller")?.checked;
    if (bestSeller !== undefined) this.currentBuilderProduct.isBestSeller = bestSeller;
    
    const featured = document.getElementById("builder-featured")?.checked;
    if (featured !== undefined) this.currentBuilderProduct.isFeatured = featured;
    
    const preOrder = document.getElementById("builder-preorder")?.checked;
    if (preOrder !== undefined) this.currentBuilderProduct.isPreOrder24h = preOrder;
  },

  addIngredientRow() {
    this.syncProductBuilderState();
    this.currentBuilderProduct.ingredients.push({
      id: "ing-" + Date.now().toString(36),
      name: "New Ingredient",
      desc: "",
      icon: "assets/images/ing_bun.png",
      removable: true
    });
    this.renderProductBuilderModal();
  },

  updateIngredient(idx, field, value) {
    if (this.currentBuilderProduct.ingredients[idx]) {
      this.currentBuilderProduct.ingredients[idx][field] = value;
    }
  },

  removeIngredientRow(idx) {
    this.syncProductBuilderState();
    this.currentBuilderProduct.ingredients.splice(idx, 1);
    this.renderProductBuilderModal();
  },

  addOptionGroup() {
    this.syncProductBuilderState();
    this.currentBuilderProduct.optionGroups.push({
      id: "grp-" + Date.now().toString(36),
      name: "New Option Group",
      required: true,
      type: "radio",
      options: [
        { id: "opt-1", name: "Standard", price: 0.00, default: true },
        { id: "opt-2", name: "Upgraded", price: 1.50 }
      ]
    });
    this.renderProductBuilderModal();
  },

  updateOptionGroup(gIdx, field, value) {
    if (this.currentBuilderProduct.optionGroups[gIdx]) {
      this.currentBuilderProduct.optionGroups[gIdx][field] = value;
    }
  },

  removeOptionGroup(gIdx) {
    this.syncProductBuilderState();
    this.currentBuilderProduct.optionGroups.splice(gIdx, 1);
    this.renderProductBuilderModal();
  },

  addOptionChoice(gIdx) {
    this.syncProductBuilderState();
    this.currentBuilderProduct.optionGroups[gIdx].options.push({
      id: "opt-" + Date.now().toString(36),
      name: "New Choice",
      price: 0.00
    });
    this.renderProductBuilderModal();
  },

  updateOptionChoice(gIdx, optIdx, field, value) {
    if (this.currentBuilderProduct.optionGroups[gIdx]?.options[optIdx]) {
      this.currentBuilderProduct.optionGroups[gIdx].options[optIdx][field] = value;
    }
  },

  removeOptionChoice(gIdx, optIdx) {
    this.syncProductBuilderState();
    this.currentBuilderProduct.optionGroups[gIdx].options.splice(optIdx, 1);
    this.renderProductBuilderModal();
  },

  addModifierRow() {
    this.syncProductBuilderState();
    this.currentBuilderProduct.modifiers.push({
      id: "mod-" + Date.now().toString(36),
      name: "Extra Sauce",
      price: 0.30,
      type: "add"
    });
    this.renderProductBuilderModal();
  },

  updateModifier(mIdx, field, value) {
    if (this.currentBuilderProduct.modifiers[mIdx]) {
      this.currentBuilderProduct.modifiers[mIdx][field] = value;
    }
  },

  removeModifierRow(mIdx) {
    this.syncProductBuilderState();
    this.currentBuilderProduct.modifiers.splice(mIdx, 1);
    this.renderProductBuilderModal();
  },
  
  handleImageUpload(event, targetId = "builder-image") {
    const file = event.target.files[0];
    if (!file) return;
    
    App.showToast("Processing image...", "info");
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image to Base64 (WebP, 75% quality to preserve transparency)
        const compressedDataUrl = canvas.toDataURL("image/webp", 0.75);
        
        const input = document.getElementById(targetId);
        if (input) {
          input.value = compressedDataUrl;
          
          // Show approximate new size
          const kbSize = Math.round((compressedDataUrl.length * 3 / 4) / 1024);
          App.showToast(`Image compressed to ~${kbSize}KB and loaded! 📸`, "success");
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  async saveProductFromBuilder() {
    this.syncProductBuilderState();
    
    // We already synced everything, but we can do validation checks using the synced data
    const name = this.currentBuilderProduct.name;
    if (!name) {
      App.showToast("Product name is required!", "warning");
      return;
    }

    const price = this.currentBuilderProduct.basePrice;
    if (price < 0) {
      App.showToast("Product price cannot be negative.", "danger");
      return;
    }

    const res = await MoeStore.saveProduct(this.currentBuilderProduct);
    this.closeProductBuilder();
    if (res && res.error) {
      App.showToast(`Error saving product: ${res.error.message}`, "danger");
    } else {
      App.showToast(`Saved ${name} successfully! 🌿`, "success");
    }
    this.renderMenuTab();
  },

  // ==========================================================================
  // 3. CATEGORIES MANAGEMENT TAB
  // ==========================================================================
  renderCategoriesTab() {
    const categories = MoeStore.getCategories();

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">Menu Categories (${categories.length})</h2>
          <button class="btn btn-accent btn-pill-sm" onclick="AdminApp.openCategoryBuilder()">+ Add Category</button>
        </div>

        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Icon</th>
                <th>Category Name</th>
                <th>Slug / ID</th>
                <th>Enabled</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${categories.map((c, idx) => `
                <tr>
                  <td><strong>#${idx + 1}</strong></td>
                  <td style="font-size: 1.4rem;">${c.icon || "🍽️"}</td>
                  <td><strong>${c.name}</strong></td>
                  <td><code>${c.id}</code></td>
                  <td>
                    ${c.id !== "all" ? `
                      <label class="toggle-switch">
                        <input type="checkbox" ${c.enabled ? "checked" : ""} onchange="AdminApp.toggleCategoryEnabled('${c.id}')">
                        <span class="toggle-slider"></span>
                      </label>
                    ` : `<span class="badge badge-gf">Always Active</span>`}
                  </td>
                  <td>
                    ${c.id !== "all" ? `
                      <div class="action-btns-group">
                        <button class="btn-action-icon" onclick="AdminApp.moveCategory('${c.id}', -1)" title="Move Up" ${idx === 1 ? 'disabled style="opacity:0.3"' : ''}>⬆️</button>
                        <button class="btn-action-icon" onclick="AdminApp.moveCategory('${c.id}', 1)" title="Move Down" ${idx === categories.length - 1 ? 'disabled style="opacity:0.3"' : ''}>⬇️</button>
                        <button class="btn-action-icon" onclick="AdminApp.openCategoryBuilder('${c.id}')" title="Edit">✏️</button>
                        <button class="btn-action-icon delete" onclick="AdminApp.deleteCategoryPrompt('${c.id}')" title="Delete">🗑️</button>
                      </div>
                    ` : ""}
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  // --- CUSTOM CONFIRMATION MODAL ---
  openConfirmationModal(title, text, confirmText, confirmAction) {
    const mount = document.getElementById("admin-confirmation-modal-mount");
    if (!mount) return;
    
    // Store action string or function globally for execution
    window._currentConfirmAction = confirmAction;

    mount.innerHTML = `
      <div class="admin-modal" style="z-index: 99999;">
        <div class="modal-overlay active" onclick="AdminApp.closeConfirmationModal()" style="z-index: 99990;"></div>
        <div class="admin-modal-box" style="max-width: 400px; z-index: 99991;">
          <div class="admin-modal-header">
            <h2 class="admin-modal-title" style="color: var(--c-danger);">${title}</h2>
            <button class="btn-action-icon" onclick="AdminApp.closeConfirmationModal()">✕</button>
          </div>
          <div class="admin-modal-body" style="flex: unset; overflow-y: hidden;">
            <p>${text}</p>
          </div>
          <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="AdminApp.closeConfirmationModal()">Cancel</button>
            <button class="btn btn-primary" style="background-color: var(--c-danger); border-color: var(--c-danger);" onclick="if(window._currentConfirmAction) window._currentConfirmAction(); AdminApp.closeConfirmationModal();">${confirmText}</button>
          </div>
        </div>
      </div>
    `;
  },

  closeConfirmationModal() {
    const mount = document.getElementById("admin-confirmation-modal-mount");
    if (mount) mount.innerHTML = "";
    window._currentConfirmAction = null;
  },

  // --- CATEGORY BUILDER MODAL ---
  openCategoryBuilder(catId = null) {
    const mount = document.getElementById("admin-category-modal-mount");
    if (!mount) return;

    let cat = { id: "", name: "", name_ar: "", icon: "🍽️", enabled: true, order: MoeStore.getCategories().length + 1 };
    let isNew = true;

    if (catId) {
      const existing = MoeStore.getCategories().find(c => c.id === catId);
      if (existing) {
        cat = { ...existing };
        isNew = false;
      }
    }
    
    this.currentBuilderCategory = cat;

    mount.innerHTML = `
      <div class="admin-modal" style="z-index: 99999;">
        <div class="modal-overlay active" onclick="AdminApp.closeCategoryBuilder()" style="z-index: 99990;"></div>
        <div class="admin-modal-box" style="max-width: 500px; z-index: 99991;">
          <div class="admin-modal-header">
            <h2 class="admin-modal-title">${isNew ? "+ Create New Category" : `Edit Category: ${cat.name}`}</h2>
            <button class="btn-action-icon" onclick="AdminApp.closeCategoryBuilder()">✕</button>
          </div>

          <div class="admin-modal-body">
            <div class="admin-form-group">
              <label class="admin-form-label">Category Name (EN) *</label>
              <input type="text" id="builder-cat-name" class="admin-form-input" value="${cat.name}" placeholder="e.g. Desserts & Sweet Bites" required />
            </div>
            
            <div class="admin-form-group">
              <label class="admin-form-label">Category Name (AR) *</label>
              <input type="text" id="builder-cat-name-ar" class="admin-form-input" value="${cat.name_ar || ''}" placeholder="e.g. حلويات" dir="rtl" required />
            </div>

            <div class="admin-form-group">
              <label class="admin-form-label">Emoji Icon</label>
              <input type="text" id="builder-cat-icon" class="admin-form-input" value="${cat.icon}" placeholder="e.g. 🍰" />
            </div>
            
            <div class="admin-form-group">
              <label class="admin-form-label">Enabled</label>
              <label class="toggle-switch">
                <input type="checkbox" id="builder-cat-enabled" ${cat.enabled ? "checked" : ""}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="AdminApp.closeCategoryBuilder()">Cancel</button>
            <button class="btn btn-primary" onclick="AdminApp.saveCategoryFromBuilder()">Save Category</button>
          </div>
        </div>
      </div>
    `;
  },

  closeCategoryBuilder() {
    const mount = document.getElementById("admin-category-modal-mount");
    if (mount) mount.innerHTML = "";
    this.currentBuilderCategory = null;
  },
  
  saveCategoryFromBuilder() {
    const name = document.getElementById("builder-cat-name").value.trim();
    const name_ar = document.getElementById("builder-cat-name-ar").value.trim();
    const icon = document.getElementById("builder-cat-icon").value.trim() || "🍽️";
    const enabled = document.getElementById("builder-cat-enabled").checked;
    
    if (!name || !name_ar) {
      App.showToast("Please fill in both English and Arabic category names.", "danger");
      return;
    }
    
    const cat = this.currentBuilderCategory;
    cat.name = name;
    cat.name_ar = name_ar;
    cat.icon = icon;
    cat.enabled = enabled;
    
    if (!cat.id) {
      cat.id = name.toLowerCase().replace(/[^a-z0-9]/g, "-");
    }
    
    MoeStore.saveCategory(cat);
    App.showToast(`Category ${name} saved successfully`);
    this.closeCategoryBuilder();
    this.renderCategoriesTab();
  },

  deleteCategoryPrompt(catId) {
    this.openConfirmationModal(
      "Delete Category?", 
      "Are you sure you want to delete this category? Products in this category will need reassignment. This action cannot be undone.", 
      "Delete Category", 
      () => {
        MoeStore.deleteCategory(catId);
        App.showToast("Category deleted", "info");
        AdminApp.renderCategoriesTab();
      }
    );
  },

  toggleCategoryEnabled(catId) {
    const cat = MoeStore.getCategories().find(c => c.id === catId);
    if (cat) {
      cat.enabled = !cat.enabled;
      MoeStore.saveCategory(cat);
      App.showToast(`Category ${cat.name} ${cat.enabled ? "enabled" : "disabled"}`);
    }
  },
  
  moveCategory(catId, dir) {
    const categories = MoeStore.getCategories();
    const idx = categories.findIndex(c => c.id === catId);
    if (idx === -1 || (dir === -1 && idx <= 1) || (dir === 1 && idx === categories.length - 1)) return; // idx <= 1 because 0 is "All"
    
    // Swap order values
    const catA = categories[idx];
    const catB = categories[idx + dir];
    
    const tempOrder = catA.order;
    catA.order = catB.order;
    catB.order = tempOrder;
    
    MoeStore.saveCategory(catA);
    MoeStore.saveCategory(catB);
    this.renderCategoriesTab();
  },

  // ==========================================================================
  // 4. ORDERS & WHATSAPP HANDOFFS LOG TAB
  // ==========================================================================
  renderOrdersTab() {
    const handoffs = MoeStore.getOrderHandoffs();
    const settings = MoeStore.getSettings();

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">WhatsApp Order Handoffs Log (${handoffs.length})</h2>
          <span style="font-size: 0.8rem; color: var(--c-text-muted);">Orders prepared in Cart and launched to WhatsApp</span>
        </div>

        ${handoffs.length === 0 ? `
          <div style="padding: 40px; text-align: center; color: var(--c-text-muted);">
            No customer order handoffs logged yet. When customers click "Order via WhatsApp", logs will appear here.
          </div>
        ` : `
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date & Time</th>
                  <th>Order Items Breakdown</th>
                  <th>Total</th>
                  <th>Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                ${handoffs.map(ord => `
                  <tr>
                    <td><strong>${ord.id}</strong></td>
                    <td style="font-size: 0.78rem; color: var(--c-text-muted);">${new Date(ord.timestamp).toLocaleString()}</td>
                    <td>
                      <div style="font-size: 0.82rem;">
                        ${(ord.items || []).map(i => `
                          <div><strong>${i.quantity}× ${i.name}</strong> 
                            ${(i.selectedOptions || []).map(o => `<span style="color: #666;">(${o.optionName})</span>`).join(" ")}
                            ${(i.removedIngredients || []).map(r => `<span style="color: #C83220;">[No ${r}]</span>`).join(" ")}
                          </div>
                        `).join("")}
                      </div>
                    </td>
                    <td><strong>${ord.total.toFixed(2)} ${settings.currency}</strong></td>
                    <td style="font-size: 0.78rem; color: var(--c-text-muted);">${ord.customerNotes || "—"}</td>
                    <td><span class="badge badge-gf">${ord.status}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
  },

  // ==========================================================================
  // 5. HOME PAGE CMS TAB
  // ==========================================================================
  renderHomeCmsTab() {
    const rawHome = MoeStore.getHomeContent() || {};
    const home = new Proxy(rawHome, { get: (t, p) => t[p] === null || t[p] === undefined ? '' : t[p] });

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">Hero Section & Brand Promise CMS</h2>
          <button class="btn btn-primary btn-pill-sm" onclick="AdminApp.saveHomeCms()">Save Home Content</button>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Background Image</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="home-img-bg" class="admin-form-input" value="${home.heroImageBg || ''}" style="flex: 1;" placeholder="assets/images/hero_bg.jpg" />
                <label class="btn btn-outline" style="cursor: pointer; padding: 8px 12px;">
                  Upload
                  <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleImageUpload(event, 'home-img-bg')">
                </label>
              </div>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Secondary Image (Card)</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="home-img-sec" class="admin-form-input" value="${home.heroImageSecondary || ''}" style="flex: 1;" placeholder="assets/images/home_card.jpg" />
                <label class="btn btn-outline" style="cursor: pointer; padding: 8px 12px;">
                  Upload
                  <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleImageUpload(event, 'home-img-sec')">
                </label>
              </div>
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Circle Logo Image</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="home-img-logo" class="admin-form-input" value="${home.heroLogo || ''}" style="flex: 1;" placeholder="assets/images/logo_new.jpg" />
                <label class="btn btn-outline" style="cursor: pointer; padding: 8px 12px;">
                  Upload
                  <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleImageUpload(event, 'home-img-logo')">
                </label>
              </div>
            </div>
            <div class="admin-form-group">
              <!-- Empty spacer -->
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Badge Text (EN)</label>
              <input type="text" id="home-badge" class="admin-form-input" value="${home.heroBadge}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Badge Text (AR)</label>
              <input type="text" id="home-badge-ar" class="admin-form-input" value="${home.heroBadge_ar || ''}" dir="rtl" />
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Main Title (EN)</label>
              <input type="text" id="home-title" class="admin-form-input" value="${home.heroTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Main Title (AR)</label>
              <input type="text" id="home-title-ar" class="admin-form-input" value="${home.heroTitle_ar || ''}" dir="rtl" />
            </div>
          </div>
          

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Primary CTA Text (EN)</label>
              <input type="text" id="home-cta" class="admin-form-input" value="${home.heroCtaText}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Primary CTA Text (AR)</label>
              <input type="text" id="home-cta-ar" class="admin-form-input" value="${home.heroCtaText_ar || ''}" dir="rtl" />
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Secondary CTA Text (EN)</label>
              <input type="text" id="home-sec-cta" class="admin-form-input" value="${home.heroCtaSecondary}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Secondary CTA Text (AR)</label>
              <input type="text" id="home-sec-cta-ar" class="admin-form-input" value="${home.heroCtaSecondary_ar || ''}" dir="rtl" />
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #E2E8E2; margin: 10px 0;" />
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--c-forest); margin-bottom: 8px;">Menu Discovery Section</h3>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Discovery Title (EN)</label>
              <input type="text" id="home-craving-title" class="admin-form-input" value="${home.cravingTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Discovery Title (AR)</label>
              <input type="text" id="home-craving-title-ar" class="admin-form-input" value="${home.cravingTitle_ar || ''}" dir="rtl" />
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #E2E8E2; margin: 10px 0;" />
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--c-forest); margin-bottom: 8px;">Brand Promise Section</h3>
          
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Logo Image</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="home-img-snippet" class="admin-form-input" value="${home.snippetLogo || ''}" style="flex: 1;" placeholder="assets/images/logo_transparent.png" />
                <label class="btn btn-outline" style="cursor: pointer; padding: 8px 12px;">
                  Upload
                  <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleImageUpload(event, 'home-img-snippet')">
                </label>
              </div>
            </div>
            <div class="admin-form-group">
              <!-- Empty spacer -->
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Eyebrow (EN)</label>
              <input type="text" id="home-promise-sub" class="admin-form-input" value="${home.promiseSubtitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Eyebrow (AR)</label>
              <input type="text" id="home-promise-sub-ar" class="admin-form-input" value="${home.promiseSubtitle_ar || ''}" dir="rtl" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Title (EN)</label>
              <input type="text" id="home-promise-title" class="admin-form-input" value="${home.promiseTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Title (AR)</label>
              <input type="text" id="home-promise-title-ar" class="admin-form-input" value="${home.promiseTitle_ar || ''}" dir="rtl" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Text (EN)</label>
              <textarea id="home-promise-text" class="admin-form-textarea" rows="3">${home.promiseText}</textarea>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Brand Promise Text (AR)</label>
              <textarea id="home-promise-text-ar" class="admin-form-textarea" rows="3" dir="rtl">${home.promiseText_ar || ''}</textarea>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  async saveHomeCms() {
    const updated = {
      heroImageBg: document.getElementById("home-img-bg")?.value,
      heroImageSecondary: document.getElementById("home-img-sec")?.value,
      heroLogo: document.getElementById("home-img-logo")?.value,
      heroBadge: document.getElementById("home-badge")?.value,
      heroBadge_ar: document.getElementById("home-badge-ar")?.value,
      heroTitle: document.getElementById("home-title")?.value,
      heroTitle_ar: document.getElementById("home-title-ar")?.value,
      heroCtaText: document.getElementById("home-cta")?.value,
      heroCtaText_ar: document.getElementById("home-cta-ar")?.value,
      heroCtaSecondary: document.getElementById("home-sec-cta")?.value,
      heroCtaSecondary_ar: document.getElementById("home-sec-cta-ar")?.value,
      cravingTitle: document.getElementById("home-craving-title")?.value,
      cravingTitle_ar: document.getElementById("home-craving-title-ar")?.value,
      snippetLogo: document.getElementById("home-img-snippet")?.value,
      promiseSubtitle: document.getElementById("home-promise-sub")?.value,
      promiseSubtitle_ar: document.getElementById("home-promise-sub-ar")?.value,
      promiseTitle: document.getElementById("home-promise-title")?.value,
      promiseTitle_ar: document.getElementById("home-promise-title-ar")?.value,
      promiseText: document.getElementById("home-promise-text")?.value,
      promiseText_ar: document.getElementById("home-promise-text-ar")?.value
    };
    App.showToast("Saving Home content...", "info");
    const res = await MoeStore.updateHomeContent(updated);
    if (res && res.error) {
      App.showToast(`Error saving: ${res.error.message}`, "danger");
    } else {
      App.showToast("Home page CMS saved successfully! 🌿", "success");
    }
  },

  // ==========================================================================
  // 6. ABOUT US CMS TAB
  // ==========================================================================
  renderAboutCmsTab() {
    const rawAbout = MoeStore.getAboutContent() || {};
    const about = new Proxy(rawAbout, { get: (t, p) => t[p] === null || t[p] === undefined ? '' : t[p] });

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">About Us Page Story & Values CMS</h2>
          <button class="btn btn-primary btn-pill-sm" onclick="AdminApp.saveAboutCms()">Save About Content</button>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Logo Image</label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="about-img-hero" class="admin-form-input" value="${about.heroImage || ''}" style="flex: 1;" placeholder="assets/images/logo_transparent.png" />
                <label class="btn btn-outline" style="cursor: pointer; padding: 8px 12px;">
                  Upload
                  <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleImageUpload(event, 'about-img-hero')">
                </label>
              </div>
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Title (EN)</label>
              <input type="text" id="about-hero-title" class="admin-form-input" value="${about.heroTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Title (AR)</label>
              <input type="text" id="about-hero-title-ar" class="admin-form-input" value="${about.heroTitle_ar || ''}" dir="rtl" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Subtitle (EN)</label>
              <input type="text" id="about-hero-sub" class="admin-form-input" value="${about.heroSubtitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Subtitle (AR)</label>
              <input type="text" id="about-hero-sub-ar" class="admin-form-input" value="${about.heroSubtitle_ar || ''}" dir="rtl" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Story Section Title (EN)</label>
              <input type="text" id="about-story-title" class="admin-form-input" value="${about.storyTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Story Section Title (AR)</label>
              <input type="text" id="about-story-title-ar" class="admin-form-input" value="${about.storyTitle_ar || ''}" dir="rtl" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Story Text (EN)</label>
              <textarea id="about-story-text" class="admin-form-textarea" rows="4">${about.storyText}</textarea>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Story Text (AR)</label>
              <textarea id="about-story-text-ar" class="admin-form-textarea" rows="4" dir="rtl">${about.storyText_ar || ''}</textarea>
            </div>
          </div>


          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Mission Title (EN)</label>
              <input type="text" id="about-mission-title" class="admin-form-input" value="${about.missionTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Mission Title (AR)</label>
              <input type="text" id="about-mission-title-ar" class="admin-form-input" value="${about.missionTitle_ar || ''}" dir="rtl" />
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Mission Text (EN)</label>
              <textarea id="about-mission-text" class="admin-form-textarea" rows="2">${about.missionDesc}</textarea>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Mission Text (AR)</label>
              <textarea id="about-mission-text-ar" class="admin-form-textarea" rows="2" dir="rtl">${about.missionDesc_ar || ''}</textarea>
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Vision Title (EN)</label>
              <input type="text" id="about-vision-title" class="admin-form-input" value="${about.visionTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Vision Title (AR)</label>
              <input type="text" id="about-vision-title-ar" class="admin-form-input" value="${about.visionTitle_ar || ''}" dir="rtl" />
            </div>
          </div>
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Vision Text (EN)</label>
              <textarea id="about-vision-text" class="admin-form-textarea" rows="2">${about.visionDesc}</textarea>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Vision Text (AR)</label>
              <textarea id="about-vision-text-ar" class="admin-form-textarea" rows="2" dir="rtl">${about.visionDesc_ar || ''}</textarea>
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #E2E8E2; margin: 10px 0;" />
          <h3 style="font-size: 1.1rem; font-weight: 700; color: var(--c-forest); margin-bottom: 8px;">Trust Grid (4 Items)</h3>
          
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 1 Title (EN) / (AR)</label>
              <input type="text" id="about-trust1-title" class="admin-form-input" value="${about.trust1Title}" style="margin-bottom:8px" />
              <input type="text" id="about-trust1-title-ar" class="admin-form-input" value="${about.trust1Title_ar || ''}" dir="rtl" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 1 Text (EN) / (AR)</label>
              <textarea id="about-trust1-text" class="admin-form-textarea" rows="1" style="margin-bottom:8px">${about.trust1Desc}</textarea>
              <textarea id="about-trust1-text-ar" class="admin-form-textarea" rows="1" dir="rtl">${about.trust1Desc_ar || ''}</textarea>
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 2 Title (EN) / (AR)</label>
              <input type="text" id="about-trust2-title" class="admin-form-input" value="${about.trust2Title}" style="margin-bottom:8px" />
              <input type="text" id="about-trust2-title-ar" class="admin-form-input" value="${about.trust2Title_ar || ''}" dir="rtl" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 2 Text (EN) / (AR)</label>
              <textarea id="about-trust2-text" class="admin-form-textarea" rows="1" style="margin-bottom:8px">${about.trust2Desc}</textarea>
              <textarea id="about-trust2-text-ar" class="admin-form-textarea" rows="1" dir="rtl">${about.trust2Desc_ar || ''}</textarea>
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 3 Title (EN) / (AR)</label>
              <input type="text" id="about-trust3-title" class="admin-form-input" value="${about.trust3Title}" style="margin-bottom:8px" />
              <input type="text" id="about-trust3-title-ar" class="admin-form-input" value="${about.trust3Title_ar || ''}" dir="rtl" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 3 Text (EN) / (AR)</label>
              <textarea id="about-trust3-text" class="admin-form-textarea" rows="1" style="margin-bottom:8px">${about.trust3Desc}</textarea>
              <textarea id="about-trust3-text-ar" class="admin-form-textarea" rows="1" dir="rtl">${about.trust3Desc_ar || ''}</textarea>
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 4 Title (EN) / (AR)</label>
              <input type="text" id="about-trust4-title" class="admin-form-input" value="${about.trust4Title}" style="margin-bottom:8px" />
              <input type="text" id="about-trust4-title-ar" class="admin-form-input" value="${about.trust4Title_ar || ''}" dir="rtl" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Trust 4 Text (EN) / (AR)</label>
              <textarea id="about-trust4-text" class="admin-form-textarea" rows="1" style="margin-bottom:8px">${about.trust4Desc}</textarea>
              <textarea id="about-trust4-text-ar" class="admin-form-textarea" rows="1" dir="rtl">${about.trust4Desc_ar || ''}</textarea>
            </div>
          </div>
          
        </div>
      </div>
    `;
  },

  async saveAboutCms() {
    const updated = {
      heroImage: document.getElementById("about-img-hero")?.value,
      heroTitle: document.getElementById("about-hero-title")?.value,
      heroTitle_ar: document.getElementById("about-hero-title-ar")?.value,
      heroSubtitle: document.getElementById("about-hero-sub")?.value,
      heroSubtitle_ar: document.getElementById("about-hero-sub-ar")?.value,
      storyTitle: document.getElementById("about-story-title")?.value,
      storyTitle_ar: document.getElementById("about-story-title-ar")?.value,
      storyText: document.getElementById("about-story-text")?.value,
      storyText_ar: document.getElementById("about-story-text-ar")?.value,

      missionTitle: document.getElementById("about-mission-title")?.value,
      missionTitle_ar: document.getElementById("about-mission-title-ar")?.value,
      missionDesc: document.getElementById("about-mission-text")?.value,
      missionDesc_ar: document.getElementById("about-mission-text-ar")?.value,
      visionTitle: document.getElementById("about-vision-title")?.value,
      visionTitle_ar: document.getElementById("about-vision-title-ar")?.value,
      visionDesc: document.getElementById("about-vision-text")?.value,
      visionDesc_ar: document.getElementById("about-vision-text-ar")?.value,
      trust1Title: document.getElementById("about-trust1-title")?.value,
      trust1Title_ar: document.getElementById("about-trust1-title-ar")?.value,
      trust1Desc: document.getElementById("about-trust1-text")?.value,
      trust1Desc_ar: document.getElementById("about-trust1-text-ar")?.value,
      trust2Title: document.getElementById("about-trust2-title")?.value,
      trust2Title_ar: document.getElementById("about-trust2-title-ar")?.value,
      trust2Desc: document.getElementById("about-trust2-text")?.value,
      trust2Desc_ar: document.getElementById("about-trust2-text-ar")?.value,
      trust3Title: document.getElementById("about-trust3-title")?.value,
      trust3Title_ar: document.getElementById("about-trust3-title-ar")?.value,
      trust3Desc: document.getElementById("about-trust3-text")?.value,
      trust3Desc_ar: document.getElementById("about-trust3-text-ar")?.value,
      trust4Title: document.getElementById("about-trust4-title")?.value,
      trust4Title_ar: document.getElementById("about-trust4-title-ar")?.value,
      trust4Desc: document.getElementById("about-trust4-text")?.value,
      trust4Desc_ar: document.getElementById("about-trust4-text-ar")?.value
    };
    App.showToast("Saving About content...", "info");
    const res = await MoeStore.updateAboutContent(updated);
    if (res && res.error) {
      App.showToast(`Error saving: ${res.error.message}`, "danger");
    } else {
      App.showToast("About Us page CMS saved successfully! 🌿", "success");
    }
  },

  // ==========================================================================
  // 7. SETTINGS & SOCIAL TAB
  // ==========================================================================
  renderSettingsTab() {
    const s = MoeStore.getSettings();

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">Restaurant Contact & WhatsApp Ordering Settings</h2>
          <button class="btn btn-primary btn-pill-sm" onclick="AdminApp.saveSettings()">Save Settings</button>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">WhatsApp Ordering Number (International without +)</label>
              <input type="text" id="settings-wa" class="admin-form-input" value="${s.whatsappNumber}" placeholder="962792512221" />
              <span style="font-size: 0.75rem; color: var(--c-text-muted);">Used for direct wa.me order handoff links.</span>
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Display Phone Number</label>
              <input type="text" id="settings-phone-disp" class="admin-form-input" value="${s.phoneDisplay}" placeholder="0792512221" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Instagram Username</label>
              <input type="text" id="settings-insta" class="admin-form-input" value="${s.instagram}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Facebook URL</label>
              <input type="text" id="settings-fb" class="admin-form-input" value="${s.facebook}" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Restaurant Currency</label>
              <input type="text" id="settings-curr" class="admin-form-input" value="${s.currency}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Working Hours</label>
              <input type="text" id="settings-hours" class="admin-form-input" value="${s.workingHours}" />
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #E2E8E2; margin: 10px 0;" />

          <h3 style="font-size: 1rem; font-weight: 800; color: var(--c-forest);">Database Tools & Backups</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-pill-sm" onclick="AdminApp.exportData()">Export Database Backup (JSON)</button>
          </div>
        </div>
      </div>
    `;
  },

  // ==========================================================================
  // 8. SUBSCRIPTIONS MANAGEMENT TAB (MIX Active Model — Complete Bilingual CMS)
  // ==========================================================================
  renderSubscriptionsTab() {
    setTimeout(() => AdminApp.buildSubscriptionsTabUI(), 50);
    return `
      <div id="sub-admin-tab-container">
        <div style="padding: 60px 20px; text-align: center; color: var(--c-forest); font-weight: 700;">
          <div style="font-size: 2rem; margin-bottom: 12px;">🍲</div>
          <div>جاري تحميل لوحة تحكم الاشتراكات...</div>
        </div>
      </div>
    `;
  },

  handleSubImageUpload(event, targetInputId) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    App.showToast("جاري معالجة وضغط الصورة... ⏳", "info");

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round(height * (MAX_WIDTH / width));
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round(width * (MAX_HEIGHT / height));
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/webp", 0.82);

        const input = document.getElementById(targetInputId);
        if (input) {
          input.value = compressedDataUrl;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new Event("change", { bubbles: true }));
        }

        const preview = document.getElementById(`${targetInputId}-preview`);
        if (preview) {
          preview.src = compressedDataUrl;
          preview.style.display = "block";
          const noImg = document.getElementById(`${targetInputId}-no-img`);
          if (noImg) noImg.style.display = "none";
        }

        const kbSize = Math.round((compressedDataUrl.length * 3 / 4) / 1024);
        App.showToast(`تم تحميل وضغط الصورة بنجاح (~${kbSize}KB) 📸`, "success");
        this.markSubDirty();
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  },

  clearSubImage(targetInputId) {
    const input = document.getElementById(targetInputId);
    if (input) {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    }
    const preview = document.getElementById(`${targetInputId}-preview`);
    if (preview) {
      preview.src = "";
      preview.style.display = "none";
    }
    const noImg = document.getElementById(`${targetInputId}-no-img`);
    if (noImg) noImg.style.display = "block";
    this.markSubDirty();
  },

  updateSubImagePreview(url, previewId) {
    const preview = document.getElementById(previewId);
    const noImg = document.getElementById(previewId.replace("-preview", "-no-img"));
    if (preview) {
      if (url && url.trim()) {
        preview.src = url.trim();
        preview.style.display = "block";
        if (noImg) noImg.style.display = "none";
      } else {
        preview.src = "";
        preview.style.display = "none";
        if (noImg) noImg.style.display = "block";
      }
    }
    this.markSubDirty();
  },

  markSubDirty() {
    const btn = document.getElementById("sub-save-btn");
    if (btn) {
      btn.style.backgroundColor = "var(--c-orange)";
      btn.textContent = "💾 حفظ كافة التعديلات * (Save Changes)";
    }
    const indicator = document.getElementById("sub-status-indicator");
    if (indicator) {
      indicator.innerHTML = '🟡 لديك تعديلات غير محفوظة (Unsaved changes)';
      indicator.style.color = "var(--c-orange)";
    }
  },

  subscriptionMealCatalog: {
    // Week 1 Chicken
    kabsa_chicken: { id: "kabsa_chicken", type: "chicken", name: { ar: "كبسة خليجية بالدجاج", en: "Khaleeji Chicken Kabsa" } },
    creamy_mushroom_chicken: { id: "creamy_mushroom_chicken", type: "chicken", name: { ar: "دجاج بالكريمة والفطر", en: "Creamy Mushroom Chicken" } },
    biryani_chicken: { id: "biryani_chicken", type: "chicken", name: { ar: "برياني هندي بالدجاج", en: "Indian Chicken Biryani" } },
    penne_pesto: { id: "penne_pesto", type: "chicken", name: { ar: "بيني بيستو بالدجاج", en: "Chicken Penne Pesto" } },
    zarb_chicken: { id: "zarb_chicken", type: "chicken", name: { ar: "زرب الدجاج", en: "Chicken Zarb" } },
    bbq_chicken: { id: "bbq_chicken", type: "chicken", name: { ar: "صدر دجاج باربيكيو", en: "BBQ Chicken Breast" } },
    // Week 1 Meat & Fish
    kabsa_meat: { id: "kabsa_meat", type: "meat", name: { ar: "كبسة خليجية باللحم", en: "Khaleeji Meat Kabsa" } },
    meatballs_creamy_mushroom: { id: "meatballs_creamy_mushroom", type: "meat", name: { ar: "كرات اللحم بالكريمة والفطر", en: "Creamy Mushroom Meatballs" } },
    biryani_meat: { id: "biryani_meat", type: "meat", name: { ar: "برياني هندي باللحم", en: "Indian Meat Biryani" } },
    fusilli_meat: { id: "fusilli_meat", type: "meat", name: { ar: "فوسيلي باللحم", en: "Meat Fusilli" } },
    zarb_meat: { id: "zarb_meat", type: "meat", name: { ar: "زرب اللحم", en: "Meat Zarb" } },
    fish_cream_lemon: { id: "fish_cream_lemon", type: "fish", name: { ar: "سمك بالكريمة والليمون", en: "Fish with Cream & Lemon" } },
    // Week 2 Chicken
    mandi_chicken: { id: "mandi_chicken", type: "chicken", name: { ar: "مندي بالدجاج", en: "Chicken Mandi" } },
    fajita_chicken: { id: "fajita_chicken", type: "chicken", name: { ar: "فاهيتا الدجاج", en: "Chicken Fajita" } },
    teriyaki_chicken: { id: "teriyaki_chicken", type: "chicken", name: { ar: "دجاج ترياكي", en: "Teriyaki Chicken" } },
    fettuccine_chicken: { id: "fettuccine_chicken", type: "chicken", name: { ar: "فيتوتشيني بالدجاج", en: "Chicken Fettuccine" } },
    ouzi_chicken: { id: "ouzi_chicken", type: "chicken", name: { ar: "أوزي الدجاج", en: "Chicken Ouzi" } },
    strips_chicken: { id: "strips_chicken", type: "chicken", name: { ar: "ستريبس الدجاج", en: "Chicken Strips" } },
    // Week 2 Meat & Fish
    mandi_meat: { id: "mandi_meat", type: "meat", name: { ar: "مندي باللحم", en: "Meat Mandi" } },
    fajita_meat: { id: "fajita_meat", type: "meat", name: { ar: "فاهيتا اللحم", en: "Meat Fajita" } },
    mongolian_beef: { id: "mongolian_beef", type: "meat", name: { ar: "بيف مانغوليان", en: "Mongolian Beef" } },
    dawood_basha: { id: "dawood_basha", type: "meat", name: { ar: "داوود باشا - لحم", en: "Dawood Basha (Meat)" } },
    ouzi_meat: { id: "ouzi_meat", type: "meat", name: { ar: "أوزي اللحم", en: "Meat Ouzi" } },
    fish_lemon_herbs: { id: "fish_lemon_herbs", type: "fish", name: { ar: "سمك بالليمون والأعشاب", en: "Fish with Lemon & Herbs" } },
    // Week 3 Chicken
    zurbian_chicken: { id: "zurbian_chicken", type: "chicken", name: { ar: "زربيان دجاج", en: "Chicken Zurbian" } },
    lemon_garlic_chicken: { id: "lemon_garlic_chicken", type: "chicken", name: { ar: "دجاج بالليمون والثوم", en: "Lemon Garlic Chicken" } },
    curry_chicken: { id: "curry_chicken", type: "chicken", name: { ar: "كاري دجاج هندي", en: "Indian Chicken Curry" } },
    spaghetti_marinara: { id: "spaghetti_marinara", type: "chicken", name: { ar: "سباغيتي مارينارا بالدجاج", en: "Chicken Spaghetti Marinara" } },
    qidreh_chicken: { id: "qidreh_chicken", type: "chicken", name: { ar: "قدرة خليلية بالدجاج", en: "Qidreh Khaliliya (Chicken)" } },
    chicken_mushroom_sauce: { id: "chicken_mushroom_sauce", type: "chicken", name: { ar: "صدر دجاج بصوص الفطر", en: "Chicken in Mushroom Sauce" } },
    // Week 3 Meat & Fish
    zurbian_meat: { id: "zurbian_meat", type: "meat", name: { ar: "زربيان لحم", en: "Meat Zurbian" } },
    meat_potato_tajin: { id: "meat_potato_tajin", type: "meat", name: { ar: "طاجن بطاطا باللحم", en: "Meat & Potato Tajin" } },
    curry_fish: { id: "curry_fish", type: "fish", name: { ar: "كاري السمك الهندي", en: "Indian Fish Curry" } },
    spaghetti_bolognese: { id: "spaghetti_bolognese", type: "meat", name: { ar: "سباغيتي بولونيز باللحم", en: "Meat Spaghetti Bolognese" } },
    qidreh_meat: { id: "qidreh_meat", type: "meat", name: { ar: "قدرة خليلية باللحم", en: "Qidreh Khaliliya Meat" } },
    armenian_kofta: { id: "armenian_kofta", type: "meat", name: { ar: "كفتة أرمنية بالبطاطا - لحم", en: "Armenian Kofta with Potatoes (Meat)" } },
    // Week 4 Chicken
    madghoot_chicken: { id: "madghoot_chicken", type: "chicken", name: { ar: "دجاج مضغوط", en: "Madghoot Chicken" } },
    mexican_chicken: { id: "mexican_chicken", type: "chicken", name: { ar: "دجاج مكسيكي", en: "Mexican Chicken" } },
    sweet_sour_chicken: { id: "sweet_sour_chicken", type: "chicken", name: { ar: "سويت ساور دجاج", en: "Sweet & Sour Chicken" } },
    shell_pasta_tomato_cream: { id: "shell_pasta_tomato_cream", type: "chicken", name: { ar: "شيل باستا بكريمة الطماطم (دجاج)", en: "Shell Pasta with Tomato Cream (Chicken)" } },
    uzbekian_chicken: { id: "uzbekian_chicken", type: "chicken", name: { ar: "أوزباكيان الدجاج", en: "Uzbekian Chicken" } },
    shawarma_chicken_cuts: { id: "shawarma_chicken_cuts", type: "chicken", name: { ar: "شرحات شاورما الدجاج", en: "Chicken Shawarma Cuts" } },
    // Week 4 Meat & Fish
    stuffed_zucchini: { id: "stuffed_zucchini", type: "meat", name: { ar: "كوسا مخشي باللحم", en: "Stuffed Zucchini with Meat" } },
    mexican_meat: { id: "mexican_meat", type: "meat", name: { ar: "لحم مكسيكي", en: "Mexican Meat" } },
    kofta_tahini: { id: "kofta_tahini", type: "meat", name: { ar: "كفتة بالطحينية - لحم", en: "Kofta with Tahini (Meat)" } },
    indian_kebab: { id: "indian_kebab", type: "meat", name: { ar: "كباب هندي - لحم", en: "Indian Kebab (Meat)" } },
    uzbekian_meat: { id: "uzbekian_meat", type: "meat", name: { ar: "أوزباكيان اللحم", en: "Uzbekian Meat" } },
    sayadieh_fish: { id: "sayadieh_fish", type: "fish", name: { ar: "صيادية سمك", en: "Fish Sayadieh" } }
  },

  getAllSubscriptionMeals() {
    const baseCatalog = (typeof SubscriptionApp !== "undefined" && SubscriptionApp.mealLibrary)
      ? SubscriptionApp.mealLibrary
      : (this.subscriptionMealCatalog || {});

    const combined = {};

    for (const [id, m] of Object.entries(baseCatalog)) {
      if (!m) continue;
      combined[id] = {
        id: id,
        type: m.type || "chicken",
        price: m.price !== undefined ? Number(m.price) : 5.50,
        name: {
          ar: m.name?.ar || (typeof m.name === "string" ? m.name : id),
          en: m.name?.en || (typeof m.name === "string" ? m.name : id)
        },
        desc: {
          ar: m.desc?.ar || (typeof m.desc === "string" ? m.desc : ""),
          en: m.desc?.en || (typeof m.desc === "string" ? m.desc : "")
        }
      };
    }

    if (this.subscriptionMealCatalog) {
      for (const [id, m] of Object.entries(this.subscriptionMealCatalog)) {
        if (!m) continue;
        if (!combined[id]) {
          combined[id] = {
            id: id,
            type: m.type || "chicken",
            price: m.price !== undefined ? Number(m.price) : 5.50,
            name: {
              ar: m.name?.ar || (typeof m.name === "string" ? m.name : id),
              en: m.name?.en || (typeof m.name === "string" ? m.name : id)
            },
            desc: {
              ar: m.desc?.ar || (typeof m.desc === "string" ? m.desc : ""),
              en: m.desc?.en || (typeof m.desc === "string" ? m.desc : "")
            }
          };
        } else {
          if (m.name?.ar) combined[id].name.ar = m.name.ar;
          if (m.name?.en) combined[id].name.en = m.name.en;
          if (m.type) combined[id].type = m.type;
          if (m.price !== undefined) combined[id].price = Number(m.price);
        }
      }
    }

    const customLib = this.editingSubConfig?.meal_library || {};
    for (const [id, m] of Object.entries(customLib)) {
      if (!m) continue;
      combined[id] = {
        id: id,
        type: m.type || combined[id]?.type || "chicken",
        price: m.price !== undefined ? Number(m.price) : (combined[id]?.price || 5.50),
        name: {
          ar: m.name?.ar || (typeof m.name === "string" ? m.name : combined[id]?.name?.ar || id),
          en: m.name?.en || (typeof m.name === "string" ? m.name : combined[id]?.name?.en || id)
        },
        desc: {
          ar: m.desc?.ar || (typeof m.desc === "string" ? m.desc : combined[id]?.desc?.ar || ""),
          en: m.desc?.en || (typeof m.desc === "string" ? m.desc : combined[id]?.desc?.en || "")
        }
      };
    }

    return combined;
  },

  getQuickPickOptions(selectedId) {
    let optHtml = `<option value="">⚡ اختر وجبة من القائمة (Quick Pick)...</option>`;
    const allMeals = this.getAllSubscriptionMeals();
    const groups = [
      { label: "الأسبوع 1 · Week 1", keys: ["kabsa_chicken", "creamy_mushroom_chicken", "biryani_chicken", "penne_pesto", "zarb_chicken", "bbq_chicken", "kabsa_meat", "meatballs_creamy_mushroom", "biryani_meat", "fusilli_meat", "zarb_meat", "fish_cream_lemon"] },
      { label: "الأسبوع 2 · Week 2", keys: ["mandi_chicken", "fajita_chicken", "teriyaki_chicken", "fettuccine_chicken", "ouzi_chicken", "strips_chicken", "mandi_meat", "fajita_meat", "mongolian_beef", "dawood_basha", "ouzi_meat", "fish_lemon_herbs"] },
      { label: "الأسبوع 3 · Week 3", keys: ["zurbian_chicken", "lemon_garlic_chicken", "curry_chicken", "spaghetti_marinara", "qidreh_chicken", "chicken_mushroom_sauce", "zurbian_meat", "meat_potato_tajin", "curry_fish", "spaghetti_bolognese", "qidreh_meat", "armenian_kofta"] },
      { label: "الأسبوع 4 · Week 4", keys: ["madghoot_chicken", "mexican_chicken", "sweet_sour_chicken", "shell_pasta_tomato_cream", "uzbekian_chicken", "shawarma_chicken_cuts", "stuffed_zucchini", "mexican_meat", "kofta_tahini", "indian_kebab", "uzbekian_meat", "sayadieh_fish"] }
    ];

    const standardSet = new Set(groups.flatMap(g => g.keys));
    const customKeys = Object.keys(allMeals).filter(k => !standardSet.has(k));

    if (customKeys.length > 0) {
      groups.unshift({ label: "✨ وجبات مضافة حديثاً بالمكتبة · Custom Meals", keys: customKeys });
    }

    groups.forEach(g => {
      let groupOptions = "";
      g.keys.forEach(k => {
        const m = allMeals[k];
        if (m) {
          const isSel = k === selectedId ? " selected" : "";
          const arName = m.name?.ar || (typeof m.name === "string" ? m.name : k);
          const enName = m.name?.en || "";
          const priceTag = m.price ? ` [${Number(m.price).toFixed(2)} د.أ]` : "";
          groupOptions += `<option value="${m.id || k}"${isSel}>${arName} (${enName})${priceTag}</option>`;
        }
      });
      if (groupOptions) {
        optHtml += `<optgroup label="${g.label}">${groupOptions}</optgroup>`;
      }
    });

    return optHtml;
  },

  onMealQuickPick(mealId, wk, day, optIdx) {
    if (!mealId) return;
    const allMeals = this.getAllSubscriptionMeals();
    const meal = allMeals[mealId];
    if (!meal) return;

    const arInput = document.getElementById(`sched-${wk}-${day}-${optIdx}-ar`);
    const enInput = document.getElementById(`sched-${wk}-${day}-${optIdx}-en`);
    const typeSelect = document.getElementById(`sched-${wk}-${day}-${optIdx}-type`);
    const priceInput = document.getElementById(`sched-${wk}-${day}-${optIdx}-price`);
    const idInput = document.getElementById(`sched-${wk}-${day}-${optIdx}-id`);

    if (arInput) arInput.value = meal.name?.ar || (typeof meal.name === "string" ? meal.name : "");
    if (enInput) enInput.value = meal.name?.en || "";
    if (typeSelect) typeSelect.value = meal.type || "chicken";
    if (priceInput) priceInput.value = meal.price !== undefined ? Number(meal.price).toFixed(2) : "5.50";
    if (idInput) idInput.value = meal.id || mealId;

    this.markSubDirty();
  },

  getMealLibraryCardsHTML(filterType = "all", searchQuery = "") {
    const allMeals = this.getAllSubscriptionMeals();
    let entries = Object.values(allMeals);

    if (filterType && filterType !== "all") {
      entries = entries.filter(m => {
        if (filterType === "special") return m.type === "special" || m.type === "specialty";
        return m.type === filterType;
      });
    }

    if (searchQuery && searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      entries = entries.filter(m => {
        const arName = (m.name?.ar || "").toLowerCase();
        const enName = (m.name?.en || "").toLowerCase();
        const arDesc = (m.desc?.ar || "").toLowerCase();
        const enDesc = (m.desc?.en || "").toLowerCase();
        return arName.includes(q) || enName.includes(q) || arDesc.includes(q) || enDesc.includes(q);
      });
    }

    if (entries.length === 0) {
      return `
        <div style="grid-column: 1 / -1; text-align: center; padding: 36px 20px; background: #FAFCFA; border-radius: 12px; border: 1.5px dashed #CBD5E1; color: #64748B;">
          <div style="font-size: 2rem; margin-bottom: 8px;">🍽️</div>
          <div style="font-weight: 700; font-size: 1rem; color: var(--c-forest); margin-bottom: 4px;">لم يتم العثور على وجبات مطابقة</div>
          <div style="font-size: 0.85rem;">جرّب تعديل خيارات البحث أو اضغط على "+ إضافة وجبة جديدة" لإضافة صنف جديد.</div>
        </div>
      `;
    }

    const typeLabels = {
      chicken: "🍗 دجاج (Chicken)",
      meat: "🥩 لحم (Meat)",
      fish: "🐟 سمك (Fish)",
      pasta: "🍝 باستا (Pasta)",
      veg: "🥗 نباتي (Veg)",
      special: "✨ مميز (Specialty)"
    };

    return entries.map(m => {
      const typeLabel = typeLabels[m.type] || m.type || "دجاج";
      const typeClass = m.type || "chicken";
      const arName = m.name?.ar || m.id;
      const enName = m.name?.en || m.id;
      const arDesc = m.desc?.ar || "لا يوجد وصف مدخل بعد";
      const enDesc = m.desc?.en || "No description provided yet";
      const priceVal = (m.price !== undefined ? Number(m.price) : 5.50).toFixed(2);

      return `
        <div class="sub-meal-card">
          <div class="sub-meal-card-top">
            <span class="sub-meal-type-badge ${typeClass}">${typeLabel}</span>
            <span class="sub-meal-price-badge">${priceVal} د.أ</span>
          </div>
          <div class="sub-meal-card-names">
            <h4 class="sub-meal-name-ar">${arName}</h4>
            <div class="sub-meal-name-en">${enName}</div>
          </div>
          <div class="sub-meal-card-descs">
            <p class="sub-meal-desc-ar" title="${arDesc}"><strong>المكونات:</strong> ${arDesc}</p>
            <p class="sub-meal-desc-en" title="${enDesc}"><strong>Ingredients:</strong> ${enDesc}</p>
          </div>
          <div class="sub-meal-card-actions">
            <button type="button" class="btn-sub-meal-edit" onclick="AdminApp.openMealLibraryModal('${m.id}')">
              <span>✏️</span>
              <span>تعديل التفاصيل</span>
            </button>
            <button type="button" class="btn-sub-meal-delete" onclick="AdminApp.deleteMealLibraryItem('${m.id}')" title="حذف الوجبة">
              <span>🗑️</span>
              <span>حذف</span>
            </button>
          </div>
        </div>
      `;
    }).join("");
  },

  filterMealLibrary(type, btn) {
    this._currentMealFilter = type;
    const chips = document.querySelectorAll("#sub-meal-filter-chips .sub-meal-filter-chip");
    chips.forEach(c => c.classList.remove("active"));
    if (btn) btn.classList.add("active");
    this.refreshMealLibraryGrid();
  },

  onMealSearchInput(query) {
    this._currentMealSearch = query.trim().toLowerCase();
    this.refreshMealLibraryGrid();
  },

  refreshMealLibraryGrid() {
    const grid = document.getElementById("sub-meal-grid-mount");
    if (grid) {
      grid.innerHTML = this.getMealLibraryCardsHTML(this._currentMealFilter || "all", this._currentMealSearch || "");
    }
  },

  refreshAllQuickPickSelects() {
    const selects = document.querySelectorAll(".sub-opt-quick-select");
    selects.forEach(sel => {
      const currentVal = sel.value;
      sel.innerHTML = this.getQuickPickOptions(currentVal);
      if (currentVal) sel.value = currentVal;
    });
  },

  openMealLibraryModal(mealId = null) {
    const mount = document.getElementById("admin-sub-meal-modal-mount");
    if (!mount) return;

    let meal = null;
    if (mealId) {
      meal = this.getAllSubscriptionMeals()[mealId] || null;
    }

    const isNew = !meal;
    const modalTitle = isNew
      ? "➕ إضافة وجبة جديدة إلى مكتبة الاشتراكات"
      : `✏️ تعديل تفاصيل الوجبة: ${meal.name?.ar || meal.name?.en || mealId}`;

    const idVal = meal ? meal.id : "";
    const typeVal = meal ? (meal.type || "chicken") : "chicken";
    const priceVal = meal && meal.price !== undefined ? Number(meal.price).toFixed(2) : "5.50";
    const arNameVal = meal ? (meal.name?.ar || "") : "";
    const enNameVal = meal ? (meal.name?.en || "") : "";
    const arDescVal = meal ? (meal.desc?.ar || "") : "";
    const enDescVal = meal ? (meal.desc?.en || "") : "";

    mount.innerHTML = `
      <div class="admin-modal" style="z-index: 99999;">
        <div class="modal-overlay active" onclick="AdminApp.closeMealLibraryModal()" style="z-index: 99990;"></div>
        <div class="admin-modal-box" style="max-width: 650px; z-index: 99991;">
          <div class="admin-modal-header">
            <h2 class="admin-modal-title">${modalTitle}</h2>
            <button class="btn-action-icon" onclick="AdminApp.closeMealLibraryModal()">✕</button>
          </div>

          <div class="admin-modal-body">
            <input type="hidden" id="sub-meal-modal-id" value="${idVal}">

            <!-- Type & Price -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="admin-form-group">
                <label class="admin-form-label">الصنف · Category *</label>
                <select id="sub-meal-modal-type" class="admin-form-input" style="height: 42px; font-weight: 700;">
                  <option value="chicken" ${typeVal === "chicken" ? "selected" : ""}>🍗 دجاج (Chicken)</option>
                  <option value="meat" ${typeVal === "meat" ? "selected" : ""}>🥩 لحم (Meat)</option>
                  <option value="fish" ${typeVal === "fish" ? "selected" : ""}>🐟 سمك (Fish)</option>
                  <option value="pasta" ${typeVal === "pasta" ? "selected" : ""}>🍝 باستا (Pasta)</option>
                  <option value="veg" ${typeVal === "veg" ? "selected" : ""}>🥗 نباتي (Vegetarian)</option>
                  <option value="special" ${typeVal === "special" ? "selected" : ""}>✨ طبق مميز (Specialty)</option>
                </select>
              </div>

              <div class="admin-form-group">
                <label class="admin-form-label">السعر الافتراضي (د.أ) · Price *</label>
                <input type="number" step="0.25" min="0" id="sub-meal-modal-price" class="admin-form-input" value="${priceVal}" placeholder="5.50" style="height: 42px; font-weight: 800; color: var(--c-forest); text-align: center; direction: ltr;" required>
              </div>
            </div>

            <!-- Bilingual Names -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="admin-form-group">
                <div class="sub-field-label-wrap">
                  <label class="admin-form-label">اسم الوجبة (عربي) *</label>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" id="sub-meal-modal-name-ar" class="admin-form-input sub-input-ar" value="${arNameVal}" placeholder="مثال: ستيك لحم بصلصة المشروم" style="height: 42px; font-weight: 700;" required>
              </div>

              <div class="admin-form-group">
                <div class="sub-field-label-wrap">
                  <label class="admin-form-label">Meal Name (EN) *</label>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" id="sub-meal-modal-name-en" class="admin-form-input sub-input-en" value="${enNameVal}" placeholder="e.g. Mushroom Steak Tenderloin" style="height: 42px; font-weight: 600;" required>
              </div>
            </div>

            <!-- Bilingual Descriptions / Ingredients -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
              <div class="admin-form-group">
                <div class="sub-field-label-wrap">
                  <label class="admin-form-label">الوصف والمكونات (عربي)</label>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <textarea id="sub-meal-modal-desc-ar" class="admin-form-textarea sub-input-ar" rows="3" placeholder="أرز بسمتي، لحم مشوي، صصوص مشروم طازج، بهارات خالية من الغلوتين...">${arDescVal}</textarea>
              </div>

              <div class="admin-form-group">
                <div class="sub-field-label-wrap">
                  <label class="admin-form-label">Ingredients & Description (EN)</label>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <textarea id="sub-meal-modal-desc-en" class="admin-form-textarea sub-input-en" rows="3" placeholder="Basmati rice, grilled beef, fresh mushroom sauce, gluten-free spices...">${enDescVal}</textarea>
              </div>
            </div>

            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: 8px; padding: 10px 14px; font-size: 0.8rem; color: #166534; display: flex; align-items: center; gap: 8px;">
              <span>💡</span>
              <span>الوجبة المحفوظة ستكون متاحة فوراً للاختيار في القوائم السريعة لجداول الأسابيع الأربعة مع تحديث الأسعار والمكونات تلقائياً.</span>
            </div>

          </div>

          <div class="admin-modal-footer" style="padding: 16px 24px; border-top: 1px solid #E2E8E2; display: flex; align-items: center; justify-content: flex-end; gap: 10px; background: #FAFCFA;">
            <button type="button" class="btn-secondary" onclick="AdminApp.closeMealLibraryModal()" style="padding: 10px 18px;">إلغاء (Cancel)</button>
            <button type="button" class="btn-primary" onclick="AdminApp.saveMealLibraryModal()" style="padding: 10px 22px;">💾 حفظ الوجبة في المكتبة</button>
          </div>
        </div>
      </div>
    `;
  },

  closeMealLibraryModal() {
    const mount = document.getElementById("admin-sub-meal-modal-mount");
    if (mount) mount.innerHTML = "";
  },

  saveMealLibraryModal() {
    const idInput = document.getElementById("sub-meal-modal-id");
    const typeInput = document.getElementById("sub-meal-modal-type");
    const priceInput = document.getElementById("sub-meal-modal-price");
    const arNameInput = document.getElementById("sub-meal-modal-name-ar");
    const enNameInput = document.getElementById("sub-meal-modal-name-en");
    const arDescInput = document.getElementById("sub-meal-modal-desc-ar");
    const enDescInput = document.getElementById("sub-meal-modal-desc-en");

    const arName = arNameInput?.value.trim() || "";
    const enName = enNameInput?.value.trim() || "";

    if (!arName && !enName) {
      App.showToast("يرجى كتابة اسم الوجبة بالعربي أو الإنجليزي على الأقل.", "warning");
      return;
    }

    let mealId = idInput?.value.trim();
    if (!mealId) {
      const baseSlug = (enName || arName).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
      mealId = baseSlug || `meal_${Date.now()}`;
    }

    const type = typeInput?.value || "chicken";
    const priceVal = priceInput?.value ? (parseFloat(priceInput.value) || 5.50) : 5.50;
    const arDesc = arDescInput?.value.trim() || "";
    const enDesc = enDescInput?.value.trim() || "";

    if (!this.editingSubConfig.meal_library) {
      this.editingSubConfig.meal_library = {};
    }

    const mealData = {
      id: mealId,
      type: type,
      price: priceVal,
      basePrice: priceVal,
      name: {
        ar: arName || enName,
        en: enName || arName
      },
      desc: {
        ar: arDesc,
        en: enDesc
      }
    };

    this.editingSubConfig.meal_library[mealId] = mealData;
    this.subscriptionMealCatalog[mealId] = mealData;
    if (typeof SubscriptionApp !== "undefined" && SubscriptionApp.mealLibrary) {
      SubscriptionApp.mealLibrary[mealId] = mealData;
    }

    this.closeMealLibraryModal();
    this.refreshMealLibraryGrid();
    this.refreshAllQuickPickSelects();
    this.markSubDirty();
    App.showToast(`تم حفظ الوجبة "${mealData.name.ar}" في المكتبة بنجاح! 🍲`, "success");
  },

  deleteMealLibraryItem(mealId) {
    const meal = this.getAllSubscriptionMeals()[mealId];
    const name = meal?.name?.ar || mealId;
    if (!confirm(`هل أنت متأكد من حذف الوجبة "${name}" من المكتبة؟`)) {
      return;
    }

    if (this.editingSubConfig?.meal_library) {
      delete this.editingSubConfig.meal_library[mealId];
    }
    if (this.subscriptionMealCatalog) {
      delete this.subscriptionMealCatalog[mealId];
    }
    if (typeof SubscriptionApp !== "undefined" && SubscriptionApp.mealLibrary) {
      delete SubscriptionApp.mealLibrary[mealId];
    }

    this.refreshMealLibraryGrid();
    this.refreshAllQuickPickSelects();
    this.markSubDirty();
    App.showToast(`تم حذف الوجبة "${name}" من المكتبة. 🗑️`, "info");
  },

  defaultSubContent: {
    hero_badge: "اشتراك الوجبات الشهرية والأسبوعية",
    hero_badge_en: "Monthly & Weekly Meal Subscriptions",
    hero_title: "طعام نقي، محضّر خصيصاً لك",
    hero_title_en: "Pure Food, Planned for You",
    hero_title_highlight: "محضّر خصيصاً لك",
    hero_title_highlight_en: "Planned for You",
    hero_subtitle: "جداول وجبات خالية من الغلوتين ١٠٠٪ ومحضّرة أسبوعياً في مطبخنا المخصص والآمن لمرضى السيلياك.",
    hero_subtitle_en: "100% gluten-free, chef-crafted weekly meal schedules prepared fresh in our dedicated celiac-safe kitchen.",
    hero_trust_celiac: "آمن للسيلياك ١٠٠٪",
    hero_trust_celiac_en: "100% Celiac Safe",
    hero_trust_kitchen: "مطبخ مخصص وآمن",
    hero_trust_kitchen_en: "Dedicated Safe Kitchen",
    hero_trust_fresh: "جداول متجددة أسبوعياً",
    hero_trust_fresh_en: "Fresh Weekly Schedules",
    hero_image: "assets/images/subscription_hero.jpg",
    delivery_section_eyebrow: "منطقة التوصيل",
    delivery_section_eyebrow_en: "Delivery Area",
    delivery_main_statement: "نوصل ضمن نطاق 10 كم من موقع Moe’s PureBite",
    delivery_main_statement_en: "Delivery is available within a 10 KM radius of Moe’s PureBite.",
    delivery_subtext: "تشمل التغطية مناطق قريبة من المطبخ، وقد تختلف حسب الموقع الدقيق.",
    delivery_subtext_en: "Coverage includes areas near our kitchen and may vary based on your exact location.",
    delivery_areas_ar: "مرج الحمام، السابع، البنيات، الصويفية، دير غبار، عبدون",
    delivery_areas_en: "Marj Al Hamam, Seventh Circle, Al Bunayyat, Sweifieh, Deir Ghbar, Abdoun",
    delivery_note_inside: "ضمن النطاق: التغطية تعتمد على موقعك الدقيق، يرجى التواصل لتأكيد عنوانك.",
    delivery_note_inside_en: "Within standard zone: Coverage depends on your exact location. Please reach out to confirm your address.",
    delivery_note_outside: "خارج النطاق المباشر: تتوفر إمكانية التنسيق والتوصيل، يرجى التواصل معنا للتأكيد والترتيب المسبق.",
    delivery_note_outside_en: "Outside direct zone: Delivery coordination may be arranged upon request. Please contact us to confirm and arrange.",
    brochures_badge: "النشرات وقوائم الأسعار الرسمية",
    brochures_badge_en: "OFFICIAL FLYERS & MENUS",
    brochures_title: "نشرات وباقات الوجبات",
    brochures_title_en: "Official Menu & Plan Posters",
    brochures_subtitle: "تصفح النشرات الرسمية للوجبات، الأسعار، وتفاصيل المطبخ المعتمد (اسحب أو اضغط للتكبير)",
    brochures_subtitle_en: "Browse our official flyers for weekly menus, pricing, and dedicated kitchen details",
    schedule_toggle_eyebrow: "الجدول الأسبوعي الكامل",
    schedule_toggle_eyebrow_en: "COMPLETE WEEKLY SCHEDULE",
    schedule_toggle_btn_show: "عرض خطة وجبات الأسابيع التفصيلية",
    schedule_toggle_btn_show_en: "Show Detailed Weekly Meal Plans",
    schedule_toggle_btn_hide: "إخفاء خطة وجبات الأسابيع التفصيلية",
    schedule_toggle_btn_hide_en: "Hide Detailed Weekly Meal Plans",
    schedule_toggle_hint: "اضغط هنا لاستعراض وجبات الأيام وخياراتها المتنوعة بالتفصيل",
    schedule_toggle_hint_en: "Click here to view daily dishes and diverse meal options in detail",
    schedule_title: "خطة وجبات الشهر",
    schedule_title_en: "Meal Plan",
    schedule_hint: "اضغط على أي وجبة لمعرفة التفاصيل والمكونات",
    schedule_hint_en: "Tap any meal to view details",
    options_title: "خيارات الاشتراك",
    options_title_en: "Customize Your Subscription",
    options_subtitle: "اختر المدة وعدد الوجبات الأسبوعية المناسبة لك",
    options_subtitle_en: "Select your duration and weekly meal schedule",
    summary_note: "لا يتطلب دفع إلكتروني • يتم التأكيد والتنسيق مباشرة عبر واتساب",
    summary_note_en: "No online payment • Confirmed directly on WhatsApp"
  },

  buildSubscriptionsTabUI() {
    const container = document.getElementById("sub-admin-tab-container");
    if (!container) return;

    const config = window.MoeStore.getSubscriptionConfig() || {};
    this.editingSubConfig = {
      pricing: JSON.parse(JSON.stringify(config.pricing || {})),
      content: JSON.parse(JSON.stringify(config.content || {})),
      slider: JSON.parse(JSON.stringify(config.slider || [])),
      schedules: JSON.parse(JSON.stringify(config.schedules || {})),
      meal_library: JSON.parse(JSON.stringify(config.meal_library || {}))
    };

    // Ensure content is pre-filled with official default bilingual texts
    if (!this.editingSubConfig.content) {
      this.editingSubConfig.content = {};
    }
    for (const [k, v] of Object.entries(this.defaultSubContent)) {
      if (!this.editingSubConfig.content[k] || !this.editingSubConfig.content[k].toString().trim()) {
        this.editingSubConfig.content[k] = v;
      }
    }

    // Ensure pricing structure
    if (!this.editingSubConfig.pricing.mix) {
      this.editingSubConfig.pricing.mix = {
        "14_days": { "5_meals": "85", "6_meals": "98" },
        "monthly": { "5_meals": "160", "6_meals": "185" }
      };
    }

    // Default daily options if not present
    if (!this.editingSubConfig.schedules.dailyOptionsSchedule) {
      this.editingSubConfig.schedules.dailyOptionsSchedule = {
        week1: {
          sat: ["kabsa_chicken", "kabsa_meat"],
          sun: ["creamy_mushroom_chicken", "meatballs_creamy_mushroom"],
          mon: ["biryani_chicken", "biryani_meat"],
          tue: ["penne_pesto", "fusilli_meat"],
          wed: ["zarb_chicken", "zarb_meat"],
          thu: ["bbq_chicken", "fish_cream_lemon"]
        },
        week2: {
          sat: ["mandi_chicken", "mandi_meat"],
          sun: ["fajita_chicken", "fajita_meat"],
          mon: ["teriyaki_chicken", "mongolian_beef"],
          tue: ["fettuccine_chicken", "dawood_basha"],
          wed: ["ouzi_chicken", "ouzi_meat"],
          thu: ["strips_chicken", "fish_lemon_herbs"]
        },
        week3: {
          sat: ["zurbian_chicken", "zurbian_meat"],
          sun: ["lemon_garlic_chicken", "meat_potato_tajin"],
          mon: ["curry_chicken", "curry_fish"],
          tue: ["spaghetti_marinara", "spaghetti_bolognese"],
          wed: ["qidreh_chicken", "qidreh_meat"],
          thu: ["chicken_mushroom_sauce", "armenian_kofta"]
        },
        week4: {
          sat: ["madghoot_chicken", "stuffed_zucchini"],
          sun: ["mexican_chicken", "mexican_meat"],
          mon: ["sweet_sour_chicken", "kofta_tahini"],
          tue: ["shell_pasta_tomato_cream", "indian_kebab"],
          wed: ["uzbekian_chicken", "uzbekian_meat"],
          thu: ["shawarma_chicken_cuts", "sayadieh_fish"]
        }
      };
    }

    const p = this.editingSubConfig.pricing.mix;
    const c = this.editingSubConfig.content;
    const s = this.editingSubConfig.schedules.dailyOptionsSchedule;
    const slider = this.editingSubConfig.slider || [];

    // Quick Pick Select Options Generator
    const getQuickPickOptions = (selectedId) => AdminApp.getQuickPickOptions(selectedId);

    // Build the Weeks Grid
    let weeksHtml = "";
    const weeks = ["week1", "week2", "week3", "week4"];
    const days = ["sat", "sun", "mon", "tue", "wed", "thu"];
    const dayLabels = {
      sat: { ar: "السبت", en: "Saturday" },
      sun: { ar: "الأحد", en: "Sunday" },
      mon: { ar: "الاثنين", en: "Monday" },
      tue: { ar: "الثلاثاء", en: "Tuesday" },
      wed: { ar: "الأربعاء", en: "Wednesday" },
      thu: { ar: "الخميس", en: "Thursday" }
    };
    const allAvailableMeals = AdminApp.getAllSubscriptionMeals();

    weeks.forEach((wk, i) => {
      weeksHtml += `
        <div class="sub-week-board-card">
          <div class="sub-week-board-header">
            <span style="font-weight: 800; font-size: 1rem;">الأسبوع ${i + 1} · Week ${i + 1}</span>
            <span class="sub-week-num-badge">0${i + 1}</span>
          </div>
          <div class="sub-week-days-container">
      `;

      days.forEach(day => {
        const opt0Id = s[wk]?.[day]?.[0] || "";
        const opt1Id = s[wk]?.[day]?.[1] || "";

        const getMealDisplay = (mealId, defaultType) => {
          const m = allAvailableMeals[mealId] || null;
          let ar = m?.name?.ar || (typeof m?.name === "string" ? m.name : "");
          let en = m?.name?.en || "";
          let type = m?.type || defaultType;
          let price = (m?.price !== undefined) ? m.price : (m?.basePrice !== undefined ? m.basePrice : "5.50");
          return { id: mealId || "", type, ar, en, price };
        };

        const opt0 = getMealDisplay(opt0Id, "chicken");
        const opt1 = getMealDisplay(opt1Id, "meat");

        weeksHtml += `
          <div class="sub-day-item-box">
            <div class="sub-day-item-title">
              <span class="sub-day-title-ar">${dayLabels[day].ar}</span>
              <span class="sub-day-title-en">${dayLabels[day].en}</span>
            </div>

            <!-- OPTION 1 -->
            <div class="sub-day-option-card opt-1">
              <div class="sub-opt-topbar">
                <span class="sub-opt-pill-badge">خيار ١ · Option 1</span>
                <div class="sub-opt-quick-wrap">
                  <select class="admin-form-input sub-opt-quick-select" onchange="AdminApp.onMealQuickPick(this.value, '${wk}', '${day}', 0)" title="اختيار سريع لوجبة جاهزة">
                    ${getQuickPickOptions(opt0.id)}
                  </select>
                </div>
              </div>

              <div class="sub-opt-fields-grid">
                <div class="sub-opt-field-type">
                  <label class="sub-field-label">الصنف · Type</label>
                  <select class="admin-form-input sub-opt-type-select" id="sched-${wk}-${day}-0-type" onchange="AdminApp.markSubDirty()">
                    <option value="chicken" ${opt0.type === "chicken" ? "selected" : ""}>دجاج (Chicken)</option>
                    <option value="meat" ${opt0.type === "meat" ? "selected" : ""}>لحم (Meat)</option>
                    <option value="fish" ${opt0.type === "fish" ? "selected" : ""}>سمك (Fish)</option>
                    <option value="pasta" ${opt0.type === "pasta" ? "selected" : ""}>باستا (Pasta)</option>
                    <option value="special" ${opt0.type === "special" ? "selected" : ""}>طبق مميز (Specialty)</option>
                    <option value="veg" ${opt0.type === "veg" ? "selected" : ""}>نباتي (Vegetarian)</option>
                  </select>
                </div>

                <div class="sub-opt-field-price">
                  <label class="sub-field-label">السعر (د.أ) · Price</label>
                  <input type="number" step="0.25" min="0" class="admin-form-input sub-input-price" id="sched-${wk}-${day}-0-price" value="${opt0.price !== undefined ? opt0.price : '5.50'}" placeholder="5.50" oninput="AdminApp.markSubDirty()">
                </div>

                <div class="sub-opt-field-ar">
                  <label class="sub-field-label">الاسم (عربي) · Arabic</label>
                  <input type="text" class="admin-form-input sub-input-ar" id="sched-${wk}-${day}-0-ar" value="${opt0.ar || ''}" placeholder="اسم الوجبة بالعربي" oninput="AdminApp.markSubDirty()">
                </div>

                <div class="sub-opt-field-en">
                  <label class="sub-field-label">الاسم (EN) · English</label>
                  <input type="text" class="admin-form-input sub-input-en" id="sched-${wk}-${day}-0-en" value="${opt0.en || ''}" placeholder="Meal Name in English" oninput="AdminApp.markSubDirty()">
                </div>
              </div>

              <input type="hidden" id="sched-${wk}-${day}-0-id" value="${opt0.id}">
            </div>

            <!-- OPTION 2 -->
            <div class="sub-day-option-card opt-2">
              <div class="sub-opt-topbar">
                <span class="sub-opt-pill-badge">خيار ٢ · Option 2</span>
                <div class="sub-opt-quick-wrap">
                  <select class="admin-form-input sub-opt-quick-select" onchange="AdminApp.onMealQuickPick(this.value, '${wk}', '${day}', 1)" title="اختيار سريع لوجبة جاهزة">
                    ${getQuickPickOptions(opt1.id)}
                  </select>
                </div>
              </div>

              <div class="sub-opt-fields-grid">
                <div class="sub-opt-field-type">
                  <label class="sub-field-label">الصنف · Type</label>
                  <select class="admin-form-input sub-opt-type-select" id="sched-${wk}-${day}-1-type" onchange="AdminApp.markSubDirty()">
                    <option value="meat" ${opt1.type === "meat" ? "selected" : ""}>لحم (Meat)</option>
                    <option value="chicken" ${opt1.type === "chicken" ? "selected" : ""}>دجاج (Chicken)</option>
                    <option value="fish" ${opt1.type === "fish" ? "selected" : ""}>سمك (Fish)</option>
                    <option value="pasta" ${opt1.type === "pasta" ? "selected" : ""}>باستا (Pasta)</option>
                    <option value="special" ${opt1.type === "special" ? "selected" : ""}>طبق مميز (Specialty)</option>
                    <option value="veg" ${opt1.type === "veg" ? "selected" : ""}>نباتي (Vegetarian)</option>
                  </select>
                </div>

                <div class="sub-opt-field-price">
                  <label class="sub-field-label">السعر (د.أ) · Price</label>
                  <input type="number" step="0.25" min="0" class="admin-form-input sub-input-price" id="sched-${wk}-${day}-1-price" value="${opt1.price !== undefined ? opt1.price : '5.50'}" placeholder="5.50" oninput="AdminApp.markSubDirty()">
                </div>

                <div class="sub-opt-field-ar">
                  <label class="sub-field-label">الاسم (عربي) · Arabic</label>
                  <input type="text" class="admin-form-input sub-input-ar" id="sched-${wk}-${day}-1-ar" value="${opt1.ar || ''}" placeholder="اسم الوجبة بالعربي" oninput="AdminApp.markSubDirty()">
                </div>

                <div class="sub-opt-field-en">
                  <label class="sub-field-label">الاسم (EN) · English</label>
                  <input type="text" class="admin-form-input sub-input-en" id="sched-${wk}-${day}-1-en" value="${opt1.en || ''}" placeholder="Meal Name in English" oninput="AdminApp.markSubDirty()">
                </div>
              </div>

              <input type="hidden" id="sched-${wk}-${day}-1-id" value="${opt1.id}">
            </div>

          </div>
        `;
      });

      weeksHtml += `</div></div>`;
    });

    // Build 5 Flyer Slides Cards
    let sliderCardsHtml = "";
    for (let sl = 1; sl <= 5; sl++) {
      const slideUrl = slider[sl - 1]?.url || "";
      sliderCardsHtml += `
        <div class="sub-image-upload-card">
          <div style="font-weight: 800; font-size: 0.88rem; color: var(--c-forest); display: flex; justify-content: space-between;">
            <span>شريحة ${sl} · Slide ${sl}</span>
            <span style="font-size: 0.72rem; color: #888;">#0${sl}</span>
          </div>
          
          <div class="sub-img-preview-box">
            <img src="${slideUrl}" id="sub-img-${sl}-preview" style="${slideUrl ? '' : 'display: none;'}" alt="Slide ${sl}" />
            <span class="no-img-text" id="sub-img-${sl}-no-img" style="${slideUrl ? 'display: none;' : ''}">لا توجد صورة</span>
          </div>

          <div class="sub-img-actions-row">
            <label class="btn-sub-upload-pc">
              📁 رفع من الجهاز
              <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleSubImageUpload(event, 'sub-img-${sl}')">
            </label>
            <button type="button" class="btn-sub-clear-img" onclick="AdminApp.clearSubImage('sub-img-${sl}')">🗑️ مسح</button>
          </div>

          <div>
            <label style="font-size: 0.75rem; color: #777; display: block; margin-bottom: 3px;">رابط الصورة (URL / Path):</label>
            <input type="text" class="admin-form-input" id="sub-img-${sl}" value="${slideUrl}" placeholder="assets/images/slides/..." style="padding: 6px 10px; font-size: 0.82rem;" oninput="AdminApp.updateSubImagePreview(this.value, 'sub-img-${sl}-preview')">
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="sub-admin-container">
        <!-- Top Banner Matching Luxury Website Theme -->
        <div class="sub-admin-banner">
          <div>
            <div class="sub-admin-banner-title">
              <span>🍲 إدارة الاشتراكات والمحتوى · Subscription CMS</span>
              <span class="sub-admin-badge-live">متزامن ومباشر · Live</span>
            </div>
            <p class="sub-admin-banner-desc">
              تحكم كامل ومباشر بصفحة الاشتراكات على الموقع: تعديل باقات الأسعار، الواجهة الترويجية، منطقة التوصيل، الصور والنشرات، وجدول الوجبات الدوري مع دعم كامل للغتين العربية والإنجليزية.
            </p>
          </div>
          <div>
            <a href="/subscriptions" target="_blank" class="sub-nav-pill-btn" style="text-decoration: none; padding: 10px 18px; font-size: 0.9rem;">
              🔗 معاينة صفحة الاشتراكات الحية
            </a>
          </div>
        </div>

        <!-- Sticky Status & Save Action Bar -->
        <div class="sub-admin-sticky-bar">
          <div class="sub-save-status" id="sub-status-indicator">
            🟢 كافة التعديلات محفوظة (All changes saved)
          </div>
          <button class="sub-save-btn-primary" onclick="AdminApp.saveSubscriptionsDirectly()" id="sub-save-btn">
            💾 حفظ كافة التعديلات (Save All Changes)
          </button>
        </div>

        <!-- SECTION 1: PRICING MATRIX -->
        <div class="sub-admin-card" id="sub-sec-pricing">
          <div class="sub-admin-card-header">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">🏷️ باقات الأسعار الرسمية (Pricing in JOD)</h3>
              <p class="sub-admin-card-subtitle">الأسعار تظهر فورياً في حاسبة الاشتراك والملخص على الموقع.</p>
            </div>
          </div>
          <div class="sub-admin-card-body">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 18px;">
              <div style="background: #FAFCFA; padding: 16px; border-radius: 12px; border: 1.5px solid #E2E8E2;">
                <label class="admin-form-label" style="display: block; margin-bottom: 6px;">١٤ يوم · ٥ وجبات (14 Days / 5 Meals)</label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" class="admin-form-input" id="sub-p145" value="${p['14_days']['5_meals']}" oninput="AdminApp.markSubDirty()">
                  <span style="font-weight: 700; color: var(--c-forest);">JOD</span>
                </div>
              </div>

              <div style="background: #FAFCFA; padding: 16px; border-radius: 12px; border: 1.5px solid #E2E8E2;">
                <label class="admin-form-label" style="display: block; margin-bottom: 6px;">١٤ يوم · ٦ وجبات (14 Days / 6 Meals)</label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" class="admin-form-input" id="sub-p146" value="${p['14_days']['6_meals']}" oninput="AdminApp.markSubDirty()">
                  <span style="font-weight: 700; color: var(--c-forest);">JOD</span>
                </div>
              </div>

              <div style="background: #FAFCFA; padding: 16px; border-radius: 12px; border: 1.5px solid #E2E8E2;">
                <label class="admin-form-label" style="display: block; margin-bottom: 6px;">شهري · ٥ وجبات (Monthly / 5 Meals)</label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" class="admin-form-input" id="sub-pm5" value="${p['monthly']['5_meals']}" oninput="AdminApp.markSubDirty()">
                  <span style="font-weight: 700; color: var(--c-forest);">JOD</span>
                </div>
              </div>

              <div style="background: #FAFCFA; padding: 16px; border-radius: 12px; border: 1.5px solid #E2E8E2;">
                <label class="admin-form-label" style="display: block; margin-bottom: 6px;">شهري · ٦ وجبات (Monthly / 6 Meals)</label>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <input type="number" class="admin-form-input" id="sub-pm6" value="${p['monthly']['6_meals']}" oninput="AdminApp.markSubDirty()">
                  <span style="font-weight: 700; color: var(--c-forest);">JOD</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: HERO & TRUST SHOWCASE -->
        <div class="sub-admin-card" id="sub-sec-hero">
          <div class="sub-admin-card-header">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">🌟 الواجهة الرئيسية والبانر (Hero & Trust Badges)</h3>
              <p class="sub-admin-card-subtitle">القسم الترحيبي أعلى صفحة الاشتراكات مع إمكانية رفع صورة البانر من الجهاز أو رابط.</p>
            </div>
          </div>
          <div class="sub-admin-card-body">
            
            <!-- Hero Photo Uploader -->
            <div style="margin-bottom: 24px; background: #FAF8F5; padding: 18px; border-radius: 12px; border: 1.5px solid #E2E8E2;">
              <h4 style="margin: 0 0 12px 0; font-size: 0.95rem; color: var(--c-forest);">صورة البانر الرئيسي (Hero Food Photo)</h4>
              <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
                <div class="sub-img-preview-box" style="width: 220px; height: 140px; flex-shrink: 0;">
                  <img src="${c.hero_image || 'assets/images/subscription_hero.jpg'}" id="sub-img-hero-preview" alt="Hero Preview" />
                  <span class="no-img-text" id="sub-img-hero-no-img" style="display: none;">لا توجد صورة</span>
                </div>
                <div style="flex: 1; min-width: 260px; display: flex; flex-direction: column; gap: 10px;">
                  <div class="sub-img-actions-row">
                    <label class="btn-sub-upload-pc">
                      📁 رفع صورة من الكمبيوتر (Upload from PC)
                      <input type="file" accept="image/*" style="display: none;" onchange="AdminApp.handleSubImageUpload(event, 'sub-img-hero')">
                    </label>
                    <button type="button" class="btn-sub-clear-img" onclick="AdminApp.clearSubImage('sub-img-hero')">🗑️ مسح الصورة</button>
                  </div>
                  <div>
                    <label style="font-size: 0.78rem; color: #777; display: block; margin-bottom: 4px;">أو أدخل مسار / رابط الصورة مباشرة:</label>
                    <input type="text" class="admin-form-input" id="sub-img-hero" value="${c.hero_image || 'assets/images/subscription_hero.jpg'}" oninput="AdminApp.updateSubImagePreview(this.value, 'sub-img-hero-preview')">
                  </div>
                </div>
              </div>
            </div>

            <!-- Hero Texts (Bilingual Grid) -->
            <!-- 1. Hero Badge -->
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">الشارة العلوية للبانر</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-h-badge" value="${c.hero_badge || ''}" placeholder="اشتراك الوجبات الشهرية والأسبوعية" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Hero Top Badge</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-h-badge-en" value="${c.hero_badge_en || ''}" placeholder="Monthly & Weekly Meal Subscriptions" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <!-- 2. Hero Title -->
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">العنوان الرئيسي الكامل</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-h-title" value="${c.hero_title || ''}" placeholder="طعام نقي، محضّر خصيصاً لك" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Hero Main Title</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-h-title-en" value="${c.hero_title_en || ''}" placeholder="Pure Food, Planned for You" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <!-- 3. Hero Highlight Text -->
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">الجملة المميزة باللون الأخضر</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-h-high" value="${c.hero_title_highlight || ''}" placeholder="محضّر خصيصاً لك" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Highlighted Green Text</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-h-high-en" value="${c.hero_title_highlight_en || ''}" placeholder="Planned for You" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <!-- 4. Hero Subtitle -->
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">الوصف التوضيحي للبانر</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <textarea class="admin-form-textarea sub-input-ar" id="sub-txt-h-sub" rows="2" placeholder="جداول وجبات خالية من الغلوتين ١٠٠٪..." oninput="AdminApp.markSubDirty()">${c.hero_subtitle || ''}</textarea>
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Hero Subtitle</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <textarea class="admin-form-textarea sub-input-en" id="sub-txt-h-sub-en" rows="2" placeholder="100% gluten-free, chef-crafted weekly meal schedules..." oninput="AdminApp.markSubDirty()">${c.hero_subtitle_en || ''}</textarea>
              </div>
            </div>

            <!-- 5. Trust Badges (3 items) -->
            <h4 style="margin: 20px 0 12px 0; font-size: 0.95rem; color: var(--c-forest);">شارات الثقة الثلاث (Trust Badges)</h4>
            
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">شارة 1: أمان السيلياك</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-t1" value="${c.hero_trust_celiac || ''}" placeholder="آمن للسيلياك ١٠٠٪" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Trust Badge 1</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-t1-en" value="${c.hero_trust_celiac_en || ''}" placeholder="100% Celiac Safe" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">شارة 2: المطبخ المخصص</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-t2" value="${c.hero_trust_kitchen || ''}" placeholder="مطبخ مخصص وآمن" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Trust Badge 2</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-t2-en" value="${c.hero_trust_kitchen_en || ''}" placeholder="Dedicated Safe Kitchen" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">شارة 3: الجداول الأسبوعية</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-t3" value="${c.hero_trust_fresh || ''}" placeholder="جداول متجددة أسبوعياً" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Trust Badge 3</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-t3-en" value="${c.hero_trust_fresh_en || ''}" placeholder="Fresh Weekly Schedules" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION 3: DELIVERY AREA & COVERAGE -->
        <div class="sub-admin-card" id="sub-sec-delivery">
          <div class="sub-admin-card-header">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">🚚 منطقة ونطاق التوصيل (Delivery Area & Radius)</h3>
              <p class="sub-admin-card-subtitle">الرادار التفاعلي، نطاق الـ 10 كم، قائمة المناطق القريبة، وملاحظات التوصيل.</p>
            </div>
          </div>
          <div class="sub-admin-card-body">
            
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">شارة قسم التوصيل</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-d-eye" value="${c.delivery_section_eyebrow || ''}" placeholder="منطقة التوصيل" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Delivery Eyebrow</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-d-eye-en" value="${c.delivery_section_eyebrow_en || ''}" placeholder="Delivery Area" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">بيان التغطية الرئيسي</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-d-main" value="${c.delivery_main_statement || ''}" placeholder="نوصل ضمن نطاق 10 كم من موقع Moe’s PureBite" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Main Delivery Statement</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-d-main-en" value="${c.delivery_main_statement_en || ''}" placeholder="Delivery is available within a 10 KM radius of Moe’s PureBite." oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">النص التوضيحي</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-d-sub" value="${c.delivery_subtext || ''}" placeholder="تشمل التغطية مناطق قريبة من المطبخ..." oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Delivery Subtext</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-d-sub-en" value="${c.delivery_subtext_en || ''}" placeholder="Coverage includes areas near our kitchen..." oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">المناطق القريبة (مفصولة بفواصل)</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-d-areas-ar" value="${Array.isArray(c.delivery_areas_ar || c.delivery_areas) ? (c.delivery_areas_ar || c.delivery_areas).join('، ') : (c.delivery_areas_ar || c.delivery_areas || 'مرج الحمام، السابع، البنيات، الصويفية، دير غبار، عبدون')}" placeholder="مرج الحمام، السابع، البنيات..." oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Nearby Areas (comma-separated)</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-d-areas-en" value="${Array.isArray(c.delivery_areas_en) ? c.delivery_areas_en.join(', ') : (c.delivery_areas_en || 'Marj Al Hamam, Seventh Circle, Al Bunayyat, Sweifieh, Deir Ghbar, Abdoun')}" placeholder="Marj Al Hamam, Seventh Circle..." oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">ملاحظة داخل النطاق</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-d-note-in" value="${c.delivery_note_inside || ''}" placeholder="التغطية تعتمد على موقعك الدقيق..." oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Inside Zone Note</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-d-note-in-en" value="${c.delivery_note_inside_en || ''}" placeholder="Coverage depends on your exact location..." oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">ملاحظة خارج النطاق</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-d-note-out" value="${c.delivery_note_outside || ''}" placeholder="تتوفر إمكانية التنسيق والتوصيل..." oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Outside Zone Note</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-d-note-out-en" value="${c.delivery_note_outside_en || ''}" placeholder="Delivery coordination may be arranged upon request..." oninput="AdminApp.markSubDirty()">
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION 4: BROCHURES & SLIDER (5 SLIDES) -->
        <div class="sub-admin-card" id="sub-sec-brochures">
          <div class="sub-admin-card-header">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">📸 النشرات وسلايدر الصور - 5 صور (Brochures & Slider)</h3>
              <p class="sub-admin-card-subtitle">رفع صور النشرات الترويجية مباشرة من جهازك أو وضع روابط، مع تعديل النصوص الثنائية للقسم.</p>
            </div>
          </div>
          <div class="sub-admin-card-body">
            
            <!-- Section Header Texts -->
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">شارة القسم</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-b-badge" value="${c.brochures_badge || ''}" placeholder="النشرات وقوائم الأسعار الرسمية" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Section Eyebrow</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-b-badge-en" value="${c.brochures_badge_en || ''}" placeholder="OFFICIAL FLYERS & MENUS" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">عنوان النشرات</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-b-title" value="${c.brochures_title || ''}" placeholder="نشرات وباقات الوجبات" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Brochures Title</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-b-title-en" value="${c.brochures_title_en || ''}" placeholder="Official Menu & Plan Posters" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">الوصف التوضيحي</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <textarea class="admin-form-textarea sub-input-ar" id="sub-txt-b-sub" rows="2" placeholder="تصفح النشرات الرسمية للوجبات، الأسعار..." oninput="AdminApp.markSubDirty()">${c.brochures_subtitle || ''}</textarea>
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Brochures Subtitle</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <textarea class="admin-form-textarea sub-input-en" id="sub-txt-b-sub-en" rows="2" placeholder="Browse our official flyers for weekly menus..." oninput="AdminApp.markSubDirty()">${c.brochures_subtitle_en || ''}</textarea>
              </div>
            </div>

            <!-- 5 Slider Cards -->
            <h4 style="margin: 24px 0 14px 0; font-size: 0.95rem; color: var(--c-forest);">صور السلايدر الخمسة (Upload up to 5 Slides):</h4>
            <div class="sub-slider-cards-grid">
              ${sliderCardsHtml}
            </div>

          </div>
        </div>

        <!-- SECTION 5: 4-WEEK ROTATION SCHEDULE -->
        <div class="sub-admin-card" id="sub-sec-schedule">
          <div class="sub-admin-card-header">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">جدول الوجبات الدوري - 4 أسابيع (4-Week Schedule)</h3>
              <p class="sub-admin-card-subtitle">اختر الوجبات اليومية للأسابيع الأربعة وعدّل مسمياتها بالعربي والإنجليزي وحدد نوع وتصنيف كل وجبة بديناميكية تامة.</p>
            </div>
          </div>
          <div class="sub-admin-card-body">
            
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">شارة زر الأكورديون</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-st-eye" value="${c.schedule_toggle_eyebrow || ''}" placeholder="الجدول الأسبوعي الكامل" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Schedule Toggle Eyebrow</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-st-eye-en" value="${c.schedule_toggle_eyebrow_en || ''}" placeholder="COMPLETE WEEKLY SCHEDULE" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">عنوان جدول الوجبات</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-s-title" value="${c.schedule_title || ''}" placeholder="خطة وجبات الشهر" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Schedule Section Title</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-s-title-en" value="${c.schedule_title_en || ''}" placeholder="Meal Plan" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">تلميح اختيار الوجبات</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-s-hint" value="${c.schedule_hint || ''}" placeholder="اضغط على أي وجبة لمعرفة التفاصيل والمكونات" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Schedule Hint</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-s-hint-en" value="${c.schedule_hint_en || ''}" placeholder="Tap any meal to view details" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">نص زر فتح الجدول</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-st-btn-show" value="${c.schedule_toggle_btn_show || ''}" placeholder="عرض خطة وجبات الأسابيع التفصيلية" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Show Button Text</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-st-btn-show-en" value="${c.schedule_toggle_btn_show_en || ''}" placeholder="Show Detailed Weekly Meal Plans" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">نص زر إخفاء الجدول</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-st-btn-hide" value="${c.schedule_toggle_btn_hide || ''}" placeholder="إخفاء خطة وجبات الأسابيع التفصيلية" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Hide Button Text</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-st-btn-hide-en" value="${c.schedule_toggle_btn_hide_en || ''}" placeholder="Hide Detailed Weekly Meal Plans" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <!-- 4-Week Schedule Grid -->
            <div style="margin-top: 24px;">
              <h4 style="margin: 0 0 16px 0; font-size: 1.05rem; color: var(--c-forest);">جداول الأسابيع الأربعة (الأيام والوجبات):</h4>
              <div class="sub-schedule-weeks-grid">
                ${weeksHtml}
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION 6: BUILDER & SUMMARY -->
        <div class="sub-admin-card" id="sub-sec-options">
          <div class="sub-admin-card-header">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">⚙️ خيارات الخطة والملخص (Options & Summary)</h3>
              <p class="sub-admin-card-subtitle">العناوين وملاحظة الدفع في قسم اختيار الخطة أسفل الصفحة.</p>
            </div>
          </div>
          <div class="sub-admin-card-body">
            
            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">عنوان قسم الخيارات</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-o-title" value="${c.options_title || ''}" placeholder="خيارات الاشتراك" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Options Section Title</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-o-title-en" value="${c.options_title_en || ''}" placeholder="Customize Your Subscription" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">الوصف التوضيحي للخيارات</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <textarea class="admin-form-textarea sub-input-ar" id="sub-txt-o-sub" rows="2" placeholder="اختر المدة وعدد الوجبات الأسبوعية..." oninput="AdminApp.markSubDirty()">${c.options_subtitle || ''}</textarea>
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Options Subtitle</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <textarea class="admin-form-textarea sub-input-en" id="sub-txt-o-sub-en" rows="2" placeholder="Select your duration and weekly meal schedule..." oninput="AdminApp.markSubDirty()">${c.options_subtitle_en || ''}</textarea>
              </div>
            </div>

            <div class="sub-bilingual-row">
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">ملاحظة تأكيد الطلب والدفع</span>
                  <span class="sub-lang-pill ar">عربي AR</span>
                </div>
                <input type="text" class="admin-form-input sub-input-ar" id="sub-txt-sum-note" value="${c.summary_note || ''}" placeholder="لا يتطلب دفع إلكتروني • يتم التأكيد والتنسيق مباشرة عبر واتساب" oninput="AdminApp.markSubDirty()">
              </div>
              <div class="sub-field-column">
                <div class="sub-field-label-wrap">
                  <span class="sub-field-label">Order Confirmation Note</span>
                  <span class="sub-lang-pill en">English EN</span>
                </div>
                <input type="text" class="admin-form-input sub-input-en" id="sub-txt-sum-note-en" value="${c.summary_note_en || ''}" placeholder="No online payment • Confirmed directly on WhatsApp" oninput="AdminApp.markSubDirty()">
              </div>
            </div>

          </div>
        </div>

        <!-- SECTION 7: SUBSCRIPTION MEAL LIBRARY & MANAGEMENT -->
        <div class="sub-admin-card" id="sub-sec-meal-library">
          <div class="sub-admin-card-header" style="flex-wrap: wrap; gap: 14px;">
            <div class="sub-admin-card-header-left">
              <h3 class="sub-admin-card-title">🍲 مكتبة وتفاصيل وجبات الاشتراكات (Meal Library & Catalog)</h3>
              <p class="sub-admin-card-subtitle">
                إضافة وجبات جديدة، وتعديل تفاصيل وأسعار ومكونات/وصف الوجبات باللغتين العربية والإنجليزية. تظهر الوجبات المضافة هنا تلقائياً في القوائم السريعة لجداول الأسابيع.
              </p>
            </div>
            <div>
              <button type="button" class="sub-save-btn-primary" style="background: var(--c-forest); padding: 9px 18px; font-size: 0.88rem; display: inline-flex; align-items: center; gap: 6px;" onclick="AdminApp.openMealLibraryModal()">
                <span>➕</span>
                <span>إضافة وجبة جديدة للمكتبة (Add Meal)</span>
              </button>
            </div>
          </div>
          
          <div class="sub-admin-card-body">
            <!-- Search & Category Filters -->
            <div class="sub-meal-lib-toolbar">
              <div class="sub-meal-lib-search-wrap">
                <span style="font-size: 1rem;">🔍</span>
                <input type="text" id="sub-meal-search-input" class="admin-form-input sub-meal-search-input" placeholder="ابحث باسم الوجبة أو المكونات (عربي / English)..." oninput="AdminApp.onMealSearchInput(this.value)">
              </div>
              <div class="sub-meal-lib-filters" id="sub-meal-filter-chips">
                <button type="button" class="sub-meal-filter-chip active" onclick="AdminApp.filterMealLibrary('all', this)">الكل (All)</button>
                <button type="button" class="sub-meal-filter-chip" onclick="AdminApp.filterMealLibrary('chicken', this)">🍗 دجاج (Chicken)</button>
                <button type="button" class="sub-meal-filter-chip" onclick="AdminApp.filterMealLibrary('meat', this)">🥩 لحم (Meat)</button>
                <button type="button" class="sub-meal-filter-chip" onclick="AdminApp.filterMealLibrary('fish', this)">🐟 سمك (Fish)</button>
                <button type="button" class="sub-meal-filter-chip" onclick="AdminApp.filterMealLibrary('pasta', this)">🍝 باستا (Pasta)</button>
                <button type="button" class="sub-meal-filter-chip" onclick="AdminApp.filterMealLibrary('veg', this)">🥗 نباتي (Veg)</button>
                <button type="button" class="sub-meal-filter-chip" onclick="AdminApp.filterMealLibrary('special', this)">✨ مميز (Specialty)</button>
              </div>
            </div>

            <!-- Meals Grid Container -->
            <div id="sub-meal-grid-mount" class="sub-meal-cards-grid">
              ${this.getMealLibraryCardsHTML()}
            </div>
          </div>
        </div>

        <!-- Bottom Save Button -->
        <div style="text-align: center; padding: 20px 0 40px;">
          <button class="sub-save-btn-primary" onclick="AdminApp.saveSubscriptionsDirectly()" style="padding: 14px 40px; font-size: 1.05rem;">
            💾 حفظ كافة التعديلات (Save All Changes)
          </button>
        </div>

      </div>
    `;
  },

  async saveSubscriptionsDirectly() {
    if (!this.editingSubConfig) return;

    // 1. Read Pricing
    this.editingSubConfig.pricing.mix = {
      "14_days": {
        "5_meals": document.getElementById("sub-p145")?.value || "85",
        "6_meals": document.getElementById("sub-p146")?.value || "98"
      },
      "monthly": {
        "5_meals": document.getElementById("sub-pm5")?.value || "160",
        "6_meals": document.getElementById("sub-pm6")?.value || "185"
      }
    };

    const getSubFieldVal = (id, fallbackKey) => {
      const el = document.getElementById(id);
      const val = el ? el.value.trim() : "";
      return val || (AdminApp.defaultSubContent && AdminApp.defaultSubContent[fallbackKey]) || "";
    };

    // 2. Read Hero Bilingual Texts & Image
    this.editingSubConfig.content.hero_badge = getSubFieldVal("sub-txt-h-badge", "hero_badge");
    this.editingSubConfig.content.hero_badge_en = getSubFieldVal("sub-txt-h-badge-en", "hero_badge_en");
    this.editingSubConfig.content.hero_title = getSubFieldVal("sub-txt-h-title", "hero_title");
    this.editingSubConfig.content.hero_title_en = getSubFieldVal("sub-txt-h-title-en", "hero_title_en");
    this.editingSubConfig.content.hero_title_highlight = getSubFieldVal("sub-txt-h-high", "hero_title_highlight");
    this.editingSubConfig.content.hero_title_highlight_en = getSubFieldVal("sub-txt-h-high-en", "hero_title_highlight_en");
    this.editingSubConfig.content.hero_subtitle = getSubFieldVal("sub-txt-h-sub", "hero_subtitle");
    this.editingSubConfig.content.hero_subtitle_en = getSubFieldVal("sub-txt-h-sub-en", "hero_subtitle_en");
    this.editingSubConfig.content.hero_trust_celiac = getSubFieldVal("sub-txt-t1", "hero_trust_celiac");
    this.editingSubConfig.content.hero_trust_celiac_en = getSubFieldVal("sub-txt-t1-en", "hero_trust_celiac_en");
    this.editingSubConfig.content.hero_trust_kitchen = getSubFieldVal("sub-txt-t2", "hero_trust_kitchen");
    this.editingSubConfig.content.hero_trust_kitchen_en = getSubFieldVal("sub-txt-t2-en", "hero_trust_kitchen_en");
    this.editingSubConfig.content.hero_trust_fresh = getSubFieldVal("sub-txt-t3", "hero_trust_fresh");
    this.editingSubConfig.content.hero_trust_fresh_en = getSubFieldVal("sub-txt-t3-en", "hero_trust_fresh_en");

    const heroImg = document.getElementById("sub-img-hero")?.value.trim();
    this.editingSubConfig.content.hero_image = heroImg || AdminApp.defaultSubContent.hero_image;

    // 3. Read Delivery Bilingual Texts
    this.editingSubConfig.content.delivery_section_eyebrow = getSubFieldVal("sub-txt-d-eye", "delivery_section_eyebrow");
    this.editingSubConfig.content.delivery_section_eyebrow_en = getSubFieldVal("sub-txt-d-eye-en", "delivery_section_eyebrow_en");
    this.editingSubConfig.content.delivery_main_statement = getSubFieldVal("sub-txt-d-main", "delivery_main_statement");
    this.editingSubConfig.content.delivery_main_statement_en = getSubFieldVal("sub-txt-d-main-en", "delivery_main_statement_en");
    this.editingSubConfig.content.delivery_subtext = getSubFieldVal("sub-txt-d-sub", "delivery_subtext");
    this.editingSubConfig.content.delivery_subtext_en = getSubFieldVal("sub-txt-d-sub-en", "delivery_subtext_en");
    this.editingSubConfig.content.delivery_areas_ar = getSubFieldVal("sub-txt-d-areas-ar", "delivery_areas_ar");
    this.editingSubConfig.content.delivery_areas_en = getSubFieldVal("sub-txt-d-areas-en", "delivery_areas_en");
    this.editingSubConfig.content.delivery_note_inside = getSubFieldVal("sub-txt-d-note-in", "delivery_note_inside");
    this.editingSubConfig.content.delivery_note_inside_en = getSubFieldVal("sub-txt-d-note-in-en", "delivery_note_inside_en");
    this.editingSubConfig.content.delivery_note_outside = getSubFieldVal("sub-txt-d-note-out", "delivery_note_outside");
    this.editingSubConfig.content.delivery_note_outside_en = getSubFieldVal("sub-txt-d-note-out-en", "delivery_note_outside_en");

    // 4. Read Brochures Bilingual Texts & 5 Slides
    this.editingSubConfig.content.brochures_badge = getSubFieldVal("sub-txt-b-badge", "brochures_badge");
    this.editingSubConfig.content.brochures_badge_en = getSubFieldVal("sub-txt-b-badge-en", "brochures_badge_en");
    this.editingSubConfig.content.brochures_title = getSubFieldVal("sub-txt-b-title", "brochures_title");
    this.editingSubConfig.content.brochures_title_en = getSubFieldVal("sub-txt-b-title-en", "brochures_title_en");
    this.editingSubConfig.content.brochures_subtitle = getSubFieldVal("sub-txt-b-sub", "brochures_subtitle");
    this.editingSubConfig.content.brochures_subtitle_en = getSubFieldVal("sub-txt-b-sub-en", "brochures_subtitle_en");

    this.editingSubConfig.slider = [];
    for (let sl = 1; sl <= 5; sl++) {
      const sVal = document.getElementById(`sub-img-${sl}`)?.value.trim();
      if (sVal) this.editingSubConfig.slider.push({ url: sVal });
    }
    if (this.editingSubConfig.slider.length === 0) {
      this.editingSubConfig.slider = [
        { url: "assets/images/slides/slide_1.jpg" },
        { url: "assets/images/slides/slide_2.jpg" },
        { url: "assets/images/slides/slide_6.jpg" },
        { url: "assets/images/slides/slide_3.jpg" },
        { url: "assets/images/slides/slide_4.jpg" }
      ];
    }

    // 5. Read Schedule Bilingual Texts & 4-Week Rotations
    this.editingSubConfig.content.schedule_toggle_eyebrow = getSubFieldVal("sub-txt-st-eye", "schedule_toggle_eyebrow");
    this.editingSubConfig.content.schedule_toggle_eyebrow_en = getSubFieldVal("sub-txt-st-eye-en", "schedule_toggle_eyebrow_en");
    this.editingSubConfig.content.schedule_title = getSubFieldVal("sub-txt-s-title", "schedule_title");
    this.editingSubConfig.content.schedule_title_en = getSubFieldVal("sub-txt-s-title-en", "schedule_title_en");
    this.editingSubConfig.content.schedule_hint = getSubFieldVal("sub-txt-s-hint", "schedule_hint");
    this.editingSubConfig.content.schedule_hint_en = getSubFieldVal("sub-txt-s-hint-en", "schedule_hint_en");
    this.editingSubConfig.content.schedule_toggle_btn_show = getSubFieldVal("sub-txt-st-btn-show", "schedule_toggle_btn_show");
    this.editingSubConfig.content.schedule_toggle_btn_show_en = getSubFieldVal("sub-txt-st-btn-show-en", "schedule_toggle_btn_show_en");
    this.editingSubConfig.content.schedule_toggle_btn_hide = getSubFieldVal("sub-txt-st-btn-hide", "schedule_toggle_btn_hide");
    this.editingSubConfig.content.schedule_toggle_btn_hide_en = getSubFieldVal("sub-txt-st-btn-hide-en", "schedule_toggle_btn_hide_en");

    const weeks = ["week1", "week2", "week3", "week4"];
    const days = ["sat", "sun", "mon", "tue", "wed", "thu"];
    if (!this.editingSubConfig.schedules) this.editingSubConfig.schedules = {};
    if (!this.editingSubConfig.schedules.dailyOptionsSchedule) {
      this.editingSubConfig.schedules.dailyOptionsSchedule = {};
    }
    if (!this.editingSubConfig.meal_library) {
      this.editingSubConfig.meal_library = {};
    }

    weeks.forEach(wk => {
      if (!this.editingSubConfig.schedules.dailyOptionsSchedule[wk]) {
        this.editingSubConfig.schedules.dailyOptionsSchedule[wk] = {};
      }
      days.forEach(day => {
        const dayOptionIds = [];
        [0, 1].forEach(optIdx => {
          const arVal = document.getElementById(`sched-${wk}-${day}-${optIdx}-ar`)?.value.trim() || "";
          const enVal = document.getElementById(`sched-${wk}-${day}-${optIdx}-en`)?.value.trim() || "";
          const typeVal = document.getElementById(`sched-${wk}-${day}-${optIdx}-type`)?.value || (optIdx === 0 ? "chicken" : "meat");
          const priceInputVal = document.getElementById(`sched-${wk}-${day}-${optIdx}-price`)?.value.trim();
          const priceVal = priceInputVal !== undefined && priceInputVal !== "" ? (parseFloat(priceInputVal) || 5.50) : 5.50;
          let idVal = document.getElementById(`sched-${wk}-${day}-${optIdx}-id`)?.value.trim() || "";

          if (arVal || enVal || idVal) {
            if (!idVal) {
              idVal = `${wk}_${day}_opt${optIdx + 1}`;
            }
            dayOptionIds.push(idVal);

            const existingMeal = this.editingSubConfig.meal_library[idVal] || (AdminApp.subscriptionMealCatalog && AdminApp.subscriptionMealCatalog[idVal]) || {};
            this.editingSubConfig.meal_library[idVal] = {
              ...existingMeal,
              id: idVal,
              type: typeVal,
              price: priceVal,
              basePrice: priceVal,
              name: {
                ar: arVal || (existingMeal.name && existingMeal.name.ar) || idVal,
                en: enVal || (existingMeal.name && existingMeal.name.en) || idVal
              }
            };
          }
        });
        this.editingSubConfig.schedules.dailyOptionsSchedule[wk][day] = dayOptionIds;
      });
    });

    // 6. Read Options & Summary Bilingual Texts
    this.editingSubConfig.content.options_title = getSubFieldVal("sub-txt-o-title", "options_title");
    this.editingSubConfig.content.options_title_en = getSubFieldVal("sub-txt-o-title-en", "options_title_en");
    this.editingSubConfig.content.options_subtitle = getSubFieldVal("sub-txt-o-sub", "options_subtitle");
    this.editingSubConfig.content.options_subtitle_en = getSubFieldVal("sub-txt-o-sub-en", "options_subtitle_en");
    this.editingSubConfig.content.summary_note = getSubFieldVal("sub-txt-sum-note", "summary_note");
    this.editingSubConfig.content.summary_note_en = getSubFieldVal("sub-txt-sum-note-en", "summary_note_en");

    App.showToast("جاري حفظ إعدادات الاشتراكات... 💾", "info");
    const res = await window.MoeStore.updateSubscriptionConfig(this.editingSubConfig);
    if (res && res.error) {
      App.showToast(`خطأ في الحفظ: ${res.error.message}`, "danger");
    } else {
      App.showToast("تم حفظ كافة إعدادات الاشتراكات بنجاح! 🎉", "success");
      const btn = document.getElementById("sub-save-btn");
      if (btn) {
        btn.style.backgroundColor = "";
        btn.textContent = "💾 تم الحفظ بنجاح!";
      }
      const indicator = document.getElementById("sub-status-indicator");
      if (indicator) {
        indicator.innerHTML = "🟢 كافة التعديلات محفوظة (All changes saved)";
        indicator.style.color = "var(--c-forest)";
      }
    }
  },

  async saveSettings() {
    const updated = {
      whatsappNumber: document.getElementById("settings-wa")?.value.trim(),
      phoneDisplay: document.getElementById("settings-phone-disp")?.value.trim(),
      phoneCallable: "+962" + document.getElementById("settings-phone-disp")?.value.trim().replace(/^0+/, ""),
      instagram: document.getElementById("settings-insta")?.value.trim(),
      facebook: document.getElementById("settings-fb")?.value.trim(),
      currency: document.getElementById("settings-curr")?.value.trim() || "JOD",
      workingHours: document.getElementById("settings-hours")?.value.trim()
    };
    App.showToast("Saving settings...", "info");
    const res = await MoeStore.updateSettings(updated);
    if (res && res.error) {
      App.showToast(`Error saving: ${res.error.message}`, "danger");
    } else {
      App.showToast("Settings updated successfully! ⚙️", "success");
    }
  },

  exportData() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(MoeStore.exportDatabase());
    const dlAnchor = document.createElement("a");
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `moes_purebite_db_${Date.now()}.json`);
    dlAnchor.click();
    App.showToast("Database exported!");
  },

  importDataPrompt() {
    const mount = document.getElementById("admin-confirmation-modal-mount");
    if (!mount) return;
    
    mount.innerHTML = `
      <div class="admin-modal" style="z-index: 99999;">
        <div class="modal-overlay active" onclick="AdminApp.closeConfirmationModal()" style="z-index: 99990;"></div>
        <div class="admin-modal-box" style="max-width: 500px; z-index: 99991;">
          <div class="admin-modal-header">
            <h2 class="admin-modal-title">Import Database</h2>
            <button class="btn-action-icon" onclick="AdminApp.closeConfirmationModal()">✕</button>
          </div>
          <div class="admin-modal-body" style="flex: unset;">
            <p style="margin-bottom: 12px;">Paste your exported JSON database string below:</p>
            <textarea id="import-json-data" class="admin-form-textarea" rows="6"></textarea>
          </div>
          <div class="admin-modal-footer">
            <button class="btn btn-outline" onclick="AdminApp.closeConfirmationModal()">Cancel</button>
            <button class="btn btn-primary" onclick="
              const raw = document.getElementById('import-json-data').value.trim();
              if(raw) {
                if (MoeStore.importDatabase(raw)) {
                  App.showToast('Database imported successfully! 🚀', 'success');
                  AdminApp.closeConfirmationModal();
                  AdminApp.renderAdminView();
                } else {
                  App.showToast('Invalid database JSON!', 'danger');
                }
              }
            ">Import Data</button>
          </div>
        </div>
      </div>
    `;
  },

  resetDefaultsPrompt() {
    this.openConfirmationModal(
      "Reset to Defaults?",
      "Are you sure you want to reset all menu items, categories, and settings to original defaults? This action cannot be undone.",
      "Reset Database",
      () => {
        MoeStore.resetToDefaults();
        App.showToast("Database restored to default catalog 🌿", "info");
        AdminApp.renderAdminView();
      }
    );
  }
};

window.AdminApp = AdminApp;
