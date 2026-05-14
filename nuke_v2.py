import os
import re

def nuke_v2(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        'BIOGAZ': 'BIOGAS',
        'SILNIK': 'ENGINE',
        'KSE / GPZ': 'Grid / Connection',
        'SUSZARNIA': 'DRYER',
        'POFERMENT': 'DIGESTATE',
        'Poferment': 'Digestate',
        'Specyfikacja': 'Specification',
        'Moc instalacji': 'Installation power',
        'Green Plant PROWADZI': 'Managed by Green Plant',
        'Procedura': 'Procedure',
        'UPROSZCZONA*': 'SIMPLIFIED*',
        'Second Source Profitu.': 'Second Source of Profit.',
        'Safety Inwestycji': 'Investment Safety',
        'zapachowych.': 'odor-forming.',
        'Akceptacja Social.': 'Social Acceptance.',
        'Dla Gminy': 'For the Municipality',
        'Safety energetyczne gminy': 'Municipal energy safety',
        'Partner Strategiczny': 'Strategic Partner',
        'Kto stoi za <span class="serif-italic text-gold-accent">Green Plant.</span>': 'Who stands behind <span class="serif-italic text-gold-accent">Green Plant.</span>',
        'finansowaniu infrastruktury.': 'infrastructure financing.',
        'Licencja URE': 'ERO License',
        'Certyfikat ATEX': 'ATEX Certificate',
        'OC / All-Risk': 'Liability / All-Risk',
        'm³ Biometanu / Rok': 'm³ Biomethane / Year',
        'Ekspertyza Connection': 'Connection Expertise',
        'Przewaga Connection.': 'Connection Advantage.',
        'Podstawa Mocy': 'Power Base',
        'Fewer Mineral Fertilizer Purchases Mineral.': 'Reduced Mineral Fertilizer Purchases.',
        'bilans pola.': 'field balance.',
        'Azot w formie amonowej jest szybciej\n                        assimilable by plants.': 'Ammonium nitrogen is more quickly assimilable by plants.',
        'Mniejszy Odor — fermentacja rozbija lotne kwasy': 'Less Odor — fermentation breaks down volatile acids',
        'Pathogen reduction — hygienization': 'Pathogen reduction — hygiene (hygienization)',
        'Better penetration — lower viscosity, even spreading': 'Better penetration — lower viscosity, even spreading',
        'Fewer weeds — seeds destroyed in the process': 'Fewer weeds — seeds destroyed in the process',
        'Przy 180 ha =': 'At 180 ha =',
        'Budujemy Przy\n                            Feedstock Source.': 'We Build Near the Feedstock Source.',
        'Maks': 'Max',
        'Szybka': 'Fast',
        'Stabilne': 'Stable',
        'Ziemniaki': 'Potatoes',
        'Buraki cukrowe': 'Sugar beets',
        'Plewy pszeniczne': 'Wheat husks',
        'Manure kurzy': 'Chicken manure',
        'Manure indyczy': 'Turkey manure',
        'Manure owczy': 'Sheep manure',
        'Suchy obornik drobiowy': 'Dry poultry manure',
        'Kiszonka z lucerny': 'Alfalfa silage',
        'Kiszonka z trawy': 'Grass silage',
        'Kiszonka z konopi': 'Hemp silage',
        'Oborniki i Slurry': 'Manure and Slurry',
        'Wsad rolniczy': 'Agricultural feedstock',
        'Energia elektryczna': 'Electricity',
        'Usable Heat': 'Usable Heat',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

nuke_v2('public/presentation_en.html')
nuke_v2('greenplant_en.jsx')
print("Nuke V2 completed.")
