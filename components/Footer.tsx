import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-brand-ink py-12 text-white/80">
      <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo mono="white" />
          <p className="mt-4 max-w-sm text-sm text-white/70">
            Франшиза цветочного магазина «ЦветоМир» — готовая система для запуска
            прибыльной точки на основе 14-летней практики действующей сети.
          </p>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Навигация
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="#why" className="hover:text-white">О нас</a></li>
            <li><a href="#included" className="hover:text-white">Что входит</a></li>
            <li><a href="#economics" className="hover:text-white">Экономика</a></li>
            <li><a href="#steps" className="hover:text-white">Этапы запуска</a></li>
            <li><a href="#founder" className="hover:text-white">Об основателе</a></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Документы
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Политика обработки персональных данных</Link></li>
            <li><Link href="/cookies" className="hover:text-white">Политика использования cookies</Link></li>
            <li><Link href="/consent" className="hover:text-white">Согласие на обработку данных</Link></li>
            <li><Link href="/marketing-consent" className="hover:text-white">Согласие на рекламные сообщения</Link></li>
          </ul>
        </div>
        <div>
          <div className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Контакты
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            <li><a href="tel:+78001234567" className="hover:text-white">+7 (800) 123-45-67</a></li>
            <li><a href="mailto:franchise@cvetomir.ru" className="hover:text-white">franchise@cvetomir.ru</a></li>
            <li className="text-white/60">© {new Date().getFullYear()} ЦветоМир · v1.0.1</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
