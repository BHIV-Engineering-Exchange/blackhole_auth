# Handover Checklist — PARIKSHAN / NIYANTRAN V1

Use this checklist when transferring ownership of the PARIKSHAN repository and NIYANTRAN V1 product.

---

## Documentation

- [ ] Incoming owner has read `Handover/01_README.md`
- [ ] Architecture understood (`02_Project_Overview.md`)
- [ ] Local environment runs successfully (`05_Environment_Setup.md`)
- [ ] Port mismatch workaround documented and applied (`VITE_API_BASE_URL`)
- [ ] Known issues reviewed (`12_Known_Issues_And_TODOs.md`)

---

## Access and accounts

- [ ] GitHub repo access granted — https://github.com/blackholeinfiverse64/PARIKSHAN.git
- [ ] MongoDB access (local or Atlas) — **TODO: Verify** production
- [ ] Backend hosting platform access — **TODO: Verify**
- [ ] Frontend hosting platform access — **TODO: Verify**
- [ ] DNS/domain access — **TODO: Verify**

---

## Technical verification

- [ ] MongoDB running; database `bhiv-niyantran` accessible
- [ ] Backend starts: `cd backend && npm run dev`
- [ ] `GET /health` returns 200
- [ ] `GET /niyantran/overview` returns seeded entities
- [ ] Frontend starts with correct env var
- [ ] Dashboard loads at http://localhost:5173
- [ ] Socket.IO updates observed (~5s interval)
- [ ] POST `/niyantran/action` succeeds from UI or curl
- [ ] Placeholder tabs identified (5 tabs — not production-ready)

---

## Security acknowledgment

- [ ] Incoming owner aware: **no authentication**
- [ ] Incoming owner aware: **open CORS**
- [ ] Plan documented before any public production exposure
- [ ] No secrets committed in repo (verify no `.env` in git)

---

## Deployment

- [ ] Production URLs documented — **TODO: Verify**
- [ ] `VITE_API_BASE_URL` set correctly at frontend build time
- [ ] WebSocket supported on production host
- [ ] MongoDB backup strategy confirmed — **TODO: Verify**

---

## Knowledge transfer

- [ ] Naming explained: PARIKSHAN (repo) vs NIYANTRAN (product) vs bhiv-niyantran (DB)
- [ ] Relationship to Sampada (Infiverse-HR) clarified
- [ ] Mock vs real Pravah telemetry explained
- [ ] Hardcoded dashboard data locations pointed out (`Dashboard.tsx`)

---

## Assets (optional folders)

- [ ] `Handover/Screenshots/` populated with dashboard captures
- [ ] `Handover/Videos/` populated with walkthrough recording
- [ ] `Handover/review_packets/` filled for stakeholder sign-off
- [ ] `Handover/code_packets/` filled for code review archive

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing owner | Nikhil Pawar | | |
| Incoming owner | | | |
| Product owner | **TODO: Verify** | | |
| Engineering lead | **TODO: Verify** | | |

---

## Post-handover first actions (recommended)

1. Fix frontend default API port to match backend (4000)
2. Add `.env.example` for backend and frontend
3. Expand root `README.md` with link to `Handover/`
4. Confirm or create production deployment
5. Add smoke test script for CI
