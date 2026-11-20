/* ===== attendance.js : clock in / clock out ===== */

const attBody = document.getElementById("attBody");
const btnIn = document.getElementById("btnIn");
const btnOut = document.getElementById("btnOut");
const statusText = document.getElementById("clockStatus");

// Live clock
function updateClock() {
  document.getElementById("liveClock").textContent =
    new Date().toLocaleTimeString("en-GB");
}
setInterval(updateClock, 1000);
updateClock();

// Helpers
function nowHHMM() {
  return new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}
function calcHours(inT, outT) {
  if (!outT) return "-";
  const [h1, m1] = inT.split(":").map(Number);
  const [h2, m2] = outT.split(":").map(Number);
  return ((h2 * 60 + m2 - (h1 * 60 + m1)) / 60).toFixed(1) + " h";
}

function renderAttendance() {
  attBody.innerHTML = "";
  attendance.forEach(a => {
    attBody.innerHTML += `
      <tr>
        <td>${a.date}</td>
        <td>${a.clockIn}</td>
        <td>${a.clockOut || '<span class="badge bg-warning text-dark">Working...</span>'}</td>
        <td>${calcHours(a.clockIn, a.clockOut)}</td>
      </tr>`;
  });
}

btnIn.addEventListener("click", function () {
  const today = new Date().toISOString().slice(0, 10);
  attendance.push({ date: today, clockIn: nowHHMM(), clockOut: "" });
  btnIn.disabled = true;
  btnOut.disabled = false;
  statusText.textContent = "You are clocked in. Have a productive day!";
  renderAttendance();
});

btnOut.addEventListener("click", function () {
  attendance[attendance.length - 1].clockOut = nowHHMM();
  btnOut.disabled = true;
  btnIn.disabled = false;
  statusText.textContent = "You have clocked out. See you tomorrow!";
  renderAttendance();
});
// Restore button state after a refresh
const lastRecord = attendance[attendance.length - 1];
if (lastRecord && !lastRecord.clockOut) {
  btnIn.disabled = true;
  btnOut.disabled = false;
  statusText.textContent = "You are clocked in. Have a productive day!";
}
renderAttendance();