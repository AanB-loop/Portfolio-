// Shared motion language for COMPASS.
// Slow, cinematic easing; no bounce, no overshoot.

export const EASE = [0.22, 1, 0.36, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE } },
}

export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Masked reveal used for headlines and the hero portrait.
export const maskReveal = {
  hidden: { clipPath: 'inset(0 0 100% 0)', opacity: 0 },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    opacity: 1,
    transition: { duration: 1.25, ease: EASE },
  },
}

// Standard viewport config: fire once, slightly before fully in view.
export const inView = { once: true, margin: '0px 0px -12% 0px' }
