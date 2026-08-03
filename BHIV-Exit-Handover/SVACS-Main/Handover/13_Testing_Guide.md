# Testing Guide — SVACS-Main

## Automated tests

**pytest** listed in `requirements.txt`.

| Location | Purpose |
|----------|---------|
| `tests/test_pipeline.py` | Approved, reject, invalid-token pipeline flows |
| `tests/federated_replay_validation.py` | Federated replay validation |
| `tests/distributed_replay_test.py` | Distributed replay |
| `tests/corruption_recovery_test.py` | Corruption recovery |
| `tests/continuous_orchestration_test.py` | Continuous orchestration |

```bash
pytest tests/
# or individual:
python tests/test_pipeline.py
```

---

## Validation reports (committed)

`validation_reports/` contains JSON reports:

- `dashboard_validation.json`
- `sensor_fusion_validation.json`
- `vessel_intelligence_validation.json`
- `replay_validation.json`
- `knowledge_ingestion_validation.json`
- `janes_validation.json`
- etc.

Treat as evidence artifacts from prior validation runs.

---

## Manual API smoke tests

### Flask (port 5000)

```bash
curl http://127.0.0.1:5000/health
curl http://127.0.0.1:5000/api/dashboard
curl http://127.0.0.1:5000/api/telemetry
curl http://127.0.0.1:5000/api/rejections
curl http://127.0.0.1:5000/api/metrics
curl http://127.0.0.1:5000/api/replay/<execution_id>
```

### FastAPI (port 8000)

```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/api/runtime
curl http://127.0.0.1:8000/api/dashboard
curl http://127.0.0.1:8000/api/replay
curl http://127.0.0.1:8000/api/trace/<trace_id>
```

---

## Frontend tests

No Vitest/Jest configured in `package.json`.

Manual checklist:

| # | Test | Expected |
|---|------|----------|
| F1 | `npm run typecheck` | Pass (Vercel gate) |
| F2 | `npm run build` | Produces `dist/` |
| F3 | All routes load | No router 404 |
| F4 | Overview polls | React Query refetch without errors |
| F5 | Settings | Shows mock enabled by default |
| F6 | Mobile sidebar | Toggle at ≤768px |
| F7 | Trace explorer | Search UI renders |

---

## Deterministic replay tests

README guarantees:

```text
DETERMINISTIC_CHAIN_VERIFIED
REPLAY_SAFE
LINEAGE_CONTINUITY_VERIFIED
```

Verify by:

1. Run `python tests/test_pipeline.py`
2. Compare replay output for same `execution_id`
3. Inspect `storage/proofs/replay_parity_report.json` if present

---

## Full chain demo (README flow)

```bash
python full_operational_chain.py
```

Expect stage printouts: SIGNAL → ... → DASHBOARD → COMPLETED

Then open Flask `/` or React overview.

---

## Stress / federated tests

```bash
python stress/distributed_stress_runner.py
python tests/federated_replay_validation.py
```

See `stress/entropy_survival_report.md`.

---

## CI recommendation

```yaml
# Suggested — not in repo
- pip install -r requirements.txt && pytest tests/
- npm ci && npm run typecheck && npm run build
```

---

## Test data

Pre-populated `storage/` and `runtime/` JSON enable API tests without running pipeline. For fresh run, archive then execute `orchestration/live_pipeline.py`.
