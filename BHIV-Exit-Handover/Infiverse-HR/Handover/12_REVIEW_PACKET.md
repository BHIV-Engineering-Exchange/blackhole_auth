# Review Packet — Infiverse-HR

**Generated:** 2026-07-06  
**Review Time:** < 10 minutes  
**Detailed packet:** `REVIEW_PACKET.md` (repo root)  
**Current state:** `SAMPADA_CURRENT_STATE.md`

---

## Entry Points

| File | Purpose |
|------|---------|
| `backend/services/gateway/app/main.py` | Gateway app, routers |
| `backend/services/agent/app.py` | AI matching |
| `backend/services/langgraph/app/main.py` | Workflows |
| `frontend/src/App.tsx` | All frontend routes |
| `frontend/src/services/api.ts` | API client |
| `frontend/src/pages/control/ControlCenter.tsx` | Control Center UI |
| `backend/services/gateway/routes/workforce_governance_routes.py` | Workforce + SETU |
| `SAMPADA_CURRENT_STATE.md` | Full handover |

---

## Production URLs

| Surface | URL | Verify |
|---------|-----|--------|
| Frontend (custom) | https://sampada.blackholeinfiverse.com | ☐ |
| Frontend (Vercel) | https://infiverse-hr.vercel.app | ☐ |
| Gateway | https://bhiv-hr-gateway-l0xp.onrender.com | ☐ TODO |
| Agent | https://bhiv-hr-agent-cato.onrender.com | ☐ TODO |
| LangGraph | https://bhiv-hr-langgraph-luy9.onrender.com | ☐ TODO |
| API Docs | `{gateway}/docs` | ☐ |

---

## Core Flow

```
/auth login (client or candidate/recruiter JWT)
  → Candidate: apply → shortlist → interview → offer
  → Recruiter: create job → match → schedule → feedback
  → Client: post jobs → view pipeline → matches
  → Control Center: audit replay + governance (if enabled)
  → SETU: POST /v1/setu/signals/{type}
```

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] Skim `SAMPADA_CURRENT_STATE.md` §9–§10
- [ ] `curl {gateway}/health` → 200
- [ ] Open `{gateway}/docs` — confirm `/v1` routes
- [ ] Start locally: `run_project.ps1` or manual backend + frontend
- [ ] Login at `/auth` (demo or test credentials)
- [ ] Review `Handover/10_Known_Issues.md` (URL conflict + auth gaps)
- [ ] Check `evidence/` for verification artifacts
- [ ] Run quick pytest: `pytest backend/tests/gateway/test_workforce_governance_runtime.py -q`

---

## Review Flags

1. **Conflicting Render URLs** in documentation — verify before trusting Vercel env
2. **Internal HR auth not implemented** — API key workaround
3. **Tenant isolation gaps** outside Control Center
4. **SETU external participation** — local evidence only
5. **No CI/CD** — large pytest suite not gated
6. **VITE_API_KEY in browser** — security exposure
7. **Legacy Streamlit portals** — may still exist on Render separately from React UI

---

## Verified Evidence (Documented)

| Check | Result | Reference |
|-------|--------|-----------|
| Control center API eval | 33/33 PASS | SAMPADA_CURRENT_STATE (2026-06-06) |
| RBAC negative tests | 5/5 PASS | evidence/enforcement/ |
| Tenant isolation | PASS | evidence/enforcement/ |
| Workforce governance pytest | 12 passed | test_workforce_governance_runtime.py |
| SETU partner dispatch Tier 2 | Captured 2026-07-02 | evidence/live_workforce_governance_setu/ |

---

## Key Metrics

| Check | Endpoint | Expected |
|-------|----------|----------|
| Gateway health | `GET /health` | 200 |
| Agent health | `GET /health` | 200 |
| LangGraph health | `GET /health` | 200 |
| Client login | `POST /v1/client/login` | JWT returned |
| Top matches | `GET /v1/match/{job_id}/top` | Scored candidates |
| SETU signal | `POST /v1/setu/signals/{type}` | Signal recorded |

---

## Handover Completeness

| Area | Status |
|------|--------|
| Architecture documented | ✅ |
| Existing SAMPADA_CURRENT_STATE | ✅ (comprehensive) |
| Handover/ 18-doc package | ✅ Created |
| Production URL verification | TODO |
| Screenshots | TODO — see Screenshots/ |
| Demo video | TODO — see Videos/ |
