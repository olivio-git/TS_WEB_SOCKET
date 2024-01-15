/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        loaderDots1: {
          '0%': { transform: 'scale(0)' },
          '100%': { transform: 'scale(1)' },
        },
        loaderDots2: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(24px, 0)' },
        },
        loaderDots3: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(0)' },
        },
      },
      animation: {
        loaderDots1: 'loader-dots1 0.6s infinite',
        loaderDots2: 'loader-dots2 0.6s infinite',
        loaderDots3: 'loader-dots3 0.6s infinite',
      },
    },
  },
  plugins: [],
}