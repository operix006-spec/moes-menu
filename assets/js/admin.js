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

              <button class="admin-nav-btn ${this.activeTab === "orders" ? "active" : ""}" onclick="AdminApp.setTab('orders')">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                <span>Order Handoffs</span>
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
            <a href="#home" class="btn-admin-switch-store">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>Back to Storefront</span>
            </a>
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
    `;
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

        <div class="admin-stat-card">
          <div class="admin-stat-icon orange">💬</div>
          <div class="admin-stat-info">
            <div class="admin-stat-val">${handoffs.length}</div>
            <div class="admin-stat-lbl">WhatsApp Orders</div>
          </div>
        </div>

        <div class="admin-stat-card">
          <div class="admin-stat-icon">💰</div>
          <div class="admin-stat-info">
            <div class="admin-stat-val">${estRevenue.toFixed(2)} ${settings.currency}</div>
            <div class="admin-stat-lbl">Order Value Tracked</div>
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
                      <input type="checkbox" ${p.available ? "checked" : ""} onchange="AdminApp.toggleAvailability('${p.id}')">
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
                      <input type="checkbox" ${p.available ? "checked" : ""} onchange="AdminApp.toggleAvailability('${p.id}')">
                      <span class="toggle-slider"></span>
                    </label>
                  </td>
                  <td>
                    <div class="action-btns-group">
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

  toggleAvailability(productId) {
    const newVal = MoeStore.toggleProductAvailability(productId);
    App.showToast(`Product availability updated to ${newVal ? "Available" : "Unavailable"}`);
  },

  deleteProductPrompt(productId) {
    const prod = MoeStore.getProductById(productId);
    if (!prod) return;
    if (confirm(`Are you sure you want to delete "${prod.name}" from the menu?`)) {
      MoeStore.deleteProduct(productId);
      App.showToast(`Deleted ${prod.name}`, "info");
      this.renderMenuTab();
    }
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
        category: categories[0]?.id || "burgers-sandwiches",
        basePrice: 3.50,
        description: "",
        image: "assets/images/zinger_burger.png",
        heroImage: "",
        available: true,
        isBestSeller: false,
        isFeatured: false,
        isPreOrder24h: false,
        tags: ["100% Gluten-Free"],
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

    const p = this.currentBuilderProduct;
    const categories = MoeStore.getCategories().filter(c => c.id !== "all");
    const isNew = !p.id;

    mount.innerHTML = `
      <div class="admin-modal">
        <div class="modal-overlay active" onclick="AdminApp.closeProductBuilder()"></div>
        <div class="admin-modal-box">
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
                <label class="admin-form-label">Image Asset Path / URL</label>
                <input type="text" id="builder-image" class="admin-form-input" value="${p.image}" />
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
                <input type="checkbox" id="builder-available" ${p.available ? "checked" : ""} />
                <span>Available to Order</span>
              </label>
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
                    <input type="text" class="admin-form-input" style="flex: 2;" value="${ing.name}" placeholder="Ingredient Name" onchange="AdminApp.updateIngredient(${idx}, 'name', this.value)" />
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
                      <input type="text" class="admin-form-input" style="font-weight: 700;" value="${g.name}" placeholder="Group Name (e.g. Make it a Meal)" onchange="AdminApp.updateOptionGroup(${gIdx}, 'name', this.value)" />
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
                          <input type="text" class="admin-form-input" style="font-size: 0.82rem;" value="${opt.name}" placeholder="Option label" onchange="AdminApp.updateOptionChoice(${gIdx}, ${optIdx}, 'name', this.value)" />
                          <input type="number" step="0.05" class="admin-form-input" style="width: 100px; font-size: 0.82rem;" value="${opt.price}" placeholder="+Price JOD" onchange="AdminApp.updateOptionChoice(${gIdx}, ${optIdx}, 'price', parseFloat(this.value) || 0)" />
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
                    <input type="text" class="admin-form-input" style="flex: 2;" value="${m.name}" placeholder="Modifier Name (e.g. Extra Cheese)" onchange="AdminApp.updateModifier(${mIdx}, 'name', this.value)" />
                    <input type="number" step="0.05" class="admin-form-input" style="width: 110px;" value="${m.price}" placeholder="+Price JOD" onchange="AdminApp.updateModifier(${mIdx}, 'price', parseFloat(this.value) || 0)" />
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
  },

  closeProductBuilder() {
    const mount = document.getElementById("admin-product-builder-modal-mount");
    if (mount) mount.innerHTML = "";
    this.currentBuilderProduct = null;
  },

  addIngredientRow() {
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
    this.currentBuilderProduct.ingredients.splice(idx, 1);
    this.renderProductBuilderModal();
  },

  addOptionGroup() {
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
    this.currentBuilderProduct.optionGroups.splice(gIdx, 1);
    this.renderProductBuilderModal();
  },

  addOptionChoice(gIdx) {
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
    this.currentBuilderProduct.optionGroups[gIdx].options.splice(optIdx, 1);
    this.renderProductBuilderModal();
  },

  addModifierRow() {
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
    this.currentBuilderProduct.modifiers.splice(mIdx, 1);
    this.renderProductBuilderModal();
  },

  saveProductFromBuilder() {
    const name = document.getElementById("builder-name")?.value.trim();
    if (!name) {
      App.showToast("Product name is required!", "warning");
      return;
    }

    const nameAr = document.getElementById("builder-name-ar")?.value.trim();
    const price = parseFloat(document.getElementById("builder-price")?.value) || 0;
    const cat = document.getElementById("builder-category")?.value;
    const img = document.getElementById("builder-image")?.value.trim();
    const desc = document.getElementById("builder-desc")?.value.trim();
    const descAr = document.getElementById("builder-desc-ar")?.value.trim();
    const available = document.getElementById("builder-available")?.checked;
    const bestSeller = document.getElementById("builder-bestseller")?.checked;
    const featured = document.getElementById("builder-featured")?.checked;
    const preOrder = document.getElementById("builder-preorder")?.checked;

    this.currentBuilderProduct.name = name;
    this.currentBuilderProduct.name_ar = nameAr;
    this.currentBuilderProduct.basePrice = price;
    this.currentBuilderProduct.category = cat;
    this.currentBuilderProduct.image = img || "assets/images/zinger_burger.png";
    this.currentBuilderProduct.description = desc;
    this.currentBuilderProduct.description_ar = descAr;
    this.currentBuilderProduct.available = available;
    this.currentBuilderProduct.isBestSeller = bestSeller;
    this.currentBuilderProduct.isFeatured = featured;
    this.currentBuilderProduct.isPreOrder24h = preOrder;

    MoeStore.saveProduct(this.currentBuilderProduct);
    this.closeProductBuilder();
    App.showToast(`Saved ${name} successfully! 🌿`, "success");
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
          <button class="btn btn-accent btn-pill-sm" onclick="AdminApp.addNewCategoryPrompt()">+ Add Category</button>
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
                        <button class="btn-action-icon" onclick="AdminApp.editCategoryPrompt('${c.id}')" title="Edit">✏️</button>
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

  addNewCategoryPrompt() {
    const name = prompt("Enter category name (e.g. Desserts & Sweet Bites):");
    if (!name) return;
    const icon = prompt("Enter category emoji icon (e.g. 🍰):", "🍽️");
    const id = name.toLowerCase().replace(/[^a-z0-9]/g, "-");

    MoeStore.saveCategory({
      id,
      name,
      icon: icon || "🍽️",
      enabled: true
    });
    App.showToast(`Added category: ${name}`);
    this.renderCategoriesTab();
  },

  editCategoryPrompt(catId) {
    const cat = MoeStore.getCategories().find(c => c.id === catId);
    if (!cat) return;
    const name = prompt("Update category name:", cat.name);
    if (!name) return;
    const icon = prompt("Update category icon:", cat.icon);

    cat.name = name;
    cat.icon = icon || cat.icon;
    MoeStore.saveCategory(cat);
    App.showToast(`Updated category: ${name}`);
    this.renderCategoriesTab();
  },

  deleteCategoryPrompt(catId) {
    if (confirm("Delete this category? Products in this category will need reassignment.")) {
      MoeStore.deleteCategory(catId);
      App.showToast("Category deleted", "info");
      this.renderCategoriesTab();
    }
  },

  toggleCategoryEnabled(catId) {
    const cat = MoeStore.getCategories().find(c => c.id === catId);
    if (cat) {
      cat.enabled = !cat.enabled;
      MoeStore.saveCategory(cat);
      App.showToast(`Category ${cat.name} ${cat.enabled ? "enabled" : "disabled"}`);
    }
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
    const home = MoeStore.getHomeContent();

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">Hero Section & Brand Promise CMS</h2>
          <button class="btn btn-primary btn-pill-sm" onclick="AdminApp.saveHomeCms()">Save Home Content</button>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Badge Text</label>
              <input type="text" id="home-badge" class="admin-form-input" value="${home.heroBadge}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Main Title</label>
              <input type="text" id="home-title" class="admin-form-input" value="${home.heroTitle}" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Subtitle</label>
              <input type="text" id="home-sub" class="admin-form-input" value="${home.heroSubtitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Hero Description</label>
              <input type="text" id="home-desc" class="admin-form-input" value="${home.heroDescription}" />
            </div>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Primary CTA Text</label>
              <input type="text" id="home-cta" class="admin-form-input" value="${home.heroCtaText}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Secondary CTA Text</label>
              <input type="text" id="home-sec-cta" class="admin-form-input" value="${home.heroSecondaryCta}" />
            </div>
          </div>

          <hr style="border: none; border-top: 1px solid #E2E8E2; margin: 10px 0;" />

          <div class="admin-form-group">
            <label class="admin-form-label">Brand Promise Eyebrow</label>
            <input type="text" id="home-promise-sub" class="admin-form-input" value="${home.promiseSubtitle}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Brand Promise Title</label>
            <input type="text" id="home-promise-title" class="admin-form-input" value="${home.promiseTitle}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Brand Promise Paragraph Copy</label>
            <textarea id="home-promise-text" class="admin-form-textarea" rows="3">${home.promiseText}</textarea>
          </div>
        </div>
      </div>
    `;
  },

  saveHomeCms() {
    const updated = {
      heroBadge: document.getElementById("home-badge")?.value,
      heroTitle: document.getElementById("home-title")?.value,
      heroSubtitle: document.getElementById("home-sub")?.value,
      heroDescription: document.getElementById("home-desc")?.value,
      heroCtaText: document.getElementById("home-cta")?.value,
      heroSecondaryCta: document.getElementById("home-sec-cta")?.value,
      promiseSubtitle: document.getElementById("home-promise-sub")?.value,
      promiseTitle: document.getElementById("home-promise-title")?.value,
      promiseText: document.getElementById("home-promise-text")?.value
    };
    MoeStore.updateHomeContent(updated);
    App.showToast("Home page CMS saved successfully! 🌿", "success");
  },

  // ==========================================================================
  // 6. ABOUT US CMS TAB
  // ==========================================================================
  renderAboutCmsTab() {
    const about = MoeStore.getAboutContent();

    return `
      <div class="admin-panel-card">
        <div class="admin-panel-header">
          <h2 class="admin-panel-title">About Us Page Story & Values CMS</h2>
          <button class="btn btn-primary btn-pill-sm" onclick="AdminApp.saveAboutCms()">Save About Content</button>
        </div>

        <div style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
          <div class="admin-form-group">
            <label class="admin-form-label">Hero Title</label>
            <input type="text" id="about-hero-title" class="admin-form-input" value="${about.heroTitle}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Hero Subtitle</label>
            <input type="text" id="about-hero-sub" class="admin-form-input" value="${about.heroSubtitle}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Story Section Title</label>
            <input type="text" id="about-story-title" class="admin-form-input" value="${about.storyTitle}" />
          </div>

          <div class="admin-form-group">
            <label class="admin-form-label">Story Text (Careful Gluten-Free Preparation)</label>
            <textarea id="about-story-text" class="admin-form-textarea" rows="4">${about.storyText}</textarea>
          </div>

          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Closing Card Title</label>
              <input type="text" id="about-closing-title" class="admin-form-input" value="${about.closingCardTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Closing Card Subtitle</label>
              <input type="text" id="about-closing-desc" class="admin-form-input" value="${about.closingCardText}" />
            </div>
          </div>
        </div>
      </div>
    `;
  },

  saveAboutCms() {
    const updated = {
      heroTitle: document.getElementById("about-hero-title")?.value,
      heroSubtitle: document.getElementById("about-hero-sub")?.value,
      storyTitle: document.getElementById("about-story-title")?.value,
      storyText: document.getElementById("about-story-text")?.value,
      closingCardTitle: document.getElementById("about-closing-title")?.value,
      closingCardText: document.getElementById("about-closing-desc")?.value
    };
    MoeStore.updateAboutContent(updated);
    App.showToast("About Us page CMS saved successfully! 🌿", "success");
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
            <button class="btn btn-outline btn-pill-sm" onclick="AdminApp.importDataPrompt()">Import Database Backup</button>
            <button class="btn btn-outline btn-pill-sm" style="color: var(--c-danger); border-color: var(--c-danger);" onclick="AdminApp.resetDefaultsPrompt()">Reset Database to Defaults</button>
          </div>
        </div>
      </div>
    `;
  },

  saveSettings() {
    const updated = {
      whatsappNumber: document.getElementById("settings-wa")?.value.trim(),
      phoneDisplay: document.getElementById("settings-phone-disp")?.value.trim(),
      phoneCallable: "+962" + document.getElementById("settings-phone-disp")?.value.trim().replace(/^0+/, ""),
      instagram: document.getElementById("settings-insta")?.value.trim(),
      facebook: document.getElementById("settings-fb")?.value.trim(),
      currency: document.getElementById("settings-curr")?.value.trim() || "JOD",
      workingHours: document.getElementById("settings-hours")?.value.trim()
    };
    MoeStore.updateSettings(updated);
    App.showToast("Settings updated successfully! ⚙️", "success");
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
    const raw = prompt("Paste your exported JSON database string here:");
    if (!raw) return;
    if (MoeStore.importDatabase(raw)) {
      App.showToast("Database imported successfully! 🚀", "success");
      this.renderAdminView();
    } else {
      App.showToast("Invalid database JSON!", "danger");
    }
  },

  resetDefaultsPrompt() {
    if (confirm("Are you sure you want to reset all menu items, categories, and settings to original defaults?")) {
      MoeStore.resetToDefaults();
      App.showToast("Database restored to default catalog 🌿", "info");
      this.renderAdminView();
    }
  }
};

window.AdminApp = AdminApp;
