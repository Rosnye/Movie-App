/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'Squares':"url('./protruding-squares.svg')",
      },
    },
    colors:{
      'Purple':'#5F0F40',
      'Red':'#9A031E',
      'Orange':'#FB8B24',
      'Gold':'#E36414',
      'White':'#FFFFFF'
    }
  },
  plugins: [],
}

