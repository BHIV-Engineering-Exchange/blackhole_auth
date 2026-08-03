# Known Issues — Nagar-Pranali

**Generated:** 2026-07-06  
**Sources:** Code review, `DEMO_REVIEW_PACKET.md`, `DEPLOYMENT_GUIDE.md`

---

## Critical

### 1. Schema/table name mismatches

Several routes query tables/columns that don't exist in `schema.sql`:

| File | Wrong reference | Correct |
|------|-----------------|---------|
| `server.js` `/api/dashboard` | `telemetry_events`, `replay_sessions` | `telemetry`, `replay_records` |
| `routes/telemetry.js` | `telemetry_events` | `telemetry` |
| `routes/signals.js` | column `signal_id` | column `id` |

**Impact:** 500 errors on affected GET endpoints when using canonical schema.

**Works:** `operationalController.js` demo chain uses correct table names.

---

### 2. Frontend disconnected from backend

**File:** `frontend/src/App.jsx`

All pages render hardcoded `sampleData` and static `summary` object. `services/api.js` is never imported.

**Impact:** UI does not reflect database state after demo triggers. Dashboard always shows same mock counts.

---

## High

### 3. No authentication

Auth intentionally disabled for demo (`DEPLOYMENT_GUIDE.md`). All API endpoints are public.

**Impact:** Not suitable for production without auth layer.

---

### 4. Misleading health check

**File:** `server.js` — `GET /health`

Always returns `"database": "CONNECTED"` without querying MySQL.

**Impact:** Render may report healthy service while DB is down.

---

### 5. Outdated API documentation

**File:** `UCCIS -Main/README.md`

Documents endpoints like `POST /signals/create` that don't exist. Actual write path: `POST /api/demo/{scenario}`.

---

### 6. DEPLOYMENT_GUIDE errors

- Frontend: says `npm start` — actual script is `npm run dev`
- Minimal troubleshooting guidance

---

## Medium

### 7. No automated tests

Backend `package.json`: `"test": "echo \"Error: no test specified\" && exit 1"`

No test files in repository.

---

### 8. Mocked components (documented)

From `DEMO_REVIEW_PACKET.md`:

| Component | Status |
|-----------|--------|
| TTG data | Mocked |
| Replay timeline generation | Mocked |
| Multi-user concurrency | Not supported |
| WebSocket sync | Not supported |
| Advanced analytics | Not supported |

---

### 9. Unused dependency

`react-router-dom` in frontend `package.json` — no routing implemented.

---

### 10. No foreign keys in schema

`schema.sql` creates tables without FK constraints. Orphan records possible if manual deletes occur.

---

### 11. Telemetry route ignores `:id` param

**File:** `routes/telemetry.js` — `GET /:id` runs same query as list endpoint.

---

## Low

### 12. Root README minimal

Repo root `README.md` contains only `# Nagar-Pranali`.

---

### 13. Folder name with space

`UCCIS -Main` requires quoting in shell commands — easy to miss in scripts.

---

### 14. CORS allows no-origin requests

Requests without `Origin` header are always allowed — may be intentional for curl but broad.

---

### 15. Express 5.x

Using Express 5.2 — newer major version; verify compatibility with hosting platform.

---

## Issue Priority Matrix

| Priority | Count | Action |
|----------|-------|--------|
| Critical | 2 | Fix before demo/production use |
| High | 4 | First maintenance sprint |
| Medium | 5 | Plan for next release |
| Low | 4 | Backlog |

---

## What Works (Reference)

From `DEMO_REVIEW_PACKET.md`:

- Demo chain via `POST /api/demo/*` → MySQL inserts
- `GET /api/latest-signals`, `/api/latest-incidents`, `/api/latest-runtime`
- Database records persist
- Dashboard UI renders (static data)
- CORS for Vercel + custom domain (commit `95d1f8a`)
