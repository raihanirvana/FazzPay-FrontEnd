/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('/asideimage.svg')",
      },
      gridTemplateRows: {
        7: "repeat(2, minmax(0, 0.33fr))",
        8: "repeat(4, minmax(0, 280px))",
        8: "repeat(2, 150px)",
        9: "repeat(5, 150px)",
      },
      dropShadow: {
        drop: "0 4px 20px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  plugins: [],
};
