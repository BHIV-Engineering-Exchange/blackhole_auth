# Folder Structure — blackhole_auth

**Generated:** 2026-07-05

---

## Repository Root

```
blackhole_auth/
├── backend/                 # Express auth client
├── frontend/                # React SSO dashboard
└── Handover/                # Exit handover package
```

**No root README, no render.yaml, no .gitignore found.**

---

## Backend (`backend/`)

```
backend/
├── src/
│   ├── server.js                    # ★ HTTP entry — app.listen(port)
│   ├── app.js                       # ★ Express app, routes, middleware
│   ├── config/
│   │   └── env.js                   # ★ Env validation + exports
│   └── middleware/
│       ├── blackholeAuth.js         # ★ JWT cookie auth (requireAuth, optionalAuth, requireApp)
│       └── errorHandler.js          # 404 + error handler
├── .env                             # ⚠️ Local secrets (verify not committed)
├── .env.example                     # ⚠️ Stale — contains unused vars
├── package.json                     # bhiv-core-auth-client
└── node_modules/
```

**Total source files:** 5 JavaScript files

---

## Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── App.jsx                      # ★ Route definitions
│   ├── main.jsx                     # React entry + AuthProvider
│   ├── styles.css                   # Global styles
│   ├── api/
│   │   └── client.js                # ★ Axios client (withCredentials)
│   ├── context/
│   │   └── AuthContext.jsx          # ★ Session state + postMessage listener
│   ├── constants/
│   │   └── apps.js                  # ★ Product catalog (5 apps)
│   ├── pages/
│   │   ├── WelcomePage.jsx          # Landing page
│   │   ├── LoginPage.jsx            # ★ Email + iframe popup auth
│   │   └── DashboardPage.jsx        # ★ Product launcher
│   └── components/
│       ├── AppCard.jsx              # App tile component
│       ├── ProtectedRoute.jsx       # Auth guard
│       ├── PublicRoute.jsx          # Redirect if logged in
│       └── Spinner.jsx              # Loading spinner
├── public/
│   └── favicon.svg
├── .env                             # VITE_* vars
├── index.html
├── vite.config.js                   # Basic Vite + React plugin
├── package.json                     # bhiv-core-dashboard
└── node_modules/
```

**Total source files:** 13 JSX/JS/CSS files

---

## Handover (`Handover/`)

```
Handover/
├── 01_README.md … 18_Rollback_Guide.md
├── review_packets/REVIEW_PACKET_INDEX.md
├── code_packets/CODE_PACKET_INDEX.md
├── Screenshots/README.md
└── Videos/README.md
```

---

## Critical Entry Points (★)

| File | Why Critical |
|------|-------------|
| `backend/src/app.js` | All routes and middleware |
| `backend/src/middleware/blackholeAuth.js` | JWT cookie validation logic |
| `backend/src/config/env.js` | Required env vars |
| `frontend/src/context/AuthContext.jsx` | Auth flow + postMessage |
| `frontend/src/pages/LoginPage.jsx` | Iframe popup to auth server |
| `frontend/src/pages/DashboardPage.jsx` | App launcher + access control |
| `frontend/src/constants/apps.js` | Product URLs |

---

## External Dependencies (Not in Repo)

| System | URL |
|--------|-----|
| Auth Server | https://bhiv-auth.onrender.com |
| Product Apps | *.blackholeinfiverse.com |

---

## TODO: Verify

- [ ] Add root README and .gitignore
- [ ] Whether node_modules should be in repo (currently present locally)
