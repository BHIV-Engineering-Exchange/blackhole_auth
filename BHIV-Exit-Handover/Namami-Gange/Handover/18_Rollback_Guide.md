# Rollback Guide — Namami-Gange

**Generated:** 2026-07-06

---

## Overview

Rollback surfaces:

1. **Frontend** — Vercel instant rollback
2. **Backend** — Render deploy rollback
3. **No database** in current stack — no DB restore needed

---

## Frontend Rollback (Vercel)

1. Vercel → Project → Deploys
2. Select last known-good deploy
3. Promote to Production
4. Verify dashboard loads and scores appear

**Recovery time:** 1–5 minutes

### Git revert

```bash
git revert <bad-commit>
git push origin main
```

---

## Backend Rollback (Render)

1. Render → `namami-gange-api` → Deploys
2. Rollback to previous deploy
3. Verify:
   ```bash
   curl https://namami-gange-api.onrender.com/health
   curl "https://namami-gange-api.onrender.com/results?model=inland_port"
   ```

---

## Environment Rollback

If bad env vars:

1. Render → restore `FRONTEND_URL`
2. Vercel → restore `NEXT_PUBLIC_API_URL`
3. Redeploy both services

Misaligned env vars cause CORS failures or empty frontend data.

---

## Rollback Decision Matrix

| Symptom | Action |
|---------|--------|
| Frontend build fail | Vercel rollback or fix TypeScript |
| Blank suitability scores | Check `NEXT_PUBLIC_API_URL`; Vercel rollback |
| All API 500 | Render rollback; check gunicorn logs |
| CORS errors | Fix `FRONTEND_URL` on Render |
| Wrong scores after deploy | Render rollback (scoring regression) |
| Simulation broken | Render rollback if simulate_api changed |

---

## Rollback Verification

- [ ] `/health` → 200
- [ ] `/results?model=inland_port` → 6 scored locations
- [ ] Frontend shows scores
- [ ] No CORS errors

---

## Prevention

1. Run `test_determinism.py` before deploy
2. Test `npm run build` locally
3. Use Vercel preview deploys on PR
4. Keep env var changelog
5. Tag git releases before major demo events

---

## Rollback Log

| Field | Value |
|-------|-------|
| Date/time | |
| Symptom | |
| Rolled back | Vercel / Render / both |
| Restored to | Deploy ID / commit |
| Verified by | |
