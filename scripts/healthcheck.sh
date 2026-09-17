#!/usr/bin/env bash

set -euo pipefail

# Resolve project root (one level up from this script directory)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[healthcheck.sh] Running health checks for Blackhole Auth stack..."

if ! command -v docker >/dev/null 2>&1; then
  echo "[healthcheck.sh] ERROR: docker is not installed or not in PATH."
  exit 1
fi

echo "[healthcheck.sh] Checking docker compose service status..."
docker compose ps

echo
echo "[healthcheck.sh] Inspecting container health statuses..."

# Check backend container health
BACKEND_NAME=$(docker compose ps -q backend 2>/dev/null || echo "")
if [ -n "$BACKEND_NAME" ]; then
  BACKEND_STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$BACKEND_NAME" 2>/dev/null || echo "unknown")
  echo "[healthcheck.sh] backend container health: $BACKEND_STATUS"
else
  echo "[healthcheck.sh] backend container: NOT RUNNING"
fi

# Check frontend container health
FRONTEND_NAME=$(docker compose ps -q frontend 2>/dev/null || echo "")
if [ -n "$FRONTEND_NAME" ]; then
  FRONTEND_STATUS=$(docker inspect --format='{{.State.Health.Status}}' "$FRONTEND_NAME" 2>/dev/null || echo "unknown")
  echo "[healthcheck.sh] frontend container health: $FRONTEND_STATUS"
else
  echo "[healthcheck.sh] frontend container: NOT RUNNING"
fi

echo
echo "[healthcheck.sh] Performing direct HTTP probes..."

if command -v curl >/dev/null 2>&1; then
  # Probe backend on mapped host port 8087 (or fallback 8080)
  if curl -fsS http://localhost:8087/api/health >/dev/null 2>&1 || curl -fsS http://localhost:8080/api/health >/dev/null 2>&1; then
    echo "[healthcheck.sh] Backend HTTP (http://localhost:8087/api/health): OK"
  else
    echo "[healthcheck.sh] Backend HTTP: UNREACHABLE or ERROR"
  fi

  # Probe frontend on mapped host port 5180 (or fallback 5173)
  if curl -fsS http://localhost:5180/ >/dev/null 2>&1 || curl -fsS http://localhost:5173/ >/dev/null 2>&1; then
    echo "[healthcheck.sh] Frontend HTTP (http://localhost:5180/): OK"
  else
    echo "[healthcheck.sh] Frontend HTTP: UNREACHABLE or ERROR"
  fi
elif command -v wget >/dev/null 2>&1; then
  if wget --no-verbose --tries=1 --spider http://localhost:8087/api/health >/dev/null 2>&1 || wget --no-verbose --tries=1 --spider http://localhost:8080/api/health >/dev/null 2>&1; then
    echo "[healthcheck.sh] Backend HTTP (http://localhost:8087/api/health): OK"
  else
    echo "[healthcheck.sh] Backend HTTP: UNREACHABLE or ERROR"
  fi

  if wget --no-verbose --tries=1 --spider http://localhost:5180/ >/dev/null 2>&1 || wget --no-verbose --tries=1 --spider http://localhost:5173/ >/dev/null 2>&1; then
    echo "[healthcheck.sh] Frontend HTTP (http://localhost:5180/): OK"
  else
    echo "[healthcheck.sh] Frontend HTTP: UNREACHABLE or ERROR"
  fi
else
  echo "[healthcheck.sh] Neither curl nor wget is installed locally. HTTP probe skipped."
fi

echo
echo "[healthcheck.sh] Health checks completed."
