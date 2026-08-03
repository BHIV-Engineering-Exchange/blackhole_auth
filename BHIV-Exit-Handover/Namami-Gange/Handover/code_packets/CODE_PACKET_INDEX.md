# Code Packet Index — Namami-Gange

**Generated:** 2026-07-06

---

## Tier 1 — Must Read

| File | Purpose |
|------|---------|
| `backend/src/api.py` | Flask entry, core routes |
| `backend/src/scoring_engine.py` | Scoring models |
| `backend/src/constraint_engine.py` | Hard/soft constraints |
| `backend/docs/API_CONTRACT.md` | API contract v2.1 |
| `frontend/src/app/page.tsx` | Main UI shell |
| `frontend/src/services/api.ts` | Backend client |
| `render.yaml` | Render deploy |

---

## Tier 2 — Backend Extended

| File | Purpose |
|------|---------|
| `backend/src/simulate_api.py` | POST /simulate |
| `backend/src/marine_api.py` | Marine spine endpoints |
| `backend/src/signal_trace_layer.py` | Trace provenance |
| `backend/src/marine_schema.py` | Marine signal schema |
| `backend/src/data_adapter.py` | CSV adapter |

---

## Tier 3 — Frontend Views

| File | Tab |
|------|-----|
| `components/views/BasinIntelligence.tsx` | Ganga Basin Intel |
| `components/views/ScenarioSimulation.tsx` | Scenario Simulation |
| `components/views/LocationIntel.tsx` | Location Intel |
| `components/views/RealtimeSignals.tsx` | Realtime Signals |
| `components/views/GovernanceView.tsx` | Governance |
| `components/views/Collaboration.tsx` | Collaboration |
| `components/views/InfraNetwork.tsx` | Infra Network |
| `components/views/DatasetSources.tsx` | Datasets |
| `components/shared/FederationTopology.tsx` | Federation UI |
| `components/shared/ReplayConsole.tsx` | Replay UI |

---

## Tier 4 — Data

| File | Purpose |
|------|---------|
| `backend/data_raw/*.csv` | Source datasets (5 files) |
| `backend/demo_cases/*.json` | Simulation test cases |
| `backend/ng_data_inventory.csv` | Inventory + issues |
| `backend/sample_api_requests.json` | API examples |

---

## Tier 5 — Tests

| File | Focus |
|------|-------|
| `backend/tests/test_determinism.py` | Determinism guarantee |
| `backend/tests/test_contract_validation.py` | Contract shape |
| `backend/tests/test_scenarios.py` | Core scoring |
| `backend/tests/test_scenarios_simulation.py` | Simulation |
| `backend/tests/test_api.py` | HTTP integration |

---

## Tier 6 — Deploy & Docs

| File | Purpose |
|------|---------|
| `DEPLOYMENT_GUIDE.md` | Render + Vercel |
| `REVIEW_PACKET.md` | Integration status |
| `frontend/vercel.json` | Vercel config |
| `backend/requirements.txt` | Python deps |

---

## Reading Order

```
Day 1: API_CONTRACT.md → api.py → scoring_engine.py → curl /results
Day 2: simulate_api.py → marine_api.py → test_scenarios.py
Day 3: page.tsx → api.ts → IntelligenceCard.tsx
Day 4: DEPLOYMENT_GUIDE.md → render.yaml → production verify
Day 5: ng_data_inventory.csv → pending work → test suite run
```
