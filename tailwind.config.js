/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "600px",
      md: "900px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        poppins: "poppins",
        questrial: "Questrial",
      },
      
       animation: {
        fadeIn: 'fadeIn 0.8s ease-in-out forwards',
        fadeOut: 'fadeOut 0.8s ease-in-out forwards',
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.95)' },
        },
      },
      colors: {
        primary: {
          DEFAULT: "#655DE0",
          light: "#7D76E6", // 20% lighter
          dark: "#524BC7",   // 15% darker for hover states
          muted: "#655DE033" // 20% opacity
        },
        secondary: "#003049",
        secondaryOrange: "#FF8475",
        "main-bg": "#fff",
        "main-dark": "#1F1D2B",
        "card-dark": "#252836",
        "dark-light": "#353949",
        "hover-color-dark": "#2f3343",
        dark: "#2f3343",
      },
      gridTemplateColumns: {
        "16-auto": "250px auto",
      },
      boxShadow: {
        "primary-md": "0 4px 6px -1px rgba(101, 93, 224, 0.3), 0 2px 4px -1px rgba(101, 93, 224, 0.2)",
        "primary-lg": "0 10px 15px -3px rgba(101, 93, 224, 0.3), 0 4px 6px -2px rgba(101, 93, 224, 0.2)"
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
      }
    },
  },
  plugins: [
    plugin(function ({ addUtilities, addComponents }) {
      // New utilities
      const newUtilities = {
        ".text-muted": {
          opacity: 0.8,
        },
        ".transition-colors": {
          transition: "colors 0.2s ease-in-out",
        },
        ".transition-a": {
          transition: "all 0.2s ease-in-out",
        },
        ".card-shadow": {
          boxShadow: "0 0 0.8rem 0.25rem rgba(101, 93, 224, 0.1)",
        },
        ".shadow-light": {
          boxShadow: "0.1rem 0.1rem 0.3rem .1rem rgba(101, 93, 224, 0.05)",
        },
        ".border-light": {
          border: "1px solid rgba(101, 93, 224, 0.1)",
        },
        ".input-shadow": {
          boxShadow: "0 0 0 1000px #f5f5f9 inset !important",
        },
        ".input-dark-shadow": {
          boxShadow: "0 0 0 1000px #13131A inset !important",
        },
        ".inputAutofillColor": {
          "-webkit-text-fill-color": "#ccc",
        },
        ".flex-center-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        ".flex-center-between": {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
        ".flex-align-center": {
          display: "flex",
          alignItems: "center",
        },
      };

      // New components
      const components = {
        '.btn-primary': {
          '@apply bg-primary text-white hover:bg-primary-dark shadow-md shadow-primary/30 transition-colors': {},
        },
        '.btn-secondary': {
          '@apply bg-secondary text-white hover:bg-[#02293e] transition-colors': {},
        },
        '.icon-box': {
          '@apply grid flex-shrink-0 rounded-full w-9 h-9 place-items-center hover:bg-primary/10 dark:hover:bg-primary/20 transition-a sm:cursor-pointer': {},
        },
        '.input': {
          '@apply border border-slate-300 dark:border-dark bg-transparent px-4 py-[0.35rem] outline-none focus:border-primary transition-colors': {},
        },
      };

      addUtilities(newUtilities);
      addComponents(components);
    }),
  ],
};