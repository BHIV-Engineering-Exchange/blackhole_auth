# HackaVerse — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-05  
**Repository:** hackaverse  
**Product Name:** HackaVerse — AI Hackathon Management Platform

---

## Product Overview

**HackaVerse** is a full-stack hackathon management platform supporting participant registration, team formation, project submissions, AI-powered judging (Groq LLM), leaderboards, admin controls, and judge review workflows.

---

## Purpose

Provide a production-ready platform that:

- Manages hackathons, teams, invitations, and submissions
- Authenticates users with bcrypt + PyJWT (roles: admin, participant, judge)
- Scores submissions via AI multi-agent judging or demo/rubric modes
- Exposes a versioned REST API under `/api/v1`
- Deploys backend to Render and frontend to Vercel

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite 7, Tailwind CSS, React Router 7, Axios, Vitest |
| **Backend** | Python 3.11+, FastAPI 0.118, Uvicorn |
| **Database** | MongoDB Atlas (PyMongo) — `hackaverse_db` |
| **AI Judging** | Groq LLM (langchain, multi-agent judge) |
| **Auth** | bcrypt, PyJWT, X-API-Key, CSRF middleware |
| **Deployment** | Render (backend), Vercel (frontend) |
| **Testing** | pytest (backend), Vitest (frontend) |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | hackaverse |
| **Remote URL** | https://github.com/blackholeinfiverse64/hackaverse.git |
| **Main Branch** | `main` |
| **Backend path** | `hackathon/` |
| **Frontend path** | `hackaverse-frontend/` |

---

## Production URLs

| Service | URL | Source |
|---------|-----|--------|
| Frontend | https://hackaverse-mu.vercel.app | `review_packets/REVIEW_PACKET.md` |
| Backend API | https://hackaverse.blackholeinfiverse.com/api/v1 | `review_packets/REVIEW_PACKET.md` |
| API Docs | `/docs` on backend host | `main.py` |
| Alt backend (docs) | https://ai-agent-x2iw.onrender.com | `DEPLOYMENT_NOTES.md` — TODO: Verify which is canonical |

---

## Build & Run

### Backend
```bash
cd hackathon
pip install -r requirements.txt
cp .env.example .env   # set MONGODB_URI, JWT_SECRET, API_KEY, GROQ_API_KEY
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```bash
cd hackaverse-frontend
npm install
cp .env.example .env
npm run dev   # http://localhost:3000, proxies /api → :8000
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |
| Health | http://localhost:8000/system/ready |

---

## Roles

| Role | Frontend prefix | Notes |
|------|-----------------|-------|
| `participant` | `/app/*` | Default on self-registration |
| `admin` | `/admin/*` | Requires seeded admin user |
| `judge` | `/judge/*` | Requires seed or invitation flow |

**Critical:** Self-registration always creates `participant`. Admin/judge require `seed_data.py` or broken invitation paths — see `10_Known_Issues.md`.

---

## Existing Documentation (Repo Root)

| File | Purpose |
|------|---------|
| `SYSTEM_HANDOVER.md` | Full technical handover |
| `ENV_REFERENCE.md` | All environment variables |
| `API_CONTRACT.md` | API contract spec |
| `DEPLOYMENT_NOTES.md` | Render + Vercel deploy |
| `CURRENT_PROJECT_STATUS.md` | Admin/judge visibility audit |
| `review_packets/REVIEW_PACKET.md` | Quick review guide v4 |

Duplicate copies also exist under `Hackaverse/` subfolder.

---

## Handover Document Index

| # | File | Purpose |
|---|------|---------|
| 01 | `01_README.md` | This file |
| 02 | `02_Repository_Details.md` | Repo metadata |
| 03 | `03_Deployment_Guide.md` | Production deployment |
| 04 | `04_Architecture.md` | System design |
| 05 | `05_Environment_Guide.md` | Environment variables |
| 06 | `06_API_Documentation.md` | API reference |
| 07 | `07_Database_Details.md` | MongoDB schema |
| 08 | `08_Folder_Structure.md` | Directory layout |
| 09 | `09_Pending_Work.md` | Outstanding tasks |
| 10 | `10_Known_Issues.md` | Documented issues |
| 11 | `11_Troubleshooting.md` | Common problems |
| 12 | `12_REVIEW_PACKET.md` | Quick review guide |
| 13 | `13_Runtime_Evidence.md` | Runtime proof placeholders |
| 14 | `14_Testing_Checklist.md` | QA checklist |
| 15 | `15_Knowledge_Transfer.md` | KT session guide |
| 16 | `16_Ownership_Transfer.md` | Ownership checklist |
| 17 | `17_Deployment_Checklist.md` | Deploy checklist |
| 18 | `18_Rollback_Guide.md` | Rollback procedures |

---

## Critical Warnings

1. **Admin/judge not visible in production** without running `seed_data.py` against prod MongoDB
2. **Conflicting backend URLs** in docs (`hackaverse.blackholeinfiverse.com` vs `ai-agent-x2iw.onrender.com`) — TODO: Verify
3. **No CI/CD** — deploy is git-push triggered only
4. **Dev and prod may share MongoDB** — per `DEPLOYMENT_NOTES.md`
5. **Secrets must be Render/Vercel dashboard secrets** — not in `render.yaml` (hardened)

See `Handover/10_Known_Issues.md` for full list.
