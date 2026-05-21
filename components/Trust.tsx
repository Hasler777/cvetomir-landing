import { BigFlower, Petal } from "./FlowerArt";

const stats = [
  { head: "14+", accent: "лет", tail: "практики на рынке" },
  { head: "ЛУЧШИЙ", accent: "", tail: "ассортимент цветов и отлаженная система поставок" },
  { head: "Запуск", accent: "без хаоса", tail: "и убытков" },
  { head: "Готовая модель,", accent: "которую можно повторить", tail: "" },
];

export default function Trust() {
  return (
    <section className="seam-soft relative overflow-hidden bg-white py-20 md:py-28">
      <Petal className="absolute -left-32 -top-32 h-[420px] w-[420px] opacity-30" color="#cbcc66" />
      <Petal className="absolute -right-32 -bottom-32 h-[420px] w-[420px] opacity-25" color="#ee845d" />
      <BigFlower variant="b" className="absolute right-6 bottom-12 hidden h-[160px] w-[160px] lg:block" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="eyebrow">Блок доверия</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-brand-ink md:text-5xl">
            <span className="no-break">«ЦветоМир» — франшиза,</span> созданная на базе действующей прибыльной сети
          </h2>
          <p className="mt-6 max-w-xl text-brand-moss md:text-lg">
            Более 14 лет мы развиваемся в реальных рыночных условиях. Мы не
            спешили с франчайзингом. Сначала отточили ассортимент, логистику,
            сервис, упаковку, доставку, онлайн-продажи и управление магазином.
            Теперь эту систему получает партнёр — для запуска бизнеса с
            поддержкой и готовыми решениями.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
            <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <li
              key={s.head}
              className="rounded-card border border-brand-mint bg-white p-6 shadow-card"
            >
              <div className="font-display text-2xl font-extrabold leading-tight text-brand-ink md:text-3xl">
                <span className="accent">{s.head}</span>
                {s.accent && <> <span className="text-brand-ink">{s.accent}</span></>}
              </div>
              {s.tail && <div className="mt-3 text-sm text-brand-moss md:text-base">{s.tail}</div>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
