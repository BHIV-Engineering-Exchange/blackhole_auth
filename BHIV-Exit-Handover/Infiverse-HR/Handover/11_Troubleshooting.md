# Troubleshooting — Infiverse-HR

**Generated:** 2026-07-06  
**Also see:** `backend/docs/guides/TROUBLESHOOTING_GUIDE.md`, `QUICK_START.md` §6

---

## Startup

### Backend services won't start

**Checks:**
1. Python 3.10+ installed (3.12.7 recommended)
2. `pip install -r backend/requirements.txt`
3. `.env` exists with valid `MONGODB_URI`
4. Ports 8000, 9000, 9001 not in use

```bash
cd backend
python run_services.py
```

Windows: `.\setup_venv.bat` then `.\run_with_venv.bat`

---

### Frontend won't start

```bash
cd frontend
npm install
npm run dev    # expects backend on :8000
```

Port 3000 configured in `vite.config.ts`.

---

## Authentication

### JWT auth failing (401)

**Cause:** Token signed with wrong secret  
**Fix:**
1. Check `JWT_SECRET_KEY` and `CANDIDATE_JWT_SECRET_KEY` in backend `.env`
2. Clear browser sessionStorage
3. Re-login via `/auth`
4. Regenerate tokens if using curl/scripts from `evidence/entry-points/`

---

### API key rejected

**Cause:** `VITE_API_KEY` ≠ gateway `API_KEY_SECRET`  
**Fix:** Align values in Vercel and Render env vars

---

### Recruiter can't login

Recruiters use `POST /v1/candidate/login` — role comes from JWT payload, not separate endpoint.

---

## Database

### MongoDB connection refused

**Checks:**
1. `MONGODB_URI` correct in `.env`
2. Atlas network access allows your IP / Render IPs
3. Database user has read/write permissions
4. `MONGODB_DB_NAME` matches existing database

```bash
python backend/services/gateway/verify_mongodb_schema.py
```

---

## CORS

### Browser CORS errors

**Symptom:** `Access-Control-Allow-Origin` error in console  
**Fix:**
1. Add frontend origin to gateway `CORS_ORIGINS`
2. Include `http://localhost:3000` for local dev
3. Redeploy gateway after env change

---

## AI Matching

### Matching returns empty or times out

**Checks:**
1. Agent service running (`curl http://localhost:9000/health`)
2. `AGENT_SERVICE_URL` correct in gateway `.env`
3. Render free tier cold start — retry after 30–60s
4. `ENABLE_SEMANTIC=true`
5. `HF_TOKEN` set if model download fails

---

## Workflows / Notifications

### Notifications not sent

**Checks:**
1. LangGraph service running (`:9001/health`)
2. Twilio/Gmail/Telegram credentials in `.env`
3. Check `notifications` collection in MongoDB
4. LangGraph logs for dispatch errors

---

## Workflow Bridge

### Candidate tasks not loading

**Checks:**
1. Complete-Infiverse / EMS running on expected port
2. `WORKFLOW_API_BASE_URL=http://127.0.0.1:5000/api` (local)
3. Docker: use `WORKFLOW_API_BASE_URL_DOCKER`
4. `WORKFLOW_BRIDGE_EMAIL/PASSWORD` valid

---

## Control Center

### /control route not visible

**Fix:** Set `VITE_ENABLE_CONTROL_CENTER=true` in frontend `.env` / Vercel

### Governance tab missing

**Fix:** Set `VITE_ENABLE_GOVERNANCE=true`

### Control Center data empty

**Checks:**
1. User role is `client`, `recruiter`, or `admin`
2. Gateway `/v1/control-center/dashboard-aggregates` returns data
3. JWT valid for control center endpoints

---

## Deployment

### Vercel build fails

```bash
cd frontend
npm run build
```

Fix TypeScript errors (`npm run lint` runs `tsc --noEmit`).

### Render service unhealthy

1. Check Render logs
2. Verify start command points to correct `main.py` / `app.py`
3. Confirm `PORT` env var (Render sets dynamically)
4. Health check path: `/health`

### Wrong backend URL in production

Symptom: All API calls fail from Vercel frontend  
Fix: Update Vercel env vars to match live Render URLs — see `10_Known_Issues.md` URL conflict.

---

## Docker

### Docker engine not running

**Symptom:** `docker compose` fails  
**Fix:** Start Docker Desktop; wait for engine ready

### Container can't reach workflow API

Use `host.docker.internal` not `127.0.0.1` inside containers.

---

## Diagnostic Commands

```bash
# Health checks
curl http://localhost:8000/health
curl http://localhost:9000/health
curl http://localhost:9001/health

# Gateway docs
open http://localhost:8000/docs

# Run workforce tests
pytest backend/tests/gateway/test_workforce_governance_runtime.py -q

# Comprehensive endpoint smoke
python backend/tests/comprehensive_endpoint_tests.py
```

---

## Escalation Checklist

Collect before escalating:

1. Service health curl outputs
2. Browser console + Network tab (redacted tokens)
3. Render/Vercel deploy logs
4. MongoDB Atlas connection status
5. `.env` variable **names** configured (not values)
6. Git commit SHA deployed
