#!/usr/bin/env python3
"""Insert wordPages, blitz sections and wordlengths entries into translations.ts for fr, es, de, it, pt, nl, ja, zh."""

from pathlib import Path

PATH = Path("/home/z/my-project/wordIzy-1/src/components/i18n/translations.ts")

# Per-language strings: (nav_label, allWords_marker_for_wordlists_block, wordPages_dict, blitz_dict, faq_items_list)
LANGS = {
    "fr": {
        "nav_wordlengths": "Longueurs de Mots",
        "wordlists_nav_str": 'wordlists: "Listes de Mots", wordstarts:',
        "wordlists_block_marker": 'allWords: "Tous les mots", startsBy: "Commence par A–Z", endsBy: "Finit par A–Z", letter: "Lettre", selectLength: "Longueur", selectLetter: "Lettre", browse: "Parcourir",',
        "wordPages": {
            "searchPlaceholder": "Rechercher des listes de mots de 2 à 15 lettres…",
            "searchBtn": "Parcourir",
            "startsByTitle": "Mots commençant par — A à Z",
            "endsByTitle": "Mots finissant par — A à Z",
            "byLengthTitle": "Parcourir par longueur de mot (2–15 lettres)",
            "footerNote": "Tous les mots sont filtrés par les dictionnaires officiels du Scrabble.",
            "notFound": "Liste de mots introuvable.",
            "wordsCount": "mots",
            "allWords": "Tous",
            "filterPlaceholder": "Filtrer les mots…",
            "loading": "Chargement de la liste de mots…",
            "noResults": "Aucun mot ne correspond à votre filtre.",
            "aboutTitle": "À propos de cette liste de mots",
            "aboutBody": "Parcourez des mots vérifiés par le dictionnaire pour le Scrabble, Wordle et les anagrammes. Utilisez le filtre de longueur pour réduire les résultats, puis cliquez sur un mot pour le copier.",
        },
        "blitz": {
            "challengeTitle": "Défi Anagram Blitz",
            "challengeDesc": "Démêlez des mots en moins de 60 secondes à partir de nos dictionnaires Scrabble.",
            "comingSoon": "Bientôt disponible — Nouvelle fonctionnalité",
            "comingSoonDesc": "Nous mettons les dernières touches à ce nouveau jeu passionnant. Restez connectés !",
            "boredTitle": "Fatigué de démêler ?",
            "boredDesc": "Mettez vos compétences à l'épreuve dans notre mini-jeu quotidien effréné.",
        },
        "faq_wordlengths": [
            ("Qu'est-ce que la page Longueurs de Mots ?", "La page Longueurs de Mots permet de parcourir tous les mots valides au Scrabble par longueur, des mots de 2 lettres jusqu'aux mots de 15 lettres. Chaque longueur a sa propre page dédiée listant tous les mots valides filtrés par le dictionnaire officiel du Scrabble, triés par score Scrabble."),
            ("Comment naviguer entre les longueurs ?", "Cliquez sur n'importe quel nombre de 2 à 15 pour ouvrir la page de cette longueur. Dans une page, utilisez les liens précédent/suivant en bas pour passer d'une longueur à l'autre (par exemple, Mots de 5 lettres → Mots de 6 lettres)."),
            ("Comment les mots sont-ils triés ?", "Les mots sont triés par score Scrabble (le plus élevé d'abord), puis alphabétiquement en cas d'égalité. Chaque tuile de mot affiche sa valeur en points, pour repérer les meilleurs coups d'un coup d'œil."),
            ("Pourquoi étudier les mots par longueur ?", "De nombreux jeux de mots récompensent des longueurs spécifiques — les réponses Wordle ont 5 lettres, les bingos au Scrabble nécessitent les 7 tuiles, et les mots croisés précisent souvent la longueur. Parcourir par longueur aide à construire un vocabulaire spécifique pour chaque type de jeu."),
        ],
    },
    "es": {
        "nav_wordlengths": "Longitudes de Palabras",
        "wordlists_nav_str": 'wordlists: "Listas de Palabras", wordstarts:',
        "wordlists_block_marker": 'allWords: "Todas las palabras", startsBy: "Empieza por A–Z", endsBy: "Termina en A–Z", letter: "Letra", selectLength: "Longitud", selectLetter: "Letra", browse: "Explorar"',
        "wordPages": {
            "searchPlaceholder": "Buscar listas de palabras de 2 a 15 letras…",
            "searchBtn": "Explorar",
            "startsByTitle": "Palabras que empiezan por — A a Z",
            "endsByTitle": "Palabras que terminan en — A a Z",
            "byLengthTitle": "Explorar por longitud de palabra (2–15 letras)",
            "footerNote": "Todas las palabras se filtran con diccionarios oficiales de Scrabble.",
            "notFound": "Lista de palabras no encontrada.",
            "wordsCount": "palabras",
            "allWords": "Todas",
            "filterPlaceholder": "Filtrar palabras…",
            "loading": "Cargando lista de palabras…",
            "noResults": "Ninguna palabra coincide con tu filtro.",
            "aboutTitle": "Acerca de esta lista de palabras",
            "aboutBody": "Explora palabras verificadas por el diccionario para Scrabble, Wordle y anagramas. Usa el filtro de longitud para acotar los resultados y haz clic en cualquier palabra para copiarla.",
        },
        "blitz": {
            "challengeTitle": "Reto Anagram Blitz",
            "challengeDesc": "Descifra palabras en menos de 60 segundos desde nuestros diccionarios de Scrabble.",
            "comingSoon": "Próximamente — Nueva función",
            "comingSoonDesc": "Estamos dando los últimos toques a este emocionante nuevo juego. ¡Estén atentos!",
            "boredTitle": "¿Cansado de descifrar?",
            "boredDesc": "Pon a prueba tus habilidades en nuestro vertiginoso minijuego diario.",
        },
        "faq_wordlengths": [
            ("¿Qué es la página Longitudes de Palabras?", "La página Longitudes de Palabras te permite explorar todas las palabras válidas de Scrabble por longitud, desde palabras de 2 letras hasta palabras de 15 letras. Cada longitud tiene su propia página dedicada que lista todas las palabras válidas filtradas por el diccionario oficial de Scrabble, ordenadas por puntuación de Scrabble."),
            ("¿Cómo navegar entre longitudes?", "Haz clic en cualquier número del 2 al 15 para abrir la página de esa longitud. Dentro de una página, usa los enlaces anterior/siguiente de la parte inferior para moverte entre longitudes adyacentes (p. ej., Palabras de 5 letras → Palabras de 6 letras)."),
            ("¿Cómo se ordenan las palabras?", "Las palabras se ordenan por puntuación de Scrabble (primero la más alta) y, al empate, alfabéticamente. Cada ficha de palabra muestra su valor en puntos, para identificar las mejores jugadas de un vistazo."),
            ("¿Por qué estudiar palabras por longitud?", "Muchos juegos de palabras premian longitudes específicas — las respuestas de Wordle son de 5 letras, los bingos en Scrabble requieren las 7 fichas, y los crucigramas suelen especificar la longitud. Explorar por longitud ayuda a construir vocabulario específico para cada tipo de juego."),
        ],
    },
    "de": {
        "nav_wordlengths": "Wortlängen",
        "wordlists_nav_str": 'wordlists: "Wortlisten", wordstarts:',
        "wordlists_block_marker": 'allWords: "Alle Wörter", startsBy: "Beginnt mit A–Z", endsBy: "Endet mit A–Z", letter: "Buchstabe", selectLength: "Länge", selectLetter: "Buchstabe", browse: "Durchsuchen"',
        "wordPages": {
            "searchPlaceholder": "Wortlisten mit 2–15 Buchstaben durchsuchen…",
            "searchBtn": "Durchsuchen",
            "startsByTitle": "Wörter, die beginnen mit — A bis Z",
            "endsByTitle": "Wörter, die enden mit — A bis Z",
            "byLengthTitle": "Nach Wortlänge durchsuchen (2–15 Buchstaben)",
            "footerNote": "Alle Wörter werden mit offiziellen Scrabble-Wörterbüchern gefiltert.",
            "notFound": "Wortliste nicht gefunden.",
            "wordsCount": "Wörter",
            "allWords": "Alle",
            "filterPlaceholder": "Wörter filtern…",
            "loading": "Wortliste wird geladen…",
            "noResults": "Keine Wörter entsprechen deinem Filter.",
            "aboutTitle": "Über diese Wortliste",
            "aboutBody": "Durchsuche geprüfte, wörterbuchverifizierte Wörter für Scrabble, Wordle und Anagramm-Rätsel. Nutze den Längenfilter, um die Ergebnisse einzugrenzen, und klicke auf ein Wort, um es zu kopieren.",
        },
        "blitz": {
            "challengeTitle": "Anagram Blitz Herausforderung",
            "challengeDesc": "Entschlüssele Wörter in unter 60 Sekunden aus unseren Scrabble-Wörterbüchern.",
            "comingSoon": "Demnächst — Neue Funktion",
            "comingSoonDesc": "Wir verleihen diesem spannenden neuen Spiel den letzten Schliff. Bleib dran!",
            "boredTitle": "Genug des Entschlüsselns?",
            "boredDesc": "Stelle deine Fähigkeiten in unserem rasanten täglichen Minispiel auf die Probe.",
        },
        "faq_wordlengths": [
            ("Was ist die Wortlängen-Seite?", "Die Wortlängen-Seite lässt dich jedes gültige Scrabble-Wort nach Länge durchsuchen, von 2-Buchstaben-Wörtern bis zu 15-Buchstaben-Wörtern. Jede Länge hat eine eigene Landingpage, die alle gültigen Wörter auflistet, gefiltert durch das offizielle Scrabble-Wörterbuch und sortiert nach Scrabble-Punkten."),
            ("Wie navigiere ich zwischen Längen?", "Klicke auf eine Zahl von 2 bis 15, um die Seite dieser Länge zu öffnen. Verwende innerhalb einer Seite die Zurück/Weiter-Links unten, um zwischen benachbarten Längen zu wechseln (z. B. 5-Buchstaben-Wörter → 6-Buchstaben-Wörter)."),
            ("Wie sind die Wörter sortiert?", "Wörter werden nach Scrabble-Punkten (höchste zuerst), bei Gleichstand alphabetisch sortiert. Jede Wort-Kachel zeigt ihren Punktwert, sodass du die besten Spielzüge sofort erkennst."),
            ("Warum Wörter nach Länge studieren?", "Viele Wortspiele belohnen bestimmte Längen — Wordle-Antworten sind 5 Buchstaben lang, Scrabble-Bingos benötigen alle 7 Steine, und Kreuzworträtsel geben oft die Länge vor. Nach Länge zu stöbern hilft dir, länge­nspezifischen Wortschatz für jeden Spieltyp aufzubauen."),
        ],
    },
    "it": {
        "nav_wordlengths": "Lunghezze Parole",
        "wordlists_nav_str": 'wordlists: "Liste Parole", wordstarts:',
        "wordlists_block_marker": 'allWords: "Tutte le parole", startsBy: "Inizia per A–Z", endsBy: "Finisce per A–Z", letter: "Lettera", selectLength: "Lunghezza", selectLetter: "Lettera", browse: "Sfoglia"',
        "wordPages": {
            "searchPlaceholder": "Cerca liste di parole da 2 a 15 lettere…",
            "searchBtn": "Sfoglia",
            "startsByTitle": "Parole che iniziano per — A alla Z",
            "endsByTitle": "Parole che finiscono per — A alla Z",
            "byLengthTitle": "Sfoglia per lunghezza parola (2–15 lettere)",
            "footerNote": "Tutte le parole sono filtrate tramite dizionari ufficiali dello Scrabble.",
            "notFound": "Lista parole non trovata.",
            "wordsCount": "parole",
            "allWords": "Tutte",
            "filterPlaceholder": "Filtra parole…",
            "loading": "Caricamento lista parole…",
            "noResults": "Nessuna parola corrisponde al filtro.",
            "aboutTitle": "Informazioni su questa lista di parole",
            "aboutBody": "Sfoglia parole verificate dal dizionario per Scrabble, Wordle e anagrammi. Usa il filtro per lunghezza per restringere i risultati, poi clicca una parola per copiarla.",
        },
        "blitz": {
            "challengeTitle": "Sfida Anagram Blitz",
            "challengeDesc": "Decodifica parole in meno di 60 secondi dai nostri dizionari Scrabble.",
            "comingSoon": "Prossimamente — Nuova funzione",
            "comingSoonDesc": "Stiamo dando gli ultimi ritocchi a questo nuovo gioco entusiasmante. Resta sintonizzato!",
            "boredTitle": "Stanco di decodificare?",
            "boredDesc": "Metti alla prova le tue abilità nel nostro minigioco quotidiano frenetico.",
        },
        "faq_wordlengths": [
            ("Cos'è la pagina Lunghezze Parole?", "La pagina Lunghezze Parole ti permette di sfogliare ogni parola valida per Scrabble per lunghezza, dalle parole di 2 lettere fino alle parole di 15 lettere. Ogni lunghezza ha una propria pagina dedicata che elenca ogni parola valida filtrata dal dizionario ufficiale dello Scrabble, ordinata per punteggio Scrabble."),
            ("Come navigo tra le lunghezze?", "Clicca su un numero da 2 a 15 per aprire la pagina di quella lunghezza. All'interno di una pagina, usa i link precedente/successivo in fondo per passare tra lunghezze adiacenti (es. Parole di 5 lettere → Parole di 6 lettere)."),
            ("Come sono ordinate le parole?", "Le parole sono ordinate per punteggio Scrabble (più alto prima), poi alfabeticamente in caso di parità. Ogni piastrella mostra il suo valore in punti, così puoi individuare le mosse migliori a colpo d'occhio."),
            ("Perché studiare le parole per lunghezza?", "Molti giochi di parole premiano lunghezze specifiche — le risposte di Wordle sono di 5 lettere, i bingo nello Scrabble richiedono tutte e 7 le tessere, e le parole crociate spesso specificano la lunghezza. Sfogliare per lunghezza aiuta a costruire vocaboli specifici per ogni tipo di gioco."),
        ],
    },
    "pt": {
        "nav_wordlengths": "Tamanhos de Palavras",
        "wordlists_nav_str": 'wordlists: "Listas de Palavras", wordstarts:',
        "wordlists_block_marker": 'allWords: "Todas as palavras", startsBy: "Começa por A–Z", endsBy: "Termina em A–Z", letter: "Letra", selectLength: "Tamanho", selectLetter: "Letra", browse: "Navegar"',
        "wordPages": {
            "searchPlaceholder": "Pesquisar listas de palavras de 2 a 15 letras…",
            "searchBtn": "Navegar",
            "startsByTitle": "Palavras que começam por — A a Z",
            "endsByTitle": "Palavras que terminam em — A a Z",
            "byLengthTitle": "Navegar por tamanho da palavra (2–15 letras)",
            "footerNote": "Todas as palavras são filtradas pelos dicionários oficiais de Scrabble.",
            "notFound": "Lista de palavras não encontrada.",
            "wordsCount": "palavras",
            "allWords": "Todas",
            "filterPlaceholder": "Filtrar palavras…",
            "loading": "Carregando lista de palavras…",
            "noResults": "Nenhuma palavra corresponde ao seu filtro.",
            "aboutTitle": "Sobre esta lista de palavras",
            "aboutBody": "Navegue por palavras verificadas por dicionário para Scrabble, Wordle e anagramas. Use o filtro de tamanho para refinar os resultados e clique em qualquer palavra para copiá-la.",
        },
        "blitz": {
            "challengeTitle": "Desafio Anagram Blitz",
            "challengeDesc": "Descifre palavras em menos de 60 segundos dos nossos dicionários de Scrabble.",
            "comingSoon": "Em breve — Novo recurso",
            "comingSoonDesc": "Estamos dando os retoques finais neste emocionante novo jogo. Fique ligado!",
            "boredTitle": "Cansado de decifrar?",
            "boredDesc": "Teste suas habilidades em nosso minijogo diário acelerado.",
        },
        "faq_wordlengths": [
            ("O que é a página Tamanhos de Palavras?", "A página Tamanhos de Palavras permite navegar por todas as palavras válidas de Scrabble por tamanho, de palavras de 2 letras até palavras de 15 letras. Cada tamanho tem sua própria página dedicada listando todas as palavras válidas filtradas pelo dicionário oficial de Scrabble, ordenadas por pontuação de Scrabble."),
            ("Como navegar entre os tamanhos?", "Clique em qualquer número de 2 a 15 para abrir a página desse tamanho. Dentro de uma página, use os links anterior/próximo na parte inferior para se mover entre tamanhos adjacentes (ex.: Palavras de 5 letras → Palavras de 6 letras)."),
            ("Como as palavras são ordenadas?", "As palavras são ordenadas por pontuação de Scrabble (maior primeiro) e, em caso de empate, alfabeticamente. Cada bloco de palavra mostra seu valor em pontos, para que você identifique as melhores jogadas de relance."),
            ("Por que estudar palavras por tamanho?", "Muitos jogos de palavras premiam tamanhos específicos — respostas de Wordle têm 5 letras, bingos em Scrabble exigem todas as 7 peças, e palavras cruzadas frequentemente especificam o tamanho. Navegar por tamanho ajuda a construir vocabulário específico para cada tipo de jogo."),
        ],
    },
    "nl": {
        "nav_wordlengths": "Woordlengtes",
        "wordlists_nav_str": 'wordlists: "Woordlijsten", wordstarts:',
        "wordlists_block_marker": 'allWords: "Alle woorden", startsBy: "Begint met A–Z", endsBy: "Eindigt op A–Z", letter: "Letter", selectLength: "Lengte", selectLetter: "Letter", browse: "Bladeren"',
        "wordPages": {
            "searchPlaceholder": "Zoek woordlijsten van 2 tot 15 letters…",
            "searchBtn": "Bladeren",
            "startsByTitle": "Woorden die beginnen met — A tot Z",
            "endsByTitle": "Woorden die eindigen op — A tot Z",
            "byLengthTitle": "Bladeren op woordlengte (2–15 letters)",
            "footerNote": "Alle woorden worden gefilterd via officiële Scrabblewoordenboeken.",
            "notFound": "Woordlijst niet gevonden.",
            "wordsCount": "woorden",
            "allWords": "Alle",
            "filterPlaceholder": "Woorden filteren…",
            "loading": "Woordlijst laden…",
            "noResults": "Geen woorden komen door met je filter.",
            "aboutTitle": "Over deze woordlijst",
            "aboutBody": "Blader door woorden geverifieerd door het woordenboek voor Scrabble, Wordle en anagrammen. Gebruik het lengtefilter om resultaten te verfijnen en klik op een woord om het te kopiëren.",
        },
        "blitz": {
            "challengeTitle": "Anagram Blitz Uitdaging",
            "challengeDesc": "Ontcijfer woorden in minder dan 60 seconden uit onze Scrabblewoordenboeken.",
            "comingSoon": "Binnenkort — Nieuwe functie",
            "comingSoonDesc": "We leggen de laatste hand aan dit spannende nieuwe spel. Blijf op de hoogte!",
            "boredTitle": "Genoeg van ontcijferen?",
            "boredDesc": "Zet je vaardigheden op de proef in ons razendsnelle dagelijkse minispel.",
        },
        "faq_wordlengths": [
            ("Wat is de Woordlengtes-pagina?", "De Woordlengtes-pagina laat je elk geldig Scrabblewoord op lengte doorbladeren, van woorden van 2 letters tot woorden van 15 letters. Elke lengte heeft een eigen landingspagina met alle geldige woorden, gefilterd door het officiële Scrabblewoordenboek en gesorteerd op Scrabble-score."),
            ("Hoe navigeer ik tussen lengtes?", "Klik op een getal van 2 tot 15 om die lengte te openen. Binnen een pagina kun je de vorige/volgende-links onderaan gebruiken om tussen aangrenzende lengtes te bewegen (bijv. Woorden van 5 letters → Woorden van 6 letters)."),
            ("Hoe zijn de woorden gesorteerd?", "Woorden zijn gesorteerd op Scrabble-score (hoogste eerst), bij gelijkheid alfabetisch. Elke woordtegel toont zijn puntwaarde, zodat je de beste zagen in één oogopslag ziet."),
            ("Waarom woorden op lengte bestuderen?", "Veel woordspellen belonen specifieke lengtes — Wordle-antwoorden zijn 5 letters, bingo's in Scrabble vereisen alle 7 tegels, en kruiswoordraadsels geven vaak de lengte aan. Bladeren op lengte helpt lengtespecifieke woordenschat op te bouwen voor elk type spel."),
        ],
    },
    "ja": {
        "nav_wordlengths": "単語の長さ",
        "wordlists_nav_str": 'wordlists: "単語リスト", wordstarts:',
        "wordlists_block_marker": 'allWords: "すべての単語", startsBy: "A〜Zで始まる", endsBy: "A〜Zで終わる", letter: "文字", selectLength: "長さ", selectLetter: "文字", browse: "閲覧"',
        "wordPages": {
            "searchPlaceholder": "2〜15文字の単語リストを検索…",
            "searchBtn": "閲覧",
            "startsByTitle": "〜で始まる単語 — A から Z",
            "endsByTitle": "〜で終わる単語 — A から Z",
            "byLengthTitle": "単語の長さで閲覧（2〜15文字）",
            "footerNote": "すべての単語は公式Scrabble辞書でフィルターされています。",
            "notFound": "単語リストが見つかりません。",
            "wordsCount": "単語",
            "allWords": "すべて",
            "filterPlaceholder": "単語を絞り込む…",
            "loading": "単語リストを読み込み中…",
            "noResults": "フィルターに一致する単語がありません。",
            "aboutTitle": "この単語リストについて",
            "aboutBody": "Scrabble、Wordle、アナグラム用の辞書認証済み単語を閲覧。長さフィルターで結果を絞り込み、単語をクリックしてコピーできます。",
        },
        "blitz": {
            "challengeTitle": "アナグラムブリッツ チャレンジ",
            "challengeDesc": "当社のScrabble辞書から60秒以内に単語を解読してください。",
            "comingSoon": "近日公開 — 新機能",
            "comingSoonDesc": "このエキサイティングな新ゲームの最終調整を行っています。お楽しみに！",
            "boredTitle": "解読に飽きましたか？",
            "boredDesc": "ペースの速い毎日のミニゲームで腕試しをしましょう。",
        },
        "faq_wordlengths": [
            ("単語の長さページとは？", "単語の長さページでは、2文字から15文字まで、長さごとにすべての有効なScrabble単語を閲覧できます。各長さには専用のランディングページがあり、公式Scrabble辞書でフィルターされたすべての有効な単語がScrabbleスコア順にリストされます。"),
            ("長さ間を移動するには？", "2〜15のいずれかの数字をクリックすると、その長さのページが開きます。ページ内では、下部の前へ/次へリンクを使って隣接する長さに移動できます（例：5文字の単語 → 6文字の単語）。"),
            ("単語はどのように並べ替えられますか？", "単語はScrabbleスコアの高い順に、同点の場合はアルファベット順に並べ替えられます。各単語タイルにはポイント値が表示されるので、最高得点のプレーを一目で確認できます。"),
            ("なぜ長さ別に単語を学ぶのか？", "多くの単語ゲームは特定の長さを報奨します — Wordleの答えは5文字、Scrabbleのビンゴは7個すべてのタイルを必要とし、クロスワードはしばしば長さを指定します。長さ別に閲覧することで、各ゲームタイプに特化した語彙を構築できます。"),
        ],
    },
    "zh": {
        "nav_wordlengths": "单词长度",
        "wordlists_nav_str": 'wordlists: "单词表", wordstarts:',
        "wordlists_block_marker": 'allWords: "全部单词", startsBy: "开头A–Z", endsBy: "结尾A–Z", letter: "字母", selectLength: "长度", selectLetter: "字母", browse: "浏览"',
        "wordPages": {
            "searchPlaceholder": "搜索2–15字母单词列表…",
            "searchBtn": "浏览",
            "startsByTitle": "以…开头的单词 — A 到 Z",
            "endsByTitle": "以…结尾的单词 — A 到 Z",
            "byLengthTitle": "按单词长度浏览（2–15字母）",
            "footerNote": "所有单词均通过官方Scrabble词典过滤。",
            "notFound": "未找到单词列表。",
            "wordsCount": "个单词",
            "allWords": "全部",
            "filterPlaceholder": "过滤单词…",
            "loading": "正在加载单词列表…",
            "noResults": "没有符合筛选条件的单词。",
            "aboutTitle": "关于此单词列表",
            "aboutBody": "浏览经词典验证的Scrabble、Wordle和字谜游戏单词。使用长度筛选缩小结果范围,然后点击任意单词即可复制。",
        },
        "blitz": {
            "challengeTitle": "字谜闪电战挑战",
            "challengeDesc": "在60秒内从我们的Scrabble词典中解码单词。",
            "comingSoon": "即将推出 — 新功能",
            "comingSoonDesc": "我们正在为这个激动人心的新游戏做最后的打磨。敬请期待！",
            "boredTitle": "解码够了吗？",
            "boredDesc": "在我们快节奏的每日迷你游戏中测试你的技能。",
        },
        "faq_wordlengths": [
            ("单词长度页面是什么？", "单词长度页面让你按长度浏览每个有效的Scrabble单词,从2字母单词到15字母单词。每个长度都有自己的专用落地页,列出经官方Scrabble词典过滤的每个有效单词,按Scrabble分数排序。"),
            ("如何在长度之间导航？", "点击2到15之间的任意数字以打开该长度的页面。在页面内,使用底部的上一页/下一页链接在相邻长度之间移动(例如,5字母单词 → 6字母单词)。"),
            ("单词如何排序？", "单词按Scrabble分数排序(最高分在前),然后按字母顺序作为平局决胜。每个单词牌显示其点值,因此你可以一目了然地看到最高分的玩法。"),
            ("为什么按长度学习单词？", "许多单词游戏奖励特定长度 — Wordle答案为5个字母,Scrabble的bingo需要全部7个牌,而填字游戏通常指定长度。按长度浏览有助于为每种游戏类型构建长度特定的词汇量。"),
        ],
    },
}


