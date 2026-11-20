/* ===== applications.js : render and add applications ===== */

const tableBody = document.getElementById("appTableBody");

// Pick badge colour by status
function badge(status) {
  const colour = status === "Approved" ? "success"
               : status === "Pending"  ? "warning text-dark"
               : "danger";
  return `<span class="badge bg-${colour}">${status}</span>`;
}

// Draw the whole table from the applications array
function renderApplications() {
  tableBody.innerHTML = "";
  applications.forEach((a, i) => {
    tableBody.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${a.company}</td>
        <td>${a.position}</td>
        <td>${a.date}</td>
        <td>${badge(a.status)}</td>
      </tr>`;
  });
}

// Add new application from the form
document.getElementById("appForm").addEventListener("submit", function (e) {
  e.preventDefault();
  applications.push({
    id: applications.length + 1,
    company: document.getElementById("company").value.trim(),
    position: document.getElementById("position").value.trim(),
    date: new Date().toISOString().slice(0, 10),
    status: document.getElementById("status").value
  });
  this.reset();
  renderApplications();
});

renderApplications();