export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "rgba(39,111,159,255)",
        "secondary": "#68ceb6",
        "accent": 'white'
        
      },
      fontFamily: {
        "default": "'Nunito', sans-serif"
      }
    },
  },
  plugins: [],
}