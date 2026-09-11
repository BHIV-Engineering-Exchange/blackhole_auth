# 🌌 BHIV Core - System Documentation & Operational Manual

This document provides a comprehensive technical overview of the **Blackhole Infiverse (BHIV) Core Identity & Product Launcher System** (`blackhole_auth`), including system architecture, network port specifications, environment configurations, startup procedures, storage requirements, and health verification endpoints.

---

## 1. 🏗️ Services & Architecture Overview

The system operates as a centralized **Identity & Access Management (IAM) and Single Sign-On (SSO)** hub for all Blackhole Infiverse products.

```
                  ┌──────────────────────────────────────────────┐
                  │          Browser / End User                  │
                  └──────────────────────┬───────────────────────┘
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 │                                               │
                 ▼                                               ▼
   ┌───────────────────────────┐                   ┌───────────────────────────┐
   │    Frontend Launcher      │                   │     Backend Auth Server   │
   │  (products.blackhole...)  │                   │   (auth.blackhole...)     │
   │   React + Vite (Port 5173)│                   │  Node + Express (Port 8080│
   └─────────────┬─────────────┘                   └─────────────┬─────────────┘
                 │                                               │
                 │              HttpOnly SSO Cookie              │
                 └───────────────────────┬───────────────────────┘
                                         │
   ┌─────────────────────────────────────┴─────────────────────────────────────┐
   │                           Ecosystem Products                              │
   │  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐│
   │  │   Setu    │  │  Sampada  │  │ Niyantran │  │  Gurukul  │  │   Vajra   ││
   │  └───────────┘  └───────────┘  └───────────┘  └───────────┘  └───────────┘│
   └───────────────────────────────────────────────────────────────────────────┘
```

### Architecture Highlights
- **Centralized SSO**: Uses `HttpOnly` secure cookies (`blackhole_token`) scoped to `.blackholeinfiverse.com` (or `localhost` during development).
- **Stateless JWT Authorization**: Tokens contain user payload (`user_id`, `email`, `tenant_id`, `roles`, `allowedApps`).
- **Role-Based & App-Level Access Control (RBAC/ACL)**: Users are restricted to applications explicitly assigned in `allowedApps`.
- **Product Launcher**: React dashboard rendering available apps and launching them in new browser tabs with single sign-on credentials.

---

## 2. 🔌 Ports Requirements

| Service / App | Mode | Default Port | Protocol | Purpose |
| :--- | :--- | :---: | :---: | :--- |
| **Frontend Launcher** | Dev | `5173` | HTTP | React Vite Development Dashboard |
| **Backend Auth API** | Dev/Prod | `8080` | HTTP/HTTPS | Express Auth Server & Token Verification |
| **Vajra Wallet UI** | Dev/Prod | `9000` | HTTP/HTTPS | Blockchain Wallet & Fraud Detection UI |
| **Setu** | Dev | `5174` | HTTP | Workflow Orchestration Platform |
| **Sampada** | Dev | `5175` | HTTP | Finance & Assets Suite |
| **Niyantran** | Dev | `5176` | HTTP | Governance & Control Center |
| **Gurukul** | Dev | `5177` | HTTP | Learning & Talent Platform |
| **Mitra** | Dev | `5178` | HTTP | Support & Engagement Platform |

---

## 3. ⚙️ Environment Configurations

### A. Development Environment

#### Backend (`backend/.env`)
```env
PORT=8080
NODE_ENV=development
JWT_SECRET=blackhole-auth-super-secure-random-secret-min-32-chars
AUTH_SERVER_URL=http://localhost:8080
CORS_ORIGINS=http://localhost:5173,http://localhost:8080
```

#### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH_SERVER_URL=http://localhost:8080
```

---

### B. Production Environment

#### Backend (`backend/.env`)
```env
PORT=8080
NODE_ENV=production
JWT_SECRET=replace-with-a-strong-32-character-secret-in-production
AUTH_SERVER_URL=https://auth.blackholeinfiverse.com
COOKIE_DOMAIN=.blackholeinfiverse.com
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax
CORS_ORIGINS=https://products.blackholeinfiverse.com,https://auth.blackholeinfiverse.com,https://setu.blackholeinfiverse.com,https://sampada.blackholeinfiverse.com,https://niyantran.blackholeinfiverse.com,https://gurukul.blackholeinfiverse.com,https://mitra.blackholeinfiverse.com,https://vajra.blackholeinfiverse.com
```

#### Frontend (`frontend/.env`)
```env
VITE_API_BASE_URL=https://auth.blackholeinfiverse.com
VITE_AUTH_SERVER_URL=https://auth.blackholeinfiverse.com
```

---

## 4. 🚀 Whole System Startup Guide

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

---

### A. Local Development Startup

1. **Start Backend Server**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   *Backend runs on:* `http://localhost:8080`

2. **Start Frontend Dashboard**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Frontend runs on:* `http://localhost:5173`

---

### B. Production VM Startup (PM2 + Nginx)

1. **Deploy Backend API**:
   ```bash
   cd /var/www/blackhole_auth/backend
   npm install --production
   pm2 start src/server.js --name "blackhole-auth-backend"
   pm2 save
   ```

2. **Build & Serve Frontend**:
   ```bash
   cd /var/www/blackhole_auth/frontend
   npm install
   npm run build
   ```

3. **Nginx Reverse Proxy & SSL Configuration**:
   ```nginx
   # Frontend Dashboard
   server {
       server_name products.blackholeinfiverse.com;
       root /var/www/blackhole_auth/frontend/dist;
       index index.html;
       location / { try_files $uri $uri/ /index.html; }
   }

   # Backend API
   server {
       server_name auth.blackholeinfiverse.com;
       location / {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

---

## 5. 🗄️ Storage Requirements (Database)

### Current Architecture
The current development setup uses **stateless JWT tokens** issued and verified directly by the auth server.

### Production Database Requirements
For multi-tenant persistence and user management, integrate **MongoDB** or **PostgreSQL**:

- **Recommended Engine**: MongoDB `v6.0+` or PostgreSQL `v15+`
- **Estimated Database Size**: Initial `5 GB` (scales with user growth & audit logs)
- **Core Entities & Schemas**:
  1. **Users Collection**: `_id`, `email`, `password_hash`, `tenant_id`, `roles`, `allowedApps`, `createdAt`
  2. **Tenants Collection**: `_id`, `tenant_name`, `domain`, `status`
  3. **Roles & Permissions**: `_id`, `role_name`, `permissions`

---

## 6. 🩺 Health Check & Verification Endpoints

| Method | Endpoint | Access | Purpose | Expected Response |
| :--- | :--- | :--- | :--- | :--- |
| **`GET`** | `/api/health` | Public | System liveness probe | `200 OK` -> `{"status": "ok"}` |
| **`POST`** | `/api/login` | Public | Authenticates user & sets SSO cookie | `200 OK` -> `{"success": true, "user": {...}}` |
| **`GET`** | `/api/me` | Protected | Validates active session token | `200 OK` -> `{"user": {...}}` / `401 Unauthorized` |
| **`POST`** | `/api/logout` | Public/Protected | Clears SSO cookie | `200 OK` -> `{"success": true}` |
