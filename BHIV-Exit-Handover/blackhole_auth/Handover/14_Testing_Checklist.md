# Testing Checklist — blackhole_auth

**Generated:** 2026-07-05  
**Note:** No automated test suite exists. All testing is manual.

---

## Pre-Test Setup

- [ ] Backend running: `npm run dev` in `backend/` → port 8080
- [ ] Frontend running: `npm run dev` in `frontend/` → port 5173
- [ ] `JWT_SECRET` set in `backend/.env` (matches auth server)
- [ ] Auth server reachable: `https://bhiv-auth.onrender.com`
- [ ] Test user account exists on auth server with known `allowedApps`

---

## Backend API Tests

### Health
- [ ] `GET /api/health` → 200, `{ "status": "ok" }`

### Auth
- [ ] `GET /api/me` without cookie → 401
- [ ] `GET /api/me` with invalid cookie → 401, cookie cleared
- [ ] `GET /api/me` with valid cookie → 200, user object

### Rate Limiting
- [ ] 300+ requests in 15 min → rate limit response (optional stress test)

### CORS
- [ ] Request from `http://localhost:5173` → allowed
- [ ] Request from unknown origin → blocked (when CORS_ORIGINS set)

---

## Frontend Tests

### Welcome Page (`/`)
- [ ] Page loads with "Welcome to BHIV Core"
- [ ] "Continue with Blackhole" links to `/login`
- [ ] Logged-in user redirected to `/dashboard`

### Login Page (`/login`)
- [ ] Email field required
- [ ] Submit opens iframe overlay
- [ ] Iframe loads auth server login URL with correct email param
- [ ] Successful auth closes overlay and redirects to dashboard
- [ ] Close button (×) closes overlay

### Dashboard (`/dashboard`)
- [ ] Requires authentication (redirect to `/login` if not)
- [ ] Shows user email
- [ ] Shows Admin/User pill based on roles
- [ ] All 5 apps displayed (Setu, Sampada, Niyantran, Gurukul, Mitra)
- [ ] Allowed apps have active "Open App" button
- [ ] Disallowed apps show "No Access" (disabled)
- [ ] Clicking allowed app redirects to correct URL
- [ ] Logout button redirects to auth server logout

### Session Persistence
- [ ] Page refresh on `/dashboard` maintains session (cookie)
- [ ] New tab with app URL maintains session

---

## Integration Tests (with Auth Server)

- [ ] Full login flow: email → popup → dashboard
- [ ] Logout clears session — `/api/me` returns 401 after logout
- [ ] postMessage from auth server triggers session refresh
- [ ] User with no allowedApps sees empty state message

---

## Security Tests

- [ ] JWT with wrong secret → 401
- [ ] Expired JWT → 401
- [ ] App access bypass attempt (direct URL navigation) — target app handles own auth
- [ ] CORS blocks unauthorized origins (production config)

---

## Production Smoke Tests

> TODO: Verify production URLs.

- [ ] `GET <backend-url>/api/health` → 200
- [ ] Frontend loads at production URL
- [ ] Full SSO login flow on production
- [ ] App launch from production dashboard

---

## Recommended Future Tests

| Type | Tool | Priority |
|------|------|----------|
| API unit tests | Jest + Supertest | High |
| JWT middleware tests | Jest | High |
| Auth flow E2E | Playwright | High |
| postMessage integration | Playwright | Medium |
| CI pipeline | GitHub Actions | High |

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | | | TODO |
| Reviewer | | | TODO |
| QA | | | TODO |
