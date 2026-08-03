# Data Schema — SVACS-Main

**No relational database.** Persistence is file-based JSON and JSONL under `storage/`, `runtime/`, and `logs/`.

---

## Storage overview

| Path | Format | Purpose |
|------|--------|---------|
| `storage/dashboard/dashboard_payloads.json` | JSON lines | Dashboard execution payloads |
| `storage/telemetry/telemetry_logs.json` | JSON lines | Stage telemetry events |
| `storage/denials/denial_logs.json` | JSON lines | Rejection/denial audit |
| `storage/logs/full_runtime_chain_log.jsonl` | JSONL | Full pipeline stage log |
| `storage/runtime/*.json` | JSON | Runtime proof snapshots |
| `storage/proofs/**` | JSON, MD, TXT | Validation and replay proofs |
| `storage/executions/` | JSON files | Per-execution artifacts |
| `storage/lineage/lineage_report.json` | JSON | Lineage report |
| `runtime/*.json` | JSON | AIS, fusion, intelligence traces |
| `maritime_knowledge/*.json` | JSON | Fleet/vessel registries |
| `validation_reports/*.json` | JSON | Component validation reports |

---

## Dashboard payload (Flask API)

Normalized fields from `load_dashboard_payloads()`:

| Field | Type | Notes |
|-------|------|-------|
| `execution_id` | string | Unique execution key |
| `trace_id` | string | End-to-end trace |
| `pipeline_stage` | string | e.g. CORE |
| `status` | string | COMPLETED, TOKEN_DENIED, MUTATION_REJECTED, etc. |
| `token_issued` | boolean | Sarathi token flow |
| `telemetry_active` | boolean | |
| `replay_available` | boolean | |
| `hash_chain_verified` | boolean | Bucket/hash continuity |
| `timestamp` | string | ISO-ish |

---

## Telemetry event

| Field | Notes |
|-------|-------|
| `event_id` | Dedup key |
| `execution_id`, `trace_id` | Correlation |
| `stage`, `parent_stage` | Pipeline position |
| `service` | Originating service |
| `status`, `severity` | CRITICAL for denials |
| `timestamp` | Sort key |

---

## FastAPI normalized runtime object

From `runtime/runtime_normalizer.py`:

| Field | Source |
|-------|--------|
| `trace_id` | Pipeline |
| `vessel_id` | AIS `mmsi` |
| `lat`, `lon`, `speed` | Runtime event |
| `classification`, `confidence`, `risk` | Intelligence stage |
| `validation` | ALLOW/FLAG/DENY |
| `vessel_class` | Jane's metadata |
| `alert` | From intelligence stage |

---

## Input signal (orchestration)

Pipeline stages consume/produce dicts with:

- `execution_id`, `trace_id` (from `utils/trace_utils.py`)
- Signal events from `signal_events/signal_generator.py`
- Perception output from `perception/perception_engine.py`
- Intelligence from `intelligence/intelligence_engine.py`
- State from `state/state_engine.py`

Exact shapes vary by stage — see `orchestration/live_pipeline.py` append logs.

---

## SVACS → NICAI signal (Pradnya adapter reference)

When integrated via Pradnya `svacs_adapter.py`:

| Field | Notes |
|-------|-------|
| `signal_id` | From `event_id` |
| `feature_type` | `acoustic` |
| `dataset_id` | `svacs` |
| `value` | `vessel.confidence_score` |
| `trace_id` | Generated UUID-based |

---

## Jane's metadata fields (README)

- `vessel_class`, `operational_role`, `propulsion_metadata`, `size_metadata`, `signature_profile`, `source_metadata`, `lineage_metadata`

Artifacts: `janes_*registry*.json`, `external_grounding/`

---

## Log line format (append-only)

```json
{
  "trace_id": "...",
  "timestamp": "...",
  "type": "VALIDATION | ANALYSIS | ...",
  "data": {}
}
```

Used across pipeline modules and `full_operational_chain.py`.

---

## Backup

- Git tracks committed storage proofs and reports
- Runtime-appended logs: copy `storage/` before redeploy if audit needed
- **TODO: Verify** — production log retention

---

## Migrations

No schema migration tool. JSON shape changes require coordinated updates to loaders in `dashboard/app.py` and frontend types in `src/domain/types.ts`.
