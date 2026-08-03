# Ownership Transfer — hackaverse

**Generated:** 2026-07-05  
**Repository:** https://github.com/blackholeinfiverse64/hackaverse.git

---

## 1. Source Code & Repository

| Item | Status |
|------|--------|
| GitHub admin access | TODO: Verify |
| Branch protection on `main` | TODO: Verify |
| Collaborator access reviewed | TODO: Verify |

---

## 2. Cloud Infrastructure

### Render (Backend)

| Item | Details | Status |
|------|---------|--------|
| Service name | `hackathon-backend` | From render.yaml |
| Root directory | `hackathon/` | |
| Health check | `/system/ready` | |
| URL | `https://hackaverse.blackholeinfiverse.com` | TODO: Verify vs Render default URL |

**Render Secrets (required):**
- `API_KEY`
- `JWT_SECRET`
- `MONGODB_URI`
- `GROQ_API_KEY`

### Vercel (Frontend)

| Item | Details | Status |
|------|---------|--------|
| Root directory | `hackaverse-frontend/` | |
| URL | https://hackaverse-mu.vercel.app | From review packet |
| Alt URL | https://hackaverse.vercel.app | In CORS config |

**Vercel env vars:**
- `VITE_API_URL`
- `VITE_API_KEY`
- `VITE_NODE_ENV`

### MongoDB Atlas

| Item | Details | Status |
|------|---------|--------|
| Database | `hackaverse_db` | |
| Cluster | `cluster0.oeh93tq.mongodb.net` (from .env.example) | TODO: Verify |
| Admin access | | TODO: Verify |
| Backup tier | | TODO: Verify |

### Groq

| Item | Status |
|------|--------|
| API key for AI judging | TODO: Verify account ownership |
| Quota/billing | TODO: Verify |

---

## 3. Credentials Inventory

| Secret | Services | Action |
|--------|----------|--------|
| `MONGODB_URI` | Backend | Rotate if exposed |
| `JWT_SECRET` | Backend | Rotate invalidates all tokens |
| `API_KEY` | Backend + Frontend | Must match |
| `GROQ_API_KEY` | Backend | AI judging |
| `AUTHOR_PASSWORD` | Backend admin ops | Change from default |
| Seeded user passwords | MongoDB | Rotate for production |

See `CREDENTIAL_ROTATION_GUIDE.md` (repo root).

---

## 4. Domain & DNS

| Domain | Purpose | Status |
|--------|---------|--------|
| `hackaverse.blackholeinfiverse.com` | Backend API | TODO: Verify |
| `hackaverse-mu.vercel.app` | Frontend | |
| `hackaverse.blackholeinfiverse.com` | Also in CORS | |

---

## 5. Documentation Handover

| Package | Location |
|---------|----------|
| Exit handover (this) | `Handover/` |
| System handover | `SYSTEM_HANDOVER.md` |
| Env reference | `ENV_REFERENCE.md` |
| API contract | `API_CONTRACT.md` |
| Review packet | `review_packets/REVIEW_PACKET.md` |
| Project status audit | `CURRENT_PROJECT_STATUS.md` |

---

## 6. Access Checklist

- [ ] GitHub repo access
- [ ] Render dashboard access
- [ ] Vercel dashboard access
- [ ] MongoDB Atlas access
- [ ] Groq console access
- [ ] DNS/domain management (blackholeinfiverse.com)
- [ ] Production secrets documented securely
- [ ] `seed_data.py` run on production (or role API built)
- [ ] KT sessions completed
- [ ] Testing checklist signed off

---

## 7. Post-Transfer Actions

1. Verify canonical backend URL across all docs/env
2. Seed or assign admin/judge users in production
3. Fix judge invitation flow
4. Separate dev/prod MongoDB
5. Add CI/CD pipeline
6. Update cron job URL in render.yaml
7. Remove duplicate `Hackaverse/` doc folder
8. Rotate all secrets per `CREDENTIAL_ROTATION_GUIDE.md`

---

## 8. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing owner | | | |
| Incoming owner | | | |
| Manager | | | |
