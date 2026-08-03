# Environment Guide — AI-Content

**Generated:** 2026-07-05  
**Sources:** `backend/.env.example`, `backend/render.yaml`, `frontend/.env.example`

> **Security Note:** Variable names only. `render.yaml` contains hardcoded secrets — rotate immediately.

---

## Backend Environment Variables

### Database

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string (Supabase pooler) |
| `SUPABASE_URL` | Yes | Supabase project URL |
| `SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_DB_PASSWORD` | Yes | Supabase database password |

**Fallback:** SQLite (`sqlite:///./ai_agent.db`) when PostgreSQL unavailable.

### Authentication & Security

| Variable | Default | Description |
|----------|---------|-------------|
| `JWT_SECRET_KEY` | — | JWT signing secret |
| `JWT_ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Access token lifetime |
| `REFRESH_TOKEN_EXPIRE_DAYS` | `7` | Refresh token lifetime |

### Observability

| Variable | Description |
|----------|-------------|
| `SENTRY_DSN` | Sentry error tracking DSN |
| `POSTHOG_API_KEY` | PostHog analytics API key |
| `POSTHOG_HOST` | PostHog host (e.g., `https://us.posthog.com`) |
| `ENVIRONMENT` | `development` / `production` |
| `ENABLE_PERFORMANCE_MONITORING` | Enable perf monitoring |
| `ENABLE_USER_ANALYTICS` | Enable PostHog analytics |
| `ENABLE_ERROR_REPORTING` | Enable Sentry reporting |
| `ENABLE_METRICS` | Enable metrics collection |
| `GIT_SHA` | Git commit SHA for deployment tracking |

### Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `USE_S3_STORAGE` | `false` | Enable S3 storage |
| `USE_SUPABASE_STORAGE` | `true` | Enable Supabase storage |
| `BHIV_STORAGE_BACKEND` | `supabase` | Backend: `supabase`, `s3`, `local` |
| `S3_BUCKET_NAME` | — | S3 bucket name |
| `S3_REGION` | — | AWS region |
| `AWS_ACCESS_KEY_ID` | — | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | — | AWS secret key |
| `SUPABASE_BUCKET_NAME` | — | Supabase storage bucket |
| `BHIV_BUCKET_PATH` | `bucket` | Local JSON bucket path |

### Performance & Rate Limiting

| Variable | Default | Description |
|----------|---------|-------------|
| `REDIS_URL` | `redis://localhost:6379` | Redis connection |
| `MAX_UPLOAD_SIZE_MB` | `100` | Max upload body size |
| `RATE_LIMIT_REQUESTS_PER_MINUTE` | `60` | Rate limit threshold |
| `MAX_FILE_SIZE_MB` | `100` | Max individual file size |
| `ALLOWED_FILE_TYPES` | txt,pdf,doc,... | Comma-separated allowed types |

### GDPR & Privacy

| Variable | Default | Description |
|----------|---------|-------------|
| `DATA_RETENTION_DAYS` | `365` | Data retention period |
| `AUTO_DELETE_EXPIRED_DATA` | `true` | Auto-delete expired data |
| `GDPR_CONTACT_EMAIL` | — | Privacy contact email |

### Server Configuration

| Variable | Default | Description |
|----------|---------|-------------|
| `API_HOST` | `0.0.0.0` | Server bind host |
| `API_PORT` | `9000` | Server port (local) |
| `API_WORKERS` | `1` | Uvicorn workers |
| `CORS_ORIGINS` | `*` | CORS allowed origins |
| `DEBUG` | `false` | Debug mode |
| `LOG_LEVEL` | `INFO` | Log level |
| `PYTHON_VERSION` | `3.12` | Python version |
| `TEMP_DIR` | `temp` | Temporary file directory |

### Video Generation

| Variable | Default | Description |
|----------|---------|-------------|
| `VIDEO_OUTPUT_FORMAT` | `mp4` | Output video format |
| `VIDEO_QUALITY` | `medium` | Video quality setting |
| `MAX_VIDEO_DURATION_SECONDS` | `300` | Max video duration |

### AI/ML

| Variable | Default | Description |
|----------|---------|-------------|
| `RL_LEARNING_RATE` | `0.1` | RL agent learning rate |
| `RL_DISCOUNT_FACTOR` | `0.9` | RL discount factor |
| `RL_EXPLORATION_RATE` | `0.1` | RL exploration rate |
| `BHIV_LM_URL` | — | LLM API URL (Perplexity) |
| `BHIV_LM_API_KEY` | — | LLM API key |
| `PERPLEXITY_API_KEY` | — | Perplexity API key (Render secret) |

### Background Tasks

| Variable | Default | Description |
|----------|---------|-------------|
| `TASK_QUEUE_BACKEND` | `memory` | `memory` or `celery` |
| `TASK_RETRY_ATTEMPTS` | `3` | Task retry count |
| `TASK_TIMEOUT_SECONDS` | `300` | Task timeout |

---

## Frontend Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:9000` | Backend API base URL |
| `VITE_API_BASE_URL` | `http://localhost:9000` | Alternate API base |
| `VITE_APP_NAME` | `"AI Content Generator"` | App display name |
| `VITE_APP_TAGLINE` | Tagline string | App tagline |

**Production example:**
```env
VITE_API_URL=https://ai-agent-aff6.onrender.com
VITE_API_BASE_URL=https://ai-agent-aff6.onrender.com
```

---

## Environment by Target

### Local Development

```env
# backend/.env
DATABASE_URL=postgresql://...  # or leave empty for SQLite fallback
JWT_SECRET_KEY=<secure-random-string>
API_PORT=9000
ENVIRONMENT=development
BHIV_STORAGE_BACKEND=local
DEBUG=false
LOG_LEVEL=INFO

# frontend/.env
VITE_API_URL=http://localhost:9000
```

### Production (Render)

Key vars from `render.yaml` (names only — rotate values):
- `DATABASE_URL`, `JWT_SECRET_KEY`, `ENVIRONMENT=production`
- `BHIV_LM_URL`, `PERPLEXITY_API_KEY`, `BHIV_STORAGE_BACKEND`
- `SENTRY_DSN`, `POSTHOG_API_KEY`, `POSTHOG_HOST`

---

## Critical Warnings

1. **`render.yaml` contains hardcoded secrets** — DATABASE_URL, JWT_SECRET_KEY, SENTRY_DSN, POSTHOG_API_KEY are committed. Rotate all immediately.
2. **`config.py` hardcoded Supabase fallback** — review and remove before production.
3. **CORS set to `*`** — restrict in production.
4. **Demo credentials exposed** via `GET /demo-login` — disable in production if not needed.

---

## File Locations

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend env reference |
| `backend/.env` | Local runtime (gitignored) |
| `frontend/.env.example` | Frontend env reference |
| `frontend/.env` | Local runtime (gitignored) |
| `backend/render.yaml` | Render deployment env vars |
