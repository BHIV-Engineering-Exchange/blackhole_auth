# Review Packet — AI-Artha

**Generated:** 2026-07-05  
**System:** ARTHA v0.1 — India-Compliant Double-Entry Accounting System  
**Review Time:** < 10 minutes

> Adapted from `review_packets/REVIEW_PACKET.md` with handover additions.

---

## Entry Points

| File | Purpose |
|------|---------|
| `backend/src/server.js` | Express server, route mounting, middleware |
| `backend/scripts/proof-all.js` | Master proof orchestrator (4 phases) |
| `frontend/src/main.jsx` | React SPA entry |
| `frontend/src/App.jsx` | Route definitions |

---

## Core Execution Flow

```
1. Transaction Created (Invoice/Expense/TDS)
       ↓
2. Journal Entry Created (Double-entry enforced)
       ↓
3. Journal Entry Validated (Line integrity, accounts, compliance)
       ↓
4. Journal Entry Posted (Hash chain updated, balances recalculated)
       ↓
5. Signal Generated (ComplianceSignal persisted)
       ↓
6. Filing Created (ComplianceFiling with JSON data)
       ↓
7. Filing Validated (ComplianceValidationLog)
       ↓
8. SETU Dispatch (if SETU_ENABLED=true)
```

---

## Critical Files

| File | Purpose |
|------|---------|
| `backend/src/services/ledger.service.js` | Core accounting engine, hash chain, posting |
| `backend/src/models/JournalEntry.js` | Journal model, pre-save hash computation |
| `backend/src/services/gstEngine.service.js` | GST calculation (CGST/SGST/IGST) |
| `backend/src/services/traceability.service.js` | Unified trace, lineage, replay |
| `backend/src/services/signalEngine.service.js` | Signal emission and persistence |
| `backend/src/services/setu.pipeline.js` | Signal normalization pipeline |
| `backend/src/services/expense.service.js` | Expense workflow with GST validation |
| `backend/src/services/invoice.service.js` | Invoice lifecycle with journal entries |
| `backend/src/services/financialReports.service.js` | Financial report generation |
| `backend/src/services/bankStatement.service.js` | Bank statement parsing and reconciliation |
| `backend/src/middleware/auth.js` | JWT authentication |
| `backend/src/middleware/authorityBoundary.js` | Capability contract enforcement |
| `frontend/src/services/api.js` | Frontend API client |
| `frontend/src/store/authStore.js` | Auth state management |

---

## Live Runtime Verification

### Proof Execution (standalone, no HTTP server)

```bash
cd backend

# 1. Ensure MongoDB is running and seeded
node scripts/seed.js

# 2. Run all proof phases
node scripts/proof-all.js

# Or individually:
node scripts/proof-replay.js       # Phase 1: Deterministic replay
node scripts/proof-compliance.js   # Phase 2: Compliance continuity
node scripts/proof-audit.js        # Phase 3: Production audit
node scripts/proof-certify.js      # Phase 4: Certification generation
```

### Backend API (requires running server)

```bash
cd backend
npm run dev

# Test endpoints:
curl http://localhost:5000/health
curl http://localhost:5000/ready
curl -H "Authorization: Bearer <admin-token>" \
  http://localhost:5000/api/v1/ledger/verify-chain
curl -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/v1/reports/dashboard
```

### Governance Full Pipeline

```bash
cd backend
npm run governance:full
```

---

## Architecture at a Glance

```
React SPA (Vite :5173)
    ↓ HTTPS /api/v1
Express API (:5000)
    ↓
Middleware → Routes → Controllers → Services
    ↓
MongoDB (Mongoose) + Redis (optional)
    ↓
SETU / InsightCore / Tally / Tantra (integrations)
```

---

## Key Metrics to Verify

| Check | Command / Endpoint | Expected |
|-------|-------------------|----------|
| API health | `GET /health` | `{ status: "healthy" }` |
| DB connected | `GET /ready` | 200 OK |
| Ledger integrity | `GET /api/v1/ledger/verify-chain` | Chain valid (admin) |
| Dashboard data | `GET /api/v1/reports/dashboard` | KPI JSON |
| Hash chain stats | `GET /api/v1/ledger/chain-stats` | Entry count (admin) |

---

## Role Matrix (Quick Reference)

| Action | viewer | accountant | admin |
|--------|--------|------------|-------|
| View reports | ✓ | ✓ | ✓ |
| Create invoice | ✗ | ✓ | ✓ |
| Post journal entry | ✗ | ✓ | ✓ |
| Verify ledger chain | ✗ | ✗ | ✓ |
| User management | ✗ | ✗ | ✓ |
| Database admin | ✗ | ✗ | ✓ |

---

## Known Review Flags

1. Frontend service paths may not match backend (see `Handover/10_Known_Issues.md`)
2. Signup creates `viewer` role by default
3. Trace route `/search` ordering bug
4. Jest tests may be absent despite CI configuration
5. Example credentials in `.env.production.example` — rotate before use

---

## Certification Artifacts

| Artifact | Location |
|----------|----------|
| Production certificate | `docs/handover/ARTHA_PRODUCTION_CERTIFICATE.json` |
| Integrity certificate | `docs/handover/ARTHA_INTEGRITY_CERTIFICATE.json` |
| Deployment readiness | `docs/handover/DEPLOYMENT_READINESS_CHECKLIST.json` |
| Runtime health snapshot | `runtime_health_snapshot.json` |
| Production runtime evidence | `production_runtime_evidence.json` |
| Observability report | `observability_report.md` |

---

## Review Checklist (< 10 min)

- [ ] Clone repo and read `Handover/01_README.md`
- [ ] Start dev stack: `docker-compose -f docker-compose.dev.yml up -d`
- [ ] Seed DB: `cd backend && node scripts/seed.js`
- [ ] Hit `GET /health` and `GET /ready`
- [ ] Login at http://localhost:5173/login
- [ ] Verify dashboard loads with KPI data
- [ ] Run `npm run proof:all` in backend
- [ ] Review `Handover/10_Known_Issues.md`
- [ ] Check CI status on GitHub

---

## Related Documents

- Full API: `Handover/06_API_Documentation.md`
- Architecture: `Handover/04_Architecture.md`
- Deployment: `Handover/03_Deployment_Guide.md`
- Original review packet: `review_packets/REVIEW_PACKET.md`
