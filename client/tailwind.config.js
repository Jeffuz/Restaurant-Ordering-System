/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans'], 
        'tt-norms-pro': ['TT Norms Pro', 'sans-serif']
      },
      colors: {
        light: {
          primary: '#395886',
          secondary: '#638ECB',
          tertiary: '#8AAEE0',
          quaternary: '#B1C9EF',
          quinary: '#D5DEEF',
          senary: '#F0F3FA'
        },
        dark: {
          primary: '#006DA4',
          secondary: '#006494',
          tertiary: '#004D74',
          quaternary: '#003554',
          quinary: '#022B42',
          senary: '#032030'
        },
      },
    },
  },
  plugins: [],
}

