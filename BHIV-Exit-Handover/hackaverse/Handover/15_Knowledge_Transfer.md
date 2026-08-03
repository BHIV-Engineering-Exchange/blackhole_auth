# Knowledge Transfer — hackaverse

**Generated:** 2026-07-05

---

## Session Overview

| Session | Duration | Topics |
|---------|----------|--------|
| **KT-1: Product & Architecture** | 2 hours | Overview, roles, stack |
| **KT-2: Backend Deep Dive** | 3 hours | FastAPI, routes, middleware |
| **KT-3: AI Judging Pipeline** | 2 hours | Groq, multi-agent judge |
| **KT-4: Frontend & Roles** | 2 hours | React routes, RBAC, api.js |
| **KT-5: Database & Seeding** | 1.5 hours | MongoDB, seed_data.py |
| **KT-6: Deployment & Ops** | 2 hours | Render, Vercel, secrets |
| **KT-7: Known Issues & Q&A** | 1 hour | Admin/judge gaps, handoff |

---

## KT-1: Product & Architecture

### Key Concepts
- Hackathon lifecycle: register → team → submit → judge → leaderboard
- Three roles: participant (default), admin, judge (seed-only today)
- API versioned at `/api/v1`
- AI judging via Groq LLM

### Reading
- `Handover/04_Architecture.md`
- `SYSTEM_HANDOVER.md` sections 1–2

---

## KT-2: Backend Deep Dive

### Key Files
1. `main.py` — middleware stack order
2. `auth_routes.py` — forced participant registration
3. `database.py` — connection + degraded mode
4. `middleware.py` — SecurityMiddleware
5. `observability/trace_middleware.py` — trace IDs

### Demo
```bash
cd hackathon && uvicorn src.main:app --reload
open http://localhost:8000/docs
```

---

## KT-3: AI Judging

### Key Files
- `judging/multi_agent_judge.py`
- `judging/rubric.py`
- `judging/consensus.py`

### Env
- `GROQ_API_KEY`, `JUDGE_MODE`, `GROQ_MODEL`

---

## KT-4: Frontend & Roles

### Key Files
- `App.jsx` — route map by role
- `contexts/AuthContext.jsx`
- `services/api.js` (not apiClient.js)
- `utils/rbac.js`

### Demo
- Participant flow end-to-end
- Show admin routes blocked for participant
- Run seed_data.py → admin login

---

## KT-5: Database & Seeding

```bash
cd hackathon
python seed_data.py
python scripts/verify_database.py
```

Discuss: production seeding requirement for admin/judge access.

---

## KT-6: Deployment

- Render backend config (`render.yaml`)
- Vercel frontend + `vercel.json`
- Secret management (Render dashboard)
- CORS configuration
- Cold start behavior

Reading: `DEPLOYMENT_NOTES.md`, `Handover/03_Deployment_Guide.md`

---

## KT-7: Q&A

Cover `CURRENT_PROJECT_STATUS.md` findings:
- Why only participant visible in prod
- Judge invitation gaps
- URL conflicts in docs
- Shared MongoDB risk

---

## Handover Contacts

> TODO: Verify names and contacts.

| Role | Name | Contact |
|------|------|---------|
| Outgoing developer | | |
| Successor | | |
| Infrastructure admin | | |
