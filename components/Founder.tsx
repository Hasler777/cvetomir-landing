import Image from "next/image";
import { BigFlower } from "./FlowerArt";

export default function Founder() {
  return (
    <section id="founder" className="relative overflow-hidden bg-brand-green py-20 text-white md:py-28">
      <BigFlower variant="b" className="absolute bottom-8 left-6 hidden h-[150px] w-[150px] opacity-90 lg:block" />

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

          <blockquote className="mt-8 rounded-card border-l-4 border-brand-yellow bg-white/30 p-6 backdrop-blur-md">
            <p className="font-display text-xl italic text-white md:text-2xl">
              «Мы не спешили продавать франшизу. Сначала сделали так, чтобы модель
              действительно работала в реальном бизнесе.»
            </p>
            <footer className="mt-4 text-sm text-white/90">
              — Ильнур Хузин, основатель «ЦветоМир»
            </footer>
          </blockquote>
        </div>

        {/* Портрет основателя */}
        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[440px] overflow-hidden rounded-card shadow-card">
            <Image
              src="/founder.jpg"
              alt="Ильнур Хузин — основатель «ЦветоМир»"
              fill
              sizes="(min-width: 1024px) 440px, 100vw"
              className="object-cover"
              priority
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-brand-green">
              Ильнур Хузин
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
