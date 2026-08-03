# Third-Party Services — PARIKSHAN / NIYANTRAN V1

## Overview

PARIKSHAN / NIYANTRAN has **minimal external dependencies** — primarily MongoDB. No SaaS API keys, payment providers, or email services are referenced in code.

---

## MongoDB

| Attribute | Value |
|-----------|-------|
| Purpose | Persistent storage for entities, alerts, action logs |
| Default URI | `mongodb://127.0.0.1:27017/bhiv-niyantran` |
| Config | `MONGODB_URI` environment variable |
| Driver | Mongoose 9 |

### Local development

Run MongoDB Community Server locally or via Docker (Docker not configured in repo).

### Production

**TODO: Verify**

- MongoDB Atlas cluster name and region
- Database user credentials rotation
- Backup and restore policy
- Connection string in hosting platform env vars

---

## npm registry

All dependencies installed from public npm:

- Backend: express, mongoose, socket.io, cors, dotenv
- Frontend: react, vite, axios, socket.io-client, tailwindcss

No private npm packages observed.

---

## GitHub

| Attribute | Value |
|-----------|-------|
| Remote | https://github.com/blackholeinfiverse64/PARIKSHAN.git |
| Branch | `main` |

**TODO: Verify** — org access, deploy keys, and branch protection rules.

---

## Hosting (not configured in repo)

Expected third-party platforms if deployed:

| Layer | Common choices | Status in repo |
|-------|----------------|----------------|
| Backend | Render, Railway, Fly.io, VM | Not configured |
| Frontend | Vercel, Netlify, Cloudflare Pages | Not configured |
| Database | MongoDB Atlas | **TODO: Verify** |

No API keys for these platforms are in the repository.

---

## Upstream BHIV systems (not integrated)

| System | Referenced in code | Integration |
|--------|-------------------|-------------|
| **Pravah** | `simulatePravahEvent()` naming | Mock only — no HTTP/message queue |
| **Sampada (Infiverse-HR)** | Ecosystem docs only | None |
| **Auth provider** | — | None |

**TODO: Verify** — official Pravah API/event contract when replacing mock service.

---

## Socket.IO

- **Library** — socket.io (server) + socket.io-client (browser)
- Not a hosted third-party service — runs on same Node process as Express

---

## Accounts checklist for incoming owner

- [ ] GitHub repo access
- [ ] MongoDB Atlas (or DB host) admin
- [ ] Backend hosting platform account
- [ ] Frontend static host account
- [ ] DNS registrar (if custom domain)
- [ ] **TODO: Verify** — any missing org secrets vault entries

---

## Cost notes

**TODO: Verify** — actual monthly spend for MongoDB tier and hosting. Repo contains no billing information.
