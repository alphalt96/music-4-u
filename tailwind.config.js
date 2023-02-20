/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        '350px': '350px'
      },
      colors: {
        'sidebar': '#FAFAFA',
        'gray1': '#828282',
        'gray2': '#4F4F4F'
      }
    },
  },
  plugins: [],
}
