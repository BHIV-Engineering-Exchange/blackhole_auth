# AI-Content — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-05  
**Repository:** AI-Content  
**Product Names:** TenderAI (root README), AI Content Uploader Agent, AI-Agent (backend README)

---

## Product Overview

**AI-Content** is an AI-powered content management and video generation platform. Users upload text, documents, or media; the system analyzes content, generates storyboards, produces videos via MoviePy, and collects feedback with RL-based tag recommendations.

---

## Purpose

Provide a production-ready platform that:

- Processes content through a 9-step AI workflow (upload → analysis → generation → feedback)
- Generates videos from scripts using MoviePy/FFmpeg
- Supports multi-storage backends (Supabase, S3, MinIO, local JSON bucket)
- Enforces JWT authentication with Supabase JWKS and local fallback
- Meets GDPR requirements (data export, deletion, privacy policy)
- Deploys to Render with Docker Hub CI/CD pipeline

---

## Features

### Core Platform
- 9-step workflow routers (`step1`–`step9` in `app/routes.py`)
- Async upload and video generation
- Q-Learning RL agent for tag recommendations
- Task queue with status tracking
- CDN/presigned URL uploads and streaming

### Security & Compliance
- JWT access + refresh tokens
- Global auth middleware with public path exceptions
- GDPR endpoints (export, delete, privacy policy)
- Rate limiting (Redis with in-memory fallback)
- Input validation (100MB body limit)
- Audit logging

### Monitoring & Analytics
- Sentry error tracking
- PostHog user analytics
- Prometheus metrics (`/metrics/prometheus`)
- Observability endpoints
- Jinja analytics dashboard (optional)

### Video & AI
- MoviePy video generation pipeline
- Perplexity AI / local LLM for storyboard suggestions
- VADER sentiment analysis on feedback
- PyTorch/scikit-learn ML components

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite 5, Tailwind CSS, Axios |
| **Backend** | Python 3.11+, FastAPI 0.104, Uvicorn |
| **Database** | SQLModel (PostgreSQL/Supabase primary, SQLite fallback) |
| **Migrations** | Alembic |
| **Cache/Queue** | Redis (optional), Celery, in-memory task queue |
| **Auth** | JWT (python-jose), Supabase JWKS, passlib/bcrypt |
| **Storage** | Supabase Storage, S3/MinIO, local JSON bucket |
| **Video** | MoviePy, FFmpeg, OpenCV, Pillow |
| **Monitoring** | Sentry, PostHog, Prometheus |
| **CI/CD** | GitHub Actions, Docker Hub, Render |
| **Testing** | pytest, Locust load testing |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | AI-Content |
| **Remote URL** | https://github.com/blackholeinfiverse64/AI-Content.git |
| **Main Branch** | `main` |
| **License** | MIT (per backend README badge) |

---

