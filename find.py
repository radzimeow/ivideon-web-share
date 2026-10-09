lines = open('index.html', 'r', encoding='utf-8').readlines()
start = 406
end = 406
while end < len(lines):
    if '<!-- End Modal Права доступа -->' in lines[end]:
        break
    if '<!-- Modal Развилка -->' in lines[end]:
        break
    if '<div class="modal-overlay" id="accessModal">' in lines[end]:
        break
    end += 1

print(f"Start: {start}, End: {end}")