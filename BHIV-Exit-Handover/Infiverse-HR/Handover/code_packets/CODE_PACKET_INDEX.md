# Code Packet Index — Infiverse-HR

**Generated:** 2026-07-06

---

## Tier 1 — Must Read

| File | Purpose |
|------|---------|
| `frontend/src/App.tsx` | All frontend routes |
| `frontend/src/services/api.ts` | Axios API client |
| `frontend/src/services/authService.ts` | Login flows |
| `frontend/src/components/ProtectedRoute.tsx` | Role guards |
| `backend/services/gateway/app/main.py` | Gateway entry + routers |
| `backend/services/gateway/app/jwt_auth.py` | Auth middleware |
| `backend/run_services.py` | Local multi-service launcher |

---

## Tier 2 — Backend Core

| File | Purpose |
|------|---------|
| `backend/services/agent/app.py` | AI matching service |
| `backend/services/langgraph/app/main.py` | Workflow service |
| `backend/services/gateway/app/control_center_governance.py` | Control Center APIs |
| `backend/services/gateway/routes/workforce_governance_routes.py` | Workforce + SETU |
| `backend/services/gateway/app/workforce_runtime.py` | Workforce runtime |
| `backend/services/gateway/app/setu_participation.py` | SETU signals |
| `backend/services/gateway/app/policy_engine.py` | Policy engine |
| `backend/services/gateway/app/decision_ledger.py` | Decision ledger |

---

## Tier 3 — Frontend Portals

| Path | Portal |
|------|--------|
| `frontend/src/pages/auth/AuthPage.tsx` | Login |
| `frontend/src/pages/candidate/*.tsx` | Candidate portal |
| `frontend/src/pages/recruiter/*.tsx` | Recruiter console |
| `frontend/src/pages/client/*.tsx` | Client portal |
| `frontend/src/pages/control/ControlCenter.tsx` | Control Center |

---

## Tier 4 — Config & Deploy

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend env template |
| `frontend/.env.example` | Frontend env template |
| `frontend/vercel.json` | Vercel config |
| `backend/docker-compose.production.yml` | Docker production |
| `backend/services/gateway/Dockerfile` | Gateway container |

---

## Tier 5 — Database

| File | Purpose |
|------|---------|
| `backend/docs/database/MONGODB_COLLECTIONS.md` | Collection schemas |
| `backend/services/gateway/verify_mongodb_schema.py` | Schema verification |
| `backend/services/gateway/create_mongodb_indexes.py` | Index creation |
| `backend/services/gateway/migrate_mongodb_schema.py` | Migrations |

---

## Tier 6 — Tests

| Path | Purpose |
|------|---------|
| `backend/tests/gateway/test_workforce_governance_runtime.py` | Workforce tests |
| `backend/tests/e2e/control_center/` | Control Center E2E |
| `backend/tests/security/` | Auth security tests |
| `backend/tests/comprehensive_endpoint_tests.py` | Full endpoint smoke |
| `tests/test_schemas.py` | JSON schema validation |

---

## Tier 7 — Documentation

| File | Topic |
|------|-------|
| `SAMPADA_CURRENT_STATE.md` | Full handover |
| `QUICK_START.md` | Local setup |
| `frontend/AUTHENTICATION_STRUCTURE.md` | Auth design |
| `backend/docs/api/API_DOCUMENTATION.md` | Full API ref |
| `frontend/VERCEL_DEPLOYMENT.md` | Frontend deploy |
| `backend/docs/guides/DEPLOYMENT_GUIDE.md` | Backend deploy |

---

## Legacy (Avoid)

| File | Note |
|------|------|
| `frontend/src/routes.tsx` | Superseded by App.tsx |
| `backend/services/portal/` | Legacy Streamlit |

---

## Reading Order for New Developer

```
Day 1: QUICK_START.md → run_services.py → App.tsx → main.py
Day 2: authService.ts → jwt_auth.py → api.ts
Day 3: Candidate + recruiter pages → matching flow
Day 4: ControlCenter.tsx → control_center_governance.py
Day 5: workforce_governance_routes.py → SETU → evidence/ folder
```
