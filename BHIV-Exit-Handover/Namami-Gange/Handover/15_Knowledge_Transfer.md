# Knowledge Transfer — Namami-Gange

**Generated:** 2026-07-06

---

## What This Product Does

**Namami Gange Platform** (NICAI engine) helps Ganga Basin administrators evaluate infrastructure suitability for:

- **Inland port development**
- **Seaplane landing zones**
- **Hub-spoke logistics networks**

It provides deterministic, audit-grade scores with full traceability (signal sources, constraints, scoring formula) and supports what-if scenario simulation via API.

---

## Key Concepts

### Deterministic Scoring

No ML. Same input always produces identical output. Every result includes `trace`, `constraints`, and `scoring_model` for audit.

### Hard vs Soft Constraints

- **Hard** (wetland, flood, no clearance, extreme pollution) → `REJECTED`, score 0
- **Soft** (e.g. logistics absence) → penalty deducted from weighted score

### Three Scoring Models

| Model | Use case |
|-------|----------|
| `inland_port` | River port suitability |
| `seaplane` | Seaplane landing zones |
| `hub_spoke` | Logistics hub networks |

### Marine Intelligence Spine

Separate API layer for navigability, ecology, proposals, digital depth — not yet wired to UI.

---

## Code Walkthrough (45 min)

### 1. Scoring pipeline (15 min)

- `scoring_engine.py` — weights and thresholds
- `constraint_engine.py` — hard/soft evaluation
- `signal_trace_layer.py` — provenance
- `api.py` — `/results` endpoint

### 2. Simulation (10 min)

- `simulate_api.py` — scenario vs baseline
- `demo_cases/*.json` — test inputs

### 3. Frontend (10 min)

- `page.tsx` — tab nav, simulator state, fetchResults
- `api.ts` — only API integration point
- `IntelligenceCard.tsx` — score display

### 4. Deploy (10 min)

- `render.yaml`, `DEPLOYMENT_GUIDE.md`
- Env vars: `FRONTEND_URL`, `NEXT_PUBLIC_API_URL`

---

## Common Maintainer Tasks

### Run locally

```bash
cd backend/src && python api.py
cd frontend && npm run dev
```

### Test a location score

```bash
curl "http://localhost:5000/results?model=inland_port&location_id=kanpur_industrial_zone"
```

### Run simulation

```bash
curl -X POST http://localhost:5000/simulate \
  -H "Content-Type: application/json" \
  -d @backend/tests/sample_simulate_request.json
```

### Deploy update

1. Push to `main`
2. Render + Vercel auto-deploy
3. Verify `/health` and frontend scores

### Add a new demo location

1. Add entity to `data_raw/locations.json` (or hardcoded list in `api.py`)
2. Verify scoring via `GET /results`
3. Update UI location metadata in `page.tsx` if needed

---

## What's Real vs Mock

| Component | Status |
|-----------|--------|
| Scoring API | Real (deterministic) |
| CSV datasets | Real files, static |
| Dashboard suitability cards | Real (from API) |
| Scenario Simulation UI | Mock (client-side) |
| Replay/Federation console | Mock (animation) |
| Governance/Collaboration/Datasets | Static demo |
| Postgres/Redis/ng-core | Referenced, not in repo |

---

## Reading Order

1. `Handover/01_README.md`
2. `backend/docs/API_CONTRACT.md`
3. `backend/README.md`
4. `DEPLOYMENT_GUIDE.md`
5. `REVIEW_PACKET.md`
6. `backend/ng_data_inventory.csv`

---

## Questions for Outgoing Team

1. Are production Render/Vercel URLs live?
2. Where do ng-core, Postgres, Redis run?
3. Is full test suite (283 tests) still passing?
4. Planned timeline for wiring `/simulate` to UI?
5. Live CPCB/CWC integration roadmap?
