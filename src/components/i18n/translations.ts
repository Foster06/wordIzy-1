// src/components/i18n/translations.ts
// UI translations for WordIzy. `t()` falls back to English if a key is missing.

import type { LanguageCode } from "@/lib/languages";

export type Translation = {
  nav: {
    unscrambler: string; scramble: string; wordle: string; quordle: string;
    anagram: string; random: string; wordfeud: string; dictionary: string;
    scrabble: string; wordlists: string; wordstarts: string; wordends: string; about: string; contact: string;
    privacy: string; sitemap: string; tools: string; more: string;
    solvers: string; site: string; wordlab: string;
  };
  brand: { name: string; tagline: string };
  common: {
    yourLetters: string; unscramble: string; clear: string; advancedFilters: string;
    startsWith: string; endsWith: string; mustInclude: string; dictionaryLabel: string;
    results: string; noResults: string; wordsFound: string; points: string; length: string;
    loading: string; search: string; copy: string; copied: string; tryExamples: string;
    tipsTitle: string; tileValues: string; blanks: string; languageLabel: string;
    showMore: string; showLess: string; allWords: string; perGroup: string;
    wordsCount: string; reset: string; apply: string; solve: string; generate: string;
    check: string; example: string; none: string; optional: string;
  };
  home: {
    title: string; subtitle: string; heroBadge: string;
    faqTitle: string;
    q1: string; a1: string; q2: string; a2: string; q3: string; a3: string;
    q4: string; a4: string;
  };
  scramble: { title: string; subtitle: string; inputLabel: string; btn: string; solutionLabel: string; hint: string };
  wordle: { title: string; subtitle: string; length: string; placed: string; valid: string; excluded: string; btn: string; hint: string };
  quordle: { title: string; subtitle: string; board: string; addBoard: string; hint: string };
  anagram: { title: string; subtitle: string; btn: string; hint: string };
  random: { title: string; subtitle: string; length: string; any: string; count: string; btn: string };
  wordfeud: { title: string; subtitle: string; btn: string; hint: string };
  dictionary: { title: string; subtitle: string; btn: string; exists: string; notExists: string; definition: string; score: string; tiles: string };
  scrabble: { title: string; subtitle: string; rack: string; board: string; btn: string; hint: string };
  wordlists: {
    title: string; subtitle: string; allWords: string; startsBy: string; endsBy: string;
    letter: string; selectLength: string; selectLetter: string; browse: string;
  };
  about: { title: string; body: string };
  contact: { title: string; body: string; name: string; email: string; message: string; send: string };
  privacy: { title: string; body: string };
  sitemap: { title: string; body: string };
  footer: { rights: string; madeWith: string; links: string; desc: string };
};

const en: Translation = {
  nav: {
    unscrambler: "Unscrambler", scramble: "Scramble Solver", wordle: "Wordle Solver",
    quordle: "Quordle Solver", anagram: "Anagram Solver", random: "Random Word",
    wordfeud: "Wordfeud Helper", dictionary: "Check Dictionary", scrabble: "Scrabble Duplicate",
    wordlists: "Word Lists", wordstarts: "Starts By", wordends: "Ends By", about: "About", contact: "Contact", privacy: "Privacy",
    sitemap: "Sitemap", tools: "Tools", more: "More", solvers: "Solvers", site: "Site", wordlab: "Word Lab",
  },
  brand: { name: "WordIzy", tagline: "Unscramble. Solve. Win." },
  common: {
    yourLetters: "Your Letters", unscramble: "Unscramble", clear: "Clear", advancedFilters: "Advanced Filters",
    startsWith: "Starts with", endsWith: "Ends with", mustInclude: "Must include", dictionaryLabel: "Dictionary",
    results: "Results", noResults: "No words found. Try different letters or add wildcards (? or *).",
    wordsFound: "words found", points: "pts", length: "letters", loading: "Loading…", search: "Search",
    copy: "Copy", copied: "Copied!", tryExamples: "Try:", tipsTitle: "Tips & How it works",
    tileValues: "Scrabble Tile Values", blanks: "Blanks", languageLabel: "Language",
    showMore: "Show more", showLess: "Show less", allWords: "All words", perGroup: "per group",
    wordsCount: "words", reset: "Reset", apply: "Apply", solve: "Solve", generate: "Generate",
    check: "Check", example: "Example", none: "None", optional: "optional",
  },
  home: {
    title: "Word Unscrambler", subtitle: "Enter your scrambled letters, add wildcards with ? or *, and find every playable word — grouped by length and sorted by Scrabble score.",
    heroBadge: "Free • No sign-up • 9 languages",
    faqTitle: "Frequently asked questions",
    q1: "What is the use of a Word Unscrambler?",
    a1: "A word unscrambler takes a jumble of letters (like a Scrabble rack) and finds every valid dictionary word that can be spelled from those letters. It's ideal for Scrabble, Words With Friends, Wordfeud, crosswords and anagram puzzles — giving you the highest-scoring plays instantly.",
    q2: "How do I use the advanced options?",
    a2: "After typing your letters, open Advanced Filters. \"Starts with\" limits results to words beginning with given letters, \"Ends with\" does the same for suffixes, and \"Must include\" guarantees certain letters appear in every result. Combine these with wildcards (? or *) to replace any unknown letter.",
    q3: "How does this work?",
    a3: "WordIzy compares your letter pool against a comprehensive in-memory dictionary for the selected language. It checks which words can be formed (treating ? and * as wildcards), applies your filters, scores each word with official Scrabble letter values, then groups the results by word length — longest first.",
    q4: "Which languages are supported?",
    a4: "English, French, Spanish, Italian, Portuguese, German, Dutch, plus Japanese (romaji) and Mandarin (pinyin). Switch the dictionary from the language selector to unscramble in any of them.",
  },
  scramble: {
    title: "Word Scramble / Descrambler", subtitle: "Stuck on a jumble puzzle? Enter the scrambled letters and we'll descramble them into real words.",
    inputLabel: "Scrambled letters", btn: "Descramble", solutionLabel: "Possible solutions", hint: "Use ? or * for unknown letters.",
  },
  wordle: {
    title: "Wordle Solver", subtitle: "Narrow down today's Wordle. Enter green letters in their position, yellow letters you know are in the word, and gray letters to exclude.",
    length: "Word length", placed: "Placed letters (green)", valid: "Valid letters (yellow)", excluded: "Excluded letters (gray)", btn: "Solve", hint: "Use . or _ for empty slots, e.g. A..LE",
  },
  quordle: {
    title: "Quordle Solver", subtitle: "Solve up to four Wordle puzzles at once. Each board keeps its own constraints; shared valid/excluded letters flow between them.",
    board: "Board", addBoard: "Add board", hint: "Fill in what you know for each board, then solve.",
  },
  anagram: {
    title: "Anagram Solver", subtitle: "Find every anagram of your letters — words that use exactly all the letters you provide.",
    btn: "Find anagrams", hint: "Wildcards (? *) fill the remaining letters.",
  },
  random: {
    title: "Random Word Generator", subtitle: "Generate random real words with optional length, prefix, suffix and contains filters.",
    length: "Length", any: "Any", count: "How many", btn: "Generate",
  },
  wordfeud: {
    title: "Wordfeud Helper", subtitle: "Find the best Wordfeud words from your rack. Wordfeud uses the same multilingual dictionaries — pick yours and solve.",
    btn: "Find words", hint: "Add ? or * for blank tiles.",
  },
  dictionary: {
    title: "Check Dictionary", subtitle: "Verify whether a word exists in the selected dictionary, see its Scrabble score and read a definition.",
    btn: "Check", exists: "is a valid word", notExists: "was not found in the dictionary", definition: "Definition", score: "Scrabble score", tiles: "Letter tiles",
  },
  scrabble: {
    title: "Scrabble Duplicate", subtitle: "Duplicate Scrabble gives every player the same rack. Enter your 7 letters (plus any board letters already placed) and find the highest-scoring plays.",
    rack: "Your rack", board: "Board letters (optional)", btn: "Find best words", hint: "Wildcards supported. Results are ranked by score.",
  },
  wordlists: {
    title: "Word Lists", subtitle: "Browse every 2- to 7-letter word. Choose a view, a length and a letter to explore the dictionary A–Z.",
    allWords: "All words", startsBy: "Starts by A–Z", endsBy: "Ends by A–Z", letter: "Letter", selectLength: "Length", selectLetter: "Letter", browse: "Browse",
  },
  about: {
    title: "About WordIzy",
    body: "WordIzy is a free, privacy-friendly suite of word tools: unscrambler, anagram solver, Wordle & Quordle solvers, Scrabble and Wordfeud helpers, random word generator, dictionary checker and browsable word lists — all in 9 languages. No account, no data collection, no tracking. Just words.",
  },
  contact: { title: "Contact", body: "Have a suggestion or found a bug? Send us a message.", name: "Name", email: "Email", message: "Message", send: "Send message" },
  privacy: { title: "Privacy Policy", body: "WordIzy does not require an account and does not collect personal data. All solving happens server-side using dictionaries kept in memory; nothing you type is permanently stored. Google AdSense may use cookies to serve ads; you can manage this in your browser settings." },
  sitemap: { title: "Sitemap", body: "All pages on WordIzy." },
  footer: { rights: "All rights reserved.", madeWith: "Built for word lovers.", links: "Quick links", desc: "Free word unscrambler, anagram & puzzle solvers in 9 languages. No sign-up." },
};

