# Deployment Guide — Infiverse-HR

**Generated:** 2026-07-06

---

## Architecture Summary

```
┌─────────────────────┐     HTTPS/JWT/API-Key     ┌──────────────────────────────┐
│  React Frontend     │ ◄──────────────────────► │  FastAPI Gateway (:8000)     │
│  Vercel / custom    │                          │  Render                      │
└─────────────────────┘                          └──────────┬───────────────────┘
                                                            │
                              ┌─────────────────────────────┼─────────────────────┐
                              ▼                             ▼                     ▼
                     Agent (:9000)                  LangGraph (:9001)      MongoDB Atlas
                     Render                         Render
                     (AI matching)                  (workflows, notifications)
```

---

## Frontend — Vercel

**Config:** `frontend/vercel.json`  
**Guide:** `frontend/VERCEL_DEPLOYMENT.md`

| Setting | Value |
|---------|-------|
| Root directory | `frontend` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Framework | Vite |

### Required Vercel env vars

```
VITE_API_BASE_URL=https://bhiv-hr-gateway-l0xp.onrender.com
VITE_AGENT_SERVICE_URL=https://bhiv-hr-agent-cato.onrender.com
VITE_LANGGRAPH_SERVICE_URL=https://bhiv-hr-langgraph-luy9.onrender.com
VITE_ENABLE_CONTROL_CENTER=true
VITE_ENABLE_GOVERNANCE=true
VITE_API_KEY=<matches gateway API_KEY_SECRET>
```

> Use **`VITE_LANGGRAPH_SERVICE_URL`** — not `VITE_LANGGRAPH_URL`.

> TODO: Verify Render URLs match live deployment (alternate URLs in DEPLOYMENT_GUIDE.md).

### Custom domain

`https://sampada.blackholeinfiverse.com` — listed in gateway `CORS_ORIGINS`.

---

## Backend — Render

**Guide:** `backend/docs/guides/DEPLOYMENT_GUIDE.md`  
**No `render.yaml`** in repo — manual Render service setup.

Deploy **three separate Render web services**:

| Service | Start command (typical) | Port |
|---------|------------------------|------|
| Gateway | Uvicorn on `gateway/app/main.py` | 8000 |
| Agent | Uvicorn on `agent/app.py` | 9000 |
| LangGraph | Uvicorn on `langgraph/app/main.py` | 9001 |

### Gateway env vars (minimum)

- `MONGODB_URI`, `MONGODB_DB_NAME`
- `API_KEY_SECRET`, `JWT_SECRET_KEY`, `CANDIDATE_JWT_SECRET_KEY`, `GATEWAY_SECRET_KEY`
- `CORS_ORIGINS` (include Vercel + custom domain)
- `AGENT_SERVICE_URL`, `LANGGRAPH_SERVICE_URL`
- Communication keys (Twilio, Gmail, Telegram) if notifications enabled
- `GEMINI_API_KEY` if LangGraph AI features used

### Health checks

```bash
curl https://<gateway>/health
curl https://<agent>/health
curl https://<langgraph>/health
```

---

## Docker (Alternative)

**File:** `backend/docker-compose.production.yml`

Runs gateway, agent, langgraph containers. Loads `backend/.env`.

```bash
cd backend
docker compose -f docker-compose.production.yml up --build
```

**Note:** MongoDB Atlas is external — not containerized.  
**Workflow bridge in Docker:** use `WORKFLOW_API_BASE_URL_DOCKER=http://host.docker.internal:5000/api`

---

## MongoDB Atlas

1. Create cluster (or use existing)
2. Set `MONGODB_URI` in backend `.env` / Render
3. Run index/schema scripts if needed:
   - `backend/services/gateway/create_mongodb_indexes.py`
   - `backend/services/gateway/migrate_mongodb_schema.py`
   - `backend/services/gateway/verify_mongodb_schema.py`
4. Whitelist Render IP ranges / allow from anywhere (with strong auth)

---

## CORS Configuration

Gateway `CORS_ORIGINS` must include all frontend origins:

```
http://localhost:3000
https://infiverse-hr.vercel.app
https://sampada.blackholeinfiverse.com
```

Mismatch causes browser CORS errors on API calls.

---

## Post-Deploy Verification

1. All three `/health` endpoints return 200
2. Frontend loads at Vercel URL
3. Login works (client + candidate/recruiter)
4. Job list loads for client portal
5. AI matching returns scores (agent service reachable)
6. Control Center loads when `VITE_ENABLE_CONTROL_CENTER=true`
7. OpenAPI docs: `https://<gateway>/docs`

---

## Legacy Streamlit Portals

Optional legacy portals on ports 8501–8503. Separate Render URLs documented in DEPLOYMENT_GUIDE — TODO: Verify if still deployed.

| Portal | Documented URL |
|--------|----------------|
| HR Portal | https://bhiv-hr-portal-u670.onrender.com |
| Client Portal | https://bhiv-hr-client-portal-3iod.onrender.com |

Main product uses React frontend, not Streamlit.
