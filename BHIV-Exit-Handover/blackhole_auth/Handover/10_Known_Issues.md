# Known Issues — blackhole_auth

**Generated:** 2026-07-05  
**Sources:** Codebase inspection

Severity: 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low

---

## 🔴 Critical

### 1. Potential Committed Secrets

**File:** `backend/.env`

Contains `JWT_SECRET=blackhole-auth-super-secure-random-secret-min-32-chars`.

**No `.gitignore` found** in repository.

**Action:** Verify git history. Rotate JWT_SECRET on auth server and client if exposed. Add `.gitignore`.

---

### 2. JWT_SECRET Must Match Auth Server

**File:** `backend/src/config/env.js`

If `JWT_SECRET` on this client differs from the auth server's signing key, all `/api/me` calls return 401.

**Action:** Document and verify secret sync across deployments.

---

## 🟠 High

### 3. Stale `.env.example`

**File:** `backend/.env.example`

Lists variables not used by code:

| Variable | Issue |
|----------|-------|
| `MONGO_URI` | No database in this repo |
| `JWT_EXPIRES_IN` | Not read by code |
| `AUTH_COOKIE_NAME=bhiv_token` | Code hardcodes `blackhole_token` |
| `COOKIE_DOMAIN`, `COOKIE_SECURE`, `COOKIE_SAME_SITE` | Not read by code |

Misleading for new developers.

---

### 4. Cookie Name Mismatch

| Source | Name |
|--------|------|
| `blackholeAuth.js` line 3 | `blackhole_token` |
| `.env.example` line 6 | `bhiv_token` |

Auth server must set `blackhole_token` — the `.env.example` name is wrong.

---

### 5. No Deployment Configuration

No `render.yaml`, `vercel.json`, `Dockerfile`, or deploy scripts.

Production URLs inferred from CORS (`products.blackholeinfiverse.com`) but unverified.

---

### 6. No Root README

Repository has no top-level documentation explaining purpose, setup, or auth server dependency.

---

## 🟡 Medium

### 7. App Access Enforced Client-Side Only

**File:** `DashboardPage.jsx`

`allowedApps` check happens in React before `window.location.href = app.url`.

Backend `requireApp()` middleware exists but is **not mounted** on any route. A user could bypass UI checks (though target apps may have their own auth).

---

### 8. No CI/CD or Tests

No GitHub Actions, no Jest/Mocha tests, no frontend tests.

---

### 9. CORS Empty Default Allows All Origins

**File:** `env.js` line 17–20

If `CORS_ORIGINS` is empty, `originAllowed()` returns `true` for all origins (when `corsOrigins.length === 0`).

Acceptable for dev; risky in production if env var not set.

---

### 10. PostMessage Auth Flow Fragile

**File:** `AuthContext.jsx`

Login completion depends on auth server posting `{ type: "blackhole-auth-success" }` to the correct origin.

If auth server message format changes, login silently fails.

---

### 11. No Vite Proxy for Development

**File:** `vite.config.js` — empty config

`client.js` has special-case logic to use `localhost:8080` in dev. Cross-origin cookie behavior may differ from production.

---

### 12. Logout Redirects Away from App

**File:** `AuthContext.jsx`

`logout()` sets `window.location.href` to auth server logout URL. User leaves the dashboard entirely.

---

## 🔵 Low

### 13. Hardcoded App Catalog

**File:** `frontend/src/constants/apps.js`

Adding/removing products requires code change and redeploy.

---

### 14. No Frontend `.env.example`

Only `frontend/.env` exists (with local values).

---

### 15. Package Name Inconsistency

| Package | Name |
|---------|------|
| Backend | `bhiv-core-auth-client` |
| Frontend | `bhiv-core-dashboard` |
| Repo | `blackhole_auth` |

---

### 16. `node_modules` Present Locally

Both `backend/node_modules` and `frontend/node_modules` exist in workspace. Verify they are not committed.

---

## Issue Summary

| # | Issue | Severity |
|---|-------|----------|
| 1 | Potential committed JWT_SECRET | 🔴 |
| 2 | JWT_SECRET sync with auth server | 🔴 |
| 3 | Stale `.env.example` | 🟠 |
| 4 | Cookie name mismatch in docs | 🟠 |
| 5 | No deployment config | 🟠 |
| 6 | No root README | 🟠 |
| 7 | Client-side only app access | 🟡 |
| 8 | No CI/CD or tests | 🟡 |
| 9 | CORS allows all if unset | 🟡 |
| 10 | Fragile postMessage auth | 🟡 |
| 11 | No Vite dev proxy | 🟡 |
| 12 | Logout leaves app | 🟡 |
| 13 | Hardcoded app catalog | 🔵 |
| 14 | No frontend .env.example | 🔵 |
| 15 | Package name inconsistency | 🔵 |
| 16 | node_modules in workspace | 🔵 |
