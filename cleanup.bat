@echo off
echo Removing backup folders...

if exist "app\blog\[id]_backup" rmdir /s /q "app\blog\[id]_backup"
if exist "app\camp\[id]_backup" rmdir /s /q "app\camp\[id]_backup"

echo Backup folders removed successfully!
echo.
echo Now you can run: npm run dev
pause
