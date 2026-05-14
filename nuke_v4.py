import os
import re

def nuke_v4(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        'Roczny cashflow operacyjny': 'Annual operating cashflow',
        'Eksploatacja': 'Operation',
        'Profit Netto SPV': 'SPV Net Profit',
        'scenariusz bazowy': 'baseline scenario',
        'Twoje 60% (Farmer)': 'Your 60% (Farmer)',
        'do your kieszeni': 'into your pocket',
        'Biogas plant w Kalendarzu\n                    Farmera.': 'Biogas plant in the\n                    Farmer\'s Calendar.',
        'works parallel do farm i stabilizes rhythm\n                work przez whole year.': 'works parallel to the farm and stabilizes the work rhythm throughout the year.',
        'Rozsiew digestateu na pola': 'Spreading digestate on fields',
        'Mniejszy zakup mineral fertilizers': 'Reduced purchase of mineral fertilizers',
        'Trawy mowed → substrat': 'Grass mowed → substrate',
        'Heat → drying siana': 'Heat → drying hay',
        'niewykorzystanego profitu netto SPV': 'unutilized SPV net profit',
        'Rynek <span class="serif-italic text-emerald-700">Przyspiesza.</span>': 'The Market <span class="serif-italic text-emerald-700">Accelerates.</span>',
        'Biogasowni w Polsce': 'Biogas plants in Poland',
        'Rynek nadal jest na wczesnym etapie.': 'The market is still at an early stage.',
        'W scenariuszach rozwoju\n                        a scale of ~1,500 plants by 2030 emerges.': 'Development scenarios suggest a scale of ~1,500 plants by 2030.',
        'Dywersyfikujesz gospodarstwo: obok production rolnej uruchamiasz\n                        a stable energy pillar year-round.': 'You diversify the farm: alongside agricultural production, you launch a stable energy pillar year-round.',
        'Biogas rolniczy stabilizes dochody': 'Agricultural biogas stabilizes income',
        'Faza 1: Twoja Biogas plant': 'Phase 1: Your Biogas plant',
        'a shares remain po your side.': 'and shares remain on your side.',
        'potencjalnie wraz z portfelem': 'potentially along with the portfolio',
        'Bez terminu': 'No fixed term',
        'meetings local.': 'local meetings.',
        'ok. 0,4% przy 180 ha': 'approx. 0.4% at 180 ha',
        'Rest fields\n                        works normally — a even better thanks to digestateowi.': 'Rest of the fields work normally — and even better thanks to digestate.',
        'mix from several\n                        gospodarstw.': 'mix from several farms.',
        'SPV to osobny podmiot.': 'SPV is a separate entity.',
        'occupies tylko 0,7 ha Landu zabudowanego.': 'occupies only 0.7 ha of built-up land.',
        'Ile czasu to zajmie dziennie?': 'How much time will it take daily?',
        'settlements prowadzi Green Plant.': 'settlements are handled by Green Plant.',
        'Agreement SPV provides clauses disposal shares — you can je\n                        sell or hand over children jako ready assets.': 'The SPV agreement provides clauses for the disposal of shares — you can sell them or hand them over to children as ready assets.',
        'Partner Energetyczny': 'Energy Partner',
        'Scenariusz\n                        Rynkowy': 'Market\n                        Scenario',
        'Prognozowany wynik': 'Forecasted result',
        'Profit "w nawozie" rocznie': 'Annual profit "in fertilizer"',
        'Zasoby Agro': 'Agro Resources',
        'Maks': 'Max',
        'Szybka': 'Fast',
        'Stabilne': 'Stable',
        'Ziemniaki': 'Potatoes',
        'Buraki cukrowe': 'Sugar beets',
        'Plewy pszeniczne': 'Wheat husks',
        'Oborniki i Slurry': 'Manure and Slurry',
        'Wsad rolniczy': 'Agricultural feedstock',
        'Energia elektryczna': 'Electricity',
        'Usable Heat': 'Usable Heat',
        'Biogas rolniczy stabilizes dochody\n                    of the farm regardless of market conditions or weather.': 'Agricultural biogas stabilizes farm income regardless of market conditions or weather.',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

nuke_v4('public/presentation_en.html')
nuke_v4('greenplant_en.jsx')
print("Nuke V4 completed.")
