import { motion } from 'framer-motion'
import { fadeUp, inView, stagger } from '../lib/motion'
import { SectionHead } from './Section'

const SERVICES = [
  { title: 'Websites', body: 'Modern websites for businesses, brands and personal portfolios.' },
  { title: 'Landing pages', body: 'High-converting landing pages with modern UI.' },
  { title: 'Web applications', body: 'Interactive React applications with real functionality.' },
  { title: 'Booking systems', body: 'Custom booking and scheduling interfaces.' },
  { title: 'Responsive design', body: 'Pixel-clean experiences across desktop, tablet and mobile.' },
  { title: 'Deployment & SEO', body: 'Deployment, domain setup and basic SEO support.' },
]

export default function Services() {
  return (
    <section id="services" className="pb-[clamp(5rem,11vw,9.5rem)]">
      <div className="wrap">
        <SectionHead title="What I can build" aside="Services" asideIsEyebrow />

        {/* Deliberately unnumbered: six services are a menu, not a sequence. */}
        <motion.div
          variants={stagger(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid border-t hairline md:grid-cols-2"
        >
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.title}
              variants={fadeUp}
              className={`group border-b hairline py-9 transition-[background-color,padding] duration-500 ease-premium hover:bg-cream-3 ${
                i % 2 === 0 ? 'md:border-r md:pr-12 md:hover:pl-4' : 'md:pl-12 md:hover:pl-16'
              }`}
            >
              <h3 className="mb-2 text-[1.3rem]">{s.title}</h3>
              <p className="m-0 max-w-[40ch] text-[0.93rem] text-ink/55">{s.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
