# AI-CRM (Infiverse BHL) — Exit Handover README

**Document Version:** 1.0  
**Generated:** 2026-07-05  
**Repository:** AI-CRM  
**Product Name:** Infiverse BHL / Workflow Blackhole

---

## Important: Application Location

The git repository root (`AI-CRM/`) contains only `.git/` and `Downloads/workflow-blackhole-main/`.  
**The main application lives at:**

```
AI-CRM/Downloads/workflow-blackhole-main/
├── client/    # React frontend
└── server/    # Express backend
```

All paths below are relative to `Downloads/workflow-blackhole-main/` unless stated otherwise.

---

## Product Overview

**Infiverse BHL** is a comprehensive full-stack workforce management CRM covering tasks, attendance, salary, employee monitoring, AI optimization, EMS email automation, biometric attendance, and real-time Socket.IO updates.

---

## Purpose

Provide a production-ready platform for:

- Task and department management with submissions and progress tracking
- Attendance tracking with geolocation, WFH caps, and biometric uploads
- Salary calculation (hourly, enhanced, biometric-based)
- Employee monitoring (screenshots, keystroke analytics, website monitoring)
- AI insights via Groq and Google Gemini
- Email automation (EMS), push notifications, and procurement analytics

---

## Features

### Core Workforce
- User/department/task management with role-based access (Admin, Manager, Employee)
- Task submissions, progress tracking, dependencies
- AIMs (Annual/Individual Management goals) with progress sync
- Leave request workflow

### Attendance & Salary
- Start/end day attendance with geolocation validation
- Biometric attendance upload and salary derivation
- Hourly salary, enhanced salary, new salary management modules
- Spam hour validation, midnight auto-end jobs

### Monitoring & Compliance
- Screen capture (Cloudinary storage), keystroke analytics
- Website monitoring with disallowed-site alerts
- Consent management, audit logs, GDPR docs
- EMS signals and automation

### AI & Automation
- Groq AI insights and task optimization
- Google Gemini analysis
- Procurement agent analytics
- Chatbot and Prana activity tracking

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18+, Vite 6, Tailwind 4, Shadcn/UI, Socket.IO client |
| **Backend** | Node.js, Express 5, Mongoose 8 |
| **Database** | MongoDB (Atlas) |
| **Auth** | JWT (`x-auth-token` header) |
| **Real-time** | Socket.IO 4.8 |
| **Storage** | Cloudinary (screenshots) |
| **AI** | Groq SDK, Google Generative AI (Gemini) |
| **Email** | Nodemailer |
| **Push** | Web Push (VAPID) |
| **OCR** | Tesseract.js |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Repository Information

| Item | Value |
|------|-------|
| **Repository Name** | AI-CRM |
| **Remote URL** | https://github.com/blackholeinfiverse64/ai-crm.git |
| **Main Branch** | `main` |

---

## Build Instructions

### Backend
```bash
cd Downloads/workflow-blackhole-main/server
npm install
```

### Frontend
```bash
cd Downloads/workflow-blackhole-main/client
npm install
npm run build
```

---

## Installation

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- FFmpeg/ImageMagick (for monitoring on Linux server)
- Cloudinary account (for screenshot storage)

### Setup
```bash
# Backend
cd Downloads/workflow-blackhole-main/server
cp .env.example .env
# Edit MONGODB_URI, JWT_SECRET, etc.
npm install

# Frontend
cd ../client
cp .env.example .env.local
npm install
```

---

## Running Locally

| Service | Command | URL |
|---------|---------|-----|
| Backend | `cd server && npm start` | http://localhost:5001 (code default) |
| Frontend | `cd client && npm run dev` | http://localhost:5173 |
| API Base | — | http://localhost:5001/api |

> **Port note:** `server/index.js` defaults to **5001**; `.env.example` says **5000**. Align before running.

Windows shortcut: `START_SERVERS.ps1`

---

## Deployment

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | Vercel | https://blackhole-workflow.vercel.app |
| Backend | Render | https://blackholeworkflow.onrender.com |

See `Handover/03_Deployment_Guide.md` and `DEPLOYMENT_FIX_GUIDE.md`

---

## Authentication

- **Register:** `POST /api/auth/register`
- **Login:** `POST /api/auth/login`
- **Current user:** `GET /api/auth/me`
- **Token header:** `x-auth-token` (not `Authorization: Bearer`)
- **Frontend storage:** `localStorage.WorkflowToken`, `localStorage.WorkflowUser`
- **JWT expiry:** 180 days
- **Google OAuth:** Removed (email/password only)

---

## Environment Variables (Names Only)

See `Handover/05_Environment_Guide.md`

---

## Known Issues

1. App nested under `Downloads/workflow-blackhole-main/` — not at repo root
2. Port mismatch: 5000 vs 5001 vs Docker 5000
3. Plain-text password storage (bcryptjs in deps but not used)
4. Production frontend `.env.production` may point to localhost
5. Many monitoring routes unauthenticated
6. 20+ legacy route files not mounted in `index.js`
7. No CI/CD pipeline

Full list: `Handover/10_Known_Issues.md`

---

## Future Improvements

- Restructure repo so `client/` and `server/` are at git root
- Implement bcrypt password hashing
- Standardize port across all configs
- Fix Vercel production API URL
- Add CI/CD pipeline
- Mount or remove orphaned route files
- Add auth to monitoring endpoints
- Complete pending handover tasks (alert notifications, data retention cron)

---

## Related Handover Documents

See `Handover/02_Repository_Details.md` through `Handover/18_Rollback_Guide.md`
