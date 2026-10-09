
$js = [System.IO.File]::ReadAllText("c:\Users\etora\Desktop\Share access\test.js", [System.Text.Encoding]::UTF8)
$opens = ($js.Split("[")).Count - 1
$closes = ($js.Split("]")).Count - 1
Write-Host "Opens: $opens, Closes: $closes"
