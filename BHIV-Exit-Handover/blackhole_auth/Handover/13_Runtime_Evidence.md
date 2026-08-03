# Runtime Evidence — blackhole_auth

**Generated:** 2026-07-05  
**Purpose:** Placeholder and reference guide for runtime proof artifacts

---

## How to Generate Fresh Runtime Evidence

### 1. Backend Health

```bash
cd backend && npm run dev

curl -s http://localhost:8080/api/health
```

Expected:
```json
{"status":"ok"}
```

### 2. Unauthenticated /api/me

```bash
curl -s http://localhost:8080/api/me
```

Expected: 401 with `"error":"Not authenticated"`

### 3. Authenticated /api/me

After completing login in browser:

```bash
# Copy blackhole_token from browser DevTools → Cookies
curl -s http://localhost:8080/api/me -H "Cookie: blackhole_token=<token>"
```

Expected: 200 with user object including `email`, `roles`, `allowedApps`.

### 4. Auth Server Reachability

```bash
curl -I https://bhiv-auth.onrender.com
```

> TODO: Verify expected response.

### 5. Frontend Build

```bash
cd frontend
npm run build
ls dist/
```

---

## Artifacts to Capture for Sign-Off

| Artifact | How | Save To |
|----------|-----|---------|
| Health check output | curl | `review_packets/` |
| Login page screenshot | Browser | `Screenshots/` |
| Auth popup iframe screenshot | Browser | `Screenshots/` |
| Dashboard with apps screenshot | Browser | `Screenshots/` |
| /api/me response (sanitized) | curl or DevTools | `review_packets/` |
| Cookie inspection screenshot | DevTools | `Screenshots/` |
| Walkthrough video | Screen recording | `Videos/` |

See `Screenshots/README.md` for recommended captures.

---

## Production Verification

> TODO: Verify production URLs before running.

```bash
curl -s https://<backend-url>/api/health
curl -I https://products.blackholeinfiverse.com
curl -I https://bhiv-auth.onrender.com
```

Manual checklist:
- [ ] Welcome page loads
- [ ] Login popup opens and completes
- [ ] Dashboard shows user email
- [ ] Allowed apps clickable
- [ ] Disallowed apps show "No Access"
- [ ] Logout works

---

## Log Locations

| Environment | Where |
|-------------|-------|
| Local backend | Terminal stdout (`Auth-client server listening on port 8080`) |
| Production backend | TODO: Verify hosting platform logs |
| Frontend | Browser console (postMessage, API errors) |

---

## TODO: Verify

- [ ] Production URLs
- [ ] Auth server health endpoint
- [ ] Sample JWT payload structure from live login
