# Troubleshooting — biometric-blackhole

**Generated:** 2026-07-05  
**Sources:** Root markdown files, `backend/`, codebase

---

## Backend Startup Issues

### ModuleNotFoundError

**Cause:** Dependencies not installed.

**Fix:**
```bash
cd backend
pip install -r requirements.txt
```

---

### MongoDB Connection Failed

**Cause:** Wrong `MONGODB_URI`, IP not whitelisted, or network issue.

**Symptoms:** `ServerSelectionTimeoutError`, `MongoServerError: bad auth`

**Fix:**
1. Verify `MONGODB_URI` in `.env` or Render dashboard
2. MongoDB Atlas → Network Access → add `0.0.0.0/0` (for Render)
3. Verify database user credentials
4. Test connection:
```bash
cd backend
python -c "from database import get_db; print(get_db().list_collection_names())"
```

See also: `FIX_ENV_ERROR.md`, `ENV_SETUP_INSTRUCTIONS.md`

---

### Hardcoded URI Override

**Cause:** `database.py` has fallback URI that may differ from your `.env`.

**Fix:** Always set `MONGODB_URI` explicitly in environment. Remove hardcoded fallback from code.

---

### IndentationError on Render

**Cause:** Syntax error in `attendance_processor.py`.

**Symptoms:** Render build succeeds but service crashes on start.

**Fix:**
```bash
python -m py_compile backend/attendance_processor.py
python fix_indentation.py   # repo root helper
```

See: `RENDER_FIX_COMMANDS.md`, `FIX_RENDER.md`

---

## Authentication Issues

### 401 on All Protected Routes

**Causes:**
- Token expired (72 hours)
- Wrong `JWT_SECRET_KEY` between token creation and validation
- Token not sent in header

**Fix:**
1. Re-login to get fresh token
2. Verify `JWT_SECRET_KEY` is consistent (local vs Render)
3. Check browser localStorage for `auth_token`

See: `RE_AUTHENTICATION_FIX.md`

---

### Registration Fails — Email Already Exists

**Cause:** Duplicate email in `users` collection.

**Fix:** Use different email or delete existing user from MongoDB.

---

### Unexpected Admin Role

**Cause:** Email contains `"admin"` or `"manager"` substring.

**Fix:** Use email without those substrings, or manually update role in MongoDB.

---

## Frontend Issues

### CORS Error

**Cause:** Backend not running, wrong `VITE_API_BASE_URL`, or origin not in CORS list.

**Fix:**
1. Start backend: `python backend/api.py`
2. Verify frontend origin is in `ALLOWED_ORIGINS` in `api.py`
3. Set `VITE_API_BASE_URL` for production builds

---

### API Calls Fail in Production

**Cause:** `VITE_API_BASE_URL` not set in Vercel.

**Fix:** Set in Vercel dashboard:
```
VITE_API_BASE_URL=https://biometric-blackhole.onrender.com
```
Redeploy frontend after setting.

---

### Infinite Loading on `/`

**Cause:** `RoleBasedRedirect` waiting for auth profile.

**Fix:** Component has 5-second timeout fallback. If persistent, check `/api/auth/me` response and clear localStorage.

---

### Session Expired Redirect Loop

**Cause:** `authFetch` in `lib/auth.js` redirects to `/auth` on 401.

**Fix:** Clear localStorage keys `auth_token` and `auth_user`, then re-login.

---

## Processing Issues

### Excel Upload Fails

**Causes:**
- Wrong file format (must be `.xlsx`)
- Column headers don't match processor expectations
- File too large

**Fix:**
1. Verify file opens in Excel
2. Check `attendance_processor.py` for expected columns
3. Use `backend/create_sample.py` to generate valid sample
4. Check backend logs for traceback

---

### Empty Reports After Upload

**Cause:** Data not saved to MongoDB, or wrong year/month filter.

**Fix:**
1. Check `POST /api/data/attendance-reports` response
2. Verify year/month query params on GET match uploaded data
3. Check MongoDB directly for documents

See: `USER_DATA_ISOLATION.md`, `USER_ISOLATION_FIX.md`

---

### Download Returns 404

**Cause:** Temp file expired (server restart clears temp folder).

**Fix:** Re-process the Excel file to regenerate output file.

---

## Render Deployment Issues

### Service Won't Start

**Check:**
1. Render logs for Python traceback
2. `pip install` succeeded in build
3. `attendance_processor.py` compiles without error
4. MongoDB reachable from Render

See: `FIX_RENDER.md`, `RENDER_FIX_COMMANDS.md`

---

### Cold Start Timeout

**Cause:** Render free tier sleeps after inactivity.

**Fix:** First request may take 30–60 seconds. Retry. Consider paid plan for always-on.

---

## Vercel Deployment Issues

### Build Fails

**Check:**
1. `npm install` succeeds
2. No TypeScript errors (project uses JSX, not TS)
3. Root directory set to `frontend/`

---

## Database Issues

### Supabase 406 Error

**Cause:** Stale issue — app now uses MongoDB, not Supabase.

**Fix:** Ignore Supabase-related docs. Ensure `MONGODB_URI` is configured.

See: `SUPABASE_406_ERROR_FIX.md` (historical)

---

### Data Not Isolated Between Users

**Cause:** Missing `user_id` filter (fixed in past — see `USER_ISOLATION_FIX.md`).

**Fix:** Verify all queries in `api.py` use `g.user_id` from JWT.

---

## Quick Diagnostic Commands

```bash
# Backend health
curl http://localhost:5000/api/health

# Check processor syntax
python -m py_compile backend/attendance_processor.py

# Test MongoDB connection
cd backend && python -c "from database import init_db; init_db(); print('OK')"

# Frontend build
cd frontend && npm run build
```

---

## TODO: Verify

- [ ] Production troubleshooting steps against live environment
- [ ] Common Excel format issues and supported devices
