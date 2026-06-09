import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        'brand-bg': 'hsl(var(--background))',
        'brand-bg-secondary': 'hsl(var(--card))',
        'brand-bg-tertiary': 'hsl(var(--muted))',
        'brand-bg-terminal': 'hsl(var(--background))',
        'brand-orange': 'hsl(var(--primary))',
        'brand-orange-light': 'hsl(var(--foreground))',
        'brand-text': 'hsl(var(--foreground))',
        'brand-text-secondary': 'hsl(var(--muted-foreground))',
        'brand-border': 'hsl(var(--border))',
        'brand-border-strong': 'hsl(var(--ring))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      boxShadow: {
        'panel': 'var(--shadow-panel)',
        'provider-hover': 'var(--shadow-provider-hover)',
      },
      animation: {
        'spin-y': 'spin-y 18s linear infinite',
        'pulse-expand': 'pulse-expand 4s ease-out infinite',
        'blink': 'blink 1.1s step-end infinite',
      },
      keyframes: {
        'spin-y': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
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
  plugins: [animate],
}

export default config
