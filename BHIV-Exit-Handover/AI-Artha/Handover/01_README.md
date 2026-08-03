# ARTHA (AI-Artha) — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-05  
**Repository:** AI-Artha  
**Product Version:** ARTHA v0.1

---

## Product Overview

**ARTHA** is a comprehensive, India-compliant accounting and financial management system built on modern web technologies with full double-entry bookkeeping integrity. It targets Indian businesses requiring GST, TDS, statutory reporting, invoice/expense workflows, and tamper-evident ledger hash chains.

---

## Purpose

Provide a production-ready accounting platform that:

- Enforces double-entry ledger integrity with HMAC-SHA256 hash chains
- Supports Indian statutory compliance (GST GSTR-1/GSTR-3B, TDS Form 24Q/26Q)
- Manages invoices, expenses, bank statements, and financial reports
- Integrates with SETU/Sampada for compliance signal dispatch
- Offers Docker-based deployment for local, cloud, and Kubernetes environments

---

## Features

### Core Accounting
- Double-entry ledger with hash-chain verification (`Decimal.js` precision)
- Chart of Accounts (33 pre-configured Indian standard accounts)
- Journal entries: create, validate, post, void, reversal, credit/debit notes
- Financial reports: P&L, Balance Sheet, Cash Flow, Trial Balance, Aged Receivables
- Real-time dashboard KPIs and charts

### India Compliance
- GST: GSTR-1/GSTR-3B generation, filing packets, IGST/CGST/SGST, B2B/B2C
- TDS: Section-wise tracking, Form 24Q/26Q, challan workflow
- Compliance signals and SETU dispatch pipeline

### Invoice & Expense Management
- Invoice lifecycle: Draft → Sent → Partial → Paid → Cancelled
- Automatic journal entries on send and payment
- Expense approval workflow with OCR receipt scanning (Tesseract.js optional)
- Smart upload and bank statement reconciliation

### Production Features
- Redis caching, health/readiness/liveness probes
- Docker multi-container deployment
- MongoDB backup/restore scripts
- Prometheus observability endpoints
- Audit logging and role-based access control

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite 5, Tailwind CSS, TanStack Query, Zustand, React Router 6 |
| **Backend** | Node.js 18+, Express 4, Mongoose 8 |
| **Database** | MongoDB 7+ (replica set recommended for production) |
| **Cache** | Redis 7 (optional) |
| **Auth** | JWT (Bearer token + legacy cookie support) |
| **OCR** | Tesseract.js (optional), pdf-parse, pdfjs-dist |
| **PDF** | PDFKit |
| **Containerization** | Docker, Docker Compose |
| **CI** | GitHub Actions (backend lint + test) |
| **Monitoring** | Prometheus, Winston logging |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | AI-Artha |
| **Remote URL** | https://github.com/blackholeinfiverse64/AI-Artha.git |
| **Main Branch** | `main` |
| **License** | Proprietary (per README badge) |

---

## Build Instructions

### Backend
```bash
cd backend
npm install
npm run build   # No separate build step — uses Node directly
```

### Frontend
```bash
cd frontend
npm install
npm run build   # Outputs to frontend/dist/
```

### Docker (Production)
```bash
docker-compose -f docker-compose.prod.yml build --no-cache
```

---

## Installation

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- MongoDB 7+
- Redis 7+ (optional, for caching)

### Local Setup (Non-Docker)
```bash
# Backend
cp start_readme/backend.env.template backend/.env
cd backend && npm install

# Frontend
cp start_readme/frontend.env.template frontend/.env
cd frontend && npm install
```

### Docker Development
```bash
docker-compose -f docker-compose.dev.yml up -d
cd backend && node scripts/seed.js && node scripts/seed-tds.js
```

See also: `start_readme/LOCAL_SETUP.md`

---

## Running Locally

| Service | Command | URL |
|---------|---------|-----|
| Backend | `cd backend && npm run dev` | http://localhost:5000 |
| Frontend | `cd frontend && npm run dev` | http://localhost:5173 |
| API Base | — | http://localhost:5000/api/v1 |
| Health | — | http://localhost:5000/health |

---

## Deployment

| Environment | Platform | Reference |
|-------------|----------|-----------|
| Production (Docker) | Self-hosted | `scripts/deploy.sh`, `docker-compose.prod.yml` |
| Backend (Cloud) | Render | `backend/render.yaml` |
| Frontend (Cloud) | Vercel | `FRONTEND_URL` in env examples |
| Kubernetes | K8s / Pravah | `k8s-deployment.example.yml`, `pravah-deployment.yaml` |

Detailed steps: see `Handover/03_Deployment_Guide.md` and `docs/DEPLOYMENT.md`

---

## Dependencies

### Root
- `cors@^2.8.6` (minimal root package.json)

