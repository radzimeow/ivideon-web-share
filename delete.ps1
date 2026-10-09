$lines = [System.IO.File]::ReadAllLines('c:\Users\etora\Desktop\Share access\index.html')
$newLines = new-object System.Collections.ArrayList
for ($i = 0; $i -lt $lines.Length; $i++) {
    if ($i -lt 406 -or $i -gt 481) {
        [void]$newLines.Add($lines[$i])
    }
}
[System.IO.File]::WriteAllLines('c:\Users\etora\Desktop\Share access\index.html', $newLines.ToArray(), [System.Text.Encoding]::UTF8)