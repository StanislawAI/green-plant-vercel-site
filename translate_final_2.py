import re
import os

files = ["greenplant_en.jsx", "public/presentation_en.html"]

replacements = {
    r'ROZPORZĄDZENIE UDT': 'UDT REGULATION',
    r'Sprzedaż peak shaving': 'Peak shaving sales',
    r'Europejska Directive regulująca urządzenia w strefach zagrożonych wybuchem\. Wszystkie elementy Reactora pracujące z metanem klasyfikowane są jako EX zone 1 lub 2\.': 'European Directive regulating equipment in potentially explosive atmospheres. All Reactor elements working with methane are classified as EX zone 1 or 2.',
    r'Produkty pośrednie fermentacji\. Ich nadmiar \(limit ok\. 3-4 g/L\) sygnalizuje zaburzenie procesu — tzw\. kwasicę Reactora\.': 'Intermediate fermentation products. Their excess (limit approx. 3-4 g/L) signals a process disturbance — so-called Reactor acidosis.',
    r'Polski system wsparcia obejmujący aukcje i taryfy wsparcia \(FIT\)\. Biogaz rolniczy ma własny koszyk — bez konkurencji z wiatrem i Solarm\.': 'Polish support system including auctions and support tariffs (FIT). Agricultural biogas has its own basket — without competition from wind and solar.',
    r'Pojemność Reactora I \+ II': 'Reactor Capacity I + II',
    r'21 t / dobę': '21 t / day',
    r'7–12 thousand t/year, zależnie od miksu\.': '7–12 thousand t/year, depending on the mix.',
    r'Przyłącze i': 'Grid connection and',
    r'Jeśli brakuje': 'If there is a shortage of',
    r'wsadu w danym roku, SPV może dokupić go z rynku \(mniejszy zysk, ciągłość pracy instalacji\)\.': 'feedstock in a given year, SPV can buy it from the market (smaller profit, continuous installation operation).',
    r'Materiał informacyjny\. Parametry i podział': 'Information material. Parameters and division',
    r'ekonomiczny zależą od lokalizacji, wsadu, warunków przyłączenia i ustaleń umowy SPV\. Dane liczbowe mają': 'economic depend on location, feedstock, connection conditions and SPV agreement findings. The figures have',
    r'charakter poglądowy i nie stanowią oferty handlowej \(art\. 66 KC\)\.': 'an illustrative character and do not constitute a commercial offer (art. 66 CC).',
    r'Od LOI do pierwszej sprzedaży energii: ok\. 14 miesięcy w jednym,': 'From LOI to first energy sale: approx. 14 months in one,',
    r'spójnym cyklu inwestycyjnym\.': 'coherent investment cycle.',
    r'Green Plant prowadzi Formalities: WZ, warunki przyłączenia i': 'Green Plant handles Formalities: WZ (zoning), connection conditions and',
    r'wymagane uzgodnienia\. Ty skupiasz się na gospodarstwie\.': 'required arrangements. You focus on the farm.',
    r'Rozruch i synchronizacja z siecią\. Pierwsze wpływy': 'Startup and synchronization with the grid. First inflows',
    r'trafiają na konto SPV\. <strong class="text-gold-accent">Projekt przechodzi w fazę': 'go to the SPV account. <strong class="text-gold-accent">Project enters the phase',
    r'SPV porządkuje odpowiedzialność i przepływy\. Land pozostaje po': 'SPV organizes responsibility and flows. Land remains on',
    r'Twojej stronie, a projekt działa w osobnym podmiocie\.': 'Your side, and the project operates in a separate entity.',
    r'Land \(0,7 ha\) wnoszony jako aport — nie sprzedaż,': 'Land (0.7 ha) contributed as an in-kind contribution — not a sale,',
    r'nie dzierżawa': 'not a lease',
    r'Instalacja może przejść na <span': 'Installation can pass to <span',
    r'class="text-gold-accent">Ciebie</span>, jeśli tak stanowi umowa\.': 'class="text-gold-accent">You</span>, if the contract so states.',
    r'dywidendę and Usable Heat': 'dividend and Usable Heat',
    r'"Twoja codzienna praca się nie zmienia\. <span': '"Your daily work does not change. <span',
    r'class="text-emerald-400">Struktura dochodu już tak\.</span>"': 'class="text-emerald-400">Income structure does.</span>"',
    r'PV jest dobrym uzupełnieniem, ale nie homeyka bilansu przez całą dobę\.': 'PV is a good supplement, but it does not close the balance around the clock.',
    r'Poniżej porównanie źródeł z perspektywy gospodarstwa\.': 'Below is a comparison of sources from the farm\'s perspective.',
    r'"PV jest świetnym uzupełnieniem\. Biogas daje <span': '"PV is a great supplement. Biogas gives <span',
    r'class="text-emerald-400">stabilną podstawę 24/7</span>\."': 'class="text-emerald-400">a stable base 24/7</span>."',
    r'Łukasiewicza': 'Lukasiewicz',
    r'COP i rozwój przemysłu gazowego pokazały, że energia buduje siłę gospodarki\. Dziś ta sama': 'COP and the development of the gas industry showed that energy builds the strength of the economy. Today the same',
    r'logika wraca na wieś w zdecentralizowanej formie\.': 'logic returns to the countryside in a decentralized form.',
    r'Wartości poglądowe dla instalacji ~500 kW\. OPEX jest': 'Illustrative values for a ~500 kW installation. OPEX is',
    r'rozliczany w SPV, a realne koszty zależą od technologii, wsadu i ustaleń serwisowych\.': 'settled in SPV, and real costs depend on technology, feedstock and service arrangements.',
    r'To etap, w którym wsad realnie zamienia się w': 'This is the stage where the feedstock actually turns into',
    r'strumień przychodów\.': 'a revenue stream.',
    r'Metan jest ~28x silniejszym gazem cieplarnianym niż CO₂\.': 'Methane is ~28x stronger greenhouse gas than CO₂.',
    r'Regulacje i koszty emisji będą się zaostrzać\. Przetwarzając go w energię, ograniczasz': 'Regulations and emission costs will tighten. By processing it into energy, you reduce',
    r'emisję i budujesz zysk\.': 'emission and build profit.',
    r'Dla instalacji mikro \(< 0,5 MW\) ścieżka administracyjna bywa prostsza niż dla dużych projektów\.': 'For micro installations (< 0.5 MW) the administrative path is sometimes simpler than for large projects.',
    r'W kogeneracji HEAT jest drugim strumieniem wartości obok energii': 'In cogeneration HEAT is the second value stream alongside energy',
    r'elektrycznej\. To realna oszczędność kosztów operacyjnych gospodarstwa\.': 'electricity. This is a real saving of the farm\'s operating costs.',
    r'Suszysz kukurydzę, zboże i siano bez dodatkowego paliwa\. Typowa': 'You dry corn, grain and hay without additional fuel. Typical',
    r'oszczędność sezonowa: ~40 000 PLN\.': 'seasonal saving: ~40 000 PLN.',
    r'Ciepła woda i stabilne warunki zimą wspierają dobrostan stada i': 'Warm water and stable conditions in winter support herd welfare and',
    r'ograniczają ryzyko kosztownych spadków wydajności\.': 'limit the risk of costly drops in productivity.',
    r'Gnojowica trafia rurami bezpośrednio do zamkniętych': 'Slurry goes through pipes directly to closed',
    r'zbiorników\. Brak otwartego składowania mocno ogranicza źródło zapachu\.': 'tanks. Lack of open storage strongly limits the odor source.',
}

for file in files:
    with open(file, "r", encoding="utf-8") as f:
        content = f.read()

    for k, v in replacements.items():
        content = re.sub(k, v, content, flags=re.IGNORECASE)

    # Some broad sweeping replacements for the remaining single words
    content = re.sub(r'zależnie od miksu', 'depending on the mix', content, flags=re.IGNORECASE)
    content = re.sub(r'Ciebie', 'You', content, flags=re.IGNORECASE)
    content = re.sub(r'TABELA SUBSTRATÓW', 'SUBSTRATE TABLE', content, flags=re.IGNORECASE)
    content = re.sub(r'PORÓWNANIE OZE', 'RES COMPARISON', content, flags=re.IGNORECASE)

    with open(file, "w", encoding="utf-8") as f:
        f.write(content)

print("Remaining final replacements complete.")
