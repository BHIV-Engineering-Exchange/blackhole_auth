# Deployment Checklist — Nagar-Pranali

**Generated:** 2026-07-06

---

## Pre-Deploy

### Code

- [ ] Changes merged to `main`
- [ ] `cd "UCCIS -Main/frontend" && npm run build` succeeds locally
- [ ] Backend starts locally with production-like `.env`
- [ ] Demo POST chain works locally
- [ ] No secrets in committed files

### Database

- [ ] MySQL host provisioned
- [ ] `schema.sql` applied to production database
- [ ] `seed.sql` applied
- [ ] Backup taken before any schema change
- [ ] Render can reach MySQL (network/firewall)

---

## Backend Deploy (Render)

### From `render.yaml`

- [ ] Service name: `uccis-backend`
- [ ] Root dir: `UCCIS -Main/backend`
- [ ] Build: `npm install`
- [ ] Start: `node server.js`
- [ ] Health check: `/health`

### Environment variables

- [ ] `NODE_ENV=production`
- [ ] `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- [ ] `DB_SSL=true`
- [ ] `FRONTEND_URL=https://nagar-pranali.vercel.app,https://nagar-pranali.blackholeinfiverse.app`

### Post-deploy

- [ ] `GET /health` → 200
- [ ] `POST /api/demo/flood` → success
- [ ] Check Render logs for "Database Connected"

---

## Frontend Deploy (Vercel)

### From root `vercel.json`

- [ ] Install: `cd "UCCIS -Main/frontend" && npm install`
- [ ] Build: `cd "UCCIS -Main/frontend" && npm run build`
- [ ] Output: `UCCIS -Main/frontend/dist`
- [ ] SPA rewrite to `index.html`

### Environment

- [ ] `VITE_API_URL=https://nagar-pranali.onrender.com` — TODO: Verify URL

### Custom domain (optional)

- [ ] `nagar-pranali.blackholeinfiverse.app` DNS configured
- [ ] SSL certificate active

---

## Post-Deploy Verification

- [ ] Frontend URL loads — dashboard visible
- [ ] Backend health from browser/curl
- [ ] CORS: no errors in browser console
- [ ] Demo scenario on production backend inserts MySQL rows
- [ ] `GET /api/latest-signals` returns data after demo

---

## Demo Day Checklist

From `UCCIS -Main/DEPLOYMENT_GUIDE.md`:

1. [ ] Backend online
2. [ ] Frontend online
3. [ ] Database connected
4. [ ] Dashboard open
5. [ ] Trigger flood scenario (curl or future UI button)
6. [ ] Verify incident in MySQL
7. [ ] Verify escalation in MySQL
8. [ ] Verify decision in MySQL
9. [ ] Verify replay in MySQL
10. [ ] Verify runtime logs in MySQL

---

## Rollback Readiness

- [ ] Previous Render deploy ID noted
- [ ] Previous Vercel deploy ID noted
- [ ] MySQL backup timestamp recorded

---

## Deploy Log Template

| Field | Value |
|-------|-------|
| Date | |
| Deployer | |
| Git commit | |
| Render deploy ID | |
| Vercel deploy ID | |
| MySQL host | |
| Demo POST test | Pass / Fail |
| Frontend load | Pass / Fail |
