# Ownership Transfer — biometric-blackhole

**Generated:** 2026-07-05  
**Repository:** https://github.com/blackholeinfiverse64/biometric-blackhole.git

---

## 1. Source Code & Repository

| Item | From | To | Status |
|------|------|----|--------|
| GitHub repository admin access | | | TODO: Verify |
| Branch protection on `main` | | | TODO: Verify |
| Collaborator access reviewed | | | TODO: Verify |

---

## 2. Cloud Infrastructure

### Render (Backend)

| Item | Details | Status |
|------|---------|--------|
| Service name | `biometric-blackhole` | From render.yaml |
| Service URL | https://biometric-blackhole.onrender.com | From DEPLOYMENT.md |
| Admin access transferred | | TODO: Verify |
| Env vars documented | `Handover/05_Environment_Guide.md` | |
| Secrets rotated | | TODO: Critical — render.yaml has hardcoded MONGODB_URI |

**Render env vars to verify:**
- `MONGODB_URI` — rotate and move to secret
- `JWT_SECRET_KEY` — auto-generated
- `PASSWORD_SALT` — auto-generated
- `PORT` — 5000
- `PYTHON_VERSION` — 3.11.0

### Vercel (Frontend)

| Item | Details | Status |
|------|---------|--------|
| Project URL | https://biometric-blackhole.vercel.app | From CORS config |
| Root directory | `frontend/` | From vercel.json |
| Admin access transferred | | TODO: Verify |
| `VITE_API_BASE_URL` set | | TODO: Verify |

### MongoDB Atlas

| Item | Details | Status |
|------|---------|--------|
| Cluster | `cluster0.1kdzvsi.mongodb.net` | From hardcoded URI ⚠️ |
| Database | `biometric_attendance` | From database.py |
| User | `blackholeauth_db_user` | From hardcoded URI ⚠️ |
| Admin access transferred | | TODO: Verify |
| Password rotated | | TODO: Critical |
| IP whitelist configured | | TODO: Verify (likely 0.0.0.0/0) |
| Backup tier | | TODO: Verify |

---

## 3. Credentials & Secrets Inventory

| Secret | Location | Action |
|--------|----------|--------|
| `MONGODB_URI` | `database.py`, `render.yaml` | Rotate + remove from code |
| `JWT_SECRET_KEY` | `auth.py` default, Render auto-gen | Verify Render value |
| `PASSWORD_SALT` | `auth.py` default, Render auto-gen | Verify Render value |

**No CI/CD secrets** — no GitHub Actions configured.

---

## 4. Domain & DNS

| Item | Status |
|------|--------|
| Custom domain on Render | TODO: Verify |
| Custom domain on Vercel | TODO: Verify |
| DNS records documented | TODO: Verify |

---

## 5. Documentation Handover

| Document | Location | Status |
|----------|----------|--------|
| Exit handover package | `Handover/` (18 files) | Complete |
| Deployment guide | `DEPLOYMENT.md` | Present (partially stale) |
| Backend docs | `backend/README.md`, etc. | Present |
| Installation guide | `INSTALLATION_GUIDE.md` | Present |

---

## 6. Access Checklist for Successor

- [ ] GitHub repo access (admin or maintain)
- [ ] Render dashboard access
- [ ] Vercel dashboard access
- [ ] MongoDB Atlas dashboard access
- [ ] MongoDB credentials rotated and documented securely
- [ ] JWT_SECRET_KEY and PASSWORD_SALT documented securely
- [ ] Production URLs verified live
- [ ] Handover KT sessions completed (see `15_Knowledge_Transfer.md`)
- [ ] Testing checklist completed (see `14_Testing_Checklist.md`)

---

## 7. Post-Transfer Actions (Successor)

1. Rotate all exposed credentials immediately
2. Remove hardcoded secrets from codebase
3. Add JWT auth to `/api/download` and `/api/statistics`
4. Set up external uptime monitoring
5. Review and archive stale Supabase documentation
6. Plan bcrypt migration for passwords
7. Add Gunicorn for production
8. Consider adding CI/CD pipeline

---

## 8. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing owner | | | |
| Incoming owner | | | |
| Manager/Approver | | | |

---

## TODO: Verify

- [ ] All cloud account ownership details
- [ ] Whether git history contains additional exposed secrets (run secret scan)
- [ ] MongoDB Atlas billing/account owner
