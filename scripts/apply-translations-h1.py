#!/usr/bin/env python3
"""Fix translations.ts H1+subtitle update with correct indentation pattern."""
import re

ROOT = "/home/z/my-project/src"
DATA = {
  "scrabble": {
    "en": ("Duplicate Scrabble Solver & Tournament Rack Analyzer",
           "In Duplicate Scrabble, every player draws the exact same 7 tiles and competes to find the single highest-scoring move on a shared board. Enter your rack above to uncover the highest baseline play, spot +50 bingo opportunities, and bookmark missed tournament words into your local Save Vault for Anki flashcard drilling."),
    "fr": ("Solveur Scrabble Duplicate & Entraînement au Top (ODS9)",
           "Préparez vos parties en club ou tournois FFSc de Scrabble Duplicate. Saisissez les 7 lettres du tirage (avec ? pour le joker) pour identifier instantanément le Top selon l'Officiel du Scrabble (ODS9). Repérez les scrabbles à +50 points en tête de liste et sauvegardez les tops manqués dans votre Save Vault pour vos révisions."),
    "es": ("Analizador de Scrabble Duplicado y Jugada Top (FISE)",
           "En el Scrabble Duplicado todos los jugadores compiten con las mismas 7 fichas buscando la jugada máxima sobre un tablero común. Introduce tu atril para calcular al instante la palabra con mayor puntuación según el léxico oficial FISE y detectar bingos de +50 puntos."),
    "de": ("Duplicate Scrabble Löser & Top-Zug Analyse",
           "Beim Duplicate Scrabble spielen alle Teilnehmer mit denselben 7 Buchstaben um den punktbesten Zug auf einem gemeinsamen Brett. Gib deine Buchstaben ein, um sofort das Wort mit der höchsten Basispunktzahl inklusive +50 Bingo-Bonus zu ermitteln."),
    "nl": ("Duplicate Scrabble Oplosser (OpenTaal Woordenlijst)",
           "Bij Duplicate Scrabble krijgt iedere speler exact dezelfde 7 letters om de hoogst mogelijke score op hetzelfde bord te vinden. Voer je letters in om direct de hoogst scorende woorden en mogelijke bingo's uit de officiële OpenTaal woordenlijst te bekijken."),
    "it": ("Risolutore Scarabeo e Scrabble Duplicato (Zingarelli)",
           "Nelle sfide a Scarabeo o Scrabble Duplicato tutti i giocatori partono dalle stesse tessere per trovare la mossa dal punteggio più alto. Inserisci le tue lettere (fino a 8 tessere per il regolamento Scarabeo) per scoprire subito la giocata migliore dal vocabolario Zingarelli."),
    "pt": ("Analisador de Scrabble Duplicado e Pontuação Máxima",
           "No Scrabble Duplicado todos os participantes recebem as mesmas 7 pedras e disputam quem encontra a jogada de maior pontuação no tabuleiro. Digite suas letras para identificar na hora a palavra mais valiosa e salvar termos raros no seu Save Vault."),
  },
  "anagram": {
    "en": ("Anagram Solver & Cryptic Crossword Helper",
           "Cracking a cryptic crossword anagram clue, playing Bananagrams, or solving an escape room cipher? Enter your letters above to generate every valid single-word anagram grouped by length. Use ? or * for unknown letters to uncover hidden combinations fast."),
    "fr": ("Anagrammeur & Solveur de Mots Fléchés",
           "Bloqué sur une définition d'anagramme dans vos mots fléchés, un tirage de Des Chiffres et des Lettres ou une partie de Bananagrams ? Entrez vos lettres dans notre anagrammeur pour afficher toutes les combinaisons valides du dictionnaire ODS9."),
    "es": ("Anagramador y Generador de Palabras con Letras",
           "¿Buscas resolver un anagrama en un autodefinido, un crucigrama o una partida de Bananagrams? Escribe tus letras desordenadas para obtener al instante todos los anagramas válidos en español ordenados por longitud."),
    "de": ("Anagramm Löser für Kreuzworträtsel & Bananagrams",
           "Du suchst die Lösung für ein Schüttelrätsel, ein Kreuzworträtsel oder Bananagrams? Gib deine Buchstaben ein, um sofort alle gültigen deutschen Anagramme nach Wortlänge sortiert anzuzeigen."),
    "nl": ("Anagram Oplosser voor Cryptogrammen & Puzzels",
           "Vastgelopen bij een cryptogram, kruiswoordpuzzel of potje Bananagrams? Voer je letters in en onze Nederlandse anagram oplosser toont direct alle mogelijke woorden gesorteerd op lengte."),
    "it": ("Anagrammatore per Settimana Enigmistica e Cruciverba",
           "Stai risolvendo un gioco enigmistico della Settimana Enigmistica, un cruciverba o una sfida a Bananagrams? Inserisci le lettere nel nostro anagrammatore gratuito per trovare subito tutti gli anagrammi italiani validi dal vocabolario Zingarelli."),
    "pt": ("Resolvedor de Anagramas para Palavras Cruzadas",
           "Tentando decifrar um anagrama em palavras cruzadas, charadas ou Bananagrams? Digite suas letras para visualizar na hora todos os anagramas válidos em português organizados por tamanho."),
  },
  "scramble": {
    "en": ("Word Scramble Solver & Daily Jumble Helper",
           "Stuck on a newspaper Daily Jumble, a school vocabulary worksheet, or a tough Wordscapes level? Type your jumbled letters into the solver above to unscramble every possible word instantly."),
    "fr": ("Solveur de Mots Mélangés & Aide Jeux de Lettres",
           "Bloqué sur un niveau difficile de Wordscapes, une grille de mots mélangés ou un exercice de vocabulaire ? Tapez vos lettres en désordre ci-dessus pour retrouver immédiatement tous les mots cachés."),
    "es": ("Buscador para Ordenar Letras Desordenadas",
           "¿Te has quedado atascado en un nivel de Wordscapes, Palabras Conectadas o un pasatiempo de letras mezcladas? Escribe tus letras desordenadas arriba para ordenarlas al instante y descubrir todas las palabras ocultas."),
    "de": ("Buchstabensalat Löser & Wortguru Helfer",
           "Du hängst bei einem Rätsel-Buchstabensalat, einer Schulaufgabe oder einem schwierigen Level in Wortguru bzw. Wordscapes fest? Gib deine gemischten Buchstaben oben ein, um sofort alle versteckten deutschen Wörter zu finden."),
    "nl": ("Woordhussel Oplosser & Letterpuzzel Hulp",
           "Kom je niet uit een woordhussel in de krant, een schoolopdracht of een lastig level van Wordscapes? Typ je gehusselde letters hierboven in en ontwar direct alle mogelijke Nederlandse woorden."),
    "it": ("Risolutore di Parole Mescolate e Giochi di Lettere",
           "Sei bloccato su un livello difficile di Wordscapes, Parole Collegate o un gioco di lettere mescolate? Scrivi le tue lettere in disordine qui sopra per riordinarle all'istante."),
    "pt": ("Desembaralhar Palavras & Letras Misturadas",
           "Ficou travado em uma fase difícil de Wordscapes, Palavras Conectadas ou um passatempo de letras embaralhadas? Digite suas letras misturadas acima para desembaralhar todas as palavras possíveis em segundos."),
  },
}

