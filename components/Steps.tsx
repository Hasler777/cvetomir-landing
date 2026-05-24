import { BigFlower } from "./FlowerArt";

const steps = [
  { t: "Знакомимся", d: "Первичная консультация и ответы на ваши вопросы." },
  { t: "Вместе выбираем формат и локацию", d: "Подбираем подходящий формат точки и помещение, которое нравится вам." },
  { t: "Готовим помещение", d: "Сопровождаем ремонт, оформление магазина и закупку оборудования." },
  { t: "Собираем команду", d: "Помогаем нанять и собрать классную команду флористов и менеджеров." },
  { t: "Доставляем вам лучшие свежие цветы", d: "Из ходового ассортимента, проверенного годами." },
  { t: "Открываемся вместе", d: "В день запуска вы не остаётесь одни: помогаем пройти первые продажи, вопросы клиентов, работу команды и первые операционные задачи." },
];

export default function Steps() {
  return (
    <section id="steps" className="relative overflow-hidden bg-brand-ice py-20 md:py-28">
      <BigFlower variant="a" className="absolute right-6 top-24 hidden h-[160px] w-[160px] opacity-90 lg:block" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-5xl">
            Пошаговый план открытия
          </h2>
          <p className="mt-5 text-base text-brand-ink md:text-lg">Как мы помогаем открыть ваш магазин — шаг за шагом.</p>
        </div>

        <ol className="mt-12 grid gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="relative card h-full">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-coral font-display text-xl font-extrabold text-white">
                  {i + 1}
                </span>
                <h3 className="font-display text-xl font-bold leading-tight text-brand-ink">{s.t}</h3>
              </div>
              <p className="mt-4 text-brand-ink/80">{s.d}</p>
            </li>
          ))}
        </ol>

        <p className="mt-10 max-w-3xl rounded-2xl bg-brand-mint/60 px-5 py-4 font-display text-lg text-brand-ink">
          И вот ваш бизнес работает: приносит прибыль — вам, и{" "}
          <span className="font-extrabold text-brand-coral">радость — вашим клиентам</span>.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#cta" className="btn-primary">Получить презентацию франшизы</a>
          <a href="#cta" className="btn-secondary">Рассчитать запуск под ваш город</a>
        </div>
      </div>
    </section>
  );
}
