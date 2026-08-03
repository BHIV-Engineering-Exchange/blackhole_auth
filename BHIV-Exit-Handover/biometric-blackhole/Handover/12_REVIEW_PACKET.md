# Review Packet — biometric-blackhole

**Generated:** 2026-07-05  
**System:** Attendance Processing System / Biometric Blackhole  
**Review Time:** < 10 minutes

---

## Entry Points

| File | Purpose |
|------|---------|
| `backend/api.py` | Flask REST API — production entry |
| `backend/auth.py` | JWT authentication |
| `backend/database.py` | MongoDB connection + indexes |
| `backend/attendance_processor.py` | Excel parsing + salary logic |
| `frontend/src/App.jsx` | React routing + auth guards |
| `frontend/src/contexts/AuthContext.jsx` | Auth state |
| `frontend/src/pages/Reports.jsx` | Main dashboard |
| `render.yaml` | Render deployment config |

---

## Core Execution Flow

```
1. User registers/logs in → JWT token (72hr)
       ↓
2. POST /api/process → Excel parsed → hours/salary calculated
       ↓
3. POST /api/data/attendance-reports → saved to MongoDB
       ↓
4. GET /api/data/attendance-reports → displayed on /reports
       ↓
5. GET /api/download?filename=... → Excel export (⚠️ no auth)
```

---

## Critical Files

| File | Purpose |
|------|---------|
| `backend/api.py` | 21 REST routes, CORS, JWT middleware |
| `backend/auth.py` | Register, login, `@jwt_required` |
| `backend/database.py` | MongoDB client, `init_db()` indexes |
| `backend/attendance_processor.py` | Core business logic |
| `frontend/src/lib/auth.js` | Token storage (localStorage) |
| `frontend/src/services/apiService.js` | API calls |
| `render.yaml` | Production deploy (⚠️ hardcoded secrets) |

---

## Live Runtime Verification

### Backend (local)

```bash
cd backend
pip install -r requirements.txt
# Set MONGODB_URI, JWT_SECRET_KEY, PASSWORD_SALT in .env
python api.py

curl http://localhost:5000/api/health
# Expected: {"status": "healthy", "message": "API is running"}
```

### Frontend (local)

```bash
cd frontend
npm install
npm run dev
# Open http://localhost:5173/auth
```

### Production

```bash
curl https://biometric-blackhole.onrender.com/api/health
curl -I https://biometric-blackhole.vercel.app
```

> TODO: Verify production URLs are live.

---

## Architecture at a Glance

```
React SPA (Vite/Tailwind)
    ↓ HTTPS + JWT
Flask API (:5000)
    ↓
AttendanceProcessor (pandas/openpyxl)
    ↓
MongoDB Atlas (biometric_attendance)
```

---

## Key Metrics to Verify

| Check | Endpoint/Action | Expected |
|-------|-----------------|----------|
| API health | `GET /api/health` | 200, `"status": "healthy"` |
| Auth works | `POST /api/auth/register` | 201 + token |
| Process works | `POST /api/process` + Excel | 200 + data |
| Data persists | `GET /api/data/attendance-reports` | Saved report |
| Production backend | `GET .../api/health` | 200 |
| Production frontend | Browser load | Login page |

---

## Review Flags

1. **Hardcoded MongoDB credentials** in `database.py` and `render.yaml` — rotate before sign-off
2. **Unauthenticated `/api/download` and `/api/statistics`** — security risk
3. **Flask dev server in production** — not Gunicorn
4. **Supabase docs stale** — code uses MongoDB
5. **No CI/CD or tests** — deploy without quality gate
6. **Role routing documented but not implemented** — all roles → `/reports`

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] Start backend: `python api.py`
- [ ] Hit `GET /api/health`
- [ ] Register test user via curl or frontend
- [ ] Start frontend: `npm run dev`
- [ ] Upload sample Excel on `/upload`
- [ ] Verify data on `/reports`
- [ ] Check production: `curl .../api/health`
- [ ] Review `Handover/10_Known_Issues.md`
- [ ] Confirm secrets rotation plan documented

---

## Certification / Evidence

| Artifact | Location |
|----------|----------|
| Deployment guide | `DEPLOYMENT.md` |
| Backend docs | `backend/README.md`, `backend/COMPLETION_SUMMARY.md` |
| Render fix notes | `RENDER_FIX_COMMANDS.md`, `FIX_RENDER.md` |
| User isolation fix | `USER_ISOLATION_FIX.md` |

---

## Related Documents

- Full API: `Handover/06_API_Documentation.md`
- Architecture: `Handover/04_Architecture.md`
- Deployment: `Handover/03_Deployment_Guide.md`
- Known issues: `Handover/10_Known_Issues.md`
