# Backend Guide — Pradnya / NICAI

## Overview

Python **FastAPI** application in `main.py` at repo root. Processes CSV-derived signals through validation and Sanskar analysis, exposes JSON APIs and an HTML dashboard, logs all stages to `logs/`.

**Run:** `uvicorn main:app --host 0.0.0.0 --port 8000`

---

## Module map

| Module | Role |
|--------|------|
| `main.py` | FastAPI app, routes, `process_signals()`, file logging |
| `samachar_input_adapter.py` | `load_data()`, `convert_to_signals()` |
| `validator.py` | `validate_signal()`, batch validation |
| `sanskar_engine.py` | Weather/AQI `analyze_signal()`, `analyze_patterns()` |
| `sanskar_simple.py` | SVACS acoustic analysis (used by pipeline scripts) |
| `dataset_registry.py` | Load/cache `datasets.json` |
| `schemas.py` | `required_fields` list |
| `error_handler.py` | Standard error JSON, input gate |
| `utils.py` | Output schema validation helpers |

---

## Core processing: `process_signals(limit=20)`

1. `load_data()` — pandas read CSVs
2. `convert_to_signals(weather, aqi)` — list of signal dicts
3. For each signal (up to `limit`):
   - `validate_signal()` — skip if REJECT (unlikely with current validator)
   - `analyze_signal()` from `sanskar_engine`
   - Append to API response; log validation + analysis
4. `analyze_patterns(processed_outputs)` — aggregate pattern
5. Return `(api_signals, pattern, summary)`

**Performance:** Re-reads CSV on every request — acceptable for demo scale.

---

## Validation rules (`validator.py`)

- Required fields from `schemas.py`
- Dataset must exist in `datasets.json` and be `active`
- Feature-specific thresholds:
  - `temperature`: FLAG if ≥35
  - `aqi`: FLAG if ≥150
  - `traffic`: FLAG if ≥70
  - `acoustic` (SVACS): ALLOW with dynamic confidence
- Invalid/missing → **FLAG** (not hard REJECT per code comments)

Optional hooks: `bucket_emitter`, `telemetry_emitter` (ImportError-safe stubs).

---

## Sanskar engine (`sanskar_engine.py`)

**Risk from value:** ≥45 HIGH, ≥35 MEDIUM, else LOW  
**Anomaly:** `metadata.anomaly_flag === true` forces HIGH  
**Output:** trace_id, explanation, recommendation_signal, confidence (= value)

**Patterns:** Counts HIGH/MEDIUM events → `ENVIRONMENTAL_CLUSTER` summary.

---

## Sanskar simple (`sanskar_simple.py`)

Used for SVACS acoustic path — inverted confidence risk (lower confidence → higher risk), CRITICAL tier, vessel type checks.

**Not used by `main.py` `process_signals()`** — only pipeline scripts.

---

## Routes summary

| Route | Handler |
|-------|---------|
| GET `/health` | Service check |
| GET `/signals` | Full processed list + summary + pattern |
| GET `/patterns` | Pattern + summary |
| POST `/nicai/evaluate` | Custom signal batch |
| GET `/dashboard` | HTML table |
| POST `/action` | Log simulated action |
| GET `/` | Minimal HTML index |

---

## CORS

Middleware allows origins from `ALLOWED_ORIGINS` env (comma-separated). Defaults include localhost and `https://pradnya-bhiv.vercel.app`.

---

## Logging

```python
def log_data(filename, log_type, data):
    # appends JSON line to logs/{filename}
```

Silent failure on write errors (`except: pass`).

---

## SVACS integration (outside main app)

| File | Purpose |
|------|---------|
| `svacs_adapter.py` | Perception event → NICAI signal + UUID trace |
| `pipeline.py` | Full SVACS pipeline CLI |
| `live_integration.py` | Poll `localhost:8000/perception_log` |
| `nicai_integration.py` | SVACS confidence 0–1 check wrapper |

To expose SVACS in API would require new FastAPI routes calling these modules.

---

## Demo scripts

| Script | Behavior |
|--------|----------|
| `run_demo_full.py` | Console demo + `os.system("uvicorn main:app --reload")` |
| `run_demo.py` | Alternate demo entry |

Demo uses simplified validation object in loop — differs from production `validate_signal()`.

---

## Tests (manual scripts)

- `test_validation.py` — ALLOW/FLAG cases (note: uses `DS01` not in registry — expect FLAG)
- `test_pipeline.py` — SVACS pipeline
- `test_svacs_flow.py` — SVACS flow
- `integration_test.py` — integration checks

No pytest in `requirements.txt`.

---

## Extension points

| Need | Approach |
|------|----------|
| Real-time ingestion | Webhook route → validate → analyze |
| Persistent audit | S3/DB sink instead of local `logs/` |
| Unified Sanskar | Single engine with feature_type routing |
| Auth | FastAPI dependency on `/action` and `/nicai/evaluate` |
