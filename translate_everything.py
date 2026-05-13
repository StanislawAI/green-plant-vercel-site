import re
import os

def replace_in_file(file_path, replacements):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements.items():
        content = re.sub(re.escape(old), new, content)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Index.html replacements
index_replacements = {
    'Green Plant Technologies | Przygotowanie projektów biogazowni': 'Green Plant Technologies | Biogas Plant Project Preparation',
    'Projektujemy i budujemy przemysłowe i rolnicze instalacje biogazowe. Transformujemy biomasę w stabilne źródło energii.': 'We design and build industrial and agricultural biogas plants. We transform biomass into a stable energy source.',
    'Przygotowanie projektów biogazowni rolniczych i komunalnych. Projektowanie, budowa i wsparcie techniczne.': 'Preparation of agricultural and municipal biogas plant projects. Design, construction, and technical support.'
}

# Greenplant_en.jsx replacements
jsx_replacements = {
    'Hub Gdańsk': 'Gdansk Hub',
    'Hub Poznań': 'Poznan Hub',
    'Hub Kraków': 'Krakow Hub',
    'Małopolska': 'Lesser Poland',
    'Dolny Śląsk': 'Lower Silesia',
    'Górażdże': 'Gorazdze',
    'Złożono krojem': 'Typeset in',
    'oraz': 'and',
}

