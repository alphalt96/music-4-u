/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '42px': '42px',
        '120px': '120px',
        '300px': '300px'
      },
      padding: {
        '19px': '19px'
      },
      height: {
        '42px': '42px',
        '120px': '120px'
      },
      maxWidth: {
        '350px': '350px'
      },
      gap: {
        '9px': '9px',
        '19px': '19px'
      },
      colors: {
        'sidebar': '#FAFAFA',
        'gray1': '#828282',
        'gray2': '#4F4F4F',
        'gray3': '#333333'
      },
      fontFamily: {
        'poppins': ['Poppins']
      }
    },
  },
  plugins: [],
}
