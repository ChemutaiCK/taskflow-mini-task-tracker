/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3778A4",
        "primary-dark": "#145C7A",
        secondary: "#E5F7FA",
        surface: "#F5FAFC",
        ink: "#384960",
        navy: "#1E2A38",
        "navy-light": "#28374A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(30, 42, 56, 0.06)",
        card: "0 1px 3px rgba(30, 42, 56, 0.08)",
      },
    },
  },
  plugins: [],
};
