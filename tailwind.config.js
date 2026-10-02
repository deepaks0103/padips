/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#07060d',
          card: 'rgba(23, 15, 38, 0.65)',
          border: 'rgba(244, 114, 182, 0.2)',
        },
        magic: {
          pink: '#f43f5e',
          magenta: '#ec4899',
          purple: '#a855f7',
          violet: '#8b5cf6',
          cyan: '#06b6d4',
          gold: '#f59e0b',
        }
      },
      fontFamily: {
        serif: ['"Cinzel"', '"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        cute: ['Caveat', 'Sacramento', 'cursive'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 15px rgba(236,72,153,0.5))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 30px rgba(236,72,153,0.9))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
