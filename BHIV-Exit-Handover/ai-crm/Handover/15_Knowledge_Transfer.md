# Knowledge Transfer — AI-CRM

**Generated:** 2026-07-05

---

## Session Overview

| Session | Duration | Topics |
|---------|----------|--------|
| **KT-1: Product & Layout** | 1.5 hr | Overview, nested repo structure, stack |
| **KT-2: Backend & Routes** | 3 hr | Express, 30 mounted routers, middleware |
| **KT-3: Monitoring & AI** | 2 hr | Screen capture, Groq, Gemini, EMS |
| **KT-4: Attendance & Salary** | 2 hr | Attendance cron, salary modules, biometric |
| **KT-5: Frontend** | 2 hr | React app, auth context, Socket.IO |
| **KT-6: Deployment** | 1.5 hr | Render, Vercel, env config, known fixes |
| **KT-7: Q&A** | 1 hr | Pending work, security issues |

---

## KT-1: Product & Layout

**Critical:** App lives at `Downloads/workflow-blackhole-main/` — not repo root.

**Modules:** Tasks, Departments, Attendance, Salary (3 systems), Monitoring, AIMs, Leave, EMS, Procurement, Chatbot, Prana

**Reading:** `Handover/01_README.md`, `README.md`

---

## KT-2: Backend

**Key files:**
1. `server/index.js` — entry, cron jobs, route mounting
2. `server/routes/auth.js` — auth (note plain-text passwords)
3. `server/middleware/auth.js` — JWT via x-auth-token
4. `server/routes/tasks.js` — example CRUD router
5. `server/services/attendanceService.js` — core business logic

**Hands-on:**
```bash
cd server && npm start
curl http://localhost:5001/api/ping
```

**Warning:** 20+ unmounted route files — only edit files imported in index.js.

---

## KT-3: Monitoring & AI

**Services:**
- `intelligentScreenCapture.js` + `websiteMonitor.js` — monitoring pipeline
- `groqAIService.js` — AI insights
- `ocrAnalysisService.js` — Tesseract OCR
- `emsAutomation.js` — email automation

**Flow:** Website visit → disallowed check → screenshot → Cloudinary → MonitoringAlert

---

## KT-4: Attendance & Salary

**Three salary systems:**
1. `/api/hourly-salary` — hourlyBasedSalaryController
2. `/api/enhanced-salary` — enhancedSalaryController
3. `/api/new-salary` — newSalaryManagement routes
4. `/api/biometric` — biometric attendance + salary

**Cron jobs:** Midnight auto-end, daily 11:59 PM persistence

---

## KT-5: Frontend

**Key files:**
- `client/src/App.jsx` — all routes
- `client/src/context/auth-context.jsx` — auth + API URL resolution
- `client/src/lib/api.js` — API modules

**Hands-on:** Login → dashboard → test one module per role

---

## KT-6: Deployment

1. Fix `VITE_API_URL` on Vercel (not localhost)
2. Align PORT env with code
3. Set all server env vars on Render
4. See `DEPLOYMENT_FIX_GUIDE.md`

**Before production:** Implement bcrypt password hashing.

---

## KT-7: Q&A

Review: `Handover/09_Pending_Work.md`, `HANDOVER_SHEET.md`, `Handover/10_Known_Issues.md`

---

## Sign-Off

| Session | Attendee | Date |
|---------|----------|------|
| KT-1 | | |
| KT-2 | | |
| KT-3 | | |
| KT-4 | | |
| KT-5 | | |
| KT-6 | | |
| KT-7 | | |
