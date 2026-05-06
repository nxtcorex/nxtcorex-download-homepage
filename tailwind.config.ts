import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#0e0e0f',
        'brand-bg-secondary': '#1c1c1e',
        'brand-bg-tertiary': '#2a2a2d',
        'brand-bg-terminal': '#0a0a0b',
        'brand-orange': '#e8611a',
        'brand-orange-light': '#f07a38',
        'brand-text': '#f4f2ed',
        'brand-text-secondary': '#c8c4bb',
        'brand-border': 'rgba(255, 255, 255, 0.07)',
        'brand-border-strong': 'rgba(255, 255, 255, 0.12)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      animation: {
        'spin-y': 'spin-y 18s linear infinite',
        'pulse-expand': 'pulse-expand 4s ease-out infinite',
        'blink': 'blink 1.1s step-end infinite',
      },
      keyframes: {
        'spin-y': {
          from: { transform: 'rotateY(0deg)' },
          to: { transform: 'rotateY(360deg)' },
        },
        'pulse-expand': {
          '0%': { width: '320px', height: '320px', opacity: '0.5' },
          '100%': { width: '580px', height: '580px', opacity: '0' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
