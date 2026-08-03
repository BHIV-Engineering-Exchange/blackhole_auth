# Environment Guide — Nagar-Pranali

**Generated:** 2026-07-06  
**Backend template:** `UCCIS -Main/backend/.env.example`  
**Frontend template:** `UCCIS -Main/frontend/.env.example`

---

## Backend Variables

| Variable | Required | Default (local) | Description |
|----------|----------|-----------------|-------------|
| `PORT` | No | `5000` | Express listen port (Render sets automatically) |
| `DB_HOST` | Yes | `localhost` | MySQL host |
| `DB_USER` | Yes | `root` | MySQL username |
| `DB_PASSWORD` | Yes | `password` | MySQL password |
| `DB_NAME` | Yes | `uccis` | Database name |
| `DB_SSL` | No | `false` (local) | Set `"true"` for production SSL |
| `FRONTEND_URL` | Prod recommended | See example | Comma-separated allowed CORS origins |

### Backend `.env.example`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=uccis
DB_SSL=false
FRONTEND_URL=https://nagar-pranali.vercel.app,https://nagar-pranali.blackholeinfiverse.app
```

### Render additional vars (`render.yaml`)

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `DB_SSL` | `"true"` |

All `DB_*` and `FRONTEND_URL` marked `sync: false` — set manually in Render dashboard.

---

## Frontend Variables

| Variable | Required | Default (local) | Description |
|----------|----------|-----------------|-------------|
| `VITE_API_URL` | No | `http://localhost:5000` | Backend base URL (no trailing slash) |

### Frontend `.env.example`

```env
VITE_API_URL=http://localhost:5000
# VITE_API_URL=https://nagar-pranali.onrender.com
```

Used by `services/api.js` — but **pages do not call API yet**.

Set in **Vercel dashboard** for production.

---

## CORS Behavior

Configured in `server.js`:

1. If no `Origin` header → allow
2. If `FRONTEND_URL` unset → allow all
3. Otherwise check:
   - Exact match in `FRONTEND_URL` list
   - `https://*.vercel.app`
   - `https://*.blackholeinfiverse.app`
   - `http://localhost:*`

---

## Local Setup

```bash
# Backend
cd "UCCIS -Main/backend"
copy .env.example .env
# Edit DB credentials

# Frontend
cd "UCCIS -Main/frontend"
copy .env.example .env
```

Restart backend after env changes.

---

## Production Alignment

| Check | Backend (Render) | Frontend (Vercel) |
|-------|------------------|-------------------|
| MySQL reachable | `DB_*` set, SSL on | N/A |
| CORS | `FRONTEND_URL` includes Vercel + custom domain | N/A |
| API URL | N/A | `VITE_API_URL` = Render backend URL |

---

## Security Notes

- No auth secrets required (auth disabled)
- **Do not commit** `.env` files with real DB passwords
- Rotate MySQL credentials on ownership transfer
- `DB_SSL=true` recommended for production MySQL connections

---

## Troubleshooting Env

| Symptom | Fix |
|---------|-----|
| CORS error from Vercel | Add frontend URL to `FRONTEND_URL` on Render |
| DB connection fails | Verify `DB_HOST`, credentials, SSL setting |
| Frontend calls wrong API | Set `VITE_API_URL` in Vercel (when wired) |
| Port conflict locally | Change `PORT` in backend `.env` |
