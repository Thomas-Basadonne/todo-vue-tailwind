/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightmode: {
          100: "#CDF5FD",
          200: "#A0E9FF",
          300: "#89CFF3",
          400: "#00A9FF",
        },
        darkmode: {
          100: "#C2D9FF",
          200: "#8E8FFA",
          300: "#7752FE",
          400: "#190482",
        },
      },
    },
  },
  plugins: [],
};
