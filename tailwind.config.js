/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    screens: {
      sm: '700px', //tablet
      md: '1100px', //small desktop or laptop
      lg: '1920px', // bigger desktop
    },
    extend: {},
  },
  plugins: [],
}
