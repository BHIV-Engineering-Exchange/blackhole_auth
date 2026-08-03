# Ownership Transfer — AI-CRM

**Generated:** 2026-07-05  
**Repository:** https://github.com/blackholeinfiverse64/ai-crm.git

---

## 1. Repository Access

| Item | Status |
|------|--------|
| GitHub admin access | TODO: Verify |
| Branch protection on main | TODO: Verify |
| Collaborator list reviewed | TODO: Verify |

**Note:** Consider restructuring repo so app is at root before transfer.

---

## 2. Cloud Infrastructure

### Render (Backend)

| Item | Value | Status |
|------|-------|--------|
| URL | https://blackholeworkflow.onrender.com | TODO: Verify |
| Admin access | | TODO: Verify |
| Env vars documented | Handover/05_Environment_Guide.md | |

### Vercel (Frontend)

| Item | Value | Status |
|------|-------|--------|
| URL | https://blackhole-workflow.vercel.app | TODO: Verify |
| VITE_API_URL set correctly | | TODO: Critical |
| Admin access | | TODO: Verify |

### MongoDB Atlas

| Item | Status |
|------|--------|
| Project access transferred | TODO: Verify |
| Connection string rotated | TODO: Verify |
| Backup schedule | TODO: Verify |

### Cloudinary

| Item | Status |
|------|--------|
| Account access transferred | TODO: Verify |
| API keys rotated | TODO: Verify |

---

## 3. Secrets to Rotate

| Secret | Location | Status |
|--------|----------|--------|
| `JWT_SECRET` | Render env | TODO |
| `MONGODB_URI` | Render env | TODO |
| `CLOUDINARY_*` | Render env | TODO |
| `EMAIL_USER/PASSWORD` | Render env | TODO |
| `GEMINI_API_KEY` | Render env | TODO |
| `GROQ_API_KEY` | Render env | TODO |
| `VAPID_*` | Render env | TODO |

**Critical:** Implement bcrypt before rotating passwords in DB.

---

## 4. Third-Party Accounts

| Service | Transferred |
|---------|-------------|
| MongoDB Atlas | TODO: Verify |
| Render | TODO: Verify |
| Vercel | TODO: Verify |
| Cloudinary | TODO: Verify |
| Groq | TODO: Verify |
| Google Cloud (Gemini) | TODO: Verify |
| Email provider | TODO: Verify |

---

## 5. Documentation Handover

| Document | Location |
|----------|----------|
| Exit handover (18 files) | `Handover/` |
| Main README | `Downloads/workflow-blackhole-main/README.md` |
| Deployment fix | `DEPLOYMENT_FIX_GUIDE.md` |
| Handover sheet | `server/Complete-Infiverse-main/HANDOVER_SHEET.md` |
| Server deployment | `server/DEPLOYMENT.md` |

---

## 6. Pre-Transfer Security Actions

- [ ] Implement bcrypt password hashing
- [ ] Rotate JWT_SECRET
- [ ] Fix production VITE_API_URL
- [ ] Add auth to monitoring endpoints
- [ ] Remove or secure public password/user endpoints
- [ ] Rotate all third-party API keys

---

## 7. Final Verification

- [ ] All handover docs reviewed
- [ ] Production ping returns 200
- [ ] Login works on production
- [ ] Outgoing access revoked
- [ ] Testing checklist completed
- [ ] Pending work acknowledged

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing Tech Lead | | | |
| Incoming Tech Lead | | | |
| Product Owner | | | |

---

## Post-Transfer Support

| Item | Details |
|------|---------|
| Support period | TODO: Verify |
| Support contact | TODO: Verify |
| Known issues | Handover/10_Known_Issues.md |
