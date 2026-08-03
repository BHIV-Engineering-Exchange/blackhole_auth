# Environment Guide — AI-Artha

**Generated:** 2026-07-05  
**Sources:** `backend/.env.example`, `backend/.env.production.example`, `start_readme/backend.env.template`, `start_readme/frontend.env.template`

> **Security Note:** This document lists variable **names only**. Never commit real secrets. Rotate any credentials found in example files before production use.

---

## Backend Environment Variables

### Server Configuration

| Variable | Required | Default / Example | Description |
|----------|----------|-------------------|-------------|
| `NODE_ENV` | Yes | `development` / `production` | Runtime environment |
| `PORT` | No | `5000` (Render: `10000`) | HTTP server port |
| `API_VERSION` | No | `v1` | API version prefix |
| `LOG_LEVEL` | No | `debug` / `info` | Winston log level |

### Database

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string (prod/dev) |
| `MONGODB_TEST_URI` | Test only | MongoDB connection for Jest tests |

**Local example:** `mongodb://localhost:27017/artha`  
**Atlas example:** `mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/artha`

### Authentication & Security

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | Yes | JWT signing secret (min 32 chars) |
| `JWT_EXPIRES_IN` | No | Token lifetime (default: `7d`) |
| `BHIV_JWT_SECRET` | No | Alternate JWT secret (referenced in auth utils) |
| `AUTH_JWT_SECRET` | No | Alternate JWT secret |
| `BLACKHOLE_JWT_SECRET` | No | Legacy JWT secret |
| `HMAC_SECRET` | Yes | HMAC-SHA256 key for ledger hash chain |
| `APP_ID` | No | JWT app allowlist identifier |
| `BHIV_APP_ID` | No | Alternate app ID |
| `AUTH_SERVER_URL` | Prod | BHIV centralized auth server URL |

### URL Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `APP_URL` | Yes | API public base OR SPA origin (see `.env.example` comments) |
| `FRONTEND_URL` | Yes | SPA origin for redirects and CORS |
| `API_PUBLIC_URL` | Prod | Explicit API base when SPA is on different host |
| `APP_LOGIN_URL` | No | Full login redirect URL (default: `{SPA}/login`) |

### CORS

| Variable | Required | Description |
|----------|----------|-------------|
| `CORS_ORIGIN` | Yes | Primary allowed browser origin |
| `CORS_ALLOWED_ORIGINS` | No | Comma-separated additional origins |
| `ALLOW_LOCALHOST_CORS` | No | Set `false` to disable localhost CORS in prod |

### Rate Limiting

| Variable | Default | Description |
|----------|---------|-------------|
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window (15 min) |
| `RATE_LIMIT_MAX` | `100` | Max requests per window |
| `AUTH_PASSWORD_RATE_LIMIT_MAX` | — | Login rate limit |
| `AUTH_SIGNUP_RATE_LIMIT_MAX` | — | Signup rate limit |
| `TRUST_PROXY` | on | Set `0` to disable trust proxy |

### Redis (Optional)

| Variable | Description |
|----------|-------------|
| `REDIS_HOST` | Redis hostname |
| `REDIS_PORT` | Redis port |
| `REDIS_PASSWORD` | Redis password |
| `REDIS_URL` | Full Redis connection URL |
| `REDIS_DB` | Redis database number |

App works without Redis — caching is disabled.

### SETU Integration

| Variable | Default | Description |
|----------|---------|-------------|
| `SETU_ENABLED` | `false` | Enable SETU signal dispatch |
| `SETU_BASE_URL` | — | SETU API base URL |
| `SETU_API_KEY` | — | SETU API key |
| `SETU_TIMEOUT_MS` | `5000` | Request timeout |
| `SAMPADA_SETU_CORRELATION_ID` | — | Sampada correlation ID |

### InsightCore Telemetry

| Variable | Default | Description |
|----------|---------|-------------|
| `INSIGHTCORE_ENDPOINT` | `http://localhost:8000/telemetry` | Telemetry endpoint |
| `INSIGHTCORE_ENABLED` | `false` | Enable telemetry |
| `INSIGHTCORE_API_KEY` | — | API key |

### File Storage

| Variable | Default | Description |
|----------|---------|-------------|
| `STORAGE_TYPE` | `local` | `local` or `s3` |
| `AWS_BUCKET_NAME` | — | S3 bucket |
| `AWS_REGION` | — | AWS region |
| `AWS_ACCESS_KEY_ID` | — | AWS access key |
| `AWS_SECRET_ACCESS_KEY` | — | AWS secret key |

### Docker Compose Production (Root)

| Variable | Description |
|----------|-------------|
| `MONGO_ROOT_USER` | MongoDB root username |
| `MONGO_ROOT_PASSWORD` | MongoDB root password |

---

## Frontend Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_URL` | Yes | `http://localhost:5000/api/v1` | Backend API base URL |
| `VITE_API_ORIGIN` | No | — | Explicit API origin for CORS/cookie handling |

**Setup:**
```bash
cp start_readme/frontend.env.template frontend/.env
```

> Note: No `frontend/.env.example` in repository; use `start_readme/frontend.env.template`.

---

## Environment by Deployment Target

### Local Development

```env
# backend/.env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/artha
JWT_SECRET=<32+ char random string>
HMAC_SECRET=<random string>
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
SETU_ENABLED=false
STORAGE_TYPE=local

# frontend/.env
VITE_API_URL=http://localhost:5000/api/v1
```

### Production (from `.env.production.example`)

```env
NODE_ENV=production
MONGODB_URI=<Atlas URI with replica set>
JWT_SECRET=<secure secret>
AUTH_SERVER_URL=https://bhiv-auth.onrender.com
APP_URL=https://ai-artha.onrender.com
FRONTEND_URL=https://ai-artha.vercel.app
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=<secure password>
LOG_LEVEL=info
```

> TODO: Verify current production values on Render/Vercel dashboards.

---

## Configuration Generation

```bash
cd backend
npm run generate:config
```

Uses `scripts/generate-config.js` to produce production env configs.

---

## Critical Warnings

1. **HMAC_SECRET consistency:** Changing `HMAC_SECRET` after seeding invalidates all ledger hash chains. Re-seed if changed.
2. **JWT_SECRET:** Must be at least 32 characters.
3. **MongoDB replica set:** Required for transactions in production (`database.js`).
4. **CORS origins:** Must exactly match browser `Origin` header (no trailing slash).
5. **Committed secrets:** `backend/.env.production.example` contains example credentials — rotate before use.

---

## File Locations

| File | Purpose |
|------|---------|
| `backend/.env.example` | Backend env reference |
| `backend/.env.production.example` | Production env reference |
| `start_readme/backend.env.template` | Local dev template with instructions |
| `start_readme/frontend.env.template` | Frontend dev template |
| `backend/.env` | Local runtime (gitignored) |
| `frontend/.env` | Local runtime (gitignored) |
| `backend/.env.production` | Production runtime (gitignored) |
