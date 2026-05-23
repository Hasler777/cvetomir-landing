import { BigFlower, Petal } from "./FlowerArt";

const items = [
  { v: "от 1 млн ₽", t: "Запуск", note: "В зависимости от размера магазина" },
  { v: "от 400 000 ₽", t: "Паушальный взнос", note: "Единоразово при запуске" },
  { v: "4%", t: "Роялти", note: "Мы зарабатываем только когда вы зарабатываете" },
  { v: "6–12 мес.", t: "Окупаемость", note: "В зависимости от выбранного формата и города" },
  { v: "300 000 ₽", t: "Средняя прибыль точки", note: "Даже в кризис. На основе 14 лет практики." },
];

export default function Economics() {
  return (
    <section id="economics" className="relative overflow-hidden bg-brand-yellow/85 py-20 md:py-28">
      <Petal className="absolute -left-24 -top-24 h-[300px] w-[300px] opacity-70" color="#cbcc66" />
      <Petal className="absolute -right-24 -bottom-24 h-[300px] w-[300px] opacity-60" color="#ee845d" />
      <BigFlower variant="a" className="absolute -right-16 -top-16 hidden h-[300px] w-[300px] opacity-80 lg:block" />
      <BigFlower variant="c" className="absolute -left-16 -bottom-16 hidden h-[260px] w-[260px] opacity-75 lg:block" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-5xl">
            Что нужно для открытия магазина
          </h2>
          <p className="mt-5 text-base text-brand-ink md:text-lg">
            Помогаем найти лучшие условия для запуска вашей точки.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it) => (
            <li key={it.t} className="rounded-card bg-white p-6 shadow-card">
              <div className="whitespace-nowrap font-display text-xl font-extrabold leading-tight text-brand-green md:text-2xl">
                {it.v}
              </div>
              <div className="mt-2 font-semibold text-brand-ink">{it.t}</div>
              <div className="mt-2 text-xs text-brand-moss md:text-sm">{it.note}</div>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl text-sm text-brand-ink md:text-base">
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
