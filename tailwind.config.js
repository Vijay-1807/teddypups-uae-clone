/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milk: '#fffdf8',
        cocoa: {
          DEFAULT: '#2a170e',
          soft: '#5a3a28',
          muted: 'rgba(42, 23, 14, 0.7)',
          subtle: 'rgba(42, 23, 14, 0.1)',
        },
        night: '#24130b',
        honey: {
          DEFAULT: '#f2be6b',
          soft: '#fbe3b4',
          dark: '#e4a85b',
        },
        toffee: {
          DEFAULT: '#c2622b',
          deep: '#a24a1a',
          ink: '#8e3f15',
        },
        blush: {
          DEFAULT: '#f9cdbf',
          soft: '#fae3da',
        },
        sky: {
          DEFAULT: '#bfddf5',
          deep: '#2f6e9e',
        },
        whatsapp: '#25D366'
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        scrawl: ['"Shantell Sans"', 'cursive'],
      },
      boxShadow: {
        'sketch': '0 10px 30px -10px rgba(42, 23, 14, 0.12)',
        'polaroid': '0 12px 28px -6px rgba(42, 23, 14, 0.15)',
        'ticket': '0 8px 24px -4px rgba(42, 23, 14, 0.1)',
      }
    },
  },
  plugins: [],
}
