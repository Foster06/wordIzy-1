#!/usr/bin/env python3
"""Replace the faq.random blocks (en, fr, es, de, it, pt, nl) in translations.ts
with the new 3-item localized Random Generator FAQs. ja/zh blocks are untouched.
Verifies each block's language marker before replacing; aborts on any mismatch."""
import sys

PATH = "/home/z/my-project/src/components/i18n/translations.ts"

# (1-indexed start line, marker that must appear on the next line, new block)
BLOCKS = [
    (503, "What does the Random", "en"),
    (953, "Que fait le Générateur", "fr"),
    (1381, "¿Qué hace el Generador", "es"),
    (1809, "Was macht der Zufallswort", "de"),
    (2237, "Cosa fa il Generatore", "it"),
    (2665, "O que faz o Gerador", "pt"),
    (3093, "Wat doet de Willekeurig", "nl"),
]

NEW = {
"en": '''  random: [
   { q: "How does the Random Word Generator pick words?", a: "Our generator draws directly from official tournament and standard dictionaries—including NWL2023 and CSW21 for English—ensuring every generated word is a real, valid dictionary entry rather than gibberish or made-up slang." },
   { q: "Can I filter random words by length or specific letters?", a: "Yes. Use the length selector and Advanced Filters (Starts with, Ends with, Must include) to narrow down your results. For example, you can generate random 5-letter words starting with S for Wordle training or 8-letter words ending in ING for Charades." },
   { q: "How can I save generated words to study later?", a: "Click the star icon next to any generated word to add it to your personal Save Vault. Your saved list stays stored locally in your browser so you can review new vocabulary or copy the entire list into flashcards anytime." },
  ],''',
"fr": '''  random: [
   { q: "Quels dictionnaires sont utilisés par le générateur ?", a: "Pour le français, notre outil utilise le dictionnaire officiel ODS9, garantissant que chaque mot tiré au sort est parfaitement valide et orthographié selon les normes officielles." },
   { q: "Peut-on filtrer les mots par longueur ou par lettre ?", a: "Oui. Choisissez le nombre de lettres souhaité et utilisez les Filtres Avancés (Commence par, Finit par, Contient) pour obtenir exactement le type de mot adapté à votre jeu." },
   { q: "Comment conserver une liste de mots intéressants ?", a: "Cliquez sur l'étoile à côté d'un mot pour l'enregistrer dans votre Save Vault personnel. Vos mots restent sauvegardés localement dans votre navigateur sans création de compte." },
  ],''',
"es": '''  random: [
   { q: "¿De dónde salen las palabras generadas?", a: "Todas las palabras provienen de léxicos oficiales validados, incluyendo el diccionario FISE en español. Esto garantiza que cada resultado sea una palabra real y reconocida." },
   { q: "¿Puedo elegir la cantidad de letras o la letra inicial?", a: "Sí. Puedes seleccionar la longitud exacta de la palabra y activar los Filtros Avanzados (Empieza por, Termina en, Debe incluir) para adaptar los resultados a cualquier juego o ejercicio escolar." },
   { q: "¿Puedo guardar las palabras que me gusten?", a: "Haz clic en el icono de estrella junto a cualquier palabra para guardarla en tu Bóveda (Save Vault). La lista se conserva de forma privada en tu navegador para que puedas repasarla o copiarla cuando quieras." },
  ],''',
"de": '''  random: [
   { q: "Woher stammen die generierten Wörter?", a: "Unser Generator nutzt offizielle und geprüfte Wortlisten. So ist sichergestellt, dass ausschließlich echte, gültige Wörter und keine erfundenen Buchstabenkombinationen angezeigt werden." },
   { q: "Kann ich die Wortlänge und Anfangsbuchstaben festlegen?", a: "Ja. Über die Längeneinstellung und die Erweiterten Filter (Beginnt mit, Endet mit, Enthält) kannst du die Zufallsauswahl genau auf dein Spiel oder deine Unterrichtseinheit zuschneiden." },
   { q: "Wie kann ich interessante Wörter merken?", a: "Klicke einfach auf das Stern-Symbol neben einem Wort, um es in deinem lokalen Save Vault zu speichern. Deine Merkliste bleibt ohne Anmeldung direkt in deinem Browser gespeichert." },
  ],''',
"it": '''  random: [
   { q: "Quali dizionari utilizza il generatore?", a: "Per l'italiano, wordIzy si basa sul vocabolario ufficiale Zingarelli, assicurando che ogni parola estratta sia reale, corretta e riconosciuta." },
   { q: "Posso filtrare le parole per numero di lettere o iniziale?", a: "Sì. Puoi impostare la lunghezza desiderata e usare i Filtri Avanzati (Inizia con, Finisce con, Deve includere) per ottenere parole su misura per il tuo gioco." },
   { q: "Come posso salvare le parole per ripassarle?", a: "Clicca sull'icona della stella accanto a qualsiasi parola per salvarla nel tuo Save Vault personale. La lista rimane memorizzata localmente nel browser senza bisogno di registrazione." },
  ],''',
"pt": '''  random: [
   { q: "De onde vêm as palavras geradas?", a: "Nosso gerador consulta léxicos oficiais da língua portuguesa e de outros 8 idiomas, garantindo que todos os resultados sejam palavras reais e válidas." },
   { q: "Posso escolher o tamanho da palavra ou a letra inicial?", a: "Sim. Basta definir o número exato de letras e abrir os Filtros Avançados (Começa com, Termina com, Deve incluir) para personalizar o sorteio para qualquer brincadeira." },
   { q: "Como salvo palavras interessantes para estudar depois?", a: "Clique no ícone de estrela ao lado de qualquer palavra para adicioná-la ao seu Save Vault. Suas palavras ficam salvas diretamente no seu navegador, com total privacidade e sem cadastro." },
  ],''',
"nl": '''  random: [
   { q: "Welk woordenboek gebruikt de generator?", a: "Voor het Nederlands maakt wordIzy gebruik van de officiële OpenTaal woordenlijst. Hierdoor krijg je altijd correct gespelde, bestaande Nederlandse woorden." },
   { q: "Kan ik filteren op aantal letters of een specifieke beginletter?", a: "Ja. Stel eenvoudig het gewenste aantal letters in en gebruik de Geavanceerde Filters (Begint met, Eindigt op, Bevat) om precies het juiste type woord te genereren." },
   { q: "Hoe kan ik woorden bewaren om later te bekijken?", a: "Klik op het sterretje naast een woord om het op te slaan in je persoonlijke Save Vault. Je lijst wordt lokaal in je browser bewaard zonder dat je een account hoeft aan te maken." },
  ],''',
}

