#!/usr/bin/env python3
"""Corrected SEO blueprint applier — properly scopes replacements to each
language block in i18n-seo.ts and translations.ts."""
import re

ROOT = "/home/z/my-project/src"

# (meta_title, H1, intro_copy, short_description)
DATA = {
  "scrabble": {
    "en": ("Duplicate Scrabble Solver & Top-Play Analyzer (NWL23 & CSW21)",
           "Duplicate Scrabble Solver & Tournament Rack Analyzer",
           "In Duplicate Scrabble, every player draws the exact same 7 tiles and competes to find the single highest-scoring move on a shared board. Enter your rack above to uncover the highest baseline play, spot +50 bingo opportunities, and bookmark missed tournament words into your local Save Vault for Anki flashcard drilling.",
           "Duplicate Scrabble solver & top-play analyzer. Find the highest-scoring move from your 7-tile rack per NWL23 & CSW21, plus +50 bingo spots."),
    "fr": ("Solveur Scrabble Duplicate & Recherche du Top (ODS9)",
           "Solveur Scrabble Duplicate & Entraînement au Top (ODS9)",
           "Préparez vos parties en club ou tournois FFSc de Scrabble Duplicate. Saisissez les 7 lettres du tirage (avec ? pour le joker) pour identifier instantanément le Top selon l'Officiel du Scrabble (ODS9). Repérez les scrabbles à +50 points en tête de liste et sauvegardez les tops manqués dans votre Save Vault pour vos révisions.",
           "Solveur Scrabble Duplicate & recherche du Top selon ODS9. Entrez vos 7 lettres pour la jouée max et les scrabbles +50 points."),
    "es": ("Solucionador Scrabble Duplicado y Jugada Máxima (FISE)",
           "Analizador de Scrabble Duplicado y Jugada Top (FISE)",
           "En el Scrabble Duplicado todos los jugadores compiten con las mismas 7 fichas buscando la jugada máxima sobre un tablero común. Introduce tu atril para calcular al instante la palabra con mayor puntuación según el léxico oficial FISE y detectar bingos de +50 puntos.",
           "Solucionador Scrabble Duplicado y jugada máxima FISE. Introduce tu atril para la palabra de mayor puntuación y bingos +50."),
    "de": ("Duplicate Scrabble Löser & Turnier-Zugrechner",
           "Duplicate Scrabble Löser & Top-Zug Analyse",
           "Beim Duplicate Scrabble spielen alle Teilnehmer mit denselben 7 Buchstaben um den punktbesten Zug auf einem gemeinsamen Brett. Gib deine Buchstaben ein, um sofort das Wort mit der höchsten Basispunktzahl inklusive +50 Bingo-Bonus zu ermitteln.",
           "Duplicate Scrabble Löser & Turnier-Zugrechner. Gib deine 7 Buchstaben ein für den punktbesten Zug und +50 Bingo-Bonus."),
    "nl": ("Duplicate Scrabble Oplosser & Topscore Zoeker (OpenTaal)",
           "Duplicate Scrabble Oplosser (OpenTaal Woordenlijst)",
           "Bij Duplicate Scrabble krijgt iedere speler exact dezelfde 7 letters om de hoogst mogelijke score op hetzelfde bord te vinden. Voer je letters in om direct de hoogst scorende woorden en mogelijke bingo's uit de officiële OpenTaal woordenlijst te bekijken.",
           "Duplicate Scrabble oplosser & topscore zoeker met OpenTaal. Voer je 7 letters in voor hoogste score en bingo's."),
    "it": ("Risolutore Scarabeo Duplicato & Trova Giocata Top (Zingarelli)",
           "Risolutore Scarabeo e Scrabble Duplicato (Zingarelli)",
           "Nelle sfide a Scarabeo o Scrabble Duplicato tutti i giocatori partono dalle stesse tessere per trovare la mossa dal punteggio più alto. Inserisci le tue lettere (fino a 8 tessere per il regolamento Scarabeo) per scoprire subito la giocata migliore dal vocabolario Zingarelli.",
           "Risolutore Scarabeo Duplicato & giocata top con Zingarelli. Inserisci le lettere per la mossa di punteggio più alto."),
    "pt": ("Resolvedor de Scrabble Duplicado & Jogada Máxima",
           "Analisador de Scrabble Duplicado e Pontuação Máxima",
           "No Scrabble Duplicado todos os participantes recebem as mesmas 7 pedras e disputam quem encontra a jogada de maior pontuação no tabuleiro. Digite suas letras para identificar na hora a palavra mais valiosa e salvar termos raros no seu Save Vault.",
           "Resolvedor de Scrabble Duplicado & jogada máxima. Digite suas 7 letras para a palavra de maior pontuação."),
  },
  "anagram": {
    "en": ("Anagram Solver & Generator — Rearrange Letters & Wildcards",
           "Anagram Solver & Cryptic Crossword Helper",
           "Cracking a cryptic crossword anagram clue, playing Bananagrams, or solving an escape room cipher? Enter your letters above to generate every valid single-word anagram grouped by length. Use ? or * for unknown letters to uncover hidden combinations fast.",
           "Anagram solver & generator. Rearrange letters with wildcards for crosswords, Bananagrams & escape room ciphers, grouped by length."),
    "fr": ("Anagrammeur Gratuit & Solveur d'Anagrammes (ODS9)",
           "Anagrammeur & Solveur de Mots Fléchés",
           "Bloqué sur une définition d'anagramme dans vos mots fléchés, un tirage de Des Chiffres et des Lettres ou une partie de Bananagrams ? Entrez vos lettres dans notre anagrammeur pour afficher toutes les combinaisons valides du dictionnaire ODS9.",
           "Anagrammeur gratuit & solveur d'anagrammes ODS9. Pour mots fléchés, Des Chiffres et des Lettres et Bananagrams."),
    "es": ("Anagramador Gratis & Solucionador de Anagramas",
           "Anagramador y Generador de Palabras con Letras",
           "¿Buscas resolver un anagrama en un autodefinido, un crucigrama o una partida de Bananagrams? Escribe tus letras desordenadas para obtener al instante todos los anagramas válidos en español ordenados por longitud.",
           "Anagramador gratis & solucionador de anagramas. Para autodefinidos, crucigramas y Bananagrams, ordenados por longitud."),
    "de": ("Anagramm Löser & Generator Deutsch — Buchstaben Umstellen",
           "Anagramm Löser für Kreuzworträtsel & Bananagrams",
           "Du suchst die Lösung für ein Schüttelrätsel, ein Kreuzworträtsel oder Bananagrams? Gib deine Buchstaben ein, um sofort alle gültigen deutschen Anagramme nach Wortlänge sortiert anzuzeigen.",
           "Anagramm Löser & Generator Deutsch. Für Schüttelrätsel, Kreuzworträtsel und Bananagrams, sortiert nach Länge."),
    "nl": ("Anagram Oplosser & Generator — Cryptogram & Puzzel Hulp",
           "Anagram Oplosser voor Cryptogrammen & Puzzels",
           "Vastgelopen bij een cryptogram, kruiswoordpuzzel of potje Bananagrams? Voer je letters in en onze Nederlandse anagram oplosser toont direct alle mogelijke woorden gesorteerd op lengte.",
           "Anagram oplosser & generator voor cryptogrammen en puzzels. Voer letters in voor alle woorden op lengte."),
    "it": ("Anagrammatore Gratis & Risolutore Anagrammi (Zingarelli)",
           "Anagrammatore per Settimana Enigmistica e Cruciverba",
           "Stai risolvendo un gioco enigmistico della Settimana Enigmistica, un cruciverba o una sfida a Bananagrams? Inserisci le lettere nel nostro anagrammatore gratuito per trovare subito tutti gli anagrammi italiani validi dal vocabolario Zingarelli.",
           "Anagrammatore gratis & risolutore anagrammi Zingarelli. Per Settimana Enigmistica, cruciverba e Bananagrams."),
    "pt": ("Gerador e Resolvedor de Anagramas Grátis em Português",
           "Resolvedor de Anagramas para Palavras Cruzadas",
           "Tentando decifrar um anagrama em palavras cruzadas, charadas ou Bananagrams? Digite suas letras para visualizar na hora todos os anagramas válidos em português organizados por tamanho.",
           "Gerador e resolvedor de anagramas grátis em português. Para palavras cruzadas, charadas e Bananagrams."),
  },
  "scramble": {
    "en": ("Word Scramble Solver & Daily Jumble Helper — Unscramble Fast",
           "Word Scramble Solver & Daily Jumble Helper",
           "Stuck on a newspaper Daily Jumble, a school vocabulary worksheet, or a tough Wordscapes level? Type your jumbled letters into the solver above to unscramble every possible word instantly.",
           "Word scramble solver & daily jumble helper. Unscramble jumbled letters fast for Wordscapes, school worksheets & newspaper puzzles."),
    "fr": ("Solveur Mots Mélangés & Aide Wordscapes Français",
           "Solveur de Mots Mélangés & Aide Jeux de Lettres",
           "Bloqué sur un niveau difficile de Wordscapes, une grille de mots mélangés ou un exercice de vocabulaire ? Tapez vos lettres en désordre ci-dessus pour retrouver immédiatement tous les mots cachés.",
           "Solveur de mots mélangés & aide Wordscapes français. Tapez vos lettres pour retrouver tous les mots cachés."),
    "es": ("Ordenar Letras Desordenadas — Ayuda Wordscapes y Palabras",
           "Buscador para Ordenar Letras Desordenadas",
           "¿Te has quedado atascado en un nivel de Wordscapes, Palabras Conectadas o un pasatiempo de letras mezcladas? Escribe tus letras desordenadas arriba para ordenarlas al instante y descubrir todas las palabras ocultas.",
           "Ordenar letras desordenadas & ayuda Wordscapes. Para Palabras Conectadas y pasatiempos de letras mezcladas."),
    "de": ("Buchstabensalat Löser & Wortguru / Wordscapes Hilfe",
           "Buchstabensalat Löser & Wortguru Helfer",
           "Du hängst bei einem Rätsel-Buchstabensalat, einer Schulaufgabe oder einem schwierigen Level in Wortguru bzw. Wordscapes fest? Gib deine gemischten Buchstaben oben ein, um sofort alle versteckten deutschen Wörter zu finden.",
           "Buchstabensalat Löser & Wortguru/Wordscapes Hilfe. Gib gemischte Buchstaben ein für alle versteckten deutschen Wörter."),
    "nl": ("Woordhussel Oplosser & Wordscapes Hulp (Nederlands)",
           "Woordhussel Oplosser & Letterpuzzel Hulp",
           "Kom je niet uit een woordhussel in de krant, een schoolopdracht of een lastig level van Wordscapes? Typ je gehusselde letters hierboven in en ontwar direct alle mogelijke Nederlandse woorden.",
           "Woordhussel oplosser & Wordscapes hulp (Nederlands). Typ gehusselde letters voor krant, school en Wordscapes."),
    "it": ("Risolutore Parole Mescolate & Aiuto Wordscapes Italiano",
           "Risolutore di Parole Mescolate e Giochi di Lettere",
           "Sei bloccato su un livello difficile di Wordscapes, Parole Collegate o un gioco di lettere mescolate? Scrivi le tue lettere in disordine qui sopra per riordinarle all'istante.",
           "Risolutore parole mescolate & aiuto Wordscapes italiano. Per Parole Collegate e giochi di lettere."),
    "pt": ("Desembaralhar Palavras — Ajuda Wordscapes e Palavras Cruzadas",
           "Desembaralhar Palavras & Letras Misturadas",
           "Ficou travado em uma fase difícil de Wordscapes, Palavras Conectadas ou um passatempo de letras embaralhadas? Digite suas letras misturadas acima para desembaralhar todas as palavras possíveis em segundos.",
           "Desembaralhar palavras & ajuda Wordscapes. Para Palavras Conectadas e passatempos de letras embaralhadas."),
  },
}

