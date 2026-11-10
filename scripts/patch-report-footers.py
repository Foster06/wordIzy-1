#!/usr/bin/env python3
"""Post-process the report docx footers for WPS compatibility.

Per docx skill toc.md:
- Roman-numeral footer (TOC section, marker color 888889) -> PAGE \\* ROMAN \\* MERGEFORMAT
- Arabic footer (body section, marker color 808080)       -> PAGE \\* arabic \\* MERGEFORMAT
- Remove empty <w:pgNumType/> emitted for the cover section.
"""
import re
import shutil
import sys
import zipfile

path = sys.argv[1] if len(sys.argv) > 1 else \
    "/home/z/my-project/download/wordizy-organic-traffic-analysis.docx"

src = zipfile.ZipFile(path, "r")
items = {i.filename: src.read(i.filename) for i in src.infolist()}
src.close()

patched = []
for name in list(items):
    if re.match(r"word/footer\d*\.xml$", name):
        xml = items[name].decode("utf-8")
        if "PAGE" in xml:
            if "888889" in xml:  # Roman marker (TOC section footer)
                new = re.sub(r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
                             r"\1 PAGE \\* ROMAN \\* MERGEFORMAT \2", xml)
                fmt = "ROMAN"
            else:  # body footer
                new = re.sub(r"(<w:instrText[^>]*>)\s*PAGE\s*(</w:instrText>)",
                             r"\1 PAGE \\* arabic \\* MERGEFORMAT \2", xml)
                fmt = "arabic"
            if new != xml:
                items[name] = new.encode("utf-8")
                patched.append((name, fmt))

# Remove empty pgNumType from document.xml (cover section)
docxml = items["word/document.xml"].decode("utf-8")
n_empty = docxml.count("<w:pgNumType/>")
docxml = docxml.replace("<w:pgNumType/>", "")
items["word/document.xml"] = docxml.encode("utf-8")

with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as out:
    for name, data in items.items():
        out.writestr(name, data)

print(f"patched footers: {patched}, removed {n_empty} empty pgNumType")
