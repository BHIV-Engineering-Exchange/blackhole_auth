# Code Packets Index — AI-Artha Handover

**Generated:** 2026-07-05

This folder is reserved for code review packets and critical code excerpts during ownership transfer.

## Critical Code Entry Points

| File | Purpose |
|------|---------|
| `backend/src/server.js` | Express entry, route mounting |
| `backend/src/services/ledger.service.js` | Core accounting engine |
| `backend/src/models/JournalEntry.js` | Hash chain journal model |
| `backend/src/middleware/auth.js` | JWT authentication |
| `backend/src/services/setu.pipeline.js` | SETU signal pipeline |
| `frontend/src/App.jsx` | Frontend routing |
| `frontend/src/services/api.js` | API client |

## Recommended Code Review Areas

1. Ledger hash chain implementation
2. GST/TDS calculation logic
3. Auth middleware and role authorization
4. Frontend/backend API path alignment
5. SETU callback handler in server.js

## Artifacts to Add Here

- [ ] Code review notes
- [ ] Architecture decision records
- [ ] Critical diff summaries

See `../08_Folder_Structure.md` for full codebase layout.
