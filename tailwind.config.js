/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white:       'rgb(var(--color-white) / <alpha-value>)',
        black:       'rgb(var(--color-black) / <alpha-value>)',
        background:  'rgb(var(--color-bg) / <alpha-value>)',
        accentBlue:  'rgb(var(--color-primary) / <alpha-value>)',
        accentOrange:'rgb(var(--color-accent-orange) / <alpha-value>)',
        textLight:   'rgb(var(--color-text) / <alpha-value>)',
        surfaceLow:  'rgb(var(--color-surface-low) / <alpha-value>)',
        surfaceGlass:'var(--color-surface-variant)',
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter',         'sans-serif'],
      },
    },
  },
  plugins: [],
};
