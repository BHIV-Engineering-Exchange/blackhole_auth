# Third-Party Services — Pradnya / NICAI

## Overview

Pradnya/NICAI uses **Render** (backend), **Vercel** (frontend), and optional BHIV ecosystem APIs (Samachar, Mitra, SVACS). No payment, email, or database SaaS in core path.

---

## Render

| Attribute | Value |
|-----------|-------|
| Purpose | Host FastAPI backend |
| Service name | `pradnya-api` |
| Config | `render.yaml` |
| Start command | `uvicorn main:app --host 0.0.0.0 --port $PORT` |
| Env vars | `ALLOWED_ORIGINS` (manual) |

**Production URL:** **TODO: Verify** — e.g. `https://pradnya-api.onrender.com`

---

## Vercel

| Attribute | Value |
|-----------|-------|
| Purpose | Host React frontend |
| Config | Root `vercel.json` |
| Build | `cd frontend && npm run build` |
| Output | `frontend/dist` |

**Known URL:** `https://pradnya-bhiv.vercel.app` (in backend CORS defaults)

**Required env:** `VITE_NICAI_API`, optional `VITE_SAMACHAR_API`, `VITE_MITRA_API`

---

## GitHub

| Attribute | Value |
|-----------|-------|
| Remote | https://github.com/blackholeinfiverse64/Pradnya.git |
| Branch | `main` |

Recent commits include Vercel deploy fixes and CORS update for production frontend.

---

## Samachar (optional)

| Attribute | Value |
|-----------|-------|
| Used by | React `App.jsx` pipeline tab |
| Endpoint | POST `{base}/api/samachar/process` |
| Config | `VITE_SAMACHAR_API` |
| Status | **TODO: Verify** URL and availability |

Text-in → structured event extraction for demo intelligence pipeline.

---

## Mitra (optional)

| Attribute | Value |
|-----------|-------|
| Used by | React pipeline (after Samachar) |
| Endpoint | POST `{base}/api/mitra/evaluate` |
| Config | `VITE_MITRA_API` |
| Status | **TODO: Verify** URL and availability |

Evaluates Samachar output — second stage of demo pipeline.

---

## SVACS (optional / scripts)

| Attribute | Value |
|-----------|-------|
| Used by | `svacs_adapter.py`, `pipeline.py`, `live_integration.py` |
| Integration | Not exposed via main FastAPI routes |
| Perception log | `http://localhost:8000/perception_log` in `live_integration.py` |
| Dataset id | `svacs` in `datasets.json` |

**TODO: Verify** — SVACS-Main repo relationship and production perception API URL.

---

## Python packages (PyPI)

From `requirements.txt`: fastapi, uvicorn, pandas, pydantic — public PyPI only.

`requests` used in scripts but not listed in requirements — add if deploying integration scripts.

---

## Optional internal modules

| Module | Status |
|--------|--------|
| `bucket_emitter` | Optional import — no-op if missing |
| `telemetry_emitter` | Optional import — no-op if missing |

---

## Accounts checklist

- [ ] GitHub `blackholeinfiverse64/Pradnya` access
- [ ] Render account — `pradnya-api` service
- [ ] Vercel account — Pradnya project
- [ ] **TODO: Verify** Samachar/Mitra service accounts
- [ ] **TODO: Verify** SVACS perception service access

---

## Cost notes

**TODO: Verify** — Render/Vercel tier costs. Free tier cold starts may affect demo UX.

---

## No third-party services used for

- Database hosting
- Authentication (Auth0, Firebase, etc.)
- Email/SMS
- Cloud storage (S3) — unless `bucket_emitter` configured externally (**TODO: Verify**)
