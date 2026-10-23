# Programming Principles

Languages: [English](README.md) | [Oʻzbek](README.uz.md) | [Русский](README.ru.md) | [Türkçe](README.tr.md) | [العربية](README.ar.md) | [Deutsch](README.de.md) | [Español](README.es.md)

A complete, searchable reference for the principles behind maintainable software: SOLID, DRY, KISS, YAGNI, coupling and cohesion, testing practices, and the laws and aphorisms engineers quote in code review. Each one comes with its history, worked examples and honest tradeoffs.

**Live site:** https://pp.mohirlab.uz

## Features

- 80 pages across six sections: General Principles, SOLID, Pragmatic & Clean Code, Software Architecture, Testing & Quality, and Laws & Aphorisms
- Side-by-side "violates / adheres" code examples, mostly in TypeScript, plus Mermaid diagrams
- English and Uzbek editions
- Full-text local search, light/dark themes, and a remembered code-language preference across pages
- "Copy Markdown" and "Open in ChatGPT / Claude" actions on every page

## Tech Stack

[VitePress](https://vitepress.dev) (Vue 3 + Vite), Mermaid and Lucide icons, deployed to Netlify. [Bun](https://bun.sh) is the package manager and script runner. The site shares its theme with its sibling project, [Design Patterns](https://github.com/otabekoff/design-patterns).

## Quick Start

```bash
bun install
bun run dev        # http://localhost:5173/
```

## Scripts

| Command | What it does |
| --- | --- |
| `bun run dev` | Start the dev server |
| `bun run build` | Build the static site into `.vitepress/dist` (fails on dead links) |
| `bun run preview` | Serve the production build locally |
| `bun run check` | Run the Mermaid and code-sample checks below |
| `bun run check:mermaid` | Parse every Mermaid diagram |
| `bun run check:code` | Syntax-check every code sample (TS/JS via esbuild, Python, Java 21, Go, Rust; missing toolchains are skipped) |
| `bun run check:i18n` | Compare each English page with its Uzbek translation (missing pages, code/diagram drift) |
| `bun run prompts` | Regenerate [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) from the pages' cover scenes |
| `bun run images` | Crop new cover/card PNGs to size, convert them to WebP and generate social images (needs Python + Pillow) |

## Project Structure

```
src/                     # Content (English at the root)
  general/ solid/ pragmatic/ architecture/ testing/ laws/
  uz/                    # Uzbek translation, mirroring the same paths
public/                  # Static assets: covers/, cards/, og/ (social images), placeholders/, logos and icons
.vitepress/
  config/                # Site config, per-locale nav/sidebar (langs/), markdown plugins
  theme/                 # Theme overrides and Vue components (CoverImage, Card, Mermaid, …)
scripts/                 # Content checks, the image pipeline and the prompt list
```

## Writing Content

- Each page starts with frontmatter: `title`, `description` and `icon` (a [Lucide](https://lucide.dev/icons) icon name in PascalCase, shown in the sidebar).
- Under the H1, a `<CoverImage src="/covers/<section>/<page>.webp">` holds a short title and the scene used to generate the cover (1360x850). The `cardPrompt` frontmatter holds the scene for the page's card image (`/cards/<section>/<page>.webp`, 1024x640). Until an image exists, the site shows a placeholder. See [IMAGE_PROMPTS.md](IMAGE_PROMPTS.md) for the workflow.
- Group implementations with `::: code-group` and label tabs, e.g. ` ```ts [❌ Violation] `.
- Diagrams go in ` ```mermaid ` blocks.
- Add new pages to the sidebar in `.vitepress/config/langs/en.ts` and `uz.ts`.
- Translations live at the same path under `src/uz/`. Keep code blocks identical to English (comments may be translated).

## Deployment

Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml): content checks, the VitePress build, then `netlify deploy --prod` to pp.mohirlab.uz. Pull requests run the same checks and build without deploying. The old GitHub Pages URL redirects every path to the new domain.

The workflow needs two repository secrets: `NETLIFY_AUTH_TOKEN` (a Netlify personal access token) and `NETLIFY_SITE_ID`.

## Support

If you find this project useful, consider supporting it: https://taps.uz/uzhandy

## Contributing

Contributions are welcome: open an issue or a pull request. Please run `bun run check` and `bun run build` before submitting.

## License

[MIT](LICENSE) © 2025-present Otabek Sadiridinov
