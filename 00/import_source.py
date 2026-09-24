"""Import visible slide artwork and editable text from a source PPTX.

Usage: python3 00/import_source.py /path/to/source.pptx
The source deck is intentionally not committed to this public repository.
"""

from __future__ import annotations

import json
import posixpath
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from zipfile import ZipFile


NS = {
    "p": "http://schemas.openxmlformats.org/presentationml/2006/main",
    "a": "http://schemas.openxmlformats.org/drawingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
    "rel": "http://schemas.openxmlformats.org/package/2006/relationships",
}
EMU_W = 9_144_000
EMU_H = 5_143_500
OUT = Path(__file__).resolve().parent


def tag(node: ET.Element) -> str:
    return node.tag.rsplit("}", 1)[-1]


def rectangle(node: ET.Element) -> dict[str, float] | None:
    transform = node.find("./p:spPr/a:xfrm", NS)
    if transform is None:
        return None
    offset = transform.find("a:off", NS)
    extent = transform.find("a:ext", NS)
    if offset is None or extent is None:
        return None
    return {
        "x": round(int(offset.get("x", "0")) / EMU_W * 100, 5),
        "y": round(int(offset.get("y", "0")) / EMU_H * 100, 5),
        "w": round(int(extent.get("cx", "0")) / EMU_W * 100, 5),
        "h": round(int(extent.get("cy", "0")) / EMU_H * 100, 5),
    }


def color_and_alpha(node: ET.Element | None) -> tuple[str | None, float]:
    if node is None:
        return None, 1.0
    color = node.find("a:srgbClr", NS)
    if color is None:
        return None, 1.0
    alpha = color.find("a:alpha", NS)
    return "#" + color.get("val", "000000"), (int(alpha.get("val", "100000")) / 100_000 if alpha is not None else 1.0)


def text_style(run_props: ET.Element | None, default_props: ET.Element | None) -> dict:
    props = run_props if run_props is not None else default_props
    if props is None:
        return {}
    color, _ = color_and_alpha(props.find("a:solidFill", NS))
    latin = props.find("a:latin", NS)
    return {
        "size": int(props.get("sz", "3200")) / 100,
        "bold": props.get("b") == "1",
        "italic": props.get("i") == "1",
        "color": color or "#F5E6D3",
        "font": latin.get("typeface", "Georgia") if latin is not None else "Georgia",
    }


def paragraphs(shape: ET.Element) -> list[dict]:
    result = []
    for paragraph in shape.findall("./p:txBody/a:p", NS):
        properties = paragraph.find("a:pPr", NS)
        default = properties.find("a:defRPr", NS) if properties is not None else None
        runs = []
        for item in paragraph:
            if tag(item) in ("r", "fld"):
                value = item.find("a:t", NS)
                if value is not None and value.text:
                    runs.append({"text": value.text, **text_style(item.find("a:rPr", NS), default)})
            elif tag(item) == "br":
                runs.append({"text": "\n", **text_style(None, default)})
        if runs:
            result.append({"align": properties.get("algn", "l") if properties is not None else "l", "runs": runs})
    return result


def slide_relationships(archive: ZipFile, number: int) -> dict[str, str]:
    xml = archive.read(f"ppt/slides/_rels/slide{number}.xml.rels")
    root = ET.fromstring(xml)
    return {item.get("Id", ""): item.get("Target", "") for item in root}


def main(source: Path) -> None:
    assets = OUT / "assets"
    assets.mkdir(parents=True, exist_ok=True)
    slides = []
    with ZipFile(source) as archive:
        numbers = sorted(
            int(match.group(1))
            for name in archive.namelist()
            if (match := re.fullmatch(r"ppt/slides/slide(\d+)\.xml", name))
        )
        for number in numbers:
            root = ET.fromstring(archive.read(f"ppt/slides/slide{number}.xml"))
            relationships = slide_relationships(archive, number)
            background, _ = color_and_alpha(root.find("./p:cSld/p:bg/p:bgPr/a:solidFill", NS))
            slide = {"number": number, "background": background or "#1A1A1A", "elements": []}
            tree = root.find("./p:cSld/p:spTree", NS)
            if tree is None:
                raise ValueError(f"Slide {number} has no shape tree")
            for element in tree:
                kind = tag(element)
                if kind == "pic":
                    box = rectangle(element)
                    blip = element.find("./p:blipFill/a:blip", NS)
                    if box is None or blip is None:
                        continue
                    relationship = blip.get("{" + NS["r"] + "}embed", "")
                    target = relationships[relationship]
                    media = posixpath.normpath(posixpath.join("ppt/slides", target))
                    extension = Path(media).suffix.lower()
                    filename = f"slide-{number:02d}{extension}"
                    (assets / filename).write_bytes(archive.read(media))
                    opacity = blip.find("a:alphaModFix", NS)
                    slide["elements"].append({"type": "image", "box": box, "src": "assets/" + filename, "opacity": int(opacity.get("amt", "100000")) / 100_000 if opacity is not None else 1.0})
                elif kind == "sp":
                    box = rectangle(element)
                    if box is None:
                        continue
                    text = paragraphs(element)
                    fill, opacity = color_and_alpha(element.find("./p:spPr/a:solidFill", NS))
                    if fill:
                        slide["elements"].append({"type": "rectangle", "box": box, "color": fill, "opacity": opacity})
                    if text:
                        body = element.find("./p:txBody/a:bodyPr", NS)
                        slide["elements"].append({"type": "text", "box": box, "paragraphs": text, "anchor": body.get("anchor", "t") if body is not None else "t"})
            slides.append(slide)
    if len(slides) != 30:
        raise ValueError(f"Expected 30 source slides, found {len(slides)}")
    (OUT / "slides.js").write_text(
        "window.CORAZON_SLIDES = " + json.dumps(slides, ensure_ascii=False, separators=(",", ":")) + ";\n",
        encoding="utf-8",
    )
    print(f"Imported {len(slides)} slides and {len(list(assets.iterdir()))} original images")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 00/import_source.py /path/to/source.pptx")
    main(Path(sys.argv[1]))
