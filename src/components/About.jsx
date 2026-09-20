import { motion } from 'framer-motion'
import { fadeUp, inView, stagger } from '../lib/motion'
import { Reveal, SectionHead } from './Section'

const CAPABILITIES = [
  { n: '01', title: 'Clean development', body: 'Writing structured and maintainable code.' },
  { n: '02', title: 'Modern UI', body: 'Creating responsive interfaces with strong visual identity.' },
  { n: '03', title: 'Performance', body: 'Building fast and optimized experiences.' },
  { n: '04', title: 'Client focused', body: 'Understanding requirements and delivering practical solutions.' },
]

export default function About() {
  return (
    <section id="about" className="py-[clamp(5rem,11vw,9.5rem)]">
      <div className="wrap">
        <SectionHead title="Building with purpose." aside="About" asideIsEyebrow />

        <div className="mb-16 grid gap-8 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="max-w-[26ch] font-display text-[1.28rem] leading-[1.5] tracking-tightest text-ink">
              COMPASS focuses on clean, responsive digital experiences that combine strong design
              with practical technology.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lede">
              I&rsquo;m the developer behind COMPASS — a frontend developer working mainly in React,
              building websites and web apps for small businesses and independent brands. I like
              problems where the interface has to do real work: bookings, dashboards, catalogues.
              Every project ships as code I&rsquo;d be happy to maintain a year later.
            </p>
            <p className="lede mt-5">Based in Kerala, working with clients anywhere.</p>
          </Reveal>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid border-t hairline md:grid-cols-2"
        >
          {CAPABILITIES.map((c, i) => (
            <motion.article
              key={c.n}
              variants={fadeUp}
              className={`group border-b hairline py-9 transition-[background-color,padding] duration-500 ease-premium hover:bg-cream-3 ${
                i % 2 === 0
                  ? 'md:border-r md:pr-12 md:hover:pl-4'
                  : 'md:pl-12 md:hover:pl-16'
              }`}
            >
              <span className="font-display text-[0.78rem] font-semibold tracking-[0.12em] text-indigo-brand">
                {c.n}
              </span>
              <h3 className="mb-2 mt-3.5 text-[1.3rem]">{c.title}</h3>
              <p className="m-0 max-w-[40ch] text-[0.93rem] text-ink/55">{c.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
