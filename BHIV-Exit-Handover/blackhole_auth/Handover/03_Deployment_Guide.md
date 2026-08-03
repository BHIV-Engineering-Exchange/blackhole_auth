# Deployment Guide — blackhole_auth

**Generated:** 2026-07-05

---

## Overview

| Component | Platform | Config in Repo |
|-----------|----------|----------------|
| Backend (Express auth client) | TODO: Verify | **None** |
| Frontend (React dashboard) | TODO: Verify | **None** |
| Auth Server (external) | Render | Not in this repo — `https://bhiv-auth.onrender.com` |

**No render.yaml, vercel.json, Dockerfile, or CI/CD found in this repository.**

---

## Architecture Context

This repo deploys as two services that work together with an **external auth server**:

```
products.blackholeinfiverse.com (frontend — TODO: Verify)
        ↓ calls
Auth client backend (this repo — TODO: Verify URL)
        ↓ validates JWT cookie
Shared JWT_SECRET with bhiv-auth.onrender.com
        ↓ login iframe
bhiv-auth.onrender.com (external auth server)
```

---

## Backend Deployment

### Expected Configuration

| Setting | Value |
|---------|-------|
| Start command | `npm start` or `node src/server.js` |
| Port | `8080` (env `PORT`) |
| Node version | 18+ recommended |

### Required Environment Variables

```env
PORT=8080
NODE_ENV=production
JWT_SECRET=<must-match-auth-server>
AUTH_SERVER_URL=https://bhiv-auth.onrender.com
CORS_ORIGINS=https://products.blackholeinfiverse.com,https://*.blackholeinfiverse.com
```

**Critical:** `JWT_SECRET` must be identical to the auth server's signing secret.

### Health Check

```
GET /api/health
Expected: {"status":"ok"}
```

---

## Frontend Deployment

### Expected Configuration

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist/` |
| Root directory | `frontend/` |
| Framework | Vite |

### Required Environment Variables

```env
VITE_API_BASE_URL=<auth-client-backend-url>
VITE_AUTH_SERVER_URL=https://bhiv-auth.onrender.com
```

From `frontend/src/api/client.js`:
- In dev, if `VITE_API_BASE_URL` contains `blackholeinfiverse.com`, falls back to `http://localhost:8080`
- Default base URL: `http://localhost:8080`

### Inferred Production URL

`https://products.blackholeinfiverse.com` — referenced in `backend/.env.example` CORS_ORIGINS.

> TODO: Verify this is the deployed frontend URL.

---

## External Auth Server

| Item | Value |
|------|-------|
| URL | https://bhiv-auth.onrender.com |
| Role | Issues JWT, sets `blackhole_token` cookie, handles login/logout |
| Repo | TODO: Verify — likely a separate repository |

Login popup URL pattern:
```
{AUTH_SERVER_URL}/login?mode=popup&email={email}&redirect={origin}
```

Logout URL pattern:
```
{AUTH_SERVER_URL}/logout?redirect={origin}
```

---

## Cookie Requirements

For SSO to work across domains in production:

| Setting | Notes |
|---------|-------|
| Cookie name | `blackhole_token` (hardcoded in `blackholeAuth.js`) |
| `COOKIE_DOMAIN` | TODO: Verify on auth server — likely `.blackholeinfiverse.com` |
| `SameSite` / `Secure` | Must allow cross-site iframe + credentialed requests |

The auth server (not this repo) sets the cookie. This repo only reads and validates it.

---

## Manual Deploy Steps (Inferred)

### Backend
1. Connect repo to hosting platform (Render/Railway/etc.)
2. Set root directory to `backend/`
3. Build: `npm install`
4. Start: `npm start`
5. Set env vars (especially `JWT_SECRET`, `CORS_ORIGINS`)

### Frontend
1. Connect repo to Vercel/Netlify/similar
2. Set root directory to `frontend/`
3. Build: `npm run build`
4. Output: `dist/`
5. Set `VITE_API_BASE_URL` and `VITE_AUTH_SERVER_URL`

---

## Post-Deploy Verification

```bash
# Backend health
curl https://<backend-url>/api/health

# Frontend loads
curl -I https://products.blackholeinfiverse.com

# Auth server
curl https://bhiv-auth.onrender.com/api/health
# TODO: Verify auth server health endpoint path
```

Manual:
- [ ] Open frontend, enter email, complete popup login
- [ ] Dashboard shows user email and role
- [ ] Allowed apps are clickable; disallowed apps show "No Access"
- [ ] Logout redirects to auth server and clears session

---

## TODO: Verify

- [ ] Actual production backend and frontend URLs
- [ ] Hosting platforms used
- [ ] Auth server repository and deploy config
- [ ] Cookie domain configuration on auth server
