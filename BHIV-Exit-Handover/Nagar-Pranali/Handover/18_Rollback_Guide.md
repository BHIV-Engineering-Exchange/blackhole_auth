# Rollback Guide — Nagar-Pranali

**Generated:** 2026-07-06

---

## Overview

Rollback surfaces:

1. **Frontend** — Vercel instant rollback
2. **Backend** — Render deploy rollback
3. **Database** — MySQL backup restore

---

## Frontend Rollback (Vercel)

1. Vercel → Project → Deploys
2. Select last known-good deploy
3. **Promote to Production**
4. Verify frontend loads

**Recovery time:** 1–5 minutes

### Git revert alternative

```bash
git revert <bad-commit>
git push origin main
```

---

## Backend Rollback (Render)

1. Render → `uccis-backend` → Deploys
2. Select last known-good deploy
3. Rollback
4. Verify `GET /health` → 200
5. Test `POST /api/demo/flood`

---

## Database Rollback (MySQL)

### Full restore

```bash
mysql -u user -p uccis < backup_before_deploy.sql
```

### Partial cleanup (demo data only)

```sql
USE uccis;
TRUNCATE TABLE runtime_logs;
TRUNCATE TABLE replay_records;
TRUNCATE TABLE decisions;
TRUNCATE TABLE escalations;
TRUNCATE TABLE incidents;
TRUNCATE TABLE telemetry;
TRUNCATE TABLE signals;
-- Re-run seed.sql
```

> TRUNCATE order matters due to logical dependencies. No FK constraints in schema.

---

## Environment Rollback

If bad env vars deployed:

1. Render → Environment → restore previous `DB_*` / `FRONTEND_URL`
2. Vercel → restore previous `VITE_API_URL`
3. Redeploy both services

---

## Rollback Decision Matrix

| Symptom | Action |
|---------|--------|
| Frontend blank / build fail | Vercel rollback |
| All API 500 errors | Check Render logs; rollback backend |
| DB connection errors | Fix env vars or restore MySQL backup |
| CORS errors after deploy | Fix `FRONTEND_URL` on Render |
| Demo POST fails | Check MySQL; rollback backend if code regression |
| UI wrong but API OK | Vercel rollback (or expected — UI is static) |

---

## Rollback Verification

- [ ] `/health` → 200
- [ ] `POST /api/demo/flood` → success
- [ ] Frontend loads
- [ ] MySQL accessible
- [ ] Document incident in deploy log

---

## Prevention

1. MySQL backup before schema changes
2. Test demo chain locally before push
3. Vercel preview deploys on PR (if enabled)
4. Keep env var changelog
5. Fix schema mismatches before major demo

---

## Rollback Log Template

| Field | Value |
|-------|-------|
| Date/time | |
| Symptom | |
| Rollback type | Vercel / Render / MySQL |
| Restored to | Deploy ID / backup file |
| Verified by | |
