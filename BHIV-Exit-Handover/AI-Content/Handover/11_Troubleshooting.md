# Troubleshooting — AI-Content

**Generated:** 2026-07-05  
**Sources:** `backend/BACKEND_ERRORS_AND_BUGS.md`, `backend/README.md`, codebase

---

## Backend Startup Issues

### ModuleNotFoundError / Import Errors

**Cause:** Dependencies not installed.

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

For optional features:
```bash
pip install redis python-magic sentry-sdk posthog
```

---

### Database Connection Failed

**Cause:** PostgreSQL/Supabase unavailable; falls back to SQLite.

**Fix:**
```env
# backend/.env
DATABASE_URL=postgresql://postgres.your-project:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_DB_PASSWORD=your_password
```

Verify connection:
```bash
cd backend
python -c "from core.database import DatabaseManager; print(DatabaseManager().health_check())"
```

Or run: `python tests/unit/test_db_connection.py`

---

### Alembic Migration Errors

**Fix:**
```bash
cd backend
alembic upgrade head
# If stuck:
alembic current
alembic history
```

---

## Authentication Errors

### 401 Unauthorized

**Causes:**
1. Missing or expired JWT token
2. Endpoint not in GlobalAuthMiddleware public list
3. Supabase JWKS validation failure

**Fix:**
1. Re-login via `POST /users/login` or `GET /demo-login`
2. Check `Authorization: Bearer <token>` header
3. Verify `JWT_SECRET_KEY` in `.env`
4. For public endpoints, check if path is in public list (`auth_middleware.py`)

**Debug:**
```bash
curl http://localhost:9000/debug-auth -H "Authorization: Bearer <token>"
```

---

### Token Refresh Failed

**Fix:**
```bash
curl -X POST http://localhost:9000/users/refresh \
  -H "Content-Type: application/json" \
  -d '{"refresh_token": "<your-refresh-token>"}'
```

---

## Video Generation Issues

### MoviePy / FFmpeg Errors

**Cause:** FFmpeg not installed or version conflicts.

**Fix (Windows):**
```cmd
# Install FFmpeg and add to PATH
ffmpeg -version
```

**Fix (Linux):**
```bash
sudo apt install ffmpeg imagemagick
```

**Dependency conflicts:**
See `backend/BACKEND_ERRORS_AND_BUGS.md` — may need:
```bash
pip install moviepy==1.0.3 imageio-ffmpeg==0.4.9 numpy==1.24.4
```

---

### Video Generation Timeout

**Cause:** Task exceeds `TASK_TIMEOUT_SECONDS` (default 300s).

**Fix:**
```env
TASK_TIMEOUT_SECONDS=600
MAX_VIDEO_DURATION_SECONDS=300
```

Check task status:
```bash
curl http://localhost:9000/tasks/{task_id} -H "Authorization: Bearer <token>"
```

---

## Upload Issues

### 413 Payload Too Large

**Cause:** File exceeds `MAX_UPLOAD_SIZE_MB` (100MB default).

**Fix:**
```env
MAX_UPLOAD_SIZE_MB=200
MAX_FILE_SIZE_MB=200
```

Middleware limit: 100MB in `InputValidationMiddleware`.

---

### Invalid File Type

**Cause:** File type not in `ALLOWED_FILE_TYPES`.

**Fix:**
```env
ALLOWED_FILE_TYPES=txt,pdf,doc,docx,mp4,avi,mov,jpg,png,gif,webp
```

---

## CORS Errors (Frontend)

**Cause:** Frontend origin blocked or wrong API URL.

**Fix:**
```env
# backend/.env
CORS_ORIGINS=http://localhost:5173,https://your-frontend.com

# frontend/.env
VITE_API_URL=http://localhost:9000
```

Restart both servers after changing env vars.

---

## Redis / Rate Limiting Issues

### Redis Connection Failed

**Cause:** Redis not running.

**Fix:** Redis is optional — app falls back to in-memory rate limiting.

To enable:
```bash
# Start Redis
redis-server

# backend/.env
REDIS_URL=redis://localhost:6379
```

Test: `python backend/test-redis.py` (TODO: Verify script exists)

---

## Storage Issues

### Supabase Storage Upload Failed

**Fix:**
```env
USE_SUPABASE_STORAGE=true
BHIV_STORAGE_BACKEND=supabase
SUPABASE_BUCKET_NAME=ai-agent-files
```

Check storage health:
```bash
curl http://localhost:9000/presigned/health -H "Authorization: Bearer <token>"
```

### Local Bucket Issues

**Fix:**
```env
BHIV_STORAGE_BACKEND=local
BHIV_BUCKET_PATH=bucket
```

Ensure `backend/bucket/` directory exists and is writable.

---

## Production (Render) Issues

### Health Check Failing on Render

**Verify:**
```bash
curl https://ai-agent-aff6.onrender.com/health
curl https://ai-agent-aff6.onrender.com/health/detailed
```

**Common causes:**
- Missing `DATABASE_URL` on Render
- Cold start timeout on free tier
- Missing `JWT_SECRET_KEY`

**Fix:** Check Render dashboard env vars and logs.

---

### Render Deploy Fails in CI

**Required GitHub secrets:**
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `RENDER_API_KEY`
- `RENDER_PRODUCTION_SERVICE_ID`

Verify secrets are configured in GitHub repository settings.

---

## LLM / AI Issues

### Storyboard Generation Failed

**Cause:** Perplexity API key missing or LLM server not running.

**Fix:**
```env
BHIV_LM_URL=https://api.perplexity.ai
PERPLEXITY_API_KEY=your_key
```

Or run local LLM server:
```bash
cd backend
python scripts/local_llm_server.py
# Then set BHIV_LM_URL=http://localhost:8001
```

Check LM stats:
```bash
curl http://localhost:9000/lm/stats -H "Authorization: Bearer <token>"
```

---

## Monitoring Issues

### Sentry Not Reporting

**Fix:**
```env
SENTRY_DSN=https://your-dsn@sentry.io/project
ENABLE_ERROR_REPORTING=true
ENVIRONMENT=production
```

### PostHog Not Tracking

**Fix:**
```env
POSTHOG_API_KEY=phc_your_key
POSTHOG_HOST=https://us.posthog.com
ENABLE_USER_ANALYTICS=true
```

---

## Quick Diagnostic Commands

```bash
# Health
curl http://localhost:9000/health
curl http://localhost:9000/health/detailed

# System debug
curl http://localhost:9000/debug/system -H "Authorization: Bearer <token>"
curl http://localhost:9000/debug/database -H "Authorization: Bearer <token>"

# Route listing
curl http://localhost:9000/debug-routes -H "Authorization: Bearer <token>"

# Deployment verification
cd backend && python verify_deployment.py

# Run tests
cd backend && pytest tests/unit/test_server.py -v
```

---

## Log Locations

| Environment | Location |
|-------------|----------|
| Local dev | Console (structured JSON via middleware) |
| Database | `system_logs` table, `GET /logs` endpoint |
| Sentry | Sentry dashboard |
| Render | Render dashboard logs |

---

## Escalation

1. Check `Handover/10_Known_Issues.md`
2. Review `backend/BACKEND_ERRORS_AND_BUGS.md`
3. Run `python scripts/pre_production_checklist.py`
4. Run full test suite: `pytest`

> TODO: Verify support contact and on-call procedures.
