# API Documentation — AI-Artha

**Generated:** 2026-07-05  
**Base URL (local):** `http://localhost:5000`  
**API Prefix:** `/api/v1`  
**Authentication:** `Authorization: Bearer <JWT>` unless noted as Public

---

## Authentication Endpoints

| Method | Path | Auth | Handler | Description |
|--------|------|------|---------|-------------|
| POST | `/api/v1/auth/signup` | Public | `auth.controller.signup` | Register new user (default role: viewer) |
| POST | `/api/v1/auth/login` | Public | `auth.controller.login` | Login, returns JWT |
| GET | `/api/v1/auth/me` | Bearer | Inline in server.js | Returns JWT user payload |
| GET | `/api/v1/auth/test` | Public | Inline | Auth test endpoint |
| GET | `/logout` | Public | Inline | Clears legacy cookie, redirects to SPA login |

> README documents `POST /api/v1/auth/register` and refresh tokens — **not implemented** in current `server.js`.

---

## Health & Observability (mounted at `/`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/health` | Public | Inline |
| GET | `/health/detailed` | Public | `healthService` |
| GET | `/ready` | Public | Inline (DB check) |
| GET | `/live` | Public | Inline |
| GET | `/metrics` | Public | `performanceService.getMetrics()` |
| GET | `/status` | Public | Inline |
| GET | `/observability` | Public | `observabilityService` |
| GET | `/prometheus` | Public | `observabilityService` |
| GET | `/dashboard` | Public | `observabilityService.getDashboardData()` |
| GET | `/api/health` | Public | `healthService.getSystemHealth()` |

---

## Server-Level Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/` | Public | Redirect to SPA or JSON service info |
| GET | `/login`, `/signup`, `/dashboard` | Public | Redirect to SPA |
| GET | `/test` | Public | Test JSON |
| GET | `/api/test` | Public | Test JSON |
| POST | `/api/v1/setu/callback` | Public | SETU webhook handler |
| GET | `/uploads/*` | Public | Static file serve |

---

## Ledger — `/api/v1/ledger`

**Controller:** `ledger.controller` | **Roles:** `protect` + `authorize`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/entries` | any | `getEntries` |
| POST | `/entries` | accountant, admin | `createEntry` |
| GET | `/entries/:id` | any | `getEntry` |
| POST | `/entries/:id/validate` | accountant, admin | `validateEntry` |
| POST | `/entries/:id/reversal` | accountant, admin | `createReversalEntry` |
| POST | `/entries/:id/post` | accountant, admin | `postEntry` |
| POST | `/entries/:id/void` | accountant, admin | `voidEntry` |
| POST | `/credit-notes` | accountant, admin | `createCreditNote` |
| POST | `/debit-notes` | accountant, admin | `createDebitNote` |
| GET | `/balances` | any | `getBalances` |
| GET | `/summary` | any | `getSummary` |
| GET | `/verify` | admin | `verifyChain` |
| GET | `/entries/:id/verify-chain` | admin | `verifyChainFromEntry` |
| GET | `/chain-stats` | admin | `getChainStats` |
| GET | `/verify-chain` | admin | `verifyLedgerChain` |
| GET | `/chain-segment` | admin | `getChainSegment` |
| GET | `/entries/:id/verify` | any | `verifySingleEntry` |
| GET | `/journal-entries` | any | `getEntries` (legacy) |
| POST | `/journal-entries` | accountant, admin | `createEntry` (legacy) |
| GET | `/journal-entries/:id` | any | `getEntry` (legacy) |
| POST | `/journal-entries/:id/post` | accountant, admin | `postEntry` (legacy) |
| POST | `/journal-entries/:id/void` | accountant, admin | `voidEntry` (legacy) |

---

## Accounts — `/api/v1/accounts`

**Controller:** `accounts.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/` | any | `getAccounts` |
| POST | `/` | accountant, admin | `createAccount` |
| POST | `/seed` | admin | `seedAccounts` |
| GET | `/:id` | any | `getAccount` |
| PUT | `/:id` | accountant, admin | `updateAccount` |
| DELETE | `/:id` | admin | `deactivateAccount` |

---

## Invoices — `/api/v1/invoices`

**Controller:** `invoice.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/stats` | any | `getInvoiceStats` |
| GET | `/` | any | `getInvoices` |
| POST | `/` | accountant, admin | `createInvoice` |
| GET | `/:id` | any | `getInvoice` |
| PUT | `/:id` | accountant, admin | `updateInvoice` |
| POST | `/:id/send` | accountant, admin | `sendInvoice` |
| POST | `/:id/payment` | accountant, admin | `recordPayment` |
| POST | `/:id/cancel` | accountant, admin | `cancelInvoice` |
| GET | `/:id/pdf` | any | `downloadInvoicePDF` |

---

## Expenses — `/api/v1/expenses`

**Controllers:** `expense.controller`, `ocr.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/ocr/status` | any | `getOCRStatus` |
| POST | `/ocr` | any | `processReceiptOCR` |
| GET | `/stats` | any | `getExpenseStats` |
| GET | `/` | any | `getExpenses` |
| POST | `/` | any | `createExpense` |
| GET | `/:id` | any | `getExpense` |
| PUT | `/:id` | any | `updateExpense` |
| POST | `/:id/approve` | accountant, admin | `approveExpense` |
| POST | `/:id/reject` | accountant, admin | `rejectExpense` |
| POST | `/:id/record` | accountant, admin | `recordExpense` |
| DELETE | `/:id/receipts/:receiptId` | any | `deleteReceipt` |

---

## GST — `/api/v1/gst`

**Controllers:** `gst.controller`, `gstFiling.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| POST | `/gstr1/generate` | accountant, admin | `generateGSTR1` |
| POST | `/gstr3b/generate` | accountant, admin | `generateGSTR3B` |
| GET | `/returns` | any | `getGSTReturns` |
| POST | `/returns/:id/file` | accountant, admin | `fileGSTReturn` |
| POST | `/validate-gstin` | any | `validateGSTIN` |
| GET | `/summary` | any | `getGSTSummaryController` |
| GET | `/filing-packet/gstr-1` | accountant, admin | `getGSTR1FilingPacket` |
| GET | `/filing-packet/gstr-3b` | accountant, admin | `getGSTR3BFilingPacket` |
| GET | `/filing-packet/export` | accountant, admin | `exportFilingPacket` |

