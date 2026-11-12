#!/usr/bin/env python3
"""Insert Word-Lab language-consideration keys into translations.ts.

Adds, for each of the 9 languages (en fr es de it pt nl ja zh):
  - wordListPage: localized H1/description/back templates for the ~118
    programmatic word-list pages (English-canonical URLs; SSR stays English,
    the user's chosen language switches the page shell client-side).
  - hubPages: aria-label templates for the 5 hub pages' letter/length grids.
  - ui: share / save-vault / pagination labels used by the WordList grid.

Anchor lines (verified): wordListPage ends with `error:`, hubPages ends with
`browseBtn:`, ui ends with `copiedToClipboard:` in every language object.
Run once; idempotence is not needed (script aborts if keys already present).
"""
import re
import sys

PATH = "/home/z/my-project/src/components/i18n/translations.ts"

# ── Per-language content ────────────────────────────────────────────────────
# wordListPage additions (templates: {letter} {n} {family})
WLP = {
    "en": {
        "titleStarts": 'Words Starting With "{letter}"',
        "titleEnds": 'Words Ending With "{letter}"',
        "titleWordleStarts": 'Wordle Words Starting With "{letter}"',
        "titleWordleEnds": 'Wordle Words Ending With "{letter}"',
        "titleLength": "{n}-Letter Words",
        "descStarts": 'Explore verified Scrabble words that start with the letter "{letter}". Filter by length and score.',
        "descEnds": 'Discover verified Scrabble words that end with the letter "{letter}". Filter by length and find hooks.',
        "descLength": "Browse all {n}-letter words for Scrabble, Wordle, and anagram puzzles. Filtered by official Scrabble dictionaries, sorted by score.",
        "backToFamily": "Back to {family}",
        "sortLabel": "Sort",
        "sortScore": "Score",
        "filterByLetter": "Filter by starting letter",
    },
    "fr": {
        "titleStarts": "Mots commençant par « {letter} »",
        "titleEnds": "Mots finissant par « {letter} »",
        "titleWordleStarts": "Mots Wordle commençant par « {letter} »",
        "titleWordleEnds": "Mots Wordle finissant par « {letter} »",
        "titleLength": "Mots de {n} lettres",
        "descStarts": "Explorez les mots valides au Scrabble qui commencent par la lettre « {letter} ». Filtrez par longueur et score.",
        "descEnds": "Découvrez les mots valides au Scrabble qui finissent par la lettre « {letter} ». Filtrez par longueur et trouvez des rallonges.",
        "descLength": "Parcourez tous les mots de {n} lettres pour le Scrabble, le Wordle et les anagrammes. Filtrés par les dictionnaires Scrabble officiels, classés par score.",
        "backToFamily": "Retour à {family}",
        "sortLabel": "Trier",
        "sortScore": "Score",
        "filterByLetter": "Filtrer par lettre initiale",
    },
    "es": {
        "titleStarts": 'Palabras que empiezan por "{letter}"',
        "titleEnds": 'Palabras que terminan en "{letter}"',
        "titleWordleStarts": 'Palabras de Wordle que empiezan por "{letter}"',
        "titleWordleEnds": 'Palabras de Wordle que terminan en "{letter}"',
        "titleLength": "Palabras de {n} letras",
        "descStarts": 'Explora palabras verificadas de Scrabble que empiezan por la letra "{letter}". Filtra por longitud y puntuación.',
        "descEnds": 'Descubre palabras verificadas de Scrabble que terminan en la letra "{letter}". Filtra por longitud y encuentra ganchos.',
        "descLength": "Explora todas las palabras de {n} letras para Scrabble, Wordle y anagramas. Filtradas por diccionarios oficiales de Scrabble, ordenadas por puntuación.",
        "backToFamily": "Volver a {family}",
        "sortLabel": "Ordenar",
        "sortScore": "Puntos",
        "filterByLetter": "Filtrar por letra inicial",
    },
    "de": {
        "titleStarts": "Wörter, die mit „{letter}“ beginnen",
        "titleEnds": "Wörter, die auf „{letter}“ enden",
        "titleWordleStarts": "Wordle-Wörter, die mit „{letter}“ beginnen",
        "titleWordleEnds": "Wordle-Wörter, die auf „{letter}“ enden",
        "titleLength": "Wörter mit {n} Buchstaben",
        "descStarts": "Entdecke geprüfte Scrabble-Wörter, die mit dem Buchstaben „{letter}“ beginnen. Nach Länge und Punkten filtern.",
        "descEnds": "Entdecke geprüfte Scrabble-Wörter, die auf den Buchstaben „{letter}“ enden. Nach Länge filtern und Anfänge finden.",
        "descLength": "Alle {n}-Buchstaben-Wörter für Scrabble, Wordle und Anagramme. Gefiltert nach offiziellen Scrabble-Wörterbüchern, nach Punkten sortiert.",
        "backToFamily": "Zurück zu {family}",
        "sortLabel": "Sortieren",
        "sortScore": "Punkte",
        "filterByLetter": "Nach Anfangsbuchstabe filtern",
    },
    "it": {
        "titleStarts": 'Parole che iniziano con "{letter}"',
        "titleEnds": 'Parole che finiscono con "{letter}"',
        "titleWordleStarts": 'Parole di Wordle che iniziano con "{letter}"',
        "titleWordleEnds": 'Parole di Wordle che finiscono con "{letter}"',
        "titleLength": "Parole di {n} lettere",
        "descStarts": 'Esplora parole di Scrabble verificate che iniziano con la lettera "{letter}". Filtra per lunghezza e punteggio.',
        "descEnds": 'Scopri parole di Scrabble verificate che finiscono con la lettera "{letter}". Filtra per lunghezza e trova agganci.',
        "descLength": "Sfoglia tutte le parole di {n} lettere per Scrabble, Wordle e anagrammi. Filtrate dai dizionari ufficiali di Scrabble, ordinate per punteggio.",
        "backToFamily": "Torna a {family}",
        "sortLabel": "Ordina",
        "sortScore": "Punti",
        "filterByLetter": "Filtra per lettera iniziale",
    },
    "pt": {
        "titleStarts": 'Palavras que começam por "{letter}"',
        "titleEnds": 'Palavras que terminam em "{letter}"',
        "titleWordleStarts": 'Palavras de Wordle que começam por "{letter}"',
        "titleWordleEnds": 'Palavras de Wordle que terminam em "{letter}"',
        "titleLength": "Palavras de {n} letras",
        "descStarts": 'Explore palavras verificadas de Scrabble que começam pela letra "{letter}". Filtre por tamanho e pontuação.',
        "descEnds": 'Descubra palavras verificadas de Scrabble que terminam pela letra "{letter}". Filtre por tamanho e encontre ganchos.',
        "descLength": "Veja todas as palavras de {n} letras para Scrabble, Wordle e anagramas. Filtradas por dicionários oficiais de Scrabble, ordenadas por pontuação.",
        "backToFamily": "Voltar para {family}",
        "sortLabel": "Ordenar",
        "sortScore": "Pontos",
        "filterByLetter": "Filtrar por letra inicial",
    },
    "nl": {
        "titleStarts": 'Woorden die beginnen met "{letter}"',
        "titleEnds": 'Woorden die eindigen op "{letter}"',
        "titleWordleStarts": 'Wordle-woorden die beginnen met "{letter}"',
        "titleWordleEnds": 'Wordle-woorden die eindigen op "{letter}"',
        "titleLength": "Woorden van {n} letters",
        "descStarts": 'Ontdek gecontroleerde Scrabble-woorden die met de letter "{letter}" beginnen. Filter op lengte en punten.',
        "descEnds": 'Ontdek gecontroleerde Scrabble-woorden die op de letter "{letter}" eindigen. Filter op lengte en vind hooks.',
        "descLength": "Bekijk alle woorden van {n} letters voor Scrabble, Wordle en anagrammen. Gefilterd op officiële Scrabble-woordenboeken, gesorteerd op punten.",
        "backToFamily": "Terug naar {family}",
        "sortLabel": "Sorteren",
        "sortScore": "Punten",
        "filterByLetter": "Filteren op beginletter",
    },
    "ja": {
        "titleStarts": "「{letter}」で始まる単語",
        "titleEnds": "「{letter}」で終わる単語",
        "titleWordleStarts": "「{letter}」で始まる Wordle 単語",
        "titleWordleEnds": "「{letter}」で終わる Wordle 単語",
        "titleLength": "{n}文字の単語",
        "descStarts": "「{letter}」で始まるスクラブル有効単語を探索。長さとスコアで絞り込めます。",
        "descEnds": "「{letter}」で終わるスクラブル有効単語を発見。長さで絞り込み、フックを探せます。",
        "descLength": "スクラブル・Wordle・アナグラム用の{n}文字の単語をすべて閲覧。公式スクラブル辞典で絞り込み、スコア順に表示。",
        "backToFamily": "{family}に戻る",
        "sortLabel": "並べ替え",
        "sortScore": "スコア",
        "filterByLetter": "頭文字で絞り込む",
    },
    "zh": {
        "titleStarts": "以 {letter} 开头的单词",
        "titleEnds": "以 {letter} 结尾的单词",
        "titleWordleStarts": "以 {letter} 开头的 Wordle 单词",
        "titleWordleEnds": "以 {letter} 结尾的 Wordle 单词",
        "titleLength": "{n} 个字母的单词",
        "descStarts": "探索以字母 {letter} 开头的已验证 Scrabble 单词。可按长度和得分筛选。",
        "descEnds": "发现以字母 {letter} 结尾的已验证 Scrabble 单词。可按长度筛选并寻找构词机会。",
        "descLength": "浏览所有 {n} 个字母的单词，适用于 Scrabble、Wordle 和字谜游戏。经官方 Scrabble 词典筛选，按得分排序。",
        "backToFamily": "返回{family}",
        "sortLabel": "排序",
        "sortScore": "得分",
        "filterByLetter": "按首字母筛选",
    },
}

