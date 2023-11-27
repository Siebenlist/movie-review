/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "70%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1s ease-out",
      },
      boxShadow: {
        topM: "0px 30px 100px 130px rgba(12, 12, 21, 1)",
        botD: "0px -50px 100px 300px rgba(12, 12, 21, 1)",
        botM: "0px -100px 100px 250px rgba(12, 12, 21, 1)",
      },
    },
    colors: {
      primary: "#0C0C15",
      white: "#ffff",
      black: "#000000",
      menu: "#454B53",
      slate: "#C0C2C9",
      button: "#6600CC",
      following: "#02973D",
      followingHover: "#02662a",
      followingActive: "#01471d",
      buttonHover: "#7a2acb",
      input: "#677385",
      search: "#454B53",
      gray: "#727272",
      logoPrimary: "#A661FF",
      logoSecondary: "#76CEFF",
    },
  },
  plugins: [],
};
