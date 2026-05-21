import { BigFlower } from "./FlowerArt";

const items = [
  { v: "от 1 млн ₽", t: "Запуск", note: "В зависимости от размера магазина" },
  { v: "от 400 000 ₽", t: "Паушальный взнос", note: "Единоразово при запуске" },
  { v: "4%", t: "Роялти", note: "Мы зарабатываем только когда вы зарабатываете" },
  { v: "6–12 мес.", t: "Окупаемость", note: "В зависимости от выбранного формата и города" },
  { v: "300 000 ₽", t: "Средняя прибыль точки", note: "Даже в кризис. На основе 14 лет практики." },
];

export default function Economics() {
  return (
    <section id="economics" className="seam-soft relative overflow-hidden bg-white py-20 md:py-28">
      {/* Крупные цветы вместо желтого фона */}
      <BigFlower variant="b" className="absolute -left-12 -top-12 h-[260px] w-[260px] opacity-90" />
      <BigFlower variant="a" className="absolute -right-12 -bottom-12 h-[260px] w-[260px] opacity-90" />
      <BigFlower variant="c" className="absolute right-1/4 top-8 hidden h-[120px] w-[120px] xl:block" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <span className="eyebrow">Экономика франшизы</span>
          <h2 className="mt-4 h-section">Что нужно для открытия магазина</h2>
          <p className="subtitle mt-5">
            Помогаем найти лучшие условия для запуска вашей точки.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <li
              key={it.t}
              className="rounded-card border border-brand-mint bg-white p-6 shadow-card"
            >
              <div className="accent font-display text-xl font-extrabold leading-tight md:text-2xl whitespace-nowrap">
                {it.v}
              </div>
              <div className="mt-2 font-semibold text-brand-ink">{it.t}</div>
              <div className="mt-2 text-xs text-brand-moss md:text-sm">{it.note}</div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm text-brand-moss md:text-base">
          Фактические показатели зависят от города, локации, формата магазина и
          качества операционного управления, но сама модель уже опирается на
          практику действующей сети.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>
      </div>
    </section>
  );
}
