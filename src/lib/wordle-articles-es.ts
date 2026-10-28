// src/lib/wordle-articles-es.ts — Wordle articles in Spanish.
// Written FOR hispanohablantes playing ENGLISH Wordle (the game is
// English-only). Not a literal translation: each entry contrasts English
// Wordle patterns with Spanish expectations — vowel-dense Spanish vs the
// consonant-heavy English answer pool, the missing Ñ, silent-Spanish H vs
// pronounced English TH/CH/SH, QU-equivalence, and the no-accents rule.
// Scrabble tile values are the ENGLISH ones (Wordle is English); the FISE
// divergence (Ñ=8, única Z=10, Q=5) is flagged in tileTemplate.
//
// Placeholders: {letter} {Letter} {angle} {score} {count} {total} {plural}
//               {tileWord} {double} {triple}

import type { WordleArticleContent } from "./wordle-articles";

export const ES_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "Cómo ganar al Wordle usando {angle}",
  startsLead:
    "El Wordle premia a quien sabe dónde le gusta sentarse a cada letra. Las palabras que empiezan con {letter} tienen un papel específico dentro del repertorio: {total} respuestas válidas comienzan con esta letra, y conocer sus patrones dominantes convierte los tanteos en armas. Recuerda que, aunque juegues con la interfaz en español, el Wordle es un juego inglés: las respuestas salen del diccionario inglés y jamás llevan acentos. Esta guía cubre las tácticas de las aperturas con {letter}, su valor en fichas de Scrabble para quien juega a ambos juegos y las jugadas de más puntos escondidas en la lista en vivo de arriba.",
  endsLead:
    "Los finales son donde se salvan o se rompen las rachas del Wordle. Las palabras que terminan en {letter} forman una familia distinta dentro del repertorio — {total} respuestas válidas terminan con esta letra — y sus patrones recompensan el estudio mucho más que el tanteo al azar. Ojo hispano: el español desborda de finales vocálicos (A, E, O), pero el Wordle inglés prefiere cerrar con E, Y, T, R y N — un reflejo que conviene reentrenar. Aquí desglosamos las estrategias del {letter} final, los valores de Scrabble que WordIzy muestra junto a cada respuesta y las jugadas de alto puntaje que conviene memorizar.",
  tileTemplate:
    "Cruce con el Scrabble: la ficha de {Letter} vale {score} punto{plural} en el Scrabble inglés, y cada partida solo cuenta con {count} {tileWord}. Ojo: los valores del Scrabble español (FISE) son distintos — la Ñ vale 8, la Z vale 10 y es única, la Q vale apenas 5 — pero el Wordle es inglés, así que aquí mandan los valores ingleses. WordIzy muestra el puntaje de Scrabble junto a cada respuesta: cuando una palabra del Wordle también es una jugada valiosa ({Letter} en casilla de doble letra paga {double}, en triple {triple}), la detectas al instante en la lista en vivo de arriba y la guardas para tu próximo atril.",
  topWordsHeading: "Palabras del Wordle con {Letter} que más puntúan",
  topWordsLead:
    "Estas son las respuestas válidas del Wordle que contienen {letter} con más puntos de Scrabble, en vivo desde nuestra base de datos. Hacen doble trabajo: conjeturas potentes para el puzle diario y jugadas de alto valor en Scrabble:",
  closing:
    "La diferencia entre un jugador casual y un guardián de rachas casi nunca es la suerte: es saber qué palabras con {letter} existen como respuestas válidas del Wordle, dónde prefiere sentarse la letra según las estadísticas y cómo invertir cada intento en información máxima. Guarda esta página en favoritos, practica las palabras de arriba y {letter} pasará de casilla temida a pista que explotas.",
  letters: {
    a: {
      title: "palabras con A para el asalto inicial",
      starts:
        "La A es la segunda letra de apertura más común del Wordle: casi una de cada doce respuestas empieza con ella, solo detrás de la S. Para hispanohablantes acostumbrados a la A por todas partes, la sorpresa es que aquí casi nunca cierra la palabra: su trono es la casilla uno. Las formas dominantes son AD-, AL-, AN-, AR- y AT- (ADAPT, ALERT, ANGEL, ARGUE, ATLAS), más dobles AA como ABACK. Aperturas como ADIEU y AUDIO prueban cuatro vocales de un tirón, la vía más rápida de mapear el resto. Con A verde en la casilla uno, recorre el triángulo ANGEL-ARGUE-ATLAS; si sale amarilla, su casa es la posición dos.",
      ends:
        "Menos del tres por ciento de las respuestas del Wordle terminan en A: muchísimo menos de lo que el oído hispano espera, porque el español desborda de finales en A (CASA, MESA, GATA). Reentrena ese reflejo: la familia de finales con A es un club de préstamos — AURA, DRAMA, EXTRA, KOALA, MAFIA, PLAZA, SOFA, VILLA, YOGA, ZEBRA — y varios te sonarán del castellano. La estrategia: una A amarilla casi siempre apunta a las posiciones dos o tres, no a la cinco; prueba el interior antes de quemar un intento en el final. En Scrabble la A vale 1 punto (nueve fichas), pero EXTRA (12) y ZEBRA (16) puntúan sorprendentemente alto.",
    },
    b: {
      title: "palabras con B para segundos intentos audaces",
      starts:
        "La B es la tercera letra de apertura más común del Wordle: una de cada catorce respuestas empieza con ella (BLACK, BREAD, BRING, BONUS, BEACH). En español B y V suenan casi igual (VACA, BACA), pero en el tablero son letras distintas con comportamientos opuestos: sepáralas desde el primer intento. Las formas de alta probabilidad son los grupos BL- y BR- (BLACK, BLADE, BRICK, BROTH), seguidos de BE- (BEAST, BEGIN, BENCH). Una B gris elimina de golpe las familias BA-, BE-, BI-, BO- y BU-: información de élite por intento. Como aperturas vocal-densas como ADIEU no llevan B, una B verde merece un repaso del mapa de vocales.",
      ends:
        "Ninguna respuesta común del Wordle termina en B: la lista queda prácticamente vacía, porque las palabras nativas con B final exigen más letras (absorb, describe). El español está de acuerdo: casi nada termina en B en castellano, así que esta lógica de eliminación se importa sin traducir. Si la última casilla sigue sin resolverse, gasta el intento en un final de alta probabilidad (E, Y, T) en vez de cazar una B imposible. Una B amarilla apunta con fuerza a las posiciones dos o tres (RABID, ROBOT, HABIT, CABLE). En Scrabble la B vale 3 puntos (dos fichas): CABLE (9) y GAMBLE (10) son las jugadas que puntúan; CRUMB solo vive en Scrabble.",
    },
    c: {
      title: "palabras con C para cubrir patrones",
      starts:
        "La C es la segunda letra de apertura más común del Wordle: casi una de cada diez respuestas empieza con ella, sobre todo en las familias CA-, CO- y CR- (CANDY, CATCH, CRANE, CROSS). Su cobertura es única porque la C inglesa tiene dos sonidos: dura como /k/ (CATCH, CRANE) y suave como /s/ ante E, I, Y (CIDER, CYCLE, CIVIC) — un solo intento muestrea ambas familias. Curiosamente, el español recurre a QUE y QUI (QUESO) para conservar el sonido /k/. El grupo CH- (CHAIR, CHESS, CHICK) es otra tribu de alta frecuencia, y la apertura CRANE es famosa por algo: reúne C, R, A, N y E en una sola jugada.",
      ends:
        "Prácticamente ninguna respuesta del Wordle termina en C: las palabras inglesas de cinco letras colocan la C en la casilla cuatro, no en la cinco. Úsalo como evidencia: si tienes MUSI- o LOGI- en la cuadrícula, la C pertenece a la posición cuatro, jamás a la final. Una C amarilla suele marcar las posiciones uno o cuatro (CHAIR, MUSIC, MAGIC). En Scrabble la C vale 3 puntos (dos fichas), y las respuestas con C interior como MUSIC (9 puntos), MAGIC (9) y LOGIC (6) funcionan además como jugadas limpias de Scrabble — sobre todo con la C en casilla de doble letra.",
    },
    d: {
      title: "palabras con D y la deducción del -ED",
      starts:
        "La D es una apertura de frecuencia media: cerca de una de cada veinte respuestas del Wordle empieza con ella (DANCE, DAILY, DIARY, DOUBT, DREAM, DRINK). Las palabras con D inicial se reparten en dos bandos: las familias vocálicas DA- y DE- (DANCE, DEBUT, DELTA) y el grupo consonántico DR- (DREAM, DRIFT, DRIVE, DROWN). Ojo con los pasados: el español los marca con tilde o con terminaciones como -ABA y -ADO (CANTÓ, CANTABA, CANTADO), y en el Wordle jamás hay tildes; el inglés usa -ED, una de las estructuras finales más rentables. Confirmar la D temprano reordena tu cierre: una D gris en la casilla cinco vale tanto como una verde en la uno.",
      ends:
        "La D es la séptima letra final más común del Wordle — cerca del cuatro por ciento — casi siempre en pasados y adjetivos: la familia -ED (FIXED, BROAD, BLOOD, THIRD) y los sustantivos con D desnuda (WORLD, BLOND, HOUND, FIELD). Para hispanohablantes el -ED es un hábito nuevo: los pasados castellanos no terminan en D, así que ensáyalo aparte. La familia rítmica WOULD, COULD, SOUND y FOUND es un regalo: una conjetura correcta desbloquea varias a la vez. En Scrabble la D vale 2 puntos (cuatro fichas); WORLD (9) y WOUND (9) son jugadas constantes, y BROAD (8) rinde en ambos juegos.",
    },
    e: {
      title: "palabras con E, la vocal reina",
      starts:
        "La E es la letra más común de todo el repertorio del Wordle — cerca del once por ciento de todas las letras — y sin embargo casi nunca ABRE una respuesta: menos del dos por ciento empieza con E (EAGLE, EARLY, EARTH, ELITE, EMPTY, ENEMY, ENTER, EQUAL, ERUPT, EXACT, EXTRA). Esa inversión importa: una E verde inicial estrecha el campo a esa lista corta. Las familias dominantes son EA- (EAGLE, EARLY, EARTH), EM- y EN- (EMPTY, ENEMY, ENTER), y el par premium EX- (EXACT, EXTRA). Como la E prefiere el interior y el final, probarla en la posición uno es una apuesta deliberada con premio enorme cuando acierta.",
      ends:
        "La E es la reina de los finales: aproximadamente una de cada cinco respuestas termina en E, con gran ventaja sobre el resto. Las familias productivas son -KE, -LE, -ME, -NE, -SE, -TE y -VE (SNAKE, APPLE, STONE, WRITE, GIVE), más el grupo -ER (AFTER, WATER, SUPER). Diferencia clave para hispanohablantes: la E final inglesa suele ser muda (en HOUSE apenas suena), mientras la castellana siempre se pronuncia (CARNE, CORRIENTE): mismo grafema, hábitos distintos. Si queda una casilla sin resolver y varias vocales grises, la E en la posición cinco es la apuesta estadística correcta. En Scrabble la E vale 1 punto (doce fichas); HOUSE (8) y STONE (5) son cierres confiables.",
    },
    f: {
      title: "palabras con F para eliminaciones rápidas",
      starts:
        "La F es una apertura de frecuencia media: cerca de una de cada veinte respuestas del Wordle empieza con ella (FAIRY, FANCY, FIELD, FIRST, FLOAT, FRONT, FROST, FRUIT). Sus palabras son oro de eliminación porque la F rara vez aparece en otras posiciones: una F gris mata de golpe las familias FA-, FE-, FI-, FO- y FU-, cobertura excepcional por intento. Las formas dominantes son el grupo FR- (FRESH, FRIED, FRONT, FROST) y los pares FA- y FE- (FANCY, FEAST, FEVER). Las aperturas de moda como SLATE y CRANE no llevan F, así que una sonda (FRONT, FLOAT, FROST) se gana un hueco a mitad de partida si sospechas una consonante frontal.",
      ends:
        "Efectivamente cero respuestas del Wordle terminan en F: la lista oficial no contiene palabras nativas de cinco letras con F final (en inglés esos finales exigen más letras: itself, behalf). El español está de acuerdo — casi nada termina en F en castellano —, así que la lógica se importa sin traducir. Trátalo como hecho estructural: si el final sigue sin resolverse, la F nunca es la respuesta, y una F amarilla marca las posiciones interiores donde viven KNIFE, WOLF y CHEF. En Scrabble la F vale 4 puntos (dos fichas), lo que convierte KNIFE (12), WOLF (10) y CHEF (12) en palabras de doble servicio de altísima puntuación: guárdalas en tu bóveda.",
    },
    g: {
      title: "palabras con G y el patrón -ING",
      starts:
        "La G es una apertura de baja frecuencia: menos del tres por ciento de las respuestas del Wordle empiezan con ella (GHOST, GIANT, GIVEN, GLASS, GLOBE, GRACE, GRADE, GRAND, GRAVE, GROUP, GUESS). Casi todas pasan por el grupo GR- (GRAND, GRAPE, GRAVE, GRILL, GROSS, GROWL), con GL- (GLASS, GLOBE) y GO- (GOOSE) de apoyo. Una G verde en la casilla uno más una R confirmada te mandan al triángulo GRA-/GRE-. Contraste fonético: en español la G ante E o I suena suave (GENTE), mientras el inglés casi siempre la mantiene dura. El verdadero poder de la G es final: el sufijo -ING la coloca al cierre, un patrón que el castellano no tiene.",
      ends:
        "Cerca del dos por ciento de las respuestas del Wordle terminan en G, repartidas entre la familia gerundia -ING (BRING, GOING, DYING, USING) y los monosílabos -NG (AMONG, STRONG, WRONG, YOUNG). Los gerundios castellanos acaban en -ANDO y -IENDO (CANTANDO, COMIENDO), así que el -ING es un patrón puramente inglés que conviene ensayar aparte. La deducción es poderosa: una G verde en la casilla cinco más una pista vocálica apunta de inmediato a -ING o -ONG, y las primeras letras se vuelven un conjunto pequeño. En Scrabble la G vale 2 puntos (tres fichas); BRING (8) y YOUNG (9) son jugadas discretas, y el motor -ING es donde la G gana su sueldo.",
    },
    h: {
      title: "palabras con H, la llave de los dígrafos",
      starts:
        "La H es una apertura rara — menos del tres por ciento de las respuestas empiezan con ella — pero es una invitada constante en los grupos TH-, CH-, SH- y WH-. Los arranques solitarios son conocidos (HABIT, HAPPY, HEART, HORSE, HUMAN, HURRY), con HA-, HE- y HU- cargando el peso. Contraste esencial: la H castellana es muda (HOLA, HOGAR), pero la inglesa se pronuncia, y TH, CH y SH no existen como sonidos en español. Su valor es confirmar dígrafos: si la T sale amarilla y sospechas TH, un intento con THEME resuelve dos letras a la vez. SLATE omite la H: merece una sonda a mitad de partida.",
      ends:
        "Cerca del tres por ciento de las respuestas del Wordle terminan en H, siempre en familias de vocal corta más dígrafo: -ACH (BEACH, TEACH), -ITCH (PITCH, SWITCH), -USH (BRUSH, FRESH) y las formas -UGH (TOUGH, ROUGH, LAUGH, MOUTH). Esas terminaciones no existen en español — el sonido de la H inglesa no tiene equivalente castellano —, así que memorízalas como formas visuales, no fonéticas. Una H verde en la casilla cinco indica un monosílabo de vocal corta más dígrafo, y la lista de candidatas se derrumba rápido. En Scrabble la H vale 4 puntos (dos fichas); WORTH (11) y YOUTH (11) son jugadas fuertes de doble servicio para tu bóveda.",
    },
    i: {
      title: "palabras con I, la vocal interior",
      starts:
        "La I es una apertura rara: menos del uno por ciento de las respuestas del Wordle empiezan con ella (IMAGE, INDEX, INPUT, IRONY, ISSUE). Las supervivientes son préstamos y términos técnicos, así que una I verde en la casilla uno apunta a un club pequeño y reconocible. La familia IN- (INDEX, INPUT) es el nudo más denso, seguida de IR- e IS- (IRONY, ISSUE). Aunque el español llene sus palabras de íes (MISA, VINO), en el Wordle la I prefiere el interior: aparece tres veces más en las posiciones tres y cuatro que en la primera. ADIEU la coloca en la casilla cuatro, su hogar natural — probarla interior es la estrategia por defecto.",
      ends:
        "Casi ninguna respuesta del Wordle termina en I — esencialmente cero —, así que cuando la última letra siga sin resolverse, jamás gastes el intento ahí. Una I amarilla marca de forma abrumadora las posiciones tres o cuatro, las ranuras vocálicas interiores (MUSIC, LOGIC, VIVID, RIVAL, CIVIC, PILOT, TIGER). Su patrón más productivo es la familia adjetiva -IC (MUSIC, LOGIC, CIVIC, TOPIC, MANIC), que reconocerás al instante: es el -ICO castellano (MÉDICO, CLÁSICO) sin la O final. En Scrabble la I vale 1 punto (nueve fichas), y VIVID es la joya de doble servicio del grupo: una doble V rarísima entre las respuestas del Wordle que además puntúa alto en Scrabble.",
    },
    j: {
      title: "palabras con J, la apertura más rara",
      starts:
        "La J es una de las letras más raras del Wordle: apenas un cuarto del uno por ciento de las respuestas la contiene, y sus aperturas son un club mínimo (JOINT, JOKER, JUICE, JUDGE, JUICY). Esa escasez es la estrategia: una J verde estrecha el campo a un conjunto diminuto y memorizable, y un intento con JOKER o JUICE resuelve una letra que ninguna apertura toca. Como en español, la J exige vocal detrás (JAMÓN, JUGO), la familia JU- domina también aquí (JUICE, JUDGE, JUICY) — aunque suene distinta: la J inglesa es más suave que la de JAMÓN. Si a mitad de partida te queda una consonante rebelde, la J es un tiro largo legítimo.",
      ends:
        "Cero respuestas del Wordle terminan en J: ninguna, en toda la lista oficial. El español sí tiene sus raras palabras con J final (RELOJ), pero el Wordle inglés no, así que conviértelo en eliminación dura: una J amarilla solo puede marcar las posiciones uno a cuatro, en la práctica de la casilla uno a la tres. El hábitat real de la J es interior: MAJOR y BANJO la colocan en las casillas tres y cuatro, mientras JOINT y JOKER la mantienen en la uno, y ENJOY la sienta en la cuatro. En Scrabble la J vale 8 puntos (una ficha, la más rara); BANJO (14) y MAJOR (13) son las joyas de doble servicio.",
    },
    k: {
      title: "palabras con K y el patrón CK",
      starts:
        "La K es una apertura rara: cerca del uno por ciento de las respuestas del Wordle empiezan con ella (KNIFE, KNOCK, KNOWN, KNEEL). El español apenas usa la K — vive en préstamos como KILO y KARATE —, pero el inglés le da dos papeles: el grupo KN- con N muda (KNIFE, KNOCK, KNOWN) es su firma, un patrón de letra silenciosa inexistente en castellano, donde todo se pronuncia. Un intento con K vale doble: prueba la K y confirma si la forma KN- está en juego. Los préstamos KA- y KO- (KAYAK, KIOSK) se reconocen a primera vista; una K verde más una N gris eliminan el clan KN- entero.",
      ends:
        "Cerca del tres por ciento de las respuestas del Wordle terminan en K, dominadas por las familias de vocal corta -ACK, -OCK, -ICK y -UCK: BLACK, BLOCK, BRICK, CLOCK, QUICK, STICK, STUCK, THINK, TRACK, TRUCK. La jugada deductiva: una K verde en la casilla cinco con vocal corta confirmada significa que la consonante central es casi seguro L, R, S, T o un dígrafo TH: cinco candidatas, un intento. El patrón CK además delata monosílabos: si C y K están confirmadas, la palabra tiene una sola sílaba. En Scrabble la K vale 5 puntos (una ficha); QUICK (18), BLACK (11) y THINK (12) son las respuestas de doble servicio más valiosas del grupo.",
    },
    l: {
      title: "palabras con L, el final líquido",
      starts:
        "La L es una apertura moderadamente común: cerca del cuatro por ciento de las respuestas del Wordle empiezan con ella (LABEL, LARGE, LAUGH, LEARN, LEMON, LIGHT, LIMIT, LOCAL, LUNCH, LUCKY). Las familias vocálicas LA- y LE- llevan la carga, con LI-, LO- y LU- de apoyo. La L es la consonante interior más común del inglés, así que probarla en la posición uno es razonable, pero una L amarilla suele señalar las casillas dos, tres o cuatro (PLACE, BLEND, SMILE). El doble LL castellano aparece aquí de otra forma: LLAMA es préstamo y respuesta válida del Wordle, y los grupos FL-, CL-, PL- y BL- esconden miles de palabras.",
      ends:
        "La L es la sexta letra final más común — cerca del cinco por ciento de las respuestas — repartida en tres familias: -AL (EQUAL, LOCAL, LEGAL, FOCAL, MEDAL, PEDAL, TOTAL), -LE (APPLE, TABLE, CABLE, NOBLE, MAPLE) y -EL (LABEL, MODEL, HOTEL, VOWEL, JEWEL). El plan de estudio sale de esa división: si la vocal antes de L es A, piensa en -AL; si es E, en -LE o -EL. Terreno conocido para hispanohablantes: CANAL, LEGAL y PAPEL comparten las mismas terminaciones, así que este esquema te saldrá casi gratis. En Scrabble la L vale 1 punto (cuatro fichas); MEDAL (8) y MAPLE (9) son jugadas discretas, y LEGAL (6) rinde en ambos juegos.",
    },
    m: {
      title: "palabras con M para ganar impulso",
      starts:
        "La M es una apertura moderadamente común: cerca del tres por ciento de las respuestas del Wordle empiezan con ella (MAGIC, MAJOR, MANGO, MARCH, MATCH, MEDIUM, MINOR, MONEY, MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE, MUSIC). La familia MA- es el nudo más denso (MAGIC, MAJOR, MANGO, MARCH, MATCH), con MO- (MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE) pisándole los talones. Las palabras con M inicial son excelentes segundas conjeturas tras aperturas repletas de vocales, porque la M rara vez encabeza sin una A o una O detrás. El patrón de doble M (COMMA, MUMMY, GAMMA) es raro pero distintivo: una M amarilla en dos casillas suele anunciarlo, y una sola sonda lo confirma.",
      ends:
        "La M es un final raro: menos del dos por ciento de las respuestas del Wordle terminan con ella (MAXIM, MEDIUM, RHYTHM, VENOM, FORUM, VICTIM, WISDOM, GLOOM, BLOOM, CHASM, SCREAM, ALBUM). Fíjate en la forma de esa lista: casi todas son términos técnicos o cultos con estructuras vocálicas muy específicas (OO, A-, I-), y ALBUM te resultará familiar: es el mismo préstamo que usa el castellano. Una M verde en la casilla cinco más una OO o una I confirmada apunta rápido a GLOOM, BLOOM o VICTIM. En Scrabble la M vale 3 puntos (dos fichas); MAXIM (16) y VICTIM (12) son respuestas premium, y RHYTHM (21 puntos) es el monstruo escondido de la familia.",
    },
    n: {
      title: "palabras con N, el ancla nasal",
      starts:
        "La N es una apertura de frecuencia media: cerca del dos por ciento de las respuestas del Wordle empiezan con ella (NAIL, NAIVE, NASTY, NAVY, NEVER, NIGHT, NOBLE, NOTCH, NURSE). La familia NA- lleva el frente, mientras NO- y NE- reparten el resto. Aclaración fundamental para hispanohablantes: esta N es la N castellana — la virgulilla no existe en el tablero, así que la Ñ de AÑO y SEÑOR no te sirve de nada y las palabras españolas con Ñ jamás aparecen como respuestas. Como la N es la cuarta letra más común del repertorio, confirmar temprano su posición — sobre todo la casilla cuatro en -ON e -ION — desbloquea las familias finales.",
      ends:
        "La N es la quinta letra final más común — cerca del seis por ciento de las respuestas — a través de dos familias: -EN (GIVEN, OFTEN, OCEAN, WOMEN, RAVEN, SEVEN, MELON) y -AN (BEGAN, HUMAN, ORGAN, TITAN, VEGAN). Una N verde en la casilla cinco con pista de E apunta a -EN al instante; con pista de A, a -AN. El español sí cierra palabras en N (PAN, CANCIÓN), pero las familias cambian: aquí el -EN es ancla de participios y sustantivos ingleses; enséñalos como formas fijas. En Scrabble la N vale 1 punto (seis fichas); ORGAN (6) y WOMEN (10) son estables, y RAVEN (8) limpia atriles en ambos juegos.",
    },
    o: {
      title: "palabras con O, la segunda vocal",
      starts:
        "La O es una apertura rara: cerca del uno por ciento de las respuestas del Wordle empiezan con ella (OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER, OUGHT, OUNCE). El grupo frontal con O es pequeño y repleto de vocales, dominado por los diptongos OU- (OUGHT, OUNCE) y los pares de O más consonante (OCEAN, OLIVE, ONION, OPERA, OTHER). Aunque el español adore la O (GATO, HERMANO), en el Wordle inglés casi nunca encabeza: la O es la cuarta letra más común del repertorio y prefiere las casillas dos y tres. La familia OO- (BLOOD, FLOOR, GLOOM) empieza con otras letras pero premia este conocimiento, y las formas OU- valen una sonda.",
      ends:
        "Cerca del dos por ciento de las respuestas del Wordle terminan en O: un club pequeño de préstamos — MANGO, TORSO, HALO, PIANO, ECHO — y poco más. Desilusión hispana garantizada: el español desborda de finales en O (HERMANO, GATO, CHICO), pero el inglés apenas los usa; reentrena ese reflejo cuanto antes. La lista es tan corta que se memoriza de corrido: si la última casilla sigue viva y tus pistas apuntan a O, recórrela antes que nada. Una O amarilla suele señalar las posiciones dos o tres (MONEY, PHONE, GHOST). En Scrabble la O vale 1 punto (ocho fichas); MANGO (8) y TORSO (5) son jugadas modestas pero oportunas.",
    },
    p: {
      title: "palabras con P para conjeturas de precisión",
      starts:
        "La P es una apertura de frecuencia media: cerca del tres por ciento de las respuestas del Wordle empiezan con ella (PAINT, PANDA, PAPER, PARTY, PASTA, PLACE, PRESS, PRICE, PROVE, PUPIL). Los grupos PL- y PR- dominan (PLAIN, PLANT, PRIDE, PRICE), con el PA- vocálico (PAPER, PASTA, PANDA) de apoyo. Los intentos con P son instrumentos de precisión: la letra rara vez aparece en otras posiciones, así que una P gris elimina tres familias completas de una vez. Y llega el favorito universal: el doble P de PIZZA — préstamo que el español conoce de sobra, de la pizzería a la mesa —; una P amarilla con pista de Z suele anunciar PIZZA.",
      ends:
        "La P es un final rarísimo: menos del uno por ciento de las respuestas del Wordle terminan con ella, apenas unas formas monosílabas en -AP, -IP y -OP. El consejo práctico: casi ninguna respuesta cierra en P — igual que en español, donde casi nada termina en P —, así que una P amarilla marca las posiciones uno a tres (PAINT, PAPER, PUPIL). Gasta los intentos finales en E, Y o T. En Scrabble la P vale 3 puntos (dos fichas); PIZZA (24 puntos) es la joya de la corona — una de las respuestas comunes más altas del Wordle — y PROVE (10) y PRIZE (16) son los otros campeones de doble servicio.",
    },
    q: {
      title: "palabras con Q sin U",
      starts:
        "La Q es la letra más rara del Wordle: muy por debajo del uno por ciento de las respuestas la contiene, y sus aperturas son un club cerrado (QUAKE, QUEEN, QUERY, QUICK, QUIET, QUOTA, QUOTE). Aquí el español juega a tu favor: igual que el castellano exige QU más vocal (QUESO, QUISO, AQUÍ), el Wordle inglés sigue el patrón QU casi sin excepción (QUERY, QUAKE, QUOTE). Una Q verde convierte la U en tu siguiente prueba inmediata; si la U sale gris, estás cazando una palabra con Q sin U — saber importado del Scrabble de torneo, donde QI vale 11 puntos y QAT, QOPH y FAQIR mantienen viva la Q sin rastro de U.",
      ends:
        "Cero respuestas del Wordle terminan en Q: ninguna en toda la lista oficial. Las palabras inglesas de cinco letras con Q final (SUQ, TRANQ) son préstamos exóticos que jamás figuran, y el español tampoco cierra palabras en Q. Ese cero es un regalo defensivo: cuando la última letra siga sin resolverse, gasta los intentos en finales de alta probabilidad (E, Y, T, R) en lugar de cazar una Q imposible. Una Q amarilla solo puede significar las posiciones uno o dos, en la práctica la primera (QUERY, QUAKE, QUOTE). En Scrabble la Q vale 10 puntos (una ficha, empatada como la más rara); QUOTA (14) y QUERY (16) son respuestas premium de doble servicio.",
    },
    r: {
      title: "palabras con R, el caballo de batalla consonántico",
      starts:
        "La R es una apertura de frecuencia media: cerca del dos por ciento de las respuestas del Wordle empiezan con ella (RADIO, RAISE, RANCH, RANGE, REACT, READY, REFER, RELAX, ROBOT, ROUGH, ROUND, ROYAL, RURAL). Las familias RA- y RE- dominan, con RO- (ROBOT, ROUGH, ROUND, ROYAL) de apoyo. Aunque el español haga vibrar la R en cada esquina (AMOR, CARRO, TORRE), aquí importa la posición, no el sonido: la R es la tercera letra más común del repertorio, pero una R amarilla suele marcar las posiciones interiores (BREAD, FIRST, OTHER), donde aparece el doble de veces. La apertura CRANE prueba la R en la casilla dos, y por eso elimina tanto terreno de golpe.",
      ends:
        "La R es la cuarta letra final más común — cerca del siete por ciento de las respuestas — dominada por la familia -ER (AFTER, LASER, NEVER, PAPER, RIVER, SUPER, WATER) más -AR y -OR (SUGAR, VAPOR). Ajusta el instinto hispano: los infinitivos castellanos terminan en -AR y -ER (CANTAR, COMER), pero aquí el -ER suele ser sufijo de agente, no de verbo. Una R verde en la casilla cinco con pista de E apunta a -ER al instante, y las primeras letras son el núcleo. En Scrabble la R vale 1 punto (seis fichas); RIVER (8) y WATER (7) son estables, y REFER (8) es el rarísimo doble R en ambos extremos.",
    },
    s: {
      title: "palabras con S, el rey de las aperturas",
      starts:
        "La S es la letra de apertura más común del Wordle: más del diez por ciento de las respuestas empiezan con ella (SALAD, SAUCE, SCALE, SCENE, SHAKE, SHEEP, SHELL, SHIFT, SHINE, SKILL, SLEEP, SMALL, SMART, SMILE, SNACK, SOLID, SOUND, SPACE, SPARE, SPARK, SPEAK, SPELL, SPEND, STAFF, STAGE, STAIR, STAKE, STAMP, STAND, START, STEAM, STEEL, STICK, STILL, STOCK, STONE, STORE, STORM, STORY, STUDY, STYLE, SUGAR, SUITE, SUPER). Los grupos SH-, SK-, SM-, SN-, SP- y ST- convierten la S inicial en un paisaje de sesenta familias — por eso aperturas como SLATE y SAUCE la prueban primero: pocas letras eliminan tanto terreno de un solo intento.",
      ends:
        "La trampa más famosa del Wordle: aunque la S es la letra más común del repertorio, casi ninguna respuesta TERMINA en ella — menos del uno por ciento — porque la lista oficial excluye los plurales. Para hispanohablantes el reflejo es doblemente traicionero: español e inglés pluralizan con S (GATOS, CATS), pero el Wordle bloquea los plurales. Los finales auténticos son irregulares o préstamos (CHAOS, CIRCUS, FOCUS, GUESS, BONUS). La estrategia: una S amarilla casi siempre señala la posición UNO: prueba aperturas con S, no plurales. En Scrabble la S vale 1 punto (cuatro fichas); CHAOS (10) y FOCUS (10) son doble servicio, y BONUS (7) es la ironía de esta página.",
    },
    t: {
      title: "palabras con T, el titán de los finales",
      starts:
        "La T es una apertura de frecuencia media: cerca del tres por ciento de las respuestas del Wordle empiezan con ella (TABLE, TASTE, TEACH, THANK, THEIR, THERE, THESE, THICK, THING, THINK, THIRD, TIGER, TIGHT, TODAY, TOPIC, TORCH, TOTAL, TOUCH, TOWER, TOXIC, TRACK, TRAIN, TREAT, TREND, TRICK, TRUCK, TRUST, TRUTH, TWICE, TWIST). El grupo TH- domina las aperturas con T (THANK, THEIR, THERE, THICK, THING), con TR- (TRACK, TRAIN, TRUST) pisándole los talones. El sonido TH no existe en español — es el tropiezo de pronunciación clásico —, pero en el tablero solo importa el patrón: la T es la quinta letra más común del repertorio y su verdadero poder espera al FINAL de las respuestas.",
      ends:
        "La T es la tercera letra final más común — cerca del ocho por ciento de las respuestas — a través de cuatro familias: -HT (BRIGHT, FIGHT, LIGHT, NIGHT, RIGHT, TIGHT), -NT (FRONT, PLANT, PRINT, SAINT, WANT), -ST (FEAST, GHOST, TOAST, TRUST, WORST) y -RT (SMART, SPORT, START). La familia -IGHT es el mejor conjunto rimado de cinco letras del inglés: un GHT verde desbloquea cinco respuestas a la vez — fonología anglosajona pura, sin equivalente castellano. Una T verde en la casilla cinco más una lista corta de vocales derrumba las candidatas rápido. En Scrabble la T vale 1 punto (seis fichas); FIGHT (11) y LIGHT (9) son respuestas sólidas para la bóveda.",
    },
    u: {
      title: "palabras con U, la vocal escondida",
      starts:
        "La U es la vocal de apertura más rara: muy por debajo del uno por ciento de las respuestas del Wordle empiezan con ella (UNCLE, UNION, UNTIL, UPPER, URBAN, UPSET, USHER, UTTER). El grupo frontal es diminuto porque el inglés casi nunca encabeza palabras con U: es la vocal escondida, agazapada en las casillas dos y tres (BUILD, GUILT, HOUSE, MOUTH, SOUND, WOULD). Su hábitat más común es el patrón QU: cada palabra con Q encierra una U detrás, así que una Q verde la confirma gratis. Aunque el español llene sus palabras de úes (UVA, CUNA), aquí conviene probarla en el interior; ADIEU la coloca en la casilla cuatro y AUDIO también la cubre.",
      ends:
        "Menos del uno por ciento de las respuestas del Wordle terminan en U — en la práctica, cero —, porque el inglés nativo no cierra palabras de cinco letras con U fuera de préstamos. Dato de exclusión: una U amarilla marca las posiciones dos a cuatro, sobre todo la tres (BUILD, HOUSE, MOUTH). Las formas -UE (VALUE, VENUE) despachan la E a la casilla cinco y dejan la U en el interior. En Scrabble la U vale solo 1 punto, pero las palabras con QU cabalgan los 10 puntos de la Q: QUERY (16) y QUOTA (14), campeones de doble servicio de la página de la Q — la U es la llave que las abre.",
    },
    v: {
      title: "palabras con V, la especialista del interior",
      starts:
        "La V es una de las letras más raras del Wordle: menos del medio por ciento de las respuestas empiezan con ella (VAGUE, VALID, VALUE, VIDEO, VIRAL, VIRUS, VISIT, VIVID, VODKA). Las familias VA- y VI- dominan. Recuerda: en español B y V suenan casi iguales, pero en el tablero siguen reglas opuestas: la B abre con frecuencia; la V casi nunca y jamás cierra. Los intentos con V son tiros largos: una V verde estrecha el campo al club corto de arriba. El doble V de VIVID es la joya del repertorio — la única doble V común del inglés — y sus formas vocálicas son a la vez buenas jugadas de Scrabble.",
      ends:
        "Cero respuestas del Wordle terminan en V: ninguna. El inglés nativo no cierra palabras de cinco letras con V (lav y rev son recortes coloquiales). Úsalo como hecho estructural: una V amarilla solo puede marcar las posiciones uno a cuatro, en la práctica las tres primeras (VIDEO, GIVEN, RIVAL, COVER, HOVER, OLIVE). Su patrón más productivo es la familia -IVE (ALIVE, DRIVE, GIVE, OLIVE), que sienta la V en la casilla cuatro. En Scrabble la V vale 4 puntos (dos fichas); VIVID (13 puntos) y VODKA (13) son respuestas premium de doble servicio — exactamente las joyas de cruce entre juegos que conviene guardar en la bóveda.",
    },
    w: {
      title: "palabras con W y el patrón WH",
      starts:
        "La W es una apertura moderada: cerca del tres por ciento de las respuestas del Wordle empiezan con ella (WAGON, WATER, WHEAT, WHEEL, WHERE, WHICH, WHILE, WHITE, WHOLE, WHOSE, WIDOW, WINDY, WOMAN, WORLD, WORRY, WORTH, WOULD, WRIST, WRITE, WRONG, WROTE). La W es la gran ausente del alfabeto castellano — solo asoma en préstamos como WHISKY y KIWI —, así que cuesta escribirla por instinto, pero acostúmbrate: WORLD y WATER son respuestas cotidianas. El grupo WH- es su firma (WHEAT, WHEEL, WHERE, WHICH), seguido del conjunto WR- con W muda (WRIST, WRITE, WRONG): la segunda familia de letra silenciosa después de KN-. Una W gris elimina ambos clanes de golpe.",
      ends:
        "Cerca del dos por ciento de las respuestas del Wordle terminan en W, casi siempre en la familia de diptongo -OW: BELOW, ELBOW, THROW, ALLOW, ARROW. El conjunto es tan corto que se memoriza de corrido, y esas cinco cubren la mayoría. Una W verde en la casilla cinco con pista de O significa -OW al instante, y las primeras letras se convierten en el núcleo a rastrear. El español jamás termina palabras en W — un reflejo que no necesitas reentrenar. En Scrabble la W vale 4 puntos (dos fichas); THROW (11) y ELBOW (10) son jugadas fuertes de doble servicio, y ARROW (8) es el final de tres vocales que sorprende atriles desprevenidos.",
    },
    x: {
      title: "palabras con X, la llave de la exclusión",
      starts:
        "La X jamás abre respuestas del Wordle: cero en toda la lista. Las palabras inglesas de cinco letras que empiezan con X (XYLEM, XEBEC) nunca figuran como respuestas. Ese cero es la estrategia: la X es puramente interior, así que una X amarilla marca las casillas tres a cinco (TOXIC, BOXER, HELIX, INDEX, RELAX). Para hispanohablantes es un giro curioso: la X castellana vive en MÉXICO y XILÓFONO, casi nunca al frente. Probarla es una jugada de exclusión: una X gris elimina las familias -AX, -EX, -IX y -OX de un tirón — valor de élite al cierre de la partida. Las formas -EX y -AX (INDEX, RELAX, HELIX) son su hábitat genuino.",
      ends:
        "Un puñado diminuto de respuestas del Wordle termina en X — menos del medio por ciento — a través de las familias -AX y -EX, con RELAX como gran favorita. El valor estratégico: los finales en X son tan escasos que una X tardía en gris cancela de golpe toda la cacería -AX y -EX. Una X verde en la casilla cinco con pista vocálica convierte a RELAX en la candidata abrumadora. En Scrabble la X vale 8 puntos (una ficha, la más rara junto a la J); RELAX (12) y TOXIC (14) son respuestas premium de doble servicio, y HELIX (17) es la joya de las X: guárdala de inmediato.",
    },
    y: {
      title: "palabras con Y, el final sorpresa",
      starts:
        "La Y casi nunca abre respuestas del Wordle: menos de un cuarto del uno por ciento (YACHT, YEAST, YIELD, YOUNG, YOUTH). El club frontal es tan diminuto que una Y verde en la casilla uno apunta a esos cinco candidatos. Su hábitat real es doble: la Y consonántica al FINAL (HAPPY, FUNNY, HEAVY) y la Y vocálica dentro de la palabra (MYTH, RHYME, CRYPT, LYNX). Esa doble vida es la trampa — mayor para hispanohablantes, porque la «y» castellana es conjunción y sonido /i/ a la vez. Una Y amarilla puede ser consonante final o vocal interior: distinguirlas separa a los guardianes de rachas de quienes las pierden.",
      ends:
        "La Y es la segunda letra final más común — cerca del nueve por ciento de las respuestas — a través de las familias -LY, -NY, -RY y -TY (ANGRY, DAILY, DIRTY, DIZZY, EARLY, EMPTY, FAIRY, FORTY, FUNNY, FUZZY, HAPPY, HEAVY, HURRY, LUCKY, NASTY, PARTY, RUSTY, SALTY, SILLY, SIXTY, SORRY, SPICY, STICKY, TASTY). Nota hispana: donde el inglés adorna adverbios con -LY, el español usa -MENTE (FINALMENTE); los finales castellanos casi nunca son así. Practica el conjunto por pareja consonántica (P-Y, T-Y, R-Y), porque una Y final confirmada más una consonante suele completar la palabra. En Scrabble la Y vale 4 puntos (dos fichas); FUZZY (29) y DIZZY (27) son monstruos de doble servicio.",
    },
    z: {
      title: "palabras con Z, la eliminación final",
      starts:
        "La Z es la letra más rara del Wordle junto a la J y la Q: apenas un puñado de respuestas la contiene, y sus aperturas se limitan a ZEBRA, ZESTY y algunos préstamos raros. Una Z verde en la casilla uno es casi un puzle resuelto: ZEBRA es la favorita abrumadora. Su firma es el doble Z (PIZZA, FUZZY, DIZZY): una Z amarilla con pista vocálica apunta directo al clan ZZ. Como ninguna apertura la toca, confirmarla cuesta un intento deliberado, y el premio es una lista de candidatas que se derrumba a un dígito. El español adora su Z (PAZ, LUZ, ZORRO), pero aquí casi nunca la verás al frente: considérala oro escondido.",
      ends:
        "Casi ninguna respuesta del Wordle termina en Z: el conteo es prácticamente cero, porque el inglés nativo no cierra palabras de cinco letras con Z y hasta préstamos como BLITZ quedan fuera. Reentrena el reflejo castellano: el español sí cierra singulares en Z (PAZ, LUZ, RAZ), pero aquí ese final no funciona. Una Z amarilla marca las posiciones interiores, sobre todo la doble Z de las casillas tres o cuatro (PIZZA, FUZZY, DIZZY). El clan ZZ es el conjunto de estudio perfecto: PIZZA (24), FUZZY (29) y DIZZY (27) son las tres respuestas comunes más altas del Wordle. Una Z gris elimina el club ZZ y los finales -ZE de un golpe: eliminación de élite.",
    },
  },
};
