# Repository Details — Namami-Gange

**Generated:** 2026-07-06

---

## Git Information

| Item | Value |
|------|-------|
| **Remote (origin)** | https://github.com/blackholeinfiverse64/Namami-Gange.git |
| **Default branch** | `main` |
| **Recent commits** | `202d268` saved |
| | `ecae44d` Fix Render build when root directory not set |
| | `92d33f8` Add Vercel and Render deployment config |

---

## Naming

| Context | Name |
|---------|------|
| GitHub repo | Namami-Gange |
| Product | Namami Gange Platform |
| Engine | NICAI — Ganga Basin Suitability Intelligence Engine |
| Marine layer | Marine Intelligence Spine v1 |
| npm frontend package | `namami-gange-ui` |
| Render service | `namami-gange-api` |

---

## Repository Layout

```
Namami-Gange/
├── backend/                    # Flask intelligence engine
│   ├── src/                    # api.py, scoring, marine, simulate
│   ├── tests/                  # 13 test modules
│   ├── data_raw/               # 5 CSV datasets
│   ├── demo_cases/             # demo_case_1..3.json
│   ├── docs/API_CONTRACT.md
│   ├── review_packets/
│   ├── proofs/
│   ├── ng_data_inventory.csv
│   └── requirements.txt
├── frontend/                   # Next.js UI
│   ├── src/app/page.tsx
│   ├── src/components/
│   ├── src/services/api.ts
│   ├── design-system/
│   └── vercel.json
├── Handover/                   # This package
├── DEPLOYMENT_GUIDE.md
├── REVIEW_PACKET.md
├── render.yaml
├── requirements.txt            # Points to backend/requirements.txt
└── README.md
```

---

## Key Entry Points

| File | Role |
|------|------|
| `backend/src/api.py` | Flask app, core endpoints |
| `backend/src/scoring_engine.py` | Rule-based scoring |
| `backend/src/simulate_api.py` | Scenario simulation blueprint |
| `backend/src/marine_api.py` | Marine intelligence spine |
| `backend/docs/API_CONTRACT.md` | API contract v2.1 |
| `frontend/src/app/page.tsx` | Main UI shell |
| `frontend/src/services/api.ts` | Backend client |
| `render.yaml` | Render deploy |

---

## Service Ports (Local)

| Service | Port |
|---------|------|
| Backend API | 5000 |
| Frontend (Next.js) | 3000 |

---

## Dependencies

### Backend (`backend/requirements.txt`)

flask ≥3.0, flask-cors ≥4.0, gunicorn ≥22.0

### Frontend (`frontend/package.json`)

next 16.2.6, react 19.2.4, typescript 5

---

## Scripts

| Command | Location | Action |
|---------|----------|--------|
| `python api.py` | `backend/src/` | Dev server :5000 |
| `gunicorn api:app` | `backend/src/` | Production (Render) |
| `npm run dev` | `frontend/` | Next.js dev :3000 |
| `npm run build` | `frontend/` | Production build |
| `npm run lint` | `frontend/` | ESLint |

---

## Program Context

Part of Government of India **Namami Gange** river restoration + inland waterways (NW-1) + Sagarmala maritime convergence. Target users: basin administrators, logistics managers, ministry leadership.

---

## Transfer Checklist (Access)

| System | Action |
|--------|--------|
| GitHub repo | Transfer admin |
| Render (`namami-gange-api`) | Transfer + rotate env |
| Vercel (frontend) | Transfer + set `NEXT_PUBLIC_API_URL` |
| External infra (Postgres/Redis) | TODO: Verify ownership — not in repo |
