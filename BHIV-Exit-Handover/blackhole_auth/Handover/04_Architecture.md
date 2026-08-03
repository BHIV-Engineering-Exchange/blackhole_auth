# Architecture — blackhole_auth

**Generated:** 2026-07-05

---

## High-Level Overview

```
┌─────────────────────────┐
│  React Dashboard        │  products.blackholeinfiverse.com (TODO: Verify)
│  (frontend/)            │
└───────────┬─────────────┘
            │ Axios + credentials (cookies)
            ▼
┌─────────────────────────┐
│  Express Auth Client    │  This repo — backend/ (port 8080)
│  JWT cookie validation  │
└───────────┬─────────────┘
            │ shared JWT_SECRET
            ▼
┌─────────────────────────┐
│  Blackhole Auth Server  │  bhiv-auth.onrender.com (EXTERNAL)
│  Login, logout, JWT     │
└─────────────────────────┘
            │
            ▼
┌─────────────────────────┐
│  Product Apps           │  setu, sampada, niyantran, gurukul, mitra
│  *.blackholeinfiverse.com│
└─────────────────────────┘
```

---

## Authentication Flow

```
User → /login → enters email
    │
    ▼
Iframe opens: bhiv-auth.onrender.com/login?mode=popup&email=...&redirect=...
    │
    ▼
Auth server validates credentials, sets blackhole_token cookie
    │
    ▼
Auth server posts window message: { type: "blackhole-auth-success" }
    │
    ▼
AuthContext.fetchMe() → GET /api/me (cookie auto-sent)
    │
    ▼
Backend: jwt.verify(token, JWT_SECRET) → req.user
    │
    ▼
Redirect to /dashboard → show apps filtered by allowedApps
```

---

## Backend Components

| File | Role |
|------|------|
| `src/server.js` | HTTP server entry |
| `src/app.js` | Express app, routes, middleware stack |
| `src/config/env.js` | Env validation and exports |
| `src/middleware/blackholeAuth.js` | JWT cookie validation (`requireAuth`, `optionalAuth`, `requireApp`) |
| `src/middleware/errorHandler.js` | 404 and error handlers |

### Middleware Stack (order)

1. `helmet()` — security headers
2. `express.json()` — JSON body parser (1MB limit)
3. `cookieParser()` — read cookies
4. `cors()` — origin validation with wildcard support
5. `rateLimit()` — 300 req / 15 min on `/api/*`
6. `optionalAuth()` — attach user if cookie present
7. Routes

---

## Frontend Components

| Route | Page | Auth |
|-------|------|------|
| `/` | WelcomePage | Public (redirects if logged in) |
| `/login` | LoginPage | Public (iframe auth popup) |
| `/dashboard` | DashboardPage | Protected |
| `*` | Redirect to `/` | — |

| File | Role |
|------|------|
| `context/AuthContext.jsx` | Session state, fetchMe, logout, postMessage listener |
| `api/client.js` | Axios instance with `withCredentials: true` |
| `constants/apps.js` | Product catalog (5 apps) |
| `components/ProtectedRoute.jsx` | Auth guard |
| `components/PublicRoute.jsx` | Redirect logged-in users to dashboard |

---

## JWT Payload (Expected)

Decoded in `blackholeAuth.js`:

```javascript
{
  user_id: "...",
  email: "...",
  roles: ["admin" | ...],
  allowedApps: ["setu", "sampada", ...]
}
```

> TODO: Verify exact claims from auth server implementation.

---

## Cookie

| Property | Value |
|----------|-------|
| Name | `blackhole_token` (hardcoded) |
| Read by | `req.cookies.blackhole_token` |
| Set by | External auth server (not this repo) |
| Validation | `jsonwebtoken.verify(token, JWT_SECRET)` |

---

## CORS

From `env.js` — `CORS_ORIGINS` comma-separated list.

Supports wildcard patterns (e.g. `https://*.blackholeinfiverse.com`).

`credentials: true` — required for cookie-based auth.

Default example origins:
- `http://localhost:5173`
- `https://products.blackholeinfiverse.com`
- `https://*.blackholeinfiverse.com`

---

## Security Features

| Feature | Implementation |
|---------|----------------|
| Helmet | HTTP security headers |
| Rate limiting | 300 requests / 15 min on `/api` |
| CORS | Origin allowlist with wildcard regex |
| JWT validation | Signature verification with shared secret |
| App access | Dashboard checks `allowedApps` before launch |

---

## What This Repo Does NOT Do

- User registration or password storage
- JWT issuance (done by external auth server)
- Database operations
- Admin user management
- App URL configuration at runtime (hardcoded in `apps.js`)

---

## TODO: Verify

- [ ] Auth server repo and full JWT claim schema
- [ ] Cookie domain/SameSite settings on auth server
- [ ] Production URLs for all components
