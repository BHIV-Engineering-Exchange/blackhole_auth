# Architecture — hackaverse

**Generated:** 2026-07-05

---

## High-Level Overview

```
┌──────────────────────┐     HTTPS/JWT/API-Key     ┌──────────────────────┐
│  React Frontend      │ ◄────────────────────────► │  FastAPI Backend     │
│  (Vercel)            │     /api/v1/*            │  (Render)            │
│  hackaverse-frontend │                          │  hackathon/          │
└──────────────────────┘                          └──────────┬───────────┘
                                                             │
                    ┌────────────────────────────────────────┼──────────────┐
                    ▼                                        ▼              ▼
            MongoDB Atlas                              Groq LLM         BHIV Bucket
            hackaverse_db                              (AI Judge)       (local files)
```

---

## Request Flow

```
Frontend Axios (api.js)
  → Authorization: Bearer JWT
  → X-API-Key
  → X-Trace-Parent (observability)
  → POST /api/v1/{resource}
    → TraceIdMiddleware (hv-<hex> trace_id)
    → SecurityMiddleware (API key, nonce, rate limit, signature)
    → CSRFMiddleware (browser cookie sessions)
    → CORSMiddleware
    → JWT auth (get_current_user_id)
    → Route handler
    → MongoDB + optional Groq judging
    → APIResponse { success, message, data, trace_id, error_code }
```

---

## Backend Structure

| Module | Purpose |
|--------|---------|
| `src/main.py` | FastAPI app, middleware, router mounting |
| `src/database.py` | MongoDB connection, indexes, degraded mode |
| `src/auth.py` | JWT + API key validation |
| `src/routes/` | 20+ route modules |
| `src/judging/` | Multi-agent AI judge, rubric, consensus |
| `src/agents/` | Mentor, judge, system agents |
| `src/observability/` | Trace middleware, correlation logging |
| `src/services/` | Email, Discord |
| `src/schemas/response.py` | Standardized APIResponse |

### API Prefix

All routes under **`/api/v1`** — single canonical namespace.

---

## Frontend Structure

| Area | Path | Roles |
|------|------|-------|
| Public | `/`, `/leaderboard`, `/invite/accept`, `/judge/accept` | All |
| Participant | `/app/*`, `/join-hackathon`, `/create-team/:id` | participant |
| Admin | `/admin/*` | admin |
| Judge | `/judge/*` | judge |
| Agent | `/hacka-agent` | any authenticated |

Key files:
- `services/api.js` — canonical API client (replaces deprecated `apiClient.js`)
- `contexts/AuthContext.jsx` — auth state
- `utils/rbac.js` — role constants
- `utils/roleRedirect.js` — post-login routing

---

## Authentication

| Mechanism | Usage |
|-----------|-------|
| JWT (Bearer) | User sessions — bcrypt passwords, PyJWT tokens |
| X-API-Key | Machine/client authentication |
| CSRF token | Browser POST/PUT/DELETE with cookies |
| Request signature | Optional HMAC when `SECURITY_SECRET_KEY` set |

JWT payload (from `auth_routes.py`): `user_id`, `email`, `iat`, `exp` — **role NOT in JWT** (stored in DB + localStorage).

---

## Judging Engine

| Mode | Env | Behavior |
|------|-----|----------|
| `ai` | `JUDGE_MODE=ai` | Groq LLM multi-agent judging |
| `demo` | `JUDGE_MODE=demo` | Hash-based demo scores |
| Rubric fallback | dev without Groq | Rubric-based scoring |

Production + `JUDGE_MODE=ai` requires `GROQ_API_KEY` at startup.

---

## Database

MongoDB Atlas — database name `hackaverse_db` (env: `BUCKET_DB_NAME`).

Collections with indexes (from `database.py`):
- `users`, `sessions`, `teams`, `submissions`, `notifications`, `webhooks`, `provenance_logs`

See `07_Database_Details.md`.

---

## Integrations

| Integration | Module |
|-------------|--------|
| Groq LLM | `judging/multi_agent_judge.py` |
| BHIV Core | `integrations/bhiv_connectors.py` |
| Email (SMTP/outbox) | `services/email_service.py` |
| Discord | `services/discord_service.py` |
| WebSockets | Referenced in review packet — TODO: Verify implementation |
| MCP routing | `routes/mcp.py` |

---

## TODO: Verify

- [ ] Canonical production backend hostname
- [ ] WebSocket auth implementation
- [ ] BHIV_CORE_URL placeholder in render.yaml
