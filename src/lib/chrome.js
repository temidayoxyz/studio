/* Site chrome — one header, one footer, shared by every page. */

import { $, esc } from './dom.js'
import { icons, brandGlyph } from './icons.js'
import { verifiedLong, SOURCE } from '../data/studio.js'

const BASE = import.meta.env.BASE_URL || '/'
const href = (p) => new URL(p, new URL(BASE, location.origin)).pathname

const NAV = [
  { key: 'index', label: 'The index', path: 'index.html' },
  { key: 'method', label: 'Method', path: 'method.html' },
]

function headerMarkup(active) {
  const links = NAV.map(
    (item) => `<li><a class="nav-link" href="${href(item.path)}"${
      item.key === active ? ' aria-current="page"' : ''
    }>${esc(item.label)}</a></li>`,
  ).join('')

  return `
    <div class="shell header-inner">
      <a class="brand" href="${href('index.html')}" aria-label="Studio — the index">
        ${brandGlyph}
        <span class="brand-text">
          <span class="brand-name">Studio</span>
          <span class="brand-sub">Fifty sites</span>
        </span>
      </a>
      <nav class="nav" aria-label="Primary">
        <ul class="nav-list" id="nav-list">${links}
          <li><a class="nav-link nav-link--ext" href="${SOURCE}" target="_blank" rel="noopener">GitHub ${icons.arrowUpRight}</a></li>
        </ul>
        <button class="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-list" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </nav>
    </div>`
}

function footerMarkup() {
  return `
    <div class="shell footer-inner">
      <div class="footer-top">
        <div>
          <a class="brand" href="${href('index.html')}" aria-label="Studio — the index">
            ${brandGlyph}
            <span class="brand-text">
              <span class="brand-name">Studio</span>
              <span class="brand-sub">Fifty sites</span>
            </span>
          </a>
          <p class="footer-tag">Fifty independent websites, each with its own name, palette, type and voice. One brief, one pipeline, no shared stylesheet.</p>
        </div>
        <div class="footer-links">
          <div>
            <h3 class="label">The studio</h3>
            <ul>
              <li><a href="${href('index.html')}">The index</a></li>
              <li><a href="${href('method.html')}">Method</a></li>
            </ul>
          </div>
          <div>
            <h3 class="label">Elsewhere</h3>
            <ul>
              <li><a class="nav-link--ext" href="${SOURCE}" target="_blank" rel="noopener">Source ${icons.arrowUpRight}</a></li>
              <li><a href="${href('index.html')}#index">Jump to the index</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 Studio</span>
        <span><a href="${href('index.html')}#index" title="Every deployment re-checked">All fifty verified live · ${verifiedLong()}</a></span>
        <a href="#top">Back to top ${icons.arrowUpRight}</a>
      </div>
    </div>`
}

export function renderHeader(active = 'index') {
  const host = $('#site-header')
  if (!host) return
  // class="site-header" lives in the HTML so the bar holds its height before this
  // module runs; only the contents are injected here.
  host.dataset.stuck = 'false'
  host.innerHTML = headerMarkup(active)

  if (!$('#nav-scrim')) document.body.insertAdjacentHTML('beforeend', '<div class="nav-scrim" id="nav-scrim"></div>')

  const btn = $('#nav-toggle')
  const scrim = $('#nav-scrim')

  const setOpen = (open) => {
    if (open) document.body.dataset.nav = 'open'
    else document.body.removeAttribute('data-nav')
    btn.setAttribute('aria-expanded', String(open))
    scrim.style.pointerEvents = open ? 'auto' : 'none'
  }

  const close = () => setOpen(false)

  btn.addEventListener('click', () => setOpen(btn.getAttribute('aria-expanded') !== 'true'))
  scrim.addEventListener('click', close)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      close()
      btn.focus()
    }
  })
  // Any navigation closes it.
  host.querySelectorAll('.nav-link').forEach((a) => a.addEventListener('click', close))
  // Never leave a stale open state behind after a resize into the desktop nav.
  matchMedia('(min-width: 46rem)').addEventListener('change', (e) => e.matches && close())

  const onScroll = () => host.dataset.stuck = String(window.scrollY > 8)
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
}

export function renderFooter() {
  const host = $('#site-footer')
  if (!host) return
  host.innerHTML = footerMarkup()
}