with open(PATH, encoding="utf-8") as f:
    lines = f.read().split("\n")

# Process in descending start-line order so earlier indices stay valid.
for start_1idx, marker, lang in sorted(BLOCKS, key=lambda b: -b[0]):
    start = start_1idx - 1  # 0-indexed
    if lines[start].strip() != "random: [":
        sys.exit(f"ABORT {lang}: line {start_1idx} is {lines[start]!r}, expected '  random: ['")
    if marker not in lines[start + 1]:
        sys.exit(f"ABORT {lang}: marker {marker!r} not found on line {start_1idx + 1}: {lines[start + 1][:80]!r}")
    # Find the closing "  ]," — the first line after start that equals it.
    end = None
    for i in range(start + 1, start + 20):
        if lines[i].strip() == "],":
            end = i
            break
    if end is None:
        sys.exit(f"ABORT {lang}: closing '],' not found within 20 lines of {start_1idx}")
    old_items = sum(1 for l in lines[start:end] if l.strip().startswith("{ q:"))
    lines[start:end + 1] = NEW[lang].split("\n")
    print(f"{lang}: replaced lines {start_1idx}-{end + 1} (old items: {old_items}, new items: 3)")

with open(PATH, "w", encoding="utf-8") as f:
    f.write("\n".join(lines))
print("Done.")
