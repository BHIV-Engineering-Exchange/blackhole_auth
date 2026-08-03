# Testing Checklist — Namami-Gange

**Generated:** 2026-07-06

---

## Prerequisites

- [ ] Python 3.10+
- [ ] Node.js 18+
- [ ] Backend deps installed
- [ ] Backend running on :5000

---

## Backend Smoke Tests

### Health & Core

- [ ] `GET /` → 200, NICAI overview
- [ ] `GET /health` → 200, `entities_loaded: 6`, `ml_used: false`
- [ ] `GET /locations` → 6 locations
- [ ] `GET /results?model=inland_port` → scored results
- [ ] `GET /results?model=seaplane` → scored results
- [ ] `GET /results?model=hub_spoke` → scored results
- [ ] `GET /results?location_id=farakka_wetland` → REJECTED
- [ ] `POST /analyze-location` with valid entity → scored result

### Simulation

- [ ] `POST /simulate` with valid body → baseline + scenario + delta
- [ ] `POST /simulate/baseline` → baseline only
- [ ] `POST /simulate/multi` → multi-scenario comparison

### Marine

- [ ] `GET /marine-health` → 200
- [ ] `GET /marine-signals` → 200
- [ ] `GET /proposal-engine?location_id=varanasi_terminal` → 200
- [ ] `GET /navigability?waterway=NW1` → 200

---

## Backend Test Scripts

Run from `backend/tests/` with server on :5000:

- [ ] `test_determinism.py` — 10 identical runs
- [ ] `test_contract_validation.py` — response shape
- [ ] `test_scenarios.py` — core scoring
- [ ] `test_scenarios_simulation.py` — 10 simulation cases
- [ ] `test_failures.py` — malformed input
- [ ] `test_boundaries.py` — boundary values
- [ ] `test_api.py` — HTTP integration
- [ ] `test_marine_schema.py`
- [ ] `test_navigability.py`
- [ ] `test_proposal_engine.py`
- [ ] `test_overlay_contracts.py`
- [ ] `test_bridge_barrage_constraints.py`
- [ ] `test_contradictions.py`

---

## Frontend Smoke Tests

- [ ] `npm run dev` starts on :3000
- [ ] Dashboard loads with suitability cards
- [ ] Scores match backend `/results` response
- [ ] All 9 sidebar tabs navigate without crash
- [ ] Simulator animation runs on Global tab
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds

---

## Integration Tests

- [ ] Frontend fetches `/results?model=inland_port` — Network 200
- [ ] No CORS errors
- [ ] `mapBackendToFrontend()` maps REJECTED → LOW display level
- [ ] Location selection updates detail panels

---

## Production Tests

TODO: Verify URLs first.

- [ ] Render `/health` → 200
- [ ] Render `/results?model=inland_port` → data
- [ ] Vercel frontend loads
- [ ] Production suitability scores visible
- [ ] No CORS errors on production origin

---

## Security Tests

- [ ] No secrets in git
- [ ] Document open API (no auth)
- [ ] CORS not set to `*` in production unless intentional

---

## Sign-off

| Role | Name | Date | Pass/Fail |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Reviewer | | | |
