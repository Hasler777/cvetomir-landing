import { Petal } from "./FlowerArt";

const stats = [
  { value: "14+", label: "лет практики" },
  { value: "Поставки", label: "отлаженные, лучший ассортимент" },
  { value: "Запуск", label: "без хаоса и убытков" },
  { value: "Модель", label: "которую можно повторить" },
];

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-brand-green py-20 text-white md:py-28">
      <Petal className="absolute -left-32 -top-32 h-[420px] w-[420px] opacity-30" color="#cbcc66" />
      <Petal className="absolute -right-32 -bottom-32 h-[420px] w-[420px] opacity-25" color="#ee845d" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow !text-brand-yellow">Блок доверия</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
            «ЦветоМир» — франшиза, созданная на базе действующей прибыльной сети
          </h2>
          <p className="mt-6 max-w-xl text-white/85 md:text-lg">
            Более 14 лет мы развиваемся в реальных рыночных условиях. Мы не
            спешили с франчайзингом. Сначала отточили ассортимент, логистику,
            сервис, упаковку, доставку, онлайн-продажи и управление магазином.
            Теперь эту систему получает партнёр — для запуска бизнеса с
            поддержкой и готовыми решениями.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
            <a href="#cta" className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-white/70 px-7 py-4 font-semibold text-white transition-colors duration-150 [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-brand-green">
              Рассчитать запуск под ваш город
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <li
              key={s.label}
              className="rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur"
            >
              <div className="font-display text-3xl font-extrabold text-brand-yellow md:text-4xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-white/85 md:text-base">{s.label}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
