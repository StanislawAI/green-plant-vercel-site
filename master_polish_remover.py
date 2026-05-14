import os
import re

def master_remover(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        'PARTNERSHIP dla gospodarstw rolnych • model do 0,5 MW': 'PARTNERSHIP for agricultural farms • model up to 0.5 MW',
        'Filozofia Biznesowa': 'Business Philosophy',
        'Co dostajesz': 'What you get',
        'Rolnik': 'Farmer',
        'model bazowy': 'base model',
        'rozliczenia': 'settlements',
        'ubezpieczenie': 'insurance',
        'Twojego farm': 'your farm',
        'weryfikuje Green Plant': 'verified by Green Plant',
        'Kalkulacja': 'Calculation',
        'Twoje <span\n                    class="serif-italic text-emerald-400">Przychody.</span>': 'Your <span\n                    class="serif-italic text-emerald-400">Revenues.</span>',
        'Przychody.': 'Revenues.',
        'kiszonka corn silage': 'corn silage',
        'Zwrot projektu': 'Project return',
        'lat (ROI: 36%/year)': 'years (ROI: 36%/year)',
        'Kredyt komercyjny Green Plant': 'Green Plant commercial loan',
        'Gnojowica: koszt czy surowiec energetyczny': 'Slurry: cost or energy feedstock',
        'amortyzacja': 'amortization',
        'Twoja Ziemia <span\n                    class="serif-italic text-emerald-700">Zostaje Twoja.</span>': 'Your Land <span\n                    class="serif-italic text-emerald-700">Stays Yours.</span>',
        'Safety Prawne': 'Legal Safety',
        'Struktura Prawna': 'Legal Structure',
        'List intencyjny, analiza lokalizacji i przygotowanie\n                                struktury SPV.': 'Letter of intent, site analysis, and preparation of the SPV structure.',
        'Otrzymujesz regularny status prac.': 'You receive regular progress reports.',
        'monetyzacji.': 'monetization.',
        'z o.o.': 'Ltd.',
        'Co dostajesz': 'What you receive',
        'Heat z CHP': 'Heat from CHP',
        'A-Z: serwis, monitoring 24/7, rozliczenia, ubezpieczenie': 'A-Z: service, 24/7 monitoring, settlements, insurance',
        'Czy projekt pasuje do Twojego farm?': 'Does the project fit your farm?',
        'Dla ~500 kW usually': 'For ~500 kW usually',
        'Masz site': 'You have a site',
        'formalities weryfikuje Green Plant': 'formalities verified by Green Plant',
        'Model referencyjny dla instalacji': 'Reference model for the installation',
        'Gnojowica + kiszonka': 'Slurry + silage',
        'Zwrot projektu': 'Project return',
        'Harmonogram <span\n                    class="serif-italic text-emerald-700">Inwestycji</span>': 'Investment <span\n                    class="serif-italic text-emerald-700">Timeline</span>',
        'Przewaga Regulacyjna': 'Regulatory Advantage',
        'Biuyearracji.': 'Bureaucracy.',
        'Twoje m² Biogazu.': 'Your m³ of Biogas.',
        'Niewidzialni <span\n                    class="serif-italic text-emerald-400">Pracownicy.</span>': 'Invisible <span\n                    class="serif-italic text-emerald-400">Workers.</span>',
        'Ryzyko': 'Risk',
        'Wartość': 'Value',
        'Model referencyjny': 'Reference model',
        'Strona': 'Page',
        'Wizja': 'Vision',
        'Inwestycja': 'Investment',
        'Gospodarstwo': 'Farm',
        'Substrat': 'Substrate',
        'Biogazownia': 'Biogas plant',
        'Umowa': 'Agreement',
        'Udziały': 'Shares',
        'Zysk': 'Profit',
        'Przychód': 'Revenue',
        'Koszty': 'Costs',
        'Serwis': 'Service',
        'Monitoring': 'Monitoring',
        'Gwarancja': 'Guarantee',
        'Bezpieczeństwo': 'Safety',
        'Technologia': 'Technology',
        'Ekologia': 'Ecology',
        'Energia': 'Energy',
        'Ciepło': 'Heat',
        'Nawóz': 'Fertilizer',
        'Ziemia': 'Land',
        'Lokalizacja': 'Location',
        'Przyłącze': 'Connection',
        'Pozwolenie': 'Permit',
        'Decyzja': 'Decision',
        'Formalności': 'Formalities',
        'Kredyt': 'Credit',
        'Dotacja': 'Grant',
        'Kapitał': 'Capital',
        'Partner': 'Partner',
        'Strategia': 'Strategy',
        'Zespół': 'Team',
        'Kontakt': 'Contact',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    # Specific multi-line or tricky ones
    content = re.sub(r'PARTNERSHIP dla gospodarstw rolnych', 'PARTNERSHIP for farms', content)
    content = re.sub(r'model do 0,5 MW', 'model up to 0.5 MW', content)
    content = re.sub(r'Czy projekt pasuje do Twojego farm\?', 'Does the project fit your farm?', content)
    content = re.sub(r'z o\.o\.', 'Ltd.', content)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

master_remover('public/presentation_en.html')
master_remover('greenplant_en.jsx')
print("Master Polish remover completed.")
