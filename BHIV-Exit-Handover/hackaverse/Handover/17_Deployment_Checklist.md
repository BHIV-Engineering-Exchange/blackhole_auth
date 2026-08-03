# Deployment Checklist — hackaverse

**Generated:** 2026-07-05

---

## Pre-Deployment

### Code & Branch
- [ ] Changes merged to `main`
- [ ] `pytest` passes locally
- [ ] `npm test` passes locally
- [ ] No secrets in committed code
- [ ] Review `Handover/09_Pending_Work.md`

### Backend (Render)
- [ ] `MONGODB_URI` set as secret
- [ ] `JWT_SECRET` set as secret
- [ ] `API_KEY` set as secret
- [ ] `GROQ_API_KEY` set as secret (if `JUDGE_MODE=ai`)
- [ ] `ENV=production`
- [ ] `ALLOWED_ORIGINS` includes all frontend domains
- [ ] `AUTHOR_PASSWORD` changed from default
- [ ] Cron URL updated (if using reminders)

### Frontend (Vercel)
- [ ] `VITE_API_URL` points to canonical backend
- [ ] `VITE_API_KEY` matches backend `API_KEY`
- [ ] `npm run build` succeeds locally
- [ ] `VITE_USE_MOCK_API=false`

### Database
- [ ] Production MongoDB accessible from Render
- [ ] `seed_data.py` run for admin/judge users (or role API ready)
- [ ] Pre-deploy backup taken

---

## Deployment Steps

### Backend
1. Push to `main` → Render auto-builds from `hackathon/`
2. Monitor build logs
3. Verify startup (no GROQ error)
4. Check `/system/ready`

### Frontend
1. Push to `main` → Vercel auto-builds from `hackaverse-frontend/`
2. Monitor build logs
3. Verify SPA routing (vercel.json rewrites)

---

## Post-Deployment Verification

```bash
curl https://hackaverse.blackholeinfiverse.com/system/ready
curl https://hackaverse.blackholeinfiverse.com/docs
curl -I https://hackaverse-mu.vercel.app
```

Manual:
- [ ] Participant register + login
- [ ] Admin login (seeded user)
- [ ] Create team + submission
- [ ] Leaderboard loads
- [ ] No CORS errors
- [ ] API responses include `trace_id`

---

## Rollback Plan

See `Handover/18_Rollback_Guide.md`

---

## Communication Template

```
Subject: [DEPLOY] HackaVerse deployed

Backend: https://hackaverse.blackholeinfiverse.com
Frontend: https://hackaverse-mu.vercel.app
Health: PASS/FAIL
Admin access: seeded YES/NO
Groq judging: configured YES/NO
```

---

## TODO: Verify

- [ ] Canonical backend URL before using in checklist
- [ ] Vercel project settings match repo structure
