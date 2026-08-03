# API Documentation — AI-Content

**Generated:** 2026-07-05  
**Base URL (local):** `http://localhost:9000`  
**Production:** `https://ai-agent-aff6.onrender.com`  
**Authentication:** `Authorization: Bearer <JWT>` unless noted as Public  
**OpenAPI:** `GET /docs`, `GET /openapi.json`

---

## App-Level Endpoints (`main.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/docs` | Public | `custom_docs` |
| POST | `/test-data-saving` | Bearer | `test_data_saving` |
| GET | `/debug-auth` | Bearer | `debug_auth_main` |
| GET | `/debug-routes` | Bearer | `debug_routes` |
| GET | `/health/detailed` | Public/Bearer | `health_detailed` |
| GET | `/metrics/performance` | Bearer | `performance_metrics` |
| GET | `/metrics` | Bearer | `metrics_info` |
| GET | `/monitoring-status` | Bearer | `monitoring_status` |

**Auto-generated:** `GET /openapi.json`, `GET /redoc`  
**Prometheus:** `GET /metrics/prometheus` (if instrumentator available)  
**Static:** `GET /generated/{path}` (temp generated videos)

---

## Default Router (`routes.py` → `router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/health` | Public | `health_check_default` |
| GET | `/` | Bearer* | `root` |
| GET | `/test` | Bearer* | `simple_test` |

*Not in GlobalAuthMiddleware public list — may return 401.

---

## Step 1 — System Health & Demo (`step1_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/health` | Public | `health_check` *(duplicate)* |
| GET | `/demo-login` | Public | `demo_login` |
| GET | `/debug-auth` | Bearer | `debug_auth` *(duplicate)* |
| GET | `/health/detailed` | Public | `detailed_health_check` *(duplicate)* |
| GET | `/monitoring-status` | Bearer | `get_monitoring_status` *(duplicate)* |

---

## Authentication — prefix `/users` (`auth.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/users/register` | Public | `register_user` |
| POST | `/users/login` | Public | `login_user` (OAuth2 form) |
| POST | `/users/login-json` | Public | `login_user_json` |
| POST | `/users/refresh` | Public | `refresh_token` |
| GET | `/users/profile` | Bearer | `get_user_profile` |
| POST | `/users/logout` | Bearer | `logout_user` |
| GET | `/users/debug-user/{username}` | Bearer | `debug_user_exists` |
| GET | `/users/supabase-auth-health` | Bearer | `supabase_auth_health` |

---

## Step 2 — User Management (`step2_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/invite-user` | Bearer | `invite_user` |
| GET | `/verify-email` | Public | `verify_email` |
| GET | `/accept-invitation` | Public | `accept_invitation` |
| DELETE | `/users/{user_id}/data` | Bearer | `delete_user_data_legacy` |
| GET | `/users/{user_id}/data-export` | Bearer | `export_user_data_legacy` |

---

## Step 3 — Upload & Video (`step3_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/contents` | Bearer | `list_contents` |
| POST | `/upload` | Bearer | `upload_async` |
| POST | `/generate-video` | Bearer | `generate_video` |
| GET | `/cdn/upload-url` | Bearer | `get_cdn_upload_url` |

---

## Step 4 — Content Access (`step4_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/content/{content_id}` | Bearer | `get_content` |
| GET | `/content/{content_id}/metadata` | Bearer | `get_content_metadata` |
| GET | `/download/{content_id}` | Bearer | `download` |
| GET | `/stream/{content_id}` | Bearer | `stream_video` |

---

## Step 5 — Feedback & Tags (`step5_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/feedback` | Bearer | `feedback_async` |
| GET | `/recommend-tags/{content_id}` | Bearer | Tag recommendation handler |
| GET | `/average-rating/{content_id}` | Bearer | `get_average_rating` |

---

## Simple Feedback (`simple_feedback_route.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/feedback-simple` | Bearer | `feedback_simple` |

---

## Step 6 — Analytics & Monitoring (`step6_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/metrics` | Bearer | `metrics_async` *(duplicate)* |
| GET | `/rl/agent-stats` | Bearer | `get_rl_agent_stats` |
| GET | `/lm/stats` | Bearer | `get_lm_stats` |
| GET | `/debug/database` | Bearer | `debug_database` |
| GET | `/logs` | Bearer | `get_logs` |
| GET | `/streaming-performance` | Bearer | `get_streaming_performance` |
| GET | `/reports/video-stats` | Bearer | `get_video_stats` |
| GET | `/reports/storyboard-stats` | Bearer | `get_storyboard_stats` |
| GET | `/ingest/webhook` | Bearer | `webhook_ingest_get` |
| POST | `/ingest/webhook` | Bearer | `webhook_ingest_post` |
| GET | `/bucket/stats` | Bearer | `get_bucket_stats` |
| GET | `/bucket/list/{segment}` | Bearer | `list_bucket_files` |
| GET | `/bhiv/analytics` | Bearer | `get_bhiv_analytics` |
| GET | `/observability/health` | Bearer | `get_observability_health_endpoint` |
| GET | `/observability/performance` | Bearer | `get_performance_metrics` |
| GET | `/debug/system` | Bearer | `debug_system` |
| GET | `/debug/errors` | Bearer | `debug_errors` |

