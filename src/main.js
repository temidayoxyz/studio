import './style.css'

/* ── Studio — shared header, footer ── */

const NAV_ITEMS = [
  { key: 'index', label: 'The index', href: 'index.html' },
  { key: 'about', label: 'Method', href: 'about.html' },
]

export function renderHeader(activeKey) {
  const host = document.getElementById('site-header')
  if (!host) return
  const list = NAV_ITEMS
    .map(
      (item) =>
        `<li><a href="/studio/${item.href}" class="${item.key === activeKey ? 'active' : ''}" ${item.key === activeKey ? 'aria-current="page"' : ''}>${item.label}</a></li>`
    )
    .join('')

  host.innerHTML = `
    <div class="header-inner">
      <a class="brand" href="/studio/index.html" aria-label="Studio — home">
        <span class="brand-mark">S</span>
        <span class="brand-name">Studio<sup>The Index</sup></span>
      </a>
      <nav class="nav" aria-label="Main navigation">
        <ul class="nav-list" id="navList">
          ${list}
        </ul>
        <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="navList" aria-label="Toggle menu">
          <span class="bar"></span><span class="bar"></span><span class="bar"></span>
        </button>
      </nav>
    </div>
  `

  const btn = host.querySelector('#menuBtn')
  const listEl = host.querySelector('#navList')
  const body = document.body

  const close = () => {
    listEl.classList.remove('open')
    btn.classList.remove('open')
    btn.setAttribute('aria-expanded', 'false')
    body.style.overflow = ''
  }

  btn.addEventListener('click', () => {
    const open = listEl.classList.toggle('open')
    btn.classList.toggle('open', open)
    btn.setAttribute('aria-expanded', String(open))
    body.style.overflow = open ? 'hidden' : ''
  })

  listEl.querySelectorAll('a').forEach((a) => a.addEventListener('click', close))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && listEl.classList.contains('open')) close()
  })

  const onScroll = () => host.classList.toggle('scrolled', window.scrollY > 30)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

export function renderFooter() {
  const host = document.getElementById('site-footer')
  if (!host) return
  host.innerHTML = `
    <div class="footer-inner">
      <div class="footer-top">
        <div class="footer-brand">
          <a class="brand" href="/studio/index.html" aria-label="Studio — home">
            <span class="brand-mark">S</span>
            <span class="brand-name">Studio<sup>The Index</sup></span>
          </a>
          <p class="footer-tag">The Autonomous Premium Web Studio — fifty independent sites, each with its own brand, design system and voice. Built, tested and live.</p>
        </div>
        <div class="footer-cols">
          <div class="footer-col">
            <h4>The studio</h4>
            <ul>
              <li><a href="/studio/index.html">The index</a></li>
              <li><a href="/studio/about.html">The method</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Standards</h4>
            <ul>
              <li><span style="color:rgba(245,243,238,0.6)">Responsive · accessible · verified</span></li>
              <li><span style="color:rgba(245,243,238,0.6)">Own repository per site</span></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Count</h4>
            <ul>
              <li><span style="color:rgba(245,243,238,0.6)">50 sites · 240+ pages</span></li>
              <li><span style="color:rgba(245,243,238,0.6)">0 templates shared</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2026 The Autonomous Premium Web Studio. Fifty sites, zero templates.</span>
        <span class="zero">100% verified live</span>
      </div>
    </div>
  `
}

export function initReveal() {
  const els = document.querySelectorAll('.reveal')
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('visible'))
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          io.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  els.forEach((el) => io.observe(el))
}

/* ── The index data ── */

