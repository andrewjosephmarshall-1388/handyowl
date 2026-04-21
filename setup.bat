@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==============================================
echo   Handy Owl setup
echo ==============================================
echo.

:: Check Node
where node >nul 2>&1
if errorlevel 1 (
    echo [!] Node.js is not installed.
    echo     Download and install from https://nodejs.org, then re-run this script.
    pause
    exit /b 1
)

:: Make sure .env.local exists (Prisma CLI and runtime both need DATABASE_URL from it)
if not exist .env.local (
    echo [!] .env.local is missing from this folder. Cannot continue.
    pause
    exit /b 1
)

:: Prisma CLI reads .env, not .env.local. Mirror it so the CLI can see DATABASE_URL.
:: Both files are gitignored — this stays local.
echo [1/4] Preparing environment...
copy /Y .env.local .env >nul

:: npm install
echo.
echo [2/4] Installing dependencies (a few minutes the first time)...
call npm install --no-audit --no-fund
if errorlevel 1 (
    echo.
    echo [!] npm install failed — scroll up for the error.
    pause
    exit /b 1
)

:: prisma generate
echo.
echo [3/4] Generating the Prisma client...
call npx prisma generate
if errorlevel 1 (
    echo.
    echo [!] prisma generate failed — scroll up for the error.
    pause
    exit /b 1
)

:: prisma migrate dev
echo.
echo [4/4] Creating database tables in Supabase...
echo     If Prisma asks a yes/no question, press Y and Enter.
echo.
call npx prisma migrate dev --name init
if errorlevel 1 (
    echo.
    echo [!] prisma migrate dev failed.
    echo     Most common cause: your Supabase project is paused — open the Supabase
    echo     dashboard, resume the project, then re-run this script.
    pause
    exit /b 1
)

echo.
echo ==============================================
echo   Done.
echo ==============================================
echo.
echo   To start the site:
echo       npm run dev
echo.
echo   Then open http://localhost:3000 in your browser.
echo.
echo   In a second terminal (only needed when testing payments):
echo       stripe listen --forward-to localhost:3000/api/stripe/webhook
echo.
echo   Full smoke-test steps are in RESUME.md.
echo.
pause
