@echo off
echo ========================================
echo AI Content Generator - Frontend Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js version:
node --version
echo.

REM Navigate to frontend directory
cd /d "%~dp0"
echo Current directory: %cd%
echo.

REM Install dependencies
echo Installing dependencies...
echo This may take a few minutes...
echo.
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Or run: start-dev.bat
echo.
echo The app will be available at:
echo   http://localhost:3000
echo.
echo Demo credentials:
echo   Username: demo
echo   Password: demo1234
echo.
echo Make sure the backend is running at:
echo   http://localhost:9000
echo.
pause
