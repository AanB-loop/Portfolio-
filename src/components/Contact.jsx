import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  MessageCircle,
  Mail,
  Instagram,
  Linkedin,
  Github,
  Check,
  ChevronDown,
} from 'lucide-react'
import { fadeUp, inView, stagger } from '../lib/motion'
import { Reveal } from './Section'
import { MagneticButton } from './Navbar'

const DIRECT = [
  {
    label: 'WhatsApp',
    value: '+91 · 9744331189',
    href: 'https://wa.me/919744331189',
    Icon: MessageCircle,
  },
  {
    label: 'Email',
    value: 'aanbgodwin@gmail.com',
    href: 'mailto:aanbgodwin@gmail.com',
    Icon: Mail,
  },
  {
    label: 'Instagram',
    value: '@compass',
    href: 'https://www.instagram.com/hlo_aanbyy/?utm_source=ig_web_button_share_sheet',
    Icon: Instagram,
  },
  {
    label: 'LinkedIn',
    value: '/in/compass',
    href: 'https://www.linkedin.com/in/aanbgodwin/',
    Icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: '/compass',
    href: 'https://github.com/AanB-loop',
    Icon: Github,
  },
]

const PROJECT_TYPES = [
  'Website',
  'Landing page',
  'Web application',
  'Booking system',
  'Something else',
]

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [typeOpen, setTypeOpen] = useState(false)
  const [selectedType, setSelectedType] = useState('')

 const handleSubmit = async (e) => {
  e.preventDefault()

  if (!selectedType) {
    alert('Please select a project type.')
    return
  }

  const form = e.currentTarget
  const formData = new FormData(form)

  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        type: selectedType,
        message,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || 'Failed to send message')
    }

    setSent(true)

    form.reset()

    setSelectedType('')
    setTypeOpen(false)

    setTimeout(() => {
      setSent(false)
    }, 2600)
  } catch (error) {
    console.error(error)
    alert('Something went wrong. Please try again.')
  }
}
  const handleTypeSelect = (type) => {
    setSelectedType(type)
    setTypeOpen(false)
  }

  return (
    <section
      id="contact"
      className="relative py-[clamp(5rem,11vw,9.5rem)]"
    >
      {/* Background glow */}
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.16, 0.26, 0.16] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[38vw] w-[38vw] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, #4338CA, transparent 68%)',
        }}
      />

      <div className="wrap grid items-start gap-14 md:grid-cols-2 md:gap-20">

        {/* =================================
            LEFT — CONTACT DETAILS
        ================================== */}
        <div>
          <Reveal as="h2">
            Have an idea?
            <br />
            Let&rsquo;s build it.
          </Reveal>

          <Reveal delay={0.08}>
            <p className="lede mt-7">
              Whether you need a business website, landing page or custom web
              application, let&rsquo;s discuss your idea.
            </p>
          </Reveal>

          <motion.div
            variants={stagger(0.07)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-12 flex flex-col border-t hairline"
          >
            {DIRECT.map(({ label, value, href, Icon }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={label === 'Email' ? undefined : '_blank'}
                rel={
                  label === 'Email'
                    ? undefined
                    : 'noopener noreferrer'
                }
                className="group flex items-center justify-between border-b hairline py-[1.15rem] text-[0.95rem] transition-[padding-left,color] duration-500 ease-premium hover:pl-3.5 hover:text-indigo-brand"
              >
                <span className="flex items-center gap-3">
                  <Icon
                    size={16}
                    strokeWidth={1.6}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />

                  {label}
                </span>

                <span className="text-right text-[0.84rem] text-ink/50 transition-colors duration-300 group-hover:text-indigo-brand/70">
                  {value}
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* =================================
            RIGHT — CONTACT FORM
        ================================== */}
        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-x-6 gap-y-7 sm:grid-cols-2"
          >

            {/* NAME */}
            <div className="group flex flex-col gap-2">
              <label
                htmlFor="name"
                className="text-[0.76rem] font-semibold tracking-[0.12em] text-ink/55 transition-colors duration-300 group-focus-within:text-indigo-brand"
              >
                Name
              </label>

              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Your name"
                className="field-input"
              />
            </div>

            {/* EMAIL */}
            <div className="group flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-[0.76rem] font-semibold tracking-[0.12em] text-ink/55 transition-colors duration-300 group-focus-within:text-indigo-brand"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="field-input"
              />
            </div>

            {/* PROJECT TYPE */}
            <div className="group flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="project-type"
                className="text-[0.76rem] font-semibold tracking-[0.12em] text-ink/55"
              >
                Project type
              </label>

              <div className="relative">
                {/* Custom select button */}
                <button
                  id="project-type"
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={typeOpen}
                  onClick={() => setTypeOpen((prev) => !prev)}
                  className={`field-input flex w-full items-center justify-between text-left ${
                    typeOpen
                      ? 'border-indigo-brand/60 bg-white/70 shadow-[0_0_0_4px_rgba(67,56,202,0.07)]'
                      : ''
                  }`}
                >
                  <span
                    className={
                      selectedType
                        ? 'text-ink'
                        : 'text-ink/35'
                    }
                  >
                    {selectedType || 'Select a project type'}
                  </span>

                  <ChevronDown
                    size={17}
                    strokeWidth={1.7}
                    className={`shrink-0 text-ink/40 transition-all duration-300 ${
                      typeOpen
                        ? 'rotate-180 text-indigo-brand'
                        : ''
                    }`}
                  />
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {typeOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        y: -8,
                        scale: 0.98,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: 'easeOut',
                      }}
                      role="listbox"
                      className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-xl border border-ink/10 bg-cream/95 p-1.5 shadow-[0_25px_70px_-25px_rgba(11,11,13,0.4)] backdrop-blur-2xl"
                    >
                      {PROJECT_TYPES.map((type, index) => {
                        const isSelected =
                          selectedType === type

                        return (
                          <motion.button
                            key={type}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            initial={{
                              opacity: 0,
                              x: -5,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay: index * 0.035,
                              duration: 0.2,
                            }}
                            onClick={() =>
                              handleTypeSelect(type)
                            }
                            className={`group flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-[0.88rem] transition-all duration-200 ${
                              isSelected
                                ? 'bg-indigo-brand text-white'
                                : 'text-ink/70 hover:bg-ink/[0.045] hover:pl-5 hover:text-ink'
                            }`}
                          >
                            <span>{type}</span>

                            {isSelected && (
                              <Check
                                size={15}
                                strokeWidth={2}
                              />
                            )}
                          </motion.button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Hidden form value */}
                <input
                  type="hidden"
                  name="type"
                  value={selectedType}
                />
              </div>
            </div>

            {/* MESSAGE */}
            <div className="group flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="message"
                className="text-[0.76rem] font-semibold tracking-[0.12em] text-ink/55 transition-colors duration-300 group-focus-within:text-indigo-brand"
              >
                Message
              </label>

              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Tell us about your project..."
                className="field-input min-h-[140px] resize-y"
              />
            </div>

            {/* SUBMIT */}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full rounded-full"
              >
                <MagneticButton className="w-full">
                  {sent
                    ? 'Message sent'
                    : 'Send message'}
                </MagneticButton>
              </button>

              <p
                aria-live="polite"
                className="sr-only"
              >
                {sent ? 'Message sent' : ''}
              </p>
            </div>

          </form>
        </Reveal>
      </div>
    </section>
  )
}