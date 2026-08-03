# Frontend Guide — PARIKSHAN / NIYANTRAN V1

## Overview

Single-page application built with **React 19**, **Vite 8**, **TypeScript**, and **Tailwind CSS 4**. There is **no React Router** — navigation is internal tab state inside `Dashboard.tsx`.

**Product title in UI:** NIYANTRAN V1 — Master Control Dashboard

---

## Entry and bootstrap

```
main.tsx → App.tsx → NiyantranProvider → AppContent → Dashboard
```

`AppContent`:
1. Calls `useRealtimeNiyantran()` — connects Socket.IO, subscribes to updates
2. `useEffect` → `hydrate()` — fetches `GET /niyantran/overview`

---

## State management

**File:** `frontend/src/context/NiyantranContext.tsx`

| State field | Source |
|-------------|--------|
| `projects`, `teams`, `individuals` | Overview API + realtime merge |
| `alerts` | Overview API + realtime merge |
| `blockers` | Derived: entities with non-empty `blockers` |
| `loading` | True during `hydrate()` |

**Key methods:**
- `hydrate()` — full refresh from REST
- `mergeRealtimeUpdate({ entity, alerts })` — upsert entity by type; refresh blockers
- `triggerAction(payload)` — POST action then merge response

**Gap:** Failed `hydrate()` sets `loading: false` but leaves empty arrays — no error banner.

---

## API layer

**File:** `frontend/src/services/api.ts`

- Base URL: `import.meta.env.VITE_API_BASE_URL || "http://localhost:4001"`
- `getOverview()` → `GET /niyantran/overview`
- `postAction(payload)` → `POST /niyantran/action`

Types: `Entity`, `AlertItem`, `OverviewResponse`, `ActionPayload`

---

## Realtime

**File:** `frontend/src/services/socket.ts`

```typescript
io(VITE_API_BASE_URL || "http://localhost:4001", {
  transports: ["websocket"],
  autoConnect: false,
});
```

**File:** `frontend/src/hooks/useRealtimeNiyantran.ts`

- Connects on mount, disconnects on unmount
- Listens: `niyantran:update` → `mergeRealtimeUpdate`
- **TODO: Verify** — handling of `niyantran:error` and reconnect logic

---

## Dashboard tabs

Navigation defined in `Dashboard.tsx` (tab state, not routes).

### API-backed / live sections

| Tab | Data source |
|-----|-------------|
| Overview | Context + charts (partial hardcoded) |
| Products | Context `projects` |
| Tasks | Mix — `RECENT_TASKS` hardcoded + context |
| Testing (Tiwari) | Hardcoded + context individuals |
| Candidates | Hardcoded `CANDIDATES` array |
| Teams | Context `teams` |
| Workflow Manager | Context entities |
| Risks & Blockers | Context `blockers` and `alerts` |

### Placeholder sections (`InfoPage`)

| Tab | Status |
|-----|--------|
| Repository Review | Static placeholder text |
| Handover & Assets | Static placeholder text |
| Insights & Analytics | Static placeholder text |
| Niyantran Logs | Static placeholder text |
| Settings | Static placeholder text |

---

## Hardcoded demo data

**File:** `Dashboard.tsx` — constants such as:

- `LINE_SERIES` — chart series
- `RECENT_TASKS` — task list samples
- `CANDIDATES` — candidate cards

These display even when API is empty, which can mask connection failures during demos.

---

## Styling

- Tailwind 4 via `index.css` and component classes
- Dark dashboard aesthetic (verify in running app)

---

## Build output

```bash
npm run build   # → frontend/dist/
```

Committed `dist/` in repo — rebuild before release with correct `VITE_API_BASE_URL`.

---

## Local development checklist

1. Backend on port **4000**
2. `VITE_API_BASE_URL=http://localhost:4000`
3. `npm run dev` → http://localhost:5173
4. Confirm Network: overview 200, WebSocket connected

---

## Future frontend work (not in repo)

- React Router for deep links per tab
- Replace hardcoded arrays with API endpoints
- Error boundaries and toast notifications for failed hydrate
- Auth gate and role-based tab visibility
- Implement placeholder tabs (logs, analytics, settings)
