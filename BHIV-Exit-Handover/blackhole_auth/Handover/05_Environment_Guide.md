# Environment Guide — blackhole_auth

**Generated:** 2026-07-05  
**Sources:** `backend/src/config/env.js`, `backend/.env.example`, `backend/.env`, `frontend/.env`

---

## Backend Environment Variables (Actually Used)

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `JWT_SECRET` | **Yes** | None — startup fails if missing | Must match auth server signing secret |
| `PORT` | No | `8080` | Express listen port |
| `NODE_ENV` | No | `development` | Environment name |
| `AUTH_SERVER_URL` | No | `https://bhiv-auth.onrender.com` | External auth server base URL |
| `CORS_ORIGINS` | No | `""` (empty = allow all) | Comma-separated allowed origins |

Source: `backend/src/config/env.js`

---

## Backend `.env.example` — Stale Variables

The following appear in `backend/.env.example` but are **NOT used** by current code:

| Variable | Status |
|----------|--------|
| `MONGO_URI` | **Unused** — no database in this repo |
| `JWT_EXPIRES_IN` | **Unused** — expiry set by auth server |
| `AUTH_COOKIE_NAME` | **Unused** — hardcoded as `blackhole_token` in code |
| `COOKIE_DOMAIN` | **Unused** in this repo |
| `COOKIE_SECURE` | **Unused** in this repo |
| `COOKIE_SAME_SITE` | **Unused** in this repo |

> Update `.env.example` to match actual code — see `09_Pending_Work.md`.

---

## Frontend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | Local: recommended | `http://localhost:8080` | Auth client backend URL |
| `VITE_AUTH_SERVER_URL` | No | `https://bhiv-auth.onrender.com` | External auth server URL |

From `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH_SERVER_URL=https://bhiv-auth.onrender.com
```

---

## Local `.env` Templates

### `backend/.env`

```env
PORT=8080
NODE_ENV=development
JWT_SECRET=<must-match-bhiv-auth-server>
AUTH_SERVER_URL=https://bhiv-auth.onrender.com
CORS_ORIGINS=https://namankan.blackholeinfiverse.com,http://163.128.209.18:5181,http://localhost:5173,https://products.blackholeinfiverse.com,https://*.blackholeinfiverse.com
```

### `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH_SERVER_URL=https://bhiv-auth.onrender.com
```

---

## Production Environment (Inferred)

### Backend

```env
PORT=8080
NODE_ENV=production
JWT_SECRET=<production-secret-shared-with-auth-server>
AUTH_SERVER_URL=https://bhiv-auth.onrender.com
CORS_ORIGINS=https://products.blackholeinfiverse.com,https://*.blackholeinfiverse.com
```

### Frontend

```env
VITE_API_BASE_URL=https://<auth-client-backend-url>
VITE_AUTH_SERVER_URL=https://bhiv-auth.onrender.com
```

> TODO: Verify production backend URL.

---

## Security Notes

### JWT_SECRET

- Required at startup (`env.js` throws if missing)
- Must be **identical** on auth client backend and auth server
- Changing it invalidates all existing cookies/tokens

### Committed `.env`

`backend/.env` exists locally with a JWT_SECRET value. **No `.gitignore` found in repo.**

> TODO: Verify whether `.env` is tracked in git. If so, rotate secret immediately.

---

## Cookie Name Mismatch

| Source | Cookie Name |
|--------|-------------|
| Code (`blackholeAuth.js`) | `blackhole_token` |
| `.env.example` | `bhiv_token` (unused var) |

The code hardcodes `blackhole_token`. The auth server must set a cookie with this exact name.

---

## Environment by Stage

| Variable | Local Backend | Local Frontend | Production |
|----------|---------------|----------------|------------|
| `JWT_SECRET` | `.env` | N/A | Hosting env |
| `CORS_ORIGINS` | `.env` | N/A | Hosting env |
| `VITE_API_BASE_URL` | N/A | `.env` | Vercel/hosting |
| `VITE_AUTH_SERVER_URL` | N/A | `.env` | Vercel/hosting |
| `AUTH_SERVER_URL` | `.env` | N/A (uses VITE_) | Both |

---

## TODO: Verify

- [ ] Production env vars on hosting platforms
- [ ] JWT_SECRET sync between auth server and this client
- [ ] Whether `.env` files are gitignored
- [ ] Cookie settings on external auth server
