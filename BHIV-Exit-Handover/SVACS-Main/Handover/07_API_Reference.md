# API Reference — SVACS-Main

Two separate HTTP applications exist in this repo. Document both; **Render deploys Flask only**.

---

## Flask Dashboard API (`dashboard/app.py`)

**Local base:** `http://127.0.0.1:5000`  
**Production:** **TODO: Verify** Render URL

CORS: `ALLOWED_ORIGINS` env (comma-separated).

### GET `/`

Renders `dashboard/templates/dashboard.html` (legacy HTML UI).

### GET `/health`

```json
{
  "status": "ONLINE",
  "service": "SVACS_DASHBOARD",
  "dashboard_active": true,
  "telemetry_active": true
}
```

### GET `/api/dashboard`

Returns normalized dashboard payloads from `storage/dashboard/dashboard_payloads.json` (JSON lines).

Fields include: `execution_id`, `trace_id`, `pipeline_stage`, `status`, `token_issued`, `telemetry_active`, `replay_available`, `hash_chain_verified`, `timestamp`.

Status normalization maps `BLOCKED` → `TOKEN_DENIED`, `MUTATION_REJECTED`, etc.

### GET `/api/telemetry`

Telemetry events from `storage/telemetry/telemetry_logs.json`.

### GET `/api/rejections`

Denial records from `storage/denials/denial_logs.json` (excludes "Validation successful").

### GET `/api/metrics`

Aggregated metrics from storage loaders (`load_metrics()`).

### GET `/api/replay/<execution_id>`

Replay data for execution id; 404 if not found.

---

## FastAPI Runtime API (`main.py`)

**Local base:** `http://127.0.0.1:8000` (typical uvicorn)  
**Production:** Not deployed via current `render.yaml`

CORS: `allow_origins=["*"]` (open).

### GET `/`

```json
{ "system": "SVACS", "status": "ACTIVE", "runtime": "LIVE" }
```

### GET `/health`

```json
{
  "status": "healthy",
  "system": "SVACS Runtime",
  "services": {
    "runtime_chain": "ACTIVE",
    "replay_engine": "ACTIVE",
    "ttg": "ACTIVE",
    "rl_engine": "ACTIVE"
  }
}
```

### GET `/api/runtime`

Runs `process_runtime_chain()` → `normalize_runtime()`. Returns list of normalized vessel/runtime objects.

On error: returns `[]`.

### GET `/api/dashboard`

Derived alerts + vessels from runtime chain:

```json
{
  "alerts": [ { "trace_id", "vessel_id", "risk", "validation", "confidence" } ],
  "vessels": [ { "trace_id", "vessel_id", "lat", "lon", "speed", "vessel_class" } ],
  "runtime_count": 0,
  "status": "ACTIVE"
}
```

### GET `/api/replay`

```json
{ "status": "ACTIVE", "replay": { ... } }
```

Uses `replay.replay_engine.replay_runtime()`.

### GET `/api/ttg`

TTG event from `ttg.ttg_adapter.generate_ttg_event()`.

### GET `/api/rl`

RL episode from `rl.episode_runner.run_episode()`.

### GET `/api/trace/{trace_id}`

Lookup single trace in processed runtime list; `{ "status": "NOT_FOUND" }` if missing.

---

## React adapter (intended microservice API)

**File:** `src/api/client.ts` — axios clients for:

| Client | Env var |
|--------|---------|
| signal | `VITE_SIGNAL_API` |
| perception | `VITE_PERCEPTION_API` |
| intelligence | `VITE_INTELLIGENCE_API` |
| state | `VITE_STATE_API` |
| bucket | `VITE_BUCKET_API` |

**Current behavior:** `adapter.ts` exports `MockAdapter` when `env.useMock` is true (default). `RealAdapter` extends `MockAdapter` with **no method overrides** — all fetches still return mock data.

---

## External — BHIV Bucket

| Method | URL |
|--------|-----|
| GET | `https://bhiv-bucket.onrender.com/bucket/latest-hash` |
| POST | `https://bhiv-bucket.onrender.com/bucket/artifact` |

Used by `full_operational_chain.py`.

---

## NICAI / Pradnya integration (separate repo)

Pradnya `live_integration.py` references `http://localhost:8000/perception_log` — **not found in SVACS-Main codebase**. SVACS perception is module-based (`perception/perception_engine.py`), not exposed as that endpoint in current tree.

Pradnya `svacs_adapter.py` converts SVACS-style perception events to NICAI signals offline.

---

## Authentication

None on Flask or FastAPI routes.
