# Runtime Evidence — AI-Artha

**Generated:** 2026-07-05  
**Purpose:** Placeholder and reference guide for runtime proof artifacts

---

## Existing Evidence Files (Repository Root)

| File | Description | Status |
|------|-------------|--------|
| `runtime_health_snapshot.json` | Health snapshot at time of generation | Present in repo |
| `production_runtime_evidence.json` | Production runtime proof data | Present in repo |
| `production_transition_validation.json` | Production transition validation | Present in repo |
| `runtime_participation_validation.json` | Runtime participation validation | Present in repo |
| `observability_report.md` | Observability analysis report | Present in repo |

> TODO: Verify timestamps and validity of existing evidence files before relying on them for handover sign-off.

---

## Certification Artifacts

| File | Location |
|------|----------|
| `ARTHA_PRODUCTION_CERTIFICATE.json` | `docs/handover/` |
| `ARTHA_INTEGRITY_CERTIFICATE.json` | `docs/handover/` |
| `DEPLOYMENT_READINESS_CHECKLIST.json` | `docs/handover/` |
| Backend copies | `backend/docs/handover/` |

---

## How to Generate Fresh Runtime Evidence

### 1. Health Snapshot

```bash
# Start backend
cd backend && npm run dev

# Capture health
curl -s http://localhost:5000/health/detailed > Handover/runtime_evidence/health_detailed.json
curl -s http://localhost:5000/ready > Handover/runtime_evidence/ready.json
curl -s http://localhost:5000/metrics > Handover/runtime_evidence/metrics.json
```

### 2. Proof Suite

```bash
cd backend
node scripts/seed.js
npm run proof:all
# Output: proof artifacts in backend working directory
```

Individual phases:
```bash
node scripts/proof-replay.js
node scripts/proof-compliance.js
node scripts/proof-audit.js
node scripts/proof-certify.js
```

### 3. Governance Pipeline

```bash
cd backend
npm run governance:full
```

### 4. Independent Verification

```bash
cd backend
npm run verify:all
```

### 5. CI Evidence Bundle

```bash
cd backend
npm run evidence:full
```

---

## Production Runtime Checks

> TODO: Verify against live production URLs.

```bash
# Backend health (Render)
curl -s https://ai-artha.onrender.com/api/health

# Backend detailed health
curl -s https://ai-artha.onrender.com/health/detailed

# Frontend availability
curl -I https://ai-artha.vercel.app
```

**Expected production URLs** (from `backend/.env.production.example`):
- Backend: `https://ai-artha.onrender.com`
- Frontend: `https://ai-artha.vercel.app`

---

## Ledger Integrity Evidence

```bash
# Requires admin JWT token
curl -s -H "Authorization: Bearer <admin-token>" \
  http://localhost:5000/api/v1/ledger/verify-chain \
  > Handover/runtime_evidence/ledger_verify_chain.json

curl -s -H "Authorization: Bearer <admin-token>" \
  http://localhost:5000/api/v1/ledger/chain-stats \
  > Handover/runtime_evidence/ledger_chain_stats.json
```

---

## Dashboard Data Evidence

```bash
curl -s -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/v1/reports/dashboard \
  > Handover/runtime_evidence/dashboard_summary.json

curl -s -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/v1/reports/kpis \
  > Handover/runtime_evidence/kpis.json
```

---

## Screenshot Placeholders

Store runtime screenshots in `Handover/Screenshots/`:

| Screenshot | Filename (suggested) | Status |
|------------|---------------------|--------|
| Login page | `login_page.png` | TODO: Capture |
| Dashboard KPIs | `dashboard_kpis.png` | TODO: Capture |
| Invoice list | `invoice_list.png` | TODO: Capture |
| GST dashboard | `gst_dashboard.png` | TODO: Capture |
| Ledger integrity | `ledger_integrity.png` | TODO: Capture |
| Health endpoint response | `health_response.png` | TODO: Capture |
| Production frontend | `production_frontend.png` | TODO: Capture |

---

## Video Placeholders

Store walkthrough videos in `Handover/Videos/`:

| Video | Filename (suggested) | Status |
|-------|---------------------|--------|
| Local setup walkthrough | `local_setup_walkthrough.mp4` | TODO: Record |
| Invoice-to-ledger flow | `invoice_ledger_flow.mp4` | TODO: Record |
| GST filing packet demo | `gst_filing_demo.mp4` | TODO: Record |
| Deployment procedure | `deployment_procedure.mp4` | TODO: Record |
| Proof suite execution | `proof_suite_execution.mp4` | TODO: Record |

---

## Evidence Collection Checklist

- [ ] Fresh `health/detailed` JSON captured
- [ ] `proof:all` executed successfully
- [ ] Ledger chain verification passed
- [ ] Dashboard returns non-empty KPI data
- [ ] Production health endpoints verified (if deployed)
- [ ] Screenshots captured for key UI pages
- [ ] Governance pipeline passed: `npm run governance:full`
- [ ] Evidence files stored in `Handover/Screenshots/` and committed evidence JSON reviewed

---

## Observability Endpoints for Evidence

| Endpoint | Evidence Type |
|----------|---------------|
| `GET /observability` | System observability data |
| `GET /prometheus` | Prometheus metrics |
| `GET /api/v1/runtime/status` | Runtime operational status |
| `GET /api/v1/audit/summary` | Audit trail summary |

---

## Notes

- Regenerate all evidence after any schema or HMAC_SECRET changes
- Do not commit JWT tokens or secrets in evidence files
- Timestamp all captured evidence with date and environment (local/staging/production)