export const PROJECTS = [
  { n: 1, name: 'Aureline', niche: 'Luxury botanical skincare', accent: '#9C6B4A' },
  { n: 2, name: 'Formwork', niche: 'Civic architecture studio', accent: '#4A7C9B' },
  { n: 3, name: 'Kroma', niche: 'Analog audio hardware', accent: '#FF4D00' },
  { n: 4, name: 'Northern Current', niche: 'Specialty coffee roastery', accent: '#2F6B5E' },
  { n: 5, name: 'Meridian', niche: 'Independent watchmaking', accent: '#B08D4F' },
  { n: 6, name: 'Hellige', niche: 'Modern art museum', accent: '#7A4B8C' },
  { n: 7, name: 'Fjellverk', niche: 'Alpine equipment', accent: '#C8552E' },
  { n: 8, name: 'Blue Hour', niche: 'Jazz record label', accent: '#3B5B8C' },
  { n: 9, name: 'Halvorsen & Voss', niche: 'Law firm, Bergen', accent: '#5A4B3A' },
  { n: 10, name: 'Hav', niche: 'Seafood restaurant', accent: '#1D5C63' },
  { n: 11, name: 'Lattice', niche: 'Background job platform', accent: '#3A7CA5' },
  { n: 12, name: 'Sigrid Dahl', niche: 'Documentary photographer', accent: '#6B5B3E' },
  { n: 13, name: 'Leire', niche: 'Ceramics studio', accent: '#8A6B4B' },
  { n: 14, name: 'Kvart', niche: 'Independent publishing house', accent: '#A33A2C' },
  { n: 15, name: 'Halde', niche: 'Family wine estate', accent: '#7A3B2E' },
  { n: 16, name: 'Klint', niche: 'Bicycles made in Copenhagen', accent: '#2C4A6B' },
  { n: 17, name: 'Korn', niche: 'Artisan bakery', accent: '#B57A2A' },
  { n: 18, name: 'Sillage', niche: 'Parfumerie, Paris', accent: '#8C6B8C' },
  { n: 19, name: 'Stilla', niche: 'Forest retreat', accent: '#4A6B4A' },
  { n: 20, name: 'Socker', niche: 'Chocolate atelier', accent: '#6B4A3A' },
  { n: 21, name: 'Rörliga', niche: 'Documentary film festival', accent: '#C84A5A' },
  { n: 22, name: 'Styrka', niche: 'Strength studio', accent: '#3A3A4A' },
  { n: 23, name: 'Tråd', niche: 'Knitwear atelier', accent: '#8C7A6B' },
  { n: 24, name: 'Mun', niche: 'Dental clinic', accent: '#4A8C8C' },
  { n: 25, name: 'Nordfärd', niche: 'Expedition cruises', accent: '#2C5C7A' },
  { n: 26, name: 'Kvarter', niche: 'Property development', accent: '#6B6B5A' },
  { n: 27, name: 'Stråke', niche: 'Violin atelier', accent: '#A87A3A' },
  { n: 28, name: 'Växthus', niche: 'Plant nursery', accent: '#5A7A3A' },
  { n: 29, name: 'Signal', niche: 'Podcast studio', accent: '#C95A2C' },
  { n: 30, name: 'Leksak', niche: 'Wooden toys', accent: '#C9A227' },
  { n: 31, name: 'Kontoret', niche: 'Accounting for small business', accent: '#4A5A7A' },
  { n: 32, name: 'Brygg', niche: 'Craft brewery, Tromsø', accent: '#B57A2A' },
  { n: 33, name: 'Studio N', niche: 'Jewelry atelier', accent: '#8C8C9C' },
  { n: 34, name: 'Fritid', niche: 'Sailing club', accent: '#1A5E8C' },
  { n: 35, name: 'Varmt', niche: 'Sauna house, Helsinki', accent: '#C4501F' },
  { n: 36, name: 'Nabo', niche: 'Independent bookstore', accent: '#2E4B3A' },
  { n: 37, name: 'Siv', niche: 'Hand-woven textiles', accent: '#A8532F' },
  { n: 38, name: 'Havne', niche: 'Bergen fish market', accent: '#E2703A' },
  { n: 39, name: 'Fjell', niche: 'Volunteer mountain rescue', accent: '#E8532C' },
  { n: 40, name: 'Kompass', niche: 'Slow rail travel', accent: '#D98E32' },
  { n: 41, name: 'Trehus', niche: 'Cabin rental, Hemsedal', accent: '#C8552E' },
  { n: 42, name: 'Måne', niche: 'Perfumery, Copenhagen', accent: '#B98A2F' },
  { n: 43, name: 'Bølge', niche: 'Surf school, Cold Hawaii', accent: '#E2572B' },
  { n: 44, name: 'Ur', niche: "Watchmaker's atelier", accent: '#B08D4F' },
  { n: 45, name: 'Kino', niche: 'Independent cinema, Oslo', accent: '#A32C2C' },
  { n: 46, name: 'Atlas', niche: 'Maps & letterpress', accent: '#B5482A' },
  { n: 47, name: 'Haven', niche: 'Community garden', accent: '#4E6B3A' },
  { n: 48, name: 'Rytme', niche: 'Music school & studios', accent: '#E8A020' },
  { n: 49, name: 'Sol', niche: 'Solar cooperative', accent: '#F5A623' },
  { n: 50, name: 'Studio', niche: 'This index — fifty sites, zero templates', accent: '#C9A227' },
]

export function renderIndex() {
  const grid = document.getElementById('cardGrid')
  if (!grid) return
  grid.innerHTML = PROJECTS.map(
    (p) => `
      <a class="card" href="https://temidayoxyz.github.io/${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/" target="_blank" rel="noopener" style="--card-accent:${p.accent}">
        <span class="card-no">Nº ${String(p.n).padStart(2, '0')}</span>
        <h3>${p.name}</h3>
        <p>${p.niche}</p>
        <span class="card-url">temidayoxyz.github.io/${p.name.toLowerCase().replace(/[^a-z0-9]/g, '')}/</span>
      </a>
    `
  ).join('')
}