const fr: Translation = {
  nav: {
    unscrambler: "Anagrammeur", scramble: "Solveur de Mélange", wordle: "Solveur Wordle",
    quordle: "Solveur Quordle", anagram: "Solveur d'Anagrammes", random: "Mot Aléatoire",
    wordfeud: "Aide Wordfeud", dictionary: "Vérifier le Dico", scrabble: "Scrabble Duplicate",
    wordlists: "Listes de Mots", wordstarts: "Commence Par", wordends: "Finit Par", about: "À propos", contact: "Contact", privacy: "Confidentialité",
    sitemap: "Plan du site", tools: "Outils", more: "Plus", solvers: "Solveurs", site: "Site", wordlab: "Labo des Mots",
  },
  brand: { name: "WordIzy", tagline: "Anagrammez. Résolvez. Gagnez." },
  common: {
    yourLetters: "Vos lettres", unscramble: "Anagrammer", clear: "Effacer", advancedFilters: "Filtres avancés",
    startsWith: "Commence par", endsWith: "Finit par", mustInclude: "Doit contenir", dictionaryLabel: "Dictionnaire",
    results: "Résultats", noResults: "Aucun mot trouvé. Essayez d'autres lettres ou ajoutez des jokers (? ou *).",
    wordsFound: "mots trouvés", points: "pts", length: "lettres", loading: "Chargement…", search: "Rechercher",
    copy: "Copier", copied: "Copié !", tryExamples: "Essayer :", tipsTitle: "Astuces & fonctionnement",
    tileValues: "Valeurs des tuiles Scrabble", blanks: "Jokers", languageLabel: "Langue",
    showMore: "Afficher plus", showLess: "Afficher moins", allWords: "Tous les mots", perGroup: "par groupe",
    wordsCount: "mots", reset: "Réinitialiser", apply: "Appliquer", solve: "Résoudre", generate: "Générer",
    check: "Vérifier", example: "Exemple", none: "Aucun", optional: "optionnel",
  },
  home: {
    title: "Anagrammeur de Mots", subtitle: "Saisissez vos lettres mélangées, ajoutez des jokers avec ? ou *, et trouvez tous les mots jouables — groupés par longueur et triés par score Scrabble.",
    heroBadge: "Gratuit • Sans inscription • 9 langues",
    faqTitle: "Questions fréquentes",
    q1: "À quoi sert un anagrammeur ?",
    a1: "Un anagrammeur prend un mélange de lettres (comme un chevalet Scrabble) et trouve tous les mots valides du dictionnaire que l'on peut écrire avec ces lettres. Idéal pour Scrabble, Wordfeud, mots croisés et puzzles d'anagrammes — les meilleurs coups instantanément.",
    q2: "Comment utiliser les options avancées ?",
    a2: "Après avoir saisi vos lettres, ouvrez les Filtres avancés. « Commence par » limite aux mots commençant par ces lettres, « Finit par » fait de même pour les suffixes, et « Doit contenir » garantit que certaines lettres apparaissent dans chaque résultat. Combinez-les avec des jokers (? ou *) pour remplacer une lettre inconnue.",
    q3: "Comment ça marche ?",
    a3: "WordIzy compare votre pool de lettres à un dictionnaire complet en mémoire pour la langue choisie. Il vérifie quels mots peuvent être formés (? et * comme jokers), applique vos filtres, score chaque mot avec les valeurs Scrabble officielles, puis regroupe les résultats par longueur — les plus longs d'abord.",
    q4: "Quelles langues sont prises en charge ?",
    a4: "Anglais, français, espagnol, italien, portugais, allemand, néerlandais, plus japonais (romaji) et mandarin (pinyin). Changez le dictionnaire depuis le sélecteur de langue.",
  },
  scramble: {
    title: "Mélangeur / Démêleur de mots", subtitle: "Bloqué sur une anagramme ? Saisissez les lettres mélangées et nous les démêlerons en vrais mots.",
    inputLabel: "Lettres mélangées", btn: "Démêler", solutionLabel: "Solutions possibles", hint: "Utilisez ? ou * pour les lettres inconnues.",
  },
  wordle: {
    title: "Solveur Wordle", subtitle: "Réduisez le Wordle du jour. Saisissez les lettres vertes à leur place, les lettres jaunes connues, et les lettres grises à exclure.",
    length: "Longueur du mot", placed: "Lettres placées (vert)", valid: "Lettres valides (jaune)", excluded: "Lettres exclues (gris)", btn: "Résoudre", hint: "Utilisez . ou _ pour les cases vides, ex. A..LE",
  },
  quordle: {
    title: "Solveur Quordle", subtitle: "Résolvez jusqu'à quatre Wordle à la fois. Chaque plateau garde ses contraintes ; les lettres valides/exclues sont partagées.",
    board: "Plateau", addBoard: "Ajouter un plateau", hint: "Remplissez ce que vous savez pour chaque plateau, puis résolvez.",
  },
  anagram: {
    title: "Solveur d'Anagrammes", subtitle: "Trouvez toutes les anagrammes de vos lettres — les mots qui utilisent exactement toutes les lettres fournies.",
    btn: "Trouver les anagrammes", hint: "Les jokers (? *) complètent les lettres manquantes.",
  },
  random: {
    title: "Générateur de Mots Aléatoires", subtitle: "Générez des mots réels aléatoires avec filtres de longueur, préfixe, suffixe et contenu.",
    length: "Longueur", any: "Toutes", count: "Combien", btn: "Générer",
  },
  wordfeud: {
    title: "Aide Wordfeud", subtitle: "Trouvez les meilleurs mots Wordfeud depuis votre chevalet. Wordfeud utilise les mêmes dictionnaires multilingues — choisissez le vôtre.",
    btn: "Trouver des mots", hint: "Ajoutez ? ou * pour les tuiles vierges.",
  },
  dictionary: {
    title: "Vérifier le Dictionnaire", subtitle: "Vérifiez si un mot existe dans le dictionnaire choisi, voyez son score Scrabble et lisez une définition.",
    btn: "Vérifier", exists: "est un mot valide", notExists: "introuvable dans le dictionnaire", definition: "Définition", score: "Score Scrabble", tiles: "Tuiles de lettres",
  },
  scrabble: {
    title: "Scrabble Duplicate", subtitle: "Le Scrabble duplicate donne le même chevalet à tous. Saisissez vos 7 lettres (plus les lettres déjà posées) et trouvez les coups les plus forts.",
    rack: "Votre chevalet", board: "Lettres du plateau (optionnel)", btn: "Trouver les meilleurs mots", hint: "Jokers autorisés. Résultats classés par score.",
  },
  wordlists: {
    title: "Listes de Mots", subtitle: "Parcourez tous les mots de 2 à 7 lettres. Choisissez une vue, une longueur et une lettre pour explorer le dictionnaire de A à Z.",
    allWords: "Tous les mots", startsBy: "Commence par A–Z", endsBy: "Finit par A–Z", letter: "Lettre", selectLength: "Longueur", selectLetter: "Lettre", browse: "Parcourir",
  },
  about: { title: "À propos de WordIzy", body: "WordIzy est une suite gratuite et respectueuse de la vie privée d'outils liés aux mots : anagrammeur, solveur d'anagrammes, solveurs Wordle & Quordle, aides Scrabble et Wordfeud, générateur de mots aléatoires, vérificateur de dictionnaire et listes de mots navigables — en 9 langues. Pas de compte, pas de collecte de données, pas de suivi." },
  contact: { title: "Contact", body: "Une suggestion ou un bug ? Envoyez-nous un message.", name: "Nom", email: "E-mail", message: "Message", send: "Envoyer" },
  privacy: { title: "Politique de confidentialité", body: "WordIzy ne nécessite pas de compte et ne collecte pas de données personnelles. Toute la résolution se fait côté serveur avec des dictionnaires en mémoire ; rien de ce que vous tapez n'est stocké. Google AdSense peut utiliser des cookies pour diffuser des annonces ; gérez-le dans les réglages de votre navigateur." },
  sitemap: { title: "Plan du site", body: "Toutes les pages de WordIzy." },
  footer: { rights: "Tous droits réservés.", madeWith: "Conçu pour les amoureux des mots.", links: "Liens rapides", desc: "Anagrammeur et solveurs de puzzles gratuits en 9 langues. Sans inscription." },
};

