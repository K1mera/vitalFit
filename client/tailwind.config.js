/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#D74545",
        secondary: "#D6774F",
        tertiary: "#2FD6BD",
        primaryDark: "#475157",
        primaryLight: "#D9D9D9",
      },
      backgroundColor: {
        primary: "#D74545",
        secondary: "#D6774F",
        tertiary: "#2FD6BD",
        primaryDark: "#475157",
        primaryLight: "#D9D9D9",
      },
      fontFamily: {
        bebas: "'Bebas Neue', sans-serif",
        montserrat: "'Montserrat', sans-serif",
      },
      backgroundImage: {
        foot: "url('./src/icons/rectangle.jpg')",
        footerImg: "url('assets/footerImage.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