## Build Instructions

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
npm run build   # tsc && vite build → dist/
```

### Docker
```bash
cd backend
docker build -t ai-uploader-agent .
```

---

## Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL or Supabase account (SQLite fallback available)
- FFmpeg (for video generation)
- Redis (optional, for rate limiting/tasks)

### Backend Setup
```bash
cd backend
cp .env.example .env
# Edit .env with DATABASE_URL, JWT_SECRET_KEY, etc.
pip install -r requirements.txt
alembic upgrade head
python scripts/start_server.py
```

### Frontend Setup
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

See: `frontend/QUICKSTART.md`, `backend/README.md`

---

## Running Locally

| Service | Command | URL |
|---------|---------|-----|
| Backend | `python scripts/start_server.py` | http://localhost:9000 |
| Frontend | `npm run dev` | http://localhost:5173 (Vite default) |
| API Docs | — | http://localhost:9000/docs |
| Health | — | http://localhost:9000/health |
| Dashboard | — | http://localhost:9000/dashboard |

**Demo login:** `GET /demo-login` (credentials documented in backend README)

---

## Deployment

| Environment | Platform | Reference |
|-------------|----------|-----------|
| Production | Render | `backend/render.yaml` |
| Docker Hub | `ashmitpandey299/ai-uploader-agent` | CI workflow |
| Local Docker | `backend/docker/deployment/docker-compose.yml` | nginx + app |

**Production URL:** https://ai-agent-aff6.onrender.com

Detailed steps: `Handover/03_Deployment_Guide.md`

---

## Dependencies

### Backend (key)
fastapi, uvicorn, sqlmodel, alembic, psycopg2-binary, python-jose, passlib, moviepy, celery, redis, sentry-sdk, posthog, torch, transformers, pytest, locust

### Frontend (key)
react, react-router-dom, axios, tailwindcss, vite, typescript, lucide-react

Full lists: `backend/requirements.txt`, `frontend/package.json`

---

## Folder Structure

```
AI-Content/
├── backend/          # FastAPI application
├── frontend/         # React SPA (TypeScript)
└── Handover/         # This exit handover package
```

Full tree: `Handover/08_Folder_Structure.md`

---

## Authentication

- **Register:** `POST /users/register`
- **Login:** `POST /users/login` (OAuth2 form) or `POST /users/login-json`
- **Refresh:** `POST /users/refresh`
- **Profile:** `GET /users/profile` (Bearer token)
- **Logout:** `POST /users/logout`
- **Token validation:** Supabase JWKS first, local JWT fallback
- **Frontend storage:** `localStorage` key `authToken`
- **Demo access:** `GET /demo-login`

---

## Environment Variables (Names Only)

### Backend
`DATABASE_URL`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_DB_PASSWORD`, `JWT_SECRET_KEY`, `JWT_ALGORITHM`, `ACCESS_TOKEN_EXPIRE_MINUTES`, `REFRESH_TOKEN_EXPIRE_DAYS`, `SENTRY_DSN`, `POSTHOG_API_KEY`, `POSTHOG_HOST`, `ENVIRONMENT`, `USE_S3_STORAGE`, `USE_SUPABASE_STORAGE`, `BHIV_STORAGE_BACKEND`, `S3_BUCKET_NAME`, `S3_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `SUPABASE_BUCKET_NAME`, `BHIV_BUCKET_PATH`, `REDIS_URL`, `MAX_UPLOAD_SIZE_MB`, `RATE_LIMIT_REQUESTS_PER_MINUTE`, `DATA_RETENTION_DAYS`, `AUTO_DELETE_EXPIRED_DATA`, `GDPR_CONTACT_EMAIL`, `API_HOST`, `API_PORT`, `API_WORKERS`, `CORS_ORIGINS`, `DEBUG`, `LOG_LEVEL`, `MAX_FILE_SIZE_MB`, `ALLOWED_FILE_TYPES`, `TEMP_DIR`, `VIDEO_OUTPUT_FORMAT`, `VIDEO_QUALITY`, `MAX_VIDEO_DURATION_SECONDS`, `RL_LEARNING_RATE`, `RL_DISCOUNT_FACTOR`, `RL_EXPLORATION_RATE`, `TASK_QUEUE_BACKEND`, `TASK_RETRY_ATTEMPTS`, `TASK_TIMEOUT_SECONDS`, `BHIV_LM_URL`, `BHIV_LM_API_KEY`, `PERPLEXITY_API_KEY`, `ENABLE_METRICS`, `GIT_SHA`

### Frontend
`VITE_API_URL`, `VITE_API_BASE_URL`, `VITE_APP_NAME`, `VITE_APP_TAGLINE`

Full guide: `Handover/05_Environment_Guide.md`

---

## Known Issues

1. Hardcoded secrets in `backend/render.yaml` — rotate immediately
2. Duplicate route registrations across step routers and main.py
3. CI workflow under `backend/.github/` may not run from monorepo root
4. Docker port inconsistency (8000 vs 9000)
5. `analytics.py` imported but not mounted
6. GlobalAuthMiddleware may block some intended public endpoints

Full list: `Handover/10_Known_Issues.md`

---

## Future Improvements

- Move CI workflow to repo root `.github/workflows/`
- Deduplicate overlapping routes
- Rotate and externalize all secrets from render.yaml
- Align Docker ports across all deploy scripts
- Mount or remove unused analytics routers
- Add frontend CI/deploy pipeline
- Resolve dual database paths (SQLModel vs raw sqlite3)

---

## Related Handover Documents

| Document | Purpose |
|----------|---------|
| `02_Repository_Details.md` | Repo metadata and commands |
| `03_Deployment_Guide.md` | Production deployment |
| `04_Architecture.md` | System architecture |
| `05_Environment_Guide.md` | Environment configuration |
| `06_API_Documentation.md` | Complete API reference |
| `07_Database_Details.md` | SQLModel models |
| `08_Folder_Structure.md` | Directory layout |
| `09_Pending_Work.md` | Outstanding tasks |
| `10_Known_Issues.md` | Documented issues |
| `11_Troubleshooting.md` | Common problems |
| `12_REVIEW_PACKET.md` | Quick review guide |
| `13_Runtime_Evidence.md` | Runtime proof placeholders |
| `14_Testing_Checklist.md` | QA checklist |
| `15_Knowledge_Transfer.md` | KT session guide |
| `16_Ownership_Transfer.md` | Ownership checklist |
| `17_Deployment_Checklist.md` | Deploy checklist |
| `18_Rollback_Guide.md` | Rollback procedures |
