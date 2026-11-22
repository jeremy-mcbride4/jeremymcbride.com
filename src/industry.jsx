// Entry point for the industry landing pages. Each page's index.html sets
// <body data-industry="slug">, which selects the content from src/industries.js.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import IndustryPage from './IndustryPage.jsx'
import { findIndustry } from './industries.js'

const industry = findIndustry(document.body.dataset.industry)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <IndustryPage industry={industry} />
  </StrictMode>,
)
