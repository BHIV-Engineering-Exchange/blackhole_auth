# Sampada (Infiverse-HR) — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-06  
**Repository:** Infiverse-HR  
**Product Names:** Sampada, INFIVERSE-HR, BHIV HR Platform

---

## Product Overview

**Infiverse-HR** (user-facing name: **Sampada**) is an enterprise AI-enabled **Workforce Intelligence + HR Operations Platform**. It manages the full hiring lifecycle, multi-tenant client isolation, AI semantic candidate–job matching, workflow automation (Email/WhatsApp/Telegram), workforce governance, and SETU ecosystem signal participation.

---

## Purpose

Provide a platform that:

- Runs **Candidate**, **Recruiter**, and **Client** portals from a single React frontend
- Exposes **111+ API endpoints** across three FastAPI microservices
- Stores data in **MongoDB Atlas** (17+ collections)
- Matches candidates to jobs via **sentence-transformers** (Agent service)
- Automates lifecycle notifications via **LangGraph** workflows
- Integrates with **Complete-Infiverse / EMS** for candidate task bridging
- Participates in **SETU** cross-domain signal aggregation (`/v1/setu/signals/*`)
- Provides **Control Center** governance UI for workforce observability

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite 7, Tailwind CSS 3, React Router 6, Axios |
| **Backend** | Python 3.11+ (3.12.7 recommended), FastAPI, Uvicorn, Pydantic v2 |
| **Database** | MongoDB Atlas |
| **AI Matching** | sentence-transformers, torch, scikit-learn (Agent :9000) |
| **Workflows** | LangGraph, LangChain, Gemini (LangGraph :9001) |
| **Auth** | Triple layer: API key, Client JWT, Candidate JWT; optional 2FA |
| **Deployment** | Vercel (frontend), Render (backend), Docker Compose (optional) |
| **Testing** | pytest (backend), JSON schema tests (root `tests/`) |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | Infiverse-HR |
| **Remote URL** | https://github.com/blackholeinfiverse64/Infiverse-HR.git |
| **Main Branch** | `main` |
| **Frontend path** | `frontend/` |
| **Backend path** | `backend/` |

---

## Production URLs

| Service | URL | Source |
|---------|-----|--------|
| Frontend (custom) | https://sampada.blackholeinfiverse.com | `backend/.env.example` CORS |
| Frontend (Vercel) | https://infiverse-hr.vercel.app | `backend/.env.example` CORS |
| Gateway (Render) | https://bhiv-hr-gateway-l0xp.onrender.com | `frontend/VERCEL_DEPLOYMENT.md` |
| Agent (Render) | https://bhiv-hr-agent-cato.onrender.com | `frontend/VERCEL_DEPLOYMENT.md` |
| LangGraph (Render) | https://bhiv-hr-langgraph-luy9.onrender.com | `frontend/VERCEL_DEPLOYMENT.md` |

> **TODO: Verify** — `backend/docs/guides/DEPLOYMENT_GUIDE.md` lists alternate Render URLs (`ltg0`, `nhgg`, `langgraph.onrender.com`). Confirm which set is live.

---

## Build & Run

### Backend (all services)

```bash
cd backend
copy .env.example .env    # Windows; fill MongoDB URI + secrets
pip install -r requirements.txt
python run_services.py    # Gateway :8000, Agent :9000, LangGraph :9001
```

Windows shortcut: `.\setup_venv.bat` then `.\run_with_venv.bat`

### Frontend

```bash
cd frontend
copy .env.example .env
npm install
npm run dev    # http://localhost:3000
```

Full stack: `run_project.ps1` from repo root.

---

## Application Portals & Routes

| Portal | Base path | Roles |
|--------|-----------|-------|
| Auth | `/auth` | Public |
| Candidate | `/candidate/*` | `candidate` |
| Recruiter | `/recruiter/*` | `recruiter` |
| Client | `/client/*` | `client` |
| Control Center | `/control` | `client`, `recruiter`, `admin` |

Source: `frontend/src/App.tsx`

---

## Handover Document Index

| # | Document | Purpose |
|---|----------|---------|
| 01 | README (this file) | Overview |
| 02 | Repository_Details | Git, structure, contacts |
| 03 | Deployment_Guide | Vercel + Render + Docker |
| 04 | Architecture | Microservices, data flow |
| 05 | Environment_Guide | Env vars |
| 06 | API_Documentation | Endpoint summary |
| 07 | Database_Details | MongoDB collections |
| 08 | Folder_Structure | Directory map |
| 09 | Pending_Work | Incomplete items |
| 10 | Known_Issues | Bugs and gaps |
| 11 | Troubleshooting | Common fixes |
| 12 | REVIEW_PACKET | Quick review guide |
| 13 | Runtime_Evidence | What to capture |
| 14 | Testing_Checklist | QA steps |
| 15 | Knowledge_Transfer | Onboarding notes |
| 16 | Ownership_Transfer | Access checklist |
| 17 | Deployment_Checklist | Release steps |
| 18 | Rollback_Guide | Rollback procedures |

---

## Critical Handover Notes

1. **Conflicting Render URLs** in docs — verify active deployment before updating Vercel env vars.
2. **Triple auth** — API key + Client JWT + Candidate JWT; secrets must match across services.
3. **Internal HR user auth not fully implemented** — API keys used as workaround.
4. **Existing handover docs** — `SAMPADA_CURRENT_STATE.md` and `REVIEW_PACKET.md` are authoritative supplements.
5. **SETU external participation** — local evidence captured; external owner integration TODO.

---

## Related In-Repo Documentation

| File | Topic |
|------|-------|
| `SAMPADA_CURRENT_STATE.md` | 12-section developer handover |
| `QUICK_START.md` | Local setup |
| `REVIEW_PACKET.md` | Acceptance proofs |
| `frontend/AUTHENTICATION_STRUCTURE.md` | Auth flows |
| `backend/docs/api/API_DOCUMENTATION.md` | Full API reference |
| `backend/docs/database/MONGODB_COLLECTIONS.md` | Data model |
| `frontend/VERCEL_DEPLOYMENT.md` | Frontend deploy |
| `backend/docs/guides/DEPLOYMENT_GUIDE.md` | Backend deploy |
