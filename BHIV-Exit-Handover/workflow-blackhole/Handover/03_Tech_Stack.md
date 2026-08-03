# Tech Stack — workflow-blackhole

## Frontend (`client/`)

| Technology | Version (package.json) |
|------------|------------------------|
| React | 18.3.x |
| Vite | 6.3.x |
| React Router | 7.5.x |
| Tailwind CSS | 4.1.x |
| Axios | 1.9.x |
| Socket.IO client | 4.8.x |
| Framer Motion | 12.x |
| Recharts | 2.15.x |
| Radix UI / shadcn-style components | various |
| vite-plugin-pwa | 1.0.x |

---

## Backend (`server/`)

| Technology | Version |
|------------|---------|
| Node.js | 18+ recommended |
| Express | 5.1.x |
| Mongoose | 8.14.x |
| Socket.IO | 4.8.x |
| jsonwebtoken | 9.0.x |
| bcryptjs | 3.0.x |
| Multer, ExcelJS, XLSX | file/biometric processing |
| Sharp, Canvas, screenshot-desktop | monitoring |
| Tesseract.js | OCR |
| Nodemailer | email |
| Cloudinary | uploads |
| @google/generative-ai, groq-sdk | AI |
| node-cron | scheduled jobs |
| web-push | push notifications |

---

## Database

**MongoDB** via `MONGODB_URI` — connection pool tuned in `index.js` (min 10, max 50).

---

## Deployment (documented in code, not render.yaml in repo)

| Target | Evidence |
|--------|----------|
| Vercel | `blackhole-workflow.vercel.app` in CORS + `api.js` |
| Render | `blackholeworkflow.onrender.com` in `api.js` fallback |
| Custom | `niyantran.blackholeinfiverse.com` in CORS allowlist |

**TODO: Verify** — render.yaml / vercel.json in repo or platform UI settings.

---

## Environment variables (summary)

### Server (critical)

| Variable | Purpose |
|----------|---------|
| `MONGODB_URI` | MongoDB connection |
| `JWT_SECRET` | Auth tokens |
| `PORT` | Default 5000 |
| `OFFICE_LAT`, `OFFICE_LNG`, `OFFICE_RADIUS` | Geofence |
| `SAMPADA_SETU_ENABLED` | Enable SETU dispatch |
| `SAMPADA_SETU_BASE_URL`, `SAMPADA_SETU_API_KEY` | Sampada SETU target |
| AI/email/cloud keys | See README |

### Client

| Variable | Purpose |
|----------|---------|
| `VITE_API_URL` | Backend API base (should end with `/api`) |
| `VITE_SOCKET_URL` | Socket.IO origin |

---

## Ports

| Service | Default |
|---------|---------|
| Express | 5000 |
| Vite dev | 5173 |
| Client api.js localhost fallback | **5001** (mismatch — fix via env) |

---

## Not in repo

- Docker compose (README shows example Dockerfile only)
- Formal CI workflow in root
- `.env.example` files
