#!/usr/bin/env python3
"""Replace the ES and DE letters blocks in word-list-articles.ts with clean prose."""
import re

PATH = "/home/z/my-project/src/lib/word-list-articles.ts"

ES_LETTERS = r'''  letters: {
    a: {
      title: "empiezan por A — el ancla vocálica",
      starts:
        "La A es la vocal más frecuente del español — doce fichas circulan, la mayor reserva del juego. Las palabras en A- (AMIGO, ÁRBOL, AVISO) son el combustible de los scrabbles: las familias -ACIÓN, -ABLE y -AMENTO vacían un atril atestado de una sola vez. Usa las salidas cortas (ALA, AVE, ASA) para equilibrar vocales mientras robas posiciones premium.",
      ends:
        "Las palabras terminadas en A son el mayor bloque del español: cada sustantivo femenino (CASA, MESA, VIDA) y cada plural -AS acaban aquí. Los rivales pueden enganchar una S detrás con facilidad, así que una palabra en -A junto a una casilla triple regalada es un regalo de 20 puntos al oponente: ciérrala con una ficha defensiva antes.",
    },
    b: {
      title: "empiezan por B — bingo y dobles",
      starts:
        "La B vale 3 puntos y abre las familias BA-, BU- (BANCO, BUENO, BONITO) que vacían atriles. Solo dos fichas: guarda una para una casilla doble donde los 3 puntos se vuelven 6. Las palabras en B- también alimentan el sufijo -BLE (AMABLE, POSIBLE), el gran generador de extensiones del español.",
      ends:
        "Las terminaciones -B son casi inexistentes en español: la página sirve sobre todo para refutar inventos rivales. La verdadera final de la B es -BLE (AMABLE, IMPOSIBLE, VISIBLE), que convierte casi cualquier verbo en adjetivo para extensiones de tres letras.",
    },
    c: {
      title: "empiezan por C — la CH vale 5",
      starts:
        "En el Scrabble en español, la C vale 2 puntos, pero CH es una ficha propia de 5 puntos — la gran rareza de este idioma. Las aperturas CA-, CO-, CU- (CASA, COSA, CULTURA) vacían atriles barato; CH- (CHICO, CHISTE, CHALECO) coloca el valor combinado en casillas dobles. Cuatro fichas C circulan en el saco español.",
      ends:
        "Las palabras terminadas en C son contadas: se trata de una lista corta que conviene memorizar para los retos. La mayoría son préstamos con la terminación -IC (el patrón internacional que sí funciona en español). Un -C final es un cerrojo: casi ningún rival lo prolonga detrás.",
    },
    d: {
      title: "empiezan por D — el motor -ADO",
      starts:
        "La D vale 2 puntos y alimenta el sufijo -ADO (CANSADO, PRIVADO) — el participio más productivo del español. Las aperturas DE-, DI- (DECIR, DÍA, DULCE) preparan scrabbles. Cinco fichas circulan: la D es tan común como la T en español, así que su valor está en el timing, no en la escasez.",
      ends:
        "Las finales -D son los participios y adverbios: -ADO (CANSADO) e -IDO (COMIDO) dominan la página. Las palabras en -D son fácilmente extensibles con S (CANSADOS): la página es una de las mejores superficies de enganche del español.",
    },
    e: {
      title: "empiezan por E — la reina del español",
      starts:
        "Doce fichas E circulan en el Scrabble hispano — la vocal más frecuente del idioma. Las aperturas EN-, EM-, ES- (ENTRAR, EMPLEO, ESTAR) vacían atriles, y las finales -E hacen de cada palabra española una candidata a extensión. Vale 1 punto: su valor es la flexibilidad del atril.",
      ends:
        "La -E final es LA terminación del español: los plurales -ES (MESES, CANCIONES) dominan, y cada palabra acabada en -E acepta una S detrás. La página -E es la mayor superficie de enganche del idioma: úsala para planificar extensiones de dos turnos.",
    },
    f: {
      title: "empiezan por F — paralelas de 4 puntos",
      starts:
        "La F vale 4 puntos y brilla en jugadas paralelas: las aperturas FA-, FO-, FU- (FÁCIL, FORMA, FUEGO) colocan la F en casillas dobles para 8 puntos por posición. Solo una ficha F en el saco español — despliégala con timing, no la quemes temprano.",
      ends:
        "Las finales -F son rarísimas en español: su valor es de reto — cualquier invento en -F es refutable. Las familias -IVA (ACTIVA, DEPORTIVA) y -IFICA (CALIFICA, ESPECIFICA) esconden la F en casillas bonus de posición interna.",
    },
    g: {
      title: "empiezan por G — GA-, GO-, GU-",
      starts:
        "La G vale 2 puntos y abre GA-, GO-, GU- (GATO, GUSTO, GUERRA): las familias más densas del español. La G también alimenta el infinitivo -GAR (LLEGAR, JUGAR) y la terminación -GO (LAGO, LUEGO), estructuras que vacían atriles de un tirón.",
      ends:
        "Las finales -G son prácticamente inexistentes en español: la página sirve de referencia para los retos. La verdadera final de la G es -GO (LAGO, LUEGO, CIEGO), que se extiende en -S (LAGOS) para puntos rápidos.",
    },
    h: {
      title: "empiezan por H — la muda de 4 puntos",
      starts:
        "La H vale 4 puntos en el Scrabble hispano y es MUDA — la gran particularidad del idioma. Las aperturas HA-, HE-, HI-, HO-, HU- (HABER, HECHO, HIERRO, HORA, HUESO) descolocan al rival que olvida su validez. Solo dos fichas: la H muda sobre una casilla triple vale 12 puntos de un golpe.",
      ends:
        "Las finales -H no existen en el diccionario español: ninguna palabra válida acaba en H. La página es una curiosidad de referencia: su valor está en el reto — cualquier final -H inventado pierde el turno.",
    },
    i: {
      title: "empiezan por I — el combustible de sufijos",
      starts:
        "Seis fichas I, 1 punto: la I alimenta -IÓN, -ÍSIMO, -IENTO — los sufijos más productivos del español. Las aperturas IM-, IN- (IMPOSIBLE, INCAPAZ) vacían atriles y preparan scrabbles. El español es la lengua con más palabras en -IÓN del mundo: la I es el combustible.",
      ends:
        "Las finales -I son casi exclusivas de préstamos (TAXI, SUSHI, KIWI) — su origen extranjero las hace inextendibles: cerraderías perfectas. Pocos rivales conocen la lista de -I válidos: úsala para los retos.",
    },
    j: {
      title: "empiezan por J — ocho puntos por ficha",
      starts:
        "La J vale 8 puntos en el Scrabble hispano — uno de los valores más altos del idioma, y aparece en palabras de uso diario (JUGAR, JUEGO, JAMÓN), mucho más frecuente que en inglés. Una sola ficha: colócala en una casilla doble (16 puntos) o triple (24 puntos). JUGAR sobre una triple de palabra puede valer 60+ puntos.",
      ends:
        "Las finales -J no existen en el diccionario español: ninguna palabra válida acaba en J. La página sirve de referencia: si un rival inventa una final -J, el reto está garantizado.",
    },
    k: {
      title: "empiezan por K — la importada",
      starts:
        "La K casi no existe en el español nativo: las únicas palabras válidas son préstamos (KILO, KIOSCO, KARATE, KOALA). Es la ficha más rara del Scrabble hispano: despliégala en préstamos y cuenta con el reto si el rival duda de KILO. La lista es corta y fácil de memorizar.",
      ends:
        "Ninguna palabra española legítima acaba en K: los préstamos válidos se cuentan con los dedos y son refutables. La página es una curiosidad: apréndete la lista para los duelos.",
    },
    l: {
      title: "empiezan por L — y la LL de 8 puntos",
      starts:
        "La L vale 1 punto, pero LL es una ficha PROPIA de 8 puntos en el Scrabble hispano — la gran joya del idioma. Las aperturas LA-, LE-, LO- (LATA, LECHE, LOTE) vacían atriles barato; LL- (LLAVE, LLUVIA) coloca 8 puntos en casillas dobles. Cuatro fichas L más una ficha LL: gestiona ambas.",
      ends:
        "Las finales -L son cerraderías discretas: -AL (LEGAL, MENTAL, GLOBAL) se extiende en -MENTE (LEGALMENTE) e -IDAD (LEGALIDAD). Las palabras en -L final bloquean líneas: pocos rivales tienen el enganche listo.",
    },
    m: {
      title: "empiezan por M — el -MENTE español",
      starts:
        "La M vale 3 puntos y abre MA-, ME-, MO- (MESA, MUNDO, MODA). Su gran valor: el sufijo adverbial -MENTE (FÁCILMENTE, RÁPIDAMENTE) convierte casi cualquier adjetivo en un scrabble de 8 o más letras. Dos fichas: la M es también la puerta de IM- (IMPOSIBLE).",
      ends:
        "Las finales -M son raras en español: la página es una curiosidad de referencia. La verdadera final de la M es -MENTE adverbial, que convierte cada adjetivo en extensión fácil.",
    },
    n: {
      title: "empiezan por N — y la Ñ de 8 puntos",
      starts:
        "La N vale 1 punto y circula 5 veces; la Ñ es una ficha PROPIA de 8 puntos — exclusiva del Scrabble hispano. Las aperturas NA-, NE- (NACIÓN, NERVO) vacían atriles, y la Ñ (ÑOÑO, PIÑA, ENGAÑO) es el sello del idioma: úsala en casilla doble para 16 puntos.",
      ends:
        "Las finales -N son cerraderías clásicas del español: el plural verbal -AN (HABLAN), -EN (COMEN), -ÓN (CORAZÓN) acaba en N que nadie extiende detrás. Perfectas para cerrar una línea y proteger una ventaja de puntos.",
    },
    o: {
      title: "empiezan por O — la vocal de paralelas",
      starts:
        "Nueve fichas O, 1 punto: la O alimenta las aperturas ORO, OSO, OJO (la gran palabra: O más J de 8 puntos más O = 10 puntos con 3 fichas). Las posiciones paralelas con O son el pan de cada día en tableros consonánticos del español.",
      ends:
        "Las finales -O son la firma del español: los sustantivos masculinos (GATO, MURO) y los pronombres (YO, ESO) acaban aquí. Los rivales enganchan S detrás con facilidad (GATOS): una palabra en -O cerca de una triple regalada es un regalo de 15 puntos.",
    },
    p: {
      title: "empiezan por P — PA-, PO-, PU-",
      starts:
        "La P vale 3 puntos y abre PA-, PE-, PO-, PU- (PAPEL, PESO, POZO, PUÑO): de las familias más densas del español. Dos fichas: guarda una para casillas dobles donde los 3 se vuelven 6. La P también alimenta el prefijo PRE- (PREMIO, PRENDA).",
      ends:
        "Las finales -P son rarísimas en español: la lista se cuenta con los dedos y sirve sobre todo para retos. Concéntrate en las posiciones internas para el valor real de la ficha.",
    },
    q: {
      title: "empiezan por Q — solo 5 puntos, casi siempre con U",
      starts:
        "En el Scrabble hispano, la Q vale solo 5 puntos (la mitad que en inglés) y se acompaña casi SIEMPRE de U: QUE, QUIETO, QUISO. La ortografía española no permite QA- ni QO-: la lista de Q-sin-U es prácticamente inexistente en este idioma, lo que hace la Q más predecible que en inglés. Una ficha: colócala en casilla doble (10 puntos) o espera la U inevitable.",
      ends:
        "Las palabras terminadas en Q no existen en el diccionario español: la ortografía del idioma no permite ninguna final -Q. La página es una curiosidad de referencia: su valor está en el reto — cualquier invento en -Q es refutable de inmediato.",
    },
    r: {
      title: "empiezan por R — y la RR de 8 puntos",
      starts:
        "La R vale 1 punto, pero RR es una ficha PROPIA de 8 puntos — exclusiva del Scrabble hispano. Las aperturas RA-, RE- (RATÓN, REVÉS) vacían atriles, y la RR en posición interna (PERRO, CARRO) vale 8 puntos por colocación. Cinco fichas R más una RR: gestiona ambas.",
      ends:
        "Las finales -R son los infinitivos (-AR, -ER, -IR) y los comparativos (MAYOR, MENOR): la mayor superficie de enganche del español. Los infinitivos aceptan la tercera persona -N (HABLARON), y los comparativos aceptan -ES (MAYORES): la página -R es la más extensible del idioma.",
    },
    s: {
      title: "empiezan por S — la ficha maestra",
      starts:
        "La S vale 1 punto y es LA ficha de enganche del español: añade S a casi cualquier palabra del tablero para una extensión de una letra que puntúa todo el valor de la palabra original. SOBRE-, SUB-, SE- (SOBRESALIR, SUBIR, SED) prolongan casi todo. Seis fichas circulan: la paridad de S decide partidas ajustadas.",
      ends:
        "Las finales -S son el plural del español: cada sustantivo (CASAS, LIBROS) y cada verbo (HABLAS) acaba aquí, haciendo de la página -S la más larga del sitio. La jugada defensiva: si sabes que el rival guarda una S y colocas un sustantivo junto a una triple, le estás regalando 20 puntos de enganche.",
    },
    t: {
      title: "empiezan por T — el ancla de sufijos",
      starts:
        "La T vale 1 punto, circula 4 veces, y ancla -CIÓN (NACIÓN) y los participios -TA/-TE. Las aperturas TA-, TE-, TO- (TASA, TEMA, TOMA) vacían atriles barato. La T también es la puerta del prefijo TRANS- (TRANSPORTE), el más largo del español.",
      ends:
        "Las finales -T son raras en español: la lista se cuenta con los dedos. La página es una curiosidad de referencia: apréndete las pocas válidas para los retos.",
    },
    u: {
      title: "empiezan por U — la compañera de Q",
      starts:
        "La U vale 1 punto y circula 5 veces: es LA compañera de la Q (QUE, QUIETO). Las aperturas UN-, UR- (UNIÓN, URGENTE) vacían atriles, y el prefijo ULTRA- prolonga casi todo. Si la Q sigue en el saco, guarda una U: es la ficha que la desbloquea.",
      ends:
        "Las finales -U son raras en español: la lista se cuenta con los dedos. Su inextendibilidad las hace cerraderías perfectas: una palabra en -U sobre una triple bloquea la línea el resto de la partida.",
    },
    v: {
      title: "empiezan por V — 4 puntos frecuentes",
      starts:
        "La V vale 4 puntos en español (igual que en inglés) y abre palabras de uso diario (VIDA, VER, VAMOS): se despliega más temprano que en inglés porque el léxico -V es riquísimo. Una sola ficha en el Scrabble hispano: colócala en casilla doble para 8 puntos.",
      ends:
        "Las finales -V no existen en el diccionario español: ninguna palabra válida acaba en V. La página es una curiosidad de referencia: su valor está en el reto — cualquier invento en -V es refutable.",
    },
    w: {
      title: "empiezan por W — la importada rara",
      starts:
        "La W es la ficha más rara del Scrabble hispano: solo existe en préstamos (WHISKY, WATERPOLO, WAGÓN). Su valor es mínimo en español: despliégala en préstamos y cuenta con el reto del rival.",
      ends:
        "Ninguna palabra española legítima acaba en W: los préstamos se cuentan con los dedos. La página es una curiosidad: úsala para los duelos.",
    },
    x: {
      title: "empiezan por X — ocho puntos",
      starts:
        "La X vale 8 puntos en el Scrabble hispano — una de las fichas más valiosas del idioma. Las palabras X- iniciales son raras en español (XENO, XILOFONO): la ficha brilla en posición interna (ÉXITO, TAXI, MÁXIMO). Una ficha: colócala en casilla doble (16 puntos) o triple (24).",
      ends:
        "Las finales -X no existen en el español nativo: solo los préstamos son válidos. La página es una curiosidad de referencia: apréndete la lista para los retos.",
    },
    y: {
      title: "empiezan por Y — la conjunción de 4 puntos",
      starts:
        "La Y vale 4 puntos en español y es LA conjunción de coordinación — la palabra más usada del idioma. Las aperturas Y- (YA, YO, YESO) son cortas y frecuentes. Una ficha: colócala en casilla doble para 8 puntos.",
      ends:
        "Las finales -Y no existen en el español nativo: solo los préstamos son válidos. La página es una curiosidad: su valor está en el reto.",
    },
    z: {
      title: "empiezan por Z — diez puntos",
      starts:
        "La Z vale 10 puntos en el Scrabble hispano — la ficha más valiosa del idioma, y es la ÚNICA de 10 puntos del español. Las aperturas Z- (ZAPATO, ZONA, ZOO) son frecuentes en el uso diario. Una ficha: colócala en casilla doble (20 puntos) o triple (30) y la partida vira.",
      ends:
        "Las finales -Z no existen en el español nativo: solo los préstamos son válidos. La página es una curiosidad de referencia: apréndete la lista para los duelos y retos.",
    },
  },
'''

