# Project Overview — workflow-blackhole / Infiverse BHL

## Executive summary

workflow-blackhole is a **full-stack workforce management platform** (branded **Infiverse BHL** in README) combining HR operations, task/project management, real-time attendance, salary engines, employee monitoring, EMS automation, and deterministic **Tantra execution participation** for the BHIV ecosystem. A React SPA talks to an Express + MongoDB backend with Socket.IO realtime updates.

---

## Core capabilities

| Domain | Features |
|--------|----------|
| Auth & users | JWT, roles (Admin, Manager, User, Procurement Agent, Tester), branches |
| Tasks & projects | Tasks, dependencies, submissions, progress, tester evaluation |
| Attendance | Start/end day, geolocation, biometric upload, live dashboard, cron persistence |
| Salary | Multiple salary systems (enhanced, hourly, biometric, new-salary) |
| Leave | Requests and approvals |
| Monitoring | Screen capture, activity, website tracking, EMS signals |
| EMS | Email templates, automation, signals (mouse/keystroke/idle) |
| Procurement | Procurement agent dashboard |
| AI | Google Generative AI, Groq, chatbot, optimization routes |
| Tantra execution | Governed execution contracts, lineage hashes, replay logs |
| SETU integration | Outbound `niyantran_telemetry` to Sampada when enabled |

---

## Architecture

```
┌─────────────────────┐     REST + Socket.IO     ┌─────────────────────┐
│  React client       │ ◄──────────────────────► │  Express server     │
│  (Vite, :5173)      │   JWT x-auth-token       │  (Node, :5000)      │
│  Vercel production  │                          │  Render production  │
└─────────────────────┘                          └──────────┬──────────┘
                                                            │
                                                            ▼
                                                 ┌─────────────────────┐
                                                 │  MongoDB            │
                                                 │  (Atlas / local)    │
                                                 └─────────────────────┘

Optional: POST execution events → Sampada SETU (setuDispatcher)
```

Server may also serve static `client/dist` for single-host deployment.

---

## Tantra execution flow (summary)

1. Client/caller POST `/api/tantra/execution/participate` with execution contract headers/body
2. Middleware: `executionAuth`, `traceContinuity`, `enforceGovernance`, `enforceTenantIsolation`
3. `executionEventEmitter` persists hashed `ExecutionEvent` chain
4. On success, optional `dispatchToSampada()` if `SAMPADA_SETU_ENABLED=true`
5. Responses include lineage hashes; blocked paths return 423

---

## User roles (from README + App.jsx)

- **Admin** — full access, admin dashboards, monitoring
- **Manager** — team scope
- **User/Employee** — personal dashboard, attendance, tasks
- **Procurement Agent** — procurement dashboard
- **Tester** — tester task/evaluation flows

---

## Realtime (Socket.IO)

Events include attendance day start/end, auto-end midnight, task updates, notifications. Rooms joined via client `join` event.

---

## Out of scope / caveats

- README clone URL placeholder (`your-repo/infiverse-bhl`)
- Test script in server package.json is placeholder (`echo Error`)
- Auto end day job commented/disabled in favor of midnight spam handling
- Historical attendance sync disabled on startup for performance

---

## Stakeholders

**TODO: Verify** — Infiverse BHL dev team, HR operators, compliance owner for monitoring features.
