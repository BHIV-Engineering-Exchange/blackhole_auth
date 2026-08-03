# Code Packets Index — biometric-blackhole Handover

**Generated:** 2026-07-05

## Critical Code Entry Points

| File | Purpose |
|------|---------|
| `backend/api.py` | Flask REST API — 21 routes, production entry |
| `backend/auth.py` | JWT authentication, `@jwt_required` |
| `backend/database.py` | MongoDB connection, indexes |
| `backend/attendance_processor.py` | Excel parsing + salary calculation |
| `frontend/src/App.jsx` | React routing + auth guards |
| `frontend/src/contexts/AuthContext.jsx` | Auth state provider |
| `frontend/src/lib/auth.js` | Token storage + authFetch |
| `frontend/src/pages/Reports.jsx` | Main reports dashboard |
| `render.yaml` | Render deployment config |

## Artifacts to Add Here

- [ ] Code review notes
- [ ] Critical diff summaries
- [ ] Security remediation diffs

See `../08_Folder_Structure.md` for full layout.
