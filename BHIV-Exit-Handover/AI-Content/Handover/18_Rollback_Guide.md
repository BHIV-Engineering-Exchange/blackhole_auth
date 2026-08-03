# Rollback Guide — AI-Content

**Generated:** 2026-07-05

---

## When to Rollback

- Health checks fail persistently
- Database migration caused data corruption
- Authentication broken for all users
- Video generation crashing server (OOM/FFmpeg)
- Critical API regression
- Secrets compromise detected

---

## Rollback Decision Matrix

| Severity | Symptoms | Action |
|----------|----------|--------|
| **Critical** | Data loss, auth broken, secrets exposed | Immediate rollback + secret rotation |
| **High** | Upload/video broken, DB errors | Rollback app + verify DB |
| **Medium** | Analytics/monitoring broken | Hotfix or targeted rollback |
| **Low** | UI cosmetic issues | Forward fix preferred |

---

## Pre-Rollback Checklist

- [ ] Identify failing component
- [ ] Capture logs (Render dashboard or local)
- [ ] Note current commit SHA: `git log -1 --format="%H %s"`
- [ ] Confirm database backup exists
- [ ] Notify stakeholders

---

## Rollback Procedures

### 1. Render Application Rollback

1. Open Render dashboard → `ai-uploader-agent` service
2. Navigate to **Deploys** history
3. Select last known good deploy
4. Click **Rollback to this deploy**
5. Verify:
```bash
curl https://ai-agent-aff6.onrender.com/health
python backend/verify_deployment.py
```

> TODO: Verify Render rollback procedure and RTO.

---

### 2. Docker Image Rollback

```bash
# Pull previous image tag from Docker Hub
docker pull ashmitpandey299/ai-uploader-agent:<previous-tag>

# Redeploy with previous tag
docker run -p 9000:9000 --env-file .env ashmitpandey299/ai-uploader-agent:<previous-tag>
```

Or via Docker Compose:
```bash
cd backend/docker/deployment
docker-compose down
# Update image tag in compose file
docker-compose up -d
```

---

### 3. Git Rollback

```bash
git log --oneline -10
git checkout -b rollback/<date> <previous-commit-sha>
# Deploy rollback branch via CI or manual deploy
```

> Do not force-push to `main` without explicit approval.

---

### 4. Database Rollback

**Alembic downgrade:**
```bash
cd backend
alembic current
alembic downgrade -1   # One revision back
# Or downgrade to specific revision:
alembic downgrade <revision_id>
```

**Supabase restore:**
1. Open Supabase dashboard → Database → Backups
2. Restore to point-in-time before failed migration
3. Verify data integrity

> TODO: Verify Supabase point-in-time recovery configuration.

**Pre-rollback:**
- Stop backend to prevent writes during restore

---

### 5. Environment Variable Rollback

If deployment included env var changes:
1. Restore previous env vars from backup/documentation in Render dashboard
2. Restart service

**Critical vars:**
- `JWT_SECRET_KEY` — changing invalidates all active tokens
- `DATABASE_URL` — must point to correct database

---

### 6. Secret Compromise Rollback

If secrets in `render.yaml` were exposed:
1. **Immediately rotate:** JWT_SECRET_KEY, DATABASE_URL password, SENTRY_DSN, POSTHOG_API_KEY
2. Update Render env vars with new values
3. Force redeploy: `python scripts/deployment/force_deployment.py`
4. Invalidate all existing JWT tokens (users must re-login)
5. Review Supabase access logs for unauthorized access

---

## Post-Rollback Verification

### Health
```bash
curl https://ai-agent-aff6.onrender.com/health
curl https://ai-agent-aff6.onrender.com/health/detailed
```

### Automated
```bash
cd backend
python verify_deployment.py
python scripts/deployment/deployment_validation.py
pytest tests/integration/test_auth_flow.py -v
```

### Manual
- [ ] Login works
- [ ] Upload works
- [ ] Content listing works
- [ ] Dashboard loads

---

## Rollback Communication Template

```
Subject: [ROLLBACK] AI-Content deployment rolled back

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

### Supabase
- Dashboard → Database → Backups
- Manual: `pg_dump` with connection string from `DATABASE_URL`

### Local SQLite (dev fallback)
```bash
cp backend/ai_agent.db backend/ai_agent.db.backup
# or
cp backend/data.db backend/data.db.backup
```

### Local Bucket
```bash
cp -r backend/bucket/ backend/bucket.backup/
```

> TODO: Verify automated backup schedule for production.

---

## Rollback Limitations

| Scenario | Rollback Possible | Notes |
|----------|-------------------|-------|
| Application code regression | Yes | Render rollback or redeploy |
| Alembic migration (additive) | Partial | Downgrade may lose new columns |
| Alembic migration (destructive) | Requires DB restore | pg_dump/Supabase PITR |
| JWT secret changed | Yes | All users must re-login |
| Secrets exposed publicly | Rotate immediately | Cannot undo exposure |
| Supabase storage files deleted | Partial | Supabase storage versioning |
| RL agent state | No rollback | Agent re-learns from feedback |

---

## Related Documents

- `Handover/03_Deployment_Guide.md`
- `Handover/17_Deployment_Checklist.md`
- `Handover/11_Troubleshooting.md`
