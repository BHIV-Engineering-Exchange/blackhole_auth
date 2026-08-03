# Rollback Guide — SVACS-Main

---

## Scope

| Layer | Rollback method | Notes |
|-------|-----------------|-------|
| Vercel frontend | Redeploy prior deployment | `dist/` from older commit |
| Render Flask API | Render rollback | Python + storage in image |
| Storage JSON | Git checkout files | Proofs in repo |
| FastAPI (if self-hosted) | Redeploy prior version | Separate from Render default |

---

## Vercel rollback

1. Vercel → Deployments → select last good build → Promote
2. Confirm env vars snapshot (especially `VITE_USE_MOCK`, API URLs)
3. Hard-refresh browser

Rebuild from git if needed:

```bash
git checkout <good-commit>
npm ci
npm run build
```

Known good commits for UI: `be9ad1a` (grid layout), `5aefb9a` (TS fixes).

---

## Render rollback

1. Render Dashboard → `svacs-backend` → Rollback deploy
2. Or redeploy from git tag/commit

Verify:

```bash
curl https://<RENDER>/health
curl https://<RENDER>/api/dashboard
```

Deploy introduced in `f3c4d0b`.

---

## Environment rollback

| Variable | Platform | Action |
|----------|----------|--------|
| `ALLOWED_ORIGINS` | Render | Restore previous origin list |
| `VITE_*` | Vercel | Restore prior API URLs |
| `VITE_USE_MOCK` | Vercel | Restore mock/live setting |

Redeploy both after env changes.

---

## Storage / data rollback

Committed proofs:

```bash
git checkout <good-commit> -- storage/ runtime/ validation_reports/
```

Runtime-appended logs only on server — may be lost on Render redeploy unless backed up.

---

## Full repo rollback

```bash
git log --oneline -15
git revert <bad-sha>   # preferred if pushed
```

Avoid force-push to `main` without approval.

---

## Frontend break (TypeScript)

If build fails after merge:

```bash
git checkout 5aefb9a -- src/
npm run typecheck
```

Compare diff; re-apply safe changes.

---

## Backend break (Flask)

If API 500 after deploy:

1. Check Render logs for JSON parse errors in storage files
2. Rollback to prior deploy
3. Validate `storage/dashboard/dashboard_payloads.json` line format

---

## Bucket chain failures

If `full_operational_chain.py` fails on bucket step:

- Pipeline may still complete locally
- Roll back bucket URL changes in script
- Verify bhiv-bucket service separately

---

## Incident template

```
Subject: SVACS rollback — [date]

Impact: [UI down / API empty / pipeline fail]
Action: Rolled back [Vercel/Render] to [deployment/commit]
Status: [monitoring]
Next: [root cause / fix forward]
```

---

## Prevention

1. Run `npm run build` and `pytest` before merge to main
2. Tag stable demo releases
3. Keep storage proof JSON in git for empty-state fallback
4. Document env vars per deployment

---

## Related

- `06_Deployment_Guide.md`
- `14_Operations_Runbook.md`
