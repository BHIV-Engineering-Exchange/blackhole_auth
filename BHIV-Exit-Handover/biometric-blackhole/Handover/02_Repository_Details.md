# Repository Details — biometric-blackhole

**Generated:** 2026-07-05

---

## Repository Name

**biometric-blackhole** (also referenced as Attendance Processing System)

---

## Repository Purpose

Biometric attendance Excel processing, salary calculation, and reporting platform with JWT authentication, MongoDB storage, and cloud deployment via Render + Vercel.

---

## Repository URL

| Type | URL |
|------|-----|
| **Git Remote (origin)** | https://github.com/blackholeinfiverse64/biometric-blackhole.git |
| **Production Backend** | https://biometric-blackhole.onrender.com |
| **Production Frontend** | https://biometric-blackhole.vercel.app |

> TODO: Verify production URLs are live.

---

## Main Branch

`main` (tracks `origin/main`)

---

## Production Branch

`main` — Render and Vercel auto-deploy on push to `main`.

No CI pipeline — deploy is platform-driven only.

---

## Build Command

| Component | Command | Location |
|-----------|---------|----------|
| **Backend** | `pip install -r requirements.txt` | `backend/` |
| **Frontend** | `npm run build` → `vite build` | `frontend/` |

---

## Run Command

| Component | Command | Port |
|-----------|---------|------|
| **Backend (dev/prod)** | `python api.py` | 5000 (env `PORT`) |
| **Frontend (dev)** | `npm run dev` | 5173 (Vite default) |
| **Frontend (preview)** | `npm run preview` | 4173 |
| **Streamlit (alt)** | `streamlit run app.py` | 8501 |
| **Root scripts** | `start.bat` / `start.sh` | Starts both services |

---

## Dependencies

### Backend (`requirements.txt`)
pandas, openpyxl, streamlit, flask, flask-cors, PyJWT, pymongo, dnspython, certifi

### Frontend (`package.json`)
**Runtime:** react, react-dom, react-router-dom, axios, recharts, jspdf, lucide-react

**Dev:** vite, tailwindcss, autoprefixer, postcss, @vitejs/plugin-react

---

## Deployment Platform

| Target | Config | Notes |
|--------|--------|-------|
| **Render** | `render.yaml` | Web service `biometric-blackhole`, Python 3.11, free plan |
| **Vercel** | `frontend/vercel.json` | Root directory `frontend`, Vite build |

---

## Current Status

| Aspect | Status | Evidence |
|--------|--------|----------|
| **Codebase** | Active monorepo (backend + frontend) | Source present |
| **CI Pipeline** | None | No `.github/workflows/` |
| **Tests** | None | No pytest or frontend tests |
| **Production** | Configured for Render + Vercel | `render.yaml`, `DEPLOYMENT.md` |
| **Documentation** | Extensive root markdown + `backend/docs/` | Many files reference stale Supabase |
| **Database** | MongoDB Atlas | `database.py`, PyMongo |

---

## Key Scripts

| Script | Purpose |
|--------|---------|
| `backend/api.py` | Production Flask REST API entry |
| `backend/app.py` | Streamlit alternate UI |
| `backend/run_demo.py` | Demo runner |
| `backend/create_sample.py` | Sample data generator |
| `start.bat` / `start.sh` | Start backend + frontend |
| `fix_indentation.py` | Fix attendance_processor indentation |

---

## Legacy / Stale Files

| File | Notes |
|------|-------|
| `supabase_schema.sql` | Obsolete — code uses MongoDB |
| `supabase_schema_update.sql` | Obsolete |
| `paid_employees_migration.sql` | Obsolete |
| `DATABASE_MIGRATION_GUIDE.md` | References Supabase migration |
| Multiple `SUPABASE_*.md` files | Stale after MongoDB migration |
