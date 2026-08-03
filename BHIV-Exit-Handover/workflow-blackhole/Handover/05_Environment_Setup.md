# Environment Setup — workflow-blackhole

## Prerequisites

- Node.js 18+
- MongoDB 5+ (local or Atlas)
- npm

Optional for monitoring features: Linux tools (`xdotool`, `scrot`) or Windows desktop capture deps.

---

## Step 1 — Clone

```bash
git clone https://github.com/blackholeinfiverse64/workflow-blackhole.git
cd workflow-blackhole
```

---

## Step 2 — Server environment

```bash
cd server
npm install
```

Create `server/.env` (minimum):

```env
MONGODB_URI=mongodb://127.0.0.1:27017/infiverse-bhl
JWT_SECRET=your_dev_jwt_secret_min_32_chars
PORT=5000

# Office geofence (example from README)
OFFICE_LAT=19.1663
OFFICE_LNG=72.8526
OFFICE_RADIUS=100

# Optional SETU (Sampada)
SAMPADA_SETU_ENABLED=false
SAMPADA_SETU_BASE_URL=
SAMPADA_SETU_API_KEY=

# Optional AI / email / cloudinary — see root README
```

Start:

```bash
npm start
```

Verify:

```bash
curl http://localhost:5000/api/ping
# {"message":"Pong!"}
```

---

## Step 3 — Client environment

```bash
cd ../client
npm install
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**Important:** Do not rely on default `api.js` localhost **5001** fallback.

```bash
npm run dev
```

Open http://localhost:5173 — register/login flows via `/api/auth`.

---

## Step 4 — Production-like single host (optional)

```bash
cd client && npm run build
cd ../server
# Server serves ../client/dist — hit http://localhost:5000
npm start
```

---

## Step 5 — EMS / monitoring verification

Root scripts:

```bash
node verify_ems_setup.js
node test_monitoring.js
node test-real-tracking.js
```

Server endpoint for Linux browser tools test:

```bash
curl http://localhost:5000/api/test-browser-detection
```

---

## MongoDB

Database name from URI (README suggests `infiverse-bhl`). Collections created by Mongoose on first use — 40+ models.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| API connection refused on 5001 | Set `VITE_API_URL` to port **5000** |
| CORS error from Vercel | Add origin to `ALLOWED_ORIGIN_CONFIG` in `index.js` or env pattern |
| MongoDB exit on start | Fix `MONGODB_URI`, whitelist IP for Atlas |
| Empty dashboards | Seed users/data; check branch selection |
| SETU errors | Expected if `SAMPADA_SETU_ENABLED=false` |

---

## TODO: Verify

- Production MongoDB Atlas URI and database name
- Whether Render uses same repo root or server-only deploy
