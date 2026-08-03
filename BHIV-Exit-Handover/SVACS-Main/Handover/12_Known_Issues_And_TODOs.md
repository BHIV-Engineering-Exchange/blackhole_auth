# Known Issues and TODOs — SVACS-Main

## Critical / high

| # | Issue | Impact | Workaround |
|---|-------|--------|------------|
| 1 | **RealAdapter is empty stub** | `VITE_USE_MOCK=false` still shows mock data | Use Flask HTML dashboard or implement adapter |
| 2 | **Two backends (Flask vs FastAPI)** | Confusion; Render only runs Flask | Use `dashboard/app.py` for prod API |
| 3 | **CORS localhost-only on Render** | Vercel may fail to fetch Flask API | Update `ALLOWED_ORIGINS` |
| 4 | **Production URLs not in repo** | Unknown live endpoints | **TODO: Verify** |
| 5 | **No auth** | Public APIs if exposed | Network restrict or add auth |

---

## Medium

| # | Issue | Details |
|---|-------|---------|
| 6 | **Mock default** | `env.useMock` true when `VITE_USE_MOCK` unset |
| 7 | **No `.env.example`** | Frontend env documented only in handover / Settings |
| 8 | **NICAI perception_log mismatch** | Pradnya references `/perception_log` — not in SVACS-Main |
| 9 | **Ephemeral Render storage** | Runtime log appends may not survive redeploy |
| 10 | **Duplicate chain scripts** | Root vs `runtime/full_operational_chain.py` differ |
| 11 | **Legacy HTML dashboard** | Flask template coexists with React Vercel app |
| 12 | **Microservice env vars unused** | Five separate VITE_* URLs; monolithic Flask may suffice |
| 13 | **requests in scripts** | External bucket calls; error handling varies |

---

## Low

| # | Issue | Details |
|---|-------|---------|
| 14 | Large proof artifact tree | Many committed JSON/MD proofs — repo size |
| 15 | README status claims | "VERIFIED" badges — validate in your environment |
| 16 | `eslint` in scripts but eslint config **TODO: Verify** |
| 17 | Typo file `utils/append_only__utils.py` (double underscore) |

---

## TODO: Verify

- [ ] Render URL for `svacs-backend`
- [ ] Vercel URL for SVACS dashboard
- [ ] `ALLOWED_ORIGINS` production value
- [ ] bhiv-bucket service status and auth
- [ ] Whether FastAPI should replace Flask on Render
- [ ] Real AIS/live feed vs demo CSV/AIS ingest
- [ ] Product owner / on-call

---

## Suggested fix order

1. Confirm Render + Vercel URLs; fix CORS
2. Implement `RealAdapter` → Flask `/api/dashboard`, `/api/telemetry`, etc.
3. Add `.env.example` with `VITE_USE_MOCK` and API base URL
4. Consolidate on one backend entrypoint or document clearly
5. Add `/perception_log` or update Pradnya integration docs
6. Pin single `VITE_API_BASE` for simpler deploy
7. CI: `npm run build` + pytest on push

---

## Code references

**Mock default:**

```typescript
// src/env.ts
useMock: truthy(VITE_USE_MOCK) || !VITE_USE_MOCK  // undefined → true
```

**Empty RealAdapter:**

```typescript
// src/api/adapter.ts
class RealAdapter extends MockAdapter implements SvacsAdapter {}
```

**Render start command:**

```yaml
# render.yaml
startCommand: gunicorn ... dashboard.app:app
```

**Open FastAPI CORS:**

```python
# main.py
allow_origins=["*"]
```
