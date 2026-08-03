# Pending Work — biometric-blackhole

**Generated:** 2026-07-05

---

## Critical Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 1 | **Rotate hardcoded MongoDB credentials** | `database.py`, `render.yaml` | Full connection string committed |
| 2 | **Add JWT auth to `/api/download`** | `api.py` line 177 | Unauthenticated file download |
| 3 | **Add JWT auth to `/api/statistics`** | `api.py` line 200 | Unauthenticated data processing |
| 4 | **Remove hardcoded JWT/password defaults** | `auth.py` lines 16, 21 | Fallback secrets in code |

---

## High Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 5 | **Add Gunicorn for production** | `render.yaml` startCommand | Flask dev server not production-ready |
| 6 | **Migrate password hashing to bcrypt** | `auth.py` | SHA256 + static salt is weak |
| 7 | **Remove/update stale Supabase docs** | Root markdown + SQL files | Code uses MongoDB only |
| 8 | **Fix role assignment logic** | `auth.py` line 86–87 | Email substring `"admin"`/`"manager"` forces admin role |
| 9 | **Verify production URLs live** | DEPLOYMENT.md | Backend + frontend URLs unverified |

---

## Medium Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 10 | **Implement role-based UI routing** | `App.jsx`, `ROLE_BASED_ROUTING.md` | All roles go to `/reports` |
| 11 | **Add CI/CD pipeline** | No `.github/workflows/` | No test gate before deploy |
| 12 | **Add automated tests** | No test files | pytest for API, Vitest for frontend |
| 13 | **Add rate limiting on auth endpoints** | `api.py` | Brute force vulnerability |
| 14 | **Expand root README** | `README.md` | Single-line stub |
| 15 | **Add index for manual_user_daily_records** | `database.py` | Missing from `init_db()` |
| 16 | **Verify attendance_processor.py syntax** | `RENDER_FIX_COMMANDS.md` | Past IndentationError blocked deploys |

---

## Low Priority / Enhancements

| # | Item | Notes |
|---|------|-------|
| 17 | Archive or remove Streamlit `app.py` | Not in production deploy |
| 18 | Add Sentry or error monitoring | No structured error tracking |
| 19 | Add external uptime monitoring | No alerting configured |
| 20 | Consolidate root markdown docs | 20+ markdown files, many stale |
| 21 | Add MongoDB backup automation | TODO: Verify Atlas tier |
| 22 | Move JWT to httpOnly cookies | Currently in localStorage |
| 23 | Add security response headers | No HSTS, X-Frame-Options, etc. |
| 24 | Delete obsolete SQL migration files | `supabase_*.sql`, `paid_employees_migration.sql` |

---

## Documentation Updates

| # | Item | File |
|---|------|------|
| 25 | Align DEPLOYMENT.md with actual env vars | `DEPLOYMENT.md` |
| 26 | Update backend README for MongoDB | `backend/README.md` |
| 27 | Document exact Excel column format | `attendance_processor.py` |
| 28 | Create `.env.example` if missing | `backend/` |

---

## Security Remediation Order

1. Rotate MongoDB Atlas password
2. Remove hardcoded credentials from repo
3. Add auth to unprotected endpoints
4. Replace password hashing algorithm
5. Add rate limiting
6. Add Gunicorn
7. Set up monitoring

See `Handover/10_Known_Issues.md` for full issue details.
