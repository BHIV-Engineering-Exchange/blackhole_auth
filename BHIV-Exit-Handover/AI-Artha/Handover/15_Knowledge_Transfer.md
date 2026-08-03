# Knowledge Transfer — AI-Artha

**Generated:** 2026-07-05  
**Purpose:** Structured knowledge transfer guide for incoming team members

---

## Session Overview

| Session | Duration | Topics | Materials |
|---------|----------|--------|-----------|
| **KT-1: Product & Architecture** | 2 hours | Product overview, stack, architecture | `01_README.md`, `04_Architecture.md` |
| **KT-2: Backend Deep Dive** | 3 hours | Server, routes, services, ledger engine | `server.js`, `ledger.service.js` |
| **KT-3: Frontend & Integration** | 2 hours | React app, API client, auth flow | `App.jsx`, `services/api.js` |
| **KT-4: Database & Compliance** | 2 hours | Models, GST/TDS, hash chain | `07_Database_Details.md`, models/ |
| **KT-5: Deployment & DevOps** | 2 hours | Docker, Render, CI, monitoring | `03_Deployment_Guide.md`, `17_Deployment_Checklist.md` |
| **KT-6: Governance & Proof** | 1 hour | Proof suite, verification, evidence | `12_REVIEW_PACKET.md`, `proof-all.js` |
| **KT-7: Handover Q&A** | 1 hour | Open questions, pending work | `09_Pending_Work.md`, `10_Known_Issues.md` |

---

## KT-1: Product & Architecture

### Learning Objectives
- Understand ARTHA's purpose and target users
- Know the technology stack and deployment targets
- Understand high-level data flow

### Key Concepts
1. **Double-entry accounting** — every transaction creates balanced journal entries
2. **Hash chain integrity** — HMAC-SHA256 links every posted entry
3. **India compliance** — GST (GSTR-1/3B) and TDS (Form 24Q/26Q)
4. **Signal pipeline** — compliance events → signals → SETU dispatch

### Demo
- Walk through dashboard at http://localhost:5173/dashboard
- Show invoice send → journal entry creation flow

### Reading List
- `Handover/01_README.md`
- `Handover/04_Architecture.md`
- `README.md`

---

## KT-2: Backend Deep Dive

### Learning Objectives
- Navigate backend codebase structure
- Understand middleware chain and auth flow
- Trace a request from route to service to model

### Key Files to Review

| Order | File | Why |
|-------|------|-----|
| 1 | `backend/src/server.js` | Entry point, route mounting |
| 2 | `backend/src/middleware/auth.js` | JWT authentication |
| 3 | `backend/src/middleware/authorityBoundary.js` | Capability contracts |
| 4 | `backend/src/routes/ledger.routes.js` | Example route module |
| 5 | `backend/src/controllers/ledger.controller.js` | Controller pattern |
| 6 | `backend/src/services/ledger.service.js` | Core accounting engine |
| 7 | `backend/src/models/JournalEntry.js` | Hash chain model |
| 8 | `backend/src/utils/authToken.js` | JWT signing |

### Hands-On Exercise
1. Start backend: `cd backend && npm run dev`
2. Create a journal entry via API
3. Post it and verify hash chain update
4. Run `GET /api/v1/ledger/verify-chain`

### Reading List
- `Handover/06_API_Documentation.md`
- `Handover/08_Folder_Structure.md`

---

## KT-3: Frontend & Integration

### Learning Objectives
- Understand React routing and role guards
- Know how API client handles auth tokens
- Identify frontend/backend path mismatches

### Key Files to Review

| File | Purpose |
|------|---------|
| `frontend/src/main.jsx` | React entry, providers |
| `frontend/src/App.jsx` | Routes, ProtectedRoute, RoleProtectedRoute |
| `frontend/src/services/api.js` | Axios, JWT interceptor, 401 handling |
| `frontend/src/store/authStore.js` | Zustand auth state |
| `frontend/src/services/index.js` | Domain API wrappers |
| `frontend/src/hooks/useDashboard.js` | Example data hook |

