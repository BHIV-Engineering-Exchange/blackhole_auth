# Folder Structure — AI-Content

**Generated:** 2026-07-05

---

## Repository Root

```
AI-Content/
├── README.md                    # "# TenderAI" (minimal)
├── package-lock.json            # Orphaned (no root package.json)
├── backend/                     # FastAPI Python backend
├── frontend/                    # React TypeScript SPA
└── Handover/                    # Exit handover package
```

---

## Backend (`backend/`)

```
backend/
├── .github/workflows/
│   └── ci-cd-production.yml     # CI/CD pipeline (may need repo root move)
├── app/                         # FastAPI application (38 files)
│   ├── main.py                  # App entry point
│   ├── routes.py                # 9-step workflow routers
│   ├── routes_updated.py        # Alternate routes (NOT imported)
│   ├── auth.py                  # /users auth endpoints
│   ├── auth_middleware.py       # GlobalAuthMiddleware
│   ├── security.py              # JWTManager
│   ├── jwks_auth.py             # Supabase JWKS
│   ├── models.py                # Pydantic schemas
│   ├── agent.py                 # Q-Learning RL agent
│   ├── task_queue.py            # Background tasks
│   ├── cdn_fixed.py             # Active CDN router
│   ├── cdn_routes.py            # Unused CDN variant
│   ├── cdn_supabase.py          # Unused CDN variant
│   ├── presigned_urls.py        # S3/MinIO presigned URLs
│   ├── gdpr_compliance.py       # GDPR endpoints
│   ├── analytics_jinja.py       # Jinja dashboard
│   ├── analytics.py             # NOT mounted
│   ├── analytics_dashboard.py   # NOT mounted
│   ├── simple_feedback_route.py # /feedback-simple
│   ├── input_validation.py      # Body size validation
│   ├── rate_limit_middleware.py # Rate limiting
│   ├── request_middleware.py    # Request ID, logging
│   ├── middleware.py            # Additional middleware defs
│   ├── config.py                # App configuration
│   └── templates/               # Jinja HTML templates
├── core/                        # Core business logic
│   ├── database.py              # DatabaseManager
│   ├── models.py                # SQLModel tables
│   ├── bhiv_bucket.py           # Local JSON storage
│   ├── bhiv_bucket_enhanced.py  # Enhanced bucket ops
│   ├── bhiv_core.py             # Content analysis
│   ├── bhiv_lm_client.py        # LLM client
│   ├── s3_storage.py            # S3 adapter
│   ├── s3_storage_adapter.py    # S3 adapter alt
│   ├── sentiment_analyzer.py    # VADER sentiment
│   └── system_logger.py         # Structured logging
├── video/                       # Video generation
│   ├── generator.py             # MoviePy generator
│   ├── storyboard.py            # Storyboard creation
│   └── failed_cases.py          # Failure handling
├── bucket/                      # Local JSON storage segments
├── config/                      # Additional config files
├── data/                        # Runtime data
│   └── reports/                 # Deployment reports
├── docker/
│   ├── Dockerfile               # Alt Dockerfile (port 8000)
│   ├── render.yaml              # Alt render config
│   └── deployment/
│       ├── docker-compose.yml   # App + nginx
│       └── deploy.sh            # Deploy script
├── docs/                        # Extensive documentation
├── migrations/                  # Alembic migrations
│   └── versions/
│       └── cf09dd265e44_create_complete_schema.py
├── nginx/                       # nginx configuration
├── reports/                     # Generated reports
├── scripts/
│   ├── start_server.py          # Dev server launcher
│   ├── deployment/              # Deploy scripts
│   │   ├── deploy.py
│   │   ├── deploy_to_render.py
│   │   ├── deployment_validation.py
│   │   └── force_deployment.py
│   ├── local_llm_server.py      # Local LLM dev server
│   └── perplexity_llm_server.py # Perplexity LLM dev server
├── tests/
│   ├── unit/                    # Unit tests (20+ files)
│   ├── integration/             # Integration tests
│   └── load_testing/            # Locust load tests
├── Dockerfile                   # Primary Dockerfile (port 9000)
├── render.yaml                  # Render Blueprint
├── requirements.txt             # Python dependencies
├── alembic.ini                  # Alembic config
├── .env.example                 # Environment reference
├── README.md                    # Full backend documentation
├── BACKEND_ERRORS_AND_BUGS.md   # Known bugs report
├── verify_deployment.py         # Deployment verification
└── [many fix/verify scripts at backend root]
```

---

## Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── UploadSection.tsx
│   │   └── VideoPreview.tsx
│   ├── context/
│   │   ├── AuthContext.tsx      # Auth state + token management
│   │   └── ThemeContext.tsx     # Dark/light theme
│   ├── lib/
│   │   └── utils.ts             # Utility functions
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── AuthPage.tsx
│   │   └── Dashboard.tsx
│   ├── services/
│   │   └── api.ts                 # Axios API client
│   ├── App.tsx                    # Route definitions
│   ├── main.tsx                   # React entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── .env.example
├── README.md
├── QUICKSTART.md
├── ARCHITECTURE.md
├── DEVELOPMENT.md
├── PROJECT_SUMMARY.md
├── INSTALLATION_CHECKLIST.md
└── INDEX.md
```

---

## Handover Package (`Handover/`)

```
Handover/
├── 01_README.md through 18_Rollback_Guide.md
├── review_packets/
├── code_packets/
├── Screenshots/
└── Videos/
```

---

## Key Entry Points

| Purpose | File |
|---------|------|
| Backend app | `backend/app/main.py` |
| Routes (all endpoints) | `backend/app/routes.py` |
| Auth | `backend/app/auth.py` |
| Database | `backend/core/database.py` |
| SQLModel models | `backend/core/models.py` |
| Video generation | `backend/video/generator.py` |
| RL agent | `backend/app/agent.py` |
| Frontend app | `frontend/src/main.tsx` |
| Frontend routes | `frontend/src/App.tsx` |
| API client | `frontend/src/services/api.ts` |
| CI/CD | `backend/.github/workflows/ci-cd-production.yml` |
| Render deploy | `backend/render.yaml` |
| Dev server | `backend/scripts/start_server.py` |
