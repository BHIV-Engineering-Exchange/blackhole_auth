# Database Details — AI-Content

**Generated:** 2026-07-05  
**ORM:** SQLModel (SQLAlchemy-based)  
**Migrations:** Alembic  
**Connection:** `core/database.py` → `DatabaseManager`

---

## Connection Configuration

| Setting | Detail |
|---------|--------|
| **Primary** | PostgreSQL via Supabase (`DATABASE_URL`) |
| **Fallback** | SQLite (`sqlite:///./ai_agent.db` or `./data.db`) |
| **Priority** | 1) Explicit `DATABASE_URL` → 2) Build from Supabase creds → 3) SQLite |
| **Init** | `create_db_and_tables()` at startup |
| **Session** | SQLModel `Session` via `DatabaseManager` |

> **Note:** Some code uses raw `sqlite3.connect('data.db')` — TODO: Verify consistency with SQLModel path.

---

## Migration

| Item | Detail |
|------|--------|
| **Tool** | Alembic |
| **Config** | `backend/alembic.ini` |
| **Migrations dir** | `backend/migrations/` |
| **Latest revision** | `cf09dd265e44_create_complete_schema.py` |
| **Upgrade** | `alembic upgrade head` |
| **Downgrade** | `alembic downgrade -1` |

---

## SQLModel Tables (8 models)

### User (`user`)

| Field | Type | Notes |
|-------|------|-------|
| user_id | str | Primary key |
| username | str | Unique, indexed |
| password_hash | str | Optional (Supabase auth) |
| email | str | Optional |
| email_verified | bool | Default: false |
| verification_token | str | Optional |
| sub | str | Supabase user ID |
| role | str | Default: "user" |
| last_login | float | Optional |
| created_at | float | Timestamp |

---

### Content (`content`)

| Field | Type | Notes |
|-------|------|-------|
| content_id | str | Primary key |
| uploader_id | str | FK → user.user_id |
| title | str | Required |
| description | str | Optional |
| file_path | str | Storage path |
| content_type | str | MIME/type |
| duration_ms | int | Default: 0 |
| uploaded_at | float | Timestamp |
| authenticity_score | float | Default: 0.0 |
| current_tags | str | JSON string |
| views | int | Default: 0 |
| likes | int | Default: 0 |
| shares | int | Default: 0 |

---

### Feedback (`feedback`)

| Field | Type | Notes |
|-------|------|-------|
| id | int | Primary key (auto) |
| content_id | str | FK → content.content_id |
| user_id | str | FK → user.user_id |
| event_type | str | Event classification |
| watch_time_ms | int | Default: 0 |
| reward | float | RL reward signal |
| rating | int | Optional 1-5 |
| comment | str | Optional |
| sentiment | str | VADER result |
| engagement_score | float | Optional |
| ip_address | str | Optional |
| timestamp | float | Event time |

---

### Script (`script`)

| Field | Type | Notes |
|-------|------|-------|
| script_id | str | Primary key |
| content_id | str | FK → content (optional) |
| user_id | str | FK → user.user_id |
| title | str | Required |
| script_content | str | Script text |
| script_type | str | Default: "text" |
| file_path | str | Optional |
| created_at | float | Timestamp |
| used_for_generation | bool | Default: false |
| version | str | Default: "1.0" |
| script_metadata | str | JSON string |

---

### AuditLog (`audit_logs`)

| Field | Type | Notes |
|-------|------|-------|
| id | int | Primary key (auto) |
| user_id | str | Optional |
| action | str | upload, rate, delete, etc. |
| resource_type | str | content, user, script |
| resource_id | str | Resource identifier |
| timestamp | float | Event time |
| ip_address | str | Optional |
| user_agent | str | Optional |
| request_id | str | Optional |
| details | str | JSON string |
| status | str | Default: "success" |

---

### Invitation (`invitations`)

| Field | Type | Notes |
|-------|------|-------|
| id | int | Primary key (auto) |
| email | str | Invitee email |
| inviter_id | str | FK → user.user_id |
| invitation_token | str | Unique token |
| created_at | float | Timestamp |
| expires_at | float | Expiry time |
| used | bool | Default: false |
| used_at | float | Optional |

---

### Analytics (`analytics`)

| Field | Type | Notes |
|-------|------|-------|
| id | int | Primary key (auto) |
| event_type | str | Event classification |
| user_id | str | FK → user (optional) |
| content_id | str | FK → content (optional) |
| event_data | str | JSON string |
| timestamp | float | Event time |
| ip_address | str | Optional |

---

### SystemLog (`system_logs`)

| Field | Type | Notes |
|-------|------|-------|
| id | int | Primary key (auto) |
| level | str | Log level |
| message | str | Log message |
| module | str | Optional source module |
| timestamp | float | Log time |
| request_id | str | Optional |
| user_id | str | Optional |
| details | str | JSON string |

---

## Pydantic Schemas (`app/models.py`)

Request/response models (not database tables):

- `UserRegister`, `UserLogin`, `Token`, `RefreshToken`
- `FeedbackRequest`, `ContentUpload`
- `VideoGenerationResponse`, `MetricsResponse`
- `AnalyticsResponse`, `TagRecommendationResponse`

---

## Local JSON Bucket Storage

Separate from SQLModel — file-based storage in `backend/bucket/`:

| Segment | Purpose |
|---------|---------|
| Content files | Uploaded media |
| Metadata | Content metadata JSON |
| Logs | System log files |

Managed by `core/bhiv_bucket.py` and `core/bhiv_bucket_enhanced.py`.

---

## Database Scripts

| Script | Purpose |
|--------|---------|
| `alembic upgrade head` | Apply migrations |
| `update_system_logs_table.py` | System logs table update |
| `create_demo_in_supabase.py` | Demo user setup (TODO: Verify) |

---

## CI Migration Check

CI workflow runs Alembic upgrade/rollback against Postgres 15 service container before deploy.

---

## Backup Considerations

- **Supabase:** Use Supabase dashboard backups or pg_dump
- **SQLite:** Copy `ai_agent.db` or `data.db` file
- **Local bucket:** Copy `backend/bucket/` directory

> TODO: Verify automated backup schedule for production Supabase instance.

---

## GDPR Data Operations

| Operation | Endpoint | Tables Affected |
|-----------|----------|-----------------|
| Export | `GET /gdpr/export-data` | user, content, feedback, script, analytics |
| Delete | `DELETE /gdpr/delete-data` | All user-related records |
| Summary | `GET /gdpr/data-summary` | Read-only summary |

Retention controlled by `DATA_RETENTION_DAYS` and `AUTO_DELETE_EXPIRED_DATA`.
