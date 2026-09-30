# 🚀 Blackhole Auth (`blackhole_auth`) — Deployment Infrastructure & Operations Manual

This document provides a comprehensive operational guide for deploying, managing, and maintaining the **Blackhole Infiverse Core Identity & Product Launcher System** (`blackhole_auth`) across local container environments and remote production virtual machines.

---

## 1. 🏗️ Architectural Topology

The deployment infrastructure is organized as a decoupled, multi-container service stack managed via Docker Compose and automated via GitHub Actions CI/CD:

```
                                  ┌──────────────────────────────────────────────┐
                                  │            GitHub Actions CI/CD              │
                                  │      (Push to main / Production Release)     │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                                                         ▼
                                  ┌──────────────────────────────────────────────┐
                                  │  Stages: Validate -> Build -> Deploy -> RB   │
                                  └──────────────────────┬───────────────────────┘
                                                         │ SSH (sshpass)
                                                         ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Remote Production VM (~/BLACKHOLE_AUTH)                                                                         │
│                                                                                                                 │
│   ┌──────────────────────────────────────────┐  blackhole_network  ┌──────────────────────────────────────────┐ │
│   │ blackhole_auth_frontend                  │◄───────────────────►│ blackhole_auth_backend                   │ │
│   │ Image: bhiv/blackhole-auth-frontend:TAG  │                     │ Image: bhiv/blackhole-auth-backend:TAG   │ │
│   │ Port: 5173                               │                     │ Port: 8080                               │ │
│   │ Env: ./frontend/.env                     │                     │ Env: ./backend/.env                      │ │
│   │ Probes: GET /                            │                     │ Probes: GET /api/health                  │ │
│   └──────────────────────────────────────────┘                     └──────────────────────────────────────────┘ │
│                                                                                                                 │
│   Governance & Audit Trail:                                                                                     │
│   - docs/RELEASE_HISTORY.md (mirrored at /var/tmp/BLACKHOLE_AUTH/RELEASE_HISTORY.md)                            │
│   - Automated Rollback Engine (reverts instantly to last healthy Git SHA upon failure)                          │
└─────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. 🔌 Port & Network Allocation

| Service | Container Name | Host (VM) Port | Container (Internal) Port | Port Mapping (`host:container`) | Purpose | Health Check |
| :--- | :--- | :---: | :---: | :---: | :--- | :--- |
| **Backend API** | `blackhole_auth_backend` | `8087` | `8080` | `8087:8080` | Auth REST API & JWT Engine | Container: `GET /api/health` (port 8080)<br>Host: `http://localhost:8087/api/health` |
| **Frontend Launcher** | `blackhole_auth_frontend` | `5180` | `5173` | `5180:5173` | React Vite Dashboard | Container: `GET /` (port 5173)<br>Host: `http://localhost:5180/` |

> [!TIP]
> The application code and container internals run on their standard ports (`8080` and `5173`). Docker Compose remaps them on the VM host side to `8087:8080` and `5180:5173` to prevent port collisions with existing services running on ports 8080–8086 and 5173–5179 on the VM.

Both containers communicate securely on the isolated internal Docker bridge network `blackhole_network`.

---

## 3. ⚙️ Environment Configuration Architecture

The deployment cleanly separates backend and frontend configurations into two independent files:

### A. Backend Configuration (`backend/.env`)

