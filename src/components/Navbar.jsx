import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { EASE } from '../lib/motion'
import useActiveSection from '../lib/useActiveSection'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const SECTIONS = ['home', 'about', 'projects', 'services', 'contact']

function Wordmark() {
  return (
    <span className="flex items-center gap-[0.65rem] font-display text-[1.05rem] font-bold tracking-[0.34em]">
      <span className="relative h-[9px] w-[9px] rotate-45 border-[1.5px] border-ink">
        <span className="absolute inset-[2.5px] bg-indigo-brand" />
      </span>
      COMPASS
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { scrollY } = useScroll()
  const active = useActiveSection(SECTIONS)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  // Lock the page behind the mobile sheet, and let Escape close it.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,backdrop-filter,border-color] duration-500"
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
          backgroundColor: scrolled ? 'rgba(243,240,232,0.78)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(140%)' : 'none',
          borderBottomColor: scrolled ? 'var(--hair)' : 'transparent',
        }}
      >
        <div
          className="wrap flex items-center justify-between gap-8 transition-[height] duration-500 ease-premium"
          style={{ height: scrolled ? 66 : 88 }}
        >
          <a href="#home" aria-label="COMPASS, back to top"><Wordmark /></a>

          <nav className="hidden items-center gap-10 text-[0.87rem] font-medium lg:flex" aria-label="Primary">
            {LINKS.map(({ label, href }) => {
              const isActive = active === href.slice(1)
              return (
                <a
                  key={href}
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative py-1.5 transition-colors duration-300 ${
                    isActive ? 'text-ink' : 'text-ink/55 hover:text-ink'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute bottom-0 left-0 h-px w-full origin-right bg-ink transition-transform duration-500 ease-premium group-hover:origin-left group-hover:scale-x-100 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              )
            })}
          </nav>

          <a href="#contact" className="hidden lg:inline-flex">
            <MagneticButton>Let&rsquo;s work together</MagneticButton>
          </a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="relative h-[46px] w-[46px] rounded-full border hairline lg:hidden"
          >
            <motion.span
              animate={open ? { top: 22, rotate: 45 } : { top: 19, rotate: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute left-[14px] h-[1.5px] w-[18px] bg-ink"
            />
            <motion.span
              animate={open ? { top: 22, rotate: -45 } : { top: 25, rotate: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="absolute left-[14px] h-[1.5px] w-[18px] bg-ink"
            />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-45 flex flex-col gap-1 bg-cream-2 px-8 pb-12 pt-32 lg:hidden"
          >
            {[...LINKS.slice(0, 2), { label: 'Services', href: '#services' }, ...LINKS.slice(2)].map(
              ({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: EASE, delay: 0.18 + i * 0.06 }}
                  className="border-b hairline py-2 font-display text-[2.4rem] font-medium tracking-tightest"
                >
                  {label}
                </motion.a>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/** Pill CTA that leans a few pixels toward the cursor. */
export function MagneticButton({ children, variant = 'solid', className = '', ...props }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    setOffset({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.32,
    })
  }

  const solid =
    'border-ink-deep bg-ink-deep text-cream hover:[&>span:first-child]:opacity-100'
  const ghost = 'border-ink/15 bg-transparent text-ink hover:border-ink/40'

  return (
    <motion.span
      onPointerMove={handleMove}
      onPointerLeave={() => setOffset({ x: 0, y: 0 })}
      animate={offset}
      transition={{ type: 'spring', stiffness: 150, damping: 18, mass: 0.6 }}
      className={`relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full border px-6 py-3 text-[0.84rem] font-semibold ${
        variant === 'solid' ? solid : ghost
      } ${className}`}
      {...props}
    >
      {variant === 'solid' && (
        <span
          className="absolute inset-0 opacity-0 transition-opacity duration-500"
          style={{ background: 'linear-gradient(110deg,#4338CA,#7C3AED)' }}
        />
      )}
      <span className="relative z-[1]">{children}</span>
    </motion.span>
  )
}
