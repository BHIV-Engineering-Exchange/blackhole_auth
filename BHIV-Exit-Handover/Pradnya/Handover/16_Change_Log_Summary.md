# Change Log Summary — Pradnya / NICAI

## Repository history

| Commit | Message | Notes |
|--------|---------|-------|
| `40b65bc` | first commit | Initial NICAI system |
| `39ea90e` | saved | |
| `7a501f4` | saved | |
| `9f0070e` | Fix Vercel deploy: add root vercel.json, remove node_modules from git | Deployment fix |
| `4b8afa4` | Use cd frontend for Vercel install and build commands | Build path fix |
| `8f8763a` | Allow CORS from pradnya-bhiv.vercel.app | Production frontend CORS |

**TODO: Verify** — remote for additional commits after handover snapshot.

---

## Product evolution (inferred)

| Phase | State |
|-------|-------|
| Core | Deterministic NICAI pipeline — CSV → validate → Sanskar → patterns → logs |
| API | FastAPI with `/signals`, `/nicai/evaluate`, `/action`, HTML `/dashboard` |
| Frontend v2 | Full React dashboard (`App.jsx`) with mock + live hybrid |
| Deploy | Render backend + Vercel frontend wired |
| Integrations | SVACS scripts, Samachar/Mitra UI pipeline (optional) |

---

## Major components

| Component | File(s) |
|-----------|---------|
| FastAPI app | `main.py` |
| CSV adapter | `samachar_input_adapter.py` |
| Validator | `validator.py` |
| Weather engine | `sanskar_engine.py` |
| Acoustic engine | `sanskar_simple.py` |
| SVACS bridge | `svacs_adapter.py`, `pipeline.py` |
| React UI | `frontend/src/App.jsx` |
| Deploy | `render.yaml`, `vercel.json` |

---

## Documentation in repo

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive NICAI product doc (architecture, API, demo flow) |
| `REVIEW_PACKET.md` | Review material (**TODO: Verify** contents) |
| `TESTING_PACKET.md` | Testing material (**TODO: Verify** contents) |
| `Handover/` | Exit handover package (this documentation set) |

---

## Version labels

- Frontend footer: **NICAI v2.0.0** (in `App.jsx`)
- npm package: `nicai-demo-ui` v1.0.0

No git tags observed.

---

## Related workspace handovers

| Repo | Relationship |
|------|--------------|
| PARIKSHAN | NIYANTRAN ops dashboard (different product) |
| Namami-Gange | Also NICAI-branded environmental intelligence |
| SVACS-Main | Acoustic perception source for adapter scripts |

---

## Recommended going forward

1. Add `CHANGELOG.md` for API and validation rule changes
2. Tag releases (`v2.0.0`) aligned with UI footer
3. Pin Python version in `render.yaml`
4. Document Render URL in root README when verified
