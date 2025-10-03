/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6fff7',
          100: '#ccffef',
          200: '#99ffdf',
          300: '#66ffcf',
          400: '#33ffbf',
          500: '#04ff94',  // Color principal
          600: '#03cc76',
          700: '#029959',
          800: '#02663b',
          900: '#01331e',
        },
        dark: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d1117',
        },
        accent: {
          50: '#fef3ff',
          100: '#fde6ff',
          200: '#fbcdff',
          300: '#f9a4ff',
          400: '#f56bff',
          500: '#e942ff',
          600: '#c91aeb',
          700: '#a314c0',
          800: '#86139d',
          900: '#6d167d',
        },
      },
    },
  },
  plugins: [],
}

