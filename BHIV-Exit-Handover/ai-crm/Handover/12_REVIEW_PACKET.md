# Review Packet — AI-CRM

**Generated:** 2026-07-05  
**System:** Infiverse BHL / Workflow Blackhole  
**Review Time:** < 10 minutes

---

## Entry Points

| File | Purpose |
|------|---------|
| `Downloads/workflow-blackhole-main/server/index.js` | Express + Socket.IO entry |
| `Downloads/workflow-blackhole-main/client/src/App.jsx` | Frontend routes |
| `Downloads/workflow-blackhole-main/client/src/lib/api.js` | API client |
| `Downloads/workflow-blackhole-main/README.md` | Full project documentation |

---

## Core Flow

```
Login → JWT (x-auth-token) → Dashboard
  → Tasks / Attendance / Monitoring / Salary modules
  → Socket.IO real-time updates
  → Background: midnight auto-end, attendance cron
```

---

## Critical Files

| File | Purpose |
|------|---------|
| `server/index.js` | Server entry, route mounting, cron jobs |
| `server/routes/auth.js` | Authentication |
| `server/middleware/auth.js` | JWT validation |
| `server/models/User.js` | User schema |
| `server/services/attendanceService.js` | Attendance logic |
| `server/services/intelligentScreenCapture.js` | Monitoring |
| `server/services/groqAIService.js` | AI insights |
| `client/src/context/auth-context.jsx` | Frontend auth |
| `client/src/lib/api.js` | API modules |

---

## Live Verification

```bash
cd Downloads/workflow-blackhole-main/server
npm install && npm start

curl http://localhost:5001/api/ping

cd ../client
npm install && npm run dev
# Open http://localhost:5173
```

Production:
```bash
curl https://blackholeworkflow.onrender.com/api/ping
```

---

## Review Flags

1. App nested under `Downloads/` — non-standard layout
2. Plain-text passwords — must fix before production handover
3. Port 5000 vs 5001 mismatch
4. Monitoring routes mostly unauthenticated
5. No CI/CD
6. Production frontend may point to localhost API

---

## Review Checklist

- [ ] Read `Handover/01_README.md`
- [ ] Start backend, hit `/api/ping`
- [ ] Login via frontend
- [ ] Verify dashboard loads
- [ ] Check production ping URL
- [ ] Review `Handover/10_Known_Issues.md`
- [ ] Review `HANDOVER_SHEET.md` pending tasks

---

## Role Matrix

| Feature | Employee | Manager | Admin |
|---------|----------|---------|-------|
| Tasks | ✓ | ✓ | ✓ |
| Attendance start/end | ✓ | ✓ | ✓ |
| Monitoring view | ✗ | ✓ | ✓ |
| User management | ✗ | ✗ | ✓ |
| Salary admin | ✗ | ✓ | ✓ |
| EMS dashboard | ✗ | ✗ | ✓ |

> TODO: Verify exact role permissions in code.

---

## Related Documents

- `Handover/06_API_Documentation.md`
- `Handover/04_Architecture.md`
- `server/Complete-Infiverse-main/HANDOVER_SHEET.md`
