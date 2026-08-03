# Troubleshooting — AI-CRM

**Generated:** 2026-07-05  
**App path:** `Downloads/workflow-blackhole-main/`

---

## Server Won't Start

### MongoServerError / ECONNREFUSED MongoDB

**Fix:**
```env
# server/.env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/dbname
```

Verify Atlas IP whitelist includes your IP (or 0.0.0.0/0 for dev).

---

### Port Already in Use

**Cause:** Port 5000 or 5001 occupied.

**Fix:**
```powershell
# Find process on port
netstat -ano | findstr :5001
# Kill or change PORT in .env
PORT=5002
```

Align `client/.env.local`:
```env
VITE_API_URL=http://localhost:5002/api
```

---

### Cannot Find Module

**Fix:**
```bash
cd Downloads/workflow-blackhole-main/server
npm install
```

---

## Authentication Errors

### 401 / Token Invalid

**Causes:**
1. Missing `x-auth-token` header (not `Authorization: Bearer`)
2. Expired JWT (180-day expiry)
3. Wrong `JWT_SECRET` between restarts

**Fix:**
1. Clear localStorage: `WorkflowToken`, `WorkflowUser`
2. Re-login at `/login`
3. Ensure consistent `JWT_SECRET` in `.env`

---

### Login Fails with Correct Password

**Cause:** Password stored as plain text — must match exactly (case-sensitive).

**Fix:** Check password in MongoDB directly or use seed script:
```bash
node scripts/seedAdmin.js
```

---

## Frontend Connection Errors

### ERR_CONNECTION_REFUSED (Production)

**Cause:** Frontend calling `localhost:5001` from Vercel browser.

**Fix:** Set on Vercel:
```
VITE_API_URL=https://blackholeworkflow.onrender.com/api
```
Redeploy. See `DEPLOYMENT_FIX_GUIDE.md`.

---

### CORS Error

**Fix:**
```env
# server/.env
CORS_ORIGIN=http://localhost:5173
FRONTEND_URL=http://localhost:5173
```

For production, set to exact Vercel URL.

---

## Socket.IO Issues

**Cause:** Socket URL derived from API URL incorrectly.

**Fix:** Ensure `VITE_API_URL` includes `/api` suffix. Socket strips `/api` automatically.

Check browser console for Socket connection errors.

---

## Monitoring / Screenshot Issues

### Screenshots Not Capturing (Linux)

**Fix:** Install dependencies:
```bash
sudo apt install xdotool scrot imagemagick xvfb
```

Test: `GET /api/test-browser-detection`

### Cloudinary Upload Fails

**Fix:**
```env
CLOUDINARY_STORAGE_ENABLED=true
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

---

## Video/AI Issues

### Groq AI Insights Fail

**Fix:**
```env
GROQ_API_KEY=your_key
GROQ_MODEL=llama-3.3-70b-versatile
AI_ANALYSIS_ENABLED=true
```

Test: `GET /api/ai/insights`

### Gemini Analysis Fails

**Fix:**
```env
GEMINI_API_KEY=your_key
```

---

## Attendance Issues

### Start Day Fails / Geolocation Error

**Fix:** Check office coordinates in `.env`:
```env
OFFICE_LAT=19.160122
OFFICE_LNG=72.839720
OFFICE_RADIUS=2000
```

For WFH testing, update user work-mode via admin.

### Midnight Auto-End Not Running

**Cause:** Server must be running at midnight for cron job.

Check logs for midnight job execution. Manual trigger:
```bash
curl -X POST http://localhost:5001/api/admin/trigger-midnight-job \
  -H "x-auth-token: <admin-token>"
```

---

## Email Issues

### EMS Emails Not Sending

**Fix:**
```env
EMAIL_USER=your@gmail.com
EMAIL_PASSWORD=your-app-password
```

Gmail requires App Password with 2FA enabled.

Test: `POST /api/ems/send-daily-reminders`

---

## Salary Calculation Issues

### Biometric Salary 404

**Cause:** Frontend may call `/api/biometric-attendance/*` but backend uses `/api/biometric/*`.

**Fix:** Update frontend API paths or add route alias.

---

## Quick Diagnostic Commands

```bash
# Health
curl http://localhost:5001/api/ping

# Login test
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'

# Browser detection (Linux)
curl http://localhost:5001/api/test-browser-detection
```

---

## Log Locations

| Environment | Location |
|-------------|----------|
| Local | Console + `server/server.log` |
| PM2 | `pm2 logs infiverse-server` |
| Render | Render dashboard logs |

Set `LOG_LEVEL=debug` for verbose output.

---

## Escalation

1. `Handover/10_Known_Issues.md`
2. `server/Complete-Infiverse-main/HANDOVER_SHEET.md`
3. `DEPLOYMENT_FIX_GUIDE.md`
4. `server/DEPLOYMENT.md`

> TODO: Verify support contact.
