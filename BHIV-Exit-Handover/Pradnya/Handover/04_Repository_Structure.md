# Repository Structure — Pradnya

```
Pradnya/
├── README.md                    # Extensive NICAI product documentation
├── Handover/                    # Exit documentation (this package)
├── main.py                      # FastAPI app — primary API + HTML dashboard
├── run_demo_full.py             # Demo runner → uvicorn
├── run_demo.py                  # Alternate demo entry
├── requirements.txt
├── render.yaml                  # Render deploy for backend
├── vercel.json                  # Vercel deploy for frontend
│
├── validator.py                 # Signal validation (ALLOW/FLAG)
├── sanskar_engine.py            # Weather/AQI intelligence engine
├── sanskar_simple.py            # SVACS acoustic intelligence engine
├── samachar_input_adapter.py    # CSV → signals
├── dataset_registry.py          # datasets.json loader
├── schemas.py                   # required_fields list
├── error_handler.py             # error_response, validate_basic_input
├── utils.py                     # Schema helpers
│
├── pipeline.py                  # SVACS → validate → sanskar_simple (CLI)
├── svacs_adapter.py             # SVACS perception → NICAI signal
├── live_integration.py          # Fetch from localhost perception_log
├── nicai_integration.py         # SVACS confidence wrapper
├── live_pipeline.py             # Additional pipeline script
├── dashboard.py                 # Standalone dashboard helper
├── telemetry_emitter.py         # Optional telemetry hooks
├── send_to_raj.py               # Integration script
│
├── datasets.json                # Registered datasets (DS_WEATHER, DS_AQI, svacs)
├── data/
│   ├── clean_weather.csv
│   └── clean_aqi.csv
├── logs/                        # Runtime JSON line logs
│   ├── validation_logs.json
│   ├── anomaly_logs.json
│   ├── pattern_logs.json
│   └── action_logs.json
│
├── test_validation.py           # Manual validation tests
├── test_pipeline.py
├── test_svacs_flow.py
├── integration_test.py
│
└── frontend/
    ├── package.json
    ├── .env.example
    ├── vercel.json
    ├── index.html
    └── src/
        ├── main.jsx             # Entry → App.jsx
        ├── App.jsx              # Full NICAI dashboard (primary UI)
        ├── pages/Dashboard.jsx  # Minimal unused/alternate dashboard
        └── services/api.js      # NICAI API client
```

---

## Key entry points

| File | Responsibility |
|------|----------------|
| `main.py` | FastAPI routes, `process_signals()`, logging, CORS |
| `run_demo_full.py` | CLI demo: load CSV → analyze → start uvicorn |
| `frontend/src/App.jsx` | React SPA — overview, signals, patterns, health, Samachar/Mitra pipeline |
| `frontend/src/services/api.js` | `getHealth`, `getSignals`, `getPatterns`, `triggerAction` |
| `samachar_input_adapter.py` | `load_data()`, `convert_to_signals()` |
| `validator.py` | `validate_signal()`, `validate_batch()` |

---

## Data flow (primary path)

1. `load_data()` reads `data/clean_weather.csv` + `data/clean_aqi.csv`
2. `convert_to_signals()` builds signal list with deterministic value overrides
3. `process_signals()` in `main.py`: validate → `analyze_signal()` → pattern → API response
4. Each step appends to `logs/*.json`
5. React app calls `GET /signals` if `VITE_NICAI_API` set; else uses `MOCK_SIGNALS`

---

## SVACS path (separate scripts)

1. `svacs_adapter.prepare_signal(event)` — perception event → NICAI signal + trace_id
2. `pipeline.run_pipeline(event)` — validate (ALLOW only) → `sanskar_simple.generate_intelligence`
3. `live_integration.py` — polls `http://localhost:8000/perception_log` (**different service**)

---

## Git history (summary)

| Commit | Message |
|--------|---------|
| `40b65bc` | first commit |
| `39ea90e` | saved |
| `7a501f4` | saved |
| `9f0070e` | Fix Vercel deploy: root vercel.json |
| `4b8afa4` | Use cd frontend for Vercel build |
| `8f8763a` | Allow CORS from pradnya-bhiv.vercel.app |

---

## Duplicate / legacy files

- Root-level `validation_logs.json`, `pattern_logs.json` — may duplicate `logs/` contents
- `Dashboard.jsx` — minimal; **not** used by `main.jsx` (App.jsx is primary)
- `sanskar_engine.py` vs `sanskar_simple.py` — use correct engine per domain
