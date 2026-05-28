import Link from "next/link";
import Logo from "./Logo";
import Footer from "./Footer";

/** Реквизиты Оператора — общий блок для всех правовых страниц. */
export function OperatorDetails() {
  return (
    <div className="mt-10 rounded-card border border-brand-mint bg-brand-ice p-5 text-sm text-brand-ink/80">
      <div className="font-display font-bold text-brand-ink">
        Оператор: ИП Гарифуллин Риналь Фнунович
      </div>
      <ul className="mt-2 space-y-1">
        <li>ИНН: 026408868630</li>
        <li>ОГРНИП: 325028000175290</li>
        <li>
          Адрес: 452686, Республика Башкортостан, г. Нефтекамск, ул. Карла
          Маркса, д. 8Г, кв. 77
        </li>
        <li>
          Email:{" "}
          <a
            href="mailto:cvetomirfranchise@yandex.ru"
            className="font-medium text-brand-coral underline underline-offset-2 hover:text-brand-green"
          >
            cvetomirfranchise@yandex.ru
          </a>
        </li>
      </ul>
    </div>
  );
}

export default function LegalLayout({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 left-0 right-0 z-50 border-b border-brand-mint/60 bg-white/95 backdrop-blur">
        <div className="container-x flex h-14 items-center justify-between md:h-20">
          <Link href="/" className="shrink-0" aria-label="На главную">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-brand-moss transition-colors hover:text-brand-coral"
          >
            ← На главную
          </Link>
        </div>
      </header>
      <main className="bg-white">
        <div className="mx-auto w-full max-w-3xl px-5 py-12 md:px-8 md:py-16">
          <h1 className="font-display text-3xl font-bold leading-tight text-brand-ink md:text-4xl">
            {title}
          </h1>
          {effectiveDate && (
            <p className="mt-3 text-sm text-brand-moss">
              Дата вступления в силу: {effectiveDate}
            </p>
          )}
          <article className="legal-prose mt-8">{children}</article>
          <OperatorDetails />
        </div>
      </main>
      <Footer />
    </>
  );
}
