# Troubleshooting — AI-Artha

**Generated:** 2026-07-05  
**Sources:** `start_readme/troubleshooting.md`, `start_readme/LOCAL_SETUP.md`, codebase configuration

---

## Backend Errors

### MongoServerSelectionError: connect ECONNREFUSED 127.0.0.1:27017

**Cause:** MongoDB is not running.

**Windows fix:**
```cmd
net start MongoDB
```

If service not installed:
```cmd
mkdir C:\data\db
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe" --dbpath "C:\data\db"
```

**Docker fix:**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

---

### Error: JWT_SECRET is required / Missing JWT verification secret

**Cause:** `backend/.env` missing `JWT_SECRET`.

**Fix:** Add to `backend/.env`:
```env
JWT_SECRET=artha-local-dev-jwt-secret-change-this-32chars
```
Value must be at least 32 characters.

---

### HMAC_SECRET / Ledger Hash Errors

**Cause:** Missing `HMAC_SECRET` or changed after seeding.

**Fix (missing):**
```env
HMAC_SECRET=artha-local-hmac-secret-for-ledger-chain
```

**Fix (changed after seed):** Re-seed database:
```bash
cd backend
node scripts/seed.js
```

> Warning: Changing `HMAC_SECRET` invalidates all existing ledger hashes.

---

### Cannot find module 'express' (or similar)

**Cause:** Dependencies not installed.

**Fix:**
```bash
cd backend
npm install
```

---

### CORS Error in Browser

**Cause:** Frontend origin not allowed by backend CORS config.

**Fix:** Ensure `backend/.env` has:
```env
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

For multiple origins:
```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://your-frontend.com
```

Frontend must match exactly (no trailing slash).

---

### 401 Unauthorized on API Calls

**Causes:**
1. Missing or expired JWT token
2. Token not sent in `Authorization: Bearer` header
3. User role insufficient for endpoint

**Fix:**
1. Clear localStorage key `artha_auth_token` and re-login
2. Verify `frontend/.env` has correct `VITE_API_URL`
3. Check user role — signup defaults to `viewer`; upgrade to `admin` or `accountant` for write operations

---

### Access Denied on Frontend Pages

**Cause:** User role is `viewer` but page requires `admin` or `accountant`.

**Fix:** Update user role in database or via admin user management (`/settings/users` — admin only):
```javascript
// MongoDB shell
db.users.updateOne({ email: "user@example.com" }, { $set: { role: "admin" } })
```

---

### MongoDB Transaction Errors in Production

**Cause:** MongoDB not configured as replica set.

**Fix:**
```bash
# Docker production
docker exec artha-mongo-prod mongosh --eval "rs.initiate()"
```

Connection string must include `replicaSet=rs0`:
```
mongodb://user:pass@mongo:27017/artha_prod?authSource=admin&replicaSet=rs0
```

---

### Redis Connection Errors

**Cause:** Redis not running or wrong credentials.

**Fix:** Redis is optional. App works without it (caching disabled).

To enable:
```env
REDIS_HOST=localhost
REDIS_PORT=6379
```

Or comment out Redis vars to skip caching entirely.

---

## Frontend Errors

### API Calls Fail / Network Error

**Cause:** Backend not running or wrong `VITE_API_URL`.

**Fix:**
```env
# frontend/.env
VITE_API_URL=http://localhost:5000/api/v1
```

Restart Vite after changing `.env`:
```bash
cd frontend
npm run dev
```

---

### Blank Page After Build

**Cause:** Vite base path mismatch or nginx misconfiguration.

**Fix:** Check `vite.config.js` base setting. For Docker prod, verify nginx serves `frontend/dist/`.

---

## Docker Issues

### Container Won't Start

**Check logs:**
```bash
docker-compose -f docker-compose.prod.yml logs backend
docker-compose -f docker-compose.prod.yml logs mongo
```

**Common causes:**
- Missing `.env.production` files
- Port conflicts (5000, 5173, 27017)
- Insufficient memory (need 2GB+ RAM)

---

### Docker Build Fails (csv-parse, husky)

**Reference:** `docs/DOCKER_BUILD_FIX.md`

**Fix:** Ensure lock file is up to date:
```bash
cd backend
npm install
```

---

### nginx/SSL Directory Missing

**Cause:** nginx config not in repo; created at deploy.

**Fix:**
```bash
scripts/deploy-prod.sh
# Creates nginx/ directories automatically
```

---

## Deployment Issues

### Render Health Check Failing

**Config:** `backend/render.yaml` — health path `/api/health`, port `10000`

**Verify:**
```bash
curl https://ai-artha.onrender.com/api/health
```

**Common causes:**
- `MONGODB_URI` not set on Render
- `JWT_SECRET` missing
- Cold start timeout on free tier

> TODO: Verify current Render service configuration.

---

### Frontend Can't Reach Production API

**Fix:** Set Vercel env var:
```
VITE_API_URL=https://ai-artha.onrender.com/api/v1
```

Ensure backend CORS allows Vercel domain:
```env
CORS_ALLOWED_ORIGINS=https://ai-artha.vercel.app
```

---

## Data Integrity Issues

### Ledger Chain Verification Fails

**Check:**
```bash
curl -H "Authorization: Bearer <admin-token>" \
  http://localhost:5000/api/v1/ledger/verify-chain
