# Known Issues — AI-Artha

**Generated:** 2026-07-05  
**Sources:** Code analysis, README, troubleshooting docs, service TODOs

---

## Documentation & API Drift

### 1. Stale README API References
**Severity:** Medium  
**Location:** `README.md`

README documents:
- `POST /api/v1/auth/register` — actual endpoint is `POST /api/v1/auth/signup`
- JWT refresh tokens — no refresh endpoint in `server.js`
- `DEPLOYMENT.md` at root — actual file is `docs/DEPLOYMENT.md`

### 2. Frontend Service Layer Path Mismatches
**Severity:** High  
**Location:** `frontend/src/services/index.js`

| Frontend Path | Backend Reality |
|---------------|-----------------|
| `/settings/company` | `GET/PUT /api/v1/settings` |
| `/gst/gstr1/:period` | `POST /api/v1/gst/gstr1/generate` |
| `/tds/pay/:id` | No matching route |
| `/tds/forms/:form` | No matching route |
| `/reports/aged-payables` | No matching route |
| `/users/:id/change-password` | No matching route |

### 3. Stale API Documentation
**Severity:** Medium  
**Location:** `docs/API-ENDPOINTS.md`

May not reflect current route structure. Cross-reference with `Handover/06_API_Documentation.md`.

---

## Routing Bugs

### 4. Trace Route Ordering Conflict
**Severity:** Medium  
**Location:** `backend/src/routes/trace.routes.js`

`GET /search` is registered **after** `GET /:traceId`. Express may interpret `/search` as `traceId=search`.

**Suggested fix:** Register `/search` before `/:traceId`.

### 5. Duplicate Ledger Route Registrations
**Severity:** Low  
**Location:** `backend/src/routes/ledger.routes.js`

Duplicate `GET /verify-chain` handler registrations exist.

### 6. Unmounted Legacy Router
**Severity:** Low  
**Location:** `backend/src/routes/index.js`

Legacy route aggregator exists but is not mounted in `server.js`.

---

## Database & Transactions

### 7. MongoDB Replica Set Required for Transactions
**Severity:** High (Production)  
**Location:** `backend/src/config/database.js`

Multi-document transactions require MongoDB replica set. Standalone local MongoDB degrades gracefully but production must use replica set.

**Symptoms:** Transaction errors, partial writes in production without replica set.

**Reference:** `start_readme/troubleshooting.md`, `SAVING_ISSUES_FIXED.md`

### 8. HMAC_SECRET Change Invalidates Ledger
**Severity:** High  
**Location:** `backend/src/models/JournalEntry.js`

Changing `HMAC_SECRET` after seeding invalidates all existing ledger hash chains. Requires re-seeding.

---

## Authentication & Authorization

### 9. Signup Defaults to Viewer Role
**Severity:** Medium  
**Location:** `backend/src/controllers/auth.controller.js`, `User.js`

New signups receive `viewer` role. Many UI actions require `admin` or `accountant`. Users may see "Access Denied" on most pages until role upgraded.

**Reference:** `start_readme/troubleshooting.md`

### 10. Refresh Token Not Implemented
**Severity:** Low  
**Location:** `User.js` schema has `refreshToken` field

No `/auth/refresh` endpoint. Tokens expire per `JWT_EXPIRES_IN` (default 7d) with no refresh mechanism.

---

## Testing & CI

### 11. Missing Jest Test Files
**Severity:** Medium  
**Location:** `backend/jest.config.js`, `backend/package.json`

Jest config expects `**/tests/**/*.test.js`. Multiple test scripts reference specific test files (e.g., `tests/ledger-chain.test.js`) that may not exist. CI `npm test` may run 0 tests.

### 12. No Frontend CI
**Severity:** Low  
**Location:** `.github/workflows/ci.yml`

CI only covers backend lint and test. No frontend build/lint in pipeline.

### 13. Main Branch Push Does Not Trigger CI
**Severity:** Low  
**Location:** `.github/workflows/ci.yml`

CI triggers on PR to `main`/`dev` and push to `dev` only. Direct pushes to `main` do not trigger CI.

---

## Security

### 14. Example Credentials in Committed Files
**Severity:** High  
**Location:** `backend/.env.production.example`, `SAVING_ISSUES_FIXED.md`

Contains example MongoDB Atlas URI and Redis password. Must be rotated before production use.

### 15. Hardcoded Redis Fallback Credentials
**Severity:** Medium  
**Location:** `backend/src/config/redis.js`

Fallback credentials used when Redis env vars are unset. Should fail closed instead.

---

## Functional Gaps

### 16. GST Summary Empty Returns Array
**Severity:** Medium  
**Location:** `backend/src/services/gstFiling.service.js`

TODO in code: GST summary may return empty `returns[]`. Documented in `docs/DASHBOARD_TRUTH_PROOF.md`.

### 17. No External Payment Gateway
**Severity:** Info  
**Location:** `banking.service.js`, `Payment.js`

Internal payment model exists but no Stripe/Razorpay/external gateway integration found.

---

## Deployment

### 18. nginx Folder Not in Repository
**Severity:** Low  
**Location:** `scripts/deploy-prod.sh`

Production nginx config and SSL directories created at deploy time, not version-controlled.

### 19. Docker Build Issues (Documented Fix)
**Severity:** Resolved (documented)  
**Location:** `docs/DOCKER_BUILD_FIX.md`

csv-parse and husky lock-file issues — fix documented and applied.

---

## Frontend

### 20. Test Pages Not Routed
**Severity:** Info  
**Location:** `frontend/src/pages/test/`

`TestInvoiceExpense.jsx`, `DebugPage.jsx` exist but are not registered in `App.jsx`.

### 21. No frontend/.env.example
**Severity:** Low  

Only `start_readme/frontend.env.template` available. README references `frontend/.env.example` which does not exist.

---

## Issue Tracking

No formal issue tracker linked in repository.

> TODO: Verify if GitHub Issues are used at https://github.com/blackholeinfiverse64/AI-Artha/issues
