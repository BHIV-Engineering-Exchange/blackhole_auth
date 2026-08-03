# Known Issues and TODOs — Pradnya / NICAI

## Critical / high

| # | Issue | Impact | Workaround |
|---|-------|--------|------------|
| 1 | **Production Render URL not in repo** | Frontend may point to wrong API | Set `VITE_NICAI_API` in Vercel to verified Render URL |
| 2 | **No authentication** | Public read/write API | Accept for demo; add auth before production |
| 3 | **Mock data masks API failures** | UI looks healthy when API down | Check Network tab; look for "using demo data" in Logs tab |
| 4 | **Ephemeral logs on Render** | Action/audit logs lost on redeploy | **TODO: Verify** persistent storage |

---

## Medium

| # | Issue | Details |
|---|-------|---------|
| 5 | **README vs code: REJECT status** | README documents REJECT; `validator.py` only emits ALLOW/FLAG |
| 6 | **Two Sanskar engines** | `main.py` uses `sanskar_engine`; SVACS uses `sanskar_simple` — different risk models |
| 7 | **Hardcoded UI sections** | ACTIONS, TREND chart, DonutChart stats not from API |
| 8 | **Actions tab not wired** | `triggerAction` in api.js unused by main UI flows |
| 9 | **Dashboard.jsx unused** | `main.jsx` imports App.jsx only |
| 10 | **run_demo_full validation shortcut** | Demo loop uses fake validation dict, not `validate_signal()` |
| 11 | **test_validation dataset IDs** | Uses `DS01`/`DS02` not in `datasets.json` — tests expect FLAG/legacy behavior |
| 12 | **SVACS not in FastAPI** | Integration scripts exist but no `/svacs` routes |
| 13 | **live_integration port conflict** | Both NICAI and perception_log default to 8000 |
| 14 | **requests not in requirements.txt** | Needed for `live_integration.py` if used on server |

---

## Low / documentation

| # | Issue | Details |
|---|-------|---------|
| 15 | Naming drift Pradnya vs NICAI | Confuses repo search |
| 16 | Duplicate log files at repo root | `validation_logs.json` vs `logs/` |
| 17 | `bucket_emitter` optional | Silently no-op if missing |
| 18 | HTML `/dashboard` lacks action JS | README mentions buttons; inline HTML has no `sendAction` script in returned template |
| 19 | Python version not pinned | render.yaml has no `pythonVersion` |

---

## TODO: Verify (external facts)

- [ ] Render production URL for `pradnya-api`
- [ ] Vercel env vars currently set
- [ ] Samachar and Mitra production URLs
- [ ] SVACS perception service URL and ownership
- [ ] Product owner and on-call
- [ ] Whether logs are exported from Render

---

## Suggested fix order

1. Document and set `VITE_NICAI_API` on Vercel to Render URL
2. Align README with ALLOW/FLAG-only validator (or restore REJECT)
3. Wire actions tab to POST `/action` + fetch log count
4. Replace hardcoded charts with `/signals` summary when live
5. Add `requests` to requirements.txt if live integration deployed
6. Expose SVACS via dedicated route or document scripts-only status
7. Add pytest CI for validator and process_signals
8. Fix HTML dashboard action buttons or remove from demo script

---

## Code references

**CORS production frontend:**

```python
# main.py
DEFAULT_ORIGINS = "...https://pradnya-bhiv.vercel.app"
```

**Mock fallback:**

```javascript
// frontend/src/App.jsx
const [signals, setSignals] = useState(MOCK_SIGNALS);
// catch → addLog("NICAI API unavailable — using demo data")
```

**Validator FLAG-only:**

```python
# validator.py — build_flag() always status "FLAG", no REJECT path
```
