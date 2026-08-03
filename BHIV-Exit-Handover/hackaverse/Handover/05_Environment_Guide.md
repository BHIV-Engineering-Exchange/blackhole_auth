# Environment Guide — hackaverse

**Generated:** 2026-07-05  
**Full reference:** `ENV_REFERENCE.md` (repo root)  
**Backend template:** `hackathon/.env.example`  
**Frontend template:** `hackaverse-frontend/.env.example`

---

## Backend — Required Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | For full mode | None | MongoDB Atlas connection string |
| `JWT_SECRET` | Yes | dev placeholder | JWT signing secret |
| `API_KEY` | Yes (prod) | None | X-API-Key header validation |
| `GROQ_API_KEY` | Prod + AI judge | None | Groq LLM for judging |
| `ENV` | No | `development` | `production` triggers stricter checks |
| `JUDGE_MODE` | No | `ai` | `ai` or `demo` |
| `BUCKET_DB_NAME` | No | `hackaverse_db` | MongoDB database name |
| `ALLOWED_ORIGINS` | Prod recommended | dev localhost list | CORS origins (comma-separated) |

---

## Backend — Security & App Config

| Variable | Description |
|----------|-------------|
| `JWT_EXPIRY_HOURS` | Token lifetime (default 24) |
| `AUTHOR_PASSWORD` | Privileged admin operations password |
| `SECURITY_SECRET_KEY` | HMAC request signature enforcement |
| `API_KEY` | Client API key — blocks `default_key` in production |

---

## Backend — AI / Judging

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key |
| `GROQ_MODEL` | Default `llama-3.1-8b-instant` |
| `JUDGE_MODE` | `ai` or `demo` |
| `JUDGING_CRITERIA` | Comma-separated criteria |
| `MAX_SCORE_PER_CRITERIA` | Default 10 |

---

## Backend — Email

| Variable | Description |
|----------|-------------|
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | SMTP config |
| `EMAIL_OUTBOX_FALLBACK` | Write emails to disk if SMTP unavailable |
| `EMAIL_OUTBOX_DIR` | Outbox directory |

See `hackathon/.env.email.example` for email-specific template.

---

## Backend — BHIV Integration

| Variable | Description |
|----------|-------------|
| `BHIV_CORE_URL` | BHIV Core integration URL |
| `BHIV_BUCKET_DIR` | Local bucket storage path |
| `DATABASE_TYPE` | `json` fallback mode option |

---

## Frontend Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_API_URL` | Yes (prod) | Backend base URL (without `/api/v1` — appended automatically) |
| `VITE_API_KEY` | Yes (prod) | Must match backend `API_KEY` |
| `VITE_NODE_ENV` | No | `development` or `production` |
| `VITE_USE_MOCK_API` | No | Enable mock server for frontend-only dev |
| `VITE_APP_NAME` | No | Display name |

Resolved API base (`appConstants.js`):
```javascript
// DEV with empty VITE_API_URL → '/api/v1' (Vite proxy)
// PROD → `${VITE_API_URL}/api/v1`
```

---

## Render Secrets (Production)

Set in Render dashboard (`sync: false` in render.yaml):

- `API_KEY`
- `JWT_SECRET`
- `MONGODB_URI`
- `GROQ_API_KEY`

Non-secret in render.yaml:
- `ENV=production`
- `ALLOWED_ORIGINS` (3 domains)
- `BHIV_CORE_URL` (placeholder)

---

## Vercel Variables (Production)

```env
VITE_API_URL=https://hackaverse.blackholeinfiverse.com
VITE_API_KEY=<match backend>
VITE_NODE_ENV=production
```

> TODO: Verify values in Vercel dashboard.

---

## Startup Behavior

| Condition | Result |
|-----------|--------|
| Missing `MONGODB_URI` | Degraded mode — backend starts, DB unavailable |
| `ENV=production` + `JUDGE_MODE=ai` + no `GROQ_API_KEY` | **Startup fails** |
| `API_KEY=default_key` in production | API key validation returns 500 |

---

## Local Setup

```bash
# Backend
cd hackathon && cp .env.example .env
# Fill: MONGODB_URI, JWT_SECRET, API_KEY, GROQ_API_KEY

# Frontend
cd hackaverse-frontend && cp .env.example .env
# Set: VITE_API_URL=http://localhost:8000, VITE_API_KEY=<same as backend>
```

---

## TODO: Verify

- [ ] All production secrets rotated and not in git history
- [ ] Vercel `VITE_API_URL` matches canonical backend
- [ ] Atlas cluster: `cluster0.oeh93tq.mongodb.net` per `.env.example`
