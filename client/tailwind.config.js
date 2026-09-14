/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#090a0d',
          900: '#111318',
          850: '#181b22',
          800: '#20242d',
          700: '#2e3340',
          600: '#485065',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50: '#f8fafc',
          gold: {
            DEFAULT: '#c5a880',
            light: '#d6be9f',
            dark: '#a88960',
            hover: '#b8986e',
            subtle: 'rgba(197, 168, 128, 0.12)'
          }
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        'luxury': '0.2em',
        'subtle': '0.05em'
      }
    },
  },
  plugins: [],
}
