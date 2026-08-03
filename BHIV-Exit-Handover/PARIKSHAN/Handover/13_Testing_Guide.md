# Testing Guide — PARIKSHAN / NIYANTRAN V1

## Current state

**No automated tests exist in this repository.**

Verified absent:
- Test files (`*.test.ts`, `*.spec.js`, etc.)
- Test scripts in `backend/package.json` or `frontend/package.json`
- CI test workflows
- Coverage configuration

---

## Manual test plan

Use this checklist after setup (`05_Environment_Setup.md`) or any deploy.

### Backend

| # | Test | Steps | Expected |
|---|------|-------|----------|
| B1 | Health | `curl http://localhost:4000/health` | 200, status ok |
| B2 | Overview | `curl http://localhost:4000/niyantran/overview` | JSON with projects (4), teams (3), individuals (6) after seed |
| B3 | Stream meta | `GET /niyantran/stream` | 200 JSON |
| B4 | Action ping | POST action with valid `entity_id` | 201, action log created |
| B5 | Action invalid | POST missing `action_type` | 400 with error message |
| B6 | MongoDB seed | Fresh DB, restart server | Entities inserted once only |

### Frontend

| # | Test | Steps | Expected |
|---|------|-------|----------|
| F1 | Load dashboard | Open http://localhost:5173 | NIYANTRAN V1 header, overview visible |
| F2 | API connection | DevTools Network | `overview` 200 from port 4000 |
| F3 | Realtime | Wait 10s | Entity progress/status changes without refresh |
| F4 | Tab navigation | Click each sidebar tab | Live tabs show data; placeholders show InfoPage |
| F5 | Action UI | Trigger ping/resolve if exposed in UI | State updates after action |
| F6 | Port fix | Unset `VITE_API_BASE_URL` | Should fail or show empty — confirms env requirement |

### Socket.IO

| # | Test | Steps | Expected |
|---|------|-------|----------|
| S1 | Connection | DevTools → WS | Connected to backend host |
| S2 | Updates | Monitor frames | `niyantran:update` ~ every 5s |
| S3 | Action broadcast | POST action via curl while UI open | UI merges update |

---

## Suggested automated tests (future)

### Backend (Jest or Node test runner)

- `validateActionPayload` rejects invalid bodies
- `getOverview` returns correct shape
- `ensureSeedData` idempotent
- Integration: supertest against `/health` and `/niyantran/overview`

### Frontend (Vitest + React Testing Library)

- `NiyantranContext` mergeRealtimeUpdate upserts correctly
- Dashboard renders loading then data (mock axios)

### E2E (Playwright)

- Full flow: load page → see projects → wait for socket update

---

## Regression priorities

If adding tests incrementally, prioritize:

1. Action validation (security-adjacent)
2. Overview aggregation
3. Frontend hydrate + merge logic
4. E2E smoke on CI

---

## Test data reset

To re-seed from scratch (local only):

```bash
# MongoDB shell or Compass — drop collections
use bhiv-niyantran
db.entities.drop()
db.alerts.drop()
db.actionlogs.drop()
# Restart backend — ensureSeedData runs again
```

**Warning:** Do not run drops against production without approval.

---

## Performance smoke

**TODO: Verify** — acceptable latency for overview and socket under expected load. No benchmarks in repo.
