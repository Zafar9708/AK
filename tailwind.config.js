/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#242424',
        muted: '#777777',
        line: '#E8E4E1',
        cream: '#FAF8F6',
        sand: '#F5EFEA',
        rose: { DEFAULT: '#B4877F', dark: '#94685F', soft: '#EBDCD6' },
        cocoa: '#7A5C4D',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: { site: '1440px' },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideDown: { from: { opacity: 0, transform: 'translateY(-6px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        toastIn: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
      },
      animation: {
        fadeIn: 'fadeIn .3s ease-out',
        slideDown: 'slideDown .25s ease-out',
        toastIn: 'toastIn .3s ease-out',
      },
    },
  },
  plugins: [],
}
