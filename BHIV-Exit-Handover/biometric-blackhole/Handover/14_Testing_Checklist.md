# Testing Checklist — biometric-blackhole

**Generated:** 2026-07-05  
**Note:** No automated test suite exists. All testing is manual.

---

## Pre-Test Setup

- [ ] Backend running: `python backend/api.py` → port 5000
- [ ] Frontend running: `npm run dev` in `frontend/` → port 5173
- [ ] MongoDB accessible (Atlas or local)
- [ ] Environment variables set (`MONGODB_URI`, `JWT_SECRET_KEY`, `PASSWORD_SALT`)
- [ ] Sample Excel file available (use `backend/create_sample.py` if needed)

---

## Backend API Tests

### Health
- [ ] `GET /api/health` → 200, `{"status": "healthy", "message": "API is running"}`

### Auth
- [ ] `POST /api/auth/register` with valid data → 201 + token
- [ ] `POST /api/auth/register` with duplicate email → 400
- [ ] `POST /api/auth/register` with password < 6 chars → 400
- [ ] `POST /api/auth/login` with valid credentials → 200 + token
- [ ] `POST /api/auth/login` with wrong password → 401
- [ ] `GET /api/auth/me` with valid token → 200 + user profile
- [ ] `GET /api/auth/me` with invalid token → 401
- [ ] `GET /api/auth/me` without token → 401

### Processing
- [ ] `POST /api/process` with valid Excel + JWT → 200 + processed data
- [ ] `POST /api/process` without file → 400
- [ ] `POST /api/process` without JWT → 401

### Data CRUD
- [ ] `POST /api/data/attendance-reports` → saves report
- [ ] `GET /api/data/attendance-reports?year=&month=` → returns saved report
- [ ] `GET /api/data/last-process-result` → returns recent result
- [ ] `POST /api/data/hour-rates` → saves rate
- [ ] `GET /api/data/hour-rates` → returns rates
- [ ] `POST /api/data/manual-users` → creates user
- [ ] `GET /api/data/manual-users` → returns users
- [ ] `POST /api/data/finalized-salaries` → saves salary
- [ ] `GET /api/data/finalized-salaries` → returns salaries
- [ ] `POST /api/data/confirmed-salaries` → saves confirmed salary
- [ ] `GET /api/data/confirmed-salaries` → returns confirmed salaries
- [ ] `POST /api/data/clear-all` → deletes all user data

### Security (Known Issues)
- [ ] `GET /api/download?filename=test.xlsx` without JWT → currently works ⚠️
- [ ] `POST /api/statistics` without JWT → currently works ⚠️
- [ ] Register with email containing "admin" → gets admin role ⚠️

---

## Frontend Tests

### Auth Page (`/auth`)
- [ ] Register form submits successfully
- [ ] Login form submits successfully
- [ ] Invalid credentials show error
- [ ] Successful login redirects to `/reports`

### Upload Page (`/upload`)
- [ ] Page requires authentication (redirects to `/auth` if not logged in)
- [ ] File picker accepts `.xlsx`
- [ ] Upload processes file and shows result
- [ ] Error shown for invalid file

### Reports Page (`/reports`)
- [ ] Page requires authentication
- [ ] Attendance data displays after upload
- [ ] Hour rates can be viewed/edited
- [ ] Salary data displays
- [ ] Export/download button works
- [ ] Clear all data works

### Session Handling
- [ ] Page refresh maintains login (localStorage token)
- [ ] 401 response redirects to `/auth`
- [ ] Logout clears token and redirects

---

## Data Isolation Tests

- [ ] Register User A, upload data
- [ ] Register User B, upload different data
- [ ] User A cannot see User B's data
- [ ] User B cannot see User A's data

---

## Production Smoke Tests

> TODO: Verify production URLs before running.

- [ ] `GET https://biometric-blackhole.onrender.com/api/health` → 200
- [ ] `https://biometric-blackhole.vercel.app` loads
- [ ] Register on production frontend
- [ ] Upload Excel on production
- [ ] Data appears in reports

---

## Regression Tests

After changes to `attendance_processor.py`:
- [ ] `python -m py_compile backend/attendance_processor.py` passes
- [ ] Same sample Excel produces consistent output
- [ ] Render deploy succeeds

---

## Recommended Future Tests

| Type | Tool | Priority |
|------|------|----------|
| API unit tests | pytest + Flask test client | High |
| Auth flow tests | pytest | High |
| Processor tests | pytest + sample fixture | High |
| Frontend tests | Vitest | Medium |
| E2E tests | Playwright | Medium |
| CI pipeline | GitHub Actions | High |

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | | | TODO |
| Reviewer | | | TODO |
| QA | | | TODO |
