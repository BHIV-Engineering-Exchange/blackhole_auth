# Tech Stack — PARIKSHAN / NIYANTRAN V1

## Summary

| Area | Technology |
|------|------------|
| Frontend runtime | Node.js (build), browser (runtime) |
| Frontend framework | React 19 |
| Build tool | Vite 8 |
| Language (frontend) | TypeScript |
| Styling | Tailwind CSS 4 |
| HTTP client | Axios |
| Realtime | socket.io-client 4.x |
| Backend runtime | Node.js |
| Backend framework | Express 5 |
| ODM | Mongoose 9 |
| Realtime (server) | Socket.IO 4.8 |
| Database | MongoDB |
| Version control | Git (GitHub) |

---

## Backend (`PARIKSHAN/backend/package.json`)

| Package | Purpose |
|---------|---------|
| `express` ^5 | HTTP server and routing |
| `mongoose` ^9 | MongoDB models and queries |
| `socket.io` ^4.8 | WebSocket broadcast |
| `cors` | Cross-origin (configured permissive) |
| `dotenv` | Environment variables |
| `nodemon` (dev) | Hot reload via `npm run dev` |

**Scripts:**
- `npm start` → `node server.js`
- `npm run dev` → `nodemon server.js`

---

## Frontend (`PARIKSHAN/frontend/package.json`)

| Package | Purpose |
|---------|---------|
| `react` / `react-dom` ^19 | UI |
| `vite` ^8 | Dev server and production build |
| `typescript` | Type safety |
| `tailwindcss` ^4 | Utility CSS |
| `axios` | REST calls to backend |
| `socket.io-client` | Realtime subscription |

**Scripts:**
- `npm run dev` → Vite dev server (default port 5173)
- `npm run build` → TypeScript compile + Vite build → `dist/`
- `npm run preview` → Preview production build

**Note:** Pre-built `frontend/dist/` exists in repo (static assets committed).

---

## Environment variables

### Backend

| Variable | Default | Purpose |
|----------|---------|---------|
| `PORT` | `4000` | HTTP + Socket.IO listen port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/bhiv-niyantran` | MongoDB connection |

No `.env.example` in repo — document manually when deploying.

### Frontend

| Variable | Default | Purpose |
|----------|---------|---------|
| `VITE_API_BASE_URL` | `http://localhost:4001` | REST and Socket.IO base URL |

**Mismatch:** Backend default is port **4000**; frontend default is **4001**. Set `VITE_API_BASE_URL=http://localhost:4000` for local dev.

---

## Ports

| Service | Port |
|---------|------|
| Backend API + Socket.IO | 4000 (default) |
| Frontend Vite dev | 5173 |
| MongoDB | 27017 (default) |

---

## Not present in repo

- Docker / docker-compose
- render.yaml, vercel.json, netlify.toml
- GitHub Actions / CI
- Test frameworks (Jest, Vitest, Mocha)
- `.env.example`
