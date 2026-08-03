# Environment Setup — PARIKSHAN / NIYANTRAN V1

## Prerequisites

| Requirement | Version / notes |
|-------------|-----------------|
| Node.js | 18+ recommended |
| npm | Bundled with Node |
| MongoDB | Local or Atlas; default URI targets `127.0.0.1:27017` |
| Git | Clone from https://github.com/blackholeinfiverse64/PARIKSHAN.git |

---

## Step 1 — Clone and open repo

```bash
git clone https://github.com/blackholeinfiverse64/PARIKSHAN.git
cd PARIKSHAN
```

---

## Step 2 — Start MongoDB

Ensure MongoDB is running and reachable at:

```
mongodb://127.0.0.1:27017/bhiv-niyantran
```

Or set `MONGODB_URI` in backend environment before starting the server.

**First boot:** `mockSignalService.ensureSeedData()` inserts 4 projects, 3 teams, and 6 individuals if the `entities` collection is empty.

---

## Step 3 — Backend

```bash
cd backend
npm install
```

Optional `.env` in `backend/` (create manually — no `.env.example` in repo):

```env
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/bhiv-niyantran
```

Run:

```bash
npm run dev
```

Verify:

```bash
curl http://localhost:4000/health
# Expected: {"status":"ok","service":"bhiv-niyantran",...}

curl http://localhost:4000/niyantran/overview
# Expected: JSON with projects, teams, individuals, alerts, blockers
```

---

## Step 4 — Frontend

```bash
cd ../frontend
npm install
```

**Required for local dev** — fix port mismatch:

**Windows CMD:**
```cmd
set VITE_API_BASE_URL=http://localhost:4000
npm run dev
```

**PowerShell:**
```powershell
$env:VITE_API_BASE_URL="http://localhost:4000"
npm run dev
```

**Linux/macOS:**
```bash
export VITE_API_BASE_URL=http://localhost:4000
npm run dev
```

Or create `frontend/.env.local`:

```env
VITE_API_BASE_URL=http://localhost:4000
```

Open http://localhost:5173 — header should show **NIYANTRAN V1**; overview cards populate from API; socket updates every ~5 seconds.

---

## Step 5 — Production-style preview (optional)

```bash
cd frontend
npm run build
npm run preview
```

Still requires backend running and `VITE_API_BASE_URL` set at **build time** for correct API host in bundled assets.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Empty dashboard / network errors | Frontend pointing to 4001 | Set `VITE_API_BASE_URL=http://localhost:4000` |
| `ECONNREFUSED` on backend start | MongoDB not running | Start MongoDB or fix `MONGODB_URI` |
| No realtime updates | Socket not connected | Check browser console; confirm same base URL as API |
| CORS errors | Unusual proxy setup | Backend uses open CORS (`*`); check middleware order |
| Silent empty state | `hydrate()` failed | Check Network tab for `/niyantran/overview`; errors not surfaced in UI |

---

## IDE notes

- TypeScript project root: `frontend/`
- Backend is plain CommonJS JavaScript (no TypeScript)

**TODO: Verify** — team-standard Node version and MongoDB deployment (local vs Atlas) for shared environments.
