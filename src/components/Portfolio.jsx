import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import R3FPano from './R3FPano'
const ModelViewer = lazy(() => import('./ModelViewer'))

import peanut_3d from '../assets/Peanut_3D_Model.jpg'
import peanut_pc from '../assets/Peanut_PointCloud_Progress.jpg'
import peanut_pano from '../assets/Peanut_Site_Pano.jpg'
import shopping_center_ortho from '../assets/100_twentyninth_2d_ortho.jpg'
import remington_pc from '../assets/Remington_PointCloud_Overview.jpg'
import remington_3d from '../assets/Remington_3D_Model.jpg'
import remington_vol from '../assets/Remington_PointCloud_Volumetric.jpg'
import remington_pano from '../assets/Remington_Site_Pano.jpg'

import thumb_peanut_3d from '../assets/thumbs/Peanut_3D_Model.jpg'
import thumb_peanut_pc from '../assets/thumbs/Peanut_PointCloud_Progress.jpg'
import thumb_shopping from '../assets/thumbs/100_twentyninth_2d_ortho.jpg'
import thumb_remington_pc from '../assets/thumbs/Remington_PointCloud_Overview.jpg'
import thumb_remington_3d from '../assets/thumbs/Remington_3D_Model.jpg'
import thumb_remington_vol from '../assets/thumbs/Remington_PointCloud_Volumetric.jpg'
import thumb_map_snapshot from '../assets/thumbs/map_snapshot.jpg'

const CATEGORIES = [
  { key: 'all', label: 'All Projects' },
  { key: 'construction', label: 'Construction Progress' },
  { key: 'mapping', label: 'Mapping' },
  { key: '3d', label: '3D Models' },
  { key: 'pointcloud', label: 'Point Clouds' },
]

const projects = [
  {
    id: 'peanut',
    title: 'Large-Scale Site Clearing',
    subtitle: '500-Acre Survey',
    location: 'Central Virginia',
    categories: ['mapping', '3d', 'pointcloud'],
    stats: [
      { label: 'Acreage', value: '500' },
      { label: 'GSD', value: '1.25 cm' },
      { label: 'Deliverables', value: '5' },
    ],
    description:
      'Comprehensive aerial survey of a large-scale commercial tree clearing operation. Multi-phase capture included orthomosaic mapping with RTK-enabled GPS for centimeter-level accuracy, 3D point cloud generation for volumetric analysis, and 360° panoramic documentation of site progress.',
    media: [
      { src: '/model.glb', caption: '3D Model — Orbit to explore', type: 'model' },
      { src: peanut_3d, thumb: thumb_peanut_3d, caption: '3D Model Overview', type: 'image' },
      { src: peanut_pc, thumb: thumb_peanut_pc, caption: '3D Point Cloud — Progress', type: 'image' },
      { src: peanut_pano, caption: 'Mid-Section 360° Panorama', type: 'pano' },
    ],
    thumbnail: thumb_peanut_3d,
  },
  {
    id: 'remington',
    title: 'Mixed-Use Development',
    subtitle: '175-Acre Site Documentation',
    location: 'Virginia',
    categories: ['3d', 'pointcloud'],
    stats: [
      { label: 'Acreage', value: '175' },
      { label: 'Deliverables', value: '4' },
    ],
    description:
      'Detailed 3D documentation of a large mixed-use development site. High-density point clouds enabled volumetric analysis and progress tracking. Photogrammetric 3D models provided stakeholder-ready visualization and planning assets.',
    media: [
      { src: remington_pc, thumb: thumb_remington_pc, caption: '3D Point Cloud — Site Overview', type: 'image' },
      { src: remington_3d, thumb: thumb_remington_3d, caption: '3D Photogrammetric Model', type: 'image' },
      { src: remington_vol, thumb: thumb_remington_vol, caption: 'Volumetric Analysis', type: 'image' },
      { src: remington_pano, caption: 'Site 360° Panorama', type: 'pano' },
    ],
    thumbnail: thumb_remington_pc,
  },
  {
    id: 'sams-club',
    title: "Sam's Club — Smart Oblique",
    subtitle: '3D Smart Oblique Capture',
    location: 'Virginia',
    categories: ['3d'],
    stats: [
      { label: 'Capture', value: 'Smart Oblique' },
      { label: 'Deliverables', value: '1' },
    ],
    description:
      "Smart Oblique 3D capture of a Sam's Club facility. Multi-angle drone imagery reconstructed into a fully navigable 3D model — orbit, zoom, and inspect the structure from any angle.",
    media: [
      { src: '/sams-club.glb', caption: '3D Smart Oblique — Orbit to explore', type: 'model' },
    ],
    thumbnail: thumb_remington_3d,
  },
  {
    id: 'cfcrtk-ortho',
    title: 'Large-Scale Site Clearing',
    subtitle: '2D Orthomosaic Overlay',
    location: 'Central Virginia',
    categories: ['mapping'],
    stats: [
      { label: 'GSD', value: '1.25 cm' },
      { label: 'Type', value: 'Ortho' },
    ],
    description:
      'High-resolution 2D orthomosaic overlay of a 500-acre commercial tree clearing operation. Captured with RTK-enabled GPS for centimeter-level positional accuracy, processed into a georeferenced GeoTIFF deliverable.',
    media: [
      { src: '/map-snapshot.png', thumb: thumb_map_snapshot, caption: '2D Orthomosaic Overlay (1.25 cm GSD)', type: 'image' },
    ],
    thumbnail: thumb_map_snapshot,
  },
  {
    id: 'shopping-center',
    title: 'Commercial Property Survey',
    subtitle: '115-Acre Shopping Center',
    location: 'Virginia',
    categories: ['mapping'],
    stats: [
      { label: 'Acreage', value: '115' },
      { label: 'GSD', value: '1.5 cm' },
    ],
    description:
      'High-resolution orthomosaic survey of a large commercial shopping center. Captured for property management, planning, and asset documentation with sub-2cm ground sampling distance.',
    media: [
      { src: shopping_center_ortho, thumb: thumb_shopping, caption: '2D Orthomosaic (1.5 cm GSD)', type: 'image' },
    ],
    thumbnail: thumb_shopping,
  },
]

