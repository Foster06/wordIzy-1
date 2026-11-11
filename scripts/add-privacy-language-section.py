#!/usr/bin/env python3
"""Add a 'Language and Region Detection' section to the privacy policy in all
9 language blocks of src/components/i18n/translations.ts, and bump each
privacy block's lastUpdated date to November 11, 2026.

Discloses the new edge-based language negotiation (Accept-Language + geo
country header, in-memory only, never stored) introduced with the /de/, /fr/,
… localized subpaths, plus the functional wordizy-lang cookie/localStorage.

Idempotent: exits without changes if the section already exists.
"""
from pathlib import Path
import sys

F = Path("src/components/i18n/translations.ts")
LANG_ORDER = ["en", "fr", "es", "de", "it", "pt", "nl", "ja", "zh"]

SECTIONS = {
    "en": ("Language and Region Detection",
           "To display wordIzy in your preferred language, our hosting platform reads your browser's language preference (the Accept-Language header) and, when available, the country associated with your IP address at the network edge. This detection happens in memory for a single request; it is not stored in any database, and it is never used for tracking, profiling, or advertising. If your country's language is not supported, the site is shown in English. Your explicit language choice is saved locally on your device (the functional 'wordizy-lang' cookie and local storage, kept for up to 12 months) so we do not need to re-detect it. You can change the language at any time using the language selector, or clear the saved preference through your browser settings."),
    "fr": ("Détection de la langue et de la région",
           "Pour afficher wordIzy dans votre langue préférée, notre plateforme d'hébergement lit la préférence de langue de votre navigateur (l'en-tête Accept-Language) et, le cas échéant, le pays associé à votre adresse IP au niveau du réseau. Cette détection a lieu en mémoire pour une seule requête ; elle n'est stockée dans aucune base de données et n'est jamais utilisée à des fins de suivi, de profilage ou de publicité. Si la langue de votre pays n'est pas prise en charge, le site s'affiche en anglais. Votre choix explicite de langue est enregistré localement sur votre appareil (le cookie fonctionnel 'wordizy-lang' et le stockage local, conservés jusqu'à 12 mois) afin de ne pas avoir à la détecter de nouveau. Vous pouvez changer de langue à tout moment via le sélecteur de langue, ou effacer la préférence enregistrée dans les paramètres de votre navigateur."),
    "es": ("Detección de idioma y región",
           "Para mostrar wordIzy en tu idioma preferido, nuestra plataforma de alojamiento lee la preferencia de idioma de tu navegador (la cabecera Accept-Language) y, cuando está disponible, el país asociado a tu dirección IP en el borde de la red. Esta detección se realiza en memoria para una sola solicitud; no se almacena en ninguna base de datos y nunca se utiliza para seguimiento, perfilado ni publicidad. Si el idioma de tu país no está disponible, el sitio se muestra en inglés. Tu elección explícita de idioma se guarda localmente en tu dispositivo (la cookie funcional 'wordizy-lang' y el almacenamiento local, hasta 12 meses) para no tener que detectarla de nuevo. Puedes cambiar el idioma en cualquier momento con el selector de idioma, o borrar la preferencia guardada en la configuración de tu navegador."),
    "de": ("Sprach- und Regionserkennung",
           "Um wordIzy in deiner bevorzugten Sprache anzuzeigen, liest unsere Hosting-Plattform die Sprachpräferenz deines Browsers (den Accept-Language-Header) und, sofern verfügbar, das deiner IP-Adresse zugeordnete Land am Netzwerkrand. Diese Erkennung erfolgt im Arbeitsspeicher für eine einzelne Anfrage; sie wird in keiner Datenbank gespeichert und niemals für Tracking, Profilbildung oder Werbung verwendet. Wird die Sprache deines Landes nicht unterstützt, erscheint die Seite auf Englisch. Deine explizite Sprachwahl wird lokal auf deinem Gerät gespeichert (der funktionale Cookie 'wordizy-lang' und der lokale Speicher, bis zu 12 Monate), damit wir sie nicht erneut ermitteln müssen. Du kannst die Sprache jederzeit über die Sprachauswahl ändern oder die gespeicherte Präferenz in den Browsereinstellungen löschen."),
    "it": ("Rilevamento di lingua e regione",
           "Per mostrare wordIzy nella tua lingua preferita, la nostra piattaforma di hosting legge la preferenza linguistica del browser (l'intestazione Accept-Language) e, se disponibile, il paese associato al tuo indirizzo IP al bordo della rete. Questo rilevamento avviene in memoria per una singola richiesta; non viene conservato in alcun database e non è mai usato per tracciamento, profilazione o pubblicità. Se la lingua del tuo paese non è supportata, il sito viene mostrato in inglese. La tua scelta esplicita della lingua viene salvata localmente sul dispositivo (il cookie funzionale 'wordizy-lang' e l'archiviazione locale, fino a 12 mesi) per non doverla rilevare di nuovo. Puoi cambiare lingua in qualsiasi momento tramite il selettore della lingua, oppure cancellare la preferenza salvata nelle impostazioni del browser."),
    "pt": ("Detecção de idioma e região",
           "Para mostrar o wordIzy no seu idioma preferido, nossa plataforma de hospedagem lê a preferência de idioma do seu navegador (o cabeçalho Accept-Language) e, quando disponível, o país associado ao seu endereço IP na borda da rede. Essa detecção acontece na memória para uma única solicitação; não é armazenada em banco de dados e nunca é usada para rastreamento, perfilagem ou publicidade. Se o idioma do seu país não é oferecido, o site é exibido em inglês. Sua escolha explícita de idioma fica salva localmente no seu dispositivo (o cookie funcional 'wordizy-lang' e o armazenamento local, por até 12 meses) para não ser necessário detectá-la novamente. Você pode trocar o idioma a qualquer momento no seletor de idiomas, ou apagar a preferência salva nas configurações do navegador."),
    "nl": ("Taal- en regiodetectie",
           "Om wordIzy in jouw voorkeurstaal te tonen, leest ons hostingplatform de taalvoorkeur van je browser (de Accept-Language-header) en, indien beschikbaar, het land dat aan je IP-adres is gekoppeld aan de rand van het netwerk. Deze detectie gebeurt in het geheugen voor één enkel verzoek; ze wordt niet in een database opgeslagen en wordt nooit gebruikt voor tracking, profiling of advertenties. Wordt de taal van jouw land niet ondersteund, dan wordt de site in het Engels weergegeven. Je expliciete taalkeuze wordt lokaal op je apparaat opgeslagen (de functionele 'wordizy-lang'-cookie en lokale opslag, maximaal 12 maanden) zodat we deze niet opnieuw hoeven te detecteren. Je kunt de taal op elk moment wijzigen via de taalkiezer, of de opgeslagen voorkeur wissen via de instellingen van je browser."),
    "ja": ("言語と地域の判定",
           "wordIzyをお好みの言語で表示するため、当社のホスティングプラットフォームはブラウザの言語設定（Accept-Languageヘッダー）と、利用可能な場合はネットワークエッジでIPアドレスに関連付けられた国を参照します。この判定は単一のリクエストに対してメモリ上で行われ、データベースに保存されず、トラッキング・プロファイリング・広告に使用されることはありません。お住まいの国の言語がサポートされていない場合、サイトは英語で表示されます。明示的な言語選択は、再判定を避けるためデバイスのローカルに保存されます（機能性Cookie「wordizy-lang」とローカルストレージ、最大12か月）。言語は言語セレクターからいつでも変更でき、保存された設定はブラウザの設定から削除できます。"),
    "zh": ("语言与地区检测",
           "为了以您的首选语言显示wordIzy，我们的托管平台会读取浏览器的语言偏好（Accept-Language标头），并在可用时读取网络边缘与您的IP地址相关联的国家/地区信息。该检测仅在内存中针对单个请求进行，不会存储到任何数据库中，也绝不会用于跟踪、画像或广告。如果您所在国家/地区的语言不受支持，网站将以英语显示。您的明确语言选择会保存在设备本地（功能性“wordizy-lang”Cookie和本地存储，最长保留12个月），以便无需重复检测。您可以随时通过语言选择器更改语言，或在浏览器设置中清除已保存的偏好。"),
}

