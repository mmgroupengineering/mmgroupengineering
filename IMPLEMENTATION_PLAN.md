# MM Group Engineering — Implementation Plan

Static site for **MM Group Engineering** (ship repair), built with **Eleventy** and **Nunjucks**, deployed to **GitHub Pages**.

**Last updated:** reflects repo `mmgroupengineering/mmgroupengineering`, empty clone ready for first commit.

---

## 1. Goals

| Item | Decision |
|------|----------|
| **Stack** | Eleventy (11ty) + Nunjucks (layouts, includes, loops) |
| **Pages** | Home · About us · Our team · Past projects · Contact us |
| **Team** | Photo + role + short summary only (no CVs, no downloads) |
| **Team layout** | Desktop: alternating rows (image left / image right). Mobile: stacked (image then text) |
| **Past projects** | Data-driven list (JSON) — title, year, description, optional image |
| **Home (below hero)** | Card grid: core **services / capabilities / skills** (or similar) to give the page substance and quick scanning |
| **Brand** | Colours aligned with the **MM Group Engineering** logo (charcoal + muted teal + white); see §7 and `css/styles.css` |
| **Hosting** | GitHub Pages; build with **GitHub Actions** (Node installs Eleventy, publishes build output) |

---

## 2. Repository and URLs

| Item | Value |
|------|--------|
| **Remote** | `https://github.com/mmgroupengineering/mmgroupengineering.git` |
| **GitHub account / org** | `mmgroupengineering` |
| **Repo name** | `mmgroupengineering` (project site, not `*.github.io` repo) |
| **Production URL** | `https://mmgroupengineering.github.io/mmgroupengineering/` |
| **Eleventy `pathPrefix`** | `"/mmgroupengineering/"` (required so assets and internal links work under the subpath) |

**Note:** A site at the domain root only (`https://mmgroupengineering.github.io/` with no path) needs a repo named **`mmgroupengineering.github.io`** under that org. The current repo is correct; the trade-off is the `/mmgroupengineering/` path segment.

---

## 3. Information architecture

1. **Home**
   - **Hero** — Full-width banner (image + company name + tagline).
   - **Intro** — Short paragraph under the hero (who you are, what you do).
   - **CTAs** — Optional buttons/links to Contact and Past projects.
   - **Cards section** — Grid of cards (e.g. 3–6 items) highlighting **services, capabilities, or skill areas** (hull repair, piping, welding, classification support, etc.—copy TBD). Keeps the homepage from feeling empty and mirrors common “what we offer” patterns. Data can live in `_data/services.json` (or `home.json`) and render via Nunjucks loop for easy edits without touching markup.
2. **About us** — Story, ship-repair focus, values, location / certifications (placeholders OK at first).
3. **Our team** — Data from `_data/team.json`; Nunjucks loop; alternating rows; summaries only.
4. **Past projects** — Data from `_data/projects.json`; cards or grid with optional thumbnails.
5. **Contact us** — Address, phone, email; optional map; form via **Formspree** (or similar) or **mailto:** links (pick one when implementing).

---

## 4. Project layout

```
mmgroupengineering/
├── .github/
│   └── workflows/
│       └── deploy.yml          # npm ci, build, deploy to GitHub Pages
├── src/
│   ├── _data/
│   │   ├── site.json           # name, tagline, base URL for meta
│   │   ├── services.json       # home page cards (title + blurb; optional icon)
│   │   ├── team.json
│   │   └── projects.json
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk
│   │   └── partials/
│   │       ├── header.njk
│   │       └── footer.njk
│   ├── index.njk
│   ├── about.njk
│   ├── team.njk
│   ├── projects.njk
│   └── contact.njk
├── css/
│   └── styles.css
├── assets/
│   └── images/                 # logo (PNG), hero, team, project images
├── .eleventy.js
├── .gitignore                  # node_modules, _site (or dist)
├── package.json
├── README.md                   # dev commands, deploy notes
└── IMPLEMENTATION_PLAN.md      # this file
```

- **Output:** e.g. `_site/` or `dist/` — configure Eleventy and point the workflow at that folder.
- **Passthrough:** Copy `css/` and `assets/` into the output unchanged.

---

## 5. Data shapes

### `site.json`

- `name`, `tagline`, `url` (e.g. `https://mmgroupengineering.github.io/mmgroupengineering/`)

### `services.json` (home page cards)

Array of objects for the “skills / services / capabilities” grid, for example:

- `title` — Card heading (e.g. “Hull & structure”).
- `summary` — One or two sentences.
- `icon` — Optional: short label, emoji, or CSS class name for a simple visual (no heavy icon library required for v1).

Implement as a responsive grid (1 col mobile, 2–3 cols desktop), consistent card height or `min-height`, subtle border/shadow to match the rest of the site.

### `team.json`

Array of objects, for example:

- `name`, `role`, `image` (path under `assets/images/`), `summary` (string)

Alternation: `loop.index0 % 2` in Nunjucks, or an explicit `align: "left" | "right"` per row.

### `projects.json`

- `title`, `year`, `description`, `image` (optional)

---

