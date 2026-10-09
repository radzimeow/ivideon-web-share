$html = Get-Content 'index.html' -Raw -Encoding UTF8

$startIdx = $html.IndexOf('id="accessModalNew"')
if ($startIdx -eq -1) { Write-Host "Error: accessModalNew not found"; exit }
$endIdx = $html.IndexOf('id="accessModal"', $startIdx)

$newModal = $html.Substring($startIdx, $endIdx - $startIdx)

# 1. Add modal-info-block-new to the modal-info-block inside accessModalNew
$newModal = $newModal -replace '<div class="modal-info-block">', '<div class="modal-info-block modal-info-block-new">'

# 2. Add public-access-block-new to public-access-block inside accessModalNew
$newModal = $newModal -replace '<div class="public-access-block"', '<div class="public-access-block public-access-block-new"'

# 3. Add flex-shrink: 0 to modal-filters inside accessModalNew (or just globally via CSS)
$newModal = $newModal -replace '<div class="filters modal-filters">', '<div class="filters modal-filters" style="flex-shrink: 0;">'

$html = $html.Substring(0, $startIdx) + $newModal + $html.Substring($endIdx)

Set-Content 'index.html' -Value $html -Encoding UTF8
