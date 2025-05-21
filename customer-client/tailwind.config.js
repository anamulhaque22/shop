/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "640px",

        md: "768px",

        lg: "1024px",

        xl: "1280px",
        
        "2xl": "1280px",
      },
      colors: {
        primary: "#8A33FD",
        secondary: "#3C4242",
        "secondary-light": "#807D7E",
        "secondary-lighter": "#BEBCBD",
        "off-white": "#EDEEF2",
        "off-white-light": "#F6F6F6",
      },
      container: {
        center: true,
        padding: "1rem"
      },
      fontFamily: {
        "causten-light": ["var(--font-causten-light)"],
        "causten-regular": ["var(--font-causten-regular)"],
        "causten-medium": ["var(--font-causten-medium)"],
        "causten-semi-bold": ["var(--font-causten-semi-bold)"],
        "causten-bold": ["var(--font-causten-bold)"],
        "core-sans-medium": ["var(--core-sans-medium)"],
        "core-sans-bold": ["var(--core-sans-bold)"],
        "coresans-extra-bold": ["var(--core-sans-extra-bold)"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "light", // name of one of the included themes for dark mode
  },
};
