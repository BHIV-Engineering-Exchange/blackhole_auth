# Deployment Checklist — Namami-Gange

**Generated:** 2026-07-06

---

## Pre-Deploy

### Code

- [ ] Changes merged to `main`
- [ ] `cd frontend && npm run build` succeeds locally
- [ ] Backend starts: `cd backend/src && python api.py`
- [ ] `GET /results?model=inland_port` returns 6 results locally
- [ ] No secrets in committed files

### Tests (recommended)

- [ ] `python backend/tests/test_determinism.py` passes
- [ ] `python backend/tests/test_contract_validation.py` passes

---

## Backend Deploy (Render)

From `render.yaml`:

- [ ] Service: `namami-gange-api`
- [ ] Root dir: `backend`
- [ ] Build: `pip install -r requirements.txt`
- [ ] Start: `cd src && gunicorn api:app --bind 0.0.0.0:$PORT`
- [ ] Health: `/health`
- [ ] `FRONTEND_URL` set (comma-separated origins)

### Post-deploy

- [ ] `GET /health` → 200
- [ ] `GET /results?model=inland_port` → 200

---

## Frontend Deploy (Vercel)

- [ ] Root directory: `frontend`
- [ ] Framework: Next.js
- [ ] `NEXT_PUBLIC_API_URL` = Render backend URL (no trailing slash)
- [ ] Build succeeds

### Post-deploy

- [ ] Frontend URL loads
- [ ] Suitability scores visible on dashboard
- [ ] No CORS errors

---

## Connect Services

1. [ ] Render `FRONTEND_URL` includes Vercel URL
2. [ ] Vercel `NEXT_PUBLIC_API_URL` matches Render URL
3. [ ] Redeploy both if env changed

---

## Demo Day Checklist

- [ ] Open Vercel URL
- [ ] Show Global Operations dashboard with live scores
- [ ] Navigate key tabs (Basin, Simulation, Governance)
- [ ] curl demo: `GET /results?model=inland_port`
- [ ] Optional: `POST /simulate` via curl/Postman
- [ ] Show `farakka_wetland` as REJECTED example

---

## Rollback Readiness

- [ ] Previous Render deploy ID noted
- [ ] Previous Vercel deploy ID noted

---

## Deploy Log

| Field | Value |
|-------|-------|
| Date | |
| Git commit | |
| Render deploy ID | |
| Vercel deploy ID | |
| `/results` test | Pass / Fail |
| Frontend scores visible | Pass / Fail |
