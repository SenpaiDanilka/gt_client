/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  important: true,
  theme: {
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