# Backend Guide — PARIKSHAN / NIYANTRAN V1

## Overview

Node.js **Express 5** server with **Mongoose** (MongoDB) and **Socket.IO** for realtime broadcasts. Service identifier: `bhiv-niyantran`.

**Entry:** `backend/server.js`

---

## Startup sequence

1. Load `dotenv`
2. Create Express app + HTTP server
3. Attach Socket.IO to HTTP server; store on `app.set("io", io)`
4. Middleware: `cors` (permissive), `express.json()`
5. Routes: `/health`, `/niyantran/*`
6. Connect MongoDB via `mongoose.connect(MONGODB_URI)`
7. `mockSignalService.ensureSeedData()` — seed if empty
8. `startNiyantranStream(io)` — 5s interval mock telemetry
9. Listen on `PORT` (default **4000**)

---

## Routing

**File:** `backend/routes/niyantranRoutes.js`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/niyantran/overview` | `getOverviewController` |
| POST | `/niyantran/action` | `postActionController` |
| GET | `/niyantran/stream` | Stream info endpoint |

**File:** `backend/controllers/niyantranController.js`

- Overview delegates to `overviewService.getOverview()`
- Action validates body, executes via `actionService`, emits socket event, returns 201

---

## Services

### `overviewService.js`

Aggregates all entities by type, fetches active alerts, computes `blockers` (entities with non-empty `blockers` array).

### `actionService.js`

| `action_type` | Behavior (summary) |
|---------------|-------------------|
| `assign` | Updates entity metadata / task assignment |
| `escalate` | Escalation flags and alert interaction |
| `ping` | Logs ping; may update entity |
| `resolve` | Resolves active alerts for entity |

Writes `ActionLog` document for each action. See source for exact field mutations.

### `alertEngineService.js`

Runs after each stream tick. Scans entities and creates/upserts **active** alerts for:

- Missing `trace_id`
- No activity > 6 hours (`last_updated`)
- `status === "red"` (repeated failure)
- Non-empty `blockers` (blocker present)

### `mockSignalService.js`

- **`ensureSeedData()`** — 4 projects, 3 teams, 6 individuals on empty DB
- **`simulatePravahEvent()`** — random entity update simulating upstream Pravah telemetry (not real integration)

---

## Realtime stream

**File:** `backend/streams/niyantranStream.js`

Every **5000 ms**:

1. `simulatePravahEvent()` → updated entity
2. `runAlertEngine()` → new alerts
3. Query all active alerts
4. `io.emit("niyantran:update", { type: "stream", entity, alerts, ... })`
5. On error → `io.emit("niyantran:error", ...)`

---

## Models

| Model | File | Collection |
|-------|------|------------|
| Entity | `models/Entity.js` | `entities` |
| Alert | `models/Alert.js` | `alerts` |
| ActionLog | `models/ActionLog.js` | `actionlogs` |

See `08_Database_Schema.md` for field reference.

---

## Socket.IO

- Same HTTP server as Express (shared port)
- CORS for socket matches Express setup
- Client events: connection → server may emit `niyantran:connected` (**TODO: Verify** in `server.js`)

---

## Environment

| Variable | Default |
|----------|---------|
| `PORT` | `4000` |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/bhiv-niyantran` |

---

## Error handling

Express error middleware returns JSON. Stream errors are caught per tick and emitted on socket — they do not crash the process.

---

## Extension points

| Need | Suggested approach |
|------|-------------------|
| Real Pravah integration | Replace `simulatePravahEvent` with consumer/webhook |
| Auth | Middleware on `/niyantran/*` + socket handshake auth |
| Logging | Structured logger + persist stream errors |
| Rate limits | Express rate-limit on POST `/action` |

---

## Scripts

```bash
npm run dev    # nodemon server.js
npm start      # node server.js
```

No test script defined.
