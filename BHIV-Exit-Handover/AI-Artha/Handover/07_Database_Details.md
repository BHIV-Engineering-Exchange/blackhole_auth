# Database Details — AI-Artha

**Generated:** 2026-07-05  
**ORM:** Mongoose 8  
**Connection:** `backend/src/config/database.js`  
**Env Vars:** `MONGODB_URI`, `MONGODB_TEST_URI`

---

## Connection Configuration

| Setting | Detail |
|---------|--------|
| **Driver** | Mongoose 8 over MongoDB native driver |
| **Transactions** | Enabled when replica set detected; graceful degradation on standalone |
| **Connection helper** | `withTransaction()` in `database.js` |
| **Indexing** | `npm run create-indexes` → `scripts/create-indexes.js` |
| **Initialization** | `scripts/initialize-database.js` |
| **Hash chain migration** | `scripts/migrate-hash-chain.js` |

---

## Models Overview (32 Collections)

| Model | File | Primary Purpose |
|-------|------|-----------------|
| User | `User.js` | Authentication, roles |
| ChartOfAccounts | `ChartOfAccounts.js` | Account master (33 default accounts) |
| Account | `Account.js` | Account instances |
| AccountBalance | `AccountBalance.js` | Real-time balances |
| JournalEntry | `JournalEntry.js` | Double-entry journal headers |
| JournalLine | `JournalLine.js` | Journal line items (embedded in JournalEntry) |
| LedgerEntry | `LedgerEntry.js` | Posted ledger records |
| Invoice | `Invoice.js` | Sales invoices |
| Expense | `Expense.js` | Expense records with receipts |
| GSTReturn | `GSTReturn.js` | GST return filings |
| TDSEntry | `TDSEntry.js` | TDS deduction entries |
| TDSChallan | `TDSChallan.js` | TDS challan deposits |
| TDSQuarterlyGroup | `TDSQuarterlyGroup.js` | Quarterly TDS grouping |
| TDSValidationLog | `TDSValidationLog.js` | TDS validation audit |
| CompanySettings | `CompanySettings.js` | Company configuration |
| Company | `Company.js` | Multi-company support |
| CostCentre | `CostCentre.js` | Cost centre tracking |
| FinancialPeriod | `FinancialPeriod.js` | FY/period management |
| BankStatement | `BankStatement.js` | Bank statement uploads |
| Payment | `Payment.js` | Internal payment records |
| ReconcileRecord | `ReconcileRecord.js` | Bank reconciliation |
| ComplianceSignal | `ComplianceSignal.js` | Compliance signals |
| ComplianceFiling | `ComplianceFiling.js` | Statutory filing records |
| ComplianceValidationLog | `ComplianceValidationLog.js` | Filing validation logs |
| AuditLog | `AuditLog.js` | Audit trail entries |
| AuditEvent | `AuditEvent.js` | Audit events |
| SetuDispatch | `SetuDispatch.js` | SETU dispatch records |
| UnifiedTrace | `UnifiedTrace.js` | Traceability chain |
| RuntimeProof | `RuntimeProof.js` | Runtime proof artifacts |
| RLExperience | `RLExperience.js` | InsightFlow RL experiences |
| TallyExport | `TallyExport.js` | Tally export records |
| TallyImport | `TallyImport.js` | Tally import records |

---

## Model Schemas (Key Fields)

### User (`User.js`)

| Field | Type | Notes |
|-------|------|-------|
| email | String | Required, unique, lowercase |
| password | String | Required, min 6 chars, bcrypt hashed, select: false |
| name | String | Required |
| phone | String | Optional |
| department | String | Optional |
| role | String | enum: `admin`, `accountant`, `viewer`; default: `viewer` |
| isActive | Boolean | default: true |
| lastLogin | Date | |
| refreshToken | String | Schema field exists; no refresh endpoint in server |
| resetPasswordToken | String | |
| resetPasswordExpire | Date | |
| timestamps | | createdAt, updatedAt |

**Indexes:** `{ role: 1 }`, `{ isActive: 1 }`, `{ lastLogin: -1 }`

---

### JournalEntry (`JournalEntry.js`)

| Field | Type | Notes |
|-------|------|-------|
| entryNumber | String | Unique entry identifier |
| date | Date | Entry date |
| description | String | |
| lines | Array | Embedded journalLineSchema (account, debit, credit) |
| status | String | draft, posted, voided |
| type | String | standard, reversal, credit_note, debit_note |
| hash | String | HMAC-SHA256 hash chain |
| previousHash | String | Previous entry hash |
| traceId | String | Traceability ID |
| gstDetails | Object | Embedded GST detail schema |
| auditTrace | Array | Embedded audit trace schema |
| postedAt | Date | |
| postedBy | ObjectId | ref: User |
| timestamps | | |

**Pre-save hook:** Computes hash chain using `HMAC_SECRET`

---

### Invoice (`Invoice.js`)

| Field | Type | Notes |
|-------|------|-------|
| invoiceNumber | String | Unique |
| customerName | String | Required |
| customerEmail | String | Required |
| customerAddress | Object | street, city, state, zipCode, country |
| customerState | String | |
| customerGSTIN | String | GSTIN regex validation (B2B) |
| invoiceDate | Date | Required |
| dueDate | Date | Required |
| items | Array | description, quantity, unitPrice, amount, taxRate, hsnCode |
| subtotal | String | Decimal string |
| taxAmount | String | Decimal string |
| totalAmount | String | Decimal string |
| status | String | draft, sent, partial, paid, cancelled |
| payments | Array | Payment records |
| journalEntry | ObjectId | ref: JournalEntry |
| timestamps | | |

---

### Expense (`Expense.js`)

