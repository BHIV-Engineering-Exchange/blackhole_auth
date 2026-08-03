# Runtime Evidence — Nagar-Pranali

**Generated:** 2026-07-06

---

## Required Screenshots

Save to `Handover/Screenshots/`:

| # | Screenshot | How |
|---|------------|-----|
| 1 | UCCIS Command Center dashboard | Frontend home view |
| 2 | Signals page | Sidebar → Signals |
| 3 | Incidents page | Sidebar → Incidents |
| 4 | Replay Sessions | Sidebar → Replay Sessions |
| 5 | Runtime Logs | Sidebar → Runtime Logs |
| 6 | System Health view | Sidebar → System Health |
| 7 | Backend health JSON | Browser/curl `GET /health` |
| 8 | Demo trigger response | curl `POST /api/demo/flood` output |
| 9 | MySQL tables with data | After demo trigger |
| 10 | Render service dashboard | uccis-backend healthy |
| 11 | Vercel deploy success | Build log |
| 12 | Production frontend URL | nagar-pranali.vercel.app |

---

## API Evidence (curl)

```bash
# Health
curl https://nagar-pranali.onrender.com/health

# Demo chain
curl -X POST https://nagar-pranali.onrender.com/api/demo/flood
curl -X POST https://nagar-pranali.onrender.com/api/demo/traffic
curl -X POST https://nagar-pranali.onrender.com/api/demo/medical

# Read back
curl https://nagar-pranali.onrender.com/api/latest-signals
curl https://nagar-pranali.onrender.com/api/latest-incidents
curl https://nagar-pranali.onrender.com/api/latest-runtime

# Demo status
curl https://nagar-pranali.onrender.com/api/demo-status
```

Capture terminal output (redact any secrets).

---

## MySQL Evidence

After demo trigger:

```sql
USE uccis;
SELECT COUNT(*) AS signals FROM signals;
SELECT COUNT(*) AS telemetry FROM telemetry;
SELECT COUNT(*) AS incidents FROM incidents;
SELECT COUNT(*) AS escalations FROM escalations;
SELECT COUNT(*) AS decisions FROM decisions;
SELECT COUNT(*) AS replays FROM replay_records;
SELECT COUNT(*) AS logs FROM runtime_logs;

SELECT * FROM runtime_logs ORDER BY id DESC LIMIT 5;
```

---

## Local Build Evidence

```bash
cd "UCCIS -Main/backend" && npm start
cd "UCCIS -Main/frontend" && npm run build
```

Capture successful build output.

---

## Demo Sequence Evidence

From `DEPLOYMENT_GUIDE.md` demo sequence:

1. [ ] Backend started
2. [ ] Frontend started
3. [ ] Database connected
4. [ ] Dashboard opened
5. [ ] Flood scenario triggered
6. [ ] Incident verified in DB
7. [ ] Escalation verified in DB
8. [ ] Decision verified in DB
9. [ ] Replay verified in DB
10. [ ] Runtime logs verified in DB

---

## Environment Evidence (Names Only)

| Variable | Local | Render | Vercel |
|----------|-------|--------|--------|
| DB_HOST | ☐ | ☐ | N/A |
| DB_USER/PASSWORD/NAME | ☐ | ☐ | N/A |
| FRONTEND_URL | ☐ | ☐ | N/A |
| VITE_API_URL | ☐ | N/A | ☐ |

---

## Video Walkthrough (Optional)

Save to `Handover/Videos/`:

1. Local startup (backend + frontend + MySQL)
2. curl demo trigger + show MySQL rows
3. Walk through all sidebar views
4. Production URL smoke test

---

## Evidence Status

| Category | Status |
|----------|--------|
| Screenshots | TODO |
| curl captures | TODO |
| MySQL query results | TODO |
| Production verification | TODO |
| Demo video | TODO (optional) |
