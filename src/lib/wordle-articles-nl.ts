// src/lib/wordle-articles-nl.ts — Wordle articles in Dutch.
// Written FOR Dutch speakers playing ENGLISH Wordle. Not a literal
// translation: each entry contrasts English Wordle patterns with Dutch
// expectations (and leverages the Dutch advantage — near-native English).
//
// FACTS STAY ENGLISH: word examples, frequencies and Scrabble scores mirror
// wordle-articles.ts (S startkoning 10%+, E klinkerkoning ~11% overall en
// ~18-20% als slotletter, Y de #2 slotletter ~9%, meervouden uitgesloten dus
// bijna geen -S-eindes, het QU-patroon, PIZZA 24 / FUZZY 29 / DIZZY 27 /
// QUERY 16 / QUICK 18 / HELIX 17 / VIVID 13...). Tile values are ENGLISH
// Scrabble (Q/Z=10, J/X=8, K=5, F/H/V/W/Y=4, B/C/M/P=3, D/G=2, rest 1) —
// Dutch OpenTaal values differ (Q/J/X/Y/Z=10), which the tileTemplate
// explains as crossover knowledge.
//
// ENGINE NOTES: fill() injects the English word "tile"/"tiles" for
// {tileWord} and a bare "s" for {plural} — the NL tileTemplate therefore
// frames both as English notation (correct: Wordle is an English game).
//
// Placeholders: {letter} {Letter} {angle} {score} {count} {total} {plural}
//               {tileWord} {double} {triple}

import type { WordleArticleContent } from "./wordle-articles";

