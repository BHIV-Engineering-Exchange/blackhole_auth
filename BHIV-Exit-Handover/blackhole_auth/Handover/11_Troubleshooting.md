# Troubleshooting — blackhole_auth

**Generated:** 2026-07-05

---

## Backend Startup Issues

### Missing JWT_SECRET

**Error:** `Missing required environment variable: JWT_SECRET`

**Fix:**
```bash
cd backend
cp .env.example .env
# Edit .env — set JWT_SECRET (must match auth server)
npm run dev
```

---

### Port Already in Use

**Error:** `EADDRINUSE :::8080`

**Fix:** Set `PORT=8081` in `.env` and update `frontend/.env`:
```env
VITE_API_BASE_URL=http://localhost:8081
```

---

## Authentication Issues

### /api/me Always Returns 401

**Causes:**
1. No `blackhole_token` cookie set
2. `JWT_SECRET` mismatch between client and auth server
3. Expired JWT
4. Cookie not sent (missing `withCredentials`)

**Fix:**
1. Complete login via popup iframe first
2. Verify `JWT_SECRET` matches auth server exactly
3. Check browser DevTools → Application → Cookies for `blackhole_token`
4. Verify Axios client has `withCredentials: true` (already set in `client.js`)

---

### Login Popup Completes But Dashboard Empty

**Cause:** Auth server did not post `blackhole-auth-success` message, or origin mismatch.

**Fix:**
1. Check browser console for postMessage errors
2. Verify `VITE_AUTH_SERVER_URL` matches iframe origin exactly
3. Check auth server sends: `postMessage({ type: "blackhole-auth-success" }, origin)`

---

### Cookie Not Set After Login

**Cause:** Cross-origin cookie restrictions (SameSite, Secure, domain).

**Fix:**
1. In production, ensure auth server sets cookie with correct `Domain=.blackholeinfiverse.com`
2. Both frontend and auth server must use HTTPS in production
3. `SameSite=None; Secure` may be required for iframe login

> TODO: Verify auth server cookie configuration.

---

### Invalid Token After Deploy

**Cause:** `JWT_SECRET` changed on one service but not the other.

**Fix:** Update both auth server and auth client with same secret. Users must re-login.

---

## Frontend Issues

### CORS Error on /api/me

**Error:** `Origin not allowed by CORS`

**Fix:**
1. Add frontend origin to backend `CORS_ORIGINS`:
   ```env
   CORS_ORIGINS=http://localhost:5173,https://products.blackholeinfiverse.com
   ```
2. Restart backend after env change

---

### API Calls Go to Wrong URL

**Cause:** `VITE_API_BASE_URL` misconfigured.

**Fix:** Check `frontend/src/api/client.js` logic:
- Dev + blackholeinfiverse.com URL → falls back to `localhost:8080`
- Set explicitly: `VITE_API_BASE_URL=http://localhost:8080`

---

### Redirect Loop on /login

**Cause:** Cookie present but invalid — `/api/me` fails, user sent to login, cookie still present.

**Fix:** Clear browser cookies for localhost and auth server domain. Re-login.

---

## Dashboard Issues

### All Apps Show "No Access"

**Cause:** JWT `allowedApps` claim empty or doesn't match app keys.

**Fix:**
1. Check `/api/me` response — inspect `user.allowedApps`
2. Verify auth server assigns correct app keys (`setu`, `sampada`, etc.)
3. Keys are case-sensitive — compared lowercase in dashboard

---

### App Launch Does Nothing

**Cause:** `app.url` unreachable or blocked.

**Fix:** Verify product URLs in `apps.js` are live. Check browser network tab.

---

## Production Issues

### SSO Broken After Domain Change

**Fix:** Update `CORS_ORIGINS`, `VITE_API_BASE_URL`, auth server redirect URLs, and cookie domain.

---

## Quick Diagnostic Commands

```bash
# Backend health
curl http://localhost:8080/api/health

# /api/me without cookie (expect 401)
curl http://localhost:8080/api/me

# /api/me with cookie
curl http://localhost:8080/api/me -H "Cookie: blackhole_token=<token>"

# Frontend build
cd frontend && npm run build
```

---

## TODO: Verify

- [ ] Auth server troubleshooting docs
- [ ] Production cookie configuration
- [ ] Common iframe/CORS issues on Render/Vercel
