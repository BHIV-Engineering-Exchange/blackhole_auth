# Database Schema — PARIKSHAN / NIYANTRAN V1

**Engine:** MongoDB  
**Database name:** `bhiv-niyantran` (default)  
**ODM:** Mongoose 9  
**Connection:** `MONGODB_URI` env or `mongodb://127.0.0.1:27017/bhiv-niyantran`

---

## Collections overview

| Collection | Model file | Purpose |
|------------|------------|---------|
| `entities` | `models/Entity.js` | Projects, teams, individuals |
| `alerts` | `models/Alert.js` | Active and resolved alerts |
| `actionlogs` | `models/ActionLog.js` | Operator action audit trail |

Mongoose pluralizes model names to collection names by default.

---

## `entities`

Represents execution units at three levels.

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | String | Yes | Unique business key, e.g. `project-1`, `team-2`, `individual-3` |
| `type` | String | Yes | Enum: `project`, `team`, `individual` |
| `status` | String | Yes | Enum: `green`, `yellow`, `red` |
| `current_task` | String | Yes | Human-readable task label |
| `progress` | Number | Yes | 0–100 |
| `blockers` | [String] | No | Default `[]` |
| `trace_id` | String | Yes | Tracing identifier; indexed |
| `execution_id` | String | Yes | Execution run identifier |
| `last_updated` | Date | Yes | Indexed; used by alert engine (6h inactivity) |
| `metadata` | Object | No | Type-specific fields (see below) |

**Indexes:** `id`, `type`, `trace_id`, `last_updated`

### Seed metadata examples

**Project:** `{ assigned_team: "team-1" }`  
**Team:** `{ members: ["individual-1", "individual-2"], velocity: 40–100 }`  
**Individual:** `{ issues: [], idle_state: false, last_activity: Date }`

---

## `alerts`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | String | Yes | Unique alert id |
| `alert_type` | String | Yes | e.g. `missing_trace_id`, `no_activity`, `repeated_failure`, `blocker_present` |
| `severity` | String | Yes | `green`, `yellow`, `red` |
| `entity_id` | String | Yes | References `entities.id` |
| `message` | String | Yes | Display message |
| `trace_id` | String | Yes | From entity |
| `created_at` | Date | Yes | |
| `status` | String | Yes | `active` or `resolved` |
| `context` | Object | No | Extra alert context |

Alert engine (`alertEngineService.js`) upserts active alerts; `resolve` action sets status to resolved.

---

## `actionlogs`

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | String | Yes | Unique log id |
| `action_type` | String | Yes | `assign`, `escalate`, `ping`, `resolve` |
| `entity_id` | String | Yes | Target entity |
| `trace_id` | String | Yes | |
| `payload` | Object | No | Operator-supplied data |
| `created_at` | Date | Yes | |

Created by `actionService.executeAction()` on each POST `/niyantran/action`.

---

## Seed data

On first server start when `entities` count is 0:

| Type | Count |
|------|-------|
| project | 4 |
| team | 3 |
| individual | 6 |

Source: `mockSignalService.ensureSeedData()`

---

## Mock telemetry mutations

Every 5 seconds `simulatePravahEvent()`:

- Picks random entity
- Increments `progress`, may set `status` red/yellow/green
- May add blockers
- Updates individual `metadata` (idle, issues, last_activity)

---

## Backup / restore

**TODO: Verify** — Atlas backup schedule or manual `mongodump` procedure for production.

```bash
# Example local dump (adjust URI)
mongodump --uri="mongodb://127.0.0.1:27017/bhiv-niyantran" --out=./backup
mongorestore --uri="mongodb://127.0.0.1:27017/bhiv-niyantran" ./backup/bhiv-niyantran
```

---

## Schema migrations

No migration framework in repo. Schema changes require manual MongoDB updates or Mongoose model edits with coordinated deploy.
