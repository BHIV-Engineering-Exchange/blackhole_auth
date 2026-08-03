# Database Details — hackaverse

**Generated:** 2026-07-05  
**Source:** `hackathon/src/database.py`, `hackathon/src/db_models.py`, `SYSTEM_HANDOVER.md`

---

## Database

| Property | Value |
|----------|-------|
| Engine | MongoDB Atlas (PyMongo) |
| Database name | `hackaverse_db` (env: `BUCKET_DB_NAME`) |
| Connection | `MONGODB_URI` env var |
| Degraded mode | Starts without DB if URI missing/invalid |

Example cluster (from `.env.example`): `cluster0.oeh93tq.mongodb.net` — TODO: Verify live cluster.

---

## Indexes (created in `connect_to_db()`)

| Collection | Index |
|------------|-------|
| `sessions` | `expires_at` (TTL) |
| `users` | `email` (unique), `user_id` (unique) |
| `teams` | `team_id` (unique), `hackathon_id` |
| `submissions` | `team_id`, `hackathon_id` |
| `notifications` | `(user_id, created_at)` |
| `webhooks` | `webhook_id` (unique) |
| `provenance_logs` | `timestamp` |

---

## Core Collections

| Collection | Purpose |
|------------|---------|
| `users` | Accounts — email, password hash, role, profile |
| `sessions` | Session tokens (TTL 7 days) |
| `teams` | Team records |
| `submissions` | Project submissions |
| `notifications` | User notifications |
| `webhooks` | Webhook subscriptions |
| `provenance_logs` | Activity/audit logs |
| `judges` | Judge records (used by judge APIs — not in main COLLECTIONS dict) |
| `hackathons` | Hackathon events |
| `invitations` | Team/judge invitations |
| `judgments` | Scoring results |

> TODO: Verify full collection list from live MongoDB — models spread across route handlers.

---

## User Schema (from `db_models.py`)

```python
{
  "user_id": "string",
  "email": "email",
  "name": "string",
  "role": "admin | participant | judge",
  "created_at": "ISO datetime",
  "profile_completion": 0,
  "skills": [],
  "bio": null
}
```

**Role assignment:**
- Self-registration → always `participant` (forced in `auth_routes.py`)
- Admin/judge → via `seed_data.py` or incomplete invitation flows

---

## Team Schema

```python
{
  "team_id": "string",
  "hackathon_id": "string",
  "team_name": "string",
  "project_title": "string",
  "leader_id": "string",
  "members": ["user_id", ...]
}
```

---

## Submission Schema

```python
{
  "submission_id": "string",
  "team_id": "string",
  "hackathon_id": "string",
  "title": "string",
  "description": "string",
  "github_link": null,
  "demo_link": null,
  "status": "submitted | scoring | passed | failed",
  "score": null
}
```

---

## Judgment Schema

```python
{
  "judgment_id": "string",
  "submission_hash": "string",
  "team_id": "string",
  "hackathon_id": "string",
  "scores": {},
  "total_score": 0.0,
  "judge_type": "ai | manual",
  "judged_by": null,
  "version": 1
}
```

---

## Seeding

```bash
cd hackathon
python seed_data.py
```

Creates default users (from docs):
- `admin@hackaverse.com` — admin
- `judge@hackaverse.com` — judge
- Participant test accounts

> TODO: Verify exact seeded credentials — check `seed_data.py` and rotate for production.

---

## Backup

MongoDB Atlas automated backups on paid tiers.

Manual:
```bash
mongodump --uri="$MONGODB_URI" --db=hackaverse_db --out=./backup
```

**Warning:** `DEPLOYMENT_NOTES.md` states dev and prod may share the same cluster.

---

## TODO: Verify

- [ ] Full collection inventory from production MongoDB
- [ ] Whether `judges` collection is populated in production
- [ ] Atlas backup tier and schedule
- [ ] Data volume and retention policies
