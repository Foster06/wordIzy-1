#!/usr/bin/env python3
"""Apply the SEO localization blueprint to meta-config.ts, i18n-seo.ts, translations.ts.

Updates Duplicate Scrabble (/scrabble), Anagram (/anagram), Word Scramble (/scramble)
across 7 languages (en + fr/es/de/nl/it/pt) with native keywords, meta titles,
H1 headings, and culturally-tailored intro copy.
"""
import re, os

ROOT = "/home/z/my-project/src"

# ── Blueprint data ──
# Each entry: (meta_title_without_suffix, H1, intro_copy, short_description_<=150chars)
# The "| wordIzy" suffix is appended by the root layout template, so NOT included here.

DATA = {
  "scrabble": {
    "en": ("Duplicate Scrabble Solver & Top-Play Analyzer (NWL23 & CSW21)",
           "Duplicate Scrabble Solver & Tournament Rack Analyzer",
           "In Duplicate Scrabble, every player draws the exact same 7 tiles and competes to find the single highest-scoring move on a shared board. Enter your rack above to uncover the highest baseline play, spot +50 bingo opportunities, and bookmark missed tournament words into your local Save Vault for Anki flashcard drilling.",
           "Duplicate Scrabble solver & top-play analyzer. Enter your 7-tile rack to find the highest-scoring move per NWL23 & CSW21, with +50 bingo spots."),
    "fr": ("Solveur Scrabble Duplicate & Recherche du Top (ODS9)",
           "Solveur Scrabble Duplicate & Entraînement au Top (ODS9)",
           "Préparez vos parties en club ou tournois FFSc de Scrabble Duplicate. Saisissez les 7 lettres du tirage (avec ? pour le joker) pour identifier instantanément le Top selon l'Officiel du Scrabble (ODS9). Repérez les scrabbles à +50 points en tête de liste et sauvegardez les tops manqués dans votre Save Vault pour vos révisions.",
           "Solveur Scrabble Duplicate & recherche du Top selon ODS9. Entrez vos 7 lettres pour trouver la jouée maximale et les scrabbles à +50 points."),
    "es": ("Solucionador Scrabble Duplicado y Jugada Máxima (FISE)",
           "Analizador de Scrabble Duplicado y Jugada Top (FISE)",
           "En el Scrabble Duplicado todos los jugadores compiten con las mismas 7 fichas buscando la jugada máxima sobre un tablero común. Introduce tu atril para calcular al instante la palabra con mayor puntuación según el léxico oficial FISE y detectar bingos de +50 puntos.",
           "Solucionador de Scrabble Duplicado y jugada máxima según FISE. Introduce tu atril para calcular al instante la palabra con mayor puntuación."),
    "de": ("Duplicate Scrabble Löser & Turnier-Zugrechner",
           "Duplicate Scrabble Löser & Top-Zug Analyse",
           "Beim Duplicate Scrabble spielen alle Teilnehmer mit denselben 7 Buchstaben um den punktbesten Zug auf einem gemeinsamen Brett. Gib deine Buchstaben ein, um sofort das Wort mit der höchsten Basispunktzahl inklusive +50 Bingo-Bonus zu ermitteln.",
           "Duplicate Scrabble Löser & Turnier-Zugrechner. Gib deine 7 Buchstaben ein für den punktbesten Zug inklusive +50 Bingo-Bonus."),
    "nl": ("Duplicate Scrabble Oplosser & Topscore Zoeker (OpenTaal)",
           "Duplicate Scrabble Oplosser (OpenTaal Woordenlijst)",
           "Bij Duplicate Scrabble krijgt iedere speler exact dezelfde 7 letters om de hoogst mogelijke score op hetzelfde bord te vinden. Voer je letters in om direct de hoogst scorende woorden en mogelijke bingo's uit de officiële OpenTaal woordenlijst te bekijken.",
           "Duplicate Scrabble oplosser & topscore zoeker met OpenTaal. Voer je 7 letters in voor de hoogst scorende woorden en bingo's."),
    "it": ("Risolutore Scarabeo Duplicato & Trova Giocata Top (Zingarelli)",
           "Risolutore Scarabeo e Scrabble Duplicato (Zingarelli)",
           "Nelle sfide a Scarabeo o Scrabble Duplicato tutti i giocatori partono dalle stesse tessere per trovare la mossa dal punteggio più alto. Inserisci le tue lettere (fino a 8 tessere per il regolamento Scarabeo) per scoprire subito la giocata migliore dal vocabolario Zingarelli.",
           "Risolutore Scarabeo Duplicato & trova giocata top con Zingarelli. Inserisci le tue lettere per la mossa dal punteggio più alto."),
    "pt": ("Resolvedor de Scrabble Duplicado & Jogada Máxima",
           "Analisador de Scrabble Duplicado e Pontuação Máxima",
           "No Scrabble Duplicado todos os participantes recebem as mesmas 7 pedras e disputam quem encontra a jogada de maior pontuação no tabuleiro. Digite suas letras para identificar na hora a palavra mais valiosa e salvar termos raros no seu Save Vault.",
           "Resolvedor de Scrabble Duplicado & jogada máxima. Digite suas 7 letras para encontrar a palavra de maior pontuação no tabuleiro."),
  },
  "anagram": {
    "en": ("Anagram Solver & Generator — Rearrange Letters & Wildcards",
           "Anagram Solver & Cryptic Crossword Helper",
           "Cracking a cryptic crossword anagram clue, playing Bananagrams, or solving an escape room cipher? Enter your letters above to generate every valid single-word anagram grouped by length. Use ? or * for unknown letters to uncover hidden combinations fast.",
           "Anagram solver & generator. Rearrange letters with wildcards to find every valid anagram for crosswords, Bananagrams & escape room ciphers."),
    "fr": ("Anagrammeur Gratuit & Solveur d'Anagrammes (ODS9)",
           "Anagrammeur & Solveur de Mots Fléchés",
           "Bloqué sur une définition d'anagramme dans vos mots fléchés, un tirage de Des Chiffres et des Lettres ou une partie de Bananagrams ? Entrez vos lettres dans notre anagrammeur pour afficher toutes les combinaisons valides du dictionnaire ODS9.",
           "Anagrammeur gratuit & solveur d'anagrammes ODS9. Entrez vos lettres pour les mots fléchés, Des Chiffres et des Lettres et Bananagrams."),
    "es": ("Anagramador Gratis & Solucionador de Anagramas",
           "Anagramador y Generador de Palabras con Letras",
           "¿Buscas resolver un anagrama en un autodefinido, un crucigrama o una partida de Bananagrams? Escribe tus letras desordenadas para obtener al instante todos los anagramas válidos en español ordenados por longitud.",
           "Anagramador gratis & solucionador de anagramas. Escribe tus letras para autodefinidos, crucigramas y Bananagrams, ordenados por longitud."),
    "de": ("Anagramm Löser & Generator Deutsch — Buchstaben Umstellen",
           "Anagramm Löser für Kreuzworträtsel & Bananagrams",
           "Du suchst die Lösung für ein Schüttelrätsel, ein Kreuzworträtsel oder Bananagrams? Gib deine Buchstaben ein, um sofort alle gültigen deutschen Anagramme nach Wortlänge sortiert anzuzeigen.",
           "Anagramm Löser & Generator Deutsch. Buchstaben umstellen für Schüttelrätsel, Kreuzworträtsel und Bananagrams, sortiert nach Länge."),
    "nl": ("Anagram Oplosser & Generator — Cryptogram & Puzzel Hulp",
           "Anagram Oplosser voor Cryptogrammen & Puzzels",
           "Vastgelopen bij een cryptogram, kruiswoordpuzzel of potje Bananagrams? Voer je letters in en onze Nederlandse anagram oplosser toont direct alle mogelijke woorden gesorteerd op lengte.",
           "Anagram oplosser & generator voor cryptogrammen en puzzels. Voer je letters in voor alle mogelijke Nederlandse woorden op lengte."),
    "it": ("Anagrammatore Gratis & Risolutore Anagrammi (Zingarelli)",
           "Anagrammatore per Settimana Enigmistica e Cruciverba",
           "Stai risolvendo un gioco enigmistico della Settimana Enigmistica, un cruciverba o una sfida a Bananagrams? Inserisci le lettere nel nostro anagrammatore gratuito per trovare subito tutti gli anagrammi italiani validi dal vocabolario Zingarelli.",
           "Anagrammatore gratis & risolutore anagrammi Zingarelli. Per Settimana Enigmistica, cruciverba e Bananagrams, ordinati per lunghezza."),
    "pt": ("Gerador e Resolvedor de Anagramas Grátis em Português",
           "Resolvedor de Anagramas para Palavras Cruzadas",
           "Tentando decifrar um anagrama em palavras cruzadas, charadas ou Bananagrams? Digite suas letras para visualizar na hora todos os anagramas válidos em português organizados por tamanho.",
           "Gerador e resolvedor de anagramas grátis em português. Digite suas letras para palavras cruzadas, charadas e Bananagrams."),
  },
  "scramble": {
    "en": ("Word Scramble Solver & Daily Jumble Helper — Unscramble Fast",
           "Word Scramble Solver & Daily Jumble Helper",
           "Stuck on a newspaper Daily Jumble, a school vocabulary worksheet, or a tough Wordscapes level? Type your jumbled letters into the solver above to unscramble every possible word instantly.",
           "Word scramble solver & daily jumble helper. Unscramble jumbled letters fast for Wordscapes, school worksheets & newspaper puzzles."),
    "fr": ("Solveur Mots Mélangés & Aide Wordscapes Français",
           "Solveur de Mots Mélangés & Aide Jeux de Lettres",
           "Bloqué sur un niveau difficile de Wordscapes, une grille de mots mélangés ou un exercice de vocabulaire ? Tapez vos lettres en désordre ci-dessus pour retrouver immédiatement tous les mots cachés.",
           "Solveur de mots mélangés & aide Wordscapes français. Tapez vos lettres en désordre pour retrouver tous les mots cachés instantanément."),
    "es": ("Ordenar Letras Desordenadas — Ayuda Wordscapes y Palabras",
           "Buscador para Ordenar Letras Desordenadas",
           "¿Te has quedado atascado en un nivel de Wordscapes, Palabras Conectadas o un pasatiempo de letras mezcladas? Escribe tus letras desordenadas arriba para ordenarlas al instante y descubrir todas las palabras ocultas.",
           "Ordenar letras desordenadas & ayuda Wordscapes. Escribe tus letras mezcladas para Palabras Conectadas y pasatiempos de letras."),
    "de": ("Buchstabensalat Löser & Wortguru / Wordscapes Hilfe",
           "Buchstabensalat Löser & Wortguru Helfer",
           "Du hängst bei einem Rätsel-Buchstabensalat, einer Schulaufgabe oder einem schwierigen Level in Wortguru bzw. Wordscapes fest? Gib deine gemischten Buchstaben oben ein, um sofort alle versteckten deutschen Wörter zu finden.",
           "Buchstabensalat Löser & Wortguru/Wordscapes Hilfe. Gib gemischte Buchstaben ein für Schüttelrätsel und alle versteckten deutschen Wörter."),
    "nl": ("Woordhussel Oplosser & Wordscapes Hulp (Nederlands)",
           "Woordhussel Oplosser & Letterpuzzel Hulp",
           "Kom je niet uit een woordhussel in de krant, een schoolopdracht of een lastig level van Wordscapes? Typ je gehusselde letters hierboven in en ontwar direct alle mogelijke Nederlandse woorden.",
           "Woordhussel oplosser & Wordscapes hulp (Nederlands). Typ gehusselde letters voor krant, school en Wordscapes levels."),
    "it": ("Risolutore Parole Mescolate & Aiuto Wordscapes Italiano",
           "Risolutore di Parole Mescolate e Giochi di Lettere",
           "Sei bloccato su un livello difficile di Wordscapes, Parole Collegate o un gioco di lettere mescolate? Scrivi le tue lettere in disordine qui sopra per riordinarle all'istante.",
           "Risolutore parole mescolate & aiuto Wordscapes italiano. Scrivi lettere in disordine per Parole Collegate e giochi di lettere."),
    "pt": ("Desembaralhar Palavras — Ajuda Wordscapes e Palavras Cruzadas",
           "Desembaralhar Palavras & Letras Misturadas",
           "Ficou travado em uma fase difícil de Wordscapes, Palavras Conectadas ou um passatempo de letras embaralhadas? Digite suas letras misturadas acima para desembaralhar todas as palavras possíveis em segundos.",
           "Desembaralhar palavras & ajuda Wordscapes. Digite letras misturadas para Palavras Conectadas e passatempos de letras embaralhadas."),
  },
}

