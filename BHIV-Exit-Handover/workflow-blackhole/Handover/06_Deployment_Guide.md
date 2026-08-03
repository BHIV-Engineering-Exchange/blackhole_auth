# Deployment Guide — workflow-blackhole

## Production topology (inferred from code)

```
┌──────────────────────────────┐         ┌──────────────────────────────┐
│  Vercel                      │  HTTPS  │  Render                      │
│  blackhole-workflow.vercel.app│ ──────► │  blackholeworkflow.onrender.com│
│  client/ build → dist        │  /api   │  server/index.js             │
└──────────────────────────────┘         └──────────────────────────────┘
                                                    │
                                                    ▼
                                         ┌──────────────────────────────┐
                                         │  MongoDB Atlas                 │
                                         └──────────────────────────────┘
```

Alternate: **monolith** — build client, deploy server with `client/dist` served from Express (same origin).

Custom domain in CORS: `niyantran.blackholeinfiverse.com` — **TODO: Verify** relationship (may proxy to same backend or separate product shell).

---

## Frontend — Vercel

Build from `client/`:

```bash
cd client
npm run build
```

**Required env (Vercel project settings):**

| Variable | Example |
|----------|---------|
| `VITE_API_URL` | `https://blackholeworkflow.onrender.com/api` |
| `VITE_SOCKET_URL` | `https://blackholeworkflow.onrender.com` |

Without `VITE_API_URL`, `api.js` uses Render fallback when hostname ends with `.vercel.app`.

Redeploy after env changes.

---

## Backend — Render

**TODO: Verify** exact Render service config (no `render.yaml` found in repo at handover time).

Typical settings:

- Root directory: `server` (or repo root with start command `cd server && npm start`)
- Build: `npm install`
- Start: `npm start` → `node index.js`
- Env: `MONGODB_URI`, `JWT_SECRET`, `PORT`, integrations

Health: `GET /api/ping`

---

## CORS configuration

Hardcoded in `server/index.js`:

**HTTPS allowed hosts:**
- `niyantran.blackholeinfiverse.com`
- `blackhole-workflow.vercel.app`

**HTTP dev:** `localhost:5173`

To add staging domains, edit `ALLOWED_ORIGIN_CONFIG` and `ALLOWED_SOCKET_ORIGINS`.

---

## Static asset serving

If deploying monolith on Render:

1. Build client locally or in CI
2. Commit or copy `client/dist` to server deploy artifact
3. Express serves static + SPA fallback (already in `index.js`)

Note: Vercel split deploy is preferred for frontend velocity.

---

## SETU / Sampada (production)

Enable only when Infiverse-HR SETU endpoint ready:

```env
SAMPADA_SETU_ENABLED=true
SAMPADA_SETU_BASE_URL=https://<sampada-api>
SAMPADA_SETU_API_KEY=<key>
SAMPADA_SETU_TIMEOUT_MS=30000
```

Dispatches after each `ExecutionEvent` persist (fire-and-forget `.catch()`).

---

## Post-deploy smoke test

1. `GET <backend>/api/ping`
2. Login from Vercel app
3. Socket connects (Network → WS)
4. Admin dashboard loads
5. Optional: Tantra participate test with valid execution contract
6. Confirm CORS from production frontend origin

---

## Secrets

Never commit `.env`. Rotate `JWT_SECRET` and API keys if exposed.

---

## Rollback

See `18_Rollback_Guide.md`.
