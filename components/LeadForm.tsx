"use client";

import { useState } from "react";

export default function LeadForm({
  title = "Остались вопросы?",
  subtitle = "Заполните форму, и мы свяжемся с вами в ближайшее время.",
}: {
  title?: string;
  subtitle?: string;
}) {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        body: new FormData(form),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) throw new Error(json.error || "request_failed");
      form.reset();
      setSent(true);
    } catch {
      setError(
        "Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам по телефону.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      className="rounded-card border border-brand-mint bg-white p-7 shadow-card md:p-9"
      onSubmit={handleSubmit}
    >
      <h3 className="font-display text-2xl font-bold text-brand-ink">{title}</h3>
      <p className="mt-1 text-sm text-brand-moss">{subtitle}</p>

      {sent ? (
        <div className="mt-6 rounded-2xl border border-brand-coral bg-white p-6 text-brand-ink">
          <p className="font-display text-lg font-bold text-brand-coral">Спасибо!</p>
          <p className="mt-1 text-sm">Мы свяжемся с вами в течение рабочего дня.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {/* honeypot: скрыто от людей, заполняют только боты */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />
          <label className="block">
            <span className="text-sm text-brand-moss">Имя</span>
            <input
              required
              type="text"
              name="name"
              className="mt-1 w-full rounded-xl border-2 border-brand-coral bg-white px-4 py-3 outline-none transition-colors focus:border-[#e9743f]"
              placeholder="Как вас зовут?"
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
              Нажимая «Отправить», вы соглашаетесь с{" "}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-coral underline underline-offset-2"
              >
                политикой обработки персональных данных
              </a>
              .
            </span>
          </label>

          {error && (
            <p className="text-sm text-brand-coral" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Отправляем…" : "Отправить заявку"}
          </button>
        </div>
      )}
    </form>
  );
}
