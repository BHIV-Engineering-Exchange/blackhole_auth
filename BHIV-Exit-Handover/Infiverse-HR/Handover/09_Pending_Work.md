# Pending Work — Infiverse-HR

**Generated:** 2026-07-06  
**Source:** `SAMPADA_CURRENT_STATE.md`, Task19 docs, code review

---

## High Priority

| # | Item | Details |
|---|------|---------|
| 1 | **Verify live Render URLs** | Conflicting URLs in VERCEL_DEPLOYMENT.md vs DEPLOYMENT_GUIDE.md |
| 2 | **Internal HR user authentication** | Not fully implemented; API keys used as workaround |
| 3 | **Tenant isolation platform-wide** | Extend control_center_governance patterns to all endpoints |
| 4 | **Production UI smoke + prod JWT matrix** | Open items in `CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md` §F |
| 5 | **SETU external participation** | Local evidence captured; external owner integration unproven |

---

## Medium Priority

| # | Item | Details |
|---|------|---------|
| 6 | **Ministry→office hierarchy runtime enforcement** | Documented in Task19 architecture; not platform-wide |
| 7 | **Policy engine platform-wide** | `policy_engine.py` exists; not enforced on all routes |
| 8 | **Tenant-specific encryption** | Shared keys — security consideration |
| 9 | **Remove legacy routes.tsx confusion** | `frontend/src/routes.tsx` superseded by App.tsx |
| 10 | **CI/CD pipeline** | No GitHub Actions gating pytest on PR |
| 11 | **Frontend test coverage** | No Playwright/Cypress; only lint + build |
| 12 | **VITE_API_KEY in browser** | Exposed to clients in production bundle |

---

## Low Priority / Enhancements

| # | Item | Details |
|---|------|---------|
| 13 | **RL model training** | Mocked; retrain endpoint API-key gated |
| 14 | **Legacy Streamlit portals** | Deprecate or document retirement plan |
| 15 | **Supabase frontend env** | Commented in .env.example — clarify if needed |
| 16 | **ENVIRONMENT_VARIABLES.md** | Referenced in api.ts — TODO: Verify if exists |
| 17 | **PostgreSQL cleanup** | Fully remove commented PG references |
| 18 | **Demo credentials rotation** | `demo_user`, `TECH001` — verify/remove in prod DB |

---

## Task19 Open Items

From governance sprint documentation:

| Area | Status |
|------|--------|
| Government-scale architecture docs | Complete |
| Workforce governance runtime | Live (12 pytest passed) |
| Control Center UI | Production-verified (33/33 API eval 2026-06-06) |
| Governance panel | Approved GOV-PANEL-001, enabled in prod |
| Federated admin runtime | Partial — docs complete, enforcement partial |
| Human safety consent flows | Documented; full runtime TODO |

---

## Documentation Gaps

| Topic | Status |
|-------|--------|
| Canonical production URLs | TODO: Verify single source of truth |
| Complete-Infiverse workflow bridge prod config | TODO: Verify WORKFLOW_API_BASE_URL in Render |
| BHIV SSO (blackhole_auth) integration | Listed in ecosystem; not wired in this repo |

---

## Recommended Next Sprint

1. Confirm and document canonical Render/Vercel URLs
2. Rotate all secrets post-transfer
3. Run `CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md` end-to-end on production
4. Implement internal HR user auth (replace API key workaround)
5. Extend tenant isolation middleware to all gateway routes
6. Add CI: pytest smoke on PR + frontend build
