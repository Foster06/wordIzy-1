// src/lib/wordle-articles-fr.ts — Wordle articles in French.
// Written FOR francophone players playing ENGLISH Wordle (the game is
// English-only). Not a literal translation: each entry contrasts English
// Wordle patterns with French expectations.
//
// AUTHORING NOTES (mirrors the EN flagship in wordle-articles.ts):
//  • Wordle answers are ENGLISH words — every example stays English and every
//    frequency/position/tile fact matches the EN edition exactly.
//  • The <WordListArticle /> component fills {score}/{count}/{double}/{triple}
//    with the FRENCH (ODS) tile values on French pages, so tileTemplate
//    attributes them to "Scrabble francophone" and then teaches the ENGLISH
//    tile values — the crossover WordIzy displays next to every answer — as
//    static text (Q/Z=10, J/X=8, K=5, F/H/V/W/Y=4, B/C/M/P=3, D/G=2).
//  • {motTuile} is the component's French equivalent of {tileWord}
//    ("tuile"/"tuiles" per count) — see tileVars in word-list-article.tsx.
//  • Per-letter starts/ends render WITHOUT placeholder interpolation: keep
//    them brace-free.
//
// Placeholders: {letter} {Letter} {angle} {score} {count} {total} {plural}
//               {motTuile} {double} {triple}

import type { WordleArticleContent } from "./wordle-articles";