```

**Causes:**
- `HMAC_SECRET` changed after entries created
- Manual database edits bypassing service layer
- Incomplete seed/migration

**Fix:** Re-run hash chain migration or re-seed:
```bash
cd backend
node scripts/migrate-hash-chain.js
node scripts/verify-hash-chain.js
```

---

### Reports Show Zero/Empty Data

**Causes:**
1. No posted journal entries
2. Wrong financial year/period selected
3. GST summary returns empty (known issue — see `Handover/10_Known_Issues.md`)

**Fix:** Verify data exists:
```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/v1/reports/dashboard
```

---

## OCR Issues

### OCR Not Working

**Cause:** Tesseract.js is optional dependency.

**Fix:**
```bash
cd backend
npm install tesseract.js
```

Check status:
```bash
curl -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/v1/expenses/ocr/status
```

---

## SETU Integration

### Signals Not Dispatching

**Cause:** `SETU_ENABLED=false` (default).

**Fix:**
```env
SETU_ENABLED=true
SETU_BASE_URL=<your-setu-url>
SETU_API_KEY=<your-key>
```

Signals are always persisted locally regardless of SETU setting.

---

## Performance Issues

### Slow API Responses

**Checks:**
```bash
curl http://localhost:5000/metrics
curl http://localhost:5000/health/detailed
```

**Fixes:**
1. Enable Redis caching
2. Run index creation: `npm run create-indexes`
3. Check MongoDB connection pool settings

---

## Log Locations

| Environment | Log Location |
|-------------|--------------|
| Local dev | Console (Winston, `LOG_LEVEL=debug`) |
| Docker | `docker-compose logs backend` |
| Render | Render dashboard logs |

> TODO: Verify centralized log aggregation in production.

---

## Quick Diagnostic Commands

```bash
# Health check
curl http://localhost:5000/health/detailed

# Readiness
curl http://localhost:5000/ready

# DB connection test
cd backend && node test-connections.js

# Redis test
cd backend && node test-redis.js

# Seed verification
cd backend && npm run verify:seed

# Full proof suite
cd backend && npm run proof:all
```

---

## Escalation Path

1. Check `Handover/10_Known_Issues.md`
2. Review `start_readme/troubleshooting.md`
3. Run governance pipeline: `cd backend && npm run governance:full`
4. Check runtime evidence: `runtime_health_snapshot.json`

> TODO: Verify support contact and on-call procedures.
