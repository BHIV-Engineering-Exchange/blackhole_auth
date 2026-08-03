# Deployment Checklist — AI-CRM

**Generated:** 2026-07-05

---

## Pre-Deployment

### Code & Config
- [ ] Working directory: `Downloads/workflow-blackhole-main/`
- [ ] Port standardized (5000 or 5001 — align all configs)
- [ ] bcrypt password hashing implemented (recommended before prod)
- [ ] Review `Handover/09_Pending_Work.md`

### Backend Environment (Render)
- [ ] `MONGODB_URI` set
- [ ] `JWT_SECRET` set (strong, unique)
- [ ] `FRONTEND_URL` = Vercel URL
- [ ] `CORS_ORIGIN` = Vercel URL
- [ ] `PORT` aligned with code
- [ ] Cloudinary vars set (if monitoring enabled)
- [ ] Email vars set (if EMS enabled)
- [ ] AI keys set (if AI enabled)
- [ ] Office geolocation coords set

### Frontend Environment (Vercel)
- [ ] Root directory: `Downloads/workflow-blackhole-main/client`
- [ ] `VITE_API_URL=https://blackholeworkflow.onrender.com/api`
- [ ] **NOT** localhost

### Database
- [ ] MongoDB Atlas cluster ready
- [ ] IP whitelist configured
- [ ] Admin user seeded
- [ ] Pre-deploy backup taken

---

## Deployment Steps

### Backend (Render)
1. Create/update Web Service
2. Set build: `cd Downloads/workflow-blackhole-main/server && npm install`
3. Set start: `node index.js`
4. Configure all env vars
5. Deploy and note URL

### Frontend (Vercel)
1. Import/update project
2. Set root to `Downloads/workflow-blackhole-main/client`
3. Set `VITE_API_URL` env var
4. Deploy

### Docker (Alternative)
```bash
cd Downloads/workflow-blackhole-main/server
docker build -t infiverse-server .
docker run -p 5000:5000 --env-file .env infiverse-server
```

---

## Post-Deployment Verification

- [ ] `GET https://<backend>/api/ping` → 200
- [ ] Frontend loads at Vercel URL
- [ ] Login works (no localhost API calls in network tab)
- [ ] Socket.IO connects
- [ ] Dashboard loads with data
- [ ] CORS working (no browser errors)

---

## Security Post-Deploy

- [ ] JWT_SECRET not default "jwtSecret"
- [ ] Monitoring endpoints reviewed for auth
- [ ] Public endpoints audited
- [ ] Demo/test accounts removed or secured

---

## Sign-Off

| Role | Name | Date | Approved |
|------|------|------|----------|
| Developer | | | |
| DevOps | | | |
| Tech Lead | | | |

---

## Rollback Triggers

- Health ping fails > 5 minutes
- Auth broken for all users
- Frontend still calling localhost API

See `Handover/18_Rollback_Guide.md`
