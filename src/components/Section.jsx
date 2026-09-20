import { motion } from 'framer-motion'
import { fadeUp, inView } from '../lib/motion'

/** Scroll-reveal wrapper. One consistent entrance for the whole page. */
export function Reveal({ children, delay = 0, className = '', as = 'div' }) {
  const Tag = motion[as] || motion.div
  return (
    <Tag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      className={className}
    >
      {children}
    </Tag>
  )
}

/** Section header: heading left, supporting note right, hairline beneath. */
export function SectionHead({ title, aside, asideIsEyebrow = false }) {
  return (
    <div className="mb-16 flex flex-wrap items-end justify-between gap-8 border-b hairline pb-8">
      <Reveal as="h2">{title}</Reveal>
      {aside && (
        <Reveal delay={0.08}>
          {asideIsEyebrow ? <p className="eyebrow">{aside}</p> : <p className="lede m-0 max-w-[34ch]">{aside}</p>}
        </Reveal>
      )}
    </div>
  )
}
