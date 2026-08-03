# Environment Setup — Pradnya / NICAI

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| Python | 3.10+ recommended |
| pip | Package installer |
| Node.js | 18+ for frontend |
| npm | Bundled with Node |
| Git | Clone from https://github.com/blackholeinfiverse64/Pradnya.git |

No database server required.

---

## Step 1 — Clone

```bash
git clone https://github.com/blackholeinfiverse64/Pradnya.git
cd Pradnya
```

---

## Step 2 — Backend

```bash
pip install -r requirements.txt
```

Ensure data files exist:
- `data/clean_weather.csv`
- `data/clean_aqi.csv`
- `datasets.json`

Start API:

```bash
uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Verify:

```bash
curl http://127.0.0.1:8000/health
# {"status":"ok","service":"nicai"}

curl http://127.0.0.1:8000/signals
# {"status":"SUCCESS","signals":[...],"summary":{...},"pattern":{...}}
```

Built-in HTML dashboard: http://127.0.0.1:8000/dashboard

---

## Step 3 — Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local` from example:

```bash
cp .env.example .env.local
```

Set:

```env
VITE_NICAI_API=http://127.0.0.1:8000
VITE_SAMACHAR_API=
VITE_MITRA_API=
```

Run:

```bash
npm run dev
```

Open http://localhost:5173 — if API is reachable, overview stats show "Live from NICAI API".

---

## Step 4 — Full demo script (optional)

```bash
cd Pradnya
python run_demo_full.py
```

Runs CSV load → console analysis → launches `uvicorn main:app --reload`.

**Note:** Demo script uses simplified inline validation (not full `validate_signal()`); prefer direct uvicorn + `/signals` for accurate API behavior.

---

## Step 5 — SVACS pipeline (optional, local)

Requires SVACS perception server at `http://localhost:8000/perception_log` (port conflict with NICAI if both use 8000 — **run one at a time**).

```bash
python live_integration.py
# OR
python pipeline.py  # with event payload in code
```

---

## Manual tests

```bash
python test_validation.py
python test_pipeline.py
python test_svacs_flow.py
```

No pytest runner configured — scripts print results to stdout.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| "Dataset not loaded" | Missing CSV files | Verify `data/` paths |
| React shows demo mock data | `VITE_NICAI_API` unset or CORS | Set env; check backend CORS includes frontend origin |
| Empty signals | All validations rejected | Check `datasets.json` IDs match signals (`DS_WEATHER`, `DS_AQI`) |
| CORS error from Vercel | Backend `ALLOWED_ORIGINS` | Add Vercel URL to env on Render |
| Port 8000 in use | Another service | Change port: `uvicorn main:app --port 8001` and update `VITE_NICAI_API` |

---

## IDE notes

- Backend: Python at repo root (no package subfolder)
- Frontend: Vite project in `frontend/`
- Logs append to `logs/` — safe to delete for clean demo

**TODO: Verify** — team Python version pin for Render (render.yaml does not specify Python version).
