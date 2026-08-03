# Pending Work — blackhole_auth

**Generated:** 2026-07-05

---

## Critical Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 1 | **Verify `.env` not committed to git** | `backend/.env` | Contains JWT_SECRET; no `.gitignore` found |
| 2 | **Sync JWT_SECRET with auth server** | `env.js` | Mismatch breaks all authentication |
| 3 | **Verify production deployment** | No deploy config | URLs unknown |

---

## High Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 4 | **Fix stale `.env.example`** | `backend/.env.example` | Lists MONGO_URI, bhiv_token — not used in code |
| 5 | **Fix cookie name documentation** | `.env.example` vs `blackholeAuth.js` | Code uses `blackhole_token`, example says `bhiv_token` |
| 6 | **Add deployment configuration** | Repo root | No render.yaml, vercel.json, or Dockerfile |
| 7 | **Add root README** | Repo root | No documentation for new developers |
| 8 | **Add `.gitignore`** | Repo root | Prevent .env and node_modules commits |

---

## Medium Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 9 | **Use `requireApp` on backend routes** | `blackholeAuth.js` | Exported but unused — app access only enforced client-side |
| 10 | **Add Vite dev proxy** | `vite.config.js` | No proxy config; client.js has custom localhost fallback logic |
| 11 | **Add CI/CD pipeline** | No `.github/workflows/` | No test/lint gate before deploy |
| 12 | **Add automated tests** | No test files | API + auth flow tests needed |
| 13 | **Document auth server repo** | External dependency | Successor needs bhiv-auth handover |
| 14 | **Move app catalog to config** | `apps.js` | Hardcoded URLs require redeploy to add apps |

---

## Low Priority / Enhancements

| # | Item | Notes |
|---|------|-------|
| 15 | Add frontend `.env.example` | Only `.env` exists |
| 16 | Add health check to frontend | No frontend health indicator |
| 17 | Add error boundary in React | Unhandled errors may blank screen |
| 18 | Add loading state on app launch | Partial — launchingKey state exists |
| 19 | Add admin UI for app assignment | Currently managed on auth server |
| 20 | Add refresh token / session renewal | Cookie expiry handled by auth server only |
| 21 | Add monitoring (Sentry, uptime) | No error tracking configured |

---

## Documentation Updates

| # | Item | File |
|---|------|------|
| 22 | Align `.env.example` with actual vars | `backend/.env.example` |
| 23 | Document auth server integration contract | New doc or README |
| 24 | Document cookie requirements for production | Deployment guide |

---

## Cross-Repo Dependencies

| Dependency | Action |
|------------|--------|
| `bhiv-auth.onrender.com` | Needs its own handover package |
| Product apps (Setu, etc.) | Each may need separate SSO integration docs |
| Shared `JWT_SECRET` | Must be coordinated across repos |

See `Handover/10_Known_Issues.md` for full issue details.
