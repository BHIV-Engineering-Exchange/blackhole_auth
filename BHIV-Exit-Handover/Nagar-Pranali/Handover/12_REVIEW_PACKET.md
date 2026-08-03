# Review Packet — Nagar-Pranali

**Generated:** 2026-07-06  
**Review Time:** < 10 minutes  
**Also see:** `UCCIS -Main/DEMO_REVIEW_PACKET.md`

---

## Entry Points

| File | Purpose |
|------|---------|
| `UCCIS -Main/backend/server.js` | Express app |
| `UCCIS -Main/backend/controllers/operationalController.js` | Demo chain |
| `UCCIS -Main/backend/database/schema.sql` | MySQL schema |
| `UCCIS -Main/frontend/src/App.jsx` | UI (hardcoded data) |
| `render.yaml` | Render deploy |
| `vercel.json` | Vercel deploy |

---

## Production URLs

| Surface | URL | Verify |
|---------|-----|--------|
| Frontend (Vercel) | https://nagar-pranali.vercel.app | ☐ |
| Frontend (custom) | https://nagar-pranali.blackholeinfiverse.app | ☐ |
| Backend (Render) | https://nagar-pranali.onrender.com | ☐ |

---

## Core Flow

```
POST /api/demo/flood (or traffic/medical/power/cyber)
  → signal → telemetry → incident → escalation → decision → replay → runtime_log
  → MySQL uccis database

Frontend dashboard (currently static sampleData — does not auto-update)
```

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] Import `schema.sql` + `seed.sql` locally
- [ ] Start backend: `npm start` in `UCCIS -Main/backend`
- [ ] `curl localhost:5000/health` → 200
- [ ] `curl -X POST localhost:5000/api/demo/flood` → success + IDs
- [ ] `curl localhost:5000/api/latest-signals` → data returned
- [ ] Start frontend: `npm run dev`
- [ ] Open dashboard — UI renders (static data)
- [ ] Review `Handover/10_Known_Issues.md` (schema mismatches + UI disconnect)
- [ ] Skim `DEMO_REVIEW_PACKET.md`

---

## Review Flags

1. **Frontend not wired to API** — UI is demo-static
2. **Schema mismatches** — several GET routes broken on fresh schema
3. **No authentication** — all endpoints public
4. **Health check misleading** — doesn't ping DB
5. **No automated tests**
6. **README API docs outdated**
7. **Production URLs** — TODO: Verify live

---

## What Works vs Doesn't

| Works | Doesn't |
|-------|---------|
| Demo POST chain → MySQL | Live UI updates from DB |
| `/api/latest-*` endpoints | `/api/dashboard` (wrong tables) |
| `/api/signals` list (if schema fixed) | `/api/telemetry` (wrong table) |
| CORS for Vercel domains | Auth / multi-user |
| Dashboard UI rendering | WebSocket sync |

---

## Quick Verification

```bash
curl -X POST https://nagar-pranali.onrender.com/api/demo/flood
curl https://nagar-pranali.onrender.com/api/latest-runtime
```

---

## Handover Completeness

| Area | Status |
|------|--------|
| Handover/ 18-doc package | ✅ Created |
| In-repo demo docs | ✅ Partial |
| Production verification | TODO |
| Screenshots | TODO |
| Automated tests | ❌ None |
