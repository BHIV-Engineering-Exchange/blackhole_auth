# Folder Structure — hackaverse

**Generated:** 2026-07-05

---

## Repository Root

```
hackaverse/
├── hackathon/                  # ★ FastAPI backend
├── hackaverse-frontend/        # ★ React SPA
├── docs/                       # ecosystem_flow.md
├── review_packets/             # Existing REVIEW_PACKET.md
├── Hackaverse/                 # Duplicate documentation copies
├── Handover/                   # This exit handover package
├── SYSTEM_HANDOVER.md          # Full technical docs
├── ENV_REFERENCE.md            # Env var reference
├── API_CONTRACT.md             # API contract
├── DEPLOYMENT_NOTES.md         # Deploy guide
├── CURRENT_PROJECT_STATUS.md   # Admin/judge audit
└── ... (50+ markdown reports)
```

---

## Backend (`hackathon/`)

```
hackathon/
├── src/
│   ├── main.py                     # ★ FastAPI entry, middleware, /api/v1 routers
│   ├── database.py                 # ★ MongoDB connection + indexes
│   ├── auth.py                     # JWT + API key deps
│   ├── db_models.py                # Pydantic models
│   ├── models.py                   # Additional schemas
│   ├── middleware.py               # SecurityMiddleware
│   ├── routes/                     # ★ 20 route modules
│   │   ├── auth_routes.py
│   │   ├── admin.py
│   │   ├── hackathons.py
│   │   ├── teams.py / teams_crud.py / team_members_management.py
│   │   ├── submissions.py / submissions_crud.py
│   │   ├── judge.py / judge_review.py / judge_invitations.py
│   │   ├── leaderboard.py
│   │   ├── notifications.py
│   │   ├── system.py
│   │   ├── user_profile.py
│   │   ├── file_uploads.py
│   │   ├── webhooks.py
│   │   ├── mcp.py
│   │   └── missing_endpoints.py
│   ├── judging/                    # AI judge engine
│   │   ├── multi_agent_judge.py
│   │   ├── rubric.py
│   │   └── consensus.py
│   ├── agents/                     # AI agents (mentor, judge, system)
│   ├── observability/              # Trace middleware, logging
│   ├── services/                   # email, discord
│   ├── integrations/               # BHIV connectors
│   ├── schemas/                    # APIResponse
│   └── utils/                      # rate limiter, sanitizer, pagination
├── tests/                          # pytest suite
├── scripts/                        # seed, verify, validation scripts
├── reports/                        # validation reports
├── requirements.txt
├── render.yaml                     # ★ Render deploy config
├── .env.example
├── seed_data.py                    # ★ DB seeding
└── seed_data.py
```

---

## Frontend (`hackaverse-frontend/`)

```
hackaverse-frontend/
├── src/
│   ├── App.jsx                     # ★ Route definitions (admin/participant/judge)
│   ├── main.jsx
│   ├── services/
│   │   ├── api.js                  # ★ Canonical API client
│   │   └── apiClient.js            # DEPRECATED
│   ├── contexts/
│   │   ├── AuthContext.jsx         # ★ Auth state
│   │   ├── ThemeContext.jsx
│   │   ├── NotificationContext.jsx
│   │   └── SyncContext.jsx
│   ├── components/
│   │   ├── admin/                  # Admin dashboard pages
│   │   ├── judge/                  # Judge review UI
│   │   ├── participant/            # Participant workspace
│   │   ├── pages/                  # Shared pages (leaderboard, etc.)
│   │   ├── auth/                   # ProtectedRoute, AuthModal
│   │   └── ui/                     # 20+ UI components
│   ├── utils/
│   │   ├── rbac.js                 # Role constants
│   │   └── roleRedirect.js
│   └── constants/
│       ├── appConstants.js         # API_BASE_URL
│       └── apiKey.js
├── scripts/check-environment.js
├── vite.config.js                  # Proxy /api → :8000
├── vercel.json
├── tailwind.config.js
├── package.json
└── vitest.config.js
```

---

## Critical Entry Points (★)

| File | Why |
|------|-----|
| `hackathon/src/main.py` | App bootstrap, all routers |
| `hackathon/src/routes/auth_routes.py` | Auth + forced participant role |
| `hackathon/src/judging/multi_agent_judge.py` | AI scoring |
| `hackathon/seed_data.py` | Admin/judge user creation |
| `hackaverse-frontend/src/App.jsx` | All frontend routes |
| `hackaverse-frontend/src/services/api.js` | API integration |
| `hackaverse-frontend/src/contexts/AuthContext.jsx` | Session management |

---

## Duplicate Documentation

The `Hackaverse/` subfolder contains copies of many root markdown files. Prefer root-level docs; consider archiving duplicates.

---

## TODO: Verify

- [ ] Whether `Hackaverse/` subfolder should be removed
- [ ] `server.js` mock server usage in frontend
