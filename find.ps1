$lines = [System.IO.File]::ReadAllLines('c:\Users\etora\Desktop\Share access\index.html')
$start = -1
$end = -1
for ($i = 405; $i -lt $lines.Length; $i++) {
    if ($lines[$i] -match 'id="accessModalNewSettingsView"') {
        if ($start -eq -1) { $start = $i }
    }
    if ($start -ne -1 -and ($lines[$i] -match 'id="accessModal"' -or $lines[$i] -match 'id="forkModal"')) {
        $end = $i - 2
        break
    }
}
Write-Host "Start: $start, End: $end"