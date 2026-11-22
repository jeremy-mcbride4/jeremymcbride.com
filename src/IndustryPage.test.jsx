import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import IndustryPage from './IndustryPage'
import { industries } from './industries'

vi.mock('./components/R3FPano', () => ({ default: () => <div data-testid="r3f-pano" /> }))
vi.mock('./components/ModelViewer', () => ({ default: () => <div data-testid="model-viewer" /> }))

describe.each(industries)('IndustryPage: $slug', (industry) => {
  it('renders its headline and only its own projects', () => {
    render(<IndustryPage industry={industry} />)
    expect(screen.getByRole('heading', { level: 1, name: industry.headline })).toBeInTheDocument()
    // No filter bar on industry pages
    expect(screen.queryByRole('button', { name: 'All Projects' })).not.toBeInTheDocument()
    expect(document.querySelectorAll('.project-card')).toHaveLength(industry.projectIds.length)
  })

  it('preselects the matching service in the quote form', () => {
    render(<IndustryPage industry={industry} />)
    expect(screen.getByLabelText(/Service/i)).toHaveValue(industry.service)
  })

  it('links nav back to homepage sections and lists the other industries', () => {
    render(<IndustryPage industry={industry} />)
    expect(screen.getByRole('link', { name: 'Portfolio' })).toHaveAttribute('href', '/#portfolio')
    const others = industries.filter((i) => i.slug !== industry.slug)
    for (const o of others) {
      expect(screen.getByRole('link', { name: new RegExp(o.cardTitle) })).toHaveAttribute('href', o.path)
    }
  })
})
