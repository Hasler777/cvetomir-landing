import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Франшиза «ЦветоМир»";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "linear-gradient(135deg, #2d5f4b 0%, #5f6f66 60%, #cbcc66 100%)",
          color: "#f1f8f2",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 700 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 28,
            background: "#fac94d", display: "flex",
            alignItems: "center", justifyContent: "center", color: "#2d5f4b",
            fontSize: 32,
          }}>✿</div>
          ЦветоМир
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            Франшиза цветочного магазина по модели, проверенной 14 годами
          </div>
          <div style={{ fontSize: 28, opacity: 0.9, maxWidth: 900 }}>
            Окупаемость 6–12 месяцев · Запуск от 1 млн ₽ · Роялти 3%
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 24 }}>
          <span style={{ background: "#ee845d", color: "white", padding: "12px 24px", borderRadius: 999 }}>
            Получить презентацию
          </span>
          <span style={{ opacity: 0.85 }}>cvetomir-franchise.ru</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
