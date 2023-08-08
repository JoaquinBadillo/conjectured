/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')
const { transform } = require('typescript')

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      '3xs': '320px',
      // => @media (min-width: 320px) { ... }

      'xs': '475px',
      // => @media (min-width: 475px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865F2',
        gray: colors.neutral,
        gray: {
          900: '#202225',
          800: '#2F3136',
          700: '#36393F',
          600: '#4F545C',
          400: '#D4D7DC',
          300: '#E3E5E8',
          200: '#EBEDEF',
          100: '#F2F3F5',
        },
        black: colors.black,
        black: {
          900: '#131313',
          800: '#1E1E1E',
          700: '#252525',
          600: '#2E2E2E',
          500: '#333333',
          400: '#4D4D4D',
          300: '#666666',
          200: '#7F7F7F',
          100: '#999999',
        },
        patel_red: '#F0B2B2',
        pastel_orange: '#F0BDB2',
        pastel_lightblue: '#B2DBF0',
        pastel_blue: '#B2C7F0',
        pastelpurple: '#B2B2F0'
      }
    },
  },
  plugins: [],
}
