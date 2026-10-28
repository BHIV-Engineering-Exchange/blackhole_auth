# Guest Mode Integration Contract (GUEST_MODE.md)

Products opened from the Blackhole launcher must **never show a sign-in page
on entry**. They boot as a read-only guest on real data; sign-in appears only
when the visitor triggers an action that needs an account.

This document is the contract every product (including ones whose repos are
not in this workspace: setu, niyantran, gurukul, vajra, gov-ops/namankan,
district-intelligence) follows.

## 1. Session model

The auth server issues one cookie, `blackhole_token` (httpOnly JWT, HS256,
shared `JWT_SECRET`):

| Kind | Claims | Who gets it |
|---|---|---|
| Real session | `user_id`, `email`, `roles[]`, `permissions[]`, `allowedApps[]`, `isGuest: false` | Signed-in users (8h) |
| Guest session | `user_id: guest_<rand>`, `email: null`, `roles: []`, `permissions: []`, `allowedApps[]`, `isGuest: true` | Anyone who opens a product without signing in (24h) |

In production set `COOKIE_DOMAIN=.blackholeinfiverse.com` (and
`COOKIE_SECURE=true`) on the auth server so product subdomains receive the
cookie. Locally the host-only `localhost` cookie already reaches every port.

## 2. Auth server endpoints

| Endpoint | Behaviour |
|---|---|
| `GET /api/sso/session?app=<key>` | 200 `{ authenticated: true, guest: true\|false, user }`. Mints/refreshes a **guest** cookie when there is no real session. 403 if `app` is not in the registry. `?strict=1` restores the old 401-when-signed-out behaviour. |
| `GET /api/sso/guest` | Explicitly ensure a session exists: real session passes through, otherwise mints a guest cookie. Called by the launcher before `window.open`. |
| `POST /api/login` `{ email }` | Real sign-in (Blackhole ID = credential, no password). |
| `POST /api/logout` | Clears the cookie. |
| `GET /api/me` | Current session (guest or real); 401 only when no/invalid cookie. |

Route aliases exist for every endpoint (`/api/auth/*`, bare `/*`) to survive
nginx path stripping.

## 3. Rules every product implements

1. **On boot, never redirect to a login page.** Call the session check
   (`GET {AUTH}/api/sso/session?app=<key>` with `credentials: 'include'`, or
   your product's existing exchange endpoint) and accept `guest: true`.
   Render the app read-only with real data.
2. **Reads accept guests.** Public/reference data endpoints return data for
   guest tokens (or no auth at all).
3. **Writes reject guests.** Every mutation (create/update/delete, submit,
   apply, save, post…) must return:
   ```
   403 { "error": "Sign in to continue", "code": "signin_required" }
   ```
   for `isGuest: true` identities. Server-side enforcement is mandatory —
   never rely on the frontend alone.
4. **Sign-in is a popup, not a redirect.** When a guest hits a gated action:
   ```js
   const AUTH = "https://products.blackholeinfiverse.com"; // your launcher URL
   window.open(`${AUTH}/login?embed=1&app=<your-app-key>`, "bhiv-signin",
               "width=420,height=520");
   window.addEventListener("message", (e) => {
     if (e.data?.type === "blackhole-auth-success") refreshSession();
   });
   ```
   The popup posts `{ type: "blackhole-auth-success" }` to its opener on
   success; the product re-checks the session and retries the action.
   (The launcher already listens for this message — see
   `frontend/src/context/AuthContext.jsx`.)
5. **Map `signin_required` to the popup.** Any API 403 with
   `code: "signin_required"` opens the popup instead of an error banner.
6. **Guest identity is anonymous.** `email` is null, roles/permissions empty.
   Never persist guest `user_id` as a real account; on sign-in the real
   identity replaces it.

## 4. Backend verification pattern

Verify the `blackhole_token` cookie with the shared `JWT_SECRET` (HS256) and
branch on `isGuest`:

```python
claims = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
if claims.get("isGuest") and method_creates_or_mutates:
    return 403, {"error": "Sign in to continue", "code": "signin_required"}
```

Reference implementations already in the ecosystem:

- Python/FastAPI: `bhiv-Hackaverse-main/hackathon/src/pravesh_bridge.py`,
  `bhiv-Infiverse-HR/backend/services/gateway/pravesh_bridge.py`
- Node/Express: `AI-Artha-main/backend/src/middleware/auth.js`
  (`verifyBlackholeToken`)

## 5. Registering a new product

1. Add an entry to `blackhole_auth/backend/data/apps.json`
   (`{ "key", "name", "description", "url", "devUrl"? }`).
2. It appears on the launcher automatically (the dashboard fetches
   `/api/apps`).
3. Implement rules 1–6 above in the product.
