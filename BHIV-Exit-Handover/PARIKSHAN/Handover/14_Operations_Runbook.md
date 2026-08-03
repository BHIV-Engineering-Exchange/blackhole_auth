# Operations Runbook — PARIKSHAN / NIYANTRAN V1

## Service components

| Component | Process | Default port |
|-----------|---------|--------------|
| NIYANTRAN API + Socket | `node server.js` (backend) | 4000 |
| Dashboard UI (dev) | `vite` (frontend) | 5173 |
| Dashboard UI (prod) | Static files from `dist/` | Host-dependent |
| MongoDB | `mongod` or Atlas | 27017 |

---

## Health checks

### Primary

```bash
curl -s http://<API_HOST>/health
```

Use for load balancer and uptime monitors.

### Secondary

```bash
curl -s http://<API_HOST>/niyantran/overview | head -c 200
```

Confirms MongoDB read path works.

### Realtime

Connect WebSocket client to same host — expect `niyantran:update` within 10 seconds if stream is running.

---

## Normal operations

### Start (local)

```bash
# MongoDB must be running first
cd backend && npm run dev
cd frontend && VITE_API_BASE_URL=http://localhost:4000 npm run dev
```

### Start (production pattern)

```bash
cd backend && npm install --production && npm start
# Frontend: serve pre-built dist/ from CDN/static host
```

### Stop

- Backend: SIGTERM to Node process (platform stop button or `Ctrl+C`)
- Stream interval clears when process exits — no separate worker

---

## Monitoring signals

| Signal | Healthy | Unhealthy |
|--------|---------|-----------|
| `/health` | 200 | 5xx or timeout |
| Overview entity count | ≥ 1 after seed | Empty arrays consistently |
| Socket updates | ~every 5s | No events > 30s |
| MongoDB | Connected on startup | Connection errors in logs |
| Action POST | 201 | 400/500 spike |

**TODO: Verify** — centralized logging (Datadog, CloudWatch, etc.) if deployed.

---

## Common incidents

### Dashboard empty but backend healthy

1. Check frontend `VITE_API_BASE_URL` matches backend URL
2. Check browser console for CORS or network errors
3. Confirm `hydrate()` request succeeds

### No realtime updates

1. Verify WebSocket connection in DevTools
2. Check backend logs for stream errors
3. Confirm firewall allows WebSocket upgrade on production proxy

### MongoDB connection failure

1. Verify `MONGODB_URI`
2. Check Atlas IP allowlist / network
3. Restart backend after MongoDB recovery

### Stale or corrupt data

1. Inspect `entities`, `alerts`, `actionlogs` in MongoDB
2. Local dev: drop collections and restart to re-seed (see `13_Testing_Guide.md`)
3. Production: **TODO: Verify** — backup restore procedure

---

## Logs

- Backend: stdout/stderr from Node (platform captures if on Render/Railway/etc.)
- No structured log format defined in code
- Stream errors emitted as `niyantran:error` socket events

---

## Maintenance windows

**TODO: Verify** — scheduled maintenance policy. Mock stream runs continuously; brief restart causes ~5s gap in updates.

---

## Escalation

**TODO: Verify**

- Product owner
- Backend/on-call engineer
- MongoDB administrator

---

## Related documents

- `05_Environment_Setup.md` — install
- `06_Deployment_Guide.md` — hosting
- `18_Rollback_Guide.md` — recovery
- `12_Known_Issues_And_TODOs.md` — known gaps
