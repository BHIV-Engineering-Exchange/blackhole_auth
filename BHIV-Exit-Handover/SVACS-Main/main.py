from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from runtime.full_operational_chain import process_runtime_chain
from runtime.runtime_normalizer import normalize_runtime

from replay.replay_engine import replay_runtime
from ttg.ttg_adapter import generate_ttg_event
from rl.episode_runner import run_episode

app = FastAPI(
    title="SVACS Runtime API",
    version="1.0.0"
)

# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================================================
# ROOT
# =========================================================

@app.get("/")
def root():

    return {
        "system": "SVACS",
        "status": "ACTIVE",
        "runtime": "LIVE"
    }

# =========================================================
# HEALTH
# =========================================================

@app.get("/health")
def health():

    return {
        "status": "healthy",
        "system": "SVACS Runtime",
        "services": {
            "runtime_chain": "ACTIVE",
            "replay_engine": "ACTIVE",
            "ttg": "ACTIVE",
            "rl_engine": "ACTIVE"
        }
    }

# =========================================================
# MAIN RUNTIME
# =========================================================

@app.get("/api/runtime")
def runtime():

    try:

        raw_data = process_runtime_chain()

        if not isinstance(raw_data, list):
            raw_data = []

        normalized = normalize_runtime(raw_data)

        return normalized

    except Exception as e:

        print("RUNTIME ERROR:", e)

        return []

# =========================================================
# DASHBOARD
# =========================================================

@app.get("/api/dashboard")
def dashboard():

    try:

        raw_data = process_runtime_chain()

        if not isinstance(raw_data, list):
            raw_data = []

        runtime_data = normalize_runtime(raw_data)

        alerts = []
        vessels = []

        for item in runtime_data:

            # -------------------------
            # ALERTS
            # -------------------------

            if item.get("risk") != "LOW":

                alerts.append({
                    "trace_id": item.get("trace_id"),
                    "vessel_id": item.get("vessel_id"),
                    "risk": item.get("risk"),
                    "validation": item.get("validation"),
                    "confidence": item.get("confidence")
                })

            # -------------------------
            # VESSELS
            # -------------------------

            vessels.append({
                "trace_id": item.get("trace_id"),
                "vessel_id": item.get("vessel_id"),
                "lat": item.get("lat"),
                "lon": item.get("lon"),
                "speed": item.get("speed"),
                "vessel_class": item.get("vessel_class")
            })

        return {
            "alerts": alerts,
            "vessels": vessels,
            "runtime_count": len(runtime_data),
            "status": "ACTIVE"
        }

    except Exception as e:

        print("DASHBOARD ERROR:", e)

        return {
            "alerts": [],
            "vessels": [],
            "runtime_count": 0,
            "status": "FAILED"
        }

# =========================================================
# REPLAY
# =========================================================

@app.get("/api/replay")
def replay():

    try:

        replay_data = replay_runtime()

        return {
            "status": "ACTIVE",
            "replay": replay_data
        }

    except Exception as e:

        print("REPLAY ERROR:", e)

        return {
            "status": "FAILED",
            "replay": []
        }

# =========================================================
# TTG
# =========================================================

@app.get("/api/ttg")
def ttg():

    try:

        ttg_data = generate_ttg_event()

        return {
            "status": "ACTIVE",
            "ttg": ttg_data
        }

    except Exception as e:

        print("TTG ERROR:", e)

        return {
            "status": "FAILED",
            "ttg": {}
        }

# =========================================================
# RL
# =========================================================

@app.get("/api/rl")
def rl():

    try:

        rl_data = run_episode()

        return {
            "status": "ACTIVE",
            "episode": rl_data
        }

    except Exception as e:

        print("RL ERROR:", e)

        return {
            "status": "FAILED",
            "episode": {}
        }

# =========================================================
# TRACE LOOKUP
# =========================================================

@app.get("/api/trace/{trace_id}")
def trace(trace_id: str):

    try:

        raw_data = process_runtime_chain()

        if not isinstance(raw_data, list):
            raw_data = []

        runtime_data = normalize_runtime(raw_data)

        for item in runtime_data:

            if item.get("trace_id") == trace_id:
                return item

        return {
            "status": "NOT_FOUND",
            "trace_id": trace_id
        }

    except Exception as e:

        print("TRACE ERROR:", e)

        return {
            "status": "FAILED",
            "trace_id": trace_id
        }
