/* Transient confirmations. One live region, polite. */

import { el, $ } from './dom.js'
import { icons } from './icons.js'

let host = null

function ensureHost() {
  if (host?.isConnected) return host
  host = $('#toasts') || document.body.appendChild(el('div', { class: 'toasts', id: 'toasts' }))
  host.setAttribute('role', 'status')
  host.setAttribute('aria-live', 'polite')
  return host
}

export function toast(message, { icon = 'check', duration = 2600 } = {}) {
  const root = ensureHost()
  const node = el('div', { class: 'toast' }, el('span', { html: icons[icon] ?? icons.check }), el('span', { text: message }))
  root.append(node)

  const remove = () => {
    node.dataset.out = 'true'
    node.addEventListener('animationend', () => node.remove(), { once: true })
    setTimeout(() => node.remove(), 400)
  }
  const timer = setTimeout(remove, duration)
  node.addEventListener('click', () => {
    clearTimeout(timer)
    remove()
  })
  return remove
}

export async function copyText(value) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
      return true
    }
  } catch {
    /* fall through to the legacy path */
  }
  // Legacy fallback for non-secure contexts.
  try {
    const ta = el('textarea', { style: { position: 'fixed', top: '-1000px', opacity: '0' } })
    ta.value = value
    document.body.append(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  } catch {
    return false
  }
}
