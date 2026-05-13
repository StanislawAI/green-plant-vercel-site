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

# Final Polish clean-up for greenplant_en.jsx
jsx_final_replacements = {
    'ul. Stanisława Wyspiańskiego 8': '8 Stanislaw Wyspianski St.',
}

# Final Polish clean-up for presentation_en.html
html_final_replacements = {
    'Od tego momentu projekt pracuje na miesięczny SPV Revenue.': 'From this moment, the project works on monthly SPV Revenue.',
    'Horyzont wsparcia: zwykle do 15 years (zależnie od systemu).': 'Support horizon: typically up to 15 years (depending on the system).',
    'Od lokalnej suwerenności do bezpiecznej przyszłości.': 'From local sovereignty to a secure future.',
    'Większa część wartości zostaje w regionie: u rolników, wykonawców i lokalnych usługodawców.': 'Most of the value stays in the region: with farmers, contractors, and local service providers.',
    'Mechanizm FIT/FIP stabilizuje cenę energii nawet do 15 years, a OSD realizuje obowiązek zakupu zgodnie z warunkami wsparcia.': 'The FIT/FIP mechanism stabilizes energy prices for up to 15 years, and the DSO fulfills the purchase obligation according to the support conditions.',
    'Programy KOWR i ARiMR wspierają inwestycje rolnicze w biogaz and infrastrukturę towarzyszącą.': 'KOWR and ARiMR programs support agricultural investments in biogas and accompanying infrastructure.',
    'Projekt jest prowadzony tak, by chronić bieżące dopłaty i jednocześnie otwierać dodatkowe źródła finansowania.': 'The project is managed to protect current subsidies and simultaneously open additional funding sources.',
    'Płatności bezpośrednie (WPR/CAP) — bez zmian': 'Direct payments (CAP) — no changes',
    'Skąd Płyną <span class="serif-italic text-gold-accent">Pieniądze.</span>': 'Where the <span class="serif-italic text-gold-accent">Money Flows From.</span>',
    'Instalacja pracuje równolegle do gospodarstwa i stabilizuje rytm pracy przez cały rok.': 'The installation operates parallel to the farm and stabilizes the work rhythm throughout the year.',
    'Grain Dryer na HEAT własne': 'Grain Dryer on own heat',
    'Trawy pokosne → substrat': 'Mowed grass → substrate',
    'Szczytowa produkcja prądu': 'Peak electricity production',
    'Kiszonka z kukurydzy → zbiornik': 'Corn silage → tank',
    'Wysłodki buraczane → fermentor': 'Beet pulp → fermenter',
    'Przygotowanie na zimę': 'Winter preparation',
    'Roczne rozliczenie FIT': 'Annual FIT settlement',
    'Brak decyzji także kosztuje. Poniżej porównanie ciężaru pozostania przy obecnym modelu vs. wejście w biogaz.': 'Lack of decision also costs. Below is a comparison of the burden of staying with the current model vs. entering biogas.',
    'Wymogi, kontrole i koszty wokół Waste będą rosnąć': 'Requirements, inspections, and costs around waste will increase.',
    'Produkcja prądu i ciepła na miejscu — rachunki mogą spaść znacząco': 'On-site power and heat production — bills can drop significantly.',
    'Największą przewagę budują gospodarstwa, które wchodzą wcześniej,': 'The greatest advantage is built by farms that enter earlier,',
    'Nie jesteś dzierżawcą ani klientem. Jesteś udziałowcem SPV, a wypracowana wartość zostaje w gospodarstwie.': 'You are not a lessee or a customer. You are an SPV shareholder, and the generated value stays on the farm.',
    'SPV produkuje prąd, HEAT i poferment. Projekt pracuje od rozruchu, a udziały pozostają po Twojej stronie.': 'SPV produces electricity, heat, and digestate. The project works from startup, and the shares remain on your side.',
    'Najczęstsze pytania, które słyszymy podczas wizyt w gospodarstwach i spotkaniach lokalnych.': 'The most common questions we hear during farm visits and local meetings.',
}

# Run final replacements
replace_in_file('greenplant_en.jsx', jsx_final_replacements)
replace_in_file('public/presentation_en.html', html_final_replacements)

print("Final translation fixes completed.")
