# Repository Structure — PARIKSHAN

```
PARIKSHAN/
├── README.md                    # Minimal: "# PARIKSHAN" only
├── Handover/                    # Exit documentation (this package)
├── backend/
│   ├── server.js                # Entry: Express, MongoDB, Socket.IO, stream start
│   ├── package.json
│   ├── routes/
│   │   └── niyantranRoutes.js   # /niyantran/overview, /action, /stream
│   ├── controllers/
│   │   └── niyantranController.js
│   ├── models/
│   │   ├── Entity.js            # project | team | individual
│   │   ├── Alert.js
│   │   └── ActionLog.js
│   ├── services/
│   │   ├── overviewService.js   # Aggregates overview payload
│   │   ├── actionService.js     # assign | escalate | ping | resolve
│   │   ├── alertEngineService.js
│   │   └── mockSignalService.js # Seed + simulatePravahEvent
│   └── streams/
│       └── niyantranStream.js   # 5s interval → emit niyantran:update
└── frontend/
    ├── package.json
    ├── vite.config.ts
    ├── index.html
    ├── dist/                    # Pre-built production assets (committed)
    └── src/
        ├── main.tsx
        ├── App.tsx              # Provider + hydrate + Dashboard
        ├── index.css
        ├── context/
        │   └── NiyantranContext.tsx
        ├── hooks/
        │   └── useRealtimeNiyantran.ts
        ├── services/
        │   ├── api.ts           # getOverview, postAction
        │   └── socket.ts        # Socket.IO client (autoConnect: false)
        ├── pages/
        │   └── Dashboard.tsx    # All tabs + hardcoded demo data
        └── components/          # UI building blocks (if any)
```

---

## Key entry points

| File | Responsibility |
|------|----------------|
| `backend/server.js` | Creates HTTP server, attaches Socket.IO, connects MongoDB, seeds data, starts stream |
| `backend/routes/niyantranRoutes.js` | Mounts NIYANTRAN REST routes |
| `backend/streams/niyantranStream.js` | Periodic mock telemetry broadcast |
| `frontend/src/App.tsx` | Wraps app in `NiyantranProvider`, calls `hydrate()` on mount |
| `frontend/src/pages/Dashboard.tsx` | Single SPA shell — tab nav, all views |
| `frontend/src/context/NiyantranContext.tsx` | Global state: projects, teams, individuals, alerts, blockers |

---

## Data flow

1. **Initial load:** `App.tsx` → `hydrate()` → `GET /niyantran/overview` → context state
2. **Realtime:** `useRealtimeNiyantran` connects socket → listens `niyantran:update` → `mergeRealtimeUpdate`
3. **Actions:** UI → `triggerAction` → `POST /niyantran/action` → server emits update → context merge
4. **Background:** `niyantranStream` every 5s updates random entity + alert engine → broadcast

---

## Git history (summary)

| Commit | Message |
|--------|---------|
| `92f7ae3` | first commit |
| `933032a` | saved |

**TODO: Verify** — whether remote has additional commits after handover snapshot.

---

## Files intentionally not documented in depth

- `frontend/dist/*` — build output; regenerate with `npm run build`
- `node_modules/` — not committed (standard)
