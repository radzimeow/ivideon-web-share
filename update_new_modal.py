import re
import sys

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Update updatePublicAccessStatusUI
js_func = """function updatePublicAccessStatusUI() {
            const updateEl = (id) => {
                const el = document.getElementById(id);
                if (!el) return;
                
                const span = el.querySelector('span');
                const i = el.querySelector('i');
                const leftI = el.parentElement.querySelector('.public-left i');
                const leftText = el.parentElement.querySelector('.public-left span') || el.parentElement.querySelector('.public-left').childNodes[2];
                
                if (isPublicAccessOpen) {
                    span.innerText = 'Доступ открыт';
                    el.style.color = '#1ba0fa';
                    i.style.color = '#1ba0fa';
                    if(leftI) leftI.style.color = '#1ba0fa';
                    if(leftText && leftText.nodeType === 3) leftText.textContent = ' Публичный доступ к камере';
                    else if (leftText) leftText.innerText = 'Публичный доступ к камере';
                } else {
                    span.innerText = 'Доступ закрыт';
                    el.style.color = '#828894';
                    i.style.color = '#A5AAB2';
                    if(leftI) leftI.style.color = '#A5AAB2';
                    if(leftText && leftText.nodeType === 3) leftText.textContent = ' Публичный доступ к камере';
                    else if (leftText) leftText.innerText = 'Публичный доступ к камере';
                }
            };
            
            updateEl('publicAccessStatus');
            updateEl('publicAccessStatusNew');
        }"""

# Replace old updatePublicAccessStatusUI entirely
html = re.sub(r'function updatePublicAccessStatusUI\(\) \{[\s\S]*?(?=\n\s*function resetPublicActiveTabs\(\))', js_func + "\n", html)

# Now we need to modify ONLY accessModalNew block
start_marker = '<!-- Modal Права доступа (Новый вариант) -->'
start_idx = html.find(start_marker)
if start_idx == -1:
    print("Error: accessModalNew not found")
    sys.exit(1)

end_marker = '<!-- Modal Развилка -->'
end_idx = html.find(end_marker, start_idx)

new_modal_html = html[start_idx:end_idx]

# 2. Extract and fix public-access-block, remove info-path
# We will just rewrite the modal-body top part for accessModalNew
new_body_top = """<div class="modal-body">
                <div class="modal-info-block">
                    <div class="info-title"><i class="fas fa-video"></i> <span id="dynamicCamName1New">Этаж 1. Вход</span></div>
                </div>

                <div class="public-access-block" onclick="handlePublicAccessClick()">
                    <div class="public-left">
                        <i class="fas fa-share-alt"></i>
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
                
            </div>"""

# Replace everything from <div class="modal-body"> to the end of <div class="modal-body"> in accessModalNew
body_start = new_modal_html.find('<div class="modal-body">')
body_end = new_modal_html.find('</div>\n            \n            <div class="modal-footer"', body_start)

if body_start != -1 and body_end != -1:
    new_modal_html = new_modal_html[:body_start] + new_body_top + new_modal_html[body_end:]
else:
    print("Could not find body bounds")
    sys.exit(1)

html = html[:start_idx] + new_modal_html + html[end_idx:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
