# Folder Structure — biometric-blackhole

**Generated:** 2026-07-05

---

## Repository Root

```
biometric-blackhole/
├── README.md                    # "# biometric-blackhole" (stub)
├── render.yaml                  # Render deployment config
├── DEPLOYMENT.md                # Deploy guide (Vercel + Render)
├── INSTALLATION_GUIDE.md        # Setup instructions
├── SETUP.md                     # Additional setup docs
├── start.bat / start.sh         # Start both services
├── supabase_schema.sql          # ⚠️ OBSOLETE — MongoDB used instead
├── supabase_schema_update.sql   # ⚠️ OBSOLETE
├── paid_employees_migration.sql # ⚠️ OBSOLETE
├── fix_indentation.py           # Fix processor indentation
├── backend/                     # Python backend
├── frontend/                    # React SPA
└── Handover/                    # Exit handover package
```

---

## Backend (`backend/`)

```
backend/
├── api.py                       # ★ Production Flask REST API entry
├── app.py                       # Streamlit alternate UI
├── auth.py                      # JWT auth (register, login, jwt_required)
├── database.py                  # MongoDB connection + indexes
├── attendance_processor.py      # ★ Excel parsing + salary logic
├── config.py                    # App configuration
├── requirements.txt             # Python dependencies
├── validate.py                  # Validation utilities
├── run_demo.py                  # Demo runner
├── create_sample.py             # Sample data generator
├── examples.py                  # Usage examples
├── debug_file.py                # Debug helper
├── process_standardreport01.py  # Standard report processor
├── start.sh                     # Backend start script
├── README.md                    # Backend documentation
├── QUICK_START.md               # Quick start guide
├── START_HERE.md                # Getting started
├── INDEX.md                     # File index
├── FILE_GUIDE.md                # File descriptions
├── FEATURES.md                  # Feature list
├── DELIVERABLES.md              # Deliverables list
└── COMPLETION_SUMMARY.md        # Project completion notes
```

---

## Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── App.jsx                  # ★ Router + auth guard + role redirect
│   ├── main.jsx                 # React entry point
│   ├── index.css                # Tailwind styles
│   ├── config.js                # API URL configuration
│   ├── contexts/
│   │   └── AuthContext.jsx      # ★ Auth state provider
│   ├── lib/
│   │   └── auth.js              # ★ Token storage + authFetch
│   ├── services/
│   │   └── apiService.js        # API call functions
│   ├── pages/
│   │   ├── Auth.jsx             # Login / Register
│   │   ├── Upload.jsx           # Excel upload
│   │   └── Reports.jsx          # ★ Main reports dashboard
│   └── components/
│       ├── Layout.jsx           # App layout wrapper
│       └── DateCalendar.jsx     # Date picker component
├── index.html
├── vite.config.js               # Vite config (proxy in dev)
├── tailwind.config.js
├── postcss.config.js
├── vercel.json                  # Vercel deployment config
├── package.json
└── .gitignore
```

---

## Handover (`Handover/`)

```
Handover/
├── 01_README.md … 18_Rollback_Guide.md
├── review_packets/
│   └── REVIEW_PACKET_INDEX.md
├── code_packets/
│   └── CODE_PACKET_INDEX.md
├── Screenshots/                 # Placeholder for UI screenshots
└── Videos/                    # Placeholder for walkthrough recordings
```

---

## Root Documentation Files (Stale Supabase References)

| File | Status |
|------|--------|
| `DATABASE_MIGRATION_GUIDE.md` | References Supabase — stale |
| `SUPABASE_406_ERROR_FIX.md` | Stale |
| `USER_DATA_ISOLATION.md` | May be partially relevant |
| `USER_ISOLATION_FIX.md` | May be partially relevant |
| `ROLE_BASED_ROUTING.md` | Documents routing not fully implemented |
| `RE_AUTHENTICATION_FIX.md` | Auth fix notes |
| `RENDER_FIX_COMMANDS.md` | Render deploy fix notes |
| `FIX_RENDER.md` | Render fix notes |
| `FIX_ENV_ERROR.md` | Env setup fix |
| `ENV_SETUP_INSTRUCTIONS.md` | Env setup |
| `CREATE_ENV_FILE.md` | Env file creation |
| `CODE_CHANGES_SUMMARY.md` | Change log |
| `SETUP_COMPLETE.md` | Setup completion notes |
| `README_FRONTEND.md` | Frontend readme |

---

## Critical Entry Points (★)

| File | Why Critical |
|------|-------------|
| `backend/api.py` | All REST routes, production entry |
| `backend/auth.py` | JWT authentication |
| `backend/database.py` | MongoDB connection |
| `backend/attendance_processor.py` | Core business logic |
| `frontend/src/App.jsx` | Routing and auth guards |
| `frontend/src/contexts/AuthContext.jsx` | Auth state |
| `frontend/src/lib/auth.js` | Token management |
| `frontend/src/pages/Reports.jsx` | Main user interface |
| `render.yaml` | Production deployment config |

---

## TODO: Verify

- [ ] Whether all root markdown files are still relevant
- [ ] Whether Streamlit `app.py` should be archived
