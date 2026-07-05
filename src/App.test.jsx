import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Mock the R3FPano component to avoid Three.js/WebGL issues in tests
vi.mock('./components/R3FPano', () => ({
  default: ({ src, height }) => (
    <div data-testid="r3f-pano" data-src={src} data-height={height}>
      Mocked R3FPano
    </div>
  ),
}))

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
  })

  it('displays the hero section with main heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Precise aerial data/i })).toBeInTheDocument()
  })

  it('shows navigation menu items', () => {
    render(<App />)
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveTextContent('Services')
    expect(nav).toHaveTextContent('Portfolio')
    expect(nav).toHaveTextContent('Credentials')
  })

  it('toggles mobile menu when hamburger is clicked', async () => {
    render(<App />)
    const user = userEvent.setup()
    const hamburger = screen.getByRole('button', { name: /menu/i })
    
    // Menu should start closed
    const menu = hamburger.nextElementSibling
    expect(menu).not.toHaveClass('open')
    
    // Click to open
    await user.click(hamburger)
    await waitFor(() => expect(menu).toHaveClass('open'))
    
    // Click to close
    await user.click(hamburger)
    await waitFor(() => expect(menu).not.toHaveClass('open'))
  })

  it('displays all enterprise services', () => {
    render(<App />)
    expect(screen.getByText('Orthomosaic Mapping')).toBeInTheDocument()
    expect(screen.getByText('3D Models & Facades')).toBeInTheDocument()
    expect(screen.getByText('Roof & Property Inspections')).toBeInTheDocument()
    expect(screen.getByText('Image/Asset Processing')).toBeInTheDocument()
  })

  it('displays marketing aerials service', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Marketing Aerials' })).toBeInTheDocument()
    expect(screen.getByText(/Cinematic shots for listings/i)).toBeInTheDocument()
  })

  it('renders portfolio section with images', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Portfolio/i })).toBeInTheDocument()
    
    // Check for some portfolio captions
    expect(screen.getByText(/Tree clearing; 3D Point cloud/i)).toBeInTheDocument()
    expect(screen.getByText(/500-acre site clearing/i)).toBeInTheDocument()
  })

  it('renders the R3FPano component in portfolio', () => {
    render(<App />)
    const pano = screen.getByTestId('r3f-pano')
    expect(pano).toBeInTheDocument()
    expect(pano).toHaveAttribute('data-height', '400')
  })

  it('displays credentials section', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /Credentials & Coverage/i })).toBeInTheDocument()
    expect(screen.getByText(/FAA Part 107/i)).toBeInTheDocument()
    expect(screen.getByText(/Service area:/i)).toBeInTheDocument()
  })

  describe('Contact Form', () => {
    it('renders contact form with all fields', () => {
      render(<App />)
      expect(screen.getByRole('heading', { name: /Request a Quote/i })).toBeInTheDocument()
      expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Service/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/Project details/i)).toBeInTheDocument()
    })

    it('can type into form fields', async () => {
      render(<App />)
      const user = userEvent.setup()
      
      const nameInput = screen.getByLabelText(/Name/i)
      const emailInput = screen.getByLabelText(/Email/i)
      
      await user.type(nameInput, 'John Doe')
      await user.type(emailInput, 'john@example.com')
      
      expect(nameInput).toHaveValue('John Doe')
      expect(emailInput).toHaveValue('john@example.com')
    })

    it('can select service option', async () => {
      render(<App />)
      const user = userEvent.setup()
      
      const select = screen.getByLabelText(/Service/i)
      await user.selectOptions(select, 'Mapping / Orthomosaic')
      
      expect(select).toHaveValue('Mapping / Orthomosaic')
    })
  })

  it('renders footer with current year', () => {
    render(<App />)
    const currentYear = new Date().getFullYear()
    expect(screen.getByText(new RegExp(`© ${currentYear}`, 'i'))).toBeInTheDocument()
    expect(screen.getByText(/Jeremy McBride Aerial • Richmond, VA/i)).toBeInTheDocument()
  })

  it('has CTA buttons linking to contact section', () => {
    render(<App />)
    const ctaLinks = screen.getAllByRole('link', { name: /Request a Quote/i })
    expect(ctaLinks.length).toBeGreaterThan(0)
    ctaLinks.forEach(link => {
      expect(link).toHaveAttribute('href', '#contact')
    })
  })

  it('displays service area badges', () => {
    render(<App />)
    expect(screen.getByText('Optical/RGB')).toBeInTheDocument()
    expect(screen.getByText('Thermal')).toBeInTheDocument()
    expect(screen.getByText('Site Progress')).toBeInTheDocument()
    expect(screen.getByText('Volume Tracking')).toBeInTheDocument()
  })
})
