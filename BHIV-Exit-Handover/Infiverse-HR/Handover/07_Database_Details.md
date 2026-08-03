# Database Details — Infiverse-HR

**Generated:** 2026-07-06  
**Engine:** MongoDB Atlas  
**Full reference:** `backend/docs/database/MONGODB_COLLECTIONS.md`  
**Also see:** `backend/docs/database/DATABASE_DOCUMENTATION.md`

---

## Overview

Primary datastore is **MongoDB Atlas**. PostgreSQL was removed (commented out in gateway `requirements.txt`). No ORM — PyMongo direct access from gateway services.

**Documented collections:** 17+  
**Verified data (2026-05-26):** 240 candidates, 25 active jobs

---

## Core Application Collections

| Collection | Purpose |
|------------|---------|
| `candidates` | Candidate profiles + bcrypt auth |
| `jobs` | Job postings and requirements |
| `applications` | Application tracking |
| `job_applications` | Per-job shortlist/status (`job_id`, `candidate_id` as strings) |
| `feedback` | BHIV values assessment results |
| `interviews` | Interview scheduling and outcomes |
| `offers` | Job offers and negotiations |
| `users` | HR user management |
| `clients` | Client companies (multi-tenant) |

---

## System Collections

| Collection | Purpose |
|------------|---------|
| `api_keys` | API authentication records |
| `rate_limits` | Dynamic rate limiting |
| `audit_logs` | System audit trail |
| `notifications` | Multi-channel notification log |
| `sessions` | User session management |

---

## Reinforcement Learning / AI Collections

| Collection | Purpose |
|------------|---------|
| `ml_feedback` | RL feedback data |
| `performance_metrics` | System performance |
| `matching_cache` | Cached AI matching results |
| `company_scoring_preferences` | Client-specific scoring weights |

---

## Key Schema: `candidates`

```javascript
{
  "_id": ObjectId,
  "name": String,
  "email": String,           // unique index
  "phone": String,
  "location": String,
  "experience_years": Number,
  "technical_skills": String,
  "seniority_level": String,
  "education_level": String,
  "resume_path": String,
  "password_hash": String,   // bcrypt
  "status": String,
  "created_at": ISODate,
  "updated_at": ISODate
}
```

**Indexes:** email (unique), status, location+experience compound, text on skills

---

## Key Schema: `jobs`

Stores job postings with requirements, client_id for tenant isolation, status, and metadata. See `MONGODB_COLLECTIONS.md` for full schema.

---

## Key Schema: `clients`

Multi-tenant client companies. `client_id` used to scope jobs, candidates, and portal data.

---

## Multi-Tenant Isolation

- Jobs and pipeline data scoped by `client_id`
- Tenant isolation verified in evidence bundle
- Control Center governance adds policy-scoped visibility
- **Gap:** Not all endpoints enforce same patterns — see Known Issues

---

## Schema Management Tools

| Script | Purpose |
|--------|---------|
| `backend/services/gateway/verify_mongodb_schema.py` | Validate schema |
| `backend/services/gateway/migrate_mongodb_schema.py` | Run migrations |
| `backend/services/gateway/create_mongodb_indexes.py` | Create indexes |

---

## Workforce Governance Collections

Workforce runtime modules (`workforce_runtime.py`, `decision_ledger.py`, etc.) use additional collections for:

- Employee lifecycle events
- Policy records
- Governance challenges/reviews
- Decision ledger entries
- SETU signal lineage

See `WORKFORCE_LIFECYCLE_API.md`, `DECISION_LEDGER_MODEL.md` in repo docs.

---

## Backup & Recovery

| Action | Method |
|--------|--------|
| Backup | MongoDB Atlas → Backup (Cloud Backup) |
| Point-in-time | Atlas M10+ feature — TODO: Verify plan tier |
| Export | `mongodump` / Atlas export |

---

## Connection Configuration

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/
MONGODB_DB_NAME=<database_name>
DATABASE_URL=<same as MONGODB_URI>
```

Ensure Atlas network access allows Render deployment IPs.

---

## Verification

```bash
cd backend
python services/gateway/verify_mongodb_schema.py
```

Evidence of successful runs in `evidence/` folder.

---

## Known Data Issues

| Issue | Notes |
|-------|-------|
| RL training mocked | `ml_feedback` may contain test data only |
| Shared encryption keys | No tenant-specific encryption yet |
| Legacy Streamlit data | May overlap with React portal data — TODO: Verify |
