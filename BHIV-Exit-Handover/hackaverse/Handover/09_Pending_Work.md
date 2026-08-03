# Pending Work — hackaverse

**Generated:** 2026-07-05  
**Sources:** `CURRENT_PROJECT_STATUS.md`, `review_packets/REVIEW_PACKET.md`, codebase

---

## Critical Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 1 | **Fix admin/judge visibility in production** | `CURRENT_PROJECT_STATUS.md` | Registration forces participant; no admin promote API |
| 2 | **Run seed_data.py against production MongoDB** | `seed_data.py` | Or build admin role assignment endpoint |
| 3 | **Fix judge invitation → login flow** | `CURRENT_PROJECT_STATUS.md` | Accept invite doesn't create password |
| 4 | **Verify canonical backend URL** | Conflicting docs | `hackaverse.blackholeinfiverse.com` vs `ai-agent-x2iw.onrender.com` |
| 5 | **Update cron reminder URL** | `render.yaml` | Still placeholder `YOUR_APP_ON_RENDER` |

---

## High Priority

| # | Item | Source | Notes |
|---|------|--------|-------|
| 6 | **Fix judge API authorization** | `CURRENT_PROJECT_STATUS.md` | Checks `judges` collection with wrong field names |
| 7 | **Add role to JWT or refresh from /auth/me on init** | `CURRENT_PROJECT_STATUS.md` | Role only in localStorage, stale after DB changes |
| 8 | **Remove deprecated apiClient.js** | `apiClient.js` header | Migration to `api.js` incomplete |
| 9 | **Separate dev/prod MongoDB** | `DEPLOYMENT_NOTES.md` | Shared cluster risk |
| 10 | **Add CI/CD pipeline** | No `.github/workflows/` | No test gate before deploy |
| 11 | **WebSocket JWT auth** | Review packet | Listed as follow-up item |

---

## Medium Priority

| # | Item | Notes |
|---|------|-------|
| 12 | Remove duplicate `Hackaverse/` doc folder | Consolidate documentation |
| 13 | Fix disconnected admin/judge pages | Per `CURRENT_PROJECT_STATUS.md` audit |
| 14 | Implement admin user promotion API | Referenced in auth comments but missing |
| 15 | Align DEPLOYMENT_NOTES with review packet URLs | Stale Render URL |
| 16 | Verify Render mongo pserv vs Atlas | Two DB configs in render.yaml |
| 17 | Replace BHIV_CORE_URL placeholder | `render.yaml` |
| 18 | Add staging environment | None exists |
| 19 | Frontend: call GET /auth/me on app bootstrap | Refresh role from DB |

---

## Low Priority / Enhancements

| # | Item | Notes |
|---|------|-------|
| 20 | Add deployment notifications | Manual dashboard checks only |
| 21 | Automated rollback mechanism | Git revert only |
| 22 | Expand E2E tests (Puppeteer configured) | Minimal coverage today |
| 23 | TANTRA integration completion | See `TANTRA_ALIGNMENT.md` |
| 24 | MCP route documentation | `routes/mcp.py` |
| 25 | Streamlit components in requirements | May be unused |

---

## From Review Packet (v4) Follow-ups

| Item | Status |
|------|--------|
| WebSocket authentication | TODO |
| TANTRA domain in ALLOWED_ORIGINS | Partially configured |
| Full trace lineage dashboard | Observability code exists |

---

## Documentation Cleanup

| # | Item |
|---|------|
| 26 | Consolidate 50+ root markdown files into Handover + INDEX |
| 27 | Update `frontend/.env.example` production URL |
| 28 | Sync `ENV_REFERENCE.md` with actual code |

See `Handover/10_Known_Issues.md` for detailed issue descriptions.
