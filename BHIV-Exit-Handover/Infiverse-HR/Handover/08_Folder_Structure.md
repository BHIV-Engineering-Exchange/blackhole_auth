# Folder Structure — Infiverse-HR

**Generated:** 2026-07-06

---

## Root Directory

```
Infiverse-HR/
├── frontend/                 # React + TypeScript SPA
├── backend/                  # FastAPI microservices
├── docs/                     # Architecture & Task19 docs
├── evidence/                 # Verification artifacts
├── tests/                    # Root schema tests
├── Handover/                 # This handover package
├── SAMPADA_CURRENT_STATE.md  # Primary handover (12 sections)
├── REVIEW_PACKET.md          # Acceptance proofs
├── QUICK_START.md            # Local setup
├── CONTRIBUTION_LOG.md
├── PARTNER_SETU_LIVE_RUNBOOK.md
├── run_project.ps1 / .bat
├── START_BACKEND.ps1
├── START_FRONTEND.ps1
└── README.md
```

---

## `frontend/`

```
frontend/
├── src/
│   ├── App.tsx                    # Route definitions (canonical)
│   ├── main.tsx
│   ├── routes.tsx                 # Legacy partial routes — do not use
│   ├── pages/
│   │   ├── auth/AuthPage.tsx
│   │   ├── candidate/             # Dashboard, Jobs, Tasks, etc.
│   │   ├── recruiter/             # Job creation, matching, automation
│   │   ├── client/                # Client portal pages
│   │   └── control/ControlCenter.tsx
│   ├── components/
│   │   ├── layouts/               # CandidateLayout, RecruiterLayout, ClientLayout
│   │   ├── ProtectedRoute.tsx
│   │   └── SplashScreen.tsx
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── services/
│   │   ├── api.ts                 # Axios client
│   │   └── authService.ts
│   └── utils/authStorage.ts
├── vercel.json
├── vite.config.ts                 # Port 3000
├── .env.example
├── AUTHENTICATION_STRUCTURE.md
└── VERCEL_DEPLOYMENT.md
```

---

## `backend/`

```
backend/
├── services/
│   ├── gateway/
│   │   ├── app/
│   │   │   ├── main.py            # Gateway entry
│   │   │   ├── control_center_governance.py
│   │   │   ├── workforce_runtime.py
│   │   │   ├── workforce_lifecycle.py
│   │   │   ├── policy_engine.py
│   │   │   ├── decision_ledger.py
│   │   │   ├── setu_participation.py
│   │   │   └── jwt_auth.py
│   │   ├── routes/
│   │   │   └── workforce_governance_routes.py
│   │   └── Dockerfile
│   ├── agent/
│   │   └── app.py
│   ├── langgraph/
│   │   └── app/main.py
│   └── portal/                    # Legacy Streamlit
├── tests/                         # Large pytest suite
│   ├── gateway/
│   ├── agent/
│   ├── langgraph/
│   ├── e2e/control_center/
│   └── security/
├── docs/
│   ├── api/API_DOCUMENTATION.md
│   ├── database/MONGODB_COLLECTIONS.md
│   └── guides/DEPLOYMENT_GUIDE.md
├── tools/                         # Ops scripts
├── docker-compose.production.yml
├── run_services.py
├── requirements.txt
└── .env.example
```

---

## `docs/` (Architecture)

| File | Topic |
|------|-------|
| `SAMPADA_GOVERNMENT_SCALE_ARCHITECTURE.md` | 5-layer model |
| `SAMPADA_POLICY_GOVERNANCE_MODEL.md` | Policy engine |
| `SAMPADA_FEDERATED_WORKFORCE_MODEL.md` | Federated admin |
| `SAMPADA_COMMAND_CENTER_GOVERNANCE_MODEL.md` | Control Center |
| `SAMPADA_HUMAN_SAFETY_MODEL.md` | Human safety |
| `SAMPADA_SETU_CONVERGENCE_MAP.md` | SETU integration |
| `TASK19_ACCEPTANCE_TEST_PACK.md` | Acceptance tests |
| `CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md` | Live rollout |
| `CENTRAL_CONTROL_API_CONTRACT_FREEZE.md` | API contract freeze |

---

## `evidence/`

```
evidence/
├── boundaries/           # Visibility boundary checks
├── enforcement/          # RBAC + tenant isolation
├── entry-points/         # Token templates, curl examples
├── failure/              # Vulnerability blocks
├── replay/               # State reconstruction
├── trace-continuity/     # Correlation ID logs
├── workforce_runtime/    # Workforce governance proofs
└── live_workforce_governance_setu/  # SETU sprint evidence
```

---

## `tests/` (Root)

```
tests/
└── test_schemas.py       # JSON schema validation (pytest)
```

---

## Sprint Folder

```
Live WO, GE & SETU Participation Sprint (Sampada Convergence and Expansion Builder)/
```

Contains sprint deliverables and evidence markdown files referenced in `SAMPADA_CURRENT_STATE.md`.

---

## Files to Treat with Caution

| File | Reason |
|------|--------|
| `backend/.env` | Secrets — gitignored |
| `frontend/.env` | Secrets — gitignored |
| `frontend/src/routes.tsx` | Legacy — superseded by App.tsx |
| `backend/services/portal/` | Legacy Streamlit — not main UI |
