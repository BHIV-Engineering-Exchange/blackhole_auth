# API Documentation — AI-CRM

**Generated:** 2026-07-05  
**App path:** `Downloads/workflow-blackhole-main/server/`  
**Base URL:** `http://localhost:5001/api` (local)  
**Production:** `https://blackholeworkflow.onrender.com/api`  
**Auth header:** `x-auth-token: <JWT>`

---

## Root-Level (`server/index.js`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/api/ping` | Public | Health ping |
| GET | `/api/test-browser-detection` | Public | Linux browser tool test |
| POST | `/api/admin/trigger-midnight-job` | auth + adminAuth | Trigger midnight job |

---

## Auth — `/api/auth` (`routes/auth.js`)

| Method | Path | Auth |
|--------|------|------|
| POST | `/register` | Public |
| POST | `/login` | Public |
| GET | `/me` | auth |
| POST | `/forgot-password` | Public |
| GET | `/verify-reset-token/:token` | Public |
| POST | `/reset-password/:token` | Public |

---

## Users — `/api/users` (`routes/users.js`)

| Method | Path | Auth |
|--------|------|------|
| GET | `/search` | Public |
| GET | `/` | Public |
| GET | `/:id` | auth |
| PUT | `/:id` | auth |
| PUT | `/:id/status` | auth + adminAuth |
| PUT | `/:id/work-mode` | auth + adminAuth |
| PUT | `/bulk/work-mode` | auth + adminAuth |
| GET | `/admin/all` | auth + adminAuth |
| DELETE | `/:id` | auth + adminAuth |
| GET | `/:id/tasks` | Public |
| PUT | `/:id/password` | Public |
| GET | `/:id/submissions` | auth |
| GET | `/:id/notifications` | auth |
| PUT | `/:id/notifications/read-all` | auth |
| POST | `/update-all-stillexist` | Public |

---

## User Notifications — `/api/user-notifications`

| Method | Path |
|--------|------|
| GET | `/:userId` |
| PUT | `/:id/read` |
| PUT | `/read-all` |
| DELETE | `/:id` |

---

## Tasks — `/api/tasks`

| Method | Path | Auth |
|--------|------|------|
| GET | `/overdue` | auth |
| GET | `/` | auth |
| GET | `/:id` | auth |
| POST | `/` | auth (multer) |
| PUT | `/:id` | auth |
| DELETE | `/:id` | auth |
| GET | `/:id/dependencies` | auth |

---

## Departments — `/api/departments`

| Method | Path | Auth |
|--------|------|------|
| GET | `/` | Public |
| GET | `/:id` | auth |
| POST | `/` | auth |
| PUT | `/:id` | auth |
| DELETE | `/:id` | auth |
| GET | `/:id/tasks` | auth |

---

## Admin — `/api/admin`

| Method | Path | Auth |
|--------|------|------|
| GET | `/users` | auth |
| GET | `/users/all` | auth + adminAuth |
| GET | `/users/:id` | auth |
| POST | `/users` | auth + adminAuth |
| PUT | `/users/:id` | auth |
| PUT | `/users/:id/status` | auth + adminAuth |
| DELETE | `/users/:id` | auth + adminAuth |
| GET | `/users/role/:role` | auth |
| GET | `/users/search` | auth |
| GET | `/departments` | auth |
| GET | `/departments/:id` | auth |
| POST | `/departments` | auth + adminAuth |
| PUT | `/departments/:id` | auth + adminAuth |
| DELETE | `/departments/:id` | auth + adminAuth |
| PUT | `/departments/:id/members` | auth |
| DELETE | `/departments/:id/members/:userId` | auth |
| GET | `/departments/:id/tasks` | auth |

---

## Dashboard — `/api/dashboard`

| Method | Path | Auth | File |
|--------|------|------|------|
| GET | `/stats` | Public | dashboard.js |
| GET | `/departments` | Public | dashboard.js |
| GET | `/tasks-overview` | Public | dashboard.js |
| GET | `/activity` | Public | dashboard.js |
| GET | `/user-stats/:userId` | Public | dashboard.js |
| GET | `/progress-stats` | auth | dashboard.js |
| GET | `/admin-report` | auth | dashboard.js |
| GET | `/attendance-summary` | auth | dashboardFixed.js |
| GET | `/merge-analysis` | auth | dashboardFixed.js |
| GET | `/employee/:userId/monthly` | auth | dashboardFixed.js |
| GET | `/mismatches` | auth | dashboardFixed.js |

---

## Submissions — `/api/submissions`