const es: Translation = {
  nav: {
    unscrambler: "Desordenador", scramble: "Sol. Mezcla", wordle: "Sol. Wordle",
    quordle: "Sol. Quordle", anagram: "Sol. Anagramas", random: "Palabra Aleatoria",
    wordfeud: "Ayuda Wordfeud", dictionary: "Ver Diccionario", scrabble: "Scrabble Duplicate",
    wordlists: "Listas de Palabras", wordstarts: "Empieza Por", wordends: "Termina En", about: "Acerca de", contact: "Contacto", privacy: "Privacidad",
    sitemap: "Mapa del sitio", tools: "Herramientas", more: "Más", solvers: "Solucionadores", site: "Sitio", wordlab: "Lab de Palabras",
  },
  brand: { name: "WordIzy", tagline: "Desordena. Resuelve. Gana." },
  common: {
    yourLetters: "Tus letras", unscramble: "Desordenar", clear: "Borrar", advancedFilters: "Filtros avanzados",
    startsWith: "Empieza por", endsWith: "Termina en", mustInclude: "Debe incluir", dictionaryLabel: "Diccionario",
    results: "Resultados", noResults: "No se encontraron palabras. Prueba otras letras o añade comodines (? o *).",
    wordsFound: "palabras encontradas", points: "pts", length: "letras", loading: "Cargando…", search: "Buscar",
    copy: "Copiar", copied: "¡Copiado!", tryExamples: "Probar:", tipsTitle: "Consejos y funcionamiento",
    tileValues: "Valores de fichas Scrabble", blanks: "Comodines", languageLabel: "Idioma",
    showMore: "Mostrar más", showLess: "Mostrar menos", allWords: "Todas las palabras", perGroup: "por grupo",
    wordsCount: "palabras", reset: "Reiniciar", apply: "Aplicar", solve: "Resolver", generate: "Generar",
    check: "Comprobar", example: "Ejemplo", none: "Ninguno", optional: "opcional",
  },
  home: {
    title: "Desordenador de Palabras", subtitle: "Introduce tus letras mezcladas, añade comodines con ? o *, y encuentra cada palabra jugable — agrupada por longitud y ordenada por puntuación Scrabble.",
    heroBadge: "Gratis • Sin registro • 9 idiomas",
    faqTitle: "Preguntas frecuentes",
    q1: "¿Para qué sirve un desordenador de palabras?",
    a1: "Un desordenador toma un grupo de letras (como un atril de Scrabble) y encuentra todas las palabras válidas del diccionario que pueden formarse con esas letras. Ideal para Scrabble, Wordfeud, crucigramas y puzzles de anagramas.",
    q2: "¿Cómo uso las opciones avanzadas?",
    a2: "Tras escribir tus letras, abre Filtros avanzados. «Empieza por» limita a palabras que comienzan con esas letras, «Termina en» hace lo mismo con sufijos, y «Debe incluir» garantiza que ciertas letras aparezcan en cada resultado. Combínalo con comodines (? o *) para letras desconocidas.",
    q3: "¿Cómo funciona?",
    a3: "WordIzy compara tu pool de letras con un diccionario completo en memoria para el idioma elegido. Comprueba qué palabras pueden formarse (? y * como comodines), aplica tus filtros, puntúa cada palabra con los valores oficiales Scrabble y agrupa los resultados por longitud — las más largas primero.",
    q4: "¿Qué idiomas están soportados?",
    a4: "Inglés, francés, español, italiano, portugués, alemán, neerlandés, además de japonés (romaji) y mandarín (pinyin). Cambia el dicionario desde el selector de idioma.",
  },
  scramble: { title: "Mezclador / Sol. de palabras", subtitle: "¿Atascado en un puzzle? Introduce las letras mezcladas y las resolveremos en palabras reales.", inputLabel: "Letras mezcladas", btn: "Resolver", solutionLabel: "Soluciones posibles", hint: "Usa ? o * para letras desconocidas." },
  wordle: { title: "Sol. Wordle", subtitle: "Acota el Wordle de hoy. Introduce letras verdes en su posición, letras amarillas conocidas y letras grises a excluir.", length: "Longitud", placed: "Letras colocadas (verde)", valid: "Letras válidas (amarillo)", excluded: "Letras excluidas (gris)", btn: "Resolver", hint: "Usa . o _ para huecos, ej. A..LE" },
  quordle: { title: "Sol. Quordle", subtitle: "Resuelve hasta cuatro Wordle a la vez. Cada tablero guarda sus restricciones; las letras válidas/excluidas se comparten.", board: "Tablero", addBoard: "Añadir tablero", hint: "Rellena lo que sepas de cada tablero y resuelve." },
  anagram: { title: "Sol. de Anagramas", subtitle: "Encuentra todos los anagramas de tus letras — palabras que usan exactamente todas las letras.", btn: "Buscar anagramas", hint: "Los comodines (? *) rellenan letras." },
  random: { title: "Generador de Palabras Aleatorias", subtitle: "Genera palabras reales al azar con filtros de longitud, prefijo, sufijo y contenido.", length: "Longitud", any: "Cualquiera", count: "Cuántas", btn: "Generar" },
  wordfeud: { title: "Ayuda Wordfeud", subtitle: "Encuentra las mejores palabras de Wordfeud desde tu atril. Elige tu diccionario y resuelve.", btn: "Buscar palabras", hint: "Añade ? o * para fichas en blanco." },
  dictionary: { title: "Ver Diccionario", subtitle: "Comprueba si una palabra existe en el diccionario, mira su puntuación Scrabble y lee una definición.", btn: "Comprobar", exists: "es una palabra válida", notExists: "no se encontró en el diccionario", definition: "Definición", score: "Puntuación Scrabble", tiles: "Fichas" },
  scrabble: { title: "Scrabble Duplicate", subtitle: "El Scrabble duplicate da el mismo atril a todos. Introduce tus 7 letras (y las del tablero) y encuentra las mejores jugadas.", rack: "Tu atril", board: "Letras del tablero (opcional)", btn: "Buscar mejores palabras", hint: "Comodines permitidos. Resultados por puntuación." },
  wordlists: { title: "Listas de Palabras", subtitle: "Explora todas las palabras de 2 a 7 letras. Elige vista, longitud y letra para navegar A–Z.", allWords: "Todas las palabras", startsBy: "Empieza por A–Z", endsBy: "Termina en A–Z", letter: "Letra", selectLength: "Longitud", selectLetter: "Letra", browse: "Explorar" },
  about: { title: "Acerca de WordIzy", body: "WordIzy es una suite gratuita y respetuosa con la privacidad de herramientas de palabras: desordenador, sol. de anagramas, Wordle y Quordle, ayudas Scrabble y Wordfeud, generador aleatorio, verificador de diccionario y listas navegables — en 9 idiomas. Sin cuenta, sin recogida de datos, sin rastreo." },
  contact: { title: "Contacto", body: "¿Sugerencia o error? Envíanos un mensaje.", name: "Nombre", email: "Correo", message: "Mensaje", send: "Enviar" },
  privacy: { title: "Política de privacidad", body: "WordIzy no requiere cuenta ni recoge datos personales. Toda la resolución ocurre en el servidor con diccionarios en memoria; nada de lo que escribes se almacena. Google AdSense puede usar cookies para anuncios; gestiónalo en tu navegador." },
  sitemap: { title: "Mapa del sitio", body: "Todas las páginas de WordIzy." },
  footer: { rights: "Todos los derechos reservados.", madeWith: "Hecho para amantes de las palabras.", links: "Enlaces rápidos", desc: "Desordenador y resolvedores gratuitos en 9 idiomas. Sin registro." },
};

