// tailwind.config.js
module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0f172a', // Custom color for slate-950
        },
        gray: {
          100: "#FBFBFB",
          200: "#c2c7ca",
          300: "#b8bcbf",
          400: "#999999",
          500: "#7F7F7F",
          600: "#666666",
          700: "#4C4C4C",
          800: "#121212",
          900: "#191919",
        },
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle farthest-side, rgba(255, 0, 182, 0.15), rgba(255, 255, 255, 0))',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
