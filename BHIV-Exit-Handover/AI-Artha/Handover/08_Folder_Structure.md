# Folder Structure — AI-Artha

**Generated:** 2026-07-05

---

## Repository Root

```
AI-Artha/
├── .github/
│   └── workflows/
│       └── ci.yml                    # GitHub Actions CI pipeline
├── backend/                          # Express API server
├── contracts/
│   └── capability_contracts/         # JSON capability contracts + route map
├── docs/                             # Extended project documentation (80+ files)
│   └── handover/                     # Prior handover artifacts
├── frontend/                         # React SPA (Vite)
├── Handover/                         # Exit handover package (this folder)
├── monitoring/                       # Prometheus configuration
├── review_packets/                   # Review packet artifacts
├── scripts/                          # Root deploy/backup/verify scripts
├── start_readme/                     # Local setup guides and env templates
├── docker-compose.yml                # Production backend compose
├── docker-compose.dev.yml            # Development stack
├── docker-compose.prod.yml           # Full production stack
├── docker-compose.override.yml       # Compose override
├── docker-compose.override.prod.yml  # Production override
├── docker-compose.monitoring.yml     # Monitoring stack
├── Dockerfile                        # Root multi-stage backend build
├── k8s-deployment.example.yml        # Kubernetes example
├── pravah-deployment.yaml            # Pravah deployment format
├── package.json                      # Root (minimal: cors only)
├── README.md                         # Main project README
├── runtime_health_snapshot.json      # Runtime evidence
├── production_runtime_evidence.json  # Production evidence
├── production_transition_validation.json
├── runtime_participation_validation.json
└── observability_report.md
```

---

## Backend (`backend/`)

```
backend/
├── ci/
│   └── governance_validation_pipeline/
│       └── index.js                  # Governance CI pipeline
├── docs/
│   └── handover/                     # Backend handover certificates
├── scripts/                          # 50+ operational scripts
│   ├── seed.js                       # Database seeding
│   ├── seed-tds.js                   # TDS seed data
│   ├── create-indexes.js             # MongoDB indexes
│   ├── migrate-hash-chain.js         # Hash chain migration
│   ├── proof-all.js                  # Master proof orchestrator
│   ├── proof-replay.js               # Deterministic replay proof
│   ├── proof-compliance.js           # Compliance continuity proof
│   ├── proof-audit.js                # Production audit proof
│   ├── proof-certify.js              # Certification generation
│   ├── deploy.sh                     # Backend deploy helper
│   ├── backup.sh                     # Database backup
│   └── ...                           # verify-*, test-*, demo-* scripts
├── src/
│   ├── config/
│   │   ├── database.js               # MongoDB connection + transactions
│   │   └── redis.js                  # Redis client configuration
│   ├── controllers/                  # 26 controller files
│   │   ├── auth.controller.js
│   │   ├── ledger.controller.js
│   │   ├── invoice.controller.js
│   │   ├── expense.controller.js
│   │   ├── gst.controller.js
│   │   ├── tds.controller.js
│   │   ├── reports.controller.js
│   │   └── ...                       # (see Architecture doc for full list)
│   ├── middleware/                   # 10 middleware files
│   │   ├── auth.js                   # JWT protect + authorize
│   │   ├── authorityBoundary.js      # Capability enforcement
│   │   ├── security.js               # Helmet, rate limits
│   │   ├── cache.js                  # Redis caching
│   │   ├── upload.js                 # Multer uploads
│   │   ├── monitoring.js             # Request logging
│   │   ├── performance.js            # Memory monitoring
│   │   ├── validation.js             # Validators
│   │   ├── runtimeProof.js           # Runtime proof
│   │   └── rl-logger.js              # InsightFlow RL logging
│   ├── models/                       # 32 Mongoose model files
│   │   ├── User.js
│   │   ├── JournalEntry.js
│   │   ├── Invoice.js
│   │   ├── Expense.js
│   │   └── ...
│   ├── routes/                       # 26 route modules
│   │   ├── ledger.routes.js
│   │   ├── invoice.routes.js
│   │   ├── expense.routes.js
│   │   ├── gst.routes.js
│   │   ├── health.routes.js
│   │   └── ...
│   ├── runtime/                      # Runtime mode utilities
│   ├── services/                     # 30+ service files
│   │   ├── ledger.service.js         # Core accounting engine
│   │   ├── invoice.service.js
│   │   ├── expense.service.js
│   │   ├── gstEngine.service.js
│   │   ├── financialReports.service.js
│   │   ├── signalEngine.service.js
│   │   ├── setu.pipeline.js
│   │   ├── traceability.service.js
│   │   ├── compliance/               # Compliance sub-services
│   │   └── ...
│   ├── utils/
│   │   └── authToken.js              # JWT signing utilities
│   └── server.js                     # Express entry point
├── tests/
│   ├── adversarial/                  # Adversarial test suite
│   └── governance/                   # Governance negative scenarios
├── verification/                     # Independent verification suite
│   ├── independent_verifier/
│   ├── replay_verifier/
│   ├── authority_verifier/
│   ├── dependency_verifier/
│   └── index.js
├── uploads/                          # Local file storage (runtime)
├── Dockerfile                        # Backend Docker (dev)
├── Dockerfile.prod                   # Backend Docker (production)
├── jest.config.js                    # Jest configuration
├── render.yaml                       # Render.com deployment
├── package.json                      # Backend dependencies + scripts
├── .env.example                      # Environment reference
└── .env.production.example           # Production environment reference
```

