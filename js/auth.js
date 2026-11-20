/* ===== auth.js : login, register, lockout, logout =====
   NOTE: This is a SIMULATED login for learning. Accounts live in the
   browser's localStorage (not a real server database). */

const USERS_KEY = "interntrack_users";   // list of registered users
const FAILS_KEY = "interntrack_fails";   // wrong-attempt counter
const LOCK_KEY  = "interntrack_lock";    // time until lock ends
const MAX_ATTEMPTS = 3;
const LOCK_SECONDS = 30;

/* ---------- Helpers ---------- */

// Hash password (SHA-256 + username as salt) so plain text is never stored
async function hashPassword(username, password) {
  const text = username.toLowerCase() + ":" + password;
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf))
      .map(b => b.toString(16).padStart(2, "0")).join("");
  }
  // Fallback for very old browsers
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (h * 31 + text.charCodeAt(i)) | 0;
  return "f" + h;
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch (e) { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Auto-increment style id: highest id + 1
function nextUserId(users) {
  return users.reduce((max, u) => Math.max(max, u.id), 0) + 1;
}

// Make sure the demo account exists
async function seedDemoUser() {
  const users = getUsers();
  if (!users.some(u => u.username === "intern")) {
    users.push({
      id: nextUserId(users),
      username: "intern",
      hash: await hashPassword("intern", "intern123"),
      created: new Date().toISOString()
    });
    saveUsers(users);
  }
}

function lockRemaining() {
  const until = Number(localStorage.getItem(LOCK_KEY) || 0);
  return Math.max(0, Math.ceil((until - Date.now()) / 1000));
}

function show(el, text) { el.textContent = text; el.classList.remove("d-none"); }
function hide(el) { el.classList.add("d-none"); }

/* ---------- Login / Register page ---------- */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  const loginPanel = document.getElementById("loginPanel");
  const registerPanel = document.getElementById("registerPanel");
  const errorMsg = document.getElementById("errorMsg");
  const infoMsg = document.getElementById("infoMsg");
  const regMsg = document.getElementById("regMsg");

  // Already logged in? Go straight to dashboard
  if (sessionStorage.getItem("loggedIn") === "true") {
    window.location.href = "home.html";
  }

  // Switch between the two panels
  document.getElementById("showRegister").addEventListener("click", function (e) {
    e.preventDefault();
    hide(errorMsg); hide(infoMsg);
    loginPanel.classList.add("d-none");
    registerPanel.classList.remove("d-none");
  });
  document.getElementById("showLogin").addEventListener("click", function (e) {
    e.preventDefault();
    hide(regMsg);
    registerPanel.classList.add("d-none");
    loginPanel.classList.remove("d-none");
  });

  // ----- LOGIN -----
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    hide(errorMsg); hide(infoMsg);

    // Locked after too many wrong attempts
    const wait = lockRemaining();
    if (wait > 0) {
      show(errorMsg, "Too many attempts. Please try again in " + wait + " seconds.");
      return;
    }

    await seedDemoUser();
    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value;

    const found = getUsers().find(u => u.username.toLowerCase() === user.toLowerCase());
    const hash = await hashPassword(user, pass);

    if (found && found.hash === hash) {
      localStorage.removeItem(FAILS_KEY);
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("username", found.username);
      window.location.href = "home.html";
    } else {
      // Same message for wrong username OR wrong password (no hints)
      let fails = Number(localStorage.getItem(FAILS_KEY) || 0) + 1;
      if (fails >= MAX_ATTEMPTS) {
        localStorage.setItem(LOCK_KEY, Date.now() + LOCK_SECONDS * 1000);
        fails = 0;
      }
      localStorage.setItem(FAILS_KEY, fails);
      show(errorMsg, "Invalid username or password. Please try again.");
    }
  });

  // ----- REGISTER -----
  document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    hide(regMsg);

    const user = document.getElementById("regUser").value.trim();
    const pass = document.getElementById("regPass").value;
    const pass2 = document.getElementById("regPass2").value;

        if (!/^[A-Za-z0-9 '.\/-]{3,50}$/.test(user)) {
      show(regMsg, "Please enter your full name (3-50 characters, letters and numbers only).");
      return;
    }
    if (pass.length < 6) {
      show(regMsg, "Password must be at least 6 characters.");
      return;
    }
    if (pass !== pass2) {
      show(regMsg, "Passwords do not match.");
      return;
    }

    await seedDemoUser();
    const users = getUsers();
    if (users.some(u => u.username.toLowerCase() === user.toLowerCase())) {
      show(regMsg, "That username is not available. Please choose another one.");
      return;
    }

    users.push({
      id: nextUserId(users),
      username: user,
      hash: await hashPassword(user, pass),
      created: new Date().toISOString()
    });
    saveUsers(users);

    // Back to login with a success message
    this.reset();
    registerPanel.classList.add("d-none");
    loginPanel.classList.remove("d-none");
    document.getElementById("username").value = user;
    show(infoMsg, "Account created! Please log in.");
  });
}

/* ---------- Used by the other pages ---------- */

function requireLogin() {
  if (sessionStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  }
}

function logout() {
  sessionStorage.clear();   // user data stays saved in localStorage
  window.location.href = "index.html";
}