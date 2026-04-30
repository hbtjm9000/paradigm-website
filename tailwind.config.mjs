/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Design System tokens — paradigm-website
        primary: '#a33900',
        'primary-container': '#c94c0e',
        secondary: '#006a68',
        'secondary-fixed': '#1cdcd9', // cyan — technical chips, tags
        tertiary: '#2e6085',          // hero background, depth
        surface: '#f9f9fa',          // page background
        'surface-container': '#edeeef',
        'surface-container-high': '#e7e8e9',
        'surface-container-highest': '#e1e2e3',
        'surface-dim': '#d9dadb',
        'on-surface': '#191c1d',     // body text
        'on-surface-variant': '#594239',
        'ink-bleed': 'rgba(25, 28, 29, 0.8)',
        glass: 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(10, 10, 10, 0.8)',
        inverse: '#2e3132',          // dark surfaces (nav, footer)
        error: '#ba1a1a',
        // Aliases for component readability
        ink: '#191c1d',
        'ink-light': '#333333',
        'ink-muted': '#594239',
        'ink-faded': '#999999',
        white: '#ffffff',
        black: '#191c1d',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        headline: ['Fraunces', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        label: ['Space Grotesk', 'monospace'],
        mono: ['Space Grotesk', 'monospace', 'monospace'],
      },
      // HARD CONSTRAINT: zero border-radius everywhere
      borderRadius: {
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '0px',
      },
      fontSize: {
        'display-xl': ['6rem', { lineHeight: '1', letterSpacing: '-0.03em' }],
        'display-lg': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
      },
      spacing: {
        'spacing-8': '2.75rem',    // list/card item gaps
        'spacing-20': '5rem',
        'spacing-24': '6rem',
      },
      boxShadow: {
        none: 'none',
        float: '0 24px 48px rgba(25, 28, 29, 0.12)', // modals only
      },
      textShadow: {
        'ink-bleed': '0 4px 24px rgba(25, 28, 29, 0.6)',
      },
    },
  },
  plugins: [],
};
