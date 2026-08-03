# Third-Party Services — SVACS-Main

## Render

| Attribute | Value |
|-----------|-------|
| Service | `svacs-backend` |
| Config | `render.yaml` |
| Runtime | Python 3.11.9, gunicorn, Flask |
| Plan | free (cold starts) |

**URL:** **TODO: Verify**

---

## Vercel

| Attribute | Value |
|-----------|-------|
| Config | `vercel.json` (SPA rewrites) |
| Build | `npm run build` → `dist/` |
| Framework | Vite React |

**URL:** **TODO: Verify**

---

## BHIV Bucket

| Attribute | Value |
|-----------|-------|
| Base | `https://bhiv-bucket.onrender.com` |
| Endpoints | `/bucket/latest-hash`, `/bucket/artifact` |
| Used by | `full_operational_chain.py` |

**TODO: Verify** — ownership, auth, SLA.

---

## GitHub

| Attribute | Value |
|-----------|-------|
| Remote | https://github.com/blackholeinfiverse64/SVACS-Main.git |
| Branch | `main` |

---

## NICAI / Pradnya (integration)

| Attribute | Value |
|-----------|-------|
| Repo | Pradnya |
| Files | `svacs_adapter.py`, `pipeline.py`, `live_integration.py` |
| Direction | SVACS perception → NICAI signals |

Not a hosted dependency — integration is code-level across repos.

---

## Jane's Fighting Ships (grounding)

Knowledge ingestion via `external_grounding/janes_ingestion_pipeline.py` — PDF → structured corpus (demo pipeline).

No external SaaS API documented in code.

---

## npm / PyPI

Standard public registries only.

---

## Accounts checklist

- [ ] GitHub SVACS-Main access
- [ ] Render `svacs-backend` admin
- [ ] Vercel project admin
- [ ] bhiv-bucket admin
- [ ] **TODO: Verify** Jane's content licensing for production use

---

## Not used

- MongoDB / PostgreSQL
- Auth0 / Firebase
- AWS S3 (unless bucket service abstracts it)
- GitHub Actions CI (**TODO: Verify** if added externally)

---

## Cost

Free Render + Vercel tiers likely sufficient for demo — **TODO: Verify** production billing.
