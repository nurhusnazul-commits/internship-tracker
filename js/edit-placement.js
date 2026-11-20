/* ===== edit-placement.js : edit placement form ===== */

function fillForm() {
  $("fStart").value = profile.startDate;
  $("fEnd").value = profile.endDate;
  $("fTarget").value = profile.targetHours;
  $("fSup").value = profile.supervisor;
  $("fSupEmail").value = profile.supervisorEmail;
  $("fSupPhone").value = profile.supervisorPhone;
  $("fFacSup").value = profile.facultySupervisor;

  // Dropdown: approved applications only
  const select = $("fPlacement");
  select.innerHTML = "";
  const blank = document.createElement("option");
  blank.value = "";
  blank.textContent = "-- Select company --";
  select.appendChild(blank);

  approvedApps().forEach(a => {
    const opt = document.createElement("option");
    opt.value = a.id;
    opt.textContent = a.company + " - " + a.position;
    if (a.id === profile.placementAppId) opt.selected = true;
    select.appendChild(opt);
  });

  $("placementHint").innerHTML = approvedApps().length === 0
    ? 'No approved application yet. Add one in <a href="applications.html">Applications</a> with status Approved.'
    : "Only companies that approved your application are listed.";
}

$("placementForm").addEventListener("submit", function (e) {
  e.preventDefault();
  hideError();

  const start = $("fStart").value;
  const end = $("fEnd").value;
  if (start && end && end < start) {
    return showError("End date cannot be before the start date.");
  }

  Object.assign(profile, {
    placementAppId: $("fPlacement").value ? Number($("fPlacement").value) : null,
    startDate: start,
    endDate: end,
    targetHours: Math.min(2000, Math.max(1, Number($("fTarget").value) || 240)),
    supervisor: $("fSup").value.trim(),
    supervisorEmail: $("fSupEmail").value.trim(),
    supervisorPhone: $("fSupPhone").value.trim(),
    facultySupervisor: $("fFacSup").value.trim()
  });
  saveProfile(profile);
  showFlash();
});

fillForm();