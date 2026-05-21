"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // localStorage недоступен — баннер не показываем
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Согласие на использование cookies"
      className="fixed inset-x-0 bottom-0 z-[100] border-t-[3px] border-brand-coral bg-white px-5 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]"
    >
      <div className="container-x flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-brand-ink md:text-base">
          Мы используем cookie для работы сайта и анализа трафика. Продолжая
          пользоваться сайтом, вы соглашаетесь с{" "}
          <a
            href="/privacy"
            className="text-brand-coral underline underline-offset-2"
          >
            Политикой обработки персональных данных
          </a>
          .
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn-primary !px-7 !py-3 text-sm md:text-base shrink-0"
        >
          Принять
        </button>
      </div>
    </div>
  );
}
