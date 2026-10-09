$html = [System.IO.File]::ReadAllText('c:\Users\etora\Desktop\Share access\index.html', [System.Text.Encoding]::UTF8)
$js = [regex]::Match($html, '(?s)<script>(.*?)</script>').Groups[1].Value
[System.IO.File]::WriteAllText('c:\Users\etora\Desktop\Share access\test.js', $js, [System.Text.Encoding]::UTF8)