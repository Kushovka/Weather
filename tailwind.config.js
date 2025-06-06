/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryText: "#2E3A59",
        secondaryText: "#6C7A92",
        accent: "#3FA9F5",
      },
    },
  },
  plugins: [],
};
