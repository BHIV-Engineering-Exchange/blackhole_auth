# Pending Work — AI-Artha

**Generated:** 2026-07-05  
**Status:** Items identified from codebase analysis — not an official backlog

---

## High Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 1 | **Fix frontend/backend API path mismatches** | `frontend/src/services/index.js` | Settings, GST, TDS, reports, change-password paths don't match backend |
| 2 | **Fix trace route ordering bug** | `backend/src/routes/trace.routes.js` | `GET /search` registered after `GET /:traceId` |
| 3 | **Add missing Jest test files or update CI** | `backend/jest.config.js`, `backend/package.json` | CI runs `npm test` but test files may be missing |
| 4 | **Rotate committed example credentials** | `backend/.env.production.example` | Contains example MongoDB URI and Redis password |
| 5 | **Verify production deployment URLs** | `backend/.env.production.example` | Confirm Render/Vercel endpoints are live |

---

## Medium Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 6 | **Implement JWT refresh token flow** | `User.js` has `refreshToken` field; README mentions refresh | No `/auth/refresh` endpoint in `server.js` |
| 7 | **Update README API documentation** | `README.md` | References `/auth/register`, refresh tokens — use `/auth/signup` |
| 8 | **Add frontend CI pipeline** | `.github/workflows/ci.yml` | Only backend lint + test in CI |
| 9 | **Remove hardcoded Redis fallback credentials** | `backend/src/config/redis.js` | Fallback when env unset |
| 10 | **Resolve duplicate ledger route registrations** | `ledger.routes.js` | Duplicate `GET /verify-chain` handlers |
| 11 | **Add `frontend/.env.example`** | Missing from repo | Only `start_readme/frontend.env.template` exists |
| 12 | **GST summary empty returns array** | `gstFiling.service.js` TODO | Documented in `docs/DASHBOARD_TRUTH_PROOF.md` |

---

## Low Priority / Enhancements

| # | Item | Source | Notes |
|---|------|--------|-------|
| 13 | **Formal database migration framework** | Ad-hoc scripts only | Consider migrate-mongo or similar |
| 14 | **Add E2E tests (Playwright/Cypress)** | No E2E framework found | Critical accounting flows untested end-to-end |
| 15 | **Mount or remove legacy router** | `backend/src/routes/index.js` | Not mounted in `server.js` |
| 16 | **Add nginx config to repo** | `deploy-prod.sh` creates at deploy | Not version-controlled |
| 17 | **Implement `/reports/aged-payables`** | Frontend service call | Backend route missing |
| 18 | **Implement `/users/:id/change-password`** | Frontend service call | Backend route missing |
| 19 | **Add scheduled backup automation** | `scripts/backup.sh` | TODO: Verify cron/scheduler config |
| 20 | **Verify `dev` branch CI workflow** | `.github/workflows/ci.yml` | References `dev` branch — verify exists on remote |

---

## Documentation Updates Needed

| # | Item | File |
|---|------|------|
| 21 | Align `docs/API-ENDPOINTS.md` with actual routes | `docs/API-ENDPOINTS.md` |
| 22 | Update DEPLOYMENT.md path reference | README references `DEPLOYMENT.md` at root; actual file is `docs/DEPLOYMENT.md` |
| 23 | Verify Adminer reference | README mentions Adminer at `:8080` — TODO: Verify in docker-compose |

---

## Governance / Proof Work

| # | Item | Command |
|---|------|---------|
| 24 | Run full governance pipeline before handover | `cd backend && npm run governance:full` |
| 25 | Generate fresh runtime evidence | `npm run proof:all` |
| 26 | Run independent verification | `npm run verify:all` |
| 27 | Generate CI evidence bundle | `npm run evidence:full` |

---

## Signup / Role Default

| # | Item | Notes |
|---|------|-------|
| 28 | **Review default signup role** | New users get `viewer` role — limited UI access until admin upgrades role |

---

## Items Marked TODO: Verify

- Whether `dev` branch exists on GitHub remote
- Current live status of https://ai-artha.onrender.com and https://ai-artha.vercel.app
- Whether Jest test files exist under `backend/tests/` (referenced in package.json but may be absent)
- Scheduled backup configuration in production
- Vercel deployment configuration file presence
- Adminer service in docker-compose.dev.yml
