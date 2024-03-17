/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-color': '#4CB8C4',
        // 'custom-color': '-webkit-linear-gradient(to right, rgb(240, 253, 244), #4CB8C4)',
        // 'custom-color': 'linear-gradient(to right, rgb(240, 253, 244), #4CB8C4)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}