const de: Translation = {
  nav: {
    unscrambler: "Entwirker", scramble: "Misch-Löser", wordle: "Wordle-Löser",
    quordle: "Quordle-Löser", anagram: "Anagramm-Löser", random: "Zufallswort",
    wordfeud: "Wordfeud-Hilfe", dictionary: "Wörterbuch", scrabble: "Scrabble Duplicate",
    wordlists: "Wortlisten", wordstarts: "Beginnt Mit", wordends: "Endet Mit", about: "Über", contact: "Kontakt", privacy: "Datenschutz",
    sitemap: "Sitemap", tools: "Werkzeuge", more: "Mehr", solvers: "Löser", site: "Seite", wordlab: "Wort-Labor",
  },
  brand: { name: "WordIzy", tagline: "Entwirren. Lösen. Gewinnen." },
  common: {
    yourLetters: "Deine Buchstaben", unscramble: "Entwirren", clear: "Löschen", advancedFilters: "Erweiterte Filter",
    startsWith: "Beginnt mit", endsWith: "Endet mit", mustInclude: "Muss enthalten", dictionaryLabel: "Wörterbuch",
    results: "Ergebnisse", noResults: "Keine Wörter gefunden. Andere Buchstaben oder Platzhalter (? oder *) versuchen.",
    wordsFound: "Wörter gefunden", points: "Pkt", length: "Buchstaben", loading: "Lädt…", search: "Suchen",
    copy: "Kopieren", copied: "Kopiert!", tryExamples: "Testen:", tipsTitle: "Tipps & Funktionsweise",
    tileValues: "Scrabble-Steinwerte", blanks: "Blankos", languageLabel: "Sprache",
    showMore: "Mehr anzeigen", showLess: "Weniger", allWords: "Alle Wörter", perGroup: "pro Gruppe",
    wordsCount: "Wörter", reset: "Zurücksetzen", apply: "Anwenden", solve: "Lösen", generate: "Generieren",
    check: "Prüfen", example: "Beispiel", none: "Keine", optional: "optional",
  },
  home: {
    title: "Wort-Entwirker", subtitle: "Gib deine gemischten Buchstaben ein, füge Platzhalter mit ? oder * hinzu und finde jedes spielbare Wort — nach Länge gruppiert und nach Scrabble-Punktzahl sortiert.",
    heroBadge: "Kostenlos • Keine Anmeldung • 9 Sprachen",
    faqTitle: "Häufige Fragen",
    q1: "Wozu dient ein Wort-Entwirker?",
    a1: "Ein Entwirker nimmt Buchstaben (wie ein Scrabble-Gestell) und findet jedes gültige Wörterbuchwort, das sich daraus bilden lässt. Ideal für Scrabble, Wordfeud, Kreuzworträtsel und Anagramm-Puzzles.",
    q2: "Wie nutze ich die erweiterten Optionen?",
    a2: "Öffne nach der Eingabe die Erweiterten Filter. „Beginnt mit“ beschränkt auf Wörter mit diesem Präfix, „Endet mit“ auf Suffixe, „Muss enthalten“ garantiert bestimmte Buchstaben. Mit Platzhaltern (? oder *) ersetzt du unbekannte Buchstaben.",
    q3: "Wie funktioniert das?",
    a3: "WordIzy vergleicht deinen Buchstabenpool mit einem vollständigen Wörterbuch im Speicher für die gewählte Sprache, prüft welche Wörter bildbar sind (? und * als Platzhalter), wendet deine Filter an, bewertet jedes Wort mit offiziellen Scrabble-Werten und gruppiert die Ergebnisse nach Länge — längste zuerst.",
    q4: "Welche Sprachen werden unterstützt?",
    a4: "Englisch, Französisch, Spanisch, Italienisch, Portugiesisch, Deutsch, Niederländisch sowie Japanisch (Romaji) und Mandarin (Pinyin). Wechsle das Wörterbuch über die Sprachauswahl.",
  },
  scramble: { title: "Wort-Mischer / -Löser", subtitle: "Bei einem Misch-Rätsel festgefahren? Buchstaben eingeben und in echte Wörter aufgelöst.", inputLabel: "Gemischte Buchstaben", btn: "Auflösen", solutionLabel: "Mögliche Lösungen", hint: "? oder * für unbekannte Buchstaben." },
  wordle: { title: "Wordle-Löser", subtitle: "Das heutige Wordle eingrenzen: grüne Buchstaben an Position, gelbe bekannte, graue ausschließen.", length: "Wortlänge", placed: "Platzierte (grün)", valid: "Gültige (gelb)", excluded: "Ausgeschlossene (grau)", btn: "Lösen", hint: ". oder _ für Leerstellen, z. B. A..LE" },
  quordle: { title: "Quordle-Löser", subtitle: "Bis zu vier Wordle gleichzeitig lösen. Jedes Brett behält eigene Bedingungen.", board: "Brett", addBoard: "Brett hinzufügen", hint: "Fülle aus, was du weißt, und löse." },
  anagram: { title: "Anagramm-Löser", subtitle: "Finde jedes Anagramm deiner Buchstaben — Wörter, die genau alle Buchstaben nutzen.", btn: "Anagramme finden", hint: "Platzhalter (? *) füllen auf." },
  random: { title: "Zufallswort-Generator", subtitle: "Zufällige echte Wörter mit Längen-, Präfix-, Suffix- und Inhaltsfiltern.", length: "Länge", any: "Beliebig", count: "Wie viele", btn: "Generieren" },
  wordfeud: { title: "Wordfeud-Hilfe", subtitle: "Finde die besten Wordfeud-Wörter aus deinem Gestell. Wähle dein Wörterbuch.", btn: "Wörter finden", hint: "? oder * für Blankos." },
  dictionary: { title: "Wörterbuch prüfen", subtitle: "Prüfe, ob ein Wort existiert, sieh Scrabble-Punkte und eine Definition.", btn: "Prüfen", exists: "ist ein gültiges Wort", notExists: "nicht im Wörterbuch gefunden", definition: "Definition", score: "Scrabble-Punkte", tiles: "Buchstabensteine" },
  scrabble: { title: "Scrabble Duplicate", subtitle: "Duplicate gibt allen dasselbe Gestell. 7 Buchstaben (plus Brett-Buchstaben) eingeben und die besten Züge finden.", rack: "Dein Gestell", board: "Brett-Buchstaben (optional)", btn: "Beste Wörter finden", hint: "Platzhalter erlaubt. Nach Punkten sortiert." },
  wordlists: { title: "Wortlisten", subtitle: "Alle 2- bis 7-Buchstaben-Wörter durchsuchen. Ansicht, Länge und Buchstabe wählen, A–Z erkunden.", allWords: "Alle Wörter", startsBy: "Beginnt mit A–Z", endsBy: "Endet mit A–Z", letter: "Buchstabe", selectLength: "Länge", selectLetter: "Buchstabe", browse: "Durchsuchen" },
  about: { title: "Über WordIzy", body: "WordIzy ist eine kostenlose, datenschutzfreundliche Werkzeugsammlung: Entwirker, Anagramm-Löser, Wordle- & Quordle-Löser, Scrabble- und Wordfeud-Hilfen, Zufallsgenerator, Wörterbuch-Prüfer und durchsuchbare Wortlisten — in 9 Sprachen. Kein Konto, keine Datenerfassung." },
  contact: { title: "Kontakt", body: "Vorschlag oder Bug? Schreib uns.", name: "Name", email: "E-Mail", message: "Nachricht", send: "Senden" },
  privacy: { title: "Datenschutzerklärung", body: "WordIzy benötigt kein Konto und erfasst keine personenbezogenen Daten. Die Lösung erfolgt serverseitig mit Wörterbüchern im Speicher; nichts wird gespeichert. Google AdSense kann Cookies nutzen; verwalte dies im Browser." },
  sitemap: { title: "Sitemap", body: "Alle Seiten von WordIzy." },
  footer: { rights: "Alle Rechte vorbehalten.", madeWith: "Für Wortliebhaber gemacht.", links: "Schnelllinks", desc: "Kostenloser Entwirker und Löser in 9 Sprachen. Ohne Anmeldung." },
};

