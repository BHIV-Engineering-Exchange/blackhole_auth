# Testing Guide — Pradnya / NICAI

## Current state

**No formal test runner** (pytest/unittest) in CI. Manual Python scripts exist at repo root.

| Script | Purpose |
|--------|---------|
| `test_validation.py` | validate_signal / validate_batch scenarios |
| `test_pipeline.py` | SVACS pipeline flow |
| `test_svacs_flow.py` | SVACS adapter + validation |
| `integration_test.py` | Broader integration checks |

Run individually:

```bash
python test_validation.py
python test_pipeline.py
python test_svacs_flow.py
python integration_test.py
```

---

## Manual API test plan

### Backend (local uvicorn)

| # | Test | Command / steps | Expected |
|---|------|-----------------|----------|
| B1 | Health | `curl http://127.0.0.1:8000/health` | `status: ok`, `service: nicai` |
| B2 | Signals | `curl http://127.0.0.1:8000/signals` | SUCCESS, non-empty signals, summary |
| B3 | Patterns | `curl http://127.0.0.1:8000/patterns` | SUCCESS, pattern object |
| B4 | Evaluate | POST JSON array to `/nicai/evaluate` | SUCCESS, results + pattern |
| B5 | Action | POST `{"trace_id":"T1","action_type":"monitor","risk_level":"LOW"}` to `/action` | SUCCESS, entry in `logs/action_logs.json` |
| B6 | Dashboard HTML | Browser GET `/dashboard` | HTML table with rows |
| B7 | Missing CSV | Rename data file temporarily | ERROR "Dataset not loaded" |

### Frontend

| # | Test | Steps | Expected |
|---|------|-------|----------|
| F1 | Live load | `VITE_NICAI_API` set, backend up | Overview shows "Live from NICAI API" |
| F2 | Mock fallback | Unset env or stop backend | Demo mock signals; error log in Logs tab |
| F3 | Refresh | Click Refresh with API up | Signals update, log entry |
| F4 | Health tab | Run health check | NICAI online when API configured |
| F5 | Pipeline | Load scenario, Process (Samachar/Mitra URLs set) | JSON output or error boxes |
| F6 | Mobile layout | Resize to ≤768px | Sidebar drawer works |

### Production smoke

| # | Test | Expected |
|---|------|----------|
| P1 | `GET <RENDER>/health` | 200 |
| P2 | Vercel app loads | Dashboard visible |
| P3 | Network → signals | Calls Render URL, 200 |
| P4 | CORS | No browser CORS errors |

---

## Deterministic output test

Run twice:

```bash
curl -s http://127.0.0.1:8000/signals | sha256sum
curl -s http://127.0.0.1:8000/signals | sha256sum
```

Hashes should match (same CSV + deterministic rules).

---

## Trace_id audit test

1. Note `trace_id` from `/signals` response
2. `grep trace_id logs/validation_logs.json logs/anomaly_logs.json`
3. Confirm same id appears in both log files

---

## SVACS script tests

```bash
python test_svacs_flow.py
python pipeline.py  # if main block present
```

Requires sample SVACS event structure in test file.

---

## Suggested automated tests (future)

### pytest + httpx

- `test_health_returns_ok`
- `test_signals_schema`
- `test_validate_signal_allow_weather`
- `test_validate_signal_flag_missing_field`
- `test_action_appends_log`

### Frontend (Vitest)

- `mapApiSignal` mapping
- Mock fetch for live vs fallback

---

## Test data notes

- `test_validation.py` uses `dataset_id: "DS01"` — **not** in `datasets.json` → expect FLAG/inactive behavior
- Production datasets: `DS_WEATHER`, `DS_AQI`, `svacs`

---

## Reset logs between demos

```bash
# Windows PowerShell
Remove-Item logs\*.json -ErrorAction SilentlyContinue
New-Item logs\validation_logs.json, logs\anomaly_logs.json, logs\pattern_logs.json, logs\action_logs.json -ItemType File
```

Or delete contents — files recreated on append.

---

## Performance

**TODO: Verify** — acceptable latency for `/signals` under load. Current implementation re-parses CSV each request.
