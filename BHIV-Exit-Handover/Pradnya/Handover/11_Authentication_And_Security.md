# Authentication and Security — Pradnya / NICAI

## Summary

| Control | Status |
|---------|--------|
| User authentication | **Not implemented** |
| API keys / JWT | **None** |
| Role-based access | **None** |
| CORS | **Configured** — explicit allowlist via `ALLOWED_ORIGINS` |
| HTTPS | Enforced by Render/Vercel in production |
| Input validation | **Partial** — signal schema + type checks in validator |
| Rate limiting | **Not implemented** |
| Secrets in repo | **None observed** — no committed `.env` |

**All API endpoints are publicly accessible** to anyone who can reach the server URL.

---

## REST security posture

| Endpoint | Exposure |
|----------|----------|
| GET `/signals`, `/patterns` | Full processed intelligence |
| POST `/nicai/evaluate` | Arbitrary signal evaluation |
| POST `/action` | Writes to action log (simulated) |
| GET `/dashboard` | HTML view of same data |
| GET `/health` | Minimal |

**Risk:** Public Render URL allows unauthenticated reads and action log writes.

---

## CORS

```python
DEFAULT_ORIGINS = "http://localhost:5173,...,https://pradnya-bhiv.vercel.app"
```

Production should set `ALLOWED_ORIGINS` on Render to **only** trusted frontend domains (remove unused localhost entries if desired).

`allow_credentials=True` — ensure origins are explicit, not `*`.

---

## TANTRA compliance (action safety)

NICAI is designed **not to execute** decisions:

- `POST /action` only appends log entry
- Recommendation signals: `eligible_for_escalation`, `requires_review`, `monitor`
- No downstream webhooks or automation in `main.py`

This is a **product design** control, not cryptographic enforcement.

---

## File system security

- Logs written to `logs/` with no access control
- On Render, container filesystem may be readable by platform
- CSV data is public in repo — no PII expected

---

## Frontend security

- `VITE_*` variables exposed in client bundle — never put secrets in `VITE_NICAI_API`
- Samachar/Mitra URLs visible in Settings tab and network requests
- No CSP headers configured in Vite build

---

## SVACS / live integration scripts

`live_integration.py` fetches from hardcoded `http://localhost:8000/perception_log` — dev-only; do not expose perception server without auth.

---

## Recommended hardening

| Priority | Action |
|----------|--------|
| P1 | API key or JWT on POST `/action` and `/nicai/evaluate` |
| P1 | Confirm Render URL not indexed if internal demo only |
| P2 | Rate limit expensive endpoints |
| P2 | Export logs to durable audited store |
| P3 | Sanitize HTML dashboard inputs (currently server-generated from trusted CSV) |

---

## Data classification

Environmental and demo sensor data — **TODO: Verify** if any deployment uses sensitive operational data.

---

## Incident response

If unauthorized action logging detected:

1. Review `logs/action_logs.json` on server (if persisted)
2. Rotate Render deploy / add auth middleware
3. Restrict CORS

No formal runbook in repo.