const it: Translation = {
  nav: {
    unscrambler: "Anagrammatore", scramble: "Ris. Mischia", wordle: "Ris. Wordle",
    quordle: "Ris. Quordle", anagram: "Ris. Anagrammi", random: "Parola Casuale",
    wordfeud: "Aiuto Wordfeud", dictionary: "Verifica Diz.", scrabble: "Scrabble Duplicate",
    wordlists: "Liste Parole", wordstarts: "Inizia Per", wordends: "Finisce Per", about: "Info", contact: "Contatti", privacy: "Privacy",
    sitemap: "Mappa", tools: "Strumenti", more: "Altro", solvers: "Risolutori", site: "Sito", wordlab: "Lab delle Parole",
  },
  brand: { name: "WordIzy", tagline: "Riordina. Risolvi. Vinci." },
  common: {
    yourLetters: "Le tue lettere", unscramble: "Anagramma", clear: "Pulisci", advancedFilters: "Filtri avanzati",
    startsWith: "Inizia per", endsWith: "Finisce per", mustInclude: "Deve contenere", dictionaryLabel: "Dizionario",
    results: "Risultati", noResults: "Nessuna parola. Prova altre lettere o aggiungi jolly (? o *).",
    wordsFound: "parole trovate", points: "pt", length: "lettere", loading: "Caricamento…", search: "Cerca",
    copy: "Copia", copied: "Copiato!", tryExamples: "Prova:", tipsTitle: "Suggerimenti e funzionamento",
    tileValues: "Valori tessere Scrabble", blanks: "Jolly", languageLabel: "Lingua",
    showMore: "Mostra di più", showLess: "Mostra meno", allWords: "Tutte le parole", perGroup: "per gruppo",
    wordsCount: "parole", reset: "Reimposta", apply: "Applica", solve: "Risolvi", generate: "Genera",
    check: "Verifica", example: "Esempio", none: "Nessuno", optional: "facoltativo",
  },
  home: {
    title: "Anagrammatore di Parole", subtitle: "Inserisci le lettere mescolate, aggiungi jolly con ? o *, e trova ogni parola giocabile — raggruppata per lunghezza e ordinata per punteggio Scrabble.",
    heroBadge: "Gratis • Senza registrazione • 9 lingue",
    faqTitle: "Domande frequenti",
    q1: "A cosa serve un anagrammatore?",
    a1: "Prende un insieme di lettere (come una rastrelliera Scrabble) e trova ogni parola valida del dizionario formabile con quelle lettere. Ideale per Scrabble, Wordfeud, cruciverba e puzzle di anagrammi.",
    q2: "Come uso le opzioni avanzate?",
    a2: "Dopo aver digitato le lettere, apri Filtri avanzati. «Inizia per» limita alle parole con quel prefisso, «Finisce per» ai suffissi, «Deve contenere» garantisce certe lettere. Combina con jolly (? o *) per lettere ignote.",
    q3: "Come funziona?",
    a3: "WordIzy confronta le tue lettere con un dizionario completo in memoria per la lingua scelta, verifica quali parole sono formabili (? e * come jolly), applica i filtri, assegna il punteggio Scrabble ufficiale e raggruppa per lunghezza — prima le più lunghe.",
    q4: "Quali lingue sono supportate?",
    a4: "Inglese, francese, spagnolo, italiano, portoghese, tedesco, olandese, più giapponese (romaji) e mandarino (pinyin). Cambia dizionario dal selettore lingua.",
  },
  scramble: { title: "Mischia / Risolvi parole", subtitle: "Bloccato in un puzzle? Inserisci le lettere mescolate e le risolveremo in parole reali.", inputLabel: "Lettere mescolate", btn: "Risolvi", solutionLabel: "Soluzioni possibili", hint: "Usa ? o * per lettere ignote." },
  wordle: { title: "Ris. Wordle", subtitle: "Restringi il Wordle di oggi: lettere verdi in posizione, gialle note, grigie da escludere.", length: "Lunghezza", placed: "Posizionate (verde)", valid: "Valide (giallo)", excluded: "Escluse (grigio)", btn: "Risolvi", hint: "Usa . o _ per spazi, es. A..LE" },
  quordle: { title: "Ris. Quordle", subtitle: "Risolvi fino a quattro Wordle insieme. Ogni tabellone ha i suoi vincoli.", board: "Tabellone", addBoard: "Aggiungi tabellone", hint: "Compila ciò che sai e risolvi." },
  anagram: { title: "Ris. Anagrammi", subtitle: "Trova ogni anagramma delle tue lettere — parole che usano esattamente tutte le lettere.", btn: "Trova anagrammi", hint: "I jolly (? *) completano." },
  random: { title: "Generatore di Parole Casuali", subtitle: "Genera parole reali casuali con filtri di lunghezza, prefisso, suffisso e contenuto.", length: "Lunghezza", any: "Qualsiasi", count: "Quante", btn: "Genera" },
  wordfeud: { title: "Aiuto Wordfeud", subtitle: "Trova le migliori parole Wordfeud dalla tua rastrelliera. Scegli il dizionario.", btn: "Trova parole", hint: "Aggiungi ? o * per tessere vuote." },
  dictionary: { title: "Verifica Dizionario", subtitle: "Verifica se una parola esiste, vedi il punteggio Scrabble e una definizione.", btn: "Verifica", exists: "è una parola valida", notExists: "non trovata nel dizionario", definition: "Definizione", score: "Punteggio Scrabble", tiles: "Tessere" },
  scrabble: { title: "Scrabble Duplicate", subtitle: "Il duplicate dà a tutti la stessa rastrelliera. Inserisci 7 lettere (più quelle in tabellone) e trova le mosse migliori.", rack: "La tua rastrelliera", board: "Lettere tabellone (facoltative)", btn: "Trova le migliori", hint: "Jolly ammessi. Risultati per punteggio." },
  wordlists: { title: "Liste Parole", subtitle: "Sfoglia tutte le parole da 2 a 7 lettere. Scegli vista, lunghezza e lettera per esplorare A–Z.", allWords: "Tutte le parole", startsBy: "Inizia per A–Z", endsBy: "Finisce per A–Z", letter: "Lettera", selectLength: "Lunghezza", selectLetter: "Lettera", browse: "Sfoglia" },
  about: { title: "Info su WordIzy", body: "WordIzy è una suite gratuita e rispettosa della privacy: anagrammatore, ris. anagrammi, Wordle e Quordle, aiuti Scrabble e Wordfeud, generatore casuale, verificatore di dizionario e liste sfogliabili — in 9 lingue. Nessun account, nessuna raccolta dati." },
  contact: { title: "Contatti", body: "Suggerimento o bug? Scrivici.", name: "Nome", email: "Email", message: "Messaggio", send: "Invia" },
  privacy: { title: "Informativa sulla privacy", body: "WordIzy non richiede account né raccoglie dati personali. La risoluzione avviene lato server con dizionari in memoria; nulla viene memorizzato. Google AdSense può usare cookie; gestiscili nel browser." },
  sitemap: { title: "Mappa del sito", body: "Tutte le pagine di WordIzy." },
  footer: { rights: "Tutti i diritti riservati.", madeWith: "Fatto per gli amanti delle parole.", links: "Link rapidi", desc: "Anagrammatore e risolutori gratuiti in 9 lingue. Senza registrazione." },
};