def esc_quote(s):
    """Escape for TS double-quoted string."""
    return s.replace('\\', '\\\\').replace('"', '\\"')

# ── 1. i18n-seo.ts: scoped per-language-block replacement ──
seo_path = f"{ROOT}/lib/i18n-seo.ts"
seo = open(seo_path).read()
LANGS_SEO = ["de", "fr", "es", "it", "pt", "nl"]
warn = []
for lang in LANGS_SEO:
    # Find this language's block: "  {lang}: {" ... "\n  }," (2-space indent close)
    # Use the next language or closing as the boundary.
    lang_start = f"  {lang}: {{"
    si = seo.find(lang_start)
    if si < 0:
        warn.append(f"  MISSING lang block: {lang}")
        continue
    # Find the end of this lang block: next "\n  }," at 2-space indent after si
    ei = seo.find("\n  },", si)
    if ei < 0:
        warn.append(f"  MISSING lang block end: {lang}")
        continue
    block = seo[si:ei]
    for tool in ["scramble", "anagram", "scrabble"]:
        title, h1, copy, desc = DATA[tool][lang]
        t, d = esc_quote(title), esc_quote(desc)
        # Within the block, find the tool entry and replace title + description.
        # The tool entry: "    {tool}: {\n      title: "...",\n      description:\n        "...",\n    },"
        # OR "    {tool}: {\n      title: "...",\n      description: "...",\n    },"
        pat = re.compile(
            r'(    ' + tool + r': \{\n      title: )"[^"]*",(?:\n      description:\n        "[^"]*"|\n      description: "[^"]*"),\n    \},',
            re.DOTALL
        )
        replacement = f'\\1"{t}",\n      description:\n        "{d}",\n    }},'
        new_block, n = pat.subn(replacement, block, count=1)
        if n == 0:
            warn.append(f"  MISSING {lang}/{tool} entry")
        else:
            block = new_block
    seo = seo[:si] + block + seo[ei:]
