# Tech Stack — SVACS-Main

## Summary

| Area | Technology |
|------|------------|
| Backend (Render) | Python 3.11.9, Flask, gunicorn |
| Backend (alternate) | FastAPI, uvicorn |
| Data | pandas, numpy; JSON/JSONL files |
| Frontend | React 18, TypeScript 5, Vite 5 |
| Routing | React Router 6 |
| State / data fetching | TanStack React Query 5, Zustand 4 |
| HTTP client | Axios |
| Charts | Recharts 2 |
| Styling | Tailwind CSS 3 |
| Validation (FE) | Zod 3 |
| Testing | pytest (listed in requirements) |
| Deploy | Render (API), Vercel (UI) |

---

## Python (`requirements.txt`)

| Package | Purpose |
|---------|---------|
| flask, flask-cors | Dashboard API (Render) |
| gunicorn | Production WSGI server |
| fastapi, uvicorn | Alternate API (`main.py`) |
| pandas, numpy | Data processing |
| requests | External bucket calls |
| pytest | Tests |
| pydantic, python-dotenv | Config/validation |

---

## Node (`package.json`)

| Package | Purpose |
|---------|---------|
| react 18 | UI |
| vite 5 | Build |
| @tanstack/react-query | Polling queries |
| axios | API clients (configured, adapter mostly mock) |
| recharts | Charts |
| lucide-react | Icons |
| tailwindcss | Styling |

**Scripts:**
- `npm run dev` — Vite :5173
- `npm run build` — `tsc -b && vite build`
- `npm run typecheck` — TypeScript check
- `npm run lint` — ESLint

---

## Environment variables (frontend)

From `src/env.ts` — create `.env.local`:

| Variable | Default behavior |
|----------|------------------|
| `VITE_USE_MOCK` | If unset → **mock enabled** |
| `VITE_SIGNAL_API` | Signal service base URL |
| `VITE_PERCEPTION_API` | Perception service |
| `VITE_INTELLIGENCE_API` | Intelligence service |
| `VITE_STATE_API` | State service |
| `VITE_BUCKET_API` | Bucket service |
| `VITE_TELEMETRY_WS` | WebSocket URL |
| `VITE_POLL_INTERVAL_MS` | Default 2000 |

No `.env.example` in repo — document in handover.

---

## Backend environment (Render)

From `render.yaml`:

| Variable | Value |
|----------|-------|
| `PYTHON_VERSION` | 3.11.9 |
| `FLASK_ENV` | production |
| `ALLOWED_ORIGINS` | localhost:5173 only (update for Vercel) |

---

## Ports

| Service | Port |
|---------|------|
| Flask `dashboard/app.py` | 5000 (local `__main__`) |
| FastAPI `main.py` | 8000 (typical uvicorn) |
| Vite dev | 5173 |

---

## External services

| URL | Usage |
|-----|-------|
| `https://bhiv-bucket.onrender.com` | Bucket artifact upload in `full_operational_chain.py` |

**TODO: Verify** — bucket service ownership and API contract.
