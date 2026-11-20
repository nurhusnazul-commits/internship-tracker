/* ===== charts.js : Chart.js for dashboard (with empty state) ===== */

const approved = applications.filter(a => a.status === "Approved").length;
const pending  = applications.filter(a => a.status === "Pending").length;
const rejected = applications.filter(a => a.status === "Rejected").length;

// Summary cards
document.getElementById("totalApps").textContent = applications.length;
document.getElementById("approvedApps").textContent = approved;
document.getElementById("pendingApps").textContent = pending;
document.getElementById("totalHours").textContent =
  logbook.reduce((sum, l) => sum + l.hours, 0);

// Replace a chart with a friendly message when there is no data yet
function showEmpty(canvasId, html) {
  const canvas = document.getElementById(canvasId);
  canvas.insertAdjacentHTML("afterend", '<p class="text-muted text-center my-5">' + html + "</p>");
  canvas.remove();
}

// Chart 1: Doughnut - application status
if (applications.length > 0) {
  new Chart(document.getElementById("statusChart"), {
    type: "doughnut",
    data: {
      labels: ["Approved", "Pending", "Rejected"],
      datasets: [{
        data: [approved, pending, rejected],
        backgroundColor: ["#198754", "#ffc107", "#dc3545"]
      }]
    },
    options: { aspectRatio: 1.6, plugins: { legend: { position: "bottom" } } }
  });
} else {
  showEmpty("statusChart", 'No applications yet.<br><a href="applications.html">Add your first application</a>');
}

// Chart 2: Bar - hours logged per week
if (logbook.length > 0) {
  const weeks = [...new Set(logbook.map(l => l.week))];
  const hoursPerWeek = weeks.map(w =>
    logbook.filter(l => l.week === w).reduce((sum, l) => sum + l.hours, 0)
  );

  new Chart(document.getElementById("hoursChart"), {
    type: "bar",
    data: {
      labels: weeks.map(w => "Week " + w),
      datasets: [{ label: "Hours logged", data: hoursPerWeek, backgroundColor: "#4b2e83" }]
    },
    options: {
      scales: { y: { beginAtZero: true } },
      plugins: { legend: { display: false } }
    }
  });
} else {
  showEmpty("hoursChart", 'No logbook entries yet.<br><a href="logbook.html">Write your first entry</a>');
}