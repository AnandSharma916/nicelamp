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
        gold: {
          DEFAULT: '#D4AF37',
          light:   '#F59E0B',
          dark:    '#B8860B',
          hover:   '#E5A93C',
          subtle:  'rgba(212, 175, 55, 0.12)'
        },
        brand: {
          950: '#0b0f17',
          900: '#111722',
          850: '#161e2c',
          800: '#1e283a',
          700: '#2b384f',
          600: '#485065',
          500: '#6b7280',
          400: '#9ca3af',
          300: '#cbd5e1',
          200: '#e2e8f0',
          100: '#f1f5f9',
          50:  '#f8fafc',
          // Re-mapped red aliases to warm gold to ensure backwards compatibility
          red: {
            DEFAULT: '#D4AF37',
            light:   '#F59E0B',
            dark:    '#B8860B',
            hover:   '#E5A93C',
            subtle:  'rgba(212, 175, 55, 0.12)'
          }
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'monospace']
      },
      letterSpacing: {
        'luxury': '0.15em',
        'subtle': '0.05em'
      }
    },
  },
  plugins: [],
}
