import { BigFlower, Daisy } from "./FlowerArt";

const items = [
  { color: "#ee845d", t: "Тем, кто хочет открыть своё дело впервые" },
  { color: "#fac94d", t: "Предпринимателям, которые хотят понятную и рабочую модель бизнеса" },
  { color: "#cbcc66", t: "Тем, кто ищет бизнес с минимальными операционными процессами" },
  { color: "#2d5f4b", t: "Инвесторам, которым важно застраховать капитал" },
  { color: "#5f6f66", t: "Тем, кто хочет помочь запустить бизнес близкому человеку" },
];

export default function Audience() {
  return (
    <section id="audience" className="seam-soft relative overflow-x-clip bg-white py-20 md:py-28">
      <BigFlower variant="a" className="absolute right-2 top-10 hidden h-[180px] w-[180px] lg:block" />
      <BigFlower variant="c" className="absolute left-2 bottom-10 hidden h-[160px] w-[160px] lg:block" />
      <Daisy className="absolute right-1/3 top-1/2 hidden h-[80px] w-[80px] xl:block" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <span className="eyebrow">Кому подойдёт</span>
          <h2 className="mt-4 h-section">Кому подойдёт франшиза «ЦветоМир»</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <ul className="space-y-4">
            {items.map((it) => (
              <li
                key={it.t}
                className="flex items-start gap-4 rounded-card border border-brand-mint bg-white p-5 shadow-card"
              >
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
            <a href="#cta" className="btn-primary mt-6 !bg-brand-yellow !text-brand-green hover:!bg-[#f0b830]">
              Обсудить запуск →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
