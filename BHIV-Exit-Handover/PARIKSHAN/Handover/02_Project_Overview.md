# Project Overview — PARIKSHAN / NIYANTRAN V1

## Executive summary

PARIKSHAN hosts **NIYANTRAN V1**, a Master Control Dashboard for the BHIV ecosystem. Operators view project, team, and individual execution state; receive alerts; and trigger actions (assign, escalate, ping, resolve). The backend persists entities in MongoDB, runs a mock telemetry stream every 5 seconds, and pushes updates over Socket.IO. The frontend is a single-page React app with tab-based navigation (no React Router).

---

## Problem statement

BHIV runs multiple projects and teams. Leadership needs a unified real-time view of execution health, blockers, and alertable conditions — distinct from HR workflows (Sampada).

---

## Solution (as implemented)

| Layer | Role |
|-------|------|
| **Frontend** | React 19 + Vite 8 + TypeScript + Tailwind 4 — dashboard UI, context state, Socket.IO client |
| **Backend** | Express 5 + Mongoose 9 + Socket.IO — REST API, mock Pravah simulation, alert engine |
| **Database** | MongoDB `bhiv-niyantran` — entities, alerts, action logs |

---

## Architecture (high level)

```
┌─────────────────┐     REST + WebSocket      ┌──────────────────┐
│  React SPA      │ ◄────────────────────────► │  Express server  │
│  (Vite :5173)   │   /niyantran/*  +  io     │  (:4000)         │
└─────────────────┘                           └────────┬─────────┘
                                                       │
                                                       ▼
                                              ┌──────────────────┐
                                              │  MongoDB         │
                                              │  bhiv-niyantran  │
                                              └──────────────────┘

Mock loop (every 5s): simulatePravahEvent → runAlertEngine → io.emit('niyantran:update')
```

---

## Feature matrix

| Feature | Status | Notes |
|---------|--------|-------|
| Overview dashboard | Live | API + realtime merge |
| Products / Tasks / Testing / Candidates / Teams / Workflow / Risks | Partial | Mix of context data and hardcoded arrays in `Dashboard.tsx` |
| Operator actions | Live | POST `/niyantran/action` |
| Real-time updates | Live | Mock stream; not live Pravah |
| Repository Review | Placeholder | `InfoPage` only |
| Handover & Assets | Placeholder | `InfoPage` only |
| Insights & Analytics | Placeholder | `InfoPage` only |
| Niyantran Logs | Placeholder | `InfoPage` only |
| Settings | Placeholder | `InfoPage` only |
| Authentication | Not implemented | — |
| Production deployment | Not in repo | **TODO: Verify** |

---

## Naming drift (important for handover)

- **PARIKSHAN** — GitHub repo and workspace folder name
- **NIYANTRAN** — Product name in UI and code (`niyantranRoutes`, `NiyantranContext`, etc.)
- **bhiv-niyantran** — MongoDB database and service identifier

Document all three when onboarding or searching logs.

---

## Stakeholders

**TODO: Verify** — product owner, engineering lead, and operator users for NIYANTRAN V1.

---

## Out of scope (this repo)

- Live Pravah / upstream pipeline integration (mock only)
- HR / Sampada features
- User authentication and RBAC
- Automated tests and CI/CD (not present)