# hubPages additions (templates: {letter} {n})
HUB = {
    "en": {
        "ariaBrowseStarts": "Browse words starting with {letter}",
        "ariaBrowseEnds": "Browse words ending with {letter}",
        "ariaBrowseWordleStarts": "Browse Wordle words starting with {letter}",
        "ariaBrowseWordleEnds": "Browse Wordle words ending with {letter}",
        "ariaBrowseLength": "Browse {n}-letter words",
    },
    "fr": {
        "ariaBrowseStarts": "Parcourir les mots commençant par {letter}",
        "ariaBrowseEnds": "Parcourir les mots finissant par {letter}",
        "ariaBrowseWordleStarts": "Parcourir les mots Wordle commençant par {letter}",
        "ariaBrowseWordleEnds": "Parcourir les mots Wordle finissant par {letter}",
        "ariaBrowseLength": "Parcourir les mots de {n} lettres",
    },
    "es": {
        "ariaBrowseStarts": "Explorar palabras que empiezan por {letter}",
        "ariaBrowseEnds": "Explorar palabras que terminan en {letter}",
        "ariaBrowseWordleStarts": "Explorar palabras de Wordle que empiezan por {letter}",
        "ariaBrowseWordleEnds": "Explorar palabras de Wordle que terminan en {letter}",
        "ariaBrowseLength": "Explorar palabras de {n} letras",
    },
    "de": {
        "ariaBrowseStarts": "Wörter anzeigen, die mit {letter} beginnen",
        "ariaBrowseEnds": "Wörter anzeigen, die auf {letter} enden",
        "ariaBrowseWordleStarts": "Wordle-Wörter anzeigen, die mit {letter} beginnen",
        "ariaBrowseWordleEnds": "Wordle-Wörter anzeigen, die auf {letter} enden",
        "ariaBrowseLength": "Wörter mit {n} Buchstaben anzeigen",
    },
    "it": {
        "ariaBrowseStarts": "Sfoglia le parole che iniziano con {letter}",
        "ariaBrowseEnds": "Sfoglia le parole che finiscono con {letter}",
        "ariaBrowseWordleStarts": "Sfoglia le parole di Wordle che iniziano con {letter}",
        "ariaBrowseWordleEnds": "Sfoglia le parole di Wordle che finiscono con {letter}",
        "ariaBrowseLength": "Sfoglia le parole di {n} lettere",
    },
    "pt": {
        "ariaBrowseStarts": "Ver palavras que começam por {letter}",
        "ariaBrowseEnds": "Ver palavras que terminam em {letter}",
        "ariaBrowseWordleStarts": "Ver palavras de Wordle que começam por {letter}",
        "ariaBrowseWordleEnds": "Ver palavras de Wordle que terminam em {letter}",
        "ariaBrowseLength": "Ver palavras de {n} letras",
    },
    "nl": {
        "ariaBrowseStarts": "Bekijk woorden die beginnen met {letter}",
        "ariaBrowseEnds": "Bekijk woorden die eindigen op {letter}",
        "ariaBrowseWordleStarts": "Bekijk Wordle-woorden die beginnen met {letter}",
        "ariaBrowseWordleEnds": "Bekijk Wordle-woorden die eindigen op {letter}",
        "ariaBrowseLength": "Bekijk woorden van {n} letters",
    },
    "ja": {
        "ariaBrowseStarts": "{letter} で始まる単語を閲覧",
        "ariaBrowseEnds": "{letter} で終わる単語を閲覧",
        "ariaBrowseWordleStarts": "{letter} で始まる Wordle 単語を閲覧",
        "ariaBrowseWordleEnds": "{letter} で終わる Wordle 単語を閲覧",
        "ariaBrowseLength": "{n} 文字の単語を閲覧",
    },
    "zh": {
        "ariaBrowseStarts": "浏览以 {letter} 开头的单词",
        "ariaBrowseEnds": "浏览以 {letter} 结尾的单词",
        "ariaBrowseWordleStarts": "浏览以 {letter} 开头的 Wordle 单词",
        "ariaBrowseWordleEnds": "浏览以 {letter} 结尾的 Wordle 单词",
        "ariaBrowseLength": "浏览 {n} 个字母的单词",
    },
}

