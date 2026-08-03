# Rollback Guide — blackhole_auth

**Generated:** 2026-07-05

---

## When to Rollback

- Health check fails persistently
- SSO login broken (cookie not set or JWT validation fails)
- Dashboard cannot load user profile
- CORS errors blocking all API calls
- JWT_SECRET mismatch after deploy
- Auth server incompatibility after upgrade

---

## Rollback Decision Matrix

| Severity | Symptoms | Action |
|----------|----------|--------|
| **Critical** | SSO completely broken, JWT_SECRET leaked | Rollback both client and verify auth server |
| **High** | /api/me fails, dashboard empty | Rollback backend or fix JWT_SECRET |
| **Medium** | App launch broken, UI issues | Rollback frontend or hotfix |
| **Low** | Cosmetic UI issues | Forward fix preferred |

---

## Pre-Rollback Checklist

- [ ] Identify failing component (backend/frontend/auth server)
- [ ] Note current commit SHA: `git log -1 --format="%H %s"`
- [ ] Check if auth server was also deployed (coordinate rollback)
- [ ] Notify stakeholders

---

## Rollback Procedures

### 1. Backend Rollback

1. Open hosting dashboard (TODO: Verify platform)
2. Select previous known-good deploy
3. Rollback / redeploy previous version
4. Verify env vars unchanged (especially `JWT_SECRET`)
5. Test:
```bash
curl https://<backend-url>/api/health
```

---

### 2. Frontend Rollback

1. Open frontend hosting dashboard (TODO: Verify platform)
2. Promote previous deployment to production
3. Verify env vars (`VITE_API_BASE_URL`, `VITE_AUTH_SERVER_URL`)
4. Test SSO flow manually

---

### 3. Git Rollback

```bash
git log --oneline -10
git checkout -b rollback/<date> <previous-commit-sha>
# Deploy rollback branch with approval
```

> Do not force-push to `main` without explicit approval.

---

### 4. JWT_SECRET Rollback

If deploy included JWT_SECRET change:

1. Restore previous secret on **both** auth client backend and auth server
2. Redeploy both services
3. All users must re-login (existing cookies invalid)

**Warning:** Changing JWT_SECRET on only one service breaks all authentication.

---

### 5. Auth Server Rollback (External)

If auth server deploy caused SSO failure:

1. Rollback auth server independently (separate repo/hosting)
2. Verify cookie name still `blackhole_token`
3. Verify postMessage format unchanged
4. Re-test full login flow

> Coordinate with auth server owner — this repo cannot fix auth server issues alone.

---

### 6. CORS Rollback

If `CORS_ORIGINS` change broke frontend:

1. Restore previous `CORS_ORIGINS` value on backend
2. Restart backend service
3. Verify frontend origin allowed

---

## Post-Rollback Verification

```bash
curl https://<backend-url>/api/health
```

Manual:
- [ ] Login popup works
- [ ] /api/me returns user
- [ ] Dashboard displays apps
- [ ] App launch works
- [ ] Logout works

---

## Rollback Communication Template

```
Subject: [ROLLBACK] blackhole_auth (BHIV Core) rolled back

Component: [Backend / Frontend / Auth Server]
Rollback time: [UTC timestamp]
Reason: [Brief description]
Previous deploy: [commit SHA / deploy ID]
JWT_SECRET changed: [Yes/No]
Auth server rolled back: [Yes/No]
Impact: [Users cannot login / etc.]
Next steps: [Investigation plan]
```

---

## Rollback Limitations

| Scenario | Rollback Possible | Notes |
|----------|-------------------|-------|
| Backend code regression | Yes | Redeploy previous version |
| Frontend code regression | Yes | Promote previous deploy |
| JWT_SECRET changed | Partial | Must sync both services; users re-login |
| Auth server breaking change | Requires auth server rollback | External dependency |
| Cookie domain change | Partial | Users must clear cookies and re-login |
| No database | N/A | No data restore needed |

---

## Related Documents

- `Handover/03_Deployment_Guide.md`
- `Handover/17_Deployment_Checklist.md`
- `Handover/11_Troubleshooting.md`
