# Rollback Guide — AI-CRM

**Generated:** 2026-07-05

---

## When to Rollback

- `/api/ping` fails persistently
- Authentication broken after deploy
- Frontend API URL misconfigured (localhost calls)
- Database corruption from schema change
- Monitoring causing server OOM/crashes

---

## Rollback Procedures

### 1. Render Backend Rollback

1. Open Render dashboard → web service
2. Deploys → select last good deploy
3. Rollback to this deploy
4. Verify: `curl https://blackholeworkflow.onrender.com/api/ping`

> TODO: Verify Render rollback RTO.

---

### 2. Vercel Frontend Rollback

1. Vercel dashboard → Deployments
2. Find last good deployment
3. Promote to Production
4. Verify frontend loads and API calls hit Render (not localhost)

---

### 3. Git Rollback

```bash
git log --oneline -10
git checkout -b rollback/<date> <previous-commit-sha>
# Redeploy from rollback branch
```

> Do not force-push to main without approval.

---

### 4. Environment Variable Rollback

If deploy changed env vars:
1. Restore previous values in Render/Vercel dashboards
2. Restart services

**Critical vars:**
- `JWT_SECRET` — changing invalidates all tokens
- `VITE_API_URL` — must point to correct backend
- `MONGODB_URI` — must point to correct database

---

### 5. Database Rollback

**MongoDB Atlas:**
1. Dashboard → Database → Backups
2. Restore to point-in-time before failed change

**Manual:**
```bash
mongodump --uri="<MONGODB_URI>" --out=backup/
# Restore:
mongorestore --uri="<MONGODB_URI>" --drop backup/
```

> Stop backend before restore to prevent writes.

---

### 6. PM2 Rollback (if using PM2)

```bash
pm2 stop infiverse-server
# Checkout previous code version
git checkout <previous-sha>
npm install
pm2 restart infiverse-server
```

---

## Post-Rollback Verification

```bash
curl https://blackholeworkflow.onrender.com/api/ping
# Test login
curl -X POST https://blackholeworkflow.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<email>","password":"<password>"}'
```

- [ ] Ping returns 200
- [ ] Login works
- [ ] Frontend loads and connects to backend
- [ ] Socket.IO connects

---

## Rollback Communication Template

```
Subject: [ROLLBACK] AI-CRM (Infiverse BHL) deployment rolled back

Environment: Production
Rollback time: [UTC]
Reason: [Description]
Previous deploy: [ID/commit]
Impact: [User impact]
Next steps: [Plan]
Contact: [On-call]
```

---

## Rollback Limitations

| Scenario | Rollback | Notes |
|----------|----------|-------|
| Code regression | Yes | Render/Vercel rollback |
| Env var change | Yes | Restore previous values |
| JWT secret change | Partial | All users must re-login |
| MongoDB schema change | Partial | Atlas PITR or mongorestore |
| Cloudinary files deleted | Partial | Cloudinary versioning |
| Password hashing migration | Complex | Requires data migration plan |

---

## Backup Reference

- **MongoDB Atlas:** Dashboard backups (TODO: Verify schedule)
- **Manual:** `mongodump` before any deployment
- **Code:** Git tags/commits before deploy

---

## Related Documents

- `Handover/03_Deployment_Guide.md`
- `Handover/17_Deployment_Checklist.md`
- `DEPLOYMENT_FIX_GUIDE.md`
