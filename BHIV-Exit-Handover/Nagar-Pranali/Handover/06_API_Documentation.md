# API Documentation — Nagar-Pranali

**Generated:** 2026-07-06  
**Base URL (local):** `http://localhost:5000`  
**Base URL (production):** `https://nagar-pranali.onrender.com` — TODO: Verify  
**Auth:** None (demo mode)

---

## Server Routes (`server.js`)

| Method | Path | Description | DB status |
|--------|------|-------------|-----------|
| GET | `/` | System status JSON | No query |
| GET | `/health` | Health check (Render) | No real DB ping |
| GET | `/api/dashboard` | Table count summary | ⚠️ Wrong table names |
| GET | `/api/demo-status` | Demo metadata (static) | No query |
| GET | `/api/latest-signals` | Last 20 signals | ✅ |
| GET | `/api/latest-incidents` | Last 20 incidents | ✅ |
| GET | `/api/latest-runtime` | Last 20 runtime logs | ✅ |

### GET `/`

```json
{
  "system": "UCCIS",
  "status": "ONLINE",
  "database": "CONNECTED",
  "runtime": "ACTIVE",
  "timestamp": "..."
}
```

### GET `/health`

```json
{
  "success": true,
  "server": "RUNNING",
  "database": "CONNECTED",
  "runtimeEngine": "ACTIVE",
  "timestamp": "..."
}
```

> Always returns `"database": "CONNECTED"` without querying MySQL.

### GET `/api/dashboard`

Returns counts from subqueries. **Broken** if `schema.sql` used — queries `telemetry_events` and `replay_sessions` which do not exist.

---

## Demo Routes — Write Path (Primary)

**Prefix:** `/api/demo`  
**File:** `routes/demo.js` → `operationalController.js`

| Method | Path | Scenario |
|--------|------|----------|
| POST | `/api/demo/flood` | Flood Emergency |
| POST | `/api/demo/traffic` | Traffic Incident |
| POST | `/api/demo/medical` | Medical Emergency |
| POST | `/api/demo/power` | Power Failure |
| POST | `/api/demo/cyber` | Cyber Incident |

**Success response (typical):**

```json
{
  "success": true,
  "signalId": 1,
  "telemetryId": 1,
  "incidentId": 1,
  "escalationId": 1,
  "decisionId": 1,
  "replayId": 1,
  "runtimeLogId": 1
}
```

Runs full lifecycle INSERT chain into MySQL.

---

## Read Routes

### `/api/signals` — `routes/signals.js`

| Method | Path | Query | Status |
|--------|------|-------|--------|
| GET | `/api/signals/` | `SELECT * FROM signals ORDER BY signal_id DESC` | ⚠️ Column `signal_id` does not exist (PK is `id`) |
| GET | `/api/signals/:id` | `WHERE signal_id = ?` | ⚠️ Same issue |

### `/api/telemetry` — `routes/telemetry.js`

| Method | Path | Query | Status |
|--------|------|-------|--------|
| GET | `/api/telemetry/` | `SELECT * FROM telemetry_events` | ⚠️ Table is `telemetry` |
| GET | `/api/telemetry/:id` | Same (ignores `:id`) | ⚠️ Broken |

### `/api/incidents` — `routes/incidents.js`

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/incidents/` | TODO: Verify query matches schema |

### `/api/escalations` — `routes/escalations.js`

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/escalations/` | TODO: Verify |
| GET | `/api/escalations/:id` | TODO: Verify |

### `/api/decisions` — `routes/decisions.js`

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/decisions/` | TODO: Verify |
| GET | `/api/decisions/:id` | TODO: Verify |

### `/api/replay` — `routes/replay.js`

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/replay/` | TODO: Verify (table is `replay_records`) |
| GET | `/api/replay/:id` | TODO: Verify |

### `/api/runtime` — `routes/runtime.js`

| Method | Path | Status |
|--------|------|--------|
| GET | `/api/runtime/` | TODO: Verify |

---

## Documented but NOT Implemented

`UCCIS -Main/README.md` lists these — **they do not exist**:

| Documented | Actual |
|------------|--------|
| `POST /signals/create` | Use `POST /api/demo/*` |
| `POST /telemetry/add` | Use demo chain |
| `POST /incident/generate` | Use demo chain |
| `POST /escalation/create` | Use demo chain |
| `POST /decision/generate` | Use demo chain |
| `POST /replay/generate` | Use demo chain |
| `GET /runtime/logs` | Use `GET /api/runtime/` or `/api/latest-runtime` |

---

## Frontend API Client

**File:** `UCCIS -Main/frontend/src/services/api.js`

```javascript
const API = axios.create({
  baseURL: `${VITE_API_URL}/api`
});
```

**Not imported by any page component.** Wiring this is pending work.

---

## Error Responses

| Code | Format |
|------|--------|
| 404 | `{ "success": false, "message": "Route Not Found" }` |
| 500 | `{ "success": false, "error": "<mysql error message>" }` |

CORS rejection throws before route handler.

---

## Recommended Fix Order

1. Align all SQL queries with `schema.sql` table/column names
2. Wire frontend pages to API via `services/api.js`
3. Make `/health` ping MySQL with `SELECT 1`
4. Update `UCCIS -Main/README.md` API section
