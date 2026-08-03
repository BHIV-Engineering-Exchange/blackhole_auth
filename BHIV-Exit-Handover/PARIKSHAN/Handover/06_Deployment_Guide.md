# Deployment Guide — PARIKSHAN / NIYANTRAN V1

## Current state

**No deployment configuration exists in the repository.**

Verified absent:
- `render.yaml`, `Dockerfile`, `docker-compose.yml`
- `vercel.json`, `netlify.toml`
- GitHub Actions / CI workflows
- Documented production URLs

This guide describes a **recommended** split deployment based on the codebase structure. All production URLs and hosting accounts are **TODO: Verify**.

---

## Recommended topology

```
┌─────────────────────┐         ┌─────────────────────┐
│  Static frontend    │  HTTPS  │  Node backend       │
│  (Vercel / Netlify  │ ──────► │  (Render / Railway  │
│   / S3 + CDN)       │  REST   │   / VM)             │
│  frontend/dist      │  + WS   │  backend/server.js  │
└─────────────────────┘         └──────────┬──────────┘
                                           │
                                           ▼
                                ┌─────────────────────┐
                                │  MongoDB Atlas      │
                                │  bhiv-niyantran     │
                                └─────────────────────┘
```

---

## Backend deployment

### Build / start command

```bash
cd backend
npm install --production
npm start
```

Entry: `node server.js`

### Environment variables (production)

| Variable | Required | Example |
|----------|----------|---------|
| `PORT` | Yes (platform may inject) | `4000` or platform default |
| `MONGODB_URI` | Yes | `mongodb+srv://.../bhiv-niyantran` |

### Socket.IO considerations

- Hosting must support **WebSockets** (not all serverless platforms do).
- If frontend and backend are on different origins, set CORS explicitly (currently `*` in code — tighten for production).
- Client must use full backend URL: `VITE_API_BASE_URL=https://api.example.com`

### Health check

Use `GET /health` for load balancer / Render health probes.

---

## Frontend deployment

### Build

```bash
cd frontend
# Set at BUILD time — Vite embeds env in bundle
VITE_API_BASE_URL=https://YOUR-BACKEND-URL npm run build
```

Output: `frontend/dist/`

Deploy `dist/` to any static host (Vercel, Netlify, Cloudflare Pages, S3).

### Vite dev vs production

- Dev: `npm run dev` (port 5173)
- Production: serve static files from `dist/`; no Node required for frontend only

**Note:** Committed `frontend/dist/` in repo may be stale — always rebuild before release with correct `VITE_API_BASE_URL`.

---

## MongoDB

- Database name: `bhiv-niyantran`
- Collections created by Mongoose: `entities`, `alerts`, `actionlogs`
- Seed data runs automatically on empty `entities` collection

**TODO: Verify** — Atlas cluster name, backup policy, and connection string rotation.

---

## DNS / SSL

**TODO: Verify** — custom domains for dashboard and API, TLS certificates, and whether WebSocket path needs special proxy config (e.g. nginx `Upgrade` headers).

---

## Post-deploy smoke test

1. `GET https://<api>/health` → 200
2. `GET https://<api>/niyantran/overview` → JSON with entities
3. Open dashboard URL → overview loads
4. Browser DevTools → Network → WS connection to same host as API
5. Wait 5–10s → entities/alerts update without refresh
6. POST action (via UI or curl) → 201 and visible state change

---

## Rollback

See `18_Rollback_Guide.md` — redeploy previous backend build and prior `dist/` artifact; MongoDB data persists unless manually cleared.

---

## Security before public production

1. Add authentication / API keys
2. Restrict CORS to frontend origin
3. Do not expose MongoDB publicly
4. Rate-limit `POST /niyantran/action`

None of the above are implemented in current code.
