/* ===== nav.js : one shared sidebar menu for every page ===== */
(function () {
  const items = [
    ["Dashboard", "dashboard.html"],
    ["Applications", "applications.html"],
    ["Logbook", "logbook.html"],
    ["Attendance", "attendance.html"],
    ["Profile", "profile.html"],
    ["My Placement", "placement.html"],
    ["Insights", "directory.html"]
  ];

  // Sub-pages highlight their parent menu item
  const parent = {
    "edit-profile.html": "profile.html",
    "edit-placement.html": "placement.html",
    "home.html": ""
  };

  let page = location.pathname.split("/").pop() || "index.html";
  if (parent[page] !== undefined) page = parent[page];

  const links = items.map(function (item) {
    return '<li class="nav-item"><a class="nav-link' +
      (item[1] === page ? " active" : "") +
      '" href="' + item[1] + '">' + item[0] + "</a></li>";
  }).join("");

  const html =
    '<nav class="navbar navbar-expand-lg navbar-dark navbar-brand-custom">' +
      '<div class="container">' +
        '<a class="navbar-brand fw-bold" href="home.html">InternTrack</a>' +
        '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-label="Toggle menu">' +
          '<span class="navbar-toggler-icon"></span></button>' +
        '<div class="collapse navbar-collapse" id="navMenu">' +
          '<ul class="navbar-nav me-auto">' + links + "</ul>" +
          '<button class="btn btn-outline-light btn-sm" onclick="logout()">Logout</button>' +
        "</div>" +
      "</div>" +
    "</nav>";

  // Replace the old menu on the page (or the placeholder, if there is one)
  const holder = document.getElementById("site-nav") ||
                 document.querySelector("nav.navbar-brand-custom");
  if (holder) holder.outerHTML = html;
})();