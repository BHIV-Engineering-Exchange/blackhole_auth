# Review Packet — AI-Content

**Generated:** 2026-07-05  
**System:** AI Content Uploader Agent / TenderAI  
**Review Time:** < 10 minutes

---

## Entry Points

| File | Purpose |
|------|---------|
| `backend/app/main.py` | FastAPI app, router mounting, middleware |
| `backend/app/routes.py` | 9-step workflow + all main endpoints |
| `backend/scripts/start_server.py` | Local dev server launcher |
| `frontend/src/main.tsx` | React SPA entry |
| `frontend/src/App.tsx` | Frontend routing |

---

## Core Execution Flow

```
1. User registers/logs in → JWT tokens issued
       ↓
2. POST /upload → content stored, analysis queued
       ↓
3. Content analysis (bhiv_core.py)
       ↓
4. POST /generate-video → storyboard + MoviePy generation
       ↓
5. GET /content/{id} → retrieve metadata
       ↓
6. GET /stream/{id} → serve video
       ↓
7. POST /feedback → RL agent learns, sentiment analyzed
       ↓
8. GET /recommend-tags/{id} → AI tag suggestions
```

---

## Critical Files

| File | Purpose |
|------|---------|
| `app/main.py` | FastAPI entry, middleware, router mounting |
| `app/routes.py` | All 9-step workflow endpoints |
| `app/auth.py` | JWT authentication |
| `app/auth_middleware.py` | Global auth enforcement |
| `core/database.py` | DatabaseManager, Supabase/SQLite |
| `core/models.py` | SQLModel table definitions |
| `core/bhiv_core.py` | Content analysis pipeline |
| `core/bhiv_lm_client.py` | LLM integration |
| `video/generator.py` | MoviePy video generation |
| `app/agent.py` | Q-Learning RL tag agent |
| `app/cdn_fixed.py` | CDN upload/download/stream |
| `app/gdpr_compliance.py` | GDPR data operations |
| `frontend/src/services/api.ts` | Frontend API client |
| `frontend/src/context/AuthContext.tsx` | Auth state |

---

## Live Runtime Verification

### Backend (local)

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env
# Edit .env
python scripts/start_server.py

# Test endpoints:
curl http://localhost:9000/health
curl http://localhost:9000/demo-login
curl http://localhost:9000/docs
```

### Frontend (local)

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
# Open http://localhost:5173
```

### Production

```bash
curl https://ai-agent-aff6.onrender.com/health
curl https://ai-agent-aff6.onrender.com/health/detailed
cd backend && python verify_deployment.py
```

---

## Architecture at a Glance

```
React SPA (TypeScript/Vite)
    ↓ HTTPS
FastAPI (:9000)
    ↓
Middleware → 9-Step Routers → core/ + video/
    ↓
Supabase PostgreSQL (SQLite fallback)
    ↓
Supabase/S3/Local Storage
    ↓
Perplexity AI / MoviePy / RL Agent
```

---

## Key Metrics to Verify

| Check | Endpoint | Expected |
|-------|----------|----------|
| API health | `GET /health` | 200 OK |
| Detailed health | `GET /health/detailed` | DB connected |
| Auth works | `POST /users/login` | JWT returned |
| Demo login | `GET /demo-login` | Demo credentials |
| Storage health | `GET /presigned/health` | Storage OK |
| RL agent | `GET /rl/agent-stats` | Agent stats JSON |
| Production | `GET https://ai-agent-aff6.onrender.com/health` | 200 OK |

---

## Review Flags

1. **Hardcoded secrets in render.yaml** — rotate before sign-off
2. **Duplicate routes** — may cause unexpected handler behavior
3. **CI under backend/.github/** — may not run automatically
4. **Docker port 8000 vs 9000** — verify canonical port
5. **Demo login exposed** — disable in production

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] Start backend: `python scripts/start_server.py`
- [ ] Hit `GET /health` and `GET /docs`
- [ ] Login via demo: `GET /demo-login`
- [ ] Start frontend: `npm run dev`
- [ ] Verify dashboard loads at http://localhost:5173/dashboard
- [ ] Check production: `curl https://ai-agent-aff6.onrender.com/health`
- [ ] Review `Handover/10_Known_Issues.md`
- [ ] Run quick test: `pytest backend/tests/unit/test_server.py`

---

## Certification / Evidence

| Artifact | Location |
|----------|----------|
| Deployment report | `backend/data/reports/deployment_report_local.json` |
| Backend bug report | `backend/BACKEND_ERRORS_AND_BUGS.md` |
| CI workflow | `backend/.github/workflows/ci-cd-production.yml` |

---

## Related Documents

- Full API: `Handover/06_API_Documentation.md`
- Architecture: `Handover/04_Architecture.md`
- Deployment: `Handover/03_Deployment_Guide.md`
- Backend README: `backend/README.md`
