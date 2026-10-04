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
        // Japanese manga & warm papyrus editorial palette
        // Cream manga paper, sumi ink, vermilion/shuka red, golden ochre
        manga: {
          paper: "#fcfaf6",
          parchment: "#f6f1e8",
          border: "#18181b", // Crisp sumi black lineart
          halftone: "#e7dfd3",
          ink: "#18181b",
          sumi: "#27272a",
          vermilion: "#e11d48", // Shonen stamp red
          vermiliondark: "#be123c",
          ochre: "#d97706",
          screentone: "#f4ede2",
        },
        sand: {
          50: "#fcfaf6",
          100: "#f6f1e8",
          200: "#ece4d4",
          300: "#decbb5",
          400: "#cbaf92",
          500: "#b89574",
          600: "#a67f60",
          700: "#8a664e",
          800: "#705342",
          900: "#18181b",
        },
        terracotta: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48", // Crisp Vermilion
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
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
          DEFAULT: "#18181b",
          light: "#3f3f46",
          muted: "#71717a",
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
        mono: [
          "JetBrains Mono",
          "Menlo",
          "Consolas",
          "monospace"
        ]
      },
      boxShadow: {
        // Manga graphic offset shadows (clean ink block shadows)
        'manga': '3px 3px 0px 0px #18181b',
        'manga-sm': '2px 2px 0px 0px #18181b',
        'manga-lg': '5px 5px 0px 0px #18181b',
        'manga-red': '3px 3px 0px 0px #e11d48',
      }
    },
  },
  plugins: [],
};