---

## Frontend (`frontend/`)

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/                   # Layout, Sidebar, Navbar, AuthLayout
│   │   ├── intelligence/             # Signal panels
│   │   ├── ui/                       # Reusable UI components
│   │   └── ...
│   ├── design-system/                # Design tokens documentation
│   │   ├── colors.md
│   │   ├── typography.md
│   │   ├── spacing.md
│   │   ├── layout_rules.md
│   │   ├── dashboard_patterns.md
│   │   └── component_library.md
│   ├── hooks/                        # Custom React hooks
│   │   ├── useDashboard.js
│   │   ├── useInvoices.js
│   │   ├── useExpenses.js
│   │   ├── useSignals.js
│   │   ├── useComplianceSnapshot.js
│   │   ├── useRuntimeMode.js
│   │   └── useTheme.jsx
│   ├── pages/
│   │   ├── auth/                     # Login, Signup
│   │   ├── dashboard/                # Dashboard pages
│   │   ├── invoices/                 # Invoice CRUD
│   │   ├── expenses/                 # Expense CRUD + approval
│   │   ├── accounting/               # Chart of accounts, journal entries
│   │   ├── reports/                  # Financial reports
│   │   ├── compliance/               # GST, TDS, Signals
│   │   ├── statements/               # Bank statements
│   │   ├── upload/                   # Smart upload
│   │   ├── settings/                 # Company + user management
│   │   └── test/                     # Debug pages (not routed)
│   ├── services/
│   │   ├── api.js                    # Axios instance + interceptors
│   │   └── index.js                  # Domain service wrappers
│   ├── store/
│   │   └── authStore.js              # Zustand auth state
│   ├── utils/
│   │   ├── formatters.js
│   │   └── themeUtils.js
│   ├── App.jsx                       # Route definitions
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Global styles
├── Dockerfile                        # Dev frontend container
├── Dockerfile.prod                   # Production nginx container
├── vite.config.js                    # Vite configuration
├── tailwind.config.js                # Tailwind CSS config
├── package.json
└── verify-components.js              # Component verification script
```

---

## Scripts (`scripts/` — Root)

```
scripts/
├── deploy.sh                         # Full production deploy
├── deploy-prod.sh / .bat             # Production deploy with env validation
├── backup.sh / backup-prod.sh / .bat # MongoDB backup
├── restore.sh                        # Database restore
├── docker-setup.sh / .bat            # Docker environment setup
├── generate-config.js                # Production config generation
├── verify-ocr-integration.js         # OCR integration check
├── verify-dashboard-integration.js   # Dashboard integration check
├── verify-fixes.js                   # Fix verification
├── run-all-tests.sh / .bat           # Full test runner
├── quick-test.sh / .bat              # Quick test runner
└── make-executable.sh / .bat         # chmod helper
```

---

## Contracts (`contracts/`)

```
contracts/
└── capability_contracts/
    ├── *.json                        # 9 capability contract files
    └── route_map.json                # Route-to-capability mapping
```

---

## Monitoring (`monitoring/`)

```
monitoring/
├── prometheus.yml                    # Prometheus scrape config
├── prometheus-config.example.yml     # Example config
└── docker-compose.monitoring.yml     # Monitoring stack compose
```

---

## Handover Package (`Handover/`)

```
Handover/
├── 01_README.md                      # Product overview
├── 02_Repository_Details.md          # Repo metadata
├── 03_Deployment_Guide.md            # Deployment procedures
├── 04_Architecture.md                # System architecture
├── 05_Environment_Guide.md           # Environment variables
├── 06_API_Documentation.md           # Complete API reference
├── 07_Database_Details.md            # Mongoose models
├── 08_Folder_Structure.md            # This file
├── 09_Pending_Work.md                # Outstanding tasks
├── 10_Known_Issues.md                # Known issues
├── 11_Troubleshooting.md             # Troubleshooting guide
├── 12_REVIEW_PACKET.md               # Quick review packet
├── 13_Runtime_Evidence.md            # Runtime evidence placeholders
├── 14_Testing_Checklist.md           # QA checklist
├── 15_Knowledge_Transfer.md          # KT session guide
├── 16_Ownership_Transfer.md          # Ownership checklist
├── 17_Deployment_Checklist.md        # Deploy checklist
├── 18_Rollback_Guide.md              # Rollback procedures
├── review_packets/                   # Review artifacts
├── code_packets/                     # Code review artifacts
├── Screenshots/                      # Screenshot placeholders
└── Videos/                           # Video placeholders
```

---

## Key Entry Points

| Purpose | File |
|---------|------|
| Backend server | `backend/src/server.js` |
| Frontend app | `frontend/src/main.jsx` |
| Routes | `frontend/src/App.jsx` |
| API client | `frontend/src/services/api.js` |
| Auth state | `frontend/src/store/authStore.js` |
| DB connection | `backend/src/config/database.js` |
| Ledger engine | `backend/src/services/ledger.service.js` |
| Proof orchestrator | `backend/scripts/proof-all.js` |
| CI pipeline | `.github/workflows/ci.yml` |
