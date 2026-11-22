import { useState } from 'react'
import logo from '../assets/logo.jpg'
import { contact } from '../siteConfig'

export function Section({ id, className, children }) {
  return (
    <section id={id} className={`section${className ? ` ${className}` : ''}`}>
      <div className="container">{children}</div>
    </section>
  )
}

// `home` = true on the homepage (plain #anchors); industry pages link back to /#anchor.
export function Nav({ home = true }) {
  const [open, setOpen] = useState(false)
  const p = home ? '' : '/'
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <a href="/" className="brand">
          <img src={logo} alt="" className="brand-logo" />
          <span className="brand-text">
            Jeremy McBride <span className="brand-accent">Aerial</span>
          </span>
        </a>
        <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
          ☰
        </button>
        <ul className={`menu ${open ? 'open' : ''}`}>
          <li>
            <a href={`${p}#industries`}>Industries</a>
          </li>
          <li>
            <a href={`${p}#services`}>Services</a>
          </li>
          <li>
            <a href={`${p}#portfolio`}>Portfolio</a>
          </li>
          <li>
            <a href={`${p}#credentials`}>Credentials</a>
          </li>
          <li className="menu-dropdown-wrap">
            <button className="menu-dropdown-trigger">Tools</button>
            <ul className="menu-dropdown">
              <li>
                <a href="https://www.droneautomator.com" target="_blank" rel="noopener noreferrer">
                  Drone Automator
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#contact" className="cta-nav">
              Request a Quote
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} Jeremy McBride Aerial · Richmond, VA</p>
        <div className="footer-links">
          {contact.phone && <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`}>{contact.phone}</a>}
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a className="ghost" href="#top">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}
