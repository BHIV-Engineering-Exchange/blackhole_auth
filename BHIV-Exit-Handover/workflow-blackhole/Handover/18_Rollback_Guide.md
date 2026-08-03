# Rollback Guide — workflow-blackhole

---

## Frontend (Vercel)

1. Deployments → select last good → Promote to Production
2. Confirm env: `VITE_API_URL`, `VITE_SOCKET_URL`
3. Hard refresh clients

Rebuild from git:

```bash
git checkout <good-commit>
cd client && npm ci && npm run build
```

---

## Backend (Render)

1. Render → service → Rollback to previous deploy
2. Or redeploy from known good commit (`fbcfa73` pre-SETU if SETU causes issues)

Verify:

```bash
curl https://blackholeworkflow.onrender.com/api/ping
```

---

## Environment rollback

| Variable | Action |
|----------|--------|
| `JWT_SECRET` | Revert only if willing to invalidate all sessions |
| `MONGODB_URI` | Point to backup cluster snapshot |
| `SAMPADA_SETU_*` | Disable with `SAMPADA_SETU_ENABLED=false` |

---

## Database rollback

Atlas point-in-time restore — **TODO: Verify** procedure.

For local dev: drop database and re-register users.

---

## Disable SETU quickly

```env
SAMPADA_SETU_ENABLED=false
```

Redeploy server — local execution events still work; outbound stops.

---

## Tantra subsystem rollback

If execution participation broken after deploy:

1. Roll back `routes/tantraExecution.js`, `executionEventEmitter.js`, `setuDispatcher.js` together
2. Check MongoDB `ExecutionEvent` indexes not corrupted
3. Review `ExecutionRejection` collection for spike

---

## Monolith rollback

If using server-served `client/dist`:

1. Restore previous `client/dist` artifact in deploy bundle
2. Or roll back entire server deploy

---

## Git revert

```bash
git log --oneline -20
git revert <bad-sha>
```

Avoid force-push `main`.

---

## Incident template

```
Subject: workflow-blackhole rollback — [date]

Impact: [login down / attendance / tantra / SETU]
Action: Rolled back [Vercel/Render] to [deploy/commit]
Status: monitoring
Next: root cause
```

---

## Prevention

- Tag releases before Tantra/SETU changes
- Test login + one attendance flow pre-deploy
- Staging Vercel preview with branch env

---

## Related

- `06_Deployment_Guide.md`
- `14_Operations_Runbook.md`
