@echo off
chcp 65001 >nul
title E-Invitation Updater to GitHub
color 0A

echo ========================================================
echo   E-WEDDING INVITATION - AUTOMATIC GITHUB UPDATER
echo ========================================================
echo.
echo [1/3] Adding modified config files...
git add js/config.js package.json updater.bat
echo.
echo [2/3] Committing changes...
git commit -m "Update wedding invitation info"
echo.
echo [3/3] Pushing to GitHub & updating GitHub Pages...
git push origin main
echo.
if %ERRORLEVEL% equ 0 (
    echo ========================================================
    echo  [✓] ជោគជ័យ! ព័ត៌មានត្រូវបានបញ្ជូនទៅកាន់ GitHub រួចរាល់!
    echo  គេហទំព័រ Live នឹង Update ក្នុងរយៈពេល 1 ទៅ 2 នាទី៖
    echo  https://saveii.github.io/EII_invitation/
    echo ========================================================
) else (
    echo ========================================================
    echo  [!] សូមពិនិត្យមើលសារខាងលើ (ប្រសិនបើ GitHub ទាមទារ Login សូម Sign In)
    echo ========================================================
)
echo.
pause
