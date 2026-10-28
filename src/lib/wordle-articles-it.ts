// src/lib/wordle-articles-it.ts — Wordle articles in Italian.
// Written FOR Italian speakers playing ENGLISH Wordle (the game is
// English-only). Not a literal translation: each entry contrasts English
// Wordle patterns with Italian expectations — the vowel-final instinct of
// Italian, the shared double-letter heritage (PIZZA, FUZZY), the QU pattern
// that works identically in both languages, and the fact that accents
// (à, è, ì, ò, ù) never appear in Wordle. All word examples and Wordle
// statistics remain English: the answers are English words.
//
// Placeholders: {letter} {Letter} {angle} {score} {count} {total} {plural}
//               {tileWord} {double} {triple}
//
// Tile values: Wordle is English, so the ENGLISH Scrabble tile values
// (Q/Z=10, J/X=8, K=5, F/H/V/W/Y=4, B/C/M/P=3, D/G=2, vowels=1) are the
// crossover knowledge referenced below — NOT the Italian Zingarelli values,
// which are different (the tileTemplate makes this contrast explicit).

import type { WordleArticleContent } from "./wordle-articles";

export const IT_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "Come vincere a Wordle usando {angle}",
  startsLead:
    "Wordle premia chi sa dove ogni lettera preferisce sedersi. Le parole che iniziano con {letter} hanno un ruolo preciso nel pool di risposte: {total} risposte Wordle valide cominciano con questa lettera, e conoscere i modelli dominanti le trasforma da tentativi in armi. Una precisazione per gli italofoni: Wordle è un gioco interamente inglese — anche quando l'interfaccia parla italiano, le risposte arrivano dal dizionario inglese, quindi i modelli che contano sono quelli inglesi. Questa guida copre le tattiche per le aperture con {letter}, il valore della tessera Scrabble per chi gioca anche all'altro gioco e le giocate di punta nascoste nella lista qui sopra.",
  endsLead:
    "Le finali sono dove la striscia si salva o si perde — ed è esattamente il punto in cui l'istinto italiano tradisce: la nostra lingua chiude quasi sempre in vocale (A, E, I, O), mentre il Wordle inglese finisce spesso in consonante (E, Y, T, R, N). Le parole che finiscono con {letter} formano una famiglia distinta di {total} risposte valide, e i loro modelli premiano lo studio molto più dell'ipotesi a caso. Questa guida analizza le strategie per le finali con {letter}, i punti Scrabble che WordIzy mostra accanto a ogni risposta e le giocate crossover ad alto punteggio da memorizzare.",
  tileTemplate:
    "Curiosità da crossover Scrabble: nello Scrabble inglese la tessera {Letter} vale {score} point{plural}, e in ogni partita ne circolano solo {count} {tileWord}. Nota per chi è cresciuto con lo Zingarelli: i valori italiani sono diversi, ma Wordle è un gioco inglese, quindi sono le tessere inglesi il vero ponte tra i due giochi. WordIzy mostra il punteggio Scrabble accanto a ogni risposta: quando una risposta vale anche come giocata di punta ({Letter} su una casella doppia-lettera rende {double}, su una tripla {triple}), la riconosci al volo nella lista qui sopra e la metti da parte per la prossima partita.",
  topWordsHeading: "Le parole Wordle con {Letter} dal punteggio più alto",
  topWordsLead:
    "Queste sono le risposte Wordle valide contenenti {letter} con il punteggio Scrabble più alto — in tempo reale dal nostro database. Fanno doppio servizio: ottime ipotesi per il puzzle quotidiano E giocate di valore nello Scrabble:",
  closing:
    "La differenza tra un giocatore occasionale e un custode di strisce non è quasi mai la fortuna: è sapere quali parole con {letter} esistono come risposte Wordle, dove la lettera preferisce sedersi statisticamente e come spendere ogni ipotesi per il massimo di informazione. Aggiungi questa pagina ai preferiti, allena le parole in cima alla lista e {letter} diventerà un indizio da sfruttare invece di una casella da temere.",
  letters: {
    a: {
      title: "parole con A per aperture d'assalto",
      starts:
        "Nel Wordle inglese la A è la seconda lettera d'apertura più comune: circa una risposta su dodici comincia con lei, dietro solo alla S. Attenzione però alla posizione: l'italiano mette la A in fondo alla parola (casa, terra, aria), Wordle la schiera all'inizio. Le forme dominanti sono AD-, AL-, AN-, AR- e AT- (ADAPT, ALERT, ANGEL, ARGUE, ATLAS), con la doppia ABACK pronta a sorprendere. Aperture come ADIEU e AUDIO testano quattro vocali in un colpo solo — il modo più rapido per sapere se E, I, O o U compaiono nella risposta di oggi. Se la A torna verde in prima casella, gioca il triangolo ANGEL-ARGUE-ATLAS; se è gialla, la sua casa è la posizione due.",
      ends:
        "Ecco lo shock più grande del Wordle per un italofono: l'italiano ha più parole che finiscono in -A di qualsiasi altra lingua — casa, terra, madre — eppure meno del tre percento delle risposte Wordle finisce con la A. La famiglia è un club di prestiti: AURA, COMA, DRAMA, EXTRA, KOALA, MAFIA, MEDIA, OMEGA, PANDA, PLAZA, SOFA, VILLA, YOGA, ZEBRA, ARENA. Quindi: una A gialla indica quasi sempre la posizione due o tre, mai la quinta — testate le posizioni interne prima di spendere un tentativo sull'ultima casella. Crossover Scrabble: la tessera A vale 1 punto (nove nel sacchetto), ma EXTRA (12) e ZEBRA (16) sono giocate a sorpresa in entrambi i giochi.",
    },
    b: {
      title: "parole con B per seconde ipotesi coraggiose",
      starts:
        "La B è la terza lettera d'apertura più comune del Wordle: circa una risposta su quattordici inizia con lei (BLACK, BREAD, BRING, BONUS, BEACH). I raggruppamenti BL- e BR- (BLACK, BLADE, BRICK, BROTH) suonano familiari a chi parla italiano — BLU e i prestiti moderni li rendono di casa — seguiti dalla famiglia BE- (BEAST, BEGIN, BENCH). Le parole in B sono seconde ipotesi eccellenti perché la lettera raramente compare altrove: una B grigia elimina l'intero ventaglio BA-, BE-, BI-, BO-, BU- in una sola mossa, un'informazione di prim'ordine per un solo tentativo. Le aperture vocaliche come ADIEU non contengono B, quindi una B verde merita una seconda mappatura delle vocali.",
      ends:
        "Nessuna risposta Wordle finisce con la B: la lista è praticamente vuota, perché le parole inglesi che terminano in B sono quasi sempre più lunghe (absorb, describe). Qui l'istinto italiano aiuta — anche da noi la B non chiude quasi parola — quindi non c'è alcun riflesso vocale da correggere. Usatela come fatto eliminatorio: se l'ultima casella resta irrisolta a fine partita, puntate su finali probabili invece di cacciare una B impossibile. Una B gialla indica con forza le posizioni due o tre (RABID, ROBOT, HABIT, CABLE). Crossover Scrabble: la tessera B vale 3 punti (solo due nel sacchetto); CABLE (9) e GAMBLE (10) sono le giocate interne che ripuliscono le tessere.",
    },
    c: {
      title: "parole con C tra suono duro e suono dolce",
      starts:
        "La C è la seconda lettera d'apertura più comune del Wordle: quasi una risposta su dieci inizia con lei, soprattutto attraverso le famiglie CA-, CO- e CR- (CANDY, CATCH, COUCH, CRANE, CROSS). Le ipotesi con C coprono bene perché la lettera ha due suoni distinti: duro come nell'italiano CASA (CATCH, CRANE) e dolce davanti a E, I, Y (CIDER, CYCLE, CIVIC) — la stessa doppia vita della C di CINQUE. Attenzione al digrafo CH: in inglese suona come la nostra C dolce (CHAIR ≈ «cièr»), mentre la CH di CHI italiano resta dura. L'apertura CRANE è celebre per un motivo: mette insieme C, R, A, N, E — cinque lettere comuni ad alto valore.",
      ends:
        "Praticamente nessuna risposta Wordle finisce con la C: le parole di cinque lettere con C finale mancano dalla lista, perché MUSIC e LOGIC collocano la C in quarta posizione, non in quinta. L'italofono parte avvantaggiato: dove l'italiano scrive MUSICA e LOGICA con la vocale finale, l'inglese taglia la A — la C resta però al quarto posto. Con MUSI- o LOGI- sulla griglia, la C riempie la casella quattro, mai la cinque. Una C gialla segnala tipicamente le posizioni uno o quattro (CHAIR, MUSIC, LOGIC, MAGIC). Crossover Scrabble: la C vale 3 punti (due nel sacchetto); MUSIC (9), MAGIC (9) e LOGIC (6) sono giocate solide, soprattutto con la C su una casella doppia.",
    },
    d: {
      title: "parole con D e la deduzione del -ED",
      starts:
        "La D apre circa una risposta Wordle su venti — frequenza media (DANCE, DAILY, DIARY, DOUBT, DREAM, DRINK). Le parole si dividono in due gruppi strategici: la famiglia vocalica DA-/DE- (DANCE, DEBUT, DELTA) e il raggruppamento DR- (DREAM, DRIFT, DRIVE, DROWN), che l'italiano conosce bene da DRAGO. La D è anche una delle quattro finali più comuni, quindi confermarla presto sposta subito i piani di fine partita: una D grigia in quinta posizione vale tanto quanto una D verde in prima. Le forme DI- (DIARY, DIGIT, DINER) completano le famiglie davanti e meritano una sonda a metà partita quando la griglia lo suggerisce.",
      ends:
        "La D è la settima finale più comune del Wordle — circa il quattro percento — quasi tutta tramite il passato inglese in -ED (FIXED, BROAD, BLOOD, THIRD) e i sostantivi in -D puro (WORLD, BLOND, HOUND, FIELD, BEARD). Il passato inglese è meccanico dove l'italiano è vario (parlai, ho parlato): se E e D sono confermate, la risposta è quasi certamente una forma passata, e le prime lettere ne trasportano il significato. Le finali in D fanno anche ottime rime: WOULD, COULD, SOUND, FOUND formano una famiglia dove un colpo giusto ne apre parecchi. Crossover Scrabble: la D vale 2 punti (quattro nel sacchetto); WORLD e WOUND a 9, BROAD a 8.",
    },
    e: {
      title: "parole con E, la vocale regina",
      starts:
        "La E è la lettera più comune dell'intero pool di risposte Wordle — circa l'undici percento — eppure raramente apre: meno del due percento delle risposte inizia con lei (EAGLE, EARLY, EARTH, EIGHT, ELITE, EMPTY, ENEMY, ENTER, EQUAL, ERUPT, EXACT, EXTRA). L'inversione conta: le parole in E sono così scarse che una E verde in prima posizione restringe subito il campo alla lista sopra. Le famiglie dominanti sono EA- (EAGLE, EARLY, EARTH), EM-/EN- (EMPTY, ENEMY, ENTER) e la coppia premium EX- (EXACT, EXTRA). Poiché la E di solito siede all'interno o in coda, testarla in prima casella è un colpo a lungo raggio con un ritorno enorme quando va a segno.",
      ends:
        "La E è la regina delle finali: circa una risposta Wordle su cinque finisce con lei. Le famiglie produttive sono -KE, -LE, -ME, -NE, -SE, -TE e -VE (SNAKE, APPLE, BLAME, STONE, HOUSE, WRITE, GIVE), più il gruppo -ER (AFTER, WATER, SUPER) che aggiunge un altro quattro percento. Nota per italofoni: questa E finale inglese è quasi sempre muta — STONE si legge «ston» — e gli accenti italiani (à, è, ì, ò, ù) non esistono in Wordle: la nostra vocale finale qui non ha equivalenti. Con l'ultima casella irrisolta, la E in quinta è la scommessa statistica giusta. Crossover: la E vale 1 punto (dodici nel sacchetto); HOUSE (8) e STONE (5).",
    },
    f: {
      title: "parole con F per eliminazioni rapide",
      starts:
        "La F apre circa una risposta Wordle su venti — frequenza media (FAIRY, FANCY, FIELD, FIRST, FLOAT, FRONT, FROST, FRUIT). Le parole in F sono oro eliminatorio perché la lettera raramente compare altrove: una F grigia uccide in un colpo le famiglie FA-, FE-, FI-, FO- e FU-. Le forme dominanti sono il raggruppamento FR- (FRESH, FRIED, FRONT, FROST) e le coppie vocaliche FA-/FE- (FANCY, FEAST, FEVER, FIBER) — e sì, FAIRY è la FATA inglese, ma non aspettatevi la vocale finale che da noi sarebbe ovvia. Aperture celebri come SLATE e CRANE saltano la F: quando sospettate un attacco consonantico frontale, FRONT, FLOAT o FROST valgono una sonda a metà partita.",
      ends:
        "Effettivamente zero risposte Wordle finiscono con la F: la lista non contiene parole di cinque lettere con F finale, perché le chiusure inglesi in -F esigono parole più lunghe (itself, behalf). Qui l'istinto italiano dà ragione al gioco — anche da noi la F non chiude parola — quindi non c'è riflesso da correggere: con l'ultima lettera irrisolta, la F non è mai la risposta, e una F gialla indica le posizioni interne, dove KNIFE, WOLF e CHEF la collocano in quarta casella. Crossover Scrabble: la F vale 4 punti (due nel sacchetto); KNIFE (12), WOLF (10) e CHEF (12) sono esattamente le parole di doppio impiego che questa pagina serve a far emergere.",
    },
    g: {
      title: "parole con G e il modello -ING",
      starts:
        "La G è un'apertura poco frequente: meno del tre percento delle risposte inizia con lei (GHOST, GIANT, GIVEN, GLASS, GLOBE, GRACE, GRADE, GRAND, GRASP, GRAVE, GROUP, GUESS). Quasi tutto passa per il raggruppamento GR- (GRAND, GRAPE, GRASP, GRAVE, GREED, GRILL, GROUP, GROVE), con GL- (GLASS, GLOBE, GLORY) e GO- (GOOSE, GORGE) di supporto. Una G verde in prima casella più una R confermata rendono il triangolo GRA-/GRE- la mossa successiva. Il vero potere della G è posizionale: compare molto più spesso in fondo alle risposte che all'inizio — il gerundio inglese finisce in -ING dove l'italiano usa -ANDO/-ENDO (parlando, temendo) — quindi testarla davanti è un'inversione deliberata.",
      ends:
        "Circa il due percento delle risposte Wordle finisce con la G, divise tra il gerundio in -ING (BRING, GOING, DYING, USING) e i monosillabi in -NG (AMONG, STRONG, WRONG, YOUNG). La deduzione è potente: una G verde in quinta posizione più un indizio vocalico punta subito a -ING o -ONG, e le prime due-tre lettere diventano un piccolo insieme da cercare. Dove l'italiano coniuga il gerundio con -ANDO/-ENDO, l'inglese lo inchioda a -ING: se I-N-G sono tutte confermate, la risposta è una forma verbale e il campo si restringe da solo. Crossover Scrabble: la G vale 2 punti (tre nel sacchetto); BRING (8) e YOUNG (9) sono giocate modeste ma solide.",
    },
    h: {
      title: "parole con H, la lettera muta che parla",
      starts:
        "Da sola la H apre raramente — meno del tre percento — ma è un'ospite onnipresente nei digrafi che dominano l'inglese: TH-, CH-, SH-, WH-. Per un italofono è un ribaltamento completo: la nostra H è muta e sopravvive quasi solo in ho, hai, ha e hanno, mentre l'inglese la fa lavorare in suoni — la TH di THEME — che la fonologia italiana non possiede affatto. Le aperture indipendenti sono i cavalli da battaglia (HABIT, HAPPY, HEART, HEAVY, HORSE, HOTEL, HUMAN, HUMOR, HURRY). Il valore strategico della H è confermare i digrafi: con una T gialla e il sospetto di TH, un'ipotesi su THEME o THUMB risolve due lettere insieme.",
      ends:
        "Circa il tre percento delle risposte Wordle finisce con la H, attraverso le famiglie vocaliche brevi: -ACH (BEACH, TEACH), -ITCH (PITCH, SWITCH), -USH (BRUSH, FRESH) e le forme -UGH (TOUGH, ROUGH, LAUGH, MOUTH). La grafia -UGH è il territorio meno italiano del gioco — TOUGH si pronuncia «taf» e non assomiglia a nulla di familiare — ma la struttura è fissa: una H verde in quinta casella significa quasi sempre un monosillabo con vocale breve più raggruppamento consonantico, e la lista dei candidati collassa in fretta. Crossover Scrabble: la H vale 4 punti (due nel sacchetto); WORTH (11) e YOUTH (11) sono giocate forti che spuntano anche nel Wordle.",
    },
    i: {
      title: "parole con I, la vocale interna",
      starts:
        "La I apre meno dell'uno percento delle risposte Wordle: IMAGE, INDEX, INPUT, IRONY, ISSUE, IVORY — per lo più prestiti e termini tecnici. Una I verde in prima posizione è quindi un segnale di rarità potentissimo: la risposta appartiene a un piccolo club riconoscibile. La famiglia del prefisso IN- (INDEX, INPUT) è il nodo più denso, seguita dalle forme IR-/IS- (IRONY, ISSUE). L'apertura ADIEU colloca la I in quarta casella, dove sta molto più comoda: la lettera compare tre volte più spesso nelle posizioni tre e quattro che in prima, quindi il test interno è la strategia di default. Dimenticate l'istinto italiano delle finali in -I: qui l'inglese comanda.",
      ends:
        "Quasi nessuna risposta Wordle finisce con la I — la lista ne contiene essenzialmente zero, perché le parole inglesi con I finale non esistono fuori dai prestiti. Lo zero è già la strategia: con l'ultima casella irrisolta, non indovinate mai I, per quanto i plurali italiani (libri, dolci) vi spingano verso le finali vocaliche. Una I gialla indica quasi sempre la terza o quarta casella (MUSIC, LOGIC, VIVID, RIVAL, CIVIC, PILOT, TIGER). La famiglia -IC è il modello più produttivo: dove l'italiano scrive MUSICA e LOGICA, l'inglese taglia la vocale finale, con la I in terza e la C in quarta. Crossover: la I vale 1 punto (nove nel sacchetto); VIVID (12) è la doppietta di lusso.",
    },
    j: {
      title: "parole con J, l'apertura più rara",
      starts:
        "La J è una delle lettere più rare del Wordle: circa un quarto dell'uno percento delle risposte la contiene, e le aperture si limitano praticamente a JOINT, JOKER, JUICE, JUDGE, JUICY più pochi prestiti. La scarsità è la strategia: una J verde restringe il campo a un club minuscolo e memorabile, e un'ipotesi dedicata (JOKER, JOINT, JUICE) risolve una lettera che le aperture standard non testano mai. La famiglia JU- (JUICE, JUDGE, JUICY) domina perché la J inglese pretende una vocale dietro. Anche l'italiano moderno la considera straniera — vive solo in jeep, jolly e jeans — quindi la sua rarità suona familiare. A fine partita, con una consonante sconosciuta ostinata, la J vale un tentativo.",
      ends:
        "Zero risposte Wordle finiscono con la J — nessuna, nell'intera lista: le parole inglesi di cinque lettere con J finale non esistono nel pool. L'italofono parte avvantaggiato: anche l'italiano non chiude mai una parola con la J, quindi non c'è riflesso da correggere. Una J gialla può quindi segnare solo le posizioni da uno a quattro, realisticamente da uno a tre. L'habitat vero è interno: MAJOR e BANJO la mettono in terza e quarta casella, mentre ENJOY — la risposta che quasi tutti incontrano — la tiene in quarta con la Y finale. Crossover Scrabble: la J è una tessera da 8 punti (una sola nel sacchetto, la più rara); BANJO (14) e MAJOR (13) sono le doppiette premium.",
    },
    k: {
      title: "parole con K e il modello CK",
      starts:
        "La K apre circa l'uno percento delle risposte Wordle: KNIFE, KNOCK, KNOWN, KAYAK, KIOSK, KNEEL. La famiglia KN- con N muta (KNIFE, KNOCK, KNOWN, KNEEL) è la firma della lettera: metà delle aperture comincia con una N che non si pronuncia — follia pura per un italofono, visto che da noi la N non tace mai. Le ipotesi con K sono quindi a doppio scopo: testano la K e rivelano se la forma con N muta è in gioco. Le figure vocaliche KA-/KO- (KAYAK, KIOSK) sono prestiti da riconoscere a prima vista — l'italiano la conosce solo da kiwi e karma. Una K verde in prima più una N grigia elimina l'intera famiglia KN- in una mossa.",
      ends:
        "Circa il tre percento delle risposte Wordle finisce con la K, dominate dalle famiglie vocaliche brevi -ACK, -OCK, -ICK e -UCK: BLACK, BLOCK, BRICK, CLOCK, KNOCK, QUICK, STICK, STUCK, THINK, THICK, TRACK, TRUCK. La deduzione: una K verde in quinta con vocale breve confermata significa che la consonante centrale è quasi certamente L, R, S, T o un raggruppamento TH — cinque candidati, un'ipotesi. Le parole in CK sono anche indizi grammaticali: C e K confermate insieme indicano un monosillabo, e i candidati verbali cadono. Crossover Scrabble: la K vale 5 punti (una sola nel sacchetto); QUICK (18), THINK (12) e BLACK (11) sono le risposte di doppio impiego più pregiate.",
    },
    l: {
      title: "parole con L, la liquida delle finali",
      starts:
        "La L apre circa il quattro percento delle risposte Wordle: LABEL, LARGE, LAUGH, LEARN, LEMON, LIGHT, LIMIT, LOCAL, LOYAL, LUNCH, LUCKY. Le famiglie vocaliche LA-/LE- portano il peso. Le aperture con L si abbinano bene a seconde ipotesi dense di vocali perché la L è la consonante interna più comune dell'inglese: testarla in prima posizione è statisticamente solido, ma una L gialla significa più spesso le caselle due, tre o quattro (PLACE, BLEND, FLOOD, SMILE). Occhio alla doppia L di LLAMA: l'italiano la adora da BELLO e CELLO, l'inglese la scrive uguale ma la pronuncia singola (SMALL, SHELL) — la familiarità grafica resta comunque un vantaggio reale, e i raggruppamenti FL-, CL-, PL- e BL- nascondono migliaia di risposte.",
      ends:
        "La L è la sesta finale più comune — circa il cinque percento — divisa in tre famiglie: -AL (EQUAL, LOCAL, LEGAL, FOCAL, MEDAL, PEDAL, TOTAL), -LE (APPLE, TABLE, CABLE, NOBLE, MAPLE) ed -EL (LABEL, MODEL, HOTEL, VOWEL, JEWEL). La spartizione è già uno schema di studio: vocale A davanti alla L → famiglia -AL; vocale E → -LE o -EL. L'italofono riconosce la prima famiglia all'istante: dove noi scriviamo LEGALE e FINALE, l'inglese taglia la E finale (LEGAL, FINAL). La famiglia -LE è la più numerosa e premia l'allenamento sui modelli (AP-, TA-, CA-, NO- più LE). Crossover Scrabble: la L vale 1 punto (quattro nel sacchetto); MEDAL (8), MAPLE (9) e LEGAL (6) sono giocate solide.",
    },
    m: {
      title: "parole con M per prendere slancio",
      starts:
        "La M apre circa il tre percento delle risposte Wordle: MAGIC, MAJOR, MANGO, MARCH, MATCH, MEDIUM, MINOR, MONEY, MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE, MUSIC. La famiglia MA- è il nodo più denso (MAGIC, MAJOR, MANGO, MARCH, MATCH) — terreno di casa per un italofono, visto che MAMMA si scrive identico nelle due lingue — con MO- (MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE) subito dietro. Le parole in M sono ottime seconde ipotesi dopo aperture vocaliche, perché la lettera raramente apre senza una A o una O dietro. Il modello della doppia M (COMMA, MUMMY, GAMMA) è raro ma distintivo: una M gialla in più caselle lo segnala spesso, e una sola sonda lo conferma.",
      ends:
        "La M è una finale rara — meno del due percento: MAXIM, MEDIUM, RHYTHM, VENOM, FORUM, VICTIM, WISDOM, GLOOM, BLOOM, CHASM, SCREAM, ALBUM, PSALM. Anche l'italiano chiude raramente in M, quindi l'istinto vocale italico qui non tradisce — e ALBUM, peraltro, è prestito identico nelle due lingue. Notate la forma della lista: le finali in M sono per lo più termini dotti o tecnici con strutture vocaliche specifiche (OO, A-, I-). Una M verde in quinta più una doppia O confermata punta veloce a GLOOM o BLOOM; con la I, verso VICTIM. Crossover Scrabble: la M vale 3 punti (due nel sacchetto); MAXIM (16) e VICTIM (12) sono premium, e RHYTHM (21) è il mostro nascosto della famiglia.",
    },
    n: {
      title: "parole con N, l'ancora nasale",
      starts:
        "La N apre circa il due percento delle risposte Wordle: NAIL, NAIVE, NASTY, NAVY, NECK, NERVE, NEVER, NIGHT, NOBLE, NOISE, NORTH, NOTCH, NURSE. La famiglia NA- porta davanti (NAIVE, NASTY, NAVY), mentre NO- (NORTH, NOISE, NOBLE, NOTCH) e NE- (NECK, NERVE, NEVER) si dividono il resto. Le aperture con N sono poco appariscenti ma dense d'informazione: la N è la quarta lettera più comune in assoluto, quindi confermarla presto — specie in quarta casella, dentro i modelli -ION e -ON — sblocca le famiglie finali che dominano le risposte di cinque lettere. Nota per italofoni: in NIGHT la GH è muta — l'inglese spende quattro lettere per la N che noi scriviamo da sola in NOTTE.",
      ends:
        "La N è la quinta finale più comune — circa il sei percento — attraverso due famiglie: -EN (GIVEN, OFTEN, OCEAN, OVEN, WOMEN, SIREN, RAVEN, SEVEN, WOVEN, MELON) e -AN (BEGAN, HUMAN, ORGAN, PECAN, TITAN, VEGAN). Una N verde in quinta con indizio su E punta subito a -EN; con la A, a -AN. L'italofono riconosce MELON e SIREN all'istante: sono il nostro MELONE e la nostra SIRENA troncati dell'ultima vocale — l'inglese taglia dove l'italiano allunga, e il troncamento lascia la N in quinta casella. Crossover Scrabble: la N vale 1 punto (sei nel sacchetto); ORGAN (6), WOMEN (10) e RAVEN (8) sono doppie prestazioni solide che ripuliscono le tessere in entrambi i giochi.",
    },
    o: {
      title: "parole con O, la seconda vocale",
      starts:
        "La O apre circa l'uno percento delle risposte Wordle: OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER, OUGHT, OUNCE. Un insieme piccolo e vocalico — si noti quante parole l'italiano riconosce a colpo d'occhio, con OPERA in testa — dominato dalle forme dittongiche OU- (OUGHT, OUNCE) e dalle coppie O più consonante (OCEAN, OFTEN, OLIVE, ONION, OTHER). Nell'italiano la O apre ovunque (oggi, ora, uomo); nel Wordle inglese la lettera lavora quasi solo in seconda e terza casella — è la quarta più comune in assoluto — quindi le aperture in O valgono poco. La famiglia OO- (BLOOD, FLOOR, GLOOM) inizia con altre lettere ma premia la conoscenza della vocale, e le forme OU- sono il contributo distintivo della O.",
      ends:
        "Circa il due percento delle risposte Wordle finisce con la O — e qui l'istinto italiano inganna pesantemente: il maschile italiano finisce in -O di continuo (libro, ragazzo), mentre il Wordle inglese quasi mai. Il club è minuscolo e in buona parte fatto di prestiti: MANGO, TORSO, HALO, PIANO, ECHO — con PIANO addirittura identico all'italiano. La lista è così corta da imparare a memoria, trasformando la finale rara in una deduzione gratuita: con l'ultima casella irrisolta e indizi su O, provate prima la lista. Una O gialla segnala più spesso le posizioni due o tre (MONEY, PHONE, GHOST, SCOOP, BROOM). Crossover: la O vale 1 punto (otto nel sacchetto); MANGO (8), TORSO (5).",
    },
    p: {
      title: "parole con P e il regalo della PIZZA",
      starts:
        "La P apre circa il tre percento delle risposte Wordle: PAINT, PANDA, PAPER, PARTY, PASTA, PATCH, PEARL, PIANO, PLACE, PLAIN, PLANE, PLANT, PLATE, POINT, POUND, POWER, PRESS, PRICE, PRIDE, PRIME, PRIZE, PROVE, PULSE, PUNCH, PUPIL. I raggruppamenti PL- e PR- (PLAIN, PLANT, PRESS, PRIDE) dominano, con la famiglia vocalica PA- (PAPER, PASTA, PANDA) di supporto — e notate quanti prestiti italiani: PASTA, PANDA, PIANO. Le ipotesi con P sono strumenti di precisione: la lettera raramente compare altrove, quindi una P grigia elimina tre famiglie intere in una mossa. La doppia P di PIZZA è il prestito più celebre della lista: una P gialla con un indizio su Z significa spesso PIZZA in gioco.",
      ends:
        "Meno dell'uno percento delle risposte Wordle finisce con la P — le forme monosillabiche -AP, -IP e -OP si registrano a malapena nella lista. Il consiglio pratico: quasi nessuna risposta chiude in P, quindi una P gialla indica con fiducia le posizioni da uno a tre (PAINT, PAPER, PUPIL); spendete le ipotesi sull'ultima casella su E, Y o T. Crossover Scrabble: la P vale 3 punti (due nel sacchetto), ma il gioiello è PIZZA con 24 punti — il regalo dell'italiano al Wordle, la parola italiana più famosa del gioco e una delle risposte comuni col punteggio più alto dell'intero pool: da salvare subito nel vault. PROVE (10) e PRIZE (16) completano i campioni.",
    },
    q: {
      title: "parole con Q senza U",
      starts:
        "La Q è la lettera più rara del Wordle — meno dell'uno percento delle risposte la contiene — e le aperture formano un club ristretto: QUAKE, QUART, QUEEN, QUERY, QUEUE, QUICK, QUILT, QUIET, QUITE, QUOTA, QUOTE. Il fatto strategico è domestico: la Q inglese esiste quasi solo con la U dietro, esattamente come la Q di QUI, QUANDO e QUESTO. Una Q verde rende quindi la U il test immediato — e se la U torna grigia, state cercando una Q-senza-U, conoscenza importata dallo Scrabble da torneo, dove QI vale 11 punti e QAT, QOPH e FAQIR tengono la Q viva senza U. La lista qui sopra mostra ogni risposta con la Q iniziale e il suo punteggio.",
      ends:
        "Zero risposte Wordle finiscono con la Q — nessuna nell'intera lista ufficiale. Le parole di cinque lettere con Q finale sono prestiti esotici (SUQ, TRANQ) che non compaiono mai come risposte. Nemmeno l'italiano chiude con la Q: la simmetria QUI/QUANDO/QUESTO ↔ QUERY/QUAKE è totale, un caso raro di coincidenza perfetta tra le due lingue. La zero è un regalo difensivo: con l'ultima lettera irrisolta, spendete i tentativi su finali probabili (E, Y, T, R) invece di cacciare una Q impossibile. Una Q gialla può solo indicare la prima o seconda casella — realisticamente la prima. Crossover Scrabble: la Q vale 10 punti (una sola nel sacchetto); QUERY (16) e QUOTA (14) sono premium.",
    },
    r: {
      title: "parole con R, il cavallo da tiro",
      starts:
        "La R apre circa il due percento delle risposte Wordle: RADIO, RAISE, RANCH, RANGE, RAPID, RATIO, REACT, READY, REALM, REFER, RELAX, REPLY, RIDER, RIGID, RISKY, ROBOT, ROUGH, ROUND, ROUTE, ROYAL, RURAL. Le famiglie vocaliche RA-/RE- dominano, con RO- di supporto — e RADIO, si noti, è identica in italiano. La R è la terza lettera più comune in assoluto, quindi le aperture con R hanno ottima copertura; ma una R gialla indica più spesso le posizioni interne (BREAD, FIRST, OTHER), dove la lettera compare il doppio delle volte. L'apertura CRANE testa la R in seconda casella: è per questo che elimina tanto campo, e la doppia R di REFER merita una sonda dedicata.",
      ends:
        "La R è la quarta finale più comune — circa il sette percento — dominata dalla famiglia agentiva -ER: AFTER, FEVER, LATER, LASER, NEVER, OTHER, OWNER, PAPER, RIVER, SUPER, TIMER, TOWER, UNDER, WATER, più le forme -AR e -OR (SUGAR, VAPOR, FLOOR). Nota grammaticale per italofoni: dove l'italiano costruisce l'agente in -ORE (giocatore, pittore), l'inglese lo inchioda a -ER — quindi una R verde in quinta con una E davanti attiva subito il modello, e le prime tre lettere diventano il nucleo da cercare. Crossover Scrabble: la R vale 1 punto (sei nel sacchetto); RIVER (8) e WATER (7) sono solide, e REFER (8) è la rara parola con doppia R ai capi — pattern che merita una sonda.",
    },
    s: {
      title: "parole con S, il re delle aperture",
      starts:
        "La S è la lettera d'apertura più comune del Wordle: oltre il dieci percento delle risposte inizia con lei (SALAD, SAUCE, SCALE, SCENE, SCORE, SHADOW, SHAKE, SHEEP, SHELL, SHIFT, SIGHT, SILLY, SINCE, SKILL, SLEEP, SLICE, SMALL, SMART, SMILE, SMOKE, SNACK, SOLID, SOLVE, SOUND, SOUTH, SPACE, SPARE, SPARK, SPEAK, SPEED, SPELL, SPEND, SPICE, SPLIT, SPOON, STAFF, STAGE, STAIR, STAKE, STAMP, STAND, START, STEAK, STEAL, STEAM, STICK, STILL, STONE, STORE, STORM, STORY, STUDY, STYLE, SUGAR, SUPER). I raggruppamenti SH-, SK-, SM-, SN-, SP- e ST- creano un panorama di sessanta famiglie — e i gruppi SP-/ST-/SC- parlano latino: SPECIALE, STUDIO e SCUOLA rendono l'apertura S più consonante istintiva per un italofono. Ecco perché SLATE e SAUCE testano la S per prima.",
      ends:
        "Ecco la trappola più celebre del Wordle per un italofono: il plurale inglese finisce in -S (books, cars), dove l'italiano cambia la vocale (libri, case) — ma Wordle esclude i plurali, quindi quasi nessuna risposta finisce con la S: meno dell'uno percento, nonostante sia la lettera più comune in assoluto. Le poche S-finali autentiche sono plurali irregolari e prestiti (CHAOS, CIRCUS, FOCUS, GUESS, GLASS, CROSS, BONUS). La strategia: una S gialla significa schiacciante posizione UNO — testate le parole che iniziano con S invece di pluralizzare. Crossover Scrabble: la S vale 1 punto (quattro nel sacchetto); CHAOS (10) e FOCUS (10), e BONUS (7) è l'ironia perfetta.",
    },
    t: {
      title: "parole con T, il titano delle finali",
      starts:
        "La T apre circa il tre percento delle risposte Wordle: TABLE, TASTE, TEACH, THANK, THEIR, THERE, THESE, THICK, THING, THINK, THIRD, THOSE, THUMB, TIGER, TIGHT, TITLE, TODAY, TOKEN, TOPIC, TORCH, TOTAL, TOUCH, TOWEL, TOWER, TOXIC, TRACE, TRACK, TRAIN, TREAT, TREND, TRICK, TRUCK, TRUST, TRUTH, TWICE, TWIST. Il raggruppamento TH- domina (THANK, THINK, THIRD), con TR- subito dietro — e TRAIN è il nostro TRENO troncato, con la TR- che l'italiano conosce da TRE. La T è la quinta lettera più comune in assoluto, quindi le sue ipotesi coprono molto; ma il vero potere sta in fondo alle risposte. La TH non esiste nella fonologia italiana: per questo merita un test dedicato, non un ripiego.",
      ends:
        "La T è la terza finale più comune — circa l'otto percento — attraverso quattro famiglie: -HT (BRIGHT, FIGHT, LIGHT, NIGHT, RIGHT, SIGHT, TIGHT), -NT (FRONT, PLANT, PRINT, SAINT, SPENT, WANT), -ST (FEAST, GHOST, TOAST, TRUST, TWIST, WORST) e -RT (SMART, SPORT, START). Lo schema è perfettamente visibile all'italofono: dove noi allarghiamo in vocale finale (notte, festa), l'inglese si ferma secco alla consonante (NIGHT, FEAST) — la T finale è il troncamento per eccellenza. La famiglia -IGHT è la miglior serie di rime di cinque lettere dell'inglese: una GHT verde sblocca cinque risposte insieme. Crossover Scrabble: la T vale 1 punto (sei nel sacchetto); FIGHT (11) e LIGHT (9) sono solide.",
    },
    u: {
      title: "parole con U, la vocale nascosta",
      starts:
        "La U è la vocale che meno apre nel Wordle inglese: meno dell'uno percento delle risposte inizia con lei (UNCLE, UNION, UNTIL, UPPER, URBAN, UPSET, USHER, UTTER). È un ribaltamento rispetto all'italiano, dove la U apre con disinvoltura (UNO, UOVO, USO): nell'inglese la vocale sta nascosta in seconda e terza casella (BUILD, GUILT, HOUSE, MOUTH, POINT, POUND, SOUND, WOULD). Il modello QU- è il suo habitat più frequente: ogni parola con Q blocca una U dietro, quindi una Q verde rende la U automatica. Le aperture ADIEU e AUDIO la collocano in quarta casella, la sua casa naturale — per questo la U raramente ha bisogno di una prima ipotesi dedicata.",
      ends:
        "Meno dell'uno percento delle risposte Wordle finisce con la U — effettivamente zero, perché le parole inglesi di cinque lettere con U finale non esistono fuori dai prestiti. L'istinto italiano è già allineato: anche da noi la U chiude solo monosillabi (TU, BLU, PIÙ) — niente riflesso da combattere. Trattatela come fatto di esclusione: una U gialla indica le posizioni da due a quattro, più comunemente la terza (BUILD, GUILT, HOUSE, MOUTH). Le forme -UE (VALUE, VENUE) mandano la E in quinta casella lasciando la U interna. Crossover Scrabble: la U vale 1 punto (quattro nel sacchetto), ma le parole QU cavalcano i 10 punti della Q — QUERY (16) e QUOTA (14) sono le campionesse di doppio impiego.",
    },
    v: {
      title: "parole con V, la specialista interna",
      starts:
        "La V è una delle lettere più rare del Wordle: meno di mezzo punto percentuale delle risposte inizia con lei (VAGUE, VALID, VALUE, VENOM, VIDEO, VINYL, VIPER, VIRAL, VIRUS, VISIT, VITAL, VIVID, VODKA). Le famiglie VA- e VI- dominano (VALID, VALUE, VIDEO, VIRUS, VISIT). Le aperture con V sono ipotesi a lungo raggio dal ritorno eccellente: una V verde restringe il campo al club serrato qui sopra. La doppia V di VIVID è il pezzo forte — l'italiano non scrive mai VV, l'ortografia lo vieta — quindi questa risposta è esotica anche per noi; e si noti l'ironia inglese: la W si chiama letteralmente «double u», doppia u. Le figure vocaliche (VALID, VALUE, VODKA) sono anche ottime giocate Scrabble.",
      ends:
        "Zero risposte Wordle finiscono con la V — nessuna. Le parole inglesi di cinque lettere con V finale non esistono (lav e rev sono troncamenti), e l'italiano concorda: anche da noi la V non chiude parola. Usatela come fatto strutturale rigido: una V gialla può segnare solo le posizioni da uno a quattro, realisticamente da uno a tre (VIDEO, GIVEN, RIVAL, COVER, HOVER, OLIVE). La famiglia -IVE (ALIVE, DRIVE, GIVE) è il modello più produttivo, con la V in quarta casella — e OLIVE è la nostra OLIVA troncata dell'ultima vocale. Crossover Scrabble: la V vale 4 punti (due nel sacchetto); VIVID (13) e VODKA (13) sono risposte premium da salvare nel vault.",
    },
    w: {
      title: "parole con W e il modello WH",
      starts:
        "La W apre circa il tre percento delle risposte Wordle: WAGON, WASTE, WATCH, WATER, WHEAT, WHEEL, WHERE, WHICH, WHILE, WHITE, WHOLE, WHOSE, WIDOW, WINDY, WITCH, WOMAN, WORLD, WORRY, WORSE, WORTH, WOULD, WOUND, WRIST, WRITE, WRONG, WROTE. Per un italofono è la lettera straniera per eccellenza: l'alfabeto italiano tradizionale non la contiene, e da noi vive solo nei prestiti (wifi, western, wurstel). Il digrafo WH- è la firma della W (WHERE, WHILE, WHITE), seguito dal set WR- con W muta (WRIST, WRITE, WRONG) — la seconda famiglia di lettera silenziosa dopo KN-. Le ipotesi con W testano due modelli insieme: una W grigia elimina WH- e WR- in una mossa, una copertura che pochi sfruttano.",
      ends:
        "Circa il due percento delle risposte Wordle finisce con la W, quasi esclusivamente tramite il dittongo -OW: BELOW, ELBOW, THROW, ALLOW, ARROW più pochi monosillabi. Il gruppo è così piccolo da imparare a memoria — e l'italofono ci guadagna a farlo, perché il dittongo finale -OW non esiste nella fonetica italiana: non c'è istinto da correggere, solo una lista da fissare. Una W verde in quinta con un indizio su O significa -OW immediato, e le prime due-tre lettere diventano il nucleo cercabile. Crossover Scrabble: la W vale 4 punti (due nel sacchetto); THROW (11) ed ELBOW (10) sono giocate forti di doppio impiego, e ARROW (8) è la W-finale a tre vocali che sorprende le tessere impreparate.",
    },
    x: {
      title: "parole con X, la chiave di esclusione",
      starts:
        "La X non apre mai una risposta Wordle — zero, nell'intera lista: le parole inglesi di cinque lettere che iniziano con X sono traslitterazioni (XYLEM, XEBEC) che non compaiono mai come risposte. Anche l'italiano non apre con la X — la nostra vive nei prefissi dotti (extra, xilofono) — quindi l'istinto coincide: la X è puramente una lettera interna, e una X gialla indica le posizioni da tre a cinque (TOXIC, BOXER, HELIX, INDEX, MAXIM, RELAX). Testarla è una mossa di esclusione: una X grigia elimina le famiglie -AX, -EX, -IX e -OX in un colpo solo — valore da elite a fine partita, quando il campo è stretto. Le forme -EX e -AX meritano una sonda deliberata.",
      ends:
        "Una manciata di risposte Wordle finisce con la X — meno di mezzo punto percentuale, attraverso le famiglie -AX e -EX (RELAX più qualche rarità). Il valore strategico: le finali in X sono così scarse che confermare una X a fine partita — specie grigia — chiude praticamente la caccia a -AX/-EX in una mossa sola. Una X verde in quinta con vocale davanti fa di RELAX la favorita assoluta — parola che l'italiano conosce bene (sala relax), dal latino relaxare. Crossover Scrabble: la X è una tessera da 8 punti (una sola nel sacchetto, la più rara insieme alla J); RELAX (12), TOXIC (14) e soprattutto HELIX (17) sono gioielli di doppio impiego da vault immediato.",
    },
    y: {
      title: "parole con Y, la sorpresa finale",
      starts:
        "La Y quasi non apre mai nel Wordle — meno di un quarto di punto percentuale (YACHT, YEAST, YIELD, YOUNG, YOUTH): un micro-club la cui Y iniziale è un segnale di rarità potentissimo. L'italiano conosce la Y solo dai prestiti (yogurt, yacht), ma l'inglese le affida due ruoli distinti: consonante in fondo alle risposte (HAPPY, FUNNY, HEAVY) e vocale interna (MYTH, RHYME, LYMPH, CRYPT, LYNX). Il doppio ruolo è la trappola della Y: una Y gialla può essere una consonante finale o una vocale interna, e distinguere i due casi è l'abilità che separa chi custodisce la striscia da chi la spezza. Con una casella finale ostinata, pensate prima alla Y.",
      ends:
        "Ecco l'aggiustamento culturale più grande del Wordle per un italofono: l'italiano non finisce MAI in Y — nessuna parola italiana si chiude con quella lettera — eppure la Y è la seconda finale più comune del gioco, circa il nove percento. Le famiglie -LY, -NY, -RY e -TY (ANGRY, DAILY, DIRTY, DIZZY, EARLY, EMPTY, FUNNY, FUZZY, HAPPY, LUCKY, NASTY, PARTY, SALTY, SILLY, SORRY, TASTY) si allenano per coppie consonantiche: una Y finale più una consonante confermata spesso completa la parola. Nota dolce: dentro FUZZY e DIZZY c'è la doppia ZZ che l'italiano padroneggia da sempre. Crossover Scrabble: la Y vale 4 punti (due nel sacchetto); FUZZY (29!) e DIZZY (27) sono i mostri di doppio impiego dell'intero pool.",
    },
    z: {
      title: "parole con Z, l'eliminazione finale",
      starts:
        "La Z è la lettera più rara del Wordle insieme a J e Q: le aperture si limitano praticamente a ZEBRA e ZESTY più poche curiosità da prestito. Una Z verde in prima posizione è quasi un puzzle risolto: ZEBRA è la favorita assoluta. Il modello della doppia Z (PIZZA, FUZZY, DIZZY) è la firma della lettera — e qui l'italofono parte favorito: da ZERO a ZIO, la Z e le doppie ZZ sono pane quotidiano della nostra lingua, mentre l'inglese le tratta come rarità da museo. Le aperture non testano mai la Z: confermarla costa una sonda deliberata, e il ritorno sono liste di candidati che collassano a singole cifre.",
      ends:
        "Quasi nessuna risposta Wordle finisce con la Z — il conteggio è effettivamente zero, perché le Z-finali inglesi di cinque lettere non esistono e perfino prestiti come BLITZ restano fuori dalla lista. L'istinto italiano coincide: la Z italiana lavora al centro della parola (RAGAZZO, POZZO), non in fondo. Una Z gialla indica quindi le posizioni interne, più comunemente la doppia Z in terza o quarta casella (PIZZA, FUZZY, DIZZY). La famiglia ZZ è lo schema di studio: PIZZA (24 punti!), FUZZY (29) e DIZZY (27) sono le tre risposte comuni col punteggio più alto dell'intero Wordle — mostri Scrabble genuini da salvare nel vault. Una Z grigia elimina il club ZZ e le finali -ZE in una mossa sola.",
    },
  },
};
