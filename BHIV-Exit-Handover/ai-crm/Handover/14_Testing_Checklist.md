# Testing Checklist — AI-CRM

**Generated:** 2026-07-05

---

## Pre-Test Setup

- [ ] MongoDB Atlas accessible
- [ ] `server/.env` configured
- [ ] `client/.env.local` configured with matching port
- [ ] Backend: `cd server && npm start`
- [ ] Frontend: `cd client && npm run dev`
- [ ] Admin user seeded: `node scripts/seedAdmin.js`

---

## Health & Infrastructure

- [ ] `GET /api/ping` → 200
- [ ] `GET /api/test-browser-detection` → tools status (Linux)
- [ ] MongoDB connected (no connection errors in logs)
- [ ] Socket.IO connects in browser console

---

## Authentication

- [ ] POST `/api/auth/register` → JWT returned
- [ ] POST `/api/auth/login` → JWT returned
- [ ] GET `/api/auth/me` with token → user data
- [ ] POST `/api/auth/forgot-password` → email sent (if configured)
- [ ] Frontend login/logout flow works
- [ ] Token stored as `WorkflowToken` in localStorage
- [ ] 401 redirects to `/login`

---

## Tasks

- [ ] GET `/api/tasks` lists tasks
- [ ] POST `/api/tasks` creates task
- [ ] PUT `/api/tasks/:id` updates task
- [ ] DELETE `/api/tasks/:id` deletes task
- [ ] Task submission flow works
- [ ] Frontend `/tasks` page functional

---

## Attendance

- [ ] POST `/api/attendance/start-day/:userId`
- [ ] POST `/api/attendance/end-day/:userId`
- [ ] GET `/api/attendance/user/:userId`
- [ ] GET `/api/attendance/live` (admin)
- [ ] Frontend attendance dashboard loads

---

## Leave

- [ ] POST `/api/leave/request`
- [ ] GET `/api/leave/pending`
- [ ] PUT `/api/leave/:id/approve`
- [ ] Frontend leave request page works

---

## Salary

- [ ] GET `/api/hourly-salary/my-salary/current`
- [ ] GET `/api/enhanced-salary/calculate/:userId/:year/:month`
- [ ] POST `/api/biometric/upload`
- [ ] GET `/api/new-salary/records` (admin)
- [ ] Frontend salary pages load

---

## Monitoring (Admin)

- [ ] POST `/api/monitoring/start/:employeeId`
- [ ] GET `/api/monitoring/employees/:id/screenshots`
- [ ] GET `/api/monitoring/alerts`
- [ ] POST `/api/monitoring/report/pdf/:employeeId`
- [ ] Frontend `/monitoring` page loads

---

## AI

- [ ] GET `/api/ai/insights`
- [ ] POST `/api/ai/optimize`
- [ ] POST `/api/chatbot/chat`

---

## EMS

- [ ] GET `/api/ems/templates`
- [ ] POST `/api/ems/send-task-reminders`
- [ ] Frontend EMS dashboard loads

---

## GDPR / Consent

- [ ] POST `/api/consent`
- [ ] GET `/api/alerts`

---

## Frontend Build

```bash
cd client
npm run lint
npm run build
```

- [ ] Build succeeds without errors

---

## Production Smoke Tests

- [ ] `GET https://blackholeworkflow.onrender.com/api/ping` → 200
- [ ] Frontend loads at Vercel URL
- [ ] Login works on production (if credentials available)
- [ ] No localhost API calls in browser network tab

---

## Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Developer | | | |
| QA | | | |
| Tech Lead | | | |
