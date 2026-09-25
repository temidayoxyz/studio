import { boot } from '../main.js'
import { $, esc, debounce } from '../lib/dom.js'
import { icons } from '../lib/icons.js'
import { markHTML } from '../lib/mark.js'
import { openSheet, isSheetOpen } from '../lib/sheet.js'
import { flip, stagger } from '../lib/motion.js'
import { hueOf } from '../lib/color.js'

boot('index')

/* ── state ──────────────────────────────────────────────────────────────── */

const state = { q: '', discipline: 'all', sort: 'n' }

const grid = $('#index-grid')
const wallGrid = $('#wall-grid')
const wallCount = $('#wall-count')
const chipRow = $('#chips')
const countOut = $('#result-count')
const search = $('#search')
const sortSel = $('#sort')

let projects = []
let catalog = null
let built = 0
const cardCache = new Map()
const tileCache = new Map()

/* ── helpers ────────────────────────────────────────────────────────────── */

const cmp = {
  n: (a, b) => a.n - b.n,
  az: (a, b) => a.name.localeCompare(b.name, 'en'),
  place: (a, b) => (a.place ?? '￿').localeCompare(b.place ?? '￿', 'en') || a.n - b.n,
}

const haystack = (p) => `${p.name} ${p.discipline} ${p.place ?? ''} ${p.blurb}`.toLowerCase()

function matches(p) {
  if (state.discipline !== 'all' && p.discipline !== state.discipline) return false
  if (!state.q) return true
  return state.q.split(/\s+/).every((t) => haystack(p).includes(t))
}

const isFiltered = () => state.q !== '' || state.discipline !== 'all' || state.sort !== 'n'

/* ── card & tile factories ──────────────────────────────────────────────── */

function buildCard(p) {
  const node = document.createElement('article')
  node.className = 'card'
  node.id = `card-${p.slug}`
  node.dataset.slug = p.slug
  node.dataset.reveal = ''
  node.style.setProperty('--a', p.lit)
  node.style.setProperty('--a-deep', p.deep)
  if (built < 12) node.style.setProperty('--rd', `${built * 45}ms`)
  built++

  node.innerHTML = `
    <div class="card-top">
      <span class="card-no">Nº ${String(p.n).padStart(2, '0')}</span>
      ${markHTML(p, { size: '2rem' })}
    </div>
    <h3 class="card-name" data-face="${p.face}">${esc(p.name)}</h3>
    <p class="card-meta">${p.place ? esc(p.place) : esc(p.discipline)}</p>
    <p class="card-blurb">${esc(p.blurb)}</p>
    <div class="card-foot">
      <span class="card-cta">Open site <span aria-hidden="true">${icons.arrowUpRight}</span></span>
      <button class="card-more" type="button" aria-haspopup="dialog" aria-label="More about ${esc(p.name)}">
        Details
      </button>
    </div>
    <a class="card-hit" href="${catalog.url(p)}" target="_blank" rel="noopener"
       aria-label="${esc(p.name)} — ${esc(p.discipline)}, opens in a new tab"></a>`

  node.querySelector('.card-more').addEventListener('click', (e) => {
    e.preventDefault()
    openSheet(p, catalog.url(p))
  })
  return node
}

const getCard = (p) => {
  let node = cardCache.get(p.slug)
  if (!node) {
    node = buildCard(p)
    cardCache.set(p.slug, node)
  }
  return node
}

function buildTile(p) {
  const a = document.createElement('a')
  a.className = 'wall-tile'
  a.href = `#card-${p.slug}`
  a.dataset.slug = p.slug
  a.dataset.reveal = ''
  a.style.setProperty('--a', p.lit)
  a.dataset.self = String(p.n === 50)
  a.innerHTML = markHTML(p, { size: '100%' })
  a.setAttribute('aria-label', `${p.name} — nº ${p.n}, ${p.discipline}`)
  // The anchor does the navigating — no preventDefault — so the URL updates and the
  // jump still works with JavaScript off. All we add is the attention flash.
  a.addEventListener('click', () => {
    const card = document.getElementById(`card-${p.slug}`)
    if (!card) return
    card.dataset.flash = 'off'
    void card.offsetWidth // force a reflow so the animation can restart
    card.dataset.flash = 'true'
    clearTimeout(a._t)
    a._t = setTimeout(() => delete card.dataset.flash, 1600)
  })
  return a
}

/* ── render ─────────────────────────────────────────────────────────────── */

function stateNode(kind) {
  const isError = kind === 'error'
  const node = document.createElement('div')
  node.className = `state${isError ? ' state--error' : ''}`
  node.dataset.flip = 'state'
  node.innerHTML = isError
    ? `<span class="state-mark">${icons.info}</span>
       <h3>The index didn&rsquo;t load</h3>
       <p>The project data could not be fetched. Nothing is wrong with the fifty sites — only this page.</p>
       <div class="state-actions">
         <button class="btn btn--primary" type="button" data-retry>Try again</button>
         <a class="btn btn--ghost" href="/studio/method.html">Read the method</a>
       </div>`
    : `<span class="state-mark">${icons.compass}</span>
       <h3>Nothing matches that</h3>
       <p>No project in the index answers to that combination of words and filters.</p>
       <div class="state-actions"><button class="btn btn--primary" type="button" data-reset>Clear the filters</button></div>`
  return node
}

