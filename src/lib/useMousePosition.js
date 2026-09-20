import { useEffect } from 'react'
import { useMotionValue, useSpring, useReducedMotion, useTransform } from 'framer-motion'

/**
 * Normalised cursor position (-0.5 .. 0.5), smoothed by a soft spring.
 * Inert for reduced-motion users and coarse pointers.
 */
export default function useMousePosition() {
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const spring = { stiffness: 60, damping: 22, mass: 0.7 }
  const sx = useSpring(x, spring)
  const sy = useSpring(y, spring)

  useEffect(() => {
    if (reduce) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      x.set(e.clientX / window.innerWidth - 0.5)
      y.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduce, x, y])

  return { x: sx, y: sy, enabled: !reduce }
}

/** Map the smoothed cursor to a pixel offset at a given depth. */
export function useParallax(pointer, depth = 20, ratio = 0.72) {
  return {
    x: useTransform(pointer.x, (v) => -v * depth),
    y: useTransform(pointer.y, (v) => -v * depth * ratio),
  }
}
