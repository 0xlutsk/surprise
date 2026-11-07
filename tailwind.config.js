/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#F9DCE8",
        lavender: "#E6DDFB",
        babyblue: "#DDF2FF",
        gold: "#FFF0C9",
        ink: "#4A2C46",
      },
      fontFamily: {
        display: ["Fredoka", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        script: ["Caveat", "cursive"],
      },
      boxShadow: {
        dreamy: "0 30px 80px -30px rgba(138, 72, 117, 0.45)",
      },
    },
  },
  plugins: [],
};
