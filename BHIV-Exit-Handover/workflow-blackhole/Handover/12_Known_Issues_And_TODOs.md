# Known Issues and TODOs — workflow-blackhole

## Critical / high

| # | Issue | Impact | Workaround |
|---|-------|--------|------------|
| 1 | **Port mismatch** — client defaults localhost **5001**, server **5000** | Local API fails | Set `VITE_API_URL=http://localhost:5000/api` |
| 2 | **No `.env.example`** | Setup friction | Use README + handover docs |
| 3 | **CORS hardcoded** | New domains blocked until code change | Edit `index.js` allowlist |
| 4 | **Monitoring/legal risk** | Screen/keystroke capture | Consent workflow; legal review |
| 5 | **Large attack surface** | 30+ route modules | Audit auth on each route |

---

## Medium

| # | Issue | Details |
|---|-------|---------|
| 6 | **Commented legacy block** in `index.js` (120+ lines) | Confusing for newcomers |
| 7 | **README naming** | Infiverse-BHL vs workflow-blackhole |
| 8 | **npm test placeholder** | `echo Error: no test specified` |
| 9 | **SETU dispatch silent fail** | `.catch(() => {})` on Sampada POST |
| 10 | **Vercel fallback URL** in api.js | Hardcoded Render URL if env missing |
| 11 | **Auto end day disabled** | Users must end day manually; midnight spam job instead |
| 12 | **Historical attendance sync disabled** on startup | Manual admin sync |
| 13 | **niyantran.blackholeinfiverse.com** in CORS | Unclear if still active product shell |

---

## Low

| # | Issue | Details |
|---|-------|---------|
| 14 | React 19 in README vs React 18 in package.json | README drift |
| 15 | Many dev test scripts in server root | Not organized under tests/ |
| 16 | Monolith static serve order | API routes mounted after static — verify API not shadowed (routes registered before static in active code — static is BEFORE routes — **wait**

Looking at index.js again:
- Line 405-411: static files and SPA fallback BEFORE routes at 414+
- This means API routes are registered AFTER the catch-all `app.get(/^\/(?!api).*/` - actually the catch-all is for non-api before routes... Order is:
  1. cors, json
  2. socket
  3. ping, test-browser
  4. static dist
  5. SPA catch-all for non-api
  6. API routes

Wait - if static and catch-all come BEFORE api routes, then `/api/*` might still work because catch-all regex is `^\/(?!api)` - so API paths skip the catch-all. But static middleware `express.static` might serve files first. API routes come after - that's fine for /api paths.

Actually the order issue: catch-all is before API routes - routes like `/api/tasks` won't match catch-all due to negative lookahead. Good.

17 | Dual product branding on Vercel vs niyantran domain |

---

## TODO: Verify

- [ ] Production MongoDB Atlas URI and name
- [ ] Render service name and root directory
- [ ] Vercel project env vars current values
- [ ] What `a291ddf` security fix included
- [ ] Sampada SETU production URL and whether enabled
- [ ] Admin seed credentials process
- [ ] Compliance sign-off for monitoring

---

## Suggested fix order

1. Add `.env.example` for client and server
2. Fix api.js default port to 5000
3. Externalize CORS origins to env
4. Implement real server tests for auth + tantra
5. SETU dispatch logging/metrics
6. README sync with package versions and repo name

---

## Code references

**Port fallback:**

```javascript
// client/src/lib/api.js
API_URL = 'http://localhost:5001/api';  // when localhost without VITE_API_URL
```

**SETU hook:**

```javascript
// server/services/executionEventEmitter.js
dispatchToSampada(created, ...).catch(() => {});
```

**CORS hosts:**

```javascript
// server/index.js ALLOWED_ORIGIN_CONFIG.httpsHosts
```
