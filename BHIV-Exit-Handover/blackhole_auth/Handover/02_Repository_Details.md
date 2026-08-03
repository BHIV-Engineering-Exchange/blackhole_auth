# Repository Details — blackhole_auth

**Generated:** 2026-07-05

---

## Repository Name

**blackhole_auth** (product: **BHIV Core Dashboard** / **bhiv-core-auth-client**)

---

## Repository Purpose

SSO product launcher for Blackhole Infiverse applications. Validates JWT cookies from an external auth server and provides a dashboard to launch assigned apps (Setu, Sampada, Niyantran, Gurukul, Mitra).

**This repo is an auth client, not the auth server.** User registration, login, and token issuance happen on `https://bhiv-auth.onrender.com`.

---

## Repository URL

| Type | URL |
|------|-----|
| **Git Remote (origin)** | https://github.com/blackholeinfiverse64/blackhole_auth.git |
| **External Auth Server** | https://bhiv-auth.onrender.com |
| **Production Frontend (inferred)** | https://products.blackholeinfiverse.com |

> TODO: Verify production deployment URLs for this repo's frontend and backend.

---

## Main Branch

`main` (tracks `origin/main`)

---

## Production Branch

`main` — TODO: Verify auto-deploy configuration (no CI/CD or deploy config found in repo).

---

## Build Command

| Component | Command | Location |
|-----------|---------|----------|
| **Backend** | `npm install` | `backend/` |
| **Frontend** | `npm run build` → `vite build` | `frontend/` |

---

## Run Command

| Component | Command | Port |
|-----------|---------|------|
| **Backend (dev)** | `npm run dev` (nodemon) | 8080 |
| **Backend (prod)** | `npm start` (`node src/server.js`) | 8080 (env `PORT`) |
| **Frontend (dev)** | `npm run dev` | 5173 (Vite default) |
| **Frontend (preview)** | `npm run preview` | 4173 |

---

## Dependencies

### Backend (`package.json`)
express, cors, helmet, express-rate-limit, cookie-parser, jsonwebtoken, dotenv

**Dev:** nodemon

### Frontend (`package.json`)
react, react-dom, react-router-dom, axios

**Dev:** vite, @vitejs/plugin-react

---

## Deployment Platform

| Target | Config | Notes |
|--------|--------|-------|
| **Backend** | None in repo | TODO: Verify Render or other host |
| **Frontend** | None in repo | CORS suggests `products.blackholeinfiverse.com` |
| **Auth Server** | External | `bhiv-auth.onrender.com` — separate repo |

---

## Current Status

| Aspect | Status | Evidence |
|--------|--------|----------|
| **Codebase** | Small monorepo (backend + frontend) | ~18 source files |
| **CI Pipeline** | None | No `.github/workflows/` |
| **Tests** | None | No test files |
| **Documentation** | Minimal | No root README |
| **Database** | None | No DB code in backend |
| **Deploy Config** | Missing | No render.yaml, vercel.json, Dockerfile |

---

## Package Names

| Location | Name |
|----------|------|
| `backend/package.json` | `bhiv-core-auth-client` |
| `frontend/package.json` | `bhiv-core-dashboard` |

---

## Registered Apps (Product Launcher)

From `frontend/src/constants/apps.js`:

| Key | Name | URL |
|-----|------|-----|
| `setu` | Setu | https://setu.blackholeinfiverse.com |
| `sampada` | Sampada | https://sampada.blackholeinfiverse.com |
| `niyantran` | Niyantran | https://niyantran.blackholeinfiverse.com |
| `gurukul` | Gurukul | https://gurukul.blackholeinfiverse.com |
| `mitra` | Mitra | https://mitra.blackholeinfiverse.com |

---

## TODO: Verify

- [ ] Production backend URL for this auth client
- [ ] Production frontend URL
- [ ] Which repo hosts `bhiv-auth.onrender.com`
- [ ] Whether `.env` is tracked in git (security)