function showSkeleton() {
  grid.innerHTML = Array.from(
    { length: 8 },
    () => '<div class="skel" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>',
  ).join('')
}

function buildChips() {
  const counts = new Map()
  for (const p of projects) counts.set(p.discipline, (counts.get(p.discipline) ?? 0) + 1)

  const btn = (value, label, n, extra = '') =>
    `<button class="chip${extra}" type="button" data-value="${esc(value)}" aria-pressed="false">${esc(
      label,
    )}${n === null ? '' : `<span class="chip__n">${n}</span>`}</button>`

  chipRow.innerHTML = [
    btn('__reset__', 'Clear', null, ' chip-reset'),
    btn('all', 'Everything', projects.length),
    ...catalog.DISCIPLINES.map((d) => btn(d, d, counts.get(d) ?? 0)),
  ].join('')

  chipRow.querySelectorAll('button').forEach((b) =>
    b.addEventListener('click', () => {
      if (b.dataset.value === '__reset__') reset()
      else {
        state.discipline = b.dataset.value
        apply()
      }
    }),
  )
}

/* Only the pressed state changes on filter — the buttons themselves must survive
   so keyboard focus is never thrown away mid-interaction. */
function syncChips() {
  for (const b of chipRow.children) {
    const v = b.dataset.value
    if (v === '__reset__') b.hidden = !isFiltered()
    else b.setAttribute('aria-pressed', String(state.discipline === v))
  }
}

function reset() {
  state.q = ''
  state.discipline = 'all'
  state.sort = 'n'
  search.value = ''
  sortSel.value = 'n'
  apply()
}

function apply() {
  const list = projects.filter(matches).sort(cmp[state.sort])

  flip(grid, () => {
    if (!list.length) {
      const s = stateNode('empty')
      s.querySelector('[data-reset]').addEventListener('click', reset)
      grid.replaceChildren(s)
    } else {
      grid.replaceChildren(...list.map(getCard))
    }
  })
  for (const c of grid.children) if (c.classList.contains('card')) observe(c)

  const n = list.length
  countOut.innerHTML = isFiltered()
    ? `<b>${n}</b> of ${projects.length} shown`
    : `<b>${n}</b> project${n === 1 ? '' : 's'}`

  let shown = 0
  for (const p of projects) {
    const on = matches(p)
    tileCache.get(p.slug).dataset.hidden = String(!on)
    if (on) shown++
  }
  wallCount.textContent = shown === projects.length ? `${projects.length} marks` : `${shown} of ${projects.length} marks`

  syncChips()
}

/* ── reveal observer for dynamically created cards ──────────────────────── */

let io = null
function observe(node) {
  if (node.dataset.in === 'true') return
  if (!io) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.dataset.in = 'true'
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
    )
  }
  io.observe(node)
}

/* ── boot ───────────────────────────────────────────────────────────────── */

async function load() {
  grid.setAttribute('aria-busy', 'true')
  showSkeleton()
  try {
    catalog = await import('../data/projects.js')
    projects = catalog.PROJECTS

    // the wall, sorted by hue so the fifty read as one spectrum
    const byHue = [...projects].sort((a, b) => hueOf(a.lit) - hueOf(b.lit) || a.n - b.n)
    for (const p of byHue) tileCache.set(p.slug, buildTile(p))
    wallGrid.replaceChildren(...byHue.map((p) => tileCache.get(p.slug)))
    stagger(wallGrid.children, 8, 50)
    byHue.forEach((p) => observe(tileCache.get(p.slug)))

    buildChips()
    reset()
    grid.setAttribute('aria-busy', 'false')
  } catch (err) {
    console.error('[studio] index data failed to load', err)
    grid.replaceChildren(stateNode('error'))
    grid.querySelector('[data-retry]')?.addEventListener('click', load)
    wallCount.textContent = 'unavailable'
    grid.setAttribute('aria-busy', 'false')
  }
}

/* ── wiring ─────────────────────────────────────────────────────────────── */

const onSearch = debounce(() => {
  state.q = search.value.trim().toLowerCase()
  apply()
}, 140)

search.addEventListener('input', onSearch)
search.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && search.value) {
    e.preventDefault()
    search.value = ''
    state.q = ''
    apply()
  }
})

sortSel.addEventListener('change', () => {
  state.sort = sortSel.value
  apply()
})

document.addEventListener('keydown', (e) => {
  if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
  const t = e.target
  if (t instanceof Element && t.closest('input, textarea, select, [contenteditable]')) return
  if (isSheetOpen()) return
  e.preventDefault()
  search.focus()
  search.select()
})

load()
