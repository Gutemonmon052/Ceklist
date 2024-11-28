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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        cabin: ["Cabin", "sans-serif"],
        sniglet: ["Sniglet", "cursive"],
      },
      // backgroundImage: {
      //   'card': "url('../assets/Card.svg')",
      // },
    },
  },
  plugins: [
    require("@designbycode/tailwindcss-text-stroke")
  ],
} satisfies Config;
