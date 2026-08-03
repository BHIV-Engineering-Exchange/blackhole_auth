# Known Issues — biometric-blackhole

**Generated:** 2026-07-05  
**Sources:** Codebase inspection, root markdown files

Severity: 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low

---

## 🔴 Critical

### 1. Hardcoded MongoDB Credentials

**Files:** `backend/database.py` (lines 11–14), `render.yaml` (lines 17–18)

Full MongoDB Atlas connection string with username `blackholeauth_db_user` and password committed to repository.

**Action:** Rotate Atlas credentials immediately. Remove hardcoded values. Use Render secret env vars only.

---

### 2. Unauthenticated File Download

**Endpoint:** `GET /api/download?filename=<name>` (`api.py` line 177)

No `@jwt_required`. Anyone who knows a filename in the server's temp upload folder can download Excel reports.

**Action:** Add `@jwt_required` and scope to authenticated user's files.

---

### 3. Unauthenticated Statistics Endpoint

**Endpoint:** `POST /api/statistics` (`api.py` line 200)

No `@jwt_required`. Accepts arbitrary attendance data for computation.

**Action:** Add `@jwt_required`.

---

### 4. Hardcoded JWT and Password Defaults

**File:** `backend/auth.py`

```python
SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'change-this-secret-in-production-use-a-long-random-string')
salt = os.environ.get('PASSWORD_SALT', 'attendance-app-salt')
```

If env vars not set, predictable defaults used.

**Action:** Fail startup if secrets not configured.

---

## 🟠 High

### 5. Flask Dev Server in Production

**File:** `render.yaml` — `startCommand: cd backend && python api.py`

Uses Werkzeug development server. Single-threaded, not hardened for production.

**Action:** Use Gunicorn: `gunicorn -w 2 -b 0.0.0.0:$PORT api:app`

---

### 6. Weak Password Hashing

**File:** `auth.py` — `SHA256(PASSWORD_SALT + password)`

Vulnerable to rainbow tables. Single static salt for all users.

**Action:** Migrate to bcrypt or argon2.

---

### 7. Documentation References Wrong Database

Multiple files reference **Supabase** (PostgreSQL). Code uses **MongoDB Atlas** exclusively.

**Affected:** `DATABASE_MIGRATION_GUIDE.md`, `SUPABASE_406_ERROR_FIX.md`, `supabase_schema.sql`, `DEPLOYMENT.md` (partially), and others.

**Action:** Update or remove stale docs.

---

### 8. Role Assignment via Email Substring

**File:** `auth.py` lines 86–87

```python
if 'admin' in email_lower or 'manager' in email_lower:
    role = 'admin'
```

Email `notadmin@company.com` gets admin role.

**Action:** Remove auto-assignment; set roles manually.

---

## 🟡 Medium

### 9. Role-Based Routing Not Implemented

**File:** `frontend/src/App.jsx`

`RoleBasedRedirect` has extensive role/email routing logic but all paths return `/reports`. Documented in `ROLE_BASED_ROUTING.md` but not differentiated.

---

### 10. No CI/CD or Automated Tests

No `.github/workflows/`, no pytest, no frontend tests. Every push to `main` deploys directly.

---

### 11. JWT in localStorage

**File:** `frontend/src/lib/auth.js` — keys `auth_token`, `auth_user`

XSS vulnerability could steal tokens (72-hour lifetime).

---

### 12. No Rate Limiting

Auth endpoints have no rate limiting. Brute force and registration spam possible.

---

### 13. Attendance Processor IndentationError History

**Files:** `RENDER_FIX_COMMANDS.md`, `fix_indentation.py`

Past syntax errors in `attendance_processor.py` blocked Render deploys.

> TODO: Verify current file is syntactically valid: `python -m py_compile backend/attendance_processor.py`

---

### 14. Temp File Download Security

**Endpoint:** `/api/download`

Files stored in `tempfile.mkdtemp()` folder. Filenames passed via query param. Uses `os.path.basename()` for traversal protection but no ownership check.

---

## 🔵 Low

### 15. Stub Root README

`README.md` contains only `# biometric-blackhole`.

---

### 16. Orphaned Streamlit App

`backend/app.py` not referenced in `render.yaml`. Maintenance status unclear.

---

### 17. No Structured Logging/Monitoring

Basic Python logging in `api.py` only. No Sentry, no request logging middleware, no external uptime monitoring.

---

### 18. Legacy Supabase SQL Files

`supabase_schema.sql`, `supabase_schema_update.sql`, `paid_employees_migration.sql` remain in repo.

---

### 19. Many Stale Root Markdown Files

20+ markdown files at repo root, many referencing Supabase or outdated fixes.

---

## Issue Summary

| # | Issue | Severity |
|---|-------|----------|
| 1 | Hardcoded MongoDB credentials | 🔴 |
| 2 | Unauthenticated download | 🔴 |
| 3 | Unauthenticated statistics | 🔴 |
| 4 | Hardcoded JWT/password defaults | 🔴 |
| 5 | Flask dev server in production | 🟠 |
| 6 | Weak SHA256 password hashing | 🟠 |
| 7 | Supabase docs vs MongoDB code | 🟠 |
| 8 | Role via email substring | 🟠 |
| 9 | Role routing not implemented | 🟡 |
| 10 | No CI/CD or tests | 🟡 |
| 11 | JWT in localStorage | 🟡 |
| 12 | No rate limiting | 🟡 |
| 13 | Processor syntax error history | 🟡 |
| 14 | Temp file download security | 🟡 |
| 15 | Stub README | 🔵 |
| 16 | Orphaned Streamlit app | 🔵 |
| 17 | No monitoring | 🔵 |
| 18 | Legacy SQL files | 🔵 |
| 19 | Stale markdown files | 🔵 |
