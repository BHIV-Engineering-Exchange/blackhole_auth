# PARIKSHAN — Exit Handover Package

**Repository:** `PARIKSHAN`  
**Remote:** https://github.com/blackholeinfiverse64/PARIKSHAN.git  
**Branch:** `main`  
**Prepared:** July 2026  
**Handover owner:** Nikhil Pawar (exit documentation)

---

## Product identity

| Context | Name |
|---------|------|
| Repository / folder | **PARIKSHAN** |
| User-facing product | **NIYANTRAN V1** — Master Control Dashboard |
| Service ID | `bhiv-niyantran` |
| npm package (frontend) | `niyantran-frontend` |
| MongoDB database | `bhiv-niyantran` |

**Purpose:** Real-time BHIV ecosystem operations dashboard — projects, teams, individuals, alerts, operator actions, and Socket.IO live updates. This is an execution-telemetry / control-plane product, separate from Sampada (HR) in Infiverse-HR.

---

## What is in this folder

| File | Purpose |
|------|---------|
| `01_README.md` | This index and quick orientation |
| `02_Project_Overview.md` | Product scope, architecture, naming |
| `03_Tech_Stack.md` | Languages, frameworks, dependencies |
| `04_Repository_Structure.md` | Folder map and key files |
| `05_Environment_Setup.md` | Local install and run |
| `06_Deployment_Guide.md` | Hosting notes (no config in repo) |
| `07_API_Reference.md` | REST and Socket.IO contracts |
| `08_Database_Schema.md` | MongoDB collections and fields |
| `09_Frontend_Guide.md` | React SPA, context, tabs |
| `10_Backend_Guide.md` | Express services and stream |
| `11_Authentication_And_Security.md` | Auth status and risks |
| `12_Known_Issues_And_TODOs.md` | Gaps, bugs, verify items |
| `13_Testing_Guide.md` | Test status (none in repo) |
| `14_Operations_Runbook.md` | Day-2 ops, health, restart |
| `15_Third_Party_Services.md` | External deps (MongoDB only) |
| `16_Change_Log_Summary.md` | Git history summary |
| `17_Handover_Checklist.md` | Sign-off checklist |
| `18_Rollback_Guide.md` | Rollback / recovery steps |

**Subfolders:** `review_packets/`, `code_packets/`, `Screenshots/`, `Videos/` — placeholders for review assets.

---

## Quick start (local)

```bash
# Terminal 1 — Backend (port 4000)
cd PARIKSHAN/backend
npm install
npm run dev

# Terminal 2 — Frontend (port 5173)
cd PARIKSHAN/frontend
npm install
# Required: backend runs on 4000, frontend defaults to 4001
set VITE_API_BASE_URL=http://localhost:4000   # Windows CMD
# $env:VITE_API_BASE_URL="http://localhost:4000"  # PowerShell
npm run dev
```

Open http://localhost:5173 — dashboard loads overview from `GET /niyantran/overview` and connects Socket.IO for 5-second mock stream updates.

**Prerequisites:** Node.js 18+, MongoDB running locally (default URI `mongodb://127.0.0.1:27017/bhiv-niyantran`).

---

## Critical handover notes

1. **Port mismatch:** Backend listens on **4000**; frontend `api.ts` and `socket.ts` default to **4001** unless `VITE_API_BASE_URL` is set.
2. **Mock telemetry only:** `mockSignalService.js` simulates Pravah events; no live upstream integration in this repo.
3. **Mixed data:** Several dashboard sections use hardcoded fallbacks alongside API-backed state.
4. **No auth:** All REST and Socket endpoints are public; CORS is `*`.
5. **No deployment config:** No `render.yaml`, `vercel.json`, Docker, or CI in repo — production URLs **TODO: Verify**.
6. **Minimal root README:** Repo README is only `# PARIKSHAN`; this handover is the primary setup doc.

---

## Related BHIV products

| Product | Repo | Relationship |
|---------|------|--------------|
| Sampada (HR) | Infiverse-HR | HR domain; NIYANTRAN is ops/execution telemetry |
| Pravah | TODO: Verify | Referenced in mock stream naming; not wired here |

---

## Contact / escalation

**TODO: Verify** — product owner, on-call, and production URLs for NIYANTRAN.