def esc(s): return s.replace('\\', '\\\\').replace('"', '\\"')

tr_path = f"{ROOT}/components/i18n/translations.ts"
tr = open(tr_path).read()
LANGS = ["en", "fr", "es", "de", "nl", "it", "pt"]
warn = []
for lang in LANGS:
    lang_start = f"const {lang}: Translation = {{"
    si = tr.find(lang_start)
    if si < 0:
        warn.append(f"  MISSING lang const: {lang}"); continue
    ei = tr.find("\n};", si)
    if ei < 0:
        warn.append(f"  MISSING lang const end: {lang}"); continue
    block = tr[si:ei]
    for tool in ["scrabble", "anagram", "scramble"]:
        h1, copy = DATA[tool][lang]
        t, s = esc(h1), esc(copy)
        # Format varies: EN/FR multi-line (" {\n  title: ..."), others single-line (" { title: ...")
        # Use \s+ to match the whitespace (newline+indent OR space) between { and title.
        pat = re.compile(
            r'( ' + tool + r': \{)(\s+)title: "[^"]*",(\s*)subtitle: "[^"]*",',
            re.DOTALL
        )
        replacement = '\\1\\2title: "' + t + '",\\3subtitle: "' + s + '",'
        new_block, n = pat.subn(replacement, block, count=1)
        if n == 0:
            warn.append(f"  MISSING {lang}/{tool}")
        else:
            block = new_block
    tr = tr[:si] + block + tr[ei:]
open(tr_path, "w").write(tr)
print(f"translations.ts: updated H1+subtitle for 7 langs x 3 tools = 21 entries")
if warn:
    print("WARNINGS:"); [print(w) for w in warn]
else:
    print("All 21 entries matched and replaced.")
