// src/lib/i18n-seo.ts
// Localized SEO metadata for the internationalized subpaths (/de/, /fr/, …).
//
// Each of the 8 non-English supported languages gets a localized variant of
// the homepage + the 19 core tool pages (the "localized surface"). Word-list
// programmatic pages, guides and /scrabble-words/* stay English-only for now;
// middleware 308-redirects any /{lang}/<other> URL to its English canonical.
//
// RULES (Bing URL Inspection, learned the hard way):
//   - descriptions: 25-160 chars, target ≤150 measured AFTER HTML-escaping
//     (& -> &amp; etc. — see scripts/verify-i18n-seo.py)
//   - titles: ≤50 chars (the "%s | wordIzy" template appends 9 more)

import type { LanguageCode } from "./languages";

/** Non-English languages that get localized subpaths. */
export const I18N_LANGS = ["de", "fr", "es", "it", "pt", "nl", "ja", "zh"] as const;
export type I18nLang = (typeof I18N_LANGS)[number];

/** The 19 tool slugs that exist under /{lang}/ (mirrors TOOL_METADATA_REGISTRY
 *  minus "unscrambler", which is the homepage alias). */
export const LOCALIZED_TOOL_SLUGS = [
  "scramble",
  "anagram",
  "wordle",
  "quordle",
  "scrabble",
  "random",
  "wordfeud",
  "dictionary",
  "wordlists",
  "wordstarts",
  "wordends",
  "wordle-starts",
  "wordle-ends",
  "about",
  "contact",
  "privacy",
  "terms",
  "sitemap",
  "blitz",
] as const;

export interface I18nToolMeta {
  title: string;
  description: string;
}

/** openGraph.locale per language (BCP47 with underscore, as OG expects). */
export const OG_LOCALES: Record<I18nLang, string> = {
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  it: "it_IT",
  pt: "pt_PT",
  nl: "nl_NL",
  ja: "ja_JP",
  zh: "zh_CN",
};

/**
 * Build the hreflang alternates cluster for a public English path
 * ("" for the homepage, "/wordle" for a tool page). Every variant —
 * English and localized — must emit the SAME reciprocal cluster.
 * Includes x-default → English.
 */
export function buildAlternates(englishPath: string): Record<string, string> {
  const enPath = englishPath || "/";
  const languages: Record<string, string> = {
    en: enPath,
    "x-default": enPath,
  };
  for (const lang of I18N_LANGS) {
    languages[lang] = `/${lang}${englishPath}`;
  }
  return languages;
}

/**
 * hreflang cluster for the scrabble-words section ONLY: English + the six
 * languages that have a localized /{lang}/scrabble-words variant (they ship a
 * Scrabble dictionary — the same source as the localized games). ja/zh have
 * no Scrabble dictionary; middleware 308s /{ja|zh}/scrabble-words to the
 * English canonical, so they must NOT appear in the cluster (an hreflang
 * entry pointing at a redirect is a soft-404 signal). Used by both the
 * English pages (reciprocity) and the six localized variants.
 */
export const SCRABBLE_WORDS_LANGS = ["de", "fr", "es", "it", "pt", "nl"] as const;

export function buildDictAlternates(englishPath: string): Record<string, string> {
  const languages: Record<string, string> = {
    en: englishPath,
    "x-default": englishPath,
  };
  for (const lang of SCRABBLE_WORDS_LANGS) {
    languages[lang] = `/${lang}${englishPath}`;
  }
  return languages;
}

// ---------------------------------------------------------------------------
// Localized title/description registry, keyed [lang][slug]. "home" is the
// localized homepage (English ""). Copy is native, keyword-rich, and written
// to satisfy the 25-160 char meta description rule.
// ---------------------------------------------------------------------------

