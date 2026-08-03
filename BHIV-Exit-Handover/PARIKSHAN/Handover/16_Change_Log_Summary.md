# Change Log Summary — PARIKSHAN / NIYANTRAN V1

## Repository history

Based on local git log at handover time:

| Commit | Message | Notes |
|--------|---------|-------|
| `92f7ae3` | first commit | Initial import |
| `933032a` | saved | Latest known commit |

**TODO: Verify** — run `git log` on remote for commits after handover.

---

## Product evolution (inferred from code)

| Phase | State |
|-------|-------|
| Initial | Full-stack NIYANTRAN V1 scaffold — Express + React + MongoDB + Socket.IO |
| Current | Mock telemetry stream; partial dashboard with placeholder tabs |
| Not started | Real Pravah integration, auth, deployment, tests |

---

## Major components introduced

| Component | Location | Purpose |
|-----------|----------|---------|
| Entity model | `backend/models/Entity.js` | Project/team/individual state |
| Alert engine | `backend/services/alertEngineService.js` | Rule-based alerts |
| Mock Pravah | `backend/services/mockSignalService.js` | Simulated upstream events |
| Niyantran stream | `backend/streams/niyantranStream.js` | 5s broadcast loop |
| React context | `frontend/src/context/NiyantranContext.tsx` | Client state |
| Dashboard SPA | `frontend/src/pages/Dashboard.tsx` | All UI tabs |

---

## Dependency versions (snapshot)

See `03_Tech_Stack.md` for full list. Notable:

- Express **5**
- React **19**
- Vite **8**
- Mongoose **9**
- Tailwind **4**

---

## Undocumented changes

No `CHANGELOG.md` in repo. No release tags observed.

---

## Handover documentation

| Date | Event |
|------|-------|
| July 2026 | Exit handover package created under `PARIKSHAN/Handover/` |

---

## Recommended going forward

1. Maintain `CHANGELOG.md` for API and schema changes
2. Tag releases when deploying (`v1.0.0`, etc.)
3. Document Pravah integration in changelog when mock is replaced

---

## Related repos (BHIV workspace)

Handover packages also exist for (workspace siblings):

- gurukul-assesment
- Infiverse-HR (Sampada)
- Nagar-Pranali
- Namami-Gange

PARIKSHAN (NIYANTRAN) is the execution telemetry / master control dashboard product in that ecosystem.
