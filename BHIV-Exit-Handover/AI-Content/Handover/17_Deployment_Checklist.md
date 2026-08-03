# Deployment Checklist — AI-Content

**Generated:** 2026-07-05

---

## Pre-Deployment

### Code & Branch
- [ ] All changes merged to `main`
- [ ] CI pipeline passed (or run locally)
- [ ] No uncommitted secrets in codebase
- [ ] **Rotate all secrets in render.yaml** before deploy
- [ ] Review `Handover/09_Pending_Work.md` for blockers

### Environment Configuration
- [ ] `backend/.env` / Render env vars configured
- [ ] `DATABASE_URL` set (Supabase PostgreSQL)
- [ ] `JWT_SECRET_KEY` set (unique, secure)
- [ ] `SUPABASE_URL`, `SUPABASE_ANON_KEY` set
- [ ] `BHIV_STORAGE_BACKEND` configured
- [ ] `BHIV_LM_URL`, `PERPLEXITY_API_KEY` set (for AI features)
- [ ] `SENTRY_DSN`, `POSTHOG_API_KEY` set (monitoring)
- [ ] `ENVIRONMENT=production`
- [ ] `CORS_ORIGINS` restricted (not `*` in production)

### Frontend Configuration
- [ ] `VITE_API_URL=https://ai-agent-aff6.onrender.com`
- [ ] Frontend build tested: `npm run build`

### Infrastructure
- [ ] Supabase project ready
- [ ] FFmpeg available in production environment
- [ ] Redis ready (if using rate limiting/tasks)
- [ ] Docker Hub access verified

### Database
- [ ] Pre-deployment backup taken
- [ ] Migrations tested: `alembic upgrade head`

---

## Deployment Steps

### Option A: CI/CD (Automated)

On push to `main`:
1. Migration check (Postgres 15)
2. Security lint (Bandit, Trivy, flake8)
3. Test coverage (pytest, 70% target)
4. Pre-production checklist
5. Docker build → push to Docker Hub
6. Render deploy
7. Deployment verification

**Prerequisites:**
- GitHub secrets configured
- CI workflow at correct path (TODO: move to repo root if needed)

### Option B: Render Manual

```bash
cd backend
python scripts/deployment/deploy_to_render.py
```

Or deploy via Render dashboard using `render.yaml`.

### Option C: Docker Compose

```bash
cd backend/docker/deployment
./deploy.sh
```

### Post-Deploy Migration

```bash
# On Render shell or via deploy script
alembic upgrade head
```

---

## Post-Deployment Verification

### Health Checks
- [ ] `GET /health` → 200
- [ ] `GET /health/detailed` → DB connected
- [ ] `GET /monitoring-status` → OK
- [ ] `GET /metrics/prometheus` → Metrics available

### Automated Verification
```bash
cd backend
python verify_deployment.py
python scripts/deployment/deployment_validation.py
```

- [ ] Verification scripts pass

### Functional Smoke Tests
- [ ] `GET /docs` → Swagger UI loads
- [ ] `POST /users/login-json` → JWT returned
- [ ] `GET /demo-login` → Demo credentials (or disabled)
- [ ] `GET /dashboard` → Dashboard data
- [ ] `GET /gdpr/privacy-policy` → Policy accessible
- [ ] Frontend connects to production API

### CI Verify Job Target
- [ ] `https://ai-agent-aff6.onrender.com/health` returns 200

---

## Security Post-Deploy

- [ ] Confirm render.yaml secrets rotated (not using committed values)
- [ ] CORS restricted to frontend domain
- [ ] Demo login disabled in production (if policy requires)
- [ ] Debug endpoints restricted or disabled
- [ ] Rate limiting active

---

## Monitoring Setup

- [ ] Sentry receiving errors
- [ ] PostHog tracking events
- [ ] Prometheus scraping configured
- [ ] Alert rules configured

> TODO: Verify alert destinations.

---

## Sign-Off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Developer | | | |
| DevOps | | | |
| QA | | | |
| Tech Lead | | | |

---

## Rollback Triggers

Initiate rollback if:
- Health checks fail > 5 minutes
- Database migration caused data issues
- Auth broken for all users
- Video generation causing server crashes

See `Handover/18_Rollback_Guide.md`.
