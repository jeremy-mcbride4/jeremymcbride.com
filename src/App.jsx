import { useRef, useState } from 'react'

function Section({ id, title, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        <h2 className="h2">{title}</h2>
        {children}
      </div>
    </section>
  )
}

function Nav() {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <div className="brand">
          <span className="logo-dot" /> Jeremy McBride Aerial
        </div>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">☰</button>
        <ul className={`menu ${open ? 'open' : ''}`}>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#credentials">Credentials</a></li>
          <li><a href="#contact" className="cta-small">Request a Quote</a></li>
        </ul>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <div className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>Precise aerial data. Clean deliverables.</h1>
          <p>
            Mapping, inspections, and 3D models for roofs, sites, and facilities.
            Richmond, Virginia and the Mid-Atlantic.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="cta">Request a Quote</a>
            <a href="#portfolio" className="ghost">View Work</a>
          </div>
          <ul className="badges">
            <li>DJI Matrice 4E • Mavic 3 Pro • Air 3</li>
            <li>D-RTK-3 capable</li>
            <li>Part 107 Certified</li>
          </ul>
        </div>
        <div className="hero-card">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            // poster="https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=1200&auto=format&fit=crop"
            poster="assets/drone-hero.png"
          >
            <source src="https://cdn.coverr.co/videos/coverr-drone-over-construction-site-0900/1080p.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  )
}

function Services() {
  const items = [
    {
      title: 'Orthomosaic Mapping',
      body: 'High-resolution stitched maps for sites, fields, and large roofs. Fast turnarounds with consistent ground sampling.',
    },
    {
      title: 'Roof & Property Inspections',
      body: 'Detailed imagery for claims, underwriting, and maintenance. Close-range captures with repeatable flight paths.',
    },
    {
      title: '3D Models & Facades',
      body: 'Photogrammetry models for planning and visualization. Shareable web viewers or OBJ/PLY deliverables.',
    },
    {
      title: 'Marketing Aerials',
      body: 'Cinematic shots for listings and brand assets. Smooth, stabilized footage in 4K.',
    },
  ]
  return (
    <Section id="services" title="Services">
      <div className="grid">
        {items.map((s) => (
          <div className="card" key={s.title}>
            <h3 className="h3">{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Portfolio() {
  const shots = [
    { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1400&auto=format&fit=crop', caption: 'Construction orthomosaic (sample)' },
    { src: 'https://images.unsplash.com/photo-1531829039722-d3fb3e705a4b?q=80&w=1400&auto=format&fit=crop', caption: 'Downtown roof inspection (sample)' },
    { src: 'https://images.unsplash.com/photo-1471802804811-04c0f5a2f4f4?q=80&w=1400&auto=format&fit=crop', caption: 'Commercial site progress (sample)' },
    { src: 'https://images.unsplash.com/photo-1504198266285-165a10f8ec53?q=80&w=1400&auto=format&fit=crop', caption: '3D model textures (sample)' },
  ]
  return (
    <Section id="portfolio" title="Portfolio">
      <div className="masonry">
        {shots.map((s, i) => (
          <figure key={i} className="tile">
            <img src={s.src} alt={s.caption} loading="lazy" />
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>
      <p className="note">
        Want to see live viewers (orthos/3D)? Ask in your quote request—I’ll share project links.
      </p>
    </Section>
  )
}

function Creds() {
  return (
    <Section id="credentials" title="Credentials & Coverage">
      <ul className="cred-list">
        <li><strong>FAA Part 107</strong> Remote Pilot</li>
        <li><strong>Insurance</strong> on request per job</li>
        <li><strong>Service area:</strong> VA • DC • MD • NC</li>
        <li><strong>Hardware:</strong> Matrice 4E, Mavic 3 Pro, Air 3, D-RTK-3</li>
        <li><strong>Deliverables:</strong> Orthos (GeoTIFF/MBTiles), 3D (OBJ/PLY/WEB), reports, and raw imagery</li>
      </ul>
    </Section>
  )
}

function Contact() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const endpoint = 'https://formspree.io/f/xnnzlozb'
    const data = new FormData(formRef.current)

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" title="Request a Quote">
      <form ref={formRef} className="form" onSubmit={onSubmit}>
        {/* Honeypot to reduce spam */}
        <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
        {/* Optional subject line for Formspree notifications */}
        <input type="hidden" name="_subject" value="New drone quote request from jeremymcbride.com" />

        <div className="field">
          <label>Name</label>
          <input name="name" placeholder="Your name" required />
        </div>

        <div className="field">
          <label>Email</label>
          <input name="email" type="email" placeholder="you@company.com" required />
        </div>

        <div className="field">
          <label>Service</label>
          <select name="service" defaultValue="Inspection">
            <option>Inspection</option>
            <option>Mapping / Orthomosaic</option>
            <option>3D Model</option>
            <option>Marketing Aerials</option>
          </select>
        </div>

        <div className="field">
          <label>Project details</label>
          <textarea name="details" rows="5" placeholder="Location, timeline, deliverables..." />
        </div>

        <button className="cta" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Request'}
        </button>

        {status === 'sent' && <p className="toast success">Thanks — I’ll reply shortly.</p>}
        {status === 'error' && <p className="toast error">Something went wrong. Email info@jeremymcbride.com.</p>}
      </form>

      <p className="contact-alt">
        Prefer email? <a href="mailto:info@jeremymcbride.com">info@jeremymcbride.com</a>
      </p>
    </Section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Jeremy McBride Aerial • Richmond, VA</p>
        <a className="ghost" href="#top">Back to top</a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <Creds />
        <Contact />
      </main>
      <Footer />
    </>
  )
}