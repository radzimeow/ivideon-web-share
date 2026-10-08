import re

with open('style.css', 'r', encoding='utf-8') as f:
    content = f.read()

content = re.sub(r'(?i)color:\s*(#333|#2c3138|#444|#555|#222|#333333)\b', 'color: #31363F', content)
content = re.sub(r'(?i)color:\s*(#777|#888|#999|#666|#777777|#888888|#999999|#666666)\b', 'color: #828894', content)
content = re.sub(r'(?i)color:\s*(#aaa|#aaaaaa)\b', 'color: #A5AAB2', content)

# Fix specific icon classes
content = re.sub(r'(\.modal-close\s*\{[^}]*color:\s*)#[0-9a-fA-F]+', r'\g<1>#A5AAB2', content)
content = re.sub(r'(\.accordion-icon\s*\{[^}]*color:\s*)#[0-9a-fA-F]+', r'\g<1>#A5AAB2', content)
content = re.sub(r'(\.user-icon\s*\{[^}]*color:\s*)#[0-9a-fA-F]+', r'\g<1>#A5AAB2', content)
content = re.sub(r'(\.btn-icon-small\s*\{[^}]*color:\s*)#[0-9a-fA-F]+', r'\g<1>#A5AAB2', content)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(content)
