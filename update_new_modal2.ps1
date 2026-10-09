$html = Get-Content 'index.html' -Raw -Encoding UTF8

$jsFunc = @"
        function updatePublicAccessStatusUI() {
            const updateEl = (id) => {
                const el = document.getElementById(id);
                if (!el) return;
                
                const span = el.querySelector('span');
                const i = el.querySelector('i');
                const leftI = el.parentElement.querySelector('.public-left i');
                
                if (isPublicAccessOpen) {
                    if(span) span.innerText = 'Доступ открыт';
                    el.style.color = '#1ba0fa';
                    if(i) i.style.color = '#1ba0fa';
                    if(leftI) leftI.style.color = '#1ba0fa';
                } else {
                    if(span) span.innerText = 'Доступ закрыт';
                    el.style.color = '#828894';
                    if(i) i.style.color = '#A5AAB2';
                    if(leftI) leftI.style.color = '#A5AAB2';
                }
            };
            
            updateEl('publicAccessStatus');
            updateEl('publicAccessStatusNew');
        }
"@
# Replace old updatePublicAccessStatusUI entirely using regex
$html = $html -replace '(?s)function updatePublicAccessStatusUI\(\) \{.*?(?=\r?\n\s*function resetPublicActiveTabs\(\))', $jsFunc


$startMarker = '<!-- Modal Права доступа (Новый вариант) -->'
$startIdx = $html.IndexOf($startMarker)
if ($startIdx -eq -1) { Write-Host "Error: accessModalNew not found"; exit }

$endMarker = '<div class="modal-overlay" id="accessModal">'
$endIdx = $html.IndexOf($endMarker, $startIdx)

$newModalHtml = $html.Substring($startIdx, $endIdx - $startIdx)


$newBodyTop = @"
<div class="modal-body">
                <div class="modal-info-block">
                    <div class="info-title"><i class="fas fa-video"></i> <span id="dynamicCamName1New">Этаж 1. Вход</span></div>
                </div>

                <div class="public-access-block" onclick="handlePublicAccessClick()">
                    <div class="public-left">
                        <i class="fas fa-share-nodes"></i>
                        <span>Публичный доступ к камере</span>
                    </div>
                    <div class="public-right" id="publicAccessStatusNew">
                        <span>Доступ закрыт</span>
                        <i class="fas fa-chevron-right"></i>
                    </div>
                </div>
                
                <div class="modal-toolbar">
                    <div class="search-box modal-search">
                        <input type="text" placeholder="Поиск пользователей">
                    </div>
                    <div class="filters modal-filters">
                        <span class="filter-label" style="margin-right: 10px;">ФИЛЬТРЫ:</span>
                        <span class="filter-pill modal-pill" style="margin-right: 8px;">ТИПЫ ПРАВ</span>
                        <span class="filter-pill modal-pill">ТИПЫ ДОСТУПА</span>
                    </div>
                </div>

                <div class="user-list-container" style="border: 1px solid #e0e0e0; border-radius: 6px; height: 350px; overflow-y: auto; margin-bottom: 32px; background: #fff;">
                    
                    <div class="user-item">
                        <div class="user-icon"><i class="fas fa-user"></i></div>
                        <div class="user-details">
                            <div class="user-name">person@ivideon.com <span style="color: #828894; font-weight: normal;">(Прямой доступ)</span></div>
                            <div class="user-roles">
                                <span><strong>Основные права:</strong> Администрирование (Все права)</span>
                                <span><strong>Видеоаналитика:</strong> Нет</span>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="btn-icon-small"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>

                    <div class="user-item">
                        <div class="user-icon"><i class="fas fa-user"></i></div>
                        <div class="user-details">
                            <div class="user-name">person@ivideon.com <span style="color: #828894; font-weight: normal;">(Прямой доступ)</span></div>
                            <div class="user-roles">
                                <span><strong>Основные права:</strong> Архив · PTZ · События и уведомления</span>
                                <span><strong>Видеоаналитика:</strong> Распознавание лиц (Просмотр)</span>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="btn-icon-small"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>

                    <div class="user-item">
                        <div class="user-icon"><i class="fas fa-user"></i></div>
                        <div class="user-details">
                            <div class="user-name">person@ivideon.com <span style="color: #828894; font-weight: normal;">(Доступ через группу)</span></div>
                            <div class="user-roles">
                                <span><strong>Основные права:</strong> Архив · PTZ · События и уведомления</span>
                                <span><strong>Видеоаналитика:</strong> Распознавание лиц (Просмотр)</span>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="btn-icon-small"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>

                    <div class="user-item">
                        <div class="user-icon"><i class="fas fa-user"></i></div>
                        <div class="user-details">
                            <div class="user-name">person@ivideon.com <span style="color: #828894; font-weight: normal;">(Доступ через объект)</span></div>
                            <div class="user-roles">
                                <span><strong>Основные права:</strong> Архив · PTZ · События и уведомления</span>
                                <span><strong>Видеоаналитика:</strong> Распознавание лиц (Просмотр)</span>
                            </div>
                        </div>
                        <div class="user-actions">
                            <button class="btn-icon-small"><i class="fas fa-ellipsis-v"></i></button>
                        </div>
                    </div>

                </div>
            </div>
"@

$newModalHtml = $newModalHtml -replace '(?s)<div class="modal-body">.*?(?=<div class="modal-footer")', "$newBodyTop            "

$html = $html.Substring(0, $startIdx) + $newModalHtml + $html.Substring($endIdx)

Set-Content 'index.html' -Value $html -Encoding UTF8
