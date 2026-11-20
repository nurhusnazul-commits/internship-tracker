/* ===== placement.js : placement summary (view only) ===== */

function placementStatus(app) {
  if (!app) return ["No placement yet", "bg-secondary"];
  const today = new Date().toISOString().slice(0, 10);
  if (profile.startDate && today < profile.startDate) return ["Upcoming", "bg-info text-dark"];
  if (profile.endDate && today > profile.endDate) return ["Completed", "bg-success"];
  if (profile.startDate) return ["Ongoing", "bg-primary"];
  return ["Placed", "bg-primary"];
}

function render() {
  // The company must still be an approved application
  const app = approvedApps().find(a => a.id === profile.placementAppId) || null;

  const [label, cls] = placementStatus(app);
  $("pStatus").textContent = label;
  $("pStatus").className = "badge " + cls;

  setText("pCompany", app ? app.company : "");
  setText("pPosition", app ? app.position : "");
  setText("pDuration", profile.startDate && profile.endDate
    ? profile.startDate + "  to  " + profile.endDate : "");
  setText("pSup", profile.supervisor);
  setText("pSupEmail", profile.supervisorEmail);
  setText("pSupPhone", profile.supervisorPhone);
  setText("pFacSup", profile.facultySupervisor);

  // Hours progress
  const total = logbook.reduce((s, l) => s + l.hours, 0);
  const approved = logbook.filter(l => l.status === "Approved").reduce((s, l) => s + l.hours, 0);
  const target = Number(profile.targetHours) || 240;
  const approvedPct = Math.min(100, approved / target * 100);
  const pendingPct = Math.min(100 - approvedPct, (total - approved) / target * 100);
  $("barApproved").style.width = approvedPct + "%";
  $("barPending").style.width = pendingPct + "%";
  $("hoursText").textContent = total + " / " + target + " hours (" +
    Math.min(100, Math.round(total / target * 100)) + "%)";
}

render();