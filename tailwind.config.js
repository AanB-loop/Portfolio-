/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream:   { DEFAULT: '#F3F0E8', 2: '#EEEAE0', 3: '#E8E4D9' },
        ink:     { DEFAULT: '#111111', deep: '#0B0B0D', 2: '#1A1A1A' },
        indigo:  { brand: '#4338CA' },
        electric:'#2563EB',
        violet:  { brand: '#7C3AED' },
        cyan:    { brand: '#0891B2' },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'sans-serif'],
      },
      letterSpacing: { tightest: '-.035em' },
      transitionTimingFunction: { premium: 'cubic-bezier(.22,1,.36,1)' },
    },
  },
  plugins: [],
}
