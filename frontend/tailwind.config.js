/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#378BA4",
        "primary-dark": "#23677A",
        accent: "#145C7A",
        background: "#F5F8FA",
        surface: "#FFFFFF",
        ink: "#172033",
        "ink-secondary": "#6B7280",
        border: "#E5EAF0",
        success: "#16A36A",
        warning: "#E59A23",
        danger: "#D9534F",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(23, 32, 51, 0.05)",
        card: "0 1px 3px rgba(23, 32, 51, 0.06), 0 1px 2px rgba(23, 32, 51, 0.04)",
      },
    },
  },
  plugins: [],
};
