# Known Issues — AI-Content

**Generated:** 2026-07-05  
**Sources:** `backend/BACKEND_ERRORS_AND_BUGS.md`, code analysis

---

## Critical Security Issues

### 1. Hardcoded Secrets in render.yaml
**Severity:** Critical  
**Location:** `backend/render.yaml`

Committed values for:
- `DATABASE_URL` (Supabase credentials)
- `JWT_SECRET_KEY`
- `SENTRY_DSN`
- `POSTHOG_API_KEY`

**Action:** Rotate all secrets immediately and move to Render secret management.

### 2. Hardcoded Database Fallback in config.py
**Severity:** Critical  
**Location:** `backend/app/config.py`

Contains hardcoded Supabase DATABASE_URL fallback.

**Action:** Remove hardcoded credentials; fail if env vars missing.

---

## Routing & Architecture Issues

### 3. Duplicate Route Registrations
**Severity:** Warning  
**Location:** `app/routes.py`, `app/main.py`

Same paths registered on multiple routers:
- `/health` (default router + step1 + main)
- `/metrics` (main + step6)
- `/debug-auth` (main + step1)
- `/health/detailed` (main + step1)
- `/monitoring-status` (main + step1)
- `/cdn/upload-url` (step3 + cdn router)

### 4. Unmounted Analytics Routers
**Severity:** Warning  
**Location:** `app/main.py`

`analytics.py` and `analytics_dashboard.py` imported but never `include_router()`'d.

### 5. Dead Route File
**Severity:** Info  
**Location:** `app/routes_updated.py`

Alternate route definitions not imported anywhere.

### 6. Multiple Unused CDN Implementations
**Severity:** Info  
**Location:** `app/cdn_routes.py`, `app/cdn_supabase.py`

Only `cdn_fixed.py` is mounted. Other CDN files are dead code.

---

## Authentication Issues

### 7. GlobalAuthMiddleware Public Path Gaps
**Severity:** Warning  
**Location:** `app/auth_middleware.py`

Public list includes: `/health`, `/docs`, `/openapi.json`, `/redoc`, `/users/login`, `/users/register`, `/demo-login`

**Not public (may return 401):**
- `/` (root)
- `/test`
- `/gdpr/privacy-policy`

### 8. Demo Credentials Exposed
**Severity:** Warning  
**Location:** `GET /demo-login`

Returns demo username/password. Should be disabled in production.

---

## Database Issues

### 9. Dual Database Access Patterns
**Severity:** Warning  
**Location:** Multiple files

SQLModel via `DatabaseManager` coexists with raw `sqlite3.connect('data.db')` in some paths (e.g., `simple_feedback_route.py`).

### 10. Supabase Connection Intermittent → SQLite Fallback
**Severity:** Critical (Production)  
**Location:** `core/database.py`

Documented in `BACKEND_ERRORS_AND_BUGS.md`. Production should not silently fall back to SQLite.

---

## Dependency Issues

### 11. Missing Optional Dependencies
**Severity:** Critical (degraded functionality)  
**Location:** `requirements.txt`, runtime

Missing optional deps cause fallbacks:
- `redis` — rate limiting falls back to in-memory
- `python-magic` — file type detection degraded
- `sentry-sdk` — error tracking disabled
- `posthog` — analytics disabled

### 12. MoviePy/FFmpeg/NumPy Version Conflicts
**Severity:** Critical  
**Location:** Video generation pipeline

Documented in `BACKEND_ERRORS_AND_BUGS.md`. Affects video generation reliability.

---

## CI/CD Issues

### 13. CI Workflow Location
**Severity:** Warning  
**Location:** `backend/.github/workflows/ci-cd-production.yml`

Workflow is under `backend/` not repo root. GitHub Actions may not detect it for monorepo.

### 14. Backend README CI Badge Wrong Repo
**Severity:** Info  
**Location:** `backend/README.md`

Badge links to `Ashmit-299/Ai-Agent` not `blackholeinfiverse64/AI-Content`.

---

## Docker Issues

### 15. Port Inconsistency
**Severity:** Warning  
**Location:** Multiple Dockerfiles

| File | Port |
|------|------|
| `backend/Dockerfile` | 9000 |
| `backend/docker/Dockerfile` | 8000 |
| `docker/deployment/deploy.sh` | 8000 |
| `scripts/start_server.py` | 9000 |

---

## Frontend Issues

### 16. No Frontend Deploy Configuration
**Severity:** Info  
**Location:** Frontend directory

No Vercel/Netlify/render config found for frontend deployment.

### 17. Profile Verification Optional on Login
**Severity:** Info  
**Location:** `AuthContext.tsx`

Frontend falls back gracefully if profile fetch fails after login — may mask auth issues.

---

## Functional Issues

### 18. JWT Auth Edge Cases
**Severity:** Warning  
**Location:** `BACKEND_ERRORS_AND_BUGS.md`

Documented JWT validation edge cases in Oct 2025 bug report.

### 19. Graceful Degradation Pattern
**Severity:** Info  
**Location:** Throughout codebase

Extensive conditional imports and fallback middleware — system runs in degraded mode rather than failing clearly.

---

## Issue Tracking

> TODO: Verify if GitHub Issues are used at https://github.com/blackholeinfiverse64/AI-Content/issues

Reference: `backend/BACKEND_ERRORS_AND_BUGS.md` (October 2025)
