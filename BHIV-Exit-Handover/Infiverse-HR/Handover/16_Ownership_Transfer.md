# Ownership Transfer — Infiverse-HR

**Generated:** 2026-07-06

---

## Transfer Checklist

### Source Code

- [ ] GitHub repo access: `blackholeinfiverse64/Infiverse-HR`
- [ ] Receiving team has admin/maintain role
- [ ] Open PRs reviewed/merged/closed

### Frontend — Vercel

- [ ] Vercel project ownership transferred
- [ ] Root directory set to `frontend`
- [ ] Custom domain `sampada.blackholeinfiverse.com` DNS transferred
- [ ] All `VITE_*` env vars documented and rotated

### Backend — Render (3 services)

- [ ] Gateway service transferred
- [ ] Agent service transferred
- [ ] LangGraph service transferred
- [ ] All backend env vars rotated on each service
- [ ] Health checks configured on `/health`

### Database — MongoDB Atlas

- [ ] Atlas project/org ownership transferred
- [ ] Connection string rotated
- [ ] Database user password rotated
- [ ] Network access rules updated for new team
- [ ] Backup policy confirmed

### Integrations

- [ ] Twilio account (WhatsApp)
- [ ] Gmail app password / SMTP
- [ ] Telegram bot
- [ ] Gemini API key
- [ ] HuggingFace token
- [ ] Complete-Infiverse / EMS workflow credentials

---

## Credentials Inventory

| Credential | Location | Rotate? |
|------------|----------|---------|
| MONGODB_URI | Render ×3, local `.env` | Yes |
| API_KEY_SECRET | Render gateway, Vercel VITE_API_KEY | Yes |
| JWT_SECRET_KEY | Render gateway | Yes |
| CANDIDATE_JWT_SECRET_KEY | Render gateway | Yes |
| GATEWAY_SECRET_KEY | Render gateway | Yes |
| TWILIO_* | Render langgraph/gateway | Yes |
| GMAIL_* | Render langgraph | Yes |
| TELEGRAM_* | Render langgraph | Yes |
| GEMINI_API_KEY | Render langgraph | Yes |
| HF_TOKEN | Render agent | Yes |
| WORKFLOW_BRIDGE_* | Render gateway | Yes |

---

## Access Roles

| Person/Team | GitHub | Atlas | Render | Vercel |
|-------------|--------|-------|--------|--------|
| Outgoing lead | | | | |
| Incoming lead | | | | |
| Dev team | | | | |
| QA | Read | Read | Read | Read |

---

## Documentation Handover

| Deliverable | Location | Status |
|-------------|----------|--------|
| SAMPADA_CURRENT_STATE.md | repo root | ✅ Existing |
| REVIEW_PACKET.md | repo root | ✅ Existing |
| evidence/ folder | repo root | ✅ Extensive |
| Handover/ 18-doc package | Handover/ | ✅ Created |
| Screenshots | Handover/Screenshots/ | TODO |
| Demo video | Handover/Videos/ | TODO |

---

## Post-Transfer Actions

1. Rotate all secrets (see inventory)
2. Verify canonical Render URLs; update Vercel env vars
3. Run `14_Testing_Checklist.md` on production
4. Run `docs/CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md`
5. Confirm CORS_ORIGINS includes new domains if changed
6. Invalidate all existing JWTs (users re-login)
7. Review demo accounts in production DB — disable or rotate

---

## Support Period

| Item | Detail |
|------|--------|
| Outgoing contact | TODO: Verify (Shashank — docs; Nikhil — frontend) |
| System owner | Rishabh Yadav |
| Support window | TODO: Verify agreed period |
| Escalation | TODO: Verify channel |

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Outgoing owner | | |
| Incoming owner | | |
| System Owner (Rishabh Yadav) | | |
| Technical reviewer | | |