function LazyImage({ src, thumb, alt, className, onClick }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`lazy-img-wrap ${className || ''}`} onClick={onClick}>
      <img src={thumb} alt={alt} className="lazy-img-thumb" />
      <img
        src={src}
        alt={alt}
        className={`lazy-img-full${loaded ? ' loaded' : ''}`}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && <div className="lazy-img-spinner" />}
    </div>
  )
}

function FullImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="full-img-wrap">
      {!loaded && <div className="lazy-img-spinner" />}
      <img
        src={src}
        alt={alt}
        className={loaded ? 'loaded' : ''}
        onLoad={() => setLoaded(true)}
      />
    </div>
  )
}

function Lightbox({ images, index, onClose, onNavigate }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
  }, [index])

  const handleKeyDown = useCallback(
    (e) => {
      e.stopImmediatePropagation()
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && index > 0) onNavigate(index - 1)
      if (e.key === 'ArrowRight' && index < images.length - 1) onNavigate(index + 1)
    },
    [onClose, onNavigate, index, images.length],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [handleKeyDown])

  const current = images[index]

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      {index > 0 && (
        <button
          className="lightbox-nav lightbox-prev"
          onClick={(e) => { e.stopPropagation(); onNavigate(index - 1) }}
          aria-label="Previous"
        >
          ‹
        </button>
      )}
      {index < images.length - 1 && (
        <button
          className="lightbox-nav lightbox-next"
          onClick={(e) => { e.stopPropagation(); onNavigate(index + 1) }}
          aria-label="Next"
        >
          ›
        </button>
      )}
      <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
        {!loaded && <div className="lightbox-loader" />}
        <img
          src={current.src}
          alt={current.caption}
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0 }}
        />
        {current.caption && <p className="lightbox-caption">{current.caption}</p>}
      </div>
      <div className="lightbox-counter">
        {index + 1} / {images.length}
      </div>
    </div>
  )
}

function ProjectModal({ project, onClose, onOpenLightbox }) {
  const imageMedia = project.media.filter((m) => m.type === 'image')
  const heroImage = imageMedia[0]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  const openLightbox = (src) => {
    const idx = imageMedia.findIndex((m) => m.src === src)
    if (idx >= 0) onOpenLightbox(imageMedia, idx)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project">
          ×
        </button>

        {heroImage && (
          <div className="modal-hero">
            <FullImage src={heroImage.src} alt={project.title} />
            <div className="modal-hero-fade" />
          </div>
        )}

        <div className="modal-body">
          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-location">{project.subtitle} — {project.location}</p>

          <div className="modal-stats">
            {project.stats.map((s) => (
              <div key={s.label} className="stat-block">
                <span className="stat-val">{s.value}</span>
                <span className="stat-lbl">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="modal-desc">{project.description}</p>

          <h3 className="modal-gallery-heading">Deliverables</h3>
          <div className="modal-gallery">
            {project.media.map((item, i) =>
              item.type === 'model' ? (
                <div key={i} className="gallery-pano">
                  <Suspense fallback={<div className="model-loader"><p className="model-loader-text">Loading viewer…</p></div>}>
                    <ModelViewer url={item.src} height={450} />
                  </Suspense>
                  <p className="gallery-caption">
                    <span className="caption-badge">Interactive</span>
                    {item.caption}
                  </p>
                </div>
              ) : item.type === 'pano' ? (
                <div key={i} className="gallery-pano">
                  <R3FPano src={item.src} height={320} />
                  <p className="gallery-caption">
                    <span className="caption-badge">Interactive</span>
                    {item.caption}
                  </p>
                </div>
              ) : (
                <button key={i} className="gallery-img" onClick={() => openLightbox(item.src)}>
                  <FullImage src={item.src} alt={item.caption} />
                  <div className="gallery-img-hover">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                  <p className="gallery-caption">{item.caption}</p>
                </button>
              ),
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  const filtered =
    filter === 'all' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="portfolio" className="section section-portfolio">
      <div className="container">
        <div className="section-head">
          <h2>Portfolio</h2>
          <p className="section-sub">
            Select a project to explore deliverables and interactive viewers.
          </p>
        </div>

        <div className="filter-bar">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`filter-btn${filter === c.key ? ' active' : ''}`}
              onClick={() => setFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="project-grid" key={filter}>
          {filtered.map((p) => (
            <article
              key={p.id}
              className="project-card"
              onClick={() => setSelectedProject(p)}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedProject(p)}
            >
              <div className="project-thumb">
                <img src={p.thumbnail} alt={p.title} />
                <div className="project-thumb-over">
                  <span>View Project &rarr;</span>
                </div>
              </div>
              <div className="project-info">
                <h3>{p.title}</h3>
                <p>{p.subtitle}</p>
                <div className="project-tags">
                  {p.categories.map((c) => (
                    <span key={c} className="tag">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="portfolio-note">
          Need live ortho viewers or interactive 3D models? Request access in your quote.
        </p>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onOpenLightbox={(images, index) => setLightbox({ images, index })}
        />
      )}

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          index={lightbox.index}
          onClose={() => setLightbox(null)}
          onNavigate={(i) => setLightbox((lb) => ({ ...lb, index: i }))}
        />
      )}
    </section>
  )
}
