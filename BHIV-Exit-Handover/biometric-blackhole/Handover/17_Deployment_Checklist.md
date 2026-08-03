# Deployment Checklist — biometric-blackhole

**Generated:** 2026-07-05

---

## Pre-Deployment

### Code & Branch
- [ ] All changes merged to `main`
- [ ] No uncommitted secrets in codebase
- [ ] **Rotate MONGODB_URI** — remove from `render.yaml` and `database.py`
- [ ] **Remove hardcoded JWT/password defaults** from `auth.py`
- [ ] `python -m py_compile backend/attendance_processor.py` passes
- [ ] Review `Handover/09_Pending_Work.md` for blockers

### Environment Configuration (Render)
- [ ] `MONGODB_URI` set in Render dashboard (not in render.yaml)
- [ ] `JWT_SECRET_KEY` set (auto-generated or manual)
- [ ] `PASSWORD_SALT` set (auto-generated or manual)
- [ ] `MONGODB_DB_NAME=biometric_attendance` (if non-default needed)
- [ ] `PORT=5000`

### Environment Configuration (Vercel)
- [ ] `VITE_API_BASE_URL=https://biometric-blackhole.onrender.com`
- [ ] Frontend build tested: `cd frontend && npm run build`

### Infrastructure
- [ ] MongoDB Atlas cluster running
- [ ] MongoDB IP whitelist includes Render egress
- [ ] Render service connected to GitHub repo
- [ ] Vercel project connected to GitHub repo

### Database
- [ ] Pre-deployment backup taken (mongodump or Atlas snapshot)
- [ ] Indexes verified: `init_db()` runs on startup

---

## Deployment Steps

### Backend (Render)

1. Push to `main` → Render auto-builds
2. Monitor Render build logs for pip install success
3. Monitor deploy logs for Python startup
4. Verify health check passes

Manual trigger: Render dashboard → Manual Deploy

### Frontend (Vercel)

1. Push to `main` → Vercel auto-builds
2. Monitor build logs for `npm run build` success
3. Verify deployment URL loads

Manual trigger: Vercel dashboard → Redeploy

---

## Post-Deployment Verification

### Automated Checks

```bash
# Backend health
curl https://biometric-blackhole.onrender.com/api/health

# Frontend loads
curl -I https://biometric-blackhole.vercel.app
```

Expected health response:
```json
{"status": "healthy", "message": "API is running"}
```

### Manual Checks
- [ ] Register new test account on production
- [ ] Login works
- [ ] Upload Excel file on `/upload`
- [ ] Data appears on `/reports`
- [ ] Hour rates can be saved
- [ ] Export/download works
- [ ] Logout works
- [ ] CORS allows frontend → backend requests

### Security Checks
- [ ] No secrets visible in public repo
- [ ] `/api/download` auth status reviewed (known issue if unprotected)
- [ ] MongoDB Atlas access restricted appropriately

---

## Rollback Plan

If deployment fails:
1. Render: Dashboard → Deploys → Rollback to previous
2. Vercel: Dashboard → Deployments → Promote previous
3. Database: Restore from pre-deploy backup if needed

See: `Handover/18_Rollback_Guide.md`

---

## Deployment Communication Template

```
Subject: [DEPLOY] biometric-blackhole deployed to production

Environment: Production
Deploy time: [UTC timestamp]
Commit: [SHA]
Backend: https://biometric-blackhole.onrender.com
Frontend: https://biometric-blackhole.vercel.app
Health check: PASS/FAIL
Manual tests: PASS/FAIL
Rollback plan: Render/Vercel rollback + MongoDB restore
```

---

## First Deploy Checklist (New Environment)

- [ ] Create MongoDB Atlas cluster and user
- [ ] Create Render web service from `render.yaml`
- [ ] Set all Render env vars
- [ ] Create Vercel project pointing to `frontend/`
- [ ] Set `VITE_API_BASE_URL` in Vercel
- [ ] Update CORS origins in `api.py` if frontend URL differs
- [ ] Run full `14_Testing_Checklist.md`

---

## TODO: Verify

- [ ] Production URLs before using in checklist
- [ ] Render plan tier and resource limits
- [ ] Vercel project configuration matches repo structure