# Presentation_en.html replacements
html_replacements = {
    'navigation slajdów': 'slide navigation',
    'Dla instalacji mikro (< 0,5 MW) ścieżka administracyjna bywa prostsza niż dla dużych projektów.': 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.',
    'Green Plant prowadzi proces od lokalnych uzgodnień po wymagania środowiskowe.': 'Green Plant manages the process from local agreements to environmental requirements.',
    'Przyjęcie substratów stałych odbywa się w hali z': 'Solid substrates are received in a hall with',
    'wymuszonym podciśnieniem. Przy otwarciu bramy powietrze jest <strong>zasysane do': 'forced negative pressure. When the gate opens, air is <strong>sucked into',
    'środka</strong>, a nie wypychane na zewnątrz.': 'the interior</strong>, rather than being pushed out.',
    'Powietrze wylotowe przechodzi przez płuczki wodne i': 'Exhaust air passes through water scrubbers and',
    'złoża organiczne, gdzie naturalne mikroorganizmy neutralizują nawet do ~99% związków': 'organic beds, where natural microorganisms neutralize up to ~99% of compounds',
    'Dobrze zaprojektowana instalacja ogranicza uciążliwości dla otoczenia i zwiększa Safety': 'A well-designed installation reduces nuisance for the environment and increases the safety',
    'społeczne projektu.': 'of the project.',
    'Dobrze poprowadzony projekt daje gminie energię, HEAT i podatki': 'A well-managed project provides the municipality with energy, heat, and local taxes',
    'lokalne zamiast napięć społecznych.': 'instead of social tensions.',
    'Tanie HEAT dla obiektów użyteczności publicznej': 'Cheap heat for public utility buildings',
    'Nie budujemy obok społeczności. Budujemy wartość': 'We do not build beside the community. We build value',
    'razem z nią.': 'together with it.',
    'Green Plant wnosi kapitał i finansowanie projektu. Nie oczekujemy od': 'Green Plant provides capital and project financing. We do not expect from',
    'rolnika wkładu inwestycyjnego.': 'the farmer an investment contribution.',
    'Pełna Handling': 'Full Handling',
    'Pozwolenia, realizacja, przyłącze OSD, serwis, rozliczenia,': 'Permits, implementation, grid connection, service, billing,',
    'ubezpieczenie — jeden partner na całość.': 'insurance — one partner for the whole project.',
    'Wartości orientacyjne, oparte na': 'Approximate values, based on',
    'szacunkach branżowych.': 'industry estimates.',
    'Trudno rozkładalny węgiel (lignina) przetrwa proces. Przy': 'Difficult-to-decompose carbon (lignin) survives the process. During',
    'rozsiewaniu wspiera budowę materii organicznej i poprawę struktury gleby.': 'spreading, it supports organic matter building and soil structure improvement.',
    'Fermentacja zmienia formę składników odżywczych tak, by szybciej': 'Fermentation changes the form of nutrients so they work faster',
    'pracowały w polu i były prostsze w aplikacji.': 'in the field and are easier to apply.',
    'Krótka rozmowa i wstępny screening lokalizacji pod wsad,': 'Short conversation and initial site screening for feedstock,',
    'działkę i przyłącze.': 'plot, and connection.',
    'Prowadzimy decyzje środowiskowe, budowlane i przyłączeniowe.': 'We manage environmental, building, and connection decisions.',
    'Ty akceptujesz dokumenty i podpisujesz umowę SPV.': 'You accept the documents and sign the SPV agreement.',
    'Polska wieś przestaje być biorcą': 'The Polish countryside ceases to be a recipient',
    'energii, a staje się jej <strong>dostawcą</strong>. Biogas plant stabilizuje lokalny bilans': 'of energy and becomes its <strong>supplier</strong>. The biogas plant stabilizes the local balance',
    'prądu i ciepła.': 'of electricity and heat.',
    'Płatności bezpośrednie (WPR/CAP) — bez zmian': 'Direct payments (CAP) — no changes',
    'Klasyfikacja Landów — zmiana tylko 0,7 ha': 'Land classification — change of only 0.7 ha',
    'rolnika — niezagrożony': 'farmer — unthreatened',
    'zajmuje się wszystkimi wnioskami o dofinansowanie.': 'handles all applications for funding.',
    'wychwytujemy <strong>biogeniczne CO₂</strong>. To strumień, który': 'we capture <strong>biogenic CO₂</strong>. This is a stream that',
    'można dodatkowo monetyzować w wybranych zastosowaniach przemysłowych.': 'can be additionally monetized in selected industrial applications.',
    'oborę i home': 'barn and home',
    'pracuje razem z nim</span> i closes the farm\'s cycle.': 'works together with it</span> and closes the farm\'s cycle.',
    'homeykają przyłącza i zabezpieczają optymalne lokalizacje.': 'secure connections and protect optimal locations.',
    'homeknięcie finansowania': 'closing the financing',
    'Ten sam wsad może pracować w dwóch modelach:': 'The same feedstock can work in two models:',
    'sprzedaż surowca albo udział w marży energetycznej.': 'raw material sale or a share in the energy margin.',
    'Porównanie dla 9 000 ton rocznie.': 'Comparison for 9,000 tons annually.',
    'Przychód ze sprzedaży (180 zł/t)': 'Sales revenue (180 PLN/t)',
    'Koszt produkcji (140 zł/t)': 'Production cost (140 PLN/t)',
    'Oszczędność na nawozach (NPK)': 'Fertilizer savings (NPK)',
    'Realna korzyść roczna': 'Real annual benefit',
    'większy zysk z hektara niż przy sprzedaży.': 'higher profit per hectare than from sale.',
    'Dodatkowo: miks z własną gnojowicą może ograniczać koszt dokupowanego wsadu.': 'Additionally: mixing with your own slurry can reduce the cost of purchased feedstock.',
    'Dlaczego koszt uprawy spada o 30 zł/t?': 'Why does the cost of cultivation drop by 30 PLN/t?',
    'Digestate is a full-value organic fertilizer. Zastępując nim nawozy': 'Digestate is a full-value organic fertilizer. By replacing synthetic fertilizers with it,',
    'sztuczne, obniżasz bezpośrednie nakłady na hektar o ok. 1 300 - 1 500 PLN.': 'you reduce direct hectare outlays by approx. 1,300 - 1,500 PLN.',
    'Przychód SPV': 'SPV Revenue',
    'PLN / rok (sprzedaż energii, 4 100 MWh)': 'PLN / year (energy sales, 4,100 MWh)',
    'kosztów nawożenia': 'of fertilization costs',
    'Energia Własna': 'Own Energy',
    'prąd i ciepło': 'electricity and heat',
    'redukcja zapachów': 'odor reduction',
    'Zajętość Ziemi': 'Land Occupancy',
    'wysoka efektywność na małej powierzchni': 'high efficiency on a small area',
    'możliwość rozbudowy': 'expansion possibility',
    'Przy pełnym wykorzystaniu pofermentu i odpowiednim bilansie': 'With full use of digestate and appropriate balance',
    'składników dla gleby; poziom redukcji zapachów zależy od technologii i reżimu eksploatacji.': 'of nutrients for the soil; the level of odor reduction depends on the technology and operation regime.',
    'Green Plant pokrywa koszty napraw i serwisu zgodnie z umową': 'Green Plant covers the costs of repairs and service in accordance with the agreement',
    'operacyjną. Certyfikat ATEX, podwójna membrana, pochodnia awaryjna. Ubezpieczenie': 'operational. ATEX certificate, double membrane, emergency flare. Insurance',
    'System FIT/FIP (Ustawa OZE) zapewnia stałą cenę przez 15': 'The FIT/FIP system (RES Act) ensures a fixed price for 15',
    'lat. <strong class="text-emerald-600">Coroczna waloryzacja o inflację (CPI).</strong>': 'years. <strong class="text-emerald-600">Annual indexation by inflation (CPI).</strong>',
    'Twój majątek osobisty jest': 'Your personal assets are',
    'roczny może być niższy, ale instalacja utrzymuje ciągłość pracy.': 'annual may be lower, but the installation maintains continuity of work.',
    'Bilans Odpowiedzialności': 'Liability Balance',
    'Szybka ocena wsadu, działki i logistyki projektu.': 'Quick assessment of feedstock, plot, and project logistics.',
    'Wizyta inżynierska i mapa ryzyk: wsad, przyłącze, formalności.': 'Engineering visit and risk map: feedstock, connection, formalities.',
    'Podpisujesz LOI, a Green Plant uruchamia formalności i finansowanie.': 'You sign the LOI, and Green Plant initiates formalities and financing.',
}

# Run replacements
replace_in_file('index.html', index_replacements)
replace_in_file('greenplant_en.jsx', jsx_replacements)
replace_in_file('public/presentation_en.html', html_replacements)

print("Translation completed.")