def esc_len(s):
    """Length after HTML escaping (& -> &amp; etc.)."""
    return len(s.replace("&", "&amp;").replace('"', "&quot;"))

def validate(tool, lang, title, desc):
    """Check title <=60 and desc <=150 (escaped). Report issues."""
    tl = len(title) + len(" | wordIzy")  # template appends suffix
    dl = esc_len(desc)
    issues = []
    if tl > 60: issues.append(f"  TITLE {tool}/{lang}: {tl} chars (>{60}): {title!r}")
    if dl > 150: issues.append(f"  DESC  {tool}/{lang}: {dl} chars (>{150}): {desc!r}")
    return issues

# ── Validate all entries first ──
all_issues = []
for tool, langs in DATA.items():
    for lang, (title, h1, copy, desc) in langs.items():
        all_issues.extend(validate(tool, lang, title, desc))
if all_issues:
    print("VALIDATION ISSUES (will still apply, but these need trimming):")
    for i in all_issues: print(i)
    print()
else:
    print("All 21 entries pass length validation (title <=60, desc <=150 escaped).")
print()

# ── 1. Update meta-config.ts (EN only) ──
mc_path = f"{ROOT}/lib/meta-config.ts"
mc = open(mc_path).read()
for tool in ["scramble", "anagram", "scrabble"]:
    title, h1, copy, desc = DATA[tool]["en"]
    # Replace the title line within the tool's entry
    # Pattern: "tool": {\n    title: "...",\n    description: "...",
    old_title_re = re.compile(r'("' + tool + r'": \{\n    title: )"[^"]*",')
    mc = old_title_re.sub(r'\1"' + title.replace('\\', '\\\\').replace('"', '\\"') + '",', mc, count=1)
    old_desc_re = re.compile(r'("' + tool + r'": \{\n    title: "[^"]*",\n    description: )"[^"]*",')
    mc = old_desc_re.sub(r'\1"' + desc.replace('\\', '\\\\').replace('"', '\\"') + '",', mc, count=1)
