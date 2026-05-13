import re
import os

def ultimate_scrub(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Full phrase replacements (most specific first)
    phrases = {
        'Dla instalacji mikro (< 0,5 MW) ścieżka administracyjna bywa prostsza niż dla dużych projektów.': 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.',
        'Rolnik dostarcza wsad. OPEX i utrzymanie instalacji realizes Green Plant w ramach modelu SPV.': 'The farmer provides the feedstock. Green Plant handles OPEX and installation maintenance within the SPV model.',
        'Precyzyjna kalibracja reaktora pod kątem charakterystyki fizykochemicznej wsadu.': 'Precise reactor calibration based on the physicochemical characteristics of the feedstock.',
        'Powstaje octan i wOdor, czyli paliwo dla metanogenezy.': 'Acetate and hydrogen are formed, which serves as fuel for methanogenesis.',
        'Powstaje biogas bogaty w CH₄.': 'Biogas rich in CH₄ is produced.',
        'Unikanie emisji (obornik i gnojowica)': 'Emission avoidance (manure and slurry)',
        'Wypieranie paliw kopalnych': 'Displacement of fossil fuels',
        'Poprawa bilansu glebowego': 'Soil balance improvement',
        'Wsad rolniczy': 'Agricultural feedstock',
        'Energia elektryczna': 'Electricity',
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
        'Koszty Operacyjne.': 'Operating Costs.',
        'Tarcza Regulacyjna': 'Regulatory Shield',
        'Ryzyko Regulacyjne': 'Regulatory Risk',
        'Jak Biologia Pracuje Na Wynik.': 'How Biology Works for the Result.',
        'RAZEM OPEX': 'TOTAL OPEX',
        'Kwota roczna': 'Annual amount',
        'Pozycja': 'Item',
        'Wartości orientacyjne, oparte na szacunkach branżowych.': 'Indicative values, based on industry estimates.',
        'Przyjęcie substratów stałych odbywa się w hali z wymuszonym podciśnieniem.': 'Solid substrates are received in a hall with forced negative pressure.',
        'Przy otwarciu bramy powietrze jest <strong>zasysane do środka</strong>, a nie wypychane na zewnątrz.': 'When the gate opens, air is <strong>sucked inside</strong>, not pushed outside.',
        'Powietrze wylotowe przechodzi przez płuczki wodne i złoża organiczne, gdzie naturalne mikroorganizmy neutralizują nawet do ~99% związków': 'Exhaust air passes through water scrubbers and organic beds, where natural microorganisms neutralize up to ~99% of compounds',
        'Dobrze zaprojektowana instalacja ogranicza uciążliwości dla otoczenia i zwiększa Safety społeczne projektu.': 'A well-designed installation reduces nuisance for the environment and increases the social safety of the project.',
        'Dobrze poprowadzony projekt daje gminie energię, HEAT i podatki lokalne zamiast napięć społecznych.': 'A well-managed project provides the municipality with energy, heat, and local taxes instead of social tensions.',
        'Skąd Płyną <span class="serif-italic text-gold-accent">Pieniądze.</span>': 'Where the <span class="serif-italic text-gold-accent">Money Flows From.</span>',
        'Instalacja pracuje równolegle do gospodarstwa i stabilizuje rytm pracy przez cały rok.': 'The installation operates parallel to the farm and stabilizes the work rhythm throughout the year.',
        'Brak decision także costs. Poniżej comparison burden staying przy obecnym modelu vs. wejście w biogaz.': 'Lack of decision also costs. Below is a comparison of the burden of staying with the current model vs. entering biogas.',
        'Nie jesteś lessee ani customer. Jesteś shareholder SPV, a wypracowana wartość zostaje w gospodarstwie.': 'You are not a lessee or a customer. You are an SPV shareholder, and the generated value stays on the farm.',
        'SPV produces prąd, HEAT i digestate. Projekt works from startup, a udziały pozostają po Twojej stronie.': 'SPV produces electricity, heat, and digestate. The project works from startup, and the shares remain on your side.',
        'Most common questions, które we hear podczas visits w farmch i spotkań lokalnych.': 'The most common questions we hear during farm visits and local meetings.',
        'Instalacja zajmuje ~0,7 ha (ok. 0,4% przy 180 ha). Reszta pól pracuje normalnie — a nawet lepiej dzięki pofermentowi.': 'The installation occupies ~0.7 ha (approx. 0.4% at 180 ha). The rest of the fields work normally — and even better thanks to the digestate.',
        'Tak. Umowa SPV przewiduje klauzule zbycia udziałów — możesz je sprzedać or przekazać dzieciom jako gotowy majątek.': 'Yes. The SPV agreement provides for share disposal clauses — you can sell them or pass them on to your children as ready assets.',
        'To, co dziś bywa kosztem i uciążliwością, wraca na pole jako stabilny nawóz organiczny.': 'What today is a cost and a nuisance returns to the field as a stable organic fertilizer.',
        'Poferment wraca na pole jako fertilizer organic o niższej uciążliwości zapachowej i łatwiejszej aplikacji.': 'Digestate returns to the field as an organic fertilizer with lower odor nuisance and easier application.',
        'Instalacja works automatycznie, a monitoring i reakcję serwisową 24/7 prowadzi zespół Green Plant.': 'The installation works automatically, and 24/7 monitoring and service response is provided by the Green Plant team.',
        'Wizyta inżynierska i mapa ryzyk: wsad, przyłącze, Formalities.': 'Engineering visit and risk map: feedstock, connection, formalities.',
    }

    for pl, en in phrases.items():
        content = content.replace(pl, en)

    # Word replacements (with boundaries where possible)
    words = {
        'Odpadki chleba': 'Bread waste',
        'Wywar gorzelniany': 'Distillery stillage',
        'Serwatka': 'Whey',
        'Wywar ziemniaczany': 'Potato stillage',
        'Hydroliza': 'Hydrolysis',
        'Acidogeneza': 'Acidogenesis',
        'Acetogeneza': 'Acetogenesis',
        'Metanogeneza': 'Methanogenesis',
        'Biuyearracji': 'Bureaucracy',
        'UPROSZCZONA': 'SIMPLIFIED',
        'SUSZARNIA': 'DRYER',
        'ODZYSK / ZERO': 'RECOVERY / ZERO',
        'POFERMENT': 'DIGESTATE',
        'Poferment': 'Digestate',
        'GNOJOWICA': 'SLURRY',
        'WSAD': 'FEEDSTOCK',
        'ENERGIA': 'ENERGY',
        'Materia w energię': 'Matter into energy',
        'Inżynieria zysku': 'Profit engineering',
        'Obieg zamknięty': 'Closed loop',
        'Zero odpadów': 'Zero waste',
        'Filozofia inżynierska': 'Engineering philosophy',
        'Filozofia Inżynierii': 'Engineering Philosophy',
        'energię.': 'energy.',
        'Podejście': 'Approach',
        'Wyceń projekt': 'Get a Quote',
        'Stabilność': 'Stability',
        'przemysłowa.': 'industrial.',
        'Zainicjuj Inwestycję': 'Initiate Investment',
        'Przepływ Gazu': 'Gas Flow',
        'Czystość Metanu': 'Methane Purity',
        'Obciążenie Sieci': 'Grid Load',
        'Interwał Serwisowy': 'Service Interval',
        'Oszczędności CO₂': 'CO₂ Savings',
        'Temp. Reaktora': 'Reactor Temp.',
        'Analiza Substratu': 'Substrate Analysis',
        'Inżynieria Procesu': 'Process Engineering',
        'Nadzór Inwestorski': 'Investment Supervision',
        'Protokół Realizacji': 'Implementation Protocol',
        'Sekwencja Wdrożeniowa.': 'Implementation Sequence.',
        'Gnojowica Bydlęca': 'Cattle Slurry',
        'Odpad Rolniczy': 'Agricultural Waste',
        'Obornik Świński': 'Pig Manure',
        'Wysłodki Buraczane': 'Beet Pulp',
        'Odpad Przemysłowy': 'Industrial Waste',
        'Odpady Poubojowe': 'Slaughterhouse Waste',
        'Macierz Substratów.': 'Substrate Matrix.',
        'Kategoria Materiału': 'Material Category',
    }

    for pl, en in words.items():
        content = content.replace(pl, en)

    # Specific fixes for corrupted words
    content = content.replace('wOdor', 'hydrogen')
    content = content.replace('uaccordingnia', 'agreements')
    content = content.replace('font-Standardl', 'font-normal')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

ultimate_scrub('public/presentation_en.html')
ultimate_scrub('greenplant_en.jsx')
print("Ultimate scrub completed.")
