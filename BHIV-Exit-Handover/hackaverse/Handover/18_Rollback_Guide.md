# Rollback Guide — hackaverse

**Generated:** 2026-07-05

---

## When to Rollback

- `/system/ready` fails persistently
- Auth broken for all users
- MongoDB connection failures after deploy
- Groq judging crashes production
- CORS misconfiguration blocks all frontend requests
- JWT_SECRET mismatch after deploy
- Secrets compromise

---

## Rollback Decision Matrix

| Severity | Symptoms | Action |
|----------|----------|--------|
| **Critical** | Auth down, data corruption, secrets exposed | Immediate rollback + rotate secrets |
| **High** | Judging broken, submissions fail | Rollback backend |
| **Medium** | Admin UI broken, notifications fail | Hotfix or targeted rollback |
| **Low** | UI cosmetic issues | Forward fix |

---

## Pre-Rollback Checklist

- [ ] Identify failing component
- [ ] Note commit SHA: `git log -1 --format="%H %s"`
- [ ] Capture Render/Vercel logs
- [ ] Confirm MongoDB backup exists
- [ ] Notify stakeholders

---

## Rollback Procedures

### 1. Render Backend Rollback

1. Render dashboard → `hackathon-backend`
2. Deploys → select last known good deploy
3. Rollback
4. Verify:
```bash
curl https://hackaverse.blackholeinfiverse.com/system/ready
```

---

### 2. Vercel Frontend Rollback

1. Vercel dashboard → project
2. Deployments → promote previous production deploy
3. Verify frontend loads and API calls succeed

---

### 3. Git Rollback

```bash
git log --oneline -10
git checkout -b rollback/<date> <previous-commit-sha>
# Deploy with approval — do not force-push main
```

---

### 4. Environment Variable Rollback

If deploy changed secrets:
- Restore previous `JWT_SECRET`, `API_KEY`, `MONGODB_URI`, `GROQ_API_KEY`
- Update Vercel `VITE_API_KEY` and `VITE_API_URL` if changed
- Redeploy both services
- All users must re-login if JWT_SECRET changed

---

### 5. Database Rollback

MongoDB Atlas point-in-time restore or manual mongorestore:

```bash
mongorestore --uri="$MONGODB_URI" --db=hackaverse_db ./backup/hackaverse_db
```

Stop backend during restore to prevent writes.

---

### 6. Secret Compromise

1. Rotate: `JWT_SECRET`, `API_KEY`, `MONGODB_URI` password, `GROQ_API_KEY`
2. Update Render + Vercel env vars
3. Update frontend `VITE_API_KEY`
4. Redeploy both services
5. Invalidate all sessions
6. Review Atlas access logs

See `CREDENTIAL_ROTATION_GUIDE.md`.

---

## Post-Rollback Verification

```bash
curl https://hackaverse.blackholeinfiverse.com/system/ready
curl https://hackaverse.blackholeinfiverse.com/api/v1/system/db-status
cd hackathon && pytest tests/test_health.py -v
```

Manual:
- [ ] Login works
- [ ] Team creation works
- [ ] Submission works
- [ ] Frontend loads

---

## Rollback Limitations

| Scenario | Rollback | Notes |
|----------|----------|-------|
| Backend code regression | Yes | Render rollback |
| Frontend regression | Yes | Vercel promote |
| JWT_SECRET changed | Partial | All users re-login |
| MongoDB migration | Requires restore | Atlas PITR or mongodump |
| Groq API key rotated | Yes | Update env + redeploy |
| Shared dev/prod DB | High risk | Restore affects both |

---

## Communication Template

```
Subject: [ROLLBACK] HackaVerse deployment rolled back

Component: [Backend / Frontend / Both]
Time: [UTC]
Reason: [Brief]
Commit rolled back from: [SHA]
Database restored: [Yes/No]
Secrets rotated: [Yes/No]
Impact: [Description]
```

---

## Related Documents

- `Handover/03_Deployment_Guide.md`
- `Handover/17_Deployment_Checklist.md`
- `CREDENTIAL_ROTATION_GUIDE.md`
