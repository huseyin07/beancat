import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f3f0e7",
        ink: "#111312",
        arc: "#235dff",
        seal: "#a8392b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-inter)", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
