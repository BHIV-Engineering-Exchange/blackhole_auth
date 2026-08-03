# API Documentation — biometric-blackhole

**Generated:** 2026-07-05  
**Source:** `backend/api.py`  
**Base URL (local):** `http://localhost:5000`  
**Base URL (production):** `https://biometric-blackhole.onrender.com` — TODO: Verify

---

## Authentication

Protected routes require:

```
Authorization: Bearer <jwt_token>
```

Decorator: `@jwt_required` from `auth.py`

---

## Endpoints Summary (21 routes)

| # | Method | Path | Auth |
|---|--------|------|------|
| 1 | POST | `/api/auth/register` | No |
| 2 | POST | `/api/auth/login` | No |
| 3 | GET | `/api/auth/me` | Yes |
| 4 | GET | `/api/health` | No |
| 5 | POST | `/api/process` | Yes |
| 6 | GET | `/api/download` | **No** ⚠️ |
| 7 | POST | `/api/statistics` | **No** ⚠️ |
| 8 | POST | `/api/data/attendance-reports` | Yes |
| 9 | GET | `/api/data/attendance-reports` | Yes |
| 10 | GET | `/api/data/last-process-result` | Yes |
| 11 | GET | `/api/data/manual-users` | Yes |
| 12 | POST | `/api/data/manual-users` | Yes |
| 13 | GET | `/api/data/manual-user-daily-records` | Yes |
| 14 | POST | `/api/data/manual-user-daily-records` | Yes |
| 15 | GET | `/api/data/finalized-salaries` | Yes |
| 16 | POST | `/api/data/finalized-salaries` | Yes |
| 17 | GET | `/api/data/confirmed-salaries` | Yes |
| 18 | POST | `/api/data/confirmed-salaries` | Yes |
| 19 | GET | `/api/data/hour-rates` | Yes |
| 20 | POST | `/api/data/hour-rates` | Yes |
| 21 | POST | `/api/data/clear-all` | Yes |

---

## Auth Endpoints

### POST `/api/auth/register`

```json
// Request
{
  "email": "user@example.com",
  "password": "secret123",
  "full_name": "John Doe",
  "role": "employee"
}

// Response 201
{
  "token": "<jwt>",
  "user": {
    "id": "...",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "employee",
    "created_at": "..."
  }
}
```

Validation:
- `email`, `password`, `full_name` required
- Password min 6 characters
- Email containing `"admin"` or `"manager"` → role forced to `admin`

### POST `/api/auth/login`

```json
// Request
{ "email": "user@example.com", "password": "secret123" }

// Response 200
{ "token": "<jwt>", "user": { ... } }

// Response 401
{ "error": "Invalid email or password" }
```

### GET `/api/auth/me`

```json
// Response 200
{ "user": { "id": "...", "email": "...", "full_name": "...", "role": "..." } }
```

---

## Health

### GET `/api/health`

```json
{ "status": "healthy", "message": "API is running" }
```

---

## Processing

### POST `/api/process`

```
Content-Type: multipart/form-data
Authorization: Bearer <token>

Fields:
  file            — Excel .xlsx (required)
  year            — int (default: current year)
  month           — int (default: current month)
  max_hours       — float (default: 8.0)
  selected_dates  — JSON array string (default: [])
```

Returns processed attendance data and saves output file to temp folder.

### GET `/api/download` ⚠️

```
GET /api/download?filename=<filename>
```

Returns Excel file from server temp upload folder. **No JWT required.**

Uses `os.path.basename()` to prevent path traversal.

### POST `/api/statistics` ⚠️

```json
// Request
{
  "daily_report": [ ... ],
  "monthly_summary": [ ... ]
}

// Response
{
  "top_performer": { ... },
  "attendance_rate": 95.5,
  "hours_distribution": { "min": 0, "max": 200, "mean": 160, "median": 170 }
}
```

**No JWT required.**

---

## Data CRUD Endpoints

All require JWT. Data scoped to authenticated `user_id` (from JWT payload).

### Attendance Reports

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/data/attendance-reports` | Upsert report by year/month |
| GET | `/api/data/attendance-reports?year=&month=` | Get report for period |
| GET | `/api/data/last-process-result` | Get most recent process result |

POST body fields: `year`, `month`, `daily_report`, `monthly_summary`, `statistics`, `output_file`

### Manual Users

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/data/manual-users` | List manual users |
| POST | `/api/data/manual-users` | Create/update manual user |

### Manual User Daily Records

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/data/manual-user-daily-records` | List daily records |
| POST | `/api/data/manual-user-daily-records` | Create/update record |

### Salaries

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/data/finalized-salaries` | List finalized salaries |
| POST | `/api/data/finalized-salaries` | Save finalized salary |
| GET | `/api/data/confirmed-salaries` | List confirmed salaries |
| POST | `/api/data/confirmed-salaries` | Save confirmed salary |

### Hour Rates

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/data/hour-rates` | List hour rates |
| POST | `/api/data/hour-rates` | Upsert hour rate by employee_id |

### Clear All

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/data/clear-all` | Delete all data for authenticated user |

---

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Validation error |
| 401 | Missing/expired/invalid JWT |
| 404 | Resource not found |
| 500 | Server error |

Format: `{ "error": "message" }`

---

## CORS

Allowed origins (`backend/api.py`):
- `https://biometric-blackhole.vercel.app`
- `http://localhost:5173`, `http://localhost:5174`
- `http://localhost:3000`, `http://127.0.0.1:5173`, `http://127.0.0.1:3000`

Methods: GET, POST, PUT, DELETE, OPTIONS  
Headers: Content-Type, Authorization, X-Requested-With

---

## TODO: Verify

- [ ] Full request/response schemas for all data CRUD endpoints
- [ ] Whether PUT/DELETE methods exist (grep shows only GET/POST)
- [ ] Production API behavior matches local
