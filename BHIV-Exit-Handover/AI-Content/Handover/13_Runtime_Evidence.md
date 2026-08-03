# Runtime Evidence — AI-Content

**Generated:** 2026-07-05  
**Purpose:** Placeholder and reference guide for runtime proof artifacts

---

## Existing Evidence Files

| File | Location | Description |
|------|----------|-------------|
| `deployment_report_local.json` | `backend/data/reports/` | Local deployment report |
| CI artifacts | GitHub Actions | Test coverage, security scan results |

> TODO: Verify timestamps and validity of existing evidence before handover sign-off.

---

## How to Generate Fresh Runtime Evidence

### 1. Health Snapshots

```bash
# Start backend
cd backend && python scripts/start_server.py

# Capture health (save to Handover/runtime_evidence/ if desired)
curl -s http://localhost:9000/health
curl -s http://localhost:9000/health/detailed
curl -s http://localhost:9000/monitoring-status -H "Authorization: Bearer <token>"
```

### 2. Production Health

```bash
curl -s https://ai-agent-aff6.onrender.com/health
curl -s https://ai-agent-aff6.onrender.com/health/detailed
```

### 3. Deployment Verification

```bash
cd backend
python verify_deployment.py
python scripts/deployment/deployment_validation.py
python scripts/pre_production_checklist.py
```

### 4. Test Suite Evidence

```bash
cd backend
pytest --cov=app --cov=core --cov-report=term-missing
pytest tests/integration/test_complete_workflow.py -v
```

### 5. Load Test Evidence

```bash
cd backend
pytest tests/load_testing/ -v
# Or Locust:
locust -f tests/load_testing/locust_load_test.py
```

---

## Auth Flow Evidence

```bash
# Register
curl -s -X POST http://localhost:9000/users/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123","email":"test@example.com"}'

# Login
curl -s -X POST http://localhost:9000/users/login-json \
  -H "Content-Type: application/json" \
  -d '{"username":"demo","password":"demo1234"}'

# Profile (with token from login)
curl -s http://localhost:9000/users/profile \
  -H "Authorization: Bearer <token>"
```

---

## Content Pipeline Evidence

```bash
# List contents
curl -s http://localhost:9000/contents -H "Authorization: Bearer <token>"

# RL agent stats
curl -s http://localhost:9000/rl/agent-stats -H "Authorization: Bearer <token>"

# Video stats
curl -s http://localhost:9000/reports/video-stats -H "Authorization: Bearer <token>"

# Dashboard
curl -s http://localhost:9000/dashboard -H "Authorization: Bearer <token>"
```

---

## GDPR Evidence

```bash
curl -s http://localhost:9000/gdpr/privacy-policy -H "Authorization: Bearer <token>"
curl -s http://localhost:9000/gdpr/data-summary -H "Authorization: Bearer <token>"
```

---

## Screenshot Placeholders

Store in `Handover/Screenshots/`:

| Screenshot | Filename | Status |
|------------|----------|--------|
| Landing page | `landing_page.png` | TODO: Capture |
| Auth page | `auth_page.png` | TODO: Capture |
| Dashboard | `dashboard.png` | TODO: Capture |
| Upload section | `upload_section.png` | TODO: Capture |
| Video preview | `video_preview.png` | TODO: Capture |
| API docs (Swagger) | `swagger_docs.png` | TODO: Capture |
| Backend dashboard | `backend_dashboard.png` | TODO: Capture |
| Production health | `production_health.png` | TODO: Capture |

---

## Video Placeholders

Store in `Handover/Videos/`:

| Video | Filename | Status |
|-------|----------|--------|
| Local setup walkthrough | `local_setup.mp4` | TODO: Record |
| Upload to video flow | `upload_video_flow.mp4` | TODO: Record |
| Auth flow demo | `auth_flow.mp4` | TODO: Record |
| Deployment procedure | `deployment.mp4` | TODO: Record |
| CI pipeline overview | `ci_pipeline.mp4` | TODO: Record |

---

## Evidence Collection Checklist

- [ ] Local health endpoints return 200
- [ ] Production health endpoints return 200
- [ ] Auth flow (register/login/profile) works
- [ ] Upload and content listing works
- [ ] Video generation tested (or failure documented)
- [ ] GDPR endpoints accessible
- [ ] `verify_deployment.py` passes
- [ ] pytest suite passes with acceptable coverage
- [ ] Screenshots captured for key UI pages
- [ ] Secrets rotated (do not include in evidence files)

---

## Observability Endpoints

| Endpoint | Evidence Type |
|----------|---------------|
| `GET /metrics/prometheus` | Prometheus metrics |
| `GET /observability/health` | Observability status |
| `GET /observability/performance` | Performance data |
| `GET /logs` | System logs |
| `GET /debug/system` | System debug info |

---

## Notes

- Do not commit JWT tokens or secrets in evidence files
- Timestamp all captured evidence with date and environment
- Regenerate evidence after any deployment or schema change
