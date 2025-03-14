import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        "hover-overlay": "var(--light-overlay)",
        primarlay: "var(--light-primarlay)",
        dangerlay: "var(--light-dangerlay)",
      },
      borderColor: {
        overlay: "var(--light-overlay)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        sansBlack: ["var(--font-sans-black)"],
        bentoga: ["var(--font-bentoga)"],
        emoji: ["Noto Color Emoji"],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 160s linear infinite",
        "kudos-highlight": "kudos-highlight 2.5s linear infinite",
        "bounce-right": "bounce-right 1.2s ease-in-out infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "kudos-highlight": {
          from: { transform: "translate(-50%, -50%) scale(1.4) rotate(0turn)" },
          to: { transform: "translate(-50%, -50%) scale(1.4) rotate(1turn)" },
        },
        "bounce-right": {
          "0%, 100%": { transform: "translateX(0)", easing: "ease-in-out" },
          "50%": { transform: "translateX(-6px)", easing: "ease-in-out" },
        },
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      defaultTheme: "kudos",
      defaultExtendTheme: "dark",
      themes: {
        kudos: {
          extend: "dark",
          layout: {
            radius: {
              small: "6px",
              medium: "8px",
              large: "12px",
            },
            borderWidth: {
              small: "0.5px",
              medium: "1px",
              large: "2px",
            },
          },
          colors: {
            background: { DEFAULT: "#020817", 100: "#020817", 200: "#0F1729" }, // the page background color
            foreground: { DEFAULT: "#F8FAFC", 500: "#F8FAFC" }, // the page text color
            content1: "#041E43",
            // brand colors
            default: {
              DEFAULT: "#1D3153",
              100: "#1D3153",
              200: "#BABABC",
              400: "#FFFFFF",
            },
            primary: {
              DEFAULT: "#3BA4E1",
              foreground: "#041E43",
            },
            secondary: {
              DEFAULT: "#E50045",
              foreground: "#FCFCFC",
            },
            success: {
              DEFAULT: "#ffcd2a",
              foreground: "#041E43",
            },
          },
        },
      },
    }),
  ],
};
