#!/bin/bash

echo "========================================"
echo "AI Content Generator - Frontend Setup"
echo "========================================"
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "Node.js version:"
node --version
echo

# Navigate to script directory
cd "$(dirname "$0")"
echo "Current directory: $(pwd)"
echo

# Install dependencies
echo "Installing dependencies..."
echo "This may take a few minutes..."
echo
npm install

if [ $? -ne 0 ]; then
    echo
    echo "ERROR: Failed to install dependencies!"
    echo "Please check your internet connection and try again."
    exit 1
fi

echo
echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo
echo "To start the development server, run:"
echo "  npm run dev"
echo
echo "Or run: ./start-dev.sh"
echo
echo "The app will be available at:"
echo "  http://localhost:3000"
echo
echo "Demo credentials:"
echo "  Username: demo"
echo "  Password: demo1234"
echo
echo "Make sure the backend is running at:"
echo "  http://localhost:9000"
echo
