"use client";

import { useState } from "react";
import { BigFlower, Petal } from "./FlowerArt";

export default function FinalCTA() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="cta"
      className="seam-soft relative overflow-hidden bg-white py-20 md:py-28"
    >
      <Petal className="absolute -right-24 top-10 h-[300px] w-[300px] opacity-50" color="#fac94d" />
      <Petal className="absolute -left-32 -bottom-24 h-[360px] w-[360px] opacity-40" color="#cbcc66" />
      <BigFlower variant="a" className="absolute right-10 bottom-10 hidden h-[160px] w-[160px] lg:block" />

      <div className="container-x relative grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <div>
          <span className="eyebrow">Финальный шаг</span>
          <h2 className="mt-4 h-section">Готовы открыть прибыльный цветочный бизнес?</h2>
          <p className="subtitle mt-6">
            «ЦветоМир» даёт возможность стартовать на основе уже выстроенной системы, а не начинать с нуля.
          </p>
          <ul className="mt-6 space-y-3 text-brand-ink">
            <li className="flex gap-3"><span className="accent">✿</span> Презентация франшизы в PDF</li>
            <li className="flex gap-3"><span className="accent">✿</span> Расчёт запуска под ваш город</li>
            <li className="flex gap-3"><span className="accent">✿</span> Ответы основателя на ваши вопросы</li>
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
            <div className="mt-6 rounded-2xl border border-brand-mint bg-white p-6 text-brand-ink">
              <p className="font-display text-lg font-bold accent">Спасибо!</p>
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

              <button type="submit" className="btn-primary w-full">
                Отправить заявку
              </button>

              <p className="text-xs text-brand-moss">
                Нажимая «Отправить», вы соглашаетесь с{" "}
                <a
                  href="/privacy"
                  className="underline decoration-brand-coral underline-offset-2 hover:text-brand-coral"
                >
                  обработкой персональных данных
                </a>
                .
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
