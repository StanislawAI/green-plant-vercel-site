import re
import os

def replace_in_file(file_path, replacements):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements.items():
        # Using a more robust replacement that handles potential variations
        content = content.replace(old, new)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Final comprehensive Polish clean-up for public/presentation_en.html
html_final_comprehensive = {
    'Dla instalacji mikro (< 0,5 MW) ścieżka administracyjna bywa prostsza niż dla dużych projektów.': 'For micro-installations (< 0.5 MW), the administrative path is often simpler than for large projects.',
    'Przyjęcie substratów stałych odbywa się w hali z wymuszonym podciśnieniem. Przy otwarciu bramy powietrze jest <strong>zasysane do środka</strong>, a nie wypychane na zewnątrz.': 'Solid substrates are received in a hall with forced negative pressure. When the gate opens, air is <strong>sucked inside</strong>, not pushed outside.',
    'Powietrze wylotowe przechodzi przez płuczki wodne i złoża organiczne, gdzie naturalne mikroorganizmy neutralizują nawet do ~99% związków': 'Exhaust air passes through water scrubbers and organic beds, where natural microorganisms neutralize up to ~99% of compounds',
    'Dobrze zaprojektowana instalacja ogranicza uciążliwości dla otoczenia i zwiększa Safety społeczne projektu.': 'A well-designed installation reduces nuisance for the environment and increases the social safety of the project.',
    'Dobrze poprowadzony projekt daje gminie energię, HEAT i podatki lokalne zamiast napięć społecznych.': 'A well-managed project provides the municipality with energy, heat, and local taxes instead of social tensions.',
    '• Tanie HEAT dla obiektów użyteczności publicznej': '• Cheap heat for public utility buildings',
    '"Nie budujemy obok społeczności. Budujemy wartość <strong>razem</strong> z nią."': '"We do not build beside the community. We build value <strong>together</strong> with it."',
    'Green Plant wnosi kapitał i finansowanie projektu. Nie oczekujemy od rolnika wkładu inwestycyjnego.': 'Green Plant provides capital and project financing. We do not expect an investment contribution from the farmer.',
    'Pełna Handling': 'Full Handling',
    'Pozwolenia, realizacja, przyłącze OSD, serwis, rozliczenia, ubezpieczenie — jeden partner na całość.': 'Permits, execution, DSO connection, service, billing, insurance — one partner for the whole project.',
    'Wartości orientacyjne, oparte na szacunkach branżowych.': 'Indicative values, based on industry estimates.',
    'Trudno rozkładalny węgiel (lignina) przetrwa proces. Przy rozsiewaniu wspiera budowę materii organicznej i poprawę struktury gleby.': 'Difficult-to-decompose carbon (lignin) survives the process. During spreading, it supports organic matter building and soil structure improvement.',
    'Fermentacja zmienia formę składników odżywczych tak, by szybciej pracowały w polu i były prostsze w aplikacji.': 'Fermentation changes the form of nutrients so they work faster in the field and are easier to apply.',
    'Krótka rozmowa i wstępny screening lokalizacji pod wsad, działkę i przyłącze.': 'Short conversation and initial site screening for feedstock, plot, and connection.',
    'Prowadzimy decyzje środowiskowe, budowlane i przyłączeniowe. Ty akceptujesz dokumenty i podpisujesz umowę SPV.': 'We manage environmental, building, and connection decisions. You accept the documents and sign the SPV agreement.',
    'Polska wieś przestaje być biorcą energii, a staje się jej <strong>dostawcą</strong>. Biogas plant stabilizuje lokalny bilans prądu i ciepła.': 'The Polish countryside ceases to be an energy recipient and becomes its <strong>supplier</strong>. The biogas plant stabilizes the local electricity and heat balance.',
    'Większa część wartości zostaje w regionie: u rolników, wykonawców i lokalnych usługodawców.': 'The bulk of value remains in the region: with farmers, contractors, and local service providers.',
    'Mechanizm FIT/FIP stabilizuje cenę energii nawet do 15 years, a OSD realizuje obowiązek zakupu zgodnie z warunkami wsparcia.': 'The FIT/FIP mechanism stabilizes energy prices for up to 15 years, and the DSO fulfills the purchase obligation according to the support conditions.',
    'Programy KOWR i ARiMR wspierają inwestycje rolnicze w biogaz and infrastrukturę towarzyszącą.': 'KOWR and ARiMR programs support agricultural investments in biogas and accompanying infrastructure.',
    'Projekt jest prowadzony tak, by chronić bieżące dopłaty i jednocześnie otwierać dodatkowe źródła finansowania.': 'The project is managed to protect current subsidies and simultaneously open additional funding sources.',
    'Płatności bezpośrednie (WPR/CAP) — bez zmian': 'Direct payments (CAP) — no changes',
    'Skąd Płyną <span class="serif-italic text-gold-accent">Pieniądze.</span>': 'Where the <span class="serif-italic text-gold-accent">Money Flows From.</span>',
    'Instalacja pracuje równolegle do gospodarstwa i stabilizuje rytm pracy przez cały rok.': 'The installation operates parallel to the farm and stabilizes the work rhythm throughout the year.',
    'Brak decision także costs. Poniżej comparison burden staying przy obecnym modelu vs. wejście w biogaz.': 'Lack of decision also costs. Below is a comparison of the burden of staying with the current model vs. entering biogas.',
    'Produkcja electricity i ciepła na place — bills can spaść znacząco': 'On-site electricity and heat production — bills can drop significantly.',
    'Reduced Social Tensions, większa przewidywalność projektu.': 'Reduced social tensions, greater project predictability.',
    'Nie jesteś lessee ani customer. Jesteś shareholder SPV, a wypracowana wartość zostaje w gospodarstwie.': 'You are not a lessee or a customer. You are an SPV shareholder, and the generated value stays on the farm.',
    'SPV produces prąd, HEAT i digestate. Projekt works od startup, a udziały pozostają po Twojej stronie.': 'SPV produces electricity, heat, and digestate. The project works from startup, and the shares remain on your side.',
    'Most common questions, które we hear podczas visits w farmch i spotkań lokalnych.': 'The most common questions we hear during farm visits and local meetings.',
    'Instalacja zajmuje ~0,7 ha (ok. 0,4% przy 180 ha). Reszta pól pracuje normalnie — a nawet lepiej dzięki pofermentowi.': 'The installation occupies ~0.7 ha (approx. 0.4% at 180 ha). The rest of the fields work normally — and even better thanks to the digestate.',
    'Tak. Umowa SPV przewiduje klauzule zbycia udziałów — możesz je sprzedać or przekazać dzieciom jako gotowy majątek.': 'Yes. The SPV agreement provides for share disposal clauses — you can sell them or pass them on to your children as ready assets.',
    'większy zysk</strong> z hektara niż przy sprzedaży.': 'higher profit</strong> per hectare than from sale.',
    'Dodatkowo: miks z własną gnojowicą może ograniczać koszt dokupowanego wsadu.': 'Additionally: mixing with your own slurry can reduce the cost of purchased feedstock.',
    'Bezpłatna visitsa na substratów i przyłącza.': 'Free visit for substrates and connection assessment.',
    'i instrumentów support (Partially parallel z Formalitiesami).': 'and support instruments (Partially parallel with formalities).',
    'To, co dziś bywa kosztem i uciążliwością, wraca na pole jako stabilny nawóz organiczny.': 'What today is a cost and a nuisance returns to the field as a stable organic fertilizer.',
    'redukuje patogeny i nasiona chwastów.': 'reduces pathogens and weed seeds.',
    'Poferment wraca na pole jako nawóz organiczny o niższej uciążliwości zapachowej i łatwiejszej aplikacji.': 'Digestate returns to the field as an organic fertilizer with lower odor nuisance and easier application.',
    'Instalacja works automatycznie, a monitoring i reakcję serwisową 24/7 prowadzi zespół Green Plant.': 'The installation works automatically, and 24/7 monitoring and service response is provided by the Green Plant team.',
    'Wizyta inżynierska i mapa ryzyk: wsad, przyłącze, Formalities.': 'Engineering visit and risk map: feedstock, connection, formalities.',
    'navigation slajdów': 'slide navigation',
    'Pieniądze.': 'Money.',
}

# Run final comprehensive replacements
replace_in_file('public/presentation_en.html', html_final_comprehensive)

print("Final comprehensive translation fixes completed.")
