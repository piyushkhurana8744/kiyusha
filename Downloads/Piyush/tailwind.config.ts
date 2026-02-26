import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F5F0",
        warmWhite: "#FAF9F6",
        softGold: "#C6A75E",
        deepCharcoal: "#1E1E1E",
        nudeAccent: "#E8D8C3"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        heading: ["var(--font-playfair)", "serif"]
      },
      maxWidth: {
        lux: "1280px"
      },
      letterSpacing: {
        luxury: "0.12em"
      }
    }
  },
  plugins: []
};

export default config;