open(mc_path, "w").write(mc)
print(f"Updated meta-config.ts (EN titles + descriptions for scramble, anagram, scrabble)")

# ── 2. Update i18n-seo.ts (6 non-EN languages) ──
seo_path = f"{ROOT}/lib/i18n-seo.ts"
seo = open(seo_path).read()
LANGS_SEO = ["de", "fr", "es", "it", "pt", "nl"]
for lang in LANGS_SEO:
    for tool in ["scramble", "anagram", "scrabble"]:
        title, h1, copy, desc = DATA[tool][lang]
        # Within the lang block, find the tool entry and replace title + description.
        # Pattern: {4spaces}{tool}: {{\n{6spaces}title: "...",\n{6spaces}description:\n{8spaces}"...",\n    }}
        # The description may be on the next line (wrapped). Handle both.
        pat = re.compile(
            r'(    ' + tool + r': \{\n      title: )"[^"]*",(?:\n      description:\n        "[^"]*"|\n      description: "[^"]*"),\n    \},',
            re.DOTALL
        )
        # Build replacement
        t = title.replace('\\', '\\\\').replace('"', '\\"')
        d = desc.replace('\\', '\\\\').replace('"', '\\"')
        # Use the multi-line description format (matching the existing style)
        replacement = f'\\1"{t}",\n      description:\n        "{d}",\n    }},'
        new_seo, n = pat.subn(replacement, seo, count=1)
        if n == 0:
            print(f"  WARNING: could not find {lang}/{tool} block in i18n-seo.ts")
        else:
            seo = new_seo
