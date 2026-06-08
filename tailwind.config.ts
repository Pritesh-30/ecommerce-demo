import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm paper background
        canvas: "#F4F0E6",
        paper: "#FBF8F1",
        // Deep pine — primary "ink"
        pine: {
          DEFAULT: "#1B3A2B",
          deep: "#11241B",
          soft: "#2C5340",
        },
        // Warm clay accent
        clay: {
          DEFAULT: "#C2622E",
          soft: "#D98A56",
        },
        sand: "#E7DEC9",
        stone: "#8C857A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      maxWidth: {
        page: "1280px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
