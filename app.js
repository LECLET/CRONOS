
/**
 * CRONOS V1 – SPA statique sans backend.
 * Objectif : Base prête pour déploiement GitHub Pages.
 * NB : Auth & rôles de démonstration via localStorage (à remplacer par un vrai backend).
 */
const $ = (sel) => document.querySelector(sel);
const loginView = $("#login-view");
const appView = $("#app-view");
const pageContainer = $("#page-container");
const userInfo = $("#user-info");
const logoutBtn = $("#logout-btn");
const sidebar = $("#sidebar");

const DEMO_USERS = [
  { username: "admin", password: "admin", role: "admin", agency: "AUTRE" },
  { username: "agence", password: "agence", role: "agence", agency: "CASABLANCA" },
];

function seedUsers() {
  if (!localStorage.getItem("cronos_users")) {
    localStorage.setItem("cronos_users", JSON.stringify(DEMO_USERS));
  }
}
function getUsers() { return JSON.parse(localStorage.getItem("cronos_users") || "[]"); }
function setSession(user) { sessionStorage.setItem("cronos_session", JSON.stringify(user)); }
function getSession() { try { return JSON.parse(sessionStorage.getItem("cronos_session")); } catch { return null; } }
function clearSession() { sessionStorage.removeItem("cronos_session"); }

function showLogin() {
  loginView.classList.add("active");
  appView.classList.add("hidden");
  appView.classList.remove("active");
}
function showApp() {
  loginView.classList.remove("active");
  appView.classList.remove("hidden");
  appView.classList.add("active");
}

function renderNavForRole(role) {
  // Hide admin-only links if not admin
  document.querySelectorAll(".admin-only").forEach(el => {
    el.style.display = (role === "admin") ? "block" : "none";
  });
  // Activate current link
  const current = location.hash.replace("#", "");
  document.querySelectorAll(".nav-link").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
}

async function loadPage(route) {
  const routeMap = {
    "/planifications": "planifications.html",
    "/agents": "agents.html",
    "/commercial": "commercial.html",
    "/internet": "internet.html",
    "/parametrages": "parametrages.html",
  };
  const file = routeMap[route] || routeMap["/planifications"];

  // If route is admin-only, check role
  const user = getSession();
  if (route === "/parametrages" && user?.role !== "admin") {
    pageContainer.innerHTML = `<div class="card"><h2>Accès refusé</h2><p>Cette section est réservée aux administrateurs.</p></div>`;
    renderNavForRole(user?.role);
    return;
  }

  try {
    const res = await fetch("pages/" + file + "?v=" + Date.now());
    const html = await res.text();
    pageContainer.innerHTML = html;
  } catch (e) {
    pageContainer.innerHTML = `<div class="card"><h2>Erreur</h2><p>Impossible de charger la page.</p></div>`;
  }
  renderNavForRole(user?.role);
}

function onRouteChange() {
  const hash = location.hash || "#/planifications";
  const route = hash.replace("#", "");
  loadPage(route);
}

function initLogin() {
  const form = $("#login-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = $("#login-username").value.trim();
    const password = $("#login-password").value;

    const user = getUsers().find(u => u.username === username && u.password === password);
    if (!user) {
      alert("Identifiants invalides");
      return;
    }
    setSession(user);
    userInfo.textContent = `${user.username} • ${user.role.toUpperCase()} • ${user.agency}`;
    showApp();
    location.hash = "#/planifications";
    onRouteChange();
  });
}

function initLogout() {
  logoutBtn.addEventListener("click", () => {
    clearSession();
    location.hash = "";
    showLogin();
  });
}

// Boot
seedUsers();
initLogin();
initLogout();

// Restore session if present
const session = getSession();
if (session) {
  userInfo.textContent = `${session.username} • ${session.role.toUpperCase()} • ${session.agency}`;
  showApp();
  onRouteChange();
} else {
  showLogin();
}

// Router
window.addEventListener("hashchange", onRouteChange);
