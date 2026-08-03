# Testing Checklist — AI-Artha

**Generated:** 2026-07-05

---

## Pre-Test Setup

- [ ] MongoDB running (local or Docker)
- [ ] `backend/.env` configured with `JWT_SECRET`, `HMAC_SECRET`, `MONGODB_URI`
- [ ] `frontend/.env` configured with `VITE_API_URL=http://localhost:5000/api/v1`
- [ ] Backend started: `cd backend && npm run dev`
- [ ] Frontend started: `cd frontend && npm run dev`
- [ ] Database seeded: `cd backend && node scripts/seed.js && node scripts/seed-tds.js`
- [ ] Admin user available (role: `admin` or `accountant`)

---

## Automated Tests

### Backend Jest Tests

```bash
cd backend
npm test                    # Full suite with coverage
npm run test:ledger         # Ledger chain tests
npm run test:invoice        # Invoice tests
npm run test:expense        # Expense tests
npm run test:gst            # GST filing tests
npm run test:integration    # Integration tests
npm run test:all            # All tests with coverage
```

- [ ] `npm test` completes without errors
- [ ] Coverage report generated

> TODO: Verify test files exist — Jest may run 0 tests if files are missing.

### Script-Based Verification

```bash
cd backend
npm run verify:seed
npm run verify:server
npm run verify:india-compliance
npm run verify:gst-integration
npm run verify:tds-integration
npm run verify:dashboard-integration
npm run verify:ocr-integration
npm run verify:hash-chain
```

- [ ] Seed verification passes
- [ ] Server integration verification passes
- [ ] India compliance verification passes
- [ ] GST integration verification passes
- [ ] TDS integration verification passes
- [ ] Dashboard integration verification passes
- [ ] Hash chain verification passes

### Governance & Proof Tests

```bash
cd backend
npm run test:negative       # Governance negative scenarios
npm run test:adversarial    # Adversarial test suite
npm run proof:all             # Full proof suite
npm run governance:full       # Governance pipeline
npm run verify:all            # Independent verification
npm run evidence:full         # CI evidence generation
```

- [ ] Negative scenarios pass
- [ ] Adversarial suite passes
- [ ] Proof suite (all 4 phases) passes
- [ ] Governance pipeline passes
- [ ] Independent verification passes

### Frontend Lint

```bash
cd frontend
npm run lint
```

- [ ] ESLint passes with no errors

### Root Test Scripts

```bash
# From repo root
scripts/quick-test.bat        # Windows
scripts/run-all-tests.bat     # Windows full suite
```

- [ ] Quick test passes
- [ ] Full test suite passes

---

## Health & Infrastructure Tests

| Test | Command | Expected |
|------|---------|----------|
| Basic health | `curl http://localhost:5000/health` | 200, status healthy |
| Detailed health | `curl http://localhost:5000/health/detailed` | MongoDB connected |
| Readiness | `curl http://localhost:5000/ready` | 200 OK |
| Liveness | `curl http://localhost:5000/live` | 200 OK |
| Metrics | `curl http://localhost:5000/metrics` | Metrics JSON |
| DB connection | `cd backend && node test-connections.js` | Connected |
| Redis (optional) | `cd backend && node test-redis.js` | Connected or skipped |

- [ ] All health endpoints return expected responses
- [ ] MongoDB connection verified
- [ ] Redis tested (or confirmed optional skip)

---

## Authentication Tests

| Test | Steps | Expected |
|------|-------|----------|
| Signup | POST `/api/v1/auth/signup` with email, password, name | 201, JWT returned |
| Login | POST `/api/v1/auth/login` | 200, JWT returned |
| Me | GET `/api/v1/auth/me` with Bearer token | User payload |
| Invalid login | POST with wrong password | 401 |
| Protected route without token | GET `/api/v1/invoices` | 401 |
| Logout | GET `/logout` | Redirect to login |

- [ ] Signup works
- [ ] Login works
- [ ] Token stored in localStorage (`artha_auth_token`)
- [ ] Protected routes reject unauthenticated requests
- [ ] Frontend login page works end-to-end

---

## Core Accounting Tests

### Chart of Accounts
- [ ] GET `/api/v1/accounts` returns seeded accounts
- [ ] Frontend `/accounts` page loads account list

### Journal Entries
- [ ] POST `/api/v1/ledger/entries` creates balanced entry (accountant)
- [ ] POST `/api/v1/ledger/entries/:id/validate` validates entry
- [ ] POST `/api/v1/ledger/entries/:id/post` posts entry
- [ ] GET `/api/v1/ledger/balances` returns updated balances
- [ ] GET `/api/v1/ledger/verify-chain` confirms chain integrity (admin)

### Ledger Integrity
- [ ] Frontend `/ledger-integrity` page loads
- [ ] Chain verification shows valid status

