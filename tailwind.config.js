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
      fontFamily: {
        "open-sans": ["Open Sans"],
        "fira-code": ["Fira Code"],
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
            background: "#020817", // the page background color
            foreground: { DEFAULT: "#F8FAFC", 500: "#F8FAFC" }, // the page text color
            content1: "#041E43",
            // brand colors
            default: {
              DEFAULT: "#1D3153",
              100: "#1D3153",
              200: "#DBDBDD",
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
          },
        },
      },
    }),
  ],
};
