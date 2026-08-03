# Deployment Checklist — AI-Artha

**Generated:** 2026-07-05

---

## Pre-Deployment

### Code & Branch
- [ ] All changes merged to `main` branch
- [ ] CI pipeline passed (PR to `main` or push to `dev`)
- [ ] No uncommitted secrets in codebase
- [ ] `Handover/09_Pending_Work.md` reviewed for blockers
- [ ] Version/tag decided (if applicable)

### Environment Configuration
- [ ] `backend/.env.production` created from `.env.production.example`
- [ ] `JWT_SECRET` set (min 32 characters, unique per environment)
- [ ] `HMAC_SECRET` set (min 32 characters — do not change after data exists)
- [ ] `MONGODB_URI` set with replica set parameter
- [ ] `REDIS_URL` or `REDIS_*` configured (optional)
- [ ] `CORS_ORIGIN` / `CORS_ALLOWED_ORIGINS` match frontend domain exactly
- [ ] `FRONTEND_URL` set to production SPA URL
- [ ] `APP_URL` / `API_PUBLIC_URL` set correctly
- [ ] `SETU_ENABLED` set appropriately (default: `false`)
- [ ] `LOG_LEVEL=info` for production
- [ ] `NODE_ENV=production`

### Frontend Configuration
- [ ] `VITE_API_URL` set to production API base (e.g., `https://ai-artha.onrender.com/api/v1`)
- [ ] Frontend build tested locally: `cd frontend && npm run build`

### Infrastructure
- [ ] MongoDB Atlas cluster ready (or Docker MongoDB replica set)
- [ ] Redis instance ready (if using caching)
- [ ] SSL certificates available (for self-hosted nginx)
- [ ] DNS records configured
- [ ] Minimum 2 GB RAM, 2 CPU cores available

### Backup
- [ ] Pre-deployment database backup taken
```bash
./scripts/backup-prod.sh
```
- [ ] Backup file verified and stored securely

---

## Deployment Steps

### Option A: Docker Production

- [ ] Generate config: `cd backend && npm run generate:config`
- [ ] Build images:
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
```
- [ ] Start services:
```bash
docker-compose -f docker-compose.prod.yml up -d
# OR
./scripts/deploy.sh --seed
```
- [ ] Initialize MongoDB replica set:
```bash
docker exec artha-mongo-prod mongosh --eval "rs.initiate()"
```
- [ ] Create indexes:
```bash
docker exec artha-backend-prod npm run create-indexes
```
- [ ] Seed database (first deploy only):
```bash
docker exec artha-backend-prod npm run seed
docker exec artha-backend-prod node scripts/seed-tds.js
```

### Option B: Render (Backend)

- [ ] Verify `backend/render.yaml` configuration
- [ ] Set all env vars in Render dashboard
- [ ] Deploy from `main` branch
- [ ] Verify health check: `/api/health` on port 10000
- [ ] Run index creation post-deploy:
```bash
# Via Render shell or one-off job
npm run create-indexes
```

### Option C: Vercel (Frontend)

- [ ] Set `VITE_API_URL` in Vercel environment variables
- [ ] Deploy from `main` branch
- [ ] Verify build output serves correctly
- [ ] Verify API calls reach production backend

---

## Post-Deployment Verification

### Health Checks
- [ ] `GET /health` → 200, status healthy
- [ ] `GET /health/detailed` → MongoDB connected
- [ ] `GET /ready` → 200 OK
- [ ] `GET /live` → 200 OK
- [ ] `GET /api/health` → 200 (Render health path)

### Functional Smoke Tests
- [ ] Frontend loads at production URL
- [ ] Login works with production credentials
- [ ] Dashboard displays KPI data
- [ ] Create and send test invoice (staging/test data)
- [ ] Ledger chain verification passes:
```bash
curl -H "Authorization: Bearer <admin-token>" \
  https://<api-url>/api/v1/ledger/verify-chain
```

### Integration Checks
- [ ] CORS working (no browser CORS errors)
- [ ] File uploads working (`STORAGE_TYPE` configured)
- [ ] Redis caching active (if configured): check `/metrics`
- [ ] SETU dispatch working (if `SETU_ENABLED=true`)

### Performance
- [ ] Response times acceptable on `/health/detailed`
- [ ] `/metrics` shows normal memory/CPU usage
- [ ] Database indexes created: `npm run create-indexes`

---

## Governance & Proof (Recommended)

- [ ] Run proof suite against production/staging:
```bash
cd backend && npm run proof:all
```
- [ ] Run governance pipeline:
```bash
cd backend && npm run governance:full
```
- [ ] Capture runtime evidence (see `Handover/13_Runtime_Evidence.md`)

---

## Monitoring Setup

- [ ] Prometheus scraping configured (`monitoring/prometheus.yml`)
- [ ] Monitoring stack started (if using):
```bash
docker-compose -f docker-compose.monitoring.yml up -d
```
- [ ] Alert rules configured
- [ ] Log aggregation verified

> TODO: Verify alert destinations and on-call integration.

---

## Post-Deployment Backup

- [ ] Post-deployment backup taken
```bash
./scripts/backup-prod.sh
```
- [ ] Backup restore tested (on staging)

---

## Communication

- [ ] Deployment communicated to stakeholders
- [ ] Known issues documented (`Handover/10_Known_Issues.md`)
- [ ] Rollback plan confirmed (`Handover/18_Rollback_Guide.md`)
- [ ] Support team notified

---

## Sign-Off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Developer | | | |
| DevOps | | | |
| QA | | | |
| Tech Lead | | | |

---

## Rollback Trigger Conditions

Initiate rollback if any of the following occur post-deployment:

- Health checks fail for > 5 minutes
- Ledger chain verification fails
- Authentication broken for all users
- Data corruption detected
- Critical API endpoints return 500 errors

See `Handover/18_Rollback_Guide.md` for rollback procedures.
