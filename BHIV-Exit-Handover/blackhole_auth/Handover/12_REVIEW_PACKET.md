# Review Packet — blackhole_auth

**Generated:** 2026-07-05  
**System:** BHIV Core / Blackhole Auth Client  
**Review Time:** < 10 minutes

---

## Entry Points

| File | Purpose |
|------|---------|
| `backend/src/app.js` | Express routes and middleware |
| `backend/src/middleware/blackholeAuth.js` | JWT cookie validation |
| `backend/src/config/env.js` | Required env vars |
| `frontend/src/context/AuthContext.jsx` | Auth state + postMessage |
| `frontend/src/pages/LoginPage.jsx` | Iframe popup login |
| `frontend/src/pages/DashboardPage.jsx` | Product launcher |
| `frontend/src/constants/apps.js` | App catalog |

---

## Core Execution Flow

```
1. User visits /login → enters email
       ↓
2. Iframe → bhiv-auth.onrender.com/login?mode=popup
       ↓
3. Auth server sets blackhole_token cookie
       ↓
4. postMessage: blackhole-auth-success
       ↓
5. GET /api/me → JWT validated → user profile
       ↓
6. /dashboard → launch allowed apps
```

---

## Critical Files

| File | Purpose |
|------|---------|
| `backend/src/middleware/blackholeAuth.js` | Cookie name, JWT verify, requireAuth |
| `backend/src/config/env.js` | JWT_SECRET required at startup |
| `frontend/src/api/client.js` | withCredentials for cookies |
| `frontend/src/constants/apps.js` | 5 product URLs |

---

## Live Runtime Verification

### Backend (local)

```bash
cd backend
npm install
# Set JWT_SECRET in .env
npm run dev

curl http://localhost:8080/api/health
# Expected: {"status":"ok"}
```

### Frontend (local)

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173
```

### External Auth Server

```bash
curl -I https://bhiv-auth.onrender.com
```

> TODO: Verify auth server health endpoint.

---

## Architecture at a Glance

```
React Dashboard (Vite)
    ↓ cookies
Express Auth Client (:8080)
    ↓ shared JWT_SECRET
External Auth Server (bhiv-auth.onrender.com)
    ↓
Product Apps (*.blackholeinfiverse.com)
```

---

## Key Metrics to Verify

| Check | Action | Expected |
|-------|--------|----------|
| Backend health | `GET /api/health` | 200, `{"status":"ok"}` |
| No cookie | `GET /api/me` | 401 |
| Auth server reachable | Browser/curl | 200 |
| Login popup | Manual test | Cookie set, dashboard loads |
| App launch | Click allowed app | Redirects to product URL |

---

## Review Flags

1. **JWT_SECRET sync** — must match auth server
2. **Stale `.env.example`** — misleading vars
3. **Cookie name** — code uses `blackhole_token`, not `bhiv_token`
4. **No deploy config** — production setup undocumented
5. **Client-side app access only** — `requireApp` unused on backend
6. **External dependency** — auth server not in this repo

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] Start backend: `npm run dev`
- [ ] Hit `GET /api/health`
- [ ] Start frontend: `npm run dev`
- [ ] Attempt login flow (requires auth server live)
- [ ] Review `Handover/10_Known_Issues.md`
- [ ] Verify JWT_SECRET coordination plan
- [ ] Confirm auth server handover exists separately

---

## Related Documents

- API: `Handover/06_API_Documentation.md`
- Architecture: `Handover/04_Architecture.md`
- Environment: `Handover/05_Environment_Guide.md`
- Known issues: `Handover/10_Known_Issues.md`
