/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#a33900',
        secondary: '#006a68',
        tertiary: '#2e6085',
        surface: '#f9f9fa',
        ink: '#0a0a0a',
        'ink-light': '#333333',
        'ink-muted': '#666666',
        'ink-faded': '#999999',
        glass: 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(10, 10, 10, 0.8)',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['Space Grotesk', 'monospace', 'monospace'],
      },
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
        'display-xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
};
