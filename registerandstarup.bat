@echo off
REM set "lj=%~dp0"
REM set "target_root=%lj%\\starup.bat"
REM echo REGEDIT4>x.reg
REM echo.
REM echo [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\run]>>x.reg
REM echo "timing"="">>x.reg
REM regedit /s x.reg &del x.reg

reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v timing /t REG_SZ /d %~dp0\starup.bat /f
pushd %~dp0
cscript backendStartExe.vbs
echo 服务注册成功
pause