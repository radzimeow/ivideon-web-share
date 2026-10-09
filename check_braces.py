js = open('test.js', 'r', encoding='utf-8').read()
opens = js.count('{')
closes = js.count('}')
print(f'Opens: {opens}, Closes: {closes}')