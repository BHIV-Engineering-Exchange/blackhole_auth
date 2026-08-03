# Rollback Guide — AI-Artha

**Generated:** 2026-07-05  
**Sources:** `scripts/restore.sh`, `scripts/backup*.sh`, `docs/DEPLOYMENT.md`

---

## When to Rollback

Initiate rollback when:

- Health checks fail persistently (`/health`, `/ready`)
- Ledger hash chain verification fails post-deployment
- Authentication or authorization broken for all users
- Data corruption or partial writes detected
- Critical regression in GST/TDS/reporting functionality
- Database migration caused data loss

---

## Rollback Decision Matrix

| Severity | Symptoms | Action |
|----------|----------|--------|
| **Critical** | Data loss, auth broken, ledger chain invalid | Immediate full rollback |
| **High** | Core features broken (invoices, reports) | Rollback application + verify DB |
| **Medium** | Non-critical feature regression | Hotfix or targeted rollback |
| **Low** | UI cosmetic issues | Forward fix preferred |

---

## Pre-Rollback Checklist

- [ ] Identify failing component (backend, frontend, database)
- [ ] Capture current state logs:
```bash
docker-compose -f docker-compose.prod.yml logs backend > rollback_logs_backend.txt
docker-compose -f docker-compose.prod.yml logs mongo > rollback_logs_mongo.txt
```
- [ ] Note current deployment version/commit SHA:
```bash
git log -1 --format="%H %s"
```
- [ ] Confirm backup exists from before deployment:
```bash
ls -la backups/   # or backup directory used by scripts
```
- [ ] Notify stakeholders of planned rollback
- [ ] Document reason for rollback

---

## Rollback Procedures

### 1. Application Rollback (Docker)

**Revert to previous Docker images:**

```bash
# Stop current deployment
docker-compose -f docker-compose.prod.yml down

# If using tagged images, deploy previous tag
# TODO: Verify image tagging strategy in deploy scripts

# Redeploy previous version
git checkout <previous-commit-sha>
docker-compose -f docker-compose.prod.yml build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Re-initialize if needed
docker exec artha-mongo-prod mongosh --eval "rs.status()"
docker exec artha-backend-prod npm run create-indexes
```

**Verify after rollback:**
```bash
curl http://localhost:5000/health/detailed
curl http://localhost:5000/ready
```

---

### 2. Application Rollback (Render)

1. Open Render dashboard for `artha-backend` service
2. Navigate to **Deploys** history
3. Select previous successful deploy
4. Click **Rollback to this deploy**
5. Verify health: `GET https://ai-artha.onrender.com/api/health`

> TODO: Verify Render rollback procedure and rollback time estimate.

---

### 3. Application Rollback (Vercel Frontend)

1. Open Vercel dashboard for frontend project
2. Navigate to **Deployments**
3. Find previous successful deployment
4. Click **Promote to Production**

> TODO: Verify Vercel project name and deployment history access.

---

### 4. Database Rollback

**Restore from backup:**

```bash
# Using restore script
./scripts/restore.sh <backup-file-path>

# Manual restore (Docker production)
docker exec -i artha-mongo-prod mongorestore \
  --uri="mongodb://<user>:<pass>@localhost:27017/artha_prod?authSource=admin" \
  --drop \
  /backup/<backup-directory>
```

**Windows:**
```cmd
scripts\restore.sh <backup-file-path>
```

**Pre-restore:**
- [ ] Stop backend to prevent writes during restore:
```bash
docker-compose -f docker-compose.prod.yml stop backend
```

**Post-restore:**
- [ ] Restart backend:
```bash
docker-compose -f docker-compose.prod.yml start backend
```
- [ ] Verify data integrity:
```bash
curl -H "Authorization: Bearer <admin-token>" \
  http://localhost:5000/api/v1/ledger/verify-chain
cd backend && npm run verify:seed
```

---

### 5. Environment Variable Rollback

If deployment included env var changes:

1. Restore previous env vars from backup/documentation
2. Restart affected services

**Critical vars to verify:**
- `JWT_SECRET` — changing invalidates all active tokens (users must re-login)
- `HMAC_SECRET` — changing invalidates ledger hash chain
- `MONGODB_URI` — must point to correct database
- `CORS_ORIGIN` — must match frontend domain

> **Warning:** Rolling back `HMAC_SECRET` to a previous value only works if the database was also restored to match that secret's era.

---

### 6. Git Rollback

```bash
# Identify previous stable commit
git log --oneline -10

# Create rollback branch from previous commit
git checkout -b rollback/<date> <previous-commit-sha>

# Deploy rollback branch
# TODO: Verify deployment process for rollback branches
```

> Do not force-push to `main` without explicit approval.

---

## Post-Rollback Verification

### Health Checks
```bash
curl http://localhost:5000/health
curl http://localhost:5000/health/detailed
curl http://localhost:5000/ready
curl http://localhost:5000/live
```

- [ ] All health endpoints return 200
- [ ] MongoDB status: connected
- [ ] Redis status: connected or gracefully skipped

### Functional Verification
- [ ] Login works
- [ ] Dashboard loads with data
- [ ] Invoice list accessible
- [ ] Reports return data
- [ ] Ledger chain verification passes (admin)

### Proof Suite (Recommended)
```bash
cd backend
npm run proof:all
npm run verify:hash-chain
```

---

## Rollback Communication Template

```
Subject: [ROLLBACK] AI-Artha deployment rolled back

Environment: [Production/Staging]
Rollback time: [UTC timestamp]
Reason: [Brief description]
Previous version: [commit SHA / deploy ID]
Current version: [rolled-back commit SHA / deploy ID]
Database restored: [Yes/No]
Impact: [User-facing impact description]
Next steps: [Investigation plan]
Contact: [On-call engineer]
```

---

## Backup Reference

### Create Backup (Before Any Deployment)

```bash
# Standard backup
./scripts/backup.sh

# Production backup
./scripts/backup-prod.sh

# Windows
scripts\backup-prod.bat
```

### Backup Schedule

> TODO: Verify automated backup schedule in production.

Recommended: Daily automated backups with 30-day retention.

---

## Rollback Limitations

| Scenario | Rollback Possible | Notes |
|----------|-------------------|-------|
| Application code regression | Yes | Redeploy previous version |
| Database schema change | Partial | Requires DB restore from backup |
| HMAC_SECRET changed + new entries posted | Complex | Must restore DB to pre-change state |
| JWT_SECRET changed | Yes | Users must re-login after rollback |
| SETU signals dispatched | No rollback | External system — manual reconciliation |
| File uploads to S3 | Partial | S3 versioning required for object rollback |

---

## Escalation

If rollback fails or data integrity cannot be confirmed:

1. Stop all write traffic (stop backend containers)
2. Preserve logs and database state
3. Run independent verification: `cd backend && npm run verify:all`
4. Contact database administrator for MongoDB Atlas point-in-time recovery

> TODO: Verify MongoDB Atlas point-in-time recovery configuration and RPO/RTO targets.

---

## Related Documents

- `Handover/03_Deployment_Guide.md` — Deployment procedures
- `Handover/17_Deployment_Checklist.md` — Pre/post deploy checklist
- `Handover/11_Troubleshooting.md` — Common issues
- `docs/DEPLOYMENT.md` — Full deployment guide
