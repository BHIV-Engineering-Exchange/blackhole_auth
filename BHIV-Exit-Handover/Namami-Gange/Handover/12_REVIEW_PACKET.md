# Review Packet — Namami-Gange

**Generated:** 2026-07-06  
**Review Time:** < 10 minutes  
**Also see:** `REVIEW_PACKET.md` (repo root), `backend/review_packets/`

---

## Entry Points

| File | Purpose |
|------|---------|
| `backend/src/api.py` | Flask app |
| `backend/src/scoring_engine.py` | Scoring models |
| `backend/docs/API_CONTRACT.md` | API contract v2.1 |
| `frontend/src/app/page.tsx` | Main UI |
| `frontend/src/services/api.ts` | API client |
| `render.yaml` | Render deploy |
| `DEPLOYMENT_GUIDE.md` | Full deploy steps |

---

## Production URLs

| Surface | URL | Verify |
|---------|-----|--------|
| Backend | https://namami-gange-api.onrender.com | ☐ |
| Frontend | https://namami-gange.vercel.app | ☐ |

---

## Core Flow

```
Frontend page.tsx
  → fetchResults('inland_port')
  → GET /results?model=inland_port
  → scoring_engine + constraint_engine
  → JSON results → mapBackendToFrontend()
  → Intelligence cards on dashboard
```

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] Start backend: `cd backend/src && python api.py`
- [ ] `curl localhost:5000/health` → 200, `entities_loaded: 6`
- [ ] `curl "localhost:5000/results?model=inland_port"` → scored results
- [ ] Start frontend: `cd frontend && npm run dev`
- [ ] Dashboard shows suitability scores
- [ ] Navigate all sidebar tabs (note static vs live views)
- [ ] Review `Handover/10_Known_Issues.md`
- [ ] Skim `backend/ng_data_inventory.csv` for data risks

---

## Review Flags

1. **Only `/results` wired to UI** — other views static
2. **No auth** — open API
3. **External infra (Postgres/Redis/ng-core)** — referenced but not in repo
4. **No live CPCB/CWC feeds** — static CSV
5. **Replay/federation UI simulated** — not persisted
6. **Production URLs** — TODO: Verify live
7. **283 tests claim** — TODO: Verify by running test suite

---

## Integration Status (Repo Claim)

From `REVIEW_PACKET.md`:

**STATUS: COMPLETE** — for `GET /results?model=inland_port` integration only.

**READY FOR DEMONSTRATION DEPLOYMENT** — no integration blockers for suitability pipeline.

---

## Key Verification

| Check | Command | Expected |
|-------|---------|----------|
| Health | `GET /health` | 200, `ml_used: false` |
| Results | `GET /results?model=inland_port` | 6 locations scored |
| Determinism | `python test_determinism.py` | PASS |
| CORS | Frontend fetch from :3000 | No CORS error |
| REJECT | `farakka_wetland` in results | `level: REJECTED` |

---

## Handover Completeness

| Area | Status |
|------|--------|
| Handover/ 18-doc package | ✅ Created |
| API contract doc | ✅ Existing |
| Production verification | TODO |
| Screenshots | TODO |
| Full test run evidence | TODO |
