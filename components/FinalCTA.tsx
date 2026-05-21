"use client";

import { useState } from "react";
import { Petal } from "./FlowerArt";

export default function FinalCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section id="cta" className="relative overflow-hidden bg-white py-20 md:py-28">
      <Petal className="absolute -right-24 top-10 h-[300px] w-[300px] opacity-60" color="#fac94d" />
      <Petal className="absolute -left-32 -bottom-24 h-[360px] w-[360px] opacity-50" color="#cbcc66" />

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

        <form
          className="rounded-card border border-brand-mint bg-white p-7 shadow-card md:p-9"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <h3 className="font-display text-2xl font-bold text-brand-ink">
            Остались вопросы?
          </h3>
          <p className="mt-1 text-sm text-brand-moss">
            Заполните форму, и мы свяжемся с вами в ближайшее время.
          </p>

          {sent ? (
            <div className="mt-6 rounded-2xl border border-brand-coral bg-white p-6 text-brand-ink">
              <p className="font-display text-lg font-bold text-brand-coral">Спасибо!</p>
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
                  className="mt-1 w-full rounded-xl border-2 border-brand-coral bg-white px-4 py-3 outline-none transition-colors focus:border-[#e9743f]"
                  placeholder="Как к вам обращаться"
                />
              </label>
              <label className="block">
                <span className="text-sm text-brand-moss">Телефон</span>
                <input
                  required
                  type="tel"
                  name="phone"
                  className="mt-1 w-full rounded-xl border-2 border-brand-coral bg-white px-4 py-3 outline-none transition-colors focus:border-[#e9743f]"
                  placeholder="+7 ___ ___ __ __"
                />
              </label>
              <label className="block">
                <span className="text-sm text-brand-moss">Город</span>
                <input
                  type="text"
                  name="city"
                  className="mt-1 w-full rounded-xl border-2 border-brand-coral bg-white px-4 py-3 outline-none transition-colors focus:border-[#e9743f]"
                  placeholder="Например, Казань"
                />
              </label>

              <label className="flex items-start gap-3 text-sm text-brand-ink">
                <input
                  required
                  type="checkbox"
                  name="consent"
                  className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-brand-coral"
                />
                <span>
                  Я даю согласие на обработку персональных данных в соответствии
                  с{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-coral underline underline-offset-2"
                  >
                    Политикой
                  </a>
                  .
                </span>
              </label>

              <button type="submit" className="btn-primary w-full">
                Отправить заявку
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
