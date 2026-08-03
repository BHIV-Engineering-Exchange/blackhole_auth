# Troubleshooting — Nagar-Pranali

**Generated:** 2026-07-06

---

## Startup

### Backend won't start

```bash
cd "UCCIS -Main/backend"
npm install
npm start
```

**Checks:**
1. Node.js installed
2. `.env` exists with valid `DB_*` vars
3. Port 5000 free (or set `PORT`)
4. MySQL running and reachable

---

### "Database Error" on startup

**Source:** `database/db.js` connection callback

**Fix:**
1. Verify MySQL is running
2. Check `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
3. Confirm database `uccis` exists (run `schema.sql`)
4. For remote MySQL: set `DB_SSL=true` if required

---

### Frontend won't start

```bash
cd "UCCIS -Main/frontend"
npm install
npm run dev
```

> Use `npm run dev`, not `npm start` (no start script in frontend package.json).

---

## API Errors

### 500 on GET `/api/dashboard`

**Cause:** Queries `telemetry_events` and `replay_sessions` — tables don't exist

**Fix:** Update SQL in `server.js` to use `telemetry` and `replay_records`

---

### 500 on GET `/api/signals`

**Cause:** `ORDER BY signal_id` — column is `id`

**Fix:** Change to `ORDER BY id DESC` in `routes/signals.js`

---

### 500 on GET `/api/telemetry`

**Cause:** Queries `telemetry_events` table

**Fix:** Change to `SELECT * FROM telemetry` in `routes/telemetry.js`

---

### Demo POST succeeds but UI unchanged

**Cause:** Frontend uses hardcoded `sampleData`, not API

**Fix:** Wire `App.jsx` to fetch from backend (pending work) OR verify via curl:

```bash
curl http://localhost:5000/api/latest-signals
curl http://localhost:5000/api/latest-incidents
```

---

## CORS

### Browser CORS error from Vercel

**Symptom:** `Not allowed by CORS` in console

**Fix:**
1. Set `FRONTEND_URL` on Render to include your Vercel URL
2. Or rely on regex: `*.vercel.app` should match
3. Redeploy backend after env change
4. Custom domain must match `*.blackholeinfiverse.app` pattern or be in `FRONTEND_URL`

---

## Deployment

### Render build fails

**Checks:**
1. Root dir: `UCCIS -Main/backend`
2. Build: `npm install`
3. Start: `node server.js`
4. All `DB_*` env vars set in dashboard

---

### Vercel build fails

**Checks:**
1. Root `vercel.json` paths quote `UCCIS -Main/frontend`
2. Run locally: `cd "UCCIS -Main/frontend" && npm run build`
3. Fix ESLint/JS errors if any

---

### Render health check fails

**Path:** `/health` (configured in `render.yaml`)

**Note:** Health returns 200 even if DB is down — check Render logs for "Database Error".

---

## Database

### Import schema fails

```bash
mysql -u root -p < "UCCIS -Main/backend/database/schema.sql"
```

**Checks:**
1. MySQL client installed
2. User has CREATE DATABASE permission
3. Path quoted due to space in `UCCIS -Main`

---

### Empty tables after demo

**Verify demo was triggered:**

```bash
curl -X POST http://localhost:5000/api/demo/flood
```

Check MySQL:
```sql
USE uccis;
SELECT COUNT(*) FROM signals;
SELECT COUNT(*) FROM runtime_logs;
```

---

## Recovery Procedure

From `DEMO_REVIEW_PACKET.md`:

1. Restart backend (`npm start`)
2. Restart frontend (`npm run dev`)
3. Reload dashboard in browser
4. Re-run scenario: `POST /api/demo/flood`

---

## Diagnostic Commands

```bash
# Health
curl http://localhost:5000/health

# System status
curl http://localhost:5000/

# Trigger demo
curl -X POST http://localhost:5000/api/demo/flood

# Latest data
curl http://localhost:5000/api/latest-signals
curl http://localhost:5000/api/latest-incidents
curl http://localhost:5000/api/latest-runtime

# Demo status
curl http://localhost:5000/api/demo-status
```

---

## Escalation Checklist

1. Backend console output (Database Connected / Error)
2. MySQL connection test
3. curl output for failing endpoint
4. Browser Network tab (CORS vs 500)
5. Render/Vercel deploy logs
6. Env var names configured (not values)
