import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, adminConfigured, checkSession } from "@/lib/admin-auth";
import { readLeads } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Заявки — админка ЦветоМир",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("ru-RU", {
    timeZone: "Europe/Moscow",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  if (!adminConfigured()) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-brand-ice px-4">
        <div className="max-w-md rounded-card border border-brand-mint bg-white p-8 text-center shadow-card">
          <h1 className="font-display text-xl font-bold text-brand-ink">
            Админка не настроена
          </h1>
          <p className="mt-2 text-sm text-brand-moss">
            Задайте переменную окружения <code>ADMIN_PASSWORD</code> и
            перезапустите приложение.
          </p>
        </div>
      </main>
    );
  }

  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!checkSession(token)) {
    redirect("/admin/login");
  }

  const leads = readLeads();

  return (
    <main className="min-h-screen bg-brand-ice px-4 py-8">
      <div className="mx-auto max-w-container">
        <header className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-ink">
              Заявки
            </h1>
            <p className="mt-1 text-sm text-brand-moss">
              Всего: {leads.length}
            </p>
          </div>
          <form method="post" action="/api/admin/logout">
            <button
              type="submit"
              className="rounded-xl border-2 border-brand-mint bg-white px-4 py-2 text-sm font-bold text-brand-green transition-colors hover:border-brand-green"
            >
              Выйти
            </button>
          </form>
        </header>

        {leads.length === 0 ? (
          <div className="mt-8 rounded-card border border-brand-mint bg-white p-8 text-center text-brand-moss shadow-card">
            Заявок пока нет.
          </div>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-card border border-brand-mint bg-white shadow-card">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-brand-mint text-brand-moss">
                  <th className="px-4 py-3 font-semibold">Дата (МСК)</th>
                  <th className="px-4 py-3 font-semibold">Имя</th>
                  <th className="px-4 py-3 font-semibold">Телефон</th>
                  <th className="px-4 py-3 font-semibold">Город</th>
                  <th className="px-4 py-3 font-semibold">IP</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-brand-ice last:border-0 align-top text-brand-ink"
                  >
                    <td className="whitespace-nowrap px-4 py-3 text-brand-moss">
                      {formatDate(lead.createdAt)}
                    </td>
                    <td className="px-4 py-3 font-medium">{lead.name}</td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <a
                        href={`tel:${lead.phone}`}
                        className="text-brand-green underline underline-offset-2"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-4 py-3">{lead.city || "—"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-brand-moss">
                      {lead.ip || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
