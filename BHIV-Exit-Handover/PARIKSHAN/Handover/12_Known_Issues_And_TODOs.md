# Known Issues and TODOs — PARIKSHAN / NIYANTRAN V1

## Critical / high

| # | Issue | Impact | Workaround |
|---|-------|--------|------------|
| 1 | **Port mismatch** — backend `4000`, frontend defaults `4001` | Local dev shows empty/broken dashboard | Set `VITE_API_BASE_URL=http://localhost:4000` |
| 2 | **No authentication** | Public read/write API in production | Network isolate until auth added |
| 3 | **Mock telemetry only** | Data not from real Pravah/upstream | Document as demo; integrate real feed |
| 4 | **No deployment config** | Unknown production URLs and process | **TODO: Verify** with team |

---

## Medium

| # | Issue | Details |
|---|-------|---------|
| 5 | **Hardcoded dashboard data** | `LINE_SERIES`, `RECENT_TASKS`, `CANDIDATES` in `Dashboard.tsx` mask API failures |
| 6 | **Silent hydrate failure** | `NiyantranContext.hydrate()` no user-visible error on API failure |
| 7 | **Six placeholder tabs** | Repository Review, Handover, Insights, Logs, Settings — `InfoPage` only |
| 8 | **Open CORS** | Suitable for dev; unsafe for public multi-tenant |
| 9 | **Committed `frontend/dist/`** | May be stale or built with wrong API URL |
| 10 | **Naming drift** | PARIKSHAN vs NIYANTRAN vs bhiv-niyantran confuses search/onboarding |

---

## Low / documentation

| # | Issue | Details |
|---|-------|---------|
| 11 | Minimal root `README.md` | Only `# PARIKSHAN` — use `Handover/` for setup |
| 12 | No `.env.example` | Env vars documented only in handover |
| 13 | No tests | No regression safety net |
| 14 | Socket reconnect | **TODO: Verify** — `useRealtimeNiyantran` reconnect on disconnect |
| 15 | `niyantran:error` UI | Stream errors may not surface in dashboard |

---

## TODO: Verify (external facts)

- [ ] Production frontend URL
- [ ] Production backend URL
- [ ] MongoDB hosting (Atlas cluster, backups)
- [ ] Product owner and on-call
- [ ] Intended Pravah integration timeline
- [ ] Whether PARIKSHAN is canonical name or should rename to NIYANTRAN
- [ ] Git remote commits after handover snapshot

---

## Suggested fix order for incoming team

1. Fix default frontend port to `4000` OR add `.env.example` with documented vars
2. Add health/error banner on frontend when overview fails
3. Remove or gate hardcoded demo data behind dev flag
4. Add basic auth or API key for `/niyantran/action`
5. Wire real telemetry source replacing `mockSignalService`
6. Implement or remove placeholder tabs
7. Add CI + smoke test (`/health`, `/overview`)
8. Add deployment manifests (Render/Vercel/etc.)

---

## Code references

**Frontend default port:**

```typescript
// frontend/src/services/api.ts & socket.ts
import.meta.env.VITE_API_BASE_URL || "http://localhost:4001"
```

**Backend default port:**

```javascript
// backend/server.js
const PORT = process.env.PORT || 4000;
```

**Mock stream:**

```javascript
// backend/streams/niyantranStream.js — setInterval 5000ms
// backend/services/mockSignalService.js — simulatePravahEvent()
```
