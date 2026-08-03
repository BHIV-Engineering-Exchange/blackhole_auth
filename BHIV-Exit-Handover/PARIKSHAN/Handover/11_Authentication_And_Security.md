# Authentication and Security — PARIKSHAN / NIYANTRAN V1

## Summary

| Control | Status |
|---------|--------|
| User authentication | **Not implemented** |
| API keys / JWT | **None** |
| Role-based access | **None** |
| Socket.IO auth | **None** |
| CORS | **Permissive** (allows all origins — verify in `server.js`) |
| HTTPS | Deployment concern — not enforced in app code |
| Input validation | Partial — action payload validated in `actionService` |
| Rate limiting | **Not implemented** |
| Secrets in repo | **None observed** — no `.env` committed |

**All REST and Socket endpoints are publicly accessible** to anyone who can reach the server URL.

---

## REST security posture

- `GET /niyantran/overview` — exposes full operational state
- `POST /niyantran/action` — any client can assign, escalate, ping, or resolve
- `GET /health` — minimal exposure (acceptable for probes)

**Risk:** In production without network isolation, unauthorized users could read telemetry and trigger operator actions.

---

## Socket.IO security posture

- No token check on connection
- All connected clients receive every `niyantran:update` broadcast
- No room-based isolation per tenant or role

---

## MongoDB security

- Default URI targets localhost — safe for dev if MongoDB is not exposed
- Production must use authenticated Atlas URI with IP allowlist
- **TODO: Verify** — production connection string storage (platform env vars)

---

## Frontend security

- No stored credentials
- `VITE_*` vars are embedded in client bundle — do not put secrets in `VITE_API_BASE_URL`
- XSS: standard React escaping; audit any `dangerouslySetInnerHTML` if added later

---

## CORS

Backend uses open CORS configuration suitable for local dev. **Before public production:**

1. Restrict `origin` to dashboard domain only
2. Disable credentials unless required

---

## Recommended hardening (not in repo)

| Priority | Action |
|----------|--------|
| P0 | Place API behind VPN or auth gateway |
| P0 | Add JWT or session auth on REST + socket handshake |
| P1 | Restrict CORS to known frontend origin |
| P1 | Rate limit POST `/niyantran/action` |
| P2 | Audit log export for `actionlogs` |
| P2 | TLS termination at reverse proxy |

---

## Compliance / data classification

**TODO: Verify** — whether entity metadata or alert messages contain PII and applicable retention policies.

---

## Incident response

If API is exposed publicly without auth:

1. Restrict network access immediately (firewall / take service offline)
2. Review `actionlogs` for unauthorized actions
3. Deploy auth middleware before re-exposing

No runbook exists in repo — this section is advisory.
