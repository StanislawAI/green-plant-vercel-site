import os
import re

def presentation_polisher(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Massive map of specific replacements for public/presentation_en.html
    replacements = {
        'osobistego': 'personal',
        'ukrytych pozycji': 'hidden items',
        '✓ Co stays po your side': '✓ What stays on your side',
        'Beneficjentem dywidendy i digestateu': 'Beneficiary of dividends and digestate',
        '✗ Czego nie oddajesz': '✗ What you don\'t give away',
        'Nie sprzedajesz ziemi': 'You don\'t sell the land',
        'Po okresie umowy SPV': 'After the SPV agreement period',
        'Horizon support rynkowego to usually 15 years, a dalsza': 'Market support horizon is usually 15 years, and further',
        'Twoja Rola? <span\n                    class="serif-italic text-emerald-400">Ograniczona.</span>': 'Your Role? <span\n                    class="serif-italic text-emerald-400">Limited.</span>',
        'Ty dostarczasz wsad i odbierasz efekty procesu.': 'You provide the feedstock and receive the process outcomes.',
        '<span class="text-emerald-400 font-bold">Ty</span>': '<span class="text-emerald-400 font-bold">You</span>',
        'Dostarczasz\n                            wsad (gnojowica, obornik, kiszonka)': 'You provide feedstock (slurry, manure, silage)',
        'Odbierasz\n                            digestate i wykorzystujesz go na polach': 'You receive digestate and use it on the fields',
        'Odbierasz\n                            dividend and Usable Heat': 'You receive dividends and usable heat',
        'Handling\n                            techniczna 24/7': 'Technical handling 24/7',
        'Service i\n                            konserwacja': 'Service and maintenance',
        'Rozliczenia\n                            z OSD i URE': 'Settlements with DSO and ERO',
        'Ubezpieczenie i monitoring': 'Insurance and monitoring',
        'Dlaczego Nie <span\n                    class="serif-italic text-gray-400">Sama Fotowoltaika?</span>': 'Why Not <span\n                    class="serif-italic text-gray-400">Just Photovoltaics?</span>',
        'Praca w yearu': 'Annual operation',
        'TAK (suszarnia, barn)': 'YES (dryer, barn)',
        'TAK (digestate NPK)': 'YES (digestate NPK)',
        'TAK (gnojowica → energia)': 'YES (slurry → energy)',
        'Net-billing (zmienne)': 'Net-billing (variable)',
        'Aukcja (zmienne)': 'Auction (variable)',
        'Maszty + strefy': 'Masts + zones',
        'Dziedzictwo <span\n                        class="serif-italic text-gold-accent">Lukasiewicz</span>': 'Lukasiewicz <span\n                        class="serif-italic text-gold-accent">Heritage</span>',
        'Polska — Kolebka Nafty': 'Poland — Cradle of Oil',
        'technologii, praktyce i odwadze inwestycyjnej.': 'technology, practice, and investment courage.',
        'przewidywalnym dochodem farm.': 'predictable farm income.',
        'Co Trafia <br /><span\n                        class="text-emerald-700 serif-italic">Do Fermentora?</span>': 'What Goes <br /><span\n                        class="text-emerald-700 serif-italic">Into the Fermenter?</span>',
        'zagospodarowania masz aktywo produkcyjne.': 'management, you have a production asset.',
        'Cukry i Skrobia': 'Sugars and Starch',
        'Kukurydza': 'Corn',
        'Szybka': 'Fast',
        'Zasoby Agro': 'Agro Resources',
        'Maks': 'Max',
        'Uprofit Energii': 'Energy Profit',
        'Stabilne': 'Stable',
        'Bufor Procesu': 'Process Buffer',
        'How Much Of What On The <span class="serif-italic text-emerald-700">Shelf\n                    Megawata?</span>': 'How Much Feedstock per <span class="serif-italic text-emerald-700">Megawatt?</span>',
        'zapotrzebowanie roczne dla instalacji 500 kW.': 'annual demand for a 500 kW installation.',
        '🌿 Kiszonki i Uprawy Energetyczne': '🌿 Silage and Energy Crops',
        'Kiszonka z corn': 'Corn silage',
        'Kiszonka z lucerny': 'Alfalfa silage',
        'Kiszonka z trawy': 'Grass silage',
        'Koszty Operacyjne.': 'Operating Costs.',
        'RAZEM OPEX': 'TOTAL OPEX',
        'Ryzyko Regulacyjne': 'Regulatory Risk',
        'Tarcza Regulacyjna': 'Regulatory Shield',
        'Unikanie emisji (obornik i gnojowica)': 'Emission avoidance (manure and slurry)',
        'Wypieranie paliw kopalnych': 'Displacement of fossil fuels',
        'Poprawa bilansu glebowego': 'Soil balance improvement',
        'Wsad rolniczy': 'Agricultural feedstock',
        'Energia elektryczna': 'Electricity',
        'Poferment': 'Digestate',
        'Dla instalacji mikro (&lt; 0,5 MW) ścieżka administracyjna bywa prostsza niż dla dużych projektów.': 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.',
        'Mniej formalnego tarcia, szybszy start produkcji.': 'Less formal friction, faster production start.',
        'Decyzje i uaccordingnia': 'Decisions and agreements',
        'Prowadzimy proces od A do Z.': 'We manage the process from A to Z.',
        'Second Source Profitu.': 'Second Source of Profit.',
        'Ogrzewanie Obory': 'Barn Heating',
        '365 dni': '365 days',
        'Akceptacja Social.': 'Social Acceptance.',
        'Proces Hermetyczny': 'Hermetic Process',
        'Prezentacja dla Rady Gminy': 'Presentation for the Municipal Council',
        'Partner Strategiczny': 'Strategic Partner',
        'KRS / NIP': 'Registration / Tax ID',
        'z o.o.': 'Ltd.',
        'Sp. z o.o.': 'Ltd.',
        'Filozofia Inżynierii': 'Engineering Philosophy',
        'Wyceń projekt': 'Get a Quote',
        'Zainicjuj Inwestycję': 'Initiate Investment',
        'Sekwencja Wdrożeniowa.': 'Implementation Sequence.',
        'Macierz Substratów.': 'Substrate Matrix.',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    # Word-level cleanups
    word_map = {
        'Gnojowica': 'Slurry',
        'Obornik': 'Manure',
        'Kiszonka': 'Silage',
        'odpady': 'waste',
        'rolnicze': 'agricultural',
        'produkcji': 'production',
        'zysku': 'profit',
        'przychody': 'revenues',
        'koszty': 'costs',
        'lat': 'years',
        'dni': 'days',
        'miesięcy': 'months',
        'tygodni': 'weeks',
    }
    
    # Simple regex to replace these words when they appear as standalone text or within tags
    for pl, en in word_map.items():
        content = re.sub(rf'\b{pl}\b', en, content)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

presentation_polisher('public/presentation_en.html')
presentation_polisher('greenplant_en.jsx')
print("Presentation polisher completed.")
