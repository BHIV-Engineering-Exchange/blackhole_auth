# Repository Structure — SVACS-Main

Monorepo: Python runtime at root + React dashboard in `src/`.

```
SVACS-Main/
├── README.md, REVIEW_PACKET.md, TESTING_PACKET.md
├── Handover/
├── package.json, vite.config.ts, tailwind.config.js, vercel.json
├── requirements.txt, render.yaml
├── main.py                          # FastAPI runtime API (not Render default)
├── full_operational_chain.py        # Root chain + bucket upload
├── vessel_intelligence_engine.py
│
├── dashboard/
│   ├── app.py                       # Flask API — Render deploy target
│   └── templates/dashboard.html     # Legacy HTML dashboard
│
├── src/                             # React command dashboard
│   ├── App.tsx                      # React Router routes
│   ├── env.ts                       # VITE_* config
│   ├── api/adapter.ts, client.ts  # Mock/Real adapter
│   ├── pages/                       # Overview, Signals, Perception, etc.
│   ├── components/                  # KPI, charts, cards, shell
│   ├── store/                       # Zustand stores
│   └── lib/mockData.ts              # Mock generators
│
├── runtime/
│   ├── full_operational_chain.py    # AIS ingest chain (FastAPI path)
│   ├── runtime_normalizer.py
│   └── *.json                       # Runtime proof artifacts
│
├── orchestration/live_pipeline.py   # Primary orchestration engine
├── perception/, intelligence/, state/, replay/
├── sensor_fusion/, external_grounding/, governance/
├── storage/                         # JSON/JSONL runtime artifacts
│   ├── dashboard/dashboard_payloads.json
│   ├── telemetry/, denials/, logs/, proofs/
│   └── ...
├── tests/                           # Pipeline and replay tests
├── validation_reports/              # Validation JSON reports
├── dashboard_screenshots/           # README screenshot assets
└── docs/, maritime_knowledge/, ttg/, rl/, stress/, ...
```

---

## Key entry points

| File | Role |
|------|------|
| `dashboard/app.py` | **Production API** on Render |
| `main.py` | FastAPI: `/api/runtime`, `/api/dashboard`, `/api/replay`, `/api/ttg`, `/api/rl` |
| `orchestration/live_pipeline.py` | End-to-end pipeline with Rajya/Sarathi tokens |
| `full_operational_chain.py` | Demo chain with external bucket |
| `src/App.tsx` | Dashboard routes |
| `src/api/adapter.ts` | Data layer (mock default) |

---

## Data flow (Flask dashboard path)

1. Pipeline scripts write to `storage/dashboard/dashboard_payloads.json`, `storage/telemetry/`, etc.
2. Flask `dashboard/app.py` reads JSON lines on request
3. React UI **should** consume APIs — currently uses `MockAdapter` unless real adapter implemented

---

## Data flow (FastAPI path)

1. `runtime/full_operational_chain.py` → AIS ingest → normalized events
2. `main.py` `/api/runtime` calls `process_runtime_chain()` + `normalize_runtime()`
3. Not wired to React adapter by default

---

## Git history (summary)

| Commit | Message |
|--------|---------|
| `f3c4d0b` | Add Render and Vercel deployment config |
| `5aefb9a` | Fix TypeScript errors blocking Vercel build |
| `cc0b006` | Collapsible sidebar, mobile layout |
| `be9ad1a` | Align dashboard charts in grid |

---

## Documentation assets in repo

- `frontend_integration_report.md`
- `operational_dashboard_layout.md`
- `dashboard_capability_report.md`
- `component_library.md`
- `TEAM_CONVERGENCE_REPORT.md`
- `demo_walkthrough.md`

Use alongside this Handover package.
