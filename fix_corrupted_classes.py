import re
import os

def fix_file(file_path):
    if not os.path.exists(file_path):
        return
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix corrupted classes
    content = content.replace('font-Standardl', 'font-normal')
    content = content.replace('font-Standard', 'font-normal')
    
    # Fix remaining Polish in visible text
    # Act VII - TEAM & STANDARDS section
    content = content.replace('ruchu.', 'movement.')
    content = content.replace('operacyjna.', 'operational.')
    content = content.replace('Anatomia', 'Anatomy')
    content = content.replace('Cztery', 'Four')
    content = content.replace('fazy', 'phases')
    content = content.replace('Market regionalny.', 'Regional market.')
    content = content.replace('Niewidzialni pracownicy.', 'Invisible workers.')
    content = content.replace('Polecane lektury.', 'Recommended reading.')
    content = content.replace('Od podpisu do pierwszego m³ biogazu.', 'From signature to the first m³ of biogas.')
    content = content.replace('Polski biogaz od 2005.', 'Polish biogas since 2005.')
    content = content.replace('Z lotu ptaka.', 'A bird\'s eye view.')
    content = content.replace('Osiem norm, jedna Quality.', 'Eight standards, one quality.')
    content = content.replace('Inicjacja procesu.', 'Process initiation.')
    
    # Hero section and others
    content = content.replace('font-Standardl', 'font-normal')
    content = content.replace('// top Homee', '// top dome')
    
    # Fix the weird "Standard" replacements in other places
    content = content.replace('font-Standard', 'font-normal')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('greenplant_en.jsx')
print("Corrupted classes and remaining Polish fixed.")
