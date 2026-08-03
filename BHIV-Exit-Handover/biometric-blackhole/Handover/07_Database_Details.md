# Database Details — biometric-blackhole

**Generated:** 2026-07-05  
**Source:** `backend/database.py`, `backend/api.py`  
**Database:** MongoDB Atlas via PyMongo  
**Database name:** `biometric_attendance` (env: `MONGODB_DB_NAME`)

> **Note:** Legacy Supabase SQL files (`supabase_schema.sql`, etc.) are **not used**.

---

## Connection

```python
# backend/database.py
MONGO_URI = os.environ.get('MONGODB_URI', '<hardcoded-fallback>')  # ⚠️
DB_NAME = os.environ.get('MONGODB_DB_NAME', 'biometric_attendance')
client = MongoClient(MONGO_URI, tlsCAFile=certifi.where())
```

Initialized on app startup: `init_db()` in `api.py`

---

## Collections

| Collection | Purpose |
|------------|---------|
| `users` | Authentication |
| `attendance_reports` | Monthly processed reports |
| `manual_users` | Manually added employees |
| `manual_user_daily_records` | Daily hour entries for manual users |
| `hour_rates` | Per-employee hourly rates |
| `finalized_salaries` | Computed salary summaries |
| `confirmed_salaries` | Approved salary records |

---

## Indexes (created in `init_db()`)

```python
db.users.create_index([('email', ASCENDING)], unique=True)

db.attendance_reports.create_index(
    [('user_id', ASCENDING), ('year', ASCENDING), ('month', ASCENDING)],
    unique=True,
)

db.hour_rates.create_index(
    [('user_id', ASCENDING), ('employee_id', ASCENDING)],
    unique=True,
)

db.manual_users.create_index([('user_id', ASCENDING)])
db.finalized_salaries.create_index([('user_id', ASCENDING)])
db.confirmed_salaries.create_index([('user_id', ASCENDING)])
```

---

## Schema Details

### `users`

```json
{
  "_id": "ObjectId",
  "email": "string (lowercase, unique)",
  "password_hash": "string (SHA256)",
  "full_name": "string",
  "role": "employee | admin",
  "created_at": "ISO datetime string",
  "updated_at": "ISO datetime string"
}
```

### `attendance_reports`

Upserted by `(user_id, year, month)`:

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "year": "int",
  "month": "int",
  "daily_report": "array",
  "monthly_summary": "array",
  "statistics": "object",
  "output_file": "string (filename)",
  "created_at": "ISO datetime string",
  "updated_at": "ISO datetime string"
}
```

### `manual_users`

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "...": "fields set by frontend POST body"
}
```

### `manual_user_daily_records`

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "...": "fields set by frontend POST body"
}
```

### `hour_rates`

Upserted by `(user_id, employee_id)`:

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "employee_id": "string",
  "...": "hourly_rate and related fields"
}
```

### `finalized_salaries` / `confirmed_salaries`

```json
{
  "_id": "ObjectId",
  "user_id": "string",
  "...": "salary fields set by frontend POST body"
}
```

---

## Data Isolation

All collections except `users` filter by `user_id` from JWT payload (`g.user_id`).

`POST /api/data/clear-all` deletes all documents for the authenticated user across:
- `attendance_reports`
- `manual_users`
- `manual_user_daily_records`
- `hour_rates`
- `finalized_salaries`
- `confirmed_salaries`

---

## Migrations

No migration framework. Schema evolves via code changes. Collections created on first insert.

Legacy files (do not use):
- `supabase_schema.sql`
- `supabase_schema_update.sql`
- `paid_employees_migration.sql`
- `DATABASE_MIGRATION_GUIDE.md`

---

## Backup

MongoDB Atlas provides automated backups on paid tiers.

Manual backup:
```bash
mongodump --uri="$MONGODB_URI" --db=biometric_attendance --out=./backup
```

Restore:
```bash
mongorestore --uri="$MONGODB_URI" --db=biometric_attendance ./backup/biometric_attendance
```

> TODO: Verify Atlas backup tier and schedule.

---

## TODO: Verify

- [ ] Exact field schemas from live MongoDB documents
- [ ] Total document counts / data volume
- [ ] Atlas cluster region and tier
- [ ] Whether `manual_user_daily_records` has an index (not created in `init_db()`)