export const I18N_SEO: Record<I18nLang, Record<string, I18nToolMeta>> = {
  de: {
    home: {
      title: "Wort-Unscrambler & Anagramm-Löser",
      description:
        "Kostenloser Wort-Unscrambler. Entwirre Buchstaben in gültige Wörter für Scrabble und Wordle. Platzhalter, 9 Sprachen, sofort.",
    },
    scramble: {
      title: "Wort-Scramble-Löser — Buchstabensalat lösen",
      description:
        "Kostenloser Scramble-Löser. Entwirre verwürfelte Buchstaben schnell in gültige Wörter. Platzhalter möglich, sofort.",
    },
    anagram: {
      title: "Anagramm-Löser — Finde alle Anagramme",
      description:
        "Kostenloser Anagramm-Löser und -Generator. Gib Wort oder Buchstaben ein und finde sofort jedes gültige Anagramm.",
    },
    wordle: {
      title: "Wordle-Löser — Helfer für das heutige Rätsel",
      description:
        "Kostenloser Wordle-Löser. Filtere nach grünen, gelben und grauen Buchstaben und finde die Lösung schnell. 4-8 Buchstaben.",
    },
    quordle: {
      title: "Quordle & Wordle Löser — 5-Buchstaben Wörter",
      description:
        "Kommst du beim Quordle oder deutschen Wordle nicht weiter? Finde sofort 5-Buchstaben-Wörter nach grünen und gelben Buchstaben mit unseren Filtern.",
    },
    scrabble: {
      title: "Scrabble-Wortfinder — Höchstpunktzahlen",
      description:
        "Scrabble-Wortfinder. Gib Rack und Buchstaben ein und finde die punktestärksten Wörter. Platzhalter, 9 Sprachen, gratis.",
    },
    random: {
      title: "Zufallswort Generator — Montagsmaler & Spiele",
      description:
        "Erstelle zufällige Wörter für Montagsmaler, Pantomime, Galgenmännchen und Schreibübungen. Filtere nach Wortlänge und Anfangsbuchstaben.",
    },
    wordfeud: {
      title: "Wordfeud Helfer — Wörter finden & Wörterbuch",
      description:
        "Finde die besten deutschen Wörter für Wordfeud mit unserem gratis Helfer. Joker-Suche, offizielle Punkteberechnung und +40 Bingo-Tipps.",
    },
    dictionary: {
      title: "Scrabble-Wörterbuch — Ist das ein Wort?",
      description:
        "Prüfe, ob ein Wort im offiziellen Scrabble-Wörterbuch gültig ist. Punkte, Definition und Synonyme sofort ansehen.",
    },
    wordlists: {
      title: "Wörter nach Länge — 2 bis 15 Buchstaben",
      description:
        "Alle gültigen Scrabble-Wörter nach Länge, von 2 bis 15 Buchstaben. Nach Punkten sortiert. Kostenlose Wortlisten.",
    },
    wordstarts: {
      title: "Wörter, die mit A bis Z beginnen",
      description:
        "Alle gültigen Wörter, die mit A bis Z beginnen, nach Scrabble-Punkten sortiert. Kostenlose Listen für Scrabble und Wordle.",
    },
    wordends: {
      title: "Wörter, die auf A bis Z enden",
      description:
        "Alle gültigen Wörter, die auf A bis Z enden. Finde Suffixe, Hooks und punktestarke Endungen. Kostenlose Wortlisten.",
    },
    "wordle-starts": {
      title: "Wordle-Wörter nach Anfangsbuchstabe A-Z",
      description:
        "Alle gültigen Wordle-Wörter nach Anfangsbuchstabe A-Z. Finde die besten Startwörter und grenze das Rätsel schnell ein.",
    },
    "wordle-ends": {
      title: "Wordle-Wörter nach Endbuchstabe A-Z",
      description:
        "Alle gültigen Wordle-Wörter nach Endbuchstabe A-Z. Finde Hooks, Suffixe und Muster, um das Rätsel zu lösen.",
    },
    about: {
      title: "Über wordIzy — Unsere Mission",
      description:
        "Erfahre mehr über wordIzy: schnelle, kostenlose Wörterwerkzeuge für Scrabble, Wordle und Kreuzworträtsel in 9 Sprachen.",
    },
    contact: {
      title: "Kontakt — Feedback und Support",
      description:
        "Hast du eine Frage oder eine Korrektur fürs Wörterbuch? Kontaktiere das wordIzy-Team direkt mit Feedback und Fehlerberichten.",
    },
    privacy: {
      title: "Datenschutzerklärung",
      description:
        "Lies die Datenschutzerklärung von wordIzy: Cookies, lokaler Speicher, Sprach- und Regionserkennung sowie Google AdSense.",
    },
    terms: {
      title: "Nutzungsbedingungen",
      description:
        "Lies die Nutzungsbedingungen von wordIzy: Richtlinien, Datenbeschränkungen, geistiges Eigentum und Hinweise zu Drittanbieter-Spielen.",
    },
    sitemap: {
      title: "Sitemap — Alle wordIzy-Werkzeuge",
      description:
        "Alle wordIzy-Seiten: Wort-Unscrambler, Anagramm-Löser, Wordle-Löser, Scrabble-Wortfinder und Wortlisten nach Länge.",
    },
    blitz: {
      title: "Anagram Blitz — Kostenloses Wortspiel",
      description:
        "Spiele Anagram Blitz gratis — ein schnelles Wortspiel mit 60 Sekunden. Tägliche Challenges, Übungsmodus, ohne Anmeldung.",
    },
  },

  fr: {
    home: {
      title: "Décodeur de mots et solveur d'anagrammes",
      description:
        "Décodeur de mots gratuit. Transformez vos lettres en mots valides pour le Scrabble et le Wordle. Jokers, 9 langues, résultat instantané.",
    },
    scramble: {
      title: "Solveur de mots mélangés",
      description:
        "Solveur de mots mélangés gratuit. Retrouvez vite des mots valides à partir de lettres inversées. Jokers acceptés, résultat immédiat.",
    },
    anagram: {
      title: "Solveur d'anagrammes — Trouvez-les toutes",
      description:
        "Solveur et générateur d'anagrammes gratuit. Entrez un mot ou des lettres et trouvez instantanément toutes les anagrammes valides.",
    },
    wordle: {
      title: "Solveur Wordle — Le mot du jour",
      description:
        "Solveur Wordle gratuit. Filtrez par lettres vertes, jaunes et grises pour trouver la réponse vite. Compatible 4 à 8 lettres.",
    },
    quordle: {
      title: "Solveur Quordle — Mots de 5 Lettres (ODS9)",
      description:
        "Bloqué sur Quordle, SUTOM ou Le Mot ? Trouvez tous les mots français de 5 lettres grâce au dictionnaire officiel ODS9 et nos filtres par position.",
    },
    scrabble: {
      title: "Trouveur de mots Scrabble — Meilleurs coups",
      description:
        "Trouveur de mots Scrabble. Entrez vos lettres et le plateau pour trouver les mots qui rapportent le plus. Jokers, 9 langues.",
    },
    random: {
      title: "Générateur de Mots Aléatoires — Pictionary & Jeux",
      description:
        "Générez des mots aléatoires pour le Pictionary, les mimes, le Pendu ou l'écriture créative. Filtrez par longueur et lettre de départ (ODS9).",
    },
    wordfeud: {
      title: "Aide Wordfeud & Solveur de Mots — ODS9",
      description:
        "Trouvez les meilleurs mots au Wordfeud avec notre aide gratuite basée sur l’officiel ODS9. Calcul des points, jokers et bonus bingo +40 inclus.",
    },
    dictionary: {
      title: "Dictionnaire Scrabble — Mot valide ?",
      description:
        "Vérifiez si un mot est valide au dictionnaire Scrabble officiel. Score, définition et synonymes affichés aussitôt.",
    },
    wordlists: {
      title: "Mots par longueur — 2 à 15 lettres",
      description:
        "Tous les mots Scrabble valides par longueur, de 2 à 15 lettres. Triés par score. Listes gratuites pour réviser.",
    },
    wordstarts: {
      title: "Mots commençant par A à Z",
      description:
        "Tous les mots valides commençant par A à Z, triés par score Scrabble. Listes gratuites pour le Scrabble et le Wordle.",
    },
    wordends: {
      title: "Mots finissant par A à Z",
      description:
        "Tous les mots valides finissant par A à Z. Trouvez suffixes, hooks et finales à gros score. Listes gratuites.",
    },
    "wordle-starts": {
      title: "Mots Wordle par lettre initiale A-Z",
      description:
        "Tous les mots Wordle valides par lettre initiale A-Z. Trouvez les meilleurs mots de départ et ciblez vite la solution.",
    },
    "wordle-ends": {
      title: "Mots Wordle par lettre finale A-Z",
      description:
        "Tous les mots Wordle valides par lettre finale A-Z. Hooks, suffixes et terminaisons pour résoudre le puzzle du jour.",
    },
    about: {
      title: "À propos de wordIzy — Notre mission",
      description:
        "Découvrez wordIzy : des outils de mots rapides et gratuits pour le Scrabble, le Wordle et les mots croisés en 9 langues.",
    },
    contact: {
      title: "Contact — Avis et assistance",
      description:
        "Une question ou une correction de dictionnaire ? Contactez directement l'équipe wordIzy avec vos avis et rapports de bugs.",
    },
    privacy: {
      title: "Politique de confidentialité",
      description:
        "Lisez la politique de confidentialité de wordIzy : cookies, stockage local, détection de langue et de région, Google AdSense.",
    },
    terms: {
      title: "Conditions d'utilisation",
      description:
        "Lisez les conditions d'utilisation de wordIzy : règles d'usage, restrictions, propriété intellectuelle et jeux tiers.",
    },
    sitemap: {
      title: "Plan du site — Tous les outils wordIzy",
      description:
        "Toutes les pages de wordIzy : décodeur de mots, solveurs d'anagrammes et de Wordle, listes de mots par lettre et longueur.",
    },
    blitz: {
      title: "Anagram Blitz — Jeu de mots gratuit",
      description:
        "Jouez à Anagram Blitz gratuitement — un jeu de mots éclair de 60 secondes. Défis quotidiens, entraînement, sans inscription.",
    },
  },

  es: {
    home: {
      title: "Descodificador de palabras y anagramas",
      description:
        "Descodificador de palabras gratis. Convierte letras en palabras válidas para Scrabble y Wordle. Comodines, 9 idiomas, al instante.",
    },
    scramble: {
      title: "Solucionador de palabras desordenadas",
      description:
        "Solucionador de palabras desordenadas gratis. Encuentra rápido palabras válidas con letras revueltas. Comodines, resultado inmediato.",
    },
    anagram: {
      title: "Solucionador de anagramas",
      description:
        "Solucionador y generador de anagramas gratis. Escribe una palabra o letras y encuentra al instante cada anagrama válido.",
    },
    wordle: {
      title: "Solucionador de Wordle — Palabra de hoy",
      description:
        "Solucionador de Wordle gratis. Filtra por letras verdes, amarillas y grises para hallar la respuesta rápido. De 4 a 8 letras.",
    },
    quordle: {
      title: "Quordle y La Palabra del Día — 5 Letras (FISE)",
      description:
        "¿Atascado en Quordle o La Palabra del Día? Filtra palabras en español de 5 letras según tus letras verdes y amarillas con el diccionario oficial FISE.",
    },
    scrabble: {
      title: "Buscador de palabras Scrabble",
      description:
        "Buscador de palabras Scrabble. Introduce tus fichas y letras del tablero para hallar las palabras de mayor puntuación.",
    },
    random: {
      title: "Generador de Palabras Aleatorias para Juegos",
      description:
        "Genera palabras aleatorias al instante para Pictionary, Charadas, El Ahorcado y escritura creativa. Filtra por longitud, letra inicial y 9 idiomas.",
    },
    wordfeud: {
      title: "Buscador de Palabras Wordfeud — FISE",
      description:
        "Encuentra las mejores jugadas en Wordfeud con nuestro buscador gratuito en español. Diccionario oficial FISE, comodines y cálculo de puntos.",
    },
    dictionary: {
      title: "Diccionario Scrabble — ¿Palabra válida?",
      description:
        "Comprueba si una palabra es válida en el diccionario oficial de Scrabble. Consulta puntos, definición y sinónimos al instante.",
    },
    wordlists: {
      title: "Palabras por longitud — 2 a 15 letras",
      description:
        "Todas las palabras válidas de Scrabble por longitud, de 2 a 15 letras. Ordenadas por puntos. Listas gratis para estudiar.",
    },
    wordstarts: {
      title: "Palabras que empiezan por A a Z",
      description:
        "Todas las palabras válidas que empiezan por A a Z, ordenadas por puntuación. Listas gratis de Scrabble y Wordle.",
    },
    wordends: {
      title: "Palabras que terminan en A a Z",
      description:
        "Todas las palabras válidas que terminan en A a Z. Encuentra sufijos, ganchos y finales de muchos puntos. Listas gratis.",
    },
    "wordle-starts": {
      title: "Palabras de Wordle por letra inicial A-Z",
      description:
        "Todas las palabras válidas de Wordle por letra inicial. Encuentra las mejores palabras de inicio y acota el puzzle rápido.",
    },
    "wordle-ends": {
      title: "Palabras de Wordle por letra final A-Z",
      description:
        "Todas las palabras válidas de Wordle por letra final. Ganchos, sufijos y patrones para resolver el puzzle de hoy.",
    },
    about: {
      title: "Sobre wordIzy — Nuestra misión",
      description:
        "Conoce wordIzy: herramientas de palabras rápidas y gratuitas para Scrabble, Wordle y crucigramas en 9 idiomas.",
    },
    contact: {
      title: "Contacto — Opiniones y soporte",
      description:
        "¿Tienes una pregunta o una corrección del diccionario? Contacta con el equipo de wordIzy con tus opiniones y errores.",
    },
    privacy: {
      title: "Política de privacidad",
      description:
        "Lee la política de privacidad de wordIzy: cookies, almacenamiento local, detección de idioma y región, y Google AdSense.",
    },
    terms: {
      title: "Términos del servicio",
      description:
        "Lee los términos del servicio de wordIzy: normas de uso, restricciones, propiedad intelectual y juegos de terceros.",
    },
    sitemap: {
      title: "Mapa del sitio — Todas las herramientas",
      description:
        "Todas las páginas de wordIzy: descodificador, solucionadores de anagramas y Wordle, listas por letra y longitud.",
    },
    blitz: {
      title: "Anagram Blitz — Juego de palabras gratis",
      description:
        "Juega a Anagram Blitz gratis: un juego rápido de 60 segundos. Desafíos diarios, modo práctica, sin registro ni descargas.",
    },
  },

  it: {
    home: {
      title: "Scompositore di parole e anagrammi",
      description:
        "Scompositore di parole gratuito. Trasforma le lettere in parole valide per Scarabeo e Wordle. Jolly, 9 lingue, risultati immediati.",
    },
    scramble: {
      title: "Risolvi parole mescolate — Lettere invertite",
      description:
        "Risolvitore di parole mescolate gratis. Trova in fretta parole valide da lettere invertite. Jolly, risultato immediato.",
    },
    anagram: {
      title: "Risolvitore di anagrammi",
      description:
        "Risolvitore e generatore di anagrammi gratis. Inserisci una parola o lettere e trova subito ogni anagramma valido.",
    },
    wordle: {
      title: "Risolvitore Wordle — Parola di oggi",
      description:
        "Risolvitore Wordle gratuito. Filtra per lettere verdi, gialle e grigie e trova la soluzione in fretta. Da 4 a 8 lettere.",
    },
    quordle: {
      title: "Quordle & Parole di 5 Lettere (Zingarelli)",
      description:
        "Bloccato su Quordle o Wordle Italiano? Trova subito tutte le parole italiane di 5 lettere dal vocabolario Zingarelli filtrando lettere verdi e gialle.",
    },
    scrabble: {
      title: "Cercaparole Scarabeo — Giocate migliori",
      description:
        "Cercaparole per lo Scarabeo. Inserisci le tue lettere e quelle in tavola per trovare le parole che valgono più punti.",
    },
    random: {
      title: "Generatore di Parole Casuali — Pictionary e Giochi",
      description:
        "Genera parole casuali per Pictionary, Mimo, L'Impiccato e scrittura creativa. Filtra per lunghezza, lettera iniziale e 9 lingue (Zingarelli).",
    },
    wordfeud: {
      title: "Aiutante Wordfeud & Trova Parole — Zingarelli",
      description:
        "Trova le parole migliori per Wordfeud con il nostro aiutante gratuito in italiano. Dizionario Zingarelli, calcolo punti e bonus +40.",
    },
    dictionary: {
      title: "Dizionario Scarabeo — Parola valida?",
      description:
        "Verifica se una parola è valida nel dizionario ufficiale dello Scarabeo. Punteggio, definizione e sinonimi subito.",
    },
    wordlists: {
      title: "Parole per lunghezza — 2 a 15 lettere",
      description:
        "Tutte le parole valide dello Scarabeo per lunghezza, da 2 a 15 lettere. Ordinate per punteggio. Liste gratuite.",
    },
    wordstarts: {
      title: "Parole che iniziano per A alla Z",
      description:
        "Tutte le parole valide che iniziano per A alla Z, ordinate per punteggio. Liste gratuite per Scarabeo e Wordle.",
    },
    wordends: {
      title: "Parole che terminano per A alla Z",
      description:
        "Tutte le parole valide che terminano per A alla Z. Trova suffissi, ganci e finali ad alto punteggio. Liste gratuite.",
    },
    "wordle-starts": {
      title: "Parole Wordle per lettera iniziale A-Z",
      description:
        "Tutte le parole valide di Wordle per lettera iniziale. Trova le migliori parole di apertura e restringi subito il puzzle.",
    },
    "wordle-ends": {
      title: "Parole Wordle per lettera finale A-Z",
      description:
        "Tutte le parole valide di Wordle per lettera finale. Ganci, suffissi e schemi per risolvere il puzzle di oggi.",
    },
    about: {
      title: "Chi siamo — La missione di wordIzy",
      description:
        "Scopri wordIzy: strumenti di parole rapidi e gratuiti per Scarabeo, Wordle e cruciverba in 9 lingue.",
    },
    contact: {
      title: "Contatti — Feedback e supporto",
      description:
        "Hai una domanda o una correzione al dizionario? Contatta il team wordIzy con feedback e segnalazioni di errori.",
    },
    privacy: {
      title: "Informativa sulla privacy",
      description:
        "Leggi l'informativa sulla privacy di wordIzy: cookie, archiviazione locale, rilevamento di lingua e regione, Google AdSense.",
    },
    terms: {
      title: "Termini di servizio",
      description:
        "Leggi i termini di servizio di wordIzy: linee guida, restrizioni, proprietà intellettuale e giochi di terze parti.",
    },
    sitemap: {
      title: "Mappa del sito — Tutti gli strumenti",
      description:
        "Tutte le pagine di wordIzy: scompositore, risolutori di anagrammi e Wordle, liste di parole per lettera e lunghezza.",
    },
    blitz: {
      title: "Anagram Blitz — Gioco di parole gratis",
      description:
        "Gioca gratis ad Anagram Blitz: un gioco di parole veloce da 60 secondi. Sfide quotidiane, allenamento, senza registrazione.",
    },
  },

  pt: {
    home: {
      title: "Descodificador de palavras e anagramas",
      description:
        "Descodificador de palavras grátis. Transforme letras em palavras válidas para Scrabble e Wordle. Curingas, 9 idiomas, na hora.",
    },
    scramble: {
      title: "Resolvedor de palavras embaralhadas",
      description:
        "Resolvedor de palavras embaralhadas grátis. Encontre rápido palavras válidas com letras embaralhadas. Curingas, resultado imediato.",
    },
    anagram: {
      title: "Resolvedor de anagramas",
      description:
        "Resolvedor e gerador de anagramas grátis. Digite uma palavra ou letras e encontre na hora todos os anagramas válidos.",
    },
    wordle: {
      title: "Resolvedor de Wordle — Palavra de hoje",
      description:
        "Resolvedor de Wordle grátis. Filtre por letras verdes, amarelas e cinza e encontre a resposta rápido. De 4 a 8 letras.",
    },
    quordle: {
      title: "Quordle & Quarteto — Palavras de 5 Letras",
      description:
        "Travado no Quordle ou no Quarteto de hoje? Filtre palavras em português de 5 letras por letras verdes e amarelas com nosso buscador gratuito.",
    },
    scrabble: {
      title: "Buscador de palavras de Scrabble",
      description:
        "Buscador de palavras de Scrabble. Digite suas letras e as do tabuleiro para achar as palavras de maior pontuação. Grátis.",
    },
    random: {
      title: "Gerador de Palavras Aleatórias — Mímica e Forca",
      description:
        "Gere palavras aleatórias na hora para Imagem & Ação, Mímica, Forca e escrita criativa. Filtre por tamanho da palavra e letra inicial em 9 idiomas.",
    },
    wordfeud: {
      title: "Ajudante Wordfeud & Formar Palavras",
      description:
        "Encontre as melhores palavras para Wordfeud com nosso ajudante gratuito em português. Suporte a curingas, cálculo de pontos e dicas de bônus +40.",
    },
    dictionary: {
      title: "Dicionário de Scrabble — Palavra válida?",
      description:
        "Verifique se uma palavra é válida no dicionário oficial de Scrabble. Veja pontuação, definição e sinônimos na hora.",
    },
    wordlists: {
      title: "Palavras por tamanho — 2 a 15 letras",
      description:
        "Todas as palavras válidas de Scrabble por tamanho, de 2 a 15 letras. Ordenadas por pontos. Listas grátis para estudar.",
    },
    wordstarts: {
      title: "Palavras que começam com A a Z",
      description:
        "Todas as palavras válidas que começam com A a Z, ordenadas por pontuação. Listas grátis de Scrabble e Wordle.",
    },
    wordends: {
      title: "Palavras que terminam em A a Z",
      description:
        "Todas as palavras válidas que terminam em A a Z. Encontre sufixos, ganchos e finais de alta pontuação. Listas grátis.",
    },
    "wordle-starts": {
      title: "Palavras de Wordle por letra inicial A-Z",
      description:
        "Todas as palavras válidas de Wordle por letra inicial. Ache as melhores palavras iniciais e reduza logo o puzzle.",
    },
    "wordle-ends": {
      title: "Palavras de Wordle por letra final A-Z",
      description:
        "Todas as palavras válidas de Wordle por letra final. Ganchos, sufixos e padrões para resolver o puzzle de hoje.",
    },
    about: {
      title: "Sobre o wordIzy — Nossa missão",
      description:
        "Conheça o wordIzy: ferramentas de palavras rápidas e grátis para Scrabble, Wordle e cruzadinhas em 9 idiomas.",
    },
    contact: {
      title: "Contato — Opiniões e suporte",
      description:
        "Tem alguma dúvida ou correção de dicionário? Fale com a equipe wordIzy com seus comentários e relatos de erros.",
    },
    privacy: {
      title: "Política de Privacidade",
      description:
        "Leia a política de privacidade do wordIzy: cookies, armazenamento local, detecção de idioma e região, Google AdSense.",
    },
    terms: {
      title: "Termos de Serviço",
      description:
        "Leia os termos de serviço do wordIzy: diretrizes de uso, restrições, propriedade intelectual e jogos de terceiros.",
    },
    sitemap: {
      title: "Mapa do site — Todas as ferramentas",
      description:
        "Todas as páginas do wordIzy: descodificador, resolvedores de anagramas e Wordle, listas de palavras por letra e tamanho.",
    },
    blitz: {
      title: "Anagram Blitz — Jogo de palavras grátis",
      description:
        "Jogue Anagram Blitz grátis: um jogo rápido de 60 segundos. Desafios diários, modo treino, sem cadastro nem downloads.",
    },
  },

  nl: {
    home: {
      title: "Woordfinder — Maak woorden van letters",
      description:
        "Gratis woordfinder. Maak van je letters geldige woorden voor Scrabble en Wordle. Jokers, 9 talen, direct resultaat.",
    },
    scramble: {
      title: "Woordpuzzel-oplosser — Letters door elkaar",
      description:
        "Gratis oplosser voor door elkaar gehaalde letters. Vind snel geldige woorden. Jokers mogelijk, direct resultaat.",
    },
    anagram: {
      title: "Anagrammen-oplosser — Vind ze allemaal",
      description:
        "Gratis anagrammen-oplosser en generator. Voer een woord of letters in en vind direct elk geldig anagram.",
    },
    wordle: {
      title: "Wordle-oplosser — Vind het woord van vandaag",
      description:
        "Gratis Wordle-oplosser. Filter op groene, gele en grijze letters en vind het antwoord snel. Voor 4-8 letters.",
    },
    quordle: {
      title: "Quordle & Woordle Oplosser — 5-Letter Woorden",
      description:
        "Vastgelopen bij Quordle of Nederlandse Woordle? Filter direct alle geldige 5-letterwoorden uit de OpenTaal woordenlijst met onze gratis oplosser.",
    },
    scrabble: {
      title: "Scrabble-woordzoeker — Beste woorden",
      description:
        "Scrabble-woordzoeker. Voer je letters en bordletters in en vind de woorden met de hoogste score. Jokers, gratis.",
    },
    random: {
      title: "Willekeurig Woord Generator — Pictionary & Galgje",
      description:
        "Genereer direct willekeurige Nederlandse woorden voor Pictionary, Hints, Galgje en Lingo-oefeningen. Filter op woordlengte en beginletter (OpenTaal).",
    },
    wordfeud: {
      title: "Wordfeud Woorden Maker & Helper — OpenTaal",
      description:
        "Vind direct de beste Nederlandse Wordfeud woorden met onze gratis maker. Officiële OpenTaal-woordenlijst, +40 bingo en puntentelling.",
    },
    dictionary: {
      title: "Scrabble-woordenboek — Is het een woord?",
      description:
        "Controleer of een woord geldig is in het officiële Scrabble-woordenboek. Bekijk punten, betekenis en synoniemen direct.",
    },
    wordlists: {
      title: "Woorden per lengte — 2 tot 15 letters",
      description:
        "Alle geldige Scrabble-woorden per lengte, van 2 tot 15 letters. Gesorteerd op punten. Gratis woordenlijsten.",
    },
    wordstarts: {
      title: "Woorden die beginnen met A tot Z",
      description:
        "Alle geldige woorden die beginnen met A tot Z, gesorteerd op Scrabble-score. Gratis lijsten voor Scrabble en Wordle.",
    },
    wordends: {
      title: "Woorden die eindigen op A tot Z",
      description:
        "Alle geldige woorden die eindigen op A tot Z. Vind suffixen, hooks en hoog scorende eindes. Gratis woordenlijsten.",
    },
    "wordle-starts": {
      title: "Wordle-woorden per beginletter A-Z",
      description:
        "Alle geldige Wordle-woorden per beginletter A-Z. Vind de beste openingswoorden en bekijk de puzzel snel.",
    },
    "wordle-ends": {
      title: "Wordle-woorden per eindletter A-Z",
      description:
        "Alle geldige Wordle-woorden per eindletter A-Z. Hooks, suffixen en patronen om de puzzel van vandaag op te lossen.",
    },
    about: {
      title: "Over wordIzy — Onze missie",
      description:
        "Ontdek wordIzy: snelle, gratis woordtools voor Scrabble, Wordle en kruiswoordpuzzels in 9 talen.",
    },
    contact: {
      title: "Contact — Feedback en ondersteuning",
      description:
        "Heb je een vraag of een woordenboekcorrectie? Neem contact op met het wordIzy-team met feedback en foutmeldingen.",
    },
    privacy: {
      title: "Privacybeleid",
      description:
        "Lees het privacybeleid van wordIzy: cookies, lokale opslag, taal- en regiodetectie en Google AdSense.",
    },
    terms: {
      title: "Gebruiksvoorwaarden",
      description:
        "Lees de gebruiksvoorwaarden van wordIzy: richtlijnen, beperkingen, intellectueel eigendom en spellen van derden.",
    },
    sitemap: {
      title: "Sitemap — Alle wordIzy-tools",
      description:
        "Alle wordIzy-pagina's: woordfinder, anagram- en Wordle-oplossers, woordenlijsten per letter en lengte.",
    },
    blitz: {
      title: "Anagram Blitz — Gratis woordspel",
      description:
        "Speel Anagram Blitz gratis — een snel woordspel van 60 seconden. Dagelijkse uitdagingen, oefenmodus, geen registratie.",
    },
  },

  ja: {
    home: {
      title: "ワード解読ツール — 文字を単語に",
      description:
        "無料のワード解読ツール。文字を並べ替えてスクラブルやワードルの有効な単語をすぐ表示。ワイルドカード対応、9言語対応。",
    },
    scramble: {
      title: "文字並べ替えパズルの解決ツール",
      description:
        "無料の文字並べ替えソルバー。入れ替わった文字から有効な単語をすばやく見つけます。ワイルドカード対応。",
    },
    anagram: {
      title: "アナグラムソルバー — すべて見つける",
      description:
        "無料のアナグラムソルバー＆ジェネレーター。単語や文字を入力すると有効なアナグラムを即表示します。",
    },
    wordle: {
      title: "ワードルソルバー — 今日の答え",
      description:
        "無料のワードルソルバー。緑・黄・灰色の文字で絞り込み、答えを素早く特定。4〜8文字対応。",
    },
    quordle: {
      title: "Quordleソルバー — 4盤同時攻略",
      description:
        "4つのQuordle盤を同時に攻略。各盤の緑・黄・灰色のヒントを入力。無料、登録不要。",
    },
    scrabble: {
      title: "スクラブルワードファインダー",
      description:
        "スクラブルワードファインダー。手持ち文字と盤面文字から最高得点の単語を検索。ワイルドカード対応、無料。",
    },
    random: {
      title: "ランダム単語ジェネレーター（フィルター付き）",
      description:
        "無料のランダム単語ジェネレーター。長さ・接頭辞・接尾辞でフィルターした実在のスクラブル単語を生成。",
    },
    wordfeud: {
      title: "Wordfeudヘルパー — 最強の単語",
      description:
        "Wordfeudヘルパー。手持ち文字から最高のWordfeud単語を即検索。9言語対応、無料。",
    },
    dictionary: {
      title: "スクラブル辞書 — 有効な単語か確認",
      description:
        "単語が公式スクラブル辞書で有効かどうか確認。得点・定義・類義語をすぐ表示します。",
    },
    wordlists: {
      title: "文字数別単語リスト — 2〜15文字",
      description:
        "2〜15文字まで、文字数別の有効なスクラブル単語をすべて掲載。得点順の無料単語リスト。",
    },
    wordstarts: {
      title: "A〜Zで始まる単語一覧",
      description:
        "A〜Zで始まる有効な単語をすべて掲載。スクラブル得点順。スクラブルとワードルの無料リスト。",
    },
    wordends: {
      title: "A〜Zで終わる単語一覧",
      description:
        "A〜Zで終わる有効な単語をすべて掲載。接尾語・フック・高得点の語尾を探せます。無料リスト。",
    },
    "wordle-starts": {
      title: "ワードル単語 — 頭文字A-Z別",
      description:
        "頭文字A〜Z別の有効なワードル単語。最強の初期単語を見つけて素早く絞り込み。",
    },
    "wordle-ends": {
      title: "ワードル単語 — 語尾文字A-Z別",
      description:
        "語尾文字A〜Z別の有効なワードル単語。フック・接尾語・パターンで今日のパズルを解決。",
    },
    about: {
      title: "wordIzyについて — 私たちのミッション",
      description:
        "wordIzyを紹介：スクラブル・ワードル・クロスワード向けの高速で無料の単語ツール。9言語対応。",
    },
    contact: {
      title: "お問い合わせ — フィードバック",
      description:
        "ご質問や辞書の修正提案はありますか？wordIzyチームまでフィードバックをお送りください。",
    },
    privacy: {
      title: "プライバシーポリシー",
      description:
        "wordIzyのプライバシーポリシー：Cookie、ローカルストレージ、言語と地域の判定、Google AdSenseについて。",
    },
    terms: {
      title: "利用規約",
      description:
        "wordIzyの利用規約：ガイドライン、制限事項、知的財産権、サードパーティゲームについて。",
    },
    sitemap: {
      title: "サイトマップ — すべてのツール",
      description:
        "wordIzyの全ページ：ワード解読、アナグラム・ワードルソルバー、文字・文字数別の単語リスト。",
    },
    blitz: {
      title: "Anagram Blitz — 無料の単語ゲーム",
      description:
        "Anagram Blitzを無料でプレイ。60秒のスピード単語ゲーム。毎日チャレンジ、練習モード、登録不要。",
    },
  },

  zh: {
    home: {
      title: "字母重组工具 — 单词解码器",
      description:
        "免费字母重组工具。输入字母即可找出拼图和Wordle的有效单词。支持通配符，9种语言，即时显示结果。",
    },
    scramble: {
      title: "乱序单词解答器",
      description:
        "免费的乱序字母解答器。快速从打乱的字母中找出有效单词。支持通配符，即时显示结果。",
    },
    anagram: {
      title: "变位词求解器 — 找出全部变位词",
      description:
        "免费变位词求解与生成工具。输入单词或字母，立即找出所有有效的变位词。",
    },
    wordle: {
      title: "Wordle求解器 — 今日答案",
      description:
        "免费Wordle求解器。按绿、黄、灰色字母筛选，快速锁定答案。支持4-8个字母。",
    },
    quordle: {
      title: "Quordle求解器 — 同时解四盘",
      description:
        "一次解开全部四盘Quordle谜题。为每盘输入绿、黄、灰色线索。免费，无需注册。",
    },
    scrabble: {
      title: "Scrabble找词器 — 最佳出词",
      description:
        "Scrabble找词器。输入字母架和盘面字母，找出得分最高的单词。支持通配符，免费。",
    },
    random: {
      title: "随机单词生成器（可筛选）",
      description:
        "免费随机单词生成器。按长度、前缀、后缀筛选，生成真实的Scrabble单词。",
    },
    wordfeud: {
      title: "Wordfeud助手 — 最强单词",
      description:
        "Wordfeud助手。输入你的字母，立即找出最佳Wordfeud单词。支持9种语言，免费。",
    },
    dictionary: {
      title: "Scrabble词典 — 这个词有效吗？",
      description:
        "查询单词是否收录于官方Scrabble词典。立即查看分值、释义和同义词。",
    },
    wordlists: {
      title: "按长度浏览单词 — 2至15个字母",
      description:
        "2至15个字母的全部有效Scrabble单词，按分值排序。免费单词表，方便学习。",
    },
    wordstarts: {
      title: "以A到Z开头的单词",
      description:
        "以A到Z开头的全部有效单词，按Scrabble分值排序。Scrabble和Wordle免费词表。",
    },
    wordends: {
      title: "以A到Z结尾的单词",
      description:
        "以A到Z结尾的全部有效单词。查找后缀、钩词和高分词尾。免费单词表。",
    },
    "wordle-starts": {
      title: "Wordle单词 — 按首字母A-Z",
      description:
        "按首字母A到Z浏览全部有效Wordle单词。找出最佳开局词，快速缩小谜题范围。",
    },
    "wordle-ends": {
      title: "Wordle单词 — 按尾字母A-Z",
      description:
        "按尾字母A到Z浏览全部有效Wordle单词。用钩词、后缀和模式解开今日谜题。",
    },
    about: {
      title: "关于wordIzy — 我们的使命",
      description:
        "了解wordIzy：为Scrabble、Wordle和填字游戏打造的快速免费单词工具，支持9种语言。",
    },
    contact: {
      title: "联系我们 — 反馈与支持",
      description:
        "有问题或词典勘误？欢迎通过反馈和错误报告直接联系wordIzy团队。",
    },
    privacy: {
      title: "隐私政策",
      description:
        "阅读wordIzy隐私政策：Cookie、本地存储、语言与地区检测以及Google AdSense相关说明。",
    },
    terms: {
      title: "服务条款",
      description:
        "阅读wordIzy服务条款：使用准则、数据限制、知识产权与第三方游戏免责声明。",
    },
    sitemap: {
      title: "站点地图 — 全部工具",
      description:
        "wordIzy全部页面：字母重组、变位词与Wordle求解器、按字母和长度分类的单词表。",
    },
    blitz: {
      title: "Anagram Blitz — 免费单词游戏",
      description:
        "免费玩Anagram Blitz：60秒极速单词游戏。每日挑战、练习模式，无需注册或下载。",
    },
  },
};
