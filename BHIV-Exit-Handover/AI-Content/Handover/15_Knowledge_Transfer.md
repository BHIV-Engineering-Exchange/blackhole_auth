# Knowledge Transfer — AI-Content

**Generated:** 2026-07-05

---

## Session Overview

| Session | Duration | Topics | Materials |
|---------|----------|--------|-----------|
| **KT-1: Product & Architecture** | 2 hours | Overview, stack, 9-step workflow | `01_README.md`, `04_Architecture.md` |
| **KT-2: Backend Deep Dive** | 3 hours | FastAPI, routes, core modules | `app/main.py`, `app/routes.py`, `core/` |
| **KT-3: Video & AI Pipeline** | 2 hours | MoviePy, LLM, RL agent | `video/`, `app/agent.py` |
| **KT-4: Frontend & Integration** | 2 hours | React app, API client, auth | `App.tsx`, `services/api.ts` |
| **KT-5: Database & Storage** | 1.5 hours | SQLModel, Alembic, storage backends | `07_Database_Details.md` |
| **KT-6: Deployment & CI/CD** | 2 hours | Render, Docker, CI pipeline | `03_Deployment_Guide.md` |
| **KT-7: Handover Q&A** | 1 hour | Pending work, known issues | `09_Pending_Work.md`, `10_Known_Issues.md` |

---

## KT-1: Product & Architecture

### Learning Objectives
- Understand AI-Content's purpose and user workflow
- Know the 9-step processing pipeline
- Understand technology stack and deployment targets

### Key Concepts
1. **9-step workflow** — systematic content processing routers
2. **Multi-storage** — Supabase, S3, local JSON bucket
3. **Video generation** — MoviePy pipeline from scripts
4. **RL agent** — Q-learning tag recommendations from feedback
5. **GDPR compliance** — data export, deletion, privacy

### Demo
- Open http://localhost:9000/docs (Swagger UI)
- Walk through upload → generate → stream flow

### Reading
- `Handover/01_README.md`
- `backend/README.md`

---

## KT-2: Backend Deep Dive

### Key Files (in order)

| # | File | Why |
|---|------|-----|
| 1 | `app/main.py` | App entry, middleware, router mounting |
| 2 | `app/routes.py` | 9-step routers, all main endpoints |
| 3 | `app/auth.py` | JWT auth endpoints |
| 4 | `app/auth_middleware.py` | GlobalAuthMiddleware |
| 5 | `core/database.py` | DatabaseManager |
| 6 | `core/models.py` | SQLModel tables |
| 7 | `core/bhiv_core.py` | Content analysis |
| 8 | `app/cdn_fixed.py` | CDN operations |

### Hands-On
```bash
cd backend
python scripts/start_server.py
# Test auth flow
curl http://localhost:9000/demo-login
# Explore routes
curl http://localhost:9000/debug-routes -H "Authorization: Bearer <token>"
```

---

## KT-3: Video & AI Pipeline

### Key Files

| File | Purpose |
|------|---------|
| `video/generator.py` | MoviePy video generation |
| `video/storyboard.py` | Storyboard creation |
| `core/bhiv_lm_client.py` | Perplexity/local LLM |
| `app/agent.py` | Q-Learning RL agent |
| `core/sentiment_analyzer.py` | VADER sentiment |

### Flow
```
Script/text → bhiv_core analysis → storyboard (LLM) → MoviePy generation → storage → stream
Feedback → sentiment + RL reward → tag recommendations
```

### Hands-On
```bash
# Start local LLM server (optional)
python scripts/local_llm_server.py

# Test video generation (requires auth token)
curl -X POST http://localhost:9000/generate-video \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"script_content":"Hello world test video"}'
```

---

## KT-4: Frontend & Integration

### Key Files

| File | Purpose |
|------|---------|
| `frontend/src/main.tsx` | React entry |
| `frontend/src/App.tsx` | Routes, auth guards |
| `frontend/src/services/api.ts` | Axios API client |
| `frontend/src/context/AuthContext.tsx` | Auth state |
| `frontend/src/pages/Dashboard.tsx` | Main dashboard |
| `frontend/src/components/UploadSection.tsx` | Upload UI |

### Hands-On
```bash
cd frontend
npm run dev
# Login at http://localhost:5173/auth
# Test upload at http://localhost:5173/dashboard
```

---

## KT-5: Database & Storage

### Topics
- SQLModel models (8 tables)
- Alembic migrations
- Supabase → SQLite fallback behavior
- Storage backends (Supabase, S3, local bucket)

### Hands-On
```bash
cd backend
alembic current
alembic history
pytest tests/unit/test_database.py -v
pytest tests/integration/test_supabase.py -v
```

---

## KT-6: Deployment & CI/CD

### Topics
- Render deployment (`render.yaml`)
- Docker Hub CI pipeline
- GitHub Actions workflow
- Environment variable management
- Secret rotation requirements

### Hands-On
```bash
python verify_deployment.py
python scripts/pre_production_checklist.py
python scripts/deployment/deployment_validation.py
```

### Critical Action
Review and rotate all secrets in `render.yaml` before production handover.

---

## KT-7: Handover Q&A

### Topics
1. Pending work (`Handover/09_Pending_Work.md`)
2. Known issues (`Handover/10_Known_Issues.md`)
3. Secret rotation status
4. Production URL verification
5. Access credentials handover

---

## KT Completion Sign-Off

| Session | Attendee | Date | Questions Resolved |
|---------|----------|------|-------------------|
| KT-1 | | | |
| KT-2 | | | |
| KT-3 | | | |
| KT-4 | | | |
| KT-5 | | | |
| KT-6 | | | |
| KT-7 | | | |
