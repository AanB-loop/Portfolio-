import { motion, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { EASE, fadeUp, stagger, maskReveal } from '../lib/motion'
import useMousePosition from '../lib/useMousePosition'
import { MagneticButton } from './Navbar'
import ImageSlot from './ImageSlot'
import profile from '../assets/images/profile.png'

const CHIPS = [
  {
    title: 'React developer',
    sub: 'Frontend',
    depth: 22,
    float: 9,
    pos: 'top-[9%] left-[2%]',
  },
  {
    title: 'Creative developer',
    sub: 'UI & motion',
    depth: 14,
    float: 12,
    pos: 'bottom-[22%] right-[2%]',
  },
  {
    title: 'Available for projects',
    depth: 30,
    float: 15,
    pos: 'bottom-[5%] left-[8%] hidden lg:flex',
  },
]

function StatusDot() {
  return (
    <span className="relative inline-block h-[7px] w-[7px] rounded-full bg-cyan-brand">
      <motion.span
        animate={{ scale: [0.6, 1.5], opacity: [0.9, 0] }}
        transition={{
          duration: 2.6,
          repeat: Infinity,
          ease: 'easeOut',
        }}
        className="absolute -inset-1 rounded-full border border-cyan-brand"
      />
    </span>
  )
}

function FloatingChip({ chip, pointer }) {
  const x = useTransform(pointer.x, (v) => -v * chip.depth)
  const y = useTransform(pointer.y, (v) => -v * chip.depth * 0.7)

  return (
    <motion.div
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.9,
        ease: EASE,
        delay: 1.1,
      }}
      className={`absolute z-10 ${chip.pos}`}
    >
      <motion.div
        animate={{ y: [0, -11, 0] }}
        transition={{
          duration: chip.float,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="flex items-center gap-2.5 whitespace-nowrap rounded-[3px] border border-ink/10 bg-cream/80 px-4 py-2.5 text-[0.79rem] font-semibold shadow-[0_18px_40px_-26px_rgba(11,11,13,0.5)] backdrop-blur-md"
      >
        {!chip.sub && <StatusDot />}
        <span>
          {chip.title}
          {chip.sub && (
            <small className="block text-[0.68rem] font-medium tracking-[0.06em] text-ink/55">
              {chip.sub}
            </small>
          )}
        </span>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const pointer = useMousePosition()

  const rotateY = useTransform(pointer.x, (v) => v * 5)
  const rotateX = useTransform(pointer.y, (v) => -v * 4)
  const tx = useTransform(pointer.x, (v) => v * 10)
  const ty = useTransform(pointer.y, (v) => v * 8)

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center pb-20 pt-36"
    >
      {/* Oversized ghost wordmark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[4%] left-1/2 z-0 -translate-x-1/2 whitespace-nowrap font-display text-[clamp(5rem,20vw,19rem)] font-bold leading-none tracking-[0.02em] text-ink opacity-[0.045]"
      >
        COMPASS
      </span>

      <div className="wrap relative z-[1] grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[4.5rem]">

        {/* ---- Left column ---- */}
        <motion.div
          variants={stagger(0.1, 0.25)}
          initial="hidden"
          animate="show"
          className="w-full sm:translate-x-[10px] md:translate-x-[20px] lg:translate-x-[40px]"
        >
          {/* Inner wrapper for motion transforms */}
          <motion.div
            style={{ x: tx, y: ty }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="space-y-7"
          >
            <motion.p variants={fadeUp} className="eyebrow">
              COMPASS — Web development &amp; digital solutions
            </motion.p>
<motion.h1
  variants={fadeUp}
  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug sm:leading-tight text-center sm:text-left font-bold"
>
  Turning ideas into <br className="hidden sm:block" />
  <span className="text-gradient">digital experiences.</span>
</motion.h1>


            {/* Responsive lede paragraph */}
           <motion.p
  variants={fadeUp}
  className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed max-w-[90%] sm:max-w-[80%] md:max-w-[70%] text-left text-ink/80"
>
  COMPASS builds modern, responsive websites and web applications
  designed to help businesses establish a strong digital presence.
</motion.p>


            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <a href="#projects">
                <MagneticButton>View projects</MagneticButton>
              </a>
              <a href="#contact">
                <MagneticButton variant="ghost">Let’s work together</MagneticButton>
              </a>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="flex items-center gap-2.5 text-sm text-ink/55 justify-center sm:justify-start"
            >
              <StatusDot />
              Available for freelance projects
            </motion.p>
          </motion.div>
        </motion.div>

        {/* ---- Right column: portrait stage ---- */}
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[380px] [perspective:1400px] lg:max-w-none">
          <motion.div
            variants={maskReveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.4 }}
            style={{
              rotateY,
              rotateX,
              transformStyle: 'preserve-3d',
            }}
            className="relative aspect-[4/5] overflow-hidden rounded-[4px] border border-cream/20 shadow-[0_40px_90px_-40px_rgba(11,11,13,0.55)]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ink-2 to-ink-deep" />
            <ImageSlot
              src={profile}
              alt="Portrait of the developer behind COMPASS"
              name="profile.png"
              hint="4:5 portrait"
              dark
              className="object-top"
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(110% 70% at 70% 0%, rgba(67,56,202,0.32), transparent 60%), linear-gradient(0deg, rgba(11,11,13,0.5), transparent 55%)',
              }}
            />
          </motion.div>

          {CHIPS.map((chip) => (
            <FloatingChip key={chip.title} chip={chip} pointer={pointer} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-3 text-[0.7rem] tracking-[0.24em] text-ink/55 lg:flex"
      >
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.span>
        Scroll
      </motion.a>
    </section>
  )
}
