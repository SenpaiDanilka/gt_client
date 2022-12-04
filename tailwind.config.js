/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  important: true,
  darkMode: 'class',
  theme: {
    fontSize: {
      xs: ['10px', '12px'],
      base: ['14px', '16px'],
      lg: ['16px', '19px'],
      xl: ['20px', '24px']
    },
    colors: {
      dgb: '#151419',
      mgb: '#20254C',
      gb: '#A5B4CA',
      'dark-bg': '#030A22',
      'light-bg': '#DBE3FF',
      white: '#FFFFFF',
      available: '#87BC76',
      unavaliable: '#95ABD6',
      reserved: '#F77750',
      'br-stroke': '#EBECF0',
      'bg-stroke': '#F0F4F7',
      'br-dark': '#1F2334',
      blue: '#6284FF',
      error: '#DC2626',
      transparent: 'transparent',
    },
    extend: {
      zIndex: {
        '9999': '9999',
      },
      boxShadow: {
        'input-focus': 'inset 0 0 0 2px #6284FF',
        'standard-input-focus': 'inset 0 -2px 0 0 #6284FF',
        'card-shadow': '1px 1px 4px 1px rgba(0, 0, 0, 0.15)'
      },
    }
  },
  corePlugins: {
    //preflight: false
  },
  plugins: []
};