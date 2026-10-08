const fs = require('fs');
let content = fs.readFileSync('style.css', 'utf-8');

// Replace main text colors
content = content.replace(/color:\s*(#333|#2c3138|#444|#555|#222|#333333)\b/ig, 'color: #31363F');

// Replace secondary text colors
content = content.replace(/color:\s*(#777|#888|#999|#666|#777777|#888888|#999999|#666666)\b/ig, 'color: #828894');

// Replace specific icon classes with gray (#A5AAB2)
content = content.replace(/(\.modal-close\s*\{[^}]*color:\s*)#[0-9a-fA-F]+/ig, '$1#A5AAB2');
content = content.replace(/(\.accordion-icon\s*\{[^}]*color:\s*)#[0-9a-fA-F]+/ig, '$1#A5AAB2');
content = content.replace(/(\.user-icon\s*\{[^}]*color:\s*)#[0-9a-fA-F]+/ig, '$1#A5AAB2');
content = content.replace(/(\.btn-icon-small\s*\{[^}]*color:\s*)#[0-9a-fA-F]+/ig, '$1#A5AAB2');
content = content.replace(/(\.modal-close:hover\s*\{[^}]*color:\s*)#[0-9a-fA-F]+/ig, '$1#31363F');

fs.writeFileSync('style.css', content);
