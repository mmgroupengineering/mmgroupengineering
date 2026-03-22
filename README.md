# MM Group Engineering — website

Static site built with [Eleventy](https://www.11ty.dev/) and [Nunjucks](https://mozilla.github.io/nunjucks/). Deploys to GitHub Pages.

## Local setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:8080/mmgroupengineering/`).

## Build

```bash
npm run build
```

Output is written to `_site/`.

## Deploy

1. Push to the `main` branch.
2. In the repo on GitHub: **Settings → Pages**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. The workflow in `.github/workflows/pages.yml` builds and publishes `_site`.

Production URL (this repo): `https://mmgroupengineering.github.io/mmgroupengineering/`

## Content

| What | Where |
|------|--------|
| Site name, contact fields, hero image | `src/_data/site.json` |
| Home “What we offer” cards | `src/_data/services.json` |
| Team | `src/_data/team.json` |
| About (copy, banner, anchors, CTA) | `src/_data/about.json` · `src/about.njk` |
| Services (home strip + detail page) | `src/_data/services.json` · `src/services.njk` |
| Logo in header | `static/logo.png` (copied to the site root as `/static/logo.png`) |

## Logo

Put your PNG at **`static/logo.png`**. Eleventy copies the whole `static/` folder into `_site/static/`. The header in `src/_includes/partials/header.njk` references that file.
