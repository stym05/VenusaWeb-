import type { Config } from "tailwindcss"
import typography from "@tailwindcss/typography"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#0E0E0F",
          white: "#FFFFFF",
          red:   "#B00020",
          gray:  "#1C191A",
        },
      },
      fontFamily: {
        heading: ["var(--font-lexend-zetta)", "sans-serif"],
        body: ["var(--font-poppins)", "system-ui", "sans-serif"],
      },
      boxShadow: { soft: "0 10px 30px -10px rgba(0,0,0,0.25)" },
      borderRadius: { "2xl": "1.25rem" },
    },
  },
  plugins: [typography],
}

export default config
