# Review Packet Index — Infiverse-HR

**Generated:** 2026-07-06

---

## Primary Review Documents

| Document | Path | Time |
|----------|------|------|
| **Handover Review Packet** | `Handover/12_REVIEW_PACKET.md` | < 10 min |
| **Detailed Review Packet** | `REVIEW_PACKET.md` (repo root) | 30+ min |
| **Current State Handover** | `SAMPADA_CURRENT_STATE.md` | 60+ min |

---

## Handover Package (18 docs)

| # | Document | When to read |
|---|----------|--------------|
| 01 | `01_README.md` | First — overview |
| 04 | `04_Architecture.md` | System design |
| 05 | `05_Environment_Guide.md` | Env setup |
| 06 | `06_API_Documentation.md` | API review |
| 07 | `07_Database_Details.md` | Data model |
| 10 | `10_Known_Issues.md` | Security + ops flags |
| 12 | `12_REVIEW_PACKET.md` | Quick review |
| 14 | `14_Testing_Checklist.md` | QA validation |

---

## Evidence & Acceptance

| Document | Purpose |
|----------|---------|
| `evidence/` | Runtime verification artifacts |
| `docs/TASK19_ACCEPTANCE_TEST_PACK.md` | Acceptance tests |
| `docs/CENTRAL_CONTROL_LIVE_EXECUTION_CHECKLIST.md` | Live rollout |
| `PARTNER_SETU_LIVE_RUNBOOK.md` | SETU partner ops |

---

## Recommended Review Sequence

1. `Handover/12_REVIEW_PACKET.md` — flags + checklist
2. `SAMPADA_CURRENT_STATE.md` §9–§10 — implementation state
3. `curl {gateway}/health` — production check
4. `REVIEW_PACKET.md` — detailed proofs
5. `evidence/enforcement/` — tenant isolation + RBAC

---

## Items Requiring Verification

| Item | Status |
|------|--------|
| Canonical Render URLs (l0xp vs ltg0) | TODO |
| Primary frontend domain | TODO |
| Production MongoDB cluster | TODO |
| Complete-Infiverse bridge in prod | TODO |
| Handover Screenshots | TODO |
