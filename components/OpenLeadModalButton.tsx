"use client";

import { OPEN_LEAD_MODAL_EVENT } from "./LeadModal";

/** Кнопка, открывающая всплывающую форму заявки (LeadModal). */
export default function OpenLeadModalButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_LEAD_MODAL_EVENT))}
    >
      {children}
    </button>
  );
}
