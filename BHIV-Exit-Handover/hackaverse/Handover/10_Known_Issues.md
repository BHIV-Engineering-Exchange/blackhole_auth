# Known Issues — hackaverse

**Generated:** 2026-07-05  
**Sources:** `CURRENT_PROJECT_STATUS.md`, codebase, `DEPLOYMENT_NOTES.md`

Severity: 🔴 Critical | 🟠 High | 🟡 Medium | 🔵 Low

---

## 🔴 Critical

### 1. Admin and Judge Invisible in Production

**Source:** `CURRENT_PROJECT_STATUS.md`

Self-registration always sets `role: "participant"`. No admin API exists to promote users. Production MongoDB likely has no admin/judge users unless `seed_data.py` was run manually.

**Impact:** Only participant UI visible after deploy.

---

### 2. Conflicting Production Backend URLs

| Document | URL |
|----------|-----|
| `review_packets/REVIEW_PACKET.md` | `https://hackaverse.blackholeinfiverse.com` |
| `DEPLOYMENT_NOTES.md` | `https://ai-agent-x2iw.onrender.com` |
| `frontend/.env.example` | `https://ai-agent-x2iw.onrender.com` |

**Action:** Verify canonical URL and update all docs/env examples.

---

### 3. Judge Onboarding Broken

**Source:** `CURRENT_PROJECT_STATUS.md`

- Judge invitation accept sets role but **does not create login credentials**
- Judge APIs check separate `judges` collection with field mismatches
- Collection not seeded in production

---

## 🟠 High

### 4. Role Not in JWT

JWT contains `user_id`, `email`, `iat`, `exp` only — no `role` claim.

Frontend stores role in `localStorage` at login and never refreshes from `/auth/me` on app init.

---

### 5. No Admin Role Assignment Endpoint

`auth_routes.py` comment says admin assigns roles — **no such endpoint exists**.

---

### 6. Dev/Prod Shared MongoDB

`DEPLOYMENT_NOTES.md`: "dev and prod share the same MongoDB cluster."

Risk of test data in production and accidental data loss.

---

### 7. Deprecated apiClient.js Still Present

Duplicate axios instance without `/api/v1`, token refresh, or trace_id capture.

Console deprecation warning on import.

---

### 8. Cron Job Placeholder URL

`render.yaml` cron points to `YOUR_APP_ON_RENDER.onrender.com` — not configured.

---

## 🟡 Medium

### 9. No CI/CD

No GitHub Actions. Deploy on git push without automated test gate.

---

### 10. Render Free Tier Cold Starts

30–60 second delay after sleep. Frontend has 30s timeout but UX still affected.

---

### 11. Duplicate Documentation

50+ markdown files at root plus duplicate `Hackaverse/` subfolder — hard to maintain.

---

### 12. BHIV_CORE_URL Placeholder

`render.yaml`: `https://placeholder-core-url.com`

---

### 13. CSRF + API Key Complexity

Multiple auth layers (JWT, API key, CSRF, optional HMAC signature) — easy to misconfigure.

---

### 14. Legacy Base64 Token Support Mentioned

`auth.py` comment references legacy base64 tokens — may cause confusion; PyJWT is preferred.

---

### 15. WebSocket Auth Not Verified

Review packet lists WebSocket endpoint without confirmed JWT handshake auth.

---

## 🔵 Low

### 16. Streamlit in requirements.txt

Likely unused in production API path.

---

### 17. firebase-admin in requirements

TODO: Verify if Firebase is actively used.

---

### 18. Mock API Server in Frontend

`server.js` + `VITE_USE_MOCK_API` — ensure disabled in production.

---

### 19. Package Version Mismatch in Docs

Frontend `.env.example` says `VITE_APP_VERSION=2.0.0`, package.json says `0.0.0`.

---

## Issue Summary

| # | Issue | Severity |
|---|-------|----------|
| 1 | Admin/judge invisible in prod | 🔴 |
| 2 | Conflicting backend URLs | 🔴 |
| 3 | Judge onboarding broken | 🔴 |
| 4 | Role not in JWT / stale localStorage | 🟠 |
| 5 | No admin role assignment API | 🟠 |
| 6 | Shared dev/prod MongoDB | 🟠 |
| 7 | Deprecated apiClient.js | 🟠 |
| 8 | Cron placeholder URL | 🟠 |
| 9 | No CI/CD | 🟡 |
| 10 | Cold starts | 🟡 |
| 11 | Duplicate docs | 🟡 |
| 12 | BHIV_CORE_URL placeholder | 🟡 |
| 13 | Complex auth layers | 🟡 |
| 14 | Legacy token comments | 🟡 |
| 15 | WebSocket auth unverified | 🟡 |
