/* ===== profile.js : profile summary card (view only) ===== */

function render() {
  $("avatar").textContent = initials(currentUser);
  setText("pName", currentUser);
  setText("pProgramme", PROGRAMME);
  setText("pId", profile.studentId);
  setText("pCampus", profile.campus);

  const app = approvedApps().find(a => a.id === profile.placementAppId);
  setText("pPlace", app ? app.company : "");

  $("sApps").textContent = applications.length;
  $("sApproved").textContent = approvedApps().length;
  $("sHours").textContent = logbook.reduce((s, l) => s + l.hours, 0);
}

render();