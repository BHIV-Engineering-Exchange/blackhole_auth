# Database Details — AI-CRM

**Generated:** 2026-07-05  
**ORM:** Mongoose 8.x  
**Connection:** `mongoose.connect(process.env.MONGODB_URI)` in `server/index.js`

---

## Connection Configuration

| Setting | Detail |
|---------|--------|
| **Engine** | MongoDB (Atlas recommended) |
| **ORM** | Mongoose 8.14.0 |
| **Env Var** | `MONGODB_URI` |
| **Migrations** | None — schema changes via model edits + ad-hoc scripts |
| **Seed scripts** | `server/scripts/seedAdmin.js`, `seedDepartment.js`, etc. |

---

## Models (36 collections)

| Model | File | Primary Purpose |
|-------|------|-----------------|
| User | `User.js` | Users, roles, auth, monitoring consent |
| Department | `Department.js` | Organizational departments |
| Task | `Task.js` | Task assignments |
| TaskSubmission | `TaskSubmission.js` | Task deliverable submissions |
| Progress | `Progress.js` | Task progress updates |
| Aim | `Aim.js` | Individual management goals |
| Attendance | `Attendance.js` | Attendance records |
| DailyAttendance | `DailyAttendance.js` | Daily attendance aggregates |
| Leave | `Leave.js` | Leave requests |
| Salary | `Salary.js` | Salary records |
| SalaryAdjustment | `SalaryAdjustment.js` | Salary adjustments |
| SalaryAttendance | `SalaryAttendance.js` | Salary-attendance linkage |
| NewSalaryRecord | `NewSalaryRecord.js` | New salary module records |
| EmployeeMaster | `EmployeeMaster.js` | Biometric employee master |
| BiometricUpload | `BiometricUpload.js` | Biometric file uploads |
| BiometricPunch | `BiometricPunch.js` | Biometric punch records |
| PublicHoliday | `PublicHoliday.js` | Public holiday calendar |
| PaidLeaveConfig | `PaidLeaveConfig.js` | Paid leave configuration |
| Notification | `Notification.js` | User notifications |
| PushSubscription | `PushSubscription.js` | Web push subscriptions |
| ScreenCapture | `ScreenCapture.js` | Monitoring screenshots |
| EmployeeActivity | `EmployeeActivity.js` | Activity tracking logs |
| MonitoringAlert | `MonitoringAlert.js` | Monitoring alerts |
| WorkSession | `WorkSession.js` | Work session tracking |
| WorkSessionUpdated | `WorkSessionUpdated.js` | Updated work session model |
| WebsiteWhitelist | `WebsiteWhitelist.js` | Allowed/disallowed sites |
| Consent | `Consent.js` | Monitoring consent records |
| AuditLog | `AuditLog.js` | System audit trail |
| ComplianceAuditLog | `ComplianceAuditLog.js` | Compliance audit events |
| AIReview | `AIReview.js` | AI review records |
| EmailTemplate | `EmailTemplate.js` | EMS email templates |
| ScheduledEmail | `ScheduledEmail.js` | Scheduled email queue |
| Feedback | `Feedback.js` | User feedback |
| LocationDiscrepancy | `LocationDiscrepancy.js` | Geolocation discrepancies |
| PranaActivity | `PranaActivity.js` | Prana activity tracking |
| UserTag | `UserTag.js` | User tagging |

---

## Key Model Schemas

### User (`User.js`)

Key fields (from codebase references):
- `name`, `email`, `password` (plain text — security issue)
- `role`: Admin, Manager, Employee, Procurement Agent
- `department`, `workMode` (office/WFH)
- `monitoringPaused`, `dataRetentionPeriod` (consent/GDPR)
- `hourlyRate`, salary-related fields
- `status` (active/inactive)

### Task (`Task.js`)

- `title`, `description`, `department`, `assignedTo`
- `status`, `priority`, `dueDate`
- `dependencies`, documents/attachments

### Attendance (`Attendance.js`)

- `userId`, `date`, `startTime`, `endTime`
- `location` (lat/lng), `workMode`
- `hoursWorked`, spam validation flags
- Geolocation and WFH cap logic

### ScreenCapture (`ScreenCapture.js`)

- `employeeId`, `timestamp`, `cloudinaryUrl`
- `metadata.ai_analysis` (Gemini explainability data)
- Violation flags, website URL

### MonitoringAlert (`MonitoringAlert.js`)

- Alert type, severity, employee reference
- Acknowledge/resolve status
- Linked to website monitoring violations

### Aim (`Aim.js`)

- User goals with progress tracking
- Sync with progress and attendance modules

---

## Data Scripts

| Script | Purpose |
|--------|---------|
| `scripts/seedAdmin.js` | Create admin user |
| `scripts/seedDepartment.js` | Seed departments |
| `scripts/generate-sample-attendance.js` | Sample attendance data |
| `scripts/migrateScreenshotsToCloudinary.js` | Migrate local screenshots |
| `scripts/migrate-wfh-hours-cap.js` | WFH hours cap migration |
| `scripts/setDefaultSalaries.js` | Set default salary rates |
| `seed-attendance-data.js` | Seed attendance records |

---

## Backup & Restore

- **MongoDB Atlas:** Use Atlas dashboard backups or `mongodump`
- **No automated backup script** in repo

> TODO: Verify production backup schedule on MongoDB Atlas.

---

## GDPR / Data Retention

- `User.dataRetentionPeriod` — retention days per user
- `User.monitoringPaused` — consent revocation flag
- `Consent` model — consent records
- **Pending:** Automated data deletion cron (see HANDOVER_SHEET.md)

---

## Index Notes

Historical fixes in `SERVER_ERROR_FIXES.md`:
- Mongoose duplicate index warnings resolved
- ObjectId constructor `new` keyword fixes applied
