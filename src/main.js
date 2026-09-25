// The stylesheet is linked from each page's <head> (see index.html) so the browser
// discovers it during the initial parse and blocks the first paint on it. Importing
// it here instead would defer it until this module runs — i.e. after the first paint.
import { renderHeader, renderFooter } from './lib/chrome.js'
import { initReveal, ready } from './lib/motion.js'

/** Every page: chrome first, then page behaviour, then entrance choreography. */
export function boot(page) {
  renderHeader(page)
  renderFooter()
  initReveal()
  ready()
}
