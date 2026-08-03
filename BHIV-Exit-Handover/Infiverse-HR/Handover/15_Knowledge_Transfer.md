# Knowledge Transfer — Infiverse-HR

**Generated:** 2026-07-06  
**Primary doc:** `SAMPADA_CURRENT_STATE.md` (read first)

---

## What This Product Does

**Sampada** is an enterprise workforce intelligence and HR operations platform. It handles hiring lifecycle management, AI-powered candidate matching, multi-tenant client isolation, workflow automation, workforce governance, and SETU ecosystem participation.

Three user-facing portals plus a Control Center:

| Portal | Users | Key actions |
|--------|-------|-------------|
| Candidate | Job seekers | Apply, track, tasks, interviews |
| Recruiter | HR staff | Jobs, matching, scheduling, automation |
| Client | Hiring companies | Pipeline, approvals, documents |
| Control Center | client/recruiter/admin | Governance, audit replay, observability |

---

## Key Concepts

### Triple Authentication

1. **API Key** — service/admin operations
2. **Client JWT** — client portal (`JWT_SECRET_KEY`)
3. **Candidate JWT** — candidate + recruiter (`CANDIDATE_JWT_SECRET_KEY`)

### Multi-Tenant Isolation

Each client's data scoped by `client_id`. Verified in evidence; extend to all endpoints.

### Semantic Matching

Agent service uses sentence-transformers to score candidate–job fit. Gateway proxies `/v1/match/*` to agent.

### LangGraph Workflows

Lifecycle events (apply, shortlist, schedule, offer) trigger automated notifications via Email, WhatsApp, Telegram.

### SETU Participation

Sampada emits signals to SETU aggregation layer. Partner systems (Niyantran, Artha, CRM, Logistics) dispatch inbound signals per 2026-07-02 closeout.

### Task19 Governance

5-layer government-scale architecture with workforce runtime, policy engine, decision ledger, and Control Center UI.

---

## Architecture Decisions

| Decision | Rationale | Trade-off |
|----------|-----------|-----------|
| 3 microservices | Separation of API, AI, workflows | Ops complexity (3 Render services) |
| MongoDB Atlas | Flexible schema for HR data | No relational joins |
| React SPA on Vercel | Fast frontend deploy | Env vars must match Render URLs |
| JWT in sessionStorage | Simple client auth | XSS risk if not careful |
| Evidence-driven handover | Task19 acceptance | Large evidence/ folder |

---

## Code Walkthrough (45 min)

### 1. Backend bootstrap (10 min)

- `backend/run_services.py` — starts all services
- `gateway/app/main.py` — router mounting
- `jwt_auth.py` — auth middleware

### 2. Frontend routing (10 min)

- `frontend/src/App.tsx` — all routes
- `ProtectedRoute.tsx` — role guards
- `services/api.ts` — Axios + interceptors

### 3. Hiring flow (10 min)

- Client posts job → recruiter matches → candidate applies → shortlist → interview → offer
- Trace through gateway routes + MongoDB collections

### 4. Control Center + governance (10 min)

- `ControlCenter.tsx` — parallel data load
- `control_center_governance.py` — backend APIs
- `workforce_governance_routes.py` — workforce + SETU

### 5. Deployment (5 min)

- Vercel env vars + Render services + CORS alignment

---

## Common Maintainer Tasks

### Add a new API endpoint

1. Add route in `gateway/app/main.py` or appropriate router
2. Update `backend/docs/api/API_DOCUMENTATION.md`
3. Add pytest in `backend/tests/`
4. Wire frontend in `services/api.ts` if needed

### Add a new frontend page

1. Create page in `pages/{portal}/`
2. Add route in `App.tsx`
3. Add nav link in layout component

### Deploy update

1. Merge to `main`
2. Render auto-deploys backend services
3. Vercel auto-deploys frontend
4. Verify health checks + smoke test

### Rotate secrets

1. Update Render env vars (all 3 services)
2. Update Vercel env vars
3. Clear all active JWTs (users re-login)
4. Update any scripts in `evidence/entry-points/`

---

## Ecosystem Boundaries

| System | Owns | Sampada relationship |
|--------|------|---------------------|
| Sampada | Hiring + workforce visibility | This repo |
| Niyantran | Tasking, execution telemetry | Signal consumer |
| Artha | Payroll truth | Visibility only |
| SETU | Cross-domain aggregation | Signal emitter |
| Complete-Infiverse | Employee tasks | Workflow bridge |

**Rule:** Payroll visibility ≠ payroll ownership.

---

## Reading Order

1. `SAMPADA_CURRENT_STATE.md` — full handover
2. `QUICK_START.md` — run locally
3. `frontend/AUTHENTICATION_STRUCTURE.md`
4. `backend/docs/api/API_DOCUMENTATION.md`
5. `REVIEW_PACKET.md` + `evidence/`
6. Task19 docs in `docs/`

---

## Questions for Outgoing Team

1. Which Render URL set is canonical?
2. Is `sampada.blackholeinfiverse.com` the primary frontend domain?
3. Is Complete-Infiverse workflow bridge running in production?
4. Which demo/test accounts exist in production MongoDB?
5. SETU external integration status with partner owners?

---

## Contacts (Documented)

| Question type | Contact |
|---------------|---------|
| Architecture | Rishabh Yadav |
| Frontend | Nikhil |
| Deployment | Vinayak / Raj |
| Docs / observability | Shashank |
