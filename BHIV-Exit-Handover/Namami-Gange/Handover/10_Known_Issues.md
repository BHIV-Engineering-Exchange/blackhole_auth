# Known Issues — Namami-Gange

**Generated:** 2026-07-06  
**Sources:** `ng_data_inventory.csv`, `REVIEW_PACKET.md`, code review

---

## Critical

### 1. External persistence infra broken/missing

From `ng_data_inventory.csv`:

| ID | System | Issue |
|----|--------|-------|
| NG-INV-013 | ng-core | PersistenceStore class missing — restart loop |
| NG-INV-011 | ng-redis-dedup | No volume mounts — data lost on restart |
| NG-INV-012 | ng-postgres-events | ng_user connection string issues |

**Not in repo** — TODO: Verify if deployed separately.

---

### 2. Environmental overlay data unclear

NG-INV-006–008: Wetland, flood zone, environmental clearance sources marked PARTIAL/UNKNOWN. Hard constraints depend on entity properties (`in_wetland`, etc.) set in hardcoded demo data.

---

## High

### 3. No live data feeds

NG-INV-009/010: Real-time CPCB and CWC APIs not integrated. System uses static CSV only.

---

### 4. Partial frontend-backend integration

**Wired:** `GET /results?model=inland_port` only.

**Static demo content (per REVIEW_PACKET.md):**

- Collaboration
- Governance View
- Infrastructure View
- Dataset Management
- Realtime Signals

Scenario Simulation uses **client-side math**, not `POST /simulate`.

---

### 5. No authentication

Open REST API with CORS-only protection. Not suitable for production without auth layer.

---

### 6. Missing `.env.example`

DEPLOYMENT_GUIDE references `cp .env.example .env.local` but file may not exist in repo.

---

### 7. Hardcoded demo entities

`api.py` falls back to 6 hardcoded locations when `data_raw/locations.json` missing. Production should use data adapter pipeline.

---

## Medium

### 8. Replay/federation UI is simulated

Federation topology, replay console, correlation IDs in `page.tsx` are **React state animations** — not backed by ng-core or Postgres.

---

### 9. TTG data mocked

Per `DEMO_REVIEW_PACKET.md` and review packets — TTG dataset mocked.

---

### 10. No multi-user / WebSocket

Documented limitations: no concurrency, no real-time WebSocket sync.

---

### 11. Test runner non-standard

13 test scripts use custom PASS/FAIL runners — no pytest.ini or CI integration. Claim of 283 passing tests — TODO: Verify.

---

### 12. Version mismatch in API docs

`api.py` index returns version `2.0.0`; `API_CONTRACT.md` says v2.1.0.

---

## Low

### 13. Static HTML prototype still in repo

`frontend/Namami Gange.html` — may confuse developers vs Next.js app.

---

### 14. Unused Next.js routing potential

Single `page.tsx` with tab state — no deep links to views.

---

### 15. Root README encoding

Root `README.md` may have encoding issues in some editors (reported as binary in tool read).

---

## Verified Working (Reference)

From `REVIEW_PACKET.md`:

| Check | Status |
|-------|--------|
| `GET /results?model=inland_port` | HTTP 200 |
| Frontend startup + navigation | OK |
| CORS | OK |
| Suitability scores in UI | OK |
| Determinism | Guaranteed (`ml_used: false`) |
| Integration status | COMPLETE (for `/results` path only) |

---

## Issue Priority Matrix

| Priority | Count | Action |
|----------|-------|--------|
| Critical | 2 | Clarify infra + overlay data |
| High | 5 | Before production use |
| Medium | 5 | Next release |
| Low | 3 | Backlog |
