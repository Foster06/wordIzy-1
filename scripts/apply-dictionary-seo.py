#!/usr/bin/env python3
"""Apply localized SEO blueprint to /dictionary across 7 languages."""
import re
ROOT = "/home/z/my-project/src"

# (meta_title_without_suffix, H1, intro_copy, short_description_<=150chars_escaped)
DATA = {
  "en": ("Scrabble Dictionary & Official Word Checker (NWL2023 & CSW21)",
         "Official Scrabble Dictionary & Word Validity Checker",
         "Check If Any Word Is Valid in Official Scrabble. Challenging a questionable play? Type any word into our Scrabble Dictionary above to verify whether it is legal in tournament and casual play. wordIzy cross-checks your query against both NWL2023 (North American Scrabble Word List used in the US and Canada) and CSW21 (Collins Scrabble Words used in the UK, Australia, and international tournaments), displaying exact tile values and valid front/back letter hooks.",
         "Scrabble dictionary & official word checker. Verify if a word is valid per NWL2023 & CSW21, with tile values, hooks, definition & synonyms."),
  "fr": ("Dictionnaire Scrabble & Vérificateur de Mots (ODS9 2024)",
         "Dictionnaire Scrabble Officiel & Vérificateur ODS9",
         "Vérifiez la Validité d'un Mot dans l'Officiel du Scrabble (ODS9). Un doute sur un mot posé par votre adversaire ? Saisissez n'importe quel mot dans notre Dictionnaire Scrabble pour vérifier instantanément s'il est accepté par l'Officiel du Scrabble (ODS9), la référence absolue de la Fédération Française de Scrabble (FFSc) et des tournois francophones. Découvrez également sa valeur exacte en points et ses prolongements possibles.",
         "Dictionnaire Scrabble & vérificateur de mots ODS9. Vérifiez si un mot est valide selon l'Officiel du Scrabble (FFSc), avec points et hooks."),
  "es": ("Diccionario Scrabble & Comprobador de Palabras (FISE)",
         "Diccionario Oficial de Scrabble y Verificador (FISE)",
         "Comprueba si una Palabra es Válida en el Diccionario FISE. ¿Quieres impugnar una jugada dudosa en tu partida? Escribe cualquier palabra en nuestro Diccionario de Scrabble para confirmar al instante si figura en el léxico oficial FISE (Federación Internacional de Scrabble en Español). Consulta su puntuación exacta y verifica plurales, conjugaciones verbales y palabras sin acentos gráficos.",
         "Diccionario Scrabble & comprobador de palabras FISE. Verifica si una palabra es válida, con puntuación, plurales y conjugaciones."),
  "de": ("Scrabble Wörterbuch & Wortprüfer — Gültige Wörter Checken",
         "Offizielles Scrabble Wörterbuch & Wortprüfer",
         "Prüfe Gültige Wörter im Deutschen Scrabble Wörterbuch. Bist du unsicher, ob ein gelegtes Wort deines Gegners erlaubt ist? Gib das Wort in unseren Scrabble Wortprüfer ein, um sofort zu checken, ob es nach offiziellen deutschen Turnierregeln gültig ist. Inklusive exakter Punkteberechnung für Umlaute (Ä, Ö, Ü) und seltene Buchstaben wie Q, X und Y.",
         "Scrabble Wörterbuch & Wortprüfer. Checke gültige Wörter nach Turnierregeln, mit Punkteberechnung für Umlaute und seltene Buchstaben."),
  "nl": ("Scrabble Woordenboek & Woord Controle (OpenTaal)",
         "Scrabble Woordenboek & Officiële OpenTaal Controle",
         "Controleer Geldige Scrabble Woorden (OpenTaal Woordenlijst). Twijfel je of een woord op het bord officieel is toegestaan? Typ het woord in ons Scrabble Woordenboek om direct te controleren of het voorkomt in de officiële OpenTaal woordenlijst. Ideaal om tijdens een potje Scrabble of Wordfeud snel discussies op te lossen en direct de exacte woordwaarde te zien.",
         "Scrabble woordenboek & woord controle (OpenTaal). Controleer of een woord geldig is, met exacte woordwaarde voor Scrabble en Wordfeud."),
  "it": ("Dizionario Scarabeo & Controllo Parole Valide (Zingarelli)",
         "Dizionario Scarabeo e Scrabble — Verifica Parole (Zingarelli)",
         "Verifica Parole Valide nel Dizionario Scarabeo (Zingarelli). Vuoi contestare una parola dubbia durante una sfida a Scarabeo o Scrabble? Digita qualsiasi termine nel nostro Dizionario Scarabeo per verificare subito se è ammesso dal vocabolario ufficiale Zingarelli, il punto di riferimento per i tornei italiani, visualizzando anche il punteggio base delle tessere.",
         "Dizionario Scarabeo & controllo parole valide (Zingarelli). Verifica se un termine è ammesso nei tornei italiani, con punteggio tessere."),
  "pt": ("Dicionário Scrabble & Verificador de Palavras Válidas",
         "Dicionário Scrabble Oficial & Verificador de Palavras",
         "Verifique se uma Palavra é Válida no Dicionário Scrabble. Em dúvida se a jogada do seu oponente realmente existe? Digite qualquer palavra no nosso Dicionário Scrabble para conferir na hora se ela é aceita no léxico oficial da língua portuguesa, além de visualizar a pontuação exata das peças e possíveis extensões.",
         "Dicionário Scrabble & verificador de palavras válidas. Confira se uma palavra é aceita no léxico oficial, com pontuação e extensões."),
}

