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
          300: '#babd37',
          400: '#ad9edb',
          500: '#8c85cf',
          600: '#7b6cbf',
          700: '#6a5ba7',
          800: '#564cb7',
          900: '#49426d',
          950: '#13111c'
        }
      }
    }
  },
  plugins: ['@tailwindcss/forms'],
  darkMode: 'class'
};
