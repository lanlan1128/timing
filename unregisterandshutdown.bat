@echo off
REM set "lj=%~dp0"
REM set "target_root=%lj%\\starup.bat"
REM echo REGEDIT4>x.reg
REM echo.
REM echo [HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\run]>>x.reg
REM echo "timing"="">>x.reg
REM regedit /s x.reg &del x.reg

reg delete  HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run /v timing
wmic process where "name='timing.exe'" call terminate
REM ����ע���ɹ�
echo ����ע���ɹ�
pause