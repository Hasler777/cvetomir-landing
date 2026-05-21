import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Палитра из брендбука «ЦветоМир» (раздел 11)
        brand: {
          green: "#2d5f4b",        // №1 основной тёмно-зелёный
          mint: "#d7eadb",         // №2 мятный
          ice: "#f1f8f2",          // №3 светлый фон
          ink: "#1d1d1b",          // №4 чёрный
          moss: "#5f6f66",         // №5 серо-зелёный
          lime: "#cbcc66",         // №6 салатовый
          yellow: "#fac94d",       // №7 жёлтый
          coral: "#ee845d",        // №8 коралловый
        },
      },
      fontFamily: {
        // Из брендбука (раздел 12): Raleway для заголовков/логотипа, Open Sans для текста
        display: ["var(--font-raleway)", "system-ui", "sans-serif"],
        sans: ["var(--font-open-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1240px",
      },
      borderRadius: {
        card: "20px",
      },
      boxShadow: {
        card: "0 8px 30px rgba(45, 95, 75, 0.08)",
        cta: "0 10px 24px rgba(238, 132, 93, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
