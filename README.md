# InternTrack - Internship Management System

## Project Description
InternTrack is a front-end web application prototype that helps students manage their industrial training journey: tracking internship applications and approval status, writing daily logbook entries, clocking in and out, and viewing their placement details. It was built for **IMS566 Advanced Web Design Development and Content Management (Individual Project)**.

- **Student:** [Your Full Name] ([Your Student ID])
- **Programme:** Bachelor of Information Science (Hons.) Information Systems Management
- **Live website:** [paste GitHub Pages link here]
- **Repository:** [paste GitHub repository link here]

## Features
- **Authentication:** login and register pages, a generic error message that does not reveal whether the username or password was wrong, a 30-second lock after 3 failed attempts, and passwords stored as SHA-256 hashes (simulated, not for real security)
- **Responsive navigation:** one consistent navbar on every page with a mobile hamburger menu, plus logout
- **Dashboard:** summary cards and two charts (application status doughnut, logbook hours per week bar), with friendly empty states for new accounts
- **Applications:** table with colour-coded status badges and an add form
- **Logbook:** daily task entries with hours and supervisor approval status
- **Attendance:** live clock, clock in/out buttons and calculated hours
- **Profile:** student summary card, with a separate page to edit personal details
- **My Placement:** company chosen from approved applications, supervisors, duration and a training-hours progress bar
- **Insights:** interactive Chart.js charts (toggle Total / Placed / Still seeking), searchable programme table and filterable company table
- **Content management:** structured sections, page titles, meta descriptions, a consistent footer and a clear folder structure

## How to Test Login
| Field | Value |
|---|---|
| Username | `intern` |
| Password | `intern123` |

You can also click **Create an account**. Use your full name as the username; a new account starts empty. The `intern` demo account comes with sample data.

Accounts and data are saved in the browser (localStorage), so they stay after a refresh but are separate for each browser. There is no server or database.

## Frameworks and Libraries Used
- Bootstrap 5.3 (layout, navbar, components, responsive grid)
- Chart.js 4.4 (data visualisation)
- Google Fonts: Poppins
- HTML5, CSS3 and vanilla JavaScript

## Code Organisation
The structure follows the MVC idea taught in class (CakePHP): data (model), HTML pages (view) and one JavaScript file per page (controller). Data records use auto-incrementing `id` values, similar to database rows.

```
internship-tracker/
├── index.html            (login and register)
├── dashboard.html
├── applications.html
├── logbook.html
├── attendance.html
├── profile.html
├── edit-profile.html
├── placement.html
├── directory.html        (Insights)
├── css/style.css
└── js/                   (auth, data, profile-store, charts, one file per page)
```

## Notes and Credits
- All data is **sample data** created for this assignment, and nothing is connected to a real database.
- The Insights page layout is inspired by the UiTM Facts page (https://uitm.edu.my/en/discover-uitm/uitm-facts); the data itself is not copied.
- The profile and placement idea is inspired by the concept of the UiTM Industrial Training Management System (ITMS).