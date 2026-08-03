@echo off
echo ========================================
echo Starting AI Content Generator Frontend
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo ERROR: Dependencies not installed!
    echo Please run setup.bat first.
    echo.
    pause
    exit /b 1
)

echo Starting development server...
echo.
echo The app will be available at: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
