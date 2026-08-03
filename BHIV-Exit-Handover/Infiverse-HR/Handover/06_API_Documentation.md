# API Documentation — Infiverse-HR

**Generated:** 2026-07-06  
**Full reference:** `backend/docs/api/API_DOCUMENTATION.md`  
**Live docs:** `{GATEWAY_URL}/docs` (Swagger/OpenAPI)

**Base URLs (documented production):**

| Service | URL |
|---------|-----|
| Gateway | https://bhiv-hr-gateway-l0xp.onrender.com |
| Agent | https://bhiv-hr-agent-cato.onrender.com |
| LangGraph | https://bhiv-hr-langgraph-luy9.onrender.com |

> TODO: Verify URLs — alternate set in `backend/docs/guides/DEPLOYMENT_GUIDE.md`.

**Total endpoints:** ~111 across 3 services (per `SAMPADA_CURRENT_STATE.md`).

---

## Authentication

| Method | Header | Used for |
|--------|--------|----------|
| API Key | `Authorization: Bearer <API_KEY_SECRET>` | Admin ops, service calls |
| Client JWT | `Authorization: Bearer <client_jwt>` | Client portal |
| Candidate JWT | `Authorization: Bearer <candidate_jwt>` | Candidate + recruiter |

Frontend also sends `VITE_API_KEY` on some protected calls in production.

---

## Gateway — Health & Monitoring

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | No | Root info |
| GET | `/health` | No | Health check |
| GET | `/docs` | No | Swagger UI |
| GET | `/openapi.json` | No | OpenAPI spec |
| GET | `/metrics` | API key | Metrics |
| GET | `/health/detailed` | API key | Detailed health |
| GET | `/metrics/dashboard` | API key | Dashboard metrics |

---

## Gateway — Jobs

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/jobs` | Create job |
| GET | `/v1/jobs` | List jobs |
| GET | `/v1/jobs/{job_id}` | Get job |
| PUT | `/v1/jobs/{job_id}` | Update job |
| DELETE | `/v1/jobs/{job_id}` | Delete job |
| POST | `/v1/jobs/{job_id}/shortlist` | Shortlist candidate |
| POST | `/v1/jobs/{job_id}/reject` | Reject candidate |

Additional: autocomplete, bulk operations — see full API doc.

---

## Gateway — Candidates

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/candidates` | Create candidate |
| GET | `/v1/candidates` | List/search |
| GET | `/v1/candidates/{id}` | Get candidate |
| PUT | `/v1/candidates/{id}` | Update |
| DELETE | `/v1/candidates/{id}` | Delete |
| POST | `/v1/candidates/bulk` | Bulk upload |
| POST | `/v1/candidates/parse-pdf` | Resume parsing |
| GET | `/v1/candidates/stats` | Statistics |

---

## Gateway — Matching

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/match/{job_id}/top` | Top matches for job |
| POST | `/v1/match/batch` | Batch matching |

Proxies to Agent service for semantic scoring.

---

## Gateway — Portal Auth

### Client

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/client/register` | Register client |
| POST | `/v1/client/login` | Client login → JWT |
| GET | `/v1/client/profile` | Client profile |
| GET | `/v1/client/jobs` | Client's jobs |
| GET | `/v1/client/stats` | Client statistics |

### Candidate / Recruiter

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/candidate/register` | Register candidate |
| POST | `/v1/candidate/login` | Login (candidate + recruiter) |
| GET | `/v1/candidate/profile` | Profile |
| POST | `/v1/candidate/apply/{job_id}` | Apply to job |
| GET | `/v1/candidate/applications` | List applications |

---

## Gateway — Interviews, Offers, Feedback

| Area | Prefix | Description |
|------|--------|-------------|
| Interviews | `/v1/interviews/*` | Schedule, update, list |
| Offers | `/v1/offers/*` | Create, negotiate, accept |
| Feedback | `/v1/feedback/*` | BHIV values assessment |
| Reports | `/v1/reports/*` | Export reports |

---

## Gateway — Workflow Bridge

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/candidate/workflow-link` | Get workflow URL |
| GET | `/v1/candidate/workflow-tasks` | List external tasks |
| GET | `/v1/candidate/workflow-tasks/{task_id}` | Task detail |

Integrates with Complete-Infiverse / EMS.

---

## Gateway — Control Center

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/control-center/audit-events` | Record audit event |
| GET | `/v1/control-center/audit-events` | List audit events |
| GET | `/v1/control-center/audit-replay` | Replay audit trail |
| GET | `/v1/control-center/dashboard-aggregates` | Dashboard aggregates |

Module: `control_center_governance.py`

---

## Gateway — Workforce Governance

Prefix: `/v1/workforce/*`, `/v1/policies/*`, `/v1/governance/*`, `/v1/decisions/*`

| Area | Examples |
|------|----------|
| Org hierarchy | `/v1/workforce/organizations`, `/divisions`, `/units`, `/departments`, `/employees` |
| Lifecycle | `/v1/workforce/employees/{id}/lifecycle/*` |
| Policies | `/v1/policies/*` |
| Governance | `/v1/governance/challenges`, `/reviews`, `/overrides` |
| Decisions | `/v1/decisions/*` |

Module: `routes/workforce_governance_routes.py`

---

## Gateway — SETU

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/setu/signals/{signal_type}` | Emit SETU signal |
| GET | `/v1/setu/signals` | List signals |
| GET | `/v1/setu/trace/{trace_id}` | Trace by ID |

---

## Gateway — Security / 2FA

| Prefix | Description |
|--------|-------------|
| `/v1/security/*` | Security operations |
| `/v1/auth/2fa/*` | Two-factor authentication |
| `/v1/auth/password/*` | Password management |

---

## Agent Service (:9000)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/test-db` | DB connectivity |
| POST | `/match` | Single match request |
| POST | `/batch-match` | Batch matching |
| GET | `/analyze/{candidate_id}` | Candidate analysis |

---

## LangGraph Service (:9001)

| Prefix | Description |
|--------|-------------|
| `/workflows/*` | Workflow management |
| `/automation/*` | Notification automation |
| `/rl/*` | Reinforcement learning monitoring |
| `POST /automation/webhooks/whatsapp` | WhatsApp webhook |

---

## Response Conventions

- FastAPI default JSON responses
- Errors: HTTP 401/403 for auth failures
- Trace/correlation IDs in observability-enabled paths
- See `backend/docs/api/` for request/response schemas

---

## Frontend API Client

**File:** `frontend/src/services/api.ts`

- Base URL from `VITE_API_BASE_URL`
- Axios interceptors attach JWT from sessionStorage
- Control Center + governance calls in same client
