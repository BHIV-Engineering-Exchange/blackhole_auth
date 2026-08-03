# biometric-blackhole — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-05  
**Repository:** biometric-blackhole  
**Product Name:** Attendance Processing System / Biometric Blackhole

---

## Product Overview

**biometric-blackhole** is a biometric attendance and payroll processing platform. Users upload Excel exports from biometric devices; the backend parses attendance, calculates hours and salaries, and the React frontend provides upload, reporting, and export workflows.

---

## Purpose

Provide a web-based system that:

- Processes biometric Excel attendance exports into daily and monthly reports
- Calculates hours, overtime, and salary using configurable hour rates
- Stores per-user isolated data in MongoDB Atlas
- Authenticates users via JWT
- Deploys backend to Render and frontend to Vercel

---

## Features

### Core Platform
- Excel upload and processing (`POST /api/process`)
- Attendance reports with daily/monthly summaries
- Manual user and daily record management
- Hour rate configuration
- Finalized and confirmed salary tracking
- Excel export via download endpoint

### Authentication
- JWT register/login with 72-hour token expiry
- Per-user data isolation (`user_id` scoping)
- Role field on users (`employee`, `admin`)

### Alternate UI
- Streamlit dashboard (`backend/app.py`) — standalone, not deployed to Render

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite 5, Tailwind CSS, Axios, Recharts, jsPDF |
| **Backend API** | Python 3.11, Flask 2.3, Flask-CORS |
| **Alt Backend UI** | Streamlit 1.28+ |
| **Database** | MongoDB Atlas (PyMongo 4.6+) |
| **Auth** | PyJWT, SHA256 + salt password hashing |
| **Processing** | pandas, openpyxl |
| **Deployment** | Render (backend), Vercel (frontend) |
| **CI/CD** | None |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | biometric-blackhole |
| **Remote URL** | https://github.com/blackholeinfiverse64/biometric-blackhole.git |
| **Main Branch** | `main` |
| **License** | TODO: Verify |

---

## Build Instructions

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
npm run build   # vite build → dist/
```

---

## Installation

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend Setup
```bash
cd backend
# Create .env with MONGODB_URI, JWT_SECRET_KEY, PASSWORD_SALT
pip install -r requirements.txt
python api.py
```

### Frontend Setup
```bash
cd frontend
# Set VITE_API_BASE_URL in .env
npm install
npm run dev
```

See: `backend/QUICK_START.md`, `backend/README.md`, `INSTALLATION_GUIDE.md`

---

## Running Locally

| Service | Command | URL |
|---------|---------|-----|
| Backend | `python api.py` | http://localhost:5000 |
| Frontend | `npm run dev` | http://localhost:5173 |
| Health | — | http://localhost:5000/api/health |
| Streamlit (alt) | `streamlit run app.py` | http://localhost:8501 |

---

## Deployment

| Environment | Platform | Reference |
|-------------|----------|-----------|
| Production Backend | Render | `render.yaml` |
| Production Frontend | Vercel | `frontend/vercel.json` |

**Production URLs (from DEPLOYMENT.md):**
- Backend: https://biometric-blackhole.onrender.com — TODO: Verify live
- Frontend: https://biometric-blackhole.vercel.app — TODO: Verify live

Detailed steps: `Handover/03_Deployment_Guide.md`

---

## Dependencies

### Backend (key)
flask, flask-cors, PyJWT, pymongo, pandas, openpyxl, streamlit, certifi, dnspython

### Frontend (key)
react, react-router-dom, axios, tailwindcss, vite, recharts, jspdf, lucide-react

Full lists: `backend/requirements.txt`, `frontend/package.json`

---

## Folder Structure

```
biometric-blackhole/
├── backend/          # Flask API + Streamlit + processor
├── frontend/         # React SPA
└── Handover/         # This exit handover package
```

Full tree: `Handover/08_Folder_Structure.md`

---

## Authentication

- **Register:** `POST /api/auth/register` — fields: `email`, `password`, `full_name`, optional `role`
- **Login:** `POST /api/auth/login` — fields: `email`, `password`
- **Profile:** `GET /api/auth/me` (Bearer token)
- **Token storage:** `localStorage` key `auth_token` (frontend)
- **Password hash:** SHA256(`PASSWORD_SALT` + password)
- **Token expiry:** 72 hours (configurable via `JWT_EXPIRY_HOURS`)

---

## Environment Variables (Names Only)

### Backend
`MONGODB_URI`, `MONGODB_DB_NAME`, `JWT_SECRET_KEY`, `JWT_EXPIRY_HOURS`, `PASSWORD_SALT`, `PORT`, `FLASK_ENV`

### Frontend
`VITE_API_BASE_URL`

Full guide: `Handover/05_Environment_Guide.md`

---

## Known Issues

1. Hardcoded MongoDB credentials in `database.py` and `render.yaml` — rotate immediately
2. Unauthenticated `/api/download` and `/api/statistics` endpoints
3. Documentation references Supabase but code uses MongoDB
4. Flask dev server used in production (no Gunicorn)
5. Role-based routing documented but all roles redirect to `/reports`
6. No CI/CD or automated tests

Full list: `Handover/10_Known_Issues.md`

---

## Future Improvements

- Rotate and externalize all secrets
- Add JWT auth to download/statistics endpoints
- Replace SHA256 with bcrypt
- Add Gunicorn for production
- Remove stale Supabase SQL/docs
- Add CI pipeline with pytest
- Implement actual role-based UI routing
- Expand root README

---

## Related Handover Documents

| Document | Purpose |
|----------|---------|
| `02_Repository_Details.md` | Repo metadata and commands |
| `03_Deployment_Guide.md` | Production deployment |
| `04_Architecture.md` | System architecture |
| `05_Environment_Guide.md` | Environment configuration |
| `06_API_Documentation.md` | Complete API reference |
| `07_Database_Details.md` | MongoDB collections |
| `08_Folder_Structure.md` | Directory layout |
| `09_Pending_Work.md` | Outstanding tasks |
| `10_Known_Issues.md` | Documented issues |
| `11_Troubleshooting.md` | Common problems |
| `12_REVIEW_PACKET.md` | Quick review guide |
| `13_Runtime_Evidence.md` | Runtime proof placeholders |
| `14_Testing_Checklist.md` | QA checklist |
| `15_Knowledge_Transfer.md` | KT session guide |
| `16_Ownership_Transfer.md` | Ownership checklist |
| `17_Deployment_Checklist.md` | Deploy checklist |
| `18_Rollback_Guide.md` | Rollback procedures |
