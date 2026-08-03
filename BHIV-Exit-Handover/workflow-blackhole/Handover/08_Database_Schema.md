# Database Schema — workflow-blackhole

**Engine:** MongoDB  
**ODM:** Mongoose 8  
**Connection:** `MONGODB_URI` in `server/.env`

---

## Models overview (40+)

| Model file | Domain |
|------------|--------|
| `User.js` | Accounts, roles |
| `Department.js` | Org structure |
| `Branch.js` | Multi-branch |
| `Tenant.js` | Tenant isolation |
| `Task.js`, `TaskSubmission.js`, `TaskEvaluation.js` | Tasks |
| `Project.js` | Projects |
| `Attendance.js`, `DailyAttendance.js` | Attendance |
| `BiometricPunch.js`, `BiometricUpload.js` | Biometric |
| `Salary.js`, `NewSalaryRecord.js`, `SalaryAdjustment.js`, `SalaryAttendance.js` | Payroll |
| `Leave.js`, `PaidLeaveConfig.js`, `PublicHoliday.js` | Leave |
| `EmployeeActivity.js`, `WorkSession.js`, `ScreenCapture.js` | Monitoring |
| `MonitoringAlert.js`, `ComplianceAuditLog.js`, `AuditLog.js` | Compliance |
| `ExecutionEvent.js`, `ExecutionSession.js`, `ExecutionLineage.js`, `ExecutionRejection.js` | Tantra execution |
| `Notification.js`, `PushSubscription.js` | Comms |
| `EmailTemplate.js`, `ScheduledEmail.js` | EMS email |
| `Consent.js` | Monitoring consent |
| `Aim.js`, `Progress.js`, `Feedback.js` | Goals/progress |
| `EmployeeMaster.js`, `UserTag.js`, `WebsiteWhitelist.js` | HR metadata |
| `LocationDiscrepancy.js` | Geo audit |
| `AIReview.js` | AI reviews |

---

## User (summary)

From README — verify against `models/User.js`:

- `name`, `email` (unique), `password` (hashed)
- `role`: Admin, Manager, User (+ extended roles in app)
- `department`, `avatar`, timestamps

---

## Attendance (summary)

- User reference, `date`, biometric in/out, start/end day times
- `startDayLocation` { lat, lng, address, accuracy }
- `hoursWorked`, `overtimeHours`, `isPresent`, `isVerified`
- `hasDiscrepancy`, `productivityScore`, approval fields, notes

---

## ExecutionEvent (Tantra)

Hashed append-only style events:

- `eventId`, `executionId`, `traceId`, `tenantId`
- `eventType`: `execution_started`, `execution_completed`, `execution_failed`, `execution_blocked`
- `eventIndex`, `eventTimestamp`, `payload`
- `prevHash`, `hash` — SHA-256 chain

Unique index on `eventId` — duplicates trigger mismatch rejection.

---

## ExecutionSession

Tracks execution status per `executionId` — updated on each lifecycle event.

---

## Branch / tenant context

API requests may include `x-branch` header (client stores `selectedBranch` in localStorage). Tantra routes use `X-Tenant-Id` and tenant isolation middleware.

---

## Indexes & performance

`index.js` configures MongoDB pool (10–50 connections). **TODO: Verify** explicit indexes in model files for production scale.

---

## Backup

- Atlas backups recommended for production
- No migration framework — schema evolves via Mongoose model edits

---

## Sensitive collections

Monitoring, screen captures, EMS signals, biometric data — handle per privacy policy and consent records (`Consent.js`).

---

## Seed / bootstrap

**TODO: Verify** — seed scripts if any; may require manual admin registration via `/api/auth/register`.
