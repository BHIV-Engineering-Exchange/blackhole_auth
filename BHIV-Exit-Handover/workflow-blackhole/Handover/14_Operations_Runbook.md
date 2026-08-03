# Operations Runbook — workflow-blackhole

## Services

| Component | Host | Process |
|-----------|------|---------|
| API + Socket | Render (`blackholeworkflow.onrender.com`) | `node index.js` |
| SPA | Vercel (`blackhole-workflow.vercel.app`) | static |
| Database | MongoDB Atlas | managed |
| Sampada SETU | External | optional outbound |

---

## Health checks

```bash
curl -s https://blackholeworkflow.onrender.com/api/ping
```

Expected: `{"message":"Pong!"}`

Optional authenticated check: `/api/auth/me` with valid token.

---

## Daily operations

### Local dev

```bash
# Terminal 1
cd server && npm start

# Terminal 2
cd client && npm run dev
```

### Production

- Monitor Render logs for MongoDB connection errors
- Monitor Vercel deploy status after frontend changes
- Cold start delay on Render free tier

---

## Scheduled jobs (in-process)

| Job | Schedule | Purpose |
|-----|----------|---------|
| Midnight auto-end | Next midnight + every 24h | Close unended attendance → spam |
| Attendance persistence cron | Daily 11:59 PM | Persist daily records |

Manual trigger: `POST /api/admin/trigger-midnight-job` (admin JWT).

---

## Monitoring signals

| Signal | Healthy | Unhealthy |
|--------|---------|-----------|
| `/api/ping` | 200 | 5xx / timeout |
| MongoDB log on start | ✅ Connected | exit(1) |
| Vercel app | Login works | 401/CORS errors |
| Socket | Connected | Repeated disconnects |
| EMS template init | Log message on boot | Error stack |

---

## Common incidents

### CORS blocked on Vercel

Add origin to `ALLOWED_ORIGIN_CONFIG.httpsHosts` in `index.js`, redeploy server.

### JWT invalid after deploy

`JWT_SECRET` changed — users must re-login.

### Attendance spam queue growing

Review midnight job logs; validate spam records via admin attendance tools.

### SETU not receiving events

Check `SAMPADA_SETU_ENABLED`, URL, API key; note silent failure on dispatch errors.

### Monitoring not capturing screens

Linux: install xdotool/scrot/imagemagick; call `/api/test-browser-detection`.

### Render OOM / timeout

Large file uploads (biometric Excel) — increase timeout or optimize multer limits **TODO: Verify**.

---

## Logs

- Render stdout/stderr
- `server/server.log` if present locally
- MongoDB audit collections

---

## Backups

MongoDB Atlas automated backups — **TODO: Verify** schedule.

---

## Escalation

**TODO: Verify** — Infiverse BHL on-call, Atlas admin, Vercel/Render account owner.

---

## Related

- `06_Deployment_Guide.md`
- `18_Rollback_Guide.md`
- `11_Authentication_And_Security.md` (monitoring compliance)
