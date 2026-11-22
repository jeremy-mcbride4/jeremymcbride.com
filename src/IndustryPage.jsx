import heroBg from './assets/Remington_PointCloud_Volumetric.jpg'
import Portfolio from './components/Portfolio'
import { Nav, Footer, Section } from './components/Layout'
import { IndustryCards, HowItWorks, Proof, Pricing, Contact } from './components/Sections'

export default function IndustryPage({ industry }) {
  return (
    <>
      <Nav home={false} />
      <main>
        <div className="hero">
          <div className="hero-bg" style={{ backgroundImage: `url(${heroBg})` }} />
          <div className="container hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <a href="/">Jeremy McBride Aerial</a> / {industry.name}
              </p>
              <h1>{industry.headline}</h1>
              <p>{industry.intro}</p>
              <div className="hero-ctas">
                <a href="#contact" className="cta">
                  Request a Quote
                </a>
                <a href="#portfolio" className="ghost">
                  See Examples
                </a>
              </div>
              <ul className="badges">
                {industry.badges.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Section id="services">
          <div className="section-head">
            <h2>What it solves</h2>
          </div>
          <div className="services-grid services-grid-2">
            {industry.problems.map((p) => (
              <div className="service-card" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
          <div className="deliverables">
            <h4 className="spec-heading">What you receive</h4>
            <ul className="spec-list deliverables-list">
              {industry.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Portfolio projectIds={industry.projectIds} heading="Example projects" />
        <Proof />
        <HowItWorks />
        <Pricing />
        <Contact defaultService={industry.service} />
        <IndustryCards exclude={industry.slug} />
      </main>
      <Footer />
    </>
  )
}
