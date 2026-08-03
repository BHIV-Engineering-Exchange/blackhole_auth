# Third-Party Services — workflow-blackhole

## Hosting

| Service | URL (from code) | Role |
|---------|-----------------|------|
| Vercel | `blackhole-workflow.vercel.app` | Frontend |
| Render | `blackholeworkflow.onrender.com` | Backend API |
| Custom domain | `niyantran.blackholeinfiverse.com` | Allowed CORS origin — **TODO: Verify** |

---

## Database

| Service | Config |
|---------|--------|
| MongoDB Atlas (typical) | `MONGODB_URI` |

---

## BHIV ecosystem

| Service | Integration |
|---------|-------------|
| Sampada (Infiverse-HR) | SETU `niyantran_telemetry` via `setuDispatcher.js` |
| NIYANTRAN / PARIKSHAN | Execution telemetry domain naming; Tantra participation |

---

## AI providers

| Provider | Usage |
|----------|-------|
| Google Generative AI | `@google/generative-ai` |
| Groq | `groq-sdk` |
| Gemini AI package | `gemini-ai` |

Env: `GOOGLE_AI_API_KEY`, `GROQ_API_KEY` (per README).

---

## Communications & media

| Service | Usage |
|---------|-------|
| Nodemailer / SMTP | Email notifications, EMS |
| Cloudinary | Image/file uploads |
| web-push / VAPID | Browser push notifications |

---

## Geocoding

Client README mentions `REACT_APP_OPENCAGE_API_KEY` — **TODO: Verify** if still used in client code.

---

## GitHub

https://github.com/blackholeinfiverse64/workflow-blackhole.git

---

## npm dependencies of note

- `screenshot-desktop` — monitoring (native)
- `tesseract.js` — OCR
- `googleapis` — Google integrations

---

## Accounts checklist

- [ ] GitHub repo access
- [ ] MongoDB Atlas
- [ ] Render backend service
- [ ] Vercel frontend project
- [ ] Cloudinary account
- [ ] AI API keys (Google, Groq)
- [ ] SMTP / email
- [ ] Sampada SETU API key (if enabled)
- [ ] VAPID keys for push

---

## Cost

**TODO: Verify** — Render/Vercel tiers, Atlas size, AI usage billing.

---

## Not used (observed)

- Stripe/payments
- AWS S3 direct (Cloudinary instead)
- Redis cache