# ui additions (templates: {word} {count})
UI = {
    "en": {
        "shareResults": "Share results",
        "saveToVault": "Save to vault",
        "savedToVault": "Saved",
        "saveWordToVault": "Save {word} to vault",
        "removeWordFromVault": "Remove {word} from vault",
        "previousPage": "Previous page",
        "nextPage": "Next page",
        "showAllCount": "All ({count})",
    },
    "fr": {
        "shareResults": "Partager les résultats",
        "saveToVault": "Ajouter au coffre-fort",
        "savedToVault": "Enregistré",
        "saveWordToVault": "Enregistrer {word} dans le coffre-fort",
        "removeWordFromVault": "Retirer {word} du coffre-fort",
        "previousPage": "Page précédente",
        "nextPage": "Page suivante",
        "showAllCount": "Tous ({count})",
    },
    "es": {
        "shareResults": "Compartir resultados",
        "saveToVault": "Guardar en la bóveda",
        "savedToVault": "Guardado",
        "saveWordToVault": "Guardar {word} en la bóveda",
        "removeWordFromVault": "Quitar {word} de la bóveda",
        "previousPage": "Página anterior",
        "nextPage": "Página siguiente",
        "showAllCount": "Todas ({count})",
    },
    "de": {
        "shareResults": "Ergebnisse teilen",
        "saveToVault": "In den Speichertresor",
        "savedToVault": "Gespeichert",
        "saveWordToVault": "{word} in den Speichertresor speichern",
        "removeWordFromVault": "{word} aus dem Speichertresor entfernen",
        "previousPage": "Vorherige Seite",
        "nextPage": "Nächste Seite",
        "showAllCount": "Alle ({count})",
    },
    "it": {
        "shareResults": "Condividi i risultati",
        "saveToVault": "Aggiungi al salvavault",
        "savedToVault": "Salvato",
        "saveWordToVault": "Salva {word} nel salvavault",
        "removeWordFromVault": "Rimuovi {word} dal salvavault",
        "previousPage": "Pagina precedente",
        "nextPage": "Pagina successiva",
        "showAllCount": "Tutte ({count})",
    },
    "pt": {
        "shareResults": "Partilhar resultados",
        "saveToVault": "Salvar no cofre",
        "savedToVault": "Salvo",
        "saveWordToVault": "Salvar {word} no cofre",
        "removeWordFromVault": "Remover {word} do cofre",
        "previousPage": "Página anterior",
        "nextPage": "Página seguinte",
        "showAllCount": "Todas ({count})",
    },
    "nl": {
        "shareResults": "Resultaten delen",
        "saveToVault": "Bewaren in de opslagkluis",
        "savedToVault": "Bewaard",
        "saveWordToVault": "{word} in de opslagkluis bewaren",
        "removeWordFromVault": "{word} uit de opslagkluis verwijderen",
        "previousPage": "Vorige pagina",
        "nextPage": "Volgende pagina",
        "showAllCount": "Alle ({count})",
    },
    "ja": {
        "shareResults": "結果を共有",
        "saveToVault": "ボールトに保存",
        "savedToVault": "保存済み",
        "saveWordToVault": "{word} をボールトに保存",
        "removeWordFromVault": "{word} をボールトから削除",
        "previousPage": "前のページ",
        "nextPage": "次のページ",
        "showAllCount": "すべて ({count})",
    },
    "zh": {
        "shareResults": "分享结果",
        "saveToVault": "存入保存库",
        "savedToVault": "已保存",
        "saveWordToVault": "将 {word} 存入保存库",
        "removeWordFromVault": "将 {word} 从保存库移除",
        "previousPage": "上一页",
        "nextPage": "下一页",
        "showAllCount": "全部（{count}）",
    },
}

