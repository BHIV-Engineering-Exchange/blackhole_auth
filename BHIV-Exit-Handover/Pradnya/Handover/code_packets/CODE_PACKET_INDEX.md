# Code Packet Index — Pradnya / NICAI

Critical code paths for reviewers and incoming engineers.

---

## Backend core

| ID | Path | Why it matters |
|----|------|----------------|
| CP-B01 | `main.py` | FastAPI routes, process_signals, logging |
| CP-B02 | `samachar_input_adapter.py` | CSV load, signal conversion |
| CP-B03 | `validator.py` | Validation rules, ALLOW/FLAG |
| CP-B04 | `sanskar_engine.py` | Weather/AQI analysis + patterns |
| CP-B05 | `dataset_registry.py` | datasets.json registry |
| CP-B06 | `error_handler.py` | Standard errors |
| CP-B07 | `schemas.py` | Required signal fields |

---

## Integration / alternate paths

| ID | Path | Why it matters |
|----|------|----------------|
| CP-I01 | `sanskar_simple.py` | SVACS acoustic engine |
| CP-I02 | `svacs_adapter.py` | Perception → NICAI signal |
| CP-I03 | `pipeline.py` | SVACS CLI pipeline |
| CP-I04 | `live_integration.py` | Live perception poll |

---

## Frontend

| ID | Path | Why it matters |
|----|------|----------------|
| CP-F01 | `frontend/src/App.jsx` | Full dashboard, mock/live, Samachar/Mitra |
| CP-F02 | `frontend/src/services/api.js` | NICAI API client |
| CP-F03 | `frontend/src/main.jsx` | Entry point |
| CP-F04 | `frontend/.env.example` | Required env vars |

---

## Deploy / config

| ID | Path | Why it matters |
|----|------|----------------|
| CP-C01 | `render.yaml` | Render backend |
| CP-C02 | `vercel.json` | Vercel frontend build |
| CP-C03 | `datasets.json` | Dataset registry data |
| CP-C04 | `requirements.txt` | Python deps |

---

## Tests

| ID | Path | Why it matters |
|----|------|----------------|
| CP-T01 | `test_validation.py` | Validator scenarios |
| CP-T02 | `test_svacs_flow.py` | SVACS flow |
| CP-T03 | `test_pipeline.py` | Pipeline test |

---

## Suggested review order

1. CP-B02 → CP-B03 → CP-B04 → CP-B01 (data pipeline)
2. CP-F02 → CP-F01 (UI integration)
3. CP-C01 + CP-C02 (deploy)
4. CP-I01–I04 if SVACS scope in scope

**Status:** Index only — zip exports not yet generated.
