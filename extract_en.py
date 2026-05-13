import re

with open("greenplant_en.jsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

polish_chars = re.compile(r'[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]')
for i, line in enumerate(lines):
    if polish_chars.search(line):
        if "className" not in line and "import" not in line:
            print(f"{i+1}: {line.strip()}")
