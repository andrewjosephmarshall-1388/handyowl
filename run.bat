@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==============================================
echo   Handy Owl — starting dev server
echo ==============================================
echo.
echo   Site will be at:    http://localhost:3000
echo   Stop the server:    press Ctrl+C, then Y
echo.
echo ----------------------------------------------
echo.

call npm run dev

:: If npm exits (crash, port in use, etc.), keep the window open so the error is readable.
echo.
echo ----------------------------------------------
echo   Server stopped.
echo ----------------------------------------------
pause
