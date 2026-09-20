import { useState } from 'react'

/**
 * Renders an image, or a labelled placeholder if the file is missing.
 * Lets the layout be reviewed before the real assets land.
 */
export default function ImageSlot({ src, alt, name, hint, dark = false, className = '' }) {
  const [failed, setFailed] = useState(!src)

  if (!failed) {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
      />
    )
  }

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-[0.76rem] tracking-[0.14em] ${
        dark ? 'text-cream/45' : 'text-ink/50'
      }`}
    >
      <b className={`font-display text-[0.9rem] tracking-[0.06em] ${dark ? 'text-cream/80' : 'text-ink'}`}>
        {name}
      </b>
      <span>{hint} · src/assets/images/</span>
    </div>
  )
}
