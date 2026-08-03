# Repository Details — hackaverse

**Generated:** 2026-07-05

---

## Repository Name

**hackaverse** (product: **HackaVerse** / HackaAIverse)

---

## Repository Purpose

AI-powered hackathon management platform with participant teams, submissions, Groq-based judging, leaderboards, admin dashboard, and judge review workflows.

---

## Repository URL

| Type | URL |
|------|-----|
| **Git Remote** | https://github.com/blackholeinfiverse64/hackaverse.git |
| **Frontend (production)** | https://hackaverse-mu.vercel.app |
| **Backend API (production)** | https://hackaverse.blackholeinfiverse.com/api/v1 |
| **Swagger** | https://hackaverse.blackholeinfiverse.com/docs |

> TODO: Verify canonical backend URL — `DEPLOYMENT_NOTES.md` also references `ai-agent-x2iw.onrender.com`.

---

## Main Branch

`main` (tracks `origin/main`)

---

## Directory Layout

| Path | Purpose |
|------|---------|
| `hackathon/` | FastAPI backend (Render root) |
| `hackaverse-frontend/` | React SPA (Vercel root) |
| `docs/` | Ecosystem flow diagrams |
| `review_packets/` | Existing review packet |
| `Hackaverse/` | Duplicate doc copies |
| `Handover/` | This exit handover package |

---

## Build Commands

| Component | Command | Location |
|-----------|---------|----------|
| Backend | `pip install -r requirements.txt` | `hackathon/` |
| Frontend | `npm run build` | `hackaverse-frontend/` |
| Backend tests | `pytest` | `hackathon/tests/` |
| Frontend tests | `npm test` (vitest) | `hackaverse-frontend/` |

---

## Run Commands

| Component | Command | Port |
|-----------|---------|------|
| Backend (dev) | `uvicorn src.main:app --reload --port 8000` | 8000 |
| Backend (Render) | `uvicorn src.main:app --host 0.0.0.0 --port $PORT` | `$PORT` |
| Frontend (dev) | `npm run dev` | 3000 |
| Frontend (alt) | `npm run dev:3001` | 3001 |

---

## Dependencies

### Backend (`hackathon/requirements.txt`)
fastapi, uvicorn, pymongo, groq, bcrypt, PyJWT, langchain-core, langgraph, pytest, httpx, websockets, firebase-admin, streamlit, pandas

### Frontend (`hackaverse-frontend/package.json`)
react 19, react-router-dom 7, axios, tailwindcss, vite 7, vitest, puppeteer

---

## Deployment Platform

| Target | Config | Service Name |
|--------|--------|--------------|
| **Render** | `hackathon/render.yaml` | `hackathon-backend` |
| **Vercel** | `hackaverse-frontend/vercel.json` | TODO: Verify project name |
| **MongoDB** | Atlas (external) | `hackaverse_db` |

Render also defines a `mongodb` pserv and a cron reminder job (placeholder URL).

---

## Current Status

| Aspect | Status | Evidence |
|--------|--------|----------|
| **Codebase** | Active monorepo | `hackathon/` + `hackaverse-frontend/` |
| **CI Pipeline** | None | No `.github/workflows/` |
| **Backend tests** | Present | `hackathon/tests/` (6 test files) |
| **Frontend tests** | Present | Vitest configured |
| **Documentation** | Extensive | 50+ markdown files at root |
| **Production** | Deployed | URLs in `review_packets/REVIEW_PACKET.md` |
| **Admin/Judge in prod** | Broken/invisible | `CURRENT_PROJECT_STATUS.md` |

---

## Key Scripts

| Script | Purpose |
|--------|---------|
| `hackathon/seed_data.py` | Seed admin, judge, participant users |
| `hackathon/scripts/seed_roles.py` | Role seeding |
| `hackathon/scripts/verify_database.py` | DB verification |
| `hackathon/scripts/set_dev_passwords.py` | Dev password setup |
| `hackaverse-frontend/scripts/check-environment.js` | Env validation |

---

## API Versioning

All routes mounted under **`/api/v1`** only (no duplicate legacy paths).

Frontend `API_BASE_URL` resolves to `{host}/api/v1`.
