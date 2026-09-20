import { motion, useTransform } from 'framer-motion'
import useMousePosition from '../lib/useMousePosition'

/**
 * Fixed atmospheric layer: cream base, three blurred accent orbs,
 * a fine grid, and a multiply-blended noise grain.
 * The lead orb drifts with the cursor; everything else breathes on its own.
 */
export default function AnimatedBackground() {
  const pointer = useMousePosition()
  const orbX = useTransform(pointer.x, (v) => v * 46)
  const orbY = useTransform(pointer.y, (v) => v * 36)

  const drift = {
    animate: { x: ['0%', '-4%', '0%'], y: ['0%', '5%', '0%'] },
  }

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Indigo — follows the cursor */}
      <motion.div
        style={{ x: orbX, y: orbY }}
        className="absolute left-[52%] -top-[8%] h-[46vw] w-[46vw] rounded-full opacity-30 blur-[90px]"
      >
        <motion.div
          {...drift}
          transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
          className="h-full w-full rounded-full"
          style={{ background: 'radial-gradient(circle, #4338CA, transparent 66%)' }}
        />
      </motion.div>

      {/* Violet */}
      <motion.div
        {...drift}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }}
        className="absolute -left-[8%] top-[34%] h-[34vw] w-[34vw] rounded-full opacity-20 blur-[90px]"
        style={{ background: 'radial-gradient(circle, #7C3AED, transparent 66%)' }}
      />

      {/* Cyan — the faintest note in the palette */}
      <motion.div
        {...drift}
        transition={{ duration: 40, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-[30%] top-[70%] h-[26vw] w-[26vw] rounded-full opacity-[0.14] blur-[90px]"
        style={{ background: 'radial-gradient(circle, #0891B2, transparent 66%)' }}
      />

      <div className="absolute -inset-px bg-grid opacity-[0.28]" />
      <div className="absolute inset-0 bg-noise opacity-30" />
    </div>
  )
}
