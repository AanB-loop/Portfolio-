import { motion } from 'framer-motion'
import { ArrowUpRight, Github } from 'lucide-react'
import { fadeUp, inView, EASE } from '../lib/motion'
import { SectionHead } from './Section'
import { MagneticButton } from './Navbar'
import ImageSlot from './ImageSlot'
import lakshmi from '../assets/images/lakshmi-travels.png'
import salon from '../assets/images/salon-booking.png'

const PROJECTS = [
  {
    index: 'Project 01',
    title: 'Lakshmi Travels',
    body: 'A modern travel company website designed to showcase tourist vehicles and Kerala travel services.',
    stack: 'React · Vite · Responsive design · SEO · Vercel',
    image: lakshmi,
    file: 'lakshmi-travels.png',
    demo: '#',
    repo: '#',
  },
  {
    index: 'Project 02',
    title: 'Salon Booking System',
    body: 'A complete frontend booking experience with authentication, services, wishlist, cart, checkout, bookings and an admin dashboard.',
    stack: 'React · Redux Toolkit · TanStack Query · JSON Server · Tailwind CSS',
    image: salon,
    file: 'salon-booking.png',
    demo: '#',
    repo: '#',
  },
]

function Project({ p, flipped }) {
  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      whileInView="show"
      variants={fadeUp}
      viewport={inView}
      className="mb-20 grid items-center gap-7 md:mb-28 md:grid-cols-2 md:gap-14"
    >
      <motion.div
        variants={{ rest: { y: 0 }, hover: { y: -6 } }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`relative aspect-[16/10] overflow-hidden rounded-[3px] border hairline bg-gradient-to-br from-cream-3 to-cream-2 ${
          flipped ? 'md:order-2' : ''
        }`}
      >
        <motion.div
          variants={{ rest: { scale: 1 }, hover: { scale: 1.045 } }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0"
        >
          <ImageSlot src={p.image} alt={`${p.title} interface`} name={p.file} hint="16:10 screenshot" />
        </motion.div>

        {/* Gradient edge glow on hover */}
        <motion.div
          variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
          transition={{ duration: 0.6, ease: EASE }}
          className="pointer-events-none absolute inset-0"
          style={{ background: 'linear-gradient(120deg, rgba(67,56,202,0.16), rgba(124,58,237,0.10))' }}
        />
      </motion.div>

      <div>
        <span className="font-display text-[0.78rem] font-semibold tracking-[0.12em] text-indigo-brand">
          {p.index}
        </span>
        <h3 className="mb-4 mt-3 text-[clamp(1.9rem,3.4vw,2.9rem)]">{p.title}</h3>
        <p className="lede">{p.body}</p>

        <motion.p
          variants={{ rest: { opacity: 0.55, x: 0 }, hover: { opacity: 1, x: 4 } }}
          transition={{ duration: 0.5, ease: EASE }}
          className="my-6 text-[0.8rem] tracking-[0.04em] text-ink/55"
        >
          {p.stack}
        </motion.p>

        <div className="flex flex-wrap gap-3">
          <a href={p.demo} target="_blank" rel="noreferrer">
            <MagneticButton>
              Live demo <ArrowUpRight size={15} strokeWidth={2} />
            </MagneticButton>
          </a>
          <a href={p.repo} target="_blank" rel="noreferrer">
            <MagneticButton variant="ghost">
              <Github size={15} strokeWidth={1.75} /> GitHub
            </MagneticButton>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-[clamp(5rem,11vw,9.5rem)]">
      <div className="wrap">
        <SectionHead title="Selected projects" aside="Some of the digital experiences I've built." />
        {PROJECTS.map((p, i) => (
          <Project key={p.title} p={p} flipped={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
