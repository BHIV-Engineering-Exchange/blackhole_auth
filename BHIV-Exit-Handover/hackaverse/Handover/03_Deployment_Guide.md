# Deployment Guide — hackaverse

**Generated:** 2026-07-05  
**Sources:** `hackathon/render.yaml`, `DEPLOYMENT_NOTES.md`, `review_packets/REVIEW_PACKET.md`

---

## Overview

```
git push → GitHub → Render (backend) + Vercel (frontend)
                          ↓
                   MongoDB Atlas (hackaverse_db)
```

| Component | Platform | Root Directory |
|-----------|----------|----------------|
| Backend | Render | `hackathon/` |
| Frontend | Vercel | `hackaverse-frontend/` |
| Database | MongoDB Atlas | External |

**No CI/CD pipeline** — deployment is platform auto-deploy on push.

---

## Backend — Render

### `hackathon/render.yaml`

```yaml
services:
  - type: web
    name: hackathon-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn src.main:app --host 0.0.0.0 --port $PORT
    healthCheckPath: /system/ready
```

### Environment Variables

| Variable | Source | Notes |
|----------|--------|-------|
| `ENV` | `production` | In render.yaml |
| `PORT` | `8000` | In render.yaml |
| `ALLOWED_ORIGINS` | Hardcoded in render.yaml | 3 known frontend domains |
| `API_KEY` | Render Secret (`sync: false`) | Required |
| `JWT_SECRET` | Render Secret | Required |
| `MONGODB_URI` | Render Secret | Required |
| `GROQ_API_KEY` | Render Secret | Required for AI judging |
| `BHIV_CORE_URL` | Placeholder in render.yaml | TODO: Verify |

CORS origins in render.yaml:
- `https://hackaverse-mu.vercel.app`
- `https://hackaverse.vercel.app`
- `https://hackaverse.blackholeinfiverse.com`

### Production URLs

| URL | Source |
|-----|--------|
| `https://hackaverse.blackholeinfiverse.com` | Review packet |
| `https://ai-agent-x2iw.onrender.com` | DEPLOYMENT_NOTES — TODO: Verify if stale |

### Health Checks

| Path | Purpose |
|------|---------|
| `/system/ready` | Render health check (render.yaml) |
| `/health` | General health |
| `/api/v1/system/health` | Versioned system health |

### Cron Job (Placeholder)

```yaml
cron:
  - name: reminder-job
    schedule: "0 9 * * *"
    url: "https://YOUR_APP_ON_RENDER.onrender.com/api/v1/flows/reminder"
```

TODO: Verify if reminder endpoint exists and update URL.

### MongoDB pserv

Render defines a `mongodb` pserv (Docker mongo) — may be legacy; production likely uses Atlas per `.env.example`.

---

## Frontend — Vercel

### Configuration

| Setting | Value |
|---------|-------|
| Root | `hackaverse-frontend/` |
| Build | `npm run build` |
| Output | `dist/` |
| Config | `vercel.json` — SPA rewrites to `/index.html` |

### Environment Variables

```env
VITE_API_URL=https://hackaverse.blackholeinfiverse.com
VITE_API_KEY=<matches backend API_KEY>
VITE_NODE_ENV=production
```

> TODO: Verify production `VITE_API_URL` in Vercel dashboard — DEPLOYMENT_NOTES references `ai-agent-x2iw.onrender.com`.

### Production URL

https://hackaverse-mu.vercel.app

---

## Startup Requirements (Production)

From `main.py` startup:

- `ENV=production` + `JUDGE_MODE=ai` → **requires `GROQ_API_KEY`** or startup fails
- Missing `MONGODB_URI` → degraded mode (DB not connected)

---

## Post-Deploy Verification

```bash
curl https://hackaverse.blackholeinfiverse.com/system/ready
curl https://hackaverse.blackholeinfiverse.com/docs
curl -I https://hackaverse-mu.vercel.app
```

Manual:
- [ ] Register/login as participant
- [ ] Admin login (requires seeded user)
- [ ] No CORS errors in browser console

---

## Known Deployment Constraints

From `DEPLOYMENT_NOTES.md`:

1. Render free tier sleeps after 15 min idle
2. No staging environment
3. Dev and prod may share MongoDB cluster
4. No automated rollback
5. Frontend `API_TIMEOUT=30000` for cold starts

---

## TODO: Verify

- [ ] Canonical production backend URL
- [ ] Vercel env vars match backend
- [ ] Cron job URL and endpoint
- [ ] Whether Render mongo pserv is used vs Atlas
