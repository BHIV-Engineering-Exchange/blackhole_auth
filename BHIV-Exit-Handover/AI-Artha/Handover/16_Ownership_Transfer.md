# Ownership Transfer — AI-Artha

**Generated:** 2026-07-05  
**Repository:** https://github.com/blackholeinfiverse64/AI-Artha.git

---

## Transfer Overview

This checklist ensures complete ownership transfer of the AI-Artha (ARTHA v0.1) repository, infrastructure, and operational knowledge.

---

## 1. Source Code & Repository

| Item | From | To | Status |
|------|------|----|--------|
| GitHub repository admin access | | | TODO: Verify |
| GitHub organization membership | | | TODO: Verify |
| Branch protection rules on `main` | | | TODO: Verify |
| CI/CD secrets in GitHub Actions | | | TODO: Verify |
| Collaborator access list reviewed | | | TODO: Verify |

**Repository URL:** https://github.com/blackholeinfiverse64/AI-Artha.git  
**Main branch:** `main`

---

## 2. Cloud Infrastructure

### Render (Backend)

| Item | Details | Status |
|------|---------|--------|
| Service name | `artha-backend` (from `render.yaml`) | TODO: Verify |
| Service URL | https://ai-artha.onrender.com | TODO: Verify |
| Admin access transferred | | TODO: Verify |
| Environment variables documented | See `Handover/05_Environment_Guide.md` | |
| Health check path | `/api/health` | |
| Auto-deploy from `main` | `autoDeploy: true` | |

### Vercel (Frontend)

| Item | Details | Status |
|------|---------|--------|
| Project URL | https://ai-artha.vercel.app | TODO: Verify |
| Admin access transferred | | TODO: Verify |
| `VITE_API_URL` env var set | | TODO: Verify |
| Domain configuration | | TODO: Verify |

### MongoDB Atlas

| Item | Details | Status |
|------|---------|--------|
| Cluster access transferred | | TODO: Verify |
| Connection string rotated | | TODO: Verify |
| Database user credentials rotated | | TODO: Verify |
| Backup schedule configured | | TODO: Verify |
| IP whitelist updated | | TODO: Verify |

### Redis

| Item | Details | Status |
|------|---------|--------|
| Redis instance access transferred | | TODO: Verify |
| Password rotated | | TODO: Verify |

### BHIV Auth Server

| Item | Details | Status |
|------|---------|--------|
| Auth server URL | https://bhiv-auth.onrender.com | TODO: Verify |
| Admin access transferred | | TODO: Verify |
| App ID configured (`APP_ID`) | | TODO: Verify |

---

## 3. Secrets & Credentials

> **Critical:** Rotate all secrets during ownership transfer. Never transfer secrets via documentation.

| Secret | Location | Rotated | Status |
|--------|----------|---------|--------|
| `JWT_SECRET` | Render env / backend/.env.production | | TODO |
| `HMAC_SECRET` | Render env (note: rotation invalidates ledger hashes) | | TODO |
| `MONGODB_URI` | Render env | | TODO |
| `REDIS_PASSWORD` | Docker/Render env | | TODO |
| `SETU_API_KEY` | Render env (if enabled) | | TODO |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Render env (if S3 enabled) | | TODO |
| `INSIGHTCORE_API_KEY` | Render env (if enabled) | | TODO |
| MongoDB Atlas credentials | Atlas dashboard | | TODO |
| GitHub personal access tokens | GitHub settings | | TODO |

**Warning:** Rotating `HMAC_SECRET` invalidates all ledger hash chains. Plan migration or re-seed before rotation.

---

## 4. Application Accounts

| Account | Purpose | Transferred | Status |
|---------|---------|-------------|--------|
| Admin user (application) | Full system access | | TODO: Verify |
| Render service account | Backend deployment | | TODO: Verify |
| Vercel team account | Frontend deployment | | TODO: Verify |
| MongoDB Atlas user | Database access | | TODO: Verify |
| SETU API account | Signal dispatch | | TODO: Verify |
| Prometheus/Grafana | Monitoring | | TODO: Verify |

---

## 5. Documentation Handover

| Document | Location | Reviewed |
|----------|----------|----------|
| Exit handover package | `Handover/` (18 files) | |
| Original README | `README.md` | |
| Deployment guide | `docs/DEPLOYMENT.md` | |
| Local setup | `start_readme/LOCAL_SETUP.md` | |
| Troubleshooting | `start_readme/troubleshooting.md` | |
| Review packet | `review_packets/REVIEW_PACKET.md` | |
| Prior handover docs | `docs/handover/` | |
| API documentation | `Handover/06_API_Documentation.md` | |

---

## 6. Operational Handover

| Item | Status |
|------|--------|
| Backup schedule documented | TODO: Verify |
| Backup restore tested | TODO: Verify |
| Monitoring alerts configured | TODO: Verify |
| On-call rotation defined | TODO: Verify |
| Incident response process documented | TODO: Verify |
| DNS records documented | TODO: Verify |
| SSL certificate renewal process | TODO: Verify |

---

## 7. Third-Party Integrations

| Integration | Contact / Account | Transferred |
|-------------|-------------------|-------------|
| SETU / Sampada | | TODO: Verify |
| InsightCore | | TODO: Verify |
| Tally compatibility | N/A (file-based) | N/A |
| Tantra platform | | TODO: Verify |
| Prometheus monitoring | | TODO: Verify |

---

## 8. Knowledge Transfer Sessions

Complete all sessions in `Handover/15_Knowledge_Transfer.md`:

- [ ] KT-1: Product & Architecture
- [ ] KT-2: Backend Deep Dive
- [ ] KT-3: Frontend & Integration
- [ ] KT-4: Database & Compliance
- [ ] KT-5: Deployment & DevOps
- [ ] KT-6: Governance & Proof
- [ ] KT-7: Handover Q&A

---

## 9. Final Verification

- [ ] All handover documents reviewed by incoming team
- [ ] Production deployment verified post-transfer
- [ ] All secrets rotated
- [ ] Outgoing team access revoked
- [ ] Testing checklist completed (`Handover/14_Testing_Checklist.md`)
- [ ] Runtime evidence captured (`Handover/13_Runtime_Evidence.md`)
- [ ] Pending work items acknowledged (`Handover/09_Pending_Work.md`)

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing Tech Lead | | | |
| Incoming Tech Lead | | | |
| Outgoing DevOps | | | |
| Incoming DevOps | | | |
| Product Owner | | | |
| Project Manager | | | |

---

## Post-Transfer Support Period

| Item | Details |
|------|---------|
| Support period duration | TODO: Verify |
| Support contact | TODO: Verify |
| Escalation path | TODO: Verify |
| Known issues at transfer | See `Handover/10_Known_Issues.md` |
