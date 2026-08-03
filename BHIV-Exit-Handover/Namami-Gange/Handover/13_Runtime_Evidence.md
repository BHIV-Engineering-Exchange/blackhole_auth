# Runtime Evidence — Namami-Gange

**Generated:** 2026-07-06

---

## Required Screenshots

Save to `Handover/Screenshots/`:

| # | Screenshot | How |
|---|------------|-----|
| 1 | Global Operations dashboard | Default tab with suitability cards |
| 2 | Ganga Basin Intel tab | BasinIntelligence view |
| 3 | Scenario Simulation tab | Slider controls |
| 4 | Location Intel tab | Location detail panel |
| 5 | Governance View tab | Static governance UI |
| 6 | Federation topology | Global tab — federation panel |
| 7 | Replay console | Global tab — replay logs |
| 8 | API health JSON | curl or browser `/health` |
| 9 | Results JSON | `/results?model=inland_port` |
| 10 | Render deploy healthy | Render dashboard |
| 11 | Vercel deploy success | Vercel dashboard |
| 12 | Browser Network tab | Successful `/results` fetch |

---

## API Evidence (curl)

```bash
curl https://namami-gange-api.onrender.com/health
curl "https://namami-gange-api.onrender.com/results?model=inland_port"
curl https://namami-gange-api.onrender.com/locations
curl -X POST https://namami-gange-api.onrender.com/simulate \
  -H "Content-Type: application/json" \
  -d @backend/tests/sample_simulate_request.json
curl https://namami-gange-api.onrender.com/marine-health
```

> TODO: Verify production URL before capturing.

---

## Test Suite Evidence

Run with backend on :5000:

```bash
cd backend/src && python api.py &
cd backend/tests
python test_determinism.py
python test_contract_validation.py
python test_scenarios.py
python test_api.py
# ... remaining test_*.py files
```

Capture PASS/FAIL summary. Review packets claim **283 tests** — TODO: Verify full count.

---

## Build Evidence

```bash
cd backend && pip install -r requirements.txt
cd ../frontend && npm run build
```

Capture successful build output.

---

## Integration Evidence (Documented)

From `REVIEW_PACKET.md`:

```text
Frontend → GET /results?model=inland_port → Backend → JSON → UI Update
```

Capture screenshot showing backend scores matching UI cards.

---

## Environment Evidence (Names Only)

| Variable | Local | Render | Vercel |
|----------|-------|--------|--------|
| FRONTEND_URL | ☐ | ☐ | N/A |
| NEXT_PUBLIC_API_URL | ☐ | N/A | ☐ |
| PORT | ☐ | auto | N/A |

---

## Evidence Status

| Category | Status |
|----------|--------|
| Screenshots | TODO |
| curl captures | TODO |
| Test run output | TODO |
| Production smoke | TODO |
| Demo video | TODO (optional) |
