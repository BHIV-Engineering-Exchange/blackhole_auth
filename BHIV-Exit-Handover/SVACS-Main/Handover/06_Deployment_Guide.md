# Deployment Guide — SVACS-Main

## Topology

```
┌─────────────────────────┐         ┌─────────────────────────┐
│  Vercel                 │  HTTPS  │  Render (svacs-backend) │
│  React static (dist/)   │ ──────► │  Flask dashboard/app.py │
│  vercel.json            │  REST   │  gunicorn               │
└─────────────────────────┘         └──────────┬──────────────┘
                                               │
                                               ▼
                                    ┌─────────────────────────┐
                                    │  storage/ JSON artifacts │
                                    │  (bundled + runtime)     │
                                    └─────────────────────────┘

External: bhiv-bucket.onrender.com (artifact persistence)
```

**FastAPI `main.py` is NOT deployed by current `render.yaml`.**

---

## Backend — Render

**File:** `render.yaml`

```yaml
services:
  - type: web
    name: svacs-backend
    runtime: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn --bind 0.0.0.0:$PORT --workers 2 --timeout 120 dashboard.app:app
```

### Required env updates for production

| Variable | Recommended |
|----------|-------------|
| `ALLOWED_ORIGINS` | Add Vercel frontend URL(s) — current default is localhost only |
| `PYTHON_VERSION` | 3.11.9 (already set) |
| `FLASK_ENV` | production |

### Health check

`GET /health` → `{ "status": "ONLINE", "service": "SVACS_DASHBOARD", ... }`

**Production URL:** **TODO: Verify** — e.g. `https://svacs-backend.onrender.com`

---

## Frontend — Vercel

**File:** `vercel.json`

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

Build settings (typical):
- Root directory: repo root
- Build: `npm run build`
- Output: `dist/`

### Vercel environment variables

| Variable | Purpose |
|----------|---------|
| `VITE_USE_MOCK` | Set `false` for integration demo (adapter still stub) |
| `VITE_*_API` | Point to Render Flask base or microservices — **TODO: Verify** |
| `VITE_POLL_INTERVAL_MS` | Query polling interval |

Redeploy after env changes (Vite embeds at build time).

**Production frontend URL:** **TODO: Verify**

---

## Storage on Render

- `storage/` files ship with repo; pipeline can append at runtime
- Ephemeral filesystem — new writes may not persist across redeploys unless using persistent disk
- Pre-generated proof JSON in repo provides demo data even without live pipeline runs

---

## Bucket service

`full_operational_chain.py` uses:

- `https://bhiv-bucket.onrender.com/bucket/latest-hash`
- `https://bhiv-bucket.onrender.com/bucket/artifact`

**TODO: Verify** — bucket service availability and credentials.

---

## Post-deploy smoke test

1. `GET <RENDER>/health` → ONLINE
2. `GET <RENDER>/api/dashboard` → JSON array (may be empty)
3. Vercel app loads, sidebar navigation works
4. Settings page shows env configuration
5. Overview polls without console errors (mock or live)
6. `npm run build` succeeds in CI/Vercel (TypeScript)

---

## Dual API note

Do **not** deploy `uvicorn main:app` on Render without updating `render.yaml` — would conflict with Flask strategy. Choose one primary API for frontend integration.

---

## Rollback

See `18_Rollback_Guide.md`.
