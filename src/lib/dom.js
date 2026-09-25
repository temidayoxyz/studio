/* Tiny DOM helpers. No framework, no dependencies. */

export const $ = (sel, root = document) => root.querySelector(sel)

export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag)
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined || v === false) continue
    if (k === 'class') node.className = v
    else if (k === 'html') node.innerHTML = v
    else if (k === 'text') node.textContent = v
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v)
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v)
    else if (k === 'dataset') Object.assign(node.dataset, v)
    else node.setAttribute(k, v === true ? '' : String(v))
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue
    node.append(c.nodeType ? c : document.createTextNode(String(c)))
  }
  return node
}

/** Escape for safe interpolation into HTML strings. */
export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c])

export function debounce(fn, wait = 160) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
}

/** Hold the page still behind a modal without shifting the layout. */
export function lockScroll(on) {
  document.body.classList.toggle('is-locked', on)
}
