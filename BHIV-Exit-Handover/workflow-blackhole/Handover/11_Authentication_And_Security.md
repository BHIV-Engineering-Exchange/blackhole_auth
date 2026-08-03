# Authentication and Security — workflow-blackhole

## Summary

| Control | Status |
|---------|--------|
| User JWT auth | **Implemented** (`x-auth-token`) |
| Password hashing | bcryptjs |
| Admin middleware | **Implemented** |
| Tantra execution auth | **Separate** — contract keys + governance headers |
| CORS | **Allowlist** (not open `*`) |
| Rate limiting | **Not observed** in index.js |
| HTTPS | Production platform default |

---

## User authentication

- Login via `/api/auth/login` → JWT stored client-side as `WorkflowToken`
- Protected routes use `auth` middleware
- Admin routes add `adminAuth`

**Risks:**
- JWT secret strength depends on `JWT_SECRET` env
- Token in localStorage — XSS could exfiltrate

---

## Tantra / execution security

Separate from user JWT:

- `executionAuth` validates execution contract / keys
- `traceContinuity` enforces trace chain
- `enforceGovernance` — deny/block decisions → HTTP 423
- `enforceTenantIsolation` — tenant scoping
- SHA-256 event hashing — tamper detection

Governance headers whitelisted in CORS (signature, policy, authority, route).

---

## CORS

Allowed HTTPS hosts (hardcoded):

- `niyantran.blackholeinfiverse.com`
- `blackhole-workflow.vercel.app`

Dev: `http://localhost:5173`

Requests without `Origin` allowed (server-to-server).

To add domains: edit `ALLOWED_ORIGIN_CONFIG` in `index.js`.

---

## Employee monitoring & privacy

Features with high compliance impact:

- Screen capture + OCR
- Keystroke / mouse EMS signals
- Website monitoring
- Geolocation on attendance

**Mitigations in repo:**
- `Consent` model and `/api/consent` routes
- `ComplianceAuditLog`, `AuditLog`

**TODO: Verify** — legal basis, employee notice, data retention policy.

---

## SETU outbound

`setuDispatcher.js` uses Bearer token to Sampada. Failures swallowed in emitter (`.catch(() => {})`) — no retry queue documented.

---

## Secrets management

README lists many env secrets (AI keys, Cloudinary, VAPID, email). Never commit `.env`.

Recent commit `a291ddf` — "Fixing security lapse" — **TODO: Verify** what was fixed.

---

## Socket.IO

CORS limited to same origin list. Join rooms without strong auth check on room names — **TODO: Verify** server-side room authorization.

---

## Recommended hardening

| Priority | Action |
|----------|--------|
| P0 | Rotate JWT and API keys if ever committed |
| P1 | Rate limit login and file upload endpoints |
| P1 | Audit monitoring data access (admin only) |
| P2 | Move CORS allowlist to env var for ops |
| P2 | HttpOnly cookie option for tokens (breaking change) |
| P3 | SETU dispatch retry/dead-letter logging |

---

## Incident response

If JWT secret leaked: rotate secret, invalidate sessions (no global revoke endpoint documented — may require DB token version bump **TODO: Verify**).
