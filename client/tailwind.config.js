/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans'],//Define Montserrat font
      },
      fontSize: {
        '4xl': '2.5rem',  
        '5xl': '3rem',
       
      },

      
      

    },
  },
  plugins: [
    
  ],
}

