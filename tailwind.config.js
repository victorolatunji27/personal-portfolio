/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--color-bg)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          secondary: 'var(--color-accent-secondary)',
        },
        textp: 'var(--color-text-primary)',
        textm: 'var(--color-text-muted)',
      },
      fontFamily: {
        display: ['"Saira Stencil One"', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(124, 58, 237, 0.35)',
        'glow-cyan': '0 0 30px rgba(6, 182, 212, 0.35)',
      },
      keyframes: {
        'ring-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(124, 58, 237, 0.6)' },
          '50%': { boxShadow: '0 0 0 14px rgba(124, 58, 237, 0)' },
        },
      },
      animation: {
        'ring-spin': 'ring-spin 8s linear infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
};
