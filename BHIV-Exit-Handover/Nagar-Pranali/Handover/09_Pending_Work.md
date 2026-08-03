# Pending Work — Nagar-Pranali

**Generated:** 2026-07-06

---

## High Priority

| # | Item | Details |
|---|------|---------|
| 1 | **Fix schema/table name mismatches** | Align routes with `schema.sql` (`telemetry_events`→`telemetry`, `replay_sessions`→`replay_records`, `signal_id`→`id`) |
| 2 | **Wire frontend to backend API** | Replace hardcoded `sampleData` in `App.jsx` with `services/api.js` calls |
| 3 | **Verify production deployment** | Confirm Render + Vercel + MySQL live and env vars set |
| 4 | **Fix `/health` endpoint** | Add real MySQL ping instead of static `"CONNECTED"` |
| 5 | **Update README API docs** | `UCCIS -Main/README.md` lists non-existent POST routes |

---

## Medium Priority

| # | Item | Details |
|---|------|---------|
| 6 | **Add authentication** | Currently disabled for demo — required for any production use |
| 7 | **Fix DEPLOYMENT_GUIDE** | Says `npm start` for frontend; actual script is `npm run dev` |
| 8 | **Remove unused dependencies** | `react-router-dom` installed but unused |
| 9 | **Add automated tests** | No tests exist; backend `npm test` exits with error |
| 10 | **Add CI pipeline** | No GitHub Actions |
| 11 | **Foreign key constraints** | Schema has no FK constraints — add for data integrity |
| 12 | **Dashboard live updates** | UI doesn't reflect DB after demo trigger |

---

## Low Priority / Enhancements

| # | Item | Details |
|---|------|---------|
| 13 | **WebSocket real-time sync** | Documented as not working in DEMO_REVIEW_PACKET |
| 14 | **Multi-user concurrency** | Not supported |
| 15 | **Advanced analytics** | Analytics page uses static/mock data |
| 16 | **URL routing** | Add react-router for bookmarkable views |
| 17 | **Docker support** | No containerization |
| 18 | **Expand root README.md** | Currently one-line title only |
| 19 | **TTG dataset integration** | Documented as mocked |
| 20 | **Replay engine enhancement** | Simplified/mock timeline generation |

---

## Schema Fix Checklist

Files requiring SQL query updates:

- [ ] `server.js` — `/api/dashboard` subqueries
- [ ] `routes/signals.js` — `signal_id` → `id`
- [ ] `routes/telemetry.js` — `telemetry_events` → `telemetry`
- [ ] `routes/replay.js` — verify table name `replay_records`
- [ ] Any other routes referencing old table names

---

## Frontend Wiring Checklist

- [ ] Import `API` from `services/api.js` in `App.jsx`
- [ ] Fetch `/api/dashboard` for summary counts
- [ ] Fetch `/api/signals`, `/api/incidents`, etc. per page
- [ ] Add demo trigger buttons calling `POST /api/demo/*`
- [ ] Loading/error states
- [ ] Set `VITE_API_URL` on Vercel

---

## Recommended Next Sprint

1. Fix all SQL mismatches (1–2 hours)
2. Wire frontend to API (half day)
3. Verify production deploy end-to-end
4. Add basic integration test for demo chain
5. Update in-repo README and DEPLOYMENT_GUIDE
