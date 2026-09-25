/* The mark — a monogram tile. One component, six treatments, four specimen faces. */

const STOP = new Set(['the', 'of', 'and', 'a'])

export function initials(name) {
  const words = name.split(/[\s&·—–]+/).filter(Boolean)
  const meaningful = words.filter((w) => !STOP.has(w.toLowerCase()))
  if (meaningful.length >= 2) return (meaningful[0][0] + meaningful[1][0]).toUpperCase()
  return (meaningful[0] ?? name).slice(0, 2).toUpperCase()
}

/**
 * @param {{name:string, mark:string, lit:string}} project
 * @param {{size?:string, tone?:'ink'|'paper'}} opts
 */
export function markHTML(project, opts = {}) {
  const { size, tone = 'ink' } = opts
  const vars = []
  if (size) vars.push(`--mark-size:${size}`)
  if (tone === 'paper') vars.push('--a:var(--a-deep)', '--mark-bg:var(--paper-3)', '--mark-line:var(--rule)')
  const style = vars.length ? ` style="${vars.join(';')}"` : ''
  return `<span class="mark" data-t="${project.mark}"${style} aria-hidden="true"><span class="mark__letters">${initials(project.name)}</span></span>`
}
