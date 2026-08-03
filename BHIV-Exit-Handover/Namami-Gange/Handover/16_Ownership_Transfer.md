# Ownership Transfer — Namami-Gange

**Generated:** 2026-07-06

---

## Transfer Checklist

### Source Code

- [ ] GitHub repo: `blackholeinfiverse64/Namami-Gange`
- [ ] Receiving team has admin access

### Render (Backend API)

- [ ] Service `namami-gange-api` transferred
- [ ] Env var `FRONTEND_URL` documented and updated if domain changes
- [ ] Health check `/health` confirmed

### Vercel (Frontend)

- [ ] Project transferred (root directory: `frontend`)
- [ ] `NEXT_PUBLIC_API_URL` set to Render backend URL
- [ ] Custom domain configured — TODO: Verify if any

### External Infrastructure

- [ ] ng-postgres-events — TODO: Verify ownership
- [ ] ng-redis-dedup — TODO: Verify ownership
- [ ] ng-core service — TODO: Verify ownership

---

## Credentials Inventory

| Item | Location | Rotate? |
|------|----------|---------|
| Render dashboard access | Render | Transfer account |
| Vercel dashboard access | Vercel | Transfer account |
| GitHub repo access | GitHub | Transfer team |
| Postgres credentials | External infra | Yes — if used |
| Redis credentials | External infra | Yes — if used |

No API keys in current stack (no auth).

---

## Documentation Handover

| Deliverable | Location | Status |
|-------------|----------|--------|
| Handover/ 18-doc package | `Handover/` | ✅ Created |
| API contract | `backend/docs/API_CONTRACT.md` | ✅ |
| Deployment guide | `DEPLOYMENT_GUIDE.md` | ✅ |
| Data inventory | `backend/ng_data_inventory.csv` | ✅ |
| Review packet | `REVIEW_PACKET.md` | ✅ |
| Screenshots | `Handover/Screenshots/` | TODO |
| Test evidence | TODO | Run test suite |

---

## Post-Transfer Actions

1. Verify production URLs end-to-end
2. Add `.env.example` files
3. Run full backend test suite and archive output
4. Clarify external infra status
5. Plan UI wiring for remaining endpoints
6. Run `14_Testing_Checklist.md`

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Outgoing owner | | |
| Incoming owner | | |
| Technical reviewer | | |
