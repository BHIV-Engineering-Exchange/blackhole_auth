# Knowledge Transfer — blackhole_auth

**Generated:** 2026-07-05

---

## Session Overview

| Session | Duration | Topics | Materials |
|---------|----------|--------|-----------|
| **KT-1: Product & SSO Model** | 1 hour | Purpose, auth flow, external deps | `01_README.md`, `04_Architecture.md` |
| **KT-2: Backend Auth Client** | 1.5 hours | Express, JWT cookies, middleware | `app.js`, `blackholeAuth.js` |
| **KT-3: Frontend Dashboard** | 1.5 hours | React, iframe login, app launcher | `AuthContext.jsx`, `LoginPage.jsx` |
| **KT-4: Environment & Deploy** | 1 hour | JWT_SECRET sync, CORS, cookies | `05_Environment_Guide.md` |
| **KT-5: Auth Server Integration** | 1 hour | bhiv-auth contract, postMessage | External repo |
| **KT-6: Handover Q&A** | 1 hour | Known issues, sign-off | `10_Known_Issues.md`, `14_Testing_Checklist.md` |

---

## KT-1: Product & SSO Model

### Key Concepts
1. **This is a client, not the auth server** — login happens on `bhiv-auth.onrender.com`
2. **Cookie-based JWT** — `blackhole_token` cookie, not Bearer header
3. **Product launcher** — dashboard shows apps from JWT `allowedApps`
4. **5 products** — Setu, Sampada, Niyantran, Gurukul, Mitra

### Demo
- Walk through architecture diagram in `04_Architecture.md`

---

## KT-2: Backend Auth Client

### Key Files

| File | Topic |
|------|-------|
| `config/env.js` | Required vars, startup validation |
| `middleware/blackholeAuth.js` | requireAuth, optionalAuth, requireApp |
| `app.js` | Middleware order, routes |

### Demo
```bash
cd backend && npm run dev
curl http://localhost:8080/api/health
curl http://localhost:8080/api/me   # 401 expected
```

### Discussion
- Why JWT_SECRET must match auth server
- Why cookie name is hardcoded as `blackhole_token`
- Why `requireApp` is unused

---

## KT-3: Frontend Dashboard

### Key Files

| File | Topic |
|------|-------|
| `context/AuthContext.jsx` | Session bootstrap, postMessage, logout |
| `pages/LoginPage.jsx` | Iframe popup pattern |
| `pages/DashboardPage.jsx` | App filtering and launch |
| `api/client.js` | withCredentials, base URL logic |
| `constants/apps.js` | Product catalog |

### Demo
- Login flow with popup
- Show allowed vs denied apps
- Show logout redirect

---

## KT-4: Environment & Deploy

### Topics
- Backend vs frontend env vars
- CORS wildcard syntax
- Stale `.env.example` vars to ignore
- Missing deploy config gap

### Action Items for Successor
- [ ] Locate production hosting
- [ ] Verify JWT_SECRET on both services
- [ ] Add `.gitignore` and root README

---

## KT-5: Auth Server Integration

### Contract (Inferred)

| Aspect | Detail |
|--------|--------|
| Login URL | `{AUTH_SERVER}/login?mode=popup&email=&redirect=` |
| Logout URL | `{AUTH_SERVER}/logout?redirect=` |
| Cookie | `blackhole_token` |
| PostMessage | `{ type: "blackhole-auth-success" }` |
| JWT claims | `user_id`, `email`, `roles`, `allowedApps` |

> TODO: Obtain auth server handover or source access for full contract.

---

## KT-6: Handover Q&A

### Checklist
- [ ] All KT sessions completed
- [ ] Successor can run locally
- [ ] JWT_SECRET coordination documented
- [ ] Auth server access confirmed
- [ ] Production URLs verified
- [ ] Sign-off on `14_Testing_Checklist.md`

---

## Handover Contacts

> TODO: Verify names and contact details.

| Role | Name | Contact |
|------|------|---------|
| Outgoing developer | | |
| Successor | | |
| Auth server owner | | |
