/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        ink: {
          950: '#070809',
          900: '#0c0e11',
          850: '#101317',
          800: '#161a1f',
          750: '#1b2127',
          700: '#232a31',
          600: '#333c45',
          500: '#4a5560',
          400: '#6b7782',
          300: '#92a0ac',
          200: '#bcc8d3',
          100: '#dde5ec',
          50: '#f0f5f8',
        },
        teal: {
          50: '#ecfdf8',
          100: '#d0fbef',
          200: '#a5f5dc',
          300: '#6ceac4',
          400: '#34d3a6',
          500: '#14b88f',
          600: '#0d9474',
          700: '#0e7560',
          800: '#115c4d',
          900: '#134c40',
        },
        amber: {
          400: '#fbbf44',
          500: '#f6a623',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        shimmer: 'shimmer 2s linear infinite',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'count-up': 'countUp 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        pulseRing: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};