const pt: Translation = {
  nav: {
    unscrambler: "Descodificador", scramble: "Sol. Mistura", wordle: "Sol. Wordle",
    quordle: "Sol. Quordle", anagram: "Sol. Anagramas", random: "Palavra Aleatória",
    wordfeud: "Ajuda Wordfeud", dictionary: "Verificar Dicio.", scrabble: "Scrabble Duplicate",
    wordlists: "Listas de Palavras", wordstarts: "Começa Por", wordends: "Termina Em", about: "Sobre", contact: "Contato", privacy: "Privacidade",
    sitemap: "Mapa do site", tools: "Ferramentas", more: "Mais", solvers: "Solucionadores", site: "Site", wordlab: "Lab de Palavras",
  },
  brand: { name: "WordIzy", tagline: "Descodifica. Resolve. Vence." },
  common: {
    yourLetters: "Suas letras", unscramble: "Descodificar", clear: "Limpar", advancedFilters: "Filtros avançados",
    startsWith: "Começa por", endsWith: "Termina em", mustInclude: "Deve conter", dictionaryLabel: "Dicionário",
    results: "Resultados", noResults: "Nenhuma palavra. Tente outras letras ou curingas (? ou *).",
    wordsFound: "palavras encontradas", points: "pts", length: "letras", loading: "Carregando…", search: "Buscar",
    copy: "Copiar", copied: "Copiado!", tryExamples: "Testar:", tipsTitle: "Dicas e funcionamento",
    tileValues: "Valores das fichas Scrabble", blanks: "Curingas", languageLabel: "Idioma",
    showMore: "Mostrar mais", showLess: "Mostrar menos", allWords: "Todas as palavras", perGroup: "por grupo",
    wordsCount: "palavras", reset: "Redefinir", apply: "Aplicar", solve: "Resolver", generate: "Gerar",
    check: "Verificar", example: "Exemplo", none: "Nenhum", optional: "opcional",
  },
  home: {
    title: "Descodificador de Palavras", subtitle: "Digite suas letras misturadas, adicione curingas com ? ou *, e encontre todas as palavras jogáveis — agrupadas por tamanho e ordenadas por pontos Scrabble.",
    heroBadge: "Grátis • Sem cadastro • 9 idiomas",
    faqTitle: "Perguntas frequentes",
    q1: "Para que serve um descodificador de palavras?",
    a1: "Pega num conjunto de letras (como um suporte Scrabble) e encontra todas as palavras válidas do dicionário formáveis com essas letras. Ideal para Scrabble, Wordfeud, palavras-cruzadas e anagramas.",
    q2: "Como uso as opções avançadas?",
    a2: "Após digitar as letras, abra Filtros avançados. «Começa por» limita a palavras com esse prefixo, «Termina em» a sufixos, «Deve conter» garante certas letras. Combine com curingas (? ou *) para letras desconhecidas.",
    q3: "Como funciona?",
    a3: "O WordIzy compara suas letras com um dicionário completo em memória para o idioma escolhido, verifica quais palavras são formáveis (? e * como curingas), aplica filtros, pontua cada palavra com valores oficiais Scrabble e agrupa por tamanho — maiores primeiro.",
    q4: "Quais idiomas são suportados?",
    a4: "Inglês, francês, espanhol, italiano, português, alemão, neerlandês, mais japonês (romaji) e mandarim (pinyin). Troque o dicionário no seletor de idioma.",
  },
  scramble: { title: "Misturador / Sol. de palavras", subtitle: "Travado num anagrama? Digite as letras misturadas e as resolveremos em palavras reais.", inputLabel: "Letras misturadas", btn: "Resolver", solutionLabel: "Soluções possíveis", hint: "Use ? ou * para letras desconhecidas." },
  wordle: { title: "Sol. Wordle", subtitle: "Reduza o Wordle de hoje: letras verdes na posição, amarelas conhecidas, cinzas a excluir.", length: "Tamanho", placed: "Posicionadas (verde)", valid: "Válidas (amarelo)", excluded: "Excluídas (cinza)", btn: "Resolver", hint: "Use . ou _ para espaços, ex. A..LE" },
  quordle: { title: "Sol. Quordle", subtitle: "Resolva até quatro Wordle ao mesmo tempo. Cada tabuleiro tem suas restrições.", board: "Tabuleiro", addBoard: "Adicionar tabuleiro", hint: "Preencha o que souber e resolva." },
  anagram: { title: "Sol. Anagramas", subtitle: "Encontre todos os anagramas das suas letras — palavras que usam exatamente todas as letras.", btn: "Encontrar anagramas", hint: "Curingas (? *) completam." },
  random: { title: "Gerador de Palavras Aleatórias", subtitle: "Gere palavras reais aleatórias com filtros de tamanho, prefixo, sufixo e conteúdo.", length: "Tamanho", any: "Qualquer", count: "Quantas", btn: "Gerar" },
  wordfeud: { title: "Ajuda Wordfeud", subtitle: "Encontre as melhores palavras Wordfeud do seu suporte. Escolha o dicionário.", btn: "Encontrar palavras", hint: "Adicione ? ou * para fichas vazias." },
  dictionary: { title: "Verificar Dicionário", subtitle: "Verifique se uma palavra existe, veja a pontuação Scrabble e uma definição.", btn: "Verificar", exists: "é uma palavra válida", notExists: "não encontrada no dicionário", definition: "Definição", score: "Pontuação Scrabble", tiles: "Fichas" },
  scrabble: { title: "Scrabble Duplicate", subtitle: "O duplicate dá o mesmo suporte a todos. Digite 7 letras (e as do tabuleiro) e encontre as melhores jogadas.", rack: "Seu suporte", board: "Letras do tabuleiro (opcional)", btn: "Encontrar melhores", hint: "Curingas permitidos. Por pontuação." },
  wordlists: { title: "Listas de Palavras", subtitle: "Navegue por todas as palavras de 2 a 7 letras. Escolha vista, tamanho e letra para explorar A–Z.", allWords: "Todas as palavras", startsBy: "Começa por A–Z", endsBy: "Termina em A–Z", letter: "Letra", selectLength: "Tamanho", selectLetter: "Letra", browse: "Navegar" },
  about: { title: "Sobre o WordIzy", body: "O WordIzy é um conjunto gratuito e respeitoso da privacidade de ferramentas: descodificador, sol. anagramas, Wordle e Quordle, ajudas Scrabble e Wordfeud, gerador aleatório, verificador de dicionário e listas navegáveis — em 9 idiomas. Sem conta, sem coleta de dados." },
  contact: { title: "Contato", body: "Sugestão ou erro? Envie uma mensagem.", name: "Nome", email: "E-mail", message: "Mensagem", send: "Enviar" },
  privacy: { title: "Política de privacidade", body: "O WordIzy não exige conta nem recolhe dados pessoais. A resolução ocorre no servidor com dicionários em memória; nada é armazenado. O Google AdSense pode usar cookies; gerencie no navegador." },
  sitemap: { title: "Mapa do site", body: "Todas as páginas do WordIzy." },
  footer: { rights: "Todos os direitos reservados.", madeWith: "Feito para amantes das palavras.", links: "Links rápidos", desc: "Descodificador e resolvedores gratuitos em 9 idiomas. Sem cadastro." },
};

