const items = [
  { i: "01", t: "Подбор формата и локации", d: "Помогаем выбрать формат магазина и удачное место с учётом города и трафика." },
  { i: "02", t: "Запуск и оформление точки", d: "Даём рекомендации по дизайну, оборудованию и расходникам." },
  { i: "03", t: "Готовый ассортимент", d: "Подборка цветов и букетов, которые продаются лучше всего, — на основе нашей сети." },
  { i: "04", t: "Свежие поставки и логистика", d: "Обеспечиваем магазин свежими цветами нужного ассортимента и качества — с готовой системой поставок и логистики." },
  { i: "05", t: "Обучение", d: "Программы для собственников и сотрудников — по практикам, собранным за 14 лет." },
  { i: "06", t: "Операционные процессы", d: "Налаживаем все процессы вместе с вами: смены, учёт, чек-листы, контроль качества." },
  { i: "07", t: "Поток клиентов", d: "Помогаем выстроить маркетинг и стабильный поток заказов в оффлайне и онлайне." },
  { i: "08", t: "Сопровождение и развитие", d: "Поддерживаем запуск и помогаем расти точке после открытия." },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhatsIncluded() {
  return (
    <section id="included" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-4xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-5xl">
            Что включено во франшизу «ЦветоМир»
          </h2>
          <p className="subtitle mt-5">
            Сначала мы построили свою сеть магазинов, чтобы наш опыт помог вам{" "}
            <span className="font-bold text-brand-coral">быстро и&nbsp;легко</span>{" "}
            запустить собственное дело.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            const lastColSm = i % 2 === 1; // последняя в ряду при 2 колонках
            const lastColLg = i % 4 === 3; // последняя в ряду при 4 колонках
            // Стрелка вправо видна, только если карточка не последняя в своём ряду
            const rightArrow = [
              "hidden",
              lastColSm ? "" : "sm:flex",
              lastColLg ? "lg:hidden" : "lg:flex",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <li
                key={it.i}
                className="group card relative h-full transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(45,95,75,0.14)]"
              >
                <span className="inline-flex h-9 items-center rounded-full bg-brand-mint px-3 font-display text-sm font-bold text-brand-green">
                  {it.i}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-brand-green">
                  {it.t}
                </h3>
                <p className="mt-2 text-sm text-brand-moss">{it.d}</p>

                {!isLast && (
                  <>
                    {/* Стрелка вправо — между карточками в ряду (планшет/десктоп) */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-[calc(50%+1rem)] items-center text-brand-coral ${rightArrow}`}
                    >
                      <Chevron />
                    </span>
                    {/* Стрелка вниз — между карточками в столбик (мобайл) */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 translate-y-1/2 text-brand-coral sm:hidden"
                    >
                      <Chevron className="rotate-90" />
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>
      </div>
    </section>
  );
}
