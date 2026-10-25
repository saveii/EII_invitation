@echo off
chcp 65001 >nul
title E-Invitation Updater to GitHub
color 0A

echo ========================================================
echo   E-WEDDING INVITATION - AUTOMATIC GITHUB UPDATER
echo ========================================================
echo.
echo [1/3] Adding modified files...
git add -A
echo.
echo [2/3] Committing changes...
git commit -m "Update wedding invitation info and deployment"
echo.
echo [3/3] Pushing to GitHub...
git push origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo  [OK] Successfully pushed to GitHub!
    echo  Live URL: https://saveii.github.io/EII_invitation/
    echo ========================================================
) else (
    echo ========================================================
    echo  [!] Push failed or nothing to push. Please check above.
    echo ========================================================
)
echo.
pause
