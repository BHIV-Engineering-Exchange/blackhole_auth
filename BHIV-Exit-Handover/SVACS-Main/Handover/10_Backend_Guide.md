# Backend Guide — SVACS-Main

## Two backends (important)

| App | File | Deploy | Purpose |
|-----|------|--------|---------|
| **Flask Dashboard** | `dashboard/app.py` | **Render (gunicorn)** | Read `storage/` JSON, serve dashboard API |
| **FastAPI Runtime** | `main.py` | Local / manual only | Compute runtime chain on demand |

Incoming team must not conflate these.

---

## Flask dashboard API (production)

**Start local:** `python dashboard/app.py` → port 5000  
**Render:** `gunicorn ... dashboard.app:app`

### Data loaders

| Function | Source file |
|----------|-------------|
| `load_dashboard_payloads()` | `storage/dashboard/dashboard_payloads.json` |
| `load_telemetry()` | `storage/telemetry/telemetry_logs.json` |
| `load_rejections()` | `storage/denials/denial_logs.json` |
| `load_metrics()` | Storage metrics paths |
| `load_replay(id)` | Execution replay artifacts |

Uses `load_json_lines()` — tolerant of malformed lines.

### Legacy HTML

`/` renders `templates/dashboard.html` — parallel to React Vercel app.

---

## FastAPI runtime API

**Start:** `uvicorn main:app --reload --port 8000`

### Dependencies

- `runtime.full_operational_chain.process_runtime_chain`
- `runtime.runtime_normalizer.normalize_runtime`
- `replay.replay_engine.replay_runtime`
- `ttg.ttg_adapter.generate_ttg_event`
- `rl.episode_runner.run_episode`

### Runtime chain (`runtime/full_operational_chain.py`)

1. `ingest_ais_data()` from `runtime.ais_runtime_ingestor`
2. Jane's metadata via `get_vessel_metadata(mmsi)`
3. Builds geo, intelligence, state stages per event
4. Writes `logs/full_operational_chain_log.json`
5. Returns runtime_logs list

Simpler than root `full_operational_chain.py` (which includes bucket HTTP uploads).

---

## Orchestration engine

**File:** `orchestration/live_pipeline.py` (~1100 lines)

Primary end-to-end pipeline:

```
signal_generator → perception → intelligence → state
→ rajya_validator → sarathi token_manager → telemetry
→ execution_contract_validator → storage append
```

Writes to:
- `storage/executions/`
- `storage/denials/`
- `storage/dashboard/`
- `storage/telemetry/`

Supports approved, reject, and invalid-token flows (`tests/test_pipeline.py`).

---

## Core modules

| Module | Path |
|--------|------|
| Signal | `signal_events/signal_generator.py` |
| Perception | `perception/perception_engine.py` |
| Intelligence | `intelligence/intelligence_engine.py` |
| State | `state/state_engine.py` |
| Replay | `replay/replay_engine.py`, `replay/execution_replay.py` |
| Sensor fusion | `sensor_fusion/sensor_fusion_engine.py` |
| Vessel intelligence | `vessel_intelligence_engine.py` |
| Jane's | `external_grounding/janes_ingestion_pipeline.py` |
| Governance | `governance/dataset_governance_validator.py` |
| Telemetry | `telemetry/telemetry_manager.py` |
| Contracts | `contracts/execution_contract_validator.py` |

---

## Root operational chain

**File:** `full_operational_chain.py`

Multi-stage pipeline with external bucket integration:

- URLs: `bhiv-bucket.onrender.com/bucket/latest-hash`, `/bucket/artifact`
- Writes `runtime/single_trace_runtime.json`, `storage/logs/full_runtime_chain_log.jsonl`

Run for demo proofs and bucket lineage validation.

---

## CLI execution (from README)

```bash
python full_operational_chain.py
python external_grounding/janes_ingestion_pipeline.py
python sensor_fusion/sensor_fusion_engine.py
python sensor_fusion/uncertainty_engine.py
python vessel_intelligence_engine.py
```

---

## Tests

| Script | Purpose |
|--------|---------|
| `tests/test_pipeline.py` | Approved/reject/token flows |
| `tests/federated_replay_validation.py` | Federated replay |
| `tests/distributed_replay_test.py` | Distributed replay |
| `tests/corruption_recovery_test.py` | Corruption recovery |
| `tests/continuous_orchestration_test.py` | Continuous orchestration |

Run with pytest or directly as scripts.

---

## Extension points

1. Unify Flask + FastAPI or document single entrypoint
2. Expose `perception_log` HTTP for NICAI if required by Pradnya integration docs
3. Implement RealAdapter against Flask aggregated endpoints
4. Persist storage to S3/bucket automatically post-pipeline