open(seo_path, "w").write(seo)
print(f"Updated i18n-seo.ts (localized titles + descriptions for 6 langs x 3 tools = 18 entries)")

# ── 3. Update translations.ts (7 langs: H1=title, subtitle=intro copy) ──
tr_path = f"{ROOT}/components/i18n/translations.ts"
tr = open(tr_path).read()
LANGS_TR = ["en", "fr", "es", "de", "nl", "it", "pt"]
# The translations.ts has per-language blocks. Each tool block looks like:
#   scrabble: {
#    title: "...", subtitle: "...", ...
#   },
# We need to replace title + subtitle within each tool block per language.
# Strategy: for each tool, find ALL occurrences of the tool block and replace
# the title + subtitle. But we need to target the right language block.
# Simpler: replace the title and subtitle strings globally per tool, since the
# CURRENT title/subtitle values are unique enough per language.
for lang in LANGS_TR:
    for tool in ["scrabble", "anagram", "scramble"]:
        title, h1, copy, desc = DATA[tool][lang]
        # The H1 is the `title` field, the copy is the `subtitle` field.
        # We can't easily target by language, so we replace the OLD value.
        # The old title for each tool/lang is the current translations.ts value.
        # Since we don't know the exact old values, use a regex that finds the
        # tool block and replaces title + subtitle in place.
        # This is risky — let's skip translations.ts for now and do it manually.
        pass

# For translations.ts, we'll do targeted replacements using the KNOWN current values.
# The EN values are known from the read. Let me handle EN first, then the others
# by reading the current values.
print("translations.ts: will be updated via targeted edits (current values need reading)")
print()
print("Done with meta-config.ts + i18n-seo.ts. Run the script, then verify.")
