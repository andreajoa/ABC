/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'forest-green': {
          DEFAULT: '#0a3d2f',
          light: '#1a5757',
        },
        'luxury-gold': {
          DEFAULT: '#d4af69',
          dark: '#b87333',
        },
        cream: '#fefdf8',
        neutral: {
          DEFAULT: '#2a2a2a',
          light: '#9d8b7c',
        },
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Inter', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};

