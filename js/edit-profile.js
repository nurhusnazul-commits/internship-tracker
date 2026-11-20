/* ===== edit-profile.js : edit personal details form ===== */

function fillForm() {
  $("fName").value = currentUser;
  $("fProgramme").value = PROGRAMME;
  $("fId").value = profile.studentId;
  $("fCampus").value = profile.campus;
  $("fEmail").value = profile.email;
  $("fPhone").value = profile.phone;
}

$("profileForm").addEventListener("submit", function (e) {
  e.preventDefault();
  hideError();

  const id = $("fId").value.trim();
  if (id && !/^[0-9]+$/.test(id)) {
    return showError("Student ID must contain digits only.");
  }

  Object.assign(profile, {
    studentId: id,
    campus: $("fCampus").value.trim(),
    email: $("fEmail").value.trim(),
    phone: $("fPhone").value.trim()
  });
  saveProfile(profile);
  showFlash();
});

fillForm();