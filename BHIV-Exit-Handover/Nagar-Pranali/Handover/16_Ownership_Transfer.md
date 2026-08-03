# Ownership Transfer — Nagar-Pranali

**Generated:** 2026-07-06

---

## Transfer Checklist

### Source Code

- [ ] GitHub repo access: `blackholeinfiverse64/Nagar-Pranali`
- [ ] Receiving team has admin/maintain role

### Render (Backend)

- [ ] Service `uccis-backend` ownership transferred
- [ ] Env vars rotated: `DB_*`, `FRONTEND_URL`
- [ ] Health check path `/health` confirmed

### Vercel (Frontend)

- [ ] Project ownership transferred
- [ ] `VITE_API_URL` set to Render backend URL
- [ ] Custom domain `nagar-pranali.blackholeinfiverse.app` DNS transferred (if used)

### MySQL

- [ ] Database host ownership transferred
- [ ] Credentials rotated
- [ ] Backup policy confirmed
- [ ] Network access rules updated

---

## Credentials Inventory

| Credential | Location | Rotate? |
|------------|----------|---------|
| DB_HOST | Render env | If host changes |
| DB_USER | Render env | Yes |
| DB_PASSWORD | Render env | Yes |
| DB_NAME | Render env | Usually unchanged |
| FRONTEND_URL | Render env | Update if domain changes |
| VITE_API_URL | Vercel env | Update if backend URL changes |

No auth secrets (authentication disabled).

---

## Documentation Handover

| Deliverable | Location | Status |
|-------------|----------|--------|
| Handover/ 18-doc package | `Handover/` | ✅ Created |
| Demo review | `UCCIS -Main/DEMO_REVIEW_PACKET.md` | ✅ Existing |
| Deployment guide | `UCCIS -Main/DEPLOYMENT_GUIDE.md` | ✅ Basic |
| Screenshots | `Handover/Screenshots/` | TODO |
| Demo video | `Handover/Videos/` | TODO |

---

## Post-Transfer Actions

1. Rotate MySQL credentials on Render
2. Verify production URLs and end-to-end demo chain
3. Fix schema mismatches (see `09_Pending_Work.md`)
4. Decide: wire frontend to API or document as static demo UI
5. Run `14_Testing_Checklist.md`
6. Update root `README.md` with product overview

---

## Support Period

| Item | Detail |
|------|--------|
| Outgoing contact | TODO: Verify |
| Support window | TODO: Verify |
| Escalation channel | TODO: Verify |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Outgoing owner | | |
| Incoming owner | | |
| Technical reviewer | | |
