import { useRef, useState } from 'react'
import { Section } from './Layout'
import { industries } from '../industries'
import { contact, turnaround, stats, testimonials, clients, pricing } from '../siteConfig'

const SERVICE_OPTIONS = [
  'Construction Progress',
  'LiDAR',
  'Mapping / Orthomosaic',
  'Thermal / Solar Inspection',
  'Roof / Property Inspection',
  '3D Model',
  'Marketing Aerials',
  'Other / Not sure',
]

export function IndustryCards({ exclude }) {
  const list = industries.filter((i) => i.slug !== exclude)
  return (
    <Section id="industries">
      <div className="section-head">
        <h2>{exclude ? 'Other industries' : 'Who I work with'}</h2>
        <p className="section-sub">
          {exclude
            ? 'The same equipment and workflow, applied to other kinds of sites.'
            : 'Aerial data built around how your team actually uses it.'}
        </p>
      </div>
      <div className="industry-grid">
        {list.map((i) => (
          <a className="industry-card" href={i.path} key={i.slug}>
            <h3>{i.cardTitle}</h3>
            <p>{i.cardBody}</p>
            <span className="industry-link">See how it works &rarr;</span>
          </a>
        ))}
      </div>
    </Section>
  )
}

const STEPS = [
  {
    title: 'Scope',
    body: 'Tell me the site, the question you need answered, and the deadline. I recommend the right sensor and deliverables and send a quote.',
  },
  {
    title: 'Plan & clear',
    body: 'Airspace authorizations, site coordination, and a flight plan built for your accuracy and coverage needs.',
  },
  {
    title: 'Fly',
    body: 'On-site capture with RGB, thermal, or LiDAR payloads and RTK positioning. Recurring flights reuse the same paths.',
  },
  {
    title: 'Deliver',
    body: 'Processed, checked deliverables in the formats your team already uses, plus raw data on request.',
  },
]

export function HowItWorks() {
  return (
    <Section id="process">
      <div className="section-head">
        <h2>How it works</h2>
        <p className="section-sub">From first message to finished deliverables, with one point of contact.</p>
      </div>
      <ol className="steps">
        {STEPS.map((s, i) => (
          <li className="step" key={s.title}>
            <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </li>
        ))}
      </ol>
      {turnaround && <p className="process-note">{turnaround}</p>}
    </Section>
  )
}

// Renders nothing until stats, testimonials, or clients are filled in (src/siteConfig.js).
export function Proof() {
  if (!stats.length && !testimonials.length && !clients.length) return null
  return (
    <Section id="results">
      <div className="section-head">
        <h2>Results</h2>
      </div>
      {stats.length > 0 && (
        <div className="stats-row">
          {stats.map((s) => (
            <div className="stat-tile" key={s.label}>
              <span className="stat-tile-val">{s.value}</span>
              <span className="stat-tile-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      )}
      {testimonials.length > 0 && (
        <div className="quotes">
          {testimonials.map((t) => (
            <figure className="quote" key={t.quote}>
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <strong>{t.name}</strong>
                {[t.role, t.company].filter(Boolean).join(', ')}
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      {clients.length > 0 && (
        <p className="clients">
          <span>Trusted by</span> {clients.join(' · ')}
        </p>
      )}
    </Section>
  )
}

// Renders nothing until pricing is filled in (src/siteConfig.js).
export function Pricing() {
  if (!pricing.length) return null
  return (
    <Section id="pricing">
      <div className="section-head">
        <h2>Starting prices</h2>
        <p className="section-sub">Every site is different. These are typical starting points; you'll get a quote for your site before anything is scheduled.</p>
      </div>
      <div className="price-grid">
        {pricing.map((p) => (
          <div className="price-card" key={p.service}>
            <h3>{p.service}</h3>
            <p className="price">
              <span className="price-from">from</span> {p.from}
              {p.unit && <span className="price-unit"> {p.unit}</span>}
            </p>
            {p.note && <p className="price-note">{p.note}</p>}
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Contact({ defaultService = '' }) {
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

  const tel = contact.phone.replace(/[^\d+]/g, '')

  return (
    <Section id="contact">
      <div className="section-head">
        <h2>Request a Quote</h2>
        <p className="section-sub">
          Share your project details and I'll respond with a scope and estimate.
        </p>
      </div>
      <div className="contact-layout">
        <form ref={formRef} className="form" onSubmit={onSubmit}>
          <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />
          <input type="hidden" name="_subject" value="New drone quote request from jeremymcbride.com" />
          <input
            type="hidden"
            name="page"
            value={typeof window !== 'undefined' ? window.location.pathname : ''}
          />

          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" placeholder="Your name" required />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" placeholder="Optional" />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="you@company.com" required />
            </div>
            <div className="field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="Optional" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="service">Service</label>
            <select id="service" name="service" defaultValue={defaultService} required>
              <option value="" disabled>
                Select a service…
              </option>
              {SERVICE_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="details">Project details</label>
            <textarea
              id="details"
              name="details"
              rows="5"
              placeholder="Site location and size, timeline, what you need delivered..."
            />
          </div>

          <button className="cta" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send Request'}
          </button>

          {status === 'sent' && <p className="toast success">Thanks — I'll reply shortly.</p>}
          {status === 'error' && (
            <p className="toast error">Something went wrong. Email {contact.email}.</p>
          )}
        </form>

        <aside className="contact-side">
          {contact.bookingUrl && (
            <a className="ghost contact-book" href={contact.bookingUrl} target="_blank" rel="noopener noreferrer">
              Book a 15-minute call
            </a>
          )}
          {contact.phone && (
            <p>
              <span className="contact-side-lbl">Call or text</span>
              <a href={`tel:${tel}`}>{contact.phone}</a>
            </p>
          )}
          <p>
            <span className="contact-side-lbl">Email</span>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </p>
          <p>
            <span className="contact-side-lbl">Based in</span>
            Richmond, VA · serving VA, DC, MD &amp; NC
          </p>
        </aside>
      </div>
    </Section>
  )
}
