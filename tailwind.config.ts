import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#006cdd",
          dark: "#0e131b",
          accent: "#507883",
          strong: "#005bb7",
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