Template: [backend/.env.production.template](file:///c:/Users/ASUS/OneDrive/Desktop/BHIV-Tasks/BHIV_auth/blackhole_auth/backend/.env.production.template)

```env
PORT=8080
NODE_ENV=production
JWT_SECRET=replace_with_strong_production_jwt_secret_min_32_chars
AUTH_SERVER_URL=https://auth.blackholeinfiverse.com
COOKIE_DOMAIN=.blackholeinfiverse.com
COOKIE_SECURE=true
COOKIE_SAME_SITE=lax
CORS_ORIGINS=https://products.blackholeinfiverse.com,https://auth.blackholeinfiverse.com,https://setu.blackholeinfiverse.com,https://sampada.blackholeinfiverse.com,https://niyantran.blackholeinfiverse.com,https://gurukul.blackholeinfiverse.com,https://mitra.blackholeinfiverse.com,https://vajra.blackholeinfiverse.com
```

### B. Frontend Configuration (`frontend/.env`)

Template: [frontend/.env.production.template](file:///c:/Users/ASUS/OneDrive/Desktop/BHIV-Tasks/BHIV_auth/blackhole_auth/frontend/.env.production.template)

```env
VITE_API_BASE_URL=https://auth.blackholeinfiverse.com
VITE_AUTH_SERVER_URL=https://auth.blackholeinfiverse.com
```

> [!NOTE]
> For local development, `backend/.env` and `frontend/.env` point to `http://localhost:8080` and `http://localhost:5173`. When deploying to production or custom domains, update these via GitHub Secrets or on the host server.

---

## 4. 🐳 Local Docker Execution

### Quick Start with Scripts

All lifecycle commands are located in the `scripts/` directory:

```bash
# 1. Build and deploy the full stack
bash scripts/deploy.sh

# 2. Inspect health of running services
bash scripts/healthcheck.sh

# 3. Stream combined application logs
bash scripts/logs.sh

# 4. Restart services
bash scripts/restart.sh

# 5. Stop the stack
bash scripts/stop.sh
```

### Manual Docker Compose Commands

```bash
# Build images
docker compose build

# Start containers in background
docker compose up -d

# Verify container status
docker compose ps

# View backend logs
docker compose logs -f backend

# Stop and remove containers
docker compose down
```

---

## 5. 🤖 GitHub Actions CI/CD Pipeline

The automated deployment pipeline is configured in [.github/workflows/cicd.yml](file:///c:/Users/ASUS/OneDrive/Desktop/BHIV-Tasks/BHIV_auth/blackhole_auth/.github/workflows/cicd.yml) and triggers on every push to the `main` branch.

### Pipeline Stages

1. **`validate`**:
   - Substitutes commit short SHA into `docker-compose.production.template.yml`.
   - Validates compose schema and configurations with `docker compose config`.
   - Uploads validated deployment artifacts.
2. **`build`**:
   - Uses Docker Buildx with cache optimization.
   - Logs into Docker Hub.
   - Compiles and publishes `bhiv/blackhole-auth-backend:<sha>` and `latest`.
   - Compiles and publishes `bhiv/blackhole-auth-frontend:<sha>` and `latest` with Vite build arguments.
3. **`deploy`**:
   - Downloads artifacts and injects backend/frontend secrets.
   - Packages `deployment.tar.gz`.
   - Connects to production VM via SSH (`sshpass`).
   - Extracts archive into `~/BLACKHOLE_AUTH`.
   - Restores release history from `/var/tmp/BLACKHOLE_AUTH/`.
   - Executes zero-downtime rolling pull and launch (`docker compose up -d --remove-orphans`).
   - Runs a 120-second active health check verification loop (inspecting container health status and probing HTTP endpoints).
   - Appends deployment details to `docs/RELEASE_HISTORY.md` upon passing health checks.
   - Cleans up stale images (`docker image prune -af --filter "until=168h"`).
4. **`rollback`**:
   - Triggers automatically if deployment or health check fails.
   - Extracts the last stable commit tag (`SUCCESS` or `ROLLBACK_SUCCESS`) from `docs/RELEASE_HISTORY.md`.
   - Reverts compose stack to the last healthy image version.
   - Restarts containers and verifies health.
   - Logs outcome (`ROLLBACK_SUCCESS` or `ROLLBACK_FAILED`) in release history.

---

## 6. 🔐 Required GitHub Repository Secrets

Configure the following secrets in GitHub (**Settings > Secrets and variables > Actions**):

| Secret Name | Description | Example / Default |
| :--- | :--- | :--- |
| `DOCKER_USERNAME` | Docker Hub registry username | `bhiv` |
| `DOCKER_PASSWORD` | Docker Hub access token or password | `dckr_pat_...` |
| `VM_IP` | Remote virtual machine public IP address | `163.128.x.x` |
| `VM_PORT` | SSH port of the virtual machine | `22` |
| `VM_USERNAME` | Remote VM SSH user | `ubuntu` or `root` |
| `VM_PASSWORD` | Remote VM SSH password | `********` |
| `BACKEND_ENV_FILE` | Full contents of backend production `.env` | (Contents of backend production template) |
| `FRONTEND_ENV_FILE` | Full contents of frontend production `.env` | (Contents of frontend production template) |
| `VITE_API_BASE_URL` | *(Optional)* Override for frontend API base URL | `https://auth.blackholeinfiverse.com` |
| `VITE_AUTH_SERVER_URL` | *(Optional)* Override for auth server URL | `https://auth.blackholeinfiverse.com` |

---

## 7. 🩺 Health Verification Endpoints
 
| Service | Host VM URL | Container Internal URL | Expected Status Code | Expected Response Body |
| :--- | :--- | :--- | :---: | :--- |
| **Backend API** | `http://localhost:8087/api/health` | `http://localhost:8080/api/health` | `200 OK` | `{"status":"ok"}` |
| **Frontend Launcher** | `http://localhost:5180/` | `http://localhost:5173/` | `200 OK` | `<!DOCTYPE html>...` |

---

## 8. 🛡️ Failure Recovery & Rollback SOP

If a deployment fails:
1. The CI/CD pipeline automatically initiates a rollback by reading the previous passing SHA from `docs/RELEASE_HISTORY.md`.
2. To manually revert to a specific previous SHA on the VM:
   ```bash
   cd ~/BLACKHOLE_AUTH
   sed "s|IMG_TAG|<TARGET_SHA>|g" docker-compose.production.template.yml > docker-compose.production.yml
   docker compose -f docker-compose.production.yml pull
   docker compose -f docker-compose.production.yml up -d --remove-orphans
   bash scripts/healthcheck.sh
   ```
