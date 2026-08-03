# Architecture — biometric-blackhole

**Generated:** 2026-07-05

---

## High-Level Overview

```
┌─────────────────┐     HTTPS/JWT      ┌──────────────────────┐
│  React Frontend │ ◄────────────────► │  Flask REST API      │
│  (Vercel)       │   /api/*           │  (Render)            │
│  Vite + fetch   │                    │  backend/api.py      │
└─────────────────┘                    └──────────┬───────────┘
                                                  │
                                                  │ PyMongo
                                                  ▼
                                       ┌──────────────────────┐
                                       │  MongoDB Atlas       │
                                       │  biometric_attendance│
                                       └──────────────────────┘

┌─────────────────┐
│  Streamlit UI   │  (standalone — not in production deploy)
│  backend/app.py │
└─────────────────┘
```

---

## Request Flow — Attendance Processing

```
1. User registers/logs in → JWT issued (72hr expiry)
       ↓
2. User uploads Excel on /upload → POST /api/process (multipart + JWT)
       ↓
3. attendance_processor.py parses Excel, calculates hours/salary
       ↓
4. Results returned + saved via POST /api/data/attendance-reports
       ↓
5. User views/edits on /reports via /api/data/* CRUD endpoints
       ↓
6. Export via GET /api/download?filename=... (⚠️ no auth)
```

---

## Backend Components

| File | Role |
|------|------|
| `api.py` | Flask app, 21 REST routes, CORS, JWT middleware |
| `auth.py` | Register, login, `@jwt_required` decorator |
| `database.py` | MongoDB client, indexes, `get_db()` |
| `attendance_processor.py` | Excel parsing, hour/salary calculation |
| `app.py` | Streamlit dashboard (alternate UI) |
| `config.py` | App configuration |

---

## Frontend Components

| Route | Page | Auth |
|-------|------|------|
| `/auth` | Login / Register | No |
| `/upload` | Excel upload | Yes |
| `/reports` | Data tables, charts, export | Yes |
| `/` | Role-based redirect → `/reports` | Yes |

**Auth state:** `AuthContext.jsx` + `localStorage` (`auth_token`, `auth_user`)

**API client:** `services/apiService.js` + `lib/auth.js` (`authFetch` with 401 redirect)

---

## Authentication

```
Register/Login → SHA256(PASSWORD_SALT + password) → stored hash
              → JWT signed with JWT_SECRET_KEY (HS256, 72hr)
              → Authorization: Bearer <token>
```

Role logic on register (`auth.py`):
- Email contains `"admin"` or `"manager"` → role forced to `admin`
- Otherwise uses provided role (default `employee`)

---

## Database — MongoDB

**Not Supabase.** Legacy SQL files in repo are obsolete.

### Collections

| Collection | Scoped by `user_id` | Purpose |
|------------|---------------------|---------|
| `users` | N/A | Auth credentials |
| `attendance_reports` | Yes | Monthly reports (year/month unique per user) |
| `manual_users` | Yes | Manual employee records |
| `manual_user_daily_records` | Yes | Daily hour entries |
| `hour_rates` | Yes | Per-employee rates |
| `finalized_salaries` | Yes | Computed salaries |
| `confirmed_salaries` | Yes | Approved salaries |

Indexes created in `init_db()` — see `07_Database_Details.md`.

---

## API Route Categories

| Category | Prefix | Auth |
|----------|--------|------|
| Auth | `/api/auth/*` | Mixed |
| Health | `/api/health` | No |
| Processing | `/api/process` | Yes |
| Download/Stats | `/api/download`, `/api/statistics` | **No** ⚠️ |
| Data CRUD | `/api/data/*` | Yes |

---

## Deployment Architecture

| Service | Platform | Entry |
|---------|----------|-------|
| Backend | Render (free) | `cd backend && python api.py` |
| Frontend | Vercel | `npm run build` → `dist/` |
| Database | MongoDB Atlas | Env var `MONGODB_URI` |

---

## Data Processing Pipeline

```
Excel (.xlsx) upload
    │
    ▼
AttendanceProcessor (pandas + openpyxl)
    ├── Parse employee ID, name, dates, in/out times
    ├── Apply max_hours, selected_dates filters
    ├── Calculate daily hours, overtime
    ├── Apply hour_rates from MongoDB
    └── Generate output Excel in temp folder
    │
    ▼
MongoDB (attendance_reports, finalized_salaries, etc.)
    │
    ▼
React /reports (Recharts charts, jsPDF export)
```

---

## TODO: Verify

- [ ] Production URLs live
- [ ] Streamlit app maintenance status
- [ ] Exact Excel column format supported by processor
