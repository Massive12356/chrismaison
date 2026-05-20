/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#450027',
          light: '#6B0040',
          dark: '#2E001A',
        },
        secondary: {
          DEFAULT: '#D4A73B',
          light: '#E5BD5B',
          dark: '#A8842A',
        },
        accent: {
          DEFAULT: '#D4A73B',
          light: '#E5BD5B',
          dark: '#A8842A',
        },
        dark: {
          DEFAULT: '#000000',
          light: '#1a1a1a',
          muted: '#333333',
        },
        background: {
          DEFAULT: '#ffffff',
          alt: '#f9f9f9',
          dark: '#f0f0f0',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'system-ui', 'sans-serif'],
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
