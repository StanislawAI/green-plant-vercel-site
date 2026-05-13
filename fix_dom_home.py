import re
import os

# Fixes for greenplant_en.jsx
with open("greenplant_en.jsx", "r", encoding="utf-8") as f:
    content = f.read()

replacements_jsx = {
    r'// top Homee': '// top dome',
    r'// Homee': '// dome',
    r'Math\.ranHome\(\)': 'Math.random()',
    r'// gas Homee': '// gas dome',
    r"1 600 polskich gospodarstw Homeowych zasilanych z jednej biogazowni\. 24/7\.": "1,600 Polish households powered by a single biogas plant. 24/7.",
    r'kingHome:': 'kingdom:',
    r'\{m\.kingHome\}': '{m.kingdom}'
}

for k, v in replacements_jsx.items():
    content = re.sub(k, v, content)

with open("greenplant_en.jsx", "w", encoding="utf-8") as f:
    f.write(content)

# Fixes for public/presentation_en.html
with open("public/presentation_en.html", "r", encoding="utf-8") as f:
    content_html = f.read()

replacements_html = {
    r'\(suszarnia, barn, home, warsztat\)': '(dryer, barn, home, workshop)',
    r'>home i Budynki<': '>Home and Buildings<',
    r'Ogrzewasz home, warsztat i budynki gospodarcze\. Rachunki za gaz i': 'You heat the home, workshop and farm buildings. Gas bills and',
    r'pracuje razem z nim</span> i homeyka obieg gospodarstwa\."': 'works with it</span> and closes the farm\'s cycle."',
    r'homeykają przyłącza i zabezpieczają optymalne lokalizacje\.': 'close grid connections and secure optimal locations.',
    r'homeknięcie finansowania': 'financial closing',
    r"'homeContentLoaded'": "'DOMContentLoaded'"
}

for k, v in replacements_html.items():
    content_html = re.sub(k, v, content_html)

with open("public/presentation_en.html", "w", encoding="utf-8") as f:
    f.write(content_html)

print("Fixes applied.")
