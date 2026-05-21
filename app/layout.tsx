import type { Metadata, Viewport } from "next";
import { Raleway, Open_Sans } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin", "cyrillic"],
  variable: "--font-raleway",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-open-sans",
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cvetomir-franchise.ru";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Франшиза «ЦветоМир» — откройте цветочный магазин по модели, проверенной 14 годами",
    template: "%s — Франшиза «ЦветоМир»",
  },
  description:
    "Готовая система запуска цветочного магазина: оформление точки, ассортимент, поставки, сервис, доставка, маркетинг и онлайн-продажи. Окупаемость 6–12 месяцев, запуск от 1 млн ₽, роялти 3%.",
  applicationName: "ЦветоМир Франшиза",
  authors: [{ name: "ЦветоМир" }],
  generator: "Next.js",
  keywords: [
    "франшиза цветочного магазина",
    "цветочный бизнес",
    "ЦветоМир",
    "франшиза цветы",
    "открыть цветочный магазин",
    "франшиза с окупаемостью",
    "франшиза без опыта",
  ],
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
    languages: { "ru-RU": "/" },
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Франшиза «ЦветоМир»",
    title:
      "Франшиза «ЦветоМир» — откройте цветочный магазин по проверенной модели",
    description:
      "14 лет реальной практики, отлаженные поставки, готовая модель магазина. Окупаемость 6–12 месяцев, запуск от 1 млн ₽.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Франшиза ЦветоМир",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Франшиза «ЦветоМир»",
    description:
      "Готовая система запуска цветочного магазина с поддержкой и поставками.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "business",
  formatDetection: { telephone: true, email: true, address: true },
};

export const viewport: Viewport = {
  themeColor: "#2d5f4b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}#organization`,
        name: "ЦветоМир",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        founder: { "@type": "Person", name: "Ильнур Хузин" },
        foundingDate: "2011",
        sameAs: [],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}#website`,
        url: siteUrl,
        name: "Франшиза «ЦветоМир»",
        publisher: { "@id": `${siteUrl}#organization` },
        inLanguage: "ru-RU",
      },
      {
        "@type": "Service",
        name: "Франшиза цветочного магазина «ЦветоМир»",
        provider: { "@id": `${siteUrl}#organization` },
        areaServed: "RU",
        description:
          "Запуск цветочного магазина под ключ по модели, проверенной 14 годами реальной работы.",
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: "400000",
          description: "Паушальный взнос от 400 000 ₽, роялти 3%.",
        },
      },
    ],
  };

  return (
    <html lang="ru" className={`${raleway.variable} ${openSans.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
