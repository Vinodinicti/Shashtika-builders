/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        biscuit: {
          50: '#FAF7F2',
          100: '#F5EFEB', // Primary creamy beige biscuit
          200: '#EFE6D8',
          300: '#E5D8C3',
          400: '#D8C5A7',
          500: '#C7B08B',
        },
        ivory: '#FBF8F2',
        cream: '#FFFDF9',
        sand: '#EFE7DB',
        espresso: {
          950: '#1A0709', // Royal Burgundy Noir
          900: '#1A0709', // Royal Burgundy Noir (replaces #1E1510)
          850: '#230A0D',
          800: '#2D0E12',
          700: '#3D141A',
          600: '#521D24',
          500: '#6E2832',
          400: '#8A3542',
        },
        burgundy: {
          DEFAULT: '#1A0709',
          noir: '#1A0709',
          950: '#1A0709',
          900: '#1A0709',
          850: '#230A0D',
          800: '#2D0E12',
          700: '#3D141A',
          600: '#521D24',
          500: '#6E2832',
        },
        gold: {
          primary: '#C6A15B',
          antique: '#A9823A',
          light: '#E5D2A6',
          dark: '#8C6623',
          glow: 'rgba(198, 161, 91, 0.25)',
          border: 'rgba(198, 161, 91, 0.4)',
        },
        terracotta: {
          DEFAULT: '#A8664B',
          dark: '#874E37',
          light: '#C9886D',
        }
      },
      fontFamily: {
        heading: ['Cinzel', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(26, 7, 9, 0.08)',
        'gold': '0 12px 35px rgba(198, 161, 91, 0.22)',
        'espresso': '0 15px 40px rgba(26, 7, 9, 0.35)',
        'burgundy': '0 15px 40px rgba(26, 7, 9, 0.35)',
      }
    },
  },
  plugins: [],
}