---

## Invoice Tests

- [ ] Create invoice via POST `/api/v1/invoices`
- [ ] Send invoice: POST `/api/v1/invoices/:id/send`
- [ ] Verify journal entry created on send
- [ ] Record payment: POST `/api/v1/invoices/:id/payment`
- [ ] Download PDF: GET `/api/v1/invoices/:id/pdf`
- [ ] Frontend invoice CRUD pages work
- [ ] Invoice stats: GET `/api/v1/invoices/stats`

---

## Expense Tests

- [ ] Create expense via POST `/api/v1/expenses`
- [ ] Upload receipt (multipart)
- [ ] OCR status: GET `/api/v1/expenses/ocr/status`
- [ ] Approve expense: POST `/api/v1/expenses/:id/approve`
- [ ] Record expense: POST `/api/v1/expenses/:id/record`
- [ ] Frontend expense pages work
- [ ] Expense approval workflow (admin/accountant)

---

## GST Tests

- [ ] GET `/api/v1/gst/summary` returns summary
- [ ] POST `/api/v1/gst/gstr1/generate` generates GSTR-1
- [ ] POST `/api/v1/gst/gstr3b/generate` generates GSTR-3B
- [ ] GET `/api/v1/gst/filing-packet/gstr-1` returns filing packet
- [ ] POST `/api/v1/gst/validate-gstin` validates GSTIN format
- [ ] Frontend `/gst` dashboard loads

---

## TDS Tests

- [ ] POST `/api/v1/tds/calculate` calculates TDS
- [ ] GET `/api/v1/tds/summary` returns summary
- [ ] GET `/api/v1/tds/dashboard` returns dashboard data
- [ ] POST `/api/v1/tds/entries` creates TDS entry
- [ ] POST `/api/v1/tds/entries/:id/deduct` records deduction
- [ ] Frontend `/tds` page loads

---

## Reports Tests

- [ ] GET `/api/v1/reports/profit-loss`
- [ ] GET `/api/v1/reports/balance-sheet`
- [ ] GET `/api/v1/reports/cash-flow`
- [ ] GET `/api/v1/reports/trial-balance`
- [ ] GET `/api/v1/reports/aged-receivables`
- [ ] GET `/api/v1/reports/dashboard`
- [ ] GET `/api/v1/reports/kpis`
- [ ] PDF exports for each report
- [ ] Frontend report pages load with data

---

## Compliance & Signals Tests

- [ ] GET `/api/v1/compliance/signals` generates signals
- [ ] GET `/api/v1/signals/snapshot` returns snapshot
- [ ] POST `/api/v1/signals/:id/dispatch` dispatches signal (SETU_ENABLED=false: local only)
- [ ] Frontend `/signals` dashboard loads

---

## Bank Statement Tests

- [ ] POST `/api/v1/statements/upload` uploads statement
- [ ] POST `/api/v1/statements/:id/process` processes statement
- [ ] POST `/api/v1/statements/:id/match` matches transactions
- [ ] Frontend statements pages work

---

## Smart Upload Tests

- [ ] POST `/api/v1/upload` smart upload single file
- [ ] POST `/api/v1/upload/batch` batch upload
- [ ] Frontend `/upload` page works

---

## Settings & Users Tests

- [ ] GET `/api/v1/settings` returns company settings
- [ ] PUT `/api/v1/settings` updates settings (admin)
- [ ] GET `/api/v1/users` lists users (admin)
- [ ] POST `/api/v1/users` creates user (admin)
- [ ] Frontend settings pages work

---

## Role-Based Access Tests

| Endpoint | viewer | accountant | admin |
|----------|--------|------------|-------|
| GET /reports/dashboard | ✓ | ✓ | ✓ |
| POST /ledger/entries | ✗ | ✓ | ✓ |
| GET /ledger/verify-chain | ✗ | ✗ | ✓ |
| GET /users | ✗ | ✗ | ✓ |
| GET /database/stats | ✗ | ✗ | ✓ |

- [ ] Viewer blocked from write operations
- [ ] Accountant can post entries
- [ ] Admin can access admin routes
- [ ] Frontend role guards work (Access Denied page shown)

---

## Docker Tests

```bash
docker-compose -f docker-compose.dev.yml up -d
# Wait for services
curl http://localhost:5000/health
curl http://localhost:5173
```

- [ ] Dev Docker stack starts
- [ ] Backend accessible on :5000
- [ ] Frontend accessible on :5173

---

## Production Smoke Tests

> TODO: Verify against live production URLs.

- [ ] `GET https://ai-artha.onrender.com/api/health` returns 200
- [ ] Frontend loads at configured production URL
- [ ] Login works on production
- [ ] CORS configured correctly for production frontend domain

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Tech Lead | | | |
