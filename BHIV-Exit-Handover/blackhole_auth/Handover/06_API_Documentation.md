# API Documentation — blackhole_auth

**Generated:** 2026-07-05  
**Source:** `backend/src/app.js`  
**Base URL (local):** `http://localhost:8080`  
**Base URL (production):** TODO: Verify

---

## Overview

This backend exposes **2 endpoints**. It is a thin auth client — not a full auth API. Login, register, and logout are handled by the external auth server at `AUTH_SERVER_URL`.

---

## Authentication

Uses **cookie-based JWT**, not Bearer tokens.

| Property | Value |
|----------|-------|
| Cookie name | `blackhole_token` |
| Sent via | Browser cookie (Axios `withCredentials: true`) |
| Validation | `jsonwebtoken.verify(token, JWT_SECRET)` |

---

## Endpoints

### GET `/api/health`

Health check. No authentication required.

**Response 200:**
```json
{ "status": "ok" }
```

---

### GET `/api/me`

Returns current user from JWT cookie. Requires valid `blackhole_token` cookie.

**Middleware:** `requireAuth({ jwtSecret, authServerUrl })`

**Response 200:**
```json
{
  "user": {
    "user_id": "...",
    "email": "user@example.com",
    "roles": ["admin"],
    "allowedApps": ["setu", "sampada"]
  }
}
```

**Response 401 (no cookie):**
```json
{
  "error": "Not authenticated",
  "redirect": "https://bhiv-auth.onrender.com/login"
}
```

**Response 401 (invalid/expired token):**
```json
{ "error": "Invalid token" }
```

Cookie is cleared on invalid token.

---

## Middleware (Not Mounted as Routes)

Exported from `blackholeAuth.js` but not used in `app.js`:

### `requireApp(appName)`

Checks `req.user.allowedApps.includes(appName)`. Returns 403 if denied.

Available for future route protection — currently app access is enforced client-side only in `DashboardPage.jsx`.

---

## Rate Limiting

Applied to all `/api/*` routes:

| Setting | Value |
|---------|-------|
| Window | 15 minutes |
| Limit | 300 requests |

---

## Error Responses

### 404 — Not Found

```json
{ "message": "Route not found" }
```

### 500 — Server Error

```json
{ "message": "Internal server error" }
```

### CORS Rejection

Non-allowed origins receive CORS error (not JSON).

---

## External Auth Server API

Login, logout, and token issuance are **not in this repo**.

Inferred endpoints from frontend usage:

| Action | URL Pattern |
|--------|-------------|
| Login (popup) | `GET {AUTH_SERVER_URL}/login?mode=popup&email={email}&redirect={origin}` |
| Logout | `GET {AUTH_SERVER_URL}/logout?redirect={origin}` |
| PostMessage | `{ type: "blackhole-auth-success" }` from auth server origin |

> TODO: Verify full auth server API in the bhiv-auth repository.

---

## Frontend API Usage

| Call | Method | Path | Purpose |
|------|--------|------|---------|
| Bootstrap session | GET | `/api/me` | On app load |
| Refresh session | GET | `/api/me` | After popup login |
| Pre-launch check | GET | `/api/me` | Before opening app |

Client: `frontend/src/api/client.js` — Axios with `withCredentials: true`.

---

## TODO: Verify

- [ ] Production base URL
- [ ] Full auth server API documentation
- [ ] Whether backend should expose additional routes (e.g. app launch tokens)
