# UCCIS – Demo Delivery Sprint (Tuesday Operational Demonstration)

## STATE

WORKING  
MODE: DEMO DELIVERY MODE  
SCOPE: SINGLE END-TO-END OPERATIONAL FLOW

---

## 🎯 Objective

Deliver a **working UCCIS operational demonstration** that shows:

Signal → Telemetry → Incident → Escalation → Decision → Replay → Runtime Logs → Dashboard Update

This is NOT a prototype.
This is NOT a design exercise.
This is a runnable system demo.

---

## 🚨 Core Demo Flow

### Scenario Types

- 🌊 Flood Alert
- 🚦 Traffic Incident
- 🏥 Medical Emergency
- ⚡ Power Failure
- 🔐 Cyber Incident

Each scenario MUST follow the same lifecycle:

1. Signal Created
2. Telemetry Captured
3. Incident Generated
4. Escalation Triggered
5. Decision Generated
6. Replay Generated
7. Runtime Logs Updated
8. Dashboard Updated

---

## 🧱 System Components

### Backend

- REST APIs for all lifecycle stages
- Runtime engine for orchestration
- Replay generator service
- Telemetry ingestion handler

### Database

- Signals
- Telemetry Events
- Incidents
- Escalations
- Decisions
- Replays
- Runtime Logs

### Frontend Dashboard

- Live system health
- Incident timeline view
- Replay viewer
- Runtime log stream
- Scenario visualization panels

---

## 🔌 API Overview

### Signal

- POST `/signals/create`
- GET `/signals`

### Telemetry

- POST `/telemetry/add`
- GET `/telemetry/:signalId`

### Incident

- POST `/incident/generate`

### Escalation

- POST `/escalation/create`

### Decision

- POST `/decision/generate`

### Replay

- POST `/replay/generate`
- GET `/replay/:id`

### Runtime

- GET `/runtime/logs`

---

## 🗄️ Database Setup

### Required Tables

- signals
- telemetry_events
- incidents
- escalations
- decisions
- replays
- runtime_logs
