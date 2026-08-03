# Deployment Guide — Namami-Gange

**Generated:** 2026-07-06  
**Also see:** `DEPLOYMENT_GUIDE.md` (repo root)

---

## Architecture Summary

```
┌─────────────────────┐     HTTPS/CORS     ┌─────────────────────┐
│  Next.js (Vercel)   │ ◄───────────────► │  Flask (Render)     │
│  namami-gange-ui    │   REST JSON       │  namami-gange-api   │
└─────────────────────┘                   └─────────────────────┘
                                                    │
                                                    ▼
                                          CSV data + hardcoded entities
                                          (no DB in deployed API)
```

---

## Backend — Render

**Blueprint:** `render.yaml`

| Setting | Value |
|---------|-------|
| Service name | `namami-gange-api` |
| Runtime | Python 3.11.9 |
| Root directory | `backend` |
| Build | `pip install -r requirements.txt` |
| Start | `cd src && gunicorn api:app --bind 0.0.0.0:$PORT` |
| Health check | `/health` |

### Environment variables (Render dashboard)

| Variable | Value |
|----------|-------|
| `PYTHON_VERSION` | `3.11.9` (in render.yaml) |
| `FRONTEND_URL` | `http://localhost:3000,https://namami-gange.vercel.app` |

Use comma-separated origins for local + production.

### Manual setup alternative

If not using Blueprint, set **Root Directory** to `backend` OR use repo root with start command `cd backend/src && gunicorn api:app --bind 0.0.0.0:$PORT`.

> Build fails with "No such file or directory: requirements.txt" when Root Directory is wrong.

### Verify backend

```bash
curl https://namami-gange-api.onrender.com/health
curl "https://namami-gange-api.onrender.com/results?model=inland_port"
```

Both should return HTTP 200. TODO: Verify URL is live.

---

## Frontend — Vercel

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root directory | `frontend` |
| Build | `npm run build` |
| Output | `.next` (default) |

Config also in `frontend/vercel.json`.

### Vercel env vars

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://namami-gange-api.onrender.com` (no trailing slash) |

---

## Connect Frontend ↔ Backend

1. Render: set `FRONTEND_URL` to exact Vercel URL
2. Vercel: set `NEXT_PUBLIC_API_URL` to Render URL
3. Redeploy both after env changes

---

## Local Development

```bash
# Backend
cd backend && pip install -r requirements.txt
cd src && python api.py

# Frontend
cd frontend
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
npm install && npm run dev
```

---

## Post-Deploy Verification

- [ ] Frontend loads on Vercel
- [ ] `/health` returns 200 on Render
- [ ] `GET /results?model=inland_port` returns scored locations
- [ ] Dashboard shows suitability scores from backend
- [ ] No CORS errors in browser console

---

## Not Present

- Docker / docker-compose in repo
- CI/CD pipeline
- Database deployment (API uses in-memory/CSV + hardcoded entities)

---

## Success Criteria (from repo docs)

Per `DEPLOYMENT_GUIDE.md` and `REVIEW_PACKET.md`:

- Integration endpoint `GET /results?model=inland_port` works end-to-end
- Ready for demonstration deployment
