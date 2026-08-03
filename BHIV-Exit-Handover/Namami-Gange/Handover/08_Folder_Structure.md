# Folder Structure — Namami-Gange

**Generated:** 2026-07-06

---

## Root Directory

```
Namami-Gange/
├── backend/
├── frontend/
├── Handover/
├── DEPLOYMENT_GUIDE.md
├── REVIEW_PACKET.md
├── README.md
├── render.yaml
├── requirements.txt
└── vercel.json              # Not present at root — Vercel uses frontend/ or manual config
```

Note: Root `vercel.json` may be configured in Vercel dashboard with root directory `frontend`. Repo has `frontend/vercel.json`.

---

## `backend/`

```
backend/
├── src/
│   ├── api.py                 # Flask entry, core routes
│   ├── scoring_engine.py      # Weighted scoring models
│   ├── constraint_engine.py   # Hard/soft constraints
│   ├── signal_trace_layer.py  # Trace attachment
│   ├── simulate_api.py        # Simulation blueprint
│   ├── marine_api.py          # Marine spine blueprint
│   ├── marine_schema.py       # Marine signal schema
│   ├── data_adapter.py        # CSV → entity adapter
│   └── (other scoring/support modules)
├── tests/                     # 13 test scripts
├── data_raw/                  # 5 CSV datasets
├── demo_cases/                # JSON demo cases
├── docs/
│   └── API_CONTRACT.md        # v2.1 contract
├── review_packets/            # REVIEW_PACKET_v2, v3
├── proofs/                    # Runtime proof docs
├── sample_api_requests.json
├── ng_data_inventory.csv
├── marine_masterdb_design.md
├── requirements.txt
└── README.md
```

---

## `frontend/`

```
frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Main shell (654+ lines)
│   │   ├── page.module.css
│   │   └── layout.tsx
│   ├── components/
│   │   ├── layout/            # Sidebar, Topbar
│   │   ├── views/             # 8 view components
│   │   ├── shared/            # Cards, replay, federation, map
│   │   └── map/               # MapContainer
│   └── services/
│       └── api.ts             # Backend client
├── public/
├── design-system/             # colors, spacing docs
├── Namami Gange.html          # Static HTML prototype
├── vercel.json
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── README.md
├── README-UI.md
├── REVIEW_PACKET.md
├── AGENTS.md
└── CLAUDE.md
```

---

## `Handover/`

18 markdown files + `review_packets/`, `code_packets/`, `Screenshots/`, `Videos/`

---

## Test Files (`backend/tests/`)

| File | Focus |
|------|-------|
| `test_api.py` | HTTP integration (server on :5000) |
| `test_determinism.py` | Same input → identical output |
| `test_failures.py` | Edge cases |
| `test_boundaries.py` | Boundary values |
| `test_contract_validation.py` | API contract shape |
| `test_scenarios.py` | Core scoring |
| `test_scenarios_simulation.py` | Simulation audit (10 cases) |
| `test_proposal_engine.py` | Proposal engine |
| `test_navigability.py` | Navigability layer |
| `test_marine_schema.py` | Marine normalization |
| `test_overlay_contracts.py` | GeoJSON overlays |
| `test_bridge_barrage_constraints.py` | Barrage constraints |
| `test_contradictions.py` | Contradiction engine |

Run style: custom scripts with `if __name__ == "__main__"` — not pytest.ini configured.

---

## Key Config Files

| File | Purpose |
|------|---------|
| `render.yaml` | Render backend blueprint |
| `frontend/vercel.json` | Vercel Next.js config |
| `backend/requirements.txt` | Python deps |
| `frontend/package.json` | Node deps |

---

## Naming Drift

| Docs say | Actual path |
|----------|-------------|
| `namami-gange-ui/` | `frontend/` |
| `Namami-Gange-Demo/` | `Namami-Gange/` |
