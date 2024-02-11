/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  //Config Custom Colors  
  theme: {
    extend: {
      colors: 
      {
        "red": '#830109'
      }
    },
  },
  //daisyui Config
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#057aff",
          "secondary": "#555",
          "accent": "#c149ad",
          "neutral": "#021431",
          "base-100": "#ffffff",
          "info": "#93e6fb",
          "success": "#80ced1",
          "warning": "#efd8bd",
          "error": "#e58b8b",
          
        },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'],
          'Prompt': ['Prompt', 'sans-serif']
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}