# Project Overview — Pradnya / NICAI

## Executive summary

Pradnya hosts **NICAI** (Networked Intelligence & Context Analysis Interface), a deterministic decision-support system. It ingests structured signals from CSV datasets (weather, AQI) or adapted SVACS perception events, validates them, runs rule-based intelligence analysis, detects multi-signal patterns, exposes results via FastAPI, and presents them in a React dashboard. Operator actions are **simulated and logged only** — NICAI does not execute decisions (TANTRA compliant).

---

## Problem statement

Operational teams need explainable, traceable intelligence from environmental and sensor data — without black-box ML or autonomous action execution.

---

## Solution (as implemented)

| Layer | Role |
|-------|------|
| **Samachar Input Adapter** | `samachar_input_adapter.py` — loads CSV, converts rows to signals |
| **Validation Layer** | `validator.py` — ALLOW/FLAG rules, dataset registry checks |
| **Sanskar Intelligence Engine** | `sanskar_engine.py` / `sanskar_simple.py` — risk, anomaly, explanation |
| **Pattern Analysis** | `analyze_patterns()` in sanskar modules |
| **FastAPI Layer** | `main.py` — REST + built-in HTML dashboard |
| **React Dashboard** | `frontend/src/App.jsx` — full NICAI UI with optional Samachar→Mitra pipeline |
| **Action Router** | `POST /action` — logs simulated escalation/review/monitor |
| **Logging** | Append-only JSON lines in `logs/` |

---

## Architecture (locked pipeline)

```
Dataset (CSV) / SVACS event
        ↓
Samachar Input Adapter  (or svacs_adapter)
        ↓
Signal Conversion
        ↓
Validation Layer
        ↓
Sanskar Intelligence Engine
        ↓
Multi-Signal Pattern Analysis
        ↓
FastAPI Layer  ←→  React Dashboard (Vercel)
        ↓
Action Router (Simulation)
        ↓
Logging System (logs/*.json)
```

---

## Feature matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Weather/AQI signal processing | Live | `data/clean_weather.csv`, `data/clean_aqi.csv` |
| Validation (ALLOW/FLAG) | Live | No hard REJECT in validator (see known issues) |
| Sanskar analysis | Live | Rule-based thresholds |
| Pattern detection | Live | Simplified cluster summary |
| REST API | Live | `/health`, `/signals`, `/patterns`, `/nicai/evaluate`, `/action` |
| Built-in HTML dashboard | Live | `/dashboard` in FastAPI |
| React dashboard (Vercel) | Live | Mock fallback + live API when configured |
| Samachar → Mitra pipeline UI | Optional | Requires external API URLs |
| SVACS integration scripts | Partial | `pipeline.py`, `live_integration.py` — not wired to main API |
| Authentication | Not implemented | — |
| Persistent database | Not used | File-based logs only |

---

## Naming drift

- **Pradnya** — GitHub repo and workspace folder
- **NICAI** — Product name in UI, API service id (`service: nicai`), docs
- **nicai-demo-ui** — npm package name for frontend

---

## Deterministic guarantee

Same input → same output. Signal values use controlled modulo distribution in `convert_to_signals()` for demo stability; location fallbacks are deterministic (index-based, not random).

---

## Out of scope

- Autonomous action execution
- ML / black-box models
- Real-time streaming ingestion (batch/CSV + optional HTTP fetch scripts)
- User authentication

---

## Stakeholders

**TODO: Verify** — product owner, demo operators, SVACS/Samachar/Mitra service owners.
