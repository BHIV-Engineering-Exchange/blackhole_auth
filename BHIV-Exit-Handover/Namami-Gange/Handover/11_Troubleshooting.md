# Troubleshooting — Namami-Gange

**Generated:** 2026-07-06

---

## Backend

### Flask won't start

```bash
cd backend
pip install -r requirements.txt
cd src
python api.py
```

**Checks:**
1. Python 3.10+ installed
2. Port 5000 available (or set `PORT`)
3. Dependencies installed

---

### Import errors in backend

Run from `backend/src/` directory — `api.py` uses relative imports with `sys.path.insert`.

---

### Render build fails: requirements.txt not found

**Cause:** Wrong Root Directory on Render.

**Fix:** Set Root Directory to `backend` OR use start command from repo root per `DEPLOYMENT_GUIDE.md` Setup B.

---

## Frontend

### Next.js won't start

```bash
cd frontend
npm install
npm run dev
```

Requires Node.js 18+.

---

### Suitability scores not loading

**Checks:**
1. Backend running on :5000
2. `frontend/.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:5000`
3. Browser Network tab: `GET /results?model=inland_port` → 200
4. No CORS errors

---

### CORS errors

**Symptom:** Browser blocks fetch to backend

**Fix:**
1. Set backend `FRONTEND_URL` to include `http://localhost:3000` (local) or Vercel URL (prod)
2. Restart backend after env change
3. Redeploy Render service

---

## API

### GET /results returns empty

**Checks:**
1. `?model=inland_port` (valid model name)
2. Backend logs for scoring errors
3. Entities loaded — `GET /health` shows `entities_loaded: 6`

---

### POST /simulate fails

**Checks:**
1. Valid JSON body per `API_CONTRACT.md`
2. Approved `dataset_id` used
3. Demo mode may block raw `base_data` injection

See `backend/sample_api_requests.json` for examples.

---

### REJECTED locations unexpected

Hard constraints always reject:

- `in_wetland: true` (e.g. `farakka_wetland`)
- `in_flood_zone: true`
- `env_clearance: false`
- Extreme pollution / critical depth thresholds

This is by design — see constraint engine tests.

---

## Deployment

### Render health check fails

**Path:** `/health`

**Checks:**
1. Start command: `cd src && gunicorn api:app --bind 0.0.0.0:$PORT`
2. Render logs for Python errors
3. gunicorn installed via requirements.txt

---

### Vercel build fails

```bash
cd frontend && npm run build
```

Fix TypeScript/ESLint errors locally first.

---

### Production scores missing

1. Vercel `NEXT_PUBLIC_API_URL` points to correct Render URL
2. Render service not sleeping (free tier cold start — retry)
3. CORS: Render `FRONTEND_URL` includes Vercel domain

---

## Tests

### test_api.py fails

Requires **running server** on localhost:5000:

```bash
# Terminal 1
cd backend/src && python api.py

# Terminal 2
cd backend/tests && python test_api.py
```

---

### Determinism test fails

Run `test_determinism.py` — expects identical output across 10 runs. If fails, scoring engine may have non-deterministic code introduced.

---

## Recovery

1. Restart backend (`python api.py` or Render redeploy)
2. Restart frontend (`npm run dev` or Vercel redeploy)
3. Hard refresh browser
4. Verify `GET /health` and `GET /results?model=inland_port`

---

## Diagnostic Commands

```bash
curl http://localhost:5000/health
curl "http://localhost:5000/results?model=inland_port"
curl http://localhost:5000/locations
curl -X POST http://localhost:5000/simulate -H "Content-Type: application/json" -d @backend/tests/sample_simulate_request.json
```

---

## Escalation Checklist

1. Backend console / Render logs
2. Browser Network tab (status codes)
3. Env var names configured (not values)
4. Git commit deployed
5. Test output from `backend/tests/` if regression suspected
