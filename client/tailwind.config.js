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
          primary: '#181E27',
          secondary: '#FE0435',
          tertiary: '#EAE9EE',
        },
        dark: {
        },
      },
    },
  },
  plugins: [],
}