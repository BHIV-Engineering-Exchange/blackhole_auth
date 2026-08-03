# Testing Checklist — hackaverse

**Generated:** 2026-07-05

---

## Pre-Test Setup

- [ ] Backend: `uvicorn src.main:app --port 8000` in `hackathon/`
- [ ] Frontend: `npm run dev` in `hackaverse-frontend/` (port 3000)
- [ ] `.env` configured: `MONGODB_URI`, `JWT_SECRET`, `API_KEY`, `GROQ_API_KEY`
- [ ] Frontend `.env`: `VITE_API_URL=http://localhost:8000`, `VITE_API_KEY` matches
- [ ] `python seed_data.py` run for admin/judge tests

---

## Automated Tests

### Backend (pytest)

- [ ] `pytest hackathon/tests/test_health.py`
- [ ] `pytest hackathon/tests/test_auth.py`
- [ ] `pytest hackathon/tests/test_endpoints.py`
- [ ] `pytest hackathon/tests/test_services.py`
- [ ] Full suite: `cd hackathon && pytest -v`

### Frontend (vitest)

- [ ] `cd hackaverse-frontend && npm test`

---

## API Tests (Manual)

### System
- [ ] `GET /system/ready` → 200
- [ ] `GET /api/v1/system/db-status` → connected
- [ ] `GET /docs` → Swagger loads

### Auth
- [ ] `POST /auth/register` → 201, role=`participant`
- [ ] `POST /auth/login` → JWT
- [ ] `GET /auth/me` with JWT → user profile
- [ ] `POST /auth/logout` → success

### Teams & Submissions
- [ ] Create team → success
- [ ] Send invitation → success
- [ ] Create submission → success

### Judging
- [ ] AI judge scores submission (requires Groq)
- [ ] Leaderboard returns ranked teams

---

## Frontend Manual Tests

### Public
- [ ] `/` loads landing page
- [ ] `/leaderboard` loads public leaderboard

### Participant (`/app/*`)
- [ ] Register + login → redirects to `/app`
- [ ] Join hackathon flow
- [ ] Create/join team
- [ ] Submit project
- [ ] Edit profile

### Admin (`/admin/*`) — requires seeded admin
- [ ] Admin dashboard loads
- [ ] Manage hackathons
- [ ] View participants
- [ ] View submissions
- [ ] Activity logs
- [ ] Invite judge

### Judge (`/judge/*`) — requires seeded judge
- [ ] Judge queue loads
- [ ] Manual review works
- [ ] Rankings page loads

---

## Security Tests

- [ ] Invalid JWT → 401
- [ ] Wrong API key → 401
- [ ] CSRF on cookie session → 403 without token
- [ ] CORS blocks unknown origin (production config)
- [ ] Rate limit triggers after threshold

---

## Production Smoke Tests

> TODO: Verify URLs.

- [ ] `GET https://hackaverse.blackholeinfiverse.com/system/ready`
- [ ] `https://hackaverse-mu.vercel.app` loads
- [ ] Register on production (use test account)
- [ ] No console errors

---

## Sign-Off

| Role | Name | Date | Status |
|------|------|------|--------|
| Developer | | | TODO |
| Reviewer | | | TODO |
| QA | | | TODO |