### Backend (key)
- express, mongoose, jsonwebtoken, bcryptjs, decimal.js, redis, winston, helmet, multer, pdf-parse, pdfkit, xlsx, axios

### Frontend (key)
- react, react-router-dom, @tanstack/react-query, zustand, axios, recharts, tailwindcss, vite

Full lists: `backend/package.json`, `frontend/package.json`

---

## Folder Structure

```
AI-Artha/
├── backend/          # Express API, models, services, scripts
├── frontend/         # React SPA (Vite)
├── docs/             # Extended documentation
├── scripts/          # Deploy, backup, verify scripts
├── monitoring/       # Prometheus config
├── contracts/        # Capability contracts
├── start_readme/     # Local setup templates
└── Handover/         # This exit handover package
```

Full tree: see `Handover/08_Folder_Structure.md`

---

## Authentication

- **Signup:** `POST /api/v1/auth/signup` — creates user (default role: `viewer`)
- **Login:** `POST /api/v1/auth/login` — returns JWT access token
- **Protected routes:** `Authorization: Bearer <token>`
- **Frontend token storage:** `localStorage` key `artha_auth_token`
- **Roles:** `admin`, `accountant`, `viewer`
- **Legacy cookie:** `blackhole_token` (supported in middleware)

> Note: README references `/auth/register` and refresh tokens; actual implementation uses `/auth/signup` with no refresh endpoint in `server.js`.

---

## Environment Variables (Names Only)

### Backend
`NODE_ENV`, `PORT`, `API_VERSION`, `LOG_LEVEL`, `MONGODB_URI`, `MONGODB_TEST_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`, `APP_URL`, `FRONTEND_URL`, `API_PUBLIC_URL`, `APP_LOGIN_URL`, `CORS_ORIGIN`, `CORS_ALLOWED_ORIGINS`, `ALLOW_LOCALHOST_CORS`, `APP_ID`, `BHIV_APP_ID`, `HMAC_SECRET`, `RATE_LIMIT_WINDOW_MS`, `RATE_LIMIT_MAX`, `AUTH_PASSWORD_RATE_LIMIT_MAX`, `AUTH_SIGNUP_RATE_LIMIT_MAX`, `TRUST_PROXY`, `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD`, `REDIS_URL`, `REDIS_DB`, `SETU_ENABLED`, `SETU_BASE_URL`, `SETU_API_KEY`, `SETU_TIMEOUT_MS`, `SAMPADA_SETU_CORRELATION_ID`, `INSIGHTCORE_ENDPOINT`, `INSIGHTCORE_ENABLED`, `INSIGHTCORE_API_KEY`, `STORAGE_TYPE`, `AWS_BUCKET_NAME`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AUTH_SERVER_URL`, `MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD`

### Frontend
`VITE_API_URL`, `VITE_API_ORIGIN`

Full guide: `Handover/05_Environment_Guide.md`

---

## Known Issues

1. README/API docs reference stale endpoints (`/auth/register`, refresh tokens)
2. Jest test files referenced in `package.json` may be missing — CI may run 0 tests
3. Frontend service layer path mismatches vs backend routes
4. Trace route ordering: `GET /search` may conflict with `GET /:traceId`
5. MongoDB transactions require replica set in production
6. Signup defaults to `viewer` role — limited UI access until role upgraded

Full list: `Handover/10_Known_Issues.md`

---

## Future Improvements

- Align frontend API service paths with backend routes
- Add frontend CI pipeline in GitHub Actions
- Implement JWT refresh token flow (schema field exists on User model)
- Add formal database migration framework
- Resolve trace route ordering bug
- Add automated E2E tests for critical accounting flows
- Remove hardcoded fallback credentials in Redis config when env unset

---

## Related Handover Documents

| Document | Purpose |
|----------|---------|
| `02_Repository_Details.md` | Repo metadata and commands |
| `03_Deployment_Guide.md` | Production deployment |
| `04_Architecture.md` | System architecture |
| `05_Environment_Guide.md` | Environment configuration |
| `06_API_Documentation.md` | Complete API reference |
| `07_Database_Details.md` | Mongoose models |
| `08_Folder_Structure.md` | Directory layout |
| `09_Pending_Work.md` | Outstanding tasks |
| `10_Known_Issues.md` | Documented issues |
| `11_Troubleshooting.md` | Common problems |
| `12_REVIEW_PACKET.md` | Quick review guide |
| `13_Runtime_Evidence.md` | Runtime proof placeholders |
| `14_Testing_Checklist.md` | QA checklist |
| `15_Knowledge_Transfer.md` | KT session guide |
| `16_Ownership_Transfer.md` | Ownership checklist |
| `17_Deployment_Checklist.md` | Pre/post deploy checklist |
| `18_Rollback_Guide.md` | Rollback procedures |
