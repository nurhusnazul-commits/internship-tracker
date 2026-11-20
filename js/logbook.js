/* ===== logbook.js : render and add logbook entries ===== */

const logBody = document.getElementById("logTableBody");

function logBadge(status) {
  return status === "Approved"
    ? '<span class="badge bg-success">Approved</span>'
    : '<span class="badge bg-warning text-dark">Pending</span>';
}

function renderLogbook() {
  logBody.innerHTML = "";
  logbook.forEach(l => {
    logBody.innerHTML += `
      <tr>
        <td>${l.date}</td>
        <td>Week ${l.week}</td>
        <td>${l.task}</td>
        <td>${l.hours}</td>
        <td>${logBadge(l.status)}</td>
      </tr>`;
  });
}
// Week number counted from the earliest logbook date
function weekOf(dateStr) {
  const dates = logbook.map(l => l.date).concat(dateStr).sort();
  const days = (new Date(dateStr) - new Date(dates[0])) / 86400000;
  return Math.floor(days / 7) + 1;
}
document.getElementById("logForm").addEventListener("submit", function (e) {
  e.preventDefault();
  logbook.push({
    id: logbook.length + 1,
    date: document.getElementById("logDate").value,
    week: weekOf(document.getElementById("logDate").value),
    task: document.getElementById("logTask").value.trim(),
    hours: Number(document.getElementById("logHours").value),
    status: "Pending"
  });
  this.reset();
  renderLogbook();
});

renderLogbook();