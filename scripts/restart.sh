#!/usr/bin/env bash

set -euo pipefail

# Resolve project root (one level up from this script directory)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[restart.sh] Restarting local docker compose stack from: $(pwd)"

docker compose restart

echo "[restart.sh] Current service status:"
docker compose ps

echo "[restart.sh] Restart completed."
