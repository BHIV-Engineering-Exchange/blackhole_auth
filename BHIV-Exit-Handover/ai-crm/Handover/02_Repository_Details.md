# Repository Details — AI-CRM

**Generated:** 2026-07-05

---

## Repository Name

**AI-CRM** (product: **Infiverse BHL** / **Workflow Blackhole**)

---

## Repository Purpose

Full-stack workforce management CRM: tasks, attendance, salary, employee monitoring, AI optimization, EMS email automation, and biometric attendance.

---

## Repository URL

| Type | URL |
|------|-----|
| **Git Remote** | https://github.com/blackholeinfiverse64/ai-crm.git |
| **Production Backend** | https://blackholeworkflow.onrender.com |
| **Production Frontend** | https://blackhole-workflow.vercel.app |
| **Alt Frontend** | https://main-workflow.vercel.app (referenced in auth-context) |

> TODO: Verify all production URLs are live.

---

## Main Application Path

```
AI-CRM/Downloads/workflow-blackhole-main/
```

There is **no** application code at the git repository root.

---

## Main Branch

`main` (tracks `origin/main`)

---

## Production Branch

`main` — no separate production branch configured.

---

## Build Command

| Component | Command | Location |
|-----------|---------|----------|
| **Backend** | `npm install` | `Downloads/workflow-blackhole-main/server/` |
| **Frontend** | `npm run build` | `Downloads/workflow-blackhole-main/client/` |
| **Docker** | `docker build -t infiverse-server .` | `server/Dockerfile` |

---

## Run Command

| Component | Command | Port |
|-----------|---------|------|
| **Backend** | `npm start` → `node index.js` | 5001 (code default) / 5000 (.env.example) |
| **Frontend (dev)** | `npm run dev` | 5173 |
| **Both (Windows)** | `START_SERVERS.ps1` | 5000 + 5173 |

---

## Dependencies

### Backend (`server/package.json`)
express, mongoose, jsonwebtoken, socket.io, cloudinary, nodemailer, multer, groq-sdk, @google/generative-ai, tesseract.js, screenshot-desktop, sharp, pdfkit, exceljs, bcryptjs (unused in auth), web-push, node-cron

### Frontend (`client/package.json`)
react, react-router-dom, vite, tailwindcss, axios, socket.io-client, recharts, framer-motion, radix-ui/shadcn components

### Root wrapper (`workflow-blackhole-main/package.json`)
Minimal — `install:client`, `build:client` scripts only

---

## Deployment Platform

| Target | Config | Notes |
|--------|--------|-------|
| **Render** | Manual deploy per `DEPLOYMENT_FIX_GUIDE.md` | Backend |
| **Vercel** | `client/vercel.json` | Frontend SPA rewrite |
| **Docker** | `server/Dockerfile` | Node 18-slim, exposes 5000 |
| **PM2** | `server/DEPLOYMENT.md` | Linux production guide |

**No CI/CD** — `.github/workflows/` not present.

---

## Current Status

| Aspect | Status |
|--------|--------|
| **Codebase** | Active; nested under Downloads/ |
| **Tests** | `npm test` echoes "Error: no test specified" |
| **Documentation** | Extensive README, DEPLOYMENT.md, HANDOVER_SHEET.md |
| **Production** | Render + Vercel (with known API URL issues) |

---

## Key NPM Scripts

| Script | Location | Purpose |
|--------|----------|---------|
| `npm start` | server/ | Start Express server |
| `npm run dev` | client/ | Vite dev server |
| `npm run build` | client/ | Production build |

Seed/admin scripts in `server/scripts/` (seedAdmin.js, seedDepartment.js, etc.)
