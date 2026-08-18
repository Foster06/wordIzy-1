#!/usr/bin/env python3
"""Process the wordIzy logo: strip white background and emit all favicon sizes."""

import os
import sys
from pathlib import Path
from PIL import Image, ImageChops

SOURCE = Path("/home/z/my-project/upload/logo.png")
DEST = Path("/home/z/my-project/wordIzy-1/public")

SIZES = {
    "logo.png": (512, 512),
    "icon-512.png": (512, 512),
    "icon-192.png": (192, 192),
    "apple-touch-icon.png": (180, 180),
    "favicon-32.png": (32, 32),
    "favicon-16.png": (16, 16),
    "og-image.png": (1200, 1200),
}

def strip_white_bg(img: Image.Image) -> Image.Image:
    """Remove near-white background by treating white as transparent."""
    if img.mode != "RGBA":
        img = img.convert("RGBA")
    data = img.getdata()
    new_data = []
    for r, g, b, a in data:
        # treat near-white pixels as transparent (threshold 240)
        if r >= 240 and g >= 240 and b >= 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append((r, g, b, a))
    img.putdata(new_data)
    # Auto-crop empty borders
    bg = Image.new("RGBA", img.size, (0, 0, 0, 0))
    diff = ImageChops.difference(img, bg)
    bbox = diff.getbbox()
    if bbox:
        img = img.crop(bbox)
    return img

def main():
    if not SOURCE.exists():
        print(f"ERROR: source logo not found at {SOURCE}", file=sys.stderr)
        sys.exit(1)
    DEST.mkdir(parents=True, exist_ok=True)
    img = Image.open(SOURCE)
    img = strip_white_bg(img)
    for name, (w, h) in SIZES.items():
        out = img.resize((w, h), Image.LANCZOS)
        target = DEST / name
        out.save(target, format="PNG", optimize=True)
        print(f"wrote {target} ({w}x{h})")

    # Build favicon.ico (multi-size: 16, 32, 48)
    ico_sizes = [(16, 16), (32, 32), (48, 48)]
    ico_imgs = [img.resize(s, Image.LANCZOS) for s in ico_sizes]
    ico_path = DEST / "favicon.ico"
    ico_imgs[0].save(ico_path, format="ICO", sizes=ico_sizes, append_images=ico_imgs[1:])
    print(f"wrote {ico_path}")

if __name__ == "__main__":
    main()