DE_LETTERS = r'''  letters: {
    a: {
      title: "A-Wörtern — der Vokal-Anker",
      starts:
        "Sechs A-Steine im deutschen Beutel, 1 Punkt: das A ist Ihr günstigster Vokal und der Anker fast jeden Scrabbles. A-Öffnungen (ABEND, ARBEIT, ANFANG) leeren Gestelle, und die Familien -ATION und -BAR verwandeln volle Gestelle in 50-Punkte-Bonus. Deutsche Komposita machen das A zum klebenden Bindeglied.",
      ends:
        "Wörter auf -A sind im Deutschen selten und meist Fremdwörter: genau das macht sie wertvoll. Gegner haben selten den Hook parat — ein -A-Wort auf einer Dreifach-Zeile blockiert den Lauf für den Rest der Partie.",
    },
    b: {
      title: "B-Wörtern — Bingo-Treibstoff",
      starts:
        "Das B ist 3 Punkte wert und öffnet BE- (BEGINN, BESUCH) — eine der produktivsten Familien des Deutschen. Vier B-Steine: das B ist der häufigste Anfangsbuchstabe (BILD, BUCH, BLUME) und der Treibstoff für Scrabbles.",
      ends:
        "Endungen auf -B sind im Deutschen extrem selten: die Liste passt auf eine Hand. Die Seite ist eine Referenz fürs Reklamieren — jeder erfundene -B-Ausgang verliert den Zug.",
    },
    c: {
      title: "C-Wörtern — der 4-Punkte-Chamäleon",
      starts:
        "Das C ist im deutschen Scrabble 4 Punkte wert (anders als 3 im Englischen) und fast immer Teil von CH- (CHAOS, CHARME) oder CK- (GLÜCK). Vier C-Steine: das C öffnet Fremdwörter (CAMPUS, CLEVER) und glänzt auf Doppel-Feldern.",
      ends:
        "Wörter auf -C sind im Deutsche Fremdwörter-Endungen, und die Liste ist kurz. Lernen Sie sie für Turnierduelle: jeder erfundene -C-Ausgang verliert den Zug.",
    },
    d: {
      title: "D-Wörtern — der Partizip-Motor",
      starts:
        "Das D ist 1 Punkt wert (im Englischen 2), zirkuliert 8-mal und treibt die Partizipien: jedes Verb wird zu -T/-ET (GESPIELT, GEMACHT). D-Öffnungen (DING, DANK, DIENST) leeren Gestelle. Das D ist auch die Tür zu DURCH- (DURCHLAUFEN), dem produktivsten deutschen Präfix.",
      ends:
        "Endungen auf -D existieren im Deutschen praktisch nicht: die Seite dient als Reklamations-Referenz. Die echten D-Endungen sind Partizipien wie -END (LAUFEND).",
    },
    e: {
      title: "E-Wörtern — der häufigste Buchstabe",
      starts:
        "Fünfzehn E-Steine im deutschen Beutel — mit Abstand der häufigste Buchstabe. E-Öffnungen (EINS, EBEN, ERFOLG) leeren Gestelle, und die Endungen -E, -EN, -ER machen jedes deutsche Wort zur Erweiterungsfläche. 1 Punkt: der Wert liegt in der Gestell-Flexibilität.",
      ends:
        "Die Endung -E ist DIE deutsche Endung: jedes Substantiv wird im Plural zu -EN/-E (TISCHE, STÜHLE), jedes Adjektiv zu -E (GUTE, SCHÖNE). Die Seite -E ist die größte Angriffsfläche des Spiels — N dahinter (TISCHEN) macht jede Endung zur Erweiterung.",
    },
    f: {
      title: "F-Wörtern — Parallelen für 4 Punkte",
      starts:
        "Das F ist 4 Punkte wert und glänzt in Parallelzügen: FA-, FU- (FARBE, FUSS) legen das F auf Doppel-Feldern für 8 Punkte pro Position. Vier F-Steine — das Deutsche liebt F (FINDEN, FRÜH, FRAU).",
      ends:
        "Endungen auf -F sind im Deutschen extrem selten (die Liste passt auf eine Hand): Reklamations-Referenz. Konzentrieren Sie sich auf Mittelpositionen für den wahren Wert der Fiche.",
    },
    g: {
      title: "G-Wörtern — der -UNG-Schlüssel",
      starts:
        "Das G ist 2 Punkte wert, zirkuliert 4-mal, und ist der Schlüssel zu -UNG — das produktivste deutsche Suffix. Jedes Verb wird zu -UNG (WOHNUNG, MEINUNG): das G in Mittelposition öffnet Scrabbles. G-Öffnungen (GUT, GELD, GANZ) leeren Gestelle.",
      ends:
        "Endungen auf -G sind im Deutschen sehr selten: die Seite ist eine Reklamations-Referenz. Die echte G-Endung ist -IG (MUTIG, EIFRIG), die sich zu -IGKEIT (MUTIGKEIT) erweitern lässt.",
    },
    h: {
      title: "H-Wörtern — die CH-Familie",
      starts:
        "Das H ist 2 Punkte wert im deutschen Scrabble (4 im Englischen) und bildet CH- (CHAOS, CHARME, CHINESISCH) und SCH- (SCHULE). Vier H-Steine: das H koppelt mit fast jedem Konsonanten — die vielseitigste Verbindung des Deutschen.",
      ends:
        "Endungen auf -H existieren im Deutschen nicht: die Seite ist eine Referenz fürs Reklamieren. Die echten H-Positionen sind in CH und SCH verborgen.",
    },
    i: {
      title: "I-Wörtern — der Bindevokal",
      starts:
        "Sechs I-Steine, 1 Punkt: das I ist ein Bindevokal des Deutschen und steckt in Komposita (SCHIFFFAHRT, EISENBAHN). I-Öffnungen (IMMER, IRGEND) leeren Gestelle, und die Familien -IE und -ION (NATION, REGION) öffnen Scrabbles.",
      ends:
        "Endungen auf -I sind Fremdwörter (TAXI, SUSHI, KIWI): unerweiterbar und damit defensive Riegel. Wenige Gegner kennen die gültige -I-Liste — nutzen Sie das fürs Reklamieren.",
    },
    j: {
      title: "J-Wörtern — acht Punkte pro Stein",
      starts:
        "Das J ist im deutschen Scrabble 8 Punkte wert — gleichauf mit V. Zwei J-Steine zirkulieren (im Englischen nur einer). J-Öffnungen (JEDER, JETZT, JAHR, JUNGE) sind im Alltag allgegenwärtig: das J legt sich früher als im Englischen. Auf einem Doppel-Feld: 16 Punkte.",
      ends:
        "Endungen auf -J existieren im Deutschen nicht: die Seite ist eine Referenz fürs Reklamieren. Jeder erfundene -J-Ausgang verliert den Zug.",
    },
    k: {
      title: "K-Wörtern — der deutsche Arbeitstier",
      starts:
        "Das K ist im deutschen Scrabble 4 Punkte wert (5 im Englischen), aber der dichteste Konsonant des Deutschen (KIND, KALT, KOMMEN, KOPF). Vier K-Steine zirkulieren — das K ist der Arbeitstier-Buchstabe des Sprachspiels.",
      ends:
        "Endungen auf -K sind im Deutschen extrem selten (die Liste passt auf eine Hand): Reklamations-Referenz. Konzentrieren Sie sich auf die häufigen Mittelpositionen.",
    },
    l: {
      title: "L-Wörtern — der Klebstoff",
      starts:
        "Das L ist 2 Punkte wert, zirkuliert 4-mal, und klebt alles zusammen: die deutschen Komposita (VOLL+ZEIT wird VOLLZEIT) brauchen L als Bindeglied. L-Öffnungen (LEBEN, LIEBE, LAND) leeren Gestelle — das L ist der häufigste Flüssiglaut des Deutschen.",
      ends:
        "Endungen auf -L sind im Deutschen selten: die Liste ist kurz und dient der Reklamation. Die echten L-Endungen sind -EL (GABEL, IGEL), die sich mit -N erweitern lassen.",
    },
    m: {
      title: "M-Wörtern — der Komposita-Motor",
      starts:
        "Das M ist 3 Punkte wert und der Motor der deutschen Komposita: MIT-, MORGEN- (MITTAG, MONTAG) öffnen die längsten Wörter des Spiels. Vier M-Steine zirkulieren. Das M ist auch die Tür zu MISS- (MISSVERSTÄNDNIS).",
      ends:
        "Endungen auf -M sind im Deutschen sehr selten (die Liste passt auf eine Hand). Die Seite dient der Reklamation — jeder erfundene -M-Ausgang verliert den Zug.",
    },
    n: {
      title: "N-Wörtern — der Plural-Anker",
      starts:
        "Das N ist 1 Punkt wert und zirkuliert 9-mal — der häufigste Endkonsonant des Deutschen. N-Öffnungen (NACHT, NUR, NUN) sind kurz, und die Endungen -EN (SINGEN) und -N machen das N zum Anker jedes Plurals.",
      ends:
        "Endungen auf -N sind der Plural-Motor des Deutschen: -EN (FRAUEN, STRASSEN) ist die häufigste Substantiv-Endung. Die Seite -N ist eine der längsten des Spiels — und leicht erweiterbar.",
    },
    o: {
      title: "O-Wörtern — der knappe Vokal",
      starts:
        "Das O ist 2 Punkte wert (im Englischen nur 1) und zirkuliert nur 4-mal — der knappste deutsche Vokal. O-Öffnungen (OBEN, OHNE, OHR) sind kurz, und die -ON-Endungen (NATION, STATION) öffnen Scrabbles. In der deutschen Scrabble-Ökonomie ist das O knapper als das E.",
      ends:
        "Endungen auf -O sind Fremdwörter (PIANO, RADIO, KILO): unerweiterbare defensive Riegel. Wenige Gegner kennen die gültige -O-Liste — perfekt fürs Reklamieren.",
    },
    p: {
      title: "P-Wörtern — die Überraschungs-6",
      starts:
        "Das P ist im deutschen Scrabble 6 PUNKTE wert — doppelt so viel wie im Englischen. Nur zwei P-Steine zirkulieren. P-Öffnungen (POST, PAPIER, PLAN) legen das überraschend wertvolle P auf Doppel-Feldern für 12 Punkte pro Position.",
      ends:
        "Endungen auf -P sind im Deutschen extrem selten (die Liste passt auf eine Hand). Die Seite ist eine Reklamations-Referenz: jeder erfundene -P-Ausgang verliert den Zug.",
    },
    q: {
      title: "Q-Wörtern — zehn Punkte, fast immer mit U",
      starts:
        "Das Q ist im deutschen Scrabble 10 Punkte wert und braucht fast IMMER ein U: QUATSCH, QUARTAL, QUALITAET. Nur ein Q-Stein: die deutsche Q-ohne-U-Liste ist noch kürzer als die englische — warten Sie auf das U und legen Sie dann beide zusammen auf ein Bonusfeld.",
      ends:
        "Wörter auf -Q existieren im deutschen Wörterbuch nicht: die Seite ist eine reine Reklamations-Referenz. Jeder erfundene -Q-Ausgang verliert den Zug.",
    },
    r: {
      title: "R-Wörtern — der Erweiterungs-Riese",
      starts:
        "Das R ist 1 Punkt wert und zirkuliert 6-mal — der vielseitigste deutsche Konsonant. Die Komparativ-Endungen (BESSER, KLEINER) machen das R zur Tür für Adjektiv-Erweiterungen. Die Präfixe VER- und ER- (VERKAUF, ERGEBNIS) verlängern fast alles.",
      ends:
        "Endungen auf -R sind der Komparativ-Motor des Deutschen: BESSER, SCHNELLER, GROESSER. Die -ER-Endungen konvertieren jedes Adjektiv und sind eine der größten Erweiterungsflächen des Spiels.",
    },
    s: {
      title: "S-Wörtern — der Haken-Meister",
      starts:
        "Das S ist 1 Punkt wert, zirkuliert 7-mal, und ist DER Haken-Buchstabe des Deutschen: hängen Sie S an fast jedes Wort für eine Ein-Buchstaben-Erweiterung. Die Präfixe SONDER- und SCHNELL- verlängern alles. Sieben S-Steine: die S-Parität entscheidet knappe Partien.",
      ends:
        "Endungen auf -S sind der Genitiv-Motor des Deutschen (DES KINDES, EIN HAUSES) und machen die -S-Seite zur längsten des Spiels. Jedes Substantiv akzeptiert Genitiv-S: die ultimative Erweiterungsfläche.",
    },
    t: {
      title: "T-Wörtern — der Partizip-Schlüssel",
      starts:
        "Das T ist 1 Punkt wert und zirkuliert 6-mal — der Partizip-Schlüssel des Deutschen: jedes starke Verb wird zu -T/-EN (GEMACHT, GELAUFEN). T-Öffnungen (TAG, TUN, TOD) sind kurz und häufig.",
      ends:
        "Endungen auf -T sind die Partizipien des Deutschen: GEMACHT, GELAUFEN, und die Verben der 3. Person (ER MACHT, SIE LIEBT). Die Seite -T ist eine der erweiterbarsten: -EN dahinter öffnet jede Zeile.",
    },
    u: {
      title: "U-Wörtern — der Umlaut-Wirt",
      starts:
        "Das U ist 1 Punkt wert und zirkuliert 6-mal — der Wirt der deutschen Umlaute (UE wird im Scrabble als U geschrieben: GUTE). U-Öffnungen (UNTER, UEBER, UM) sind die Präfix-Familie des Deutschen. Halten Sie ein U wenn das Q noch draußen ist: es ist der Türöffner.",
      ends:
        "Endungen auf -U sind im Deutschen extrem selten (die Liste passt auf eine Hand): die Seite dient der Reklamation. Jeder erfundene -U-Ausgang verliert den Zug.",
    },
    v: {
      title: "V-Wörtern — acht Punkte pro Stein",
      starts:
        "Das V ist im deutschen Scrabble 8 PUNKTE wert — doppelt so viel wie im Englischen. Zwei V-Steine zirkulieren. V-Öffnungen (VATER, VOLK, VIEL) sind alltäglich: das V legt sich früher als im Englischen. Auf einem Doppel-Feld: 16 Punkte.",
      ends:
        "Endungen auf -V existieren im deutschen Wörterbuch nicht: die Seite ist eine reine Reklamations-Referenz. Jeder erfundene -V-Ausgang verliert den Zug.",
    },
    w: {
      title: "W-Wörtern — der Frage-Anker",
      starts:
        "Das W ist 3 Punkte wert im deutschen Scrabble (4 im Englischen) und öffnet die W-Frage-Wörter (WER, WAS, WANN, WO, WIE) — die häufigsten Wörter des Deutschen. Vier W-Steine zirkulieren: das W ist der häufigste Anlaut der Fragepronomen.",
      ends:
        "Endungen auf -W existieren im deutschen Wörterbuch nicht: die Seite ist eine Reklamations-Referenz. Lernen Sie die kurze Liste fürs Reklamieren.",
    },
    x: {
      title: "X-Wörtern — zehn Punkte",
      starts:
        "Das X ist im deutschen Scrabble 10 PUNKTE wert (8 im Englischen) — einer der teuersten Steine. Nur ein X zirkuliert. Deutsche X-Wörter sind Fremdwörter (XYLOPHON, XENON): die X-Liste ist kurz, aber jedes Doppel-Feld zahlt 20 Punkte.",
      ends:
        "Endungen auf -X existieren im deutschen Wörterbuch nicht: die Seite ist eine reine Reklamations-Referenz. Jeder erfundene -X-Ausgang verliert den Zug.",
    },
    y: {
      title: "Y-Wörtern — zehn Punkte Diskretion",
      starts:
        "Das Y ist im deutschen Scrabble 10 PUNKTE wert (4 im Englischen) — einer der wertvollsten Steine, aber nur in Fremdwörtern platzierbar (SYSTEM, TYPO, YOGA). Nur ein Y zirkuliert: warten Sie auf die Mittelposition (SYSTEM, PHYSIK) und kassieren Sie das Doppel-Feld.",
      ends:
        "Endungen auf -Y existieren im deutschen Wörterbuch nicht: die Seite ist eine Reklamations-Referenz. Jeder erfundene -Y-Ausgang verliert den Zug.",
    },
    z: {
      title: "Z-Wörtern — der deutsche Alltagstier",
      starts:
        "Das Z ist im deutschen Scrabble nur 3 Punkte wert (10 im Englischen), aber der ALLTAGSBuchstabe des Deutschen (ZEIT, ZU, ZWEI, ZEHN). Vier Z-Steine zirkulieren — das Z ist der Arbeitstier-Buchstabe des Sprachspiels: es eröffnet jede dritte deutsche Wortfamilie.",
      ends:
        "Endungen auf -Z existieren im deutschen Wörterbuch nicht: die Seite ist eine Reklamations-Referenz. Konzentrieren Sie sich auf Mittelpositionen für den wahren Wert.",
    },
  },
'''

