# Architecture — Infiverse-HR

**Generated:** 2026-07-06

---

## High-Level Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                     React SPA (Vercel / sampada.blackholeinfiverse.com)   │
│  Candidate │ Recruiter │ Client │ Control Center portals                  │
└───────────────────────────────┬──────────────────────────────────────────┘
                                │ Axios (JWT + API Key)
                                ▼
┌──────────────────────────────────────────────────────────────────────────┐
│                    Gateway Service (:8000) — FastAPI                      │
│  Auth │ Jobs │ Candidates │ Matching │ Portals │ Workforce │ SETU       │
└───────┬──────────────────────────────┬───────────────────────────────────┘
        │                              │
        ▼                              ▼
┌───────────────────┐          ┌───────────────────────┐
│ Agent (:9000)     │          │ LangGraph (:9001)     │
│ Semantic matching │          │ Workflows, notify     │
│ sentence-transform│          │ Email/WhatsApp/Telegram│
└───────────────────┘          └───────────────────────┘
        │                              │
        └──────────────┬───────────────┘
                       ▼
              ┌─────────────────┐
              │ MongoDB Atlas   │
              │ 17+ collections │
              └─────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ Complete-Infiverse│
              │ / EMS (tasks)   │
              └─────────────────┘
```

---

## Microservices

### Gateway (`backend/services/gateway/`)

**Port:** 8000  
**Entry:** `app/main.py`

| Responsibility | Modules |
|----------------|---------|
| REST API routing | `app/main.py`, `routes/` |
| Triple authentication | `jwt_auth.py`, API key middleware |
| Jobs, candidates, applications | Core CRUD routes |
| Portal auth (client/candidate/recruiter) | `/v1/client/*`, `/v1/candidate/*` |
| Workforce governance | `workforce_governance_routes.py`, `workforce_runtime.py` |
| Control Center | `control_center_governance.py` |
| SETU signals | `setu_participation.py`, `/v1/setu/signals/*` |
| Workflow bridge | `/v1/candidate/workflow-*` |
| Security / 2FA | `/v1/security/*`, `/v1/auth/2fa/*` |

### Agent (`backend/services/agent/`)

**Port:** 9000  
**Entry:** `app.py`

- Semantic candidate–job matching via sentence-transformers
- Endpoints: `/match`, `/batch-match`, `/analyze/{candidate_id}`
- Proxied from gateway matching routes

### LangGraph (`backend/services/langgraph/`)

**Port:** 9001  
**Entry:** `app/main.py`

- Workflow state machines
- Multi-channel notifications (Email, WhatsApp, Telegram)
- RL monitoring endpoints
- WhatsApp webhook: `POST /automation/webhooks/whatsapp`

---

## Request Flow (Typical)

```
Frontend api.ts
  → Authorization: Bearer <JWT or API_KEY>
  → POST /v1/candidate/login (auth)
  → GET /v1/jobs (gateway)
  → GET /v1/match/{job_id}/top (gateway → agent)
  → POST /v1/jobs/{job_id}/shortlist (gateway → MongoDB)
  → LangGraph workflow triggered on lifecycle event
  → Notification dispatched (email/WhatsApp/Telegram)
```

---

## Frontend Architecture

| Layer | Path | Purpose |
|-------|------|---------|
| Routes | `src/App.tsx` | Portal routing |
| Auth | `context/AuthContext.tsx`, `services/authService.ts` | JWT storage |
| API | `services/api.ts` | Axios client + interceptors |
| Layouts | `components/layouts/*` | Portal shells |
| Pages | `pages/candidate/`, `recruiter/`, `client/`, `control/` | Feature UI |
| Guards | `components/ProtectedRoute.tsx` | Role-based access |

### Auth storage

Tokens in `sessionStorage` via `authStorage.ts`. Roles: `candidate`, `recruiter`, `client`, `admin`.

---

## Auth Architecture (Triple Layer)

| Layer | Header | Secret | Used for |
|-------|--------|--------|----------|
| API Key | `Authorization: Bearer <API_KEY_SECRET>` | `API_KEY_SECRET` | Service-to-service, admin ops |
| Client JWT | Bearer JWT | `JWT_SECRET_KEY` | Client portal |
| Candidate JWT | Bearer JWT | `CANDIDATE_JWT_SECRET_KEY` | Candidate + recruiter login |

Recruiter uses candidate login endpoint; role resolved from JWT payload.

Optional 2FA: `/v1/auth/2fa/*` (pyotp/qrcode).

---

## Multi-Tenant Isolation

- Client data scoped by `client_id`
- Tenant isolation verified in evidence (`evidence/enforcement/`)
- Control Center governance extends scoped visibility patterns
- **Gap:** Not all endpoints enforce same isolation — see Known Issues

---

## SETU Integration

Sampada emits workforce/hiring signals to SETU aggregation layer:

```
POST /v1/setu/signals/{signal_type}
GET  /v1/setu/signals
GET  /v1/setu/trace/{trace_id}
```

Partner systems (Niyantran, Artha, CRM, Logistics) dispatch to same endpoint per `SAMPADA_CURRENT_STATE.md` (2026-07-02 closeout).

---

## Government-Scale Layers (Task19)

Documented 5-layer model in `docs/SAMPADA_GOVERNMENT_SCALE_ARCHITECTURE.md`:

1. Talent Intelligence (hiring)
2. Workforce Operations (employees)
3. Growth & Development
4. Workforce Observability
5. Government-Scale Governance

Runtime modules: `workforce_runtime.py`, `policy_engine.py`, `decision_ledger.py`, etc.

---

## Observability

- Structured JSON logging (`LOG_FORMAT=json`)
- Correlation/trace IDs in evidence folder
- Metrics: `/metrics`, `/health/detailed`, `/metrics/dashboard`
- `OBSERVABILITY_ENABLED=true`
