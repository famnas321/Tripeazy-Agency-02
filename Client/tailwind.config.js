// Import withMT from material-tailwind/utils
const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {  // Fix typo from "colours" to "colors"
        'custom-purple': '#271A4B',
        'custom-Gray': '#F5F6FA',
      }
    },
  },
  plugins: [],
});
