# Ownership Transfer — AI-Content

**Generated:** 2026-07-05  
**Repository:** https://github.com/blackholeinfiverse64/AI-Content.git

---

## 1. Source Code & Repository

| Item | From | To | Status |
|------|------|----|--------|
| GitHub repository admin access | | | TODO: Verify |
| Branch protection on `main` | | | TODO: Verify |
| CI/CD secrets in GitHub | | | TODO: Verify |
| Collaborator access reviewed | | | TODO: Verify |

---

## 2. Cloud Infrastructure

### Render (Backend)

| Item | Details | Status |
|------|---------|--------|
| Service name | `ai-uploader-agent` | From render.yaml |
| Service URL | https://ai-agent-aff6.onrender.com | From CI/README |
| Admin access transferred | | TODO: Verify |
| Env vars documented | `Handover/05_Environment_Guide.md` | |
| Secrets rotated | | TODO: Critical — render.yaml has hardcoded secrets |

**Required GitHub secrets for CI:**
- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`
- `RENDER_API_KEY`
- `RENDER_PRODUCTION_SERVICE_ID`

### Docker Hub

| Item | Details | Status |
|------|---------|--------|
| Image | `docker.io/ashmitpandey299/ai-uploader-agent` | From CI workflow |
| Admin access transferred | | TODO: Verify |

### Supabase

| Item | Details | Status |
|------|---------|--------|
| Project access transferred | | TODO: Verify |
| DATABASE_URL rotated | | TODO: Critical |
| Storage bucket access | | TODO: Verify |
| JWKS/auth configuration | | TODO: Verify |

### Frontend Hosting

| Item | Details | Status |
|------|---------|--------|
| Production URL | | TODO: Verify — not found in repo |
| Hosting provider | | TODO: Verify |
| Admin access transferred | | TODO: Verify |

---

## 3. Secrets & Credentials (Rotate All)

| Secret | Location | Rotated | Status |
|--------|----------|---------|--------|
| `JWT_SECRET_KEY` | Render env, render.yaml | | TODO: Critical |
| `DATABASE_URL` | Render env, render.yaml | | TODO: Critical |
| `SUPABASE_ANON_KEY` | Render env | | TODO |
| `SUPABASE_DB_PASSWORD` | Render env | | TODO |
| `SENTRY_DSN` | Render env, render.yaml | | TODO |
| `POSTHOG_API_KEY` | Render env, render.yaml | | TODO |
| `PERPLEXITY_API_KEY` | Render secret | | TODO |
| `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` | Render env (if S3) | | TODO |
| `DOCKER_USERNAME` / `DOCKER_PASSWORD` | GitHub secrets | | TODO |
| `RENDER_API_KEY` | GitHub secrets | | TODO |

---

## 4. Third-Party Service Accounts

| Service | Transferred | Status |
|---------|-------------|--------|
| Supabase project | | TODO: Verify |
| Render account | | TODO: Verify |
| Docker Hub | | TODO: Verify |
| Sentry project | | TODO: Verify |
| PostHog project | | TODO: Verify |
| Perplexity API | | TODO: Verify |
| Codecov | | TODO: Verify |

---

## 5. Documentation Handover

| Document | Location | Reviewed |
|----------|----------|----------|
| Exit handover package | `Handover/` (18 files) | |
| Backend README | `backend/README.md` | |
| Frontend docs | `frontend/README.md`, `QUICKSTART.md`, etc. | |
| Bug report | `backend/BACKEND_ERRORS_AND_BUGS.md` | |
| API docs (live) | https://ai-agent-aff6.onrender.com/docs | |

---

## 6. Knowledge Transfer Sessions

Complete all sessions in `Handover/15_Knowledge_Transfer.md`:

- [ ] KT-1 through KT-7 completed
- [ ] All attendees signed off

---

## 7. Final Verification

- [ ] All handover documents reviewed
- [ ] All secrets rotated (especially render.yaml values)
- [ ] Production deployment verified
- [ ] Outgoing team access revoked
- [ ] Testing checklist completed
- [ ] Runtime evidence captured
- [ ] Pending work acknowledged

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing Tech Lead | | | |
| Incoming Tech Lead | | | |
| Outgoing DevOps | | | |
| Incoming DevOps | | | |
| Product Owner | | | |

---

## Post-Transfer Support

| Item | Details |
|------|---------|
| Support period | TODO: Verify |
| Support contact | TODO: Verify |
| Known issues at transfer | `Handover/10_Known_Issues.md` |