---

## TDS — `/api/v1/tds`

**Controller:** `tds.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| POST | `/calculate` | any | `calculateTDS` |
| GET | `/summary` | any | `getTDSSummary` |
| GET | `/dashboard` | any | `getTDSDashboard` |
| GET | `/form26q` | accountant, admin | `generateForm26Q` |
| GET | `/entries` | any | `getTDSEntries` |
| POST | `/entries` | accountant, admin | `createTDSEntry` |
| POST | `/entries/:id/deduct` | accountant, admin | `recordTDSDeduction` |
| POST | `/entries/:id/challan` | accountant, admin | `recordChallanDeposit` |

---

## Compliance — `/api/v1/compliance`

**Controller:** `compliance.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/gst/gstr-1` | accountant, admin | `generateGSTR1` |
| GET | `/gst/gstr-3b` | accountant, admin | `generateGSTR3B` |
| GET | `/tds/form26q` | accountant, admin | `generateForm26Q` |
| GET | `/tds/form24q` | accountant, admin | `generateForm24Q` |
| POST | `/tds/challans` | accountant, admin | `createTDSChallan` |
| POST | `/tds/challans/:id/link` | accountant, admin | `linkTDSChallan` |
| GET | `/tds/group` | accountant, admin | `groupTDSQuarter` |
| GET | `/signals` | accountant, admin | `generateComplianceSignals` |

---

## Reports — `/api/v1/reports`

**Controllers:** `reports.controller`, `pdf.controller`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/general-ledger` | `exportGeneralLedger` |
| GET | `/profit-loss` | `getProfitLoss` |
| GET | `/profit-loss/export` | `exportProfitLossPDF` |
| GET | `/balance-sheet` | `getBalanceSheet` |
| GET | `/balance-sheet/export` | `exportBalanceSheetPDF` |
| GET | `/cash-flow` | `getCashFlow` |
| GET | `/cash-flow/export` | `exportCashFlowPDF` |
| GET | `/trial-balance` | `getTrialBalance` |
| GET | `/trial-balance/export` | `exportTrialBalancePDF` |
| GET | `/aged-receivables` | `getAgedReceivables` |
| GET | `/dashboard` | `getDashboardSummary` |
| GET | `/period-context` | `getReportPeriodContext` |
| GET | `/gst-summary` | `getGSTSummaryReport` |
| GET | `/tds-summary` | `getTDSSummaryReport` |
| GET | `/kpis` | `getKPIs` |
| GET | `/revenue-expenses-chart` | `getRevenueExpensesChart` |
| GET | `/expense-breakdown` | `getExpenseBreakdown` |
| GET | `/bank-transaction-timeline` | `getBankTransactionTimeline` |

