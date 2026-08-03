# Knowledge Transfer — Nagar-Pranali

**Generated:** 2026-07-06

---

## What This Product Does

**UCCIS** (in repo **Nagar-Pranali**) is a **demo command center** for civic/emergency operational workflows. It demonstrates how signals flow through telemetry, incidents, escalations, decisions, replay, and runtime logging — visualized in a React dashboard.

**Mode:** Demo delivery sprint — explicitly not a prototype or design exercise.

---

## Key Concepts

### Operational Chain

Every scenario follows the same 7-step lifecycle:

1. Signal Created  
2. Telemetry Captured  
3. Incident Generated  
4. Escalation Triggered  
5. Decision Generated  
6. Replay Generated  
7. Runtime Log Updated  

### Scenario Types

Flood, Traffic, Medical, Power, Cyber — each triggered by `POST /api/demo/{name}`.

### Demo vs Production

| Aspect | Current state |
|--------|---------------|
| Backend + MySQL | Functional for demo chain |
| Read APIs | Partially broken (schema drift) |
| Frontend | Static mock data |
| Auth | Disabled |
| Real-time | No WebSocket |

---

## Code Walkthrough (30 min)

### 1. Backend (15 min)

- `server.js` — CORS, route mounting, inline endpoints
- `routes/demo.js` — scenario POST handlers
- `operationalController.js` — nested INSERT chain
- `database/schema.sql` — canonical table definitions
- `database/db.js` — mysql2 pool

### 2. Frontend (10 min)

- `App.jsx` — sidebar state, `sampleData`, page switching
- `pages/Dashboard.jsx` — summary cards
- `components/Sidebar.jsx` — navigation items
- `services/api.js` — ready but unused

### 3. Deploy (5 min)

- `render.yaml` — backend on Render
- `vercel.json` — frontend build paths

---

## Common Maintainer Tasks

### Run locally

```bash
# MySQL setup, then:
cd "UCCIS -Main/backend" && npm start
cd "UCCIS -Main/frontend" && npm run dev
```

### Trigger a demo scenario

```bash
curl -X POST http://localhost:5000/api/demo/flood
```

### Check database

```sql
USE uccis;
SELECT * FROM signals ORDER BY id DESC LIMIT 5;
```

### Deploy update

1. Push to `main`
2. Render auto-deploys backend
3. Vercel auto-deploys frontend
4. Verify health + demo POST

### Fix schema mismatches

Edit SQL strings in affected route files to match `schema.sql`. See `10_Known_Issues.md`.

---

## First Week Plan

| Day | Focus |
|-----|-------|
| 1 | Local setup, schema import, demo POST chain |
| 2 | Fix SQL mismatches in routes |
| 3 | Wire frontend to API |
| 4 | Production verification (Render + Vercel + MySQL) |
| 5 | Update docs, add basic integration test |

---

## Questions for Outgoing Team

1. Which MySQL host is used in production Render?
2. Are production URLs live and tested?
3. Is frontend wiring to API planned or intentionally static for demo?
4. Will auth be added post-demo?
5. Is `nagar-pranali.blackholeinfiverse.app` DNS configured?

---

## Related BHIV Context

UCCIS is a standalone demo in the Nagar-Pranali repo — separate from Sampada (Infiverse-HR), SETU, and other BHIV products. No cross-repo integration documented.
