# Frontend Guide — SVACS-Main

## Overview

**SVACS Command Dashboard** — React 18 + TypeScript + Vite 5 + Tailwind 3. Located at repo root in `src/` (not a separate `frontend/` folder).

Package name: `svacs-dashboard` v0.1.0

---

## Routing (`src/App.tsx`)

| Path | Page | Purpose |
|------|------|---------|
| `/` | Overview | KPIs, pipeline flow, charts, SVACS cards |
| `/pipeline` | LivePipeline | Pipeline runtime surface |
| `/signals` | Signals | Signal stage |
| `/perception` | Perception | Perception events |
| `/intelligence` | Intelligence | Intelligence layer |
| `/state` | StateEngine | State transitions |
| `/vessels` | Vessels | Vessel summaries |
| `/alerts` | Alerts | Alert panel |
| `/trace` | TraceExplorer | Trace lookup |
| `/bucket` | BucketStatus | Bucket sync status |
| `/health` | SystemHealth | Service health frame |
| `/settings` | Settings | Env display |

Shell: `components/shell/AppShell.tsx` — collapsible sidebar, mobile responsive (commits `cc0b006`, `be9ad1a`).

---

## Data layer

### Configuration (`src/env.ts`)

```typescript
useMock: true by default  // unless VITE_USE_MOCK=false explicitly
api: { signal, perception, intelligence, state, bucket, telemetryWs }
pollIntervalMs: default 2000
```

### Adapter (`src/api/adapter.ts`)

- **`MockAdapter`** — full implementation using `@/lib/mockData.ts` generators
- **`RealAdapter`** — extends `MockAdapter` with **empty body** — no HTTP calls implemented
- Export: `adapter = env.useMock ? MockAdapter : RealAdapter`

**Critical:** Setting `VITE_USE_MOCK=false` does **not** enable live backend data today.

### React Query

Pages use `@tanstack/react-query` with `refetchInterval` 4–8s (e.g. `Overview.tsx`).

Query client: `src/api/queryClient.ts` — staleTime 5s, retry 1.

### Axios clients (`src/api/client.ts`)

Pre-configured per microservice URL with `X-Client: svacs-dashboard` and auto `X-Trace-Id` UUID — **unused by MockAdapter**.

---

## Key UI components

| Component | Role |
|-----------|------|
| `PipelineFlow` | Stage pipeline visualization |
| `MaritimeIntelligenceCard` | Jane's / intelligence summary |
| `SensorFusionCard` | Fusion metrics |
| `KnowledgeLineageCard` | Lineage display |
| `TTGCard` | TTG runtime |
| `EventsOverTime`, `ValidationDonut`, `BucketSyncDonut` | Recharts |
| `TopVesselsTable`, `RecentStateTable` | Data tables |
| `AlertSummary` | Alerts widget |

See `component_library.md` and `dashboard_capability_report.md` in repo root.

---

## Mock vs live

| Aspect | Current behavior |
|--------|------------------|
| Default mode | Mock |
| Flask API on :5000 | Not consumed by adapter |
| FastAPI on :8000 | Not consumed by adapter |
| Settings page | Shows env; documents `VITE_USE_MOCK=false` for "final integration demo" |

To wire live data: implement `RealAdapter` methods calling Flask `/api/*` or microservice URLs.

---

## Screenshots

Committed under `dashboard_screenshots/` — referenced in README (overview, pipeline, intelligence, perception, signals, alerts).

---

## Build

```bash
npm run typecheck
npm run build
```

Output: `dist/` for Vercel.

Recent fixes: TypeScript errors blocking Vercel (`5aefb9a`), grid layout (`be9ad1a`).

---

## Styling

Tailwind with custom theme tokens (`text-fg-0`, `border-line`, etc.). Lucide icons.

---

## Future work

1. Implement `RealAdapter` HTTP methods mapping to Flask or decomposed services
2. Single `VITE_API_BASE_URL` option for monolithic backend
3. Wire TraceExplorer to `/api/trace/{id}` or Flask replay
4. WebSocket via `VITE_TELEMETRY_WS`
5. Add `.env.example` to repo
