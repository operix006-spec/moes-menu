/**
 * Moe's PureBite — Application Router & Global Manager
 * 100% Gluten-Free Restaurant Platform
 */

const App = {
  currentRoute: "home",

  async init() {
    // Initialize components
    await MoeStore.dataReady; // Ensure store is ready and data is fetched
    CustomerApp.init();
    AdminApp.init();

    const loader = document.getElementById("global-app-loader");
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.style.display = 'none', 400);
    }

    // Listen to hash change routing
    window.addEventListener("hashchange", () => this.handleRouting());
    
    // Initial route handling
    this.handleRouting();
    
    console.log("Moe's PureBite application initialized successfully 🌿");
  },

  handleRouting() {
    let hash = window.location.hash || "#home";
    // Sanitize
    if (hash.startsWith("#/")) hash = "#" + hash.slice(2);

    const customerContainer = document.getElementById("customer-app-wrapper");
    const adminContainer = document.getElementById("admin-view-container");
    const headerTitle = document.getElementById("header-center-content");

    // Close any open sidebar or product modal on route change
    CustomerApp.closeSidebar();
    CustomerApp.closeProductModal();

    if (hash.startsWith("#admin")) {
      // Admin Authentication Check
      if (sessionStorage.getItem("adminAuth") !== "true") {
        if (customerContainer) customerContainer.style.display = "none";
        if (adminContainer) adminContainer.style.display = "none";
        const loginContainer = document.getElementById("admin-login-container");
        if (loginContainer) loginContainer.style.display = "flex";
        document.title = "Admin Login | Moe's PureBite";
        return;
      }

      // Switch to Admin mode
      if (customerContainer) customerContainer.style.display = "none";
      const loginContainer = document.getElementById("admin-login-container");
      if (loginContainer) loginContainer.style.display = "none";
      if (adminContainer) adminContainer.style.display = "block";
      
      const subTab = hash.split("/")[1] || "dashboard";
      AdminApp.activeTab = subTab;
      AdminApp.renderAdminView();
      document.title = "Admin Dashboard | Moe's PureBite";
      return;
    }

    // Customer mode
    if (customerContainer) customerContainer.style.display = "flex";
    if (adminContainer) adminContainer.style.display = "none";
    const loginContainer = document.getElementById("admin-login-container");
    if (loginContainer) loginContainer.style.display = "none";

    const settings = MoeStore.getSettings();

    if (hash === "#home" || hash === "" || hash === "#") {
      this.currentRoute = "home";
      document.title = `${settings.restaurantName} — 100% Gluten-Free Restaurant`;
      if (headerTitle) {
        headerTitle.innerHTML = `<span class="header-page-title">Moe's PureBite</span>`;
      }
      CustomerApp.renderHome();
    } else if (hash === "#menu") {
      this.currentRoute = "menu";
      document.title = `${i18n("nav_menu")} | ${settings.restaurantName}`;
      if (headerTitle) {
        headerTitle.innerHTML = `<span class="header-page-title" data-i18n="nav_menu">${i18n("nav_menu")}</span>`;
      }
      CustomerApp.renderMenu();
    } else if (hash === "#cart") {
      this.currentRoute = "cart";
      document.title = `${i18n("your_order")} | ${settings.restaurantName}`;
      if (headerTitle) {
        headerTitle.innerHTML = `<span class="header-page-title" data-i18n="your_order">${i18n("your_order")}</span>`;
      }
      CustomerApp.renderCart();
    } else if (hash === "#about") {
      this.currentRoute = "about";
      document.title = `${i18n("nav_about")} | ${settings.restaurantName}`;
      if (headerTitle) {
        headerTitle.innerHTML = `<span class="header-page-title" data-i18n="nav_about">${i18n("nav_about")}</span>`;
      }
      CustomerApp.renderAbout();
    } else {
      window.location.hash = "#home";
      return;
    }

    // Update active nav link
    CustomerApp.updateSidebarActiveLink();
    CustomerApp.updateStickyCart();
    CustomerApp.updateCartBadge();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  async handleAdminLogin() {
    const email = document.getElementById("admin-username-input").value.trim();
    const pass = document.getElementById("admin-password-input").value.trim();
    const errorEl = document.getElementById("admin-login-error");
    
    if (!window.supabaseClient) {
      errorEl.textContent = "Supabase connection error.";
      errorEl.style.display = "block";
      return;
    }

    const { data, error } = await window.supabaseClient.auth.signInWithPassword({
      email: email,
      password: pass,
    });

    if (error) {
      errorEl.textContent = error.message;
      errorEl.style.display = "block";
    } else {
      sessionStorage.setItem("adminAuth", "true");
      errorEl.style.display = "none";
      window.location.hash = "#admin";
      App.handleRouting();
      App.showToast("Admin access granted.");
    }
  },

  async handleAdminLogout() {
    if (window.supabaseClient) {
      await window.supabaseClient.auth.signOut();
    }
    sessionStorage.removeItem("adminAuth");
    window.location.hash = "#home";
    App.handleRouting();
    App.showToast("Logged out of Admin dashboard.", "info");
  },

  showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let icon = "✓";
    if (type === "warning") icon = "⚠️";
    if (type === "danger") icon = "✕";
    if (type === "info") icon = "ℹ️";

    toast.innerHTML = `
      <span style="font-size: 1.1rem; color: var(--c-orange);">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("toast-leave");
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    }, 2800);
  }
};

window.App = App;

// Bootstrap when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
