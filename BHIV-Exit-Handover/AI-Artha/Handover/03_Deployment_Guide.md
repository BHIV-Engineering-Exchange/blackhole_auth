# Deployment Guide — AI-Artha

**Generated:** 2026-07-05  
**Source:** `docs/DEPLOYMENT.md`, `scripts/deploy*.sh`, `docker-compose.prod.yml`, `backend/render.yaml`

---

## Production URL

| Service | URL | Source |
|---------|-----|--------|
| **Backend API** | https://ai-artha.onrender.com | `backend/.env.production.example` |
| **Frontend SPA** | https://ai-artha.vercel.app | `backend/.env.production.example` |
| **Auth Server (BHIV)** | https://bhiv-auth.onrender.com | `backend/.env.production.example` |

> TODO: Verify all production URLs are live and correctly configured.

---

## Development URL

| Service | URL |
|---------|-----|
| **Frontend (Vite)** | http://localhost:5173 |
| **Backend API** | http://localhost:5000 |
| **API Base** | http://localhost:5000/api/v1 |
| **Health** | http://localhost:5000/health |
| **Detailed Health** | http://localhost:5000/health/detailed |

---

## Hosting Provider

| Component | Provider | Config |
|-----------|----------|--------|
| Backend | Render | `backend/render.yaml` |
| Frontend | Vercel | Referenced in env examples |
| Database | MongoDB Atlas | `MONGODB_URI` |
| Cache | Redis (Docker or managed) | `REDIS_*` env vars |
| Self-hosted | Docker Compose | `docker-compose.prod.yml` |
| Kubernetes | K8s / Pravah | `k8s-deployment.example.yml`, `pravah-deployment.yaml` |

---

## Build Steps

### Option A: Docker Production (Recommended)

```bash
# 1. Generate production config
cd backend && npm run generate:config

# 2. Copy and edit environment files
cp backend/.env.production.example backend/.env.production
# Edit MONGODB_URI, JWT_SECRET, HMAC_SECRET, REDIS_PASSWORD, etc.

# 3. Build images
docker-compose -f docker-compose.prod.yml build --no-cache
```

### Option B: Render (Backend)

From `backend/render.yaml`:
- **Build:** `npm install`
- **Start:** `npm start`
- **Port:** 10000
- **Health check:** `/api/health`

### Option C: Frontend (Vite Build)

```bash
cd frontend
npm install
npm run build
# Output: frontend/dist/ — served via nginx in Docker prod
```

---

## Deployment Steps

### Docker Production (Full Stack)

```bash
# Linux/Mac
chmod +x scripts/deploy.sh
./scripts/deploy.sh --seed

# Windows
scripts\deploy-prod.bat --seed
```

**Manual steps** (from `docs/DEPLOYMENT.md`):

```bash
# Start services
docker-compose -f docker-compose.prod.yml up -d

# Initialize MongoDB replica set
docker exec artha-mongo-prod mongosh --eval "rs.initiate()"

# Create database indexes
docker exec artha-backend-prod npm run create-indexes

# Seed database (optional)
docker exec artha-backend-prod npm run seed
```

### Production Architecture (Docker Compose)

| Service | Container | Purpose |
|---------|-----------|---------|
| MongoDB | `artha-mongo-prod` | Replica set with auth |
| Redis | Redis 7 | Caching layer |
| Backend | `artha-backend-prod` | Node.js API |
| Frontend | Nginx | Static SPA + SSL |

> Note: `nginx/` folder is not in repo; created at deploy time by `deploy-prod.sh`.

### Pravah Deployment

See `docs/PRAVAH_DEPLOYMENT.md` and `pravah-deployment.yaml`.

---

## Restart Procedure

### Docker Compose
```bash
# Restart all services
docker-compose -f docker-compose.prod.yml restart

# Restart individual service
docker-compose -f docker-compose.prod.yml restart backend
docker-compose -f docker-compose.prod.yml restart frontend
```

### Render
Restart via Render dashboard or redeploy from `main` branch (autoDeploy: true in `render.yaml`).

> TODO: Verify Render restart procedure and zero-downtime settings.

---

## Rollback Procedure

See `Handover/18_Rollback_Guide.md` for full details.

**Quick rollback:**
```bash
# Restore database from backup
./scripts/restore.sh <backup-file>

# Redeploy previous Docker image/tag
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

---

## Health Checks

| Endpoint | Purpose | Auth |
|----------|---------|------|
| `GET /health` | Basic API health | Public |
| `GET /health/detailed` | Comprehensive system status | Public |
| `GET /ready` | Kubernetes readiness (DB check) | Public |
| `GET /live` | Kubernetes liveness | Public |
| `GET /metrics` | Performance metrics | Public |
| `GET /status` | Component status | Public |
| `GET /api/health` | Render health check path | Public |
| `GET /observability` | Observability data | Public |
| `GET /prometheus` | Prometheus metrics | Public |

**Post-deploy verification:**
```bash
curl http://localhost:5000/health/detailed
curl http://localhost:5000/ready
curl http://localhost:5000/metrics
```

---

## Monitoring

### Prometheus
- Config: `monitoring/prometheus.yml`
- Compose: `monitoring/docker-compose.monitoring.yml`, `docker-compose.monitoring.yml`
- Scrape endpoint: `GET /prometheus`

### Application Logging
- Winston logger (`LOG_LEVEL` env var)
- Request logging via `middleware/monitoring.js`

### Observability Endpoints
- `GET /observability` — observability service data
- `GET /dashboard` (health routes) — observability dashboard data

### Backup Monitoring
```bash
# Create backup
./scripts/backup.sh
./scripts/backup-prod.sh   # Production variant

# Schedule: TODO: Verify cron/scheduled backup configuration
```

### Runtime Proof Scripts
```bash
cd backend
npm run proof:all          # Full proof suite
npm run governance:full    # Governance validation
```

---

## Environment Requirements (Production)

### Root `.env.production`
- `MONGO_ROOT_USER`
- `MONGO_ROOT_PASSWORD`
- `REDIS_PASSWORD`

### `backend/.env.production`
- `NODE_ENV=production`
- `MONGODB_URI` (must include replica set for transactions)
- `JWT_SECRET` (min 32 chars)
- `HMAC_SECRET` (min 32 chars — changing invalidates ledger hashes)
- `REDIS_URL` or `REDIS_HOST`/`REDIS_PORT`/`REDIS_PASSWORD`
- `CORS_ALLOWED_ORIGINS` or `CORS_ORIGIN` matching frontend domain

### Frontend
- `VITE_API_URL` pointing to production API base (e.g., `https://ai-artha.onrender.com/api/v1`)

---

## Minimum Server Requirements

From `docs/DEPLOYMENT.md`:
- 2 GB RAM
- 2 CPU cores
- Docker and Docker Compose
- MongoDB Atlas account or local MongoDB replica set
- SSL certificate for production domain
