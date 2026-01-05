/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 2s infinite',
        'slideUp': 'slideUp 0.3s ease',
      },
      keyframes: {
        slideUp: {
          'from': {
            bottom: '-100px',
            opacity: '0',
          },
          'to': {
            bottom: '2rem',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