| Method | Path | Auth |
|--------|------|------|
| GET | `/` | auth |
| GET | `/:id` | auth |
| GET | `/task/:taskId` | auth |
| POST | `/` | auth (multer) |
| PUT | `/:id` | auth (multer) |
| PUT | `/:id/review` | auth |
| DELETE | `/:id` | auth |

---

## Progress — `/api/progress`

| Method | Path | Auth |
|--------|------|------|
| GET | `/task/:taskId` | auth |
| GET | `/user/:userId` | auth |
| GET | `/all` | auth |
| POST | `/` | auth (multer) |
| PUT | `/:id` | auth |
| DELETE | `/:id` | auth |

---

## AI — `/api/ai` and `/api/new/ai`

| Method | Path | Auth | Router |
|--------|------|------|--------|
| GET | `/api/ai/insights` | Public | ai.js |
| POST | `/api/ai/optimize` | auth | ai.js |
| GET | `/api/ai/dependencies` | auth | ai.js |
| GET | `/api/new/ai/insights` | Public | aiRoutes.js |
| POST | `/api/new/ai/optimize` | Public | aiRoutes.js |

---

## Notifications — `/api/notifications`

| Method | Path |
|--------|------|
| POST | `/broadcast-reminders` |
| POST | `/broadcast-aim-reminders` |
| POST | `/toggle-automation` |

---

## AIMs — `/api/aims` and `/api/enhanced-aims`

### `/api/aims` (aims_universal.js)

| Method | Path | Auth |
|--------|------|------|
| GET | `/` | adminAuth |
| GET | `/today/:id` | auth |
| GET | `/user/:userId` | auth |
| GET | `/all` | adminAuth |
| GET | `/with-progress` | auth |
| GET | `/all-with-progress` | adminAuth |
| GET | `/user/:userId/with-progress` | auth |
| POST | `/postaim/:id` | auth |
| PUT | `/:id` | auth |
| DELETE | `/:id` | auth |
| POST | `/sync-progress-to-aim` | auth |
| POST | `/sync-attendance-to-aim` | auth |
| GET | `/debug` | auth |
| DELETE | `/cleanup-default` | adminAuth |

### `/api/enhanced-aims`

| Method | Path | Auth |
|--------|------|------|
| GET | `/with-progress` | auth |
| POST | `/sync-progress-to-aim` | auth |
| POST | `/sync-attendance-to-aim` | auth |
| GET | `/enhanced` | auth |

---

## Push — `/api/push`

| Method | Path |
|--------|------|
| POST | `/subscribe` |
| POST | `/cleanup` |
| POST | `/send` |
| POST | `/broadcast` |
| GET | `/subscriptions` |

---

## Monitoring — `/api/monitoring` (mostly unauthenticated)

| Method | Path |
|--------|------|
| POST | `/start/:employeeId` |
| POST | `/stop/:employeeId` |
| POST | `/start-all` |
| POST | `/stop-all` |
| GET | `/employees/:id/activity` |
| GET | `/employees/:id/screenshots` |
| GET | `/screenshots/:screenshotId` |
| GET | `/cloudinary-screenshots/:employeeId` |
| GET | `/alerts` |
| PUT | `/alerts/:alertId/acknowledge` |
| PUT | `/alerts/:alertId/resolve` |
| GET | `/whitelist` |
| POST | `/whitelist` |
| GET | `/reports/:employeeId` |
| GET | `/status/:employeeId` |
| GET | `/status/all` |
| GET | `/ai/test` |
| GET | `/intelligent/stats` |
| POST | `/keystroke/:employeeId` |
| GET | `/keystroke/:employeeId` |
| GET | `/productivity/:employeeId` |
| POST | `/report/pdf/:employeeId` |
| POST | `/report/bulk` |
| POST | `/export/csv/:employeeId` |
| GET | `/download/:filename` |
| POST | `/ocr/test` |
| GET | `/ocr/status` |
| GET | `/work-session/:employeeId` |
| POST | `/work-session/start` |
| POST | `/work-session/pause` |
| POST | `/work-session/resume` |
| POST | `/work-session/end` |

---

## EMS Signals — `/api/ems-signals`

| Method | Path |
|--------|------|
| POST | `/signals/init` |
| POST | `/signals` |
| POST | `/signals/realtime` |
| GET | `/signals/:employeeId` |
| GET | `/signals/:employeeId/history` |
| GET | `/signals/:employeeId/proof` |
| POST | `/signals/:employeeId/stop` |
| DELETE | `/signals/:employeeId` |

