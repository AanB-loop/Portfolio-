import { Github, Linkedin, Instagram, MessageCircle } from 'lucide-react'

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

const SOCIAL = [
  { label: 'GitHub', href: '#', Icon: Github },
  { label: 'LinkedIn', href: '#', Icon: Linkedin },
  { label: 'Instagram', href: '#', Icon: Instagram },
  { label: 'WhatsApp', href: '#', Icon: MessageCircle },
]

export default function Footer() {
  return (
    <footer className="relative z-[1] border-t hairline bg-cream-2 pb-10 pt-16">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap justify-between gap-10">
          <div>
            <span className="mb-3 flex items-center gap-[0.65rem] font-display text-[1.05rem] font-bold tracking-[0.34em]">
              <span className="relative h-[9px] w-[9px] rotate-45 border-[1.5px] border-ink">
                <span className="absolute inset-[2.5px] bg-indigo-brand" />
              </span>
              COMPASS
            </span>
            <p className="m-0 text-[0.92rem] text-ink/55">Building modern digital experiences.</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-6 text-[0.9rem] text-ink/55">
            {NAV.map(({ label, href }) => (
              <a key={label} href={href} className="transition-colors duration-300 hover:text-ink">
                {label}
              </a>
            ))}
          </nav>

          <nav aria-label="Social" className="flex gap-5">
            {SOCIAL.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-ink/55 transition-colors duration-300 hover:text-indigo-brand"
              >
                <Icon size={18} strokeWidth={1.6} />
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-wrap justify-between gap-4 border-t hairline pt-6 text-[0.8rem] text-ink/50">
          <span>© 2026 COMPASS. All rights reserved.</span>
          <span>Designed &amp; built in Kerala</span>
        </div>
      </div>
    </footer>
  )
}
