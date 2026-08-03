# UCCIS (Nagar-Pranali) — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-06  
**Repository:** Nagar-Pranali  
**Product Name:** UCCIS — Unified Command & Control Intelligence System

---

## Product Overview

**Nagar-Pranali** hosts **UCCIS**, a runnable **operational demo** for civic/emergency command-center workflows. It demonstrates an end-to-end lifecycle:

**Signal → Telemetry → Incident → Escalation → Decision → Replay → Runtime Logs → Dashboard**

This is a demo delivery system — not a production-grade platform. Authentication is disabled by design.

---

## Purpose

Provide a demonstrable command center that:

- Runs five scenario types (Flood, Traffic, Medical, Power, Cyber) via demo API endpoints
- Persists lifecycle data in **MySQL**
- Displays a React dashboard with operational views
- Deploys backend to **Render** and frontend to **Vercel**

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 8, Axios, Recharts, react-icons |
| **Backend** | Node.js, Express 5.2, mysql2, cors, dotenv |
| **Database** | MySQL (`uccis` database) |
| **Deployment** | Render (backend), Vercel (frontend) |
| **Testing** | None (placeholder npm test script) |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | Nagar-Pranali |
| **App path** | `UCCIS -Main/` |
| **Remote URL** | https://github.com/blackholeinfiverse64/Nagar-Pranali.git |
| **Main Branch** | `main` |

---

## Production URLs

| Service | URL | Source |
|---------|-----|--------|
| Frontend (Vercel) | https://nagar-pranali.vercel.app | `backend/.env.example` |
| Frontend (custom) | https://nagar-pranali.blackholeinfiverse.app | `backend/.env.example` |
| Backend (Render) | https://nagar-pranali.onrender.com | `frontend/.env.example` |

> **TODO: Verify** all three are live and env vars configured.

---

## Build & Run

### Database

```bash
mysql -u root -p < "UCCIS -Main/backend/database/schema.sql"
mysql -u root -p uccis < "UCCIS -Main/backend/database/seed.sql"
```

### Backend

```bash
cd "UCCIS -Main/backend"
copy .env.example .env
npm install
npm start    # http://localhost:5000
```

### Frontend

```bash
cd "UCCIS -Main/frontend"
copy .env.example .env
npm install
npm run dev  # Vite dev server
```

---

## Application Views (SPA — no URL routing)

Navigation via sidebar state in `App.jsx`:

| View | Component |
|------|-----------|
| Dashboard | `pages/Dashboard.jsx` |
| Signals | `pages/Signals.jsx` |
| Telemetry | `pages/Telemetry.jsx` |
| Incidents | `pages/Incidents.jsx` |
| Escalations | `pages/Escalations.jsx` |
| Decisions | `pages/Decisions.jsx` |
| Replay Sessions | `pages/ReplaySessions.jsx` |
| Runtime Logs | `pages/RuntimeLogs.jsx` |
| Analytics | `pages/Analytics.jsx` |
| System Health | Inline in `App.jsx` |

> **Note:** UI currently renders **hardcoded sample data** — not live API data. See Known Issues.

---

## Handover Document Index

| # | Document | Purpose |
|---|----------|---------|
| 01 | README (this file) | Overview |
| 02 | Repository_Details | Git, structure |
| 03 | Deployment_Guide | Render + Vercel + MySQL |
| 04 | Architecture | Data flow |
| 05 | Environment_Guide | Env vars |
| 06 | API_Documentation | REST endpoints |
| 07 | Database_Details | MySQL schema |
| 08 | Folder_Structure | Directory map |
| 09 | Pending_Work | Incomplete items |
| 10 | Known_Issues | Bugs and gaps |
| 11 | Troubleshooting | Common fixes |
| 12 | REVIEW_PACKET | Quick review |
| 13 | Runtime_Evidence | Captures needed |
| 14 | Testing_Checklist | QA steps |
| 15 | Knowledge_Transfer | Onboarding |
| 16 | Ownership_Transfer | Access checklist |
| 17 | Deployment_Checklist | Release steps |
| 18 | Rollback_Guide | Rollback procedures |

---

## Critical Handover Notes

1. **Frontend disconnected from API** — `App.jsx` uses hardcoded data; `services/api.js` unused
2. **Schema/table name mismatches** — several routes query wrong table/column names vs `schema.sql`
3. **No authentication** — demo mode only
4. **README API docs outdated** — documents POST routes that don't exist; actual write path is `POST /api/demo/*`
5. **Health check does not ping DB** — `/health` always reports `"database": "CONNECTED"`

---

## Related In-Repo Documentation

| File | Topic |
|------|-------|
| `UCCIS -Main/README.md` | Demo spec (partially outdated) |
| `UCCIS -Main/DEPLOYMENT_GUIDE.md` | Basic deploy steps |
| `UCCIS -Main/DEMO_REVIEW_PACKET.md` | Demo review summary |
| `render.yaml` | Render blueprint |
| `vercel.json` | Vercel build config |
