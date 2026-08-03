# Code Packet Index — workflow-blackhole

## Server core

| ID | Path |
|----|------|
| CP-S01 | `server/index.js` |
| CP-S02 | `server/routes/auth.js` |
| CP-S03 | `server/routes/tantraExecution.js` |
| CP-S04 | `server/services/executionEventEmitter.js` |
| CP-S05 | `server/services/setuDispatcher.js` |
| CP-S06 | `server/routes/attendance.js` |
| CP-S07 | `server/routes/monitoring.js` |
| CP-S08 | `server/middleware/executionAuth.js` |

## Client core

| ID | Path |
|----|------|
| CP-C01 | `client/src/App.jsx` |
| CP-C02 | `client/src/lib/api.js` |
| CP-C03 | `client/src/context/auth-context.jsx` |
| CP-C04 | `client/src/context/socket-context.jsx` |

## Models (Tantra + HR)

| ID | Path |
|----|------|
| CP-M01 | `server/models/ExecutionEvent.js` |
| CP-M02 | `server/models/User.js` |
| CP-M03 | `server/models/Attendance.js` |

## Review order

1. CP-C02 → CP-S01 (API wiring)
2. CP-S03 → CP-S05 (Tantra/SETU)
3. CP-S06 + CP-S07 (HR sensitive)
4. CP-C01 (role routes)

**Status:** Index only.
