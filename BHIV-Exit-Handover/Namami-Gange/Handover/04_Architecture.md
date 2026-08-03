# Architecture — Namami-Gange

**Generated:** 2026-07-06

---

## High-Level Overview

```
┌─────────────────────────────────────────────────────────────────┐
│              Next.js App Router (single page, tab nav)           │
│  page.tsx → views (Basin, Simulation, Governance, etc.)          │
│  api.ts → GET /results?model=inland_port (only wired call)       │
└────────────────────────────┬────────────────────────────────────┘
                             │ fetch (CORS)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Flask API (api.py)                            │
│  scoring_engine │ constraint_engine │ signal_trace_layer         │
│  simulate_api (blueprint) │ marine_api (blueprint)               │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
     Hardcoded 6 entities   data_raw/*.csv   demo_cases/*.json
     (fallback)             (IWAI,CPCB,CWC)  (simulation inputs)
```

---

## Scoring Pipeline

```
Location entity (properties)
  → constraint_engine (hard → REJECT, soft → penalty)
  → scoring_engine (weighted factors by model_type)
  → signal_trace_layer (trace.source_signals, contributing_signal_ids)
  → contract response (score, level, trace, constraints, scoring_model, explanation)
```

**Models:** `inland_port`, `seaplane`, `hub_spoke`

**Guarantee:** Deterministic — same input → identical output (`ml_used: false`).

---

## Backend Modules

| Module | File | Purpose |
|--------|------|---------|
| API entry | `api.py` | Core routes, CORS, entity loading |
| Scoring | `scoring_engine.py` | Weighted factor scoring |
| Constraints | `constraint_engine.py` | Hard/soft constraint evaluation |
| Trace | `signal_trace_layer.py` | Signal provenance attachment |
| Simulation | `simulate_api.py` | POST /simulate, baseline, multi |
| Marine | `marine_api.py` | Marine Intelligence Spine endpoints |
| Marine schema | `marine_schema.py` | Signal normalization |
| Data adapter | `data_adapter.py` | CSV pipeline — TODO: Verify full wiring |

---

## Frontend Architecture

| Layer | Path | Notes |
|-------|------|-------|
| App shell | `src/app/page.tsx` | Tab state, simulator animation, suitability fetch |
| API client | `src/services/api.ts` | `fetchResults()`, `mapBackendToFrontend()` |
| Layout | `components/layout/Sidebar.tsx`, `Topbar.tsx` | Navigation |
| Views | `components/views/*.tsx` | Feature panels |
| Shared | `components/shared/*.tsx` | Cards, replay, federation, map |
| Map | `components/map/MapContainer.tsx` | Custom SVG (no Leaflet) |

**Simulator state** in `page.tsx`: federation topology, replay logs, correlation IDs — **client-side animation**, not backed by ng-core/Postgres.

---

## Auth Architecture

**None.** Open REST API. CORS restricted by `FRONTEND_URL` env var. UI shows mock user "J. Dosanjh, Chief Ops Officer" — display only.

---

## Data Architecture

### Runtime (active)

| Source | Location | Used by |
|--------|----------|---------|
| 6 demo entities | Hardcoded in `api.py` | `/results`, `/locations` |
| CSV datasets | `backend/data_raw/*.csv` | Scoring factor derivation — TODO: Verify adapter path |
| Demo cases | `backend/demo_cases/*.json` | Simulation tests |

### Referenced but not in repo

From `ng_data_inventory.csv`:

| System | Status |
|--------|--------|
| `ng-postgres-events` | Connection issues — not in repo |
| `ng-redis-dedup` | No persistence — not in repo |
| `ng-core` | PersistenceStore missing — not in repo |

---

## Integration Surface

| Integration | Status |
|-------------|--------|
| Frontend ↔ `/results` | ✅ Wired |
| Frontend ↔ `/simulate` | ❌ Scenario UI uses client-side sliders |
| Frontend ↔ marine endpoints | ❌ Not consumed |
| Live CPCB/CWC APIs | ❌ Not integrated (static CSV) |
| Chandragupta / SVACS | Referenced in docs — TODO: Verify |

---

## Deployment Topology

| Component | Host |
|-----------|------|
| API | Render (`namami-gange-api`) |
| UI | Vercel (`frontend/`) |
| Persistence | None in deployed stack |
