// src/lib/scrabble-words-i18n.ts
// Localized copy (UI strings + meta templates) for the six language editions
// of the Scrabble-words section: /fr/scrabble-words, /es/scrabble-words,
// /it/scrabble-words, /nl/scrabble-words, /de/scrabble-words, /pt/scrabble-words.
//
// Each edition checks ITS language's dictionary first (ODS9, FISE, Zingarelli,
// OpenTaal, or the wordIzy German/Portuguese word lists) and shows points with
// that language's official tile values. English (NWL2023/CSW21) and the other
// languages are reported in a cross-dictionary table.
//
// Placeholders: {word} {points} {dict} {n} {breakdown} {list} — filled by
// fill() at render time. Titles target ≤50 chars for typical word lengths,
// descriptions ≤150 chars AFTER HTML escaping (Bing 25-160 rule).

import type { ScrabbleDictLang } from "./scrabble-word-data";

export interface ScrabbleWordsCopy {
  // ── Index page (/{lang}/scrabble-words) ──────────────────────────────
  indexTitle: string;
  indexDesc: string;
  indexH1: string;
  indexIntro: string;
  indexDictNote: string;
  lengthTitle: string; // "{n}" + letters wording
  sampleNote: string;
  /** Per-length "Browse all {n}-letter Scrabble words →" link text (uses {n}). */
  browseAll: string;
  whatCountsH2: string;
  whatCountsBody: string;
  accentsNote: string;
  relatedTools: string;
  alsoInLabel: string;
  backHome: string;

  // ── Word page (/{lang}/scrabble-words/[word]) ────────────────────────
  titleValid: string;
  titleOther: string;
  titleInvalid: string;
  descValid: string;
  descOther: string;
  descInvalid: string;
  h1: string;
  subline: string;
  answerValid: string;
  answerValidSub: string;
  answerOther: string;
  answerOtherSub: string;
  answerInvalid: string;
  answerInvalidSub: string;
  pointsH2: string;
  pointsIntro: string;
  colLetter: string;
  colCount: string;
  colEach: string;
  colSubtotal: string;
  colTotal: string;
  crossH2: string;
  crossIntro: string;
  colDict: string;
  colRegion: string;
  colValid: string;
  colYes: string;
  colNo: string;
  wordListFootnote: string;
  accentsFootnote: string;
  faqTitle: string;
  faqValidQ1: string;
  faqValidA1: string;
  faqValidQ2: string;
  faqValidA2: string;
  faqOtherQ: string;
  faqOtherA: string;
  faqInvalidQ1: string;
  faqInvalidA1: string;
  faqInvalidQ2: string;
  faqInvalidA2: string;
  breadcrumbWord: string;
  shareTitle: string;
  allWords: string;
  checkIn: string;

  // ── Dictionary / language labels ─────────────────────────────────────
  /** "français" — the page's own language name for prose. */
  selfLanguageName: string;
  /** Localized name of the wordIzy word list (the de/pt dictionaries). */
  wordListName: string;
  /** Localized names of all seven section languages (for tables + switcher). */
  langNames: Record<"en" | ScrabbleDictLang, string>;
  nwlRegion: string;
  cswRegion: string;
}

/** Fill a {placeholder} template. */
export function fill(template: string, vars: Record<string, string | number>): string {
  let out = template;
  for (const [key, value] of Object.entries(vars)) {
    out = out.split(`{${key}}`).join(String(value));
  }
  return out;
}

