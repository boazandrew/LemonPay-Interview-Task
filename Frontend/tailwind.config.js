/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#F1C40F',
        gradientStart: '#F8FAFC',
        gradientEnd: '#4F46E5',
      },
      fontFamily: {
        sans: ['Poppins', 'Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
