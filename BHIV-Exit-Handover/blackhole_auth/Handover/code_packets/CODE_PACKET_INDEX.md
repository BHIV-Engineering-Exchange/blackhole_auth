# Code Packets Index — blackhole_auth Handover

**Generated:** 2026-07-05

## Critical Code Entry Points

| File | Purpose |
|------|---------|
| `backend/src/app.js` | Express app, routes, middleware stack |
| `backend/src/middleware/blackholeAuth.js` | JWT cookie validation |
| `backend/src/config/env.js` | Required environment variables |
| `frontend/src/context/AuthContext.jsx` | Session state, postMessage listener |
| `frontend/src/pages/LoginPage.jsx` | Iframe popup auth flow |
| `frontend/src/pages/DashboardPage.jsx` | Product launcher |
| `frontend/src/api/client.js` | Axios client with credentials |
| `frontend/src/constants/apps.js` | Product catalog |

## Artifacts to Add Here

- [ ] Code review notes
- [ ] Auth server integration contract notes
- [ ] JWT payload examples (sanitized)

See `../08_Folder_Structure.md` for full layout.