def build_wordPages_block(wp):
    lines = [" wordPages: {"]
    lines.append(f'  searchPlaceholder: "{wp["searchPlaceholder"]}",')
    lines.append(f'  searchBtn: "{wp["searchBtn"]}",')
    lines.append(f'  startsByTitle: "{wp["startsByTitle"]}",')
    lines.append(f'  endsByTitle: "{wp["endsByTitle"]}",')
    lines.append(f'  byLengthTitle: "{wp["byLengthTitle"]}",')
    lines.append(f'  footerNote: "{wp["footerNote"]}",')
    lines.append(f'  notFound: "{wp["notFound"]}",')
    lines.append(f'  wordsCount: "{wp["wordsCount"]}",')
    lines.append(f'  allWords: "{wp["allWords"]}",')
    lines.append(f'  filterPlaceholder: "{wp["filterPlaceholder"]}",')
    lines.append(f'  loading: "{wp["loading"]}",')
    lines.append(f'  noResults: "{wp["noResults"]}",')
    lines.append(f'  aboutTitle: "{wp["aboutTitle"]}",')
    lines.append(f'  aboutBody: "{wp["aboutBody"]}",')
    lines.append(" },")
    return "\n".join(lines)


def build_blitz_block(b):
    lines = [" blitz: {"]
    lines.append(f'  challengeTitle: "{b["challengeTitle"]}",')
    lines.append(f'  challengeDesc: "{b["challengeDesc"]}",')
    lines.append(f'  comingSoon: "{b["comingSoon"]}",')
    lines.append(f'  comingSoonDesc: "{b["comingSoonDesc"]}",')
    lines.append(f'  boredTitle: "{b["boredTitle"]}",')
    lines.append(f'  boredDesc: "{b["boredDesc"]}",')
    lines.append(" },")
    return "\n".join(lines)


