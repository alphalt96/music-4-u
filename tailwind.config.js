/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        '42px': '42px',
        '120px': '120px',
        '300px': '300px',
        '70%': '70%',
        '80%': '80%'
      },
      padding: {
        '19px': '19px'
      },
      height: {
        '42px': '42px',
        '45px': '45px',
        '120px': '120px',
        '300px': '300px'
      },
      maxWidth: {
        '350px': '350px'
      },
      spacing: {
        '27%': '27%'
      },
      gap: {
        '9px': '9px',
        '16px': '16px',
        '19px': '19px',
        '36px': '36px'
      },
      colors: {
        'green2': '#27AE60',
        'sidebar': '#FAFAFA',
        'gray1': '#828282',
        'gray2': '#4F4F4F',
        'gray3': '#333333',
        'gray4': '#BDBDBD'
      },
      fontFamily: {
        'poppins': ['Poppins']
      }
    },
  },
  plugins: [],
}
