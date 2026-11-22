import heroBg from './assets/Remington_PointCloud_Volumetric.jpg'
import Portfolio from './components/Portfolio'
import { Nav, Footer, Section } from './components/Layout'
import { IndustryCards, HowItWorks, Proof, Pricing, Contact } from './components/Sections'
import { useHashScroll } from './useHashScroll'

function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>Aerial site data for the teams that build, own, and power the Mid-Atlantic.</h1>
          <p>
            Construction progress, LiDAR and mapping, thermal inspections, and 3D models, flown and processed by an
            FAA-certified pilot based in Richmond, VA. Deliverables in the formats your team already uses.
          </p>
          <div className="hero-ctas">
            <a href="#contact" className="cta">
              Request a Quote
            </a>
            <a href="#portfolio" className="ghost">
              View Work
            </a>
          </div>
          <ul className="badges">
            <li>LiDAR</li>
            <li>Construction Progress</li>
            <li>Thermal</li>
            <li>Volume Tracking</li>
            <li>3D Models</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function Services() {
  const services = [
    {
      title: 'Mapping',
      body: 'High-resolution stitched maps for sites, fields, and large roofs. Fast turnarounds with consistent, high-grade ground sampling.',
    },
    {
      title: 'LiDAR',
      body: 'Dense, survey-grade point clouds that capture terrain even under vegetation. Ideal for topography, volumes, and corridor mapping. Delivered as LAS/LAZ.',
    },
    {
      title: '3D Models & Facades',
      body: 'Photogrammetry models for planning and visualization. Shareable web viewers or OBJ/PLY deliverables.',
    },
    {
      title: 'Roof & Property Inspections',
      body: 'Detailed imagery for claims, underwriting, and maintenance. Close-range captures with repeatable flight paths.',
    },
    {
      title: 'Image / Asset Processing',
      body: 'Image analysis, annotation, and custom deliverables tailored to your project needs.',
    },
    {
      title: 'Marketing Aerials',
      body: 'Cinematic shots for listings and brand assets. Smooth, stabilized footage in 4K.',
    },
  ]

  return (
    <Section id="services">
      <div className="section-head">
        <h2>Services</h2>
        <p className="section-sub">
          End-to-end aerial capture and processing for enterprise and commercial projects.
        </p>
      </div>
      <div className="services-grid">
        {services.map((s) => (
          <div className="service-card" key={s.title}>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

function Creds() {
  const trust = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.955 11.955 0 010 12c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      value: 'FAA Part 107',
      label: 'Certified Remote Pilot',
      detail: 'Commercial UAS Operations',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9 8.25h1.5a1.5 1.5 0 011.5 1.5v.75h-3v-.75A1.5 1.5 0 019 8.25zm1.5 7.5H9v-.75a1.5 1.5 0 011.5-1.5h.75v-2.25H9.75v-.75h4.5v.75H12.75V13.5h.75a1.5 1.5 0 011.5 1.5v.75H12v-.75" />
          <path d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25z" />
          <path d="M11.25 6.75v.75m0 9v.75M8.25 9.75h.75m5.25 4.5h.75" />
        </svg>
      ),
      value: '$25M',
      label: 'Liability Insurance',
      detail: 'Commercial Drone Coverage',
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      value: 'VA · DC · MD · NC',
      label: 'Service Area',
      detail: 'Mid-Atlantic Region',
    },
  ]

  const specs = [
    {
      label: 'Hardware',
      items: ['Matrice 400', 'Matrice 4E', 'Matrice 4T', 'Mavic 4 Pro', 'Air 3', 'D-RTK-3'],
    },
    {
      label: 'Software',
      items: ['Pix4D', 'Agisoft Metashape', 'DroneDeploy', 'Terra', 'FlightHub 2', 'Litchi'],
    },
    {
      label: 'Deliverables',
      items: ['Orthos (GeoTIFF / MBTiles)', '3D Models (OBJ / PLY / Web)', 'Point Clouds', 'Progress Reports', 'RAW Imagery'],
    },
  ]

  return (
    <Section id="credentials">
      <div className="section-head">
        <h2>Credentials & Coverage</h2>
        <p className="section-sub">Licensed, insured, and equipped for commercial-scale aerial operations.</p>
      </div>

      <div className="trust-bar">
        {trust.map((t) => (
          <div className="trust-item" key={t.value}>
            <div className="trust-icon">{t.icon}</div>
            <div className="trust-text">
              <div className="trust-value">{t.value}</div>
              <div className="trust-label">{t.label}</div>
              <div className="trust-detail">{t.detail}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="spec-grid">
        {specs.map((s) => (
          <div className="spec-col" key={s.label}>
            <h4 className="spec-heading">{s.label}</h4>
            <ul className="spec-list">
              {s.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default function App() {
  useHashScroll()
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <IndustryCards />
        <Services />
        <Portfolio />
        <Proof />
        <HowItWorks />
        <Creds />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
