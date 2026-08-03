# Environment Setup — SVACS-Main

## Prerequisites

| Requirement | Notes |
|-------------|-------|
| Python 3.11.9 | Matches `render.yaml` |
| Node.js 18+ | For React dashboard |
| npm | Frontend build |
| Git | Clone repo |

---

## Step 1 — Clone

```bash
git clone https://github.com/blackholeinfiverse64/SVACS-Main.git
cd SVACS-Main
```

---

## Step 2 — Python environment

```bash
python -m venv .venv
.venv\Scripts\activate    # Windows
# source .venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

---

## Step 3 — Flask dashboard API (Render-aligned)

```bash
python dashboard/app.py
```

Runs on http://0.0.0.0:5000

Verify:

```bash
curl http://127.0.0.1:5000/health
curl http://127.0.0.1:5000/api/dashboard
curl http://127.0.0.1:5000/api/telemetry
```

**Note:** API returns data from `storage/` files. If empty, run pipeline first (Step 5).

---

## Step 4 — React dashboard

```bash
npm install
```

Create `.env.local` at repo root:

```env
# Mock mode (default if omitted) — set false for "real" adapter (still stub)
VITE_USE_MOCK=true

# Optional microservice URLs (for future RealAdapter)
VITE_SIGNAL_API=http://127.0.0.1:5000
VITE_PERCEPTION_API=http://127.0.0.1:5000
VITE_INTELLIGENCE_API=http://127.0.0.1:5000
VITE_STATE_API=http://127.0.0.1:5000
VITE_BUCKET_API=https://bhiv-bucket.onrender.com
VITE_POLL_INTERVAL_MS=4000
```

```bash
npm run dev
```

Open http://localhost:5173

Settings page shows active configuration.

---

## Step 5 — Generate runtime storage data

```bash
# Full orchestration pipeline (writes storage/*)
python -m orchestration.live_pipeline
# OR run test driver:
python tests/test_pipeline.py

# Root operational chain (bucket upload, runtime proofs)
python full_operational_chain.py

# Component scripts (per README)
python external_grounding/janes_ingestion_pipeline.py
python sensor_fusion/sensor_fusion_engine.py
python vessel_intelligence_engine.py
```

Re-hit Flask `/api/dashboard` after generation.

---

## Step 6 — FastAPI (optional, not Render default)

```bash
uvicorn main:app --reload --port 8000
```

```bash
curl http://127.0.0.1:8000/health
curl http://127.0.0.1:8000/api/runtime
curl http://127.0.0.1:8000/api/dashboard
```

---

## Step 7 — Tests

```bash
pytest tests/
python tests/test_pipeline.py
python tests/federated_replay_validation.py
```

---

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| Empty Flask API arrays | No storage files | Run pipeline scripts |
| UI always mock data | `VITE_USE_MOCK` unset/true | Expected; RealAdapter not implemented |
| CORS from Vercel | `ALLOWED_ORIGINS` localhost only | Add Vercel URL on Render |
| TS build fails | Type errors | `npm run typecheck` — recent commits fixed Vercel build |
| Two backends confusion | Flask vs FastAPI | Render uses Flask only |

---

## Windows notes

Use `.venv\Scripts\activate`. Paths in Python use forward slashes internally.

**TODO: Verify** — team standard for which backend port frontend should target when RealAdapter is implemented.
