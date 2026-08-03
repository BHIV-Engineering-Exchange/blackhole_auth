# Runtime Evidence — AI-CRM

**Generated:** 2026-07-05

---

## How to Generate Evidence

### Health Check
```bash
curl -s http://localhost:5001/api/ping
curl -s https://blackholeworkflow.onrender.com/api/ping
```

### Auth Flow
```bash
curl -s -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"<email>","password":"<password>"}'
```

### Dashboard Stats
```bash
curl -s http://localhost:5001/api/dashboard/stats
```

### Monitoring Status
```bash
curl -s http://localhost:5001/api/monitoring/status/all \
  -H "x-auth-token: <token>"
```

### Browser Detection (Linux)
```bash
curl -s http://localhost:5001/api/test-browser-detection
```

---

## Screenshot Placeholders (`Handover/Screenshots/`)

| Screenshot | Filename | Status |
|------------|----------|--------|
| Login page | `login.png` | TODO: Capture |
| Admin dashboard | `admin_dashboard.png` | TODO: Capture |
| User dashboard | `user_dashboard.png` | TODO: Capture |
| Attendance dashboard | `attendance_dashboard.png` | TODO: Capture |
| Monitoring page | `monitoring.png` | TODO: Capture |
| Salary management | `salary.png` | TODO: Capture |
| Production ping | `production_ping.png` | TODO: Capture |

---

## Video Placeholders (`Handover/Videos/`)

| Video | Filename | Status |
|-------|----------|--------|
| Local setup | `local_setup.mp4` | TODO: Record |
| Attendance flow | `attendance_flow.mp4` | TODO: Record |
| Task workflow | `task_workflow.mp4` | TODO: Record |
| Monitoring demo | `monitoring_demo.mp4` | TODO: Record |
| Deployment guide | `deployment.mp4` | TODO: Record |

---

## Evidence Checklist

- [ ] `/api/ping` returns 200 locally
- [ ] `/api/ping` returns 200 on production
- [ ] Login flow works end-to-end
- [ ] Dashboard loads with data
- [ ] Socket.IO connects (browser console)
- [ ] Screenshots captured for key pages
- [ ] No secrets included in evidence files

---

## Notes

- Do not commit JWT tokens or passwords in evidence
- Timestamp all captures with date and environment
