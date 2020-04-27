DIM objShell
set objShell = wscript.createObject("wscript.shell")
current = createobject("Scripting.FileSystemObject").GetFile(Wscript.ScriptFullName).ParentFolder.Path
commond = "cmd.exe /C " & current & "\timing.exe"
iRetrun = objShell.Run(commond, 0, false)