# API Reference — workflow-blackhole

**Base URL (local):** `http://localhost:5000/api`  
**Production (fallback):** `https://blackholeworkflow.onrender.com/api`  
**Auth header:** `x-auth-token: <JWT>` (most protected routes)

Socket.IO: same host as API without `/api` path.

---

## Health & utility

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/ping` | No | Pong health |
| GET | `/api/test-browser-detection` | No | Linux monitoring deps check |
| POST | `/api/admin/trigger-midnight-job` | Admin | Manual midnight attendance job |

---

## Authentication

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login → JWT |
| POST | `/api/auth/register` | Register |
| GET | `/api/auth/me` | Current user |

---

## Core HR / workflow

| Prefix | Areas |
|--------|-------|
| `/api/users` | User CRUD |
| `/api/departments` | Departments |
| `/api/tasks` | Tasks |
| `/api/submissions` | Task submissions |
| `/api/progress` | Progress tracking |
| `/api/projects` | Projects |
| `/api/branches` | Branch multi-tenancy (`x-branch` header) |
| `/api/dashboard` | Dashboard aggregates (+ `dashboardFixed` enhanced APIs) |
| `/api/notifications`, `/api/user-notifications` | Notifications |
| `/api/push` | Web push subscriptions |

---

## Attendance & time

| Prefix | Notes |
|--------|-------|
| `/api/attendance` | Start/end day, upload, analytics |
| `/api/enhanced-attendance` | Enhanced flows |
| `/api/attendance/status` | Electron agent polling |
| `/api/attendance-dashboard` | Live dashboard |
| `/api/agent` | Desktop agent activity ingestion |
| `/api/biometric` | Biometric attendance/salary |
| `/api/leave` | Leave management |

---

## Salary

| Prefix | Notes |
|--------|-------|
| `/api/enhanced-salary` | Live attendance + WFH |
| `/api/hourly-salary` | Hourly calculations |
| `/api/new-salary` | New salary system |

---

## Monitoring & EMS

| Prefix | Notes |
|--------|-------|
| `/api/monitoring` | Screen capture, activity |
| `/api/ems` | EMS automation |
| `/api/ems-signals` | Mouse/keystroke/idle signals |
| `/api/consent` | Employee consent |
| `/api/alerts` | Alerts |

---

## AI & admin

| Prefix | Notes |
|--------|-------|
| `/api/ai`, `/api/new/ai` | AI routes |
| `/api/chatbot` | Admin chatbot |
| `/api/admin` | Admin operations |
| `/api/aims`, `/api/enhanced-aims` | Daily aims / goals |

---

## Procurement & testing

| Prefix | Notes |
|--------|-------|
| `/api/procurement` | Procurement agent |
| `/api/tester` | Tester role workflows |

---

## Tantra execution (deterministic participation)

**Prefix:** `/api/tantra`

### POST `/api/tantra/execution/participate`

**Middleware chain:**
- `executionAuth`
- `traceContinuity`
- `enforceGovernance`
- `enforceTenantIsolation`

**Headers (from CORS allowlist — execution/governance):**
- `X-Execution-Id`, `X-Trace-Id`, `X-Execution-Key`
- `X-Tenant-Id`
- `X-Governance-Route`, `X-Governance-Policy`, `X-Governance-Authority`, `X-Governance-Signature`

**Body:** Execution contract + `payload`, optional `outcome`

**Responses:**
- `200` — completed participation with event IDs and lineage hashes
- `423` — blocked (governance denied)
- `409` — event mismatch / continuity failure

Side effect: persists `ExecutionEvent`, updates `ExecutionSession`, optional SETU dispatch.

**TODO: Verify** — full OpenAPI schema; read `routes/tantraExecution.js` for all branches.

---

## Socket.IO events (partial)

- `attendance:day-started`, `attendance:day-ended`
- `attendance:auto-day-ended`, `attendance:auto-ended-midnight`
- `task-created`, `task-updated`
- `leave-requested`, `notification`

Client joins rooms via `socket.emit('join', [roomIds])`.

---

## Frontend API client

`client/src/lib/api.js` exports `fetchAPI(endpoint, options)` with token and branch headers.

---

## External — Sampada SETU

When enabled, server POSTs to:

`{SAMPADA_SETU_BASE_URL}/v1/setu/signals/niyantran_telemetry`

See `setuDispatcher.js` for body shape.

---

## README documented endpoints

README lists core attendance/salary/task endpoints — many more exist in code. Treat README as **subset**.
