#!/usr/bin/env bash

set -euo pipefail

# Resolve project root (one level up from this script directory)
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

echo "[stop.sh] Stopping local docker compose stack from: $(pwd)"

docker compose down

echo "[stop.sh] Stack stopped successfully."
