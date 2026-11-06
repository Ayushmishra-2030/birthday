import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fantasy: {
          void: "#07050b",
          dark: "#0d0914",
          card: "#140e21",
          cardHover: "#1d1430",
          border: "#2f1b4e",
          borderGlow: "#7e22ce",
          wine: "#360613",
          burgundy: "#4f0c1f",
          rose: "#ff4d88",
          roseLight: "#ffa3c0",
          lavender: "#c084fc",
          lavenderSoft: "#e9d5ff",
          gold: "#f5c344",
          goldGlow: "#ffd978",
          silver: "#e2e8f0",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "Playfair Display", "Georgia", "serif"],
        script: ["Great Vibes", "Dancing Script", "cursive"],
        sans: ["Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "float-fast": "float 3s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "spin-slow": "spin 25s linear infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "twinkle": "twinkle 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            opacity: "0.85",
            filter: "drop-shadow(0 0 12px rgba(255, 77, 136, 0.45))",
          },
          "50%": {
            opacity: "1",
            filter: "drop-shadow(0 0 25px rgba(255, 77, 136, 0.85)) drop-shadow(0 0 40px rgba(192, 132, 252, 0.6))",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;

