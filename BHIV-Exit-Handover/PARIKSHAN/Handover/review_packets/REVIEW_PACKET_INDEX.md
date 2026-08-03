# Review Packet Index — PARIKSHAN / NIYANTRAN V1

Place stakeholder review materials in this folder.

---

## Suggested packets

| Packet | Contents | Audience |
|--------|----------|----------|
| `RP-01-Executive-Summary.pdf` | Product purpose, mock vs live telemetry, deployment gap | Leadership |
| `RP-02-Architecture-Review.pdf` | Diagram: React ↔ Express ↔ MongoDB ↔ Socket.IO | Engineering |
| `RP-03-Security-Review.pdf` | No auth, open CORS, public action endpoint | Security / DevOps |
| `RP-04-Demo-Script.pdf` | Local setup with port fix, tab walkthrough | QA / PM |
| `RP-05-Known-Gaps.pdf` | From `12_Known_Issues_And_TODOs.md` | All reviewers |

---

## Review focus areas

1. **Port mismatch** — frontend 4001 vs backend 4000
2. **Mock telemetry** — not production-ready without Pravah integration
3. **Placeholder tabs** — 5 nav items are InfoPage only
4. **No deployment** — production URLs unknown
5. **Naming** — PARIKSHAN vs NIYANTRAN

---

## Sign-off template

| Reviewer | Packet | Date | Approved (Y/N) | Notes |
|----------|--------|------|----------------|-------|
| | RP-01 | | | |
| | RP-02 | | | |
| | RP-03 | | | |

---

## Source documents

All review content should trace to `Handover/01`–`18` and actual code under `PARIKSHAN/backend/` and `PARIKSHAN/frontend/`.

**Status:** Index only — PDFs not yet generated.
