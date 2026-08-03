# Operations Runbook — SVACS-Main

## Components

| Component | Host | Process |
|-----------|------|---------|
| Dashboard API | Render `svacs-backend` | gunicorn → Flask |
| React UI | Vercel | Static `dist/` |
| Bucket | bhiv-bucket.onrender.com | External |
| Storage | Git + runtime writes | JSON/JSONL files |

---

## Health checks

### Flask (primary)

```bash
curl -s https://<RENDER_URL>/health
```

Expected: `"status": "ONLINE"`, `"service": "SVACS_DASHBOARD"`

### Data plane

```bash
curl -s https://<RENDER_URL>/api/dashboard | head -c 500
curl -s https://<RENDER_URL>/api/telemetry | head -c 500
```

Non-empty arrays indicate storage readable.

### Frontend

- Vercel deployment status: Ready
- Browser: Overview loads, no uncaught errors in console

---

## Normal operations

### Local dev

```bash
# Terminal 1
python dashboard/app.py

# Terminal 2
npm run dev
```

### Regenerate storage (after code/data change)

```bash
python tests/test_pipeline.py
# or
python -m orchestration.live_pipeline
```

### Production deploy

- Push to `main` → Render + Vercel auto-deploy (if connected)
- Verify `npm run build` locally before push

---

## Monitoring

| Signal | Healthy | Unhealthy |
|--------|---------|-----------|
| `/health` | ONLINE | 5xx / timeout |
| Dashboard API latency | < few seconds | Timeouts on free tier cold start |
| Vercel build | Success | TS compile failure |
| React Query errors | None in console | Repeated fetch failures |
| Storage files | Readable JSON | Parse errors in Flask logs |

**TODO: Verify** — centralized monitoring.

---

## Common incidents

### Vercel build fails

1. Run `npm run typecheck` locally
2. Fix TS errors in `src/`
3. Reference commit `5aefb9a` for prior fixes

### Empty dashboard API

1. Check `storage/dashboard/dashboard_payloads.json` exists in deploy
2. Run pipeline locally, commit outputs if intentional
3. Check Flask logs for JSON parse errors

### CORS blocked from Vercel

1. Render → Environment → `ALLOWED_ORIGINS`
2. Add `https://<your-vercel-domain>`
3. Redeploy backend

### Mock UI despite "live" intent

1. Expected — implement `RealAdapter`
2. Set `VITE_USE_MOCK=false` **after** adapter implemented
3. Rebuild Vercel

### Render cold start slow

Free tier spin-down — first request 30–60s delay normal.

### Bucket upload failures

Check `full_operational_chain.py` output; verify bhiv-bucket reachable.

---

## Logs

| Location | Content |
|----------|---------|
| Render stdout | Flask/gunicorn prints, JSON load errors |
| `storage/logs/full_runtime_chain_log.jsonl` | Pipeline stages |
| `storage/telemetry/` | Telemetry events |
| Browser console | React Query / fetch errors |

---

## Maintenance

- Update proof artifacts: re-run validation scripts, commit if required
- Clean duplicate executions in storage before demos
- Do not force-push `main`

---

## Escalation

**TODO: Verify** — Ankita/Nupur/Raj/Bucket team contacts per README convergence table.

---

## Related docs

- `06_Deployment_Guide.md`
- `18_Rollback_Guide.md`
- `demo_walkthrough.md` (repo root)
- `TESTING_PACKET.md` (repo root)
