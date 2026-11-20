/* ===== profile-store.js : shared profile data (Model) ===== */

const PROGRAMME = "Bachelor of Information Science (Hons.) Information Systems Management";
const PROFILE_KEY = "interntrack_profile_" + currentUser;   // currentUser comes from data.js

const EMPTY_PROFILE = {
  studentId: "", campus: "", email: "", phone: "",
  placementAppId: null, startDate: "", endDate: "", targetHours: 240,
  supervisor: "", supervisorEmail: "", supervisorPhone: "", facultySupervisor: ""
};
const DEMO_PROFILE = Object.assign({}, EMPTY_PROFILE, {
  studentId: "2026000000",
  campus: "UiTM Puncak Perdana",
  email: "student@example.com",
  phone: "012-3456789",
  placementAppId: 1,
  startDate: "2026-09-01",
  endDate: "2027-02-12",
  targetHours: 240,
  supervisor: "Encik Hafiz bin Nizam",
  supervisorEmail: "hafiz@example.com",
  supervisorPhone: "011-1234567",
  facultySupervisor: "Dr. Ali bin Basir"
});
function loadProfile() {
  try {
    const s = JSON.parse(localStorage.getItem(PROFILE_KEY));
    if (s) return Object.assign({}, EMPTY_PROFILE, s);
  } catch (e) {}
  return Object.assign({}, isDemoUser ? DEMO_PROFILE : EMPTY_PROFILE);
}
function saveProfile(p) {
  try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {}
}
let profile = loadProfile();

/* ---------- Small helpers used by both pages ---------- */
const $ = id => document.getElementById(id);
const setText = (id, text) => { $(id).textContent = text || "-"; };
const approvedApps = () => applications.filter(a => a.status === "Approved");

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2)
    .map(w => w[0].toUpperCase()).join("") || "?";
}
function showFlash() {
  const f = $("flash");
  f.classList.remove("d-none");
  setTimeout(() => f.classList.add("d-none"), 3000);
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function showError(msg) { $("formErr").textContent = msg; $("formErr").classList.remove("d-none"); }
function hideError() { $("formErr").classList.add("d-none"); }