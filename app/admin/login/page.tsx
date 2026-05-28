import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Вход — админка ЦветоМир",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { e?: string };
}) {
  const hasError = searchParams.e === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-ice px-4">
      <form
        method="post"
        action="/api/admin/login"
        className="w-full max-w-sm rounded-card border border-brand-mint bg-white p-8 shadow-card"
      >
        <h1 className="font-display text-2xl font-bold text-brand-ink">
          Админка ЦветоМир
        </h1>
        <p className="mt-1 text-sm text-brand-moss">
          Введите пароль для доступа к заявкам.
        </p>

        <label className="mt-6 block">
          <span className="text-sm text-brand-moss">Пароль</span>
          <input
            required
            autoFocus
            type="password"
            name="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border-2 border-brand-mint bg-white px-4 py-3 outline-none transition-colors focus:border-brand-green"
          />
        </label>

        {hasError && (
          <p className="mt-3 text-sm text-brand-coral" role="alert">
            Неверный пароль. Попробуйте ещё раз.
          </p>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-brand-green px-4 py-3 font-display font-bold text-white transition-opacity hover:opacity-90"
        >
          Войти
        </button>
      </form>
    </main>
  );
}
