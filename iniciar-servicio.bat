@echo off
cd /d "C:\Users\Admin\Downloads\chat-de-facu-y-rocío\chat-with-furi"
start /min "" "C:\Program Files\nodejs\node.exe" server.js
echo Servidor iniciado en segundo plano.
echo Abri http://localhost:3000
timeout /t 3 >nul
