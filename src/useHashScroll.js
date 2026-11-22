import { useEffect } from 'react'

// When arriving from another page via a link like /#portfolio, the browser tries to
// scroll before React has rendered the section. Scroll once after the first render.
export function useHashScroll() {
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (!id) return
    const el = document.getElementById(id)
    if (el) el.scrollIntoView()
  }, [])
}
