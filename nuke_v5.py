import os
import re

def nuke_v5(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    replacements = {
        'Reference model farm mlecznego': 'Reference model dairy farm',
        'woj. podlaskie': 'Podlaskie Voivodeship',
        'kiszonka z corn': 'corn silage',
        'Koszt Wsadu (Corn)': 'Feedstock Cost (Corn)',
        'uprawa corn na substrat': 'corn cultivation for substrate',
        'even do 100%*': 'up to 100%*',
        'do ~99%': 'up to ~99%',
        'TAK': 'YES',
        'Ryzyka po side Green Plant.': 'Risks on the Green Plant side.',
        'Kluczowe ryzyka projektowe i operacyjne bierze na siebie Green Plant.': 'Key project and operational risks are assumed by Green Plant.',
        'Twoje aktywo postays po side farm, nie serwisu.': 'Your asset stays on the farm side, not the service side.',
        'Awaria Techniczna': 'Technical Breakdown',
        'w cenie.': 'included.',
        'Spadek Cen Energii': 'Energy Price Drop',
        'chroniony.': 'protected.',
        'Risk Suszy (Brak Wsadu)': 'Drought Risk (Lack of Feedstock)',
        'W razie nieurodzaju SPV dokupuje substrat z rynku. Profit annual may be lower, but the installation maintains operational continuity.': 'In case of crop failure, the SPV buys substrate from the market. Annual profit may be lower, but the installation maintains operational continuity.',
        'naprawy': 'repairs',
        'Zgodnie z aktualnym stanem prawnym i conditions system support.': 'According to the current legal status and support system conditions.',
        'Mapa <span class="serif-italic text-emerald-700">Twojego\n                    Sukcesu.</span>': 'Map of <span class="serif-italic text-emerald-700">Your\n                    Success.</span>',
        'Audyt & Vision': 'Audit & Vision',
        'visit for gospodarstwie, analiza\n                            substrates and connection.': 'farm visit, substrate and connection analysis.',
        'CZAS: 2 DNI': 'TIME: 2 DAYS',
        'Green Plant prowadzi proces\n                            environmental, zoning conditions, and connection agreements.': 'Green Plant manages the environmental process, zoning conditions, and connection agreements.',
        'Realizacja Inwestycji': 'Investment Implementation',
        'Realizacja pod klucz\n                            przez sprawdzone ekipy i supervision Green Plant.': 'Turnkey implementation by proven teams and Green Plant supervision.',
        'START ZYSKU': 'PROFIT START',
        'Wealth for <span\n                    class="serif-italic text-gold-accent">Pokolenia.</span>': 'Wealth for <span\n                    class="serif-italic text-gold-accent">Generations.</span>',
        'Lat Pracy Instalacji*': 'Installation Lifespan*',
        'Przy regularnym serwisie i modernizacjach. Okres support\n                regulatory is typically around 15 years.': 'With regular service and modernizations. The regulatory support period is typically around 15 years.',
        'Slurry <span class="serif-italic text-blue-600">Staje\n                    With Digestate.</span>': 'Slurry <span class="serif-italic text-blue-600">Becomes\n                    Digestate.</span>',
        'Wchodzi': 'In',
        'kitchen waste. What is today a cost\n                        zagospodarowania.': 'kitchen waste. What is today a management cost.',
        'Proces': 'Process',
        'Higienizacja (depending od feedstock)\n                        reduces pathogens and weed seeds.': 'Hygienization (depending on feedstock) reduces pathogens and weed seeds.',
        'Wychodzi': 'Out',
        'Instead of paying for slurry disposal — <span\n                        class="text-blue-300">zarabiasz na niej.</span>': 'Instead of paying for slurry disposal — <span\n                        class="text-blue-300">you earn from it.</span>',
        'Nie Musisz Tego <span\n                    class="serif-italic text-emerald-400">Supervise.</span>': 'You Don\'t Have To <span\n                    class="serif-italic text-emerald-400">Supervise It.</span>',
        'Temperatura': 'Temperature',
        'optymalna dla bakterii': 'optimal for bacteria',
        'metan w biogasie': 'methane in biogas',
        'Praca silnika': 'Engine operation',
        'reakcja po naszej side': 'reaction on our side',
        'Awaria?': 'Breakdown?',
        'intervention after\n                        naszej side.': 'intervention on our side.',
        'results\n                        finansowy.': 'financial results.',
        'Co Dalej?': 'What Next?',
        'Next <br /><span\n                    class="text-gold-accent serif-italic font-normal">Kyeari.</span>': 'Next <br /><span\n                    class="text-gold-accent serif-italic font-normal">Steps.</span>',
        'Rozmowa 30 Minut': '30 Minute Conversation',
        'Analiza Lokalizacji': 'Location Analysis',
        'Podpisujesz LOI, a Green Plant uruchamia formalities i finansowanie.': 'You sign the LOI, and Green Plant initiates formalities and financing.',
        'Sp. z o.o.': 'Ltd.',
        'Ltd. Ltd.': 'Ltd.',
    }

    for pl, en in replacements.items():
        content = content.replace(pl, en)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

nuke_v5('public/presentation_en.html')
nuke_v5('greenplant_en.jsx')
print("Nuke V5 completed.")