> Frontend calls `/reports/aged-payables` — **no matching backend route**.

---

## Settings — `/api/v1/settings`

**Controller:** `companySettings.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/` | any | `getSettings` |
| PUT | `/` | admin | `updateSettings` |
| GET | `/financial-year` | any | `getCurrentFinancialYear` |

> Frontend calls `/settings/company` — backend uses `GET/PUT /settings`.

---

## Users — `/api/v1/users`

**Controller:** `users.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/me` | any | `getMe` |
| PUT | `/me` | any | `updateMe` |
| GET | `/` | admin | `getUsers` |
| POST | `/` | admin | `createUser` |
| GET | `/:id` | admin | `getUser` |
| PUT | `/:id` | admin | `updateUser` |
| DELETE | `/:id` | admin | `deleteUser` |

> Frontend calls `/users/:id/change-password` — **no matching backend route**.

---

## InsightFlow — `/api/v1/insightflow`

**Controller:** `insightflow.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| POST | `/experience` | any | `logExperience` |
| GET | `/experiences` | admin | `getExperiences` |
| GET | `/stats` | admin | `getExperienceStats` |

---

## Bank Statements — `/api/v1/statements`

**Controller:** `bankStatement.controller`

| Method | Path | Handler |
|--------|------|---------|
| POST | `/upload` | `uploadBankStatement` |
| GET | `/` | `getBankStatements` |
| GET | `/:id` | `getBankStatement` |
| DELETE | `/:id` | `deleteBankStatement` |
| POST | `/:id/process` | `processBankStatement` |
| POST | `/:id/match` | `matchTransactions` |
| POST | `/:id/create-expenses` | `createExpensesFromTransactions` |

---

## Smart Upload — `/api/v1/upload`

**Controller:** `smartUpload.controller`

| Method | Path | Handler |
|--------|------|---------|
| POST | `/` | `smartUpload` |
| POST | `/batch` | `smartUploadBatch` |

---

## Signals — `/api/v1/signals`

**Controller:** `signal.controller`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/cash-flow` | any | `getCashFlowSignal` |
| GET | `/snapshot` | any | `getSignalSnapshot` |
| GET | `/` | any | `listSignals` |
| GET | `/trace/:traceId` | any | `reconstructTrace` |
| GET | `/:signalId/pipeline-check` | accountant, admin | `pipelineCheck` |
| POST | `/:signalId/dispatch` | accountant, admin | `dispatchSignal` |
| POST | `/evaluate/overdue-invoices` | accountant, admin | `evaluateOverdueInvoices` |
| POST | `/cleanup` | admin | `cleanupDuplicateSignals` |

---

## Runtime — `/api/v1/runtime`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/status` | Inline operational status JSON |

---

## Trace — `/api/v1/trace`

**Services:** `traceability.service`, `runtimeProof.service`

| Method | Path | Roles | Handler |
|--------|------|-------|---------|
| GET | `/:traceId` | any | `getFullChain` |
| GET | `/:traceId/lineage` | any | lineage handler |
| POST | `/:traceId/replay` | admin, accountant | replay handler |
| GET | `/:traceId/continuity` | any | continuity handler |
| GET | `/:traceId/proofs` | any | proofs handler |
| POST | `/:traceId/proof/terminal` | admin, accountant | terminal proof |
| POST | `/:traceId/proof/curl` | admin, accountant | curl proof |
| GET | `/search` | any | search handler |
| GET | `/statistics` | admin, accountant | statistics handler |
| GET | `/proofs/report` | admin, accountant | report handler |
| POST | `/proofs/:proofId/verify` | admin, accountant | verify proof |

> **Known issue:** `GET /search` registered after `GET /:traceId` — may be captured as `traceId=search`.

---

## Banking — `/api/v1/banking`

**Controller:** `banking.controller`

| Method | Path | Handler |
|--------|------|---------|
| POST | `/payments` | `initiatePayment` |
| GET | `/payments` | `getPayments` |
| GET | `/payments/:id` | `getPaymentStatus` |
| POST | `/payments/:id/process` | `processPayment` |
| POST | `/payments/:id/retry` | `retryPayment` |
| POST | `/payments/:id/reverse` | `reversePayment` |
| POST | `/payments/recover-failed` | `recoverFailedPayments` |
| POST | `/statements/:id/auto-match` | `autoMatchTransactions` |
| POST | `/statements/:id/reconcile` | `reconcileBankStatement` |

---

## Audit — `/api/v1/audit`

