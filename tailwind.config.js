/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
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
        category: {
          100: "#B9F3FC",
          200: "#687EFF",
          300: "#98E4FF",
          400: "#95BDFF",
        },
      },
    },
  },
  plugins: [],
};
