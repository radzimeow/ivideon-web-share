$html = Get-Content 'index.html' -Raw -Encoding UTF8

$start = $html.IndexOf('<div class="modal-overlay" id="accessModal">')
$end = $html.IndexOf('<!-- Modal', $start + 1)
$accessModalHtml = $html.Substring($start, $end - $start)

$newModal = $accessModalHtml -replace 'id="accessModal"', 'id="accessModalNew"'
$newModal = $newModal -replace 'dynamicCamName1', 'dynamicCamName1New'
$newModal = "<!-- Modal Права доступа (Новый вариант) -->`n" + $newModal

$forkModal = @"
    <!-- Modal Развилка -->
    <div class="modal-overlay" id="forkModal">
        <div class="modal-dialog" style="width: 400px; padding-bottom: 24px;">
            <div class="modal-header">
                <h2 class="modal-title">Выберите вариант</h2>
                <button class="modal-close" onclick="closeModal('forkModal')"><i class="fas fa-times"></i></button>
            </div>
            <div class="modal-body" style="display: flex; flex-direction: column; gap: 16px;">
                <button class="btn-primary" onclick="openOldAccessModal()" style="width: 100%;">Старый вариант</button>
                <button class="btn-primary" onclick="openNewAccessModal()" style="width: 100%; background: #00d26a; border-color: #00d26a;">Новый вариант</button>
            </div>
        </div>
    </div>`n`n
"@

$html = $html.Insert($start, $forkModal + $newModal)

$html = $html -replace "openModal\('accessModal'\);", "openModal('forkModal');"

$jsFunctions = @"
        function openOldAccessModal() {
            closeModal('forkModal');
            openModal('accessModal');
        }
        function openNewAccessModal() {
            closeModal('forkModal');
            document.getElementById('dynamicCamName1New').innerText = document.getElementById('dynamicCamName1').innerText;
            openModal('accessModalNew');
        }
"@

$html = $html -replace 'function openAccessModal\(id, name\) \{', ($jsFunctions + "`n        function openAccessModal(id, name) {")

Set-Content 'index.html' -Value $html -Encoding UTF8
