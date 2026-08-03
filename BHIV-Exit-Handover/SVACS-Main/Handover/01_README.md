# SVACS-Main — Exit Handover Package

**Repository:** `SVACS-Main`  
**Remote:** https://github.com/blackholeinfiverse64/SVACS-Main.git  
**Branch:** `main`  
**Prepared:** July 2026  
**Handover owner:** Nikhil Pawar (exit documentation — dashboard cognition architecture per README team table)

---

## Product identity

| Context | Name |
|---------|------|
| Repository / folder | **SVACS-Main** |
| Product | **SVACS Unified Core** — deterministic maritime intelligence execution substrate |
| npm package | `svacs-dashboard` |
| Render service | `svacs-backend` (Flask dashboard API) |

**Purpose:** Replay-safe maritime intelligence platform — signal → noise → AIS → geo → Jane's enrichment → perception → intelligence → state → bucket → replay → observability → dashboard. Supports vessel classification, sensor fusion, provenance/lineage, governance-aware orchestration, and operator-facing React command dashboard.

---

## What is in this folder

| File | Purpose |
|------|---------|
| `01_README.md` through `18_Rollback_Guide.md` | Full handover documentation set |
| `review_packets/` | Stakeholder review index |
| `code_packets/` | Critical code path index |
| `Screenshots/` | Capture placeholders |
| `Videos/` | Walkthrough placeholders |

---

## Quick start (local)

```bash
# Terminal 1 — Flask dashboard API (Render-aligned, port 5000)
cd SVACS-Main
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
python dashboard/app.py

# Terminal 2 — React dashboard (port 5173)
npm install
# Create .env.local — see 05_Environment_Setup.md
npm run dev

# Optional — FastAPI runtime API (NOT Render default, port 8000)
uvicorn main:app --reload --port 8000

# Optional — full operational chain + bucket upload
python full_operational_chain.py
```

Open http://localhost:5173 — React command dashboard.

---

## Critical handover notes

1. **Two Python APIs:** Render deploys **Flask** `dashboard/app.py`; **FastAPI** `main.py` exists locally but is **not** the Render start command.
2. **Frontend mock by default:** `src/env.ts` defaults `useMock=true`; `RealAdapter` extends `MockAdapter` with **no HTTP overrides** — live API wiring incomplete.
3. **No database:** JSON/JSONL artifacts under `storage/`, `runtime/`, `logs/`.
4. **Monorepo layout:** React app at repo root (`src/`), not a `frontend/` subfolder.
5. **NICAI integration:** Pradnya `svacs_adapter.py` consumes SVACS-style perception events — separate repo.
6. **External bucket:** `full_operational_chain.py` posts to `bhiv-bucket.onrender.com`.
7. **Production URLs:** **TODO: Verify** Render backend URL and Vercel frontend URL.

---

## Pipeline (locked)

```
SIGNAL → NOISE → AIS → GEO → JANE'S → PERCEPTION → INTELLIGENCE → STATE → BUCKET → REPLAY → OBSERVABILITY → DASHBOARD
```

---

## Related BHIV products

| Product | Relationship |
|---------|--------------|
| Pradnya (NICAI) | `svacs_adapter.py`, `live_integration.py` — acoustic/perception → NICAI signals |
| bhiv-bucket | Append-only artifact persistence (Render URL in chain script) |
| PARIKSHAN / NIYANTRAN | Separate ops dashboard product |

---

## Contact / escalation

**TODO: Verify** — product owner, Render/Vercel admins, Bucket team contact.
