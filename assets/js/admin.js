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

  toggleAvailability(productId) {
    const newVal = MoeStore.toggleProductAvailability(productId);
    App.showToast(`Product availability updated to ${newVal ? "Available" : "Unavailable"}`);
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
        category: categories[0]?.id || "burgers-sandwiches",
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
    
    const available = document.getElementById("builder-available")?.checked;
    if (available !== undefined) this.currentBuilderProduct.available = available;
    
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
              <label class="admin-form-label">Closing Card Title (EN)</label>
              <input type="text" id="about-closing-title" class="admin-form-input" value="${about.closingCardTitle}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Closing Card Title (AR)</label>
              <input type="text" id="about-closing-title-ar" class="admin-form-input" value="${about.closingCardTitle_ar || ''}" dir="rtl" />
            </div>
          </div>
          
          <div class="admin-form-row">
            <div class="admin-form-group">
              <label class="admin-form-label">Closing Card Subtitle (EN)</label>
              <input type="text" id="about-closing-desc" class="admin-form-input" value="${about.closingCardText}" />
            </div>
            <div class="admin-form-group">
              <label class="admin-form-label">Closing Card Subtitle (AR)</label>
              <input type="text" id="about-closing-desc-ar" class="admin-form-input" value="${about.closingCardText_ar || ''}" dir="rtl" />
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
      closingCardTitle: document.getElementById("about-closing-title")?.value,
      closingCardTitle_ar: document.getElementById("about-closing-title-ar")?.value,
      closingCardText: document.getElementById("about-closing-desc")?.value,
      closingCardText_ar: document.getElementById("about-closing-desc-ar")?.value,
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