const nl: Translation = {
  nav: {
    unscrambler: "Woordontwarer", scramble: "Mengoplosser", wordle: "Wordle-oplosser",
    quordle: "Quordle-oplosser", anagram: "Anagram-oplosser", random: "Willekeurig Woord",
    wordfeud: "Wordfeud-hulp", dictionary: "Woordenboek", scrabble: "Scrabble Duplicate",
    wordlists: "Woordlijsten", wordstarts: "Begint Met", wordends: "Eindigt Op", about: "Over", contact: "Contact", privacy: "Privacy",
    sitemap: "Sitemap", tools: "Hulpmiddelen", more: "Meer", solvers: "Oplossers", site: "Site", wordlab: "Woord-Lab",
  },
  brand: { name: "WordIzy", tagline: "Ontwar. Los op. Win." },
  common: {
    yourLetters: "Jouw letters", unscramble: "Ontwarren", clear: "Wissen", advancedFilters: "Geavanceerde filters",
    startsWith: "Begint met", endsWith: "Eindigt op", mustInclude: "Moet bevatten", dictionaryLabel: "Woordenboek",
    results: "Resultaten", noResults: "Geen woorden gevonden. Probeer andere letters of jokers (? of *).",
    wordsFound: "woorden gevonden", points: "pn", length: "letters", loading: "Laden…", search: "Zoeken",
    copy: "Kopiëren", copied: "Gekopieerd!", tryExamples: "Probeer:", tipsTitle: "Tips & werking",
    tileValues: "Scrabble-tegelwaarden", blanks: "Jokers", languageLabel: "Taal",
    showMore: "Meer tonen", showLess: "Minder", allWords: "Alle woorden", perGroup: "per groep",
    wordsCount: "woorden", reset: "Resetten", apply: "Toepassen", solve: "Oplossen", generate: "Genereren",
    check: "Controleren", example: "Voorbeeld", none: "Geen", optional: "optioneel",
  },
  home: {
    title: "Woordontwarer", subtitle: "Voer je door elkaar gehaalde letters in, voeg jokers toe met ? of *, en vind elk speelbaar woord — gegroepeerd op lengte en gesorteerd op Scrabble-score.",
    heroBadge: "Gratis • Geen registratie • 9 talen",
    faqTitle: "Veelgestelde vragen",
    q1: "Waarvoor dient een woordontwarer?",
    a1: "Een ontwarer neemt een stapel letters (zoals een Scrabble-rek) en vindt elk geldig woordenboekwoord dat daarmee te vormen is. Ideaal voor Scrabble, Wordfeud, kruiswoordraadsels en anagrampuzzels.",
    q2: "Hoe gebruik ik de geavanceerde opties?",
    a2: "Open na het typen Geavanceerde filters. «Begint met» beperkt tot woorden met dat voorvoegsel, «Eindigt op» tot achtervoegsels, «Moet bevatten» garandeert bepaalde letters. Combineer met jokers (? of *) voor onbekende letters.",
    q3: "Hoe werkt het?",
    a3: "WordIzy vergelijkt je letterpool met een volledig woordenboek in het geheugen voor de gekozen taal, controleert welke woorden vormbaar zijn (? en * als jokers), past je filters toe, scoort elk woord met officiële Scrabble-waarden en groepeert per lengte — langste eerst.",
    q4: "Welke talen worden ondersteund?",
    a4: "Engels, Frans, Spaans, Italiaans, Portugees, Duits, Nederlands, plus Japans (romaji) en Mandarijn (pinyin). Wissel het woordenboek via de taalkiezer.",
  },
  scramble: { title: "Woordmenger / -oplosser", subtitle: "Vastgelopen op een anagram? Voer de letters in en we lossen ze op in echte woorden.", inputLabel: "Dooreengemengde letters", btn: "Oplossen", solutionLabel: "Mogelijke oplossingen", hint: "Gebruik ? of * voor onbekende letters." },
  wordle: { title: "Wordle-oplosser", subtitle: "Verklein de Wordle van vandaag: groene letters op positie, gele bekende, grijze uit te sluiten.", length: "Woordlengte", placed: "Geplaatst (groen)", valid: "Geldig (geel)", excluded: "Uitgesloten (grijs)", btn: "Oplossen", hint: "Gebruik . of _ voor lege plekken, bijv. A..LE" },
  quordle: { title: "Quordle-oplosser", subtitle: "Los tot wel vier Wordles tegelijk op. Elk bord houdt eigen voorwaarden.", board: "Bord", addBoard: "Bord toevoegen", hint: "Vul in wat je weet en los op." },
  anagram: { title: "Anagram-oplosser", subtitle: "Vind elk anagram van je letters — woorden die exact alle letters gebruiken.", btn: "Anagrammen vinden", hint: "Jokers (? *) vullen aan." },
  random: { title: "Willekeurige Woordgenerator", subtitle: "Genereer willekeurige echte woorden met lengte-, voorvoegsel-, achtervoegsel- en bevat-filters.", length: "Lengte", any: "Elke", count: "Hoeveel", btn: "Genereren" },
  wordfeud: { title: "Wordfeud-hulp", subtitle: "Vind de beste Wordfeud-woorden vanuit je rek. Kies je woordenboek.", btn: "Woorden vinden", hint: "Voeg ? of * toe voor lege tegels." },
  dictionary: { title: "Woordenboek controleren", subtitle: "Controleer of een woord bestaat, zie de Scrabble-score en een definitie.", btn: "Controleren", exists: "is een geldig woord", notExists: "niet in woordenboek gevonden", definition: "Definitie", score: "Scrabble-score", tiles: "Lettertegels" },
  scrabble: { title: "Scrabble Duplicate", subtitle: "Duplicate geeft iedereen hetzelfde rek. Voer 7 letters in (plus bordletters) en vind de beste zetten.", rack: "Jouw rek", board: "Bordletters (optioneel)", btn: "Beste woorden vinden", hint: "Jokers toegestaan. Op score gesorteerd." },
  wordlists: { title: "Woordlijsten", subtitle: "Doorzoek alle 2- tot 7-letterwoorden. Kies weergave, lengte en letter om A–Z te verkennen.", allWords: "Alle woorden", startsBy: "Begint met A–Z", endsBy: "Eindigt op A–Z", letter: "Letter", selectLength: "Lengte", selectLetter: "Letter", browse: "Bladeren" },
  about: { title: "Over WordIzy", body: "WordIzy is een gratis, privacyvriendelijke suite woordhulpmiddelen: ontwarer, anagram-oplosser, Wordle- en Quordle-oplossers, Scrabble- en Wordfeud-hulp, willekeurigegeneratoren, woordenboekcontrole en doorzoekbare lijsten — in 9 talen. Geen account, geen gegevensverzameling." },
  contact: { title: "Contact", body: "Suggestie of bug? Stuur een bericht.", name: "Naam", email: "E-mail", message: "Bericht", send: "Versturen" },
  privacy: { title: "Privacybeleid", body: "WordIzy vereist geen account en verzamelt geen persoonsgegevens. Het oplossen gebeurt server-side met woordenboeken in het geheugen; niets wordt opgeslagen. Google AdSense kan cookies gebruiken; beheer dit in je browser." },
  sitemap: { title: "Sitemap", body: "Alle pagina's van WordIzy." },
  footer: { rights: "Alle rechten voorbehouden.", madeWith: "Gemaakt voor woordliefhebbers.", links: "Snelle links", desc: "Gratis ontwarer en oplossers in 9 talen. Zonder registratie." },
};

const ja: Translation = {
  ...en,
  nav: {
    unscrambler: "アナグラム", scramble: "ミックス解決", wordle: "Wordle解決",
    quordle: "Quordle解決", anagram: "アナグラム解決", random: "ランダム単語",
    wordfeud: "Wordfeudヘルプ", dictionary: "辞書チェック", scrabble: "スクラブル複製",
    wordlists: "単語リスト", wordstarts: "始まる", wordends: "終わる", about: "概要", contact: "お問い合わせ", privacy: "プライバシー",
    sitemap: "サイトマップ", tools: "ツール", more: "その他", solvers: "ソルバー", site: "サイト", wordlab: "ワードラボ",
  },
  brand: { name: "WordIzy", tagline: "解き、勝つ。" },
  common: {
    ...en.common,
    yourLetters: "あなたの文字", unscramble: "解決", clear: "クリア", advancedFilters: "詳細フィルター",
    startsWith: "で始まる", endsWith: "で終わる", mustInclude: "必ず含む", dictionaryLabel: "辞書",
    results: "結果", noResults: "単語が見つかりません。別の文字かワイルドカード(? *)を試してください。",
    wordsFound: "件の単語", points: "点", length: "文字", loading: "読み込み中…", search: "検索",
    copy: "コピー", copied: "コピーしました", tryExamples: "試す:", tipsTitle: "ヒントと使い方",
    tileValues: "スクラブルタイルの値", blanks: "ブランク", languageLabel: "言語",
    showMore: "もっと見る", showLess: "折りたたむ", allWords: "すべての単語", perGroup: "グループごと",
    wordsCount: "単語", reset: "リセット", apply: "適用", solve: "解決", generate: "生成",
    check: "確認", example: "例", none: "なし", optional: "任意",
  },
  home: {
    ...en.home,
    title: "ワードアナグラム", subtitle: "混ぜた文字を入力し、? または * でワイルドカードを追加して、プレイ可能なすべての単語を長さ別・スクラブル得点順で見つけます。",
    heroBadge: "無料 • 登録不要 • 9言語",
    faqTitle: "よくある質問",
    q1: "ワードアナグラムの用途は？",
    a1: "スクラブルのラックのような文字の集まりから、辞書にある有効な単語をすべて見つけます。スクラブル、Wordfeud、クロスワード、アナグラムパズルに最適です。",
    q2: "詳細オプションの使い方は？",
    a2: "文字入力後、詳細フィルターを開きます。「で始まる」は接頭辞、「で終わる」は接尾辞、「必ず含む」は必須文字を制限します。ワイルドカード(? *)と組み合わせて不明文字を補えます。",
    q3: "仕組みは？",
    a3: "WordIzyは選択言語の辞書と文字を照合し、形成可能な単語を判定し、フィルターを適用し、スクラブル得点で評価、長さ別(長い順)にグループ化します。",
    q4: "対応言語は？",
    a4: "英語、フランス語、スペイン語、イタリア語、ポルトガル語、ドイツ語、オランダ語、日本語(ローマ字)、中国語(ピンイン)。",
  },
  scramble: { title: "ミックス / 解決", subtitle: "パズルで行き詰まったら、混ぜた文字を入力してください。", inputLabel: "混ぜた文字", btn: "解決", solutionLabel: "可能な解決", hint: "? または * で不明文字。" },
  wordle: { title: "Wordle解決", subtitle: "今日のWordleを絞り込みます。緑・黄・グレーの文字を入力。", length: "長さ", placed: "配置済(緑)", valid: "有効(黄)", excluded: "除外(グレー)", btn: "解決", hint: "空欄は . または _ 例: A..LE" },
  quordle: { title: "Quordle解決", subtitle: "最大4つのWordleを同時に解きます。", board: "ボード", addBoard: "ボード追加", hint: "各ボードの情報を入力して解決。" },
  anagram: { title: "アナグラム解決", subtitle: "文字のすべてのアナグラムを見つけます。", btn: "アナグラムを見つける", hint: "ワイルドカード(? *)で補完。" },
  random: { title: "ランダム単語生成", subtitle: "長さ・接頭辞・接尾辞・含有の条件でランダムな実在単語を生成。", length: "長さ", any: "任意", count: "生成数", btn: "生成" },
  wordfeud: { title: "Wordfeudヘルプ", subtitle: "ラックから最適なWordfeud単語を探します。", btn: "単語を見つける", hint: "? または * でブランク。" },
  dictionary: { title: "辞書チェック", subtitle: "単語の存在確認、スクラブル得点、定義を表示。", btn: "確認", exists: "は有効な単語です", notExists: "は辞書に見つかりません", definition: "定義", score: "スクラブル得点", tiles: "文字タイル" },
  scrabble: { title: "スクラブル複製", subtitle: "全員同じラックの複製モード。7文字(+盤面文字)で最高得点の手を見つけます。", rack: "ラック", board: "盤面文字(任意)", btn: "最適な単語を見つける", hint: "ワイルドカード可。得点順。" },
  wordlists: { title: "単語リスト", subtitle: "2〜7文字のすべての単語を閲覧。A〜Zで探索。", allWords: "すべての単語", startsBy: "A〜Zで始まる", endsBy: "A〜Zで終わる", letter: "文字", selectLength: "長さ", selectLetter: "文字", browse: "閲覧" },
  about: { title: "WordIzyについて", body: "WordIzyは無料でプライバシー重視の単語ツール群です。アカウント不要、データ収集なし。" },
  contact: { title: "お問い合わせ", body: "ご意見やバグ報告をお送りください。", name: "名前", email: "メール", message: "メッセージ", send: "送信" },
  privacy: { title: "プライバシーポリシー", body: "WordIzyはアカウント不要で個人データを収集しません。解決はサーバー側で行われ、入力は保存されません。" },
  sitemap: { title: "サイトマップ", body: "WordIzyのすべてのページ。" },
  footer: { rights: "全著作権所有。", madeWith: "言葉を愛する人のために。", links: "クイックリンク", desc: "9言語の無料アナグラム&解決ツール。登録不要。" },
};