export const NL_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "Zo win je Wordle-spellen met {angle}",

  // placeholders {letter} {total}
  startsLead:
    "Wordle beloont spelers die weten waar elke letter graag zit. Woorden die met {letter} beginnen vervullen een eigen rol in het antwoordenbestand: er zijn {total} geldige Wordle-antwoorden die met deze letter starten, en wie de dominante patronen kent, verandert gissingen in gerichte wapens. Als Nederlander heb je bovendien een stille voorsprong: je Engels is zo goed dat deze patronen vertrouwd aanvoelen. Deze gids behandelt de tactiek voor {letter}-openers, de Scrabble-tegelwaarde van de letter — handig, want WordIzy toont die score naast elk antwoord — en de hoogstscorende woorden uit de live lijst hierboven.",

  // placeholders {letter} {total}
  endsLead:
    "Eindes bepalen of je Wordle-series overleeft of sneuvelt. Woorden die op {letter} eindigen vormen een aparte familie in het antwoordenbestand — {total} geldige antwoorden sluiten met deze letter af — en die patronen leveren meer op dan willekeurig gissen. Hier moet je even schakelen tussen talen: Engelse woordeindes gedragen zich anders dan Nederlandse. Deze gids ontleedt de {letter}-finale strategie, de Scrabble-punten die WordIzy naast elk antwoord zet, en de hoog scorende crossover-woorden die je uit je hoofd wilt leren.",

  // placeholders {Letter} {score} {plural} {count} {tileWord} {double} {triple}
  tileTemplate:
    "Scrabble-crossover: de {Letter}-tegel brengt in het Engelse Scrabble {score} op — Engelse notatie: {score} point{plural} — en dat bij nog maar {count} {tileWord} per set. Let op: de Nederlandse Scrabble-telling (OpenTaal) wijkt af — Q, J, X, Y en Z zijn daar stuk voor stuk 10 punten waard — maar Wordle is Engels, dus hier tellen de Engelse waarden. WordIzy zet de Scrabble-score naast elk antwoord: zodra een Wordle-woord óók een hoge Scrabble-zet is ({Letter} op dubbele letterwaarde levert {double} punten op, op driedubbele letterwaarde {triple} punten), zie je dat direct in de live lijst hierboven — en berg je het woord op voor je volgende rek.",

  // {Letter}
  topWordsHeading: "Hoogstscorende {Letter} Wordle-woorden",

  // {letter}
  topWordsLead:
    "Dit zijn de Scrabble-toppers onder de geldige Wordle-antwoorden met een {letter} — live uit onze woordendatabase. Ze doen dubbel dienst: sterke gissingen voor de dagelijkse puzzel én waardevolle Scrabble-zetten:",

  // {letter}
  closing:
    "Het verschil tussen een avondspeler en een seriespeler is zelden geluk. Het is weten welke {letter}-woorden als geldig Wordle-antwoord bestaan, waar de letter statistisch gezien het liefst zit en hoe je elke gissing maximale informatie laat opleveren. Bewaar deze pagina, drill de topwoorden hierboven, en {letter} wordt een aanwijzing die je uitspeelt in plaats van een vakje waar je voor bevriest.",

  letters: {
    a: {
      title: "A-woorden voor krachtige openers",
      starts:
        "De A is de op één na meest voorkomende openingsletter van Wordle — ruwweg één op de twaalf antwoorden begint ermee, alleen S doet het beter. De dominante vormen zijn AD-, AL-, AN-, AR- en AT- (ADAPT, ALERT, ANGEL, ARGUE, ATLAS), met de dubbele A van ABACK als verrassing voor onvoorbereiden. Cognaten helpen je hier: ALERT en ATLAS heten in het Nederlands precies zo. Openers als ADIEU en AUDIO testen vier klinkers in één klap — de snelste manier om te weten of E, I, O of U in het antwoord zit. Groene A op één? Speel dan de ANGEL-ARGUE-ATLAS-driehoek. Gele A? Positie twee is zijn lievelingsplek.",
      ends:
        "Minder dan drie procent van de antwoorden eindigt op A — veel zeldzamer dan de meeste spelers verwachten. De A-finale familie is een leenwoordenclub: AURA, COMA, DRAMA, EXTRA, KOALA, MAFIA, MAGMA, MEDIA, OMEGA, PANDA, PLAZA, SOFA, VILLA, YOGA, ZEBRA, ARENA, ULTRA, AROMA — woorden die het Nederlands grotendeels kent, dus herkenning helpt. De strategie verschuift dienovereenkomstig: een gele A wijst bijna altijd naar positie twee of drie, niet naar vijf — test binnenliggende plekken voordat je een gissing verbrandt aan de slotpositie. Scrabble-crossover: de A telt maar 1 punt (negen tegels), dus A-woorden scoren bescheiden — maar EXTRA (12) en ZEBRA (16) zijn stiekeme toppers in beide spellen.",
    },
    b: {
      title: "B-woorden voor gedurfde tweede gissingen",
      starts:
        "De B is de op twee na meest voorkomende openingsletter — ongeveer één op de veertien antwoorden begint ermee (BLACK, BREAD, BRING, BONUS, BEACH). B-woorden zijn uitstekende tweede gissingen omdat de letter zelden elders voorkomt: een grijze B elimineert in één klap de hele BA-, BE-, BI-, BO- en BU-familie — topklasse informatie per gissing. De kansrijke vormen zijn de BL- en BR-clusters (BLACK, BLADE, BRICK, BROTH), gevolgd door BE- (BEAST, BEGIN, BENCH). Klinker-openers als ADIEU bevatten geen B, dus een groene B betekent meestal dat je klinkerkaart een tweede blik verdient. Bonus voor Nederlanders: BREAD en BLADE voelen als BROOD en BLAD — zelfde B-logica, andere taal.",
      ends:
        "Vrijwel geen enkel Engels vijfletterwoord eindigt op B — het bestand is hier leeg, want Engelse B-finali zijn bijna altijd langer (absorb, describe). In het Nederlands eindigen WEB en KRAB doodgewoon op B — parkeer die reflex dus even. Gebruik het als eliminatiefeit: is je slotvakje onopgelost, spendeer hem dan aan een kansrijk eind (E, Y of T) in plaats van aan een onmogelijke B. Een gele B wijst daardoor sterk naar positie twee of drie (RABID, ROBOT, HABIT, CABLE). Scrabble-crossover: de B telt 3 punten (twee tegels); Scrabble kent wél slot-B-woorden als CRUMB, maar die verschijnen nooit als Wordle-antwoord — de binnen-B-woorden CABLE (9) en GAMBLE (10) zijn de echte scoreaantrekkers.",
    },
    c: {
      title: "C-woorden voor patroondekking",
      starts:
        "De C is de op één na meest voorkomende openingsletter — bijna één op de tien antwoorden begint ermee, vooral via de CA-, CO- en CR-families (CANDY, CATCH, COUCH, CRANE, CROSS). Voor Nederlanders bijna onwaarschijnlijk: wij hebben de C grotendeels verbannen naar het K-vak (KAT, KOFFIE), maar in het Engels is de C alomtegenwoordig — CAT, niet KAT. Elke C-gissing dekt twee klanken tegelijk: hard /k/ (CATCH, CRANE) en zacht /s/ vóór E, I en Y (CIDER, CYCLE, CIVIC). De CH-groep (CHAIR, CHESS, CHICK) vormt een eigen hoogfrequente stam. Opener CRANE is niet voor niets beroemd: C, R, A, N, E — vijf hoogwaardige letters in één zet.",
      ends:
        "Vrijwel geen enkel Wordle-antwoord eindigt op C — Engelse vijfletterwoorden met slot-C ontbreken in het bestand, want woorden als MUSIC en LOGIC zetten de C op positie vier, niet op vijf. Behandel dat als bewijs: staat MUSI- of LOGI- op je bord, dan vult C positie vier in — nooit vijf. Een gele C markeert meestal positie één of vier (CHAIR, MUSIC, LOGIC, MAGIC). Scrabble-crossover: de C telt 3 punten (twee tegels) en beloont binnenplaatsing — MUSIC (9 punten), MAGIC (9) en LOGIC (6) zijn keurige antwoorden die tevens degelijke Scrabble-zetten zijn, zeker met de C op een vakje met dubbele letterwaarde.",
    },
    d: {
      title: "D-woorden en de -ED-deductie",
      starts:
        "De D is een middenfrequente opener — ongeveer één op de twintig antwoorden begint ermee (DANCE, DAILY, DIARY, DOUBT, DREAM, DRINK). D-woorden clusteren in twee strategische groepen: de klinker-gedreven DA- en DE-familie (DANCE, DEBUT, DELTA) en het DR-cluster (DREAM, DRIFT, DRIVE, DROWN). Omdat D tot de vier meest voorkomende eindletters hoort, verschuift een vroege D-bevestiging meteen je eindspelplanning: een grijze D op vijf is even waardevol als een groene D op één. De DI-vormen (DIARY, DIGIT, DINER) vormen de derde familie en verdienen één middenspel-sonde. En je Nederlandse verleden tijd (-DE, -TE: hoorde, werkte) loopt voorop: het Engels heeft hetzelfde eind in het vizier — zie de eindes hieronder.",
      ends:
        "D is de zevende eindletter — circa vier procent — vrijwel volledig dankzij verleden tijden en bijvoeglijke naamwoorden: -ED (FIXED, BROAD, BLOOD, THIRD) en kale -D-woorden (WORLD, BLOND, HOUND, FIELD, BEARD). Waar het Nederlands -DE of -TE schrijft (hoorde, werkte), schrijft het Engels -ED — de patronen lopen parallel, dus je tijdintuïtie werkt mee. De -ED-familie is een deductiegeschenk: zijn E én D bevestigd, dan is het antwoord vrijwel zeker een verleden tijd en zit de betekenis vooraan. D-woorden rijmen bovendien prachtig: WOULD, COULD, SOUND en FOUND — één goede gissing ontsluit er meteen meerdere. Scrabble-crossover: D telt 2 punten (vier tegels); WORLD en WOUND scoren 9, BROAD 8.",
    },
    e: {
      title: "E-woorden, de klinkerkoning",
      starts:
        "De E is de meest voorkomende letter van het hele Wordle-bestand — circa elf procent — maar hij start zelden een antwoord: minder dan twee procent begint met E (EAGLE, EARLY, EARTH, EIGHT, ELITE, EMPTY, ENEMY, ENTER, EQUAL, ERUPT, EXACT, EXTRA). Hier klopt je Nederlandse intuïtie: ook in het Nederlands is de E de koning — zo'n negentien procent — dus de E-intuïtie werkt in beide spellen; schaal de frequentie alleen iets terug. De dominante E-families zijn EA- (EAGLE, EARLY, EARTH), EM-/EN- (EMPTY, ENEMY, ENTER) en het premium-paar EX- (EXACT, EXTRA). E zit vaker binnenin of achteraan, dus een E-test op één is een bewuste buitenkans.",
      ends:
        "E is de koning der eindes: ruwweg één op de vijf eindigt op E — veruit de meest voorkomende slotletter. De productieve families zijn -KE, -LE, -ME, -NE, -SE, -TE en -VE (SNAKE, APPLE, BLAME, STONE, HOUSE, WRITE, GIVE), plus de vergrotende -ER-familie (AFTER, WATER, SUPER) die nog eens vier procent toevoegt — en die -ER is een cadeautje: ook het Nederlands vergroot met -ER (snel→sneller). Laatste vakje onopgelost? Dan is E op vijf de statistisch juiste gok. Scrabble-crossover: de E telt 1 punt (twaalf tegels), dus scores blijven laag — maar HOUSE (8) en STONE (5) ruimen je rek op, en de -ER- en -LE-rijmfamilies zijn dé drillsets van Wordle.",
    },
    f: {
      title: "F-woorden voor snelle eliminatie",
      starts:
        "De F is een middenfrequente opener — ongeveer één op de twintig antwoorden begint ermee (FAIRY, FANCY, FIELD, FIRST, FLOAT, FRONT, FROST, FRUIT). F-woorden zijn eliminatiegoud omdat de letter zelden elders staat: een grijze F schakelt in één zet de complete FA-, FE-, FI-, FO- en FU-familie uit — uitzonderlijke dekking per gissing. De dominante vormen zijn het FR-cluster (FRESH, FRIED, FRONT, FROST) en de klinker-gedreven FA- en FE-paren (FANCY, FEAST, FEVER, FIBER). Populaire openers als SLATE en CRANE slaan de F volledig over, dus een speciale F-sonde (FRONT, FLOAT, FROST) is één middenspel-vakje waard zodra je een zwaar medeklinkercluster vooraan vermoedt.",
      ends:
        "Effectief nul antwoorden eindigen op F — het bestand bevat geen enkel vijfletterwoord met slot-F, want Engelse -F-eindes hebben langere woorden nodig (itself, behalf). In het Nederlands eindigt STRAF doodleuk op F; die gewoonte mag je voor Wordle parkeren. Gebruik het structureel: is de slotletter onbekend, dan is F nooit het antwoord — een gele F markeert dus posities één tot en met vier, realistisch de binnenplekken van KNIFE, WOLF en CHEF. Scrabble-crossover: F is een 4-puntstegel (twee in de zak), dus F-binnenantwoorden als KNIFE (12), WOLF (10) en CHEF (12) zijn precies de woorden die dubbel dienst doen — zet ze direct in je Save Vault.",
    },
    g: {
      title: "G-woorden en het -ING-patroon",
      starts:
        "De G is een weinig frequente opener — minder dan drie procent van de antwoorden begint ermee (GHOST, GIANT, GIVEN, GLASS, GLOBE, GRACE, GRADE, GRAND, GRASP, GRAVE, GROUP, GUESS). Bijna alle G-openers lopen via het GR-cluster (GRAND, GRAPE, GRAVE, GREED, GRILL, GROSS, GROUP, GROVE, GROWL), met GL- (GLASS, GLOBE, GLORY) en GO- (GOOSE, GORGE) als steunfamilies. Let op je klankintuïtie: de Nederlandse G schuurt als in GOED, maar de Engelse G klinkt zacht vóór E, I en Y (GIANT, GEM) en hard elders (GAME). G's echte kracht ligt bovendien achteraan (-ING), dus vóór-testen is een bewuste inversiezet.",
      ends:
        "Ongeveer twee procent van de antwoorden eindigt op G, verdeeld over de -ING-familie (BRING, GOING, DYING, USING) en de -NG-éénlettergrepigen (AMONG, STRONG, WRONG, YOUNG). Het Nederlands helpt mee: ook wij hebben -ING (vergadering, opening), dus het patroon voelt vertrouwd. De deductie is sterk: een groene G op vijf plus een klinkerhint wijst meteen naar -ING of -ONG, waarna de eerste twee of drie letters een kleine zoekset vormen. Zijn I-N-G bevestigd, dan is het antwoord een werkwoordsvorm — nog een kandidaat minder. Scrabble-crossover: G telt 2 punten (drie tegels); BRING (8) en YOUNG (9) zijn bescheiden zetten, maar de -ING-motor is waar G in Scrabble zijn geld verdient.",
    },
    h: {
      title: "H-woorden, de cluster-ontcijferaar",
      starts:
        "De H is zeldzaam als solo-opener maar een veelgeziene gast: minder dan drie procent van de antwoorden begint ermee, en de meeste reizen via clusters die het Engels domineren — TH-, CH-, SH- en WH-. Juist die TH bestaat in het Nederlands niet als klank: in het echt worstel je er misschien mee, in Wordle is hij je waardevolste anker. De zelfstandige H-openers zijn de werkpaarden (HABIT, HAPPY, HEART, HEAVY, HORSE, HOTEL, HUMAN, HUMOR, HURRY), met HA-, HE- en HU-vormen als dragers. De strategische zet: één gissing op THEME of THUMB bevestigt de posities van T én H tegelijkertijd.",
      ends:
        "Ongeveer drie procent van de antwoorden eindigt op H — via de korte-klinkerclusterfamilies: -ACH (BEACH, TEACH), -ITCH (PITCH, SWITCH), -USH (BRUSH, FRESH) en de -UGH-vormen (TOUGH, ROUGH, LAUGH, MOUTH). Die slot-H hoor je in het Engels nauwelijks terug — het is een zuivere spellingoverlevering, en precies dáárom voorspelbaar. Een groene H op vijf betekent vrijwel zeker een éénlettergrepig woord met korte klinker plus medeklinkercluster, en dan stort de kandidatenlijst snel in. Scrabble-crossover: H is een 4-puntstegel (twee in de zak); WORTH (11) en YOUTH (11) zijn sterke Scrabble-zetten die óók als Wordle-antwoord voorkomen — precies de crossover-diamanten voor in je Save Vault.",
    },
    i: {
      title: "I-woorden, de binnenklinker",
      starts:
        "De I is een zeldzame opener — minder dan één procent van de antwoorden begint ermee (IMAGE, INDEX, INPUT, IRONY, ISSUE, IVORY). Wat overblijft zijn leenwoorden en technische termen, dus een groene I op één is een sterk zeldzaamheidssignaal: het antwoord hoort bij een kleine, herkenbare club. De IN-familie (INDEX, INPUT) is de dichtste knoop, daarna volgen IR- en IS- (IRONY, ISSUE). En dan de klassieker: de Nederlandse IJ bestaat niet in het Engels — IJS en LIJN heten daar ICE en LINE, dus de Engelse I staat vrijwel altijd alleen. Opener ADIEU zet de I op vier, waar hij thuishoort: binnenin komt hij drie keer vaker voor dan vooraan.",
      ends:
        "Bijna geen enkel antwoord eindigt op I — het bestand bevat in essentie nul I-finali, want Engelse vijfletterwoorden op slot-I bestaan alleen als leenwoord. In het Nederlands eindigen woorden massaal op -IE (olie, melodie, kolonie) — die gewoonte mag je voor Wordle achterlaten. Die nul ís de strategie: is de laatste letter onopgelost, gok dan nooit op I. Een gele I markeert overweldigend vaak positie drie of vier — de binnenliggende klinkerplekken van MUSIC, LOGIC, VIVID, RIVAL, CIVIC, PILOT, TIGER. De -IC-familie is I's productiefste patroon. Scrabble-crossover: I telt 1 punt (negen tegels); VIVID (13) is de uitschieter — een zeldzaam dubbel-V-antwoord dat ook in Scrabble fors oplevert.",
    },
    j: {
      title: "J-woorden, de zeldzaamste start",
      starts:
        "De J is een van de zeldzaamste Wordle-letters — ruwweg een kwart procent van alle antwoorden bevat er überhaupt een, en de openers beperken zich vrijwel tot JOINT, JOKER, JUICE, JUDGE en JUICY plus een handjevol leenwoorden. Die schaarste ís de strategie: een groene J perst het veld samen tot een klein memorabel clubje, en één bewuste J-gissing (JOKER, JOINT, JUICE) lost een letter op die openers nooit testen. De JU-familie domineert, want de Engelse J eist een klinker achter zich. Klankval voor Nederlanders: de J van JAS klinkt als de Engelse Y van YES; de Engelse J van JAM komt in eigen Nederlandse woorden nauwelijks voor.",
      ends:
        "Nul antwoorden eindigen op J — geen één, in het hele bestand. Hard eliminatiefeit: een gele J zit alleen op positie één tot en met vier, realistisch één tot drie. De binnen-J is de echte habitat: MAJOR en BANJO zetten hem op drie en vier, JOINT en JOKER houden hem vooraan, en ENJOY is het antwoord dat de meeste spelers het eerst tegenkomen — J op vier. Scrabble-crossover: de Engelse J telt 8 punten (één tegel); het Nederlandse Scrabble telt er zelfs 10 voor, maar hier gelden de Engelse waarden. BANJO (14) en MAJOR (13) zijn precies de hoog scorende dubbeldieners waar deze pagina voor staat.",
    },
    k: {
      title: "K-woorden en het CK-patroon",
      starts:
        "De K is een zeldzame opener — circa één procent van de antwoorden begint ermee (KNIFE, KNOCK, KNOWN, KAYAK, KIOSK, KNEEL). In het Nederlands is de K de harde werker (KAT, KOP); in het Engels doet de C vaak datzelfde werk — CAT, niet KAT — precies daarom is de Engelse start-K zo zeldzaam. De stille KN-familie is K's handelsmerk: de helft begint met een N die je niet hoort — herkenbaar, want ook in KNIE zwijgt de K. Een groene K op één plus een grijze N elimineert de hele KN-familie in één zet: uitzonderlijke opbrengst. De leenwoorden KAYAK en KIOSK herken je op het gezicht.",
      ends:
        "Ongeveer drie procent van de antwoorden eindigt op K, gedomineerd door de korte-klinkerfamilies -ACK, -OCK, -ICK en -UCK: BLACK, BLOCK, BRICK, CLOCK, KNOCK, QUICK, STICK, STUCK, THINK, THICK, TRACK, TRUCK, SHACK. De deductie: een groene K op vijf plus een bevestigde korte klinker betekent dat de middelste medeklinker vrijwel zeker L, R, S, T of een TH-combinatie is — vijf kandidaten, één gissing. Zijn C én K bevestigd, dan is het woord éénlettergrepig, wat resterende werkwoordskandidaten elimineert. Scrabble-crossover: K is een 5-puntstegel (één in de zak); QUICK (18), BLACK (11) en THINK (12) zijn de hoogwaardige dubbeldieners van deze letter.",
    },
    l: {
      title: "L-woorden, het vloeibare einde",
      starts:
        "De L is een redelijk frequente opener — circa vier procent van de antwoorden begint ermee (LABEL, LARGE, LAUGH, LEARN, LEMON, LIGHT, LIMIT, LOCAL, LOYAL, LUNCH, LUCKY). De LA- en LE-families dragen de last, met LI-, LO- en LU- als ondersteuning. L-openers combineren prima met klinker-dichte tweede gissingen, want L is de meest voorkomende binnenliggende medeklinker van het Engels: testen op één is statistisch verdedigbaar, maar een gele L betekent vaker positie twee, drie of vier (PLACE, BLEND, FLOOD, SMILE). De dubbele LL van LLAMA en de L-clusters FL-, CL-, PL- en BL- zitten in duizenden antwoorden verstopt — L-kennis betaalt zich uit op elke letterpagina van deze site.",
      ends:
        "L is de zesde eindletter — rond de vijf procent — via drie families: -AL (EQUAL, LOCAL, LEGAL, FOCAL, MEDAL, PEDAL, TOTAL), -LE (APPLE, TABLE, CABLE, NOBLE, MAPLE) en -EL (LABEL, MODEL, HOTEL, VOWEL, JEWEL). Drie families, dus een helder studieplan: A vóór L? Denk -AL. E vóór L? Denk -LE of -EL. Nederlanders hebben hier bovendien een geheime voorsprong: APPEL werd APPLE en TAFEL werd TABLE — de letters verschuiven van plaats, maar de herkenning blijft volledig. Scrabble-crossover: L telt 1 punt (vier tegels); MEDAL (8) en MAPLE (9) zijn nette zetten, en LEGAL (6) is een killer-gissing zodra G én L in het spel zijn.",
    },
    m: {
      title: "M-woorden voor momentum",
      starts:
        "De M is een redelijk frequente opener — zo'n drie procent van de antwoorden begint ermee (MAGIC, MAJOR, MANGO, MARCH, MATCH, MEDIUM, MINOR, MONEY, MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE, MUSIC). De MA-familie is de dichtste knoop (MAGIC, MAJOR, MANGO, MARCH, MATCH), met MO- (MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE) er vlak achter. M-woorden zijn sterke tweede gissingen na klinker-openers, want de M verschijnt zelden op één zonder A of O erachter. Het dubbele M-patroon (COMMA, MUMMY, GAMMA) is zeldzaam maar herkenbaar: een gele M op twee plekken tegelijk wijst er vaak op, en één sonde bevestigt het vermoeden.",
      ends:
        "M is een zeldzaam einde — minder dan twee procent: MAXIM, MEDIUM, RHYTHM, VENOM, FORUM, VICTIM, WISDOM, GLOOM, BLOOM, CHASM, SCREAM, ALBUM, PSALM. Let op de vorm van die lijst: M-finali zijn meestal wat formelere termen met specifieke klinkerstructuren (OO, A-, I-). Leuk bruggetje: RHYTHM heet in het Nederlands RITME — zonder H — maar Wordle wil de Engelse spelling zien. Een groene M op vijf plus een bevestigde OO of I wijst snel richting GLOOM, BLOOM of VICTIM. Scrabble-crossover: M telt 3 punten (twee tegels); MAXIM (16) en VICTIM (12) zijn premium dubbeldieners, en RHYTHM (21 punten, met de Y gedubbeld) is de verborgen reus van de M-familie.",
    },
    n: {
      title: "N-woorden, het nasale anker",
      starts:
        "De N is een middenfrequente opener — ongeveer twee procent van de antwoorden begint ermee (NAIL, NAIVE, NASTY, NAVY, NECK, NERVE, NEVER, NIGHT, NOBLE, NOISE, NORTH, NOTCH, NURSE). De NA-familie draagt de voorhoede (NAIVE, NASTY, NAVY); NO- (NORTH, NOISE, NOBLE, NOTCH) en NE- (NECK, NERVE, NEVER) verdelen de rest. N-openers zijn onopvallend maar informatiedicht: N is de vierde meest voorkomende letter overall, dus een vroege positiebevestiging — vooral op vier, binnen de -ON- en -ION-patronen — ontsluit meteen de eindfamilies die vijfletter-antwoorden domineren. NIGHT en NOTCH zijn de cluster-sondes die je wilt onthouden.",
      ends:
        "N is de vijfde eindletter — circa zes procent — via twee families: -EN (GIVEN, OFTEN, OCEAN, OVEN, WOMEN, SIREN, RAVEN, SEVEN, WOVEN, MELON) en -AN (BEGAN, HUMAN, ORGAN, PECAN, TITAN, VEGAN). Het -EN-einde is voor Nederlanders een thuiswedstrijd: ons meervoud loopt er volop op (boek→boeken, tomaat→tomaten), dus de combinatie zit in je vingers. Groene N op vijf plus een E-hint? Denk meteen -EN. Plus een A-hint? Dan -AN. De -EN-woorden zijn bovendien oververtegenwoordigd: Engelse voltooid deelwoorden en veel zelfstandige naamwoorden clusteren er. Scrabble-crossover: N telt 1 punt (zes tegels); ORGAN (6) en WOMEN (10) zijn stabiele dubbeldieners, en RAVEN (8) ruimt in beide spellen je rek leeg.",
    },
    o: {
      title: "O-woorden, de tweede klinker",
      starts:
        "De O is een zeldzame opener — circa één procent van de antwoorden begint ermee (OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER, OUGHT, OUNCE). De O-vooraan-set is klein en klinker-zwaar, gedomineerd door de OU-tweeklankvormen (OUGHT, OUNCE) en de paren O+medeklinker (OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER). Omdat O de vierde meest voorkomende letter overall is — meestal op positie twee en drie — zijn O-openers zwakke eerste gissingen. De OO-familie (BLOOD, FLOOR, GLOOM) begint met andere letters, maar beloont O-kennis. Dubbele klinkers als AA en OO zijn typisch Nederlands (BOOM, HOOP); het Engels kent ze ook, alleen spaarzamer — schaal die verwachting dus terug.",
      ends:
        "Ongeveer twee procent van de antwoorden eindigt op O — een klein leenwoordclubje: MANGO, TORSO, HALO, PIANO, ECHO en een handjevol andere. De lijst is kort genoeg om uit je hoofd te leren, en dat maakt een zeldzaam einde tot een gratis deductie: is de slotletter onopgelost en wijzen je klinkerhints richting O, test dan eerst het lijstje hierboven. Een gele O betekent vaker positie twee of drie (MONEY, PHONE, GHOST, SCOOP, BROOM). Scrabble-crossover: O telt 1 punt (acht tegels); MANGO (8) en TORSO (5) zijn bescheiden zetten — maar de echte winst van deze pagina is het weten dat O zelden eindigt: dat bespaart je gissingen.",
    },
    p: {
      title: "P-woorden voor chirurgische gissingen",
      starts:
        "De P is een middenfrequente opener — circa drie procent van de antwoorden begint ermee (PAINT, PANDA, PAPER, PARTY, PASTA, PATCH, PEARL, PIANO, PLACE, PLAIN, PLANE, PLANT, PLATE, POINT, POUND, POWER, PRESS, PRICE, PRIDE, PRIME, PRIZE, PROVE, PULSE, PUNCH, PUPIL). De PL- en PR-clusters domineren (PLAIN, PLANT, PRESS, PRIDE, PRICE), met klinker-gedreven PA- (PAPER, PASTA, PANDA) als ondersteuning. P-gissingen zijn precisie-instrumenten: de letter staat zelden elders, dus een grijze P schakelt drie volledige families tegelijk uit. Het dubbele P van PIZZA is het beroemdste leenwoord van het bestand: een gele P plus een Z-hint betekent vaak dat PIZZA in het spel zit.",
      ends:
        "P is een zeer zeldzaam einde — minder dan één procent, via -AP-, -IP- en -OP-vormen die in het bestand nauwelijks voorkomen. In het Nederlands eindigen KIP en LIP doodgewoon op P; Engelse vijfletterwoorden doen dat vrijwel nooit — parkeer die reflex. Realistisch advies: bijna geen antwoord eindigt op P, dus een gele P markeert met hoge zekerheid positie één tot drie (PAINT, PAPER, PUPIL). Spendeer slot-gissingen liever aan E, Y of T. Scrabble-crossover: P telt 3 punten (twee tegels); PIZZA (24) is de kroonjuweel — een van de hoogst scorende gewone antwoorden, meteen naar je Save Vault — en PROVE (10) en PRIZE (16) zijn de andere kampioenen.",
    },
    q: {
      title: "Q-woorden zonder U",
      starts:
        "De Q is de zeldzaamste letter van Wordle — ruim onder de één procent bevat er een; de openers vormen een krap clubje: QUAKE, QUART, QUEEN, QUERY, QUEUE, QUICK, QUILT, QUIET, QUITE, QUOTA, QUOTE. Het strategische feit: antwoorden met Q volgen vrijwel altijd het QU-patroon, dus een groene Q maakt U je eerstvolgende test — komt die grijs terug, dan jaag je op een Q-zonder-U-woord, kennis uit het toernooi-Scrabble: daar houden QI (11 punten), QAT, QOPH en FAQIR de Q levend zonder U. Ook het Nederlands telt nauwelijks Q-woorden (quota, quiz), dus het QU-instinct is universeel. De live lijst toont elke geldige Q-opener met zijn Scrabble-score.",
      ends:
        "Nul antwoorden eindigen op Q — geen één, in de hele officiële lijst. Engelse vijfletterwoorden op slot-Q zijn exotische leenwoorden (SUQ, TRANQ) die nooit als antwoord verschijnen. Die nul is een verdedigingsgeschenk: is de slotletter onopgelost, spendeer je gissingen aan kansrijke eindes (E, Y, T, R), niet aan een onmogelijke Q. Een gele Q kan alleen op positie één of twee zitten, realistisch op één (QUERY, QUAKE, QUOTE). Scrabble-crossover: de Q telt 10 punten (één tegel) — in het Nederlandse Scrabble trouwens ook — dus QUOTA (14) en QUERY (16) zijn premium dubbeldieners, en de Q-zonder-U-lore (QI, QAT, FAQIR) is precies waarom de titel van deze pagina bestaat.",
    },
    r: {
      title: "R-woorden, het werkpaard onder de medeklinkers",
      starts:
        "De R is een middenfrequente opener — circa twee procent van de antwoorden begint ermee (RADIO, RAISE, RANCH, RANGE, RAPID, RATIO, REACT, READY, REALM, REFER, RELAX, REPLY, RIDER, RIGID, RISKY, ROBOT, ROUGH, ROUND, ROUTE, ROYAL, RURAL). De klinker-gedreven RA- en RE-families domineren, met RO- (ROBOT, ROUGH, ROUND, ROYAL) als steun. R is de derde letter overall, dus R-openers dekken prima — maar een gele R betekent vaker een binnenpositie (BREAD, FIRST, OTHER), waar de letter twee keer zo vaak zit. Opener CRANE test de R op positie twee, en precies daarom elimineert hij zoveel van het veld.",
      ends:
        "R is de vierde eindletter — circa zeven procent — gedomineerd door de -ER-familie: AFTER, FEVER, LATER, LASER, LITER, LUNAR, NEVER, OTHER, OWNER, PAPER, RIVER, SUPER, TIMER, TOWER, UNDER, WATER. Cadeautje voor de moedertaal: ook wij vergroten met -ER (snel→sneller), dus dit einde voelt huiselijker dan de meeste Engelse patronen. De -AR- en -OR-vormen (SUGAR, VAPOR, FLOOR) vullen de rest aan. Groene R op vijf plus een E-hint? Meteen -ER, en de eerste drie letters worden de doorzoekbare kern. Scrabble-crossover: R telt 1 punt (zes tegels); RIVER (8) en WATER (7) zijn stabiele dubbeldieners, en REFER (8) is het zeldzame antwoord met R aan beide uiteinden — één sonde waard.",
    },
    s: {
      title: "S-woorden, de startkoning",
      starts:
        "De S is de startkoning van Wordle — ruim tien procent van de antwoorden begint ermee (SALAD, SAUCE, SCARE, SCENE, SCORE, SHADOW, SHAKE, SHARK, SHEEP, SHEET, SHELF, SHIFT, SHINE, SHIRT, SHOCK, SHORE, SHORT, SIGHT, SINCE, SKILL, SLEEP, SLICE, SMALL, SMART, SMILE, SMOKE, SNACK, SOLID, SOLVE, SORRY, SOUND, SOUTH, SPACE, SPARE, SPARK, SPEAK, SPEED, SPELL, SPICE, SPLIT, SPOON, STAGE, STAMP, STAND, START, STICK, STILL, STONE, STORM, STORY, STUDY, STYLE, SUGAR, SUPER). De SH-, SK-, SM-, SN-, SP- en ST-clusters maken van de S een landschap van zestig families — daarom testen openers als SLATE en SAUCE de S als eerste.",
      ends:
        "Dit is Wordle's beroemdste valkuil: hoewel S de meest voorkomende letter overall is, eindigt bijna geen enkel antwoord erop — onder de één procent — want het bestand sluit meervouden uit. Nederlanders hebben een voorsprong: ons meervoud loopt op -EN (boeken) en ons verkleinwoord op -JE (huisje), dus de slot-S-reflex zit ons minder in het bloed — al gokken óók wij massaal op -S-eindes. De echte S-finali zijn onregelmatige meervouden en leenwoorden: CHAOS, CIRCUS, FOCUS, GUESS, GLASS, CROSS, BONUS. Strategie: een gele S wijst overweldigend vaak naar positie ÉÉN. Scrabble-crossover: S telt 1 punt (vier tegels); CHAOS (10) en FOCUS (10) zijn nette zetten — BONUS (7) is de ironische kers.",
    },
    t: {
      title: "T-woorden, de titaan van de eindes",
      starts:
        "De T is een middenfrequente opener — circa drie procent van de antwoorden begint ermee (TABLE, TASTE, TEACH, THANK, THEIR, THERE, THESE, THICK, THIEF, THING, THINK, THIRD, THOSE, THUMB, TIGER, TIGHT, TIRED, TITLE, TODAY, TOKEN, TOPIC, TORCH, TOTAL, TOUCH, TOWEL, TOWER, TOXIC, TRACE, TRACK, TRAIL, TRAIN, TREAT, TREND, TRIAL, TRIBE, TRICK, TROOP, TRUCK, TRULY, TRUST, TRUTH, TWICE, TWIST). Eén gewoonte parkeren: waar het Nederlands lijmt tot TREINSTATIONSBEZETTING, wil Wordle korte Engelse woorden — de trein heet hier gewoon TRAIN. Het TH-cluster domineert (THANK, THEIR, THERE, THICK, THING), met TR- (TRACK, TRAIN, TRUST) er vlak achter. T is de vijfde letter overall: hoge dekking, maar de echte kracht zit achteraan.",
      ends:
        "T is de derde eindletter — rond de acht procent — via vier families: -HT (BRIGHT, FIGHT, LIGHT, NIGHT, RIGHT, SIGHT, TIGHT), -NT (FRONT, PLANT, PRINT, SAINT, SPENT, WANT), -ST (FEAST, GHOST, TOAST, TRUST, TWIST, WORST) en -RT (SMART, SPORT, START). De -IGHT-familie is de beste vijfletter-rijmset van het Engels: één groene GHT ontsluit vijf antwoorden tegelijk — en al blijft die slotklank voor een Nederlandse tong wennen, als rijmpatroon is hij puur goud. Een groene T op vijf plus een klinker-shortlist laat de kandidatenlijst snel instorten. Scrabble-crossover: T telt 1 punt (zes tegels); FIGHT (11) en LIGHT (9) zijn degelijke dubbeldieners voor in je Save Vault.",
    },
    u: {
      title: "U-woorden, de verstopte klinker",
      starts:
        "De U is de zeldzaamste klinker-opener — ruim onder de één procent begint ermee (UNCLE, UNION, UNTIL, UPPER, URBAN, UPSET, USHER, UTTER). De U-vooraan-set is piepklein, want het Engels laat de U vrijwel nooit vooraan: het is de verstopte klinker, lurkend op positie twee en drie (BUILD, GUILT, HOUSE, MOUTH, POINT, WOULD). Het QU-patroon is U's bekendste habitat: elk Q-woord klemt een U achter zich, dus een groene Q maakt de U automatisch. De Nederlandse OE van BOEK bestaat in het Engels niet — daar heet dat OO (BOOK). Opener ADIEU zet de U op vier, zijn natuurlijke plek; AUDIO dekt hem mee — dus U verdient zelden een eigen opener.",
      ends:
        "Onder de één procent van de antwoorden eindigt op U — effectief nul, want Engelse vijfletterwoorden op slot-U bestaan buiten leenwoorden niet. Behandel U-finali als uitsluitingsfeit: een gele U markeert positie twee tot en met vier, meestal drie (BUILD, GUILT, HOUSE, MOUTH). De -UE-vormen (DUE, VALUE, VENUE) sluizen de E meestal naar positie vijf, waardoor de U binnenin blijft zitten. Scrabble-crossover: U telt 1 punt (vier tegels), maar QU-woorden liften volop mee op Q's 10 punten — QUERY (16) en QUOTA (14) zijn de dubbeldieners die op de Q-zusterpagina van deze site staan. U-kennis is de tol die je betaalt om ze te ontsluiten.",
    },
    v: {
      title: "V-woorden, de binnenspecialist",
      starts:
        "De V is een van de zeldzaamste Wordle-letters — minder dan een half procent van de antwoorden begint ermee (VAGUE, VALID, VALUE, VENOM, VIDEO, VINYL, VIPER, VIRAL, VIRUS, VISIT, VITAL, VIVID, VODKA). De VA- en VI-families domineren (VALID, VALUE, VIDEO, VINYL, VIPER, VIRAL, VIRUS, VISIT). Taalkundig cadeautje: waar het Nederlands een V schrijft, staat in het Engelse cognate vaak een F — VIS werd FISH, VOS werd FOX — precies waarom de Engelse V zeldzamer is. V-openers zijn lange gokken met elite-uitbetaling: een groene V perst het veld samen tot het strakke clubje, en het dubbel-V VIVID is het pronkstuk van het bestand.",
      ends:
        "Nul antwoorden eindigen op V — geen één. Engelse vijfletterwoorden op slot-V bestaan simpelweg niet (lav en rev zijn cliptes; zelfs Scrabble importeert zijn V-finali). Gebruik het als hard structureel feit: een gele V kan alleen op positie één tot en met vier zitten, realistisch één tot drie (VIDEO, GIVEN, RIVAL, COVER, HOVER, OLIVE). De -IVE-familie (ALIVE, DRIVE, OLIVE, GIVE) is V's productiefste patroon, met de V op vier. Scrabble-crossover: V is een 4-puntstegel (twee in de zak); VIVID (13) en VODKA (13) zijn premium dubbeldieners — precies de crossover-diamanten die je in je Save Vault wilt hebben.",
    },
    w: {
      title: "W-woorden en het WH-patroon",
      starts:
        "De W is een gemiddeld frequente opener — circa drie procent van de antwoorden begint ermee (WAGON, WASTE, WATCH, WATER, WHEAT, WHEEL, WHERE, WHICH, WHILE, WHITE, WHOLE, WHOSE, WOMAN, WORLD, WORRY, WORSE, WORTH, WOULD, WOUND, WRIST, WRITE, WRONG, WROTE). Eerst de klankwaarschuwing: de Engelse W klinkt als /w/, de Nederlandse als /v/ — WATER en WORLD klinken verschillend in beide talen, maar spellen identiek — en met die spelling speel je. Het WH-cluster is W's handelsmerk (WHEAT, WHEEL, WHERE, WHICH), gevolgd door de stille-W-set WR- (WRIST, WRITE, WRONG, WROTE) — het tweede stille-lettergeslacht na KN-. Eén W-gissing test twee families tegelijk: een grijze W elimineert WH- én WR- in één klap.",
      ends:
        "Ongeveer twee procent van de antwoorden eindigt op W, vrijwel uitsluitend via de -OW-familie: BELOW, ELBOW, THROW, ALLOW, ARROW plus een kort rijtje éénlettergrepige -OW-woorden. De finale set is klein genoeg om te memoriseren: BELOW, ELBOW, THROW, ALLOW, ARROW. Een groene W op vijf plus een O-hint betekent meteen -OW, waarna de eerste twee of drie letters de doorzoekbare kern vormen. Let op je gehoor: wie BELOW op zijn Nederlands uitspreekt, hoort die slot-W niet eens — in het Engels is het een volle /w/. Scrabble-crossover: W is een 4-puntstegel (twee in de zak); THROW (11) en ELBOW (10) zijn sterke dubbeldieners, en ARROW (8) verrast Scrabble-rekken met drie klinkers.",
    },
    x: {
      title: "X-woorden, de uitsluitselsleutel",
      starts:
        "De X start nooit een Wordle-antwoord — nul, in de hele lijst. Engelse vijfletterwoorden die met X beginnen zijn transcripties (XYLEM, XEBEC) die nooit als antwoord verschijnen; ook het Nederlands kent de X vrijwel alleen als importletter (XYLOFOON). Die nul ís de strategie: X is puur een binnenletter, dus een gele X markeert positie drie tot en met vijf (TOXIC, BOXER, HELIX, INDEX, MAXIM, RELAX). Een X-test is een uitsluitingszet: een grijze X elimineert de -AX-, -EX-, -IX- en -OX-families in één gissing — elite-waarde zodra het veld smal wordt. De -EX- en -AX-vormen (INDEX, RELAX, HELIX, BORAX) zijn X's echte habitats en verdienen één gerichte sonde.",
      ends:
        "Een handjevol antwoorden eindigt op X — minder dan een half procent, via de -AX- en -EX-families (RELAX, plus enkele rariteiten). X-finali zijn zo schaars dat een late X-bevestiging — zeker een grijze — de complete -AX/-EX-jacht in één zet beëindigt. Groene X op vijf plus een klinkerhint? RELAX is de gedoodverfde favoriet. Scrabble-crossover: X is een 8-puntstegel (één in de zak); het Nederlandse Scrabble telt er zelfs 10 voor, maar hier spelen we Engels. RELAX (12) en TOXIC (14) zijn premium dubbeldieners, en HELIX (17) is de kroonjuweel onder de X-woorden die in Wordle voorkomen — meteen in je Save Vault.",
    },
    y: {
      title: "Y-woorden, de slotverrassing",
      starts:
        "De Y start vrijwel nooit een Wordle-antwoord — minder dan een kwart procent (YACHT, YEAST, YIELD, YOUNG, YOUTH). Die micro-club maakt een groene Y op één tot een sterk zeldzaamheidssignaal: precies die vijf kandidaten. Y's echte habitat is dubbel: de medeklinker-Y als slotletter (HAPPY, FUNNY, HEAVY) en de klinker-Y binnenin (MYTH, RHYME, LYMPH, CRYPT, LYNX). Dat dubbele leven is Wordle's Y-val: een gele Y kan een slot-medeklinker zijn óf een binnenklinker, en het onderscheid is een middenspel-vaardigheid die seriespelers van seriesbrekers scheidt. Grappig genoeg vervult de Nederlandse IJ soms de klinkerrol die de Engelse Y speelt — maar de IJ bestaat in Wordle simpelweg niet.",
      ends:
        "Y is de op één na meest voorkomende eindletter — rond de negen procent — via de families -LY, -NY, -RY en -TY: ANGRY, DAILY, DIRTY, DIZZY, EARLY, EMPTY, FAIRY, FORTY, FUNNY, FUZZY, HAPPY, HEAVY, HURRY, JUICY, LUCKY, NASTY, PARTY, RUSTY, SALTY, SILLY, SIXTY, SORRY, SPICY, STICKY, TASTY, WEARY. Het slot-Y is typisch Engels: waar het Nederlands bijwoorden kaal laat (langzaam), plakt het Engels er -LY aan — goud waard in Wordle. Drill per medeklinkerpaar (P-Y, T-Y, R-Y, L-Y): één bevestigd paar completeert vaak meteen het woord. Scrabble-crossover: Y telt 4 punten (twee tegels); FUZZY (29!) en DIZZY (27) zijn monsters — bij de hoogst scorende antwoorden van het hele bestand.",
    },
    z: {
      title: "Z-woorden, de finale eliminatie",
      starts:
        "De Z is de zeldzaamste letter van Wordle, samen met J en Q — een handjevol antwoorden bevat er überhaupt een, en de openers beperken zich vrijwel tot ZEBRA, ZESTY en wat leenwoord-curiosa. In het Nederlands is de Z doodgewoon (ZON, ZEEP, ZOMER), maar in de Engelse cognaten werd hij steevast een S: ZON werd SUN, ZEEP werd SOAP, ZOUT werd SALT — precies waarom de Engelse Z zo schaars is. Een groene Z op één is bijna een opgeloste puzzel: ZEBRA is de gedoodverfde favoriet. Het dubbele-Z-patroon is Z's handelsmerk (PIZZA, FUZZY, DIZZY): een gele Z plus een klinkerhint wijst rechtstreeks naar de ZZ-familie.",
      ends:
        "Bijna geen enkel antwoord eindigt op Z — effectief nul, want Engelse vijfletter-Z-finali bestaan niet en zelfs leenwoorden als BLITZ vallen buiten het bestand. Gebruik het structureel: een gele Z markeert binnenposities, meestal de dubbele Z op drie of vier (PIZZA, FUZZY, DIZZY). Die ZZ-familie is dé studeset: PIZZA (24 punten!), FUZZY (29) en DIZZY (27) zijn de drie hoogst scorende gewone antwoorden van Wordle — echte Scrabble-monsters, meteen in je Save Vault. Een grijze Z elimineert de hele ZZ-club plus de -ZE-eindes in één zet: elite-eliminatiewaarde zodra het veld smal wordt — de finale afronding van het alfabet.",
    },
  },
};
