import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "var(--foreground)",
        background: "var(--background)",
        "accent-blue": "var(--accent-blue)",
      },
      fontFamily: {
        mono: ["var(--font-dot-matrix)", "var(--font-space-mono)", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
