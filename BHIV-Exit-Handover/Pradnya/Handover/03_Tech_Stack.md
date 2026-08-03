# Tech Stack — Pradnya / NICAI

## Summary

| Area | Technology |
|------|------------|
| Backend language | Python 3 |
| Backend framework | FastAPI |
| ASGI server | Uvicorn |
| Data processing | pandas |
| Validation | pydantic (schemas), custom validator |
| Frontend | React 19 |
| Build tool | Vite 6 |
| Styling | Inline CSS in `App.jsx` (no Tailwind) |
| Data storage | CSV files + JSON line logs |
| Deployment (backend) | Render (`render.yaml`) |
| Deployment (frontend) | Vercel (`vercel.json`) |
| Version control | Git (GitHub) |

---

## Backend (`requirements.txt`)

| Package | Purpose |
|---------|---------|
| `fastapi` ≥0.100 | HTTP API |
| `uvicorn[standard]` ≥0.22 | ASGI server |
| `pandas` ≥2.0 | CSV dataset loading |
| `pydantic` ≥2.0 | Schema validation support |

**Optional (scripts only):** `requests` — used in `live_integration.py` (not in requirements.txt — **TODO: Verify** if needed for deploy)

---

## Frontend (`frontend/package.json`)

| Package | Purpose |
|---------|---------|
| `react` / `react-dom` ^19 | UI |
| `vite` ^6.3 | Dev server and build |
| `@vitejs/plugin-react` | React plugin |

No axios — uses native `fetch` in `App.jsx` and `api.js`.

**Scripts:**
- `npm run dev` — Vite (default port 5173)
- `npm run build` → `frontend/dist/`
- `npm run preview`

---

## Environment variables

### Backend

| Variable | Default | Purpose |
|----------|---------|---------|
| `ALLOWED_ORIGINS` | `http://localhost:5173,...,https://pradnya-bhiv.vercel.app` | CORS origins (comma-separated) |
| `PORT` | Injected by Render | Listen port |

### Frontend (`frontend/.env.example`)

| Variable | Example | Purpose |
|----------|---------|---------|
| `VITE_NICAI_API` | `http://127.0.0.1:8000` | NICAI FastAPI base URL (**required for live data**) |
| `VITE_SAMACHAR_API` | (empty) | Samachar text processing service |
| `VITE_MITRA_API` | (empty) | Mitra evaluation service |

---

## Ports

| Service | Port |
|---------|------|
| FastAPI / Uvicorn | 8000 (local default) |
| Vite dev | 5173 |

---

## Deployment configs in repo

| File | Purpose |
|------|---------|
| `render.yaml` | Render web service `pradnya-api` |
| `vercel.json` (root) | Builds `frontend/`, outputs `frontend/dist` |
| `frontend/vercel.json` | SPA rewrites |

---

## Not present

- Docker / docker-compose
- GitHub Actions CI
- SQL/NoSQL database
- Redis / message queue
- Formal pytest suite (manual test scripts exist)
