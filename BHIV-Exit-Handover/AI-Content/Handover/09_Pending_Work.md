# Pending Work — AI-Content

**Generated:** 2026-07-05

---

## Critical Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 1 | **Rotate hardcoded secrets in render.yaml** | `backend/render.yaml` | DATABASE_URL, JWT_SECRET_KEY, SENTRY_DSN, POSTHOG_API_KEY committed |
| 2 | **Remove hardcoded Supabase fallback in config.py** | `backend/app/config.py` | Security risk |
| 3 | **Move CI workflow to repo root** | `backend/.github/workflows/` | GitHub may not run CI from monorepo subdirectory |
| 4 | **Fix duplicate route registrations** | `app/routes.py`, `main.py` | `/health`, `/metrics`, etc. registered multiple times |

---

## High Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 5 | **Align Docker ports** | Multiple Dockerfiles | 9000 (root Dockerfile) vs 8000 (docker/Dockerfile) |
| 6 | **Fix GlobalAuthMiddleware public paths** | `auth_middleware.py` | `/`, `/test`, `/gdpr/privacy-policy` may require auth unintentionally |
| 7 | **Mount or remove unused analytics routers** | `main.py` | `analytics.py`, `analytics_dashboard.py` imported but not mounted |
| 8 | **Resolve dual database paths** | Codebase | SQLModel vs raw `sqlite3.connect('data.db')` |
| 9 | **Verify frontend production deployment** | No deploy config found | TODO: Verify hosting and URL |

---

## Medium Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 10 | **Remove dead code** | `routes_updated.py`, unused CDN files | `cdn_routes.py`, `cdn_supabase.py` not active |
| 11 | **Add frontend CI pipeline** | No frontend CI found | Build/lint not in CI |
| 12 | **Restrict CORS in production** | `main.py` | Currently `allow_origins=["*"]` |
| 13 | **Disable demo login in production** | `GET /demo-login` | Exposes demo credentials |
| 14 | **MoviePy/FFmpeg dependency conflicts** | `BACKEND_ERRORS_AND_BUGS.md` | Version conflicts affect video generation |
| 15 | **Optional dependency fallbacks** | Bug report | redis, python-magic, sentry-sdk, posthog missing → degraded mode |

---

## Low Priority / Enhancements

| # | Item | Notes |
|---|------|-------|
| 16 | Expand root README | Currently only `# TenderAI` |
| 17 | Remove orphaned root package-lock.json | No root package.json |
| 18 | Add formal backup automation for Supabase | TODO: Verify schedule |
| 19 | Consolidate CDN route files | 3 CDN implementations, only `cdn_fixed.py` active |
| 20 | Add E2E tests for upload → video flow | No Playwright/Cypress found |
| 21 | Update backend README CI badge URL | Points to `Ashmit-299/Ai-Agent` not current repo |

---

## Documentation Updates

| # | Item | File |
|---|------|------|
| 22 | Align API docs with actual mounted routes | `backend/docs/` |
| 23 | Document canonical Docker port | Multiple conflicting references |
| 24 | Document frontend production URL | Not found in repo |

---

## Pre-Handover Verification Tasks

| # | Command | Purpose |
|---|---------|---------|
| 25 | `cd backend && alembic upgrade head` | Verify migrations |
| 26 | `cd backend && pytest` | Run full test suite |
| 27 | `python verify_deployment.py` | Verify production deployment |
| 28 | `python scripts/pre_production_checklist.py` | Pre-production validation |
| 29 | `python scripts/deployment/deployment_validation.py` | Post-deploy API validation |

---

## Items Marked TODO: Verify

- Whether `staging` and `develop` branches exist on remote
- Frontend production deployment URL and hosting
- Supabase project ownership and backup configuration
- Docker Hub image `ashmitpandey299/ai-uploader-agent` access credentials
- Render service ownership (`RENDER_API_KEY`, `RENDER_PRODUCTION_SERVICE_ID`)
- Automated backup schedule for production database
