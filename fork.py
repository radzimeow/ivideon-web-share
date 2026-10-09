import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_marker = '<div class="modal-overlay" id="accessModal">'
start_idx = html.find(start_marker)

end_marker = '<!-- Modal '
# find the next modal after accessModal
end_idx = html.find(end_marker, start_idx + len(start_marker))

access_modal_html = html[start_idx:end_idx]

# Create the new modal
new_modal = access_modal_html.replace('id="accessModal"', 'id="accessModalNew"')
new_modal = new_modal.replace('dynamicCamName1', 'dynamicCamName1New')
new_modal = "<!-- Modal Права доступа (Новый вариант) -->\n" + new_modal

fork_modal = """
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
    </div>\n\n
"""

# Insert into HTML before accessModal
html = html[:start_idx] + fork_modal + new_modal + html[start_idx:]

# Update the functions that open accessModal to open forkModal instead
# ONLY do this for openAccessModal(), goBackToAccessModal(), confirmCloseAccess(), and confirmCloseActiveAccess()
html = re.sub(r"(function openAccessModal[\s\S]*?)openModal\('accessModal'\);", r"\1openModal('forkModal');", html)
html = re.sub(r"(function goBackToAccessModal[\s\S]*?)openModal\('accessModal'\);", r"\1openModal('forkModal');", html)
html = re.sub(r"(function confirmCloseAccess[\s\S]*?)openModal\('accessModal'\);", r"\1openModal('forkModal');", html)

js_functions = """
        function openOldAccessModal() {
            closeModal('forkModal');
            openModal('accessModal');
        }
        function openNewAccessModal() {
            closeModal('forkModal');
            const newName = document.getElementById('dynamicCamName1New');
            const oldName = document.getElementById('dynamicCamName1');
            if (newName && oldName) {
                newName.innerText = oldName.innerText;
            }
            openModal('accessModalNew');
        }
"""

html = html.replace('function openAccessModal(id, name) {', js_functions + '\n        function openAccessModal(id, name) {')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
