import { FlowerSprig, Petal } from "./FlowerArt";

const stats = [
  { value: "6–12", unit: "мес.", label: "Окупаемость" },
  { value: "от 1", unit: "млн ₽", label: "Запуск" },
  { value: "300", unit: "тыс. ₽", label: "Средняя прибыль точки" },
  { value: "3", unit: "%", label: "Роялти" },
  { value: "от 400", unit: "тыс. ₽", label: "Паушальный взнос" },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-ice pt-10 pb-20 md:pt-16 md:pb-28">
      {/* Декор — пятна из брендбука */}
      <Petal className="absolute -top-20 -right-20 h-[420px] w-[420px] opacity-90" color="#cbcc66" />
      <Petal className="absolute -bottom-32 -left-24 h-[360px] w-[360px] opacity-80" color="#fac94d" />
      <FlowerSprig variant="a" className="absolute right-6 top-32 hidden h-[280px] w-[200px] lg:block" />
      <FlowerSprig variant="b" className="absolute left-4 bottom-10 hidden h-[220px] w-[160px] lg:block" />

      <div className="container-x relative">
        <span className="eyebrow">Франшиза цветочного магазина</span>
        <h1 className="mt-4 max-w-4xl font-display text-4xl font-extrabold leading-[1.05] text-brand-green md:text-6xl">
          Откройте цветочный магазин по модели, проверенной{" "}
          <span className="text-brand-coral">14 годами</span> реальной работы.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-brand-moss md:text-xl">
          Франшиза «ЦветоМир» — это готовая система запуска и развития цветочного
          магазина: от оформления точки и ассортимента до поставок, сервиса,
          доставки, маркетинга и онлайн-продаж.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>

        <p className="mt-8 max-w-2xl rounded-2xl border border-brand-green/15 bg-white/70 px-5 py-3 font-display text-base font-semibold text-brand-green md:text-lg">
          «Франшиза, выросшая из реальной сети, а не из теории».
        </p>

        <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-5">
          {stats.map((s) => (
            <li key={s.label} className="card !p-5">
              <div className="font-display text-3xl font-extrabold leading-none text-brand-green md:text-4xl">
                {s.value}
                <span className="ml-1 text-base font-semibold text-brand-coral md:text-lg">
                  {s.unit}
                </span>
              </div>
              <div className="mt-2 text-sm text-brand-moss">{s.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
