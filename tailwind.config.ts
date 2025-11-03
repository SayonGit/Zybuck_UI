/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary-500)",
        secondary: "var(--color-secondary-500)",
      },
      fontFamily: {
        sans: "var(--font-family-sans)",
      },
    },
  },
  plugins: [],
};