export const SCRABBLE_WORDS_COPY: Record<ScrabbleDictLang, ScrabbleWordsCopy> = {
  // ────────────────────────────────────────────────────────────────────
  fr: {
    indexTitle: "Mots Scrabble — validité selon l'ODS9",
    indexDesc:
      "Est-ce un mot valide au Scrabble français ? Vérifiez n'importe quel mot dans l'ODS9, avec ses points, et dans 7 autres dictionnaires.",
    indexH1: "Est-ce un mot valide au Scrabble français ?",
    indexIntro:
      "Chaque mot du dictionnaire officiel du Scrabble francophone (ODS9) a sa propre page : validité, valeur en points selon les tuiles françaises et détail lettre par lettre. Parcourez les mots par longueur ci-dessous, ou ouvrez directement une page mot, par exemple /fr/scrabble-words/chat.",
    indexDictNote:
      "Chaque page mot vérifie aussi 7 autres dictionnaires : anglais (NWL2023 et CSW21), espagnol (FISE), italien (Zingarelli), néerlandais (OpenTaal) et les listes allemande et portugaise de wordIzy. Un mot absent de l'ODS9 peut donc être jouable dans une autre langue.",
    lengthTitle: "Mots Scrabble de {n} lettres",
    sampleNote:
      "Un échantillon de mots valides de {n} lettres. Cliquez sur un mot pour sa valeur en points et sa validité détaillée.",
    browseAll: "Parcourir tous les mots Scrabble de {n} lettres →",
    whatCountsH2: "Qu'est-ce qu'un mot valide au Scrabble français ?",
    whatCountsBody:
      "Le Scrabble francophone se joue avec l'ODS9 (L'Officiel du Jeu Scrabble, 9e édition), le dictionnaire officiel : environ 400 000 formes, inflexions comprises. Y sont exclus les noms propres, les abréviations, les mots avec trait d'union ou apostrophe. Les lettres accentuées existent dans le jeu (É, À, Û…) mais l'URL de ce site les écrit sans accent : la page ELEVE correspond donc au mot ÉLÈVE.",
    accentsNote:
      "Convention du site : les accents sont retirés dans les URL (é → e), donc ELEVE correspond à ÉLÈVE dans l'ODS9.",
    relatedTools: "Outils associés",
    alsoInLabel: "Cette page existe aussi en :",
    backHome: "Retour à l'accueil",
    titleValid: "{word} au Scrabble : oui, {points} points",
    titleOther: "{word} : valide dans une autre langue",
    titleInvalid: "{word} est-il un mot Scrabble valide ?",
    descValid:
      "{word} est un mot valide au Scrabble français (ODS9) et vaut {points} points. Détail des lettres et validité dans 7 autres dictionnaires.",
    descOther:
      "{word} n'est pas un mot valide au Scrabble français (ODS9), mais il est valide dans d'autres dictionnaires. Voyez lesquels.",
    descInvalid:
      "{word} n'est pas un mot valide au Scrabble : ni en français (ODS9), ni dans les 7 autres dictionnaires. Découvrez pourquoi.",
    h1: "{word} est-il un mot Scrabble valide ?",
    subline: "Vérification de validité · ODS9 + 7 autres dictionnaires",
    answerValid: "Oui — {word} est un mot Scrabble valide et vaut {points} points.",
    answerValidSub:
      "{word} figure dans l'ODS9 (L'Officiel du Jeu Scrabble), le dictionnaire officiel du Scrabble francophone. Le total de {points} points utilise les valeurs officielles des tuiles françaises.",
    answerOther: "Non — {word} n'est pas un mot valide au Scrabble français.",
    answerOtherSub:
      "{word} ne figure pas dans l'ODS9. Cependant, il est valide ailleurs : {list}. Il est donc jouable au Scrabble dans les langues qui utilisent ces dictionnaires.",
    answerInvalid: "Non — {word} n'est pas un mot Scrabble valide.",
    answerInvalidSub:
      "{word} n'apparaît ni dans l'ODS9 (français), ni dans les dictionnaires anglais (NWL2023, CSW21), ni dans les cinq autres langues vérifiées sur cette page.",
    pointsH2: "{word} — {points} points au Scrabble",
    pointsIntro:
      "{word} vaut {points} points au Scrabble français, calculés avec les valeurs officielles des tuiles :",
    colLetter: "Lettre",
    colCount: "Nombre",
    colEach: "Points chacun",
    colSubtotal: "Sous-total",
    colTotal: "Total",
    crossH2: "{word} dans tous les dictionnaires",
    crossIntro:
      "Les dictionnaires du Scrabble sont propres à chaque langue : un mot injouable en français peut être parfaitement légal dans une autre langue. Voici comment {word} se comporte dans les huit dictionnaires :",
    colDict: "Dictionnaire",
    colRegion: "Langue / région",
    colValid: "{word} valide ?",
    colYes: "Oui",
    colNo: "Non",
    wordListFootnote:
      "* Il n'existe pas de dictionnaire officiel de Scrabble librement diffusé pour l'allemand ni le portugais — wordIzy utilise ses propres listes filtrées (les mêmes que celles des jeux allemand et portugais de ce site).",
    accentsFootnote:
      "La recherche suit la convention du site : les accents sont retirés (é → e), donc ELEVE correspond à ÉLÈVE dans l'ODS9.",
    faqTitle: "Questions fréquentes",
    faqValidQ1: "Est-ce que {word} est un mot valide au Scrabble ?",
    faqValidA1:
      "Oui, {word} est un mot valide au Scrabble français : il figure dans l'ODS9 (L'Officiel du Jeu Scrabble), le dictionnaire officiel. Il vaut {points} points.",
    faqValidQ2: "Combien de points vaut {word} au Scrabble ?",
    faqValidA2:
      "{word} vaut {points} points au Scrabble français, soit la somme des valeurs des tuiles : {breakdown}.",
    faqOtherQ: "{word} est-il un mot valide dans d'autres langues ?",
    faqOtherA:
      "Oui. {word} n'est pas valide en français (ODS9), mais c'est un mot valide en {list}. Il peut être joué au Scrabble dans les langues qui utilisent ces dictionnaires.",
    faqInvalidQ1: "Est-ce que {word} est un mot valide au Scrabble ?",
    faqInvalidA1:
      "Non, {word} n'est pas un mot valide au Scrabble : il ne figure ni dans l'ODS9 (dictionnaire officiel du Scrabble français), ni dans les dictionnaires anglais (NWL2023, CSW21), ni dans les cinq autres dictionnaires vérifiés sur cette page.",
    faqInvalidQ2: "Pourquoi {word} n'est-il pas valide ?",
    faqInvalidA2:
      "Chaque langue joue avec son propre dictionnaire officiel. Les raisons les plus fréquentes d'exclusion : nom propre, abréviation, préfixe ou suffixe utilisé seul, forme avec trait d'union ou apostrophe, ou mot simplement absent du dictionnaire.",
    breadcrumbWord: "{word} est-il un mot Scrabble ?",
    shareTitle: "{word} est-il un mot Scrabble valide ?",
    allWords: "Tous les mots Scrabble",
    checkIn: "Vérifier {word} en :",
    selfLanguageName: "français",
    wordListName: "liste wordIzy",
    langNames: {
      en: "Anglais",
      fr: "Français",
      es: "Espagnol",
      it: "Italien",
      nl: "Néerlandais",
      de: "Allemand",
      pt: "Portugais",
    },
    nwlRegion: "Anglais — Amérique du Nord",
    cswRegion: "Anglais — international",
  },

  // ────────────────────────────────────────────────────────────────────
  es: {
    indexTitle: "Palabras de Scrabble — validez según la FISE",
    indexDesc:
      "¿Es una palabra válida en el Scrabble en español? Comprueba cualquier palabra en la FISE, con sus puntos, y en otros 7 diccionarios de Scrabble.",
    indexH1: "¿Es una palabra válida en el Scrabble en español?",
    indexIntro:
      "Cada palabra del diccionario oficial del Scrabble en español (FISE) tiene su propia página: validez, valor en puntos según las fichas españolas y desglose letra por letra. Explora las palabras por longitud abajo, o abre una página directamente, por ejemplo /es/scrabble-words/gato.",
    indexDictNote:
      "Cada página de palabra comprueba también otros 7 diccionarios: inglés (NWL2023 y CSW21), francés (ODS9), italiano (Zingarelli), neerlandés (OpenTaal) y las listas alemana y portuguesa de wordIzy. Una palabra ausente de la FISE puede ser jugable en otro idioma.",
    lengthTitle: "Palabras de Scrabble de {n} letras",
    sampleNote:
      "Una muestra de palabras válidas de {n} letras. Haz clic en una palabra para ver sus puntos y su validez detallada.",
    browseAll: "Explorar todas las palabras de Scrabble de {n} letras →",
    whatCountsH2: "¿Qué es una palabra válida en el Scrabble en español?",
    whatCountsBody:
      "El Scrabble en español se juega con la FISE (Federación Internacional de Scrabble en Español), el diccionario oficial: cientos de miles de formas, inflexiones incluidas. Quedan excluidos los nombres propios, las abreviaturas y las formas con guion o apóstrofo. La Ñ existe en el juego, pero las URL de este sitio escriben las letras sin tildes: la página MENSA corresponde a MÉNSA en la FISE.",
    accentsNote:
      "Convención del sitio: las URL van sin tildes (é → e), así que ELEVE corresponde a ÉLÈVE y MENSA a MÉNSA en los diccionarios.",
    relatedTools: "Herramientas relacionadas",
    alsoInLabel: "Esta página también existe en:",
    backHome: "Volver al inicio",
    titleValid: "{word} en Scrabble: sí, {points} puntos",
    titleOther: "{word}: válida en otro idioma",
    titleInvalid: "¿{word} es una palabra válida de Scrabble?",
    descValid:
      "{word} es una palabra válida en el Scrabble en español (FISE) y vale {points} puntos. Desglose de letras y validez en otros 7 diccionarios.",
    descOther:
      "{word} no es válida en el Scrabble en español (FISE), pero sí lo es en otros diccionarios. Mira en cuáles.",
    descInvalid:
      "{word} no es una palabra válida de Scrabble: ni en español (FISE) ni en los otros 7 diccionarios. Descubre por qué.",
    h1: "¿{word} es una palabra válida de Scrabble?",
    subline: "Comprobación de validez · FISE + 7 diccionarios más",
    answerValid: "Sí — {word} es una palabra válida de Scrabble y vale {points} puntos.",
    answerValidSub:
      "{word} figura en la FISE (Federación Internacional de Scrabble en Español), el diccionario oficial del Scrabble en español. Los {points} puntos usan los valores oficiales de las fichas españolas.",
    answerOther: "No — {word} no es válida en el Scrabble en español.",
    answerOtherSub:
      "{word} no figura en la FISE. Sin embargo, sí es válida en otros idiomas: {list}. Es jugable al Scrabble en las lenguas que usan esos diccionarios.",
    answerInvalid: "No — {word} no es una palabra válida de Scrabble.",
    answerInvalidSub:
      "{word} no aparece ni en la FISE (español), ni en los diccionarios ingleses (NWL2023, CSW21), ni en las otras cinco lenguas comprobadas en esta página.",
    pointsH2: "{word} — {points} puntos en Scrabble",
    pointsIntro:
      "{word} vale {points} puntos en el Scrabble en español, calculados con los valores oficiales de las fichas:",
    colLetter: "Letra",
    colCount: "Cantidad",
    colEach: "Puntos cada una",
    colSubtotal: "Subtotal",
    colTotal: "Total",
    crossH2: "{word} en todos los diccionarios",
    crossIntro:
      "Los diccionarios de Scrabble son propios de cada idioma: una palabra injugable en español puede ser perfectamente legal en otra lengua. Así se comporta {word} en los ocho diccionarios:",
    colDict: "Diccionario",
    colRegion: "Idioma / región",
    colValid: "¿{word} válida?",
    colYes: "Sí",
    colNo: "No",
    wordListFootnote:
      "* No existe un diccionario oficial de Scrabble con licencia libre para el alemán ni el portugués — wordIzy usa sus propias listas filtradas (las mismas de los juegos alemán y portugués de este sitio).",
    accentsFootnote:
      "La búsqueda sigue la convención del sitio: sin tildes en la URL (é → e), así ELEVE corresponde a ÉLÈVE y MENSA a MÉNSA.",
    faqTitle: "Preguntas frecuentes",
    faqValidQ1: "¿{word} es una palabra válida de Scrabble?",
    faqValidA1:
      "Sí, {word} es una palabra válida en el Scrabble en español: figura en la FISE, el diccionario oficial. Vale {points} puntos.",
    faqValidQ2: "¿Cuántos puntos vale {word} en Scrabble?",
    faqValidA2:
      "{word} vale {points} puntos en el Scrabble en español, la suma de los valores de las fichas: {breakdown}.",
    faqOtherQ: "¿{word} es válida en otros idiomas?",
    faqOtherA:
      "Sí. {word} no es válida en español (FISE), pero sí lo es en {list}. Puede jugarse al Scrabble en las lenguas que usan esos diccionarios.",
    faqInvalidQ1: "¿{word} es una palabra válida de Scrabble?",
    faqInvalidA1:
      "No, {word} no es una palabra válida de Scrabble: no figura ni en la FISE (diccionario oficial en español), ni en los diccionarios ingleses (NWL2023, CSW21), ni en los otros cinco diccionarios comprobados en esta página.",
    faqInvalidQ2: "¿Por qué {word} no es válida?",
    faqInvalidA2:
      "Cada idioma juega con su propio diccionario oficial. Las razones más frecuentes de exclusión: nombre propio, abreviatura, prefijo o sufijo suelto, forma con guion o apóstrofo, o palabra simplemente ausente del diccionario.",
    breadcrumbWord: "¿{word} es una palabra de Scrabble?",
    shareTitle: "¿{word} es una palabra válida de Scrabble?",
    allWords: "Todas las palabras de Scrabble",
    checkIn: "Comprobar {word} en:",
    selfLanguageName: "español",
    wordListName: "lista wordIzy",
    langNames: {
      en: "Inglés",
      fr: "Francés",
      es: "Español",
      it: "Italiano",
      nl: "Neerlandés",
      de: "Alemán",
      pt: "Portugués",
    },
    nwlRegion: "Inglés — Norteamérica",
    cswRegion: "Inglés — internacional",
  },

  // ────────────────────────────────────────────────────────────────────
  it: {
    indexTitle: "Parole Scrabble — validità secondo lo Zingarelli",
    indexDesc:
      "È una parola valida nello Scarabeo italiano? Controlla qualsiasi parola nello Zingarelli, con i punti, e in altri 7 dizionari di Scrabble.",
    indexH1: "È una parola valida nello Scarabeo italiano?",
    indexIntro:
      "Ogni parola del dizionario italiano (Zingarelli) ha una pagina dedicata: validità, valore in punti secondo le tessere italiane e dettaglio lettera per lettera. Sfoglia le parole per lunghezza qui sotto, oppure apri direttamente una pagina, ad esempio /it/scrabble-words/casa.",
    indexDictNote:
      "Ogni pagina parola controlla anche altri 7 dizionari: inglese (NWL2023 e CSW21), francese (ODS9), spagnolo (FISE), olandese (OpenTaal) e le liste tedesca e portoghese di wordIzy. Una parola assente dallo Zingarelli può quindi essere giocabile in un'altra lingua.",
    lengthTitle: "Parole Scrabble di {n} lettere",
    sampleNote:
      "Un campione di parole valide di {n} lettere. Clicca una parola per i punti e la validità completa.",
    browseAll: "Sfoglia tutte le parole Scrabble di {n} lettere →",
    whatCountsH2: "Che cos'è una parola valida nello Scarabeo italiano?",
    whatCountsBody:
      "Lo Scarabeo in italiano si gioca con il dizionario Zingarelli, il riferimento ufficiale: centinaia di migliaia di forme, flessioni comprese. Sono esclusi i nomi propri, le abbreviazioni e le forme con trattino o apostrofo. Le lettere accentate esistono nel gioco (È, À, Ù…), ma le URL di questo sito le scrive senza accenti: la pagina PERCHE corrisponde a PERCHÉ nello Zingarelli.",
    accentsNote:
      "Convenzione del sito: le URL vanno senza accenti (é → e), quindi PERCHE corrisponde a PERCHÉ nello Zingarelli.",
    relatedTools: "Strumenti correlati",
    alsoInLabel: "Questa pagina esiste anche in:",
    backHome: "Torna alla home",
    titleValid: "{word} a Scarabeo: sì, {points} punti",
    titleOther: "{word}: valida in un'altra lingua",
    titleInvalid: "{word} è una parola valida di Scrabble?",
    descValid:
      "{word} è una parola valida nello Scarabeo italiano (Zingarelli) e vale {points} punti. Dettaglio delle lettere e validità in altri 7 dizionari.",
    descOther:
      "{word} non è valida nello Scarabeo italiano (Zingarelli), ma è valida in altri dizionari. Scopri in quali.",
    descInvalid:
      "{word} non è una parola valida di Scrabble: né in italiano (Zingarelli) né negli altri 7 dizionari. Scopri perché.",
    h1: "{word} è una parola valida di Scrabble?",
    subline: "Verifica di validità · Zingarelli + altri 7 dizionari",
    answerValid: "Sì — {word} è una parola valida e vale {points} punti.",
    answerValidSub:
      "{word} compare nello Zingarelli, il dizionario di riferimento dello Scarabeo italiano. I {points} punti usano i valori ufficiali delle tessere italiane.",
    answerOther: "No — {word} non è valida nello Scarabeo italiano.",
    answerOtherSub:
      "{word} non compare nello Zingarelli. Tuttavia è valida altrove: {list}. È quindi giocabile allo Scarabeo nelle lingue che usano quei dizionari.",
    answerInvalid: "No — {word} non è una parola valida di Scrabble.",
    answerInvalidSub:
      "{word} non compare né nello Zingarelli (italiano), né nei dizionari inglesi (NWL2023, CSW21), né nelle altre cinque lingue verificate in questa pagina.",
    pointsH2: "{word} — {points} punti a Scarabeo",
    pointsIntro:
      "{word} vale {points} punti a Scarabeo, calcolati con i valori ufficiali delle tessere italiane:",
    colLetter: "Lettera",
    colCount: "Quantità",
    colEach: "Punti ciascuna",
    colSubtotal: "Subtotale",
    colTotal: "Totale",
    crossH2: "{word} in tutti i dizionari",
    crossIntro:
      "I dizionari dello Scarabeo sono specifici di ogni lingua: una parola ingiocabile in italiano può essere perfettamente legale in un'altra. Ecco come se la cava {word} negli otto dizionari:",
    colDict: "Dizionario",
    colRegion: "Lingua / regione",
    colValid: "{word} valida?",
    colYes: "Sì",
    colNo: "No",
    wordListFootnote:
      "* Non esiste un dizionario ufficiale di Scarabeo liberamente distribuibile per il tedesco né per il portoghese — wordIzy usa le proprie liste filtrate (le stesse dei giochi tedesco e portoghese di questo sito).",
    accentsFootnote:
      "La ricerca segue la convenzione del sito: niente accenti nelle URL (é → e), quindi PERCHE corrisponde a PERCHÉ nello Zingarelli.",
    faqTitle: "Domande frequenti",
    faqValidQ1: "{word} è una parola valida di Scrabble?",
    faqValidA1:
      "Sì, {word} è una parola valida nello Scarabeo italiano: compare nello Zingarelli, il dizionario di riferimento. Vale {points} punti.",
    faqValidQ2: "Quanti punti vale {word} a Scarabeo?",
    faqValidA2:
      "{word} vale {points} punti a Scarabeo, la somma dei valori delle tessere: {breakdown}.",
    faqOtherQ: "{word} è valida in altre lingue?",
    faqOtherA:
      "Sì. {word} non è valida in italiano (Zingarelli), ma è una parola valida in {list}. Si può giocare allo Scarabeo nelle lingue che usano quei dizionari.",
    faqInvalidQ1: "{word} è una parola valida di Scrabble?",
    faqInvalidA1:
      "No, {word} non è una parola valida di Scrabble: non compare né nello Zingarelli (dizionario italiano di riferimento), né nei dizionari inglesi (NWL2023, CSW21), né negli altri cinque dizionari verificati in questa pagina.",
    faqInvalidQ2: "Perché {word} non è valida?",
    faqInvalidA2:
      "Ogni lingua gioca con il proprio dizionario ufficiale. Motivi più frequenti di esclusione: nome proprio, abbreviazione, prefisso o suffisso da solo, forma con trattino o apostrofo, o parola semplicemente assente dal dizionario.",
    breadcrumbWord: "{word} è una parola di Scrabble?",
    shareTitle: "{word} è una parola valida di Scrabble?",
    allWords: "Tutte le parole Scrabble",
    checkIn: "Controlla {word} in:",
    selfLanguageName: "italiano",
    wordListName: "lista wordIzy",
    langNames: {
      en: "Inglese",
      fr: "Francese",
      es: "Spagnolo",
      it: "Italiano",
      nl: "Olandese",
      de: "Tedesco",
      pt: "Portoghese",
    },
    nwlRegion: "Inglese — Nord America",
    cswRegion: "Inglese — internazionale",
  },

  // ────────────────────────────────────────────────────────────────────
  nl: {
    indexTitle: "Scrabble-woorden — geldig volgens OpenTaal",
    indexDesc:
      "Is het een geldig Scrabble-woord in het Nederlands? Controleer elk woord in OpenTaal, met punten, en in 7 andere Scrabble-woordenboeken.",
    indexH1: "Is het een geldig Scrabble-woord in het Nederlands?",
    indexIntro:
      "Elk woord uit de Nederlandse woordenlijst (OpenTaal) heeft een eigen pagina: geldigheid, puntwaarde volgens de Nederlandse tegels en een uitsplitsing per letter. Blader hieronder per lengte, of open direct een woordpagina, bijvoorbeeld /nl/scrabble-words/koe.",
    indexDictNote:
      "Elke woordpagina controleert ook 7 andere woordenboeken: Engels (NWL2023 en CSW21), Frans (ODS9), Spaans (FISE), Italiaans (Zingarelli) en de Duitse en Portugese woordlijsten van wordIzy. Een woord dat niet in OpenTaal staat, kan dus speelbaar zijn in een andere taal.",
    lengthTitle: "Scrabble-woorden van {n} letters",
    sampleNote:
      "Een selectie van geldige woorden van {n} letters. Klik op een woord voor de punten en de volledige geldigheid.",
    browseAll: "Blader door alle Scrabble-woorden van {n} letters →",
    whatCountsH2: "Wat is een geldig Scrabble-woord in het Nederlands?",
    whatCountsBody:
      "Nederlands Scrabble wordt gespeeld met de officiële spelwoordenlijst (Woordenlijst Nederlandse Taal); deze site gebruikt de open versie daarvan, OpenTaal. Eigennamen, afkortingen en vormen met koppelteken of apostrof zijn niet geldig. Diakritische tekens bestaan in het spel, maar de URL's van deze site schrijven ze weg: de pagina ELEVE komt dus overeen met het Franse ÉLÈVE, en Nederlandse woorden worden op dezelfde manier zonder accenten opgezocht.",
    accentsNote:
      "Afspraak op deze site: URL's zonder diakritische tekens (é → e), dus woorden met accenten worden zonder accenten opgezocht.",
    relatedTools: "Gerelateerde tools",
    alsoInLabel: "Deze pagina bestaat ook in:",
    backHome: "Terug naar de startpagina",
    titleValid: "{word} in Scrabble: ja, {points} punten",
    titleOther: "{word}: geldig in een andere taal",
    titleInvalid: "Is {word} een geldig Scrabble-woord?",
    descValid:
      "{word} is een geldig Nederlands Scrabble-woord (OpenTaal) en is {points} punten waard. Letteruitsplitsing en geldigheid in 7 andere woordenboeken.",
    descOther:
      "{word} is geen geldig Nederlands Scrabble-woord (OpenTaal), maar wel in andere woordenboeken. Bekijk in welke.",
    descInvalid:
      "{word} is geen geldig Scrabble-woord: niet in het Nederlands (OpenTaal) en niet in de 7 andere woordenboeken. Lees waarom.",
    h1: "Is {word} een geldig Scrabble-woord?",
    subline: "Geldigheidscontrole · OpenTaal + 7 andere woordenboeken",
    answerValid: "Ja — {word} is een geldig Scrabble-woord en is {points} punten waard.",
    answerValidSub:
      "{word} staat in OpenTaal, de open versie van de officiële Nederlandse spelwoordenlijst. De {points} punten gebruiken de officiële Nederlandse tegelwaarden.",
    answerOther: "Nee — {word} is geen geldig Nederlands Scrabble-woord.",
    answerOtherSub:
      "{word} staat niet in OpenTaal. Het is echter wel elders geldig: {list}. Het is dus speelbaar in de talen die die woordenboeken gebruiken.",
    answerInvalid: "Nee — {word} is geen geldig Scrabble-woord.",
    answerInvalidSub:
      "{word} staat noch in OpenTaal (Nederlands), noch in de Engelse woordenboeken (NWL2023, CSW21), noch in de vijf andere talen die deze pagina controleert.",
    pointsH2: "{word} — {points} punten in Scrabble",
    pointsIntro:
      "{word} is {points} punten waard in Nederlands Scrabble, berekend met de officiële tegelwaarden:",
    colLetter: "Letter",
    colCount: "Aantal",
    colEach: "Punten per stuk",
    colSubtotal: "Subtotaal",
    colTotal: "Totaal",
    crossH2: "{word} in elk woordenboek",
    crossIntro:
      "Scrabble-woordenboeken zijn taalspecifiek: een woord dat in het Nederlands niet mag, kan in een andere taal prima legaal zijn. Zo presteert {word} in de acht woordenboeken:",
    colDict: "Woordenboek",
    colRegion: "Taal / regio",
    colValid: "{word} geldig?",
    colYes: "Ja",
    colNo: "Nee",
    wordListFootnote:
      "* Er bestaat geen vrij verspreid officieel Scrabble-woordenboek voor Duits of Portugees — wordIzy gebruikt eigen gefilterde woordlijsten (dezelfde als in de Duitse en Portugese spellen op deze site).",
    accentsFootnote:
      "De zoekfunctie volgt de sitebrede afspraak: zonder diakritische tekens (é → e), dus geaccentueerde woorden worden zonder accenten gezocht.",
    faqTitle: "Veelgestelde vragen",
    faqValidQ1: "Is {word} een geldig Scrabble-woord?",
    faqValidA1:
      "Ja, {word} is een geldig Nederlands Scrabble-woord: het staat in OpenTaal, de open versie van de officiële woordenlijst. Het is {points} punten waard.",
    faqValidQ2: "Hoeveel punten is {word} waard in Scrabble?",
    faqValidA2:
      "{word} is {points} punten waard in Nederlands Scrabble, de som van de tegelwaarden: {breakdown}.",
    faqOtherQ: "Is {word} een geldig woord in andere talen?",
    faqOtherA:
      "Ja. {word} is niet geldig in het Nederlands (OpenTaal), maar wel in {list}. Je kunt het spelen in de talen die die woordenboeken gebruiken.",
    faqInvalidQ1: "Is {word} een geldig Scrabble-woord?",
    faqInvalidA1:
      "Nee, {word} is geen geldig Scrabble-woord: het staat niet in OpenTaal (Nederlands), niet in de Engelse woordenboeken (NWL2023, CSW21) en niet in de vijf andere woordenboeken die deze pagina controleert.",
    faqInvalidQ2: "Waarom is {word} niet geldig?",
    faqInvalidA2:
      "Elke taal speelt met zijn eigen officiële woordenboek. Veelvoorkomende redenen voor uitsluiting: eigennaam, afkorting, los voor- of achtervoegsel, vorm met koppelteken of apostrof, of het woord komt simpelweg niet in het woordenboek voor.",
    breadcrumbWord: "Is {word} een Scrabble-woord?",
    shareTitle: "Is {word} een geldig Scrabble-woord?",
    allWords: "Alle Scrabble-woorden",
    checkIn: "Controleer {word} in:",
    selfLanguageName: "Nederlands",
    wordListName: "wordIzy-woordenlijst",
    langNames: {
      en: "Engels",
      fr: "Frans",
      es: "Spaans",
      it: "Italiaans",
      nl: "Nederlands",
      de: "Duits",
      pt: "Portugees",
    },
    nwlRegion: "Engels — Noord-Amerika",
    cswRegion: "Engels — internationaal",
  },

  // ────────────────────────────────────────────────────────────────────
  de: {
    indexTitle: "Scrabble-Wörter — Gültigkeit laut Wortliste",
    indexDesc:
      "Ist es ein gültiges deutsches Scrabble-Wort? Prüfe jedes Wort in der wordIzy-Wortliste, mit Punktwert, und in 7 weiteren Scrabble-Wörterbüchern.",
    indexH1: "Ist es ein gültiges deutsches Scrabble-Wort?",
    indexIntro:
      "Jedes Wort aus der deutschen Wortliste hat eine eigene Seite: Gültigkeit, Punktwert nach den deutschen Steinwerten und eine Aufschlüsselung Buchstabe für Buchstabe. Stöbere unten nach Wortlänge, oder öffne direkt eine Wortseite, zum Beispiel /de/scrabble-words/gluck.",
    indexDictNote:
      "Jede Wortseite prüft zusätzlich 7 weitere Wörterbücher: Englisch (NWL2023 und CSW21), Französisch (ODS9), Spanisch (FISE), Italienisch (Zingarelli) sowie die niederländische OpenTaal-Liste und die portugiesische wordIzy-Liste. Ein Wort, das nicht in der deutschen Liste steht, kann in einer anderen Sprache spielbar sein.",
    lengthTitle: "Scrabble-Wörter mit {n} Buchstaben",
    sampleNote:
      "Eine Auswahl gültiger Wörter mit {n} Buchstaben. Klicke auf ein Wort für Punkte und alle Gültigkeitsdetails.",
    browseAll: "Alle Scrabble-Wörter mit {n} Buchstaben durchsuchen →",
    whatCountsH2: "Was ist ein gültiges deutsches Scrabble-Wort?",
    whatCountsBody:
      "Es existiert kein frei lizenziertes offizielles deutsches Scrabble-Wörterbuch — wordIzy verwendet daher eine gefilterte deutsche Wortliste (dieselbe Liste wie beim deutschen Spiel auf dieser Seite). Eigennamen, Abkürzungen und Formen mit Bindestrich sind nicht gültig. Umlaute werden im Spiel gespielt (Ä, Ö, Ü), in den URL dieser Seite aber ohne Akzent geschrieben: die Seite GLUCK entspricht dem Wort GLÜCK.",
    accentsNote:
      "Konvention der Website: URL ohne Diakritika (ü → u), GLUCK entspricht also GLÜCK in der deutschen Wortliste.",
    relatedTools: "Verwandte Tools",
    alsoInLabel: "Diese Seite gibt es auch auf:",
    backHome: "Zurück zur Startseite",
    titleValid: "{word} bei Scrabble: ja, {points} Punkte",
    titleOther: "{word}: gültig in einer anderen Sprache",
    titleInvalid: "Ist {word} ein gültiges Scrabble-Wort?",
    descValid:
      "{word} ist ein gültiges deutsches Scrabble-Wort (wordIzy-Liste) und {points} Punkte wert. Buchstabenaufschlüsselung und Gültigkeit in 7 weiteren Wörterbüchern.",
    descOther:
      "{word} ist kein gültiges deutsches Scrabble-Wort, aber in anderen Wörterbüchern gültig. Sieh nach, in welchen.",
    descInvalid:
      "{word} ist kein gültiges Scrabble-Wort: weder Deutsch noch in den 7 anderen Wörterbüchern. Erfahre, warum.",
    h1: "Ist {word} ein gültiges Scrabble-Wort?",
    subline: "Gültigkeitsprüfung · deutsche Wortliste + 7 weitere Wörterbücher",
    answerValid: "Ja — {word} ist ein gültiges Scrabble-Wort und {points} Punkte wert.",
    answerValidSub:
      "{word} steht in der wordIzy-Wortliste für Deutsch — dieselbe Liste, die das deutsche Spiel auf dieser Seite verwendet. Die {points} Punkte nutzen die offiziellen deutschen Steinwerte.",
    answerOther: "Nein — {word} ist kein gültiges deutsches Scrabble-Wort.",
    answerOtherSub:
      "{word} steht nicht in der deutschen Wortliste. Es ist jedoch woanders gültig: {list}. Es ist also in den Sprachen spielbar, die diese Wörterbücher verwenden.",
    answerInvalid: "Nein — {word} ist kein gültiges Scrabble-Wort.",
    answerInvalidSub:
      "{word} kommt weder in der deutschen Wortliste vor, noch in den englischen Wörterbüchern (NWL2023, CSW21), noch in den fünf weiteren Sprachen, die diese Seite prüft.",
    pointsH2: "{word} — {points} Punkte bei Scrabble",
    pointsIntro:
      "{word} ist {points} Punkte wert — berechnet mit den offiziellen deutschen Steinwerten:",
    colLetter: "Buchstabe",
    colCount: "Anzahl",
    colEach: "Punkte je Stein",
    colSubtotal: "Zwischensumme",
    colTotal: "Gesamt",
    crossH2: "{word} in jedem Wörterbuch",
    crossIntro:
      "Scrabble-Wörterbücher sind sprachspezifisch: Ein im Deutschen unspielbares Wort kann in einer anderen Sprache völlig legal sein. So schlägt sich {word} in den acht Wörterbüchern:",
    colDict: "Wörterbuch",
    colRegion: "Sprache / Region",
    colValid: "{word} gültig?",
    colYes: "Ja",
    colNo: "Nein",
    wordListFootnote:
      "* Für Deutsch und Portugiesisch existiert kein frei lizenziertes offizielles Scrabble-Wörterbuch — wordIzy verwendet eigene gefilterte Wortlisten (dieselben wie im deutschen und portugiesischen Spiel dieser Seite).",
    accentsFootnote:
      "Die Suche folgt der Konvention der Website: ohne Diakritika (ü → u), GLUCK entspricht also GLÜCK.",
    faqTitle: "Häufige Fragen",
    faqValidQ1: "Ist {word} ein gültiges Scrabble-Wort?",
    faqValidA1:
      "Ja, {word} ist ein gültiges deutsches Scrabble-Wort: Es steht in der wordIzy-Wortliste für Deutsch. Es ist {points} Punkte wert.",
    faqValidQ2: "Wie viele Punkte ist {word} bei Scrabble wert?",
    faqValidA2:
      "{word} ist {points} Punkte wert — die Summe der Steinwerte: {breakdown}.",
    faqOtherQ: "Ist {word} in anderen Sprachen ein gültiges Wort?",
    faqOtherA:
      "Ja. {word} ist im Deutschen nicht gültig, aber in {list}. Es kann in den Sprachen gespielt werden, die diese Wörterbücher verwenden.",
    faqInvalidQ1: "Ist {word} ein gültiges Scrabble-Wort?",
    faqInvalidA1:
      "Nein, {word} ist kein gültiges Scrabble-Wort: Es steht weder in der deutschen Wortliste, noch in den englischen Wörterbüchern (NWL2023, CSW21), noch in den fünf weiteren von dieser Seite geprüften Wörterbüchern.",
    faqInvalidQ2: "Warum ist {word} nicht gültig?",
    faqInvalidA2:
      "Jede Sprache spielt mit ihrem eigenen offiziellen Wörterbuch. Häufigste Ausschlussgründe: Eigenname, Abkürzung, allein stehendes Präfix oder Suffix, Form mit Bindestrich — oder das Wort fehlt schlicht im Wörterbuch.",
    breadcrumbWord: "Ist {word} ein Scrabble-Wort?",
    shareTitle: "Ist {word} ein gültiges Scrabble-Wort?",
    allWords: "Alle Scrabble-Wörter",
    checkIn: "Prüfe {word} auf:",
    selfLanguageName: "Deutsch",
    wordListName: "wordIzy-Wortliste",
    langNames: {
      en: "Englisch",
      fr: "Französisch",
      es: "Spanisch",
      it: "Italienisch",
      nl: "Niederländisch",
      de: "Deutsch",
      pt: "Portugiesisch",
    },
    nwlRegion: "Englisch — Nordamerika",
    cswRegion: "Englisch — international",
  },

  // ────────────────────────────────────────────────────────────────────
  pt: {
    indexTitle: "Palavras de Scrabble — validade (lista wordIzy)",
    indexDesc:
      "É uma palavra válida no Scrabble em português? Verifique qualquer palavra na lista wordIzy, com os pontos, e em mais 7 dicionários de Scrabble.",
    indexH1: "É uma palavra válida no Scrabble em português?",
    indexIntro:
      "Cada palavra da lista portuguesa tem a sua própria página: validade, valor em pontos segundo as peças portuguesas e detalhe letra por letra. Explore as palavras por tamanho abaixo, ou abra diretamente uma página, por exemplo /pt/scrabble-words/casa.",
    indexDictNote:
      "Cada página de palavra verifica também mais 7 dicionários: inglês (NWL2023 e CSW21), francês (ODS9), espanhol (FISE), italiano (Zingarelli), neerlandês (OpenTaal) e a lista alemã da wordIzy. Uma palavra ausente da lista portuguesa pode ser jogável noutra língua.",
    lengthTitle: "Palavras de Scrabble com {n} letras",
    sampleNote:
      "Uma amostra de palavras válidas com {n} letras. Clique numa palavra para ver os pontos e a validade completa.",
    browseAll: "Explorar todas as palavras de Scrabble de {n} letras →",
    whatCountsH2: "O que é uma palavra válida no Scrabble em português?",
    whatCountsBody:
      "Não existe um dicionário oficial de Scrabble em português com licença livre — o wordIzy usa uma lista de palavras portuguesa filtrada (a mesma lista do jogo em português deste site). Nomes próprios, abreviaturas e formas com hífen não são válidas. As letras acentuadas existem no jogo (Á, Ç, Õ…), mas as URL deste site escrevem-nas sem acentos: a página CORACAO corresponde a CORAÇÃO.",
    accentsNote:
      "Convenção do site: as URL vão sem acentos (ç → c), por isso CORACAO corresponde a CORAÇÃO na lista portuguesa.",
    relatedTools: "Ferramentas relacionadas",
    alsoInLabel: "Esta página também existe em:",
    backHome: "Voltar ao início",
    titleValid: "{word} no Scrabble: sim, {points} pontos",
    titleOther: "{word}: válida em outro idioma",
    titleInvalid: "{word} é uma palavra válida de Scrabble?",
    descValid:
      "{word} é uma palavra válida no Scrabble em português (lista wordIzy) e vale {points} pontos. Detalhe das letras e validade em mais 7 dicionários.",
    descOther:
      "{word} não é válida no Scrabble em português, mas é válida noutros dicionários. Veja em quais.",
    descInvalid:
      "{word} não é uma palavra válida de Scrabble: nem em português nem nos outros 7 dicionários. Descubra porquê.",
    h1: "{word} é uma palavra válida de Scrabble?",
    subline: "Verificação de validade · lista wordIzy + 7 dicionários",
    answerValid: "Sim — {word} é uma palavra válida de Scrabble e vale {points} pontos.",
    answerValidSub:
      "{word} consta na lista de palavras portuguesa da wordIzy — a mesma lista usada pelo jogo em português deste site. Os {points} pontos usam os valores oficiais das peças portuguesas.",
    answerOther: "Não — {word} não é válida no Scrabble em português.",
    answerOtherSub:
      "{word} não consta na lista portuguesa. No entanto, é válida noutros idiomas: {list}. É jogável no Scrabble nas línguas que usam esses dicionários.",
    answerInvalid: "Não — {word} não é uma palavra válida de Scrabble.",
    answerInvalidSub:
      "{word} não aparece nem na lista portuguesa, nem nos dicionários ingleses (NWL2023, CSW21), nem nas outras cinco línguas verificadas nesta página.",
    pointsH2: "{word} — {points} pontos no Scrabble",
    pointsIntro:
      "{word} vale {points} pontos no Scrabble em português, calculados com os valores oficiais das peças:",
    colLetter: "Letra",
    colCount: "Quantidade",
    colEach: "Pontos cada",
    colSubtotal: "Subtotal",
    colTotal: "Total",
    crossH2: "{word} em todos os dicionários",
    crossIntro:
      "Os dicionários de Scrabble são próprios de cada língua: uma palavra injogável em português pode ser perfeitamente legal noutra. Veja como {word} se comporta nos oito dicionários:",
    colDict: "Dicionário",
    colRegion: "Idioma / região",
    colValid: "{word} válida?",
    colYes: "Sim",
    colNo: "Não",
    wordListFootnote:
      "* Não existe um dicionário oficial de Scrabble livremente distribuído para alemão nem português — o wordIzy usa as suas próprias listas filtradas (as mesmas dos jogos alemão e português deste site).",
    accentsFootnote:
      "A pesquisa segue a convenção do site: sem acentos na URL (ç → c), por isso CORACAO corresponde a CORAÇÃO.",
    faqTitle: "Perguntas frequentes",
    faqValidQ1: "{word} é uma palavra válida de Scrabble?",
    faqValidA1:
      "Sim, {word} é uma palavra válida no Scrabble em português: consta na lista de palavras da wordIzy. Vale {points} pontos.",
    faqValidQ2: "Quantos pontos vale {word} no Scrabble?",
    faqValidA2:
      "{word} vale {points} pontos no Scrabble em português, a soma dos valores das peças: {breakdown}.",
    faqOtherQ: "{word} é válida noutros idiomas?",
    faqOtherA:
      "Sim. {word} não é válida em português, mas é uma palavra válida em {list}. Pode ser jogada no Scrabble nas línguas que usam esses dicionários.",
    faqInvalidQ1: "{word} é uma palavra válida de Scrabble?",
    faqInvalidA1:
      "Não, {word} não é uma palavra válida de Scrabble: não consta na lista portuguesa, nem nos dicionários ingleses (NWL2023, CSW21), nem nos outros cinco dicionários verificados nesta página.",
    faqInvalidQ2: "Porque é que {word} não é válida?",
    faqInvalidA2:
      "Cada língua joga com o seu próprio dicionário oficial. Razões mais frequentes de exclusão: nome próprio, abreviatura, prefixo ou sufixo isolado, forma com hífen ou apóstrofo, ou palavra simplesmente ausente do dicionário.",
    breadcrumbWord: "{word} é uma palavra de Scrabble?",
    shareTitle: "{word} é uma palavra válida de Scrabble?",
    allWords: "Todas as palavras de Scrabble",
    checkIn: "Verificar {word} em:",
    selfLanguageName: "português",
    wordListName: "lista wordIzy",
    langNames: {
      en: "Inglês",
      fr: "Francês",
      es: "Espanhol",
      it: "Italiano",
      nl: "Neerlandês",
      de: "Alemão",
      pt: "Português",
    },
    nwlRegion: "Inglês — América do Norte",
    cswRegion: "Inglês — internacional",
  },
};
