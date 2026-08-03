# Known Issues — AI-CRM

**Generated:** 2026-07-05

---

## Critical

### 1. Plain-Text Password Storage
**Severity:** Critical  
**Location:** `server/routes/auth.js`

Login compares `password !== user.password` as plain strings. Password reset stores plain text. `bcryptjs` is in dependencies but not used.

### 2. JWT Fallback Secret
**Severity:** Critical  
**Location:** `server/middleware/auth.js`

Uses `"jwtSecret"` if `JWT_SECRET` env var unset.

### 3. Production Frontend API URL Broken
**Severity:** Critical  
**Location:** `client/.env.production`

Points to `http://localhost:5001` — causes `ERR_CONNECTION_REFUSED` on Vercel. Documented in `DEPLOYMENT_FIX_GUIDE.md`.

---

## Architecture & Layout

### 4. App Nested Under Downloads/
**Severity:** High  
**Location:** Repo structure

Main app at `AI-CRM/Downloads/workflow-blackhole-main/` — confusing for clones, CI, and deployment configs.

### 5. Port Mismatch
**Severity:** High  

| Source | Port |
|--------|------|
| `server/index.js` default | 5001 |
| `server/.env.example` | 5000 |
| `server/Dockerfile` EXPOSE | 5000 |
| `START_SERVERS.ps1` | 5000 |
| `client/.env.example` | 5000 |

### 6. 20+ Unmounted Route Files
**Severity:** Medium  
**Location:** `server/routes/`

Legacy route files exist but not imported in `index.js`. Risk of editing inactive code.

---

## Security

### 7. Monitoring Routes Mostly Unauthenticated
**Severity:** High  
**Location:** `server/routes/monitoring.js`

Most `/api/monitoring/*` endpoints have no auth middleware — screenshots, keystrokes, alerts accessible without token.

### 8. Public User/Password Endpoints
**Severity:** High  
**Location:** `server/routes/users.js`

`PUT /:id/password` is public (no auth). `GET /users/search` and `GET /` are public.

### 9. Public Dashboard Stats
**Severity:** Medium  
**Location:** `server/routes/dashboard.js`

Several dashboard endpoints are public without authentication.

---

## Authentication

### 10. Google OAuth Removed But Remnants Remain
**Severity:** Low  
**Location:** `auth.js` (comment line 741), `.env.example`, `AuthCallback` page

OAuth flow removed; env vars and frontend callback page still exist.

---

## Frontend

### 11. API Path Mismatches
**Severity:** Medium  
**Location:** `client/src/lib/api.js`

- Calls `/attendance/today/:userId` — may not exist on mounted routes
- `DEPLOYMENT_FIX_GUIDE` references `/biometric-attendance/*` but backend uses `/biometric/*`

### 12. Auth Profile Fallback Masks Errors
**Severity:** Low  
**Location:** `client/src/context/auth-context.jsx`

Login succeeds even if profile fetch fails.

---

## Database

### 13. No Migration Framework
**Severity:** Medium  

Schema changes via direct model edits and ad-hoc scripts — no formal migration tool.

### 14. Supabase/SQLite N/A
**Severity:** Info  

MongoDB only — no SQL fallback (unlike other repos in workspace).

---

## Deployment

### 15. No CI/CD
**Severity:** High  

No GitHub Actions, no automated test/lint/deploy pipeline.

### 16. No docker-compose
**Severity:** Low  

Single Dockerfile only; no multi-service compose file.

### 17. npm test Placeholder
**Severity:** Medium  
**Location:** `server/package.json`

`"test": "echo \"Error: no test specified\" && exit 1"`

---

## Functional (from HANDOVER_SHEET.md)

### 18. Alert Notifications Incomplete
Alerts saved to DB but push/email trigger not fully integrated.

### 19. Data Retention Cron Missing
User model has retention fields but no automated deletion job.

### 20. Task Timeline UI Missing
Backend timestamps exist; frontend timeline correlation not built.

### 21. Report Explainability UI Missing
AI analysis data in API but not displayed in frontend reports.

---

## Historical Fixes (SERVER_ERROR_FIXES.md)

- Mongoose duplicate index warnings — fixed
- ObjectId `new` keyword — fixed
- WorkSession timing validation — fixed

---

## Issue Tracking

> TODO: Verify GitHub Issues at https://github.com/blackholeinfiverse64/ai-crm/issues
