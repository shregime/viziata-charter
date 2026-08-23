import { useEffect, useMemo, useState } from 'react'
import { FRASER, GALLERY, IMAGES, INQUIRY_EMAIL, SPECS, VIDEO, YCF } from './data'

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'none'
          }
        })
      },
      { threshold: 0.12 }
    )
    nodes.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(18px)'
      el.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      io.observe(el)
    })
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  useReveal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = useMemo(
    () => `nav${scrolled ? ' scrolled' : ''}${open ? ' open' : ''}`,
    [scrolled, open]
  )

  async function onSubmit(event) {
    event.preventDefault()
    const data = Object.fromEntries(new FormData(event.currentTarget))
    const body = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || '\u2014'}`,
      `Dates: ${data.dates || 'flexible'}`,
      `Guests: ${data.guests}`,
      '',
      data.message || '',
    ].join('\n')

    setSending(true)
    try {
      if (INQUIRY_EMAIL) {
        await fetch(`https://formsubmit.co/ajax/${INQUIRY_EMAIL}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone,
            dates: data.dates,
            guests: data.guests,
            message: data.message,
            _subject: `VIZIATA charter inquiry \u2014 ${data.name}`,
          }),
        })
      } else {
        window.location.href = `mailto:?subject=${encodeURIComponent(
          `VIZIATA charter inquiry \u2014 ${data.name}`
        )}&body=${encodeURIComponent(body)}`
      }
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <header className={navClass}>
        <a className="brand" href="#top">VIZIATA</a>
        <button className="menu-btn" onClick={() => setOpen((v) => !v)} aria-label="Menu">\u2630</button>
        <ul className="nav-links" onClick={() => setOpen(false)}>
          <li><a href="#yacht">The yacht</a></li>
          <li><a href="#decks">Decks</a></li>
          <li><a href="#suites">Suites</a></li>
          <li><a href="#toys">Toys</a></li>
          <li><a href="#bahamas">Bahamas</a></li>
        </ul>
        <a className="nav-cta" href="#book">Book</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-media" style={{ backgroundImage: `url(${IMAGES.profile})` }}>
          <img src={IMAGES.profile} alt="VIZIATA, a 130-foot Westport, underway" />
        </div>
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow">Westport 130 \u00b7 Bahamas</p>
          <h1>Book Your Next <span className="adventure">Adventure</span></h1>
          <p className="hero-sub">A light-filled 40-metre Westport for ten guests. Sundeck jacuzzi, on-deck master, and a crew of seven \u2014 based in the Bahamas.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#book">Request a charter</a>
            <a className="btn btn-ghost" href="#gallery">See the yacht</a>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stat"><b>130'</b><span>Westport</span></div>
        <div className="stat"><b>10</b><span>Guests</span></div>
        <div className="stat"><b>5</b><span>Suites</span></div>
        <div className="stat"><b>7</b><span>Crew</span></div>
      </section>

      <section className="section" id="yacht">
        <div className="wrap split" data-reveal>
          <div>
            <p className="kicker">Motor yacht VIZIATA</p>
            <h2>Classic Westport lines. A 2021 refit.</h2>
            <p className="lead">Built by Westport and designed by Gregory Marshall, VIZIATA is a 40m / 130' semi-displacement yacht with the easy, walk-around decks that make Bahamas cruising feel effortless. After her comprehensive 2021 refit she is bright, quiet, and ready for island weeks.</p>
          </div>
          <img src={IMAGES.threeQuarter} alt="VIZIATA from the quarter, underway" />
        </div>
        <div className="wrap spec-grid" data-reveal>
          {SPECS.map(([label, value]) => (
            <div className="spec" key={label}><span>{label}</span><b>{value}</b></div>
          ))}
        </div>
      </section>

      <section className="photo-full" data-reveal>
        <figure>
          <img src={IMAGES.overhead} alt="Overhead view of VIZIATA underway" />
          <figcaption>Teak decks \u00b7 jacuzzi \u00b7 26' beam</figcaption>
        </figure>
      </section>

      <section className="section" id="decks">
        <div className="wrap">
          <p className="kicker" data-reveal>Life on deck</p>
          <h2 data-reveal>Sun, shade, and salt air.</h2>
          <p className="lead" data-reveal>Outdoor living is the point. Breakfast on the bow, long lunches aft, sunset from the jacuzzi.</p>
          <div className="cards">
            <article className="card" data-reveal>
              <img src={IMAGES.sundeck} alt="Sundeck with loungers and jacuzzi" />
              <div className="card-body"><h3>Sundeck jacuzzi</h3><p>Sun pads, BBQ, and a spa tub under a shade sail.</p></div>
            </article>
            <article className="card" data-reveal>
              <img src={IMAGES.aftDining} alt="Aft deck dining table" />
              <div className="card-body"><h3>Aft dining</h3><p>Al fresco for ten, with a teak table and the wake stretching out behind you.</p></div>
            </article>
            <article className="card" data-reveal>
              <img src={IMAGES.breakfast} alt="Forward bow seating" />
              <div className="card-body"><h3>Private bow</h3><p>A tucked-away seating nest for sunrise coffee or a quiet cocktail at dusk.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap split reverse" data-reveal>
          <div>
            <p className="kicker">Interiors</p>
            <h2>Light rooms, ocean windows.</h2>
            <p className="lead">Pacific Custom Interiors, refreshed in 2021. A main salon with formal dining for ten, a sky lounge with bar, and an on-deck master with a soaking tub and waterfall faucet.</p>
          </div>
          <img src={IMAGES.salon} alt="Main salon with ocean views" />
        </div>
      </section>

      <section className="video-block" id="film">
        <div className="wrap" data-reveal>
          <p className="kicker" style={{ color: 'var(--lagoon)' }}>Walkthrough</p>
          <h2>See her in motion.</h2>
          <p className="lead" style={{ color: 'rgba(255,255,255,0.72)' }}>Official Fraser Yachts tour of VIZIATA \u2014 40m / 130' Westport, 2003 / 2021.</p>
          <div className="video-frame">
            <iframe src={VIDEO} title="VIZIATA yacht for charter \u2014 Fraser Yachts" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      </section>

      <section className="section" id="gallery">
        <div className="wrap">
          <p className="kicker" data-reveal>Gallery</p>
          <h2 data-reveal>Every angle of the week.</h2>
          <div className="gallery-grid">
            {GALLERY.map((item) => (
              <button key={item.src} className={item.wide ? 'wide' : undefined} onClick={() => setLightbox(item)} type="button">
                <img src={item.src} alt={item.alt} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="suites" style={{ paddingTop: 24 }}>
        <div className="wrap">
          <p className="kicker" data-reveal>Accommodation</p>
          <h2 data-reveal>Five king suites. Two convert to twins.</h2>
          <p className="lead" data-reveal>Sleeps ten. The on-deck master has a king, dual vanities, a separate shower, and a stand-alone soaking tub.</p>
          <div className="suites" data-reveal>
            <div className="suite-hero">
              <img src={IMAGES.master} alt="On-deck master stateroom" />
              <p className="caption">On-deck master \u00b7 king \u00b7 office desk \u00b7 ocean windows</p>
            </div>
            <div className="suite-stack">
              <img src={IMAGES.dining} alt="Formal dining salon" />
              <img src={IMAGES.hallway} alt="Marble foyer and stair" />
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="toys">
        <div className="wrap toys" data-reveal>
          <img src={IMAGES.toys} alt="VIZIATA with tender and water toys alongside" />
          <div>
            <p className="kicker">Toys & tender</p>
            <h2>The Bahamas, at hull speed and idle.</h2>
            <p className="lead">A 2026 32' World Cat tender for beaches and sandbars, plus jet skis, towables, and snorkel gear. Stabilizers underway keep passages comfortable.</p>
            <ul className="toy-list">
              <li>World Cat tender <span>32' / twin Mercury 425hp</span></li>
              <li>Jet skis <span>Stand-up</span></li>
              <li>Towables & inflatables <span>Off the swim platform</span></li>
              <li>Snorkel gear <span>Ready for the Exumas</span></li>
              <li>Starlink & Wi-Fi <span>Stay on, if you want</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section" id="bahamas">
        <div className="wrap">
          <p className="kicker" data-reveal>Cruising grounds</p>
          <h2 data-reveal>Based in the Bahamas.</h2>
          <p className="lead" data-reveal>Shallow draft, 24-knot cruise, 28-knot top speed. Exumas sandbars, Harbour Island lunches, and quiet nights on the hook.</p>
          <div className="destinations">
            <article className="dest" style={{ backgroundImage: `url(${IMAGES.overhead})` }} data-reveal>
              <h3>Exumas</h3><p>Sandbars, swimming pigs, and water that does not look real.</p>
            </article>
            <article className="dest" style={{ backgroundImage: `url(${IMAGES.jacuzziSunset})` }} data-reveal>
              <h3>Eleuthera</h3><p>Pink sand, Harbour Island, and long, empty beaches.</p>
            </article>
            <article className="dest" style={{ backgroundImage: `url(${IMAGES.flybridge})` }} data-reveal>
              <h3>Nassau & beyond</h3><p>Easy embarkation, then as far as the week wants to go.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="rates" style={{ paddingTop: 12 }}>
        <div className="wrap">
          <p className="kicker" data-reveal>Charter</p>
          <h2 data-reveal>From $99,000 per week.</h2>
          <p className="lead" data-reveal>Plus expenses (APA). Seven professional crew, gourmet chef, and the yacht as your private island.</p>
          <div className="rates">
            <article className="rate-card" data-reveal>
              <h3>Summer \u00b7 April\u2013September</h3>
              <div className="price">$99,000 <small>/ week</small></div>
              <p>Low season from $99,000. High season from $110,000. Bahamas.</p>
            </article>
            <article className="rate-card featured" data-reveal>
              <h3>Winter \u00b7 October\u2013March</h3>
              <div className="price">$110,000 <small>/ week</small></div>
              <p>High season from $120,000. Bahamas and Caribbean. Holidays on request.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="book" id="book">
        <div className="wrap book-grid">
          <div data-reveal>
            <p className="kicker" style={{ color: 'var(--coral)' }}>Charter VIZIATA</p>
            <h2>Book your next <span className="adventure">adventure</span></h2>
            <p className="lead" style={{ color: 'rgba(255,255,255,0.8)' }}>Tell us the week, the guest count, and how you like to spend a day on the water.</p>
          </div>
          <form className="form" onSubmit={onSubmit} data-reveal>
            <div className="form-row">
              <div className="field"><label htmlFor="name">Name</label><input id="name" name="name" required placeholder="Your name" /></div>
              <div className="field"><label htmlFor="email">Email</label><input id="email" name="email" type="email" required placeholder="you@email.com" /></div>
            </div>
            <div className="form-row">
              <div className="field"><label htmlFor="phone">Phone</label><input id="phone" name="phone" placeholder="Optional" /></div>
              <div className="field"><label htmlFor="guests">Guests</label>
                <select id="guests" name="guests" defaultValue="8">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="field"><label htmlFor="dates">Preferred dates</label><input id="dates" name="dates" placeholder="e.g. 12\u201319 April, Exumas" /></div>
            <div className="field"><label htmlFor="message">Anything we should know</label><textarea id="message" name="message" placeholder="Occasion, islands, dietary notes\u2026" /></div>
            <button className="btn btn-primary" type="submit" disabled={sending}>{sending ? 'Sending\u2026' : 'Request this charter'}</button>
            {sent && <p className="success">Received. We will follow up with availability.</p>}
            <p style={{ marginTop: 14, fontSize: 13, color: 'var(--muted)' }}>
              Prefer a broker? <a href={FRASER} target="_blank" rel="noreferrer">Inquire via Fraser Yachts</a>
            </p>
          </form>
        </div>
      </section>

      <footer>
        <span>VIZIATA \u00b7 130' Westport \u00b7 2003 / 2021</span>
        <span>
          <a href={FRASER} target="_blank" rel="noreferrer">Fraser</a>
          {' \u00b7 '}
          <a href={YCF} target="_blank" rel="noreferrer">YachtCharterFleet</a>
          {' \u00b7 '}
          Rates plus expenses. Particulars believed correct, not guaranteed.
        </span>
      </footer>

      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)} role="dialog">
          <button className="lightbox-close" type="button" aria-label="Close">\u00d7</button>
          <img src={lightbox.src} alt={lightbox.alt} />
        </div>
      )}
    </>
  )
}
