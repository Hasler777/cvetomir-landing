const items = [
  { i: "01", t: "Подбор формата и локации", d: "Помогаем выбрать формат магазина и удачное место с учётом города и трафика." },
  { i: "02", t: "Запуск и оформление точки", d: "Даём рекомендации по дизайну, оборудованию и расходникам." },
  { i: "03", t: "Готовый ассортимент", d: "Подборка цветов и букетов, которые продаются лучше всего, — на основе нашей сети." },
  { i: "04", t: "Свежие поставки и логистика", d: "Обеспечиваем магазин нужным ассортиментом качества — с готовой системой поставок." },
  { i: "05", t: "Обучение", d: "Программы для собственников и сотрудников — по практикам, собранным за 14 лет." },
  { i: "06", t: "Операционные процессы", d: "Налаживаем все процессы вместе с вами: смены, учёт, чек-листы, контроль качества." },
  { i: "07", t: "Поток клиентов", d: "Помогаем выстроить маркетинг и стабильный поток заказов в оффлайне и онлайне." },
  { i: "08", t: "Сопровождение и развитие", d: "Поддерживаем запуск и помогаем расти точке после открытия." },
];

export default function WhatsIncluded() {
  return (
    <section id="included" className="seam-soft bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Что получает партнёр</span>
          <h2 className="mt-4 h-section">Что включено во франшизу «ЦветоМир»</h2>
          <p className="subtitle mt-5">
            Сначала мы построили свою сеть магазинов, чтобы наш опыт помог вам{" "}
            <span className="accent">быстро и легко</span> запустить собственное дело.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <li
              key={it.i}
              className="group h-full rounded-card border border-brand-mint bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(45,95,75,0.14)]"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-coral font-display text-sm font-bold text-white">
                {it.i}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-brand-ink leading-tight">
                {it.t}
              </h3>
              <p className="mt-2 text-sm text-brand-moss">{it.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>
      </div>
    </section>
  );
}