---

## Attendance — `/api/attendance`

| Method | Path | Auth |
|--------|------|------|
| POST | `/start-day/:userId` | auth |
| POST | `/end-day/:userId` | auth |
| POST | `/auto-end-day-midnight` | auth |
| POST | `/validate-spam-hours/:recordId` | auth + adminAuth |
| POST | `/auto-end-day` | auth |
| GET | `/reverse-geocode` | auth |
| GET | `/analytics` | auth |
| GET | `/user/:userId` | auth |
| GET | `/verify/:userId` | auth |
| GET | `/live` | adminAuth |
| POST | `/upload` | auth (multer) |
| POST | `/confirm-upload` | auth |
| GET | `/location-discrepancies` | auth + adminAuth |
| PUT | `/location-discrepancies/:id` | auth + adminAuth |

---

## Attendance Dashboard — `/api/attendance-dashboard`

| Method | Path | Auth |
|--------|------|------|
| GET | `/locations` | auth + adminAuth |
| GET | `/start-time-summary` | auth + adminAuth |
| GET | `/attendance-tracking` | auth + adminAuth |
| GET | `/departments` | auth |
| GET | `/dashboard-data` | auth + adminAuth |
| GET | `/export/start-times` | auth + adminAuth |
| GET | `/user-average` | auth + adminAuth |
| GET | `/employee-history/:userId` | auth + adminAuth |
| POST | `/admin/sync-attendance` | auth + adminAuth |
| GET | `/admin/sync-status` | auth + adminAuth |
| GET | `/admin/check-date-data` | auth + adminAuth |
| POST | `/admin/sync-and-fetch` | auth + adminAuth |

---

## Leave — `/api/leave`

| Method | Path | Auth |
|--------|------|------|
| POST | `/request` | auth |
| GET | `/user/:userId` | auth |
| GET | `/pending` | auth |
| PUT | `/:id/approve` | auth |
| PUT | `/:id/reject` | auth |
| GET | `/analytics` | auth |
| PUT | `/:id/cancel` | auth |

---

## Enhanced Salary — `/api/enhanced-salary` (controller)

| Method | Path |
|--------|------|
| POST | `/upload-biometric` |
| GET | `/calculate/:userId/:year/:month` |
| GET | `/dashboard/:year/:month` |
| GET | `/hours-breakdown/:userId/:year/:month` |
| GET | `/wfh-analysis/:userId/:year/:month` |

---

## Hourly Salary — `/api/hourly-salary` (controller)

| Method | Path |
|--------|------|
| GET | `/employee/:userId/calculate/:year/:month` |
| GET | `/employee/:userId/hours-breakdown/:year/:month` |
| GET | `/activity-log` |
| GET | `/admin/dashboard/:year/:month` |
| PATCH | `/attendance/:attendanceId/location` |
| POST | `/admin/hourly-rates/bulk-update` |
| GET | `/my-salary/current` |
| GET | `/activity-log/current` |
| GET | `/admin/dashboard/current` |

---

## New Salary — `/api/new-salary`

| Method | Path | Auth |
|--------|------|------|
| GET | `/hours/all` | auth + adminAuth |
| GET | `/debug/attendance` | auth + adminAuth |
| GET | `/hours/:userId` | auth |
| POST | `/validate-midnight-span/:recordId` | auth + adminAuth |
| POST | `/calculate` | auth + adminAuth |
| GET | `/records/:userId` | auth |
| GET | `/records` | auth + adminAuth |
| DELETE | `/records/:recordId` | auth + adminAuth |
| PUT | `/confirm/:recordId` | auth + adminAuth |
| GET | `/confirmed` | auth + adminAuth |
| PUT | `/confirmed/:recordId` | auth + adminAuth |
| DELETE | `/confirmed/:recordId` | auth + adminAuth |
| GET | `/history/buckets` | auth + adminAuth |
| GET | `/history/bucket-details` | auth + adminAuth |
| POST | `/history/create-bucket` | auth + adminAuth |
| DELETE | `/history/delete-bucket` | auth + adminAuth |
| GET | `/spam-users` | auth + adminAuth |
| POST | `/spam-users/validate` | auth + adminAuth |
| POST | `/spam-users/bulk-validate` | auth + adminAuth |

---

## Biometric — `/api/biometric`

