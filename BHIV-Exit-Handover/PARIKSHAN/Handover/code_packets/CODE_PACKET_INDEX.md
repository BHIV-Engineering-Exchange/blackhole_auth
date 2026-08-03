# Code Packet Index — PARIKSHAN / NIYANTRAN V1

Reference map of critical code paths for reviewers and incoming engineers.

---

## Backend packets

| ID | Path | Why it matters |
|----|------|----------------|
| CP-B01 | `backend/server.js` | App bootstrap, MongoDB, Socket.IO, stream start |
| CP-B02 | `backend/routes/niyantranRoutes.js` | REST surface |
| CP-B03 | `backend/controllers/niyantranController.js` | Overview + action + socket emit |
| CP-B04 | `backend/services/overviewService.js` | Overview aggregation |
| CP-B05 | `backend/services/actionService.js` | Operator actions + validation |
| CP-B06 | `backend/services/alertEngineService.js` | Alert rules |
| CP-B07 | `backend/services/mockSignalService.js` | Seed data + mock Pravah |
| CP-B08 | `backend/streams/niyantranStream.js` | 5s realtime loop |
| CP-B09 | `backend/models/Entity.js` | Core schema |
| CP-B10 | `backend/models/Alert.js` | Alert schema |
| CP-B11 | `backend/models/ActionLog.js` | Audit schema |

---

## Frontend packets

| ID | Path | Why it matters |
|----|------|----------------|
| CP-F01 | `frontend/src/App.tsx` | Provider + hydrate entry |
| CP-F02 | `frontend/src/context/NiyantranContext.tsx` | Global state |
| CP-F03 | `frontend/src/hooks/useRealtimeNiyantran.ts` | Socket subscription |
| CP-F04 | `frontend/src/services/api.ts` | REST client (**port default 4001**) |
| CP-F05 | `frontend/src/services/socket.ts` | Socket client (**port default 4001**) |
| CP-F06 | `frontend/src/pages/Dashboard.tsx` | All tabs + hardcoded demo data |

---

## Configuration packets

| ID | Path | Why it matters |
|----|------|----------------|
| CP-C01 | `backend/package.json` | Backend deps and scripts |
| CP-C02 | `frontend/package.json` | Frontend deps and scripts |
| CP-C03 | `frontend/vite.config.ts` | Vite build config |

---

## Suggested review order

1. CP-B01 → CP-B02 → CP-B03 (request path)
2. CP-B07 → CP-B08 (telemetry loop)
3. CP-F01 → CP-F02 → CP-F03 (client state + realtime)
4. CP-F06 (UI completeness vs placeholders)
5. CP-F04 / CP-F05 (port mismatch)

---

## Export instructions

To create zip archives for external review:

```bash
# Example: backend core
zip -r code-packet-backend-core.zip backend/server.js backend/routes backend/controllers backend/services backend/streams backend/models
```

**Status:** Index only — zip exports not yet generated.
