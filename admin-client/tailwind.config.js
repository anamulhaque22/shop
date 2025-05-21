/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / 1)",
        secondary: "rgb(var(--color-secondary) / 1)",
        "content-bg": "rgb(var(--content-bg) / 1)",
        text: "rgb(var(--color-text) / 1)",
        bc: "rgb(var(--border-color) / 1)", // border color
        success: "rgb(var(--color-success) / 1)",
        info: "rgb(var(--color-info) / 1)",
        warn: "rgb(var(--color-warn) / 1)",
        error: "rgb(var(--color-error) / 1)",
        transparent: "transparent",
        current: "currentColor",
      },
      // colors: {
      //   primary: "#2f3446",
      //   secondary: "#222736",
      // },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
};
