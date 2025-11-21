import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#006cdd",
          dark: "#0e131b",
          accent: "#0ca8d3",
          strong: "#005bb7",
          surface: "#111827",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-nunito-sans)",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
} satisfies Config;

export default config;
