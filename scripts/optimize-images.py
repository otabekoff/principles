"""Crops public/covers and public/cards PNGs to their exact frame size, converts them to WebP,
and builds 1200x630 JPEG social images for covers.

Usage: python scripts/optimize-images.py   (requires Pillow)
"""
from pathlib import Path
from PIL import Image, ImageOps

PUBLIC = Path(__file__).resolve().parent.parent / "public"
SIZE = {"covers": (1360, 850), "cards": (1024, 1024)}  # 16:10 covers and square cards, as on design-patterns
OG_SIZE = (1200, 630)


def to_rgb(im: Image.Image) -> Image.Image:
    return im.convert("RGBA" if im.mode in ("P", "LA", "RGBA") and "transparency" in im.info or im.mode == "RGBA" else "RGB")


def convert(png: Path, size: tuple[int, int]) -> Image.Image:
    # Generators rarely hit an exact size, so centre-crop to the frame's ratio, then scale
    im = ImageOps.fit(to_rgb(Image.open(png)), size, Image.LANCZOS)
    im.save(png.with_suffix(".webp"), "WEBP", quality=82, method=6)
    return im


def og_image(im: Image.Image, out: Path) -> None:
    """Center-crops to the 1.91:1 ratio social cards expect."""
    im = im.convert("RGB")
    target = OG_SIZE[0] / OG_SIZE[1]
    if im.width / im.height > target:
        w = round(im.height * target)
        im = im.crop(((im.width - w) // 2, 0, (im.width - w) // 2 + w, im.height))
    else:
        h = round(im.width / target)
        im = im.crop((0, (im.height - h) // 2, im.width, (im.height - h) // 2 + h))
    out.parent.mkdir(parents=True, exist_ok=True)
    im.resize(OG_SIZE, Image.LANCZOS).save(out, "JPEG", quality=80, optimize=True, progressive=True)


def main() -> None:
    for folder, size in SIZE.items():
        if not (PUBLIC / folder).exists():
            continue
        for png in sorted((PUBLIC / folder).rglob("*.png")):
            im = convert(png, size)
            if folder == "covers":
                og_image(im, PUBLIC / "og" / png.relative_to(PUBLIC / "covers").with_suffix(".jpg"))
            print("ok", png.relative_to(PUBLIC))


if __name__ == "__main__":
    main()
