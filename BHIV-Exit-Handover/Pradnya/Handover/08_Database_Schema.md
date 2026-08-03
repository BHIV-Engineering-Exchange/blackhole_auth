# Data Schema — Pradnya / NICAI

**Storage model:** File-based — no SQL or NoSQL database.

---

## Overview

| Store | Format | Purpose |
|-------|--------|---------|
| `data/clean_weather.csv` | CSV | Weather readings → temperature signals |
| `data/clean_aqi.csv` | CSV | AQI readings → aqi signals |
| `datasets.json` | JSON array | Dataset registry (trust, status) |
| `logs/*.json` | JSON lines | Append-only audit logs |
| `sample_signals.json` | JSON | Sample inputs (if present) |
| `schema.json` | JSON | Output schema reference |

---

## Input signal schema

**Required fields** (`schemas.py`):

| Field | Type | Notes |
|-------|------|-------|
| `signal_id` | string | e.g. `W_0`, `A_3` |
| `timestamp` | string | From CSV date column |
| `latitude` | float | Deterministic fallback if missing |
| `longitude` | float | Deterministic fallback if missing |
| `feature_type` | string | `temperature`, `aqi`, `acoustic`, `traffic` |
| `value` | number | Reading or confidence score |
| `dataset_id` | string | Must match `datasets.json` entry |

**Optional (SVACS):** `trace_id`, `metadata`, `asset_id`, `source`, `signal_type`

---

## Dataset registry (`datasets.json`)

| dataset_id | status | trust_score |
|------------|--------|-------------|
| `DS_WEATHER` | active | 0.9 |
| `DS_AQI` | active | 0.85 |
| `svacs` | active | 0.9 |

Unknown or inactive datasets → validation FLAG.

---

## CSV sources

### `data/clean_weather.csv`

Columns used: `temperature`, `date`, optional `latitude`, `longitude`

Converted to signals with `dataset_id: "DS_WEATHER"`, `feature_type: "temperature"`.

Deterministic value overrides in adapter (modulo rules) for demo HIGH/MEDIUM distribution.

### `data/clean_aqi.csv`

Columns used: `aqi`, `date`, optional geo columns

Converted with `dataset_id: "DS_AQI"`, `feature_type: "aqi"`.

---

## Log files (`logs/`)

Each line is one JSON object:

```json
{
  "trace_id": "TRACE_W_0",
  "timestamp": "2026-07-07T15:30:00+00:00",
  "type": "VALIDATION | ANALYSIS | PATTERN | ACTION",
  "data": { }
}
```

| File | Content |
|------|---------|
| `validation_logs.json` | Validation results per signal |
| `anomaly_logs.json` | Sanskar analysis outputs |
| `pattern_logs.json` | Pattern detection summaries |
| `action_logs.json` | Simulated action payloads |

Logs are append-only; no rotation configured in code.

**Render note:** Log files on ephemeral disk may not persist across deploys.

---

## Validation result schema

| Field | Values |
|-------|--------|
| `status` | `ALLOW`, `FLAG` (validator); README also documents REJECT — not emitted by current validator |
| `confidence_score` | 0.0–1.0 (or float for acoustic) |
| `trace_id` | Propagated from signal or `TRACE_UNKNOWN` |
| `reason` | Human-readable |

---

## Intelligence result schema

| Field | Notes |
|-------|-------|
| `trace_id` | End-to-end trace key |
| `risk_level` | LOW / MEDIUM / HIGH (weather); CRITICAL possible in `sanskar_simple` |
| `anomaly_type` | Often equals `feature_type` |
| `anomaly_score` | Numeric score (value-based in main engine) |
| `confidence` | Numeric |
| `explanation` | Rule-generated text |
| `recommendation_signal` | Risk label or escalation hint |

---

## Pattern result schema

```json
{
  "pattern_id": "PATTERN_001",
  "anomaly_count": 13,
  "affected_zones": [],
  "pattern_type": "ENVIRONMENTAL_CLUSTER",
  "severity_trend": "STABLE",
  "pattern_summary": "13 elevated-risk events detected"
}
```

---

## Traceability flow

```
Signal → Validation → Analysis → Pattern → Dashboard → Action Log
         (same trace_id propagated where present)
```

---

## Backup

- **Code + CSV:** Git repository
- **Logs:** Copy `logs/` directory manually; no automated backup in repo
- **TODO: Verify** — production log retention policy

---

## Migrations

No migration framework. Schema changes require coordinated updates to `schemas.py`, `validator.py`, and frontend mappers in `App.jsx`.
