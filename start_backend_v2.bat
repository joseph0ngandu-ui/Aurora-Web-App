@echo off
echo ================================================================================
echo Starting Eden Backend API v2 (Standardized)
echo ================================================================================
echo.
echo Step 1: Stopping old processes...
taskkill /F /FI "WINDOWTITLE eq Eden Backend API*" 2>nul
taskkill /F /FI "IMAGENAME eq uvicorn.exe" 2>nul
timeout /t 1 /nobreak >nul

echo.
echo Step 2: Starting backend on http://localhost:8000...
cd /d "%~dp0backend"
start "Eden Backend API v2" cmd /k "python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload"

echo.
echo Step 3: Backend started!
echo Documentation available at: http://localhost:8000/docs
echo.
pause
