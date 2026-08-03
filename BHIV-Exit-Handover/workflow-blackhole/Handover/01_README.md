# workflow-blackhole — Exit Handover Package

**Repository:** `workflow-blackhole`  
**Remote:** https://github.com/blackholeinfiverse64/workflow-blackhole.git  
**Branch:** `main`  
**Prepared:** July 2026  
**Handover owner:** Nikhil Pawar (exit documentation)

---

## Product identity

| Context | Name |
|---------|------|
| Repository | **workflow-blackhole** |
| README product name | **Infiverse BHL** — Comprehensive Workforce Management System |
| npm packages | `client`, `server` |
| Known frontend URL | `https://blackhole-workflow.vercel.app` |
| Known backend URL (fallback in code) | `https://blackholeworkflow.onrender.com/api` |
| Related domain (CORS) | `niyantran.blackholeinfiverse.com` |

**Purpose:** Full-stack workforce management — tasks, attendance, salary, leave, employee monitoring, EMS automation, procurement, biometric payroll, branches/projects, and **Tantra deterministic execution participation** with optional **Sampada SETU** telemetry dispatch (Niyantran integration).

---

## Handover folder map

| File | Purpose |
|------|---------|
| `01_README.md` – `18_Rollback_Guide.md` | Full documentation set |
| `review_packets/`, `code_packets/`, `Screenshots/`, `Videos/` | Review asset indexes |

---

## Quick start (local)

```bash
# Terminal 1 — Backend
cd workflow-blackhole/server
npm install
# Create .env with MONGODB_URI, JWT_SECRET, etc.
npm start                    # default PORT 5000

# Terminal 2 — Frontend
cd workflow-blackhole/client
npm install
# client/.env: VITE_API_URL=http://localhost:5000/api
npm run dev                  # port 5173
```

**Port note:** `client/src/lib/api.js` defaults local API to **5001** if `VITE_API_URL` unset — set env explicitly to **5000**.

Open http://localhost:5173

---

## Critical handover notes

1. **Naming drift:** workflow-blackhole vs Infiverse BHL vs blackhole-workflow (Vercel).
2. **Monolith-capable:** Server can serve `client/dist` — same origin `/api` possible.
3. **Split deploy:** Vercel frontend + Render backend is current pattern in `api.js`.
4. **Large route surface:** 30+ API mount points in `server/index.js`.
5. **Tantra / SETU:** `POST /api/tantra/execution/participate` + `setuDispatcher.js` → Sampada (opt-in via env).
6. **Monitoring features:** Screen capture, EMS signals — privacy/compliance sensitive.
7. **No `.env.example` in repo** — use README env section + `05_Environment_Setup.md`.
8. **Top of `index.js` is commented legacy block** — active server starts at line ~125.

---

## Related BHIV products

| Product | Relationship |
|---------|--------------|
| Infiverse-HR (Sampada) | SETU signal receiver (`niyantran_telemetry`) |
| PARIKSHAN (NIYANTRAN) | Execution telemetry / control plane |
| Complete-Infiverse / EMS | EMS routes and automation |

---

## Contact

**TODO: Verify** — product owner, Render/Vercel admins, MongoDB Atlas access.
