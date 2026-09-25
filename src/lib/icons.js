/* Icon set — 1.5px stroke, 16px grid, single source of truth. */

const svg = (paths, size = 16) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`

export const icons = {
  arrowUpRight: svg('<path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6"/>'),
  close: svg('<path d="m4 4 8 8M12 4l-8 8"/>'),
  check: svg('<path d="m3 8.4 3.2 3.2L13 4.8"/>'),
  info: svg('<circle cx="8" cy="8" r="6.2"/><path d="M8 7.4v3.6M8 5.2h.01"/>'),
  compass: svg('<circle cx="8" cy="8" r="6.2"/><path d="m10.4 5.6-1.3 3.5-3.5 1.3 1.3-3.5 3.5-1.3Z"/>'),
}

/** The studio mark: fifty dots would be too fine — twenty-five, with a slash. */
export const brandGlyph = `
<svg class="brand-mark" viewBox="0 0 25 25" fill="none" aria-hidden="true">
  ${Array.from({ length: 25 }, (_, i) => {
    const r = Math.floor(i / 5)
    const c = i % 5
    const on = r + c === 4
    return `<circle cx="${2.5 + c * 5}" cy="${2.5 + r * 5}" r="${on ? 1.85 : 1.25}" fill="${on ? 'var(--brand)' : 'currentColor'}" opacity="${on ? 1 : 0.26}"/>`
  }).join('')}
</svg>`
