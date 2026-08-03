# Rollback Guide — biometric-blackhole

**Generated:** 2026-07-05

---

## When to Rollback

- Health checks fail persistently
- Authentication broken for all users
- Excel processing crashes server
- MongoDB connection failures after deploy
- Critical API regression
- Secrets compromise detected

---

## Rollback Decision Matrix

| Severity | Symptoms | Action |
|----------|----------|--------|
| **Critical** | Data loss, auth broken, secrets exposed | Immediate rollback + secret rotation |
| **High** | Upload/process broken, DB errors | Rollback app + verify DB |
| **Medium** | Reports display broken, export fails | Hotfix or targeted rollback |
| **Low** | UI cosmetic issues | Forward fix preferred |

---

## Pre-Rollback Checklist

- [ ] Identify failing component (backend/frontend/database)
- [ ] Capture logs (Render dashboard or local terminal)
- [ ] Note current commit SHA: `git log -1 --format="%H %s"`
- [ ] Confirm MongoDB backup exists
- [ ] Notify stakeholders

---

## Rollback Procedures

### 1. Render Application Rollback

1. Open [Render Dashboard](https://dashboard.render.com) → `biometric-blackhole` service
2. Navigate to **Deploys** history
3. Select last known good deploy
4. Click **Rollback to this deploy**
5. Verify:
```bash
curl https://biometric-blackhole.onrender.com/api/health
```

> TODO: Verify Render rollback procedure and RTO.

---

### 2. Vercel Frontend Rollback

1. Open [Vercel Dashboard](https://vercel.com/dashboard) → project
2. Navigate to **Deployments**
3. Find last known good deployment
4. Click **⋯** → **Promote to Production**
5. Verify frontend loads and connects to backend

---

### 3. Git Rollback

```bash
git log --oneline -10
git checkout -b rollback/<date> <previous-commit-sha>
# Deploy rollback branch by pushing to main (with approval)
```

> Do not force-push to `main` without explicit approval.

---

### 4. Database Rollback

**MongoDB Atlas restore:**
1. Open Atlas dashboard → Cluster → Backup
2. Restore to point-in-time before failed change
3. Verify data integrity

**Manual restore from dump:**
```bash
mongorestore --uri="$MONGODB_URI" --db=biometric_attendance ./backup/biometric_attendance
```

**Pre-rollback:**
- Stop backend on Render to prevent writes during restore

> TODO: Verify Atlas backup tier supports point-in-time recovery.

---

### 5. Environment Variable Rollback

If deployment included env var changes:
1. Restore previous env vars in Render dashboard
2. Restore `VITE_API_BASE_URL` in Vercel if changed
3. Restart/redeploy services

**Critical vars:**
- `JWT_SECRET_KEY` — changing invalidates all active tokens
- `MONGODB_URI` — must point to correct database
- `PASSWORD_SALT` — changing breaks existing password hashes

---

### 6. Secret Compromise Rollback

If secrets in `render.yaml` or `database.py` were exposed:
1. **Immediately rotate:** MongoDB Atlas password, `JWT_SECRET_KEY`, `PASSWORD_SALT`
2. Update Render env vars with new values
3. Redeploy backend
4. Update Vercel if backend URL changed
5. All users must re-login (JWT invalidated)
6. Review MongoDB Atlas access logs

---

## Post-Rollback Verification

### Health
```bash
curl https://biometric-blackhole.onrender.com/api/health
curl -I https://biometric-blackhole.vercel.app
```

### Manual
- [ ] Register/login works
- [ ] Upload Excel works
- [ ] Reports display data
- [ ] Export works

### Syntax Check
```bash
python -m py_compile backend/attendance_processor.py
python -m py_compile backend/api.py
```

---

## Rollback Communication Template

```
Subject: [ROLLBACK] biometric-blackhole deployment rolled back

Environment: Production
Rollback time: [UTC timestamp]
Reason: [Brief description]
Previous deploy: [Render deploy ID / commit SHA]
Database restored: [Yes/No]
Impact: [User-facing impact]
Next steps: [Investigation plan]
Contact: [On-call engineer]
```

---

## Backup Reference

### MongoDB Atlas
- Dashboard → Cluster → Backup
- Manual: `mongodump --uri="$MONGODB_URI" --db=biometric_attendance`

### Pre-Deploy Backup Command
```bash
mongodump --uri="$MONGODB_URI" --db=biometric_attendance --out=./backup-$(date +%Y%m%d)
```

> TODO: Verify automated backup schedule for production.

---

## Rollback Limitations

| Scenario | Rollback Possible | Notes |
|----------|-------------------|-------|
| Application code regression | Yes | Render/Vercel rollback |
| Env var change (JWT secret) | Yes | All users must re-login |
| Env var change (PASSWORD_SALT) | Partial | Existing passwords may break |
| MongoDB data corruption | Requires restore | mongodump/Atlas PITR |
| Secrets exposed publicly | Rotate immediately | Cannot undo exposure |
| Temp file loss (server restart) | Re-process Excel | Output files in temp folder |
| No CI/CD | Manual rollback only | No automated rollback pipeline |

---

## Related Documents

- `Handover/03_Deployment_Guide.md`
- `Handover/17_Deployment_Checklist.md`
- `Handover/11_Troubleshooting.md`
