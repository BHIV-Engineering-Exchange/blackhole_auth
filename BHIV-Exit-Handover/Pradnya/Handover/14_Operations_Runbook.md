# Operations Runbook — Pradnya / NICAI

## Service components

| Component | Host | Notes |
|-----------|------|-------|
| NICAI API | Render (`pradnya-api`) | FastAPI + uvicorn |
| NICAI UI | Vercel | Static React from `frontend/dist` |
| Data | Bundled CSV in repo | No external DB |
| Logs | `logs/` on API container | May be ephemeral on Render |

---

## Health checks

### Primary

```bash
curl -s https://<RENDER_URL>/health
```

Expected: `{"status":"ok","service":"nicai"}`

### Secondary

```bash
curl -s https://<RENDER_URL>/signals | head -c 300
```

Confirms CSV load + pipeline execution.

### Frontend

Open Vercel URL → Settings or Health tab → Run Health Check.

---

## Normal operations

### Local development

```bash
# Terminal 1
uvicorn main:app --reload --port 8000

# Terminal 2
cd frontend && npm run dev
```

### Production

- **Backend:** Auto-deploy from `main` branch on Render (if connected)
- **Frontend:** Auto-deploy from `main` on Vercel

Manual Render restart: Dashboard → Service → Manual Deploy / Restart

---

## Monitoring signals

| Signal | Healthy | Unhealthy |
|--------|---------|-----------|
| `/health` | 200 | 5xx / timeout |
| `/signals` status | SUCCESS | ERROR "Dataset not loaded" |
| Vercel UI | Live data label | Stuck on mock demo data |
| CORS errors | None in browser console | Blocked fetch |
| Log growth | Lines append on requests | Disk full (rare locally) |

**TODO: Verify** — centralized monitoring (Render metrics, Vercel analytics).

---

## Common incidents

### Vercel shows demo data only

1. Verify `VITE_NICAI_API` in Vercel project settings
2. Redeploy frontend (env baked at build time)
3. Confirm Render backend running
4. Check CORS `ALLOWED_ORIGINS` includes Vercel URL

### "Dataset not loaded"

1. Confirm `data/clean_weather.csv` and `data/clean_aqi.csv` in deploy artifact
2. Check Render build logs for missing files
3. Verify working directory is repo root for uvicorn

### CORS failure

1. Update `ALLOWED_ORIGINS` on Render
2. Include exact scheme + domain (no trailing path)
3. Restart backend service

### Empty signals array

1. Check validation — all signals REJECT/FLAG skipped incorrectly
2. Verify `datasets.json` IDs match adapter output (`DS_WEATHER`, `DS_AQI`)
3. Inspect `logs/validation_logs.json`

### Samachar/Mitra pipeline fails

1. Confirm URLs in Vercel env or Settings tab
2. Test endpoints directly with curl
3. Expected — optional services may be offline in demo

---

## Logs

| Location | Content |
|----------|---------|
| `logs/validation_logs.json` | Per-signal validation |
| `logs/anomaly_logs.json` | Analysis outputs |
| `logs/pattern_logs.json` | Pattern summaries |
| `logs/action_logs.json` | Simulated actions |

Render: view stdout in dashboard; file logs may not persist.

Client-side: React Logs tab — UI events only, not server logs.

---

## Maintenance

- CSV updates: commit new files → redeploy Render
- Log rotation: not automated — truncate files manually if needed
- Free-tier Render spin-down: first request may be slow (cold start)

---

## Escalation

**TODO: Verify**

- Product owner
- Render/Vercel account admin
- Samachar/Mitra service owners

---

## Related documents

- `06_Deployment_Guide.md`
- `18_Rollback_Guide.md`
- `12_Known_Issues_And_TODOs.md`
