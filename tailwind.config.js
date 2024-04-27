/** @type {import('tailwindcss').Config} */
import '@tailwindcss/forms';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cinder: {
          50: '#f2f3fb',
          100: '#e7e9f8',
          200: '#d4d7f1',
          300: '#babde7',
          400: '#a09edb',
          500: '#8c85cf',
          600: '#7b6cbf',
          700: '#6a5ba7',
          750: '#564c87',
          800: '#564c87',
          900: '#49426d',
          950: '#13111c'
        },
        primary: '#444251',
        secondary: '#1C1A21'
      },
      boxShadow: {
        innerColor: '0 0 0px 1000px #343159 inset'
      }
    }
  },
  plugins: ['@tailwindcss/forms'],
  darkMode: 'class'
};
