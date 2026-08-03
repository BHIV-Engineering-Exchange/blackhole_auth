# API Documentation — hackaverse

**Generated:** 2026-07-05  
**Full contract:** `API_CONTRACT.md` (repo root)  
**Base URL:** `{host}/api/v1`  
**Swagger:** `{host}/docs`

Production base: `https://hackaverse.blackholeinfiverse.com/api/v1` — TODO: Verify

---

## Authentication

| Header | Purpose |
|--------|---------|
| `Authorization: Bearer <jwt>` | User session |
| `X-API-Key` | Client/API authentication |
| `X-CSRF-Token` | CSRF protection (browser with cookies) |
| `X-Trace-Parent` | Request tracing |

---

## Response Format

Standard wrapper (`schemas/response.py`):

```json
{
  "success": true,
  "message": "...",
  "data": { ... },
  "trace_id": "hv-abc123",
  "error_code": null
}
```

---

## Route Modules

All mounted under `/api/v1`:

| Prefix | Module | Description |
|--------|--------|-------------|
| `/auth` | `auth_routes.py` | Register, login, refresh, logout, me |
| `/admin` | `admin.py` | Admin dashboard, invites, logs |
| `/hackathons` | `hackathons.py` | CRUD + public listings |
| `/teams` | `teams.py`, `teams_crud.py`, `team_members_management.py` | Teams, invitations, members |
| `/submissions` | `submissions.py`, `submissions_crud.py` | Submission CRUD |
| `/judge` | `judge.py` | Judge operations |
| `/judge/review` | `judge_review.py` | Review queue, scoring |
| `/judge/invitations` | `judge_invitations.py` | Judge invites |
| `/hackathons/{id}/leaderboard` | `leaderboard.py` | Rankings |
| `/system` | `system.py` | Health, ready, logs, db-status |
| `/notifications` | `notifications.py` | User notifications, announcements |
| `/users` | `user_profile.py` | Profile, stats |
| `/uploads` | `file_uploads.py` | File uploads |
| `/webhooks` | `webhooks.py` | Webhook subscriptions |
| `/mcp` | `mcp.py` | MCP routing |
| `/rewards` | `missing_endpoints.py` | Rewards |
| `/judging` | `missing_endpoints.py` | Judging scores |

---

## Auth Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/register` | No | Register (role forced to `participant`) |
| POST | `/auth/login` | No | Login → JWT |
| POST | `/auth/refresh` | Yes | Refresh token |
| POST | `/auth/logout` | Yes | Logout |
| GET | `/auth/me` | Yes | Current user profile |

---

## System Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/system/health` | No | System health |
| GET | `/system/ready` | No | Readiness (Render health check) |
| GET | `/system/db-status` | No | MongoDB status |
| GET | `/system/logs` | API Key | Activity/provenance logs |

Also at app root (non-versioned):
- `GET /health`
- `GET /csrf-token`

---

## Teams (Selected)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/teams` | List teams |
| POST | `/teams` | Create team |
| POST | `/teams/{id}/join` | Join team |
| POST | `/teams/{id}/leave` | Leave team |
| POST | `/teams/invitations/send` | Send invitation |
| POST | `/teams/invitations/accept` | Accept invitation |
| GET | `/teams/invitations/received` | Received invitations |

---

## Submissions (Selected)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/submissions` | List submissions |
| GET | `/submissions/{id}` | Get submission |
| POST | `/submissions` | Create submission |
| GET | `/submissions/team/{team_id}` | Team submissions |

---

## Judging (Selected)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/judge/review/submissions` | Judge submission queue |
| GET | `/judge/review/submissions/pending` | Pending reviews |
| POST | `/judge/review/submit` | Submit review scores |
| GET | `/judging/scores/{project_id}` | Get project scores |

---

## Leaderboard

| Method | Path | Description |
|--------|------|-------------|
| GET | `/hackathons/{id}/leaderboard` | Authenticated leaderboard |
| GET | `/hackathons/{id}/leaderboard/public` | Public leaderboard |

---

## Error Codes

From `observability/error_codes.py` (examples):
- `AUTH_INVALID_TOKEN`
- `CSRF_INVALID`
- Standard HTTP 401/403/404/422/500

---

## WebSocket

Review packet references: `wss://host/ws/{user_id}`

> TODO: Verify WebSocket route implementation and JWT auth on handshake.

---

## Deprecated Frontend Client

`hackaverse-frontend/src/services/apiClient.js` is **deprecated** — use `services/api.js` instead.

---

## TODO: Verify

- [ ] Full endpoint list via `/openapi.json`
- [ ] Cron target `/api/v1/flows/reminder` existence
- [ ] Canonical production host for all examples
