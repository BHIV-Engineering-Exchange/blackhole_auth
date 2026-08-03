# Architecture — Nagar-Pranali (UCCIS)

**Generated:** 2026-07-06

---

## High-Level Overview

```
┌──────────────────────────────────────────────────────────────┐
│              React SPA (Vite) — UCCIS Command Center          │
│  Sidebar navigation (state-based, no react-router)            │
│  Hardcoded sampleData in App.jsx (API client unused)          │
└────────────────────────────┬─────────────────────────────────┘
                             │ REST (intended; mostly unused by UI)
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    Express 5 Backend (:5000)                  │
│  CORS whitelist │ JSON body │ Route modules                   │
└────────────────────────────┬─────────────────────────────────┘
                             │ mysql2 connection pool
                             ▼
┌──────────────────────────────────────────────────────────────┐
│                    MySQL Database (uccis)                       │
│  signals → telemetry → incidents → escalations → decisions    │
│  → replay_records → runtime_logs                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Operational Lifecycle

Each demo scenario runs a **nested callback chain** in `operationalController.js`:

```
1. INSERT signals
2. INSERT telemetry (linked by signal_id)
3. INSERT incidents
4. INSERT escalations
5. INSERT decisions
6. INSERT replay_records (JSON timeline)
7. INSERT runtime_logs
8. Return JSON with all generated IDs
```

Triggered by `POST /api/demo/{scenario}`.

---

## Backend Structure

| Module | Path | Purpose |
|--------|------|---------|
| Entry | `server.js` | App setup, CORS, inline routes |
| DB pool | `database/db.js` | mysql2 pool + SSL option |
| Demo chain | `controllers/operationalController.js` | Scenario orchestration |
| Routes | `routes/*.js` | CRUD read endpoints + demo |

### Route mounting (`server.js`)

| Prefix | File |
|--------|------|
| `/api/signals` | `routes/signals.js` |
| `/api/telemetry` | `routes/telemetry.js` |
| `/api/incidents` | `routes/incidents.js` |
| `/api/escalations` | `routes/escalations.js` |
| `/api/decisions` | `routes/decisions.js` |
| `/api/replay` | `routes/replay.js` |
| `/api/runtime` | `routes/runtime.js` |
| `/api/demo` | `routes/demo.js` |

### Inline routes (`server.js`)

| Path | Purpose |
|------|---------|
| `/` | System status |
| `/health` | Health check (Render) |
| `/api/dashboard` | Table count summary |
| `/api/demo-status` | Demo metadata |
| `/api/latest-signals` | Last 20 signals |
| `/api/latest-incidents` | Last 20 incidents |
| `/api/latest-runtime` | Last 20 runtime logs |

---

## Frontend Structure

| Layer | Files | Notes |
|-------|-------|-------|
| Shell | `App.jsx`, `Sidebar.jsx`, `Header.jsx` | State-based nav |
| Pages | `pages/*.jsx` | 9 operational views |
| Charts | `components/*Chart*.jsx` | Recharts visualizations |
| API | `services/api.js` | Axios instance — **not imported by pages** |

Navigation: `activePage` state string (e.g. `"Dashboard"`, `"Signals"`) — no URL paths.

---

## Auth Architecture

**None.** Demo mode by design.

CORS is the only access control:
- `FRONTEND_URL` comma-separated list
- Regex allow: `*.vercel.app`, `*.blackholeinfiverse.app`, `localhost:*`
- Requests with no `Origin` header allowed

---

## Data Flow (Intended vs Actual)

| Layer | Intended | Actual (2026-07-06) |
|-------|----------|----------------------|
| Demo trigger | POST `/api/demo/*` → MySQL | ✅ Works (operationalController) |
| Dashboard UI | Fetch from API | ❌ Hardcoded `sampleData` in App.jsx |
| Read APIs | GET `/api/signals`, etc. | ⚠️ Partial — schema mismatches on some routes |
| Dashboard summary | GET `/api/dashboard` | ⚠️ Queries wrong table names |

---

## Scenario Types

| Endpoint | Scenario |
|----------|----------|
| `POST /api/demo/flood` | Flood Emergency |
| `POST /api/demo/traffic` | Traffic Incident |
| `POST /api/demo/medical` | Medical Emergency |
| `POST /api/demo/power` | Power Failure |
| `POST /api/demo/cyber` | Cyber Incident |

---

## Deployment Topology

| Component | Host | Config |
|-----------|------|--------|
| Frontend | Vercel | Root `vercel.json` |
| Backend | Render | `render.yaml` |
| Database | External MySQL | Env vars on Render |

---

## Known Architectural Gaps

1. Frontend-backend disconnect (static UI)
2. Schema drift between routes and `schema.sql`
3. Health endpoint does not verify DB connectivity
4. No WebSocket/real-time sync
5. No multi-user concurrency handling