export const FR_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "Comment gagner au Wordle grâce aux {angle}",
  startsLead:
    "Le Wordle est un jeu anglais : les réponses sont toujours des mots anglais, même si l'interface est en français — et c'est précisément là que votre double culture devient une arme. {total} réponses valides commencent par la lettre {letter}, et chaque position d'ouverture obéit à des habitudes statistiques précises. Ce guide couvre les tactiques des ouvreurs en {letter}, la valeur du jeton au Scrabble anglais pour les joueurs qui pratiquent les deux jeux, et les coups au score le plus élevé qui se cachent dans la liste en direct ci-dessus.",
  endsLead:
    "Les finales sont là où les séries Wordle se sauvent ou se perdent — surtout pour un francophone, car l'anglais ose finir ses mots par des consonnes dures (T, R, N, D) que le français évite soigneusement. {total} réponses valides se terminent par la lettre {letter}, et leurs familles de schémas se maîtrisent bien mieux par l'étude que par le hasard. Ce guide détaille les stratégies des finales en {letter}, les valeurs Scrabble affichées par WordIzy à côté de chaque réponse, et les coups à gros score à mémoriser.",
  tileTemplate:
    "Passerelle Scrabble : au Scrabble francophone, la lettre {Letter} vaut {score} point{plural} et il n'existe que {count} {motTuile} en jeu — {double} points sur une case Lettre compte double, {triple} sur une case Lettre compte triple. Mais Wordle est un jeu anglais : les scores que WordIzy affiche à côté de chaque réponse suivent les valeurs du Scrabble anglais (Q et Z à 10, J et X à 8, K à 5, F, H, V, W et Y à 4). Quand une réponse Wordle double comme coup de Scrabble anglais à gros score, repérez-la aussitôt dans la liste en direct ci-dessus et rangez-la pour votre prochain chevalet.",
  topWordsHeading: "Mots Wordle en {Letter} au score le plus élevé",
  topWordsLead:
    "Voici les réponses valides du Wordle contenant la lettre {letter}, classées par points Scrabble et tirées en direct de notre base de données. Elles font double emploi : essais solides pour le puzzle du jour ET coups de valeur au Scrabble :",
  closing:
    "La différence entre un joueur du dimanche et un gardien de série tient rarement à la chance : elle tient à la connaissance des mots en {letter} valides au Wordle, à la position statistique que la lettre préfère, et à l'art de dépenser chaque essai en information maximale. Mettez cette page en favori, entraînez-vous sur les meilleurs mots ci-dessus, et {letter} deviendra un indice que vous exploitez plutôt qu'une case que vous redoutez.",
  letters: {
    a: {
      title: "mots en A pour des ouvertures percutantes",
      starts:
        "A est la deuxième lettre d'ouverture la plus fréquente du Wordle : environ une réponse sur douze commence par elle, derrière le seul S. Les schémas dominants sont AD-, AL-, AN-, AR- et AT- (ADAPT, ALERT, ANGEL, ARGUE, ATLAS). ANGEL est le cousin de l'ANGE français, mais le Wordle ne retient que les mots anglais : votre vocabulaire de Molière servira d'intuition, jamais de réponse. Les ouvreurs ADIEU et AUDIO testent quatre voyelles d'un coup, le moyen le plus rapide de savoir si E, I, O ou U figure dans la réponse du jour. Un A vert en première case ? Testez le triangle ANGEL-ARGUE-ATLAS ; un A jaune préfère la case deux.",
      ends:
        "Moins de trois pour cent des réponses se terminent par A, bien moins qu'on ne l'imagine. Cette famille de finales est un club d'emprunts, exactement comme en français où PANDA et LLAMA sont des mots importés : AURA, COMA, DRAMA, EXTRA, KOALA, MAFIA, OMEGA, PANDA, VILLA, YOGA, ZEBRA. Un A jaune pointe presque toujours vers les cases deux ou trois, jamais la cinquième — testez d'abord l'intérieur du mot. Côté Scrabble anglais, le A ne vaut qu'un point (neuf jetons) et la plupart des finales en A restent modestes, mais EXTRA (12 points) et ZEBRA (16 points) sont des coups étonnamment rentables qui gagnent aux deux jeux.",
    },
    b: {
      title: "mots en B pour des essais audacieux",
      starts:
        "B est la troisième lettre d'ouverture la plus fréquente : environ une réponse sur quatorze commence par elle (BLACK, BREAD, BRING, BONUS, BEACH). Les mots en B excellent en deuxième essai car la lettre apparaît rarement ailleurs : un B gris élimine d'un coup toute la gamme BA-, BE-, BI-, BO-, BU-, une couverture remarquable par essai. Les schémas dominants sont les digrammes BL- et BR- (BLACK, BLADE, BRICK, BROTH), familiers au francophone (BLOND, BRAVO), suivis de BE- (BEAST, BEGIN, BENCH). Comme les ouvreurs voyellisés type ADIEU ne contiennent aucun B, un B vert impose une seconde passe sur votre carte des voyelles.",
      ends:
        "Aucune réponse du Wordle ne se termine par B : la liste est vide, car les mots anglais terminés par B existent surtout au-delà de cinq lettres (absorb, describe). Le français finit lui aussi très rarement par B — PLOMB est une exception isolée — et cette rareté partagée offre une élimination gratuite : cinquième case floue en fin de partie ? Misez sur une finale fréquente (E, Y, T) plutôt que sur un B impossible. Un B jaune pointe donc vers les cases deux ou trois (RABID, ROBOT, HABIT, CABLE). Côté Scrabble anglais, le jeton B vaut 3 points (deux exemplaires) : CABLE (9) et GAMBLE (10) sont les coups rentables du B intérieur.",
    },
    c: {
      title: "mots en C pour couvrir les schémas",
      starts:
        "C est la deuxième lettre d'ouverture la plus fréquente du Wordle : près d'une réponse sur dix commence par elle, via les familles CA-, CO- et CR- (CANDY, COUCH, CRANE, CROSS). Le francophone y retrouve la double sonorité du C français : dur devant A et O (CATCH, CRANE), doux devant E, I et Y (CIDER, CYCLE, CIVIC) — un seul essai échantillonne les deux familles phonétiques. Mais oubliez le C cédille : le Ç de GARÇON n'existe pas au Wordle, les mots anglais s'écrivent sans diacritique. L'ouvreur CRANE est célèbre pour une bonne raison : il concentre C, R, A, N et E, cinq lettres parmi les plus rentables.",
      ends:
        "Pratiquement aucune réponse du Wordle ne se termine par C : les mots de cinq lettres à C final sont absents de la liste, car MUSIC et LOGIC placent leur C en case quatre, jamais cinq. Rappel pour francophone : MUSIC est le MUSIQUE anglais amputé de son -QUE — la graphie française ne sera jamais la réponse. Un C jaune signale typiquement les cases une ou quatre (CHAIR, MAGIC). Côté Scrabble anglais, le C vaut 3 points (deux jetons) : MUSIC (9 points), MAGIC (9) et LOGIC (6) sont d'excellentes réponses Wordle qui doublent en coups propres, surtout posés sur une case Lettre compte double.",
    },
    d: {
      title: "mots en D et la déduction -ED",
      starts:
        "D est un ouvreur de fréquence moyenne : environ une réponse sur vingt commence par D (DANCE, DAILY, DIARY, DOUBT, DREAM, DRINK). Les mots en D se regroupent en deux pôles : la famille voyellisée DA-/DE- (DANCE, DEBUT, DELTA) et le digramme DR- (DREAM, DRIFT, DRIVE, DROWN). Le réflexe français des finales en -É (aimé, dansé) devient ici un atout : le passé anglais s'écrit -ED, sans accent aigu, et D est l'une des quatre lettres finales les plus fréquentes du Wordle. Confirmer un D tôt réorganise la fin de partie : un D gris en case cinq vaut autant qu'un D vert en case un.",
      ends:
        "D est la septième finale la plus fréquente — environ quatre pour cent des réponses — presque uniquement via les formes du passé en -ED (FIXED, BROAD, BLOOD, THIRD) et les noms en -D (WORLD, BLOND, HOUND, FIELD, BEARD). Cette famille est un cadeau déductif : si E et D sont confirmés, la réponse est probablement un verbe au passé, et les premières lettres portent le sens. Fait rare : ces mots riment en famille — WOULD, COULD, SOUND, FOUND — où un essai correct en déverrouille plusieurs. Côté Scrabble anglais, D vaut 2 points (quatre jetons) ; WORLD et WOUND à 9, BROAD à 8 : des coups modestes mais réguliers.",
    },
    e: {
      title: "mots en E, la voyelle reine",
      starts:
        "E est la lettre la plus fréquente du Wordle — environ 11 % de toutes les lettres — et votre oreille française la surteste encore plus : en français, E frôle les 15 %. Bonne nouvelle : c'est souvent la bonne intuition. Mauvaise nouvelle : moins de deux pour cent des réponses commencent par E (EAGLE, EARLY, EARTH, EIGHT, ELITE, EMPTY, ENEMY, ENTER, EQUAL, ERUPT, EXACT, EXTRA). Oubliez ÉCOLE ou ÈRE : les accents aigus et graves n'existent pas au Wordle, les mots anglais s'écrivent sans diacritiques. Les familles dominantes sont EA- (EAGLE, EARLY, EARTH), EM-/EN- (EMPTY, ENEMY, ENTER) et le duo premium EX- (EXACT, EXTRA).",
      ends:
        "E règne sur les finales : environ une réponse sur cinq se termine par E, de loin la lettre finale la plus fréquente. Votre réflexe de la terminaison féminine française en -E (UNE, BELLE) pointe ici dans la bonne direction — l'anglais adore aussi finir par E. Les familles productives sont -KE, -LE, -NE, -SE, -TE et -VE (SNAKE, APPLE, STONE, HOUSE, WRITE, GIVE), plus la famille comparative -ER (AFTER, WATER, SUPER). Quand il ne reste qu'une case floue et plusieurs voyelles grises, E est le pari statistique correct en position cinq. Côté Scrabble anglais, E vaut 1 point (douze jetons), mais HOUSE (8) et STONE (5) débarrassent un chevalet dans les deux jeux.",
    },
    f: {
      title: "mots en F pour éliminer vite",
      starts:
        "F est un ouvreur de fréquence moyenne : environ une réponse sur vingt commence par F (FAIRY, FIELD, FIRST, FLOAT, FRONT, FRUIT). Les mots en F sont de l'or pour l'élimination, car la lettre apparaît rarement ailleurs : un F gris tue instantanément les familles FA-, FE-, FI-, FO- et FU-, une couverture exceptionnelle par essai. Le schéma dominant est le digramme FR- (FRESH, FRIED, FRONT, FROST), aussi naturel au francophone qu'à l'anglophone — pensez à FROMAGE ou FRAPPER — suivi des paires FA-/FE- (FANCY, FEAST, FIBER). Les ouvreurs SLATE et CRANE ignorent F : une sonde dédiée (FRONT, FROST) mérite un essai en milieu de partie.",
      ends:
        "Quasiment aucune réponse du Wordle ne se termine par F : la liste n'en contient aucune, car les finales natives en -F exigent des mots plus longs (itself, behalf). Exploitez ce zéro : quand la dernière lettre reste inconnue, F n'est jamais la solution, donc un F jaune signale l'intérieur — où se logent KNIFE, WOLF et CHEF. Petite fierté nationale : CHEF est passé tel quel dans l'anglais. Le F anglais valant 4 points (deux jetons), KNIFE (12), WOLF (10) et CHEF (12) sont exactement les mots à double vie — gros au Scrabble anglais, valides au Wordle — que cette page sert à dénicher : cochez-les dans votre coffre.",
    },
    g: {
      title: "mots en G et le schéma -ING",
      starts:
        "G est un ouvreur peu fréquent : moins de trois pour cent des réponses commencent par G (GHOST, GIANT, GIVEN, GLASS, GRACE, GRASP, GROUP, GUESS). Presque toutes passent par le digramme GR- (GRAND, GRAPE, GRASP, GRAVE, GRILL, GROWL), avec GL- (GLASS, GLORY) et GO- (GOOSE) en soutien. Un G vert en case un plus un R confirmé oriente aussitôt vers le triangle GRA-/GRE-. Réflexe de francophone à inverser : notre gérondif finit en -ANT (en chantant), celui de l'anglais finit en -ING — G est bien plus fréquent en fin de réponse qu'en ouverture, tester G devant est un pari d'inversion délibéré.",
      ends:
        "Environ deux pour cent des réponses se terminent par G, réparties entre la famille du gérondif -ING (BRING, GOING, DYING, USING) et les monosyllabes en -NG (AMONG, STRONG, WRONG, YOUNG). La déduction est puissante : un G vert en case cinq plus une indication de voyelle pointe aussitôt vers -ING ou -ONG, et les premières lettres deviennent consultables. Piège pour francophone : nos nasales finales -ENT et -ANT (CHANTENT, COURANT) ressemblent aux finales anglaises, mais n'ont aucune valeur grammaticale au Wordle — ici, I-N-G confirmé prouve une forme verbale. Côté Scrabble anglais, G vaut 2 points (trois jetons) : BRING (8) et YOUNG (9) restent des coups modestes.",
    },
    h: {
      title: "mots en H, le décodeur de digrammes",
      starts:
        "H est un ouvreur rare seul, mais un invité constant : moins de trois pour cent des réponses commencent par H, la plupart via les digrammes qui dominent l'anglais — TH-, CH-, SH-, WH-. Les H-initiaux autonomes sont classiques (HABIT, HAPPY, HEART, HORSE, HOTEL, HUMAN, HURRY). Le français souffle à peine le H muet de HÔTEL, quand l'anglais aspire celui de HOTEL — et le Wordle n'accepte que la graphie sans accent. La valeur stratégique de H est de confirmer les digrammes : si T est jaune et que vous soupçonnez TH, un essai sur THEME ou THUMB résout les deux lettres d'un coup. SLATE ignore H : prévoyez une sonde dédiée.",
      ends:
        "Environ trois pour cent des réponses se terminent par H, via les familles à voyelle brève : -ACH (BEACH, TEACH), -ITCH (PITCH, SWITCH), -USH (BRUSH, FRESH) et les formes -UGH (TOUGH, ROUGH, LAUGH, MOUTH). Ces finales n'existent pas en français — la langue de Molière fuit les groupes consonantiques finaux — c'est un apprentissage spécifique, pas une intuition. Un H vert en case cinq annonce presque sûrement un monosyllabe à voyelle brève plus consonne finale, ce qui fait s'effondrer la liste des candidats. Côté Scrabble anglais, H vaut 4 points (deux jetons) ; WORTH (11) et YOUTH (11) sont d'authentiques coups de force qui tombent aussi au Wordle — des pépites pour votre coffre.",
    },
    i: {
      title: "mots en I, la voyelle de l'intérieur",
      starts:
        "I est un ouvreur rare : moins d'un pour cent des réponses commencent par I (IMAGE, INDEX, INPUT, IRONY, ISSUE, IVORY). Ces survivantes sont des emprunts et des termes techniques, alors que le français regorge de mots en I- (IDÉE, ICI). IMAGE est identique en français et IRONY n'est que l'IRONIE anglaise — mais le Wordle ne retient que la graphie anglaise. La famille du préfixe IN- (INDEX, INPUT) est le nœud le plus dense, suivie des formes IR-/IS- (IRONY, ISSUE). L'ouvreur ADIEU place I en case quatre, sa maison naturelle : I apparaît trois fois plus souvent aux positions trois et quatre qu'en position un — l'intérieur reste la stratégie par défaut.",
      ends:
        "Presque aucune réponse du Wordle ne se termine par I : l'anglais n'a pas de mots natifs de cinq lettres à I final — le français non plus, hors emprunts. Ce zéro est la stratégie : quand la dernière case est floue, ne testez jamais I. Un I jaune signe massivement les cases trois ou quatre, les loges des voyelles intérieures (MUSIC, LOGIC, VIVID, RIVAL, PILOT). La famille -IC (MUSIC, LOGIC, CIVIC, TOPIC) est son schéma le plus productif, plaçant I en case trois et C en case quatre. Côté Scrabble anglais, I vaut 1 point (neuf jetons) ; VIVID (12 points) est la vedette à double vie, rare Wordle à double V qui cartonne au Scrabble.",
    },
    j: {
      title: "mots en J, le départ le plus rare",
      starts:
        "J est l'une des lettres les plus rares du Wordle : environ 0,25 % des réponses le contiennent, et les ouvreurs se limitent à JOINT, JOKER, JUICE, JUDGE et JUICY. Contrairement au français, où J est banal (JOUR, JEUNE, JOLIE), le J anglais est exotique et change même de son, du son doux de JOUR au son « dj » de JUDGE. Cette rareté est la stratégie : un J vert réduit le champ à un club minuscule et mémorisable, et un essai délibéré (JOKER, JOINT, JUICE) résout une lettre qu'aucun ouvreur classique ne teste. La famille JU- domine, car le J anglais exige une voyelle derrière lui.",
      ends:
        "Aucune réponse du Wordle ne se termine par J : aucune, dans toute la liste officielle. Exploitez ce zéro comme élimination dure : un J jaune ne peut marquer que les cases un à quatre, en pratique un à trois. L'habitat réel de J est l'intérieur : MAJOR et BANJO le posent en cases trois et quatre, JOINT et JOKER le gardent en un, et ENJOY le place en quatre. Côté Scrabble anglais, J vaut 8 points (un seul jeton) : BANJO (14) et MAJOR (13) sont précisément les coups à double vie que cette page met en lumière.",
    },
    k: {
      title: "mots en K et le schéma CK",
      starts:
        "K est un ouvreur rare : environ un pour cent des réponses commencent par lui (KNIFE, KNOCK, KNOWN, KAYAK, KIOSK, KNEEL). Le francophone connaît déjà cette rareté : le K français n'existe qu'en mots importés (KILO, KIOSQUE, KAYAK). La signature du K anglais est la famille KN- à N muet (KNIFE, KNOCK, KNOWN, KNEEL) : la moitié de ses ouvreurs commencent par un N non prononcé, schéma unique de l'anglais. Un K vert en case un plus un N gris élimine d'un coup toute la famille KN-, information exceptionnelle par essai. Les formes KA-/KO- (KAYAK, KIOSK) sont des emprunts à voyelles doublées, à reconnaître à vue.",
      ends:
        "Environ trois pour cent des réponses se terminent par K, dominées par les familles à voyelle brève -ACK, -OCK, -ICK et -UCK : BLACK, BLOCK, BRICK, CLOCK, QUICK, STICK, STUCK, THINK, TRACK, SHACK. Le français évite ces finales de consonnes dures ; l'anglais en vit — c'est un réflexe à réapprendre entièrement. La déduction : un K vert en case cinq avec une voyelle brève confirmée signifie que la consonne centrale est presque sûrement L, R, S, T ou le digramme TH. Le CK est un indice grammatical : C et K confirmés annoncent un monosyllabe. Côté Scrabble anglais, K vaut 5 points (un jeton) : QUICK (18), BLACK (11) et THINK (12) sont les stars à double vie.",
    },
    l: {
      title: "mots en L, la finale liquide",
      starts:
        "L est un ouvreur assez courant : environ quatre pour cent des réponses commencent par L (LABEL, LARGE, LAUGH, LEARN, LEMON, LIGHT, LIMIT, LOCAL, LOYAL, LUNCH, LUCKY). Les familles voyellisées LA-/LE- portent la charge, épaulées par LO- (LOCAL, LOYAL). Vos réflexes français de digrammes FL-, CL-, PL- et BL- (FLOCON, CLAIR, PLACER, BLOND) vous servent directement : ces familles regorgent de réponses Wordle. L étant la consonne intérieure la plus fréquente de l'anglais, la tester en case un reste un pari sain — mais un L jaune pointe plus souvent les cases deux, trois ou quatre (PLACE, BLEND, SMILE). Le double LL- de LLAMA est rare mais distinctif.",
      ends:
        "L est la sixième finale la plus fréquente — environ cinq pour cent des réponses — via trois familles : -AL (EQUAL, LOCAL, LEGAL, MEDAL, TOTAL), -LE (APPLE, TABLE, CABLE, NOBLE, MAPLE) et -EL (LABEL, MODEL, HOTEL, VOWEL, JEWEL). Ce triptyque est votre plan d'étude : si la voyelle devant L est un A, pensez -AL ; si c'est un E, pensez -LE ou -EL. La famille -LE est la plus vaste et se travaille par paires (AP-, TA-, CA- plus LE). Côté Scrabble anglais, L vaut 1 point (quatre jetons) ; MEDAL (8) et MAPLE (9) sont des coups honnêtes, et LEGAL (6) tue au Wordle quand G et L sont confirmés.",
    },
    m: {
      title: "mots en M pour garder l'élan",
      starts:
        "M est un ouvreur assez courant : environ trois pour cent des réponses commencent par lui (MAGIC, MAJOR, MANGO, MARCH, MATCH, MEDIUM, MONTH, MORAL, MOTOR, MOUSE, MUSIC). La famille MA- est le nœud le plus dense (MAGIC, MAJOR, MANGO, MATCH), suivie de MO- (MONTH, MORAL, MOTOR, MOUSE). Beaucoup de ces mots sont les cousins directs du français — MANGUE, MOTEUR, MUSIQUE — mais le Wordle n'accepte que la graphie anglaise : MANGO, MOTOR, MUSIC. Les mots en M excellent en deuxième essai après un ouvreur voyellisé, car M s'accompagne presque toujours d'un A ou d'un O. Le double M (COMMA, MUMMY, GAMMA) est rare mais distinctif : un M jaune dans deux cases le trahit.",
      ends:
        "M est une finale rare : moins de deux pour cent des réponses s'y achèvent — MAXIM, RHYTHM, VENOM, FORUM, VICTIM, WISDOM, GLOOM, BLOOM, ALBUM, PSALM. Observez la physionomie de cette liste : des termes savants aux structures vocaliques marquées (OO, A-, I-). Un M vert en case cinq accompagné d'un double O ou d'un I conduit vite vers GLOOM, BLOOM ou VICTIM. Le français, lui, finit volontiers ses mots en -MENT : ne transposez pas ce réflexe, l'anglais réserve cette finale aux mots plus longs. Côté Scrabble anglais, M vaut 3 points (deux jetons) ; MAXIM (16) et VICTIM (12) sont premium, et RHYTHM (21 points, Y sur case double) est le monstre caché de la famille.",
    },
    n: {
      title: "mots en N, l'ancre nasale",
      starts:
        "N est un ouvreur de fréquence moyenne : environ deux pour cent des réponses commencent par N (NAIL, NAIVE, NASTY, NAVY, NECK, NERVE, NEVER, NIGHT, NOBLE, NOISE, NORTH, NOTCH). La famille NA- mène (NAIVE, NASTY, NAVY), tandis que NO- (NORTH, NOBLE, NOTCH) et NE- (NECK, NERVE, NEVER) se partagent le reste. Peu spectaculaires, les ouvreurs en N sont denses en information : N est la quatrième lettre la plus fréquente de l'anglais, et sa position quatre, au cœur des schémas -ION et -ON, verrouille les familles de finales dominantes. NIGHT et NOTCH sont les sondes de digrammes à retenir. Votre nasale de BON ou de VIN donne l'intuition ; le Wordle exige d'en préciser la place.",
      ends:
        "N est la cinquième finale la plus fréquente — environ six pour cent des réponses — via deux familles : -EN (GIVEN, OFTEN, OCEAN, OVEN, WOMEN, SIREN, RAVEN, SEVEN, MELON) et -AN (BEGAN, HUMAN, ORGAN, PECAN, TITAN, VEGAN). Un N vert en case cinq plus une piste de E pointe instantanément vers -EN ; avec un A, vers -AN. Nuance pour francophone : nos verbes conjugués finissent en -ENT (MANGENT), nasale muette ; au Wordle, les finales -EN et -AN dominent, sans le T grammatical du français. Côté Scrabble anglais, N vaut 1 point (six jetons) ; ORGAN (6) et WOMEN (10) sont des coups réguliers, et RAVEN (8) vide proprement les chevalets des deux jeux.",
    },
    o: {
      title: "mots en O, la deuxième voyelle",
      starts:
        "O est un ouvreur rare : environ un pour cent des réponses commencent par O (OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER, OUGHT, OUNCE). Ce club restreint est presque français : OCÉAN et OPÉRA n'attendent que leur accent aigu pour redevenir français — mais le Wordle interdit tout diacritique, ses mots anglais s'écrivent sans accents. L'ensemble est dominé par les diphtongues OU- (OUGHT, OUNCE) et les paires O+consonne (OFTEN, OLIVE, ONION). O étant la quatrième lettre la plus fréquente de l'anglais, surtout aux cases deux et trois, les ouvreurs en O valent peu. La famille OO- (BLOOD, FLOOR, GLOOM) commence par d'autres lettres mais récompense la connaissance de O.",
      ends:
        "Environ deux pour cent des réponses se terminent par O : un club d'emprunts — MANGO, TORSO, HALO, PIANO, ECHO. Le français connaît la même loi : PIANO et ÉCHO y figurent aussi comme mots importés, les finales en O y étant rarissimes. La liste s'apprend par cœur, ce qui transforme une finale rare en déduction gratuite : dernière case floue et voyelles orientées vers O ? Testez-la d'abord. Un O jaune signifie plus souvent la case deux ou trois (MONEY, PHONE, GHOST, SCOOP). Côté Scrabble anglais, O vaut 1 point (huit jetons) ; MANGO (8) et TORSO (5) restent modestes — mais savoir que O clôt rarement les réponses vaut des essais entiers.",
    },
    p: {
      title: "mots en P pour des essais chirurgicaux",
      starts:
        "P est un ouvreur de fréquence moyenne : environ trois pour cent des réponses commencent par P (PAINT, PANDA, PAPER, PARTY, PASTA, PATCH, PEARL, PLACE, PLAIN, PLANT, POINT, POUND, POWER, PRESS, PRICE, PRIDE, PRIZE, PROVE, PULSE, PUPIL). Les digrammes PL- et PR- dominent — PLACER et PRENDRE vous les ont rendus familiers — épaulés par le PA- voyellisé (PAPER, PASTA, PANDA). Les essais en P sont des instruments de précision : la lettre apparaît rarement ailleurs, donc un P gris élimine trois familles entières d'un coup. Le double P de PIZZA est l'emprunt le plus célèbre de la liste : un P jaune accompagné d'une piste de Z signifie souvent que PIZZA est en jeu.",
      ends:
        "P est une finale très rare : moins d'un pour cent des réponses s'y terminent, via quelques monosyllabes en -AP, -IP et -OP qui comptent à peine. Le conseil pragmatique : presque aucune réponse ne finit par P, donc un P jaune marque les cases un à trois (PAINT, PAPER, PUPIL) avec grande confiance ; dépensez vos essais de finale sur E, Y ou T. Côté Scrabble anglais, P vaut 3 points (deux jetons) ; PIZZA (24 points) est le joyau de la couronne — l'une des réponses Wordle les mieux payées, à cocher dans votre coffre — tandis que PROVE (10) et PRIZE (16) sont les autres champions du digramme.",
    },
    q: {
      title: "mots en Q sans U",
      starts:
        "Q est la lettre la plus rare du Wordle : bien moins d'un pour cent des réponses la contiennent, et les ouvreurs forment un club fermé — QUAKE, QUEEN, QUERY, QUICK, QUILT, QUIET, QUOTA, QUOTE. Bonne nouvelle pour le francophone : votre Q français exige déjà le QU de QUI, QUAND et QUALITÉ, et ce réflexe colle parfaitement au Wordle anglais (QUERY, QUAKE). Les mots en Q sans U — QI, QAT, FAQIR — sont des curiosités importées du Scrabble de tournoi, où QI vaut 11 points ; au Wordle, suivez le QU. Un Q vert impose un test immédiat de U : s'il revient gris, vous chassez alors une rareté sans U.",
      ends:
        "Aucune réponse du Wordle ne se termine par Q : aucune dans toute la liste officielle. Les mots anglais de cinq lettres à Q final sont des curiosités (SUQ, TRANQ) qui ne figurent jamais parmi les réponses. Ce zéro est un cadeau défensif : quand la dernière case reste floue, dépensez vos essais sur les finales probables (E, Y, T, R) plutôt que de chasser un Q impossible. Un Q jaune ne peut signifier que la case un ou deux — en pratique un (QUERY, QUAKE, QUOTE). Côté Scrabble anglais, Q vaut 10 points (un seul jeton) : QUOTA (14) et QUERY (16) sont des réponses premium à double vie, et le folklore des Q-sans-U fait le sel de cette page.",
    },
    r: {
      title: "mots en R, la consonne travailleuse",
      starts:
        "R est un ouvreur de fréquence moyenne : environ deux pour cent des réponses commencent par R (RADIO, RAISE, RANCH, RANGE, RAPID, RATIO, REACT, READY, REALM, REFER, RELAX, REPLY, RIDER, RIGID, RISKY, ROBOT, ROUGH, ROUND, ROUTE, ROYAL, RURAL). Les familles voyellisées RA-/RE- dominent, épaulées par RO- (ROBOT, ROUGH, ROUND, ROYAL). R étant la troisième lettre la plus fréquente de l'anglais, les ouvreurs en R offrent une belle couverture — mais un R jaune pointe plus souvent l'intérieur (BREAD, FIRST, OTHER), où la lettre est deux fois plus fréquente. L'ouvreur CRANE teste R en case deux : c'est pourquoi il élimine autant de terrain d'un coup.",
      ends:
        "R est la quatrième finale la plus fréquente — environ sept pour cent des réponses — dominée par la famille -ER : AFTER, LATER, LASER, NEVER, OTHER, PAPER, RIVER, SUPER, TOWER, WATER, plus les formes -AR et -OR (SUGAR, VAPOR, FLOOR). Nuance pour francophone : là où l'infinitif français finit en -ER (CHANTER), l'anglais réserve -ER aux noms d'agent et aux comparatifs (SUPER, TOWER) — même graphie, logique différente. Un R vert en case cinq avec une piste de E oriente aussitôt vers -ER, et les trois premières lettres deviennent le noyau. Côté Scrabble anglais, R vaut 1 point (six jetons) ; RIVER (8) et REFER (8) sont des coups sûrs.",
    },
    s: {
      title: "mots en S, le roi des débuts",
      starts:
        "S est la lettre d'ouverture la plus fréquente du Wordle : plus de 10 % des réponses commencent par elle (SALAD, SAUCE, SCALE, SCARE, SCOPE, SCORE, SHAKE, SHAPE, SHARK, SHARP, SHEEP, SHEET, SHELF, SHIFT, SHINE, SHOCK, SHORE, SHORT, SIGHT, SKILL, SLEEP, SLICE, SMALL, SMART, SMILE, SNACK, SOLID, SOUND, SOUTH, SPACE, SPARE, SPARK, SPEAK, SPEED, SPELL, SPICE, SPLIT, SPOON, STAFF, STAGE, STAND, START, STEAK, STEAM, STICK, STILL, STONE, STORM, STORY, STUDY, STYLE, SUPER). Les digrammes SH-, SK-, SM-, SN-, SP- et ST- font des ouvreurs en S un paysage de dizaines de familles — voilà pourquoi SLATE et SAUCE testent le S en premier.",
      ends:
        "Le piège le plus célèbre du Wordle : S est parmi les lettres les plus fréquentes, mais presque aucune réponse ne s'y termine — moins d'un pour cent — car la liste exclut les pluriels. Le francophone double ce piège : son pluriel muet en -S ne se prononce pas (LES CHATS), et le Wordle anglais, lui, refuse les pluriels à la finale. Les rares S authentiques sont des pluriels irréguliers (CHAOS, CIRCUS, FOCUS, GLASS, CROSS, BONUS). La stratégie : un S jaune pointe massivement vers la première case — testez les mots commençant par S plutôt que de pluraliser. Côté Scrabble anglais, S vaut 1 point (quatre jetons) ; CHAOS (10) et FOCUS (10) sont des coups doubles élégants.",
    },
    t: {
      title: "mots en T, le titan des finales",
      starts:
        "T est un ouvreur de fréquence moyenne : environ trois pour cent des réponses commencent par T (TABLE, TASTE, TEACH, THANK, THERE, THESE, THICK, THING, THINK, THIRD, THUMB, TIGER, TIGHT, TITLE, TODAY, TOKEN, TOPIC, TOTAL, TOUCH, TOXIC, TRACK, TRAIN, TRICK, TRUCK, TRUST, TWIST). Le digramme TH- domine ces ouvreurs, suivi de TR-. T est la cinquième lettre la plus fréquente de l'anglais, donc les essais en T couvrent large — mais son vrai pouvoir siège à la fin des réponses. Rappel utile : là où le T final français reste muet (PETIT, CHAT), le T anglais se prononce et surtout se place : T est la troisième finale du jeu.",
      ends:
        "T est la troisième finale la plus fréquente — environ huit pour cent des réponses — via quatre familles : -HT (BRIGHT, FIGHT, LIGHT, NIGHT, RIGHT, SIGHT, TIGHT), -NT (FRONT, PLANT, PRINT, SAINT, SPENT, WANT), -ST (FEAST, GHOST, TOAST, TRUST, WORST) et -RT (SMART, SPORT, START). La famille -IGHT est la meilleure série rimée de l'anglais : un seul GHT vert débloque cinq réponses. Le français fuit ces consonnes finales dures ; le Wordle en vit (T, R, N, D) — c'est le réflexe numéro un à réapprendre. Côté Scrabble anglais, T vaut 1 point (six jetons) ; FIGHT (11) et LIGHT (9) sont des réponses solides pour votre coffre.",
    },
    u: {
      title: "mots en U, la voyelle cachée",
      starts:
        "U est la voyelle la plus rare en ouverture : bien moins d'un pour cent des réponses commencent par elle (UNCLE, UNION, UNTIL, UPPER, URBAN, UPSET, USHER, UTTER). Ce club est minuscule car l'anglais mène rarement ses mots par U — UNION, identique en français, est l'exception qui confirme. U est la voyelle cachée, tapie aux cases deux et trois (BUILD, GUILT, HOUSE, MOUTH, POINT, SOUND, WOULD). Le schéma QU- est son habitat principal : chaque mot en Q verrouille un U derrière lui, donc un Q vert rend U automatique. ADIEU place U en case quatre, sa maison naturelle, et AUDIO le couvre aussi : voilà pourquoi U ne demande presque jamais d'essai dédié.",
      ends:
        "Moins d'un pour cent des réponses se terminent par U : pratiquement zéro, car l'anglais n'a pas de mots natifs de cinq lettres à U final — le français n'en a pas non plus, retenez-le comme fait d'exclusion. Un U jaune marque donc les cases deux à quatre, le plus souvent trois (BUILD, GUILT, HOUSE, MOUTH). Les formes -UE (VALUE, VENUE) dirigent leur E vers la case cinq, laissant U à l'intérieur. Côté Scrabble anglais, U vaut 1 point (quatre jetons), mais les mots en QU chevauchent les 10 points du Q : QUERY (16) et QUOTA (14) sont les champions à double vie de la page Q — la connaissance de U est le ticket d'entrée.",
    },
    v: {
      title: "mots en V, le spécialiste de l'intérieur",
      starts:
        "V est l'une des lettres les plus rares du Wordle : moins de 0,5 % des réponses commencent par elle (VAGUE, VALID, VALUE, VENOM, VIDEO, VINYL, VIPER, VIRAL, VIRUS, VISIT, VIVID, VODKA). Surprise pour le francophone : le V français est banal (VIE, VRAI, VILLE) alors que le V anglais est exotique — VAGUE est passé tel quel dans la liste anglaise. Les familles VA-/VI- dominent, et un V vert réduit le champ au club restreint ci-dessus. Le double V de VIVID est la pièce maîtresse — le seul mot anglais à double V — à reconnaître à vue, car il vaut gros au Scrabble.",
      ends:
        "Aucune réponse du Wordle ne se termine par V : aucune. L'anglais n'a pas de mots natifs de cinq lettres à V final — VIF est français, justement — et même le Scrabble anglais n'y admet que des importés. Exploitez ce fait structurel : un V jaune ne peut marquer que les cases un à quatre, en pratique un à trois (VIDEO, GIVEN, RIVAL, COVER, OLIVE). La famille -IVE (ALIVE, DRIVE, GIVE, OLIVE) est son schéma le plus productif, plaçant V en case quatre. Côté Scrabble anglais, V vaut 4 points (deux jetons) : VIVID (13) et VODKA (13) sont des réponses premium — exactement les pépites à sauver dans votre coffre.",
    },
    w: {
      title: "mots en W et le schéma WH",
      starts:
        "W est un ouvreur modéré : environ trois pour cent des réponses commencent par W (WAGON, WASTE, WATCH, WATER, WHEAT, WHEEL, WHERE, WHICH, WHILE, WHITE, WHOLE, WHOSE, WINDY, WOMAN, WORLD, WORRY, WORTH, WOULD, WOUND, WRIST, WRITE, WRONG, WROTE). Le francophone connaît déjà la leçon principale : le W est rare et importé en français (WAGON, WALLON), et il l'est presque autant dans le Wordle anglais — une rareté familière. Le digramme WH- est la famille signature (WHEAT, WHEEL, WHICH), suivie du W muet de WR- (WRIST, WRITE, WRONG), deuxième famille de lettre muette après KN-. Un W gris élimine WH- et WR- ensemble : une couverture que peu de joueurs exploitent.",
      ends:
        "Environ deux pour cent des réponses se terminent par W, presque uniquement via la diphtongue -OW : BELOW, ELBOW, THROW, ALLOW, ARROW. Cet ensemble de finales est assez court pour être appris par cœur. Un W vert en case cinq plus une piste de O signifie -OW instantanément, et les deux ou trois premières lettres deviennent le noyau à chercher. Curiosité pour francophone : le -OU de WOULD ressemble à notre OU français, mais la finale anglaise -OW n'a aucun équivalent dans notre graphie. Côté Scrabble anglais, W vaut 4 points (deux jetons) ; THROW (11) et ELBOW (10) sont des coups solides, et ARROW (8) piège les chevalets distraits.",
    },
    x: {
      title: "mots en X, la clé d'exclusion",
      starts:
        "X n'ouvre jamais une réponse du Wordle : zéro, dans toute la liste. Les mots anglais de cinq lettres commençant par X sont des translittérations (XYLEM, XEBEC) qui ne figurent jamais parmi les réponses — le français connaît la même loi avec XYLOPHONE. Ce zéro est la stratégie : X est une lettre purement intérieure, donc un X jaune marque les cases trois à cinq (TOXIC, BOXER, HELIX, INDEX, MAXIM, RELAX). Tester X est un geste d'exclusion : un X gris élimine d'un coup les familles -AX, -EX, -IX et -OX, une élimination d'élite en fin de partie quand le champ s'est rétréci.",
      ends:
        "Une poignée de réponses se terminent par X — moins de 0,5 %, via les familles -AX et -EX (RELAX, plus quelques raretés). La valeur stratégique : les finales en X sont si rares qu'un X confirmé tard — surtout gris — clôt la chasse -AX/-EX en un seul geste. Un X vert en case cinq avec une piste de voyelle fait de RELAX le favori écrasant. Côté Scrabble anglais, X vaut 8 points (un seul jeton, le plus rare avec J) : RELAX (12) et TOXIC (14) sont des coups premium, et HELIX (17) est le joyau des mots en X du Wordle — à mémoriser immédiatement dans votre coffre.",
    },
    y: {
      title: "mots en Y, la surprise des finales",
      starts:
        "Y n'ouvre presque jamais une réponse du Wordle : moins de 0,25 % (YACHT, YEAST, YIELD, YOUNG, YOUTH). YACHT, identique en français, fait partie de ce micro-club : un Y vert en case un est un puissant signal de rareté qui pointe vers ces cinq candidats. Le vrai habitat de Y est double : le Y consonantique en fin de réponse (HAPPY, FUNNY, HEAVY) et le Y vocalique à l'intérieur (MYTH, RHYME, LYMPH, CRYPT, LYNX). Ce double rôle est le piège du Y : un Y jaune peut être une consonne finale ou une voyelle intérieure, et savoir trancher sépare les gardiens de série des briseurs de série.",
      ends:
        "Y est la deuxième finale la plus fréquente — environ 9 % des réponses — via les familles -LY, -NY, -RY et -TY : ANGRY, DAILY, DIZZY, EARLY, EMPTY, FAIRY, FORTY, FUNNY, FUZZY, HAPPY, HEAVY, HURRY, JUICY, LUCKY, NASTY, PARTY, SILLY, SORRY, TASTY, WEARY. Ce set est énorme : travaillez-le par paire consonantique (P-Y, T-Y, R-Y), car un Y final plus une consonne complètent souvent le mot. L'adjectif anglais en -Y (HAPPY) n'a pas d'équivalent français direct — notre i grec reste marginal — c'est un réflexe à construire de toutes pièces. Côté Scrabble anglais, Y vaut 4 points (deux jetons) ; FUZZY (29 !) et DIZZY (27) sont des monstres, parmi les réponses les mieux payées du Wordle.",
    },
    z: {
      title: "mots en Z, l'élimination finale",
      starts:
        "Z est la lettre la plus rare du Wordle aux côtés de J et Q : une poignée de réponses la contient, et les ouvreurs se limitent à ZEBRA, ZESTY et quelques emprunts exotiques — ZEBRA n'étant que le ZÉBRE français, accent interdit au Wordle. Un Z vert en case un vaut presque un puzzle résolu : ZEBRA est le favori écrasant. Le double Z est la signature de la lettre (PIZZA, FUZZY, DIZZY) : un Z jaune accompagné d'une piste de voyelle pointe souvent droit vers la famille ZZ. Aucun ouvreur classique ne teste Z : sa confirmation coûte un essai délibéré, et la liste des candidats s'effondre alors à un chiffre.",
      ends:
        "Presque aucune réponse du Wordle ne se termine par Z : le compte est pratiquement nul, car l'anglais n'a pas de mots natifs de cinq lettres à Z final, et même BLITZ reste hors liste. Le français n'a presque que RIZ — et son Z y est muet. Exploitez ce zéro : un Z jaune signale l'intérieur, le plus souvent le double Z des cases trois ou quatre (PIZZA, FUZZY, DIZZY). Cette famille ZZ est le set d'étude par excellence : PIZZA (24 points !), FUZZY (29) et DIZZY (27) sont les trois réponses les mieux payées du Wordle, à cocher dans votre coffre. Un Z gris élimine tout le club ZZ plus les finales -ZE.",
    },
  },
};
