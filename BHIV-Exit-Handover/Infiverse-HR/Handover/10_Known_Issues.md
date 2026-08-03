# Known Issues — Infiverse-HR

**Generated:** 2026-07-06  
**Primary source:** `SAMPADA_CURRENT_STATE.md` §Known Gaps

---

## Critical / High

### 1. Conflicting production Render URLs

**Docs conflict:**

| Source | Gateway URL |
|--------|-------------|
| `frontend/VERCEL_DEPLOYMENT.md` | `bhiv-hr-gateway-l0xp.onrender.com` |
| `backend/docs/guides/DEPLOYMENT_GUIDE.md` | `bhiv-hr-gateway-ltg0.onrender.com` |

Same pattern for agent and langgraph services.

**Impact:** Wrong Vercel env vars → total frontend failure.

**Action:** TODO: Verify which Render services are live.

---

### 2. Internal HR user authentication not implemented

**Source:** `SAMPADA_CURRENT_STATE.md`

API keys used as workaround for internal HR operations.

**Impact:** No proper role-based internal user management.

---

### 3. Tenant isolation incomplete outside Control Center

**Source:** `SAMPADA_CURRENT_STATE.md`

Control Center endpoints use governance scoping; not all gateway routes enforce same isolation.

**Impact:** Potential cross-tenant data exposure on unscoped endpoints.

**Mitigation:** Extend `control_center_governance.py` patterns platform-wide.

---

### 4. JWT secret mismatch (operational)

**Symptom:** 401 on all authenticated calls  
**Cause:** Token generated with different secret than gateway `.env`  
**Fix:** Regenerate tokens using current `JWT_SECRET_KEY` / `CANDIDATE_JWT_SECRET_KEY`

Common in local dev and after secret rotation.

---

## Medium

### 5. Tenant-specific encryption missing

Shared encryption keys across tenants. Documented security consideration.

---

### 6. Ministry→office hierarchy not runtime-enforced

Task19 architecture docs describe full hierarchy. Runtime enforcement limited to workforce governance modules.

---

### 7. RL model training mocked

Retrain endpoint exists but training is mocked. Documented accepted limitation.

---

### 8. Production UI smoke incomplete

`docs/CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md` §F has open items for prod JWT matrix and UI smoke.

---

### 9. SETU external participation unproven

Local in-process evidence captured (2026-06-27 sprint). External partner servers not booted for Tier 2 captures (2026-07-02). External owner integration still blocked.

---

### 10. VITE_API_KEY exposed in frontend

Production API key sent from browser. Extractable from bundle.

---

### 11. Legacy routes.tsx

`frontend/src/routes.tsx` is partial/outdated. Canonical routing is `App.tsx`. May confuse developers.

---

## Low

### 12. CORS misconfiguration

Frontend origin not in gateway `CORS_ORIGINS` → browser blocks requests.

---

### 13. Docker workflow bridge

Inside Docker, must use `WORKFLOW_API_BASE_URL_DOCKER=host.docker.internal:5000/api` not localhost.

---

### 14. Agent cold start on Render

Free tier Render services spin down. First AI match request may timeout.

---

### 15. HuggingFace model download

Agent service downloads sentence-transformers on first run. May fail without `HF_TOKEN` or on memory-limited instances.

---

## Verified Passing (Reference)

From `SAMPADA_CURRENT_STATE.md` evidence:

| Test | Result |
|------|--------|
| Trace continuity | PASS |
| Workflow automation | PASS |
| Resilience tests | 8/8 PASSED |
| RBAC negative tests | 5/5 PASSED |
| Tenant isolation | PASSED |
| Replay reconstruction | SUCCESS |
| Workforce governance pytest | 12 passed |

---

## Issue Priority Matrix

| Priority | Count | Action |
|----------|-------|--------|
| Critical/High | 4 | Resolve before production handoff sign-off |
| Medium | 7 | First maintenance sprint |
| Low | 4 | Ops runbook / backlog |