open(seo_path, "w").write(seo)
print(f"i18n-seo.ts: updated 6 langs x 3 tools = 18 entries")
if warn:
    print("WARNINGS:")
    for w in warn: print(w)
else:
    print("No warnings — all 18 entries matched and replaced.")

# ── 2. translations.ts: scoped per-language-const replacement ──
tr_path = f"{ROOT}/components/i18n/translations.ts"
tr = open(tr_path).read()
LANGS_TR = ["en", "fr", "es", "de", "nl", "it", "pt"]
warn2 = []
for lang in LANGS_TR:
    # Each language is: "const {lang}: Translation = {" ... "};"
    lang_start = f"const {lang}: Translation = {{"
    si = tr.find(lang_start)
    if si < 0:
        warn2.append(f"  MISSING lang const: {lang}")
        continue
    # Find the end: next "};" after si (the closing of the const)
    ei = tr.find("\n};", si)
    if ei < 0:
        warn2.append(f"  MISSING lang const end: {lang}")
        continue
    block = tr[si:ei]
    for tool in ["scrabble", "anagram", "scramble"]:
        title, h1, copy, desc = DATA[tool][lang]
        t, s = esc_quote(h1), esc_quote(copy)
        # The tool block: "  {tool}: {\n   title: "...", subtitle: "...", ...\n  },"
        # Replace title and subtitle. The title is the first field; subtitle follows.
        # Pattern: "  {tool}: {\n   title: "[^"]*", subtitle: "[^"]*","
        pat = re.compile(
            r'(  ' + tool + r': \{\n   title: )"[^"]*",( subtitle: )"[^"]*",',
            re.DOTALL
        )
        replacement = f'\\1"{t}",\\2"{s}",'
        new_block, n = pat.subn(replacement, block, count=1)
        if n == 0:
            # Try alternate formatting (subtitle on next line, or different indent)
            pat2 = re.compile(
                r'(  ' + tool + r': \{\n  title: )"[^"]*",(  subtitle: )"[^"]*",',
                re.DOTALL
            )
            new_block, n = pat2.subn(replacement, block, count=1)
        if n == 0:
            warn2.append(f"  MISSING {lang}/{tool} tool block (title/subtitle)")
        else:
            block = new_block
    tr = tr[:si] + block + tr[ei:]
open(tr_path, "w").write(tr)
print(f"\ntranslations.ts: updated 7 langs x 3 tools = 21 H1+subtitle pairs")
if warn2:
    print("WARNINGS:")
    for w in warn2: print(w)
else:
    print("No warnings — all 21 entries matched and replaced.")
