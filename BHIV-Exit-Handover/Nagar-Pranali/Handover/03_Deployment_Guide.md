# Deployment Guide — Nagar-Pranali

**Generated:** 2026-07-06

---

## Architecture Summary

```
┌─────────────────────┐     HTTPS      ┌─────────────────────┐
│  React SPA (Vercel) │ ◄────────────► │  Express (:5000)    │
│  nagar-pranali.*    │   REST /api    │  Render             │
└─────────────────────┘                └──────────┬──────────┘
                                                  │
                                                  ▼
                                         ┌─────────────────┐
                                         │ MySQL (uccis)   │
                                         │ External host   │
                                         └─────────────────┘
```

---

## Backend — Render

**Blueprint:** `render.yaml`

| Setting | Value |
|---------|-------|
| Service name | `uccis-backend` |
| Runtime | Node |
| Root directory | `UCCIS -Main/backend` |
| Build | `npm install` |
| Start | `node server.js` |
| Health check | `/health` |

### Render env vars

| Variable | Required | Notes |
|----------|----------|-------|
| `NODE_ENV` | Yes | `production` (set in render.yaml) |
| `DB_HOST` | Yes | MySQL host |
| `DB_USER` | Yes | MySQL user |
| `DB_PASSWORD` | Yes | MySQL password |
| `DB_NAME` | Yes | `uccis` |
| `DB_SSL` | Yes | `"true"` for production |
| `FRONTEND_URL` | Yes | Comma-separated frontend URLs |
| `PORT` | Auto | Render sets dynamically |

Example `FRONTEND_URL`:
```
https://nagar-pranali.vercel.app,https://nagar-pranali.blackholeinfiverse.app
```

CORS also allows `*.vercel.app` and `*.blackholeinfiverse.app` via regex in `server.js`.

---

## Frontend — Vercel

**Config:** `vercel.json` (repo root)

```json
{
  "installCommand": "cd \"UCCIS -Main/frontend\" && npm install",
  "buildCommand": "cd \"UCCIS -Main/frontend\" && npm run build",
  "outputDirectory": "UCCIS -Main/frontend/dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Vercel env vars

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | `https://nagar-pranali.onrender.com` |

> TODO: Verify Render URL matches deployed backend.

---

## Database — MySQL

### Setup (local or hosted)

```bash
mysql -u root -p < "UCCIS -Main/backend/database/schema.sql"
mysql -u root -p uccis < "UCCIS -Main/backend/database/seed.sql"
```

Seed inserts one runtime log: "UCCIS System Initialized".

### Production MySQL

- Use managed MySQL (PlanetScale, AWS RDS, Render MySQL, etc.) — **TODO: Verify** which host is used in production
- Set `DB_SSL=true` on Render
- Whitelist Render outbound IPs or allow from anywhere with strong password

---

## Local Development

```bash
# 1. MySQL schema + seed
# 2. Backend
cd "UCCIS -Main/backend"
copy .env.example .env
npm install && npm start

# 3. Frontend
cd "UCCIS -Main/frontend"
copy .env.example .env
npm install && npm run dev
```

---

## Demo Trigger (Post-Deploy)

```bash
curl -X POST https://nagar-pranali.onrender.com/api/demo/flood
curl -X POST https://nagar-pranali.onrender.com/api/demo/traffic
curl -X POST https://nagar-pranali.onrender.com/api/demo/medical
curl -X POST https://nagar-pranali.onrender.com/api/demo/power
curl -X POST https://nagar-pranali.onrender.com/api/demo/cyber
```

Verify chain in MySQL or via:
```bash
curl https://nagar-pranali.onrender.com/api/latest-signals
curl https://nagar-pranali.onrender.com/api/latest-incidents
curl https://nagar-pranali.onrender.com/api/latest-runtime
```

---

## Heroku-style Procfile

`UCCIS -Main/backend/Procfile`:
```
web: node server.js
```

Available if deploying to Heroku/Railway — primary target is Render.

---

## Post-Deploy Verification

- [ ] `GET /health` → 200
- [ ] `GET /` → UCCIS status JSON
- [ ] `POST /api/demo/flood` → success with IDs
- [ ] Frontend loads at Vercel URL
- [ ] No CORS errors from frontend origin
- [ ] MySQL tables populated after demo trigger

---

## Not Present

- Docker / docker-compose
- GitHub Actions CI
- Netlify config
- `render.yaml` for frontend (Vercel only)
