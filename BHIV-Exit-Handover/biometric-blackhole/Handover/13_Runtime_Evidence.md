# Runtime Evidence — biometric-blackhole

**Generated:** 2026-07-05  
**Purpose:** Placeholder and reference guide for runtime proof artifacts

---

## Existing Evidence Files

| File | Location | Description |
|------|----------|-------------|
| `COMPLETION_SUMMARY.md` | `backend/` | Project completion notes |
| `DELIVERABLES.md` | `backend/` | Deliverables list |
| `CODE_CHANGES_SUMMARY.md` | Root | Change log |
| `SETUP_COMPLETE.md` | Root | Setup completion notes |

> TODO: Verify timestamps and validity before handover sign-off.

---

## How to Generate Fresh Runtime Evidence

### 1. Health Snapshots

```bash
# Start backend
cd backend && python api.py

# Local health
curl -s http://localhost:5000/api/health

# Save output to Handover/Screenshots/ or review_packets/ if desired
```

Expected:
```json
{"status": "healthy", "message": "API is running"}
```

### 2. Production Health

```bash
curl -s https://biometric-blackhole.onrender.com/api/health
curl -I https://biometric-blackhole.vercel.app
```

> TODO: Verify production URLs are live.

### 3. Auth Flow Evidence

```bash
# Register
curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"evidence@test.com","password":"test1234","full_name":"Evidence User"}'

# Login
curl -s -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"evidence@test.com","password":"test1234"}'

# Profile (replace TOKEN)
curl -s http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

### 4. MongoDB Connection Evidence

```bash
cd backend
python -c "
from database import init_db, get_db
init_db()
db = get_db()
print('Collections:', db.list_collection_names())
print('Users count:', db.users.count_documents({}))
"
```

### 5. Processor Syntax Check

```bash
python -m py_compile backend/attendance_processor.py
echo "Syntax OK"
```

### 6. Frontend Build Evidence

```bash
cd frontend
npm run build
# Verify dist/ directory created
ls dist/
```

---

## Artifacts to Capture for Sign-Off

| Artifact | How to Generate | Save To |
|----------|-----------------|---------|
| Health check response (local) | `curl /api/health` | `review_packets/` |
| Health check response (prod) | `curl` production URL | `review_packets/` |
| Auth register/login output | curl commands above | `review_packets/` |
| MongoDB collection list | Python script above | `review_packets/` |
| Frontend screenshot — login | Browser screenshot | `Screenshots/` |
| Frontend screenshot — reports | Browser screenshot | `Screenshots/` |
| Frontend screenshot — upload | Browser screenshot | `Screenshots/` |
| Walkthrough video | Screen recording | `Videos/` |

---

## Production Verification Checklist

- [ ] `GET /api/health` returns 200 on Render
- [ ] Frontend loads on Vercel
- [ ] Register + login works on production
- [ ] Excel upload + process works
- [ ] Data persists in MongoDB
- [ ] Export/download works

---

## Log Locations

| Environment | Where |
|-------------|-------|
| Local backend | Terminal stdout |
| Render | Dashboard → Service → Logs |
| Vercel | Dashboard → Deployments → Build logs |

---

## TODO: Verify

- [ ] Production URLs before capturing evidence
- [ ] Sample Excel file for upload test
- [ ] MongoDB Atlas dashboard access for collection verification
