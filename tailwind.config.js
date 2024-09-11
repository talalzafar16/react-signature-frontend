/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "#BC9128",
        primaryHover:"#c29d40",
        secondary: "#ECECEC",
        grayText:"#939393",
      },
      backgroundImage: {
        loginBg: "url('/src/assets/login/loginBg.png')",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
