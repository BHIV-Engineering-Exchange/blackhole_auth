# Environment Guide — Namami-Gange

**Generated:** 2026-07-06

> **Note:** No `.env.example` committed at repo root. Create env files manually per this guide.

---

## Backend Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Flask/gunicorn listen port (Render sets automatically) |
| `FRONTEND_URL` | Prod recommended | `http://localhost:3000` | CORS allowed origins (comma-separated) |
| `PYTHON_VERSION` | Render | `3.11.9` | Set in `render.yaml` |

### CORS behavior (`api.py`)

- If `FRONTEND_URL=*` → allow all origins
- Otherwise split by comma and allow each origin
- Local dev default: `http://localhost:3000`

### Production example (Render)

```env
FRONTEND_URL=http://localhost:3000,https://namami-gange.vercel.app
```

---

## Frontend Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | Prod yes | `http://localhost:5000` | Backend base URL (no trailing slash) |

### Local setup

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Production (Vercel)

```env
NEXT_PUBLIC_API_URL=https://namami-gange-api.onrender.com
```

Used in `frontend/src/services/api.ts`:

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000';
```

---

## Variables NOT Required (Current Stack)

No database connection strings in deployed API — scoring uses hardcoded entities + CSV files bundled in repo.

Referenced in `ng_data_inventory.csv` but **not configured in this repo**:

| Variable | System | Status |
|----------|--------|--------|
| Postgres DSN | ng-postgres-events | TODO: Verify external infra |
| Redis URL | ng-redis-dedup | TODO: Verify external infra |

---

## Local Setup Checklist

```bash
# Backend — no .env required for local dev (defaults work)
cd backend/src && python api.py

# Frontend
cd frontend
echo NEXT_PUBLIC_API_URL=http://localhost:5000 > .env.local
npm run dev
```

---

## Production Alignment

| Check | Render | Vercel |
|-------|--------|--------|
| `FRONTEND_URL` includes Vercel URL | ☐ | N/A |
| `NEXT_PUBLIC_API_URL` = Render URL | N/A | ☐ |
| Redeploy after env change | ☐ | ☐ |

---

## Security Notes

- No API keys or auth secrets required (open API)
- Do not expose Render/Vercel dashboard credentials
- CORS is the only access control — misconfiguration allows unwanted origins if set to `*`

---

## Recommended: Add `.env.example`

Pending work — add to repo:

```env
# backend/.env.example
PORT=5000
FRONTEND_URL=http://localhost:3000

# frontend/.env.example
NEXT_PUBLIC_API_URL=http://localhost:5000
```
