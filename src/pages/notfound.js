import { boot } from '../main.js'
import { $, esc } from '../lib/dom.js'
import { markHTML } from '../lib/mark.js'
import { hueOf } from '../lib/color.js'

boot('404')

/* A dead end that still shows the work: the same wall, linking straight out. */
async function load() {
  try {
    const { PROJECTS, url } = await import('../data/projects.js')
    const byHue = [...PROJECTS].sort((a, b) => hueOf(a.lit) - hueOf(b.lit) || a.n - b.n)
    $('#wall-grid').innerHTML = byHue
      .map(
        (p) => `<a class="wall-tile" href="${url(p)}" target="_blank" rel="noopener" style="--a:${p.lit}"
                  aria-label="${esc(p.name)} — ${esc(p.discipline)}, opens in a new tab">${markHTML(p, { size: '100%' })}</a>`,
      )
      .join('')
    $('#wall').hidden = false
  } catch (err) {
    console.error('[studio] 404 wall failed to load', err)
  }
}

load()
