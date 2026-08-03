# Testing Guide — workflow-blackhole

## Automated tests

**Server `package.json`:** `npm test` → placeholder (exits 1).

**No client test script** in package.json beyond lint.

---

## Manual / script tests in repo

| Script | Location | Purpose |
|--------|----------|---------|
| `test_pipeline.py` | N/A — wrong repo | — |
| `tests/test_pipeline.py` | Not in workflow — server has JS tests | |
| `verify_ems_setup.js` | repo root | EMS setup check |
| `test_monitoring.js` | repo root | Monitoring |
| `test-real-tracking.js` | repo root | Activity tracking |
| `server/test-login.js` | server | Login dev test |
| `server/test-ems-signals.js` | server | EMS signals |
| `server/test-hourly-salary.js` | server | Salary |
| `server/test-activity-save.js` | server | Activity save |
| `test-verification.ps1` | repo root | PowerShell verification |

Run from repo root or server as appropriate.

---

## Manual API smoke tests

```bash
# Health
curl http://localhost:5000/api/ping

# Auth (after user exists)
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"..."}'

# Authenticated (replace TOKEN)
curl http://localhost:5000/api/auth/me -H "x-auth-token: TOKEN"

# Tantra — requires valid execution contract (see tantraExecution route)
# POST /api/tantra/execution/participate
```

---

## Frontend smoke tests

| # | Test | Expected |
|---|------|----------|
| F1 | Login flow | Redirect to dashboard |
| F2 | Admin vs User routes | Role-appropriate pages |
| F3 | Socket connected | DevTools WS active |
| F4 | Start/end attendance | API 200 + socket event |
| F5 | Branch selector | `x-branch` header in requests |
| F6 | `npm run build` | dist/ created |

---

## Tantra / SETU testing

1. Set `SAMPADA_SETU_ENABLED=true` with test Sampada URL
2. POST valid execution participation
3. Check `ExecutionEvent` in MongoDB
4. Verify outbound SETU request in logs (add temporary logging if needed)

With SETU disabled, events should still persist locally.

---

## EMS verification

```bash
node verify_ems_setup.js
```

---

## Production smoke

1. Vercel app login
2. `/api/ping` on Render URL
3. Critical path: attendance or tasks for one user role
4. No CORS errors in console

---

## Recommended CI (not in repo)

```yaml
- cd server && npm install
- cd client && npm install && npm run build
- optional: eslint, future jest/supertest suite
```

---

## Test data

`server/seed-attendance-data.js` — **TODO: Verify** usage.

No formal fixtures folder.
