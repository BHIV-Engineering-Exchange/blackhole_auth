# Testing Checklist — Nagar-Pranali

**Generated:** 2026-07-06

---

## Prerequisites

- [ ] Node.js installed
- [ ] MySQL installed and running
- [ ] `schema.sql` and `seed.sql` imported
- [ ] Backend `.env` configured
- [ ] Backend running on :5000
- [ ] Frontend running (`npm run dev`)

---

## Database Setup

- [ ] `uccis` database exists
- [ ] All 7 tables created (signals, telemetry, incidents, escalations, decisions, replay_records, runtime_logs)
- [ ] Seed runtime log present: "UCCIS System Initialized"

---

## Backend Smoke Tests

### Health & Status

- [ ] `GET /` → 200, UCCIS JSON
- [ ] `GET /health` → 200
- [ ] `GET /api/demo-status` → 200 with scenarios list

### Demo Chain (Primary)

- [ ] `POST /api/demo/flood` → 200 + IDs
- [ ] `POST /api/demo/traffic` → 200 + IDs
- [ ] `POST /api/demo/medical` → 200 + IDs
- [ ] `POST /api/demo/power` → 200 + IDs
- [ ] `POST /api/demo/cyber` → 200 + IDs

After each POST, verify MySQL rows inserted in all 7 tables.

### Read Endpoints

- [ ] `GET /api/latest-signals` → data array
- [ ] `GET /api/latest-incidents` → data array
- [ ] `GET /api/latest-runtime` → data array
- [ ] `GET /api/dashboard` → ⚠️ expected fail until schema fixed
- [ ] `GET /api/signals` → ⚠️ expected fail until column fixed
- [ ] `GET /api/telemetry` → ⚠️ expected fail until table fixed

### 404

- [ ] `GET /nonexistent` → 404 JSON

---

## Frontend Smoke Tests

### Navigation

- [ ] Dashboard loads
- [ ] Signals page loads
- [ ] Telemetry page loads
- [ ] Incidents page loads
- [ ] Escalations page loads
- [ ] Decisions page loads
- [ ] Replay Sessions page loads
- [ ] Runtime Logs page loads
- [ ] Analytics page loads
- [ ] System Health view loads
- [ ] Sidebar navigation switches views

### UI Content

- [ ] Header shows "UCCIS Command Center"
- [ ] Charts render (Recharts)
- [ ] Summary cards show counts (static: 12/20/8/50)

> Note: UI shows static data — not connected to API yet.

---

## Build Tests

```bash
cd "UCCIS -Main/frontend"
npm run lint
npm run build
npm run preview
```

- [ ] Lint passes
- [ ] Build succeeds
- [ ] Preview serves app

---

## CORS Tests

- [ ] Frontend on localhost:5173 (or Vite port) can call backend (when wired)
- [ ] No CORS error from `nagar-pranali.vercel.app` to Render backend
- [ ] Custom domain allowed

---

## Production Tests

TODO: Verify URLs before running.

- [ ] `https://nagar-pranali.onrender.com/health` → 200
- [ ] Demo POST on production backend succeeds
- [ ] `https://nagar-pranali.vercel.app` loads
- [ ] Custom domain loads (if configured)

---

## Security Tests

- [ ] No `.env` files committed to git
- [ ] Document that all API endpoints are public (no auth)
- [ ] MySQL not exposed to public internet without firewall

---

## Regression (After Fixes)

When schema and frontend wiring are fixed, re-test:

- [ ] `GET /api/dashboard` returns correct counts
- [ ] `GET /api/signals` returns ordered list
- [ ] `GET /api/telemetry` returns telemetry rows
- [ ] UI updates after demo POST without page reload

---

## Automated Tests

**Current state:** None.

Recommended minimum after handover:

- [ ] Integration test: POST `/api/demo/flood` + verify MySQL counts
- [ ] Health test with DB ping

---

## Sign-off

| Role | Name | Date | Pass/Fail |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Reviewer | | | |
