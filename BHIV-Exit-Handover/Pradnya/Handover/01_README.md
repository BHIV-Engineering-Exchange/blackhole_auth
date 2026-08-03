# Pradnya — Exit Handover Package

**Repository:** `Pradnya`  
**Remote:** https://github.com/blackholeinfiverse64/Pradnya.git  
**Branch:** `main`  
**Prepared:** July 2026  
**Handover owner:** Nikhil Pawar (exit documentation)

---

## Product identity

| Context | Name |
|---------|------|
| Repository / folder | **Pradnya** |
| Product | **NICAI** — Networked Intelligence & Context Analysis Interface |
| npm package (frontend) | `nicai-demo-ui` |
| Render service | `pradnya-api` |
| Known frontend URL | `https://pradnya-bhiv.vercel.app` (from backend CORS defaults) |

**Purpose:** Deterministic intelligence system that converts environmental datasets (weather, AQI) and optional SVACS acoustic signals into structured, explainable, traceable outputs — with validation, rule-based analysis (Sanskar engine), pattern detection, dashboard UI, and simulated actions (TANTRA compliant — no execution).

---

## What is in this folder

| File | Purpose |
|------|---------|
| `01_README.md` | This index and quick orientation |
| `02_Project_Overview.md` | Product scope, architecture, pipeline |
| `03_Tech_Stack.md` | Languages, frameworks, dependencies |
| `04_Repository_Structure.md` | Folder map and key files |
| `05_Environment_Setup.md` | Local install and run |
| `06_Deployment_Guide.md` | Render + Vercel deployment |
| `07_API_Reference.md` | REST contracts |
| `08_Database_Schema.md` | Data files, logs, registries (no SQL DB) |
| `09_Frontend_Guide.md` | React SPA, mock vs live data |
| `10_Backend_Guide.md` | FastAPI pipeline modules |
| `11_Authentication_And_Security.md` | Auth status and risks |
| `12_Known_Issues_And_TODOs.md` | Gaps, bugs, verify items |
| `13_Testing_Guide.md` | Manual and script-based tests |
| `14_Operations_Runbook.md` | Day-2 ops, health, restart |
| `15_Third_Party_Services.md` | Render, Vercel, optional Samachar/Mitra |
| `16_Change_Log_Summary.md` | Git history summary |
| `17_Handover_Checklist.md` | Sign-off checklist |
| `18_Rollback_Guide.md` | Rollback / recovery steps |

**Subfolders:** `review_packets/`, `code_packets/`, `Screenshots/`, `Videos/` — placeholders for review assets.

---

## Quick start (local)

```bash
# Terminal 1 — Backend (port 8000)
cd Pradnya
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000

# Terminal 2 — Frontend (port 5173)
cd Pradnya/frontend
cp .env.example .env.local
# Edit .env.local: VITE_NICAI_API=http://127.0.0.1:8000
npm install
npm run dev
```

**Alternative demo runner (loads data + starts server):**

```bash
cd Pradnya
python run_demo_full.py
```

Open:
- React UI: http://localhost:5173
- Built-in HTML dashboard: http://127.0.0.1:8000/dashboard
- Health: http://127.0.0.1:8000/health

---

## Critical handover notes

1. **Naming:** Repo is **Pradnya**; product is **NICAI** — document both when searching.
2. **No database:** CSV datasets + JSON log files on disk; no MongoDB/PostgreSQL.
3. **Dual UI:** FastAPI serves inline HTML `/dashboard`; React app in `frontend/` is the primary demo UI on Vercel.
4. **Mock + live mix:** React `App.jsx` falls back to hardcoded demo data if `VITE_NICAI_API` is unset or unreachable.
5. **Two Sanskar engines:** `sanskar_engine.py` (weather/AQI thresholds) vs `sanskar_simple.py` (SVACS acoustic confidence).
6. **TANTRA compliance:** Actions are logged only — no automated execution.
7. **Production backend URL:** **TODO: Verify** Render URL for `pradnya-api` and set `VITE_NICAI_API` in Vercel env.

---

## Related BHIV products

| Product | Relationship |
|---------|--------------|
| SVACS | Acoustic perception events via `svacs_adapter.py`, `pipeline.py`, `live_integration.py` |
| Samachar / Mitra | Optional text pipeline in React UI (`/api/samachar/process`, `/api/mitra/evaluate`) |
| Namami-Gange | Separate NICAI-branded repo; similar deterministic intelligence concept |

---

## Contact / escalation

**TODO: Verify** — product owner, on-call, and production Render API URL.
