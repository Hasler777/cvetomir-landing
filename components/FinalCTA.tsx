import { BigFlower } from "./FlowerArt";
import LeadForm from "./LeadForm";

export default function FinalCTA() {
  return (
    <section id="cta" className="relative overflow-hidden bg-white py-20 md:py-28">
      <BigFlower variant="a" className="absolute bottom-10 left-6 hidden h-[150px] w-[150px] opacity-90 lg:block" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <h2 className="font-display text-3xl font-bold leading-[1.1] text-brand-ink md:text-5xl">
            Готовы открыть прибыльный цветочный бизнес?
          </h2>
          <p className="mt-6 text-base text-brand-ink md:text-lg">
            «ЦветоМир» даёт возможность стартовать на основе уже выстроенной
            системы, а не начинать с нуля.
          </p>
          <ul className="mt-6 space-y-3 text-brand-ink">
            <li className="flex gap-3"><span className="text-brand-coral">✿</span> Презентация франшизы в PDF</li>
            <li className="flex gap-3"><span className="text-brand-coral">✿</span> Расчёт запуска под ваш город</li>
            <li className="flex gap-3"><span className="text-brand-coral">✿</span> Ответы основателя на ваши вопросы</li>
          </ul>
        </div>

        <LeadForm />
      </div>
    </section>
  );
}
