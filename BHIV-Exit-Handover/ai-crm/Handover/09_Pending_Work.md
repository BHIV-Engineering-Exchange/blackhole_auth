# Pending Work — AI-CRM

**Generated:** 2026-07-05  
**Sources:** HANDOVER_SHEET.md, DEPLOYMENT_FIX_GUIDE.md, code analysis

---

## Critical Priority

| # | Item | Source |
|---|------|--------|
| 1 | **Implement bcrypt password hashing** | Plain-text passwords in auth.js |
| 2 | **Fix production VITE_API_URL on Vercel** | DEPLOYMENT_FIX_GUIDE.md |
| 3 | **Standardize port (5000 vs 5001)** | index.js, .env.example, Dockerfile |
| 4 | **Restructure repo** — move app to git root | Repo layout |
| 5 | **Add auth to monitoring endpoints** | monitoring.js mostly unauthenticated |

---

## From HANDOVER_SHEET.md (Final Pending Tasks)

| # | Item | Type |
|---|------|------|
| 6 | **Alert push/email integration** | Backend — connect MonitoringAlert to pushNotificationService + emailService |
| 7 | **Data retention automation cron** | Backend — delete monitoring data after retention period expires |
| 8 | **Report explainability UI** | Frontend — display AI analysis reasons in reports |
| 9 | **Task timeline integration UI** | Frontend — correlate monitoring activity with task time ranges |

---

## High Priority

| # | Item | Notes |
|---|------|-------|
| 10 | **Add CI/CD pipeline** | No GitHub Actions present |
| 11 | **Mount or remove 20+ orphaned route files** | Risk of editing wrong file |
| 12 | **Remove Google OAuth remnants** | Env vars + AuthCallback page remain |
| 13 | **Fix frontend API path mismatches** | biometric-attendance vs /biometric |
| 14 | **Add automated tests** | npm test is placeholder |
| 15 | **Rotate JWT if using default "jwtSecret"** | Fallback in code |

---

## Medium Priority

| # | Item | Notes |
|---|------|-------|
| 16 | Add docker-compose for local dev | Not present |
| 17 | Consolidate duplicate dashboard routes | dashboard.js + dashboardFixed.js |
| 18 | Consolidate duplicate AI routes | /api/ai + /api/new/ai |
| 19 | Remove nested Complete-Infiverse-main legacy folder | Or document clearly |
| 20 | Update backend README CI badge URL | Points to wrong repo |
| 21 | Add MongoDB backup automation | TODO: Verify Atlas schedule |

---

## Low Priority

| # | Item |
|---|------|
| 22 | Expand root repo README (currently none at AI-CRM root) |
| 23 | Add frontend lint/test to CI |
| 24 | Document Socket.IO event names |
| 25 | Clean up debug/test scripts at server root |

---

## Items Marked TODO: Verify

- Production URLs live status (Render + Vercel)
- MongoDB Atlas project ownership
- Cloudinary account ownership
- Which frontend URL is canonical (blackhole-workflow vs main-workflow)
- OpenCage geocoding mentioned in README but not in .env.example
