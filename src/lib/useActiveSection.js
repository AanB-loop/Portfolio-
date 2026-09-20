import { useEffect, useState } from 'react'

/** Tracks which section owns the middle of the viewport. */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const observers = ids.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const io = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(id),
        { rootMargin: '-45% 0px -50% 0px' }
      )
      io.observe(el)
      return io
    })
    return () => observers.forEach((o) => o && o.disconnect())
  }, [ids])

  return active
}