### Hands-On Exercise
1. Start frontend: `cd frontend && npm run dev`
2. Login and inspect localStorage token
3. Navigate invoice create → send flow
4. Compare frontend service calls with backend routes

### Known Gap to Discuss
Review `frontend/src/services/index.js` path mismatches (see `Handover/10_Known_Issues.md` #2)

---

## KT-4: Database & Compliance

### Learning Objectives
- Understand Mongoose models and relationships
- Know GST/TDS calculation flow
- Understand hash chain and audit trail

### Key Topics

**Models:** 32 Mongoose models — focus on User, JournalEntry, Invoice, Expense, TDSEntry, GSTReturn, ComplianceSignal

**GST Flow:**
```
Invoice/Expense → gstEngine.service → GST details on journal entry
→ gstFiling.service → GSTR-1/3B generation → ComplianceFiling
```

**TDS Flow:**
```
Payment/Expense → tds.service → TDSEntry → deduction → challan → Form 26Q
```

**Hash Chain:**
```
JournalEntry pre-save → HMAC(previousHash + entryData) → stored hash
→ verify-chain endpoint validates entire chain
```

### Hands-On Exercise
```bash
cd backend
node scripts/seed.js
node scripts/verify-hash-chain.js
npm run verify:india-compliance
```

### Reading List
- `Handover/07_Database_Details.md`

---

## KT-5: Deployment & DevOps

### Learning Objectives
- Deploy locally with Docker
- Understand production architecture
- Know backup/restore and rollback procedures

### Hands-On Exercise
```bash
# Local Docker dev
docker-compose -f docker-compose.dev.yml up -d

# Health checks
curl http://localhost:5000/health/detailed

# Backup (if prod running)
scripts/backup.sh
```

### Key Config Files
- `docker-compose.dev.yml` — local development
- `docker-compose.prod.yml` — production stack
- `backend/render.yaml` — Render deployment
- `k8s-deployment.example.yml` — Kubernetes example
- `monitoring/prometheus.yml` — Prometheus config

### Reading List
- `Handover/03_Deployment_Guide.md`
- `Handover/05_Environment_Guide.md`
- `Handover/17_Deployment_Checklist.md`
- `Handover/18_Rollback_Guide.md`
- `docs/DEPLOYMENT.md`

---

## KT-6: Governance & Proof

### Learning Objectives
- Run proof suite and interpret results
- Understand governance validation pipeline
- Know where certification artifacts are stored

### Hands-On Exercise
```bash
cd backend
node scripts/seed.js
npm run proof:all
npm run governance:full
npm run verify:all
```

### Artifacts to Review
- `docs/handover/ARTHA_PRODUCTION_CERTIFICATE.json`
- `runtime_health_snapshot.json`
- `production_runtime_evidence.json`

### Reading List
- `Handover/12_REVIEW_PACKET.md`
- `Handover/13_Runtime_Evidence.md`
- `review_packets/REVIEW_PACKET.md`

---

## KT-7: Handover Q&A

### Topics to Cover
1. Pending work items (`Handover/09_Pending_Work.md`)
2. Known issues and workarounds (`Handover/10_Known_Issues.md`)
3. Production URL verification status
4. Access credentials and account handover (see `Handover/16_Ownership_Transfer.md`)
5. Support escalation path

> TODO: Verify support contact, on-call rotation, and stakeholder list.

---

## Reference Quick Links

| Topic | Document |
|-------|----------|
| API reference | `Handover/06_API_Documentation.md` |
| Troubleshooting | `Handover/11_Troubleshooting.md` |
| Testing | `Handover/14_Testing_Checklist.md` |
| Local setup | `start_readme/LOCAL_SETUP.md` |
| Env templates | `start_readme/backend.env.template`, `frontend.env.template` |

---

## KT Completion Sign-Off

| Session | Attendee | Date Completed | Questions Resolved |
|---------|----------|----------------|-------------------|
| KT-1 | | | |
| KT-2 | | | |
| KT-3 | | | |
| KT-4 | | | |
| KT-5 | | | |
| KT-6 | | | |
| KT-7 | | | |
