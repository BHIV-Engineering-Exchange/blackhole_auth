# Folder Structure — Nagar-Pranali

**Generated:** 2026-07-06

---

## Root Directory

```
Nagar-Pranali/
├── Handover/                 # Exit handover docs (this package)
├── UCCIS -Main/              # Application root
├── render.yaml               # Render backend blueprint
├── vercel.json               # Vercel frontend config
├── .gitignore
└── README.md                 # "# Nagar-Pranali" only
```

---

## `UCCIS -Main/`

```
UCCIS -Main/
├── README.md                 # Demo spec (API section outdated)
├── DEPLOYMENT_GUIDE.md       # Basic deploy steps
├── DEMO_REVIEW_PACKET.md     # Demo review summary
├── backend/
│   ├── server.js             # Express entry
│   ├── package.json
│   ├── Procfile
│   ├── .env.example
│   ├── controllers/
│   │   └── operationalController.js   # Demo scenario chain
│   ├── database/
│   │   ├── db.js             # mysql2 pool
│   │   ├── schema.sql        # Canonical schema
│   │   └── seed.sql
│   └── routes/
│       ├── signals.js
│       ├── telemetry.js
│       ├── incidents.js
│       ├── escalations.js
│       ├── decisions.js
│       ├── replay.js
│       ├── runtime.js
│       └── demo.js           # POST scenario triggers
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── vercel.json
    ├── package.json
    ├── .env.example
    ├── public/               # favicon.svg, icons.svg
    └── src/
        ├── App.jsx           # Main app + sampleData
        ├── main.jsx
        ├── index.css
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── Header.jsx
        │   └── (charts, viewers)
        ├── pages/
        │   ├── Dashboard.jsx
        │   ├── Signals.jsx
        │   ├── Telemetry.jsx
        │   ├── Incidents.jsx
        │   ├── Escalations.jsx
        │   ├── Decisions.jsx
        │   ├── ReplaySessions.jsx
        │   ├── RuntimeLogs.jsx
        │   └── Analytics.jsx
        └── services/
            └── api.js        # Axios client (unused)
```

---

## Key Files by Role

| Role | Path |
|------|------|
| Backend entry | `UCCIS -Main/backend/server.js` |
| Demo orchestration | `UCCIS -Main/backend/controllers/operationalController.js` |
| DB schema | `UCCIS -Main/backend/database/schema.sql` |
| Frontend entry | `UCCIS -Main/frontend/src/main.jsx` |
| UI + navigation | `UCCIS -Main/frontend/src/App.jsx` |
| Render deploy | `render.yaml` |
| Vercel deploy | `vercel.json` |

---

## Documentation Map

| File | Content |
|------|---------|
| `UCCIS -Main/README.md` | Demo objectives, flow (API list outdated) |
| `UCCIS -Main/DEPLOYMENT_GUIDE.md` | npm start, MySQL import |
| `UCCIS -Main/DEMO_REVIEW_PACKET.md` | What works / mocked |
| `Handover/` | Structured exit handover (18 docs) |

---

## Unused / Legacy

| Item | Note |
|------|------|
| `react-router-dom` | In package.json, not used |
| `services/api.js` | Defined, not imported |
| `frontend/vercel.json` | SPA rewrites only; root `vercel.json` is primary |
| `Procfile` | Heroku-style; Render uses `render.yaml` |

---

## Path Quirk

Folder name contains a space: `UCCIS -Main`. Quote paths in shell commands:

```bash
cd "UCCIS -Main/backend"
```

Vercel and Render configs reference this path explicitly.