**Controller:** `audit.controller`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/trail/:entityType/:entityId` | `getEntityAuditTrail` |
| GET | `/summary` | `getAuditSummary` |
| GET | `/verify-chain` | `verifyAuditChain` |
| GET | `/export` | `exportAuditTrail` |

---

## CA Workflow — `/api/v1/ca-workflow`

**Controller:** `caWorkflow.controller`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/periods` | `getPeriods` |
| POST | `/periods` | `getOrCreatePeriod` |
| POST | `/periods/:periodId/month-close` | `monthClose` |
| POST | `/periods/:periodId/quarter-close` | `quarterClose` |
| POST | `/periods/:periodId/annual-close` | `annualClose` |
| GET | `/periods/:periodId/trial-balance` | `generateTrialBalance` |

---

## Tally — `/api/v1/tally`

**Controller:** `tally.controller`

| Method | Path | Handler |
|--------|------|---------|
| POST | `/export/vouchers` | `exportVouchers` |
| POST | `/export/masters` | `exportMasters` |
| POST | `/export/opening-balances` | `exportOpeningBalances` |
| POST | `/export/gst-data` | `exportGSTData` |
| POST | `/import/vouchers` | `importVouchers` |
| POST | `/import/masters` | `importMasters` |
| POST | `/validate-migration` | `validateMigrationReadiness` |

---

## Multi-Company — `/api/v1/multi-company`

**Controller:** `multiCompany.controller`

| Method | Path | Handler |
|--------|------|---------|
| POST | `/companies` | `createCompany` |
| GET | `/companies` | `getCompanies` |
| GET | `/companies/:id` | `getCompany` |
| PUT | `/companies/:id` | `updateCompany` |
| POST | `/companies/:companyId/branches` | `createBranch` |
| GET | `/companies/:companyId/branches` | `getBranches` |
| POST | `/companies/:companyId/consolidated-report` | `getConsolidatedReport` |
| POST | `/consolidated-trial-balance` | `getConsolidatedTrialBalance` |
| POST | `/cost-centres` | `createCostCentre` |
| GET | `/cost-centres` | `getCostCentres` |

---

## Tantra — `/api/v1/tantra`

**Controller:** `tantra.controller`

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/register` | Public | `register` |
| POST | `/heartbeat` | Public | `heartbeat` |
| GET | `/health` | Public | `getSystemHealth` |
| GET | `/metrics` | Public | `getMetrics` |
| POST | `/events` | Bearer | `emitEvent` |
| GET | `/metadata` | Bearer | `getOperationalMetadata` |
| GET | `/dashboard` | Bearer | `getDashboardData` |
| GET | `/evidence/:traceId` | Bearer | `getEvidenceByTrace` |
| GET | `/evidence` | Bearer | `getEvidenceSummary` |

---

## Performance — `/api/v1/performance` (admin only)

**Controller:** `performance.controller`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/metrics` | `getMetrics` |
| GET | `/health` | `getHealthStatus` |
| POST | `/reset` | `resetMetrics` |

---

## Database Admin — `/api/v1/database` (admin only)

**Controller:** `database.controller`

| Method | Path | Handler |
|--------|------|---------|
| GET | `/stats` | `getDatabaseStats` |
| GET | `/collections` | `getCollectionStats` |
| GET | `/indexes` | `getIndexInfo` |
| POST | `/indexes` | `createIndexes` |
| GET | `/optimize` | `getOptimizationSuggestions` |

---

## Middleware Reference

| Middleware | File | Applied To |
|------------|------|------------|
| `protect` | `auth.js` | All protected routes |
| `authorize(roles)` | `auth.js` | Role-restricted routes |
| Rate limiting | `security.js` | Global + auth routes |
| Helmet | `security.js` | Global |
| Authority boundary | `authorityBoundary.js` | All requests |
| Cache | `cache.js` | GET requests (Redis) |
| Upload | `upload.js` | File upload routes |
| Validation | `validation.js` | Request validation |

---

## Frontend API Service Mismatches

Documented in `frontend/src/services/index.js` — paths that may not match backend:

| Frontend Call | Backend Equivalent | Status |
|---------------|-------------------|--------|
| `/settings/company` | `GET/PUT /settings` | Mismatch |
| `/gst/gstr1/:period` | `POST /gst/gstr1/generate` | Mismatch |
| `/tds/pay/:id` | — | Missing |
| `/tds/forms/:form` | — | Missing |
| `/reports/aged-payables` | — | Missing |
| `/users/:id/change-password` | — | Missing |

> TODO: Verify which frontend pages use these service methods at runtime.

---

## Legacy Router

`backend/src/routes/index.js` exists but is **not mounted** in current `server.js`.
