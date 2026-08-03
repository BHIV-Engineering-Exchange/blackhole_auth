# Deployment Guide — Pradnya / NICAI

## Production topology

```
┌─────────────────────────┐         ┌─────────────────────────┐
│  Vercel (frontend)      │  HTTPS  │  Render (pradnya-api)   │
│  pradnya-bhiv.vercel.app│ ──────► │  FastAPI + uvicorn      │
│  frontend/dist          │  REST   │  CSV data + logs/       │
└─────────────────────────┘         └─────────────────────────┘
```

No database tier — backend reads bundled CSV files and writes log files to container filesystem (ephemeral on Render unless persisted).

---

## Backend — Render

**Config file:** `render.yaml`

```yaml
services:
  - type: web
    name: pradnya-api
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: ALLOWED_ORIGINS
        sync: false
```

### Deploy steps

1. Connect GitHub repo to Render
2. Apply `render.yaml` or create web service manually with same commands
3. Set environment variable:
   - `ALLOWED_ORIGINS` = `https://pradnya-bhiv.vercel.app,http://localhost:5173` (add staging URLs as needed)

### Health check

Use `GET /health` → `{"status":"ok","service":"nicai"}`

### Production API URL

**TODO: Verify** — Render service URL (e.g. `https://pradnya-api.onrender.com`). Set this as `VITE_NICAI_API` in Vercel.

---

## Frontend — Vercel

**Config file:** root `vercel.json`

```json
{
  "installCommand": "cd frontend && npm install",
  "buildCommand": "cd frontend && npm run build",
  "outputDirectory": "frontend/dist",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Vercel environment variables (required)

| Variable | Value |
|----------|-------|
| `VITE_NICAI_API` | Render backend URL (no trailing slash) |
| `VITE_SAMACHAR_API` | **TODO: Verify** — if Samachar pipeline used in prod |
| `VITE_MITRA_API` | **TODO: Verify** — if Mitra pipeline used in prod |

**Important:** Vite embeds `VITE_*` at **build time** — redeploy frontend after changing API URL.

### Known production frontend

`https://pradnya-bhiv.vercel.app` — referenced in backend CORS defaults in `main.py`.

---

## CORS

Backend `main.py`:

```python
DEFAULT_ORIGINS = "http://localhost:5173,...,https://pradnya-bhiv.vercel.app"
allowed_origins = os.getenv("ALLOWED_ORIGINS", DEFAULT_ORIGINS).split(",")
```

Update `ALLOWED_ORIGINS` on Render when adding new frontend domains.

---

## Data and logs on Render

- CSV files ship with repo — available after deploy
- `logs/` writes to container disk — **may reset on redeploy**; not suitable for long-term audit without external storage
- **TODO: Verify** — whether persistent disk or log export is configured

---

## Post-deploy smoke test

1. `GET <RENDER_URL>/health` → 200
2. `GET <RENDER_URL>/signals` → SUCCESS with signals array
3. Open `https://pradnya-bhiv.vercel.app` → dashboard loads
4. DevTools Network → `/signals` from Render URL (not mock)
5. `POST <RENDER_URL>/action` with sample body → SUCCESS logged
6. Optional: Samachar/Mitra health from Settings tab

---

## Built-in HTML dashboard

Still available at `<RENDER_URL>/dashboard` — separate from Vercel React UI; useful for quick API verification without frontend deploy.

---

## Rollback

See `18_Rollback_Guide.md` — redeploy prior Render release and Vercel deployment; CSV data unchanged in git.

---

## Security before wider exposure

1. Add API authentication if actions/logs are sensitive
2. Restrict CORS to known origins only (remove localhost from production env)
3. Consider read-only mode for public demos
4. Externalize logs to durable storage

None implemented in current code beyond configurable CORS.
