# Testing Checklist — AI-Content

**Generated:** 2026-07-05

---

## Pre-Test Setup

- [ ] Python 3.11+ installed
- [ ] Node.js 18+ installed
- [ ] `backend/.env` configured (copy from `.env.example`)
- [ ] `frontend/.env` configured
- [ ] FFmpeg installed (for video tests)
- [ ] Backend started: `python scripts/start_server.py`
- [ ] Frontend started: `npm run dev`
- [ ] Migrations applied: `alembic upgrade head`

---

## Automated Backend Tests

### Unit Tests

```bash
cd backend
pytest tests/unit/ -v
```

Key test files:
- [ ] `test_server.py` — Server startup
- [ ] `test_database.py` — Database operations
- [ ] `test_db_connection.py` — Connection health
- [ ] `test_auth_security.py` — Auth security
- [ ] `test_observability.py` — Monitoring
- [ ] `test_metrics_endpoint.py` — Metrics
- [ ] `test_bhiv_components.py` — Core components

### Integration Tests

```bash
pytest tests/integration/ -v
```

- [ ] `test_auth_flow.py` — Full auth flow
- [ ] `test_complete_workflow.py` — End-to-end workflow
- [ ] `test_api_endpoints.py` — API endpoint coverage
- [ ] `test_demo_login.py` — Demo login
- [ ] `test_registration.py` — User registration
- [ ] `test_supabase.py` — Supabase integration

### Coverage Target

```bash
pytest --cov=app --cov=core --cov-report=term-missing --cov-fail-under=70
```

- [ ] Coverage ≥ 70% (CI target)

### Load Tests

```bash
pytest tests/load_testing/ -v
# Locust (optional):
locust -f tests/load_testing/locust_load_test.py --headless -u 10 -r 2 -t 60s
```

- [ ] Load tests pass (100+ concurrent users per README claim)

---

## CI Pipeline Tests (Local Simulation)

```bash
cd backend
# Security
bandit -r app/ core/
flake8 app/ core/
black --check app/ core/

# Migration check
alembic upgrade head
alembic downgrade -1
alembic upgrade head

# Pre-production
python scripts/pre_production_checklist.py
```

- [ ] Security lint passes
- [ ] Migration up/down works
- [ ] Pre-production checklist passes

---

## Health & Infrastructure

| Test | Command | Expected |
|------|---------|----------|
| Basic health | `curl http://localhost:9000/health` | 200 OK |
| Detailed health | `curl http://localhost:9000/health/detailed` | DB status |
| Monitoring | `curl http://localhost:9000/monitoring-status` | Status JSON |
| Prometheus | `curl http://localhost:9000/metrics/prometheus` | Metrics |
| Storage health | `curl http://localhost:9000/presigned/health` | Storage OK |
| Supabase auth | `curl http://localhost:9000/users/supabase-auth-health` | Auth OK |

- [ ] All health endpoints pass

---

## Authentication Tests

| Test | Steps | Expected |
|------|-------|----------|
| Register | POST `/users/register` | 201, tokens |
| Login (form) | POST `/users/login` | 200, tokens |
| Login (JSON) | POST `/users/login-json` | 200, tokens |
| Profile | GET `/users/profile` with Bearer | User data |
| Refresh | POST `/users/refresh` | New access token |
| Logout | POST `/users/logout` | Success |
| Demo login | GET `/demo-login` | Demo credentials |
| Invalid login | Wrong password | 401 |

- [ ] All auth flows work
- [ ] Frontend login page works end-to-end

---

## Content & Upload Tests

- [ ] POST `/upload` with text file
- [ ] GET `/contents` lists uploaded content
- [ ] GET `/content/{id}` returns metadata
- [ ] GET `/content/{id}/metadata` returns extended metadata
- [ ] Frontend upload section works

---

## Video Generation Tests

- [ ] POST `/generate-video` with valid script
- [ ] GET `/tasks/{task_id}` shows task progress
- [ ] GET `/download/{content_id}` returns video file
- [ ] GET `/stream/{content_id}` streams video
- [ ] Frontend video preview works

> Note: Video tests require FFmpeg and may be slow.

---

## Feedback & RL Tests

- [ ] POST `/feedback` with rating and comment
- [ ] POST `/feedback-simple` works
- [ ] GET `/recommend-tags/{content_id}` returns tags
- [ ] GET `/average-rating/{content_id}` returns rating
- [ ] GET `/rl/agent-stats` returns agent statistics

---

## CDN & Storage Tests

- [ ] GET `/cdn/upload-url` returns upload URL
- [ ] POST `/cdn/upload/{token}` uploads file
- [ ] GET `/cdn/list` lists files
- [ ] GET `/cdn/download/{content_id}` downloads file
- [ ] POST `/presigned/upload` generates presigned URL
- [ ] GET `/presigned/list/{segment}` lists files

---

## Analytics & Monitoring Tests

- [ ] GET `/reports/video-stats` returns stats
- [ ] GET `/reports/storyboard-stats` returns stats
- [ ] GET `/bhiv/analytics` returns analytics
- [ ] GET `/logs` returns system logs
- [ ] GET `/dashboard` returns dashboard data
- [ ] GET `/streaming-performance` returns metrics

---

## GDPR Tests

- [ ] GET `/gdpr/privacy-policy` returns policy
- [ ] GET `/gdpr/data-summary` returns user data summary
- [ ] GET `/gdpr/export-data` exports user data
- [ ] DELETE `/gdpr/delete-data` deletes user data (test account only)

---

## Task Queue Tests

- [ ] GET `/tasks/queue/stats` returns queue stats
- [ ] POST `/tasks/create-test` creates test task
- [ ] GET `/tasks/{task_id}` returns task status

---

## Maintenance Tests

- [ ] GET `/maintenance/failed-operations` lists failures
- [ ] POST `/bucket/cleanup` runs cleanup (admin/caution)
- [ ] GET `/bucket/stats` returns bucket statistics

---

## Frontend Tests

```bash
cd frontend
npm run lint
npm run build
```

- [ ] ESLint passes
- [ ] TypeScript compiles without errors
- [ ] Production build succeeds

### Manual Frontend Tests

- [ ] Landing page loads at `/`
- [ ] Auth page at `/auth` — login and register work
- [ ] Dashboard at `/dashboard` — protected route works
- [ ] Upload section functional
- [ ] Video preview displays
- [ ] Theme toggle works (dark/light)
- [ ] 401 redirects to `/auth`

---

## Production Smoke Tests

- [ ] `GET https://ai-agent-aff6.onrender.com/health` → 200
- [ ] `GET https://ai-agent-aff6.onrender.com/docs` → Swagger UI
- [ ] `python verify_deployment.py` passes
- [ ] Login works on production (if credentials available)

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Tech Lead | | | |
