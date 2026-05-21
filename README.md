# Лендинг франшизы «ЦветоМир»

Next.js 14 (App Router) + TypeScript + Tailwind. Палитра и шрифты — из брендбука «ЦветоМир» (раздел 11 «Палитры цветов», раздел 12 «Шрифты и типографика»).

## Запуск

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Перед деплоем задайте `NEXT_PUBLIC_SITE_URL` в `.env.local` (см. `.env.example`) — он подставляется в `metadata.metadataBase`, JSON-LD, `sitemap.xml` и `robots.txt`.

## SEO

- `app/layout.tsx` — `metadata`, `viewport`, JSON-LD (Organization, WebSite, Service)
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- `app/opengraph-image.tsx` → динамическое OG-изображение 1200×630
- `app/icon.svg` — фавикон в фирменных цветах

## Структура

`app/page.tsx` собирает блоки из `components/`:

| Блок            | Файл                       |
| --------------- | -------------------------- |
| Шапка           | `Header.tsx`               |
| 1-й экран       | `Hero.tsx`                 |
| Блок доверия    | `Trust.tsx`                |
| Почему цветы    | `WhyFlowers.tsx`           |
| Что включено    | `WhatsIncluded.tsx`        |
| Экономика       | `Economics.tsx`            |
| Кому подойдёт   | `Audience.tsx`             |
| Этапы запуска   | `Steps.tsx`                |
| Об основателе   | `Founder.tsx`              |
| Финальный CTA   | `FinalCTA.tsx`             |
| Подвал          | `Footer.tsx`               |

Декоративная графика (цветы/листья/«пятна») — `components/FlowerArt.tsx`,
все SVG нарисованы в фирменных цветах брендбука.

## Брендовые токены

Tailwind-палитра `brand.*` повторяет раздел 11 брендбука:

| Имя           | HEX        | Назначение                  |
| ------------- | ---------- | --------------------------- |
| brand-green   | `#2d5f4b`  | Основной                    |
| brand-mint    | `#d7eadb`  | Светлый фон                 |
| brand-ice     | `#f1f8f2`  | Базовый фон                 |
| brand-ink     | `#1d1d1b`  | Чёрный текст                |
| brand-moss    | `#5f6f66`  | Вспомогательный             |
| brand-lime    | `#cbcc66`  | Акцент                      |
| brand-yellow  | `#fac94d`  | Акцент                      |
| brand-coral   | `#ee845d`  | CTA-кнопки                  |

Шрифты: Raleway (заголовки) и Open Sans (текст), подключены через `next/font`.
