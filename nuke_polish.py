import os

def nuke_polish(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Direct string replacements (no regex)
    replacements = {
        'Dla instalacji mikro (&lt; 0,5 MW) ścieżka administracyjna bywa prostsza niż dla dużych projektów.': 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.',
        'Jesteś <span>udziałowcem</span>': 'You are a <span>shareholder</span>',
        'SCENARIUSZ A: SPRZEDAŻ': 'SCENARIO A: SALE',
        'PRZYKŁAD KOWALSKI': 'CASE STUDY: FARMER KOWALSKI',
        'NASTĘPNE KROKI': 'NEXT STEPS',
        'Brak decision także costs. Poniżej comparison burden staying': 'Lack of decision also costs. Below is a comparison of the burden of staying',
        'To, co dziś bywa kosztem i uciążliwością, wraca na pole jako': 'What today is a cost and a nuisance returns to the field as',
        'stabilny nawóz organiczny.': 'a stable organic fertilizer.',
        'Poferment wraca na pole jako fertilizer organic o niższej': 'Digestate returns to the field as an organic fertilizer with lower',
        'Instalacja works automatycznie, a monitoring i reakcję serwisową': 'The installation works automatically, and 24/7 monitoring and service response',
        '24/7 prowadzi zespół Green Plant.': 'is provided by the Green Plant team.',
        'Nie jesteś lessee ani customer. Jesteś shareholder SPV, a': 'You are not a lessee or a customer. You are an SPV shareholder, and',
        'SPV produces prąd, HEAT i digestate. Projekt works from startup,': 'SPV produces electricity, heat, and digestate. The project works from startup,',
        'Most common questions, które we hear podczas visits w farmch i': 'The most common questions we hear during farm visits and',
        'Jesteś <span>udziałowcem</span>': 'You are a <span>shareholder</span>',
        'Inicjacja procesu.': 'Process initiation.',
        'Z lotu ptaka.': 'A bird\'s eye view.',
        'Polski biogaz od 2005.': 'Polish biogas since 2005.',
        'Od podpisu do pierwszego m³ biogazu.': 'From signature to the first m³ of biogas.',
        'Polecane lektury.': 'Recommended reading.',
        'Niewidzialni pracownicy.': 'Invisible workers.',
        'Market regionalny.': 'Regional market.',
        'Anatomia Reactora.': 'Reactor Anatomy.',
        'Anatomia': 'Anatomy',
        'Cztery fazy': 'Four phases',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

nuke_polish('public/presentation_en.html')
nuke_polish('greenplant_en.jsx')
print("Nuke Polish completed.")
