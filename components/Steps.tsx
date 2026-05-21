const steps = [
  { t: "Знакомство", d: "Первичная консультация и ответы на ваши вопросы." },
  { t: "Формат и локация", d: "Подбираем подходящий формат точки и помещение, которое нравится вам." },
  { t: "Подготовка помещения", d: "Сопровождаем ремонт, оформление магазина и закупку оборудования." },
  { t: "Команда", d: "Помогаем нанять и собрать классную команду флористов и менеджеров." },
  { t: "Поставки цветов", d: "Доставляем лучшие свежие цветы из ходового ассортимента, проверенного годами." },
  { t: "Открытие и поддержка", d: "Запуск магазина и дальнейшее сопровождение после открытия." },
];

export default function Steps() {
  return (
    <section id="steps" className="bg-brand-ice py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <span className="eyebrow">Этапы запуска</span>
          <h2 className="mt-4 h-section">Пошаговый план открытия</h2>
          <p className="subtitle mt-5">Как мы помогаем открыть ваш магазин — шаг за шагом.</p>
        </div>

        <ol className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="relative card">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-green font-display text-xl font-extrabold text-brand-yellow">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-bold text-brand-green">{s.t}</h3>
              </div>
              <p className="mt-4 text-brand-moss">{s.d}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl rounded-2xl bg-brand-mint/60 px-5 py-4 font-display text-lg font-semibold text-brand-green">
          И вот ваш бизнес работает: приносит прибыль вам и радость вашим клиентам.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>
      </div>
    </section>
  );
}
