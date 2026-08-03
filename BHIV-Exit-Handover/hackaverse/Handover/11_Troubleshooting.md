# Troubleshooting — hackaverse

**Generated:** 2026-07-05  
**Sources:** `SYSTEM_HANDOVER.md`, `ONBOARDING_FAQ.md`, `FAILURE_MAP.md`, codebase

---

## Backend Startup

### Missing GROQ_API_KEY in Production

**Error:** `GROQ_API_KEY must be set for production AI judging`

**Cause:** `ENV=production` and `JUDGE_MODE=ai` without Groq key.

**Fix:** Set `GROQ_API_KEY` in Render secrets, or use `JUDGE_MODE=demo` for non-production.

---

### Degraded Mode — Database Not Connected

**Log:** `[WARNING] Backend Started in Degraded Mode`

**Cause:** Missing or invalid `MONGODB_URI`.

**Fix:**
```bash
# hackathon/.env
MONGODB_URI=mongodb+srv://...
BUCKET_DB_NAME=hackaverse_db
```

Verify: `GET /api/v1/system/db-status`

---

### Missing JWT_SECRET

Startup may use dev default `hackaverse-dev-secret-change-me` — **rotate for production**.

---

## Authentication

### 401 Invalid Token

**Causes:** Expired JWT, wrong `JWT_SECRET`, malformed Authorization header.

**Fix:** Re-login. Verify `JWT_SECRET` matches between deploys.

---

### API Key Rejected

**Error:** `Invalid or missing API Key`

**Fix:** Ensure frontend `VITE_API_KEY` matches backend `API_KEY`. Cannot use `default_key` in production.

---

### CSRF 403

**Error:** `CSRF token missing or invalid`

**Fix:** Call `GET /csrf-token` first, send `X-CSRF-Token` header on mutating requests when cookies present.

---

## Frontend

### CORS Errors

**Fix:** Add frontend origin to backend `ALLOWED_ORIGINS`:
```env
ALLOWED_ORIGINS=https://hackaverse-mu.vercel.app,http://localhost:3000
```

---

### API Timeout on First Request

**Cause:** Render cold start (30–60s).

**Fix:** Wait and retry. `API_TIMEOUT=30000` in frontend. Consider paid Render tier.

---

### Wrong API URL

**Symptoms:** 404 on all API calls.

**Fix:** Verify `VITE_API_URL` points to canonical backend. Dev uses Vite proxy — leave empty or set `http://localhost:8000`.

Check resolved URL in browser: should end with `/api/v1`.

---

## Admin / Judge Not Visible

**Cause:** User role is `participant` — see `CURRENT_PROJECT_STATUS.md`.

**Fix (dev):**
```bash
cd hackathon
python seed_data.py
# Login as admin@hackaverse.com (verify password in seed script)
```

**Fix (prod):** Run seed against production MongoDB or implement role assignment API.

---

## Judging Failures

### Groq API Errors

**Fix:** Verify `GROQ_API_KEY`, check Groq quota, try `GROQ_MODEL=llama-3.1-8b-instant`.

### Demo Mode Scores

Set `JUDGE_MODE=demo` for deterministic hash-based scores (non-production only).

---

## Database

```bash
cd hackathon
python scripts/verify_database.py
```

---

## Running Tests

```bash
# Backend
cd hackathon && pytest

# Frontend
cd hackaverse-frontend && npm test
```

---

## Quick Diagnostics

```bash
curl http://localhost:8000/system/ready
curl http://localhost:8000/api/v1/system/db-status
curl http://localhost:8000/docs
```

Production:
```bash
curl https://hackaverse.blackholeinfiverse.com/system/ready
```

---

## TODO: Verify

- [ ] Seeded user credentials for troubleshooting
- [ ] Production troubleshooting against live URLs
