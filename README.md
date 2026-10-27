# Think in 360° project website

An English static project page built only from the paper and its appendix.
There is no framework, build-time JavaScript dependency, analytics, external
font, or third-party CDN requirement.

## Preview

From this directory:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000`.

## Update the paper content

From the manuscript repository root, compile the paper and extract assets:

```bash
bash build_paper.sh
python website/build_assets.py --paper build/iclr2027_conference.pdf
```

The extraction script requires PyMuPDF and Pillow. It reads the paper's main
results table and all three qualitative TeX cards, keeps the complete reasoning
traces, renders the original figures for the web, and copies the compiled paper
PDF. Model scores are never obtained from a separate experiment directory.

### Content sources

| Website content | Manuscript source |
| --- | --- |
| Title, authors, abstract | Paper title block and abstract |
| Benchmark description and statistics | PanoVideoBench section |
| Corpus description and statistics | PanoVideoCoT statistics section |
| Twelve-model comparison, six metrics | Main-results table |
| Diagnostic results | Performance radar figure |
| Three questions, options, frames, answers, complete reasoning | Appendix qualitative cards |
| All scientific illustrations | Existing paper figures, without new scientific artwork |

## Resource links

`site-config.js` contains the Hugging Face URLs for PanoVideoBench,
PanoVideoCoT, and PanoVideoReasoner under `lulidong`. Access follows each
repository's visibility settings. Code and arXiv links remain unset until
their URLs are available. The paper button uses the included PDF. To use an
arXiv landing page for that button, replace `paperUrl` with its verified URL.

## Deploy

Serve this directory with GitHub Pages or any static web host. Preserve the
relative file structure. Only `index.html`, `styles.css`, `app.js`,
`site-config.js`, and `assets/` are needed for deployment. Do not upload the
manuscript repository, raw data, model weights, or local build directories.

The website uses a conventional white academic-project layout, the original
logo extracted from the teaser, a plain numerical comparison table, keyboard
accessible example tabs, and expandable full reasoning traces. Mobile layouts
and reduced-motion preferences are supported. Layout references were Nerfies
and DreamFusion; no external template code or artwork was copied.
