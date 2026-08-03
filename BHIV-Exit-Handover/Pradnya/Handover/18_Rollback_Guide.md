# Rollback Guide — Pradnya / NICAI

## Purpose

Recover from bad deploys or broken changes for NICAI backend (Render), frontend (Vercel), and local data/logs.

---

## Rollback scope

| Layer | Action | Data impact |
|-------|--------|-------------|
| Vercel frontend | Redeploy prior deployment | None |
| Render backend | Rollback to prior deploy | CSV from git unchanged; logs may reset |
| Env vars | Revert `VITE_NICAI_API`, `ALLOWED_ORIGINS` | None |
| Local logs | Delete/truncate `logs/` | Loses audit trail locally only |

---

## Frontend rollback (Vercel)

1. Vercel Dashboard → Project → Deployments
2. Find last known good deployment
3. **Promote to Production**
4. Confirm built with correct `VITE_NICAI_API` (check deployment env snapshot)

If rebuild needed from git:

```bash
git checkout <good-commit>
cd frontend
VITE_NICAI_API=<RENDER_URL> npm run build
# Deploy dist via Vercel CLI or manual upload
```

**Verify:** Dashboard loads; Network tab shows successful `/signals`.

---

## Backend rollback (Render)

1. Render Dashboard → `pradnya-api` → Events / Deploys
2. Rollback to previous successful deploy

Or redeploy from git:

```bash
git checkout <good-commit>
# Push to main triggers deploy, OR manual deploy from Render UI
```

**Verify:**

```bash
curl https://<RENDER_URL>/health
curl https://<RENDER_URL>/signals
```

Known recent good commits:

- `8f8763a` — CORS for production Vercel
- `4b8afa4` — Vercel build fix
- `9f0070e` — Root vercel.json

---

## Environment variable rollback

| Variable | Platform | Restore |
|----------|----------|---------|
| `VITE_NICAI_API` | Vercel | Previous Render URL |
| `ALLOWED_ORIGINS` | Render | Previous origin list |
| `VITE_SAMACHAR_API` / `VITE_MITRA_API` | Vercel | Previous or empty |

After env change: **redeploy both services** (frontend must rebuild for VITE vars).

---

## CSV data rollback

Datasets are in git:

```bash
git checkout <good-commit> -- data/clean_weather.csv data/clean_aqi.csv datasets.json
git commit -m "Restore dataset files"  # if needed
# Redeploy Render
```

---

## Logs rollback

No automated backup. To clear corrupted local logs:

```bash
Remove-Item logs\*.json
# Restart uvicorn — new requests recreate logs
```

Production Render logs — **TODO: Verify** backup/export before destructive ops.

---

## CORS rollback failure

If frontend breaks after CORS change:

1. Render → Environment → set `ALLOWED_ORIGINS` to include:
   - `https://pradnya-bhiv.vercel.app`
   - `http://localhost:5173` (for dev)
2. Save → redeploy backend
3. Hard-refresh browser

---

## Full repo rollback

```bash
git fetch origin
git log --oneline -10
git revert <bad-commit-sha>   # preferred if pushed
```

**Do not force-push `main` without team approval.**

---

## Incident template

```
Subject: NICAI rollback — [date]

Impact: [Vercel UI down / API errors / mock-only data]
Action: Rolled back [Vercel/Render] to [deployment/commit]
Status: [healthy / monitoring]
Root cause: [TBD]
Next: [fix forward]
```

---

## When rollback is insufficient

| Scenario | Action |
|----------|--------|
| Validator logic broken | Revert `validator.py` + redeploy Render |
| Frontend/API contract mismatch | Roll back **both** to matching commit pair |
| Bad CSV committed | Git revert data files + redeploy |

---

## Prevention

1. Tag releases before production promote
2. Run manual smoke tests (`13_Testing_Guide.md`) pre-deploy
3. Staging Vercel preview with branch env vars
4. Keep `ALLOWED_ORIGINS` change in separate deploy from logic changes

---

## Related documents

- `06_Deployment_Guide.md`
- `14_Operations_Runbook.md`
