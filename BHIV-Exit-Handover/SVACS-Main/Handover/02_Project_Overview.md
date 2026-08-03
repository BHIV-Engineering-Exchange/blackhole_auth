# Project Overview — SVACS-Main / SVACS Unified Core

## Executive summary

SVACS Unified Core is a **deterministic, replay-safe maritime intelligence execution substrate**. It validates runtime continuity across a multi-stage pipeline from maritime telemetry through perception, intelligence, state persistence, bucket lineage, replay reconstruction, and operational dashboard visibility. The repository combines extensive Python runtime modules, proof/validation artifacts, and a React TypeScript command dashboard.

---

## System objectives

SVACS validates:

- Deterministic runtime orchestration
- Replay-safe maritime execution
- AIS and Jane's knowledge participation
- Vessel intelligence and sensor fusion reasoning
- Provenance continuity and governance-aware lineage
- Dashboard cognition and operator auditability

---

## Architecture

```
SIGNAL → NOISE → AIS → GEO → JANE'S ENRICHMENT → PERCEPTION → INTELLIGENCE → STATE → BUCKET → REPLAY → OBSERVABILITY → DASHBOARD
```

---

## Major subsystems

| Subsystem | Location | Role |
|-----------|----------|------|
| Orchestration | `orchestration/live_pipeline.py` | Full approved/reject/token pipeline |
| Perception | `perception/perception_engine.py` | Vessel interpretation |
| Intelligence | `intelligence/intelligence_engine.py` | Threat/risk reasoning |
| State | `state/state_engine.py` | Deterministic persistence |
| Sensor fusion | `sensor_fusion/` | Multi-sensor classification |
| Vessel intelligence | `vessel_intelligence_engine.py` | Explainable classification |
| Jane's grounding | `external_grounding/` | Maritime knowledge ingestion |
| Replay | `replay/replay_engine.py` | Deterministic reconstruction |
| Flask dashboard API | `dashboard/app.py` | Serves storage JSON to UI |
| FastAPI runtime | `main.py` | Alternate `/api/runtime` surface |
| React dashboard | `src/` | Operational cognition UI |
| Storage | `storage/` | Append-only logs, proofs, telemetry |

---

## Feature matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Live pipeline orchestration | Implemented | `orchestration/live_pipeline.py` |
| Flask REST API | Deployed (Render) | Reads `storage/` JSON lines |
| FastAPI REST API | Local only | Not in `render.yaml` |
| React dashboard | Implemented | Mock adapter default |
| Real API integration (UI) | **Incomplete** | `RealAdapter` stub |
| Jane's ingestion | Script | `external_grounding/janes_ingestion_pipeline.py` |
| Sensor fusion | Script + artifacts | `sensor_fusion/` |
| NICAI convergence | Validated artifacts | `runtime/intelligence_chain_trace.json` |
| Bucket persistence | External | `bhiv-bucket.onrender.com` |
| Authentication | Not implemented | — |
| SQL database | Not used | File-based only |

---

## Team convergence (from README)

| Contributor | Responsibility |
|-------------|----------------|
| Ankita | Runtime convergence, vessel intelligence, governance |
| Nupur | Jane's, AIS, provenance |
| Raj | State runtime, deterministic closure |
| Nikhil | Dashboard cognition architecture |
| Bucket Team | Replay persistence, lineage |

---

## Validation status (documented in README)

README claims: `SYSTEM STATUS: OPERATIONAL` with verified AIS, Jane's, sensor fusion, replay, lineage, dashboard. Treat as **demo/validation artifact claims** — verify in target environment.

---

## Out of scope

- Production-grade live AIS feed ingestion (demo/simulated data)
- Fully wired frontend-to-backend microservices (adapter stub)
- User authentication / RBAC