def esc(s): return s.replace('\\', '\\\\').replace('"', '\\"')

# ── 1. meta-config.ts (EN only) ──
mc_path = f"{ROOT}/lib/meta-config.ts"
mc = open(mc_path).read()
title, h1, copy, desc = DATA["en"]
mc = re.sub(r'("dictionary": \{\n    title: )"[^"]*",', r'\1"' + esc(title) + '",', mc, count=1)
mc = re.sub(r'("dictionary": \{\n    title: "[^"]*",\n    description: )"[^"]*",', r'\1"' + esc(desc) + '",', mc, count=1)
open(mc_path, "w").write(mc)
print("meta-config.ts: EN dictionary title + description updated")

# ── 2. i18n-seo.ts (6 langs) ──
seo_path = f"{ROOT}/lib/i18n-seo.ts"
seo = open(seo_path).read()
warn = []
for lang in ["de","fr","es","it","pt","nl"]:
    title, h1, copy, desc = DATA[lang]
    t, d = esc(title), esc(desc)
    si = seo.find(f"  {lang}: {{")
    ei = seo.find("\n  },", si)
    block = seo[si:ei]
    pat = re.compile(r'(    dictionary: \{\n      title: )"[^"]*",(?:\n      description:\n        "[^"]*"|\n      description: "[^"]*"),\n    \},', re.DOTALL)
    new_block, n = pat.subn(f'\\1"{t}",\n      description:\n        "{d}",\n    }},', block, count=1)
    if n == 0: warn.append(f"i18n-seo {lang}")
    else: block = new_block
    seo = seo[:si] + block + seo[ei:]
open(seo_path, "w").write(seo)
print(f"i18n-seo.ts: 6 langs updated" + (" (warnings: " + ", ".join(warn) + ")" if warn else " — all matched"))

# ── 3. translations.ts (7 langs: H1 + subtitle) ──
tr_path = f"{ROOT}/components/i18n/translations.ts"
tr = open(tr_path).read()
warn2 = []
for lang in ["en","fr","es","de","nl","it","pt"]:
    title, h1, copy, desc = DATA[lang]
    t, s = esc(h1), esc(copy)
    si = tr.find(f"const {lang}: Translation = {{")
    ei = tr.find("\n};", si)
    block = tr[si:ei]
    pat = re.compile(r'( dictionary: \{)(\s+)title: "[^"]*",(\s*)subtitle: "[^"]*",', re.DOTALL)
    new_block, n = pat.subn('\\1\\2title: "' + t + '",\\3subtitle: "' + s + '",', block, count=1)
    if n == 0: warn2.append(f"translations {lang}")
    else: block = new_block
    tr = tr[:si] + block + tr[ei:]
open(tr_path, "w").write(tr)
print(f"translations.ts: 7 langs H1+subtitle updated" + (" (warnings: " + ", ".join(warn2) + ")" if warn2 else " — all matched"))

# ── Validate ──
issues = []
for lang, (title, h1, copy, desc) in DATA.items():
    tl = len(title) + len(" | wordIzy")
    dl = len(desc.replace("&", "&amp;").replace('"', "&quot;"))
    if tl > 60: issues.append(f"  title {lang}: {tl}")
    if dl > 150: issues.append(f"  desc {lang}: {dl}")
print(f"\nValidation: {len(issues)} issues" + ("\n" + "\n".join(issues) if issues else " — all within limits"))
