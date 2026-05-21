import { Petal } from "./FlowerArt";

export default function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden bg-brand-green py-20 text-white md:py-28">
      <Petal className="absolute -right-32 -top-32 h-[420px] w-[420px] opacity-25" color="#fac94d" />
      <Petal className="absolute -left-24 -bottom-24 h-[300px] w-[300px] opacity-25" color="#ee845d" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="order-2 lg:order-1">
          <span className="eyebrow !text-brand-yellow">Об основателе</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            Основатель, который выстроил модель на практике
          </h2>
          <p className="mt-6 text-white/90 md:text-lg">
            Ильнур Хузин — основатель цветочной сети «ЦветоМир». За 14 лет
            работы компания прошла через разные этапы рынка и сформировала
            устойчивую модель цветочного магазина, которую сегодня можно
            передавать партнёрам как готовую систему.
          </p>

          <blockquote className="mt-8 rounded-card border-l-4 border-brand-yellow bg-white/5 p-6 backdrop-blur">
            <p className="font-display text-xl italic md:text-2xl">
              «Мы не спешили продавать франшизу. Сначала сделали так, чтобы модель
              действительно работала в реальном бизнесе.»
            </p>
            <footer className="mt-4 text-sm text-brand-yellow">
              — Ильнур Хузин, основатель «ЦветоМир»
            </footer>
          </blockquote>
        </div>

        {/* Портрет-плейсхолдер в фирменных цветах */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-card bg-gradient-to-br from-brand-coral via-brand-yellow to-brand-lime shadow-card">
            <div className="absolute inset-0 grid place-items-center">
              <svg viewBox="0 0 200 240" className="h-full w-full" aria-hidden="true">
                <rect width="200" height="240" fill="url(#bg)" />
                <defs>
                  <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#ee845d" />
                    <stop offset="1" stopColor="#cbcc66" />
                  </linearGradient>
                </defs>
                <circle cx="100" cy="90" r="38" fill="#f1d6b8" />
                <path d="M40 240 C 40 170, 160 170, 160 240 Z" fill="#2d5f4b" />
                <ellipse cx="100" cy="240" rx="80" ry="14" fill="#1d1d1b" opacity="0.15" />
              </svg>
              <span className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-brand-green">
                Ильнур Хузин
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
