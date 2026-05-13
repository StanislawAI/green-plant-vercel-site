import re
import os

def final_polish_scrub(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        r'Dla instalacji mikro \(< 0,5 MW\) ścieżka administracyjna bywa prostsza niż dla dużych projektów\.': 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.',
        r'Brak decision także costs\. Poniżej comparison burden staying': 'Lack of decision also costs. Below is a comparison of the burden of staying',
        r'To, co dziś bywa kosztem i uciążliwością, wraca na pole jako': 'What today is a cost and a nuisance returns to the field as',
        r'stabilny nawóz organiczny\.': 'a stable organic fertilizer.',
        r'Poferment wraca na pole jako fertilizer organic o niższej': 'Digestate returns to the field as an organic fertilizer with lower',
        r'Instalacja works automatycznie, a monitoring i reakcję serwisową': 'The installation works automatically, and 24/7 monitoring and service response',
        r'24/7 prowadzi zespół Green Plant\.': 'is provided by the Green Plant team.',
        r'Jesteś <span>udziałowcem</span>': 'You are a <span>shareholder</span>',
        r'Nie jesteś lessee ani customer\. Jesteś shareholder SPV, a': 'You are not a lessee or a customer. You are an SPV shareholder, and',
        r'SPV produces prąd, HEAT i digestate\. Projekt works from startup,': 'SPV produces electricity, heat, and digestate. The project works from startup,',
        r'Most common questions, które we hear podczas visits w farmch i': 'The most common questions we hear during farm visits and',
        r'Bóbrka': 'Bobrka',
        r'Łukasiewicz': 'Lukasiewicz',
        r'NFOŚiGW': 'National Fund for Environmental Protection',
        r'BOŚ': 'BOS Bank',
    }

    for pl, en in replacements.items():
        content = re.sub(pl, en, content)

    # Word-level cleanups for remaining fragments
    word_map = {
        'prąd': 'electricity',
        'ciepła': 'heat',
        'miejsce': 'site',
        'wizyta': 'visit',
        'visitsa': 'visit',
        'Formalities': 'formalities',
        'Formalitiesami': 'formalities',
        'uciążliwości': 'nuisance',
        'zapachowej': 'odor',
        'łatwiejszej': 'easier',
        'aplikacji': 'application',
    }
    
    for pl, en in word_map.items():
        content = re.sub(rf'\b{pl}\b', en, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

final_polish_scrub('public/presentation_en.html')
final_polish_scrub('greenplant_en.jsx')
print("Final Polish scrub completed.")
