# API Reference — Pradnya / NICAI

**Base URL (local):** `http://127.0.0.1:8000`  
**Base URL (production):** **TODO: Verify** — Render `pradnya-api` URL

All endpoints are **unauthenticated**.

---

## REST endpoints

### GET `/health`

**Response (200):**

```json
{ "status": "ok", "service": "nicai" }
```

---

### GET `/`

HTML landing page with link to `/dashboard`.

---

### GET `/signals`

Processes up to 20 signals from CSV datasets through full pipeline.

**Response (200):**

```json
{
  "status": "SUCCESS",
  "signals": [
    {
      "signal_id": "W_0",
      "trace_id": "...",
      "validation_status": "ALLOW",
      "risk_level": "HIGH",
      "confidence": 50.0,
      "anomaly_type": "temperature",
      "explanation": "...",
      "recommendation_signal": "HIGH",
      "feature_type": "temperature",
      "value": 50,
      "latitude": 19.07,
      "longitude": 72.87
    }
  ],
  "summary": {
    "total": 120,
    "processed": 20,
    "high": 5,
    "medium": 8,
    "low": 7
  },
  "pattern": {
    "pattern_id": "PATTERN_001",
    "anomaly_count": 13,
    "pattern_type": "ENVIRONMENTAL_CLUSTER",
    "pattern_summary": "..."
  }
}
```

**Error:** `{ "status": "ERROR", "reason": "Dataset not loaded", "trace_id": "...", "timestamp": "..." }`

---

### GET `/patterns`

Same processing as `/signals` but returns pattern-focused payload:

```json
{
  "status": "SUCCESS",
  "pattern": { ... },
  "summary": { ... }
}
```

---

### POST `/nicai/evaluate`

Evaluate arbitrary signal list (batch pipeline).

**Request body:** JSON array of signal objects

**Signal shape (minimum):**

```json
{
  "signal_id": "W_2",
  "timestamp": "2026-04-14T04:21:32",
  "latitude": 19.07,
  "longitude": 72.87,
  "value": 48.7,
  "dataset_id": "DS_WEATHER",
  "feature_type": "temperature"
}
```

**Response (200):**

```json
{
  "status": "SUCCESS",
  "results": [
    {
      "signal_id": "...",
      "trace_id": "...",
      "validation": { ... },
      "analysis": { ... }
    }
  ],
  "pattern": { ... }
}
```

---

### POST `/action`

Simulated operator action (logged only — TANTRA compliant).

**Request body:**

```json
{
  "trace_id": "TRACE_W_0",
  "action_type": "eligible_for_escalation",
  "risk_level": "HIGH"
}
```

**Response (200):**

```json
{
  "status": "SUCCESS",
  "action": {
    "trace_id": "...",
    "action_type": "eligible_for_escalation",
    "target_role": "authority",
    "timestamp": "2026-07-07T...",
    "context": {}
  }
}
```

`target_role` mapping: HIGH → `authority`, MEDIUM → `operator`, LOW → `system`.

---

### GET `/dashboard`

Server-rendered HTML table of processed signals with action buttons (inline HTML in `main.py`). Not used by Vercel React app.

---

## Validation output shape

```json
{
  "signal_id": "...",
  "status": "ALLOW | FLAG",
  "confidence_score": 0.9,
  "trace_id": "...",
  "reason": "..."
}
```

**Note:** Current `validator.py` returns ALLOW or FLAG only (no REJECT), but `main.py` `process_signals()` still skips `status == "REJECT"` if present.

---

## Analysis output shape (`sanskar_engine.analyze_signal`)

```json
{
  "trace_id": "...",
  "feature_type": "temperature",
  "confidence": 48.7,
  "risk_level": "HIGH | MEDIUM | LOW",
  "anomaly_flag": false,
  "anomaly_score": 48.7,
  "anomaly_type": "temperature",
  "recommendation_signal": "HIGH",
  "explanation": "High temperature reading detected"
}
```

Risk thresholds (value-based): ≥45 HIGH, ≥35 MEDIUM, else LOW.

---

## Allowed recommendation signals (TANTRA)

- `eligible_for_escalation`
- `requires_review`
- `monitor`

No execution endpoints.

---

## Frontend API client

**File:** `frontend/src/services/api.js`

| Function | Endpoint |
|----------|----------|
| `getHealth()` | GET `/health` |
| `getSignals()` | GET `/signals` |
| `getPatterns()` | GET `/patterns` |
| `getSignalsWithSummary()` | GET `/signals` |
| `triggerAction(data)` | POST `/action` |

Requires `VITE_NICAI_API` — throws if unset.

---

## External APIs (frontend only, not NICAI backend)

| Service | Path | Config |
|---------|------|--------|
| Samachar | POST `{VITE_SAMACHAR_API}/api/samachar/process` | Body: `{ "text": "..." }` |
| Mitra | POST `{VITE_MITRA_API}/api/mitra/evaluate` | Body: `{ "event": samacharOutput }` |

**TODO: Verify** — production URLs for Samachar and Mitra.

---

## Related services

| Service | Integration |
|---------|-------------|
| SVACS | Scripts only — `svacs_adapter.py`, not main FastAPI routes |
| Samachar/Mitra | React UI pipeline tab only |
