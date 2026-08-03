# Runtime Evidence — Infiverse-HR

**Generated:** 2026-07-06  
**Existing evidence:** `evidence/` folder (comprehensive)  
**Purpose:** Checklist for handover sign-off captures

---

## Existing Evidence (In Repo)

The repository already contains verification artifacts:

| Folder | Content |
|--------|---------|
| `evidence/boundaries/` | Visibility boundary checks |
| `evidence/enforcement/` | RBAC + tenant isolation |
| `evidence/entry-points/` | Token templates, curl examples |
| `evidence/replay/` | State reconstruction |
| `evidence/trace-continuity/` | Correlation ID logs |
| `evidence/workforce_runtime/` | Workforce governance proofs |
| `evidence/live_workforce_governance_setu/` | SETU sprint captures |

Reference: `REVIEW_PACKET.md`, `SAMPADA_CURRENT_STATE.md` §Verified Evidence

---

## Additional Screenshots to Capture

Save to `Handover/Screenshots/`:

| # | Screenshot | How |
|---|------------|-----|
| 1 | Auth page `/auth` | Login screen |
| 2 | Candidate dashboard | After candidate login |
| 3 | Job search + apply | Candidate flow |
| 4 | Recruiter matching | Applicant scores |
| 5 | Client dashboard | Client login |
| 6 | Client job posting | Create job form |
| 7 | Control Center | `/control` with aggregates |
| 8 | Governance panel | With `VITE_ENABLE_GOVERNANCE=true` |
| 9 | Gateway Swagger | `{gateway}/docs` |
| 10 | Render deploy dashboard | All 3 services healthy |
| 11 | Vercel deploy | Frontend build success |
| 12 | MongoDB Atlas | Collections list |

---

## Health Check Evidence

```bash
curl https://bhiv-hr-gateway-l0xp.onrender.com/health
curl https://bhiv-hr-agent-cato.onrender.com/health
curl https://bhiv-hr-langgraph-luy9.onrender.com/health
```

> TODO: Verify URLs before capturing.

Save terminal output (redact secrets).

---

## API Evidence (Redacted)

| Call | Expected |
|------|----------|
| `POST /v1/client/login` | 200 + JWT |
| `GET /v1/jobs` | Job list |
| `GET /v1/match/{job_id}/top` | Scored candidates |
| `GET /v1/control-center/dashboard-aggregates` | Aggregate data |
| `POST /v1/setu/signals/{type}` | Signal accepted |

Use templates in `evidence/entry-points/`.

---

## Test Run Evidence

```bash
pytest backend/tests/gateway/test_workforce_governance_runtime.py -q
pytest backend/tests/e2e/control_center/ -q
python backend/tests/comprehensive_endpoint_tests.py
pytest tests/test_schemas.py -q
```

Capture pass/fail summary.

---

## Video Walkthrough (Optional)

Save to `Handover/Videos/`:

1. Auth → candidate apply flow
2. Recruiter shortlist + schedule interview
3. Client view pipeline
4. Control Center + governance panel
5. Gateway `/docs` overview

---

## Environment Evidence (Names Only)

| Variable | Local | Render | Vercel |
|----------|-------|--------|--------|
| MONGODB_URI | ☐ | ☐ | N/A |
| API_KEY_SECRET | ☐ | ☐ | N/A |
| JWT_SECRET_KEY | ☐ | ☐ | N/A |
| VITE_API_BASE_URL | ☐ | N/A | ☐ |
| VITE_API_KEY | ☐ | N/A | ☐ |

---

## Evidence Status

| Category | Status |
|----------|--------|
| In-repo evidence/ | ✅ Extensive |
| Handover Screenshots | TODO |
| Handover Videos | TODO (optional) |
| Production health curls | TODO: Verify URLs first |
| Fresh pytest run | TODO on handover machine |
