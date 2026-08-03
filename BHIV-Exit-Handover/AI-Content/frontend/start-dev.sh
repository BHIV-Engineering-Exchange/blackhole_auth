#!/bin/bash

echo "========================================"
echo "Starting AI Content Generator Frontend"
echo "========================================"
echo

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "ERROR: Dependencies not installed!"
    echo "Please run ./setup.sh first."
    echo
    exit 1
fi

echo "Starting development server..."
echo
echo "The app will be available at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop the server"
echo

npm run dev
