# Database Details — Nagar-Pranali

**Generated:** 2026-07-06  
**Engine:** MySQL  
**Database name:** `uccis`  
**Schema file:** `UCCIS -Main/backend/database/schema.sql`  
**Seed file:** `UCCIS -Main/backend/database/seed.sql`

---

## Setup

```bash
mysql -u root -p < "UCCIS -Main/backend/database/schema.sql"
mysql -u root -p uccis < "UCCIS -Main/backend/database/seed.sql"
```

Connection via `mysql2` pool in `database/db.js`:

```javascript
mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined
})
```

---

## Tables

### `signals`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | Primary key |
| signal_type | VARCHAR(100) | e.g. "Flood Alert" |
| location_name | VARCHAR(100) | Location string |
| created_at | TIMESTAMP | Default CURRENT_TIMESTAMP |

### `telemetry`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | |
| signal_id | INT | FK to signals.id |
| telemetry_data | TEXT | Sensor/event data |
| created_at | TIMESTAMP | |

> **Note:** README/docs refer to `telemetry_events` — **wrong name**.

### `incidents`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | |
| signal_id | INT | Links to signal |
| incident_type | VARCHAR(100) | |
| severity | VARCHAR(50) | |
| status | VARCHAR(50) | e.g. "OPEN" |

### `escalations`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | |
| incident_id | INT | Links to incident |
| escalation_level | VARCHAR(50) | |
| assigned_to | VARCHAR(100) | e.g. "Control Center" |

### `decisions`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | |
| escalation_id | INT | Links to escalation |
| decision_text | TEXT | |

### `replay_records`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | |
| incident_id | INT | Links to incident |
| replay_json | JSON | Timeline array |

> **Note:** `/api/dashboard` queries `replay_sessions` — **wrong name**.

### `runtime_logs`

| Column | Type | Notes |
|--------|------|-------|
| id | INT AUTO_INCREMENT PK | |
| log_message | TEXT | |
| created_at | TIMESTAMP | |

---

## Relationships

```
signals (1) ──► (N) telemetry
signals (1) ──► (N) incidents
incidents (1) ──► (N) escalations
escalations (1) ──► (N) decisions
incidents (1) ──► (N) replay_records
runtime_logs (standalone audit stream)
```

No formal FOREIGN KEY constraints in `schema.sql` — relationships are logical only.

---

## Seed Data

`seed.sql` inserts one row:

```sql
INSERT INTO runtime_logs (log_message) VALUES ('UCCIS System Initialized');
```

Demo scenarios populate all tables via `operationalController.js`.

---

## Schema vs Code Mismatches

| Code location | Uses | Schema has |
|---------------|------|------------|
| `server.js` `/api/dashboard` | `telemetry_events`, `replay_sessions` | `telemetry`, `replay_records` |
| `routes/telemetry.js` | `telemetry_events` | `telemetry` |
| `routes/signals.js` | column `signal_id` | column `id` |
| `operationalController.js` | `telemetry`, `replay_records` | ✅ Correct |

**Impact:** Dashboard summary and several GET routes return 500 errors on fresh schema.

---

## Indexes

No explicit indexes defined in `schema.sql` beyond PRIMARY KEYs.

Recommended for production:
- `signals.created_at`
- `incidents.signal_id`
- `telemetry.signal_id`
- `runtime_logs.created_at`

---

## Backup

| Action | Method |
|--------|--------|
| Dump | `mysqldump -u user -p uccis > backup.sql` |
| Restore | `mysql -u user -p uccis < backup.sql` |
| Managed host | Use provider backup feature — TODO: Verify host |

---

## Production Host

**TODO: Verify** which MySQL provider/host is used with Render deployment.

Credentials set via Render env vars: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
