import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Франшиза «ЦветоМир»",
    short_name: "ЦветоМир",
    description:
      "Готовая система запуска цветочного магазина по модели, проверенной 14 годами.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2d5f4b",
    lang: "ru-RU",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
