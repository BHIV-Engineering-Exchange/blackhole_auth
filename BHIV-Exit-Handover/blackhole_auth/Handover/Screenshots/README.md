# Screenshots — blackhole_auth Handover

**Generated:** 2026-07-05

This folder is reserved for runtime screenshots captured during handover verification.

## Recommended Screenshots

| # | Description | Filename | Status |
|---|-------------|----------|--------|
| 1 | Welcome page | `welcome_page.png` | TODO: Capture |
| 2 | Login page with email field | `login_page.png` | TODO: Capture |
| 3 | Auth popup iframe | `auth_popup.png` | TODO: Capture |
| 4 | Dashboard with user email | `dashboard_user.png` | TODO: Capture |
| 5 | Dashboard showing allowed apps | `dashboard_apps.png` | TODO: Capture |
| 6 | Disabled app (No Access) | `app_no_access.png` | TODO: Capture |
| 7 | Browser cookies (blackhole_token) | `cookie_blackhole_token.png` | TODO: Capture |
| 8 | /api/health response | `health_endpoint.png` | TODO: Capture |
| 9 | /api/me response in DevTools | `api_me_response.png` | TODO: Capture |
| 10 | Production frontend | `production_frontend.png` | TODO: Capture |

## Capture Instructions

1. Start local dev stack (backend :8080, frontend :5173) or use production
2. Complete full login flow via auth server popup
3. Capture each screen — redact JWT values in cookie screenshots
4. Save with descriptive filename in this folder

See `../13_Runtime_Evidence.md` for full evidence collection guide.
