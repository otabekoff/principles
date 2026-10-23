// Checks that every internal sidebar/nav link in .vitepress/config/langs/*.ts points at an existing page.
// `vitepress build` only verifies links inside Markdown, so a sidebar entry for an untranslated page
// (e.g. /uz/core-concepts) would otherwise ship as a 404.
//
// Usage: node scripts/check-sidebar.mjs
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const LANGS = path.join(ROOT, '.vitepress', 'config', 'langs')
let failures = 0, checked = 0

for (const file of fs.readdirSync(LANGS).filter((f) => f.endsWith('.ts'))) {
  const source = fs.readFileSync(path.join(LANGS, file), 'utf8')
  for (const [, link] of source.matchAll(/link:\s*'(\/[^'#?]*)/g)) {
    checked++
    const page = link.replace(/\/$/, '/index').replace(/^\//, '')
    if (!fs.existsSync(path.join(ROOT, 'src', `${page}.md`))) {
      console.log(`✗ ${file}: ${link} has no page (src/${page}.md)`)
      failures++
    }
  }
}

console.log(`Checked ${checked} sidebar/nav link(s), ${failures} broken.`)
process.exit(failures ? 1 : 0)
