import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Страница не найдена",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-ice px-6 text-center">
      <Logo />
      <h1 className="mt-8 font-display text-5xl font-extrabold text-brand-ink md:text-7xl">
        404
      </h1>
      <p className="mt-4 max-w-md text-lg text-brand-ink/70">
        Такой страницы нет или она была перемещена. Вернитесь на главную, чтобы
        узнать о франшизе «ЦветоМир».
      </p>
      <Link href="/" className="btn-primary mt-8">
        На главную
      </Link>
    </main>
  );
}
