# Deployment Checklist — Infiverse-HR

**Generated:** 2026-07-06

---

## Pre-Deploy

### Code

- [ ] All changes merged to `main`
- [ ] `pytest backend/tests/gateway/test_workforce_governance_runtime.py` passes
- [ ] `cd frontend && npm run lint && npm run build` succeeds
- [ ] No secrets in committed files
- [ ] `SAMPADA_CURRENT_STATE.md` updated if major changes

### Database

- [ ] MongoDB Atlas backup taken
- [ ] Schema verified: `python backend/services/gateway/verify_mongodb_schema.py`
- [ ] Indexes current: `create_mongodb_indexes.py` if schema changed

### Environment

- [ ] All backend secrets set on Render (3 services)
- [ ] Vercel `VITE_*` URLs match live Render services
- [ ] `VITE_API_KEY` = gateway `API_KEY_SECRET`
- [ ] `CORS_ORIGINS` includes all frontend domains
- [ ] Communication integrations configured (if notifications needed)

---

## Backend Deploy (Render × 3)

### Gateway

- [ ] Service deployed from `backend/services/gateway/`
- [ ] Start command runs Uvicorn on `app/main.py`
- [ ] `GET /health` → 200
- [ ] `GET /docs` accessible

### Agent

- [ ] Service deployed from `backend/services/agent/`
- [ ] `GET /health` → 200
- [ ] `HF_TOKEN` set if model download needed

### LangGraph

- [ ] Service deployed from `backend/services/langgraph/`
- [ ] `GET /health` → 200
- [ ] Twilio/Gmail/Telegram vars set

---

## Frontend Deploy (Vercel)

- [ ] Root directory: `frontend`
- [ ] Build: `npm run build`, output: `dist`
- [ ] Env vars set (Production + Preview):

```
VITE_API_BASE_URL
VITE_AGENT_SERVICE_URL
VITE_LANGGRAPH_SERVICE_URL
VITE_ENABLE_CONTROL_CENTER=true
VITE_ENABLE_GOVERNANCE=true
VITE_API_KEY
```

- [ ] Custom domain `sampada.blackholeinfiverse.com` configured
- [ ] Deploy succeeds

> TODO: Verify Render URLs before setting Vercel vars.

---

## Post-Deploy Verification

### Health

```bash
curl https://<gateway>/health
curl https://<agent>/health
curl https://<langgraph>/health
```

### Functional

- [ ] `https://sampada.blackholeinfiverse.com` or Vercel URL loads
- [ ] `/auth` login works (client + candidate)
- [ ] Job list loads in client portal
- [ ] AI matching returns scores
- [ ] `/control` loads (if enabled)
- [ ] No CORS errors in browser console

### Integration

- [ ] Workflow bridge reachable (if Complete-Infiverse deployed)
- [ ] SETU signal POST succeeds (if testing SETU)
- [ ] Notification test (email/WhatsApp) if configured

---

## Docker Deploy (Alternative)

```bash
cd backend
docker compose -f docker-compose.production.yml up --build -d
```

- [ ] All 3 containers healthy
- [ ] `.env` mounted/loaded
- [ ] MongoDB URI reachable from containers

---

## Rollback Readiness

- [ ] Previous Render deploy IDs noted (×3)
- [ ] Previous Vercel deploy ID noted
- [ ] MongoDB backup timestamp recorded
- [ ] Rollback guide reviewed (`18_Rollback_Guide.md`)

---

## Deploy Log Template

| Field | Value |
|-------|-------|
| Date | |
| Deployer | |
| Git commit | |
| Gateway Render deploy ID | |
| Agent Render deploy ID | |
| LangGraph Render deploy ID | |
| Vercel deploy ID | |
| Env vars changed? | Yes / No |
| Schema migration? | Yes / No |
| Smoke test | Pass / Fail |

---

## Live Execution Checklist

For Control Center / governance releases, also run:

`docs/CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md`
