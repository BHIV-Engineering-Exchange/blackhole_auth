# Knowledge Transfer — biometric-blackhole

**Generated:** 2026-07-05

---

## Session Overview

| Session | Duration | Topics | Materials |
|---------|----------|--------|-----------|
| **KT-1: Product & Architecture** | 1.5 hours | Overview, stack, data flow | `01_README.md`, `04_Architecture.md` |
| **KT-2: Backend Deep Dive** | 2 hours | Flask API, auth, processor | `api.py`, `auth.py`, `attendance_processor.py` |
| **KT-3: Frontend & Integration** | 1.5 hours | React app, auth, API client | `App.jsx`, `AuthContext.jsx`, `Reports.jsx` |
| **KT-4: Database & Data Model** | 1 hour | MongoDB collections, isolation | `07_Database_Details.md`, `database.py` |
| **KT-5: Deployment & Ops** | 1.5 hours | Render, Vercel, MongoDB Atlas | `03_Deployment_Guide.md`, `render.yaml` |
| **KT-6: Security & Known Issues** | 1 hour | Secrets, auth gaps, remediation | `10_Known_Issues.md`, `09_Pending_Work.md` |
| **KT-7: Handover Q&A** | 1 hour | Open questions, sign-off | `12_REVIEW_PACKET.md`, `14_Testing_Checklist.md` |

---

## KT-1: Product & Architecture

### Learning Objectives
- Understand attendance processing workflow
- Know technology stack and deployment targets
- Understand user data isolation model

### Key Concepts
1. **Excel ingestion** — biometric device export → pandas processing
2. **Salary calculation** — hour rates + overtime rules
3. **Per-user isolation** — all data scoped by JWT `user_id`
4. **MongoDB** — not Supabase (legacy docs are stale)

### Demo
- Walk through upload → process → reports flow on local environment

### Reading
- `Handover/01_README.md`
- `backend/README.md`

---

## KT-2: Backend Deep Dive

### Key Files (in order)

| # | File | Why |
|---|------|-----|
| 1 | `api.py` | All REST routes, production entry |
| 2 | `auth.py` | JWT register/login, `@jwt_required` |
| 3 | `database.py` | MongoDB connection, indexes |
| 4 | `attendance_processor.py` | Core Excel + salary logic |
| 5 | `config.py` | Configuration |

### Demo
```bash
cd backend && python api.py
curl http://localhost:5000/api/health
# Register, login, process file via curl
```

### Discussion Points
- Why Flask dev server in production is a problem
- Unauthenticated download endpoint risk
- Role assignment via email substring

---

## KT-3: Frontend & Integration

### Key Files

| File | Purpose |
|------|---------|
| `App.jsx` | Routing, auth guards, role redirect |
| `contexts/AuthContext.jsx` | Auth state management |
| `lib/auth.js` | Token storage, authFetch, 401 handling |
| `services/apiService.js` | API call functions |
| `pages/Reports.jsx` | Main dashboard |
| `config.js` | API URL configuration |

### Demo
- Register → login → upload → view reports
- Show localStorage token storage
- Show 401 redirect behavior

---

## KT-4: Database & Data Model

### Topics
- MongoDB Atlas setup and connection
- 7 collections and their relationships
- Indexes created in `init_db()`
- Upsert patterns (attendance_reports by year/month)
- Clear-all operation

### Demo
```bash
python -c "from database import get_db; print(get_db().list_collection_names())"
```

---

## KT-5: Deployment & Ops

### Topics
- Render backend deployment via `render.yaml`
- Vercel frontend deployment
- Environment variables per platform
- MongoDB Atlas IP whitelisting
- Cold start behavior on Render free tier

### Demo
- Walk through Render dashboard
- Walk through Vercel dashboard
- Show health check endpoint

---

## KT-6: Security & Known Issues

### Must Cover
1. Hardcoded credentials — rotation procedure
2. Unauthenticated endpoints — remediation plan
3. Password hashing weakness — migration approach
4. No CI/CD — risk and mitigation
5. Stale Supabase documentation — what to ignore

### Reading
- `Handover/10_Known_Issues.md`
- `Handover/09_Pending_Work.md`

---

## KT-7: Handover Q&A

### Checklist
- [ ] All KT sessions completed
- [ ] Successor can run locally
- [ ] Successor has Render/Vercel/Atlas access
- [ ] Secrets rotation plan agreed
- [ ] Open TODOs documented
- [ ] Sign-off on `14_Testing_Checklist.md`

---

## Handover Contacts

> TODO: Verify names and contact details.

| Role | Name | Contact |
|------|------|---------|
| Outgoing developer | | |
| Successor | | |
| Infrastructure admin | | |
