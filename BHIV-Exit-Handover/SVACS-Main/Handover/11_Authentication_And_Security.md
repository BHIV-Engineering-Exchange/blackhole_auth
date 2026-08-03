# Authentication and Security — SVACS-Main

## Summary

| Control | Status |
|---------|--------|
| User authentication | **Not implemented** |
| API keys / JWT | **None** |
| Sarathi tokens | **In-pipeline** validation tokens (orchestration), not HTTP auth |
| Flask CORS | Configurable via `ALLOWED_ORIGINS` |
| FastAPI CORS | **`allow_origins=["*"]`** — fully open |
| HTTPS | Render/Vercel default |
| Rate limiting | **Not implemented** |

---

## Flask dashboard API

- Public read endpoints for dashboard, telemetry, rejections, metrics, replay
- CORS restricted to `ALLOWED_ORIGINS` (defaults localhost only)
- **Production gap:** Vercel origin may be blocked until `ALLOWED_ORIGINS` updated on Render

---

## FastAPI runtime API

- Open CORS `*`
- All routes public if exposed to internet
- Not deployed on Render by default — lower exposure unless manually hosted

---

## In-pipeline token governance

`orchestration/live_pipeline.py` uses:

- `sarathi/token_manager.py` — `generate_token`, `validate_token`
- `rajya/rajya_validator.py` — policy validation
- Denials logged to `storage/denials/denial_logs.json`

This is **application-level execution governance**, not operator login.

---

## External bucket

`full_operational_chain.py` POSTs artifacts to `bhiv-bucket.onrender.com` without documented API keys in repo.

**TODO: Verify** — bucket authentication requirements.

---

## Frontend

- No secrets in VITE vars should be used for credentials (all public in bundle)
- Mock data contains synthetic vessel IDs — no real classified data assumed

---

## Storage sensitivity

Repo contains extensive proof logs and validation reports — treat as **demo/synthetic** unless verified otherwise.

---

## Recommended hardening

| Priority | Action |
|----------|--------|
| P1 | Add Vercel URL to Flask CORS; remove `*` from FastAPI if deployed |
| P1 | API key or JWT on write paths (pipeline triggers if exposed) |
| P2 | Do not expose FastAPI publicly without auth |
| P2 | Audit bucket upload permissions |
| P3 | Rate limit Render free tier endpoints |

---

## Incident response

If public Render URL abused:

1. Restrict CORS and network access
2. Review `storage/denials/` and telemetry for anomalies
3. Rotate Render deploy credentials (platform-level)

No formal runbook in repo.
