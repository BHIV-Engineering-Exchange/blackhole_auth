# Code Packet Index — Nagar-Pranali

**Generated:** 2026-07-06

---

## Tier 1 — Must Read

| File | Purpose |
|------|---------|
| `UCCIS -Main/backend/server.js` | Express entry, CORS, routes |
| `UCCIS -Main/backend/controllers/operationalController.js` | Demo lifecycle chain |
| `UCCIS -Main/backend/database/schema.sql` | Canonical MySQL schema |
| `UCCIS -Main/backend/routes/demo.js` | Scenario POST endpoints |
| `UCCIS -Main/frontend/src/App.jsx` | UI + hardcoded sampleData |
| `render.yaml` | Render deploy |
| `vercel.json` | Vercel deploy |

---

## Tier 2 — Backend Routes

| File | Endpoints | Notes |
|------|-----------|-------|
| `routes/signals.js` | GET `/api/signals` | ⚠️ signal_id column bug |
| `routes/telemetry.js` | GET `/api/telemetry` | ⚠️ wrong table name |
| `routes/incidents.js` | GET `/api/incidents` | |
| `routes/escalations.js` | GET `/api/escalations` | |
| `routes/decisions.js` | GET `/api/decisions` | |
| `routes/replay.js` | GET `/api/replay` | |
| `routes/runtime.js` | GET `/api/runtime` | |

---

## Tier 3 — Frontend Pages

| File | View |
|------|------|
| `pages/Dashboard.jsx` | Dashboard |
| `pages/Signals.jsx` | Signals |
| `pages/Telemetry.jsx` | Telemetry |
| `pages/Incidents.jsx` | Incidents |
| `pages/Escalations.jsx` | Escalations |
| `pages/Decisions.jsx` | Decisions |
| `pages/ReplaySessions.jsx` | Replay |
| `pages/RuntimeLogs.jsx` | Runtime Logs |
| `pages/Analytics.jsx` | Analytics |

---

## Tier 4 — Config & Deploy

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend env template |
| `frontend/.env.example` | Frontend env template |
| `backend/database/db.js` | mysql2 pool |
| `backend/database/seed.sql` | Initial seed |
| `frontend/vite.config.js` | Vite config |
| `frontend/services/api.js` | Axios (unused) |

---

## Tier 5 — Documentation

| File | Topic |
|------|-------|
| `UCCIS -Main/README.md` | Demo spec (API section outdated) |
| `UCCIS -Main/DEPLOYMENT_GUIDE.md` | Basic deploy |
| `UCCIS -Main/DEMO_REVIEW_PACKET.md` | Demo review |

---

## Reading Order

```
Day 1: schema.sql → operationalController.js → demo.js → POST flood via curl
Day 2: server.js → all route files → identify schema mismatches
Day 3: App.jsx → all pages → plan API wiring
Day 4: render.yaml + vercel.json → production deploy verify
```