| Method | Path | Auth |
|--------|------|------|
| POST | `/upload` | auth |
| POST | `/derive-attendance` | auth |
| POST | `/salary-calculation` | auth |
| GET | `/dashboard-kpis` | auth |
| GET | `/detailed-logs` | auth |
| GET | `/employee-aggregates` | auth |
| POST | `/employee-master` | auth |
| GET | `/employee-master` | auth |
| GET | `/upload-history` | auth |
| GET | `/export-salary` | auth |
| GET | `/export-detailed-logs` | auth |
| GET | `/departments` | auth |
| GET | `/users` | auth |
| GET | `/public-holidays` | auth |
| POST | `/public-holidays` | auth |
| PUT | `/public-holidays/:id` | auth |
| DELETE | `/public-holidays/:id` | auth |
| GET | `/paid-leaves` | auth |
| POST | `/paid-leaves` | auth |
| PUT | `/paid-leaves/:id` | auth |
| DELETE | `/paid-leaves/:id` | auth |
| PUT | `/employee-hourly-rate/:userId` | auth |
| GET | `/employee-hourly-rates` | auth |

> Note: `DEPLOYMENT_FIX_GUIDE.md` references `/api/biometric-attendance/*` — mounted prefix is `/api/biometric`.

---

## Consent — `/api/consent`

| Method | Path | Auth |
|--------|------|------|
| POST | `/` | auth |

---

## Alerts — `/api/alerts`

| Method | Path | Auth |
|--------|------|------|
| GET | `/` | auth |

---

## EMS — `/api/ems`

| Method | Path | Auth |
|--------|------|------|
| POST | `/send-task-assignment` | auth + adminAuth |
| POST | `/send-task-reminders` | auth |
| POST | `/send-overdue-alerts` | auth + adminAuth |
| POST | `/send-custom-email` | auth + adminAuth |
| POST | `/send-bulk-task-emails` | auth + adminAuth |
| GET | `/templates` | auth |
| GET | `/scheduled-emails` | auth + adminAuth |
| DELETE | `/scheduled-emails/:id` | auth + adminAuth |
| POST | `/process-scheduled` | auth + adminAuth |
| GET | `/stats` | auth |
| GET | `/tasks-for-email` | auth + adminAuth |
| POST | `/send-daily-reminders` | Public |
| POST | `/send-welcome-email/:userId` | auth + adminAuth |
| POST | `/send-password-reset/:userId` | auth + adminAuth |

---

## Procurement — `/api/procurement`

| Method | Path | Auth |
|--------|------|------|
| POST | `/run-analysis` | auth + procurementAuth |
| GET | `/report` | auth + procurementAuth |
| GET | `/available-employees` | auth + procurementAuth |
| GET | `/top-performers` | auth + procurementAuth |
| GET | `/employee-stats/:employeeId` | auth + procurementAuth |
| POST | `/auto-analysis` | Public |

---

## Chatbot — `/api/chatbot`

| Method | Path | Auth |
|--------|------|------|
| POST | `/chat` | auth |
| POST | `/clear` | auth |
| GET | `/status` | auth |

---

## Prana — `/api/prana`

| Method | Path | Auth |
|--------|------|------|
| POST | `/ingest` | auth |
| GET | `/user/:userId` | auth |
| GET | `/summary/:userId` | auth |
| GET | `/live-status` | auth |
| GET | `/analytics/:userId` | auth |

---

## Unmounted Route Files (NOT active)

These exist in `server/routes/` but are **not** imported in `index.js`:

`aim.js`, `aims_unified.js`, `aimsWithProgress.js`, `aiReview.js`, `aiAgents.js`, `aiRoutePy.js`, `attendance_fixed*.js`, `attendance_no_default_aims.js`, `attendance_upload_fixed.js`, `attendanceDataManagement.js`, `biometricAttendanceFixed.js`, `compliance.js`, `enhancedAttendance.js`, `liveAttendance.js`, `new.js`, `salaryManagement.js`, `salaryRoutes.js`, `testProgress.js`, `testSync.js`

---

## Middleware Reference

| Middleware | File | Purpose |
|------------|------|---------|
| `auth` | `middleware/auth.js` | JWT via x-auth-token |
| `adminAuth` | `middleware/adminAuth.js` | Admin/Manager only |
| `procurementAuth` | `middleware/procurementAuth.js` | Procurement agent |

---

## Frontend API Mismatches

| Frontend call | Backend reality | Status |
|---------------|-----------------|--------|
| `/attendance/today/:userId` | Not on mounted routes | TODO: Verify |
| `/biometric-attendance/*` | `/api/biometric/*` | Path mismatch |

See `client/src/lib/api.js` for full frontend API module list.

---

## Approximate Count

200+ mounted route registrations across 30 route modules.
