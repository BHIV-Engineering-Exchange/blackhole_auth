# Ownership Transfer — blackhole_auth

**Generated:** 2026-07-05  
**Repository:** https://github.com/blackholeinfiverse64/blackhole_auth.git

---

## 1. Source Code & Repository

| Item | From | To | Status |
|------|------|----|--------|
| GitHub repository admin access | | | TODO: Verify |
| Branch protection on `main` | | | TODO: Verify |
| Collaborator access reviewed | | | TODO: Verify |

---

## 2. Cloud Infrastructure

### Auth Client Backend

| Item | Details | Status |
|------|---------|--------|
| Service URL | TODO: Verify | No deploy config in repo |
| Admin access transferred | | TODO: Verify |
| Env vars documented | `Handover/05_Environment_Guide.md` | |
| `JWT_SECRET` rotated if exposed | | TODO: Critical |

**Required env vars:**
- `JWT_SECRET` — must match auth server
- `AUTH_SERVER_URL` — default `https://bhiv-auth.onrender.com`
- `CORS_ORIGINS` — must include frontend origin
- `PORT` — default 8080

### Auth Client Frontend

| Item | Details | Status |
|------|---------|--------|
| Inferred URL | `https://products.blackholeinfiverse.com` | From CORS config |
| Admin access transferred | | TODO: Verify |
| `VITE_API_BASE_URL` set | | TODO: Verify |
| `VITE_AUTH_SERVER_URL` set | | TODO: Verify |

### External Auth Server (Critical Dependency)

| Item | Details | Status |
|------|---------|--------|
| URL | https://bhiv-auth.onrender.com | From code defaults |
| Repository | TODO: Verify separate repo | Not in blackhole_auth |
| Admin access transferred | | TODO: Verify |
| `JWT_SECRET` shared with client | | TODO: Critical |
| Cookie domain configured | | TODO: Verify |

---

## 3. Credentials & Secrets Inventory

| Secret | Used By | Action |
|--------|---------|--------|
| `JWT_SECRET` | Auth client backend + auth server | Must be identical; rotate if exposed |
| Auth server credentials | External repo | Separate handover needed |

**No database credentials** — this repo has no database.

---

## 4. Domain & DNS

| Domain | Purpose | Status |
|--------|---------|--------|
| `products.blackholeinfiverse.com` | Frontend (inferred) | TODO: Verify |
| `bhiv-auth.onrender.com` | Auth server | External |
| `*.blackholeinfiverse.com` | Product apps | External |

---

## 5. Cross-Repo Dependencies

| Repo/System | Relationship |
|-------------|--------------|
| Auth server (`bhiv-auth`) | Issues JWT, sets cookie — **critical dependency** |
| Setu, Sampada, Niyantran, Gurukul, Mitra | Launch targets from dashboard |
| Other BHIV repos (AI-Artha, etc.) | May reference `AUTH_SERVER_URL` |

---

## 6. Access Checklist for Successor

- [ ] GitHub repo access
- [ ] Auth client backend hosting access
- [ ] Auth client frontend hosting access
- [ ] **Auth server repo and hosting access**
- [ ] JWT_SECRET documented securely (both services)
- [ ] DNS/domain access for `blackholeinfiverse.com`
- [ ] KT sessions completed (`15_Knowledge_Transfer.md`)
- [ ] Testing checklist completed (`14_Testing_Checklist.md`)

---

## 7. Post-Transfer Actions (Successor)

1. Verify `.env` not in git history — rotate JWT_SECRET if exposed
2. Add `.gitignore` and root README
3. Fix stale `backend/.env.example`
4. Document production deployment URLs
5. Add deployment configuration (render.yaml / vercel.json)
6. Obtain auth server handover documentation
7. Verify cookie domain works across all production domains

---

## 8. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing owner | | | |
| Incoming owner | | | |
| Manager/Approver | | | |
