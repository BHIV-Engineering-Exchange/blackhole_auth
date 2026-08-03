# API Reference — PARIKSHAN / NIYANTRAN V1

**Base URL (local):** `http://localhost:4000`  
**Base URL (production):** **TODO: Verify**

All `/niyantran/*` routes are **unauthenticated**.

---

## REST endpoints

### GET `/health`

Health check for service and database connectivity.

**Response (200):** JSON with `status`, `service` (`bhiv-niyantran`), timestamp — exact shape from `server.js`.

---

### GET `/niyantran/stream`

Returns stream metadata (not the live socket stream itself).

**Response (200):** JSON describing stream configuration — see `niyantranRoutes.js`.

---

### GET `/niyantran/overview`

Primary read endpoint for dashboard initial state.

**Response (200):**

```json
{
  "projects": [ /* Entity[] */ ],
  "teams": [ /* Entity[] */ ],
  "individuals": [ /* Entity[] */ ],
  "alerts": [ /* Alert[] */ ],
  "blockers": [ /* Entity[] with non-empty blockers */ ]
}
```

Entity and Alert field shapes documented in `08_Database_Schema.md`.

---

### POST `/niyantran/action`

Execute an operator action on an entity.

**Request body:**

| Field | Type | Required | Values |
|-------|------|----------|--------|
| `action_type` | string | Yes | `assign`, `escalate`, `ping`, `resolve` |
| `entity_id` | string | Yes | Entity `id` |
| `payload` | object | No | Action-specific metadata |

**Validation errors:** `400` with `{ "error": "<message>" }`

**Success (201):**

```json
{
  "action": { /* ActionLog */ },
  "entity": { /* updated Entity */ },
  "alerts": [ /* active alerts for entity */ ]
}
```

**Side effect:** Server emits Socket.IO event `niyantran:update` with `type: "action"`.

---

## Socket.IO

**Connection URL:** Same as REST base (`VITE_API_BASE_URL` on client).  
**Transports:** WebSocket only (`transports: ["websocket"]` on client).  
**Auto-connect:** Disabled in `socket.ts` — `useRealtimeNiyantran` connects manually.

### Server → client events

| Event | Payload (summary) | When |
|-------|-------------------|------|
| `niyantran:connected` | Connection ack | On client connect |
| `niyantran:update` | `{ type, entity?, alerts?, ... }` | Every 5s stream tick or after action |
| `niyantran:error` | `{ trace_id, message }` | Stream processing failure |

### `niyantran:update` types

| `type` | Source |
|--------|--------|
| `stream` | `niyantranStream.js` interval (mock telemetry) |
| `action` | `postActionController` after successful POST |

**Client handling:** `useRealtimeNiyantran` → `mergeRealtimeUpdate({ entity, alerts })`.

---

## Error handling

- Express error middleware returns JSON errors for unhandled exceptions
- Frontend `hydrate()` catches failures in `finally` only — **does not display error to user** (known gap)
- Socket errors emitted as `niyantran:error` but UI handling **TODO: Verify**

---

## Example curl

```bash
# Overview
curl http://localhost:4000/niyantran/overview

# Ping action
curl -X POST http://localhost:4000/niyantran/action \
  -H "Content-Type: application/json" \
  -d '{"action_type":"ping","entity_id":"project-1","payload":{"note":"handover test"}}'
```

---

## Related services

| Service | Integration in this repo |
|---------|-------------------------|
| Pravah (execution pipeline) | **Not integrated** — mocked via `simulatePravahEvent()` |
| Sampada / Infiverse-HR | **None** — separate product |
