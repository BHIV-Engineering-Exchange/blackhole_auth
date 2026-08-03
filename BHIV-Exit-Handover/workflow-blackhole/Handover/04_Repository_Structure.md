# Repository Structure — workflow-blackhole

```
workflow-blackhole/
├── README.md
├── Handover/
├── verify_ems_setup.js, test_monitoring.js, test-real-tracking.js  # root test scripts
├── client/
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx                 # Routes, role-based dashboards
│       ├── lib/api.js              # API_URL resolution + fetch helpers
│       ├── context/                # auth, socket, branch, dashboard, workspace
│       ├── pages/                  # 40+ pages (Dashboard, EMS, Salary, etc.)
│       ├── components/             # UI, attendance, monitoring, admin
│       ├── hooks/
│       └── layouts/DashboardLayout.jsx
└── server/
    ├── index.js                    # Main entry (large; legacy commented block at top)
    ├── package.json
    ├── models/                     # 40+ Mongoose models
    ├── routes/                     # 30+ route modules
    ├── services/                   # Business logic
    ├── middleware/                 # auth, adminAuth, execution*, governance*
    └── utils/
```

---

## Key server files

| File | Role |
|------|------|
| `index.js` | Express + Socket.IO bootstrap, CORS, route mounting, cron jobs |
| `routes/tantraExecution.js` | `/api/tantra/execution/participate` |
| `services/executionEventEmitter.js` | Hashed execution events + SETU hook |
| `services/setuDispatcher.js` | Sampada SETU outbound |
| `services/attendanceCronJobs.js` | Daily attendance persistence |
| `services/emsAutomation.js` | EMS email templates |
| `middleware/executionAuth.js` | Tantra contract auth |
| `middleware/governanceEnforcement.js` | Governance decisions |

---

## Key client files

| File | Role |
|------|------|
| `App.jsx` | Full route tree, role guards |
| `lib/api.js` | API base URL + `fetchAPI` wrapper |
| `context/auth-context.jsx` | JWT auth state |
| `context/socket-context.jsx` | Socket.IO |
| `pages/EMSDashboard.jsx` | EMS UI |
| `pages/AttendanceDashboard.jsx` | Live attendance |

---

## API route mounts (from index.js)

Partial list:

- `/api/auth`, `/api/users`, `/api/tasks`, `/api/departments`
- `/api/attendance`, `/api/enhanced-attendance`, `/api/attendance-dashboard`
- `/api/enhanced-salary`, `/api/new-salary`, `/api/hourly-salary`, `/api/biometric`
- `/api/monitoring`, `/api/ems`, `/api/ems-signals`, `/api/agent`
- `/api/leave`, `/api/projects`, `/api/branches`, `/api/procurement`
- `/api/tantra` — execution participation
- `/api/dashboard`, `/api/admin`, `/api/chatbot`, `/api/tester`

See `07_API_Reference.md` for grouped summary.

---

## Git history (recent)

| Commit | Message |
|--------|---------|
| `fbcfa73` | Add Sampada SETU dispatcher hook on Niyantran execution events |
| `f2ce662` | Add execution event services and fix missing modules |
| `a291ddf` | Fixing security lapse |
| `e9341d1` | New Update on tantra |

---

## Naming in README vs repo

README references `Infiverse-BHL/` folder names — actual repo uses `client/` and `server/` under `workflow-blackhole`.
