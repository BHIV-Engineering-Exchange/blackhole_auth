# Frontend Guide — Pradnya / NICAI

## Overview

React 19 single-page application built with Vite 6. Primary UI file is **`frontend/src/App.jsx`** (~900 lines) — a full NICAI command dashboard with sidebar navigation, mock data fallbacks, and optional live API integration.

**Entry:** `main.jsx` → `App.jsx` (not `pages/Dashboard.jsx`)

**Production URL:** `https://pradnya-bhiv.vercel.app` (from backend CORS config)

---

## Configuration

**File:** `frontend/.env.example`

```env
VITE_NICAI_API=http://127.0.0.1:8000
VITE_SAMACHAR_API=
VITE_MITRA_API=
```

Copy to `.env.local` for development. **`VITE_NICAI_API` is required** for live NICAI data — `api.js` throws if unset when calling API functions.

---

## API layer

**File:** `frontend/src/services/api.js`

- Base: `import.meta.env.VITE_NICAI_API`
- Native `fetch` (no axios)
- Exports: `getHealth`, `getSignals`, `getPatterns`, `getSignalsWithSummary`, `triggerAction`

---

## Navigation tabs

| Tab key | Label | Data source |
|---------|-------|-------------|
| `overview` | Overview | Live summary + mock charts |
| `signals` | Signals | Live signals + Samachar→Mitra pipeline |
| `anomalies` | Anomalies | Filtered signals |
| `patterns` | Patterns | Live or `MOCK_PATTERNS` |
| `actions` | Actions | **Hardcoded** `ACTIONS` array |
| `logs` | Logs | In-memory client log (not server logs) |
| `health` | System Health | NICAI + Samachar + Mitra ping |
| `settings` | Settings | Editable API URLs (session only until Save) |

---

## Live vs mock behavior

On mount, if `NICAI_API` is set:

1. `getSignalsWithSummary()` + `getPatterns()` in parallel
2. If signals returned → replace `MOCK_SIGNALS`, set `usingLiveData=true`
3. On failure → log "NICAI API unavailable — using demo data", keep mocks

**Hardcoded even when live:**

- `ACTIONS` — recent actions table (not from `/action` logs)
- `TREND` — 7-day anomaly chart
- `DonutChart` — fixed 124 total / percentage split
- Overview stat cards when `liveSummary` null — fake "↑ 18% from yesterday"

---

## Samachar → Mitra pipeline (Signals tab)

1. User enters text or loads maritime/environmental scenario preset
2. POST `{samacharUrl}/api/samachar/process` with `{ text }`
3. POST `{mitraUrl}/api/mitra/evaluate` with `{ event: samacharOutput }`
4. Results shown as JSON in side panels

Requires `VITE_SAMACHAR_API` and `VITE_MITRA_API` (or Settings overrides).

---

## Mapping API → UI

**Functions in App.jsx:**

- `mapApiSignal(signal)` — API entity → table row shape
- `mapApiPattern(pattern)` — API pattern → card shape

---

## Built-in FastAPI dashboard (separate)

http://127.0.0.1:8000/dashboard — server-rendered HTML from `main.py`. Does not share code with React app. Useful when frontend env is misconfigured.

---

## Alternate file: `pages/Dashboard.jsx`

Minimal component listing signals — **not wired in `main.jsx`**. Legacy or unused; do not confuse with primary UI.

---

## Build and deploy

```bash
cd frontend
VITE_NICAI_API=https://YOUR-RENDER-URL npm run build
```

Vercel uses root `vercel.json` to build `frontend/dist`.

---

## Styling

- Inline style objects + large `CSS` template string in `App.jsx`
- Dark theme (`#060b18` background)
- Responsive breakpoints at 1024px, 768px, 480px
- No component library (no MUI/Tailwind)

---

## Future frontend work (not in repo)

- Wire actions tab to server `logs/action_logs.json` or API
- Replace hardcoded charts with `/signals` summary
- Call `triggerAction` from signal detail modals
- Remove or integrate unused `Dashboard.jsx`
- Environment-specific build profiles
