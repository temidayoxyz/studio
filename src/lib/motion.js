/* Motion — purposeful only. Everything here respects prefers-reduced-motion. */

const rm = window.matchMedia('(prefers-reduced-motion: reduce)')

export const reduced = () => rm.matches

/** Scroll-triggered entrance for [data-reveal] elements. */
export function initReveal(root = document) {
  const items = Array.from(root.querySelectorAll('[data-reveal]'))
  if (!items.length) return

  if (reduced() || !('IntersectionObserver' in window)) {
    items.forEach((n) => (n.dataset.in = 'true'))
    return
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.dataset.in = 'true'
        io.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  )
  items.forEach((n) => io.observe(n))
}

/** Stagger helper: sets --rd on each child so one CSS rule does the work. */
export function stagger(nodes, step = 55, max = 12) {
  Array.from(nodes).forEach((n, i) => n.style.setProperty('--rd', `${Math.min(i, max) * step}ms`))
}

/**
 * FLIP: measure, mutate, then animate from the old positions.
 * @param {HTMLElement} container element whose children are [data-flip]
 * @param {() => void} mutate reorder the DOM
 */
export function flip(container, mutate) {
  if (reduced()) {
    mutate()
    return
  }
  const items = Array.from(container.children)
  const first = new Map()
  for (const node of items) {
    if (node.dataset.flip === 'state') continue
    first.set(node, node.getBoundingClientRect())
  }

  mutate()

  for (const node of items) {
    if (node.dataset.flip === 'state') continue
    const a = first.get(node)
    if (!a || !node.isConnected) continue
    const b = node.getBoundingClientRect()
    const dy = a.top - b.top
    if (Math.abs(dy) < 1) continue
    node.animate(
      [{ transform: `translateY(${dy}px)` }, { transform: 'none' }],
      { duration: 420, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
    )
  }
}

/** Count a number up when it scrolls into view. */
export function initCounters(root = document) {
  const nodes = Array.from(root.querySelectorAll('[data-count]'))
  if (!nodes.length) return

  const run = (node) => {
    const to = Number(node.dataset.count)
    const prefix = node.dataset.prefix || ''
    const suffix = node.dataset.suffix || ''
    if (reduced()) {
      node.textContent = prefix + to + suffix
      return
    }
    const dur = 900
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min(1, (now - start) / dur)
      const eased = 1 - (1 - t) ** 3
      node.textContent = prefix + Math.round(to * eased) + suffix
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(run)
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        run(e.target)
        io.unobserve(e.target)
      }
    },
    { threshold: 0.4 },
  )
  nodes.forEach((n) => io.observe(n))
}

/** Page-load choreography: mark the document ready so CSS entrance states can fire. */
export function ready() {
  requestAnimationFrame(() => document.documentElement.classList.add('is-ready'))
}
