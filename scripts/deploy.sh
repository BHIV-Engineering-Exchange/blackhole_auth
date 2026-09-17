#!/usr/bin/env bash

set -euo pipefail

# Resolve project root (one level up from this script directory)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[deploy.sh] Running local docker compose deployment from: $(pwd)"

# Ensure .env files exist before starting compose
if [ ! -f backend/.env ]; then
  echo "[deploy.sh] backend/.env missing. Creating from .env.example..."
  cp backend/.env.example backend/.env
fi

if [ ! -f frontend/.env ]; then
  echo "[deploy.sh] frontend/.env missing. Creating from .env.example..."
  cp frontend/.env.example frontend/.env
fi

docker compose build
docker compose up -d

echo "[deploy.sh] Local stack is running in the background."
docker compose ps
