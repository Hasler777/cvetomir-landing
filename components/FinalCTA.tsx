"use client";

import { useState } from "react";
import { Petal } from "./FlowerArt";

export default function FinalCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section id="cta" className="relative overflow-hidden bg-brand-ice py-20 md:py-28">
      <Petal className="absolute -right-24 top-10 h-[300px] w-[300px] opacity-60" color="#fac94d" />
      <Petal className="absolute -left-32 -bottom-24 h-[360px] w-[360px] opacity-50" color="#cbcc66" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <span className="eyebrow">Финальный шаг</span>
          <h2 className="mt-4 h-section">Готовы открыть прибыльный цветочный бизнес?</h2>
          <p className="subtitle mt-6">
            Если вы рассматриваете цветочный бизнес как серьёзный
            предпринимательский проект, «ЦветоМир» даёт возможность стартовать
            на основе уже выстроенной системы, а не начинать с нуля.
          </p>
          <ul className="mt-6 space-y-3 text-brand-ink">
            <li className="flex gap-3"><span className="text-brand-coral">✿</span> Презентация франшизы в PDF</li>
            <li className="flex gap-3"><span className="text-brand-coral">✿</span> Расчёт запуска под ваш город</li>
            <li className="flex gap-3"><span className="text-brand-coral">✿</span> Ответы основателя на ваши вопросы</li>
          </ul>
        </div>

        <form
          className="rounded-card bg-white p-7 shadow-card md:p-9"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h3 className="font-display text-2xl font-bold text-brand-green">
            Остались вопросы?
          </h3>
          <p className="mt-1 text-sm text-brand-moss">
            Заполните форму, и мы свяжемся с вами в ближайшее время.
          </p>

          {sent ? (
            <div className="mt-6 rounded-2xl bg-brand-mint p-6 text-brand-green">
              <p className="font-display text-lg font-bold">Спасибо!</p>
              <p className="mt-1 text-sm">Мы свяжемся с вами в течение рабочего дня.</p>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm text-brand-moss">Имя</span>
                <input
                  required
                  type="text"
                  name="name"
                  className="mt-1 w-full rounded-xl border border-brand-mint bg-brand-ice px-4 py-3 outline-none focus:border-brand-green"
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="block">
                <span className="text-sm text-brand-moss">Телефон</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  className="mt-1 w-full rounded-xl border border-brand-mint bg-brand-ice px-4 py-3 outline-none focus:border-brand-green"
                  placeholder="+7 ___ ___ __ __"
                />
              </label>
              <label className="block">
                <span className="text-sm text-brand-moss">Город</span>
                <input
                  type="text"
                  name="city"
                  className="mt-1 w-full rounded-xl border border-brand-mint bg-brand-ice px-4 py-3 outline-none focus:border-brand-green"
                  placeholder="Например, Казань"
                />
              </label>

              <button type="submit" className="btn-primary w-full">
                Отправить заявку
              </button>

              <p className="text-xs text-brand-moss">
                Нажимая «Отправить», вы соглашаетесь с обработкой персональных данных.
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
