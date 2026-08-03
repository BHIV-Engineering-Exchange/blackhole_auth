# Code Packet Index — SVACS-Main

---

## Production API (Flask)

| ID | Path | Why |
|----|------|-----|
| CP-FL01 | `dashboard/app.py` | Render deploy target, all `/api/*` |
| CP-FL02 | `dashboard/templates/dashboard.html` | Legacy UI |

---

## Alternate API (FastAPI)

| ID | Path | Why |
|----|------|-----|
| CP-API01 | `main.py` | Runtime/replay/ttg/rl routes |
| CP-API02 | `runtime/full_operational_chain.py` | AIS chain for FastAPI |
| CP-API03 | `runtime/runtime_normalizer.py` | API response shape |

---

## Orchestration core

| ID | Path | Why |
|----|------|-----|
| CP-O01 | `orchestration/live_pipeline.py` | Main pipeline |
| CP-O02 | `full_operational_chain.py` | Bucket-integrated chain |
| CP-O03 | `perception/perception_engine.py` | Perception stage |
| CP-O04 | `intelligence/intelligence_engine.py` | Intelligence stage |
| CP-O05 | `state/state_engine.py` | State stage |
| CP-O06 | `replay/replay_engine.py` | Replay |

---

## Intelligence / fusion

| ID | Path | Why |
|----|------|-----|
| CP-I01 | `vessel_intelligence_engine.py` | Vessel classification |
| CP-I02 | `sensor_fusion/sensor_fusion_engine.py` | Fusion |
| CP-I03 | `external_grounding/janes_ingestion_pipeline.py` | Jane's |

---

## Frontend

| ID | Path | Why |
|----|------|-----|
| CP-FE01 | `src/App.tsx` | Routes |
| CP-FE02 | `src/api/adapter.ts` | Mock/Real adapter (**critical**) |
| CP-FE03 | `src/env.ts` | Env logic |
| CP-FE04 | `src/pages/Overview.tsx` | Primary dashboard |
| CP-FE05 | `src/lib/mockData.ts` | Mock generators |

---

## Deploy / config

| ID | Path | Why |
|----|------|-----|
| CP-C01 | `render.yaml` | Render |
| CP-C02 | `vercel.json` | Vercel |
| CP-C03 | `package.json` | Frontend build |
| CP-C04 | `requirements.txt` | Python deps |

---

## Tests

| ID | Path | Why |
|----|------|-----|
| CP-T01 | `tests/test_pipeline.py` | Pipeline flows |
| CP-T02 | `tests/federated_replay_validation.py` | Federated replay |

---

## Review order

1. CP-O01 → storage outputs → CP-FL01
2. CP-FE02 → CP-FE04 (UI data source truth)
3. CP-API01 vs CP-FL01 (dual backend decision)
4. CP-C01 + CP-C02 (deploy)

**Status:** Index only.