const zh: Translation = {
  ...en,
  nav: {
    unscrambler: "字母重组", scramble: "乱序求解", wordle: "Wordle求解",
    quordle: "Quordle求解", anagram: "易位词", random: "随机单词",
    wordfeud: "Wordfeud助手", dictionary: "查词典", scrabble: "Scrabble复刻",
    wordlists: "单词表", wordstarts: "开头", wordends: "结尾", about: "关于", contact: "联系", privacy: "隐私",
    sitemap: "网站地图", tools: "工具", more: "更多", solvers: "求解器", site: "站点", wordlab: "词汇实验室",
  },
  brand: { name: "WordIzy", tagline: "重组。求解。获胜。" },
  common: {
    ...en.common,
    yourLetters: "你的字母", unscramble: "重组", clear: "清除", advancedFilters: "高级筛选",
    startsWith: "开头为", endsWith: "结尾为", mustInclude: "必须包含", dictionaryLabel: "词典",
    results: "结果", noResults: "未找到单词。请更换字母或添加通配符(? *)。", wordsFound: "个单词",
    points: "分", length: "字母", loading: "加载中…", search: "搜索",
    copy: "复制", copied: "已复制！", tryExamples: "试试：", tipsTitle: "提示与原理",
    tileValues: "Scrabble字母分值", blanks: "空白", languageLabel: "语言",
    showMore: "显示更多", showLess: "收起", allWords: "全部单词", perGroup: "每组",
    wordsCount: "个单词", reset: "重置", apply: "应用", solve: "求解", generate: "生成",
    check: "检查", example: "示例", none: "无", optional: "可选",
  },
  home: {
    ...en.home,
    title: "单词重组器", subtitle: "输入打乱的字母，用 ? 或 * 添加通配符，找出所有可拼单词——按长度分组并按Scrabble得分排序。",
    heroBadge: "免费 • 无需注册 • 9种语言",
    faqTitle: "常见问题",
    q1: "单词重组器有什么用？",
    a1: "它接收一组字母（如Scrabble牌架），找出所有可用这些字母拼出的有效词典单词。适合Scrabble、Wordfeud、填字和易位词谜题。",
    q2: "如何使用高级选项？",
    a2: "输入字母后打开高级筛选。「开头为」限制前缀，「结尾为」限制后缀，「必须包含」确保某些字母出现。配合通配符(? *)可替代未知字母。",
    q3: "原理是什么？",
    a3: "WordIzy将你的字母与所选语言的内存词典比对，判断哪些单词可拼出（? * 作通配符），应用筛选，按官方Scrabble分值计分，并按长度分组（长词优先）。",
    q4: "支持哪些语言？",
    a4: "英语、法语、西班牙语、意大利语、葡萄牙语、德语、荷兰语，以及日语（罗马字）和普通话（拼音）。",
  },
  scramble: { title: "乱序 / 求解", subtitle: "卡在谜题上？输入乱序字母，我们还原成真实单词。", inputLabel: "乱序字母", btn: "求解", solutionLabel: "可能的解", hint: "? 或 * 表示未知字母。" },
  wordle: { title: "Wordle求解", subtitle: "缩小今日Wordle范围：输入绿色（位置）、黄色（已知）、灰色（排除）字母。", length: "长度", placed: "已放置(绿)", valid: "有效(黄)", excluded: "已排除(灰)", btn: "求解", hint: "用 . 或 _ 表示空位，如 A..LE" },
  quordle: { title: "Quordle求解", subtitle: "同时求解最多四个Wordle。每个棋盘保留各自约束。", board: "棋盘", addBoard: "添加棋盘", hint: "填写已知信息后求解。" },
  anagram: { title: "易位词求解", subtitle: "找出字母的所有易位词——恰好用完所有字母的单词。", btn: "查找易位词", hint: "通配符(? *)补全。" },
  random: { title: "随机单词生成器", subtitle: "按长度、前缀、后缀、包含条件生成随机真实单词。", length: "长度", any: "任意", count: "数量", btn: "生成" },
  wordfeud: { title: "Wordfeud助手", subtitle: "从牌架找出最佳Wordfeud单词。选择词典后求解。", btn: "查找单词", hint: "? 或 * 作空白牌。" },
  dictionary: { title: "查词典", subtitle: "验证单词是否存在，查看Scrabble得分和释义。", btn: "检查", exists: "是有效单词", notExists: "未在词典中找到", definition: "释义", score: "Scrabble得分", tiles: "字母牌" },
  scrabble: { title: "Scrabble复刻", subtitle: "复刻模式每人相同牌架。输入7个字母（加已放字母）找出最高分。", rack: "你的牌架", board: "盘面字母(可选)", btn: "找最佳单词", hint: "支持通配符。按得分排序。" },
  wordlists: { title: "单词表", subtitle: "浏览所有2到7字母单词。选择视图、长度和字母按A–Z探索。", allWords: "全部单词", startsBy: "开头A–Z", endsBy: "结尾A–Z", letter: "字母", selectLength: "长度", selectLetter: "字母", browse: "浏览" },
  about: { title: "关于 WordIzy", body: "WordIzy是一套免费、注重隐私的单词工具：重组、易位词、Wordle与Quordle求解、Scrabble与Wordfeud助手、随机生成、词典检查和可浏览单词表——支持9种语言。无需账号，不收集数据。" },
  contact: { title: "联系", body: "有建议或发现bug？给我们留言。", name: "姓名", email: "邮箱", message: "留言", send: "发送" },
  privacy: { title: "隐私政策", body: "WordIzy无需账号，不收集个人数据。所有求解在服务端用内存词典完成；输入不会被保存。Google AdSense可能使用Cookie投放广告，可在浏览器中管理。" },
  sitemap: { title: "网站地图", body: "WordIzy的全部页面。" },
  footer: { rights: "保留所有权利。", madeWith: "为词语爱好者打造。", links: "快速链接", desc: "9种语言的免费重组与求解工具。无需注册。" },
};

export const translations: Record<LanguageCode, Translation> = {
  en, fr, es, de, it, pt, nl, ja, zh,
};
