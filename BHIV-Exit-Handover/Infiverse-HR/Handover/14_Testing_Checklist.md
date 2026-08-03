# Testing Checklist — Infiverse-HR

**Generated:** 2026-07-06  
**Acceptance pack:** `docs/TASK19_ACCEPTANCE_TEST_PACK.md`

---

## Prerequisites

- [ ] Python 3.10+ and Node.js 18+
- [ ] MongoDB Atlas URI in `backend/.env`
- [ ] All secrets configured (JWT, API key)
- [ ] Backend: `python backend/run_services.py`
- [ ] Frontend: `cd frontend && npm run dev`

---

## Smoke Tests (Manual)

### Auth

- [ ] `/auth` loads login form
- [ ] Client login → redirects to `/client/dashboard`
- [ ] Candidate login → redirects to `/candidate/dashboard`
- [ ] Recruiter login → redirects to `/recruiter`
- [ ] Invalid credentials show error
- [ ] Protected routes redirect when logged out

### Candidate Portal

- [ ] Dashboard loads with user data
- [ ] Profile edit saves
- [ ] Job search lists jobs
- [ ] Apply to job succeeds
- [ ] Applied jobs list updates
- [ ] Tasks load (workflow bridge)
- [ ] Interviews page loads

### Recruiter Console

- [ ] Dashboard shows jobs
- [ ] Create job succeeds
- [ ] Batch upload candidates works
- [ ] Candidate search returns results
- [ ] Applicant matching shows AI scores
- [ ] Shortlist/reject applicant works
- [ ] Schedule interview succeeds
- [ ] Values assessment form works
- [ ] Export reports downloads file
- [ ] Automation panel loads

### Client Portal

- [ ] Dashboard shows stats
- [ ] Post new job succeeds
- [ ] View candidates pipeline
- [ ] Match results display scores
- [ ] Live monitoring page loads
- [ ] Reports export works

### Control Center

- [ ] `/control` accessible with `VITE_ENABLE_CONTROL_CENTER=true`
- [ ] Dashboard aggregates load
- [ ] Audit replay works
- [ ] Governance panel visible with `VITE_ENABLE_GOVERNANCE=true`
- [ ] 30s background refresh (no UI flicker)

---

## API Health

- [ ] `GET /health` on gateway → 200
- [ ] `GET /health` on agent → 200
- [ ] `GET /health` on langgraph → 200
- [ ] `GET /docs` shows Swagger UI

---

## Automated Tests

### Backend pytest

```bash
pytest backend/tests/gateway/test_workforce_governance_runtime.py -q
pytest backend/tests/gateway/test_workforce_lifecycle.py -q
pytest backend/tests/e2e/control_center/ -q
pytest backend/tests/security/ -q
```

- [ ] Workforce governance: 12 passed
- [ ] Control center E2E: pass (2 may skip without JWT)
- [ ] Security tests pass

### Comprehensive smoke

```bash
python backend/tests/comprehensive_endpoint_tests.py
```

- [ ] All critical endpoints respond

### Root schema tests

```bash
pytest tests/test_schemas.py -q
```

- [ ] JSON schema validation passes

### Frontend build

```bash
cd frontend
npm run lint
npm run build
```

- [ ] TypeScript check passes
- [ ] Production build succeeds

---

## Security Tests

- [ ] RBAC: wrong role gets 403 on protected endpoint
- [ ] Tenant isolation: Client B cannot access Client A data
- [ ] API key required on admin endpoints
- [ ] JWT expiry handled gracefully
- [ ] No secrets in committed files

Reference: `evidence/enforcement/` for prior results.

---

## Integration Tests

- [ ] AI matching returns scores (agent reachable)
- [ ] Notification workflow triggers (langgraph reachable)
- [ ] Workflow bridge returns tasks (Complete-Infiverse running)
- [ ] SETU signal POST succeeds

---

## Production Tests

TODO: Verify production URLs first.

- [ ] Production frontend loads (Vercel + custom domain)
- [ ] Production health checks pass (3 Render services)
- [ ] Production login works
- [ ] CORS no errors from production origin
- [ ] Control Center works in production

See `docs/CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md`.

---

## Sign-off

| Role | Name | Date | Pass/Fail |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| System Owner | Rishabh Yadav | | |
