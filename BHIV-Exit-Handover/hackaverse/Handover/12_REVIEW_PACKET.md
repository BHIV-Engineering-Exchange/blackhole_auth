# Review Packet — hackaverse

**Generated:** 2026-07-05  
**Review Time:** < 10 minutes  
**Also see:** `review_packets/REVIEW_PACKET.md` (detailed v4 packet at repo root)

---

## Entry Points

| File | Purpose |
|------|---------|
| `hackathon/src/main.py` | FastAPI app, middleware, routers |
| `hackathon/src/routes/auth_routes.py` | Auth (register/login) |
| `hackathon/src/database.py` | MongoDB |
| `hackathon/src/judging/multi_agent_judge.py` | AI judging |
| `hackaverse-frontend/src/App.jsx` | All frontend routes |
| `hackaverse-frontend/src/services/api.js` | API client |
| `hackathon/seed_data.py` | Admin/judge seeding |

---

## Production URLs

| Surface | URL |
|---------|-----|
| Frontend | https://hackaverse-mu.vercel.app |
| Backend API | https://hackaverse.blackholeinfiverse.com/api/v1 |
| Swagger | https://hackaverse.blackholeinfiverse.com/docs |
| Health | `/system/ready` |

> TODO: Verify backend URL — docs also mention `ai-agent-x2iw.onrender.com`.

---

## Core Flow

```
Register/Login → JWT + localStorage role
  → Participant: /app (teams, submissions, profile)
  → Admin: /admin (requires seeded user)
  → Judge: /judge (requires seeded user + working invite flow)
  → Submit project → AI judge (Groq) → Leaderboard
```

---

## Review Checklist (< 10 min)

- [ ] Read `Handover/01_README.md`
- [ ] `curl .../system/ready` → 200
- [ ] Open `/docs` — confirm `/api/v1` routes
- [ ] Start frontend locally, register participant
- [ ] Run `python seed_data.py`, test admin login
- [ ] Review `Handover/10_Known_Issues.md` (admin/judge visibility)
- [ ] Run `pytest` in hackathon/ (quick smoke)
- [ ] Verify production frontend loads

---

## Review Flags

1. **Admin/judge not visible** without seed — critical for handover
2. **Conflicting backend URLs** in documentation
3. **JWT has no role** — frontend role from localStorage only
4. **No CI/CD** — tests exist but not gated
5. **Shared dev/prod MongoDB** — data isolation risk
6. **Secrets in Render dashboard** — render.yaml hardened (good)

---

## Key Metrics

| Check | Endpoint | Expected |
|-------|----------|----------|
| Ready | `GET /system/ready` | 200 |
| DB | `GET /api/v1/system/db-status` | connected: true |
| Auth | `POST /api/v1/auth/login` | JWT returned |
| API docs | `GET /docs` | Swagger UI |

---

## Existing Artifacts

| File | Location |
|------|----------|
| Review packet v4 | `review_packets/REVIEW_PACKET.md` |
| System handover | `SYSTEM_HANDOVER.md` |
| Consumer validation | `hackathon/reports/consumer_validation_report.md` |
| Replay validation | `hackathon/reports/replay_validation_report.md` |
| Project status audit | `CURRENT_PROJECT_STATUS.md` |

---

## Related Documents

- Full API: `Handover/06_API_Documentation.md`
- Architecture: `Handover/04_Architecture.md`
- Env vars: `ENV_REFERENCE.md`
