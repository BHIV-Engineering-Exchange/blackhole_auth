# Deployment Guide

Deploy the **backend on Render** and the **frontend on Vercel**.

---

## 1. Deploy Backend (Render)

### Option A — Blueprint (recommended)

1. Push this repo to GitHub.
2. Go to [Render Dashboard](https://dashboard.render.com/) → **New** → **Blueprint**.
3. Connect your GitHub repo — Render reads `render.yaml` automatically.
4. After deploy, copy your backend URL (e.g. `https://namami-gange-api.onrender.com`).
5. In Render → your service → **Environment**, set:

   | Key | Value |
   |-----|-------|
   | `FRONTEND_URL` | Your Vercel URL (set after step 2), e.g. `https://namami-gange.vercel.app` |

   For local + production, use comma-separated origins:
   `http://localhost:3000,https://namami-gange.vercel.app`

### Option B — Manual Web Service

1. **New** → **Web Service** → connect your GitHub repo.
2. Settings (**choose one setup**):

   **Setup A — Root Directory = `backend` (recommended)**

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | `backend` |
   | **Runtime** | Python 3 |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `cd src && gunicorn api:app --bind 0.0.0.0:$PORT` |

   **Setup B — Root Directory left blank (repo root)**

   | Setting | Value |
   |---------|-------|
   | **Root Directory** | *(leave empty)* |
   | **Runtime** | Python 3 |
   | **Build Command** | `pip install -r requirements.txt` |
   | **Start Command** | `cd backend/src && gunicorn api:app --bind 0.0.0.0:$PORT` |

3. Add environment variable `FRONTEND_URL` = your Vercel frontend URL.

> **Build failed: `No such file or directory: requirements.txt`** — Root Directory is wrong. Use Setup A or Setup B above.

### Verify backend

```text
GET https://your-app.onrender.com/health
GET https://your-app.onrender.com/results?model=inland_port
```

Both should return HTTP 200.

---

## 2. Deploy Frontend (Vercel)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard) → **Add New** → **Project**.
2. Import your GitHub repo.
3. Configure:

   | Setting | Value |
   |---------|-------|
   | **Framework Preset** | Next.js |
   | **Root Directory** | `frontend` |

4. Add environment variable:

   | Key | Value |
   |-----|-------|
   | `NEXT_PUBLIC_API_URL` | Your Render backend URL, e.g. `https://namami-gange-api.onrender.com` |

5. Click **Deploy**.

### Verify frontend

Open your Vercel URL and confirm:

- Dashboard loads
- Suitability scores appear (backend data)
- Navigation works without errors

---

## 3. Connect Frontend ↔ Backend

After both are live:

1. **Render** → set `FRONTEND_URL` to your exact Vercel URL.
2. **Vercel** → set `NEXT_PUBLIC_API_URL` to your Render URL (no trailing slash).
3. Redeploy both services if you change env vars.

---

## Local Development

### Backend

```bash
cd backend
pip install -r requirements.txt
cd src
python api.py
```

Runs on `http://localhost:5000`

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

Runs on `http://localhost:3000`

---

## Success Criteria

- Frontend loads on Vercel
- Backend `/health` returns HTTP 200 on Render
- `GET /results?model=inland_port` returns data
- Suitability scores visible in the UI
- No CORS errors in the browser console
