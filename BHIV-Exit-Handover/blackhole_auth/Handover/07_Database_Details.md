# Database Details — blackhole_auth

**Generated:** 2026-07-05

---

## Summary

**This repository has no database.**

The auth client backend validates JWT cookies in memory. No MongoDB, PostgreSQL, SQLite, or other persistence layer exists in the codebase.

---

## Data Storage Model

| Data | Storage | Location |
|------|---------|----------|
| User credentials | External auth server | `bhiv-auth.onrender.com` — TODO: Verify |
| JWT tokens | HTTP cookie | `blackhole_token` — set by auth server |
| Session state (frontend) | React state | In-memory only (`AuthContext`) |
| App catalog | Hardcoded JS | `frontend/src/constants/apps.js` |
| User profile | JWT claims | Decoded on each `/api/me` request |

---

## Stale Reference in `.env.example`

`backend/.env.example` includes:

```env
MONGO_URI=mongodb://127.0.0.1:27017/bhiv_core
```

This variable is **not referenced** anywhere in `backend/src/`. It appears to be a leftover from an earlier design or copied from the auth server config.

**Do not configure MongoDB for this repo** — it will have no effect.

---

## External Auth Server Database

User accounts, roles, and `allowedApps` assignments are managed by the external auth server (not this repo).

> TODO: Verify auth server database (likely MongoDB based on `.env.example` naming and other BHIV repos).

Expected external schema (inferred from JWT claims):

| Field | Source |
|-------|--------|
| `user_id` | JWT claim |
| `email` | JWT claim |
| `roles` | JWT claim (array) |
| `allowedApps` | JWT claim (array of app keys) |

---

## App Catalog (Static)

Defined in `frontend/src/constants/apps.js` — not stored in a database:

| Key | Name | URL |
|-----|------|-----|
| `setu` | Setu | https://setu.blackholeinfiverse.com |
| `sampada` | Sampada | https://sampada.blackholeinfiverse.com |
| `niyantran` | Niyantran | https://niyantran.blackholeinfiverse.com |
| `gurukul` | Gurukul | https://gurukul.blackholeinfiverse.com |
| `mitra` | Mitra | https://mitra.blackholeinfiverse.com |

Adding a new app requires a code change and redeploy.

---

## Backup Considerations

| Component | Backup Needed |
|-----------|---------------|
| This repo's backend | No data to backup |
| This repo's frontend | No data to backup |
| External auth server DB | Yes — managed separately |
| JWT_SECRET | Store securely in secrets manager |

---

## TODO: Verify

- [ ] Auth server database type and schema
- [ ] How `allowedApps` are assigned to users (admin UI? database seed?)
- [ ] Whether app catalog should move to database/config service
