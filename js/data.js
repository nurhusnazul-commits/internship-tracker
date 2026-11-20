/* ===== data.js : sample data (demo account only) + auto-save per user ===== */

const currentUser = sessionStorage.getItem("username") || "guest";
const isDemoUser = currentUser === "intern";      // only the demo account gets sample data
const DATA_KEY = "interntrack_data_" + currentUser;

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(DATA_KEY)); }
  catch (e) { return null; }
}
const saved = loadSaved();

const sampleApplications = [
  { id: 1, company: "Petronas Digital", position: "Web Developer Intern", date: "2026-08-02", status: "Approved" },
  { id: 2, company: "Maybank Berhad", position: "IT Support Intern", date: "2026-08-05", status: "Pending" },
  { id: 3, company: "Telekom Malaysia", position: "UI/UX Intern", date: "2026-08-07", status: "Rejected" },
  { id: 4, company: "Grab Malaysia", position: "Content Management Intern", date: "2026-08-10", status: "Pending" },
  { id: 5, company: "Axiata Digital", position: "Front-end Intern", date: "2026-08-12", status: "Approved" },
  { id: 6, company: "Shopee Malaysia", position: "Web Content Intern", date: "2026-08-15", status: "Rejected" }
];

const sampleLogbook = [
  { id: 1, date: "2026-09-01", week: 1, task: "Orientation and setup of development tools", hours: 8, status: "Approved" },
  { id: 2, date: "2026-09-02", week: 1, task: "Learned company website structure", hours: 8, status: "Approved" },
  { id: 3, date: "2026-09-08", week: 2, task: "Designed landing page layout using Bootstrap", hours: 8, status: "Approved" },
  { id: 4, date: "2026-09-09", week: 2, task: "Fixed responsive issues on mobile view", hours: 7, status: "Approved" },
  { id: 5, date: "2026-09-15", week: 3, task: "Built dashboard page with charts", hours: 8, status: "Pending" },
  { id: 6, date: "2026-09-16", week: 3, task: "Updated website content and metadata", hours: 6, status: "Pending" }
];

const sampleAttendance = [
  { date: "2026-11-10", clockIn: "08:55", clockOut: "17:05" },
  { date: "2026-11-11", clockIn: "09:02", clockOut: "17:00" },
  { date: "2026-11-12", clockIn: "08:50", clockOut: "17:10" }
];

// Saved data first. If none: demo account gets samples, new accounts start empty.
const applications = saved ? saved.applications : (isDemoUser ? sampleApplications : []);
const logbook      = saved ? saved.logbook      : (isDemoUser ? sampleLogbook      : []);
const attendance   = saved ? saved.attendance   : (isDemoUser ? sampleAttendance   : []);

// Save automatically whenever the page is left or refreshed
function saveData() {
  try {
    localStorage.setItem(DATA_KEY, JSON.stringify({ applications, logbook, attendance }));
  } catch (e) { /* storage full or blocked: ignore */ }
}
window.addEventListener("pagehide", saveData);