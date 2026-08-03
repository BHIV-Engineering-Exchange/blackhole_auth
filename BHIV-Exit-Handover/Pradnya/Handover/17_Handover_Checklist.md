# Handover Checklist — Pradnya / NICAI

Use when transferring ownership of the Pradnya repository and NICAI product.

---

## Documentation

- [ ] Incoming owner read `Handover/01_README.md`
- [ ] Architecture and deterministic pipeline understood
- [ ] Local stack runs (`05_Environment_Setup.md`)
- [ ] Deployment topology understood (Render + Vercel)
- [ ] Known issues reviewed (`12_Known_Issues_And_TODOs.md`)
- [ ] Naming: Pradnya (repo) vs NICAI (product)

---

## Access and accounts

- [ ] GitHub repo access — https://github.com/blackholeinfiverse64/Pradnya.git
- [ ] Render — `pradnya-api` service admin
- [ ] Vercel — Pradnya project admin
- [ ] **TODO: Verify** Samachar/Mitra API access
- [ ] **TODO: Verify** SVACS service access

---

## Technical verification (local)

- [ ] `pip install -r requirements.txt` succeeds
- [ ] `uvicorn main:app --port 8000` starts
- [ ] `GET /health` → 200
- [ ] `GET /signals` → SUCCESS with signals
- [ ] `logs/` files append on requests
- [ ] Frontend `VITE_NICAI_API=http://127.0.0.1:8000` → live data in UI
- [ ] Built-in HTML dashboard at `/dashboard` works

---

## Technical verification (production)

- [ ] Render backend URL documented
- [ ] Vercel `VITE_NICAI_API` matches Render URL
- [ ] https://pradnya-bhiv.vercel.app loads
- [ ] Browser network shows live API calls (not mock-only)
- [ ] CORS — no cross-origin errors
- [ ] `ALLOWED_ORIGINS` on Render includes Vercel domain

---

## Security acknowledgment

- [ ] No authentication on API — acknowledged
- [ ] Actions are simulation-only (TANTRA) — acknowledged
- [ ] Log persistence on Render — **TODO: Verify**

---

## Integration acknowledgment

- [ ] SVACS scripts separate from main API — understood
- [ ] Samachar/Mitra optional — may be offline
- [ ] Two Sanskar engines — weather vs acoustic

---

## Assets (optional)

- [ ] `Handover/Screenshots/` populated
- [ ] `Handover/Videos/` walkthrough recorded
- [ ] `review_packets/` for stakeholder sign-off

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing owner | Nikhil Pawar | | |
| Incoming owner | | | |
| Product owner | **TODO: Verify** | | |

---

## Post-handover first actions (recommended)

1. Confirm Render URL; update Vercel env + redeploy
2. Align README REJECT vs FLAG documentation
3. Wire actions tab to POST `/action`
4. Add `requests` to requirements if using live_integration
5. Pin Python version on Render
