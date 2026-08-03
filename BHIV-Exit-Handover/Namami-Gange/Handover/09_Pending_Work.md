# Pending Work — Namami-Gange

**Generated:** 2026-07-06

---

## High Priority

| # | Item | Details |
|---|------|---------|
| 1 | **Wire remaining UI to backend** | Only `/results` connected; simulation, marine, governance views static |
| 2 | **Add `.env.example` files** | backend + frontend — referenced in DEPLOYMENT_GUIDE but missing |
| 3 | **Verify production URLs** | `namami-gange-api.onrender.com`, `namami-gange.vercel.app` |
| 4 | **Create `locations.json`** | Replace hardcoded entities in `api.py` |
| 5 | **Clarify external infra** | Postgres, Redis, ng-core status per `ng_data_inventory.csv` |

---

## Medium Priority

| # | Item | Details |
|---|------|---------|
| 6 | **Live CPCB/CWC API integration** | NG-INV-009/010 — currently static CSV only |
| 7 | **Environmental overlay sources** | NG-INV-006–008 — wetland/flood/clearance data unclear |
| 8 | **Wire Scenario Simulation to POST /simulate** | UI uses client-side slider math |
| 9 | **Wire marine endpoints to UI** | 7 marine routes unused by frontend |
| 10 | **Add authentication** | Open API — not production-ready |
| 11 | **CI/CD pipeline** | Run backend tests on PR |
| 12 | **Frontend tests** | No test script in `package.json` |

---

## Low Priority / Enhancements

| # | Item | Details |
|---|------|---------|
| 13 | **URL routing** | Single page with tabs — add Next.js routes for bookmarking |
| 14 | **Real-time WebSocket sync** | Documented as not working |
| 15 | **Multi-user concurrency** | Not supported |
| 16 | **Docker compose** | For local Postgres/Redis if infra restored |
| 17 | **data_adapter.py full pipeline** | CSV → dynamic entities at runtime |
| 18 | **Marine MasterDB implementation** | Design doc only |
| 19 | **Resolve folder naming drift** | `frontend/` vs `namami-gange-ui/` in docs |
| 20 | **Convert tests to pytest** | Standardize 13 test scripts |

---

## Integration Backlog (UI → API)

| View | Target endpoint | Status |
|------|-----------------|--------|
| Global Dashboard | `/results` | ✅ Done |
| Scenario Simulation | `POST /simulate` | ❌ Pending |
| Basin Intelligence | `/locations`, `/results` | ❌ Partial/static |
| Location Intel | `/analyze-location` | ❌ Pending |
| Realtime Signals | `/marine-signals` | ❌ Pending |
| Infra Network | `/infrastructure-overlay` | ❌ Pending |
| Governance | TBD | ❌ Static |
| Datasets | Inventory from CSV metadata | ❌ Static |
| Replay/Federation | ng-core persistence | ❌ Client simulation only |

---

## Recommended Next Sprint

1. Add `.env.example` + verify production deploy
2. Wire Scenario Simulation to `/simulate`
3. Add `locations.json` from CSV adapter
4. Run full test suite and capture output for evidence
5. Document or remove references to ng-core/Postgres/Redis
