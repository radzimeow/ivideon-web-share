import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

js = re.search(r'(?s)<script>(.*?)</script>', html).group(1)

with open('test.js', 'w', encoding='utf-8') as f:
    f.write(js)