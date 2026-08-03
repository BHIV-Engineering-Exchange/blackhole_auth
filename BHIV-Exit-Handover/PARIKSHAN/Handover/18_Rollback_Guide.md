# Rollback Guide — PARIKSHAN / NIYANTRAN V1

## Purpose

Steps to recover from a bad deploy or broken change for NIYANTRAN backend, frontend, and MongoDB data.

**TODO: Verify** — production hosting platform-specific rollback UI (Render, Vercel, etc.).

---

## Rollback scope matrix

| Layer | What rolls back | Data preserved? |
|-------|-----------------|-----------------|
| Frontend static | Previous `dist/` or prior deploy | N/A |
| Backend Node | Previous git commit / deploy image | MongoDB unchanged |
| MongoDB | Restore from backup or drop/re-seed | Depends on action |
| Environment vars | Revert to prior values | N/A |

---

## Frontend rollback

### If using static host (Vercel/Netlify/etc.)

1. Open hosting dashboard → Deployments
2. Select last known good deployment
3. Promote / rollback to that deployment
4. Confirm `VITE_API_BASE_URL` in that build points to correct backend

### If serving from git `dist/`

1. `git checkout <good-commit> -- frontend/dist`
2. Redeploy static files
3. Or rebuild from good tag:
   ```bash
   git checkout <good-tag>
   cd frontend
   VITE_API_BASE_URL=<API_URL> npm run build
   # Upload dist/
   ```

### Verify

- Dashboard loads
- Overview API call succeeds
- WebSocket connects

---

## Backend rollback

### Git-based deploy

```bash
git checkout <good-commit>
cd backend
npm install --production
npm start
```

Or use platform rollback to previous release.

### Verify

```bash
curl https://<API>/health
curl https://<API>/niyantran/overview
```

Watch logs for MongoDB connection success and stream start.

---

## Environment variable rollback

If a deploy failed due to wrong env:

| Variable | Restore to |
|----------|------------|
| `MONGODB_URI` | Last known good connection string |
| `PORT` | Platform default or 4000 |
| `VITE_API_BASE_URL` | Matching backend URL (frontend build) |

Restart backend after env change.

---

## MongoDB rollback

### Option A — Restore from backup (production)

**TODO: Verify** — Atlas point-in-time restore or `mongorestore` procedure.

1. Identify backup timestamp before incident
2. Restore to new cluster or overwrite (with approval)
3. Point `MONGODB_URI` to restored database
4. Restart backend

### Option B — Re-seed (local / dev only)

**Destructive — not for production without approval**

```javascript
use bhiv-niyantran
db.entities.drop()
db.alerts.drop()
db.actionlogs.drop()
```

Restart backend → `ensureSeedData()` repopulates demo entities.

### Option C — Partial fix

If only alerts corrupted:

```javascript
db.alerts.deleteMany({ status: "active" })
```

Restart backend; alert engine recreates from entity state over time.

---

## Socket / realtime rollback

If WebSocket breaks after deploy but REST works:

1. Roll back backend to prior version
2. Check reverse proxy WebSocket config (`Upgrade`, `Connection` headers)
3. Confirm client `VITE_API_BASE_URL` uses `wss://` when page is `https://`

---

## Code rollback (full repo)

```bash
git fetch origin
git log --oneline -10          # identify good commit
git checkout main
git revert <bad-commit-sha>    # preferred if already pushed
# OR
git reset --hard <good-commit> # local only — coordinate if shared branch
```

**Do not force-push `main` without team approval.**

Known good commits at handover:

- `933032a` — saved (latest)
- `92f7ae3` — first commit

---

## Incident communication template

```
Subject: NIYANTRAN rollback — [date]

Impact: [dashboard down / stale data / actions failing]
Action: Rolled back [frontend/backend/DB] to [version/commit/time]
Current status: [healthy / monitoring]
Root cause: [TBD]
Next steps: [fix forward plan]
```

---

## When rollback is not enough

| Scenario | Action |
|----------|--------|
| Schema incompatible | Restore MongoDB + matching backend version together |
| Secret leaked | Rotate MongoDB password; redeploy with new URI |
| Mock stream runaway | Stop backend; fix `niyantranStream.js`; redeploy |

---

## Prevention

1. Tag releases before deploy
2. Keep MongoDB automated backups
3. Run manual smoke tests (`13_Testing_Guide.md`) before promote
4. Staging environment with copy of schema — **TODO: Verify** if exists

---

## Related documents

- `06_Deployment_Guide.md`
- `14_Operations_Runbook.md`
- `13_Testing_Guide.md`
