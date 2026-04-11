/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        'surface-container': 'var(--color-surface-container)',
        'surface-container-high': 'var(--color-surface-container-high)',
        'surface-container-highest': 'var(--color-surface-container-highest)',
        'surface-container-low': 'var(--color-surface-container-low)',
        'on-surface': 'var(--color-on-surface)',
        'on-surface-variant': 'var(--color-on-surface-variant)',
        primary: 'var(--color-primary)',
        'primary-fixed': 'var(--color-primary-fixed)',
        outline: 'var(--color-outline)',
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        display: {
          lg: ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
          md: ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
          sm: ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        },
        headline: {
          lg: ['1.75rem', { lineHeight: '1.3' }],
          md: ['1.5rem', { lineHeight: '1.35' }],
          sm: ['1.25rem', { lineHeight: '1.4' }],
        },
        body: {
          lg: ['1.125rem', { lineHeight: '1.6' }],
          md: ['0.875rem', { lineHeight: '1.5' }],
          sm: ['0.75rem', { lineHeight: '1.5' }],
        },
        label: {
          md: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
          sm: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.05em' }],
        },
      },
      borderRadius: {
        none: '0px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
