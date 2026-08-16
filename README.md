# HOCC frontend-only demo

This folder is self-contained and does not require the backend or a database.

Run `npm start`, then open `http://localhost:4173`.

All ten test users are stored in `src/services/api.js` and use the password `HoccTest@2026!`. Authentication and demo changes use browser `localStorage`; this mode is for local testing only and must not be used for production secrets.

## Frontend structure

```text
frontend/
|-- index.html                  # Static HTML shell
|-- package.json                # Local run and validation commands
|-- server.mjs                  # Dependency-free development server
`-- src/
    |-- app.js                  # Minimal browser entry point
    |-- core/
    |   `-- application.js      # Application state, screens and event orchestration
    |-- pages/
    |   |-- patient-flow.js     # OPD, patient, lab, pharmacy and billing pages
    |   |-- ipd-clinical.js     # IPD, nursing, discharge, OT and mortuary pages
    |   |-- administration.js   # Hospital, users, setup and governance pages
    |   |-- operations.js       # Tasks, alerts, reports, uploads and records
    |   `-- platform.js         # Subscription, module, product and profile pages
    |-- config/
    |   `-- app-config.js       # Role labels, presets and UI configuration
    |-- lib/
    |   `-- rbac.js             # Role and permission rules
    |-- routing/
    |   `-- router.js           # Hash parsing and navigation
    |-- services/
    |   `-- api.js              # Local authentication, persistence and API adapter
    |-- ui/
    |   `-- primitives.js       # Reusable badges, empty states and form helpers
    |-- utils/
    |   `-- formatters.js       # Dates, currency, values and billing calculations
    |-- sentry.js               # Optional browser monitoring
    `-- styles.css               # Application styles
```

`core/application.js` is the composition root for live UI state, rendering lifecycle, shared components, and event orchestration. Feature page renderers live under `pages/`; new pages should be added to their matching feature module rather than the controller.