def build_wordlengths_faq(items):
    lines = ["  wordlengths: ["]
    for q, a in items:
        q_esc = q.replace('"', '\\"')
        a_esc = a.replace('"', '\\"')
        lines.append(f'   {{ q: "{q_esc}", a: "{a_esc}" }},')
    lines.append("  ],")
    return "\n".join(lines)


def main():
    text = PATH.read_text(encoding="utf-8")
    original = text
    for lang, data in LANGS.items():
        # 1. Nav: add wordlengths after wordlists nav string
        old_nav = data["wordlists_nav_str"]
        new_nav = old_nav.replace("wordstarts:", f'wordlengths: "{data["nav_wordlengths"]}", wordstarts:')
        if old_nav == new_nav:
            raise RuntimeError(f"[{lang}] nav pattern unchanged")
        if text.count(old_nav) != 1:
            raise RuntimeError(f"[{lang}] nav pattern appears {text.count(old_nav)} times (expected 1)")
        text = text.replace(old_nav, new_nav)

        # 2. wordlists block: append wordPages + blitz after the wordlists block
        marker = data["wordlists_block_marker"]
        if text.count(marker) != 1:
            raise RuntimeError(f"[{lang}] wordlists marker appears {text.count(marker)} times (expected 1)")
        insertion = "\n" + build_wordPages_block(data["wordPages"]) + "\n" + build_blitz_block(data["blitz"])
        text = text.replace(marker, marker + insertion, 1)

        # 3. FAQ: insert wordlengths list after wordlists FAQ block.
        # Find the FIRST occurrence of `  wordlists: [` AFTER the start of this language.
        # Easier: find the wordstarts FAQ block `  wordstarts: [` and insert wordlengths before it.
        # But wordstarts: [ appears in each language — so we need to insert after the wordlists FAQ block.
        # The wordlists FAQ items contain language-specific text. Use the LAST item (4th) as the marker:
        last_q, last_a = data["faq_wordlengths"][-1] if False else None, None
        # Simpler: use the wordstarts FAQ start marker preceded by the language-specific wordlists FAQ closing.
        # We'll find the first `  wordstarts: [` after the language's nav marker.
        nav_idx = text.find(new_nav)
        ws_faq_idx = text.find("  wordstarts: [", nav_idx)
        if ws_faq_idx == -1:
            raise RuntimeError(f"[{lang}] wordstarts FAQ not found after nav")
        # back up to find the closing `  ],` of the wordlists FAQ block.
        # The pattern is: ...item },\n  ],\n  wordstarts: [
        # We want to insert `  wordlengths: [...],\n` before `  wordstarts: [`.
        faq_block = build_wordlengths_faq(data["faq_wordlengths"]) + "\n"
        text = text[:ws_faq_idx] + faq_block + text[ws_faq_idx:]

    if text == original:
        raise RuntimeError("No changes were made")
    PATH.write_text(text, encoding="utf-8")
    print("OK — translations.ts updated.")


if __name__ == "__main__":
    main()
