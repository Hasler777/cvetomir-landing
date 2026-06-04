"use client";

/** Кнопка удаления заявки с подтверждением. Обычная форма-POST:
 *  после удаления сервер делает 303-редирект обратно на /admin. */
export default function DeleteLeadButton({ id }: { id: string }) {
  return (
    <form
      method="post"
      action="/api/admin/leads/delete"
      onSubmit={(e) => {
        if (!confirm("Удалить заявку безвозвратно?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        aria-label="Удалить заявку"
        title="Удалить заявку"
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-brand-mint text-lg leading-none text-brand-moss transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700"
      >
        ×
      </button>
    </form>
  );
}
