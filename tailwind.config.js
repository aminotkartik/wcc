/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm palette: Cream, ivory, warm beige, terracotta, burnt orange, amber, warm charcoal
        sand: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#ebe1d2",
          300: "#decbb5",
          400: "#cbaf92",
          500: "#b89574",
          600: "#a67f60",
          700: "#8a664e",
          800: "#705342",
          900: "#5c4438",
        },
        terracotta: {
          50: "#fdf6f0",
          100: "#fbeade",
          200: "#f6d3bc",
          300: "#eeb493",
          400: "#e48c66",
          500: "#dc6838",
          600: "#c74e25",
          700: "#a63d1f",
          800: "#86331e",
          900: "#6e2e1c",
          950: "#3d140a",
        },
        amberwarm: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        warmcharcoal: {
          DEFAULT: "#292524",
          light: "#44403c",
          muted: "#78716c",
        }
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
