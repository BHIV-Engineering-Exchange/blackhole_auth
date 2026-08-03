# Runtime Evidence — hackaverse

**Generated:** 2026-07-05

---

## Existing Evidence

| File | Location | Description |
|------|----------|-------------|
| Consumer validation | `hackathon/reports/consumer_validation_report.md` | API consumer tests |
| Replay validation | `hackathon/reports/replay_validation_report.md` | Replay runner results |
| Stage 1 revalidation | `STAGE1_REVALIDATION_REPORT.md` | Revalidation report |
| DB verification | `DATABASE_VERIFICATION_REPORT.md` | MongoDB audit |
| Deployment readiness | `DEPLOYMENT_READINESS_REPORT.md` | Pre-deploy checklist |
| Security cleanup | `SECURITY_CLEANUP_REPORT.md` | Secret hardening |

> TODO: Verify timestamps before sign-off.

---

## Generate Fresh Evidence

### Backend Health

```bash
cd hackathon
uvicorn src.main:app --port 8000

curl -s http://localhost:8000/system/ready
curl -s http://localhost:8000/api/v1/system/db-status
curl -s http://localhost:8000/api/v1/system/health
```

### Production

```bash
curl -s https://hackaverse.blackholeinfiverse.com/system/ready
curl -I https://hackaverse-mu.vercel.app
```

### Auth Flow

```bash
curl -s -X POST http://localhost:8000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_API_KEY" \
  -d '{"name":"Test","email":"test@example.com","password":"testpass123"}'
```

### Test Suite

```bash
cd hackathon && pytest -v
cd hackaverse-frontend && npm test
```

### Database Verification

```bash
cd hackathon && python scripts/verify_database.py
```

---

## Artifacts to Capture

| Artifact | Save To |
|----------|---------|
| Health/ready responses | `review_packets/` |
| Swagger screenshot | `Screenshots/` |
| Participant dashboard | `Screenshots/` |
| Admin dashboard (after seed) | `Screenshots/` |
| Login flow video | `Videos/` |
| pytest output | `review_packets/` |

See `Screenshots/README.md` for recommended captures.

---

## Production Verification Checklist

- [ ] `/system/ready` returns 200
- [ ] `/docs` loads
- [ ] Frontend loads at hackaverse-mu.vercel.app
- [ ] Participant register + login works
- [ ] Admin login works (post-seed)
- [ ] No CORS errors in browser console
- [ ] Trace IDs appear in API responses (`trace_id` field)

---

## TODO: Verify

- [ ] Production URLs before capturing evidence
- [ ] Seeded admin credentials for screenshots
