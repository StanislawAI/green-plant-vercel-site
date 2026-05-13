import os

def final_nuke(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Multi-line or tricky replacements
    content = content.replace('Jesteś <span\n                    class="serif-italic text-gold-accent">Co-ownerem.</span> Na lata.</h2>', 'You are a <span\n                    class="serif-italic text-gold-accent">Co-owner.</span> For years.</h2>')
    content = content.replace('Wizja\n                2030+', 'Vision\n                2030+')
    content = content.replace('generated value stays w gospodarstwie.', 'generated value stays on the farm.')
    content = content.replace('Wartości orientacyjne, oparte na', 'Indicative values, based on')
    content = content.replace('szacunkach branżowych.', 'industry estimates.')
    content = content.replace('Trudno rozkładalny węgiel (lignina) przetrwa proces. Przy', 'Difficult-to-decompose carbon (lignin) survives the process. During')
    content = content.replace('rozsiewaniu wspiera budowę materii organicznej i poprawę struktury gleby.', 'spreading, it supports organic matter building and soil structure improvement.')
    content = content.replace('Dla instalacji mikro (&lt; 0,5 MW) ścieżka administracyjna bywa prostsza niż dla dużych projektów.', 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.')
    content = content.replace('Wiąże się to z mniejszą liczbą uaccordingnień.', 'This involves fewer agreements.')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

final_nuke('public/presentation_en.html')
final_nuke('greenplant_en.jsx')
print("Final nuke completed.")
