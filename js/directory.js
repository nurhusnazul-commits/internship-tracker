/* ===== directory.js : placement insights (tables, search, filter, charts) ===== */

const PALETTE = ["#4b2e83", "#7b4fc4", "#a98be0", "#198754", "#20c997", "#ffc107", "#fd7e14", "#dc3545"];

// Rows with auto-increment ids (like database rows)
const progRows = PLACEMENT.programmes.map((p, i) => ({
  id: i + 1, name: p[0], placed: p[1], seeking: p[2],
  total: p[1] + p[2], rate: Math.round(p[1] / (p[1] + p[2]) * 100)
}));
const compRows = PLACEMENT.companies.map((c, i) => ({
  id: i + 1, name: c[0], sector: c[1], state: c[2], interns: c[3], since: c[4]
}));

/* ---------- Summary cards (calculated from the data) ---------- */
const totalPlaced = progRows.reduce((s, p) => s + p.placed, 0);
const totalCohort = progRows.reduce((s, p) => s + p.total, 0);
document.getElementById("kpiCohort").textContent = totalCohort;
document.getElementById("kpiPlaced").textContent = totalPlaced;
document.getElementById("kpiCompanies").textContent = compRows.length;
document.getElementById("kpiRate").textContent = Math.round(totalPlaced / totalCohort * 100) + "%";
document.getElementById("sourceNote").textContent = PLACEMENT.note;

/* ---------- Chart 1: programmes (toggle: total / placed / seeking) ---------- */
let progChart;
const metricNames = { total: "Total students", placed: "Placed students", seeking: "Still seeking" };

function drawProgChart(metric) {
  const sorted = [...progRows].sort((a, b) => b[metric] - a[metric]);
  const data = {
    labels: sorted.map(p => p.name),
    datasets: [{ label: metricNames[metric], data: sorted.map(p => p[metric]), backgroundColor: "#4b2e83" }]
  };
  if (progChart) {
    progChart.data = data;
    progChart.update();
  } else {
    progChart = new Chart(document.getElementById("progChart"), {
      type: "bar",
      data: data,
      options: {
        indexAxis: "y",
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { x: { beginAtZero: true } }
      }
    });
  }
  document.getElementById("progChartTitle").textContent = "Programmes by " + metricNames[metric];
}
document.querySelectorAll("input[name='metric']").forEach(r =>
  r.addEventListener("change", () => drawProgChart(r.value))
);
drawProgChart("total");

/* ---------- Chart 2: interns by industry sector (doughnut) ---------- */
const sectors = {};
compRows.forEach(c => { sectors[c.sector] = (sectors[c.sector] || 0) + c.interns; });
new Chart(document.getElementById("sectorChart"), {
  type: "doughnut",
  data: {
    labels: Object.keys(sectors),
    datasets: [{ data: Object.values(sectors), backgroundColor: PALETTE }]
  },
  options: { maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }
});

/* ---------- Chart 3: placements per year (line) ---------- */
new Chart(document.getElementById("trendChart"), {
  type: "line",
  data: {
    labels: PLACEMENT.trend.map(t => t[0]),
    datasets: [{
      label: "Students placed",
      data: PLACEMENT.trend.map(t => t[1]),
      borderColor: "#4b2e83",
      backgroundColor: "rgba(75,46,131,0.15)",
      fill: true,
      tension: 0.3
    }]
  },
  options: { maintainAspectRatio: false, plugins: { legend: { display: false } } }
});

/* ---------- Table 1: programmes (with search) ---------- */
const progBody = document.getElementById("progBody");
const progSearch = document.getElementById("progSearch");

function renderProgrammes() {
  const q = progSearch.value.trim().toLowerCase();
  const rows = progRows.filter(p => p.name.toLowerCase().includes(q));
  progBody.innerHTML = rows.map(p => `
    <tr>
      <td>${p.id}</td><td>${p.name}</td>
      <td class="text-end">${p.placed}</td>
      <td class="text-end">${p.seeking}</td>
      <td class="text-end">${p.total}</td>
      <td class="text-end fw-semibold">${p.rate}%</td>
    </tr>`).join("") || '<tr><td colspan="6" class="text-center text-muted">No programme found.</td></tr>';
  document.getElementById("progCount").textContent = "Showing " + rows.length + " of " + progRows.length;
}
progSearch.addEventListener("input", renderProgrammes);
renderProgrammes();

/* ---------- Table 2: companies (with state filter) ---------- */
const compBody = document.getElementById("compBody");
const stateFilter = document.getElementById("stateFilter");

[...new Set(compRows.map(c => c.state))].sort().forEach(s => {
  stateFilter.innerHTML += `<option>${s}</option>`;
});

function renderCompanies() {
  const s = stateFilter.value;
  const rows = compRows.filter(c => s === "All" || c.state === s);
  compBody.innerHTML = rows.map(c => `
    <tr>
      <td>${c.id}</td><td>${c.name}</td><td>${c.sector}</td><td>${c.state}</td>
      <td class="text-end fw-semibold">${c.interns}</td><td>${c.since}</td>
    </tr>`).join("");
  document.getElementById("compCount").textContent = "Showing " + rows.length + " of " + compRows.length + " companies";
}
stateFilter.addEventListener("change", renderCompanies);
renderCompanies();