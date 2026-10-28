"""Extract the supplied furniture PDF photography and copy for the catalog.

Requires pypdf and Pillow. Run from the frontend directory.
"""

import io
import json
import re
from pathlib import Path

from PIL import Image
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public/wetransfer_furnatures_2026-10-27_1234/FURNATURES"
IMAGES = ROOT / "public/products"
DATA = ROOT / "src/features/products/products-data.json"
CATEGORIES = [
    ("BAR STOOL", "Bar stools", "bar-stools"),
    ("DINING CHAIR", "Dining chairs", "dining-chairs"),
    ("DINING TABLE", "Dining tables", "dining-tables"),
    ("SOFA", "Sofas & lounge", "sofas-lounge"),
    ("COFFEE TABLE", "Coffee tables", "coffee-tables"),
    ("BED SIDETABLE", "Bedside tables", "bedside-tables"),
    ("CONSOLE", "Consoles", "consoles"),
    ("DISPLAY SHELVES", "Display shelves", "display-shelves"),
    ("POUFFE", "Pouffes", "pouffes"),
    ("TV UNIT,", "TV units", "tv-units"),
    ("WARDROBE", "Wardrobes", "wardrobes"),
    (".", "Upholstered beds", "upholstered-beds"),
]


def order(path):
    match = re.search(r"\b([23])\b", path.stem)
    return (int(match.group(1)) if match else 1, path.name.lower())


def clean(value):
    return re.sub(r"\s+", " ", value.replace("�", "").replace("sc.ulptural", "sculptural")).strip()


def main():
    IMAGES.mkdir(parents=True, exist_ok=True)
    DATA.parent.mkdir(parents=True, exist_ok=True)
    categories = []
    for folder, label, slug in CATEGORIES:
        items = []
        for number, pdf in enumerate(sorted((SOURCE / folder).glob("*.pdf"), key=order), 1):
            page = PdfReader(pdf).pages[0]
            lines = [clean(line) for line in page.extract_text().splitlines() if clean(line)]
            title_start = next((i for i, line in enumerate(lines) if line.startswith("The ")), 1)
            description_start = next((i for i, line in enumerate(lines) if line.startswith(("Featuring", "Defined", "Inspired", "Sculpted"))), 3)
            description_end = next((i for i in range(description_start + 1, len(lines)) if lines[i].isupper()), len(lines))
            title = clean(" ".join(lines[title_start:description_start])).rstrip(" .")
            title = title.replace("Boucl Lounge", "Bouclé Lounge")
            description = clean(" ".join(lines[description_start:description_end])).replace("boucl upholstery", "bouclé upholstery")
            image = Image.open(io.BytesIO(page.images[0].data)).convert("RGB")
            # The source photography has a printed PDF text panel in its upper 40%.
            # The lower 60% is a clean 4:3 landscape product photograph.
            crop_top = 0.43 if slug == "consoles" else 0.4
            image = image.crop((0, round(image.height * crop_top), image.width, image.height))
            target_width = round(image.height * 4 / 3)
            left = (image.width - target_width) // 2
            image = image.crop((left, 0, left + target_width, image.height))
            image.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
            image_name = f"{slug}-{number:02d}-photo.webp"
            image.save(IMAGES / image_name, "WEBP", quality=82, method=6)
            items.append({"title": title, "description": description, "image": f"/products/{image_name}"})
        categories.append({"title": label, "slug": slug, "items": items})
    DATA.write_text(json.dumps(categories, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Prepared {sum(len(category['items']) for category in categories)} products in {len(categories)} categories")


if __name__ == "__main__":
    main()
