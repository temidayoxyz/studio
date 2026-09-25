/* The project sheet — a native <dialog> so focus, Escape and inert come for free. */

import { $, esc, lockScroll } from './dom.js'
import { icons } from './icons.js'
import { markHTML } from './mark.js'
import { copyText, toast } from './toast.js'
import { verifiedLong } from '../data/studio.js'

let dlg = null
let scroll = null
let lastFocus = null

function build() {
  if (dlg) return
  dlg = document.createElement('dialog')
  dlg.className = 'sheet'
  dlg.id = 'project-sheet'
  dlg.setAttribute('aria-labelledby', 'sheet-title')
  dlg.innerHTML = `
    <div class="sheet-grab" aria-hidden="true"></div>
    <div class="sheet-scroll">
      <div class="sheet-hero" id="sheet-hero">
        <button class="sheet-close" type="button" data-close aria-label="Close">
          ${icons.close}
        </button>
        <span id="sheet-mark"></span>
        <div>
          <p class="sheet-eyebrow" id="sheet-eyebrow"></p>
          <h2 class="sheet-title" id="sheet-title"></h2>
        </div>
      </div>
      <div class="sheet-body">
        <p class="sheet-blurb" id="sheet-blurb"></p>

        <div class="sheet-block">
          <h3 class="label">Set in</h3>
          <div class="type-specimen" id="sheet-specimen"><p></p></div>
        </div>

        <dl class="spec-list" id="sheet-specs"></dl>

        <div class="sheet-block">
          <h3 class="label">Live at</h3>
          <div class="url-box">
            <span id="sheet-url"></span>
            <button class="btn btn--quiet" type="button" id="sheet-copy">Copy</button>
          </div>
        </div>

        <div class="sheet-actions">
          <a class="btn btn--primary" id="sheet-visit" target="_blank" rel="noopener">
            Visit the site
            <span class="btn-arrow" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>`
  document.body.append(dlg)

  scroll = dlg.querySelector('.sheet-scroll')
  dlg.querySelector('[data-close]').addEventListener('click', () => dlg.close('dismiss'))
  // Click on the backdrop (i.e. outside the panel) closes.
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg) dlg.close('dismiss')
  })
  dlg.addEventListener('close', () => {
    lockScroll(false)
    lastFocus?.focus()
  })

  dlg.querySelector('#sheet-copy').addEventListener('click', onCopy)
}

async function onCopy(e) {
  // currentTarget is null once the handler yields, so read it before awaiting
  const button = e.currentTarget
  const addr = dlg.querySelector('#sheet-url').textContent
  const ok = await copyText(addr)
  toast(ok ? 'Address copied' : 'Copy failed — select it manually', { icon: ok ? 'check' : 'info' })
  button?.blur()
}

/**
 * @param {object} project  a row from the index
 * @param {string} href     its live URL
 */
export function openSheet(project, href) {
  build()
  const addr = href
  dlg.style.setProperty('--a', project.lit)
  dlg.style.setProperty('--a-deep', project.deep)

  dlg.querySelector('#sheet-mark').innerHTML = markHTML(project, { size: '3.25rem' })
  dlg.querySelector('#sheet-eyebrow').innerHTML =
    `<span>Nº ${String(project.n).padStart(2, '0')}</span><span>·</span><span>${esc(project.discipline)}</span>`
  const title = dlg.querySelector('#sheet-title')
  title.textContent = project.name
  title.dataset.face = project.face
  dlg.querySelector('#sheet-blurb').textContent = project.blurb

  const spec = dlg.querySelector('#sheet-specimen p')
  spec.textContent = project.name
  spec.dataset.face = project.face

  const rows = [
    ['Discipline', esc(project.discipline)],
    ['Based in', project.place ? esc(project.place) : 'Remote'],
    [
      'Palette',
      `<span class="swatches">
         <span class="swatch" style="background:${project.deep}"></span>
         <span class="swatch" style="background:${project.brand}"></span>
         <span class="swatch" style="background:${project.lit}"></span>
       </span><span class="visually-hidden">deep, brand and light tones</span>`,
    ],
    ['Status', `<span class="status status--on-ink">Live · checked ${verifiedLong()}</span>`],
  ]
  dlg.querySelector('#sheet-specs').innerHTML = rows
    .map(([k, v]) => `<div class="spec-row"><dt>${k}</dt><dd>${v}</dd></div>`)
    .join('')

  dlg.querySelector('#sheet-url').textContent = addr.replace(/^https?:\/\//, '')
  const visit = dlg.querySelector('#sheet-visit')
  visit.href = addr
  visit.setAttribute('aria-label', `Visit ${project.name} — opens in a new tab`)

  lastFocus = document.activeElement
  lockScroll(true)
  dlg.showModal()
  scroll.scrollTop = 0
  dlg.querySelector('[data-close]').focus({ preventScroll: true })
}

export const isSheetOpen = () => !!dlg?.open
