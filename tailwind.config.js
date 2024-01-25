/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fyTropic: {
          100: "#d1e2da",
          200: "#f8fcf8",
          400: "#648465",
          500: "#3d653f",
          DEFAULT: "#00373d",
        },
        foresty: {
          white: "#fff",
          400: "#5bc488",
          500: "#00a652",
          600: "#00862d",
        },
        forestyWarning: {
          DEFAULT: "#fc9500",
        },
        forestyError: {
          DEFAULT: "#f4322f",
        },
        forestyFrozen: {
          DEFAULT: "#0086ff",
        },
        forestydark: {
          100: "#848484",
          200: "#666666",
          300: "#3a3a3a",
          400: "#2f2f2f",
          500: "#1f1f1f",
          600: "#151515",
          700: "#141414",
          800: "#0f0f0f",
          900: "#000000",
        },
      },
      fontFamily: {
        lora: "'Lora', serif",
        inter: "'Inter', sans-serif",
        robotoSlab: "'Roboto Slab', serif",
        raleway: "'Raleway', sans-serif",
        space: "'Space Grotesk', sans-serif",
        poppins: "'Poppins', sans-serif",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
