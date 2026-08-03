# Handover Checklist — SVACS-Main

---

## Documentation

- [ ] Read `Handover/01_README.md`
- [ ] Understand dual backend (Flask Render vs FastAPI local)
- [ ] Understand mock adapter default and RealAdapter gap
- [ ] Review pipeline diagram and storage layout
- [ ] Read `12_Known_Issues_And_TODOs.md`

---

## Access

- [ ] GitHub: https://github.com/blackholeinfiverse64/SVACS-Main.git
- [ ] Render `svacs-backend`
- [ ] Vercel SVACS project
- [ ] bhiv-bucket.onrender.com (if maintaining chain uploads)
- [ ] **TODO: Verify** team contacts (README convergence table)

---

## Local verification

- [ ] Python venv + `pip install -r requirements.txt`
- [ ] `python dashboard/app.py` → `/health` ONLINE
- [ ] `npm install && npm run dev` → dashboard loads
- [ ] `npm run build` succeeds
- [ ] `python tests/test_pipeline.py` completes
- [ ] Flask `/api/dashboard` returns data (after pipeline run)

---

## Production verification

- [ ] Render URL documented
- [ ] Vercel URL documented
- [ ] `ALLOWED_ORIGINS` includes Vercel domain
- [ ] Vercel env vars documented
- [ ] Cold start acceptable for demos

---

## Integration verification

- [ ] Pradnya SVACS adapter relationship understood
- [ ] NICAI `/perception_log` gap acknowledged
- [ ] Bucket URLs tested or marked optional

---

## Security

- [ ] No auth acknowledged
- [ ] FastAPI open CORS noted if ever deployed publicly
- [ ] Synthetic/demo data classification confirmed

---

## Assets

- [ ] `dashboard_screenshots/` reviewed (README embeds)
- [ ] Optional: add captures to `Handover/Screenshots/`
- [ ] Optional: demo video in `Handover/Videos/`

---

## Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Outgoing (Dashboard) | Nikhil Pawar | | |
| Incoming owner | | | |
| Runtime lead | **TODO: Verify** | | |

---

## Post-handover priorities

1. Verify and document production URLs
2. Fix Render CORS for Vercel
3. Implement `RealAdapter`
4. Add `.env.example`
5. Decide Flask vs FastAPI single production API
