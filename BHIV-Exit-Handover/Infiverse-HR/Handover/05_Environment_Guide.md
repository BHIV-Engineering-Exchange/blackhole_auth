# Environment Guide — Infiverse-HR

**Generated:** 2026-07-06  
**Frontend template:** `frontend/.env.example`  
**Backend template:** `backend/.env.example`

---

## Frontend Variables

| Variable | Required | Default (local) | Description |
|----------|----------|-----------------|-------------|
| `VITE_API_BASE_URL` | Yes | `http://localhost:8000` | Gateway URL |
| `VITE_AGENT_SERVICE_URL` | Yes | `http://localhost:9000` | Agent service URL |
| `VITE_LANGGRAPH_SERVICE_URL` | Yes | `http://localhost:9001` | LangGraph URL (**not** `VITE_LANGGRAPH_URL`) |
| `VITE_ENABLE_CONTROL_CENTER` | No | `true` in example | Enables `/control` route |
| `VITE_ENABLE_GOVERNANCE` | No | `true` in example | Governance tab in Control Center |
| `VITE_API_KEY` | Prod recommended | None | API key for protected calls (matches gateway) |
| `VITE_SUPABASE_URL` | No | Commented out | Optional; TODO: Verify if used |
| `VITE_SUPABASE_ANON_KEY` | No | Commented out | Optional |

Set in **Vercel dashboard** for production — not committed to git.

---

## Backend Variables — Database

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | MongoDB connection URI |
| `MONGODB_URI` | Yes | Same as DATABASE_URL (both used) |
| `MONGODB_DB_NAME` | Yes | Database name |

---

## Backend Variables — Auth / Security

| Variable | Required | Description |
|----------|----------|-------------|
| `API_KEY_SECRET` | Yes | Bearer API key for service/admin calls |
| `JWT_SECRET_KEY` | Yes | Client portal JWT signing |
| `CANDIDATE_JWT_SECRET_KEY` | Yes | Candidate/recruiter JWT signing |
| `GATEWAY_SECRET_KEY` | Yes | Gateway internal signing |

**Critical:** JWT tokens must be generated with matching secrets. Mismatch = 401 errors.

---

## Backend Variables — Service URLs

| Variable | Local default | Description |
|----------|---------------|-------------|
| `GATEWAY_SERVICE_URL` | `http://localhost:8000` | Gateway self-reference |
| `AGENT_SERVICE_URL` | `http://localhost:9000` | Agent for matching |
| `LANGGRAPH_SERVICE_URL` | `http://localhost:9001` | LangGraph for workflows |
| `PORTAL_SERVICE_URL` | `http://localhost:8501` | Legacy Streamlit |
| `CLIENT_PORTAL_SERVICE_URL` | `http://localhost:8502` | Legacy |
| `CANDIDATE_PORTAL_SERVICE_URL` | `http://localhost:8503` | Legacy |

---

## Backend Variables — CORS

| Variable | Example value |
|----------|---------------|
| `CORS_ORIGINS` | `http://localhost:3000,https://sampada.blackholeinfiverse.com,https://infiverse-hr.vercel.app` |

Comma-separated. Must include all frontend origins.

---

## Backend Variables — Feature Flags

| Variable | Default | Description |
|----------|---------|-------------|
| `ENABLE_SEMANTIC` | `true` | AI semantic matching |
| `ENABLE_AUTO_SYNC` | `true` | Auto sync features |
| `ENABLE_VALUES_ASSESSMENT` | `true` | BHIV values assessment |
| `ENABLE_LEARNING_ENGINE` | `true` | Learning engine features |

---

## Backend Variables — Workflow Bridge

| Variable | Description |
|----------|-------------|
| `WORKFLOW_API_BASE_URL` | Complete-Infiverse API (local: `http://127.0.0.1:5000/api`) |
| `WORKFLOW_API_BASE_URL_DOCKER` | Docker: `http://host.docker.internal:5000/api` |
| `WORKFLOW_BRIDGE_EMAIL` | Bridge service account email |
| `WORKFLOW_BRIDGE_PASSWORD` | Bridge password |
| `WORKFLOW_USER_PASSWORD` | Employee password for workflow users |
| `WORKFLOW_TOKEN_REFRESH_SECONDS` | `43200` (12 hours) |

---

## Backend Variables — Communications

| Variable | Service |
|----------|---------|
| `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_WHATSAPP_NUMBER` | WhatsApp |
| `GMAIL_EMAIL`, `GMAIL_APP_PASSWORD` | Email |
| `TELEGRAM_BOT_TOKEN`, `TELEGRAM_BOT_USERNAME`, `TELEGRAM_ADMIN_CHAT_ID` | Telegram |

---

## Backend Variables — AI / ML

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY`, `GEMINI_MODEL` | LangGraph Gemini integration |
| `HF_TOKEN` | HuggingFace token for model downloads |
| `HF_HUB_DISABLE_SYMLINKS_WARNING`, etc. | HF hub tuning |

---

## Backend Variables — Runtime

| Variable | Default | Description |
|----------|---------|-------------|
| `LOG_LEVEL` | `INFO` | Logging level |
| `LOG_FORMAT` | `json` | Structured logs |
| `ENVIRONMENT` | `development` | Runtime environment |
| `OBSERVABILITY_ENABLED` | `true` | Observability features |
| `GATEWAY_PORT` | `8000` | Local gateway port |
| `AGENT_PORT` | `9000` | Local agent port |
| `LANGGRAPH_PORT` | `9001` | Local langgraph port |

---

## Local Setup

```bash
# Backend
cd backend
copy .env.example .env
# Edit .env with MongoDB URI and secrets

# Frontend
cd frontend
copy .env.example .env
# Defaults point to localhost services
```

Restart services after env changes.

---

## Production Alignment Checklist

- [ ] Vercel `VITE_*` URLs match live Render services
- [ ] `VITE_API_KEY` = gateway `API_KEY_SECRET`
- [ ] Gateway `CORS_ORIGINS` includes Vercel + custom domain
- [ ] All three JWT secrets set and consistent
- [ ] MongoDB Atlas network access allows Render IPs
- [ ] No real secrets in git history

---

## Demo Credentials (Local)

Per DEPLOYMENT_GUIDE — **TODO: Verify** still valid:

| Role | Credentials |
|------|-------------|
| General demo | `demo_user` / `demo_password` |
| Client | `TECH001` / `demo123` |

Do not use in production.