LANGS = ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"]


def esc(v: str) -> str:
    """Escape for a double-quoted TS string literal."""
    return v.replace("\\", "\\\\").replace('"', '\\"')


def block(entries: dict, indent: str = "  ") -> str:
    return "\n".join(
        f"{indent}{k}: \"{esc(v)}\"," for k, v in entries.items()
    )


def main() -> None:
    with open(PATH, encoding="utf-8") as f:
        src = f.read()

    if "titleWordleStarts" in src:
        print("ABORT: keys already present (already applied?)")
        sys.exit(1)

    lines = src.split("\n")

    # ── 1. Type definitions ─────────────────────────────────────────────
    out = []
    for line in lines:
        out.append(line)
        stripped = line.strip()
        if stripped == "browseBtn: string;":
            out.append(
                "  // Grid aria-labels for the Word Lab hub pages (templates: {letter}/{n})"
                "\n  ariaBrowseStarts: string; ariaBrowseEnds: string;"
                "\n  ariaBrowseWordleStarts: string; ariaBrowseWordleEnds: string; ariaBrowseLength: string;"
            )
        elif stripped == "copiedToClipboard: string;":
            out.append(
                "  shareResults: string; saveToVault: string; savedToVault: string;"
                "\n  saveWordToVault: string; removeWordFromVault: string;"
                "\n  previousPage: string; nextPage: string; showAllCount: string;"
            )
        elif stripped == "error: string;":
            out.append(
                "  // Localized page shell for the English-canonical word-list URLs:"
                "\n  // H1/description/back-link templates that follow the user's chosen"
                "\n  // language ({letter}/{n}/{family} placeholders)."
                "\n  titleStarts: string; titleEnds: string; titleWordleStarts: string; titleWordleEnds: string;"
                "\n  titleLength: string; descStarts: string; descEnds: string; descLength: string;"
                "\n  backToFamily: string; sortLabel: string; sortScore: string; filterByLetter: string;"
            )
    lines = out

    # ── 2. Language objects: track current language via const markers ───
    lang_re = re.compile(r"^const (en|fr|es|de|it|pt|nl|ja|zh): Translation = \{$")
    out = []
    current = None
    for line in lines:
        m = lang_re.match(line)
        if m:
            current = m.group(1)
        stripped = line.strip()
        if current and re.match(r'^error: "[^"]*",$', stripped):
            # wordListPage tail (inside language objects only; the type uses `error: string;`)
            out.append(line)
            out.append(block(WLP[current]))
        elif current and re.match(r'^browseBtn: "[^"]*",$', stripped):
            out.append(line)
            out.append(block(HUB[current]))
        elif current and re.match(r'^copiedToClipboard: "[^"]*",$', stripped):
            out.append(line)
            out.append(block(UI[current]))
        else:
            out.append(line)
    lines = out

    with open(PATH, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))

    # Sanity: every language got all three blocks
    text = "\n".join(lines)
    for lang in LANGS:
        for key in ("titleWordleStarts", "ariaBrowseLength", "showAllCount"):
            count = len(re.findall(rf"^\s+{key}: ", text, re.M))
            if count < 10:  # 9 objects + 1 type
                print(f"WARN: {key} appears {count} times (expected >= 10)")
    print("OK: keys inserted for all 9 languages")


if __name__ == "__main__":
    main()
