# Deployment Guide — AI-Content

**Generated:** 2026-07-05  
**Sources:** `backend/render.yaml`, `backend/README.md`, `backend/docker/deployment/`, CI workflow

---

## Production URL

| Service | URL | Source |
|---------|-----|--------|
| **Backend API** | https://ai-agent-aff6.onrender.com | CI workflow, backend README |
| **API Docs** | https://ai-agent-aff6.onrender.com/docs | backend README |
| **Dashboard** | https://ai-agent-aff6.onrender.com/dashboard | backend README |
| **Health** | https://ai-agent-aff6.onrender.com/health/detailed | backend README |
| **GDPR Portal** | https://ai-agent-aff6.onrender.com/gdpr/privacy-policy | backend README |

> TODO: Verify frontend production URL and hosting provider.

---

## Development URL

| Service | URL |
|---------|-----|
| **Backend API** | http://localhost:9000 |
| **API Docs (Swagger)** | http://localhost:9000/docs |
| **OpenAPI Schema** | http://localhost:9000/openapi.json |
| **Health** | http://localhost:9000/health |
| **Detailed Health** | http://localhost:9000/health/detailed |
| **Dashboard** | http://localhost:9000/dashboard |
| **Frontend (Vite)** | http://localhost:5173 |

---

## Hosting Provider

| Component | Provider | Config |
|-----------|----------|--------|
| Backend | Render | `backend/render.yaml` |
| Docker Registry | Docker Hub | `ashmitpandey299/ai-uploader-agent` |
| Database | Supabase PostgreSQL | `DATABASE_URL` |
| Storage | Supabase / S3 / Local | `BHIV_STORAGE_BACKEND` |
| Error Tracking | Sentry | `SENTRY_DSN` |
| Analytics | PostHog | `POSTHOG_API_KEY` |
| Self-hosted | Docker Compose + nginx | `backend/docker/deployment/` |

---

## Build Steps

### Render (Production)

From `backend/render.yaml`:
```yaml
buildCommand: pip install -r requirements.txt
startCommand: uvicorn app.main:app --host 0.0.0.0 --port $PORT
env: python
```

### Docker (Production)

```bash
cd backend
docker build -t ai-uploader-agent .
docker run -p 9000:9000 --env-file .env ai-uploader-agent
```

### Frontend Build

```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/
```

Set `VITE_API_URL=https://ai-agent-aff6.onrender.com` for production frontend.

---

## Deployment Steps

### Option A: Render (Automated via CI)

On push to `main`:
1. CI runs tests, security scans, migration check
2. Docker image built and pushed to Docker Hub
3. Render service deployed via API (`RENDER_API_KEY`)
4. `verify-deployment` job validates production URL

Manual Render deploy:
```bash
cd backend
python scripts/deployment/deploy_to_render.py
```

### Option B: Docker Compose

```bash
cd backend/docker/deployment
chmod +x deploy.sh
./deploy.sh
```

Services: app (port 9000) + nginx (80/443)

### Option C: Multi-Platform Script

```bash
cd backend
python scripts/deployment/deploy.py
```

Supports: Render, Railway, Heroku, local

### Pre-Deploy Database Migration

```bash
cd backend
alembic upgrade head
```

---

## Restart Procedure

### Render
Restart via Render dashboard or trigger redeploy from `main` branch.

### Docker Compose
```bash
docker-compose -f backend/docker/deployment/docker-compose.yml restart
docker-compose -f backend/docker/deployment/docker-compose.yml restart app
```

### Force Redeploy
```bash
cd backend
python scripts/deployment/force_deployment.py
```

---

## Rollback Procedure

See `Handover/18_Rollback_Guide.md`.

**Quick rollback:**
- Render: Roll back to previous deploy in dashboard
- Docker: Redeploy previous image tag from Docker Hub
- Database: Alembic downgrade (if migration caused issue)

---

## Health Checks

| Endpoint | Purpose |
|----------|---------|
| `GET /health` | Basic health |
| `GET /health/detailed` | Comprehensive system status |
| `GET /monitoring-status` | Monitoring subsystem status |
| `GET /metrics` | Performance metrics info |
| `GET /metrics/performance` | Performance metrics data |
| `GET /metrics/prometheus` | Prometheus scrape endpoint |
| `GET /observability/health` | Observability health |
| `GET /presigned/health` | Storage health check |
| `GET /users/supabase-auth-health` | Supabase auth health |

**Post-deploy verification:**
```bash
curl https://ai-agent-aff6.onrender.com/health
curl https://ai-agent-aff6.onrender.com/health/detailed
python backend/verify_deployment.py
python backend/scripts/deployment/deployment_validation.py
```

---

## Monitoring

### Sentry
- Config: `SENTRY_DSN` env var
- Integrated via `sentry-sdk[fastapi]`

### PostHog
- Config: `POSTHOG_API_KEY`, `POSTHOG_HOST`
- User analytics and event tracking

### Prometheus
- Endpoint: `GET /metrics/prometheus`
- Via `prometheus-fastapi-instrumentator`

### Application Logs
- Structured logging via `StructuredLoggingMiddleware`
- System logs stored in `system_logs` table
- `GET /logs` endpoint for log retrieval

---

## Environment Requirements (Production)

From `render.yaml` and `.env.example`:

| Variable | Required | Notes |
|----------|----------|-------|
| `DATABASE_URL` | Yes | Supabase PostgreSQL connection string |
| `JWT_SECRET_KEY` | Yes | JWT signing secret |
| `ENVIRONMENT` | Yes | `production` |
| `BHIV_STORAGE_BACKEND` | Yes | `local`, `supabase`, or `s3` |
| `BHIV_LM_URL` | For AI | Perplexity API URL |
| `PERPLEXITY_API_KEY` | For AI | From Render secret |
| `SENTRY_DSN` | Recommended | Error tracking |
| `POSTHOG_API_KEY` | Recommended | Analytics |

> **Critical:** `render.yaml` contains hardcoded secrets — rotate all before production use.

---

## CI/CD Pipeline

**Workflow:** `backend/.github/workflows/ci-cd-production.yml`

**Triggers:** push/PR to `main`, `staging`, `develop`

> TODO: Verify workflow runs — located under `backend/.github/` not repo root.

---

## Minimum Server Requirements

- Python 3.11+
- 2 GB+ RAM (video generation is memory-intensive)
- FFmpeg installed (for MoviePy)
- PostgreSQL or Supabase account
- Optional: Redis for rate limiting/tasks
