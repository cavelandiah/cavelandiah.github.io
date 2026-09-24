# Publication source

`references.bib` is the single source of truth for the Publications tab.

After adding or editing a BibTeX record, run from the repository root:

```bash
python3 scripts/generate_publications.py
```

The dependency-free generator replaces the Markdown files in `_publications/`. Commit both the BibTeX source and generated files. The `generate-publications` GitHub Actions workflow also regenerates and commits the collection whenever `references.bib` or the generator changes on the default branch.

Supported entry types are `article`, `incollection`, `inproceedings`, `book`, `phdthesis`, `mastersthesis`, and `misc`. Include `title`, `author`, and `year`; add `doi` whenever available. Braced acronyms such as `{RNA}` are preserved as plain text in the generated title.
