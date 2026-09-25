/* Colour helpers shared by the index and the 404 wall. */

/** Perceptual-ish hue in degrees, 0–360. Used to lay the wall out as a spectrum. */
export function hueOf(hex) {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const mx = Math.max(r, g, b)
  const mn = Math.min(r, g, b)
  const d = mx - mn
  if (!d) return 0
  const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4
  return ((h * 60) % 360 + 360) % 360
}
