import { motion, useReducedMotion } from 'framer-motion'
import {
  Code2, Palette, FileCode, Atom, Layers, Database,
  Wind, GitBranch, Github, Triangle,
} from 'lucide-react'

const TECH = [
  { label: 'HTML', Icon: FileCode },
  { label: 'CSS', Icon: Palette },
  { label: 'JavaScript', Icon: Code2 },
  { label: 'React', Icon: Atom },
  { label: 'Redux Toolkit', Icon: Layers },
  { label: 'TanStack Query', Icon: Database },
  { label: 'Tailwind CSS', Icon: Wind },
  { label: 'Git', Icon: GitBranch },
  { label: 'GitHub', Icon: Github },
  { label: 'Vercel', Icon: Triangle },
]

export default function TechStack() {
  const reduce = useReducedMotion()
  const row = [...TECH, ...TECH] // duplicated so the loop never shows a seam

  return (
    <section aria-label="Technologies I work with" className="marquee-mask overflow-hidden border-y hairline py-8">
      <motion.div
        className="flex w-max gap-4"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={reduce ? undefined : { duration: 42, repeat: Infinity, ease: 'linear' }}
        style={reduce ? { flexWrap: 'wrap', width: '100%', justifyContent: 'center' } : undefined}
      >
        {row.map(({ label, Icon }, i) => (
          <span
            key={`${label}-${i}`}
            className="flex items-center gap-2.5 whitespace-nowrap rounded-full border hairline bg-cream-2 px-5 py-2.5 text-[0.86rem] font-medium"
          >
            <Icon size={15} strokeWidth={1.6} className="text-indigo-brand" aria-hidden="true" />
            {label}
          </span>
        ))}
      </motion.div>
    </section>
  )
}
