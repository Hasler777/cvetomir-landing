import { BigFlower, Petal } from "./FlowerArt";

const stats = [
  { value: "6–12", unit: "мес.", label: "Окупаемость" },
  { value: "от 1", unit: "млн ₽", label: "Запуск" },
  { value: "300", unit: "тыс. ₽", label: "Средняя прибыль точки" },
  { value: "4", unit: "%", label: "Роялти" },
  { value: "от 400", unit: "тыс. ₽", label: "Паушальный взнос" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col justify-center overflow-hidden bg-white pt-8 pb-20 md:min-h-[calc(100dvh-5rem)] md:pt-16 md:pb-28"
    >
      {/* Декор — крупные цветы и пятна */}
      <Petal className="absolute -top-40 -right-24 h-[560px] w-[560px] opacity-50" color="#cbcc66" />
      <Petal className="absolute -bottom-48 -left-40 h-[520px] w-[520px] opacity-40" color="#fac94d" />
      <BigFlower variant="a" className="absolute right-2 top-20 hidden h-[300px] w-[300px] lg:block" />
      <BigFlower variant="c" className="absolute right-44 top-80 hidden h-[190px] w-[190px] xl:block" />
      <BigFlower variant="b" className="absolute -left-10 bottom-16 hidden h-[280px] w-[280px] lg:block" />
      <BigFlower variant="e" className="absolute left-48 bottom-0 hidden h-[170px] w-[170px] xl:block" />
      {/* Мобильный декор — пара цветов */}
      <BigFlower variant="a" className="absolute -right-8 top-2 h-[140px] w-[140px] lg:hidden" />
      <BigFlower variant="c" className="absolute -left-8 bottom-2 h-[140px] w-[140px] lg:hidden" />

      <div className="container-x relative">
        <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-brand-ink md:text-6xl">
          Откройте цветочный магазин по модели, проверенной{" "}
          <span className="md:whitespace-nowrap">
            <span className="accent">14&nbsp;годами</span> реальной работы
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-brand-moss md:text-xl">
          Франшиза «ЦветоМир» — это готовая система запуска и развития цветочного магазина.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>

        {/* Карточки цифр — на мобиле по одной в строчку, на десктопе 5 в ряд */}
        <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((s) => (
            <li key={s.label} className="card !p-6">
              <div className="whitespace-nowrap font-display text-4xl font-extrabold leading-none text-brand-coral md:text-4xl">
                {s.value}
                <span className="ml-1 text-2xl font-extrabold text-brand-coral md:text-2xl">
                  {s.unit}
                </span>
              </div>
              <div className="mt-3 text-base font-medium text-brand-ink md:text-sm">{s.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
