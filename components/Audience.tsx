import { FlowerSprig } from "./FlowerArt";

const items = [
  { color: "#ee845d", t: "Тем, кто хочет открыть своё дело впервые" },
  { color: "#fac94d", t: "Предпринимателям, которые хотят понятную и рабочую модель бизнеса" },
  { color: "#cbcc66", t: "Тем, кто ищет бизнес с минимальными операционными процессами" },
  { color: "#2d5f4b", t: "Инвесторам, которым важно застраховать капитал" },
  { color: "#5f6f66", t: "Тем, кто хочет помочь запустить бизнес близкому человеку" },
];

export default function Audience() {
  return (
    <section id="audience" className="relative overflow-hidden bg-white py-20 md:py-28">
      <FlowerSprig variant="c" className="absolute right-4 top-10 hidden h-[260px] w-[180px] lg:block" />
      <FlowerSprig variant="b" className="absolute left-2 bottom-10 hidden h-[220px] w-[160px] lg:block" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-5xl">
            Кому подойдёт франшиза «ЦветоМир»
          </h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <ul className="space-y-4">
            {items.map((it) => (
              <li key={it.t} className="flex items-start gap-4 rounded-card bg-white p-5 shadow-card">
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ background: it.color }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <p className="text-base font-medium text-brand-ink md:text-lg">{it.t}</p>
              </li>
            ))}
          </ul>

          <div className="rounded-card bg-brand-green p-8 text-white shadow-card">
            <h3 className="font-display text-2xl font-bold">Опыт не обязателен</h3>
            <p className="mt-4 text-white/90">
              Главное — готовность работать по системе и желание развивать красивый,
              прибыльный бизнес. Всему остальному мы научим: от подбора букета до
              управления магазином.
            </p>
            <a href="#cta" className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 font-semibold text-brand-green">
              Обсудить запуск →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