## 6. Nunjucks / Eleventy notes

- **`base.njk`:** HTML shell, `{% block %}` for title and main content, include header/footer.
- **`header.njk`:** Navigation to all five pages; highlight current page via `page.url` (compare with `pathPrefix` in mind).
- **Internal links:** Use Eleventy’s URL filter or a small helper so links work with `pathPrefix` (e.g. `{{ '/about/' | url }}`).
- **No markdown required** for v1; plain strings in JSON are enough. Add a markdown filter later if bios grow.

---

## 7. Brand & styling (logo-aligned palette)

### Logo asset

- Use the official logo (MM monogram + “GROUP ENGINEERING”) on the header and optionally the footer. Prefer **PNG with transparent or white background**, stored as e.g. `assets/images/logo.png` (rename from `static/...` if needed).
- **Alt text:** `MM Group Engineering` (or include “logo” if clearer for screen readers).

### Colour palette (from logo)

Use these as the site’s primary tokens—industrial, maritime, consistent with print branding.

| Token | Role | Hex (approx.) | Usage |
|--------|------|----------------|--------|
| **Charcoal** | Primary text, headings, dark UI | `#2D373C` | Body text, nav, headings, footer |
| **Charcoal alt** | Slightly softer dark | `#354244` | Borders, secondary text if needed |
| **Teal** | Accent (second “M”, waves) | `#608688` | Links hover, buttons, icons, card accents, focus rings |
| **Teal light** | Background tints | `#709193` at ~8–15% opacity, or solid `#e8eef0` mixed | Section bands, card hover |
| **White** | Page background, logo field | `#FFFFFF` | Main background, hero text on dark overlay |
| **Off-white** | Large content areas | `#F4F6F7` | Alternate sections (cool neutral, matches teal-grey) |

Do **not** introduce a competing accent (e.g. gold/orange) unless you later extend the brand; stay on charcoal + teal + neutrals.

### CSS tokens

Canonical values live in **`css/styles.css`** as `:root` variables (`--color-charcoal`, `--color-teal`, etc.). Components should reference variables, not raw hex, so future tweaks stay in one place.

### Typography & layout

- **Headings / logo feel:** Geometric sans similar to the logo (e.g. **Montserrat** bold for headings; **Montserrat** or **Source Sans 3** for body)—clean, modern, matches “GROUP ENGINEERING” lockup.
- **Layout:** Max content width ~1100–1200px; generous spacing.
- **Responsive:** Breakpoints for nav, team rows, project grid, **home service/skill cards**.
- **Hero:** Dark overlay using charcoal (or charcoal at ~75–85% opacity) so white/teal headline text stays readable on top of photography.
- **Home cards:** Teal for small icons or left border; charcoal titles.
- **Accessibility:** Contrast for text vs background (charcoal on off-white passes; teal text only for large/short phrases or UI chrome, not long body copy).
- **Checklist:** Variables + spacing; hero overlay; optional teal underline on section titles; home card hierarchy; semantic headings; teal focus rings; image `alt` text.

---

## 8. Local development

```text
npm install
npm run dev      # eleventy --serve (or equivalent)
npm run build    # production build
```

Ensure local preview can use the same `pathPrefix` as production (Eleventy supports this) so links behave like on GitHub Pages.

---

## 9. GitHub Pages deployment

1. **Source:** `main` (or default branch) holds Eleventy source.
2. **Actions workflow:** Checkout → setup Node → `npm ci` → `npm run build` → upload Pages artifact / deploy (official Pages actions).
3. **Repo settings:** Settings → Pages → source: **GitHub Actions** (when using the workflow), not “branch / docs” unless you change strategy.
4. **First push:** Repository was cloned empty; first commit adds the full project and workflow.

---

## 10. Implementation order

1. **Scaffold** — `package.json`, `@11ty/eleventy`, `.eleventy.js` with `pathPrefix`, passthrough for `css` and `assets`.
2. **Layout** — `base.njk`, header (5 links), footer, global `styles.css` with variables.
3. **Home** — Hero + intro + CTAs + **`services.json` card grid** (skills/services/capabilities).
4. **About** — Static content in `about.njk`.
5. **Team** — `team.json` + `team.njk`, alternating layout, placeholders.
6. **Past projects** — `projects.json` + `projects.njk`.
7. **Contact** — Contact block + form or mailto.
8. **Polish** — Active nav, titles/meta, favicon, alts, mobile checks.
9. **CI** — Add workflow, push, verify live URL under `/mmgroupengineering/`.

---

## 11. Open decisions

| Topic | Options |
|-------|--------|
| **Site language** | English, Bulgarian, or bilingual (affects copy and possibly structure later) |
| **Contact** | Third-party form vs `mailto:` |
| **Images** | Final hero and team photos (replace placeholders when ready) |

---

## 12. Checklist before launch

- [ ] `pathPrefix` matches `/mmgroupengineering/`
- [ ] All internal links work on GitHub Pages (not only locally)
- [ ] README documents clone, `npm install`, `npm run dev`, `npm run build`
- [ ] LICENSE or company notice in footer if needed
