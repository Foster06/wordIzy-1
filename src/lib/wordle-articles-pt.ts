// src/lib/wordle-articles-pt.ts — Wordle articles in Portuguese.
// Written FOR Portuguese speakers (pt-BR and pt-PT) playing ENGLISH Wordle.
// Not a literal translation: each entry contrasts English Wordle patterns
// with Portuguese expectations (vowel-final words, -ÃO nasals, the LH/NH/RR/SS
// digraphs, the cedilha, and the accents that never appear in English answers).
//
// All Wordle facts stay ENGLISH: answer words (QUERY, SLATE, PIZZA...),
// letter frequencies and position statistics are identical to the EN file.
// The Scrabble crossover uses the ENGLISH tile values (Q/Z=10, J/X=8, K=5,
// F/H/V/W/Y=4, B/C/M/P=3, D/G=2, vowels+L/N/R/S/T=1) because Wordle answers
// are English words — the pt Léxico tile values are different, and the
// tileTemplate below explains that bridge explicitly for pt readers.
//
// Placeholders: {letter} {Letter} {angle} {score} {count} {total} {plural}
//               {tileWord} {double} {triple}

import type { WordleArticleContent } from "./wordle-articles";

export const PT_WORDLE_ARTICLES: WordleArticleContent = {
  titleTemplate: "Como ganhar no Wordle usando {angle}",
  startsLead:
    "Antes de tudo, um lembrete essencial: o Wordle é um jogo INGLÊS — mesmo que a interface esteja em português, as respostas vêm sempre do dicionário inglês, escritas sem acentos e sem cedilha. Nesse pool, {total} respostas válidas começam com {letter}, e dominar os padrões dominantes transforma palpites em armas. Este guia cobre as táticas de abertura com {letter}, o valor da letra no Scrabble para quem joga nos dois universos e as jogadas de maior pontuação escondidas na lista acima.",
  endsLead:
    "As terminações são onde as sequências de vitórias se salvam ou se perdem — e aqui mora o maior reflexo a reeducar: em português, as palavras terminam quase sempre em vogal ou em -ÃO (MESA, PORTA, CORAÇÃO), mas o Wordle inglês prefere terminar em E, Y, T, R e N. No pool de respostas, {total} palavras válidas terminam com {letter}, formando uma família distinta cujos padrões rendem muito mais que o palpite aleatório. Este guia destrincha as estratégias de terminação em {letter}, os valores de Scrabble exibidos ao lado de cada resposta e as jogadas cruzadas de alta pontuação que valem memorizar.",
  tileTemplate:
    "Ponte com o Scrabble: aqui no site, a peça {Letter} vale {score} ponto{plural}, e há apenas {count} {tileWord} por partida — os valores do conjunto em português. Como o Wordle é um jogo inglês, a referência do crossover é o Scrabble INGLÊS, cuja tabela difere do Léxico lusófono: lá, Q e Z valem 10 pontos; J e X valem 8; K vale 5; F, H, V, W e Y valem 4. O WordIzy exibe a pontuação ao lado de cada resposta — quando uma resposta também é uma jogada valiosa ({Letter} numa casa de dobro de letra rende {double} pontos; numa de triplo, {triple}), você a identifica na lista acima e arquiva o padrão para o próximo suporte.",
  topWordsHeading: "Palavras do Wordle com {Letter} de maior pontuação",
  topWordsLead:
    "Estas são as palavras que mais pontuam no Scrabble entre as respostas válidas do Wordle que contêm {letter} — dados ao vivo do nosso banco de palavras. Elas cumprem função dupla: palpites fortes para o desafio diário E jogadas de alto valor no Scrabble:",
  closing:
    "A diferença entre o jogador casual e quem mantém a sequência raramente é sorte — está em saber quais palavras com {letter} existem como respostas válidas, onde a letra prefere estatisticamente morar e como gastar cada palpite em máxima informação. Marque esta página, treine as palavras acima e {letter} deixa de ser um quadrado temido para virar uma pista que você explora — sempre lembrando que, no Wordle, a letra joga pelas regras do inglês, não do português.",
  letters: {
    a: {
      title: "palavras com A para abrir o ataque",
      starts:
        "No Wordle, A é a segunda letra de abertura mais comum — cerca de uma resposta em cada doze começa com ela, atrás apenas do S. As formas dominantes são AD-, AL-, AN-, AR- e AT- (ADAPT, ALERT, ANGEL, ARGUE, ATLAS), com o duplo A de ABACK surpreendendo os desatentos. Aberturas como ADIEU e AUDIO testam quatro vogais de uma vez — ferramenta preciosa num pool que, ao contrário do português, é bem menos generoso em vogais. Quando A vem verde na primeira casa, o triângulo ANGEL-ARGUE-ATLAS é o próximo passo; quando vem amarelo, a segunda casa é o habitat favorito da letra.",
      ends:
        "Aqui mora um reflexo a reeducar: em português, palavras terminadas em A são onipresentes (CASA, MESA, PORTA), mas menos de 3% das respostas do Wordle terminam com A. A família é um clube de empréstimos: AURA, COMA, DRAMA, EXTRA, KOALA, MAFIA, MAGMA, MEDIA, OMEGA, PANDA, PLAZA, SOFA, VILLA, YOGA, ZEBRA, ARENA, ULTRA, AROMA. E nenhum diacrítico aparece: Á, Ã e Â nunca existem no jogo — as respostas se escrevem sem acento. Um A amarelo quase sempre aponta para as casas dois ou três, não para a quinta. No Scrabble inglês, A vale 1 ponto (nove peças), mas EXTRA (12) e ZEBRA (16) são joias discretas.",
    },
    b: {
      title: "palavras com B para segundos palpites ousados",
      starts:
        "B é a terceira letra de abertura mais comum do Wordle — cerca de uma resposta em cada quatorze começa com ela (BLACK, BREAD, BRING, BONUS, BEACH). Palavras iniciadas com B são ótimos segundos palpites porque a letra raramente aparece em outra posição: um B cinza elimina de uma vez as famílias BA-, BE-, BI-, BO- e BU-, cobertura de elite por palpite. As formas mais prováveis são os encontros BL- e BR- (BLACK, BLADE, BRICK, BROTH), seguidos por BE- (BEAST, BEGIN, BENCH). Como aberturas cheias de vogais como ADIEU não contêm B, um B verde indica que o seu mapa de vogais merece uma segunda olhada.",
      ends:
        "Nenhuma resposta de cinco letras do Wordle termina em B — a lista está praticamente vazia, porque palavras nativas do inglês terminadas em B costumam ser mais longas (absorb, describe). Use isso como regra de eliminação: se a última casa segue em aberto no fim da partida, gaste o palpite em terminações valiosas (E, Y, T) em vez de caçar um B impossível. Um B amarelo aponta com força para as casas dois ou três (RABID, ROBOT, HABIT, CABLE). No Scrabble inglês, a peça B vale 3 pontos: CABLE (9) e GAMBLE (10) são as jogadas de pontuação — CRUMB existe no Scrabble, mas nunca como resposta.",
    },
    c: {
      title: "palavras com C para cobrir padrões",
      starts:
        "C é a segunda letra de abertura mais comum do Wordle — quase uma resposta em cada dez começa com ela, pelas famílias CA-, CO- e CR- (CANDY, CATCH, COUCH, CRANE, CROSS). Aviso ao lusófono: a cedilha não existe no jogo — Ç é exclusivo do português e do francês, logo CORÇA é impossível; o C inglês tem som duro (CATCH) ou suave antes de E, I e Y (CIDER, CYCLE, CIVIC). Um palpite com C cobre as duas famílias, e o encontro CH- (CHAIR, CHESS, CHICK) forma uma tribo própria. A abertura CRANE é célebre: reúne C, R, A, N e E — cinco letras de altíssimo valor.",
      ends:
        "Praticamente nenhuma resposta do Wordle termina em C: MUSIC e LOGIC posicionam o C na quarta casa, não na quinta. Trate o padrão como evidência: com MUSI- ou LOGI- no quadro, o C completa a quarta posição, nunca a última. Um C amarelo normalmente marca as casas um ou quatro (CHAIR, MUSIC, LOGIC, MAGIC). Já o dígrafo SS, comum em português (PÉSSIMO, OSSO), não aparece nas terminações — o inglês usa um S só. No Scrabble inglês, C vale 3 pontos (duas peças): MUSIC (9), MAGIC (9) e LOGIC (6) são respostas e jogadas sólidas.",
    },
    d: {
      title: "palavras com D e a dedução do sufixo -ED",
      starts:
        "D é uma abertura de frequência média no Wordle — cerca de uma resposta em cada vinte começa com ela (DANCE, DAILY, DIARY, DOUBT, DREAM, DRINK). As palavras com D inicial se agrupam em dois blocos: a família vocálica DA-/DE- (DANCE, DEBUT, DELTA) e o encontro consonantal DR- (DREAM, DRIFT, DRIVE, DROWN). Como D está entre as quatro terminações mais comuns do jogo, confirmá-lo cedo muda o planejamento do fim da partida: um D cinza na quinta casa vale tanto quanto um D verde na primeira. As formas DI- (DIARY, DIGIT, DINER) completam as famílias da frente e merecem uma investigação no meio do jogo.",
      ends:
        "D é a sétima terminação mais comum do Wordle — cerca de 4% das respostas — pelo passado inglês em -ED (FIXED, BROAD, BLOOD, THIRD) e pelos substantivos em D puro (WORLD, BLOND, HOUND, FIELD, BEARD). Contraste com o português: nosso passado não usa sufixo (comeu, partiu), então memorize o -ED como passado padrão do inglês. A dedução é um presente: E e D confirmados sugerem passado, e as letras iniciais carregam o significado. WOULD, COULD, SOUND e FOUND formam um grupo de rimas em que um acerto desbloqueia vários. No Scrabble inglês, D vale 2 pontos (quatro peças); WORLD e WOUND rendem 9, BROAD 8.",
    },
    e: {
      title: "palavras com E, a vogal rainha",
      starts:
        "E é a letra mais comum de todo o pool de respostas do Wordle — cerca de 11% — e, ainda assim, raramente inicia uma resposta: menos de 2% começam com E (EAGLE, EARLY, EARTH, EIGHT, ELITE, EMPTY, ENEMY, ENTER, EQUAL, ERUPT, EXACT, EXTRA). Essa inversão importa: um E verde na primeira casa reduz o campo à pequena lista acima. As famílias dominantes são EA- (EAGLE, EARLY, EARTH), EM-/EN- (EMPTY, ENEMY, ENTER) e o par premium EX- (EXACT, EXTRA). Como o E prefere o miolo ou o final, testá-lo na primeira casa é um arremesso calculado com prêmio desproporcional.",
      ends:
        "E é a rainha das terminações: cerca de uma resposta em cada cinco termina com E — a final mais comum do jogo. Contraste lusófono: nosso final vocálico privilegia A e O (CASA, GATO); o Wordle coroa o E — reflexo a reeducar. As famílias são -KE, -LE, -ME, -NE, -SE, -TE e -VE (SNAKE, APPLE, BLAME, STONE, HOUSE, WRITE, GIVE), com o grupo comparativo -ER (AFTER, WATER, SUPER) somando outros 4%. Com a última casa em aberto, E é a aposta estatística correta na quinta posição. No Scrabble inglês, E vale 1 ponto (doze peças); HOUSE (8) e STONE (5) limpam suportes nos dois jogos.",
    },
    f: {
      title: "palavras com F para eliminação rápida",
      starts:
        "F é uma abertura de frequência média — cerca de uma resposta em cada vinte começa com ela (FAIRY, FANCY, FIELD, FIRST, FLOAT, FRONT, FROST, FRUIT). Palavras com F inicial são ouro de eliminação porque a letra raramente aparece em outra posição: um F cinza mata de imediato as famílias FA-, FE-, FI-, FO- e FU-, cobertura excepcional por palpite. As formas dominantes são o encontro FR- (FRESH, FRIED, FRONT, FROST) e os pares vocálicos FA-/FE- (FANCY, FEAST, FEVER, FIBER). Aberturas como SLATE e CRANE ignoram F, então uma sonda dedicada (FRONT, FLOAT, FROST) vale uma jogada no meio da partida quando você suspeita de consoante no início.",
      ends:
        "Praticamente zero respostas do Wordle terminam em F — a lista oficial não contém palavras de cinco letras com F final, porque as terminações nativas do inglês pedem palavras mais longas (itself, behalf). Use isso estruturalmente: quando a última letra está em aberto, F nunca é a resposta, então um F amarelo marca as casas um a quatro — na prática, o miolo onde KNIFE, WOLF e CHEF posicionam a letra. No Scrabble inglês, F vale 4 pontos (duas peças no saco): KNIFE (12), WOLF (10) e CHEF (12) são exatamente as palavras de dupla função que esta página existe para revelar. Marque-as no cofre.",
    },
    g: {
      title: "palavras com G e o padrão -ING",
      starts:
        "G é uma abertura pouco frequente — menos de 3% das respostas do Wordle começam com ela (GHOST, GIANT, GIVEN, GLASS, GLOBE, GRACE, GRADE, GRAND, GRASP, GRAVE, GROUP, GUESS). Quase todas passam pelo encontro GR- (GRAND, GRAPE, GRASP, GRAVE, GREED, GRILL, GROSS, GROUP, GROVE, GROWL), com GL- (GLASS, GLOBE, GLORY) e GO- (GOOSE, GORGE) como apoio. Um G verde na primeira casa mais um R confirmado faz do triângulo GRA-/GRE- o seu próximo passo. O verdadeiro poder do G no Wordle é posicional: a letra aparece bem mais no FINAL das respostas (o padrão -ING) do que no início, então testá-la na frente é uma inversão deliberada.",
      ends:
        "Cerca de 2% das respostas terminam em G, divididas entre o gerúndio inglês em -ING (BRING, GOING, DYING, USING) e as monossílabas em -NG (AMONG, STRONG, WRONG, YOUNG). O contraste com o português é notável: nosso gerúndio termina em -NDO (ANDANDO, CORRENDO), então o -ING é um padrão exclusivamente inglês — treine-o de propósito. A dedução é poderosa: um G verde na quinta casa mais uma dica vocálica aponta para -ING ou -ONG, e as duas ou três letras da frente viram um conjunto pequeno e pesquisável. No Scrabble inglês, G vale 2 pontos (três peças); BRING (8) e YOUNG (9) são jogadas honestas.",
    },
    h: {
      title: "palavras com H, o decodificador de encontros",
      starts:
        "H é uma abertura rara sozinha, mas um convidado frequente: menos de 3% das respostas do Wordle começam com H, e a maioria das ocorrências vem dos encontros TH-, CH-, SH- e WH-, que dominam o inglês. As aberturas com H são os cavalos de batalha (HABIT, HAPPY, HEART, HEAVY, HORSE, HOTEL, HUMAN, HUMOR, HURRY). Nota ao lusófono: o H mudo do início (HOJE, HORA) e os dígrafos NH e LH (PEQUENO, FILHO) não existem no Wordle — o H inglês soa nos encontros. O valor estratégico é confirmar encontros: com T amarelo, um palpite em THEME ou THUMB resolve duas letras de uma vez.",
      ends:
        "Cerca de 3% das respostas terminam em H — pelas famílias de vogal breve com encontro consonantal: -ACH (BEACH, TEACH), -ITCH (PITCH, SWITCH), -USH (BRUSH, FRESH) e as formas -UGH (TOUGH, ROUGH, LAUGH, MOUTH). Um H verde na quinta casa diz que a palavra é quase certamente uma monossílaba com vogal breve e encontro final — informação que colapsa a lista de candidatos rápido. Para quem joga em português, o detalhe: o H final inglês não é decorativo como no dígrafo NH; ele fecha sílabas. No Scrabble inglês, H vale 4 pontos (duas peças); WORTH (11) e YOUTH (11) são jogadas fortes que também aparecem no Wordle.",
    },
    i: {
      title: "palavras com I, a vogal do miolo",
      starts:
        "I é uma abertura rara — menos de 1% das respostas do Wordle começam com ela (IMAGE, INDEX, INPUT, IRONY, ISSUE, IVORY). As sobreviventes são empréstimos e termos técnicos, então um I verde na primeira casa é um sinal de raridade valioso: a resposta pertence a um clube pequeno e reconhecível. A família do prefixo IN- (INDEX, INPUT) é o nó mais denso, seguida pelas formas IR-/IS- (IRONY, ISSUE). A abertura ADIEU posiciona I na quarta casa, onde a letra vive muito melhor — I aparece três vezes mais nas casas três e quatro do que na primeira, o que torna o teste interior a estratégia padrão.",
      ends:
        "Quase nenhuma resposta do Wordle termina em I — a lista contém zero terminações assim, porque o inglês nativo quase não fabrica palavras de cinco letras com I final. Esse zero é a estratégia: com a última casa em aberto, nunca adivinhe I. E nada de acentos: Í e Î não existem no jogo. Um I amarelo marca esmagadoramente as casas três ou quatro (MUSIC, LOGIC, VIVID, RIVAL, CIVIC, PILOT, TIGER). A família de adjetivos -IC (MUSIC, LOGIC, CIVIC, TOPIC, MANIC) é o padrão mais produtivo do I. No Scrabble inglês, I vale 1 ponto (nove peças); VIVID, com seu raro duplo V, é a estrela de dupla função.",
    },
    j: {
      title: "palavras com J, a abertura mais rara",
      starts:
        "J é uma das letras mais raras do Wordle — cerca de 0,25% das respostas a contêm, e as aberturas se resumem a um clube minúsculo: JOINT, JOKER, JUICE, JUDGE, JUICY e alguns empréstimos. Aviso ao lusófono: em português, o J inicial é corriqueiro (JANELA, JOGO, JACA); no Wordle, é raríssimo — reeduque a expectativa. A família JU- (JUICE, JUDGE, JUICY) domina porque o J inglês exige vogal logo em seguida. A raridade é a estratégia: um J verde reduz o campo a um grupo pequeno e memorável, e um palpite dedicado (JOKER, JOINT, JUICE) resolve uma letra que as aberturas famosas nunca testam.",
      ends:
        "Zero respostas terminam em J — nenhuma, na lista oficial. Palavras de cinco letras do inglês com J final não existem no pool do Wordle. Use isso como eliminação dura: um J amarelo só pode marcar as casas um a quatro, e na prática um a três. O habitat real do J é interior: MAJOR e BANJO posicionam a letra nas casas três e quatro, JOINT e JOKER a mantêm na primeira, e ENJOY a esconde na quarta. No Scrabble inglês, J é peça de 8 pontos (uma única no saco): BANJO (14) e MAJOR (13) são as joias de dupla função desta página.",
    },
    k: {
      title: "palavras com K e o padrão CK",
      starts:
        "K é uma abertura rara — cerca de 1% das respostas do Wordle começam com ela (KNIFE, KNOCK, KNOWN, KAYAK, KIOSK, KNEEL). Metade dessas aberturas começa com o dígrafo KN-, em que o N é mudo (KNIFE, KNOCK, KNOWN, KNEEL) — padrão único do inglês. Para o lusófono, a raridade é intuitiva: em português, o K só vive em empréstimos (KILO, KARAOKÊ); o N mudo, não. Palpites com K têm dupla função: testam a letra e revelam se a forma KN- está em jogo. Um K verde na primeira casa mais um N cinza elimina a família KN- inteira de uma vez — cobertura excepcional por palpite.",
      ends:
        "Cerca de 3% das respostas terminam em K — dominadas pelas famílias de vogal breve -ACK, -OCK, -ICK e -UCK: BLACK, BLOCK, BRICK, CLOCK, KNOCK, QUICK, STICK, STUCK, THINK, THICK, TRACK, TRUCK, SHACK. A jogada dedutiva: um K verde na quinta casa com vogal breve confirmada significa que a consoante do meio é quase certamente L, R, S, T ou um encontro TH — cinco candidatos, um palpite. O par CK entrega a gramática: com C e K confirmados, a resposta é monossilábica. No Scrabble inglês, K vale 5 pontos (uma peça no saco); QUICK (18), BLACK (11) e THINK (12) são as respostas de dupla função.",
    },
    l: {
      title: "palavras com L, o final líquido",
      starts:
        "L é uma abertura moderadamente comum — cerca de 4% das respostas do Wordle começam com ela (LABEL, LARGE, LAUGH, LEARN, LEMON, LIGHT, LIMIT, LOCAL, LOYAL, LUNCH, LUCKY). As famílias vocálicas LA- e LE- carregam o peso, com LI-, LO- e LU- na sustentação. Aberturas com L combinam bem com segundos palpites densos em vogais porque L é a consoante interior mais comum do inglês: testá-la na primeira casa é aposta estatisticamente sólida, mas um L amarelo significa mais vezes as casas dois, três ou quatro (PLACE, BLEND, FLOOD, SMILE). O duplo LL- (LLAMA) e os encontros FL-, CL-, PL- e BL- moram dentro de milhares de respostas.",
      ends:
        "L é a sexta terminação mais comum — cerca de 5% das respostas — em três famílias: -AL (EQUAL, LOCAL, LEGAL, FOCAL, MEDAL, PEDAL, TOTAL), -LE (APPLE, TABLE, NOBLE, MAPLE) e -EL (LABEL, MODEL, HOTEL, VOWEL, JEWEL). Plano de estudo: com A antes do L, pense em -AL; com E, em -LE ou -EL. Nota lusófona: o L final brasileiro soa como U (BRASIL vira 'braziu'), mas no inglês do Wordle ele é um L pleno. No Scrabble inglês, L vale 1 ponto (quatro peças); MEDAL (8) e MAPLE (9) rendem bem, e LEGAL (6) é palpite letal com G e L confirmados.",
    },
    m: {
      title: "palavras com M para manter o ritmo",
      starts:
        "M é uma abertura moderadamente comum — cerca de 3% das respostas do Wordle (MAGIC, MAJOR, MANGO, MARCH, MATCH, MEDIUM, MINOR, MONEY, MONTH, MORAL, MOTOR, MOUSE, MOUTH, MOVIE, MUSIC). A família MA- é o nó mais denso (MAGIC, MAJOR, MANGO, MARCH, MATCH), com MO- (MONTH, MORAL, MOTOR, MOUSE, MOVIE) logo atrás. Palavras com M inicial são ótimos segundos palpites depois de aberturas cheias de vogais, porque o M raramente aparece na primeira casa sem um A ou O em seguida. O padrão de duplo M (COMMA, MUMMY, GAMMA) é raro, mas inconfundível — um M amarelo em duas casas costuma denunciá-lo, e uma sonda confirma.",
      ends:
        "M é uma terminação rara — menos de 2% das respostas terminam com ela: MAXIM, MEDIUM, RHYTHM, VENOM, FORUM, VICTIM, WISDOM, GLOOM, BLOOM, CHASM, SCREAM, ALBUM, PSALM. Palavras com M final são majoritariamente termos técnicos com estruturas vocálicas específicas (OO, A-, I-). Um M verde na quinta casa mais um duplo O ou um I confirmados apontam rápido para GLOOM, BLOOM ou VICTIM. Ao lusófono acostumado com SIM, COMUM e SOM, o aviso vale: M final é exceção no Wordle, não regra. No Scrabble inglês, M vale 3 pontos (duas peças); MAXIM (16) e VICTIM (12) são premium, e RHYTHM (21) é o monstro escondido da família.",
    },
    n: {
      title: "palavras com N, a âncora nasal",
      starts:
        "N é uma abertura de frequência média — cerca de 2% das respostas do Wordle começam com ela (NAIL, NAIVE, NASTY, NAVY, NECK, NERVE, NEVER, NIGHT, NOBLE, NOISE, NORTH, NOTCH, NURSE). A família NA- carrega a frente (NAIVE, NASTY, NAVY), enquanto NO- (NORTH, NOISE, NOBLE, NOTCH) e NE- (NECK, NERVE, NEVER) dividem o resto. Aberturas com N são discretas, mas densas em informação: N é a quarta letra mais comum do jogo, e confirmá-la cedo — sobretudo na quarta casa, dentro dos padrões -ON e -ION — desbloqueia as famílias de terminação que dominam as respostas de cinco letras. NIGHT e NOTCH são as sondas de encontro a memorizar.",
      ends:
        "N é a quinta terminação mais comum — cerca de 6% das respostas — em duas famílias: -EN (GIVEN, OFTEN, OCEAN, OVEN, WOMEN, SIREN, RAVEN, SEVEN, WOVEN, MELON) e -AN (BEGAN, HUMAN, ORGAN, PECAN, TITAN, VEGAN). Reflexo a reeducar: o português termina em nasal -ÃO (CORAÇÃO, NÃO), terminação que não existe no Wordle — o jogo prefere o N puro de -EN e -AN. Um N verde na quinta casa com dica de E aponta para -EN na hora; com A, para -AN. No Scrabble inglês, N vale 1 ponto (seis peças); ORGAN (6), WOMEN (10) e RAVEN (8) são estáveis nos dois jogos.",
    },
    o: {
      title: "palavras com O, a segunda vogal",
      starts:
        "O é uma abertura rara — cerca de 1% das respostas do Wordle começam com ela (OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER, OUGHT, OUNCE). O conjunto é pequeno e denso em vogais, dominado pelas formas do ditongo OU- (OUGHT, OUNCE) e pelos pares O+consoante (OCEAN, OFTEN, OLIVE, ONION, OPERA, OTHER). Como O é a quarta letra mais comum do jogo — normalmente nas casas dois e três — aberturas com O valem pouco como primeiro palpite. A família do duplo OO- (BLOOD, FLOOR, GLOOM) começa com outras letras, mas recompensa quem conhece o O, e as formas OU- são a contribuição distintiva da vogal na frente.",
      ends:
        "Cerca de 2% das respostas terminam em O — um clube minúsculo de empréstimos: MANGO, TORSO, HALO, PIANO, ECHO. O reflexo português cobra caro aqui: palavras terminadas em O dominam o léxico lusófono (GATO, CARRO, LIVRO), mas no Wordle a lista é curta demais para dedução livre. Memorize-a: com a última casa em aberto e dicas vocais de O, teste a lista acima antes de qualquer coisa. Um O amarelo significa mais vezes as casas dois ou três (MONEY, PHONE, GHOST, SCOOP, BROOM). No Scrabble inglês, O vale 1 ponto (oito peças); MANGO (8) e TORSO (5) são modestas, e a economia de palpites é o verdadeiro prêmio.",
    },
    p: {
      title: "palavras com P para palpites cirúrgicos",
      starts:
        "P é uma abertura de frequência média — cerca de 3% das respostas do Wordle (PAINT, PANDA, PAPER, PARTY, PASTA, PATCH, PLACE, PLANT, POINT, POWER, PRESS, PRIDE, PRICE, PRIZE, PROVE, PUPIL). Os encontros PL- e PR- dominam (PLAIN, PLANT, PRESS, PRIDE, PRICE), com PA- na sustentação (PAPER, PASTA, PANDA). Palpites com P são instrumentos de precisão: a letra raramente aparece em outra posição, então um P cinza elimina três famílias inteiras de uma vez. O duplo P de PIZZA é o empréstimo mais famoso da lista — e, sim, é a mesma pizza da pizzaria; um P amarelo com dica de Z frequentemente anuncia PIZZA.",
      ends:
        "P é uma terminação raríssima — menos de 1% das respostas terminam com ela; os monossílabos em -AP, -IP e -OP mal aparecem. O conselho realista: quase nenhuma resposta termina em P, então um P amarelo marca com confiança as casas um a três (PAINT, PAPER, PUPIL). Gaste os palpites da última casa em E, Y ou T. No Scrabble inglês, P vale 3 pontos (duas peças no saco), e a joia da coroa é PIZZA (24 pontos) — uma das respostas comuns de maior pontuação de todo o Wordle, merecendo estrela imediata no cofre; PROVE (10) e PRIZE (16) completam as campeãs dos encontros.",
    },
    q: {
      title: "palavras com Q sem U",
      starts:
        "Q é a letra mais rara do Wordle — bem menos de 1% das respostas a contêm, e as aberturas formam um clube fechado: QUAKE, QUART, QUEEN, QUERY, QUEUE, QUICK, QUILT, QUIET, QUITE, QUOTA, QUOTE. Boa notícia ao lusófono: a Q portuguesa também exige QU antes de vogal (QUANDO, QUIETO), como no Wordle (QUERY, QUAKE) — a equivalência ajuda, e um Q verde faz do U o teste imediato. Se o U voltar cinza, você caça uma palavra com Q sem U, conhecimento importado do Scrabble de torneio, onde QI sozinho vale 11 pontos e QAT, QOPH e FAQIR mantêm a Q viva sem U à vista.",
      ends:
        "Zero respostas terminam em Q — nenhuma, na lista oficial. Palavras do inglês com Q final são empréstimos exóticos (SUQ, TRANQ). O zero é um presente defensivo: com a última letra em aberto, gaste os palpites nas terminações prováveis (E, Y, T, R) em vez de caçar um Q impossível. Um Q amarelo só pode significar a casa um ou dois — na prática, a um (QUERY, QUAKE, QUOTE). No Scrabble inglês, Q vale 10 pontos (uma única peça, a mais rara junto com Z): QUOTA (14) e QUERY (16) são respostas premium, e o folclore do Q sem U é a razão do título desta página.",
    },
    r: {
      title: "palavras com R, o cavalo de batalha",
      starts:
        "R é uma abertura de frequência média — cerca de 2% das respostas começam com ela (RADIO, RAISE, RANCH, RANGE, RAPID, RATIO, REACT, READY, REFER, RELAX, ROBOT, ROUND, ROYAL). As famílias vocálicas RA- e RE- dominam, com RO- (ROBOT, ROUND, ROYAL) na sustentação. Como R é a terceira letra mais comum do jogo, aberturas com R carregam forte cobertura — mas um R amarelo aponta mais vezes para o miolo (BREAD, FIRST, OTHER), onde a letra aparece com o dobro da frequência. A abertura CRANE testa R na segunda casa — por isso elimina tanto campo. O RR dobrado de CARRO e CACHORRO não inicia respostas do Wordle.",
      ends:
        "R é a quarta terminação mais comum — cerca de 7% das respostas — dominada pela família -ER: AFTER, FEVER, LATER, LASER, NEVER, OTHER, PAPER, RIVER, WATER. As formas -AR e -OR (SUGAR, VAPOR, FLOOR) completam. Aviso ao lusófono: o R final é regra em português por causa dos infinitivos (FALAR, COMER, ABRIR); no Wordle, prefira pensar no -ER de agente e comparativo — um R verde com dica de E aponta -ER na hora, e a frente da palavra vira o núcleo da busca. No Scrabble inglês, R vale 1 ponto (seis peças); RIVER (8) e WATER (7) são estáveis, e REFER (8) é o raro duplo R.",
    },
    s: {
      title: "palavras com S, o rei das aberturas",
      starts:
        "S é a letra de abertura mais comum do Wordle — mais de 10% das respostas começam com ela (SALAD, SAUCE, SCALE, SHADOW, SHAKE, SHAPE, SHARK, SHARP, SHEEP, SHEET, SHELL, SHIFT, SHINE, SHIRT, SHORE, SHORT, SKILL, SLICE, SMALL, SMART, SMILE, SMOKE, SNACK, SOLID, SOUND, SOUTH, SPACE, SPARE, SPARK, SPEAK, SPELL, SPEND, SPLIT, SPOON, STAFF, STAGE, STAMP, STAND, START, STEAM, STEEL, STICK, STILL, STONE, STORE, STORM, STORY, STUDY, STYLE, SUGAR, SUPER). Os encontros SH-, SK-, SM-, SN-, SP- e ST- transformam as aberturas com S em uma paisagem de dezenas de famílias — por isso aberturas célebres como SLATE e SAUCE testam o S no primeiro palpite.",
      ends:
        "Aqui está a armadilha mais famosa do Wordle: embora S seja a letra mais comum no jogo, quase nenhuma resposta TERMINA com ela — menos de 1% — porque a lista oficial exclui plurais. O lusófono reconhece o reflexo: o plural português também termina em S (CASAS, MENINOS) — e no Wordle esse instinto leva ao erro. As S-finais são poucas: CHAOS, CIRCUS, FOCUS, GUESS, GLASS, CROSS, BONUS. Um S amarelo quase sempre aponta a primeira casa — teste aberturas com S em vez de pluralizar. No Scrabble inglês, S vale 1 ponto (quatro peças); CHAOS (10) e FOCUS (10) são valiosas, e BONUS (7) é a ironia desta página.",
    },
    t: {
      title: "palavras com T, o titã das terminações",
      starts:
        "T é uma abertura de frequência média — cerca de 3% das respostas do Wordle começam com ela (TABLE, TASTE, TEACH, THANK, THEIR, THERE, THESE, THICK, THING, THINK, THIRD, THOSE, THUMB, TIGER, TIGHT, TIRED, TITLE, TODAY, TOKEN, TOPIC, TOTAL, TOUCH, TOWER, TOXIC, TRACE, TRACK, TRAIN, TREAT, TREND, TRICK, TRUCK, TRUST, TRUTH, TWICE, TWIST). O encontro TH- domina as aberturas com T (THANK, THEIR, THERE, THICK, THING), com TR- (TRACK, TRAIN, TRUST) logo atrás. T é a quinta letra mais comum do jogo, então palpites com T carregam alta cobertura — mas o verdadeiro poder da letra mora no FINAL das respostas.",
      ends:
        "T é a terceira terminação mais comum — cerca de 8% das respostas — em quatro famílias: -HT (BRIGHT, FIGHT, LIGHT, NIGHT, RIGHT, SIGHT, TIGHT), -NT (FRONT, PLANT, PRINT, SAINT, SPENT, WANT), -ST (FEAST, GHOST, TOAST, TRUST, TWIST, WORST) e -RT (SMART, SPORT, START). A família -IGHT sozinha é o melhor conjunto de rimas de cinco letras do inglês — um GHT verde desbloqueia cinco respostas de uma vez. Um T verde na quinta casa e uma lista curta de vogais colapsam os candidatos rápido. No Scrabble inglês, T vale 1 ponto (seis peças); FIGHT (11) e LIGHT (9) valem o cofre.",
    },
    u: {
      title: "palavras com U, a vogal escondida",
      starts:
        "U é a abertura vocálica mais rara — menos de 1% das respostas do Wordle começam com ela (UNCLE, UNION, UNTIL, UPPER, URBAN, UPSET, USHER, UTTER). O conjunto é minúsculo: o inglês quase nunca inicia palavras com U — no português, ao contrário, UVA, URSO e UNHA mostram a vogal abrindo palavras com naturalidade. O habitat real do U são as casas dois e três (BUILD, GUILT, HOUSE, SOUND, WOULD). O padrão QU- é a moradia mais comum: toda palavra com Q tranca um U atrás de si, então um Q verde torna o U automático. ADIEU posiciona U na quarta casa, e AUDIO também o cobre.",
      ends:
        "Menos de 1% das respostas terminam em U — efetivamente zero, porque o inglês nativo não fabrica palavras de cinco letras com U final. Trate o U-final como exclusão: um U amarelo marca as casas dois a quatro, mais comumente a três (BUILD, GUILT, HOUSE, MOUTH). As formas -UE (DUE, VALUE, VENUE) costumam despachar o E para a quinta casa e deixam o U no miolo. No Scrabble inglês, U vale 1 ponto (quatro peças), mas as palavras em QU cavalgam os 10 pontos do Q: QUERY (16) e QUOTA (14) são as campeãs de dupla função — o conhecimento sobre U é o pedágio para desbloqueá-las.",
    },
    v: {
      title: "palavras com V, a especialista do miolo",
      starts:
        "V é uma das letras mais raras do Wordle — menos de 0,5% das respostas começam com ela (VAGUE, VALID, VALUE, VENOM, VIDEO, VINYL, VIPER, VIRAL, VIRUS, VISIT, VITAL, VIVID, VODKA). Surpresa para o lusófono: em português, palavras começadas com V são abundantes (VIDA, VENTO, VILA); no Wordle, são arremessos de longo alcance com prêmio de elite — um V verde estreita o campo para o clube enxuto acima. O duplo V de VIVID é a joia da lista — a única palavra comum do inglês com V dobrado — e as formas vocálicas (VALID, VALUE, VODKA) são ótimas jogadas de Scrabble.",
      ends:
        "Zero respostas terminam em V — nenhuma, na lista oficial. O inglês nativo não fabrica palavras de cinco letras com V final (lav e rev são truncamentos). Use isso como dado estrutural: um V amarelo só pode marcar as casas um a quatro, e na prática um a três (VIDEO, GIVEN, RIVAL, COVER, HOVER, OLIVE). A família -IVE (ALIVE, DRIVE, OLIVE, GIVE) é o padrão mais produtivo do V e posiciona a letra na quarta casa. No Scrabble inglês, V vale 4 pontos (duas peças no saco); VIVID (13) e VODKA (13) são respostas premium de dupla função — joias cruzadas para o cofre.",
    },
    w: {
      title: "palavras com W e o padrão WH",
      starts:
        "W é uma abertura moderada — cerca de 3% das respostas começam com ela (WAGON, WASTE, WATCH, WATER, WHEAT, WHEEL, WHERE, WHICH, WHILE, WHITE, WIDOW, WOMAN, WORLD, WORTH, WOULD, WRITE, WRONG). O encontro WH- é a assinatura da letra (WHEAT, WHEEL, WHERE, WHICH, WHILE, WHITE, WHOLE, WHOSE), seguido pelo W mudo da família WR- (WRIST, WRITE, WRONG, WROTE) — o segundo conjunto de letra muda do inglês, depois do KN-. Para o lusófono, o W é sempre um estranho: em português, só aparece em empréstimos (WEB, SHOW, WIFI). Um palpite com W testa dois padrões de uma vez: um W cinza elimina as famílias WH- e WR- inteiras.",
      ends:
        "Cerca de 2% das respostas terminam em W — quase sempre pelo ditongo -OW: BELOW, ELBOW, THROW, ALLOW, ARROW, mais uma curta lista de monossílabos. O conjunto realista de finais cabe na memória: BELOW, ELBOW, THROW, ALLOW, ARROW. Um W verde na quinta casa com dica de O aponta para -OW na hora, e as duas ou três letras da frente viram o núcleo pesquisável. No Scrabble inglês, W vale 4 pontos (duas peças no saco); THROW (11) e ELBOW (10) são respostas fortes de dupla função, e ARROW (8) é a final de três vogais que surpreende qualquer suporte.",
    },
    x: {
      title: "palavras com X, a chave da exclusão",
      starts:
        "X jamais abre respostas do Wordle — zero, em toda a lista. Palavras de cinco letras do inglês começadas com X são transliterações (XYLEM, XEBEC) que nunca aparecem como respostas. Esse zero é a estratégia: X é uma letra puramente interior, então um X amarelo marca as casas três a cinco (TOXIC, BOXER, HELIX, INDEX, MAXIM, RELAX). Testar X é um movimento de exclusão: um X cinza elimina de uma vez as famílias -AX, -EX, -IX e -OX — valor de elite no fim da partida. As formas -EX e -AX (INDEX, RELAX, HELIX, BORAX) são os habitats genuínos da letra e merecem uma sonda deliberada.",
      ends:
        "Um punhado minúsculo de respostas termina em X — menos de 0,5%, pelas famílias -AX e -EX (RELAX e algumas raridades). Finais em X são tão escassos que confirmar a letra no fim — sobretudo cinza — encerra a caça -AX/-EX num movimento só. Um X verde na quinta casa com dica vocálica faz de RELAX a favorita esmagadora. No Scrabble inglês, X vale 8 pontos (uma única peça, a mais rara ao lado do J), então RELAX (12) e TOXIC (14) são respostas premium de dupla função — e HELIX (17) é a joia da coroa das palavras com X: arquive-a no cofre.",
    },
    y: {
      title: "palavras com Y, a surpresa do final",
      starts:
        "Y quase nunca abre respostas do Wordle — menos de 0,25% (YACHT, YEAST, YIELD, YOUNG, YOUTH). O conjunto é minúsculo, então um Y verde na primeira casa aponta direto para os cinco candidatos. Para o lusófono, a letra é duplamente estranha: o Y não existe em palavras nativas do português (só em empréstimos como PYJAMA), mas é onipresente no inglês. O habitat real do Y é duplo: consoante no FINAL das respostas (HAPPY, FUNNY, HEAVY) e vogal interior (MYTH, RHYME, LYMPH, CRYPT, LYNX). Essa dupla função é a armadilha da letra — distinguir os papéis é habilidade de meio de jogo.",
      ends:
        "Y é a segunda terminação mais comum — cerca de 9% das respostas — pelas famílias -LY, -NY, -RY e -TY: ANGRY, DAILY, DIRTY, DIZZY, EARLY, EMPTY, FAIRY, FORTY, FUNNY, FUZZY, HAPPY, HEAVY, HURRY, JUICY, LUCKY, NASTY, PARTY, RUSTY, SALTY, SILLY, SIXTY, SORRY, SPICY, STICKY, TASTY, WEARY. O conjunto é gigante — treine por par consonantal (P-Y, T-Y, R-Y, L-Y), porque um Y final confirmado mais uma consoante costuma completar a palavra. O português, aliás, quase não termina palavras em Y. No Scrabble inglês, Y vale 4 pontos (duas peças); FUZZY (29!) e DIZZY (27) são monstros — entre as maiores pontuações de todo o Wordle.",
    },
    z: {
      title: "palavras com Z, a eliminação final",
      starts:
        "Z é a letra mais rara do Wordle ao lado do J e do Q — poucas respostas a contêm, e as aberturas se resumem a ZEBRA, ZESTY e alguns empréstimos. Um Z verde na primeira casa quase resolve o jogo: ZEBRA é a favorita. O padrão de duplo Z é a assinatura da letra (PIZZA, FUZZY, DIZZY) — um Z amarelo com dica vocálica aponta direto para a família ZZ. Aviso: FELIZ, RAPAZ e LUZ provam que o português termina em Z — no Wordle, o Z vive no miolo. Como as aberturas nunca testam Z, confirmá-la custa um palpite deliberado — e a lista de candidatos colapsa na hora.",
      ends:
        "Quase nenhuma resposta termina em Z — a contagem é efetivamente zero: o inglês nativo não fabrica finais em Z, e até BLITZ fica fora da lista de respostas. Use estruturalmente: um Z amarelo marca posições interiores, mais comumente o duplo Z nas casas três ou quatro (PIZZA, FUZZY, DIZZY). A família ZZ é o conjunto de estudo: PIZZA (24 pontos!), FUZZY (29) e DIZZY (27) são as três respostas comuns de maior pontuação de todo o Wordle — monstros genuínos de Scrabble para o cofre. Um Z cinza elimina o clube ZZ inteiro mais as terminações -ZE num movimento só: eliminação de elite no fim da partida.",
    },
  },
};
