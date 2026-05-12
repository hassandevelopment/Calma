/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'calma-deep':    '#3D5C5C',
        'calma-mid':     '#4A6B68',
        'calma-soft':    '#7A9591',
        'warm-cream':    '#F5F0E8',
        'warm-stone':    '#E8DFD0',
        'warm-wood':     '#8B6F47',
        'warm-walnut':   '#5C4632',
        'text-primary':  '#2A3A3A',
        'text-muted':    '#5E6E6C',
        'text-inverse':  '#F5F0E8',
        'gold-accent':   '#B89968',
        'wa-green':      '#25D366',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body:    ['Manrope', '-apple-system', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'h1':       'clamp(2.5rem, 6vw, 4.5rem)',
        'h2':       'clamp(1.875rem, 4vw, 3rem)',
        'h3':       'clamp(1.25rem, 2.5vw, 1.75rem)',
        'body-lg':  '1.0625rem',
        'body':     '1rem',
        'small':    '0.875rem',
        'eyebrow':  '0.75rem',
      },
      lineHeight: {
        display: '1.15',
        body:    '1.6',
        arabic:  '1.8',
      },
      letterSpacing: {
        display: '-0.01em',
        eyebrow: '0.14em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        content: '1200px',
        reading: '65ch',
      },
      borderRadius: {
        card:   '16px',
        btn:    '999px',
        image:  '8px',
        'image-lg': '24px',
      },
      boxShadow: {
        card:   '0 8px 32px -8px rgba(61, 92, 92, 0.18)',
        'card-hover': '0 16px 48px -8px rgba(61, 92, 92, 0.28)',
      },
      transitionTimingFunction: {
        'calma': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        'calma': '350ms',
      },
      backdropBlur: {
        nav: '20px',
      },
    },
  },
  plugins: [],
};
