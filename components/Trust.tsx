import { Petal } from "./FlowerArt";

const stats = [
  { accent: "14+", tail: "лет практики на рынке" },
  { accent: "ЛУЧШИЙ", tail: "ассортимент цветов и отлаженная система поставок" },
  { accent: "Запуск", tail: "без хаоса и убытков" },
  { accent: "Модель", tail: "которую можно повторить" },
];

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-brand-green py-20 text-white md:py-28">
      <Petal className="absolute -left-32 -top-32 h-[420px] w-[420px] opacity-30" color="#cbcc66" />
      <Petal className="absolute -right-32 -bottom-32 h-[420px] w-[420px] opacity-25" color="#ee845d" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="text-center lg:text-left">
          <h2 className="font-display text-3xl font-bold leading-tight md:text-5xl">
            <span className="md:whitespace-nowrap">«ЦветоМир» — франшиза,</span>{" "}
            созданная на базе действующей прибыльной сети
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-white/85 md:text-lg lg:mx-0">
            Более 14 лет мы развиваемся в реальных рыночных условиях. Мы не
            спешили с франчайзингом. Сначала отточили ассортимент, логистику,
            сервис, упаковку, доставку, онлайн-продажи и управление магазином.
            Теперь эту систему получает партнёр — для запуска бизнеса с
            поддержкой и готовыми решениями.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
            <a href="#cta" className="inline-flex items-center justify-center whitespace-nowrap rounded-full border-2 border-white/70 px-7 py-4 font-semibold text-white transition-colors duration-150 [@media(hover:hover)]:hover:bg-white [@media(hover:hover)]:hover:text-brand-green">
              Рассчитать запуск под ваш город
            </a>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <li
              key={s.accent}
              className="rounded-card bg-white p-6 shadow-card"
            >
              <div className="font-display text-2xl font-extrabold leading-tight text-brand-coral md:text-3xl">
                {s.accent}
              </div>
              <div className="mt-2 text-sm font-medium text-brand-ink md:text-base">
                {s.tail}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
