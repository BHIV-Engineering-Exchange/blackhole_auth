# Repository Details — Nagar-Pranali

**Generated:** 2026-07-06

---

## Git Information

| Item | Value |
|------|-------|
| **Remote (origin)** | https://github.com/blackholeinfiverse64/Nagar-Pranali.git |
| **Default branch** | `main` |
| **Recent commits** | `95d1f8a` Allow production frontend domains in CORS |
| | `ab4cb94` Stop tracking node_modules and dist |
| | `f4b28ae` Fix Vercel build paths |

---

## Naming

| Context | Name |
|---------|------|
| GitHub repo | Nagar-Pranali |
| Product / UI | **UCCIS** — Unified Command & Control Intelligence System |
| UI title | "UCCIS Command Center" (`Header.jsx`) |
| MySQL database | `uccis` |
| Render service | `uccis-backend` (`render.yaml`) |

---

## Repository Layout

```
Nagar-Pranali/
├── Handover/                    # This handover package
├── UCCIS -Main/
│   ├── README.md                # Demo delivery spec
│   ├── DEPLOYMENT_GUIDE.md
│   ├── DEMO_REVIEW_PACKET.md
│   ├── backend/
│   │   ├── server.js            # Express entry
│   │   ├── package.json
│   │   ├── Procfile
│   │   ├── .env.example
│   │   ├── controllers/operationalController.js
│   │   ├── database/db.js, schema.sql, seed.sql
│   │   └── routes/              # signals, telemetry, incidents, etc.
│   └── frontend/
│       ├── src/App.jsx          # SPA + hardcoded sampleData
│       ├── src/pages/           # 9 view components
│       ├── src/services/api.js  # Axios client (unused)
│       └── vercel.json
├── render.yaml                  # Render backend blueprint
├── vercel.json                  # Root Vercel config
└── README.md                    # Title only
```

---

## Key Entry Points

| File | Role |
|------|------|
| `UCCIS -Main/backend/server.js` | Express app, CORS, route mounting |
| `UCCIS -Main/backend/controllers/operationalController.js` | Demo scenario chain |
| `UCCIS -Main/backend/routes/demo.js` | POST /api/demo/* scenarios |
| `UCCIS -Main/backend/database/schema.sql` | MySQL schema |
| `UCCIS -Main/frontend/src/App.jsx` | UI navigation + sample data |
| `render.yaml` | Render deploy config |
| `vercel.json` | Vercel deploy config |

---

## Dependencies

### Backend

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | HTTP server |
| mysql2 | ^3.22.5 | MySQL pool |
| cors | ^2.8.6 | CORS middleware |
| dotenv | ^17.4.2 | Env loading |

### Frontend

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.6 | UI |
| vite | ^8.0.12 | Build tool |
| axios | ^1.17.0 | HTTP client (unused in pages) |
| recharts | ^3.8.1 | Charts |
| react-router-dom | ^7.17.0 | **Installed but unused** |

---

## Scripts

| Command | Location | Action |
|---------|----------|--------|
| `npm start` | `backend/` | Start Express on PORT (5000) |
| `npm run dev` | `frontend/` | Vite dev server |
| `npm run build` | `frontend/` | Production build → `dist/` |
| `npm run lint` | `frontend/` | ESLint |

---

## External Services

| Service | Purpose | Config |
|---------|---------|--------|
| MySQL | Primary datastore | `DB_*` env vars |
| Render | Backend hosting | `render.yaml` |
| Vercel | Frontend hosting | `vercel.json` |

---

## Transfer Checklist (Access)

| System | Action |
|--------|--------|
| GitHub repo | Transfer admin |
| Render (`uccis-backend`) | Transfer + rotate DB creds |
| Vercel | Transfer + set `VITE_API_URL` |
| MySQL host | Transfer / rotate credentials |
