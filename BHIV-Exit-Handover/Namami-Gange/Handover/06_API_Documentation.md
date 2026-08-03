# API Documentation — Namami-Gange

**Generated:** 2026-07-06  
**Full contract:** `backend/docs/API_CONTRACT.md` (v2.1.0)  
**Examples:** `backend/sample_api_requests.json`  
**Base URL (local):** `http://localhost:5000`  
**Base URL (prod):** `https://namami-gange-api.onrender.com` — TODO: Verify

**Auth:** None

---

## Core Suitability Engine (`api.py`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API overview, available endpoints |
| GET | `/health` | Health check (`entities_loaded`, `ml_used: false`) |
| GET | `/locations` | All location entities (6 demo locations) |
| GET | `/results` | Scored results — query: `model`, `level`, `location_id` |
| POST | `/analyze-location` | Score single entity — body: `{ entity, model_type }` |

### GET `/results`

**Query params:**

| Param | Values | Default |
|-------|--------|---------|
| `model` | `inland_port`, `seaplane`, `hub_spoke` | `inland_port` |
| `level` | `HIGH`, `MEDIUM`, `LOW`, `REJECTED` | (none) |
| `location_id` | e.g. `varanasi_terminal` | (none) |

**Response:**

```json
{
  "model_type": "inland_port",
  "count": 6,
  "results": [
    {
      "location_id": "varanasi_terminal",
      "model_type": "inland_port",
      "score": 72.5,
      "level": "MEDIUM",
      "trace": { "source_signals": {}, "contributing_signal_ids": [] },
      "constraints": { "hard": [], "soft": [], "is_rejected": false },
      "scoring_model": { "weights": {}, "thresholds": {}, "formula": "..." },
      "explanation": "..."
    }
  ]
}
```

**Frontend integration:** `fetchResults('inland_port')` in `api.ts`.

---

## Simulation Layer (`simulate_api.py`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/simulate` | Scenario vs baseline + delta |
| POST | `/simulate/baseline` | Baseline scoring only |
| POST | `/simulate/multi` | Multiple predefined scenarios |

**Predefined scenarios:** `high_logistics`, `env_priority`, `connectivity_focus`, `relaxed_logistics`

**Approved datasets:** `ganga_basin_iwai_2024`, `ganga_basin_reference`, `demo_baseline`

**Note:** Demo mode blocks raw `base_data` injection. See `API_CONTRACT.md` for request body schema.

---

## Marine Intelligence Spine (`marine_api.py`)

| Method | Path | Query params | Description |
|--------|------|--------------|-------------|
| GET | `/marine-signals` | — | Normalized marine signals |
| GET | `/infrastructure-overlay` | — | GeoJSON infrastructure overlay |
| GET | `/navigability` | `waterway`, `vessel_class`, `month` | NW1/NW5 navigability |
| GET | `/ecology` | `stress_level`, `location_id` | Ecological integrity |
| GET | `/proposal-engine` | `location_id` (required) | Actionable proposals |
| GET | `/digital-depth` | `layer`, `summary` | 5-layer GIS depth |
| GET | `/marine-health` | — | Marine spine health |

> **Not consumed by frontend UI** as of handover date.

---

## Scored Result Contract (Summary)

Every scored result includes:

| Field | Description |
|-------|-------------|
| `location_id` | Entity identifier |
| `model_type` | Scoring model used |
| `score` | 0.0–100.0 (0 if REJECTED) |
| `level` | HIGH / MEDIUM / LOW / REJECTED |
| `trace` | Signal provenance |
| `constraints` | Hard/soft/overridden constraints |
| `scoring_model` | Weights, thresholds, formula |
| `explanation` | Human-readable rationale |

**Rule:** UI must not infer `level` from `score` — backend is source of truth.

---

## Error Responses

```json
{
  "error": "Human-readable message",
  "status": "error"
}
```

HTTP codes: 400 (validation), 404 (not found), 405 (method), 500 (server).

---

## Demo Location Entities

| location_id | Notes |
|-------------|-------|
| `varanasi_terminal` | Reference inland port |
| `allahabad_confluence` | Confluence zone |
| `patna_river_port` | Major port candidate |
| `kanpur_industrial_zone` | High pollution (extreme_pollution risk) |
| `farakka_wetland` | Wetland — hard REJECT |
| `hajipur_hub` | Hub-spoke candidate |

Loaded from `data_raw/locations.json` if present, else hardcoded in `api.py`.

---

## Frontend API Client

**File:** `frontend/src/services/api.ts`

| Function | Endpoint |
|----------|----------|
| `fetchResults(model)` | `GET /results?model={model}` |
| `mapBackendToFrontend(result)` | Maps level/score for UI cards |

No other backend endpoints called from frontend.
