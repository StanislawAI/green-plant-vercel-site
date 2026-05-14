import os
import re

def surgical_cleaner(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Precise replacements for lines found in grep
    replacements = {
        'PARTNERSHIP dla gospodarstw rolnych • model do 0,5 MW': 'PARTNERSHIP for farms • model up to 0.5 MW',
        'Model referencyjny dla instalacji < 0,5 MW': 'Reference model for the installation < 0.5 MW',
        'gnojowica + kiszonka': 'slurry + silage',
        'Ty dostarczasz wsad i odbierasz efekty procesu.': 'You provide the feedstock and receive the process outcomes.',
        'Green Plant prowadzi\n                financing, operations, and 24/7 service in an operator model.': 'Green Plant manages financing, operations, and 24/7 service in an operator model.',
        'Farmer dostarcza wsad. OPEX i utrzymanie instalacji': 'The farmer provides the feedstock. Green Plant handles OPEX and maintenance',
        'realizes Green Plant w ramach modelu SPV.': 'within the SPV model.',
        'Jak Biologia Pracuje Na Wynik.': 'How Biology Works for the Result.',
        'Risk Regulacyjne': 'Regulatory Risk',
        'Wartości orientacyjne, oparte na szacunkach branżowych.': 'Indicative values based on industry estimates.',
        'Ryzyko Regulacyjne': 'Regulatory Risk',
        'Przewaga Connection.': 'Connection Advantage.',
        'Ekspertyza Connection': 'Connection Expertise',
        'Przewaga Connection.': 'Connection Advantage.',
        'od pierwszego dnia.': 'from day one.',
        'Biogas works stabilnie 24/7 i wzmacnia lokalny bilans mocy.': 'Biogas works stably 24/7 and strengthens the local power balance.',
        'Podstawa Mocy': 'Power Base',
        'Fewer Mineral Fertilizer Purchases Mineral.': 'Reduced Mineral Fertilizer Purchases.',
        'bilans pola.': 'field balance.',
        'Azot w formie amonowej jest szybciej\n                        assimilable by plants.': 'Ammonium nitrogen is more quickly assimilable by plants.',
        'Azot': 'Nitrogen',
        'Fosfor': 'Phosphorus',
        'Potas': 'Potassium',
        'Mniejszy Odor — fermentacja rozbija lotne kwasy': 'Less Odor — fermentation breaks down volatile acids',
        'Przy 180 ha =': 'With 180 ha =',
        'Budujemy Przy\n                             Feedstock Source.': 'We Build Near the Feedstock Source.',
        'Spotkanie': 'Meeting',
        'Short conversation and initial site screening for feedstock,\n                            plot, and connection.': 'Short conversation and initial site screening for feedstock, plot, and connection.',
        'Wizyta inżynierska i mapa ryzyk: wsad, przyłącze, Formalities.': 'Engineering visit and risk map: feedstock, connection, formalities.',
        'National Fund for Environmental Protection': 'National Fund for Environmental Protection (NFOŚiGW)',
        'z o.o.': 'Ltd.',
        'Sp. z o.o.': 'Ltd.',
        'Polska — Kolebka Nafty': 'Poland — Cradle of Oil',
        'technologii, praktyce i odwadze inwestycyjnej.': 'technology, practice, and investment courage.',
        'przewidywalnym dochodem farm.': 'predictable farm income.',
        'Co Trafia Do Fermentora?': 'What Goes Into the Fermenter?',
        'zagospodarowania masz aktywo produkcyjne.': 'management, you have a production asset.',
        'Cukry i Skrobia': 'Sugars and Starch',
        'Kukurydza': 'Corn',
        'Szybka': 'Fast',
        'Zasoby Agro': 'Agro Resources',
        'Maks': 'Max',
        'Uprofit Energii': 'Energy Profit',
        'Stabilne': 'Stable',
        'Bufor Procesu': 'Process Buffer',
        'Shelf\n                    Megawata?': 'per Megawatt?',
        'zapotrzebowanie roczne dla instalacji 500 kW.': 'annual demand for a 500 kW installation.',
        '🌿 Kiszonki i Uprawy Energetyczne': '🌿 Silage and Energy Crops',
        'Kiszonka z corn': 'Corn silage',
        'Kiszonka z lucerny': 'Alfalfa silage',
        'Kiszonka z trawy': 'Grass silage',
        'Suchy obornik drobiowy': 'Dry poultry manure',
        'Manure kurzy': 'Chicken manure',
        'Manure indyczy': 'Turkey manure',
        'Manure owczy': 'Sheep manure',
        'Plewy pszeniczne': 'Wheat husks',
        'Buraki cukrowe': 'Sugar beets',
        'Ziemniaki': 'Potatoes',
        'z konopi': 'from hemp',
        'Oborniki i Slurry': 'Manure and Slurry',
        'Inżynieria Procesu': 'Process Engineering',
        'Nadzór Inwestorski': 'Investor Supervision',
        'Protokół Realizacji': 'Implementation Protocol',
        'Inicjacja procesu.': 'Process initiation.',
        'Sekwencja Wdrożeniowa.': 'Implementation Sequence.',
        'Analiza Substratu': 'Substrate Analysis',
        'Macierz Substratów.': 'Substrate Matrix.',
        'Gnojowica Bydlęca': 'Cattle Slurry',
        'Odpad Rolniczy': 'Agricultural Waste',
        'Obornik Świński': 'Pig Manure',
        'Wysłodki Buraczane': 'Beet Pulp',
        'Odpad Przemysłowy': 'Industrial Waste',
        'Odpady Poubojowe': 'Slaughterhouse Waste',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    # Word-level cleanups for Polish artifacts in classes/comments
    content = content.replace('font-Standardl', 'font-normal')
    content = content.replace('Biuyearracji', 'Bureaucracy')
    content = content.replace('uaccordingnia', 'agreements')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

surgical_cleaner('public/presentation_en.html')
surgical_cleaner('greenplant_en.jsx')
print("Surgical cleaning completed.")
