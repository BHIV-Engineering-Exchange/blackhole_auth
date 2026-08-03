# Database Details — Namami-Gange

**Generated:** 2026-07-06

---

## Overview

The deployed API does **not use a SQL/NoSQL database**. Runtime data comes from:

1. **Hardcoded demo entities** in `backend/src/api.py` (6 Ganga Basin locations)
2. **Static CSV files** in `backend/data_raw/`
3. **JSON demo cases** in `backend/demo_cases/`

External persistence (Postgres, Redis, ng-core) is **referenced in inventory docs** but **not configured in this repository**.

---

## CSV Datasets (`backend/data_raw/`)

| File | Source org | Purpose |
|------|------------|---------|
| `cpcb_water_quality_ganga.csv` | CPCB | Water quality factors |
| `cwc_river_stations_ganga.csv` | CWC | River hydrology, depth |
| `iwai_terminals_nw1.csv` | IWAI | Terminal infrastructure (NW-1) |
| `logistics_parks_ganga_belt.csv` | IWAI/Logistics | Logistics parks |
| `urban_centers_ganga_basin.csv` | Census/Urban | Demographics, traffic potential |

**Status:** Static CSV — no live feed integration (NG-INV-009, NG-INV-010).

**Inventory:** `backend/ng_data_inventory.csv` — full metadata and risk ratings.

---

## Location Entity Schema

Used by scoring engine and API:

```json
{
  "location_id": "varanasi_terminal",
  "properties": {
    "river_stability_score": 78,
    "terminal_proximity_score": 85,
    "logistics_access_score": 70,
    "water_quality_index": 60,
    "traffic_potential_score": 75,
    "in_wetland": false,
    "in_flood_zone": false,
    "env_clearance": true,
    "pollution_index": 45,
    "depth_score": 65
  }
}
```

Hub-spoke model adds: `multi_node_proximity`, `logistics_park_quality`, `terminal_density_score`, `connectivity_score`, `urban_market_access`.

**Optional file:** `backend/data_raw/locations.json` — if present, replaces hardcoded fallback.

---

## Constraint Types (Logical)

From constraint engine + inventory:

| Constraint | Type | Effect |
|------------|------|--------|
| `wetland_zone` | HARD | REJECT |
| `flood_zone` | HARD | REJECT |
| `no_env_clearance` | HARD | REJECT |
| `extreme_pollution` | HARD | REJECT (WQI < 20) |
| `critical_depth` | HARD | REJECT (depth < 20) |
| `logistics_absence` | SOFT | Score penalty |

---

## Marine Signal Schema

**File:** `backend/src/marine_schema.py`

Fields include: `event_id`, `geo_coordinates`, `signal_type`, `source_hash`, normalization metadata.

Used by `/marine-signals` and related marine endpoints.

---

## Demo Cases

**Path:** `backend/demo_cases/`

| File | Purpose |
|------|---------|
| `demo_case_1.json` | Simulation test case |
| `demo_case_2.json` | Simulation test case |
| `demo_case_3.json` | Simulation test case |

Used by simulation test suite.

---

## Referenced External Stores (Not in Repo)

From `ng_data_inventory.csv`:

| ID | System | Type | Issue |
|----|--------|------|-------|
| NG-INV-011 | ng-redis-dedup | Redis | No volume — data lost on restart |
| NG-INV-012 | ng-postgres-events | PostgreSQL | Connection string issues |
| NG-INV-013 | ng-core | Service | PersistenceStore missing — restart loop |

**TODO: Verify** whether these run in separate infra repo or were never deployed.

---

## Marine MasterDB Design

**File:** `backend/marine_masterdb_design.md` — bucket-based persistence design (documentation only, not implemented in repo).

---

## Data Quality Summary

| Risk | Count | Examples |
|------|-------|----------|
| CRITICAL | 4 | Wetland/flood overlays unclear, Redis, ng-core |
| HIGH | 5 | Static CSV only, no live CPCB/CWC, Postgres issues |
| MEDIUM | 3 | IWAI CSV static, logistics parks |
| LOW | 1 | Urban centers (stable) |

---

## Backup

No database to backup in current deployed stack. Backup considerations:

- Git repo (code + CSV data)
- Render/Vercel deploy configs
- External Postgres/Redis — TODO: Verify if used elsewhere
