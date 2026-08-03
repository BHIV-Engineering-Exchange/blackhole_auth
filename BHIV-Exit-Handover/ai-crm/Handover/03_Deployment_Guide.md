# Deployment Guide — AI-CRM

**Generated:** 2026-07-05  
**App path:** `Downloads/workflow-blackhole-main/`  
**Sources:** `DEPLOYMENT_FIX_GUIDE.md`, `server/DEPLOYMENT.md`, `client/vercel.json`

---

## Production URL

| Service | URL | Source |
|---------|-----|--------|
| **Backend API** | https://blackholeworkflow.onrender.com | auth-context.jsx fallback |
| **Frontend** | https://blackhole-workflow.vercel.app | server/.env.example |
| **Alt Frontend** | https://main-workflow.vercel.app | auth-context.jsx |

> TODO: Verify all URLs are live and correctly configured.

---

## Development URL

| Service | URL |
|---------|-----|
| **Backend API** | http://localhost:5001/api (code default) |
| **Backend (env example)** | http://localhost:5000/api |
| **Frontend** | http://localhost:5173 |
| **Health ping** | http://localhost:5001/api/ping |

---

## Hosting Provider

| Component | Provider |
|-----------|----------|
| Backend | Render |
| Frontend | Vercel |
| Database | MongoDB Atlas |
| Screenshot storage | Cloudinary |
| AI | Groq, Google Gemini |

---

## Build Steps

### Backend
```bash
cd Downloads/workflow-blackhole-main/server
npm install
# Set environment variables on Render dashboard
```

### Frontend
```bash
cd Downloads/workflow-blackhole-main/client
npm install
npm run build
# Output: client/dist/
```

### Docker
```bash
cd Downloads/workflow-blackhole-main/server
docker build -t infiverse-server .
docker run -p 5000:5000 --env-file .env infiverse-server
```

---

## Deployment Steps

### Backend (Render)

1. Create Web Service on https://render.com
2. Connect GitHub repo (note: build from nested path)
3. Build command: `cd Downloads/workflow-blackhole-main/server && npm install`
4. Start command: `node index.js`
5. Set env vars: `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, `CORS_ORIGIN`, Cloudinary, AI keys
6. Note deployed URL

### Frontend (Vercel)

1. Import project from GitHub
2. Set root directory to `Downloads/workflow-blackhole-main/client`
3. Build command: `npm run build`
4. Output directory: `dist`
5. **Critical:** Set environment variable:
   ```
   VITE_API_URL=https://blackholeworkflow.onrender.com/api
   ```
6. Redeploy

> See `DEPLOYMENT_FIX_GUIDE.md` for fixing `ERR_CONNECTION_REFUSED` when frontend points to localhost.

### PM2 (Linux Server — from DEPLOYMENT.md)

```bash
npm install -g pm2
cd server
pm2 start index.js --name infiverse-server
pm2 save
pm2 startup
```

Monitoring dependencies (Linux): xdotool, scrot, imagemagick, xvfb

---

## Restart Procedure

### Render
Restart via Render dashboard or redeploy.

### PM2
```bash
pm2 restart infiverse-server
pm2 logs infiverse-server
```

### Docker
```bash
docker restart <container-id>
```

---

## Rollback Procedure

See `Handover/18_Rollback_Guide.md`

---

## Health Checks

| Endpoint | Purpose |
|----------|---------|
| `GET /api/ping` | Basic health check |
| `GET /api/test-browser-detection` | Linux monitoring tools test |

**Post-deploy:**
```bash
curl https://blackholeworkflow.onrender.com/api/ping
```

---

## Monitoring

- Server logs via PM2 or Render dashboard
- `LOG_LEVEL` env var (default: `info`)
- Socket.IO connection status in frontend
- Cloudinary dashboard for screenshot storage

**Background jobs (automatic on server start):**
- Midnight auto-end attendance job
- Attendance persistence cron (11:59 PM daily)
- Historical sync (last 30 days on startup)

---

## Environment Requirements

See `Handover/05_Environment_Guide.md`

**Minimum for production:**
- `MONGODB_URI`, `JWT_SECRET`, `FRONTEND_URL`, `CORS_ORIGIN`
- `CLOUDINARY_*` (if monitoring enabled)
- `EMAIL_USER`, `EMAIL_PASSWORD` (if EMS enabled)
- `GEMINI_API_KEY`, `GROQ_API_KEY` (if AI enabled)

---

## Known Deployment Issues

1. **Nested repo path** — Render/Vercel must point to subdirectory
2. **Port mismatch** — align PORT env with code (5000 vs 5001)
3. **Frontend API URL** — must not point to localhost in production
4. **No docker-compose** — manual Docker run only
5. **No CI/CD** — all deployments manual
