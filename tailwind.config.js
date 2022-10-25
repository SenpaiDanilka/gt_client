/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  important: true,
  darkMode: 'class',
  theme: {
    fontSize: {
      base: ['14px', '16px'],
      lg: ['16px', '19px'],
      xl: ['20px', '24px']
    },
    colors: {
      'dgb': '#151419',
      'mgb': '#20254C',
      'gb': '#A5B4CA',
      'dark-bg': '#030A22',
      'light-bg': '#DBE3FF',
      'white': '#FFFFFF',
      'available': '#87BC76',
      'unavaliable': '#95ABD6',
      'reserved': '#F77750',
      'br-stroke': '#EBECF0',
      'br-dark': '#1F2334',
      'blue': '#6284FF',
      'error': '#DC2626'
    },
    extend: {
      zIndex: {
        '9999': '9999',
      }
    }
  },
  corePlugins: {
    //preflight: false
  },
  plugins: []
};