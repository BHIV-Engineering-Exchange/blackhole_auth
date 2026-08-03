# Frontend Guide — workflow-blackhole

## Stack

React 18 + Vite 6 + Tailwind 4 + React Router 7 + Socket.IO + Axios. UI built with Radix/shadcn-style components, Framer Motion, Recharts, Leaflet maps.

**Path:** `client/src/`

---

## Bootstrap

- `main.jsx` → `App.jsx`
- Providers: Theme, Auth, Socket, Branch, Workspace, Dashboard, Sidebar
- Toast: react-toastify + shadcn Toaster

---

## API configuration (`lib/api.js`)

Resolution order:

1. `VITE_API_URL` if set
2. If hostname is `blackhole-workflow.vercel.app` or `*.vercel.app` → fallback `https://blackholeworkflow.onrender.com/api`
3. If localhost → **`http://localhost:5001/api`** (wrong unless server on 5001)
4. Else same-origin `/api`

Always set `VITE_API_URL` explicitly.

Auth token: `localStorage.WorkflowToken` sent as `x-auth-token`.  
Branch: `localStorage.selectedBranch` as `x-branch`.

---

## Routing highlights (`App.jsx`)

**Public:** Login, Register, Forgot/Reset password, AuthCallback

**Protected (role-based):**
- Admin → AdminDashboard, UserManagement, EmployeeMonitoring, AttendanceDataManagement, etc.
- User → UserDashboard, MyTasks, LeaveRequest, TodaysAim
- Procurement Agent → ProcurementDashboard
- Tester → TesterDashboard, TesterTasks, TesterEvaluation, TesterAlerts

**Shared modules:** Tasks, Dependencies, Departments, Projects, BranchManagement, EMSDashboard, EnhancedSalaryDashboard, BiometricAttendanceDashboard, NewSalaryManagement, AttendanceDashboard, Settings, Leaderboard, Optimization

Uses `ProtectedRoute` + `DashboardLayout`.

---

## Realtime

`context/socket-context.jsx` connects to `VITE_SOCKET_URL` or inferred host. Joins user/room channels for live attendance and notifications.

---

## Push notifications

`usePushNotifications` hook — auto-subscribe once per user session in `App.jsx`. Requires VAPID keys on server.

---

## PWA

`vite-plugin-pwa` in client dependencies — **TODO: Verify** manifest/service worker config in vite config.

---

## Key feature pages

| Page | Purpose |
|------|---------|
| AttendanceDashboard | Live attendance |
| EMSDashboard | EMS automation UI |
| EmployeeMonitoring | Screen/activity monitoring |
| EnhancedSalaryDashboard | Salary + attendance |
| BiometricAttendanceDashboard | Biometric uploads |
| ProjectManagement | Projects |

---

## Build

```bash
cd client
npm run build   # → client/dist
```

Lint: `npm run lint`

---

## Known gaps

- No centralized API types (JSX codebase)
- Large App.jsx route table — role logic embedded
- Production depends on correct Vercel env vars

---

## Local dev checklist

1. Server on 5000
2. `VITE_API_URL=http://localhost:5000/api`
3. `VITE_SOCKET_URL=http://localhost:5000`
4. MongoDB running
5. Register admin user or seed data
