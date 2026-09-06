import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1faf6",
          100: "#dcf2e8",
          200: "#bce4d3",
          300: "#8ccfb5",
          400: "#57b28f",
          500: "#339672",
          600: "#23795b",
          700: "#1c604a",
          800: "#194c3d",
          900: "#153f33",
          950: "#0a231c",
        },
        gold: {
          50: "#fdf8ee",
          100: "#faedcc",
          200: "#f5d998",
          300: "#efbf5d",
          400: "#eaa938",
          500: "#e0912a",
          600: "#c47222",
          700: "#a3571f",
          800: "#84451f",
          900: "#6c391c",
        },
        ink: {
          50: "#f6f7f6",
          100: "#e2e5e2",
          200: "#c6cbc5",
          300: "#a1a9a0",
          400: "#788178",
          500: "#5d655d",
          600: "#495049",
          700: "#3c413c",
          800: "#2b2f2b",
          900: "#1a1d1a",
          950: "#0f110f",
        },
        cream: "#faf7f0",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(15, 23, 20, 0.06)",
        card: "0 4px 24px rgba(15, 23, 20, 0.08)",
        lift: "0 12px 40px rgba(15, 23, 20, 0.14)",
        glow: "0 0 0 1px rgba(51, 150, 114, 0.08), 0 8px 30px rgba(51, 150, 114, 0.12)",
      },
      borderRadius: {
        xl2: "1.25rem",
        "3xl": "1.75rem",
      },
      backgroundImage: {
        "grain": "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.035) 1px, transparent 0)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease-out both",
        scaleIn: "scaleIn 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