| Field | Type | Notes |
|-------|------|-------|
| vendor | String | |
| amount | String | Decimal string |
| category | String | |
| description | String | |
| expenseDate | Date | |
| status | String | pending, approved, recorded, rejected |
| receipts | Array | Embedded receiptSchema (file, OCR data) |
| gstDetails | Object | Input GST credit |
| journalEntry | ObjectId | ref: JournalEntry |
| approvedBy | ObjectId | ref: User |
| timestamps | | |

---

### ChartOfAccounts (`ChartOfAccounts.js`)

| Field | Type | Notes |
|-------|------|-------|
| code | String | Account code (e.g., 1010, 4000) |
| name | String | Account name |
| type | String | asset, liability, equity, revenue, expense |
| parent | ObjectId | ref: ChartOfAccounts |
| isActive | Boolean | |
| normalBalance | String | debit or credit |

---

### TDSEntry (`TDSEntry.js`)

| Field | Type | Notes |
|-------|------|-------|
| section | String | TDS section (194A, 194C, etc.) |
| deductee | Object | Name, PAN, amount |
| tdsAmount | String | Decimal string |
| status | String | pending, deducted, deposited, filed |
| challan | ObjectId | ref: TDSChallan |
| journalEntry | ObjectId | ref: JournalEntry |
| timestamps | | |

---

### GSTReturn (`GSTReturn.js`)

| Field | Type | Notes |
|-------|------|-------|
| returnType | String | GSTR-1, GSTR-3B |
| period | String | MM-YYYY |
| status | String | draft, filed |
| data | Mixed | Return JSON payload |
| filedAt | Date | |
| timestamps | | |

---

### ComplianceSignal (`ComplianceSignal.js`)

| Field | Type | Notes |
|-------|------|-------|
| signalType | String | Signal classification |
| severity | String | |
| entityType | String | |
| entityId | String | |
| traceId | String | |
| payload | Mixed | Signal data |
| dispatched | Boolean | SETU dispatch status |
| timestamps | | |

---

### BankStatement (`BankStatement.js`)

| Field | Type | Notes |
|-------|------|-------|
| fileName | String | |
| bankName | String | |
| accountNumber | String | |
| transactions | Array | Embedded transactionSchema |
| status | String | uploaded, processed, matched |
| matchedCount | Number | |
| timestamps | | |

---

### CompanySettings (`CompanySettings.js`)

| Field | Type | Notes |
|-------|------|-------|
| companyName | String | |
| gstin | String | |
| pan | String | |
| address | Object | |
| financialYearStart | String | e.g., April |
| currency | String | default: INR |
| timestamps | | |

---

### Payment (`Payment.js`)

| Field | Type | Notes |
|-------|------|-------|
| amount | String | Decimal string |
| status | String | pending, processing, completed, failed, reversed |
| type | String | invoice_payment, expense, etc. |
| reference | String | |
| entityType | String | |
| entityId | ObjectId | |
| timestamps | | |

---

### AuditLog (`AuditLog.js`)

| Field | Type | Notes |
|-------|------|-------|
| action | String | |
| entityType | String | |
| entityId | String | |
| userId | ObjectId | ref: User |
| beforeState | Mixed | |
| afterState | Mixed | |
| hash | String | Audit chain hash |
| previousHash | String | |
| timestamps | | |

---

### UnifiedTrace (`UnifiedTrace.js`)

| Field | Type | Notes |
|-------|------|-------|
| traceId | String | Unique trace identifier |
| events | Array | Trace event chain |
| entityType | String | |
| entityId | String | |
| status | String | |
| timestamps | | |

---

### SetuDispatch (`SetuDispatch.js`)

| Field | Type | Notes |
|-------|------|-------|
| signalId | ObjectId | ref: ComplianceSignal |
| payload | Mixed | Normalized SETU payload |
| status | String | pending, dispatched, failed |
| response | Mixed | SETU response |
| timestamps | | |

---

## Remaining Models

For full field definitions, inspect source files in `backend/src/models/`:

- `Account.js`, `AccountBalance.js`, `LedgerEntry.js`, `JournalLine.js`
- `TDSChallan.js`, `TDSQuarterlyGroup.js`, `TDSValidationLog.js`
- `Company.js`, `CostCentre.js`, `FinancialPeriod.js`
- `ReconcileRecord.js`, `ComplianceFiling.js`, `ComplianceValidationLog.js`
- `AuditEvent.js`, `RuntimeProof.js`, `RLExperience.js`
- `TallyExport.js`, `TallyImport.js`

---

## Seed Scripts

| Script | Purpose |
|--------|---------|
| `scripts/seed.js` | Seed chart of accounts, sample data |
| `scripts/seed-tds.js` | Seed TDS sample data |
| `scripts/verify-seed-data.js` | Verify seed integrity |

---

## Migration Scripts

| Script | Purpose |
|--------|---------|
| `scripts/migrate-hash-chain.js` | Migrate existing entries to hash chain |
| `scripts/create-indexes.js` | Create compound indexes |
| `scripts/initialize-database.js` | Initial DB setup |

> No formal migration framework (e.g., migrate-mongo). Migrations are ad-hoc Node scripts.

---

## MongoDB Production Requirements

From `docs/DEPLOYMENT.md` and `database.js`:

- **Replica set required** for multi-document transactions
- Connection string must include `replicaSet=rs0` for Docker prod
- Initialize replica set: `rs.initiate()` after container start
- Atlas free tier supports replica sets

---

## Backup & Restore

```bash
# Backup
./scripts/backup.sh
./scripts/backup-prod.sh

# Restore
./scripts/restore.sh <backup-file>
```

Backup uses `mongodump` via Docker exec on production containers.
