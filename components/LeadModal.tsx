"use client";

import { useEffect, useState } from "react";
import LeadForm from "./LeadForm";

export const OPEN_LEAD_MODAL_EVENT = "open-lead-modal";

/** Всплывающая форма заявки. Открывается событием `open-lead-modal`
 *  (см. OpenLeadModalButton) — посетитель не теряет место на странице. */
export default function LeadModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_LEAD_MODAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_LEAD_MODAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Оставить заявку на франшизу"
    >
      <div
        className="absolute inset-0 bg-brand-ink/55 backdrop-blur-sm"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-card">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-brand-mint/60 text-xl leading-none text-brand-ink transition-colors hover:bg-brand-mint"
        >
          ×
        </button>
        <LeadForm
          title="Оставить заявку"
          subtitle="Заполните форму, и мы свяжемся с вами в ближайшее время."
        />
      </div>
    </div>
  );
}
