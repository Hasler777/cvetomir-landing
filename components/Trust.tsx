import { BigFlower } from "./FlowerArt";

const stats = [
  {
    accent: "14+ лет",
    tail: "реального опыта в нише. Мы сначала сами построили сеть и теперь передаём вам свой опыт",
  },
  {
    accent: "Проверенный ассортимент",
    tail: "поставляем вам только то, что реально продаётся лучше всего",
  },
  {
    accent: "Открытие по готовому маршруту",
    tail: "даём регламенты и сопровождаем вас по шагам, по которым сами запускаем магазины",
  },
  {
    accent: "Готовый формат магазина",
    tail: "понятно, какой открыть, что внутри должно быть и как запустить продажи",
  },
];

export default function Trust() {
  return (
    <section className="relative overflow-hidden bg-brand-green py-20 text-white md:py-28">
      <BigFlower variant="a" className="absolute bottom-6 right-6 hidden h-[120px] w-[120px] opacity-90 lg:block" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:items-center">
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

        <ul className="grid grid-cols-1 gap-4 sm:auto-rows-fr sm:grid-cols-2">
          {stats.map((s) => (
            <li
              key={s.accent}
              className="h-full rounded-card bg-white p-5 shadow-card"
            >
              <div className="font-display text-lg font-extrabold leading-tight text-brand-coral md:text-xl">
                {s.accent}
              </div>
              <div className="mt-1.5 text-sm font-medium text-brand-ink">
                {s.tail}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