DATE_REPLACEMENTS = [
    ("October 30, 2026", "November 11, 2026"),            # en
    ("30 octobre 2026", "11 novembre 2026"),               # fr
    ("30 de octubre de 2026", "11 de noviembre de 2026"),  # es
    ("30. Oktober 2026", "11. November 2026"),             # de
    ("30 ottobre 2026", "11 novembre 2026"),               # it
    ("30 de outubro de 2026", "11 de novembro de 2026"),   # pt
    ("30 oktober 2026", "11 november 2026"),               # nl
    ("10月30日", "11月11日"),                               # ja
    ("10 月 30 日", "11 月 11 日"),                          # zh (spaced)
]

text = F.read_text(encoding="utf-8")
if "Language and Region Detection" in text:
    print("Section already present — nothing to do.")
    sys.exit(0)

lines = text.split("\n")

en_start = next(i for i, l in enumerate(lines) if l.startswith("const en: Translation"))
privacy_starts = [i for i, l in enumerate(lines) if i > en_start and l == " privacy: {"]
terms_starts = [i for i, l in enumerate(lines) if i > en_start and l == " terms: {"]
assert len(privacy_starts) == 9, f"expected 9 privacy blocks, found {len(privacy_starts)}"
assert len(terms_starts) == 9, f"expected 9 terms blocks, found {len(terms_starts)}"
# The blocks alternate privacy → terms within each language object.
for k in range(9):
    assert privacy_starts[k] < terms_starts[k], "privacy must precede terms in each language"
for k in range(8):
    assert terms_starts[k] < privacy_starts[k + 1], "language order broken"

out = lines[: privacy_starts[0]]
inserted = dated = 0
for k in range(9):
    lang = LANG_ORDER[k]
    heading, body = SECTIONS[lang]
    start, end = privacy_starts[k], terms_starts[k]

    section_done = False
    for l in lines[start:end]:
        if "lastUpdated:" in l:
            new_l = l
            for old, new in DATE_REPLACEMENTS:
                new_l = new_l.replace(old, new)
            if new_l != l:
                dated += 1
            l = new_l
        if l.strip() == "sections: [" and not section_done:
            out.append(l)
            out.append("   {")
            out.append(f'    heading: "{heading}",')
            out.append(f'    body: "{body}",')
            out.append("   },")
            section_done = True
            inserted += 1
        else:
            out.append(l)

    # Everything between this privacy block and the next one (terms + the rest
    # of this language object) passes through unchanged. For the last language,
    # emit the remainder of the file.
    next_boundary = privacy_starts[k + 1] if k < 8 else len(lines)
    out.extend(lines[end:next_boundary])

F.write_text("\n".join(out), encoding="utf-8")
print(f"Inserted {inserted}/9 sections, updated {dated}/9 privacy lastUpdated dates.")
assert inserted == 9 and dated == 9, "incomplete transformation — check the file!"
