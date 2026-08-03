# Folder Structure — AI-CRM

**Generated:** 2026-07-05

---

## Repository Root

```
AI-CRM/
├── .git/
├── Handover/                              # Exit handover package
└── Downloads/
    └── workflow-blackhole-main/           ← MAIN APPLICATION
        ├── README.md
        ├── DEPLOYMENT_FIX_GUIDE.md
        ├── START_SERVERS.ps1
        ├── package.json                     (wrapper: install:client, build:client)
        ├── node_modules/                    (minimal root deps)
        ├── client/                          ← React frontend
        └── server/                          ← Express backend
```

> There is no application code at `AI-CRM/` root (only `.git/` and `Downloads/`).

---

## Frontend (`client/`)

```
client/
├── src/
│   ├── App.jsx                            # Route definitions
│   ├── main.jsx                           # React entry
│   ├── components/
│   │   ├── attendance/                    # LiveAttendanceDashboard, RealTimeTracker
│   │   ├── dashboard/
│   │   ├── departments/
│   │   ├── leave/
│   │   ├── monitoring/
│   │   ├── salary/
│   │   ├── tasks/
│   │   └── ui/                            # Shadcn base components
│   ├── context/
│   │   ├── auth-context.jsx               # Auth + token management
│   │   ├── socket-context.jsx             # Socket.IO
│   │   ├── workspace-context.jsx
│   │   └── DashboardContext.jsx
│   ├── hooks/                             # use-attendance, use-salary, use-tasks
│   ├── pages/                             # Dashboard, Tasks, Monitoring, etc.
│   ├── layouts/
│   ├── lib/
│   │   ├── api.js                         # Main API client
│   │   └── user-api.js
│   ├── services/
│   │   └── enhancedSalaryAPI.js
│   └── utils/
├── vercel.json                            # SPA rewrite config
├── package.json
├── vite.config.js
├── .env.example
└── .env.production
```

---

## Backend (`server/`)

```
server/
├── index.js                               # Express entry point
├── package.json
├── Dockerfile                             # Node 18-slim, port 5000
├── .env.example
├── DEPLOYMENT.md
├── routes/                                # 51 route files (~30 mounted)
│   ├── auth.js
│   ├── users.js
│   ├── tasks.js
│   ├── attendance.js
│   ├── monitoring.js
│   ├── biometricAttendance.js
│   ├── enhancedSalary.js
│   ├── hourlyBasedSalary.js
│   ├── newSalaryManagement.js
│   ├── ems.js
│   ├── procurement.js
│   └── ... (20+ unmounted legacy files)
├── models/                                # 36 Mongoose models
├── controllers/                           # 3 controllers
│   ├── hourlyBasedSalaryController.js
│   ├── enhancedSalaryController.js
│   └── salaryController.js
├── services/                              # ~25 business logic services
│   ├── attendanceService.js
│   ├── screenCapture.js
│   ├── intelligentScreenCapture.js
│   ├── websiteMonitor.js
│   ├── groqAIService.js
│   ├── emsAutomation.js
│   ├── procurementAgent.js
│   └── ...
├── middleware/
│   ├── auth.js
│   ├── adminAuth.js
│   ├── procurementAuth.js
│   ├── complianceAuth.js
│   └── aimSync.js
├── utils/
│   ├── cloudinary.js
│   ├── emailService.js
│   ├── pushNotificationService.js
│   └── ...
├── scripts/                               # Seed, migrate, test scripts
├── uploads/                               # Local file uploads
└── Complete-Infiverse-main/               # NESTED LEGACY (docs snapshot)
    └── HANDOVER_SHEET.md
```

---

## Handover Package (`Handover/`)

```
Handover/
├── 01_README.md through 18_Rollback_Guide.md
├── review_packets/
├── code_packets/
├── Screenshots/
└── Videos/
```

---

## Key Entry Points

| Purpose | Path (from repo root) |
|---------|----------------------|
| Backend server | `Downloads/workflow-blackhole-main/server/index.js` |
| Frontend app | `Downloads/workflow-blackhole-main/client/src/main.jsx` |
| API client | `Downloads/workflow-blackhole-main/client/src/lib/api.js` |
| Auth context | `Downloads/workflow-blackhole-main/client/src/context/auth-context.jsx` |
| Main README | `Downloads/workflow-blackhole-main/README.md` |
| Deployment fix | `Downloads/workflow-blackhole-main/DEPLOYMENT_FIX_GUIDE.md` |
| Handover sheet | `Downloads/workflow-blackhole-main/server/Complete-Infiverse-main/HANDOVER_SHEET.md` |

---

## Working Directory for Development

```
c:\Users\DELL\OneDrive\Desktop\BHIV-Nikhil Pawar\AI-CRM\Downloads\workflow-blackhole-main\
```

```bash
# Backend
cd server && npm install && npm start

# Frontend
cd client && npm install && npm run dev
```
