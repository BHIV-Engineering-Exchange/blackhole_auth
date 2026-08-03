# Namami Gange — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-06  
**Repository:** Namami-Gange  
**Product Names:** Namami Gange Platform, NICAI, Ganga Basin Suitability Intelligence Engine

---

## Product Overview

**Namami-Gange** is an integrated demo repository for the **Namami Gange** sovereign operational intelligence platform. It combines a **Flask suitability intelligence backend** (NICAI) with a **Next.js command-center UI** to evaluate Ganga Basin locations for inland ports, seaplane zones, and hub-spoke logistics — with deterministic, audit-grade scoring and scenario simulation APIs.

---

## Purpose

Provide a platform that:

- Scores 6 reference Ganga Basin locations using rule-based models (`inland_port`, `seaplane`, `hub_spoke`)
- Exposes REST APIs with strict contract-compliant responses (trace, constraints, scoring_model)
- Runs scenario simulation (`POST /simulate`) and marine intelligence spine endpoints
- Displays operational dashboard UI with suitability data from backend
- Deploys backend to **Render** and frontend to **Vercel**

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5, CSS Modules |
| **Backend** | Python 3.11.9, Flask 3+, flask-cors, gunicorn |
| **Data** | Static CSV in `backend/data_raw/`; 6 hardcoded demo entities |
| **Scoring** | Deterministic rule-based (no ML — `ml_used: false`) |
| **Deployment** | Render (API), Vercel (UI) |
| **Testing** | 13 custom Python test scripts in `backend/tests/` |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | Namami-Gange |
| **Remote URL** | https://github.com/blackholeinfiverse64/Namami-Gange.git |
| **Main Branch** | `main` |
| **Backend path** | `backend/` |
| **Frontend path** | `frontend/` (npm package: `namami-gange-ui`) |

---

## Production URLs

| Service | URL | Source |
|---------|-----|--------|
| Backend (Render) | https://namami-gange-api.onrender.com | `DEPLOYMENT_GUIDE.md` — TODO: Verify |
| Frontend (Vercel) | https://namami-gange.vercel.app | `DEPLOYMENT_GUIDE.md` — TODO: Verify |

---

## Build & Run

### Backend

```bash
cd backend
pip install -r requirements.txt
cd src
python api.py    # http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev      # http://localhost:3000
```

Set `NEXT_PUBLIC_API_URL=http://localhost:5000` (`.env.local`).

---

## Application Views (Single Page — Tab Navigation)

| Tab | Component |
|-----|-----------|
| Global Operations | Dashboard (map, federation, replay) |
| Ganga Basin Intel | `BasinIntelligence.tsx` |
| Location Intel | `LocationIntel.tsx` |
| Scenario Simulation | `ScenarioSimulation.tsx` |
| Realtime Signals | `RealtimeSignals.tsx` |
| Infra Network | `InfraNetwork.tsx` |
| Collaboration | `Collaboration.tsx` |
| Governance View | `GovernanceView.tsx` |
| Dataset Management | `DatasetSources.tsx` |

Source: `frontend/src/app/page.tsx` — client-side tab state, no URL routes.

---

## Handover Document Index

| # | Document | Purpose |
|---|----------|---------|
| 01 | README (this file) | Overview |
| 02 | Repository_Details | Git, structure |
| 03 | Deployment_Guide | Render + Vercel |
| 04 | Architecture | Data flow, scoring |
| 05 | Environment_Guide | Env vars |
| 06 | API_Documentation | REST endpoints |
| 07 | Database_Details | CSV datasets, entities |
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

1. **Partial UI integration** — only `GET /results?model=inland_port` is wired; other views use static demo content
2. **No authentication** — open API with CORS only
3. **No `.env.example` at repo root** — env vars documented in `DEPLOYMENT_GUIDE.md`
4. **Infra containers referenced but not in repo** — Postgres, Redis, ng-core per `ng_data_inventory.csv`
5. **283 tests claimed** in review packets — TODO: Verify by running `backend/tests/` suite

---

## Related In-Repo Documentation

| File | Topic |
|------|-------|
| `DEPLOYMENT_GUIDE.md` | Render + Vercel deploy |
| `REVIEW_PACKET.md` | Integration status |
| `backend/docs/API_CONTRACT.md` | Authoritative API contract v2.1 |
| `backend/README.md` | Scoring engine overview |
| `backend/ng_data_inventory.csv` | Data inventory + known issues |
| `frontend/README.md` | UI setup |
