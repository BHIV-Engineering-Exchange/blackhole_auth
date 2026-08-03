# Environment Guide — AI-CRM

**Generated:** 2026-07-05  
**Sources:** `server/.env.example`, `client/.env.example`

> Variable names only — never commit secret values.

---

## Backend Environment Variables

**File:** `Downloads/workflow-blackhole-main/server/.env.example`

### Core Application

| Variable | Default / Example | Description |
|----------|-------------------|-------------|
| `NODE_ENV` | `production` | Runtime environment |
| `PORT` | `5000` | Server port (code defaults to 5001 if unset) |
| `FRONTEND_URL` | Vercel URL | CORS and email links |
| `LOG_LEVEL` | `info` | Logging level |
| `ENABLE_PERFORMANCE_LOGS` | `false` | Performance logging |

### Database & Auth

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | JWT signing secret |

### Google OAuth (Legacy — removed from auth flow)

| Variable | Description |
|----------|-------------|
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth secret |
| `GOOGLE_REDIRECT_URI` | OAuth callback URL |

### Security & CORS

| Variable | Default | Description |
|----------|---------|-------------|
| `CORS_ORIGIN` | Vercel frontend URL | Allowed CORS origin |
| `RATE_LIMIT_WINDOW_MS` | `900000` | Rate limit window |
| `RATE_LIMIT_MAX_REQUESTS` | `100` | Max requests per window |

### Email (Nodemailer)

| Variable | Description |
|----------|-------------|
| `EMAIL_USER` | SMTP email address |
| `EMAIL_PASSWORD` | SMTP app password |

### Cloudinary

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_STORAGE_ENABLED` | Enable Cloudinary storage |
| `CLOUDINARY_CLOUD_NAME` | Cloud name |
| `CLOUDINARY_API_KEY` | API key |
| `CLOUDINARY_API_SECRET` | API secret |

### Web Push (VAPID)

| Variable | Description |
|----------|-------------|
| `VAPID_PUBLIC_KEY` | VAPID public key |
| `VAPID_PRIVATE_KEY` | VAPID private key |

### AI Services

| Variable | Default | Description |
|----------|---------|-------------|
| `AI_ANALYSIS_ENABLED` | `true` | Enable AI analysis |
| `MAX_AI_RETRIES` | `3` | AI retry count |
| `GEMINI_API_KEY` | — | Google Gemini API key |
| `GROQ_API_KEY` | — | Groq API key |
| `GROQ_MODEL` | `llama-3.3-70b-versatile` | Groq model name |

### Employee Monitoring

| Variable | Default | Description |
|----------|---------|-------------|
| `BROWSER_MONITORING_ENABLED` | `true` | Enable browser monitoring |
| `ACTIVITY_TRACKING_INTERVAL` | `60000` | Activity poll interval (ms) |
| `ACTIVITY_FLUSH_INTERVAL` | `30000` | Activity flush interval |
| `IDLE_THRESHOLD` | `900000` | Idle threshold (ms) |
| `BROWSER_CHECK_INTERVAL` | `5000` | Browser check interval |
| `WEBSITE_MONITORING_INTERVAL` | `8000` | Website check interval |
| `BROWSER_CACHE_TIMEOUT` | `2000` | Browser cache timeout |
| `BROWSER_RATE_LIMIT` | `1000` | Browser rate limit |
| `SCREEN_CAPTURE_INTERVAL` | `300000` | Screenshot interval (ms) |
| `COMPRESSION_QUALITY` | `80` | Image compression quality |
| `SCREENSHOT_QUALITY` | `80` | Screenshot quality |
| `MAX_SCREENSHOT_SIZE` | `5242880` | Max screenshot bytes |
| `SCREENSHOT_MAX_SIZE` | `1920x1080` | Max screenshot dimensions |
| `SCREENSHOT_STORAGE_PATH` | `./uploads/employee_data` | Local screenshot path |
| `ENABLE_LOCAL_BACKUP` | `false` | Local backup of screenshots |

### Attendance & Geolocation

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTO_END_DAY_ENABLED` | `true` | Auto end-day feature |
| `MAX_WORKING_HOURS` | `8` | Max working hours |
| `OFFICE_LAT` | `19.160122` | Office latitude |
| `OFFICE_LNG` | `72.839720` | Office longitude |
| `OFFICE_RADIUS` | `2000` | Geofence radius (meters) |
| `OFFICE_ADDRESS` | Mumbai address | Office address string |

---

## Frontend Environment Variables

**File:** `Downloads/workflow-blackhole-main/client/.env.example`

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:5000/api` | Backend API base (include `/api`) |

**Production (Vercel):**
```
VITE_API_URL=https://blackholeworkflow.onrender.com/api
```

> **Critical:** `client/.env.production` currently may have `localhost:5001` — causes production failures.

**Socket URL:** Derived from `VITE_API_URL` with `/api` stripped in auth-context.

---

## Local Development Example

```env
# server/.env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=<secure-random-string>
FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173

# client/.env.local
VITE_API_URL=http://localhost:5001/api
```

---

## Critical Warnings

1. **JWT fallback:** If `JWT_SECRET` unset, code uses `"jwtSecret"` — insecure
2. **Port alignment:** Set `PORT=5001` to match code default, or update code
3. **Production API URL:** Must not be localhost on Vercel
4. **Google OAuth env vars:** Present but OAuth flow removed from auth.js

---

## File Locations

| File | Purpose |
|------|---------|
| `server/.env.example` | Backend env reference |
| `server/.env` | Local runtime (gitignored) |
| `client/.env.example` | Frontend env reference |
| `client/.env.local` | Local frontend overrides |
| `client/.env.production` | Production build env |