with open(PATH, "r", encoding="utf-8") as f:
    src = f.read()

# Replace ES letters block (between "const ES" and its "lengths:")
def replace_block(src: str, start_marker: str, end_marker: str, new_block: str) -> str:
    i = src.index(start_marker)
    j = src.index(end_marker, i)
    return src[:i] + new_block + src[j:]

# ES: replace from "  letters: {\n    a: {\n      title: \"empiezan por A" up to "  lengths: {"
es_start = '  letters: {\n    a: {\n      title: "empiezan por A'
es_end = '  lengths: {\n    "2": "Las palabras de 2 letras'
src = replace_block(src, es_start, es_end, ES_LETTERS)

# DE: replace from '  letters: {\n    a: {\n      title: "A-W' up to '  lengths: {'
de_start = '  letters: {\n    a: {\n      title: "A-W'
de_end = '  lengths: {\n    "2": "Zwei-Buchstaben-W'
src = replace_block(src, de_start, de_end, DE_LETTERS)

# Also make the export record Partial so remaining languages fall back to EN at runtime
src = src.replace(
    "export const WORD_LIST_ARTICLES: Record<LanguageCode, LangArticleContent> = {",
    "export const WORD_LIST_ARTICLES: Partial<Record<LanguageCode, LangArticleContent>> = {",
)

with open(PATH, "w", encoding="utf-8") as f:
    f.write(src)

print("Done. Verifying no artifacts remain...")
import subprocess
r = subprocess.run(
    ["grep", "-nE", r"\? no|\? nein|\? si|\? beginnt|\? endet|\? empieza|\? termina|\? \(|\? \(val", PATH],
    capture_output=True, text=True,
)
print(r.stdout if r.stdout else "CLEAN — no artifacts found")
