#!/usr/bin/env python3
"""Generate the Jekyll publications collection from _bibliography/references.bib."""

from __future__ import annotations

import json
import re
import shutil
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BIB_PATH = ROOT / "_bibliography" / "references.bib"
OUTPUT_DIR = ROOT / "_publications"
MONTHS = {name: index for index, name in enumerate(
    ("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"), 1)}


def balanced_entries(source: str):
    """Yield (type, key, body) tuples while respecting nested BibTeX braces."""
    cursor = 0
    while match := re.search(r"@(\w+)\s*\{\s*([^,]+)\s*,", source[cursor:], re.I):
        entry_type, key = match.group(1).lower(), match.group(2).strip()
        body_start = cursor + match.end()
        depth, quoted, escaped = 1, False, False
        for position in range(body_start, len(source)):
            char = source[position]
            if char == '"' and not escaped:
                quoted = not quoted
            if not quoted:
                if char == "{": depth += 1
                elif char == "}":
                    depth -= 1
                    if depth == 0:
                        yield entry_type, key, source[body_start:position]
                        cursor = position + 1
                        break
            escaped = char == "\\" and not escaped
            if char != "\\": escaped = False
        else:
            raise ValueError(f"Unclosed BibTeX entry: {key}")


def fields_from(body: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    position = 0
    while position < len(body):
        match = re.search(r"([A-Za-z][\w-]*)\s*=\s*", body[position:])
        if not match: break
        name = match.group(1).lower()
        start = position + match.end()
        if body[start:start + 1] in {'"', "{"}:
            opener = body[start]
            closer = '"' if opener == '"' else "}"
            depth, escaped, end = (0 if opener == '"' else 1), False, start + 1
            while end < len(body):
                char = body[end]
                if opener == '"' and char == '"' and not escaped: break
                if opener == "{":
                    if char == "{": depth += 1
                    elif char == "}":
                        depth -= 1
                        if depth == 0: break
                escaped = char == "\\" and not escaped
                if char != "\\": escaped = False
                end += 1
            value, position = body[start + 1:end], end + 1
        else:
            end = body.find(",", start)
            if end < 0: end = len(body)
            value, position = body[start:end].strip(), end + 1
        fields[name] = clean_latex(value)
    return fields


def clean_latex(value: str) -> str:
    value = re.sub(r"\s+", " ", value).strip()
    value = value.replace("---", "—").replace("--", "–")
    value = value.replace("``", "“").replace("''", "”")
    value = value.replace(r"\_", "_").replace(r"\&", "&")
    return value.replace("{", "").replace("}", "")


def slugify(value: str) -> str:
    value = unicodedata.normalize("NFKD", value).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def author_list(raw: str) -> str:
    names = []
    for author in raw.split(" and "):
        if "," in author:
            family, given = (part.strip() for part in author.split(",", 1))
            names.append(f"{given} {family}")
        else:
            names.append(author.strip())
    if len(names) == 1: return names[0]
    if len(names) == 2: return " and ".join(names)
    return ", ".join(names[:-1]) + ", and " + names[-1]


def citation(entry_type: str, data: dict[str, str]) -> str:
    authors = author_list(data["author"])
    title = data["title"]
    venue = data.get("journal") or data.get("booktitle") or data.get("school") or data.get("publisher", "")
    details = venue
    if volume := data.get("volume"):
        details += f" {volume}"
        if number := data.get("number"): details += f"({number})"
    if pages := data.get("pages"): details += f": {pages}"
    label = "Doctoral thesis" if entry_type == "misc" and data.get("school") else details
    return f"{authors} ({data['year']}). “{title}.” {label}.".replace("  ", " ")


def render(entry_type: str, key: str, data: dict[str, str]) -> tuple[str, str]:
    missing = {field for field in ("title", "author", "year") if not data.get(field)}
    if missing: raise ValueError(f"{key}: missing required fields: {', '.join(sorted(missing))}")
    month = MONTHS.get(data.get("month", "").lower(), 1)
    date = f"{int(data['year']):04d}-{month:02d}-01"
    slug = slugify(data["title"])
    venue = data.get("journal") or data.get("booktitle") or data.get("school") or data.get("publisher", "Unpublished")
    doi = data.get("doi", "")
    url = f"https://doi.org/{doi}" if doi else ""
    kind = "Thesis" if entry_type == "misc" and data.get("school") else "Journal article" if entry_type == "article" else "Book chapter"
    frontmatter = {
        "title": data["title"], "collection": "publications", "permalink": f"/publication/{date}-{slug}",
        "date": date, "venue": venue, "authors": author_list(data["author"]), "type": kind,
        "citation": citation(entry_type, data), "doi": doi, "paperurl": url,
    }
    lines = ["---"] + [f"{name}: {json.dumps(value, ensure_ascii=False)}" for name, value in frontmatter.items() if value] + ["---", ""]
    lines += [f"{frontmatter['authors']}. **{data['title']}**. *{venue}* ({data['year']})."]
    if url: lines += ["", f"[View via DOI]({url})"]
    return f"{date}-{slug}.md", "\n".join(lines) + "\n"


def main() -> None:
    source = BIB_PATH.read_text(encoding="utf-8")
    rendered = [render(kind, key, fields_from(body)) for kind, key, body in balanced_entries(source)]
    if not rendered: raise ValueError("No BibTeX records found")
    if OUTPUT_DIR.exists(): shutil.rmtree(OUTPUT_DIR)
    OUTPUT_DIR.mkdir()
    for filename, content in rendered:
        (OUTPUT_DIR / filename).write_text(content, encoding="utf-8")
    print(f"Generated {len(rendered)} publication records from {BIB_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
