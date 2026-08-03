# blackhole_auth — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-05  
**Repository:** blackhole_auth  
**Product Names:** BHIV Core, BHIV Core Dashboard, Blackhole Auth Client

---

## Product Overview

**blackhole_auth** is a **single sign-on (SSO) product launcher** for the Blackhole Infiverse ecosystem. It is **not** the primary authentication server — it is a **client dashboard** that validates JWT cookies issued by an external auth server and displays a launcher for assigned products (Setu, Sampada, Niyantran, Gurukul, Mitra).

---

## Purpose

Provide a central entry point that:

- Authenticates users via popup iframe to the external Blackhole Auth server
- Validates JWT stored in an httpOnly-style cookie (`blackhole_token`)
- Shows a product dashboard filtered by `allowedApps` in the JWT
- Redirects users to assigned Blackhole Infiverse applications

---

## Features

### Frontend
- Welcome page (`/`)
- Login with email + Blackhole Auth popup iframe (`/login`)
- Product launcher dashboard (`/dashboard`)
- PostMessage listener for auth success from auth server
- App access control via JWT `allowedApps` claim

### Backend (Auth Client)
- JWT cookie validation middleware
- `GET /api/health` — health check
- `GET /api/me` — current user from JWT cookie
- Helmet security headers, CORS with wildcard support, rate limiting

### External Dependency
- **Auth server:** `https://bhiv-auth.onrender.com` (NOT in this repo)

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite 5, React Router 6, Axios |
| **Backend** | Node.js, Express 4.19, jsonwebtoken |
| **Auth** | JWT in cookie (`blackhole_token`), validated locally |
| **Database** | None in this repo |
| **Deployment** | TODO: Verify — no render.yaml or vercel.json in repo |
| **CI/CD** | None |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | blackhole_auth |
| **Remote URL** | https://github.com/blackholeinfiverse64/blackhole_auth.git |
| **Main Branch** | `main` |
| **License** | TODO: Verify |

---

## Build Instructions

### Backend
```bash
cd backend
npm install
```

### Frontend
```bash
cd frontend
npm install
npm run build   # vite build → dist/
```

---

## Installation

### Prerequisites
- Node.js 18+
- Access to external auth server (`bhiv-auth.onrender.com`)
- Shared `JWT_SECRET` with auth server

### Backend Setup
```bash
cd backend
cp .env.example .env
# Set JWT_SECRET (must match auth server), CORS_ORIGINS, AUTH_SERVER_URL
npm run dev     # nodemon, port 8080
```

### Frontend Setup
```bash
cd frontend
# Create .env with VITE_API_BASE_URL and VITE_AUTH_SERVER_URL
npm install
npm run dev     # port 5173
```

---

## Running Locally

| Service | Command | URL |
|---------|---------|-----|
| Backend | `npm run dev` | http://localhost:8080 |
| Frontend | `npm run dev` | http://localhost:5173 |
| Health | — | http://localhost:8080/api/health |
| Auth Server (external) | — | https://bhiv-auth.onrender.com |

---

## Deployment

| Environment | Platform | Reference |
|-------------|----------|-----------|
| Backend | TODO: Verify | No deploy config in repo |
| Frontend | TODO: Verify | CORS references `products.blackholeinfiverse.com` |
| Auth Server | Render | `https://bhiv-auth.onrender.com` (external) |

Detailed steps: `Handover/03_Deployment_Guide.md`

---

## Authentication Flow

```
1. User enters email on /login
2. Frontend opens iframe → bhiv-auth.onrender.com/login?mode=popup&email=...
3. Auth server authenticates, sets blackhole_token cookie
4. Auth server posts message: { type: "blackhole-auth-success" }
5. Frontend calls GET /api/me (cookie sent via withCredentials)
6. Backend validates JWT, returns user profile
7. User redirected to /dashboard → launches allowed apps
```

---

## Environment Variables (Names Only)

### Backend
`PORT`, `NODE_ENV`, `JWT_SECRET`, `AUTH_SERVER_URL`, `CORS_ORIGINS`

### Frontend
`VITE_API_BASE_URL`, `VITE_AUTH_SERVER_URL`

Full guide: `Handover/05_Environment_Guide.md`

---

## Known Issues

1. `.env.example` contains stale/unused vars (MONGO_URI, AUTH_COOKIE_NAME mismatch)
2. Cookie name in code is `blackhole_token` but `.env.example` says `bhiv_token`
3. `.env` with JWT_SECRET may be committed — no `.gitignore` found
4. No deployment configuration in repo
5. No README at repo root
6. `requireApp` middleware exported but unused
7. No CI/CD or automated tests

Full list: `Handover/10_Known_Issues.md`

---

## Related Handover Documents

| Document | Purpose |
|----------|---------|
| `02_Repository_Details.md` | Repo metadata and commands |
| `03_Deployment_Guide.md` | Production deployment |
| `04_Architecture.md` | System architecture |
| `05_Environment_Guide.md` | Environment configuration |
| `06_API_Documentation.md` | API reference |
| `07_Database_Details.md` | Data storage (none locally) |
| `08_Folder_Structure.md` | Directory layout |
| `09_Pending_Work.md` | Outstanding tasks |
| `10_Known_Issues.md` | Documented issues |
| `11_Troubleshooting.md` | Common problems |
| `12_REVIEW_PACKET.md` | Quick review guide |
| `13_Runtime_Evidence.md` | Runtime proof placeholders |
| `14_Testing_Checklist.md` | QA checklist |
| `15_Knowledge_Transfer.md` | KT session guide |
| `16_Ownership_Transfer.md` | Ownership checklist |
| `17_Deployment_Checklist.md` | Deploy checklist |
| `18_Rollback_Guide.md` | Rollback procedures |
