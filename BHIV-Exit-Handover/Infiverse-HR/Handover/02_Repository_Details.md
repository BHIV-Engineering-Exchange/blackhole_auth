# Repository Details — Infiverse-HR

**Generated:** 2026-07-06

---

## Git Information

| Item | Value |
|------|-------|
| **Remote (origin)** | https://github.com/blackholeinfiverse64/Infiverse-HR.git |
| **Default branch** | `main` |
| **Recent commits** | `9a70a68` sampada docs |
| | `cac2d4e` sampada docs |
| | `4a142f4` Niyantran, Ai-crm, Artha, Sampada live signal integrate |

---

## Naming

| Context | Name |
|---------|------|
| GitHub repo | `Infiverse-HR` |
| User-facing product | **Sampada** |
| Platform codename | INFIVERSE-HR / INFIVERSE-HR-PLATFORM |
| npm frontend package | `bhiv-hr-frontend` |

---

## Repository Layout

```
Infiverse-HR/
├── frontend/                 # React + Vite + TypeScript SPA
├── backend/                  # FastAPI microservices
│   ├── services/
│   │   ├── gateway/          # Port 8000
│   │   ├── agent/            # Port 9000
│   │   ├── langgraph/        # Port 9001
│   │   └── portal/           # Legacy Streamlit (optional)
│   ├── tests/                # pytest suite
│   ├── tools/                # Ops scripts
│   ├── docs/                 # Backend documentation
│   ├── docker-compose.production.yml
│   ├── run_services.py
│   └── .env.example
├── docs/                     # Architecture, Task19, governance
├── evidence/                 # Runtime proof artifacts
├── tests/                    # Root JSON schema tests
├── Handover/                 # This handover package
├── SAMPADA_CURRENT_STATE.md  # Primary handover doc
├── REVIEW_PACKET.md
├── QUICK_START.md
├── run_project.ps1
└── README.md
```

---

## Key Entry Points

| File | Role |
|------|------|
| `frontend/src/App.tsx` | All frontend routes |
| `frontend/src/services/api.ts` | Axios API client |
| `backend/services/gateway/app/main.py` | Gateway FastAPI app |
| `backend/services/agent/app.py` | AI matching service |
| `backend/services/langgraph/app/main.py` | Workflow service |
| `backend/run_services.py` | Local multi-service launcher |
| `SAMPADA_CURRENT_STATE.md` | Comprehensive handover |

---

## Service Ports (Local)

| Service | Port | Entry |
|---------|------|-------|
| Gateway | 8000 | `backend/services/gateway/app/main.py` |
| Agent | 9000 | `backend/services/agent/app.py` |
| LangGraph | 9001 | `backend/services/langgraph/app/main.py` |
| Frontend | 3000 | `frontend/vite.config.ts` |
| Legacy Streamlit portals | 8501–8503 | Optional |

---

## Dependencies

### Frontend (`frontend/package.json`)

React 18, TypeScript, Vite 7, Tailwind CSS 3, Axios, react-hot-toast, framer-motion, xlsx

### Backend (`backend/requirements.txt`)

FastAPI, Uvicorn, PyMongo, passlib/bcrypt, PyJWT, sentence-transformers, LangGraph, LangChain, Twilio, Redis (optional)

---

## Scripts

| Command | Location | Action |
|---------|----------|--------|
| `npm run dev` | `frontend/` | Dev server :3000 |
| `npm run build` | `frontend/` | Production build → `dist/` |
| `python run_services.py` | `backend/` | Start all backend services |
| `run_project.ps1` | root | Full stack startup (Windows) |
| `pytest backend/tests/` | root | Backend test suite |

---

## Ownership (Documented)

| Role | Person | Scope |
|------|--------|-------|
| System Owner | Rishabh Yadav | Architecture, acceptance |
| Frontend | Nikhil | React implementation |
| Support Builder / Docs | Shashank | Documentation, observability |
| Infra | Vinayak / Raj | Deployment |

---

## External Ecosystem

| System | Relationship |
|--------|--------------|
| **Niyantran** | Execution telemetry; separate product |
| **Artha** | Payroll truth; Sampada has visibility only |
| **CRM** | Relationship intelligence |
| **SETU** | Cross-domain aggregation; Sampada emits signals |
| **Complete-Infiverse / EMS** | Candidate task workflow bridge |

---

## Transfer Checklist (Access)

| System | Action |
|--------|--------|
| GitHub repo | Transfer admin to receiving team |
| MongoDB Atlas | Transfer org; rotate connection string |
| Render (3 services) | Transfer + rotate env vars |
| Vercel | Transfer site + env vars |
| Twilio / Gmail / Telegram | Transfer integration accounts |
| Gemini / HuggingFace | Transfer API keys |
