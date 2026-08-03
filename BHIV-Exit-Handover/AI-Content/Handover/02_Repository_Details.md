# Repository Details — AI-Content

**Generated:** 2026-07-05

---

## Repository Name

**AI-Content** (also referenced as TenderAI, AI Content Uploader Agent, AI-Agent)

---

## Repository Purpose

AI-powered content upload, analysis, video generation, and feedback platform with GDPR compliance, multi-storage support, RL tag recommendations, and cloud deployment via Render.

---

## Repository URL

| Type | URL |
|------|-----|
| **Git Remote (origin)** | https://github.com/blackholeinfiverse64/AI-Content.git |
| **Production Backend** | https://ai-agent-aff6.onrender.com |
| **API Docs (Swagger)** | https://ai-agent-aff6.onrender.com/docs |
| **Dashboard** | https://ai-agent-aff6.onrender.com/dashboard |
| **Docker Hub Image** | `docker.io/ashmitpandey299/ai-uploader-agent` |

> TODO: Verify frontend production deployment URL (no frontend deploy config found in repo).

---

## Main Branch

`main` (tracks `origin/main`)

---

## Production Branch

`main` — CI deploys to Render on push to `main`.

CI also references `staging` and `develop` branches in workflow triggers.

> TODO: Verify whether `staging` and `develop` branches exist on remote.

---

## Build Command

| Component | Command | Location |
|-----------|---------|----------|
| **Backend** | `pip install -r requirements.txt` | `backend/` |
| **Frontend** | `npm run build` → `tsc && vite build` | `frontend/` |
| **Docker** | `docker build -t ai-uploader-agent .` | `backend/` |
| **Migrations** | `alembic upgrade head` | `backend/` |

---

## Run Command

| Component | Command | Port |
|-----------|---------|------|
| **Backend (dev)** | `python scripts/start_server.py` | 9000 |
| **Backend (Render)** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` | Render `$PORT` |
| **Frontend (dev)** | `npm run dev` | 5173 (Vite default) |
| **Frontend (preview)** | `npm run preview` | 4173 |
| **Docker (root Dockerfile)** | CMD in `backend/Dockerfile` | 9000 |
| **Docker (alt)** | `backend/docker/Dockerfile` | 8000 |

> TODO: Verify canonical port — 9000 (start_server.py, root Dockerfile) vs 8000 (docker/Dockerfile, deploy.sh).

---

## Dependencies

### Backend (`requirements.txt`)
**Core:** fastapi, uvicorn, sqlmodel, alembic, psycopg2-binary, python-jose, passlib, pydantic

**Media/AI:** moviepy, opencv-python, torch, transformers, scikit-learn, vaderSentiment

**Infrastructure:** celery, redis, sentry-sdk, posthog, prometheus-fastapi-instrumentator

**Testing:** pytest, pytest-cov, locust, coverage

### Frontend (`package.json`)
**Runtime:** react, react-dom, react-router-dom, axios, lucide-react, clsx, tailwind-merge

**Dev:** vite, typescript, tailwindcss, eslint

### Root
- `package-lock.json` only — no root `package.json` (orphaned lock file)

---

## Deployment Platform

| Target | Config | Notes |
|--------|--------|-------|
| **Render** | `backend/render.yaml` | Web service `ai-uploader-agent`, Python 3.11 |
| **Docker Hub** | CI workflow | Image: `ashmitpandey299/ai-uploader-agent` |
| **Docker Compose** | `backend/docker/deployment/docker-compose.yml` | App + nginx |
| **Railway/Heroku** | `scripts/deployment/deploy.py` | Multi-platform deploy script |

---

## Current Status

| Aspect | Status | Evidence |
|--------|--------|----------|
| **Codebase** | Active monorepo (backend + frontend) | Source present |
| **CI Pipeline** | Under `backend/.github/workflows/ci-cd-production.yml` | May not run from monorepo root |
| **Tests** | Extensive pytest suite (unit, integration, load) | `backend/tests/` |
| **Production** | Deployed on Render | CI verify step targets `ai-agent-aff6.onrender.com` |
| **Documentation** | Extensive in `backend/docs/`, `frontend/*.md` | |
| **Known bugs doc** | `backend/BACKEND_ERRORS_AND_BUGS.md` | Oct 2025 |

---

## Key Scripts (Backend)

| Script | Purpose |
|--------|---------|
| `scripts/start_server.py` | Local dev server (port 9000) |
| `scripts/deployment/deploy.py` | Multi-platform deployment |
| `scripts/deployment/deploy_to_render.py` | Render-specific deploy |
| `scripts/pre_production_checklist.py` | Pre-production validation |
| `verify_deployment.py` | Post-deploy verification |
| `alembic upgrade head` | Database migrations |

---

## CI/CD Jobs (from workflow)

| Job | Purpose |
|-----|---------|
| `migration-check` | Alembic against Postgres 15 |
| `security-lint` | Bandit, Safety, Trivy, flake8/black/isort |
| `test-coverage` | pytest, 70% coverage target, Codecov |
| `pre-production-check` | Server startup + checklist script |
| `build-deploy` | Docker build + Render deploy on `main` |
| `verify-deployment` | Validates production URL |
| `compliance-check` | GDPR endpoint checks |

**Required secrets:** `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `RENDER_API_KEY`, `RENDER_PRODUCTION_SERVICE_ID`
