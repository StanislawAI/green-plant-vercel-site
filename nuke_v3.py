import os
import re

def nuke_v3(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        'Fertilizer Obiegowy.': 'Circular Fertilizer.',
        'Digestate vs. Slurry Surowa': 'Digestate vs. Raw Slurry',
        'fermentacja rozbija lotne kwasy': 'fermentation breaks down volatile acids',
        'Budujemy Przy Feedstock Source.': 'We Build Near the Feedstock Source.',
        'monetyzacji projektu.': 'project monetization.',
        'Analiza Techniczna': 'Technical Analysis',
        'substratu and logistyki.': 'substrate and logistics.',
        'List Intencyjny': 'Letter of Intent',
        'Podpisanie LOI i start prac formalno-prawnych po side Green Plant.': 'Signing the LOI and starting formal-legal work on the Green Plant side.',
        'Pozwolenia + SPV': 'Permits + SPV',
        'Realizacja (~12 mies.)': 'Implementation (~12 months)',
        'Green Plant prowadzi wykonawstwo i rozruch. Twoja rola: teren i wsad.': 'Green Plant handles execution and startup. Your role: land and feedstock.',
        'Vision i Realizacja.': 'Vision and Implementation.',
        'localj sovereignty do safe future.': 'local sovereignty to a safe future.',
        'Sovereignty Lokalna.': 'Local Sovereignty.',
        'Serce Klastra': 'Heart of the Cluster',
        'Money in Powiecie': 'Money in the County',
        'regionie: u farmers, contractors i local service providers.': 'region: for farmers, contractors, and local service providers.',
        'Filary Prawne': 'Legal Pillars',
        'Ustawa o OZE': 'RES Act',
        'NCW (Paliwa)': 'NCW (National Index Target - Fuels)',
        'KOWR & ARiMR': 'KOWR & ARiMR (Agricultural Agencies)',
        'Programy KOWR i ARiMR support investments agricultural w biogas and infrastructure accompanying.': 'KOWR and ARiMR programs support agricultural investments in biogas and accompanying infrastructure.',
        'protect current subsidies i simultaneously open additional sources financing.': 'protect current subsidies and simultaneously open additional sources of financing.',
        'Payments direct (WPR/CAP) — bez changes': 'Direct payments (CAP) — without changes',
        'nadal kwalifikowalny': 'still eligible',
        'dotacje na OZE agricultural': 'grants for agricultural RES',
        'premie na investments w biogasownie': 'bonuses for investments in biogas plants',
        'Fundusz Modernizacyjny UE': 'EU Modernization Fund',
        'Zielone Certificates / Guarantees of Origin': 'Green Certificates / Guarantees of Origin',
        'Ty dostajesz gotowe decyzje do akceptacji.': 'You get ready-made decisions for approval.',
        'Waloryzacja Waste': 'Waste Valorization',
        'Drugi Value Stream.': 'Second Value Stream.',
        'Szklarnie': 'Greenhouses',
        'Przyspieszacz Wzrostu': 'Growth Accelerator',
        'Napoje': 'Beverages',
        'E-Paliwa': 'E-Fuels',
        'Prekursor Syntezy': 'Synthesis Precursor',
        'Mechanizm FIT/FIP stabilizes price energy even do 15 years, a OSD realizes obligation purchase according z conditions support.': 'The FIT/FIP mechanism stabilizes energy prices for up to 15 years, and the DSO fulfills the purchase obligation according to the support conditions.',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

nuke_v3('public/presentation_en.html')
nuke_v3('greenplant_en.jsx')
print("Nuke V3 completed.")
