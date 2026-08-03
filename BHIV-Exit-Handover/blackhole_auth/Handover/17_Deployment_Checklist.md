# Deployment Checklist — blackhole_auth

**Generated:** 2026-07-05

---

## Pre-Deployment

### Code & Branch
- [ ] All changes merged to `main`
- [ ] No secrets committed in codebase
- [ ] **Verify JWT_SECRET not in git history**
- [ ] Review `Handover/09_Pending_Work.md` for blockers
- [ ] Fix stale `.env.example` (recommended)

### Backend Environment
- [ ] `JWT_SECRET` set — **matches auth server exactly**
- [ ] `AUTH_SERVER_URL=https://bhiv-auth.onrender.com`
- [ ] `CORS_ORIGINS` includes frontend production URL
- [ ] `NODE_ENV=production`
- [ ] `PORT` set (default 8080)

### Frontend Environment
- [ ] `VITE_API_BASE_URL` set to production backend URL
- [ ] `VITE_AUTH_SERVER_URL=https://bhiv-auth.onrender.com`
- [ ] Frontend build tested: `npm run build`

### External Auth Server
- [ ] Auth server deployed and healthy
- [ ] Auth server `JWT_SECRET` matches client
- [ ] Cookie `blackhole_token` domain configured for production
- [ ] Auth server CORS/redirect URLs include frontend origin

### Infrastructure
- [ ] Backend hosting configured (TODO: platform unknown)
- [ ] Frontend hosting configured (TODO: platform unknown)
- [ ] HTTPS enabled on all domains
- [ ] DNS records point to correct hosts

---

## Deployment Steps

### Backend (Inferred)

1. Deploy `backend/` to hosting platform
2. Build: `npm install --production`
3. Start: `npm start`
4. Set all env vars
5. Verify health check passes

### Frontend (Inferred)

1. Deploy `frontend/` to static hosting
2. Build: `npm install && npm run build`
3. Output: `dist/`
4. Set Vite env vars before build
5. Verify SPA routing (all paths → index.html)

---

## Post-Deployment Verification

### Automated

```bash
curl https://<backend-url>/api/health
curl -I https://products.blackholeinfiverse.com
curl -I https://bhiv-auth.onrender.com
```

### Manual SSO Flow
- [ ] Open production frontend
- [ ] Click login, enter email
- [ ] Auth popup completes successfully
- [ ] Dashboard shows user email and role
- [ ] Allowed apps launch correctly
- [ ] Logout clears session

### Cookie Verification
- [ ] `blackhole_token` cookie present after login
- [ ] Cookie domain allows cross-subdomain access
- [ ] Cookie sent on `/api/me` requests

---

## Rollback Plan

See `Handover/18_Rollback_Guide.md`

---

## Deployment Communication Template

```
Subject: [DEPLOY] blackhole_auth (BHIV Core) deployed

Frontend: https://products.blackholeinfiverse.com (TODO: Verify)
Backend: https://<backend-url> (TODO: Verify)
Auth server: https://bhiv-auth.onrender.com
Health check: PASS/FAIL
SSO flow test: PASS/FAIL
JWT_SECRET synced: YES/NO
```

---

## TODO: Verify

- [ ] Actual hosting platforms and URLs
- [ ] Auth server deploy coordination process
- [ ] Whether frontend and backend deploy independently
