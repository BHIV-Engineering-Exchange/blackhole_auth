# Rollback Guide — Infiverse-HR

**Generated:** 2026-07-06

---

## Overview

Rollback surfaces:

1. **Frontend** — Vercel instant rollback
2. **Backend** — Render rollback per service (×3)
3. **Database** — MongoDB Atlas backup restore

---

## Frontend Rollback (Vercel)

### Option A: Dashboard rollback (fastest)

1. Vercel → Project → Deploys
2. Find last known-good deploy
3. **⋯** → Promote to Production
4. Smoke test frontend

**Recovery time:** 1–5 minutes

### Option B: Git revert

```bash
git revert <bad-commit>
git push origin main
```

Vercel auto-rebuilds from reverted `main`.

---

## Backend Rollback (Render × 3)

Repeat for **Gateway**, **Agent**, and **LangGraph** services:

1. Render dashboard → Service → Deploys
2. Select last known-good deploy
3. Rollback / Redeploy
4. Verify `/health` → 200

**Important:** All three services must be compatible. Rolling back gateway alone may break if API contract changed.

### Coordinated rollback order

1. LangGraph (workflows)
2. Agent (matching)
3. Gateway (API)
4. Frontend (Vercel)

Or rollback all to same git commit timestamp.

---

## Database Rollback (MongoDB Atlas)

### Option A: Atlas backup restore

1. Atlas → Backup → Select restore point
2. Restore to same or new cluster
3. Update `MONGODB_URI` on all Render services if cluster changed

**Warning:** Restores entire database.

### Option B: Targeted data fix

For bad data inserts (not schema):

```javascript
// Example: revert bad job insert
db.jobs.deleteMany({ created_at: { $gte: ISODate("2026-07-06") } })
```

Use with caution. Prefer backup restore for schema migrations.

---

## Environment Rollback

If bad env vars deployed:

1. Render → each service → Environment → restore previous values
2. Vercel → Environment Variables → restore
3. **Redeploy all services** (env baked at build for Vite frontend)

Critical pairs that must stay aligned:

| Frontend | Backend |
|----------|---------|
| VITE_API_BASE_URL | Gateway Render URL |
| VITE_API_KEY | API_KEY_SECRET |
| (none) | JWT secrets (invalidates all tokens if changed) |

---

## Docker Rollback

```bash
cd backend
docker compose -f docker-compose.production.yml down
git checkout <good-commit>
docker compose -f docker-compose.production.yml up --build -d
```

---

## Rollback Decision Matrix

| Symptom | Likely cause | Action |
|---------|--------------|--------|
| Frontend blank / API errors | Wrong Vercel env URLs | Fix env + redeploy OR Vercel rollback |
| All auth fails | JWT secret changed | Restore secrets OR force re-login |
| Matching broken | Agent down or rolled wrong | Rollback agent service |
| Notifications stopped | LangGraph down | Rollback langgraph service |
| CORS errors | CORS_ORIGINS missing origin | Fix gateway env + redeploy |
| Control Center empty | Governance API regression | Rollback gateway to last good deploy |
| Data corruption | Bad migration/script | Atlas backup restore |

---

## Rollback Verification

After rollback:

- [ ] All 3 `/health` endpoints → 200
- [ ] Frontend loads and login works
- [ ] One full hiring flow (apply → shortlist) succeeds
- [ ] Control Center loads (if applicable)
- [ ] No new errors in Render logs
- [ ] Document rollback in deploy log

---

## Prevention

1. Atlas backup before schema changes
2. Vercel preview deploys on PRs
3. Run pytest before merging to `main`
4. Keep env var changelog (names + dates)
5. Deploy backend services from same git commit
6. Use `docs/CENTRAL_CONTROL_API_CONTRACT_FREEZE.md` for Control Center changes

---

## Emergency Contacts

| Role | Contact |
|------|---------|
| System Owner | Rishabh Yadav |
| Infra | Vinayak / Raj |
| Frontend | Nikhil |
| On-call | TODO: Verify |

---

## Rollback Log Template

| Field | Value |
|-------|-------|
| Incident date/time | |
| Symptom | |
| Services rolled back | Gateway / Agent / LangGraph / Vercel |
| Restored to (deploy ID / commit) | |
| DB restore? | Yes / No |
| Verified by | |
| Follow-up ticket | |