---

## Step 7 — Task Queue (`step7_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/tasks/{task_id}` | Bearer | `get_task_status` |
| GET | `/tasks/queue/stats` | Bearer | `get_queue_stats` |
| POST | `/tasks/create-test` | Bearer | `create_test_task` |

---

## Step 8 — Maintenance (`step8_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/bucket/cleanup` | Bearer | `cleanup_bucket` |
| POST | `/bucket/rotate-logs` | Bearer | `rotate_logs` |
| GET | `/maintenance/failed-operations` | Bearer | `get_failed_operations` |

---

## Step 9 — Dashboard (`step9_router`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/dashboard` | Bearer | `get_dashboard` |

---

## CDN — prefix `/cdn` (`cdn_fixed.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/cdn/upload-url` | Bearer | `get_upload_url` |
| POST | `/cdn/upload/{upload_token}` | Bearer | `upload_file` |
| GET | `/cdn/download/{content_id}` | Bearer | `download_file` |
| GET | `/cdn/stream/{content_id}` | Bearer | `stream_file` |
| GET | `/cdn/list` | Bearer | `list_files` |
| DELETE | `/cdn/delete/{content_id}` | Bearer | `delete_file` |
| GET | `/cdn/info/{content_id}` | Bearer | `get_file_info` |

---

## Presigned URLs — prefix `/presigned` (`presigned_urls.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/presigned/upload` | Bearer | `generate_upload_url` |
| GET | `/presigned/download/{segment}/{filename}` | Bearer | `generate_download_url` |
| GET | `/presigned/list/{segment}` | Bearer | `list_user_files` |
| DELETE | `/presigned/{segment}/{filename}` | Bearer | `delete_user_file` |
| GET | `/presigned/health` | Bearer | `storage_health_check` |

---

## GDPR (`gdpr_compliance.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/gdpr/privacy-policy` | Bearer* | `get_privacy_policy` |
| GET | `/gdpr/export-data` | Bearer | `export_user_data` |
| DELETE | `/gdpr/delete-data` | Bearer | `delete_user_data` |
| GET | `/gdpr/data-summary` | Bearer | `get_data_summary` |

*Privacy policy may require auth due to GlobalAuthMiddleware public list gap.

---

## Jinja Dashboard — prefix `/jinja-dashboard` (`analytics_jinja.py`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/jinja-dashboard/` | Bearer | Dashboard index handler |

---

## Standalone Dev Servers (NOT in main app)

| Server | Endpoints |
|--------|-----------|
| `scripts/local_llm_server.py` | POST `/suggest_storyboard`, POST `/improve_storyboard`, GET `/health` |
| `scripts/perplexity_llm_server.py` | Same as above |

---

## Frontend API Mapping (`frontend/src/services/api.ts`)

| Frontend Method | Backend Endpoint |
|-----------------|------------------|
| `authAPI.login` | POST `/users/login` |
| `authAPI.register` | POST `/users/register` |
| `authAPI.getProfile` | GET `/users/profile` |
| `authAPI.getDemoLogin` | GET `/demo-login` |
| `contentAPI.uploadFile` | POST `/upload` |
| `contentAPI.generateVideo` | POST `/generate-video` |
| `contentAPI.getContent` | GET `/content/{id}` |
| `contentAPI.listContents` | GET `/contents` |
| `contentAPI.downloadVideo` | GET `/download/{id}` |
| `contentAPI.streamVideo` | GET `/stream/{id}` |
| `healthAPI.check` | GET `/health` |

---

## Middleware Reference

| Middleware | File | Purpose |
|------------|------|---------|
| InputValidationMiddleware | `input_validation.py` | 100MB body limit |
| GlobalAuthMiddleware | `auth_middleware.py` | Bearer token enforcement |
| RequestIDMiddleware | `request_middleware.py` | Request ID |
| StructuredLoggingMiddleware | `request_middleware.py` | JSON logging |
| RateLimitMiddleware | `rate_limit_middleware.py` | Rate limiting |
| CORSMiddleware | FastAPI built-in | CORS (`*` origins) |

---

## Known Route Issues

1. **Duplicate registrations:** `/health`, `/metrics`, `/debug-auth`, `/health/detailed`, `/monitoring-status`, `/cdn/upload-url`
2. **Unmounted routers:** `analytics.py`, `analytics_dashboard.py`
3. **Dead code:** `routes_updated.py` not imported
4. **Public path gaps:** `/`, `/test`, `/gdpr/privacy-policy` not in GlobalAuthMiddleware public list

---

## Approximate Endpoint Count

~90 route registrations (including duplicates and framework defaults).

Full interactive docs: http://localhost:9000/docs
