import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        invisible: "rgba(1,1,1,0)",
        current: "currentColor",
        background: {
          foreground: "#171B2A",
          DEFAULT: "#EFF9F9",
        },
        foreground: {
          background: "#EFF9F9",
          DEFAULT: "#171B2A",
        },
        brand: {
          chill: "#DEECFC",
          icy: "#39E1FF",
          frostbite: "#0082D9",
          blaze: "#FF8B26",
          inferno: "#FF4400",
          lime: "#DAFF50",
          puff: "#AB8DFF",
          DEFAULT: "#171B2A",
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F3F4F4",
          200: "#E8E8E8",
          300: "#C4C6C7",
          400: "#A1A3A5",
          500: "#737678",
          600: "#505356",
          700: "#2C3135",
          800: "#151A1E",
        },
      },
      fontFamily: {
        main: ["teko", "sans-serif"],
        header: ["zuume", "sans-serif"],
        sans: ["Nunito Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-v-ice": "linear-gradient(to bottom, #0082D9, #39E1FF)",
        "gradient-h-ice": "linear-gradient(to right, #0082D9, #39E1FF)",
        "gradient-v-fire": "linear-gradient(to bottom, #FF4400, #FF8B26)",
        "gradient-h-fire": "linear-gradient(to right, #FF4400, #FF8B26)",
        "gradient-v-deep": "linear-gradient(to bottom, #151A1E, #0082D9)",
      },
      boxShadow: {
        disabled: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
