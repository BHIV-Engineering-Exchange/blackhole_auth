# Repository Details — AI-Artha

**Generated:** 2026-07-05

---

## Repository Name

**AI-Artha** (product name: **ARTHA v0.1**)

---

## Repository Purpose

India-compliant double-entry accounting and financial management platform with GST/TDS compliance, invoice/expense workflows, bank reconciliation, hash-chain ledger integrity, and SETU signal dispatch integration.

---

## Repository URL

| Type | URL |
|------|-----|
| **Git Remote (origin)** | https://github.com/blackholeinfiverse64/AI-Artha.git |
| **Production Backend** | https://ai-artha.onrender.com (from `backend/.env.production.example`) |
| **Production Frontend** | https://ai-artha.vercel.app (from `backend/.env.production.example`) |
| **Alternate Frontend** | https://artha.blackholeinfiverse.com (commented in env example) |

> TODO: Verify current live deployment URLs and availability.

---

## Main Branch

`main` (tracks `origin/main`)

---

## Production Branch

`main` — no separate production branch configured in `.git/config`.

CI also references a `dev` branch (`.github/workflows/ci.yml`) but it is not configured as a local tracking branch.

> TODO: Verify whether `dev` branch exists on remote and deployment workflow per branch.

---

## Build Command

| Component | Command | Location |
|-----------|---------|----------|
| **Backend** | `npm install` (no compile step) | `backend/` |
| **Frontend** | `npm run build` → `vite build` | `frontend/` |
| **Docker Prod** | `docker-compose -f docker-compose.prod.yml build --no-cache` | Root |
| **Config Generation** | `npm run generate:config` | `backend/` |

---

## Run Command

| Component | Command | Port |
|-----------|---------|------|
| **Backend (dev)** | `npm run dev` (nodemon) | 5000 |
| **Backend (prod)** | `npm start` or `npm run start:prod` | 5000 (Render: 10000) |
| **Frontend (dev)** | `npm run dev` (vite) | 5173 |
| **Frontend (prod preview)** | `npm run preview` | 4173 |
| **Docker Dev** | `docker-compose -f docker-compose.dev.yml up -d` | 5000, 5173 |
| **Docker Prod** | `docker-compose -f docker-compose.prod.yml up -d` | 80/443, 5000 |

---

## Dependencies

### Backend (`backend/package.json`)
**Runtime:** axios, bcryptjs, cookie-parser, cors, csv-parse, decimal.js, dotenv, express, express-rate-limit, express-validator, helmet, jsonwebtoken, mongoose, multer, pdf-parse, pdfkit, redis, winston, xlsx

**Optional:** tesseract.js (OCR)

**Dev:** jest, eslint, prettier, nodemon, supertest, babel-jest, husky

### Frontend (`frontend/package.json`)
**Runtime:** react, react-dom, react-router-dom, @tanstack/react-query, zustand, axios, recharts, react-hook-form, zod, lucide-react, date-fns, clsx, @headlessui/react, react-hot-toast

**Dev:** vite, tailwindcss, eslint, prettier, autoprefixer, postcss

### Root (`package.json`)
- cors@^2.8.6 only

---

## Deployment Platform

| Target | Config File | Notes |
|--------|-------------|-------|
| **Render** | `backend/render.yaml` | Backend web service, health: `/api/health`, port 10000 |
| **Vercel** | TODO: Verify | Frontend referenced in env examples |
| **Docker Compose** | `docker-compose.prod.yml` | MongoDB replica set + Redis + backend + nginx frontend |
| **Kubernetes** | `k8s-deployment.example.yml` | Example probes: `/live`, `/ready`, `/health` |
| **Pravah** | `pravah-deployment.yaml` | Custom `apiVersion: artha/v1` format |

---

## Current Status

| Aspect | Status | Evidence |
|--------|--------|----------|
| **Codebase** | Active monorepo (backend + frontend) | Source present |
| **Production Certification** | Claimed in `review_packets/REVIEW_PACKET.md` | Dated 2026-06-16 |
| **CI Pipeline** | Backend lint + test on PR/push to `dev` | `.github/workflows/ci.yml` |
| **Governance Proofs** | Extensive npm scripts (`proof:*`, `verify:*`, `governance:*`) | `backend/package.json` |
| **Runtime Evidence** | JSON snapshots at repo root | `runtime_health_snapshot.json`, `production_runtime_evidence.json` |
| **Test Coverage** | TODO: Verify | Jest config exists; test file presence uncertain |

---

## Key NPM Scripts (Backend)

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start with nodemon |
| `npm start` | Production server |
| `npm test` | Jest with coverage |
| `npm run seed` | Seed database |
| `npm run create-indexes` | Create MongoDB indexes |
| `npm run proof:all` | Run all proof phases |
| `npm run governance:full` | Full governance validation |
| `npm run verify:all` | Independent verification suite |

---

## Package Names

| Package | npm name | Version |
|---------|----------|---------|
| Backend | `artha-backend` | 0.1.0 |
| Frontend | `artha-frontend` | 1.0.0 |
