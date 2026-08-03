# Backend Guide — workflow-blackhole

## Entry point

**File:** `server/index.js` (~815 lines)

- Lines 1–122: **commented legacy server** (reference only)
- Lines 125+: **active Express 5 + Socket.IO application**

---

## Startup sequence

1. Load routes and middleware modules
2. Configure CORS (`isAllowedOrigin` helper)
3. Create HTTP server + Socket.IO
4. Attach `req.io` middleware
5. Static serve `../client/dist` + SPA fallback
6. Mount 30+ API routers
7. `mongoose.connect` with pool tuning
8. Initialize EMS email templates
9. `server.listen(PORT)` — default **5000**
10. Schedule midnight auto-end attendance job
11. Start attendance persistence cron

Failure to connect MongoDB → `process.exit(1)`.

---

## Authentication

**Middleware:** `middleware/auth.js`, `middleware/adminAuth.js`

JWT in `x-auth-token` header (also `Authorization` allowed in CORS headers list).

---

## Tantra execution subsystem

| Component | File |
|-----------|------|
| Routes | `routes/tantraExecution.js` |
| Event emitter | `services/executionEventEmitter.js` |
| SETU dispatch | `services/setuDispatcher.js` |
| Lineage | `services/executionLineageAdapter.js` |
| Rejection log | `services/executionRejectionLogger.js` |
| Replay | `services/executionReplayLog.js` |
| Middleware | `executionAuth`, `traceContinuity`, `governanceEnforcement`, `tenantIsolation` |
| Models | `ExecutionEvent`, `ExecutionSession`, `ExecutionLineage`, `ExecutionRejection` |

Lifecycle: started → completed | failed | blocked. Hash chain prevents tampering; duplicate `eventId` with mismatched payload → 409 rejection.

After persist: optional async `dispatchToSampada(created)` when `SAMPADA_SETU_ENABLED=true`.

---

## Attendance subsystem

- Routes: `attendance.js`, `enhancedAttendance.js`, `attendanceStatus.js`, `attendanceDashboard.js`, `biometricAttendance.js`
- Cron: `attendanceCronJobs.js` — daily persistence at 11:59 PM
- Midnight job in `index.js` — auto-end unclosed days → spam review (`SPAM_VALIDATION_HOURS`)
- Auto end after max hours: **disabled** (commented)

---

## EMS subsystem

- `routes/ems.js`, `routes/emsSignals.js`
- `services/emsAutomation.js`, `services/ems_signals.js`
- Templates initialized on MongoDB connect

---

## Monitoring subsystem

- `routes/monitoring.js`
- `services/screenCapture.js`, `intelligentScreenCapture.js`, `keystrokeAnalytics.js`, `websiteMonitor.js`
- Platform-specific (screenshot-desktop; Linux tool detection endpoint)

---

## AI subsystem

- `routes/ai.js`, `routes/aiRoutes.js`, `routes/chatbot.js`
- `services/groqAIService.js`, Google Generative AI deps

---

## Procurement

- `routes/procurement.js`, `services/procurementAgent.js`

---

## Background jobs

| Job | Trigger |
|-----|---------|
| Midnight auto-end | `scheduleMidnightJob()` — setTimeout to midnight then 24h interval |
| Attendance persistence cron | `startAttendancePersistenceCron()` |
| Historical sync on startup | **Disabled** for performance |

Manual sync: **TODO: Verify** `POST /api/admin/sync-attendance` (referenced in logs).

---

## Error handling

Generic middleware at end of route stack (see commented section pattern). Tantra routes return structured JSON with status codes 423/409.

---

## Scripts

```bash
npm start    # node index.js
npm test     # placeholder — not implemented
```

Many one-off scripts in `server/` root (`test-login.js`, `seed-attendance-data.js`, etc.) — dev utilities.

---

## Extension points

1. Implement rate limiting on auth and monitoring upload endpoints
2. Complete server test suite
3. Extract CORS origins to env-only config
4. Document Tantra contract schema for external callers (Niyantran)
