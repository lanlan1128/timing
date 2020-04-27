Dim res, WSH
Set WSH = CreateObject("WScript.Shell")

'在窗口显示 “Closed after 2 seconds.”
res = WSH.Popup(WScript.Arguments(1), 5, WScript.Arguments(0), wshYesNoDialog + vbSystemModal + wshQuestionMark) 
Set WSH = Nothing
