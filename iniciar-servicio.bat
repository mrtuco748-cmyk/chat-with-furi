@echo off
net start ChatFacuRocio
if %errorlevel%==0 (
    echo Servicio iniciado. Abri http://localhost:3000
) else (
    echo Ejecutame como ADMINISTRADOR (clic derecho ^> Ejecutar como administrador)
)
pause
