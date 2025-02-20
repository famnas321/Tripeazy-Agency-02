/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colours:{
        'custom-purple': '#271A4B',
        'custom-Gray': '#F5F6FA',
      }
    },
  },
  plugins: [],
}